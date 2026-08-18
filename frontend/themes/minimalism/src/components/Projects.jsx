import React, { useState } from 'react';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import portfolioData from '../data/portfolioData';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState(null);

  const filterOptions = ['ALL', 'WEB', 'AI / ML', 'FULL STACK'];

  // Filter project cards dynamically based on active category
  const filteredProjects = portfolioData.projects.filter((project) => {
    if (activeFilter === 'ALL') return true;
    const cat = (project.filterCategory || project.category).toUpperCase();
    return cat.includes(activeFilter);
  });

  return (
    <section id="projects" className="py-24 px-6 sm:px-8 border-t border-minimal-border bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-widest text-minimal-subtle">
                05 / FEATURED PROJECTS
              </span>
              <span className="h-[1px] w-12 bg-neutral-300" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-minimal-dark">
              Selected Works
            </h2>
          </div>

          {/* Filter Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-1.5 text-xs font-semibold tracking-wider rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-minimal-dark text-white shadow-xs'
                      : 'bg-minimal-card text-minimal-subtle border border-minimal-border hover:text-minimal-dark hover:border-neutral-300'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {filteredProjects.map((project, idx) => {
            const projectNumber = String(idx + 1).padStart(2, '0');

            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group relative bg-white border border-minimal-border rounded-2xl overflow-hidden hover:border-neutral-400 hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1 animate-fadeIn"
              >
                {/* Image Container with hover zoom */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-neutral-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Category Pill Tag */}
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-minimal-dark border border-neutral-200">
                    {project.category}
                  </span>

                  {/* Project Number */}
                  <span className="absolute bottom-4 right-4 text-3xl font-extrabold text-white drop-shadow-md font-mono">
                    {projectNumber}
                  </span>
                </div>

                {/* Card Text Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-minimal-dark group-hover:text-black transition-colors flex items-center">
                        {project.title}
                      </h3>
                      <ArrowUpRight className="w-5 h-5 text-neutral-400 group-hover:text-minimal-dark group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </div>

                    <p className="text-sm text-neutral-600 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-[11px] font-medium text-neutral-600 bg-minimal-card border border-minimal-border rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2.5 py-1 text-[11px] font-medium text-neutral-400 bg-minimal-card border border-minimal-border rounded-md">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal Overlay */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
