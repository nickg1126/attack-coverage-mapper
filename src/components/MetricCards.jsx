export default function MetricCards({ rows }) {
  const covered = rows.filter((r) => r.status === 'covered').length;
  const partial = rows.filter((r) => r.status === 'partial').length;
  const gaps = rows.filter((r) => r.status === 'gap').length;
  const pct = rows.length ? Math.round((covered / rows.length) * 100) : 0;

  return (
    <div className="stat-row">
      <div className="stat-tile">
        <p className="stat-label">Tracked</p>
        <p className="stat-value">{rows.length}</p>
      </div>
      <div className="stat-tile is-good">
        <p className="stat-label">Covered</p>
        <p className="stat-value">{covered}</p>
      </div>
      <div className="stat-tile">
        <p className="stat-label">Partial</p>
        <p className="stat-value">{partial}</p>
      </div>
      <div className="stat-tile is-critical">
        <p className="stat-label">Gaps</p>
        <p className="stat-value">{gaps}</p>
      </div>
      <div className="stat-tile" style={{ gridColumn: '1 / -1' }}>
        <p className="stat-label">Full coverage (both tools)</p>
        <p className="stat-value">{pct}%</p>
        <div className="meter-track">
          <div className="meter-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}
