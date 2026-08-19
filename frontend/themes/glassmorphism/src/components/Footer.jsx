import React from 'react';
import { ArrowUp, Code2, Mail, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import portfolioData from '../data/portfolioData';

const Footer = () => {
  const { personal } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 pt-16 pb-8 border-t border-white/10 glass-panel-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/10">
          
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
            <a href="#home" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg">
                <Code2 className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                {personal.brandName || "<> Alex.dev"}
              </span>
            </a>
            <p className="text-xs text-gray-300 max-w-sm">
              {personal.headline} — {personal.subHeadline || "Building Next-Generation Digital Experiences."}
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap justify-center gap-6 text-xs sm:text-sm text-gray-300">
            <a href="#home" className="hover:text-purple-300 transition-colors">Home</a>
            <a href="#about" className="hover:text-purple-300 transition-colors">About</a>
            <a href="#skills" className="hover:text-purple-300 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-purple-300 transition-colors">Projects</a>
            <a href="#experience" className="hover:text-purple-300 transition-colors">Experience</a>
            <a href="#contact" className="hover:text-purple-300 transition-colors">Contact</a>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            <a
              href={personal.github || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full glass-pill flex items-center justify-center text-gray-300 hover:text-white hover:border-purple-400/50 transition-all"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={personal.linkedin || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full glass-pill flex items-center justify-center text-gray-300 hover:text-white hover:border-purple-400/50 transition-all"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${personal.email}`}
              className="w-9 h-9 rounded-full glass-pill flex items-center justify-center text-gray-300 hover:text-white hover:border-purple-400/50 transition-all"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Bottom Bar & Scroll To Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} {personal.name}. All rights reserved. Built with</span>
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
            <span>& Glassmorphic Aesthetics.</span>
          </div>

          {/* Floating Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass-pill text-purple-300 hover:text-white hover:border-purple-400/50 transition-all cursor-pointer"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
