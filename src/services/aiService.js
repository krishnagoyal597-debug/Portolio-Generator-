// ──────────────────────────────────────────────────────────────────────────────
// MOCK AI SERVICE
// TODO: Replace with FastAPI → POST /api/ai/generate-prompt | POST /api/ai/generate-json
// ──────────────────────────────────────────────────────────────────────────────
import { mockGeneratedPrompt, mockGeneratedJSON } from '../data/mockData';

function delay(ms = 800) { return new Promise(r => setTimeout(r, ms)); }

const aiService = {
  async generatePrompt(portfolioData) {
    // TODO: POST /api/ai/generate-prompt { portfolioData }
    await delay(1500);
    return mockGeneratedPrompt;
  },

  async generateJSON(prompt) {
    // TODO: POST /api/ai/generate-json { prompt }
    // This calls Gemini on the backend — never expose API key in frontend
    await delay(2500);
    return mockGeneratedJSON;
  },

  async generateHTML(portfolioJSON, theme) {
    // TODO: POST /api/portfolio/generate { portfolioJSON, theme }
    await delay(1800);
    return '<html><!-- generated portfolio --></html>';
  },
};

export default aiService;
