import React from 'react';
import portfolioData from '../data/portfolioData';

export const About: React.FC = () => {
  const { personal, projects, skills, experience, achievements } = portfolioData;

  const totalSkillsCount = skills.reduce((acc, cat) => acc + cat.skills.length, 0);

  const stats = [
    {
      value: `0${projects.length}+`,
      label: 'Selected Projects',
    },
    {
      value: `${totalSkillsCount}+`,
      label: 'Core Skills',
    },
    {
      value: `0${experience.length}+`,
      label: 'Professional Exp.',
    },
    {
      value: `0${achievements.length}+`,
      label: 'Achievements',
    }
  ];

  return (
    <>
      <hr className="section-separator -mx-margin-mobile w-[calc(100%+48px)] md:-mx-margin-desktop md:w-[calc(100%+128px)] mt-12" />
      <section className="flex flex-col gap-6 pt-12" id="about">
        <h2 className="font-headline-md text-headline-md font-bold text-primary uppercase border-b-[3px] border-black pb-2 inline-block self-start">
          About
        </h2>
        
        <div className="brutalist-border bg-white p-6 md:p-12 brutalist-shadow flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <p className="font-body-lg text-body-lg text-on-surface font-semibold uppercase tracking-tight">
                Building robust, scalable backends and engaging frontends. Focused on performance and clean code.
              </p>
              <p className="font-body-md text-body-md text-on-surface">
                {personal.summary}
              </p>
            </div>
            
            <div className="flex flex-col gap-4 justify-between">
              <div className="flex flex-col gap-2 font-body-md text-body-md text-on-surface">
                <p>
                  I enjoy working at the intersection of robust backend architectures and highly interactive, snappy user interfaces. I strive to make web platforms feel physical, tactile, and performant.
                </p>
                <div className="flex flex-wrap gap-2.5 mt-2">
                  {personal.badges.map((badge) => (
                    <span 
                      key={badge} 
                      className="px-3.5 py-1.5 font-label-mono text-xs font-bold border-2 border-black bg-[#ffeb3b] text-primary uppercase shadow-[2px_2px_0px_#000]"
                    >
                      ✦ {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {stats.map((stat, i) => (
              <div key={i} className="brutalist-border p-5 bg-surface-container-low">
                <span className="font-headline-md text-headline-md font-black text-secondary block">
                  {stat.value}
                </span>
                <span className="font-label-mono text-label-mono text-on-surface-variant uppercase text-xs">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
