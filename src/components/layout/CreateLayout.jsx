import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Check, Sparkles } from 'lucide-react';

const STEPS = [
  { label: 'Upload', path: '/create/upload' },
  { label: 'Analyze', path: '/create/analysis' },
  { label: 'Review', path: '/create/review' },
  { label: 'Customize', path: '/create/customize' },
  { label: 'Generate', path: '/create/generate' },
  { label: 'Preview', path: '/create/preview' },
];

export default function CreateLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentIdx = STEPS.findIndex(s => location.pathname === s.path);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-4 h-14 flex items-center justify-between flex-shrink-0">
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center"><Sparkles size={11} className="text-white" /></div>
          <span className="font-bold text-sm text-gray-900 dark:text-gray-100 hidden sm:block">PortfolioForge</span>
        </button>

        {/* Stepper */}
        <div className="flex items-center gap-1 sm:gap-2">
          {STEPS.map((step, i) => {
            const done = i < currentIdx;
            const active = i === currentIdx;
            return (
              <React.Fragment key={step.path}>
                <div className={`flex items-center gap-1.5 ${i > currentIdx + 1 ? 'hidden sm:flex' : 'flex'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all flex-shrink-0
                    ${done ? 'bg-indigo-600 text-white' : active ? 'bg-indigo-600 text-white ring-2 ring-indigo-200 dark:ring-indigo-800' : 'bg-gray-100 dark:bg-gray-700 text-gray-400'}`}>
                    {done ? <Check size={12} /> : i + 1}
                  </div>
                  <span className={`text-xs font-medium hidden md:block ${active ? 'text-indigo-600 dark:text-indigo-400' : done ? 'text-gray-600 dark:text-gray-300' : 'text-gray-300 dark:text-gray-600'}`}>
                    {step.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`w-4 sm:w-6 h-px flex-shrink-0 ${done ? 'bg-indigo-400' : 'bg-gray-200 dark:bg-gray-700'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div className="w-24 hidden sm:block" /> {/* balance spacer */}
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 py-8 pb-20 animate-fade-in" key={location.pathname}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
