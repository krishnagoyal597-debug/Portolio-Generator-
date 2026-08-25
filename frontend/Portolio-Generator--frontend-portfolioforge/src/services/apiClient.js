// ──────────────────────────────────────────────────────────────────────────────
// API CLIENT - PortfolioForge Backend API Adapter
// ──────────────────────────────────────────────────────────────────────────────

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const storedUser = sessionStorage.getItem('pf_user');
  if (storedUser) {
    try {
      const parsed = JSON.parse(storedUser);
      if (parsed.access_token) {
        headers['Authorization'] = `Bearer ${parsed.access_token}`;
      }
    } catch (e) {
      // ignore
    }
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);
    
    if (response.status === 204) {
      return null;
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('text/html')) {
      return await response.text();
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || data.message || `Request failed with status ${response.status}`);
    }
    return data;
  } catch (error) {
    console.warn(`[API Client Warning] ${url}:`, error.message);
    throw error;
  }
}

export const apiClient = {
  get: (endpoint, headers) => request(endpoint, { method: 'GET', headers }),
  post: (endpoint, body, headers) => request(endpoint, { method: 'POST', body: JSON.stringify(body), headers }),
  put: (endpoint, body, headers) => request(endpoint, { method: 'PUT', body: JSON.stringify(body), headers }),
  delete: (endpoint, headers) => request(endpoint, { method: 'DELETE', headers }),
  upload: async (endpoint, formData) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const storedUser = sessionStorage.getItem('pf_user');
    const headers = {};
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed.access_token) headers['Authorization'] = `Bearer ${parsed.access_token}`;
      } catch (e) {}
    }
    const response = await fetch(url, { method: 'POST', body: formData, headers });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Upload failed');
    return data;
  }
};
