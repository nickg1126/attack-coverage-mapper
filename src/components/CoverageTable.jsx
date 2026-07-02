export default function CoverageTable({ rows }) {
  return (
    <table style={{ width: '100%' }}>
      <thead>
        <tr><th>Technique</th><th>Tactic</th><th>Falcon</th><th>Rapid7</th><th>Status</th></tr>
      </thead>
      <tbody>
        {rows.map(r => (
          <tr key={r.id}>
            <td>{r.id} — {r.name}</td>
            <td>{r.tactic}</td>
            <td>{r.falcon?.covered ? '✓' : '—'}</td>
            <td>{r.rapid7?.covered ? '✓' : '—'}</td>
            <td>{r.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
