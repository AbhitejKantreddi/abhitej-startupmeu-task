const STATUSES = ['Wishlist', 'Applied', 'Interview', 'Offer', 'Rejected'];

export default function StatsBar({ stats, activeFilter, onFilterClick }) {
  const total = STATUSES.reduce((sum, s) => sum + (stats[s] || 0), 0);

  return (
    <div className="stats-bar">
      <button
        className={`stat-pill stat-pill--all ${activeFilter === '' ? 'stat-pill--active' : ''}`}
        onClick={() => onFilterClick('')}
      >
        <span className="stat-pill__label">All</span>
        <span className="stat-pill__count">{total}</span>
      </button>

      {STATUSES.map((status) => (
        <button
          key={status}
          className={`stat-pill stat-pill--${status.toLowerCase()} ${activeFilter === status ? 'stat-pill--active' : ''}`}
          onClick={() => onFilterClick(status)}
        >
          <span className="stat-pill__label">{status}</span>
          <span className="stat-pill__count">{stats[status] ?? 0}</span>
        </button>
      ))}
    </div>
  );
}
