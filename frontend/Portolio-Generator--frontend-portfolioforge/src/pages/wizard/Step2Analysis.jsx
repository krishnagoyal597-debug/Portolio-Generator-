import React, { useEffect, useState } from 'react';
import { ArrowRight, ArrowLeft, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ScoreCircle } from '../../components/ui/ProgressBar';
import StatusBadge from '../../components/ui/StatusBadge';
import Button from '../../components/ui/Button';
import { mockAnalysisResult } from '../../data/mockData';

// Loading pipeline stages
const LOADING_STAGES = [
  'Reading file',
  'Extracting information',
  'Checking content',
  'Generating recommendations',
];

export default function Step2Analysis() {
  const { nextStep, prevStep } = usePortfolio();
  const [loading, setLoading] = useState(true);
  const [loadingStage, setLoadingStage] = useState(0);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    let stage = 0;
    const tick = () => {
      stage++;
      setLoadingStage(stage);
      if (stage < LOADING_STAGES.length) {
        setTimeout(tick, 600);
      } else {
        setTimeout(() => setLoading(false), 400);
      }
    };
    setTimeout(tick, 600);
  }, []);

  const toggleExpand = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Analyzing Resume...</h1>
          <p className="text-gray-500 dark:text-gray-400">Please wait while we process your resume.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-8 shadow-card">
          <div className="space-y-4">
            {LOADING_STAGES.map((stage, i) => {
              const done = i < loadingStage;
              const active = i === loadingStage;
              return (
                <div key={stage} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold transition-colors duration-300
                    ${done ? 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400' : ''}
                    ${active ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400 pipeline-active' : ''}
                    ${!done && !active ? 'bg-gray-100 text-gray-300 dark:bg-gray-700 dark:text-gray-500' : ''}
                  `}>
                    {done ? '✓' : active ? (
                      <span className="flex gap-0.5">
                        <span className="loading-dot w-1.5 h-1.5 rounded-full bg-current" />
                        <span className="loading-dot w-1.5 h-1.5 rounded-full bg-current" />
                        <span className="loading-dot w-1.5 h-1.5 rounded-full bg-current" />
                      </span>
                    ) : '○'}
                  </div>
                  <span className={`text-sm transition-colors duration-300
                    ${done ? 'text-green-700 dark:text-green-400 font-medium' : ''}
                    ${active ? 'text-indigo-700 dark:text-indigo-400 font-medium' : ''}
                    ${!done && !active ? 'text-gray-400 dark:text-gray-500' : ''}
                  `}>
                    {stage}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const { score, sections, improvements } = mockAnalysisResult;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Resume Analysis</h1>
        <p className="text-gray-500 dark:text-gray-400">Here's what we found in your resume.</p>
      </div>

      {/* Score card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-card mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <ScoreCircle score={score} />
          <div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {score >= 80 ? 'Great resume!' : score >= 55 ? 'Good start!' : 'Needs improvement'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-md">
              Your resume contains most of the important information, but a few sections could be improved.
            </p>
            <div className="flex gap-3 mt-4 text-xs">
              <span className="flex items-center gap-1 text-green-600"><span className="w-2 h-2 rounded-full bg-green-500" /> Complete</span>
              <span className="flex items-center gap-1 text-amber-600"><span className="w-2 h-2 rounded-full bg-amber-500" /> Needs Work</span>
              <span className="flex items-center gap-1 text-red-600"><span className="w-2 h-2 rounded-full bg-red-500" /> Missing</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {sections.map(s => (
          <div
            key={s.id}
            className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-card"
          >
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{s.label}</span>
            <StatusBadge status={s.status} />
          </div>
        ))}
      </div>

      {/* Improvements */}
      {improvements.length > 0 && (
        <div className="mb-8">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Areas That Need Improvement</h2>
          <div className="space-y-3">
            {improvements.map(imp => (
              <div
                key={imp.section}
                className={`rounded-xl border overflow-hidden
                  ${imp.severity === 'missing'
                    ? 'border-red-200 dark:border-red-700/50 bg-red-50 dark:bg-red-900/10'
                    : 'border-amber-200 dark:border-amber-700/50 bg-amber-50 dark:bg-amber-900/10'
                  }
                `}
              >
                <button
                  onClick={() => toggleExpand(imp.section)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left"
                >
                  <div className="flex items-center gap-2">
                    <StatusBadge status={imp.severity === 'missing' ? 'missing' : 'warning'} showLabel={false} />
                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{imp.section}</span>
                    <span className={`text-xs ${imp.severity === 'missing' ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400'}`}>
                      — {imp.message}
                    </span>
                  </div>
                  {expanded[imp.section] ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                </button>
                {expanded[imp.section] && (
                  <div className="px-4 pb-4 border-t border-black/5 dark:border-white/5 pt-3">
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                      <strong>Recommendation:</strong> {imp.recommendation}
                    </p>
                    <Button size="sm" variant="secondary" icon={<Plus size={13} />}>
                      Add Details
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notice */}
      <div className="mb-8 p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 text-sm text-indigo-700 dark:text-indigo-300">
        ℹ️ You can continue even if some sections are missing. You'll be able to add this information in the next step.
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <Button variant="secondary" icon={<ArrowLeft size={16} />} onClick={prevStep}>Back</Button>
        <Button fullWidth iconRight={<ArrowRight size={16} />} onClick={nextStep}>
          Review & Edit Information
        </Button>
      </div>
    </div>
  );
}
