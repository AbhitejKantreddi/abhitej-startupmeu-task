import { useState, useEffect } from 'react';

const STATUSES = ['Wishlist', 'Applied', 'Interview', 'Offer', 'Rejected'];

const empty = {
  company: '',
  role: '',
  status: 'Wishlist',
  location: '',
  link: '',
  notes: '',
  appliedDate: new Date().toISOString().slice(0, 10),
};

export default function ApplicationForm({ initialData, onSubmit, onCancel, submitting }) {
  const isEdit = Boolean(initialData);
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({
        company: initialData.company || '',
        role: initialData.role || '',
        status: initialData.status || 'Wishlist',
        location: initialData.location || '',
        link: initialData.link || '',
        notes: initialData.notes || '',
        appliedDate: initialData.appliedDate
          ? initialData.appliedDate.slice(0, 10)
          : new Date().toISOString().slice(0, 10),
      });
    } else {
      setForm(empty);
    }
    setErrors({});
  }, [initialData]);

  const validate = () => {
    const e = {};
    if (!form.company.trim()) e.company = 'Company name is required';
    if (!form.role.trim()) e.role = 'Role is required';
    if (form.link && !/^https?:\/\/.+/.test(form.link.trim())) {
      e.link = 'Link must start with http:// or https://';
    }
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    onSubmit(form);
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="form-title">
      <div className="modal form-modal">
        <div className="form-modal__header">
          <h2 id="form-title">{isEdit ? 'Edit Application' : 'Add Application'}</h2>
          <button className="btn-icon" onClick={onCancel} aria-label="Close">✕</button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            {/* Company */}
            <div className={`form-group ${errors.company ? 'form-group--error' : ''}`}>
              <label htmlFor="company">Company *</label>
              <input
                id="company" name="company" type="text"
                value={form.company} onChange={handleChange}
                placeholder="e.g. Google"
                autoFocus
              />
              {errors.company && <span className="form-error">{errors.company}</span>}
            </div>

            {/* Role */}
            <div className={`form-group ${errors.role ? 'form-group--error' : ''}`}>
              <label htmlFor="role">Role *</label>
              <input
                id="role" name="role" type="text"
                value={form.role} onChange={handleChange}
                placeholder="e.g. Frontend Engineer"
              />
              {errors.role && <span className="form-error">{errors.role}</span>}
            </div>

            {/* Status */}
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select id="status" name="status" value={form.status} onChange={handleChange}>
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Applied Date */}
            <div className="form-group">
              <label htmlFor="appliedDate">Applied Date</label>
              <input
                id="appliedDate" name="appliedDate" type="date"
                value={form.appliedDate} onChange={handleChange}
              />
            </div>

            {/* Location */}
            <div className="form-group form-group--full">
              <label htmlFor="location">Location</label>
              <input
                id="location" name="location" type="text"
                value={form.location} onChange={handleChange}
                placeholder="e.g. Remote, New York, NY"
              />
            </div>

            {/* Link */}
            <div className={`form-group form-group--full ${errors.link ? 'form-group--error' : ''}`}>
              <label htmlFor="link">Job Posting Link</label>
              <input
                id="link" name="link" type="url"
                value={form.link} onChange={handleChange}
                placeholder="https://..."
              />
              {errors.link && <span className="form-error">{errors.link}</span>}
            </div>

            {/* Notes */}
            <div className="form-group form-group--full">
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes" name="notes" rows={3}
                value={form.notes} onChange={handleChange}
                placeholder="Any notes about this application..."
              />
            </div>
          </div>

          <div className="form-modal__footer">
            <button type="button" className="btn btn--ghost" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary" disabled={submitting}>
              {submitting ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
