import StatusBadge from './StatusBadge';
import EditableCell from './EditableCell';

export default function CoverageTable({ rows, onEditCell }) {
  if (rows.length === 0) {
    return (
      <div className="table-card">
        <div className="empty-state">No techniques match the current filters.</div>
      </div>
    );
  }

  return (
    <div className="table-card">
      <table>
        <thead>
          <tr>
            <th>Technique</th>
            <th>Tactic</th>
            <th>Falcon</th>
            <th>Rapid7</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td>
                <span className="technique-id">{r.id}</span>
                {r.name}
              </td>
              <td className="tactic-cell">{r.tactic}</td>
              <EditableCell
                value={r.falcon}
                onSave={(next) => onEditCell(r.id, 'falcon', next)}
              />
              <EditableCell
                value={r.rapid7}
                onSave={(next) => onEditCell(r.id, 'rapid7', next)}
              />
              <td>
                <StatusBadge status={r.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
