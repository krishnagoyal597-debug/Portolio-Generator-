import React from 'react';
import { GraduationCap, Calendar, MapPin, Award, CheckCircle2 } from 'lucide-react';
import portfolioData from '../data/portfolioData';

const Education = () => {
  const { education } = portfolioData;

  return (
    <section id="education" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-10">
      
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-semibold uppercase tracking-wider text-purple-300 mb-3">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Academic Foundation</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Education & <span className="text-gradient-vibrant">Qualifications</span>
        </h2>
        <div className="w-20 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mt-4 shadow-[0_0_15px_rgba(236,72,153,0.5)]" />
      </div>

      {/* Timeline Wrapper */}
      <div className="relative pl-6 sm:pl-8 space-y-12 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-purple-500 before:via-pink-500 before:to-transparent">
        
        {education.map((edu) => (
          <div key={edu.id} className="relative group">
            
            {/* Glowing Timeline Node */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 border-4 border-[#090014] shadow-[0_0_15px_rgba(236,72,153,0.8)] group-hover:scale-125 transition-transform duration-300 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            </div>

            {/* Glass Timeline Card */}
            <div className="p-6 sm:p-8 rounded-3xl glass-card border border-white/15 backdrop-blur-xl transition-all duration-300 group-hover:-translate-y-1">
              
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    {edu.degree}
                  </h3>
                  <div className="text-base font-semibold text-pink-400 mt-1">
                    {edu.institution}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-xs font-semibold text-purple-200">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{edu.duration}</span>
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-300">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{edu.location}</span>
                  </span>
                </div>
              </div>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-light">
                {edu.description}
              </p>

              {/* Highlights */}
              {edu.highlights && edu.highlights.length > 0 && (
                <div className="pt-4 border-t border-white/10 space-y-2">
                  {edu.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-purple-200">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}

            </div>

          </div>
        ))}

      </div>

    </section>
  );
};

export default Education;
