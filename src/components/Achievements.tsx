import React from 'react';
import { Award, Trophy, Star, Sparkles } from 'lucide-react';
import portfolioData from '../data/portfolioData';

export const Achievements: React.FC = () => {
  const { achievements } = portfolioData;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Certification': return <Award className="w-6 h-6 stroke-[3]" />;
      case 'Achievement': return <Trophy className="w-6 h-6 stroke-[3]" />;
      case 'Workshop': return <Star className="w-6 h-6 stroke-[3]" />;
      default: return <Sparkles className="w-6 h-6 stroke-[3]" />;
    }
  };

  return (
    <section id="achievements" className="py-20 bg-[#FFFDF0] border-b-4 border-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-3 bg-[#9D4EDD] text-white px-6 py-3 border-4 border-black shadow-[6px_6px_0px_#000000] transform -rotate-1 mb-3">
            <Trophy className="w-7 h-7 stroke-[3]" />
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase">HONORS & ACHIEVEMENTS</h2>
          </div>
          <p className="font-mono text-sm font-bold text-gray-700 uppercase">
            // CERTIFICATIONS, HACKATHON RECOGNITIONS & WORKSHOPS
          </p>
        </div>

        {/* Achievements Grid with Large Brutalist Numbers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((item) => (
            <div
              key={item.id}
              className="bg-white border-4 border-black shadow-[8px_8px_0px_#000000] p-6 flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-[12px_12px_0px_#000000] transition-all relative group"
            >
              <div>
                {/* Large Oversized Brutalist Number */}
                <div 
                  style={{ backgroundColor: item.accentColor }}
                  className="w-16 h-16 border-3 border-black shadow-[4px_4px_0px_#000000] flex items-center justify-center text-3xl font-mono font-extrabold text-black mb-6 transform -rotate-3 group-hover:rotate-0 transition-transform"
                >
                  {item.numberStr}
                </div>

                {/* Achievement Metadata */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-black text-white font-mono text-[10px] font-extrabold px-2 py-0.5 border border-black uppercase">
                    {item.type}
                  </span>
                  <span className="font-mono text-xs font-extrabold text-gray-700">
                    {item.year}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-black uppercase leading-tight mb-2">
                  {item.title}
                </h3>

                <div className="font-mono text-xs font-bold text-gray-800 bg-[#FFFDF0] p-2 border-2 border-black mb-3 inline-block">
                  @{item.organization}
                </div>

                <p className="text-gray-800 text-xs sm:text-sm font-medium leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom Icon Badge */}
              <div className="mt-6 pt-4 border-t-2 border-black flex items-center justify-between">
                <span className="font-mono text-[10px] font-extrabold text-gray-600 uppercase">
                  STATUS: VERIFIED
                </span>
                <div className="p-1.5 bg-[#FFE600] border-2 border-black text-black">
                  {getTypeIcon(item.type)}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
