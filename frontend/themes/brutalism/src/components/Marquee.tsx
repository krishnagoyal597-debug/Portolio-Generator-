import React from 'react';
import { Sparkles } from 'lucide-react';

const marqueeItems = [
  "FULL STACK DEVELOPER",
  "AI ENTHUSIAST",
  "CREATIVE BUILDER",
  "REACT & PYTHON",
  "NEO-BRUTALISM UI",
  "REST APIS & SYSTEMS",
  "GLA UNIVERSITY",
  "OPEN FOR INTERNSHIPS"
];

export const Marquee: React.FC = () => {
  return (
    <div className="relative bg-black text-[#FFE600] border-y-4 border-black py-4 overflow-hidden select-none z-20">
      <div className="flex w-[200%] animate-marquee whitespace-nowrap">
        
        {/* First copy of items */}
        <div className="flex items-center gap-8 pr-8 text-base sm:text-xl font-extrabold tracking-widest font-mono uppercase">
          {marqueeItems.map((item, idx) => (
            <React.Fragment key={`m1-${idx}`}>
              <span className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[#00F0FF] fill-[#00F0FF]" />
                {item}
              </span>
              <span className="text-[#FF597B] font-extrabold text-2xl">✦</span>
            </React.Fragment>
          ))}
        </div>

        {/* Second identical copy for seamless infinite loop */}
        <div className="flex items-center gap-8 pr-8 text-base sm:text-xl font-extrabold tracking-widest font-mono uppercase" aria-hidden="true">
          {marqueeItems.map((item, idx) => (
            <React.Fragment key={`m2-${idx}`}>
              <span className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[#00F0FF] fill-[#00F0FF]" />
                {item}
              </span>
              <span className="text-[#FF597B] font-extrabold text-2xl">✦</span>
            </React.Fragment>
          ))}
        </div>

      </div>
    </div>
  );
};
