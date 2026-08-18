// ──────────────────────────────────────────────────────────────────────────────
// MOCK ADMIN SERVICE
// TODO: Replace with FastAPI → GET /api/admin/users | GET /api/admin/analytics
// ──────────────────────────────────────────────────────────────────────────────
import { mockAdminUsers, mockAdminStats, mockAnalyticsData } from '../data/mockData';

function delay(ms = 600) { return new Promise(r => setTimeout(r, ms)); }

let users = [...mockAdminUsers];

const adminService = {
  async getUsers({ search = '', status = 'all', page = 1 } = {}) {
    // TODO: GET /api/admin/users
    await delay(700);
    let filtered = users;
    if (search) filtered = filtered.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));
    if (status !== 'all') filtered = filtered.filter(u => u.status === status);
    return { users: filtered.slice((page - 1) * 10, page * 10), total: filtered.length, pages: Math.ceil(filtered.length / 10) };
  },

  async suspendUser(id) {
    // TODO: PUT /api/admin/users/:id/suspend
    await delay(500);
    users = users.map(u => u.id === id ? { ...u, status: 'suspended' } : u);
    return { success: true };
  },

  async activateUser(id) {
    // TODO: PUT /api/admin/users/:id/activate
    await delay(500);
    users = users.map(u => u.id === id ? { ...u, status: 'active' } : u);
    return { success: true };
  },

  async deleteUser(id) {
    // TODO: DELETE /api/admin/users/:id
    await delay(700);
    users = users.filter(u => u.id !== id);
    return { success: true };
  },

  async getStats() {
    // TODO: GET /api/admin/stats
    await delay(500);
    return mockAdminStats;
  },

  async getAnalytics(period = 'month') {
    // TODO: GET /api/admin/analytics?period=...
    await delay(800);
    return mockAnalyticsData[period] || mockAnalyticsData.month;
  },

  async getAdminPortfolios({ search = '', theme = 'all', status = 'all' } = {}) {
    // TODO: GET /api/admin/portfolios
    await delay(600);
    const { mockAdminPortfolios } = await import('../data/mockData');
    let result = [...mockAdminPortfolios];
    if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (theme !== 'all') result = result.filter(p => p.theme === theme);
    if (status !== 'all') result = result.filter(p => p.status === status);
    return result;
  },
};

export default adminService;
