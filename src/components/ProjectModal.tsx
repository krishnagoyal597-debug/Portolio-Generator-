import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle2, Sparkles, Code2 } from 'lucide-react';
import type { ProjectItem } from '../types/portfolio';
import { GithubIcon } from './SocialIcons';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Click Backdrop Outside Handler */}
      <div 
        className="absolute inset-0" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Modal Box */}
      <div className="relative w-full max-w-3xl bg-[#FFFDF0] border-4 border-black shadow-[16px_16px_0px_#000000] z-10 max-h-[90vh] overflow-y-auto p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-4 pb-4 mb-6 border-b-4 border-black">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-black text-[#FFE600] font-mono text-xs font-extrabold px-3 py-1 border border-black">
                PROJECT {project.projectNumber}
              </span>
              <span className="bg-[#00F0FF] text-black font-mono text-xs font-extrabold px-3 py-1 border border-black shadow-[2px_2px_0px_#000]">
                {project.category}
              </span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-black uppercase tracking-tight">
              {project.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="bg-[#FF597B] text-white p-2.5 border-3 border-black shadow-[4px_4px_0px_#000000] hover:bg-black hover:text-[#FFE600] transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 stroke-[3]" />
          </button>
        </div>

        {/* Modal Image Hero */}
        <div className="relative mb-6 border-4 border-black shadow-[8px_8px_0px_#000000] overflow-hidden bg-black max-h-72">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover filter contrast-110"
          />
          <div className="absolute top-3 right-3 bg-[#FFE600] text-black font-mono text-xs font-extrabold px-3 py-1 border-2 border-black">
            FEATURED DEMO
          </div>
        </div>

        {/* Modal Description */}
        <div className="space-y-6">
          <div>
            <h4 className="font-extrabold text-sm font-mono uppercase mb-2 text-black flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FF597B]" />
              <span>PROJECT OVERVIEW</span>
            </h4>
            <p className="text-base text-gray-900 font-medium leading-relaxed bg-white p-4 border-3 border-black shadow-[4px_4px_0px_#000]">
              {project.description}
            </p>
          </div>

          {/* Key Features List */}
          <div>
            <h4 className="font-extrabold text-sm font-mono uppercase mb-3 text-black flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00F0FF]" />
              <span>KEY FEATURES & CAPABILITIES</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.features.map((feature, fIdx) => (
                <div 
                  key={fIdx}
                  className="bg-white p-3 border-2 border-black shadow-[3px_3px_0px_#000] text-xs font-medium text-black flex items-center gap-2"
                >
                  <span className="bg-black text-[#FFE600] font-mono font-bold px-1.5 py-0.5 text-[10px]">
                    ✓
                  </span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Used */}
          <div>
            <h4 className="font-extrabold text-sm font-mono uppercase mb-3 text-black flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#9D4EDD]" />
              <span>TECHNOLOGIES & TOOLS</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="bg-[#FFE600] text-black font-mono text-xs font-extrabold px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#000]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Link Buttons */}
          <div className="pt-4 border-t-3 border-black flex flex-wrap gap-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[160px] flex items-center justify-center gap-2 bg-black text-[#FFE600] font-extrabold py-3 px-6 text-sm border-3 border-black shadow-[5px_5px_0px_#00F0FF] hover:bg-[#00F0FF] hover:text-black transition-all"
            >
              <GithubIcon className="w-5 h-5" />
              <span>VIEW GITHUB REPO</span>
            </a>

            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[160px] flex items-center justify-center gap-2 bg-[#FF597B] text-white font-extrabold py-3 px-6 text-sm border-3 border-black shadow-[5px_5px_0px_#000000] hover:bg-[#FFE600] hover:text-black transition-all"
            >
              <span>LIVE INTERACTIVE DEMO</span>
              <ExternalLink className="w-5 h-5 stroke-[2.5]" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
