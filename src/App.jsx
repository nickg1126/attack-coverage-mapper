import { useState } from 'react';
import techniques from './data/techniques.json';
import coverage from './data/coverage.json';
import MetricCards from './components/MetricCards';
import CoverageTable from './components/CoverageTable';

function getStatus(id) {
  const c = coverage[id];
  if (!c) return 'gap';
  const covered = [c.falcon?.covered, c.rapid7?.covered].filter(Boolean).length;
  if (covered === 2) return 'covered';
  if (covered === 1) return 'partial';
  return 'gap';
}

export default function App() {
  const [tacticFilter, setTacticFilter] = useState('all');
  const tracked = techniques.filter(t => coverage[t.id]);
  const rows = tracked.map(t => ({ ...t, status: getStatus(t.id), ...coverage[t.id] }));
  const filtered = tacticFilter === 'all' ? rows : rows.filter(r => r.tactic === tacticFilter);

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <h1>ATT&CK detection coverage</h1>
      <MetricCards rows={rows} />
      <select onChange={e => setTacticFilter(e.target.value)} style={{ margin: '16px 0' }}>
        <option value="all">All tactics</option>
        {[...new Set(rows.map(r => r.tactic))].map(t => <option key={t} value={t}>{t}</option>)}
      </select>
      <CoverageTable rows={filtered} />
    </div>
  );
}
