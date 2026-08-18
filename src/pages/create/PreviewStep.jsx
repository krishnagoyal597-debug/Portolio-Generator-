import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';
import { useApp } from '../../context/AppContext';
import { Edit3, Layers, RefreshCw, Link2, Download, ExternalLink, ChevronDown, ChevronUp, CheckCircle, X } from 'lucide-react';
import { mockGeneratedJSON, THEMES } from '../../data/mockData';
import PortfolioRenderer from '../../themes/PortfolioRenderer';

export default function PreviewStep() {
  const navigate = useNavigate();
  const { selectedTheme, setSelectedTheme } = usePortfolio();
  const { addToast } = useApp();
  const [jsonOpen, setJsonOpen] = useState(false);
  const [exportModal, setExportModal] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://anshikabansal.portfolioforge.app');
    addToast('Link copied to clipboard', 'success');
  };

  const handleDownloadHtml = () => {
    const html = `<!DOCTYPE html><html><head><title>${mockGeneratedJSON.personalInfo?.name || 'Portfolio'}</title></head><body><h1>${mockGeneratedJSON.personalInfo?.name || ''}</h1><p>${mockGeneratedJSON.personalInfo?.title || ''}</p></body></html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio.html';
    a.click();
    URL.revokeObjectURL(url);
    setExportModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 flex flex-col lg:flex-row gap-8">
      
      {/* Left: Preview */}
      <div className="w-full lg:w-3/5 flex flex-col gap-4">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden flex flex-col">
          {/* Browser Chrome */}
          <div className="bg-gray-200 dark:bg-gray-700 px-4 py-2 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg px-3 py-1 text-xs text-gray-400 font-mono mx-3 flex items-center">
              anshikabansal.portfolioforge.app
            </div>
          </div>
          {/* Content */}
          <div className="h-[500px] overflow-y-auto bg-white dark:bg-gray-900 relative">
            <PortfolioRenderer data={mockGeneratedJSON} theme={selectedTheme} />
          </div>
        </div>

        {/* Theme Switcher */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar justify-center">
          {THEMES.map(theme => (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${selectedTheme === theme.id ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 border border-gray-200 dark:border-gray-700'}`}
            >
              {theme.name}
            </button>
          ))}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="w-full lg:w-2/5 space-y-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="text-green-500" size={28} />
            <h2 className="text-2xl font-bold">Portfolio Ready!</h2>
          </div>
          
          <div className="space-y-3">
            <button onClick={() => navigate('/create/review')} className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl px-5 py-2.5 text-sm font-medium hover:bg-gray-50 flex items-center gap-2 justify-center">
              <Edit3 size={16} /> Edit Content
            </button>
            <button onClick={() => navigate('/create/customize')} className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl px-5 py-2.5 text-sm font-medium hover:bg-gray-50 flex items-center gap-2 justify-center">
              <Layers size={16} /> Change Theme
            </button>
            <button onClick={() => navigate('/create/generate')} className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl px-5 py-2.5 text-sm font-medium hover:bg-gray-50 flex items-center gap-2 justify-center">
              <RefreshCw size={16} /> Regenerate
            </button>
            <button onClick={handleCopyLink} className="w-full bg-indigo-50 text-indigo-700 border border-indigo-100 dark:bg-indigo-900/30 dark:border-indigo-800 dark:text-indigo-300 rounded-xl px-5 py-2.5 text-sm font-medium hover:bg-indigo-100 flex items-center gap-2 justify-center">
              <Link2 size={16} /> Copy Link
            </button>
            <button onClick={() => setExportModal(true)} className="w-full bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl px-5 py-2.5 text-sm font-semibold flex items-center gap-2 justify-center">
              <Download size={16} /> Export HTML
            </button>
            <button onClick={() => navigate('/portfolio/preview')} className="w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 rounded-xl px-5 py-2.5 text-sm font-semibold flex items-center gap-2 justify-center">
              <ExternalLink size={16} /> View Full Portfolio
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="p-4 flex items-center justify-between cursor-pointer bg-gray-50 dark:bg-gray-900" onClick={() => setJsonOpen(!jsonOpen)}>
            <span className="font-semibold text-sm">View JSON Data</span>
            {jsonOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          {jsonOpen && (
            <div className="p-4 bg-gray-900 text-gray-300 text-xs font-mono overflow-auto max-h-60">
              <pre>{JSON.stringify(mockGeneratedJSON, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>

      {/* Export Modal */}
      {exportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl relative">
            <button onClick={() => setExportModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"><X size={20} /></button>
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
              <Download size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Export Portfolio</h3>
            <p className="text-sm text-gray-500 mb-6">Download a standalone HTML file of your portfolio that you can host anywhere.</p>
            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border border-gray-200 dark:border-gray-700 mb-6 flex justify-between items-center text-sm">
              <span className="font-mono text-gray-600 dark:text-gray-400">portfolio.html</span>
              <span className="text-gray-400">~45KB</span>
            </div>
            <button onClick={handleDownloadHtml} className="w-full bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl px-5 py-2.5 text-sm font-semibold flex items-center gap-2 justify-center">
              Download File
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
