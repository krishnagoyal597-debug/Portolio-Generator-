import React, { useState } from 'react';
import portfolioData from '../data/portfolioData';

export const Skills: React.FC = () => {
  const { skills: skillCategories } = portfolioData;
  
  // Available categories
  const categories = ['ALL', ...skillCategories.map(cat => cat.category)];
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // Filter skills based on selected category
  const filteredSkills = selectedCategory === 'ALL'
    ? skillCategories.flatMap(cat => cat.skills.map(s => ({ ...s, category: cat.category })))
    : skillCategories
        .filter(cat => cat.category === selectedCategory)
        .flatMap(cat => cat.skills.map(s => ({ ...s, category: cat.category })));

  // Utility to map category to icon
  const getSkillIcon = (catName: string) => {
    switch (catName) {
      case 'PROGRAMMING': return 'code';
      case 'FRONTEND': return 'brush';
      case 'BACKEND': return 'terminal';
      case 'DATABASE': return 'database';
      case 'AI / ML': return 'view_in_ar';
      case 'TOOLS': return 'settings';
      default: return 'terminal';
    }
  };

  return (
    <>
      <hr className="section-separator -mx-margin-mobile w-[calc(100%+48px)] md:-mx-margin-desktop md:w-[calc(100%+128px)] mt-12" />
      <section className="flex flex-col gap-6 pt-12" id="skills">
        <h2 className="font-headline-md text-headline-md font-bold text-primary uppercase border-b-[3px] border-black pb-2 inline-block self-start">
          Skills
        </h2>

        {/* Categories Horizontal Scroll Bar */}
        <div className="flex overflow-x-auto gap-3 pb-4 no-scrollbar -mx-4 px-4 select-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap font-label-mono text-label-mono uppercase px-5 py-2.5 brutalist-border brutalist-shadow shrink-0 transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none ${
                  isSelected ? 'bg-primary text-white' : 'bg-white text-primary hover:bg-[#ffeb3b]'
                }`}
              >
                {cat === 'ALL' ? 'All Skills' : cat}
              </button>
            );
          })}
        </div>

        {/* Skills Grid/List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSkills.map((skill, index) => {
            // First item or every 4th item gets highlighted with electric yellow background
            const isHighlighted = index % 4 === 0;
            return (
              <div
                key={skill.name}
                className={`brutalist-border p-4 md:p-6 flex items-center justify-between brutalist-shadow transition-all hover:-translate-y-0.5 ${
                  isHighlighted ? 'bg-[#ffeb3b]' : 'bg-white'
                }`}
              >
                <span className="font-headline-md text-xl md:text-2xl font-bold text-primary">
                  {skill.name}
                </span>
                
                <div className="flex items-center gap-4">
                  {skill.level && (
                    <span className="font-label-mono text-xs font-bold bg-white text-primary brutalist-border px-2.5 py-1">
                      {skill.level}%
                    </span>
                  )}
                  <span className="material-symbols-outlined text-primary text-2xl">
                    {getSkillIcon(skill.category)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};
