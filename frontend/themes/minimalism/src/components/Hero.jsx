import React, { useState } from 'react';
import { Github, Twitter, Linkedin, ArrowRight, Download, Check } from 'lucide-react';
import portfolioData from '../data/portfolioData';

export default function Hero() {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadCV = (e) => {
    e.preventDefault();
    setDownloaded(true);
    // Simulate CV download
    setTimeout(() => {
      setDownloaded(false);
    }, 3000);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex flex-col justify-center items-center text-center pt-28 pb-16 px-6 sm:px-8 hero-glow-bg overflow-hidden"
    >
      {/* Subtle Background Radial Aura */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[500px] h-[500px] sm:w-[650px] sm:h-[650px] bg-gradient-to-tr from-neutral-200/40 via-neutral-100/60 to-transparent rounded-full blur-3xl opacity-70 -z-10" />
      </div>

      <div className="max-w-3xl mx-auto flex flex-col items-center z-10 animate-fadeIn">
        {/* Profile Image with subtle border and shadow */}
        <div className="relative mb-6 group">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 border border-neutral-200 shadow-md bg-white transition-transform duration-300 group-hover:scale-105">
            <img
              src={portfolioData.personal.profileImage}
              alt={portfolioData.personal.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          {/* Online badge */}
          <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow-sm" title="Available for projects" />
        </div>

        {/* Availability Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 mb-6 text-[11px] font-semibold uppercase tracking-widest text-minimal-subtle border border-neutral-200/80 rounded-full bg-white/80 backdrop-blur-sm shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulseSlow" />
          <span>{portfolioData.personal.availability || "AVAILABLE FOR PROJECTS"}</span>
        </div>

        {/* Dynamic Display Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-minimal-dark leading-[1.15] mb-4">
          Hi, I'm {portfolioData.personal.name}
        </h1>

        {/* Sub-headline */}
        <p className="text-lg sm:text-xl font-medium text-minimal-subtle max-w-2xl mb-4">
          {portfolioData.personal.headline}
        </p>

        {/* Professional Summary */}
        <p className="text-sm sm:text-base text-neutral-500 max-w-xl leading-relaxed mb-8">
          {portfolioData.personal.summary}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 w-full sm:w-auto">
          <a
            href="#projects"
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3 text-sm font-semibold text-white bg-minimal-dark rounded-full hover:bg-neutral-800 transition-all duration-200 shadow hover:shadow-md active:scale-95 group"
          >
            <span>View My Work</span>
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </a>

          <button
            onClick={handleDownloadCV}
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3 text-sm font-semibold text-minimal-dark bg-white border border-neutral-300 rounded-full hover:bg-minimal-hoverBg hover:border-neutral-400 transition-all duration-200 shadow-2xs active:scale-95 group"
          >
            {downloaded ? (
              <>
                <Check className="w-4 h-4 mr-2 text-emerald-600" />
                <span>Downloaded CV</span>
              </>
            ) : (
              <>
                <span>Download CV</span>
                <Download className="w-4 h-4 ml-2 transition-transform group-hover:translate-y-0.5 text-neutral-600" />
              </>
            )}
          </button>
        </div>

        {/* Social Icons */}
        <div className="flex items-center space-x-5 text-neutral-500">
          <a
            href={portfolioData.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-2 hover:text-minimal-dark transition-colors transform hover:scale-110"
          >
            <Github className="w-5 h-5" />
          </a>

          {portfolioData.contact.twitter && (
            <a
              href={portfolioData.contact.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="p-2 hover:text-minimal-dark transition-colors transform hover:scale-110"
            >
              <Twitter className="w-5 h-5" />
            </a>
          )}

          <a
            href={portfolioData.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-2 hover:text-minimal-dark transition-colors transform hover:scale-110"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
