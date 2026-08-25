import React, { useEffect } from 'react';
import { X, ExternalLink, Sparkles, CheckCircle2, AlertCircle, Lightbulb } from 'lucide-react';
import { GithubIcon } from './Icons';

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    // Lock body scroll when modal is open
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto animate-fade-in">
      
      {/* Frosted Glass Backdrop overlay */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/45 backdrop-blur-md transition-opacity"
      />

      {/* Glass Modal Box */}
      <div className="relative w-full max-w-4xl max-h-[90vh] my-auto rounded-3xl glass-panel-deep border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.7)] backdrop-blur-2xl overflow-y-auto overflow-x-hidden z-10 text-white animate-scale-in">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-3 rounded-full glass-pill text-gray-300 hover:text-white hover:bg-white/20 focus:outline-none transition-all cursor-pointer"
          aria-label="Close Modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Header Image */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#120526] via-[#120526]/50 to-transparent" />

          {/* Title & Category Overlay */}
          <div className="absolute bottom-6 left-6 right-6">
            <span className="inline-block px-3 py-1 rounded-full glass-pill text-xs font-bold text-purple-200 uppercase tracking-wider mb-2 border border-purple-400/30">
              {project.category}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 md:p-10 space-y-8">
          
          {/* Detailed Description */}
          <div>
            <h3 className="text-lg font-bold text-purple-200 mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-pink-400" />
              <span>Project Overview</span>
            </h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Problem & Solution Cards */}
          {(project.problem || project.solution) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.problem && (
                <div className="p-5 rounded-2xl glass-card border-l-4 border-l-pink-500 border-white/10 bg-pink-500/5">
                  <div className="flex items-center gap-2 text-pink-300 font-bold text-sm mb-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>The Challenge</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                    {project.problem}
                  </p>
                </div>
              )}

              {project.solution && (
                <div className="p-5 rounded-2xl glass-card border-l-4 border-l-emerald-400 border-white/10 bg-emerald-500/5">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm mb-2">
                    <Lightbulb className="w-4 h-4" />
                    <span>The Solution</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                    {project.solution}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Key Features */}
          {project.features && project.features.length > 0 && (
            <div>
              <h3 className="text-base font-bold text-white mb-3">Key Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl glass-pill text-xs sm:text-sm text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies Stack */}
          {project.technologies && (
            <div>
              <h3 className="text-base font-bold text-white mb-3">Technologies & Architecture</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-full glass-pill text-xs font-semibold text-purple-200 border border-purple-400/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Links Bar */}
          <div className="pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-button-secondary text-sm font-semibold text-white"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              )}

              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-button-primary text-sm font-semibold text-white shadow-lg"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full glass-pill text-xs font-semibold text-gray-300 hover:text-white cursor-pointer"
            >
              Close Window
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default ProjectModal;
