import React, { useEffect } from 'react';
import { X, Printer } from 'lucide-react';
import portfolioData from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { personal, education, experience, projects, skills } = portfolioData;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Click Outside Backdrop */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Main Resume Box */}
      <div className="relative w-full max-w-4xl bg-[#FFFDF0] border-4 border-black shadow-[16px_16px_0px_#000000] z-10 max-h-[90vh] overflow-y-auto p-6 sm:p-10 animate-in zoom-in-95 duration-200">
        
        {/* Modal Top Control Bar */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b-4 border-black no-print">
          <div className="flex items-center gap-2">
            <span className="bg-[#FFE600] text-black font-extrabold px-3 py-1 border-2 border-black text-xs font-mono shadow-[2px_2px_0px_#000]">
              RESUME PREVIEW
            </span>
            <span className="text-xs font-mono font-bold text-gray-700">
              AARAV_SHARMA_RESUME_2026.PDF
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-[#00F0FF] text-black font-extrabold px-4 py-2 text-xs border-3 border-black shadow-[4px_4px_0px_#000000] hover:bg-[#FFE600] transition-all"
            >
              <Printer className="w-4 h-4 stroke-[3]" />
              <span>PRINT / PRINT TO PDF</span>
            </button>

            <button
              onClick={onClose}
              className="bg-[#FF597B] text-white p-2 border-3 border-black shadow-[3px_3px_0px_#000000] hover:bg-black transition-colors"
            >
              <X className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* Printable Resume Document Content */}
        <div className="bg-white p-6 sm:p-10 border-4 border-black shadow-[8px_8px_0px_#000000] space-y-8 text-black font-sans">
          
          {/* Resume Header */}
          <div className="border-b-4 border-black pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight uppercase text-black">
                {personal.name}
              </h1>
              <p className="font-mono text-sm font-bold text-gray-800 uppercase mt-1">
                {personal.headline}
              </p>
              <p className="text-xs text-gray-700 mt-2 font-medium max-w-xl">
                {personal.summary}
              </p>
            </div>

            <div className="font-mono text-xs font-bold space-y-1 bg-[#FFFDF0] p-3 border-2 border-black shadow-[3px_3px_0px_#000] shrink-0">
              <div>📍 {personal.location}</div>
              <div>✉️ aarav.sharma@example.com</div>
              <div>📞 +91 98765 43210</div>
              <div>🔗 github.com/aaravsharma</div>
            </div>
          </div>

          {/* Education Section */}
          <div>
            <h2 className="text-lg font-extrabold uppercase font-mono bg-[#FFE600] px-3 py-1 border-2 border-black inline-block mb-3 shadow-[2px_2px_0px_#000]">
              EDUCATION
            </h2>
            <div className="space-y-3">
              {education.map(edu => (
                <div key={edu.id} className="border-l-3 border-black pl-4 py-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-extrabold text-base">{edu.degree}</h3>
                    <span className="font-mono text-xs font-bold">{edu.duration}</span>
                  </div>
                  <div className="text-xs font-mono font-bold text-gray-800">{edu.institution} — {edu.gpaOrScore}</div>
                  <p className="text-xs text-gray-700 mt-1">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div>
            <h2 className="text-lg font-extrabold uppercase font-mono bg-[#00F0FF] px-3 py-1 border-2 border-black inline-block mb-3 shadow-[2px_2px_0px_#000]">
              WORK EXPERIENCE
            </h2>
            <div className="space-y-4">
              {experience.map(exp => (
                <div key={exp.id} className="border-l-3 border-black pl-4 py-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-extrabold text-base">{exp.role} <span className="font-mono text-xs text-gray-600">@{exp.company}</span></h3>
                    <span className="font-mono text-xs font-bold">{exp.duration}</span>
                  </div>
                  <ul className="text-xs text-gray-800 list-disc list-inside mt-1.5 space-y-1">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Key Projects */}
          <div>
            <h2 className="text-lg font-extrabold uppercase font-mono bg-[#FF597B] text-white px-3 py-1 border-2 border-black inline-block mb-3 shadow-[2px_2px_0px_#000]">
              FEATURED PROJECTS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {projects.map(proj => (
                <div key={proj.id} className="p-3 border-2 border-black bg-[#FFFDF0]">
                  <h3 className="font-extrabold text-sm uppercase">{proj.title} <span className="text-[10px] font-mono font-bold">({proj.category})</span></h3>
                  <p className="text-xs text-gray-700 mt-1 line-clamp-2">{proj.description}</p>
                  <div className="mt-2 text-[10px] font-mono font-bold text-black">
                    TECH: {proj.technologies.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills Overview */}
          <div>
            <h2 className="text-lg font-extrabold uppercase font-mono bg-[#CCFF00] px-3 py-1 border-2 border-black inline-block mb-3 shadow-[2px_2px_0px_#000]">
              TECHNICAL SKILLS
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs font-bold">
              {skills.map(cat => (
                <div key={cat.category} className="p-2 border border-black bg-gray-50">
                  <div className="text-[10px] text-gray-500 uppercase">{cat.category}</div>
                  <div>{cat.skills.map(s => s.name).join(', ')}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
