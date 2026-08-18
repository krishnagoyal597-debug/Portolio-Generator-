// ──────────────────────────────────────────────────────────────────────────────
// MOCK RESUME SERVICE
// TODO: Replace with FastAPI → POST /api/resume/upload | POST /api/resume/analyze
// ──────────────────────────────────────────────────────────────────────────────
import { mockAnalysisResult } from '../data/mockData';

function delay(ms = 800) { return new Promise(r => setTimeout(r, ms)); }

const resumeService = {
  async uploadResume(file) {
    // TODO: POST /api/resume/upload (multipart/form-data)
    await delay(1200);
    return { id: `res-${Date.now()}`, filename: file.name, size: file.size };
  },

  async analyzeResume(resumeId) {
    // TODO: POST /api/resume/analyze { resumeId }
    await delay(2000);
    return mockAnalysisResult;
  },

  async getResumeText(resumeId) {
    // TODO: GET /api/resume/:id
    await delay(400);
    return 'ANSHIKA BANSAL\nComputer Science Student...\n';
  },
};

export default resumeService;
