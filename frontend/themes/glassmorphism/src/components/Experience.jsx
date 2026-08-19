import React, { useState } from 'react';
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp, CheckCircle2, Sparkles } from 'lucide-react';
import portfolioData from '../data/portfolioData';

const Experience = () => {
  const { experience } = portfolioData;
  const [expandedId, setExpandedId] = useState(experience[0]?.id || 1);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experience" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-10">
      
      {/* Section Title */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-semibold uppercase tracking-wider text-purple-300 mb-3">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Work History</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Professional <span className="text-gradient-vibrant">Experience</span>
        </h2>
        <div className="w-20 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mt-4 shadow-[0_0_15px_rgba(236,72,153,0.5)]" />
      </div>

      {/* Accordion Experience Cards List */}
      <div className="space-y-6">
        {experience.map((exp) => {
          const isExpanded = expandedId === exp.id;
          return (
            <div
              key={exp.id}
              className={`rounded-3xl glass-card border transition-all duration-300 overflow-hidden ${
                isExpanded 
                  ? 'border-purple-400/40 bg-white/[0.09] shadow-[0_10px_35px_rgba(139,92,246,0.25)]' 
                  : 'border-white/15 hover:border-white/25'
              }`}
            >
              {/* Header Bar - Clickable to Toggle */}
              <div
                onClick={() => toggleExpand(exp.id)}
                className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer select-none"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {exp.role}
                    </h3>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-400/30">
                      {exp.type || 'Full-time'}
                    </span>
                  </div>
                  
                  <div className="text-base font-semibold text-pink-400">
                    {exp.company}
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-auto">
                  <div className="flex flex-col items-end text-xs text-gray-300 gap-1">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full glass-pill font-semibold text-purple-200">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{exp.duration}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{exp.location}</span>
                    </span>
                  </div>

                  <div className="w-9 h-9 rounded-full glass-pill flex items-center justify-center text-purple-300">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Brief Description Always Visible */}
              <div className="px-6 sm:px-8 pb-4">
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
                  {exp.description}
                </p>
              </div>

              {/* Expanded Accordion Body */}
              {isExpanded && (
                <div className="px-6 sm:px-8 pb-8 pt-4 border-t border-white/10 space-y-6 animate-fade-in">
                  
                  {/* Responsibilities */}
                  {exp.responsibilities && (
                    <div>
                      <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-pink-400" />
                        <span>Key Accomplishments & Responsibilities</span>
                      </h4>
                      <ul className="space-y-2.5">
                        {exp.responsibilities.map((resp, index) => (
                          <li key={index} className="flex items-start gap-3 text-sm text-gray-200">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies Used */}
                  {exp.technologies && (
                    <div>
                      <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-3">
                        Technologies & Tools
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-full glass-pill text-xs font-medium text-purple-200 border border-purple-400/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>
          );
        })}
      </div>

    </section>
  );
};

export default Experience;
