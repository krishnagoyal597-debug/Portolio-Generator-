import React from 'react';
import { User, MapPin, Target, Compass, Sparkles, CheckCircle2 } from 'lucide-react';
import portfolioData from '../data/portfolioData';

export const About: React.FC = () => {
  const { personal, projects, skills, experience, achievements } = portfolioData;

  const totalSkillsCount = skills.reduce((acc, cat) => acc + cat.skills.length, 0);

  const stats = [
    {
      value: `0${projects.length}+`,
      label: 'PROJECTS',
      subtext: 'Built & Deployed',
      bgColor: '#FFE600'
    },
    {
      value: `${totalSkillsCount}+`,
      label: 'SKILLS',
      subtext: 'Tech & Frameworks',
      bgColor: '#00F0FF'
    },
    {
      value: `0${experience.length}+`,
      label: 'EXPERIENCES',
      subtext: 'Internships Worked',
      bgColor: '#FF597B'
    },
    {
      value: `0${achievements.length}+`,
      label: 'ACHIEVEMENTS',
      subtext: 'Certifications & Honors',
      bgColor: '#CCFF00'
    }
  ];

  return (
    <section id="about" className="py-20 bg-[#FFFDF0] border-b-4 border-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
          <div className="inline-flex items-center gap-3 bg-black text-[#FFE600] px-6 py-3 border-4 border-black shadow-[6px_6px_0px_#00F0FF] transform -rotate-1">
            <User className="w-7 h-7 stroke-[3]" />
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase">ABOUT ME</h2>
          </div>

          {/* Quick Badges Tags */}
          <div className="flex flex-wrap gap-2.5">
            {personal.badges.map((badge, idx) => (
              <span
                key={badge}
                className={`px-3.5 py-1.5 font-mono text-xs font-extrabold border-3 border-black shadow-[3px_3px_0px_#000000] uppercase ${
                  idx % 3 === 0 ? 'bg-[#FFE600]' : idx % 3 === 1 ? 'bg-[#00F0FF]' : 'bg-[#FF597B] text-white'
                }`}
              >
                ✦ {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Large Editorial Block & Badges */}
          <div className="lg:col-span-5 bg-[#FFE600] p-8 border-4 border-black shadow-[10px_10px_0px_#000000] flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-6 relative z-10">
              <span className="bg-black text-white font-mono text-xs font-extrabold px-3 py-1 border-2 border-white shadow-[2px_2px_0px_#FF597B] inline-block uppercase">
                // PASSION & PURPOSE
              </span>

              <h3 className="text-4xl sm:text-5xl font-extrabold text-black uppercase leading-none tracking-tight">
                BUILDING DIGITAL <br />
                <span className="bg-white px-2 border-3 border-black shadow-[4px_4px_0px_#000]">SOLUTIONS</span> <br />
                WITH PURPOSE.
              </h3>

              <p className="text-base text-gray-900 font-medium leading-relaxed bg-white/90 p-4 border-3 border-black shadow-[4px_4px_0px_#000000]">
                Aarav Sharma is a Computer Science undergraduate and aspiring full-stack developer who enjoys building scalable web applications and experimenting with artificial intelligence.
              </p>
            </div>

            {/* Quick Metadata Box */}
            <div className="mt-8 pt-6 border-t-3 border-black space-y-3 font-mono text-xs font-bold text-black">
              <div className="flex items-center gap-2 bg-white p-2.5 border-2 border-black shadow-[3px_3px_0px_#000]">
                <MapPin className="w-4 h-4 text-[#FF597B] shrink-0 stroke-[3]" />
                <span>LOCATION: {personal.location.toUpperCase()}</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-2.5 border-2 border-black shadow-[3px_3px_0px_#000]">
                <Target className="w-4 h-4 text-[#00F0FF] shrink-0 stroke-[3]" />
                <span>FOCUS: FULL STACK WEB & GEN-AI APPS</span>
              </div>
              <div className="flex items-center gap-2 bg-white p-2.5 border-2 border-black shadow-[3px_3px_0px_#000]">
                <Compass className="w-4 h-4 text-[#9D4EDD] shrink-0 stroke-[3]" />
                <span>STATUS: B.TECH CSE (CLASS OF 2028)</span>
              </div>
            </div>

            {/* Decorative Corner Label */}
            <div className="absolute -bottom-4 -right-4 bg-black text-[#FFE600] font-mono text-xs font-bold px-4 py-2 border-2 border-black rotate-12">
              AARAV.DEV
            </div>
          </div>

          {/* RIGHT: Detailed Bio Card & Dynamic Calculated Stats */}
          <div className="lg:col-span-7 space-y-8 flex flex-col justify-between">
            
            {/* Detailed Summary Card */}
            <div className="bg-white p-6 sm:p-8 border-4 border-black shadow-[10px_10px_0px_#000000] relative">
              <div className="flex items-center justify-between border-b-3 border-black pb-4 mb-4">
                <span className="font-mono text-xs font-extrabold uppercase bg-[#00F0FF] px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#000]">
                  BIOGRAPHY & BACKGROUND
                </span>
                <span className="font-mono text-xs font-bold text-gray-700">01 / ABOUT</span>
              </div>

              <p className="text-gray-900 text-base sm:text-lg font-medium leading-relaxed mb-6">
                {personal.summary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-[#FFFDF0] p-4 border-3 border-black shadow-[4px_4px_0px_#000]">
                  <h4 className="font-extrabold text-sm uppercase flex items-center gap-2 mb-2 text-black">
                    <CheckCircle2 className="w-4 h-4 text-[#FF597B]" />
                    <span>WHAT I DO BEST</span>
                  </h4>
                  <ul className="text-xs font-medium space-y-1.5 text-gray-800 list-disc list-inside">
                    <li>Responsive React & Tailwind UIs</li>
                    <li>REST APIs in Node.js & Flask</li>
                    <li>AI & LLM Integration Workflows</li>
                    <li>Clean Database Schemas (SQL/Mongo)</li>
                  </ul>
                </div>

                <div className="bg-[#FFFDF0] p-4 border-3 border-black shadow-[4px_4px_0px_#000]">
                  <h4 className="font-extrabold text-sm uppercase flex items-center gap-2 mb-2 text-black">
                    <Sparkles className="w-4 h-4 text-[#00F0FF]" />
                    <span>MY CORE VALUES</span>
                  </h4>
                  <ul className="text-xs font-medium space-y-1.5 text-gray-800 list-disc list-inside">
                    <li>Clean, Modular & Scalable Code</li>
                    <li>High Contrast & Bold Aesthetics</li>
                    <li>Rapid Prototyping & Iteration</li>
                    <li>Continuous Technical Curiosity</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Dynamic Calculated Statistics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  style={{ backgroundColor: stat.bgColor }}
                  className="p-4 border-4 border-black shadow-[6px_6px_0px_#000000] text-center transform hover:-translate-y-1 transition-all"
                >
                  <div className="text-3xl sm:text-4xl font-extrabold text-black font-mono tracking-tight leading-none mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs font-extrabold tracking-wider uppercase text-black">
                    {stat.label}
                  </div>
                  <div className="text-[10px] font-mono font-bold text-gray-800 mt-1">
                    {stat.subtext}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
