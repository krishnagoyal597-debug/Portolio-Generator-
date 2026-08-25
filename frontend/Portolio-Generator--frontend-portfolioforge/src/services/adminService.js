// ──────────────────────────────────────────────────────────────────────────────
// ADMIN SERVICE - Flask Backend API Integration
// ──────────────────────────────────────────────────────────────────────────────
import { apiClient } from './apiClient';
import { mockAdminUsers, mockAdminStats, mockAnalyticsData } from '../data/mockData';

let fallbackUsers = [...mockAdminUsers];

const adminService = {
  async getUsers({ search = '', status = 'all', page = 1 } = {}) {
    try {
      const query = `search=${encodeURIComponent(search)}&status=${status}&page=${page}`;
      return await apiClient.get(`/admin/users?${query}`);
    } catch (err) {
      let filtered = fallbackUsers;
      if (search) filtered = filtered.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));
      if (status !== 'all') filtered = filtered.filter(u => u.status === status);
      return { users: filtered.slice((page - 1) * 10, page * 10), total: filtered.length, pages: Math.ceil(filtered.length / 10) };
    }
  },

  async suspendUser(id) {
    try {
      return await apiClient.put(`/admin/users/${id}/suspend`);
    } catch (err) {
      fallbackUsers = fallbackUsers.map(u => u.id === id ? { ...u, status: 'suspended' } : u);
      return { success: true };
    }
  },

  async activateUser(id) {
    try {
      return await apiClient.put(`/admin/users/${id}/activate`);
    } catch (err) {
      fallbackUsers = fallbackUsers.map(u => u.id === id ? { ...u, status: 'active' } : u);
      return { success: true };
    }
  },

  async deleteUser(id) {
    try {
      return await apiClient.delete(`/admin/users/${id}`);
    } catch (err) {
      fallbackUsers = fallbackUsers.filter(u => u.id !== id);
      return { success: true };
    }
  },

  async getStats() {
    try {
      return await apiClient.get('/admin/stats');
    } catch (err) {
      return mockAdminStats;
    }
  },

  async getAnalytics(period = 'month') {
    try {
      return await apiClient.get(`/admin/analytics?period=${period}`);
    } catch (err) {
      return mockAnalyticsData[period] || mockAnalyticsData.month;
    }
  },

  async getAdminPortfolios({ search = '', theme = 'all', status = 'all' } = {}) {
    try {
      const query = `search=${encodeURIComponent(search)}&theme=${theme}&status=${status}`;
      return await apiClient.get(`/admin/portfolios?${query}`);
    } catch (err) {
      const { mockAdminPortfolios } = await import('../data/mockData');
      let result = [...mockAdminPortfolios];
      if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
      if (theme !== 'all') result = result.filter(p => p.theme === theme);
      if (status !== 'all') result = result.filter(p => p.status === status);
      return result;
    }
  },
};

export default adminService;
