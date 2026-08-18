import React, { useState } from 'react';
import { Layers, Eye } from 'lucide-react';
import portfolioData from '../data/portfolioData';
import type { ProjectItem } from '../types/portfolio';
import { ProjectModal } from './ProjectModal';
import { GithubIcon } from './SocialIcons';

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
    <section id="projects" className="py-20 bg-[#FFFDF0] border-b-4 border-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-3 bg-[#FFE600] text-black px-6 py-3 border-4 border-black shadow-[6px_6px_0px_#000000] transform -rotate-1 mb-3">
              <Layers className="w-7 h-7 stroke-[3]" />
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase">SELECTED WORK</h2>
            </div>
            <p className="font-mono text-sm font-bold text-gray-700 uppercase">
              // FEATURED FULL STACK & AI APPLICATIONS
            </p>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => setActiveFilter(tab.value)}
                  className={`px-4 py-2 font-mono text-xs font-extrabold uppercase border-3 border-black transition-all ${
                    isActive
                      ? 'bg-black text-[#FFE600] shadow-[4px_4px_0px_#FF597B] -translate-y-0.5'
                      : 'bg-white text-black shadow-[3px_3px_0px_#000000] hover:bg-[#00F0FF]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white border-4 border-black shadow-[10px_10px_0px_#000000] p-6 sm:p-8 flex flex-col justify-between hover:-translate-y-1 hover:shadow-[14px_14px_0px_#000000] transition-all group"
            >
              <div>
                {/* Top Card Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b-3 border-black">
                  <span className="text-3xl font-mono font-extrabold text-black bg-[#FFE600] px-3 py-0.5 border-2 border-black shadow-[3px_3px_0px_#000]">
                    #{project.projectNumber}
                  </span>

                  <span className="bg-[#00F0FF] text-black font-mono text-xs font-extrabold px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#000]">
                    {project.category}
                  </span>
                </div>

                {/* Project Image Container */}
                <div className="relative mb-6 border-3 border-black shadow-[6px_6px_0px_#000000] overflow-hidden bg-black h-56">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 filter contrast-105"
                  />
                  
                  <div className="absolute bottom-3 right-3 bg-black text-[#FFE600] text-xs font-mono font-bold px-2.5 py-1 border border-white">
                    {project.technologies[0]} + {project.technologies[1]}
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-black uppercase tracking-tight mb-3">
                  {project.title}
                </h3>

                <p className="text-gray-800 text-sm sm:text-base font-medium leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Technology Pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-[#FFFDF0] text-black font-mono text-xs font-bold px-2.5 py-1 border-2 border-black shadow-[2px_2px_0px_#000]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Action Buttons */}
              <div className="pt-4 border-t-3 border-black flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#FFE600] text-black font-extrabold py-3 px-4 text-xs sm:text-sm border-3 border-black shadow-[4px_4px_0px_#000000] hover:bg-[#00F0FF] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] transition-all"
                >
                  <Eye className="w-4 h-4 stroke-[3]" />
                  <span>VIEW PROJECT</span>
                </button>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-3 bg-black text-white border-3 border-black shadow-[4px_4px_0px_#00F0FF] hover:bg-[#FF597B] hover:text-black transition-all"
                  aria-label={`GitHub repo for ${project.title}`}
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Interactive Project Modal Popover */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
