import React, { useState } from 'react';
import portfolioData from '../data/portfolioData';
import type { ProjectItem } from '../types/portfolio';
import { ProjectModal } from './ProjectModal';

type ProjectCategoryFilter = 'ALL' | 'WEB' | 'AI / ML' | 'FULL STACK';

export const Projects: React.FC = () => {
  const { projects } = portfolioData;
  const [activeFilter, setActiveFilter] = useState<ProjectCategoryFilter>('ALL');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filterTabs: { label: string; value: ProjectCategoryFilter }[] = [
    { label: 'ALL PROJECTS', value: 'ALL' },
    { label: 'AI / ML', value: 'AI / ML' },
    { label: 'FULL STACK', value: 'FULL STACK' },
    { label: 'WEB', value: 'WEB' },
  ];

  const filteredProjects = activeFilter === 'ALL' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <>
      <hr className="section-separator -mx-margin-mobile w-[calc(100%+48px)] md:-mx-margin-desktop md:w-[calc(100%+128px)] mt-12" />
      <section className="flex flex-col gap-6 pt-12" id="projects">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="font-headline-md text-headline-md font-bold text-primary uppercase border-b-[3px] border-black pb-2 inline-block self-start">
              Selected Work
            </h2>
          </div>

          {/* Categories Horizontal Scroll Bar */}
          <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar -mx-4 px-4 select-none">
            {filterTabs.map((tab) => {
              const isSelected = activeFilter === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => setActiveFilter(tab.value)}
                  className={`whitespace-nowrap font-label-mono text-label-mono uppercase px-4 py-2 brutalist-border brutalist-shadow shrink-0 transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none ${
                    isSelected ? 'bg-primary text-white' : 'bg-white text-primary hover:bg-[#ffeb3b]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          {filteredProjects.map((project) => (
            <article 
              key={project.id} 
              className="brutalist-border bg-white brutalist-shadow flex flex-col relative group overflow-hidden"
            >
              {/* Image Banner */}
              <div className="h-56 bg-surface-dim border-b-[3px] border-black relative overflow-hidden">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 filter contrast-110" 
                  src={project.image}
                  alt={project.title}
                />
                
                <div className="absolute top-3 right-3 flex gap-2">
                  {project.technologies.slice(0, 2).map((tech) => (
                    <span 
                      key={tech} 
                      className="font-label-mono text-[10px] uppercase px-2.5 py-1 bg-white brutalist-border font-bold shadow-[2px_2px_0px_#000]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col gap-4 flex-grow justify-between">
                <div className="flex flex-col gap-3">
                  <h3 className="font-headline-md text-2xl font-bold uppercase leading-none text-primary">
                    {project.title}
                  </h3>
                  
                  <p className="font-body-md text-sm text-on-surface line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech} 
                        className="font-label-mono text-[9px] uppercase px-2 py-0.5 bg-surface-container-low border border-black font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedProject(project)}
                  className="font-label-mono text-sm uppercase bg-[#003fd8] text-white px-4 py-3 brutalist-border brutalist-shadow brutalist-button brutalist-button-hover text-center flex items-center justify-center gap-2 mt-4 font-bold"
                >
                  View Project <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Popover detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
};
