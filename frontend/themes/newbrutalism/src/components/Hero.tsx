import React from 'react';
import portfolioData from '../data/portfolioData';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const { personal } = portfolioData;

  return (
    <section id="home" className="w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop mt-8 md:mt-16 flex flex-col md:grid md:grid-cols-12 gap-12 items-center">
      {/* LEFT COLUMN: Main Typography & Bio */}
      <div className="md:col-span-7 flex flex-col gap-6 w-full">
        <div className="flex flex-col">
          <span className="font-label-mono text-label-mono uppercase text-on-surface-variant bg-surface-variant px-3 py-1.5 self-start brutalist-border mb-4">
            {personal.headline}
          </span>
          
          <h1 className="font-headline-lg-mobile md:font-display-lg text-headline-lg-mobile md:text-display-lg font-black text-primary uppercase leading-[0.9] tracking-tighter break-words">
            {personal.name.split(' ')[0]}
            <br />
            <span className="bg-[#ffeb3b] px-3 py-1 brutalist-border brutalist-shadow inline-block transform rotate-1 mt-2">
              {personal.name.split(' ')[1]}
            </span>
          </h1>
        </div>

        <div className="brutalist-border p-6 bg-white brutalist-shadow flex flex-col gap-6">
          <p className="font-body-lg text-body-lg text-on-surface">
            {personal.summary}
          </p>
          
          <div className="flex flex-wrap gap-4 mt-2">
            <a 
              className="font-label-mono text-label-mono uppercase bg-[#ffeb3b] text-primary px-8 py-4 brutalist-border brutalist-shadow brutalist-button brutalist-button-hover text-center font-bold" 
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Work
            </a>
            
            <button 
              onClick={onOpenResume}
              className="font-label-mono text-label-mono uppercase bg-[#003fd8] text-white px-8 py-4 brutalist-border brutalist-shadow brutalist-button brutalist-button-hover text-center font-bold"
            >
              View Resume
            </button>
            
            <a 
              className="bg-white text-primary p-4 brutalist-border brutalist-shadow brutalist-button brutalist-button-hover flex items-center justify-center font-bold" 
              href={portfolioData.contact.github} 
              target="_blank"
              rel="noreferrer"
            >
              <span className="material-symbols-outlined">code</span>
            </a>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Profile Frame */}
      <div className="md:col-span-5 relative flex justify-center items-center w-full min-h-[350px] md:min-h-[480px]">
        {/* Background Color Block Offset Layer */}
        <div className="absolute w-72 h-80 sm:w-80 sm:h-96 bg-[#003fd8] brutalist-border brutalist-shadow transform rotate-3 -translate-x-2 -translate-y-2"></div>
        <div className="absolute w-72 h-80 sm:w-80 sm:h-96 bg-[#ffeb3b] brutalist-border transform -rotate-3 translate-x-2 translate-y-2"></div>

        {/* Main Avatar Container */}
        <div className="relative w-72 h-80 sm:w-80 sm:h-96 bg-white brutalist-border overflow-hidden brutalist-shadow z-10 group">
          <img
            src={personal.profileImage}
            alt={personal.name}
            className="w-full h-full object-cover object-top filter grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
          />
          {/* Overlay Sticker Tag inside image */}
          <div className="absolute bottom-3 left-3 bg-black text-[#ffeb3b] px-3 py-1.5 text-xs font-mono font-extrabold border-2 border-[#ffeb3b]">
            {personal.name.toUpperCase()} // 2026
          </div>
        </div>
      </div>
    </section>
  );
};
