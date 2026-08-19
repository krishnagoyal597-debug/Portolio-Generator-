import React, { useEffect } from 'react';
import type { ProjectItem } from '../types/portfolio';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      {/* Click Backdrop Outside Handler */}
      <div 
        className="absolute inset-0 cursor-pointer" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Modal Box */}
      <div className="relative w-full max-w-3xl bg-white brutalist-border shadow-[12px_12px_0px_#000000] z-10 max-h-[90vh] overflow-y-auto p-6 md:p-8 animate-in zoom-in-95 duration-150">
        
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-4 pb-4 mb-6 border-b-[3px] border-black">
          <div>
            <div className="flex items-center gap-2 mb-2 select-none">
              <span className="bg-black text-[#ffeb3b] font-mono text-xs font-extrabold px-3 py-1 border border-black">
                PROJECT {project.projectNumber}
              </span>
              <span className="bg-[#003fd8] text-white font-mono text-xs font-extrabold px-3 py-1 border border-black shadow-[2px_2px_0px_#000]">
                {project.category}
              </span>
            </div>

            <h3 className="font-headline-md text-2xl md:text-3xl font-bold text-primary uppercase pr-12">
              {project.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="bg-[#ba1a1a] text-white p-2.5 brutalist-border brutalist-shadow brutalist-button hover:bg-black hover:text-[#ffeb3b] transition-colors shrink-0 flex items-center justify-center"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Modal Image Hero */}
        <div className="relative mb-6 brutalist-border shadow-[4px_4px_0px_#000000] overflow-hidden bg-black max-h-72">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover filter contrast-110"
          />
        </div>

        {/* Modal Description */}
        <div className="space-y-6">
          <div>
            <h4 className="font-label-mono text-sm font-bold uppercase mb-2 text-primary flex items-center gap-2 select-none">
              <span className="material-symbols-outlined text-sm">view_timeline</span>
              <span>Project Overview</span>
            </h4>
            <p className="font-body-md text-base text-on-surface leading-relaxed bg-surface-container-low p-4 brutalist-border">
              {project.description}
            </p>
          </div>

          {/* Key Features List */}
          <div>
            <h4 className="font-label-mono text-sm font-bold uppercase mb-3 text-primary flex items-center gap-2 select-none">
              <span className="material-symbols-outlined text-sm">task_alt</span>
              <span>Key Features</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.features.map((feature, idx) => (
                <div 
                  key={idx}
                  className="bg-white p-3.5 brutalist-border shadow-[3px_3px_0px_#000] text-xs font-semibold text-black flex items-center gap-2"
                >
                  <span className="bg-black text-[#ffeb3b] font-mono font-bold px-1.5 py-0.5 text-[10px]">
                    ✓
                  </span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Used */}
          <div>
            <h4 className="font-label-mono text-sm font-bold uppercase mb-3 text-primary flex items-center gap-2 select-none">
              <span className="material-symbols-outlined text-sm">code</span>
              <span>Technologies & Tools</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="bg-[#ffeb3b] text-primary font-label-mono text-xs font-bold px-3 py-1.5 brutalist-border shadow-[2px_2px_0px_#000] select-none"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Link Buttons */}
          <div className="pt-6 border-t-[3px] border-black flex flex-wrap gap-4 mt-6">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[160px] flex items-center justify-center gap-2 bg-black text-[#ffeb3b] font-label-mono font-bold py-4 px-6 text-sm brutalist-border brutalist-shadow brutalist-button brutalist-button-hover"
            >
              <span>View Source Repo</span>
            </a>

            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[160px] flex items-center justify-center gap-2 bg-[#003fd8] text-white font-label-mono font-bold py-4 px-6 text-sm brutalist-border brutalist-shadow brutalist-button brutalist-button-hover"
            >
              <span>Live Demonstration</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
