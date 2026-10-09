const BASE = '/api/applications';

async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Something went wrong');
  return json.data;
}

export const getApplications = (search = '', status = '') => {
  const params = new URLSearchParams();
  if (search) params.set('search', search);
  if (status) params.set('status', status);
  const qs = params.toString();
  return request(`${BASE}${qs ? `?${qs}` : ''}`);
};

export const getStats = () => request(`${BASE}/stats`);

export const createApplication = (data) =>
  request(BASE, { method: 'POST', body: JSON.stringify(data) });

export const updateApplication = (id, data) =>
  request(`${BASE}/${id}`, { method: 'PUT', body: JSON.stringify(data) });

export const deleteApplication = (id) =>
  request(`${BASE}/${id}`, { method: 'DELETE' });
