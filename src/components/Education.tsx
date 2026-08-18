import React from 'react';
import { GraduationCap, Calendar, CheckCircle } from 'lucide-react';
import portfolioData from '../data/portfolioData';

export const Education: React.FC = () => {
  const { education } = portfolioData;

  return (
    <section id="education" className="py-20 bg-[#FFFDF0] border-b-4 border-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-3 bg-[#FF597B] text-white px-6 py-3 border-4 border-black shadow-[6px_6px_0px_#000000] transform -rotate-1 mb-3">
            <GraduationCap className="w-7 h-7 stroke-[3]" />
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase">ACADEMIC EDUCATION</h2>
          </div>
          <p className="font-mono text-sm font-bold text-gray-700 uppercase">
            // FORMAL EDUCATION & ACADEMIC ACHIEVEMENTS
          </p>
        </div>

        {/* Brutalist Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {education.map((item, index) => (
            <div
              key={item.id}
              className={`bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_#000000] relative flex flex-col justify-between hover:-translate-y-1 hover:shadow-[12px_12px_0px_#000000] transition-all ${
                item.isHighlighted ? 'ring-2 ring-black' : ''
              }`}
            >
              {/* Top Accent Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b-3 border-black">
                <div className="flex items-center gap-2 bg-[#FFE600] text-black px-3.5 py-1 font-mono text-xs font-extrabold border-2 border-black shadow-[3px_3px_0px_#000]">
                  <Calendar className="w-4 h-4 stroke-[3]" />
                  <span>{item.duration}</span>
                </div>

                <div className="bg-[#00F0FF] text-black font-extrabold px-3.5 py-1 font-mono text-xs border-2 border-black shadow-[3px_3px_0px_#000]">
                  {item.gpaOrScore}
                </div>
              </div>

              {/* Main Content */}
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold text-gray-600 uppercase">
                  // DEGREE 0{index + 1}
                </span>

                <h3 className="text-2xl font-extrabold text-black uppercase leading-tight">
                  {item.degree}
                </h3>

                <div className="inline-block bg-black text-[#FFE600] font-mono text-sm font-bold px-3 py-1 border-2 border-black">
                  {item.institution}
                </div>

                <p className="text-gray-800 text-sm sm:text-base font-medium leading-relaxed pt-2">
                  {item.description}
                </p>
              </div>

              {/* Bottom Decorative Indicator */}
              <div className="mt-6 pt-4 border-t-2 border-black flex items-center justify-between text-xs font-mono font-bold text-gray-700">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#FF597B]" />
                  VERIFIED DEGREE
                </span>
                <span>GLA MATHURA</span>
              </div>

              {/* Floating Decorative Stamp */}
              {item.isHighlighted && (
                <div className="absolute -top-3 -right-3 bg-[#CCFF00] text-black font-mono text-xs font-extrabold px-3 py-1 border-2 border-black shadow-[3px_3px_0px_#000] rotate-6 uppercase">
                  CURRENT ENROLLMENT
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
