import React, { useEffect } from 'react';
import portfolioData from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { personal, education, experience, skills } = portfolioData;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      {/* Click Outside Backdrop */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} aria-hidden="true" />

      {/* Main Resume Box */}
      <div className="relative w-full max-w-4xl bg-[#f9f9f9] brutalist-border shadow-[12px_12px_0px_#000000] z-10 max-h-[90vh] overflow-y-auto p-6 sm:p-10 animate-in zoom-in-95 duration-150">
        
        {/* Modal Top Control Bar */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b-[3px] border-black no-print">
          <div className="flex items-center gap-2 select-none">
            <span className="bg-[#ffeb3b] text-primary font-label-mono text-xs font-bold px-3 py-1.5 brutalist-border shadow-[2px_2px_0px_#000]">
              Resume Preview
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-[#003fd8] text-white font-label-mono text-xs font-bold px-4 py-2.5 brutalist-border brutalist-shadow brutalist-button brutalist-button-hover"
            >
              <span>Print to PDF</span>
            </button>

            <button
              onClick={onClose}
              className="bg-[#ba1a1a] text-white p-2 brutalist-border brutalist-shadow brutalist-button hover:bg-black hover:text-[#ffeb3b] transition-colors flex items-center justify-center"
              aria-label="Close resume preview"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        </div>

        {/* Printable Resume Document Content */}
        <div className="bg-white p-6 sm:p-10 brutalist-border brutalist-shadow space-y-8 text-black font-body-md text-sm">
          
          {/* Resume Header */}
          <div className="border-b-[3px] border-black pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <h1 className="font-headline-md text-3xl font-black uppercase text-black">
                {personal.name}
              </h1>
              <p className="font-label-mono text-sm text-secondary font-bold uppercase mt-1">
                {personal.headline}
              </p>
              <p className="font-body-md text-xs text-on-surface mt-3 max-w-xl">
                {personal.summary}
              </p>
            </div>

            <div className="font-label-mono text-xs font-semibold space-y-1.5 bg-[#f9f9f9] p-4 brutalist-border shadow-[3px_3px_0px_#000] shrink-0">
              <div>📍 {personal.location}</div>
              <div>✉️ aarav.sharma@example.com</div>
              <div>📞 +91 98765 43210</div>
              <div>🔗 github.com/aaravsharma</div>
            </div>
          </div>

          {/* Education Section */}
          <div>
            <h2 className="font-label-mono text-sm font-bold uppercase bg-[#ffeb3b] text-primary px-3 py-1.5 brutalist-border inline-block mb-4 shadow-[2px_2px_0px_#000] select-none">
              Education
            </h2>
            <div className="space-y-4">
              {education.map(edu => (
                <div key={edu.id} className="border-l-[3px] border-black pl-4 py-1">
                  <div className="flex flex-wrap justify-between items-baseline gap-2">
                    <h3 className="font-headline-md text-base font-bold uppercase">{edu.degree}</h3>
                    <span className="font-label-mono text-xs font-bold">{edu.duration}</span>
                  </div>
                  <div className="font-label-mono text-xs font-bold text-secondary">{edu.institution} — {edu.gpaOrScore}</div>
                  <p className="font-body-md text-xs text-on-surface mt-1.5">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div>
            <h2 className="font-label-mono text-sm font-bold uppercase bg-[#003fd8] text-white px-3 py-1.5 brutalist-border inline-block mb-4 shadow-[2px_2px_0px_#000] select-none">
              Experience
            </h2>
            <div className="space-y-6">
              {experience.map(exp => (
                <div key={exp.id} className="border-l-[3px] border-black pl-4 py-1">
                  <div className="flex flex-wrap justify-between items-baseline gap-2">
                    <h3 className="font-headline-md text-base font-bold uppercase">
                      {exp.role} <span className="font-label-mono text-xs text-on-surface-variant font-medium">@{exp.company}</span>
                    </h3>
                    <span className="font-label-mono text-xs font-bold">{exp.duration}</span>
                  </div>
                  <ul className="font-body-md text-xs text-on-surface mt-2 space-y-1">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i} className="flex gap-1.5 items-start">
                        <span className="font-mono text-secondary font-bold shrink-0">-&gt;</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills Overview */}
          <div>
            <h2 className="font-label-mono text-sm font-bold uppercase bg-[#ffeb3b] text-primary px-3 py-1.5 brutalist-border inline-block mb-4 shadow-[2px_2px_0px_#000] select-none">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-label-mono text-xs font-bold">
              {skills.map(cat => (
                <div key={cat.category} className="p-3 brutalist-border bg-[#f9f9f9]">
                  <div className="text-[10px] text-on-surface-variant uppercase mb-1">{cat.category}</div>
                  <div className="text-primary font-bold">{cat.skills.map(s => s.name).join(', ')}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
