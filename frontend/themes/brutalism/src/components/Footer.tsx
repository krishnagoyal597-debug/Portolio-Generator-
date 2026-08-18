import React from 'react';
import { ArrowUp, Terminal, Mail, Heart } from 'lucide-react';
import portfolioData from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export const Footer: React.FC = () => {
  const { contact } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white border-t-4 border-black pt-16 pb-12 relative overflow-hidden select-none">
      
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#FFF_2px,transparent_2px)] [background-size:20px_20px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Footer Banner Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b-3 border-gray-800">
          
          {/* Brand & Slogan Column */}
          <div className="md:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#FFE600] text-black font-extrabold px-4 py-2 border-3 border-white shadow-[4px_4px_0px_#00F0FF]">
              <Terminal className="w-5 h-5 stroke-[2.5]" />
              <span className="tracking-tight text-lg uppercase font-mono">AARAV SHARMA</span>
            </div>

            <p className="text-xl font-extrabold text-[#00F0FF] uppercase tracking-wide">
              "BUILT WITH CREATIVITY & CODE."
            </p>

            <p className="text-sm text-gray-400 font-mono max-w-md leading-relaxed">
              Neo-Brutalist portfolio showcase built for the AI Portfolio Generator platform. Data-driven React architecture designed for seamless resume parsing integration.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs font-bold">
            <div className="text-[#FFE600] uppercase text-sm font-extrabold tracking-wider border-b-2 border-gray-800 pb-1">
              NAVIGATION
            </div>
            <div className="grid grid-cols-2 gap-2 text-gray-300">
              <a href="#home" className="hover:text-[#FFE600] transition-colors">✦ HOME</a>
              <a href="#about" className="hover:text-[#FFE600] transition-colors">✦ ABOUT</a>
              <a href="#skills" className="hover:text-[#FFE600] transition-colors">✦ SKILLS</a>
              <a href="#education" className="hover:text-[#FFE600] transition-colors">✦ EDUCATION</a>
              <a href="#experience" className="hover:text-[#FFE600] transition-colors">✦ EXPERIENCE</a>
              <a href="#projects" className="hover:text-[#FFE600] transition-colors">✦ PROJECTS</a>
              <a href="#achievements" className="hover:text-[#FFE600] transition-colors">✦ HONORS</a>
              <a href="#contact" className="hover:text-[#FFE600] transition-colors">✦ CONTACT</a>
            </div>
          </div>

          {/* Social Links Column */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-[#FF597B] font-mono text-sm font-extrabold tracking-wider border-b-2 border-gray-800 pb-1 uppercase">
              CONNECT
            </div>
            
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-gray-900 text-white border-2 border-white shadow-[3px_3px_0px_#FFE600] hover:bg-[#FFE600] hover:text-black transition-all"
                aria-label="GitHub"
              >
                <GithubIcon className="w-5 h-5" />
              </a>

              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-gray-900 text-white border-2 border-white shadow-[3px_3px_0px_#00F0FF] hover:bg-[#00F0FF] hover:text-black transition-all"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>

              <a
                href={`mailto:${contact.email}`}
                className="p-2.5 bg-gray-900 text-white border-2 border-white shadow-[3px_3px_0px_#FF597B] hover:bg-[#FF597B] hover:text-white transition-all"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 stroke-[2.5]" />
              </a>
            </div>

            <div className="text-xs font-mono text-gray-400 pt-2">
              NEW DELHI, INDIA 🇮🇳
            </div>
          </div>

        </div>

        {/* Bottom Footer Bar & Back To Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs font-bold text-gray-400">
          <div>
            © 2026 AARAV SHARMA. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-gray-400">
              CRAFTED WITH <Heart className="w-3.5 h-3.5 text-[#FF597B] fill-[#FF597B] inline" /> IN REACT
            </span>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 bg-[#FFE600] text-black font-extrabold px-3 py-1.5 border-2 border-white shadow-[3px_3px_0px_#00F0FF] hover:bg-[#00F0FF] transition-all cursor-pointer"
              aria-label="Scroll back to top"
            >
              <span>TOP</span>
              <ArrowUp className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
