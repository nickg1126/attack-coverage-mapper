import { useState } from 'react';

export default function EditableCell({ value, onSave }) {
  const [editing, setEditing] = useState(false);
  const [covered, setCovered] = useState(Boolean(value?.covered));
  const [rule, setRule] = useState(value?.rule ?? '');

  if (editing) {
    return (
      <td className="editable-cell">
        <form
          className="cell-edit-form"
          onSubmit={(e) => {
            e.preventDefault();
            onSave({ covered, rule: rule.trim() || undefined });
            setEditing(false);
          }}
        >
          <label>
            <input
              type="checkbox"
              checked={covered}
              onChange={(e) => setCovered(e.target.checked)}
            />
            Covered
          </label>
          <input
            type="text"
            placeholder="Rule name"
            value={rule}
            onChange={(e) => setRule(e.target.value)}
          />
          <div className="cell-edit-actions">
            <button type="submit" className="primary">Save</button>
            <button
              type="button"
              onClick={() => {
                setCovered(Boolean(value?.covered));
                setRule(value?.rule ?? '');
                setEditing(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </td>
    );
  }

  const isCovered = Boolean(value?.covered);

  return (
    <td className="editable-cell">
      <button
        type="button"
        className={`cell-badge-btn ${isCovered ? 'is-covered' : 'is-gap'}`}
        onClick={() => setEditing(true)}
        title="Click to edit"
      >
        <span className="dot" aria-hidden="true" />
        <span className="cell-rule">
          {isCovered ? value?.rule || 'Covered' : 'Add coverage'}
        </span>
      </button>
    </td>
  );
}
