import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenResume: () => void;
}

const navItems = [
  { label: 'HOME', href: '#home' },
  { label: 'ABOUT', href: '#about' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'EDUCATION', href: '#education' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'ACHIEVEMENTS', href: '#achievements' },
  { label: 'CONTACT', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.substring(1);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FFFDF0] border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Badge */}
          <a 
            href="#home" 
            onClick={(e) => scrollToSection(e, '#home')}
            className="flex items-center gap-2 bg-[#FFE600] text-black font-extrabold px-4 py-2 border-3 border-black shadow-[4px_4px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] transition-all"
          >
            <Terminal className="w-5 h-5 stroke-[2.5]" />
            <span className="tracking-tight text-lg uppercase font-mono">AARAV.DEV</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`px-3 py-1.5 font-bold text-xs tracking-wider transition-all border-2 ${
                    isActive
                      ? 'bg-black text-[#FFE600] border-black shadow-[3px_3px_0px_#00F0FF]'
                      : 'border-transparent text-black hover:border-black hover:bg-[#FFE600]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenResume}
              className="hidden sm:flex items-center gap-1.5 bg-[#00F0FF] text-black font-extrabold px-4 py-2 text-xs tracking-wider border-3 border-black shadow-[4px_4px_0px_#000000] hover:bg-[#FF597B] hover:text-white transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>RESUME</span>
              <ArrowUpRight className="w-4 h-4 stroke-[3]" />
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden bg-black text-[#FFE600] p-2.5 border-3 border-black shadow-[3px_3px_0px_#00F0FF] hover:bg-[#FFE600] hover:text-black transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 stroke-[3]" /> : <Menu className="w-6 h-6 stroke-[3]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Hamburger Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#FFE600] border-t-4 border-black p-6 shadow-[0px_10px_0px_#000000] animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-3 mb-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="bg-white text-black font-extrabold px-4 py-3 border-3 border-black text-center text-sm shadow-[4px_4px_0px_#000000] hover:bg-black hover:text-[#FFE600] transition-all"
              >
                {item.label}
              </a>
            ))}
          </div>
          
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenResume();
            }}
            className="w-full bg-[#FF597B] text-white font-extrabold py-3 border-3 border-black shadow-[4px_4px_0px_#000000] flex items-center justify-center gap-2 text-sm tracking-wider"
          >
            <span>DOWNLOAD FULL RESUME</span>
            <ArrowUpRight className="w-5 h-5 stroke-[3]" />
          </button>
        </div>
      )}
    </header>
  );
};
