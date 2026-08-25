import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import PortfolioPreview from '../components/portfolio/PortfolioPreview';
import Button from '../components/ui/Button';
import { usePortfolio } from '../context/PortfolioContext';
import { mockGeneratedJSON } from '../data/mockData';

export default function FullPortfolioPage() {
  const navigate = useNavigate();
  const { generatedJSON, selectedTemplate } = usePortfolio();
  const data = generatedJSON || mockGeneratedJSON;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-950">
      {/* Top bar */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Full Portfolio Preview</span>
        <div className="flex gap-2">
          <Button size="sm" variant="secondary" icon={<Share2 size={14} />}>Share</Button>
          <Button size="sm" icon={<Download size={14} />}>Download</Button>
        </div>
      </div>

      {/* Full portfolio */}
      <div className="flex-1 max-w-4xl mx-auto w-full my-6 px-4">
        <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700">
          <PortfolioPreview data={data} template={selectedTemplate || 'modern'} />
        </div>
      </div>
    </div>
  );
}
