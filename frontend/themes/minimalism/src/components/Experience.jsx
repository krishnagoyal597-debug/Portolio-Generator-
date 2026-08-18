import React, { useState } from 'react';
import { ChevronDown, Calendar, MapPin, Briefcase, CheckCircle2 } from 'lucide-react';
import portfolioData from '../data/portfolioData';

export default function Experience() {
  // Track open accordion indices (first open by default)
  const [openItems, setOpenItems] = useState([0]);

  const toggleAccordion = (idx) => {
    setOpenItems((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <section id="experience" className="py-24 px-6 sm:px-8 border-t border-minimal-border bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center space-x-2 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-minimal-subtle">
            04 / EXPERIENCE
          </span>
          <span className="h-[1px] w-12 bg-neutral-300" />
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-minimal-dark mb-12">
          Professional Journey
        </h2>

        {/* Experience List Accordion */}
        <div className="divide-y divide-minimal-border border-t border-b border-minimal-border">
          {portfolioData.experience.map((exp, idx) => {
            const isOpen = openItems.includes(idx);

            return (
              <div key={exp.id || idx} className="py-6 transition-colors">
                {/* Accordion Header */}
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex flex-col sm:flex-row sm:items-center justify-between text-left group cursor-pointer focus:outline-hidden"
                >
                  <div className="space-y-1 mb-2 sm:mb-0">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-xl font-bold text-minimal-dark group-hover:text-black transition-colors">
                        {exp.role}
                      </h3>
                      <span className="text-sm font-medium text-minimal-subtle">
                        @ {exp.company}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500">
                      <span className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1" />
                        {exp.duration}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="w-3.5 h-3.5 mr-1" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 self-start sm:self-center">
                    <span className="text-xs font-medium text-neutral-400 group-hover:text-minimal-dark transition-colors">
                      {isOpen ? 'Collapse' : 'Details'}
                    </span>
                    <div
                      className={`p-1.5 rounded-full border border-neutral-200 bg-white transition-transform duration-300 ${
                        isOpen ? 'rotate-180 bg-minimal-hoverBg' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4 text-minimal-dark" />
                    </div>
                  </div>
                </button>

                {/* Accordion Content */}
                {isOpen && (
                  <div className="mt-6 pt-4 space-y-5 animate-fadeIn">
                    <p className="text-sm text-neutral-700 leading-relaxed font-medium">
                      {exp.description}
                    </p>

                    {/* Key Responsibilities */}
                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                          Key Impact & Deliverables
                        </h4>
                        <ul className="space-y-2">
                          {exp.responsibilities.map((resp, rIdx) => (
                            <li key={rIdx} className="flex items-start text-sm text-neutral-600">
                              <CheckCircle2 className="w-4 h-4 text-minimal-dark mr-2 mt-0.5 shrink-0" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Technologies Tag Pills */}
                    {exp.technologies && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs font-semibold tracking-wide text-minimal-dark bg-minimal-card border border-minimal-border rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
