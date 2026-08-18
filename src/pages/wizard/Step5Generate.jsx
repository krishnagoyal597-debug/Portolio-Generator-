import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp, TerminalSquare } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import CodeEditor from '../../components/ui/CodeEditor';
import Button from '../../components/ui/Button';
import { mockGeneratedPrompt } from '../../data/mockData';

const PIPELINE_STAGES = [
  { label: 'Reading resume',           desc: 'Parsing your uploaded text file' },
  { label: 'Extracting information',   desc: 'Identifying sections and structured data' },
  { label: 'Checking missing sections',desc: 'Validating completeness of your resume' },
  { label: 'Generating AI prompt',     desc: 'Crafting the Gemini prompt from your data' },
  { label: 'Generating portfolio data',desc: 'Calling Gemini API for structured JSON' },
  { label: 'Creating HTML',            desc: 'Rendering your portfolio template' },
  { label: 'Finalizing portfolio',     desc: 'Packaging and optimizing output' },
];

export default function Step5Generate() {
  const { nextStep, prevStep, setGenerationStage, generationStage, finishGeneration } = usePortfolio();
  const [stageIdx, setStageIdx] = useState(0);
  const [done, setDone] = useState(false);
  const [promptOpen, setPromptOpen] = useState(false);

  useEffect(() => {
    let idx = 0;
    const advance = () => {
      idx++;
      setStageIdx(idx);
      setGenerationStage(idx);
      if (idx < PIPELINE_STAGES.length) {
        const delay = idx === 4 ? 2000 : 700; // Gemini call slower
        setTimeout(advance, delay);
      } else {
        setTimeout(() => {
          setDone(true);
          finishGeneration();
        }, 500);
      }
    };
    setTimeout(advance, 800);
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Building Your Portfolio</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {done ? 'Portfolio generated successfully! 🎉' : 'Sit back while we generate your professional portfolio...'}
        </p>
      </div>

      {/* Pipeline */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-card mb-6">
        <div className="space-y-3">
          {PIPELINE_STAGES.map((stage, i) => {
            const stageDone = i < stageIdx;
            const stageActive = i === stageIdx && !done;
            const stagePending = i > stageIdx;

            return (
              <div key={stage.label} className="flex items-start gap-3 group">
                {/* Status indicator */}
                <div className={`
                  mt-0.5 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold transition-all duration-300
                  ${stageDone ? 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400' : ''}
                  ${stageActive ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400 pipeline-active' : ''}
                  ${stagePending ? 'bg-gray-100 text-gray-300 dark:bg-gray-700 dark:text-gray-600' : ''}
                `}>
                  {stageDone && '✓'}
                  {stageActive && (
                    <span className="flex gap-0.5">
                      <span className="loading-dot w-1 h-1 rounded-full bg-current" />
                      <span className="loading-dot w-1 h-1 rounded-full bg-current" />
                      <span className="loading-dot w-1 h-1 rounded-full bg-current" />
                    </span>
                  )}
                  {stagePending && '○'}
                </div>

                {/* Vertical connector */}
                <div className="flex flex-col flex-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium transition-colors duration-300
                      ${stageDone ? 'text-green-700 dark:text-green-400' : ''}
                      ${stageActive ? 'text-indigo-700 dark:text-indigo-400' : ''}
                      ${stagePending ? 'text-gray-400 dark:text-gray-500' : ''}
                    `}>
                      {stage.label}
                    </span>
                    {stageActive && (
                      <span className="text-xs text-indigo-500 dark:text-indigo-400 font-mono animate-pulse">processing...</span>
                    )}
                    {stageDone && (
                      <span className="text-xs text-green-500 font-mono">done</span>
                    )}
                  </div>
                  {(stageActive || stageDone) && (
                    <p className="text-xs text-gray-400 mt-0.5">{stage.desc}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="mt-6 pt-4 border-t border-gray-50 dark:border-gray-700">
          <div className="flex justify-between text-xs text-gray-400 mb-1.5">
            <span>{done ? 'Complete' : 'Generating...'}</span>
            <span>{Math.round((stageIdx / PIPELINE_STAGES.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${(stageIdx / PIPELINE_STAGES.length) * 100}%`,
                background: done ? '#22c55e' : 'linear-gradient(90deg, #4f46e5, #7c3aed)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Generated prompt panel */}
      <div className="mb-6">
        <button
          onClick={() => setPromptOpen(v => !v)}
          className="w-full flex items-center justify-between px-4 py-3 bg-gray-900 dark:bg-gray-950 rounded-t-xl text-sm font-mono text-gray-300 hover:bg-gray-800 transition-colors"
          style={{ borderRadius: promptOpen ? '0.75rem 0.75rem 0 0' : '0.75rem' }}
        >
          <div className="flex items-center gap-2">
            <TerminalSquare size={15} className="text-indigo-400" />
            <span>Generated Gemini Prompt</span>
            {stageIdx >= 4 && (
              <span className="px-2 py-0.5 bg-green-900/50 text-green-400 rounded text-xs font-sans">ready</span>
            )}
          </div>
          {promptOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        {promptOpen && (
          <CodeEditor
            code={stageIdx >= 3 ? mockGeneratedPrompt : '// Prompt will appear here once generated...'}
            language="markdown"
            title="gemini_prompt.txt"
            maxHeight="300px"
            className="rounded-t-none"
          />
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <Button variant="secondary" icon={<ArrowLeft size={16} />} onClick={prevStep} disabled={!done}>Back</Button>
        <Button
          fullWidth
          iconRight={<ArrowRight size={16} />}
          onClick={nextStep}
          disabled={!done}
        >
          {done ? 'View Your Portfolio →' : 'Generating...'}
        </Button>
      </div>
    </div>
  );
}
