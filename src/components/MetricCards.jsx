export default function MetricCards({ rows }) {
  const covered = rows.filter(r => r.status === 'covered').length;
  const gaps = rows.filter(r => r.status === 'gap').length;
  const pct = Math.round((covered / rows.length) * 100);

  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <div>Tracked: {rows.length}</div>
      <div>Covered: {covered}</div>
      <div>Gaps: {gaps}</div>
      <div>Coverage: {pct}%</div>
    </div>
  );
}
