import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Download, Share2, Sparkles } from 'lucide-react';
import PortfolioRenderer from '../../themes/PortfolioRenderer';
import { mockGeneratedJSON, THEMES } from '../../data/mockData';
import { usePortfolio } from '../../context/PortfolioContext';
import { useApp } from '../../context/AppContext';

export default function FullPortfolioView() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToast } = useApp();
  const { selectedTheme: ctxTheme, setSelectedTheme: setCtxTheme, generatedJSON, portfolioData } = usePortfolio();
  
  const [selectedTheme, setSelectedTheme] = useState(ctxTheme || 'bento');

  const activeData = generatedJSON || {
    name: portfolioData.personalInfo?.name || mockGeneratedJSON.name,
    title: portfolioData.personalInfo?.title || mockGeneratedJSON.title,
    tagline: portfolioData.personalInfo?.tagline || mockGeneratedJSON.tagline,
    profileImage: portfolioData.personalInfo?.profileImage || mockGeneratedJSON.profileImage,
    email: portfolioData.personalInfo?.email || mockGeneratedJSON.email,
    phone: portfolioData.personalInfo?.phone || mockGeneratedJSON.phone,
    location: portfolioData.personalInfo?.location || mockGeneratedJSON.location,
    linkedin: portfolioData.personalInfo?.linkedin || mockGeneratedJSON.linkedin,
    github: portfolioData.personalInfo?.github || mockGeneratedJSON.github,
    website: portfolioData.personalInfo?.website || mockGeneratedJSON.website,
    about: portfolioData.personalInfo?.summary || portfolioData.personalInfo?.about || mockGeneratedJSON.about,
    skills: portfolioData.skills?.length ? portfolioData.skills : mockGeneratedJSON.skills,
    skillGroups: [
      { category: 'Technical Skills', skills: portfolioData.skills?.length ? portfolioData.skills : mockGeneratedJSON.skills }
    ],
    education: portfolioData.education?.length ? portfolioData.education : mockGeneratedJSON.education,
    experience: portfolioData.experience?.length ? portfolioData.experience : mockGeneratedJSON.experience,
    projects: portfolioData.projects?.length ? portfolioData.projects : mockGeneratedJSON.projects,
    certifications: portfolioData.certifications?.length ? portfolioData.certifications : mockGeneratedJSON.certifications,
    achievements: portfolioData.achievements?.length ? portfolioData.achievements : mockGeneratedJSON.achievements,
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast({ message: 'Link copied to clipboard!', type: 'success' });
  };

  const handleExport = async () => {
    addToast({ message: 'Exporting HTML...', type: 'info' });
    try {
      const response = await fetch('http://localhost:5001/api/portfolios/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme: selectedTheme, portfolioJSON: activeData })
      });
      const htmlText = await response.text();
      const blob = new Blob([htmlText], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${activeData.name || 'portfolio'}.html`;
      a.click();
      URL.revokeObjectURL(url);
      addToast({ message: 'Export complete!', type: 'success' });
    } catch (e) {
      addToast({ message: 'Export failed, try again.', type: 'error' });
    }
  };

  const handleThemeChange = (themeId) => {
    setSelectedTheme(themeId);
    if(setCtxTheme) setCtxTheme(themeId);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 h-14 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm font-medium">
            <ArrowLeft size={18} /> Back
          </button>
        </div>
        
        <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
          <Sparkles size={16} className="text-indigo-500" /> PortfolioForge
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 mr-4 border-r border-gray-300 dark:border-gray-700 pr-4">
            {THEMES?.map(theme => (
              <button
                key={theme.id}
                title={theme.name}
                onClick={() => handleThemeChange(theme.id)}
                className={`w-5 h-5 rounded-full transition-all ${selectedTheme === theme.id ? 'ring-2 ring-offset-1 ring-offset-white dark:ring-offset-gray-900 ring-indigo-600 scale-110' : 'hover:scale-110'}`}
                style={{ backgroundColor: theme.color }}
              />
            ))}
          </div>
          
          <button onClick={handleShare} className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            <Share2 size={18} />
          </button>
          <button onClick={handleExport} className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
            <Download size={16} /> Export HTML
          </button>
          <button onClick={() => window.print()} className="flex items-center gap-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors">
            <Download size={16} /> Save / Print PDF
          </button>
        </div>
      </div>

      <div className="pt-14 h-screen overflow-y-auto">
        <PortfolioRenderer data={activeData} theme={selectedTheme} />
      </div>
    </div>
  );
}
