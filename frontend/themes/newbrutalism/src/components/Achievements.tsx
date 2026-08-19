import React from 'react';
import portfolioData from '../data/portfolioData';

export const Achievements: React.FC = () => {
  const { achievements } = portfolioData;

  const getAchievementIcon = (type: string) => {
    switch (type) {
      case 'Certification': return 'card_membership';
      case 'Achievement': return 'emoji_events';
      case 'Workshop': return 'star';
      default: return 'award_star';
    }
  };

  return (
    <>
      <hr className="section-separator -mx-margin-mobile w-[calc(100%+48px)] md:-mx-margin-desktop md:w-[calc(100%+128px)] mt-12" />
      <section className="flex flex-col gap-6 pt-12" id="achievements">
        <h2 className="font-headline-md text-headline-md font-bold text-primary uppercase border-b-[3px] border-black pb-2 inline-block self-start">
          Achievements
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((item) => (
            <div 
              key={item.id} 
              className="brutalist-border bg-white p-6 brutalist-shadow flex flex-col justify-between relative group hover:-translate-y-1 transition-all"
            >
              <div>
                {/* Big number badge */}
                <div className="w-14 h-14 bg-[#ffeb3b] brutalist-border shadow-[3px_3px_0px_#000] flex items-center justify-center font-label-mono text-xl font-bold mb-4 select-none">
                  {item.numberStr}
                </div>

                <div className="flex items-center gap-2 mb-2 select-none">
                  <span className="font-label-mono text-[9px] uppercase px-2 py-0.5 bg-black text-white">
                    {item.type}
                  </span>
                  <span className="font-label-mono text-xs font-bold text-on-surface-variant">
                    {item.year}
                  </span>
                </div>

                <h3 className="font-headline-md text-lg font-bold uppercase text-primary mb-1">
                  {item.title}
                </h3>

                <div className="font-label-mono text-xs text-secondary font-bold mb-3">
                  @{item.organization}
                </div>

                <p className="font-body-md text-sm text-on-surface">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t-2 border-black flex items-center justify-between select-none">
                <span className="font-label-mono text-[9px] font-bold text-on-surface-variant">
                  STATUS // VERIFIED
                </span>
                <span className="material-symbols-outlined text-primary text-xl">
                  {getAchievementIcon(item.type)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
