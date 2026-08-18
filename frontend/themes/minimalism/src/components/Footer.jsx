import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import portfolioData from '../data/portfolioData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="py-12 px-6 sm:px-8 border-t border-minimal-border bg-white text-sm text-neutral-500">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Name & Copyright */}
        <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-3 text-center sm:text-left">
          <span className="font-bold text-minimal-dark">
            {portfolioData.personal.name}
          </span>
          <span className="hidden sm:inline text-neutral-300">•</span>
          <span>© {currentYear} All rights reserved.</span>
        </div>

        {/* Center: Social links */}
        <div className="flex items-center space-x-6">
          <a
            href={portfolioData.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-minimal-dark transition-colors"
          >
            GitHub
          </a>
          <a
            href={portfolioData.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-minimal-dark transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${portfolioData.contact.email}`}
            className="hover:text-minimal-dark transition-colors"
          >
            Email
          </a>
        </div>

        {/* Right: Back to top button */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-minimal-dark hover:text-black transition-colors group cursor-pointer"
        >
          <span>Back to Top</span>
          <div className="p-2 rounded-full border border-neutral-200 bg-white group-hover:bg-minimal-hoverBg transition-colors">
            <ArrowUp className="w-3.5 h-3.5" />
          </div>
        </button>
      </div>
    </footer>
  );
}
