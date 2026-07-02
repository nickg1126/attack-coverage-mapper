import { useEffect, useMemo, useState } from 'react';
import techniques from './data/techniques.json';
import baseCoverage from './data/coverage.json';
import MetricCards from './components/MetricCards';
import CoverageTable from './components/CoverageTable';
import './App.css';

const OVERRIDES_KEY = 'attack-coverage-overrides';

function loadOverrides() {
  try {
    return JSON.parse(localStorage.getItem(OVERRIDES_KEY)) ?? {};
  } catch {
    return {};
  }
}

function getStatus(entry) {
  const covered = [entry.falcon?.covered, entry.rapid7?.covered].filter(Boolean).length;
  if (covered === 2) return 'covered';
  if (covered === 1) return 'partial';
  return 'gap';
}

const STATUS_FILTERS = ['all', 'covered', 'partial', 'gap'];

export default function App() {
  const [overrides, setOverrides] = useState(loadOverrides);
  const [tacticFilter, setTacticFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    localStorage.setItem(OVERRIDES_KEY, JSON.stringify(overrides));
  }, [overrides]);

  const rows = useMemo(() => {
    const tracked = techniques.filter((t) => baseCoverage[t.id]);
    return tracked.map((t) => {
      const merged = {
        falcon: { ...baseCoverage[t.id].falcon, ...overrides[t.id]?.falcon },
        rapid7: { ...baseCoverage[t.id].rapid7, ...overrides[t.id]?.rapid7 },
      };
      return { ...t, ...merged, status: getStatus(merged) };
    });
  }, [overrides]);

  const tactics = useMemo(() => [...new Set(rows.map((r) => r.tactic))].sort(), [rows]);

  const filtered = rows.filter((r) => {
    if (tacticFilter !== 'all' && r.tactic !== tacticFilter) return false;
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      if (!r.id.toLowerCase().includes(q) && !r.name.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  function handleEditCell(id, tool, value) {
    setOverrides((prev) => ({
      ...prev,
      [id]: { ...prev[id], [tool]: value },
    }));
  }

  function resetOverrides() {
    setOverrides({});
  }

  const hasOverrides = Object.keys(overrides).length > 0;

  return (
    <div className="app">
      <header className="app-header">
        <h1>ATT&CK detection coverage</h1>
        <p>Mapping tracked MITRE ATT&CK techniques against Falcon and Rapid7 detection coverage.</p>
      </header>

      <div className="disclaimer-banner">
        Techniques are pulled live from MITRE ATT&CK. The Falcon/Rapid7 rule names are
        illustrative examples for demonstration — not sourced from vendor documentation
        or MITRE ATT&CK Evaluations results. See the README for real public sources.
      </div>

      <MetricCards rows={rows} />

      <div className="filter-row">
        <input
          type="text"
          placeholder="Search technique ID or name…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={tacticFilter} onChange={(e) => setTacticFilter(e.target.value)}>
          <option value="all">All tactics</option>
          {tactics.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <div className="status-chip-group">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              type="button"
              className={`status-chip ${statusFilter === s ? 'is-active' : ''}`}
              onClick={() => setStatusFilter(s)}
            >
              {s === 'all' ? 'All' : s[0].toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
        <span className="result-count">{filtered.length} of {rows.length}</span>
      </div>

      <CoverageTable rows={filtered} onEditCell={handleEditCell} />

      <div className="app-footer">
        <span>Click any Falcon/Rapid7 cell to edit coverage — saved locally in this browser.</span>
        {hasOverrides && (
          <button type="button" onClick={resetOverrides}>Reset edits</button>
        )}
      </div>
    </div>
  );
}
