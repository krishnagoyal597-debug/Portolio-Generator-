import React from 'react';
import { Check, ExternalLink, Github } from 'lucide-react';

export default function TemplateCard({ template, selected, onSelect }) {
  const previews = {
    minimal: <MinimalPreview />,
    modern: <ModernPreview />,
    creative: <CreativePreview />,
  };

  return (
    <div
      onClick={() => onSelect(template.id)}
      className={`
        relative rounded-2xl border-2 cursor-pointer
        transition-all duration-200 overflow-hidden
        ${selected
          ? 'border-indigo-600 shadow-lg shadow-indigo-100 dark:shadow-indigo-900/30'
          : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700'
        }
      `}
    >
      {/* Selected badge */}
      {selected && (
        <div className="absolute top-3 right-3 z-10 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center shadow">
          <Check size={13} className="text-white" />
        </div>
      )}

      {/* Mini preview */}
      <div className="h-44 bg-gray-50 dark:bg-gray-900 overflow-hidden relative">
        <div className="transform scale-[0.45] origin-top-left w-[222%] h-[222%] pointer-events-none">
          {previews[template.id] || <DefaultPreview />}
        </div>
      </div>

      {/* Info */}
      <div className={`p-4 border-t ${selected ? 'border-indigo-100 dark:border-indigo-900/50 bg-indigo-50/50 dark:bg-indigo-900/10' : 'border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800'}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm font-semibold ${selected ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-900 dark:text-gray-100'}`}>
              {template.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{template.description}</p>
          </div>
          {selected && <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">Selected</span>}
        </div>
      </div>
    </div>
  );
}

function MinimalPreview() {
  return (
    <div className="w-full h-full bg-white p-8 font-sans">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-1">Anshika Bansal</h1>
        <p className="text-lg text-gray-500">Computer Science & AI Student</p>
        <div className="flex gap-3 mt-3">
          <span className="text-sm text-gray-400">anshika@email.com</span>
          <span className="text-sm text-gray-400">Delhi, India</span>
        </div>
      </div>
      <div className="border-t border-gray-100 pt-6 mb-6">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-3">About</h2>
        <p className="text-sm text-gray-600 leading-relaxed">Passionate Computer Science student specializing in AI and full-stack development...</p>
      </div>
      <div className="border-t border-gray-100 pt-6">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {['Python','React','FastAPI','TensorFlow','Docker'].map(s => (
            <span key={s} className="px-2 py-1 bg-gray-50 border border-gray-200 rounded text-xs text-gray-600">{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ModernPreview() {
  return (
    <div className="w-full h-full bg-gray-50 font-sans">
      <div className="bg-indigo-600 text-white p-8 pb-12">
        <h1 className="text-4xl font-bold mb-1">Anshika Bansal</h1>
        <p className="text-indigo-200 text-lg">Computer Science & AI Student</p>
        <div className="flex gap-3 mt-4">
          <span className="px-3 py-1 bg-indigo-500/50 rounded-full text-xs">GitHub</span>
          <span className="px-3 py-1 bg-indigo-500/50 rounded-full text-xs">LinkedIn</span>
        </div>
      </div>
      <div className="p-8 -mt-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-4">
          <h2 className="text-sm font-bold text-gray-900 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {['Python','React','FastAPI','TensorFlow'].map(s => (
              <span key={s} className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-medium">{s}</span>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-sm font-bold text-gray-900 mb-3">Projects</h2>
          <div className="space-y-2">
            <div className="p-3 border border-gray-100 rounded-xl">
              <p className="text-xs font-semibold text-gray-800">SmartResume AI</p>
              <p className="text-xs text-gray-400 mt-0.5">Python · FastAPI · React</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CreativePreview() {
  return (
    <div className="w-full h-full font-sans" style={{ background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 100%)' }}>
      <div className="p-8">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-1 h-8 bg-violet-500 rounded-full" />
          <span className="text-violet-400 text-sm font-mono">portfolio.dev</span>
        </div>
        <h1 className="text-5xl font-black text-white mb-2">Anshika<br/>Bansal</h1>
        <p className="text-violet-300 text-lg mb-6">CS & AI Student</p>
        <div className="flex gap-3 mb-8">
          <button className="px-4 py-2 bg-violet-600 text-white rounded-full text-xs font-medium">View Work</button>
          <button className="px-4 py-2 border border-violet-400 text-violet-300 rounded-full text-xs font-medium">Contact</button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {['Python','React','AI/ML'].map((s,i) => (
            <div key={i} className="p-3 rounded-xl border border-violet-800 bg-violet-900/30">
              <p className="text-xs text-violet-300 font-medium">{s}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DefaultPreview() {
  return <div className="w-full h-full bg-gray-100 flex items-center justify-center"><p className="text-gray-400 text-sm">Preview</p></div>;
}
