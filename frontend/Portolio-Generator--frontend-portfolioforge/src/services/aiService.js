// ──────────────────────────────────────────────────────────────────────────────
// AI SERVICE - Flask Backend API Integration
// ──────────────────────────────────────────────────────────────────────────────
import { apiClient } from './apiClient';
import { mockGeneratedPrompt, mockGeneratedJSON } from '../data/mockData';

const aiService = {
  async generatePrompt(portfolioData) {
    try {
      const res = await apiClient.post('/ai/generate-prompt', { portfolioData });
      return res.prompt;
    } catch (err) {
      return mockGeneratedPrompt;
    }
  },

  async generateJSON(promptOrResumeText, resumeId) {
    try {
      return await apiClient.post('/ai/generate-json', { prompt: promptOrResumeText, resumeId });
    } catch (err) {
      return mockGeneratedJSON;
    }
  },

  async enhanceSection(section, text) {
    try {
      const res = await apiClient.post('/ai/enhance-section', { section, text });
      return res.enhancedText;
    } catch (err) {
      return text;
    }
  },

  async generateHTML(portfolioJSON, theme) {
    try {
      return await apiClient.post('/portfolios/generate', { portfolioJSON, theme });
    } catch (err) {
      return '<html><!-- generated portfolio --></html>';
    }
  },
};

export default aiService;
