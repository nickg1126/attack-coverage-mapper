const LABELS = {
  covered: 'Covered',
  partial: 'Partial',
  gap: 'Gap',
};

export default function StatusBadge({ status }) {
  return (
    <span className={`status-badge status-${status}`}>
      <span className="dot" aria-hidden="true" />
      {LABELS[status] ?? status}
    </span>
  );
}
