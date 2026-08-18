import React from 'react';
import { ArrowDownRight, Sparkles, Send, FileText, Code2, Cpu } from 'lucide-react';
import portfolioData from '../data/portfolioData';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const { personal } = portfolioData;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative bg-[#FFFDF0] pt-12 pb-20 md:pt-16 md:pb-28 border-b-4 border-black overflow-hidden">
      
      {/* Background Decorative Accent Grid / Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#000_2px,transparent_2px)] [background-size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN: Main Typography & CTA */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-[#FFE600] text-black font-extrabold px-3.5 py-1.5 border-3 border-black shadow-[4px_4px_0px_#000000] text-xs sm:text-sm tracking-wider uppercase transform -rotate-1">
              <span className="w-3 h-3 bg-[#FF597B] rounded-full border-2 border-black animate-pulse"></span>
              <span>Available for Internships 2026</span>
            </div>

            {/* Oversized Name Header */}
            <div>
              <span className="block text-xs font-mono font-bold tracking-widest text-gray-700 uppercase mb-1">
                // FULL STACK ENGINEER & AI DEVELOPER
              </span>
              <h1 className="text-5xl sm:text-7xl xl:text-8xl font-extrabold tracking-tighter text-black uppercase leading-[0.9] drop-shadow-[4px_4px_0px_#00F0FF]">
                AARAV <br />
                <span className="bg-[#FFE600] px-2 py-0.5 border-4 border-black inline-block shadow-[6px_6px_0px_#000000] mt-1 transform rotate-1">
                  SHARMA
                </span>
              </h1>
            </div>

            {/* Headline Banner Box */}
            <div className="bg-black text-[#00F0FF] p-4 border-4 border-black shadow-[6px_6px_0px_#FF597B] transform -rotate-0.5">
              <p className="font-mono text-base sm:text-xl font-bold tracking-wide flex items-center gap-2">
                <Cpu className="w-6 h-6 text-[#FFE600] shrink-0" />
                <span>FULL STACK DEVELOPER & AI ENTHUSIAST</span>
              </p>
            </div>

            {/* Short Bio Summary */}
            <p className="text-base sm:text-lg text-gray-900 font-medium leading-relaxed max-w-2xl bg-white p-4 border-3 border-black shadow-[4px_4px_0px_#000000]">
              {personal.summary}
            </p>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => scrollToSection('projects')}
                className="flex items-center gap-2 bg-[#FFE600] text-black font-extrabold px-6 py-3.5 text-sm sm:text-base border-3 border-black shadow-[5px_5px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000000] transition-all"
              >
                <span>VIEW MY WORK</span>
                <ArrowDownRight className="w-5 h-5 stroke-[3]" />
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="flex items-center gap-2 bg-[#00F0FF] text-black font-extrabold px-6 py-3.5 text-sm sm:text-base border-3 border-black shadow-[5px_5px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000000] transition-all"
              >
                <span>CONTACT ME</span>
                <Send className="w-4 h-4 stroke-[3]" />
              </button>

              <button
                onClick={onOpenResume}
                className="flex items-center gap-2 bg-[#FF597B] text-white font-extrabold px-6 py-3.5 text-sm sm:text-base border-3 border-black shadow-[5px_5px_0px_#000000] hover:bg-[#A06EE1] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#000000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000000] transition-all"
              >
                <span>RESUME</span>
                <FileText className="w-4 h-4 stroke-[3]" />
              </button>
            </div>

            {/* Quick Tech Tag Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-2 text-xs font-mono font-bold">
              <span className="text-gray-600 font-extrabold uppercase mr-1">TECH STACK:</span>
              {['REACT', 'PYTHON', 'NODE.JS', 'FLASK', 'TAILWIND', 'JAVA'].map((tech) => (
                <span key={tech} className="bg-white text-black px-2.5 py-1 border-2 border-black shadow-[2px_2px_0px_#000000]">
                  {tech}
                </span>
              ))}
            </div>

          </div>

          {/* RIGHT COLUMN: Unconventional Brutalist Avatar Frame */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Background Color Block Offset Layer */}
            <div className="absolute w-72 h-80 sm:w-80 sm:h-96 bg-[#00F0FF] border-4 border-black shadow-[12px_12px_0px_#000000] transform rotate-3 -translate-x-2 -translate-y-2"></div>
            <div className="absolute w-72 h-80 sm:w-80 sm:h-96 bg-[#FF597B] border-4 border-black transform -rotate-3 translate-x-2 translate-y-2"></div>

            {/* Main Avatar Container */}
            <div className="relative w-72 h-80 sm:w-80 sm:h-96 bg-[#FFE600] border-4 border-black overflow-hidden shadow-[10px_10px_0px_#000000] z-10 group">
              <img
                src={personal.profileImage}
                alt={personal.name}
                className="w-full h-full object-cover object-top filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300"
              />
              
              {/* Overlay Sticker Tag inside image */}
              <div className="absolute bottom-3 left-3 bg-black text-[#FFE600] px-3 py-1 text-xs font-mono font-extrabold border-2 border-[#FFE600] shadow-[2px_2px_0px_#000]">
                AARAV SHARMA // 2026
              </div>
            </div>

            {/* Floating Decorative Badges & Labels */}
            <div className="absolute -top-4 -right-2 z-20 bg-[#FF9F29] text-black font-extrabold px-3 py-1.5 border-3 border-black shadow-[4px_4px_0px_#000000] text-xs transform rotate-6 flex items-center gap-1">
              <Sparkles className="w-4 h-4 fill-black" />
              <span>B.TECH CSE</span>
            </div>

            <div className="absolute -bottom-6 -left-4 z-20 bg-[#CCFF00] text-black font-extrabold px-4 py-2 border-3 border-black shadow-[4px_4px_0px_#000000] text-xs uppercase transform -rotate-4 flex items-center gap-2">
              <Code2 className="w-4 h-4 stroke-[3]" />
              <span>GLA UNIVERSITY</span>
            </div>

            <div className="absolute top-1/2 -left-8 z-20 bg-black text-white font-mono font-bold text-xs p-2 border-2 border-white shadow-[3px_3px_0px_#FFE600] transform -rotate-90 hidden sm:block">
              BUILD // CODE // DEPLOY
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
