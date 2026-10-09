const STATUSES = ['Wishlist', 'Applied', 'Interview', 'Offer', 'Rejected'];

function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

export default function ApplicationCard({ application, onEdit, onDelete, onStatusChange }) {
  const { _id, company, role, status, location, appliedDate, link, notes } = application;

  const handleStatusChange = (e) => {
    onStatusChange(_id, e.target.value);
  };

  return (
    <div className={`card card--${status.toLowerCase()}`}>
      {/* Top row: company + status badge */}
      <div className="card__header">
        <div className="card__title-group">
          <h3 className="card__company">{company}</h3>
          <p className="card__role">{role}</p>
        </div>
        <span className={`badge badge--${status.toLowerCase()}`}>{status}</span>
      </div>

      {/* Meta row */}
      <div className="card__meta">
        {location && (
          <span className="card__meta-item">
            <span className="card__meta-icon">📍</span>{location}
          </span>
        )}
        <span className="card__meta-item">
          <span className="card__meta-icon">📅</span>{formatDate(appliedDate)}
        </span>
        {link && (
          <a
            href={link} target="_blank" rel="noopener noreferrer"
            className="card__link"
          >
            <span className="card__meta-icon">🔗</span>View Job
          </a>
        )}
      </div>

      {/* Notes */}
      {notes && (
        <p className="card__notes" title={notes}>
          {notes.length > 120 ? notes.slice(0, 120) + '…' : notes}
        </p>
      )}

      {/* Footer: inline status change + actions */}
      <div className="card__footer">
        <div className="card__status-change">
          <label htmlFor={`status-${_id}`} className="sr-only">Change status</label>
          <select
            id={`status-${_id}`}
            className="status-select"
            value={status}
            onChange={handleStatusChange}
            aria-label="Change application status"
          >
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="card__actions">
          <button
            className="btn btn--sm btn--ghost"
            onClick={() => onEdit(application)}
            aria-label={`Edit ${company} application`}
          >
            ✏️ Edit
          </button>
          <button
            className="btn btn--sm btn--danger-ghost"
            onClick={() => onDelete(application)}
            aria-label={`Delete ${company} application`}
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
}
