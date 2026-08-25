import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import TemplateCard from '../../components/portfolio/TemplateCard';
import Button from '../../components/ui/Button';

const TEMPLATES = [
  { id: 'minimal', name: 'Template 01 — Minimal', description: 'Clean, simple, typography-focused' },
  { id: 'modern',  name: 'Template 02 — Modern',  description: 'Cards, visual sections, indigo accent' },
  { id: 'creative',name: 'Template 03 — Creative', description: 'Dark, bold, distinctive layout' },
];

const ACCENT_COLORS = [
  { name: 'Indigo',  value: '#4F46E5' },
  { name: 'Blue',   value: '#2563EB' },
  { name: 'Violet', value: '#7C3AED' },
  { name: 'Rose',   value: '#E11D48' },
  { name: 'Teal',   value: '#0D9488' },
];

const FONTS = [
  { label: 'Inter', value: 'Inter' },
  { label: 'Geist', value: 'Geist' },
  { label: 'Roboto', value: 'Roboto' },
  { label: 'Poppins', value: 'Poppins' },
];

const SECTIONS = ['About','Skills','Education','Experience','Projects','Certifications','Achievements','Contact'];

export default function Step4Customize() {
  const { selectedTemplate, setSelectedTemplate, appearance, setAppearance, enabledSections, setEnabledSections, nextStep, prevStep } = usePortfolio();

  const toggleSection = (s) =>
    setEnabledSections(prev => ({ ...prev, [s.toLowerCase()]: !prev[s.toLowerCase()] }));

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Choose Your Portfolio Style</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Select a template and customise the appearance of your portfolio.</p>
      </div>

      {/* Templates */}
      <div className="mb-8">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Templates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {TEMPLATES.map(t => (
            <TemplateCard key={t.id} template={t} selected={selectedTemplate === t.id} onSelect={setSelectedTemplate} />
          ))}
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-card mb-6">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-5">Appearance</h2>

        {/* Theme toggle */}
        <div className="mb-5">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Theme</p>
          <div className="flex gap-2">
            {['light', 'dark'].map(t => (
              <button
                key={t}
                onClick={() => setAppearance(prev => ({ ...prev, theme: t }))}
                className={`flex-1 py-2.5 rounded-xl border text-sm font-medium capitalize transition-all
                  ${appearance.theme === t
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                    : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300'
                  }
                `}
              >
                {t === 'light' ? '☀️' : '🌙'} {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Accent color */}
        <div className="mb-5">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Accent Color</p>
          <div className="flex gap-3">
            {ACCENT_COLORS.map(c => (
              <button
                key={c.value}
                title={c.name}
                onClick={() => setAppearance(prev => ({ ...prev, accentColor: c.value }))}
                className={`w-8 h-8 rounded-full transition-all ${appearance.accentColor === c.value ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : 'hover:scale-105'}`}
                style={{ backgroundColor: c.value }}
              />
            ))}
          </div>
        </div>

        {/* Font */}
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Font</p>
          <div className="flex flex-wrap gap-2">
            {FONTS.map(f => (
              <button
                key={f.value}
                onClick={() => setAppearance(prev => ({ ...prev, font: f.value }))}
                className={`px-3 py-1.5 rounded-lg border text-sm transition-all
                  ${appearance.font === f.value
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300'
                  }
                `}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Section toggles */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-card mb-8">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Sections</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SECTIONS.map(s => {
            const key = s.toLowerCase();
            const on = enabledSections[key] !== false;
            return (
              <button
                key={s}
                onClick={() => toggleSection(s)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl border text-sm font-medium transition-all
                  ${on
                    ? 'border-indigo-200 dark:border-indigo-700/50 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300'
                    : 'border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500'
                  }
                `}
              >
                <span>{s}</span>
                <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${on ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}`}>
                  {on && <Check size={10} className="text-white" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <Button variant="secondary" icon={<ArrowLeft size={16} />} onClick={prevStep}>Back</Button>
        <Button fullWidth iconRight={<ArrowRight size={16} />} onClick={nextStep}>Continue</Button>
      </div>
    </div>
  );
}
