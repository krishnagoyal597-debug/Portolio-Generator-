import React from 'react';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';
import portfolioData from '../data/portfolioData';

export default function Education() {
  return (
    <section id="education" className="py-24 px-6 sm:px-8 border-t border-minimal-border bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center space-x-2 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-minimal-subtle">
            03 / EDUCATION
          </span>
          <span className="h-[1px] w-12 bg-neutral-300" />
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-minimal-dark mb-12">
          Academic Foundation
        </h2>

        {/* Timeline */}
        <div className="relative pl-6 sm:pl-8 border-l border-neutral-200 space-y-12">
          {portfolioData.education.map((edu, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Node Bullet */}
              <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white bg-minimal-dark shadow-xs group-hover:scale-125 transition-transform duration-200" />

              <div className="bg-minimal-card p-6 sm:p-8 rounded-2xl border border-minimal-border group-hover:border-neutral-300 group-hover:bg-white transition-all duration-300 shadow-2xs group-hover:shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                  <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-minimal-dark px-3 py-1 bg-white border border-neutral-200 rounded-full w-fit">
                    <Calendar className="w-3 h-3 mr-1.5 text-neutral-500" />
                    {edu.duration}
                  </span>
                  <span className="flex items-center text-xs text-neutral-500">
                    <MapPin className="w-3.5 h-3.5 mr-1" />
                    {edu.location}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-minimal-dark mb-1">
                  {edu.degree}
                </h3>
                <p className="text-sm font-semibold text-minimal-subtle mb-4 flex items-center">
                  <GraduationCap className="w-4 h-4 mr-1.5 text-neutral-400" />
                  {edu.institution}
                </p>

                <p className="text-sm text-neutral-600 leading-relaxed">
                  {edu.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
