import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenResume: () => void;
}

const navItems = [
  { label: 'ABOUT', href: '#about' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'EDUCATION', href: '#education' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'ACHIEVEMENTS', href: '#achievements' },
  { label: 'CONTACT', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [activeSection, setActiveSection] = useState('');
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
    <>
      {/* Desktop Header */}
      <header className="hidden md:flex sticky top-0 w-full z-50 bg-[#f9f9f9] brutalist-border border-l-0 border-r-0 border-t-0 justify-between items-center px-8 py-4">
        <a 
          className="font-headline-md text-headline-md font-black text-primary uppercase select-none cursor-pointer flex items-center gap-2" 
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          AARAV_SHARMA
        </a>
        
        <nav className="flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`font-label-mono text-label-mono uppercase px-4 py-2 brutalist-border brutalist-button ${
                  isActive ? 'bg-[#ffeb3b] text-primary brutalist-shadow' : 'bg-white text-primary brutalist-shadow brutalist-button-hover'
                }`}
              >
                {item.label}
              </a>
            );
          })}
          
          <button
            onClick={onOpenResume}
            className="font-label-mono text-label-mono uppercase bg-primary text-white px-6 py-2.5 brutalist-border brutalist-shadow brutalist-button brutalist-button-hover flex items-center gap-1.5"
          >
            <span>RESUME</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </nav>
      </header>

      {/* Mobile Header */}
      <header className="sticky top-0 w-full z-50 bg-[#f9f9f9] brutalist-border border-l-0 border-r-0 border-t-0 flex justify-between items-center px-4 py-4 md:hidden">
        <a 
          className="font-headline-md text-headline-md font-black text-primary uppercase" 
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          AARAV_SHARMA
        </a>
        <button 
          aria-label="Toggle Menu" 
          className="p-2 brutalist-border bg-[#ffeb3b] brutalist-button brutalist-shadow flex items-center justify-center" 
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>menu</span>
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#f9f9f9] z-[100] flex flex-col justify-center items-center gap-8 brutalist-border p-6 overflow-y-auto">
          <button 
            aria-label="Close Menu" 
            className="absolute top-4 right-4 p-2 brutalist-border bg-white brutalist-button brutalist-shadow flex items-center justify-center" 
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="material-symbols-outlined text-primary">close</span>
          </button>
          
          <nav className="flex flex-col gap-6 text-center w-full px-6 max-w-sm">
            {navItems.map((item) => (
              <a 
                key={item.label}
                className="font-headline-md text-headline-md font-bold text-primary brutalist-border p-4 bg-white brutalist-shadow active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all uppercase block" 
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
              >
                {item.label}
              </a>
            ))}
            
            <a 
              className="mt-4 font-headline-md text-headline-md font-bold text-primary brutalist-border p-4 bg-[#ffeb3b] brutalist-shadow active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all uppercase block" 
              href="#resume"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                onOpenResume();
              }}
            >
              RESUME
            </a>
          </nav>
        </div>
      )}
    </>
  );
};
