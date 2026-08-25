// ──────────────────────────────────────────────────────────────────────────────
// PORTFOLIO SERVICE - Flask Backend API Integration
// ──────────────────────────────────────────────────────────────────────────────
import { apiClient } from './apiClient';
import { mockPortfolios } from '../data/mockData';

let fallbackPortfolios = [...mockPortfolios];

const portfolioService = {
  async getPortfolios(userId) {
    try {
      const endpoint = userId ? `/portfolios?userId=${userId}` : '/portfolios';
      return await apiClient.get(endpoint);
    } catch (err) {
      return fallbackPortfolios.filter(p => !userId || p.userId === userId);
    }
  },

  async getPortfolio(id) {
    try {
      return await apiClient.get(`/portfolios/${id}`);
    } catch (err) {
      return fallbackPortfolios.find(p => p.id === id) || null;
    }
  },

  async createPortfolio(data) {
    try {
      return await apiClient.post('/portfolios', data);
    } catch (err) {
      const newPortfolio = { id: `port-${Date.now()}`, ...data, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), views: 0, status: 'draft' };
      fallbackPortfolios = [newPortfolio, ...fallbackPortfolios];
      return newPortfolio;
    }
  },

  async updatePortfolio(id, data) {
    try {
      return await apiClient.put(`/portfolios/${id}`, data);
    } catch (err) {
      fallbackPortfolios = fallbackPortfolios.map(p => p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p);
      return fallbackPortfolios.find(p => p.id === id);
    }
  },

  async deletePortfolio(id) {
    try {
      return await apiClient.delete(`/portfolios/${id}`);
    } catch (err) {
      fallbackPortfolios = fallbackPortfolios.filter(p => p.id !== id);
      return { success: true };
    }
  },

  async publishPortfolio(id) {
    try {
      return await apiClient.post(`/portfolios/${id}/publish`);
    } catch (err) {
      return portfolioService.updatePortfolio(id, { status: 'published' });
    }
  },

  async generateHTML(portfolioId, theme) {
    try {
      return await apiClient.post(`/portfolios/${portfolioId}/export`, { theme });
    } catch (err) {
      return '<html><!-- generated --></html>';
    }
  },

  async getThemes() {
    try {
      return await apiClient.get('/themes');
    } catch (err) {
      return [
        { id: 'brutalist', name: 'Brutalist', desc: 'Bold, raw, editorial', tags: ['Expressive', 'High Contrast'], usageCount: 342, active: true, featured: false, color: '#000000' },
        { id: 'bento', name: 'Bento Grid', desc: 'Modular, organized, clean', tags: ['Modern', 'Organized'], usageCount: 891, active: true, featured: true, color: '#3B82F6' },
        { id: 'minimal', name: 'Minimal Editorial', desc: 'Refined, sophisticated', tags: ['Minimal', 'Elegant'], usageCount: 634, active: true, featured: false, color: '#6B7280' },
        { id: 'spatial', name: 'Spatial UI', desc: 'Layered, immersive, depth', tags: ['Spatial', 'Immersive'], usageCount: 412, active: true, featured: false, color: '#818CF8' },
        { id: 'glassmorphic', name: 'Glassmorphic', desc: 'Glass, glow, future', tags: ['Dark', 'Visual'], usageCount: 567, active: true, featured: false, color: '#8B5CF6' },
        { id: 'futuristic', name: 'Futuristic Terminal', desc: 'Developer terminal aesthetic', tags: ['Developer', 'Dark', 'Experimental'], usageCount: 278, active: true, featured: false, color: '#10B981' },
      ];
    }
  },
};

export default portfolioService;
