import React, { useState } from 'react';
import { 
  Code2, FileCode, FileJson, Layout, Palette, Globe,
  Server, Cpu, Terminal, Box, Database, HardDrive,
  Sparkles, BrainCircuit, Binary, Bot,
  GitBranch, Container, Monitor, Zap, Wrench
} from 'lucide-react';
import { FigmaIcon } from './Icons';
import portfolioData from '../data/portfolioData';

const iconMap = {
  Code2, FileCode, FileJson, Layout, Palette, Globe,
  Server, Cpu, Terminal, Box, Database, HardDrive,
  Sparkles, BrainCircuit, Binary, Bot,
  GitBranch, Container, Monitor, Zap, Figma: FigmaIcon
};

const Skills = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const categories = ['ALL', ...portfolioData.skills.map(s => s.category.toUpperCase())];

  // Flatten all skills with category attached for filtering
  const allSkills = portfolioData.skills.flatMap(group => 
    group.items.map(item => ({ ...item, category: group.category }))
  );

  const filteredSkills = activeFilter === 'ALL'
    ? allSkills
    : allSkills.filter(item => item.category.toUpperCase() === activeFilter);

  return (
    <section id="skills" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Section Title */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-semibold uppercase tracking-wider text-purple-300 mb-3">
          <Wrench className="w-3.5 h-3.5" />
          <span>Technical Expertise</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Skills & <span className="text-gradient-vibrant">Capabilities</span>
        </h2>
        <div className="w-20 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mt-4 shadow-[0_0_15px_rgba(236,72,153,0.5)]" />
      </div>

      {/* Glass Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
        {categories.map((cat) => {
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

      {/* Grid of Skill Glass Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill, index) => {
          const IconComponent = iconMap[skill.icon] || Code2;
          return (
            <div
              key={`${skill.name}-${index}`}
              className="p-6 rounded-3xl glass-card border border-white/15 backdrop-blur-xl relative overflow-hidden group hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Background Light Glow on Hover */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-600/10 rounded-full blur-xl group-hover:bg-pink-600/20 transition-all" />

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl glass-pill flex items-center justify-center text-purple-300 group-hover:text-white group-hover:scale-110 group-hover:bg-purple-600/30 transition-all">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-purple-200 transition-colors">
                      {skill.name}
                    </h3>
                    <span className="text-xs text-gray-300 font-medium">
                      {skill.category}
                    </span>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/10 text-purple-300 border border-white/10">
                  {skill.level || "Advanced"}
                </span>
              </div>

              {/* Progress Indicator */}
              <div className="mt-4">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-gray-300 font-medium">Proficiency</span>
                  <span className="text-purple-300 font-bold">{skill.proficiency}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden p-0.5 border border-white/10">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 shadow-[0_0_10px_rgba(236,72,153,0.6)] transition-all duration-1000 ease-out"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};

export default Skills;
