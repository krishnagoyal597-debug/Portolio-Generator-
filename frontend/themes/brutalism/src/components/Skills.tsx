import React, { useState } from 'react';
import { Cpu, Code2, Layers, Database, Sparkles, Wrench, CheckSquare } from 'lucide-react';
import portfolioData from '../data/portfolioData';

type SkillFilterCategory = 'ALL' | 'PROGRAMMING' | 'FRONTEND' | 'BACKEND' | 'DATABASE' | 'AI / ML' | 'TOOLS';

export const Skills: React.FC = () => {
  const { skills } = portfolioData;
  const [activeFilter, setActiveFilter] = useState<SkillFilterCategory>('ALL');

  const filterTabs: { label: string; value: SkillFilterCategory }[] = [
    { label: 'ALL SKILLS', value: 'ALL' },
    { label: 'PROGRAMMING', value: 'PROGRAMMING' },
    { label: 'FRONTEND', value: 'FRONTEND' },
    { label: 'BACKEND', value: 'BACKEND' },
    { label: 'DATABASE', value: 'DATABASE' },
    { label: 'AI / ML', value: 'AI / ML' },
    { label: 'TOOLS', value: 'TOOLS' },
  ];

  const filteredCategories = activeFilter === 'ALL' 
    ? skills 
    : skills.filter(cat => cat.category === activeFilter);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'PROGRAMMING': return <Code2 className="w-5 h-5 stroke-[3]" />;
      case 'FRONTEND': return <Layers className="w-5 h-5 stroke-[3]" />;
      case 'BACKEND': return <Cpu className="w-5 h-5 stroke-[3]" />;
      case 'DATABASE': return <Database className="w-5 h-5 stroke-[3]" />;
      case 'AI / ML': return <Sparkles className="w-5 h-5 stroke-[3]" />;
      case 'TOOLS': return <Wrench className="w-5 h-5 stroke-[3]" />;
      default: return <CheckSquare className="w-5 h-5 stroke-[3]" />;
    }
  };

  return (
    <section id="skills" className="py-20 bg-[#FFFDF0] border-b-4 border-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-3 bg-black text-[#00F0FF] px-6 py-3 border-4 border-black shadow-[6px_6px_0px_#FF597B] transform rotate-1 mb-3">
              <Cpu className="w-7 h-7 stroke-[3]" />
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase">TECHNICAL SKILLS</h2>
            </div>
            <p className="font-mono text-sm font-bold text-gray-700 uppercase">
              // CATEGORIZED TECHNICAL STACK & PROFICIENCY
            </p>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => setActiveFilter(tab.value)}
                  className={`px-3.5 py-2 font-mono text-xs font-extrabold uppercase border-3 border-black transition-all ${
                    isActive
                      ? 'bg-black text-[#FFE600] shadow-[4px_4px_0px_#00F0FF] -translate-y-0.5'
                      : 'bg-white text-black shadow-[3px_3px_0px_#000000] hover:bg-[#FFE600]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCategories.map((categoryGroup) => (
            <div
              key={categoryGroup.category}
              className="bg-white border-4 border-black shadow-[8px_8px_0px_#000000] p-6 hover:-translate-y-1 hover:shadow-[12px_12px_0px_#000000] transition-all duration-200"
            >
              {/* Category Header */}
              <div 
                style={{ backgroundColor: categoryGroup.color }}
                className="p-4 border-3 border-black shadow-[4px_4px_0px_#000000] mb-6 flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5 font-extrabold text-black uppercase tracking-wider text-base">
                  {getCategoryIcon(categoryGroup.category)}
                  <span>{categoryGroup.title}</span>
                </div>
                <span className="bg-black text-white font-mono text-xs font-bold px-2 py-0.5 border border-white">
                  {categoryGroup.skills.length} ITEMS
                </span>
              </div>

              {/* Skills List with Progress Bars */}
              <div className="space-y-4">
                {categoryGroup.skills.map((skill) => (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex items-center justify-between font-mono text-xs font-extrabold text-black">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-black rounded-full inline-block"></span>
                        {skill.name}
                      </span>
                      {skill.level && <span>{skill.level}%</span>}
                    </div>

                    {/* Progress Bar Container */}
                    {skill.level && (
                      <div className="w-full bg-[#FFFDF0] h-3.5 border-2 border-black shadow-[2px_2px_0px_#000000] p-0.5 relative overflow-hidden">
                        <div
                          style={{ 
                            width: `${skill.level}%`,
                            backgroundColor: categoryGroup.color 
                          }}
                          className="h-full border-r-2 border-black transition-all duration-500"
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
