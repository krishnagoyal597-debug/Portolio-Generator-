import React from 'react';
import { ExternalLink, Eye, Sparkles } from 'lucide-react';
import { GithubIcon } from './Icons';

const ProjectCard = ({ project, onSelectProject }) => {
  return (
    <div className="group rounded-3xl glass-card border border-white/15 backdrop-blur-xl overflow-hidden flex flex-col justify-between hover:-translate-y-2 transition-all duration-300">
      
      {/* Image Container with Zoom & Hover Overlay */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent opacity-85 group-hover:opacity-60 transition-opacity" />

        {/* Category Pill */}
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full glass-pill text-xs font-bold text-purple-200 uppercase tracking-wider border border-purple-400/30">
          {project.category}
        </span>

        {/* Hover Quick Action Buttons */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-xs">
          <button
            onClick={() => onSelectProject(project)}
            className="p-3 rounded-full glass-button-primary text-white shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 cursor-pointer"
            aria-label="View Details"
          >
            <Eye className="w-5 h-5" />
          </button>
          
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full glass-pill text-white hover:bg-white/20 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 flex items-center justify-center"
              aria-label="GitHub Repository"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
          )}
          
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full glass-pill text-white hover:bg-white/20 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-150 flex items-center justify-center"
              aria-label="Live Project Demo"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2 font-light">
            {project.description}
          </p>
        </div>

        <div>
          {/* Tech Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.technologies.slice(0, 4).map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/5 text-purple-200 border border-white/10"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-1 rounded-full text-[10px] font-bold text-gray-300 bg-white/5">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* View Details Button */}
          <button
            onClick={() => onSelectProject(project)}
            className="w-full py-2.5 rounded-2xl glass-button-secondary text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer group-hover:border-purple-400/40"
          >
            <span>View Case Study</span>
            <Sparkles className="w-4 h-4 text-pink-400" />
          </button>
        </div>

      </div>

    </div>
  );
};

export default ProjectCard;
