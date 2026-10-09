import { useState, useEffect, useCallback } from 'react';
import StatsBar from './components/StatsBar';
import ApplicationList from './components/ApplicationList';
import ApplicationForm from './components/ApplicationForm';
import ConfirmDialog from './components/ConfirmDialog';
import { useDebounce } from './hooks/useDebounce';
import {
  getApplications,
  getStats,
  createApplication,
  updateApplication,
  deleteApplication,
} from './api/api';
import './App.css';

const EMPTY_STATS = {
  Wishlist: 0, Applied: 0, Interview: 0, Offer: 0, Rejected: 0,
};

export default function App() {
  const [applications, setApplications] = useState([]);
  const [stats, setStats]               = useState(EMPTY_STATS);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [submitting, setSubmitting]     = useState(false);

  const [search, setSearch]             = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [showForm, setShowForm]         = useState(false);
  const [editTarget, setEditTarget]     = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const debouncedSearch = useDebounce(search, 400);

  // ── Fetch data ──────────────────────────────────────────────────────────────
  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [apps, statsData] = await Promise.all([
        getApplications(debouncedSearch, statusFilter),
        getStats(),
      ]);
      setApplications(apps);
      setStats(statsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, statusFilter]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleFormSubmit = async (data) => {
    setSubmitting(true);
    try {
      if (editTarget) {
        await updateApplication(editTarget._id, data);
      } else {
        await createApplication(data);
      }
      setShowForm(false);
      setEditTarget(null);
      await fetchAll();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (application) => {
    setEditTarget(application);
    setShowForm(true);
  };

  const handleDeleteClick = (application) => {
    setDeleteTarget(application);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteApplication(deleteTarget._id);
      setDeleteTarget(null);
      await fetchAll();
    } catch (err) {
      setError(err.message);
      setDeleteTarget(null);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateApplication(id, { status: newStatus });
      await fetchAll();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFilterClick = (status) => {
    setStatusFilter(status);
  };

  const openAddForm = () => {
    setEditTarget(null);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditTarget(null);
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="app-header__inner">
          <div className="app-header__brand">
            <span className="app-header__logo">💼</span>
            <div>
              <h1 className="app-header__title">Job Tracker</h1>
              <p className="app-header__subtitle">Stay on top of every application</p>
            </div>
          </div>
          <button className="btn btn--primary btn--add" onClick={openAddForm}>
            + Add Application
          </button>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="stats-section">
        <StatsBar
          stats={stats}
          activeFilter={statusFilter}
          onFilterClick={handleFilterClick}
        />
      </div>

      {/* Controls */}
      <div className="controls">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            className="search-input"
            type="text"
            placeholder="Search by company or role…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search applications"
          />
          {search && (
            <button
              className="search-clear"
              onClick={() => setSearch('')}
              aria-label="Clear search"
            >✕</button>
          )}
        </div>

        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          aria-label="Filter by status"
        >
          <option value="">All Statuses</option>
          {['Wishlist', 'Applied', 'Interview', 'Offer', 'Rejected'].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Results count */}
      {!loading && !error && (
        <p className="results-count">
          {applications.length === 0
            ? 'No applications'
            : `${applications.length} application${applications.length !== 1 ? 's' : ''}`}
          {(search || statusFilter) && ' matching your filters'}
        </p>
      )}

      {/* Application List */}
      <main className="app-main">
        <ApplicationList
          applications={applications}
          loading={loading}
          error={error}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          onStatusChange={handleStatusChange}
        />
      </main>

      {/* Modals */}
      {showForm && (
        <ApplicationForm
          initialData={editTarget}
          onSubmit={handleFormSubmit}
          onCancel={closeForm}
          submitting={submitting}
        />
      )}

      {deleteTarget && (
        <ConfirmDialog
          message={`Delete "${deleteTarget.company} — ${deleteTarget.role}"? This cannot be undone.`}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
