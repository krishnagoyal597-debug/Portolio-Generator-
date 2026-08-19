import React from 'react';
import portfolioData from '../data/portfolioData';

export const Footer: React.FC = () => {
  const { personal, contact } = portfolioData;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-20 flex flex-col md:flex-row justify-between items-center gap-6 bg-primary p-12 border-t-[3px] border-primary text-white">
      <div className="flex flex-col items-center md:items-start gap-6 w-full">
        <span className="font-headline-lg text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">
          {personal.name.replace(" ", "_")}
        </span>
        
        <p className="font-label-mono text-label-mono text-white/80 text-center md:text-left text-xs">
          © {currentYear} {personal.name.toUpperCase()}. NO TEMPLATES USED.
        </p>

        <nav className="flex flex-wrap justify-center md:justify-start gap-6 mt-4 md:mt-0 font-label-mono text-xs">
          <a 
            className="text-white/80 hover:text-[#ffeb3b] transition-colors" 
            href={contact.github} 
            target="_blank" 
            rel="noreferrer"
          >
            GITHUB
          </a>
          <a 
            className="text-white/80 hover:text-[#ffeb3b] transition-colors" 
            href={contact.linkedin} 
            target="_blank" 
            rel="noreferrer"
          >
            LINKEDIN
          </a>
          <a 
            className="text-white/80 hover:text-[#ffeb3b] transition-colors" 
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            BACK TO TOP
          </a>
        </nav>
      </div>
    </footer>
  );
};
