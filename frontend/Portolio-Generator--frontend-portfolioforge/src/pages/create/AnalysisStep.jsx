import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, ChevronDown, ChevronUp, Plus, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { mockAnalysisResult } from '../../data/mockData';
import StatusBadge from '../../components/ui/StatusBadge';
import { usePortfolio } from '../../context/PortfolioContext';
import resumeService from '../../services/resumeService';

function ScoreCircle({ score }) {
  const r = 44, c = 2 * Math.PI * r;
  const dash = (score / 100) * c;
  const color = score >= 80 ? '#22c55e' : score >= 55 ? '#f59e0b' : '#ef4444';
  return (
    <div className="flex flex-col items-center">
      <svg width="110" height="110" viewBox="0 0 110 110">
        <circle cx="55" cy="55" r={r} fill="none" stroke="#e5e7eb" strokeWidth="8" />
        <circle cx="55" cy="55" r={r} fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={`${dash} ${c}`} strokeLinecap="round"
          transform="rotate(-90 55 55)" style={{ transition: 'stroke-dasharray 1s ease' }} />
        <text x="55" y="60" textAnchor="middle" fontSize="22" fontWeight="700" fill={color}>{score}</text>
        <text x="55" y="74" textAnchor="middle" fontSize="10" fill="#9ca3af">/ 100</text>
      </svg>
      <p className="text-xs font-medium text-gray-500 mt-1">{score >= 80 ? 'Great!' : score >= 55 ? 'Good start' : 'Needs work'}</p>
    </div>
  );
}

export default function AnalysisStep() {
  const navigate = useNavigate();
  const { resumeId } = usePortfolio();
  const [loading, setLoading] = useState(true);
  const [stage, setStage] = useState(0);
  const [analysisData, setAnalysisData] = useState(mockAnalysisResult);
  const [expanded, setExpanded] = useState({});
  const stages = ['Reading file', 'Extracting information', 'Checking sections', 'Generating analysis'];

  useEffect(() => {
    let i = 0;
    const tick = async () => {
      i++;
      setStage(i);
      if (i < stages.length) {
        setTimeout(tick, 500);
      } else {
        try {
          if (resumeId) {
            const data = await resumeService.analyzeResume(resumeId);
            if (data && data.score) setAnalysisData(data);
          }
        } catch (err) {
          // Fallback to default
        }
        setTimeout(() => setLoading(false), 300);
      }
    };
    setTimeout(tick, 400);
  }, [resumeId]);

  if (loading) return (
    <div>
      <div className="mb-8"><h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Analyzing Resume…</h1><p className="text-gray-500 dark:text-gray-400">Please wait while we process your resume.</p></div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 shadow-sm">
        <div className="space-y-4">
          {stages.map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0
                ${i < stage ? 'bg-green-100 text-green-600' : i === stage ? 'bg-indigo-100 text-indigo-600 animate-pulse' : 'bg-gray-100 text-gray-300'}`}>
                {i < stage ? '✓' : i + 1}
              </div>
              <span className={`text-sm ${i < stage ? 'text-green-700 font-medium' : i === stage ? 'text-indigo-700 font-medium' : 'text-gray-400'}`}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const { score, sections, improvements } = analysisData || mockAnalysisResult;
  return (
    <div>
      <div className="mb-8"><h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Resume Analysis</h1><p className="text-gray-500 dark:text-gray-400">Here's what we found in your resume.</p></div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm mb-6 flex flex-col sm:flex-row items-center gap-6">
        <ScoreCircle score={score} />
        <div><p className="text-base font-semibold text-gray-900 dark:text-white mb-1">Resume Score: {score}/100</p><p className="text-sm text-gray-500 dark:text-gray-400">Your resume has most key sections but some areas need improvement.</p><div className="flex gap-3 mt-3 text-xs"><span className="flex items-center gap-1 text-green-600"><span className="w-2 h-2 rounded-full bg-green-500" />Complete</span><span className="flex items-center gap-1 text-amber-600"><span className="w-2 h-2 rounded-full bg-amber-500" />Needs Work</span><span className="flex items-center gap-1 text-red-600"><span className="w-2 h-2 rounded-full bg-red-500" />Missing</span></div></div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-8">
        {sections.map(s => (
          <div key={s.id} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{s.label}</span>
            <StatusBadge status={s.status} />
          </div>
        ))}
      </div>
      {improvements.length > 0 && (
        <div className="mb-8">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Areas That Need Improvement</h2>
          <div className="space-y-3">
            {improvements.map(imp => (
              <div key={imp.section} className={`rounded-xl border overflow-hidden ${imp.severity === 'missing' ? 'border-red-200 dark:border-red-700/50 bg-red-50 dark:bg-red-900/10' : 'border-amber-200 dark:border-amber-700/50 bg-amber-50 dark:bg-amber-900/10'}`}>
                <button onClick={() => setExpanded(p => ({ ...p, [imp.section]: !p[imp.section] }))} className="w-full flex items-center justify-between px-4 py-3 text-left">
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{imp.section} — <span className="font-normal text-gray-600 dark:text-gray-400">{imp.message}</span></span>
                  {expanded[imp.section] ? <ChevronUp size={15} className="text-gray-400" /> : <ChevronDown size={15} className="text-gray-400" />}
                </button>
                {expanded[imp.section] && (
                  <div className="px-4 pb-4 border-t border-black/5 dark:border-white/5 pt-3">
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-3"><strong>Recommendation:</strong> {imp.recommendation}</p>
                    <button onClick={() => navigate('/create/review')} className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1.5"><Plus size={12} /> Add Information</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="mb-8 p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 text-sm text-indigo-700 dark:text-indigo-300">
        ℹ️ You can continue even with missing sections — add info in the next step.
      </div>
      <div className="flex gap-3">
        <button onClick={() => navigate('/create/upload')} className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors"><ArrowLeft size={15} /> Back</button>
        <button onClick={() => navigate('/create/review')} className="flex-1 flex items-center justify-center gap-2 py-2.5 px-5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors">Review & Edit <ArrowRight size={15} /></button>
      </div>
    </div>
  );
}
