import React, { useState } from 'react';
import portfolioData from '../data/portfolioData';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = ['ALL', ...portfolioData.skills.map((s) => s.category.toUpperCase())];

  // Filter skills based on selected category tab
  const filteredSkills = portfolioData.skills.filter((cat) => {
    if (activeCategory === 'ALL') return true;
    return cat.category.toUpperCase() === activeCategory;
  });

  return (
    <section id="skills" className="py-24 px-6 sm:px-8 border-t border-minimal-border bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-widest text-minimal-subtle">
                02 / SKILLS & TECH
              </span>
              <span className="h-[1px] w-12 bg-neutral-300" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-minimal-dark">
              Technical Capabilities
            </h2>
          </div>

          {/* Category Filter Bar */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 text-xs font-semibold tracking-wider rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-minimal-dark text-white shadow-xs'
                      : 'bg-minimal-card text-minimal-subtle border border-minimal-border hover:text-minimal-dark hover:border-neutral-300'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Categorized Skills Display */}
        <div className="space-y-10">
          {filteredSkills.map((skillGroup) => (
            <div key={skillGroup.category} className="space-y-4 animate-fadeIn">
              <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                {skillGroup.category}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {skillGroup.items.map((skill) => (
                  <div
                    key={skill}
                    className="group relative p-4 rounded-xl border border-minimal-border bg-minimal-card hover:bg-white hover:border-neutral-400 hover:shadow-xs transition-all duration-200 transform hover:-translate-y-0.5 cursor-default flex items-center justify-between"
                  >
                    <span className="text-sm font-medium text-minimal-dark group-hover:font-semibold transition-all">
                      {skill}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 group-hover:bg-minimal-dark transition-colors" />

                    {/* Bottom animated border accent */}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-minimal-dark transition-all duration-300 group-hover:w-full rounded-b-xl" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
