import React from 'react';
import { Award, Medal, ShieldCheck, Trophy, Sparkles, Star } from 'lucide-react';
import portfolioData from '../data/portfolioData';

const getBadgeIcon = (type) => {
  switch (type?.toLowerCase()) {
    case 'certification':
      return ShieldCheck;
    case 'award':
      return Trophy;
    default:
      return Medal;
  }
};

const Achievements = () => {
  const { achievements } = portfolioData;

  return (
    <section id="achievements" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-semibold uppercase tracking-wider text-purple-300 mb-3">
          <Award className="w-3.5 h-3.5" />
          <span>Honors & Certifications</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Achievements & <span className="text-gradient-vibrant">Recognitions</span>
        </h2>
        <div className="w-20 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mt-4 shadow-[0_0_15px_rgba(236,72,153,0.5)]" />
      </div>

      {/* Grid of Achievement Glass Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {achievements.map((item) => {
          const IconComponent = getBadgeIcon(item.type);
          return (
            <div
              key={item.id}
              className="p-6 sm:p-8 rounded-3xl glass-card border border-white/15 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Corner Glow Highlight */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-600/15 rounded-full blur-2xl group-hover:bg-pink-600/25 transition-all" />

              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl glass-pill flex items-center justify-center text-purple-300 group-hover:text-white group-hover:bg-purple-600/30 transition-all shadow-md">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-purple-200 border border-white/10 uppercase tracking-wider">
                      {item.type}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold glass-pill text-cyan-300">
                      {item.year}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-200 transition-colors">
                  {item.title}
                </h3>
                
                <div className="text-sm font-semibold text-pink-400 mb-4">
                  {item.organization}
                </div>

                {item.description && (
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light mb-4">
                    {item.description}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center gap-1.5 text-xs text-purple-300">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Verified Accomplishment</span>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
};

export default Achievements;
