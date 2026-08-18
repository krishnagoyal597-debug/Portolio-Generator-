import React, { useState } from 'react';
import { FolderGit2, Sparkles } from 'lucide-react';
import portfolioData from '../data/portfolioData';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

const Projects = () => {
  const { projects } = portfolioData;
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState(null);

  const filterCategories = ['ALL', 'WEB', 'AI / ML', 'FULL STACK', 'DATA'];

  const filteredProjects = activeFilter === 'ALL'
    ? projects
    : projects.filter(p => {
        const cat = (p.filterCategory || p.category).toUpperCase();
        return cat.includes(activeFilter);
      });

  return (
    <section id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-semibold uppercase tracking-wider text-purple-300 mb-3">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>Featured Work</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Recent <span className="text-gradient-vibrant">Projects</span>
        </h2>
        <div className="w-20 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mt-4 shadow-[0_0_15px_rgba(236,72,153,0.5)]" />
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
        {filterCategories.map((cat) => {
          const isActive = activeFilter === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'glass-button-primary text-white shadow-[0_0_20px_rgba(168,85,247,0.5)] scale-105'
                  : 'glass-pill text-gray-300 hover:text-white hover:bg-white/15'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Responsive Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onSelectProject={setSelectedProject}
          />
        ))}
      </div>

      {/* Empty Filter State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-16 p-8 rounded-3xl glass-card max-w-md mx-auto">
          <Sparkles className="w-10 h-10 text-purple-400 mx-auto mb-3 animate-pulse" />
          <h3 className="text-lg font-bold text-white mb-1">No Projects Found</h3>
          <p className="text-xs text-gray-300">Try selecting a different filter category above.</p>
        </div>
      )}

      {/* Detailed Case Study Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

    </section>
  );
};

export default Projects;
