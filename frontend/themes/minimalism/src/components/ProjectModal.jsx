import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2 } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    // ESC key listener to close modal
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Lock body scroll while modal is open
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/60 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl border border-minimal-border flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Modal"
          className="absolute top-4 right-4 z-20 p-2.5 bg-white/80 backdrop-blur-md rounded-full text-minimal-dark hover:bg-white hover:scale-110 shadow-md transition-all duration-200"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content Scroll Area */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Project Large Image */}
          <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden bg-neutral-100 border border-minimal-border shadow-inner">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-minimal-dark border border-neutral-200">
              {project.category}
            </div>
          </div>

          {/* Header Info */}
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-minimal-dark">
              {project.title}
            </h3>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Key Features Breakdown */}
          {project.features && project.features.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                Key Platform Features
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feature, fIdx) => (
                  <div
                    key={fIdx}
                    className="flex items-center space-x-2.5 p-3 rounded-xl bg-minimal-card border border-minimal-border"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-minimal-dark">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Pills */}
          {project.technologies && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 text-xs font-medium text-minimal-dark bg-minimal-hoverBg border border-neutral-200 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-minimal-border">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-minimal-dark rounded-full hover:bg-neutral-800 transition-all shadow hover:shadow-md active:scale-95"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-xs font-semibold uppercase tracking-wider text-minimal-dark bg-white border border-neutral-300 rounded-full hover:bg-minimal-hoverBg transition-all active:scale-95"
              >
                <Github className="w-4 h-4 mr-2" />
                <span>Source Code</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
