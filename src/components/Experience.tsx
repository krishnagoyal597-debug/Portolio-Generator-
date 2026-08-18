import React, { useState } from 'react';
import { Briefcase, Calendar, MapPin, ChevronDown, CheckSquare, Code2 } from 'lucide-react';
import portfolioData from '../data/portfolioData';

export const Experience: React.FC = () => {
  const { experience } = portfolioData;
  const [expandedId, setExpandedId] = useState<string | null>(experience[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section id="experience" className="py-20 bg-[#FFFDF0] border-b-4 border-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-3 bg-[#CCFF00] text-black px-6 py-3 border-4 border-black shadow-[6px_6px_0px_#000000] transform rotate-1 mb-3">
            <Briefcase className="w-7 h-7 stroke-[3]" />
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase">WORK EXPERIENCE</h2>
          </div>
          <p className="font-mono text-sm font-bold text-gray-700 uppercase">
            // INTERNSHIPS & INDUSTRY CONTRIBUTIONS (CLICK TO EXPAND DETAILS)
          </p>
        </div>

        {/* Interactive Accordion Cards List */}
        <div className="space-y-6">
          {experience.map((exp, idx) => {
            const isExpanded = expandedId === exp.id;
            return (
              <div
                key={exp.id}
                className="bg-white border-4 border-black shadow-[8px_8px_0px_#000000] transition-all duration-200"
              >
                {/* Accordion Header / Summary Row */}
                <button
                  onClick={() => toggleExpand(exp.id)}
                  className="w-full text-left p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white hover:bg-[#FFFDF0] transition-colors cursor-pointer select-none"
                  aria-expanded={isExpanded}
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-black text-[#FFE600] font-mono text-xs font-extrabold px-3 py-1 border-2 border-black">
                        INTERNSHIP 0{idx + 1}
                      </span>
                      <span className="bg-[#FFE600] text-black font-mono text-xs font-extrabold px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#000]">
                        <Calendar className="w-3.5 h-3.5 inline mr-1 stroke-[3]" />
                        {exp.duration}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-black uppercase tracking-tight">
                      {exp.role}
                    </h3>

                    <div className="flex items-center gap-3 font-mono text-sm font-bold text-gray-800">
                      <span className="bg-[#00F0FF] text-black px-2.5 py-0.5 border-2 border-black">
                        @{exp.company}
                      </span>
                      <span className="flex items-center gap-1 text-gray-600 text-xs">
                        <MapPin className="w-3.5 h-3.5 text-[#FF597B]" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Toggle Indicator Button */}
                  <div className="flex items-center gap-3 self-end md:self-center">
                    <span className="font-mono text-xs font-extrabold text-gray-700 hidden sm:inline">
                      {isExpanded ? 'COLLAPSE' : 'EXPAND DETAILS'}
                    </span>
                    <div className={`p-3 border-3 border-black shadow-[3px_3px_0px_#000000] transition-transform duration-200 ${
                      isExpanded ? 'bg-[#FF597B] text-white rotate-180' : 'bg-[#FFE600] text-black'
                    }`}>
                      <ChevronDown className="w-6 h-6 stroke-[3]" />
                    </div>
                  </div>
                </button>

                {/* Expanded Responsibilities & Technologies Body */}
                {isExpanded && (
                  <div className="p-6 sm:p-8 border-t-4 border-black bg-[#FFFDF0] space-y-6 animate-in fade-in duration-200">
                    <div>
                      <h4 className="font-extrabold text-sm uppercase flex items-center gap-2 mb-3 text-black font-mono">
                        <CheckSquare className="w-4 h-4 text-[#FF597B]" />
                        <span>KEY RESPONSIBILITIES & CONTRIBUTIONS:</span>
                      </h4>
                      <ul className="space-y-2.5 text-sm sm:text-base text-gray-900 font-medium">
                        {exp.responsibilities.map((resp, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-3 bg-white p-3 border-2 border-black shadow-[3px_3px_0px_#000]">
                            <span className="bg-black text-[#FFE600] font-mono text-xs font-extrabold px-2 py-0.5 shrink-0 mt-0.5">
                              0{rIdx + 1}
                            </span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies Tag Cloud */}
                    <div>
                      <h4 className="font-extrabold text-sm uppercase flex items-center gap-2 mb-3 text-black font-mono">
                        <Code2 className="w-4 h-4 text-[#00F0FF]" />
                        <span>TECHNOLOGIES UTILIZED:</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map(tech => (
                          <span
                            key={tech}
                            className="bg-black text-white font-mono text-xs font-extrabold px-3 py-1.5 border-2 border-black shadow-[3px_3px_0px_#00F0FF]"
                          >
                            #{tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
