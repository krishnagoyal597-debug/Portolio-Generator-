import React from 'react';
import { Award, ShieldCheck, Trophy, ArrowUpRight } from 'lucide-react';
import portfolioData from '../data/portfolioData';

export default function Achievements() {
  const getIcon = (type) => {
    if (type === 'Certification') return ShieldCheck;
    if (type === 'Award') return Trophy;
    return Award;
  };

  return (
    <section id="achievements" className="py-24 px-6 sm:px-8 border-t border-minimal-border bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center space-x-2 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-minimal-subtle">
            06 / ACHIEVEMENTS & CERTIFICATIONS
          </span>
          <span className="h-[1px] w-12 bg-neutral-300" />
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-minimal-dark mb-12">
          Honors & Certifications
        </h2>

        {/* Minimal Vertical List */}
        <div className="space-y-4">
          {portfolioData.achievements.map((item, idx) => {
            const IconComponent = getIcon(item.type);

            return (
              <div
                key={item.id || idx}
                className="group p-6 rounded-2xl border border-minimal-border bg-minimal-card hover:bg-white hover:border-neutral-300 hover:shadow-xs transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-white border border-neutral-200 text-minimal-dark group-hover:bg-minimal-dark group-hover:text-white transition-colors duration-300 shrink-0">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-minimal-subtle">
                        {item.type}
                      </span>
                      <span className="text-xs text-neutral-300">•</span>
                      <span className="text-xs font-semibold text-neutral-500">
                        {item.year}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-minimal-dark group-hover:text-black transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs text-neutral-500">
                      Issued by {item.organization}
                    </p>
                  </div>
                </div>

                <div className="self-end sm:self-center">
                  <a
                    href={item.credentialUrl || '#'}
                    onClick={(e) => {
                      if (item.credentialUrl === '#') e.preventDefault();
                    }}
                    className="inline-flex items-center text-xs font-semibold text-minimal-dark hover:underline space-x-1"
                  >
                    <span>Verify</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
