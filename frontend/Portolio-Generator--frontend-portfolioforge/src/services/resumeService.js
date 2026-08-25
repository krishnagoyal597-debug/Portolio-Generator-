// ──────────────────────────────────────────────────────────────────────────────
// RESUME SERVICE - Flask Backend API Integration
// ──────────────────────────────────────────────────────────────────────────────
import { apiClient } from './apiClient';
import { mockAnalysisResult } from '../data/mockData';

const resumeService = {
  async uploadResume(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      return await apiClient.upload('/resume/upload', formData);
    } catch (err) {
      // For PDFs/binary files, don't attempt text fallback — it corrupts the content
      const ext = file.name.split('.').pop().toLowerCase();
      if (ext === 'pdf' || ext === 'docx' || ext === 'doc') {
        throw err;
      }
      // Fallback text read for plain text files only
      const text = await file.text();
      return await apiClient.post('/resume/upload', { filename: file.name, text });
    }
  },

  async analyzeResume(resumeId) {
    try {
      return await apiClient.post('/resume/analyze', { resumeId });
    } catch (err) {
      return mockAnalysisResult;
    }
  },

  async getResumeText(resumeId) {
    try {
      const data = await apiClient.get(`/resume/${resumeId}`);
      return data.text;
    } catch (err) {
      return 'ANSHIKA BANSAL\nComputer Science Student...\n';
    }
  },
};

export default resumeService;
