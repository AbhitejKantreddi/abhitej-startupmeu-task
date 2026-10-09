import ApplicationCard from './ApplicationCard';

export default function ApplicationList({
  applications,
  loading,
  error,
  onEdit,
  onDelete,
  onStatusChange,
}) {
  if (loading) {
    return (
      <div className="list-state">
        <div className="spinner" aria-label="Loading applications" />
        <p>Loading applications…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="list-state list-state--error">
        <span className="list-state__icon">⚠️</span>
        <p>{error}</p>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="list-state list-state--empty">
        <span className="list-state__icon">📋</span>
        <p>No applications found.</p>
        <p className="list-state__sub">Add your first one using the button above.</p>
      </div>
    );
  }

  return (
    <div className="card-grid">
      {applications.map((app) => (
        <ApplicationCard
          key={app._id}
          application={app}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}
