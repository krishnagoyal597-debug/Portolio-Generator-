import React from 'react';
import { Mail, ArrowDown, FolderGit2, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import portfolioData from '../data/portfolioData';

const Hero = () => {
  const { personal, stats } = portfolioData;

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      
      {/* Central Glass Hero Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
        
        {/* Main Glass Hero Card */}
        <div className="relative p-8 sm:p-12 md:p-14 rounded-[2.5rem] glass-panel border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl overflow-hidden group">
          
          {/* Subtle Inner Glow Background */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none group-hover:bg-pink-600/25 transition-all duration-700" />
          
          {/* Profile Image with Glowing Halo Ring */}
          <div className="relative mb-6 inline-block">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full p-1 bg-gradient-to-tr from-purple-500 via-pink-500 to-cyan-400 shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:scale-105 transition-all duration-500 cursor-pointer">
              <img
                src={personal.profileImage}
                alt={personal.name}
                className="w-full h-full object-cover rounded-full border-2 border-white/40"
              />
            </div>
            {/* Online Status Indicator */}
            <span className="absolute bottom-1 right-2 w-5 h-5 bg-emerald-400 border-2 border-purple-950 rounded-full shadow-[0_0_10px_#10B981] animate-pulse" />
          </div>

          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill mb-6 text-xs sm:text-sm font-semibold tracking-wider text-purple-200 uppercase border border-purple-400/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{personal.availability || "AVAILABLE FOR PROJECTS"}</span>
          </div>

          {/* Main Name Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4 text-white">
            Hi, I'm <span className="text-gradient-vibrant">{personal.name}</span>
          </h1>

          {/* Subheading / Headline */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-purple-200 tracking-wide font-heading">
            {personal.headline}
          </h2>

          {/* Short Bio Summary */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-300 leading-relaxed mb-8 font-light">
            {personal.summary}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <button
              onClick={() => handleScroll('contact')}
              className="flex items-center gap-2.5 px-8 py-3.5 rounded-full glass-button-primary text-sm sm:text-base font-semibold text-white cursor-pointer shadow-[0_0_25px_rgba(139,92,246,0.5)]"
            >
              <span>Get In Touch</span>
              <Send className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleScroll('projects')}
              className="flex items-center gap-2.5 px-8 py-3.5 rounded-full glass-button-secondary text-sm sm:text-base font-semibold cursor-pointer"
            >
              <span>View My Work</span>
              <FolderGit2 className="w-4 h-4" />
            </button>
          </div>

          {/* Circular Glass Social Buttons */}
          <div className="flex items-center justify-center gap-4">
            <a
              href={personal.github || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full glass-pill flex items-center justify-center text-gray-300 hover:text-white hover:border-purple-400/50 hover:bg-white/15 hover:scale-110 transition-all duration-300"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-5 h-5" />
            </a>

            <a
              href={personal.linkedin || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full glass-pill flex items-center justify-center text-gray-300 hover:text-white hover:border-purple-400/50 hover:bg-white/15 hover:scale-110 transition-all duration-300"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>

            <a
              href={`mailto:${personal.email}`}
              className="w-12 h-12 rounded-full glass-pill flex items-center justify-center text-gray-300 hover:text-white hover:border-purple-400/50 hover:bg-white/15 hover:scale-110 transition-all duration-300"
              aria-label="Email Contact"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

        </div>

        {/* Dynamic Glass Statistics Row */}
        {stats && stats.length > 0 && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            {stats.slice(0, 3).map((stat) => (
              <div 
                key={stat.id || stat.label}
                className="p-6 rounded-2xl glass-card border border-white/15 backdrop-blur-xl flex flex-col items-center justify-center text-center group hover:scale-[1.02]"
              >
                <div className="text-3xl sm:text-4xl font-extrabold text-gradient-vibrant mb-1 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-purple-200 tracking-wide uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Scroll Down Indicator */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => handleScroll('about')}
            className="w-10 h-10 rounded-full glass-pill flex items-center justify-center text-purple-300 hover:text-white hover:border-purple-400/50 animate-bounce cursor-pointer"
            aria-label="Scroll to About Section"
          >
            <ArrowDown className="w-5 h-5" />
          </button>
        </div>

      </div>

    </section>
  );
};

export default Hero;
