import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';
import { useApp } from '../../context/AppContext';
import { ArrowRight, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import { mockGeneratedPrompt, mockGeneratedJSON } from '../../data/mockData';
import aiService from '../../services/aiService';

const STAGES = [
  { label: 'Reading resume', delay: 700 },
  { label: 'Cleaning text', delay: 600 },
  { label: 'Extracting information', delay: 800 },
  { label: 'Checking missing sections', delay: 700 },
  { label: 'Generating Gemini prompt', delay: 1200 },
  { label: 'Generating structured JSON', delay: 2000 },
  { label: 'Creating HTML portfolio', delay: 1500 },
  { label: 'Finalizing portfolio', delay: 600 },
];

export default function GenerateStep() {
  const navigate = useNavigate();
  const { portfolioData, setGeneratedJSON } = usePortfolio();
  const [stageIdx, setStageIdx] = useState(0);
  const [done, setDone] = useState(false);
  const [promptOpen, setPromptOpen] = useState(false);
  const [jsonOpen, setJsonOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [finalPayload, setFinalPayload] = useState(null);

  useEffect(() => {
    let currentIdx = 0;
    const runStage = () => {
      if (currentIdx >= STAGES.length) {
        setDone(true);
        const dynamicPayload = {
          ...portfolioData,
          name: portfolioData.personalInfo?.name || portfolioData.name || 'Your Name',
          title: portfolioData.personalInfo?.title || portfolioData.title || 'Software Developer',
          email: portfolioData.personalInfo?.email || portfolioData.email || '',
          phone: portfolioData.personalInfo?.phone || portfolioData.phone || '',
          location: portfolioData.personalInfo?.location || portfolioData.location || '',
          about: portfolioData.personalInfo?.summary || portfolioData.personalInfo?.about || portfolioData.about || '',
          profileImage: portfolioData.personalInfo?.profileImage || portfolioData.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400',
          skills: portfolioData.skills || [],
          education: portfolioData.education || [],
          experience: portfolioData.experience || [],
          projects: portfolioData.projects || [],
          certifications: portfolioData.certifications || [],
          achievements: portfolioData.achievements || [],
        };
        setFinalPayload(dynamicPayload);
        setGeneratedJSON(dynamicPayload);
        return;
      }
      setTimeout(() => {
        currentIdx++;
        setStageIdx(currentIdx);
        runStage();
      }, STAGES[currentIdx].delay);
    };
    runStage();
  }, [portfolioData, setGeneratedJSON]);

  const progressPercent = Math.min((stageIdx / STAGES.length) * 100, 100);

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 space-y-8">
      {done ? (
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} />
          </div>
          <h2 className="text-3xl font-bold">🎉 Portfolio Generated Successfully!</h2>
          <p className="text-gray-500">Your AI-powered portfolio is ready to preview.</p>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-8 text-center">Generating Your Portfolio...</h2>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-8">
            <div className="bg-indigo-600 h-2 rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
          </div>

          <div className="space-y-4 mb-8">
            {STAGES.map((stage, idx) => {
              const isPast = stageIdx > idx;
              const isActive = stageIdx === idx;
              
              return (
                <div key={idx} className={`flex items-center gap-4 ${isPast || isActive ? 'opacity-100' : 'opacity-40'}`}>
                  <div className="w-6 h-6 flex items-center justify-center shrink-0">
                    {isPast ? (
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white"><Check size={12} /></div>
                    ) : isActive ? (
                      <div className="w-3 h-3 bg-indigo-600 rounded-full animate-ping"></div>
                    ) : (
                      <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    )}
                  </div>
                  <span className={`text-sm font-medium ${isActive ? 'text-indigo-600 dark:text-indigo-400' : ''}`}>{stage.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {stageIdx > 4 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="p-4 flex items-center justify-between cursor-pointer bg-gray-50 dark:bg-gray-900" onClick={() => setPromptOpen(!promptOpen)}>
            <span className="font-semibold text-sm">Generated AI Prompt</span>
            {promptOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          {promptOpen && (
            <div className="p-4 bg-gray-900 text-gray-300 text-xs font-mono overflow-auto max-h-60">
              <pre>{mockGeneratedPrompt}</pre>
            </div>
          )}
        </div>
      )}

      {stageIdx > 5 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="p-4 flex items-center justify-between cursor-pointer bg-gray-50 dark:bg-gray-900" onClick={() => setJsonOpen(!jsonOpen)}>
            <span className="font-semibold text-sm">Generated JSON Structure</span>
            {jsonOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          {jsonOpen && (
            <div className="p-4 bg-gray-900 text-gray-300 text-xs font-mono overflow-auto max-h-60 relative">
              <button 
                onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(JSON.stringify(finalPayload || mockGeneratedJSON, null, 2)); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                className="absolute top-2 right-2 p-2 bg-gray-800 rounded text-white hover:bg-gray-700"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
              <pre>{JSON.stringify(finalPayload || mockGeneratedJSON, null, 2)}</pre>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
        <button disabled={!done} onClick={() => navigate('/create/customize')} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl px-5 py-2.5 text-sm font-medium hover:bg-gray-50 disabled:opacity-50 flex items-center gap-2">
          <ArrowLeft size={16} /> Back
        </button>
        <button disabled={!done} onClick={() => navigate('/create/preview')} className="bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl px-5 py-2.5 text-sm font-semibold disabled:opacity-50 flex items-center gap-2">
          View Your Portfolio <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
