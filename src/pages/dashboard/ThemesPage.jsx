import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { THEMES } from '../../data/mockData';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { Palette, Eye, ArrowRight } from 'lucide-react';

const ThemesPage = () => {
  const navigate = useNavigate();
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(null);

  const openPreview = (theme) => {
    setSelectedTheme(theme);
    setPreviewModalOpen(true);
  };

  // Helper to render the inline CSS preview based on theme ID
  const renderThemePreview = (themeId) => {
    switch (themeId) {
      case 'brutalist':
        return (
          <div className="h-full bg-white p-4 relative group flex flex-col justify-center">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
             <div className="border-4 border-black p-4 flex flex-col justify-center bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-3xl font-black uppercase text-black leading-none tracking-tighter">DEV<br/>WORKS.</h3>
                <div className="mt-2 bg-yellow-400 border-2 border-black text-black text-xs inline-block px-2 py-1 font-bold">2024</div>
             </div>
          </div>
        );
      case 'bento':
        return (
          <div className="h-full bg-slate-100 dark:bg-slate-800 p-4 relative flex gap-2">
             <div className="w-1/2 flex flex-col gap-2">
               <div className="flex-1 bg-white dark:bg-gray-700 rounded-xl shadow-sm p-3 flex flex-col justify-center">
                 <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 mb-2"></div>
                 <div className="h-2 w-12 bg-gray-200 dark:bg-gray-600 rounded"></div>
               </div>
               <div className="h-10 bg-indigo-500 rounded-xl shadow-sm"></div>
             </div>
             <div className="w-1/2 flex flex-col gap-2">
               <div className="h-12 bg-emerald-400 rounded-xl shadow-sm"></div>
               <div className="flex-1 bg-white dark:bg-gray-700 rounded-xl shadow-sm p-3">
                 <div className="h-2 w-full bg-gray-100 dark:bg-gray-600 rounded mb-2"></div>
                 <div className="h-2 w-3/4 bg-gray-100 dark:bg-gray-600 rounded mb-2"></div>
               </div>
             </div>
          </div>
        );
      case 'minimal':
        return (
           <div className="h-full bg-white border border-gray-100 p-8 relative flex flex-col justify-center items-center">
             <div className="w-full max-w-[200px] border-b border-gray-200 pb-4 text-center">
               <h3 className="text-2xl font-serif italic text-gray-900 tracking-wider">Jane Doe</h3>
               <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 mt-2">Portfolio</p>
             </div>
          </div>
        );
      case 'spatial':
        return (
          <div className="h-full bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-indigo-950 dark:to-blue-900 p-6 relative flex items-center justify-center">
             <div className="w-3/4 h-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 dark:border-gray-700/50 p-4 transform -rotate-2">
                <div className="h-3 w-1/3 bg-gray-200 dark:bg-gray-600 rounded-full mb-3"></div>
                <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full mb-2"></div>
                <div className="h-1.5 w-3/4 bg-gray-100 dark:bg-gray-700 rounded-full"></div>
             </div>
          </div>
        );
      case 'glassmorphic':
        return (
          <div className="h-full bg-gradient-to-r from-fuchsia-600 to-purple-600 p-6 relative flex items-center justify-center overflow-hidden">
             <div className="absolute top-2 left-2 w-16 h-16 bg-yellow-400 rounded-full mix-blend-screen filter blur-xl opacity-70"></div>
             <div className="absolute bottom-2 right-2 w-20 h-20 bg-blue-400 rounded-full mix-blend-screen filter blur-xl opacity-70"></div>
             <div className="relative w-4/5 h-20 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-3 text-white shadow-xl flex flex-col justify-center">
                <div className="text-base font-bold">Hello World</div>
                <div className="text-[10px] text-white/70 mt-1">Glass UI</div>
             </div>
          </div>
        );
      case 'futuristic':
        return (
          <div className="h-full bg-gray-950 p-4 relative font-mono overflow-hidden flex flex-col justify-center">
             <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none"></div>
             <p className="text-green-500/70 text-[10px]">{`> init profile.sh`}</p>
             <h3 className="text-green-400 text-lg font-bold mt-1">{`USER_DATA`}</h3>
             <div className="mt-2 border-l-2 border-green-500/30 pl-2">
               <div className="h-1 w-16 bg-green-500/40 mb-1"></div>
               <div className="h-1 w-20 bg-green-500/20"></div>
             </div>
          </div>
        );
      default:
        return <div className="h-full bg-indigo-100 dark:bg-indigo-900"></div>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Palette className="text-indigo-500" size={28}/> Portfolio Themes
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-2xl">
            Choose a visual identity for your portfolio. All themes are responsive, accessible, and designed to make your professional experience stand out.
          </p>
        </div>
      </div>

      {/* Themes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {THEMES.map((theme) => (
          <Card key={theme.id} padding="none" className="overflow-hidden flex flex-col h-full border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow group">
            {/* Visual Preview */}
            <div className="h-40 border-b border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer" onClick={() => openPreview(theme)}>
              {renderThemePreview(theme.id)}
            </div>
            
            {/* Info */}
            <div className="p-5 flex-1 flex flex-col">
              <div className="mb-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{theme.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                  {theme.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-3 mb-6">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 uppercase tracking-wider">
                  Layout
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 uppercase tracking-wider">
                  Pro
                </span>
              </div>

              {/* Actions */}
              <div className="mt-auto flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-700/50">
                <Button variant="secondary" className="flex-1" onClick={() => openPreview(theme)} icon={<Eye size={16}/>}>
                  Preview
                </Button>
                <Button variant="primary" className="flex-1" onClick={() => navigate('/create/upload')} iconRight={<ArrowRight size={16}/>}>
                  Use Theme
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Theme Preview Modal */}
      <Modal isOpen={previewModalOpen} onClose={() => setPreviewModalOpen(false)} title={`Preview: ${selectedTheme?.name}`} size="lg">
        {selectedTheme && (
          <div className="p-6 pt-2 flex flex-col">
            <p className="text-gray-600 dark:text-gray-300 mb-6">{selectedTheme.description}</p>
            
            <div className="h-80 w-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 mb-6 shadow-inner">
               {renderThemePreview(selectedTheme.id)}
            </div>
            
            <div className="flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setPreviewModalOpen(false)}>Close</Button>
              <Button variant="primary" onClick={() => navigate('/create/upload')}>
                Create Portfolio with {selectedTheme.name}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ThemesPage;
