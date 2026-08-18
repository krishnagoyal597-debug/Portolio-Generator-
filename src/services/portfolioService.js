// ──────────────────────────────────────────────────────────────────────────────
// MOCK PORTFOLIO SERVICE
// TODO: Replace with FastAPI endpoints
// ──────────────────────────────────────────────────────────────────────────────
import { mockPortfolios } from '../data/mockData';

function delay(ms = 600) { return new Promise(r => setTimeout(r, ms)); }

let portfolios = [...mockPortfolios];

const portfolioService = {
  async getPortfolios(userId) {
    // TODO: GET /api/portfolio?userId=...
    await delay(600);
    return portfolios.filter(p => !userId || p.userId === userId);
  },

  async getPortfolio(id) {
    // TODO: GET /api/portfolio/:id
    await delay(400);
    return portfolios.find(p => p.id === id) || null;
  },

  async createPortfolio(data) {
    // TODO: POST /api/portfolio
    await delay(800);
    const newPortfolio = { id: `port-${Date.now()}`, ...data, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), views: 0, status: 'draft' };
    portfolios = [newPortfolio, ...portfolios];
    return newPortfolio;
  },

  async updatePortfolio(id, data) {
    // TODO: PUT /api/portfolio/:id
    await delay(600);
    portfolios = portfolios.map(p => p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p);
    return portfolios.find(p => p.id === id);
  },

  async deletePortfolio(id) {
    // TODO: DELETE /api/portfolio/:id
    await delay(700);
    portfolios = portfolios.filter(p => p.id !== id);
    return { success: true };
  },

  async publishPortfolio(id) {
    // TODO: POST /api/portfolio/:id/publish
    await delay(1000);
    return portfolioService.updatePortfolio(id, { status: 'published' });
  },

  async generateHTML(portfolioId, theme) {
    // TODO: POST /api/portfolio/:id/export
    await delay(1500);
    return '<html><!-- generated --></html>';
  },

  async getThemes() {
    // TODO: GET /api/themes
    await delay(300);
    return [
      { id: 'brutalist', name: 'Brutalist', desc: 'Bold, raw, editorial', tags: ['Expressive', 'High Contrast'], usageCount: 342, active: true, featured: false },
      { id: 'bento', name: 'Bento Grid', desc: 'Modular, organized, clean', tags: ['Modern', 'Organized'], usageCount: 891, active: true, featured: true },
      { id: 'minimal', name: 'Minimal Editorial', desc: 'Refined, sophisticated', tags: ['Minimal', 'Elegant'], usageCount: 634, active: true, featured: false },
      { id: 'spatial', name: 'Spatial UI', desc: 'Layered, immersive, depth', tags: ['Spatial', 'Immersive'], usageCount: 412, active: true, featured: false },
      { id: 'glassmorphic', name: 'Glassmorphic', desc: 'Glass, glow, future', tags: ['Dark', 'Visual'], usageCount: 567, active: true, featured: false },
      { id: 'futuristic', name: 'Futuristic Terminal', desc: 'Developer terminal aesthetic', tags: ['Developer', 'Dark', 'Experimental'], usageCount: 278, active: true, featured: false },
    ];
  },
};

export default portfolioService;
