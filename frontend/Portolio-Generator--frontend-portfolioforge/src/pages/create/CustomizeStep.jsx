import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';
import { Check, ArrowLeft, ArrowRight } from 'lucide-react';
import { THEMES } from '../../data/mockData';

export default function CustomizeStep() {
  const navigate = useNavigate();
  const { selectedTheme, setSelectedTheme, appearance, setAppearance, enabledSections, setEnabledSections } = usePortfolio();

  const sectionsList = ['About', 'Skills', 'Education', 'Experience', 'Projects', 'Certifications', 'Achievements', 'Contact'];
  const colors = [
    { name: 'indigo', value: '#4F46E5' },
    { name: 'blue', value: '#2563EB' },
    { name: 'violet', value: '#7C3AED' },
    { name: 'rose', value: '#E11D48' },
    { name: 'teal', value: '#0D9488' }
  ];
  const fonts = ['Inter', 'Roboto', 'Poppins', 'Geist'];

  const toggleSection = (sec) => {
    const key = sec.toLowerCase();
    setEnabledSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderThemePreview = (themeId) => {
    switch (themeId) {
      case 'brutalist': return <div className="h-28 rounded-xl overflow-hidden mb-3 bg-black flex items-center justify-center"><span style={{fontFamily:'Arial Black', fontSize:28, color:'white', fontWeight:900, textTransform:'uppercase', letterSpacing:-1}}>NAME</span></div>;
      case 'bento': return <div className="h-28 rounded-xl overflow-hidden mb-3 bg-gray-100 p-2 grid grid-cols-3 gap-2"><div className="bg-indigo-200 rounded-lg"></div><div className="col-span-2 bg-blue-200 rounded-lg"></div><div className="col-span-3 bg-white rounded-lg h-10"></div></div>;
      case 'minimal': return <div className="h-28 rounded-xl overflow-hidden mb-3 bg-white flex flex-col items-center justify-center gap-2 border border-gray-100"><span className="font-serif italic text-xl">Name</span></div>;
      case 'spatial': return <div className="h-28 rounded-xl overflow-hidden mb-3 bg-gradient-to-br from-slate-100 to-blue-100 flex items-center justify-center"><div className="w-20 h-10 bg-white shadow-xl rounded-xl"></div></div>;
      case 'glassmorphic': return <div className="h-28 rounded-xl overflow-hidden mb-3 bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center"><div className="w-24 h-12 bg-white/20 backdrop-blur-md rounded-xl border border-white/30"></div></div>;
      case 'futuristic': return <div className="h-28 rounded-xl overflow-hidden mb-3 bg-black p-3 text-green-500 font-mono text-xs flex flex-col justify-end"><div>{'> USER.PROFILE'}</div><div>{'> SKILLS[]'}</div></div>;
      default: return <div className="h-28 bg-gray-200 rounded-xl mb-3"></div>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Choose Your Portfolio Theme</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {THEMES.map(theme => (
            <div 
              key={theme.id} 
              onClick={() => setSelectedTheme(theme.id)}
              className={`relative cursor-pointer bg-white dark:bg-gray-800 rounded-2xl border p-4 shadow-sm transition-all ${selectedTheme === theme.id ? 'ring-2 ring-indigo-600 border-indigo-600' : 'border-gray-100 dark:border-gray-800 hover:border-gray-300'}`}
            >
              {selectedTheme === theme.id && <div className="absolute top-2 right-2 bg-indigo-600 text-white rounded-full p-1 z-10"><Check size={14} /></div>}
              {renderThemePreview(theme.id)}
              <h3 className="font-semibold">{theme.name}</h3>
              <p className="text-xs text-gray-500 line-clamp-2">{theme.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
        <h2 className="text-xl font-bold mb-6">Portfolio Settings</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-3">Theme Mode</label>
            <div className="flex gap-2">
              <button onClick={() => setAppearance({...appearance, mode: 'light'})} className={`px-4 py-2 rounded-xl text-sm font-medium ${appearance.mode === 'light' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}>Light</button>
              <button onClick={() => setAppearance({...appearance, mode: 'dark'})} className={`px-4 py-2 rounded-xl text-sm font-medium ${appearance.mode === 'dark' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}>Dark</button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Accent Color</label>
            <div className="flex gap-3">
              {colors.map(c => (
                <button 
                  key={c.name} 
                  onClick={() => setAppearance({...appearance, accent: c.value})}
                  className={`w-8 h-8 rounded-full ${appearance.accent === c.value ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-500' : ''}`}
                  style={{ backgroundColor: c.value }}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Typography</label>
            <div className="flex flex-wrap gap-2">
              {fonts.map(f => (
                <button 
                  key={f}
                  onClick={() => setAppearance({...appearance, font: f})}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${appearance.font === f ? 'bg-indigo-50 border-indigo-600 text-indigo-700 dark:bg-indigo-900/30' : 'border-gray-200 text-gray-600 hover:border-indigo-300 dark:border-gray-700 dark:text-gray-300'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Sections to Include</label>
            <div className="flex flex-wrap gap-2">
              {sectionsList.map(sec => {
                const isEnabled = enabledSections[sec.toLowerCase()] !== false;
                return (
                  <button 
                    key={sec}
                    onClick={() => toggleSection(sec)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${isEnabled ? 'bg-indigo-50 border-indigo-600 text-indigo-700 dark:bg-indigo-900/30' : 'border-gray-200 text-gray-400 dark:border-gray-700'}`}
                  >
                    {sec} {isEnabled && <Check size={14} className="inline ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
        <button onClick={() => navigate('/create/review')} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl px-5 py-2.5 text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
          <ArrowLeft size={16} /> Back
        </button>
        <button onClick={() => navigate('/create/generate')} className="bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl px-5 py-2.5 text-sm font-semibold flex items-center gap-2">
          Continue <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
