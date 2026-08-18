import React, { useState } from 'react';
import { ArrowLeft, Edit3, Layers, RefreshCw, Link2, Download, ExternalLink, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';
import PortfolioPreview from '../../components/portfolio/PortfolioPreview';
import CodeEditor from '../../components/ui/CodeEditor';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { useApp } from '../../context/AppContext';
import { mockGeneratedJSON } from '../../data/mockData';

export default function Step6Preview() {
  const { generatedJSON, selectedTemplate, prevStep, goToStep } = usePortfolio();
  const { addToast } = useApp();
  const navigate = useNavigate();
  const [jsonOpen, setJsonOpen] = useState(false);
  const [exportModal, setExportModal] = useState(false);

  const data = generatedJSON || mockGeneratedJSON;

  const handleExport = () => {
    addToast({ message: 'Preparing your HTML export...', type: 'info' });
    setTimeout(() => setExportModal(true), 500);
  };

  const handleDownload = () => {
    // Generate a simple HTML file for download
    const html = generateHTMLExport(data, selectedTemplate);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio.html';
    a.click();
    URL.revokeObjectURL(url);
    addToast({ message: 'portfolio.html downloaded!', type: 'success' });
    setExportModal(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://anshikabansal.portfolioforge.app');
    addToast({ message: 'Portfolio link copied!', type: 'success' });
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/50 text-green-700 dark:text-green-400 text-xs font-medium mb-3">
          <CheckCircle size={12} /> Portfolio Generated Successfully
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Your Portfolio Is Ready 🎉</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Your resume has been transformed into a professional portfolio.</p>
      </div>

      {/* Split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Portfolio preview — takes 2/3 */}
        <div className="lg:col-span-2" style={{ height: '520px' }}>
          <PortfolioPreview data={data} template={selectedTemplate} />
        </div>

        {/* Actions — right panel */}
        <div className="space-y-3">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Actions</p>
            <div className="space-y-2">
              <Button variant="secondary" fullWidth icon={<Edit3 size={15} />} onClick={() => goToStep(3)}>
                Edit Portfolio
              </Button>
              <Button variant="secondary" fullWidth icon={<Layers size={15} />} onClick={() => goToStep(4)}>
                Change Template
              </Button>
              <Button variant="secondary" fullWidth icon={<RefreshCw size={15} />} onClick={() => goToStep(5)}>
                Regenerate
              </Button>
              <Button variant="ghost" fullWidth icon={<Link2 size={15} />} onClick={handleCopyLink}>
                Copy Portfolio Link
              </Button>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-700 pt-4 mt-4 space-y-2">
              <Button fullWidth icon={<Download size={15} />} onClick={handleExport}>
                Export HTML
              </Button>
              <Button variant="outline" fullWidth icon={<ExternalLink size={15} />} onClick={() => navigate('/preview')}>
                View Full Portfolio ↗
              </Button>
            </div>
          </div>

          {/* Template badge */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Template</p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 capitalize">{selectedTemplate} Template</p>
          </div>
        </div>
      </div>

      {/* JSON preview */}
      <div className="mb-8">
        <button
          onClick={() => setJsonOpen(v => !v)}
          className="w-full flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          style={{ borderRadius: jsonOpen ? '0.75rem 0.75rem 0 0' : '0.75rem' }}
        >
          <span>Portfolio Data (JSON)</span>
          {jsonOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {jsonOpen && (
          <CodeEditor
            code={data}
            language="json"
            title="portfolio_data.json"
            maxHeight="400px"
            className="rounded-t-none border-t-0"
          />
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <Button variant="secondary" icon={<ArrowLeft size={16} />} onClick={prevStep}>Back</Button>
        <Button variant="secondary" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        <Button fullWidth icon={<Download size={16} />} onClick={handleExport}>Download HTML</Button>
      </div>

      {/* Export modal */}
      <Modal isOpen={exportModal} onClose={() => setExportModal(false)} title="Export Portfolio" size="sm">
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={24} className="text-green-500" />
          </div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">Portfolio Generated Successfully</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Your portfolio is ready to download.</p>

          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 mb-6 text-left space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <span className="text-gray-400">📄</span>
              <code className="font-mono text-indigo-600 dark:text-indigo-400">portfolio.html</code>
              <span className="ml-auto text-xs text-gray-400">~45 KB</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>📁</span>
              <code className="font-mono text-xs">portfolio-assets/</code>
              <span className="ml-auto text-xs">optional</span>
            </div>
          </div>

          <div className="space-y-2">
            <Button fullWidth icon={<Download size={16} />} onClick={handleDownload}>Download HTML</Button>
            <Button variant="secondary" fullWidth onClick={() => { setExportModal(false); goToStep(1); navigate('/create'); }}>
              Generate Again
            </Button>
            <Button variant="ghost" fullWidth onClick={() => { setExportModal(false); navigate('/dashboard'); }}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// ── Minimal HTML export generator ─────────────────────────────────────────────
function generateHTMLExport(data, template) {
  const info = data.personalInfo || data;
  const projects = data.projects || [];
  const skills = data.skillGroups
    ? data.skillGroups.flatMap(g => g.skills)
    : (data.skills || []);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${info.name || 'Portfolio'} — Portfolio</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Inter', sans-serif; color: #111827; background: #fff; }
  .hero { background: linear-gradient(135deg, #4338ca 0%, #6d28d9 100%); color: white; padding: 80px 40px; }
  .hero h1 { font-size: 3rem; font-weight: 800; margin-bottom: 8px; }
  .hero p.title { font-size: 1.25rem; color: #c7d2fe; margin-bottom: 20px; }
  .hero p.summary { color: #e0e7ff; max-width: 600px; line-height: 1.7; }
  .section { max-width: 900px; margin: 0 auto; padding: 60px 40px; }
  h2 { font-size: 1.5rem; font-weight: 700; margin-bottom: 24px; border-bottom: 2px solid #f3f4f6; padding-bottom: 12px; }
  .skills { display: flex; flex-wrap: wrap; gap: 8px; }
  .skill { padding: 6px 14px; background: #eef2ff; color: #4338ca; border-radius: 8px; font-size: 0.875rem; font-weight: 500; }
  .project { border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; margin-bottom: 16px; }
  .project h3 { font-weight: 600; margin-bottom: 8px; }
  .project p { color: #6b7280; font-size: 0.875rem; line-height: 1.6; }
  .tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
  .tag { padding: 2px 10px; background: #f3f4f6; color: #6b7280; border-radius: 6px; font-size: 0.75rem; }
  footer { text-align: center; padding: 40px; background: #111827; color: #9ca3af; font-size: 0.875rem; }
  a { color: #4f46e5; }
</style>
</head>
<body>
<div class="hero">
  <p style="font-size:0.75rem;letter-spacing:0.2em;text-transform:uppercase;color:#a5b4fc;margin-bottom:16px">Portfolio</p>
  <h1>${info.name || ''}</h1>
  <p class="title">${info.title || ''}</p>
  <p class="summary">${info.summary || data.about || ''}</p>
  <div style="margin-top:24px;display:flex;gap:16px">
    ${info.github ? `<a href="https://${info.github}" style="color:#c7d2fe;font-size:0.875rem">GitHub</a>` : ''}
    ${info.linkedin ? `<a href="https://${info.linkedin}" style="color:#c7d2fe;font-size:0.875rem">LinkedIn</a>` : ''}
    ${info.email ? `<a href="mailto:${info.email}" style="color:#c7d2fe;font-size:0.875rem">${info.email}</a>` : ''}
  </div>
</div>
${skills.length ? `
<div class="section">
  <h2>Skills</h2>
  <div class="skills">${skills.map(s => `<span class="skill">${s}</span>`).join('')}</div>
</div>` : ''}
${projects.length ? `
<div class="section" style="background:#f9fafb">
  <h2>Projects</h2>
  ${projects.map(p => `
  <div class="project">
    <h3>${p.name}</h3>
    <p>${p.description}</p>
    ${p.highlights ? `<p style="color:#4f46e5;margin-top:8px;font-size:0.8rem">${p.highlights}</p>` : ''}
    <div class="tags">${(p.technologies || []).map(t => `<span class="tag">${t}</span>`).join('')}</div>
    <div style="margin-top:12px;display:flex;gap:12px">
      ${p.github ? `<a href="https://${p.github}" style="font-size:0.8rem">GitHub →</a>` : ''}
      ${p.demo ? `<a href="https://${p.demo}" style="font-size:0.8rem">Live Demo →</a>` : ''}
    </div>
  </div>`).join('')}
</div>` : ''}
<footer>Built with ✦ PortfolioForge · ${new Date().getFullYear()}</footer>
</body>
</html>`;
}
