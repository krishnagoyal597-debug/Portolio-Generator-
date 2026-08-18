import React, { useState, useEffect } from 'react';
import { Menu, X, Code2, Sparkles, ArrowRight } from 'lucide-react';
import portfolioData from '../data/portfolioData';

const Navbar = ({ activeSection, setActiveSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Dynamic Section Detection
      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl && sectionEl.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveSection]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(targetId);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo Badge */}
        <a 
          href="#home" 
          onClick={(e) => handleNavClick(e, '#home')}
          className="group flex items-center gap-2.5 px-4 py-2 rounded-2xl glass-pill hover:border-purple-400/40 transition-all duration-300"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
            <Code2 className="w-4 h-4" />
          </div>
          <span className="font-bold text-lg tracking-tight text-white group-hover:text-purple-300 transition-colors">
            {portfolioData.personal.brandName || "<> Alex.dev"}
          </span>
        </a>

        {/* Desktop Navigation Glass Bar */}
        <nav className={`hidden md:flex items-center gap-1 px-5 py-2.5 rounded-full transition-all duration-300 ${
          isScrolled ? 'glass-nav shadow-[0_10px_30px_rgba(0,0,0,0.5)]' : 'glass-pill'
        }`}>
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive 
                    ? 'text-white font-semibold' 
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/70 to-pink-600/70 backdrop-blur-sm -z-10 shadow-[0_0_15px_rgba(168,85,247,0.4)] animate-fade-in" />
                )}
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* CTA "Hire Me" Button */}
        <div className="hidden md:flex items-center">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full glass-button-primary text-sm font-semibold tracking-wide text-white"
          >
            <span>Hire Me</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-2xl glass-pill text-gray-200 hover:text-white focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-4 top-20 z-50 p-6 rounded-3xl glass-panel-deep border border-white/20 shadow-2xl animate-fade-in">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-4 py-3 rounded-2xl text-base font-medium transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-purple-600/80 to-pink-600/80 text-white font-semibold shadow-lg' 
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
            
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="mt-2 flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl glass-button-primary font-semibold text-white text-center shadow-lg"
            >
              <span>Hire Me</span>
              <Sparkles className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
