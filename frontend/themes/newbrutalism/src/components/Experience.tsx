import React from 'react';
import portfolioData from '../data/portfolioData';

export const Experience: React.FC = () => {
  const { experience } = portfolioData;

  return (
    <>
      <hr className="section-separator -mx-margin-mobile w-[calc(100%+48px)] md:-mx-margin-desktop md:w-[calc(100%+128px)] mt-12" />
      <section className="flex flex-col gap-6 pt-12" id="experience">
        <h2 className="font-headline-md text-headline-md font-bold text-primary uppercase border-b-[3px] border-black pb-2 inline-block self-start">
          Experience
        </h2>
        
        <div className="flex flex-col gap-0 brutalist-border bg-white brutalist-shadow">
          {experience.map((item) => (
            <div 
              key={item.id} 
              className="p-6 md:p-8 border-b-[3px] border-black last:border-b-0 flex flex-col gap-4"
            >
              <div className="flex flex-wrap justify-between items-start gap-2">
                <h3 className="font-headline-md text-xl md:text-2xl font-bold uppercase text-primary">
                  {item.role}
                </h3>
                <span className="font-label-mono text-xs bg-surface-container-low px-3 py-1.5 brutalist-border select-none">
                  {item.duration}
                </span>
              </div>
              
              <div className="font-label-mono text-sm text-secondary font-bold uppercase flex items-center gap-2">
                <span>{item.company}</span>
                <span className="text-gray-400 font-normal">|</span>
                <span className="text-on-surface-variant font-medium text-xs">{item.location}</span>
              </div>

              {/* Responsibilities list with custom arrows */}
              <ul className="flex flex-col gap-2 mt-2">
                {item.responsibilities.map((resp, i) => (
                  <li key={i} className="flex gap-2 font-body-md text-sm text-on-surface items-start">
                    <span className="text-secondary font-bold font-mono select-none shrink-0">-&gt;</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies used */}
              <div className="flex flex-wrap gap-2 mt-2">
                {item.technologies.map((tech) => (
                  <span 
                    key={tech} 
                    className="font-label-mono text-[10px] uppercase px-2.5 py-1 bg-surface-container-low brutalist-border font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
