import React from 'react';
import portfolioData from '../data/portfolioData';

export const Education: React.FC = () => {
  const { education } = portfolioData;

  return (
    <>
      <hr className="section-separator -mx-margin-mobile w-[calc(100%+48px)] md:-mx-margin-desktop md:w-[calc(100%+128px)] mt-12" />
      <section className="flex flex-col gap-6 pt-12" id="education">
        <h2 className="font-headline-md text-headline-md font-bold text-primary uppercase border-b-[3px] border-black pb-2 inline-block self-start">
          Education
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((item) => (
            <div 
              key={item.id} 
              className="brutalist-border bg-white p-6 md:p-8 brutalist-shadow relative overflow-hidden flex flex-col gap-4"
            >
              {/* Decorative absolute school icon badge */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#ffeb3b] brutalist-border border-t-0 border-r-0 flex items-center justify-center select-none">
                <span className="material-symbols-outlined text-primary text-2xl">school</span>
              </div>

              <h3 className="font-headline-md text-lg md:text-xl font-bold uppercase pr-16 text-primary">
                {item.degree}
              </h3>
              
              <div className="font-label-mono text-sm text-secondary font-bold uppercase">
                {item.institution}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="font-label-mono text-xs bg-surface-container-low px-2.5 py-1 brutalist-border font-semibold">
                  {item.duration}
                </span>
                
                {item.gpaOrScore && (
                  <span className="font-label-mono text-xs bg-[#ffeb3b] text-primary px-2.5 py-1 brutalist-border font-extrabold shadow-[2px_2px_0px_#000]">
                    {item.gpaOrScore}
                  </span>
                )}
              </div>

              <p className="font-body-md text-sm text-on-surface mt-2">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
