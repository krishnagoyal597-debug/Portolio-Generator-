import React from 'react';
import { MapPin, Sparkles, Code2, Briefcase, Award, FolderKanban } from 'lucide-react';
import portfolioData from '../data/portfolioData';

export default function About() {
  // Dynamically calculate total unique technologies across skills
  const totalTechs = portfolioData.skills.reduce(
    (acc, category) => acc + category.items.length,
    0
  );

  const stats = [
    {
      label: 'Projects Completed',
      value: String(portfolioData.projects.length).padStart(2, '0'),
      icon: FolderKanban
    },
    {
      label: 'Technologies Mastered',
      value: String(totalTechs).padStart(2, '0'),
      icon: Code2
    },
    {
      label: 'Roles & Internships',
      value: String(portfolioData.experience.length).padStart(2, '0'),
      icon: Briefcase
    },
    {
      label: 'Key Achievements',
      value: String(portfolioData.achievements.length).padStart(2, '0'),
      icon: Award
    }
  ];

  return (
    <section id="about" className="py-24 px-6 sm:px-8 border-t border-minimal-border bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Section Label */}
        <div className="flex items-center space-x-2 mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-minimal-subtle">
            01 / ABOUT
          </span>
          <span className="h-[1px] w-12 bg-neutral-300" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Main Statement */}
          <div className="md:col-span-8 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-semibold text-minimal-dark leading-snug tracking-tight">
              Designing and engineering high-caliber digital experiences with performance and aesthetic clarity.
            </h2>
            <p className="text-base text-neutral-600 leading-relaxed">
              {portfolioData.personal.summary}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-6 text-sm text-neutral-500">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-minimal-dark" />
                <span>Based in {portfolioData.personal.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-minimal-dark" />
                <span>Focus: AI • Full Stack Web • Systems Design</span>
              </div>
            </div>
          </div>

          {/* Quick Info Sidebar */}
          <div className="md:col-span-4 bg-minimal-card p-6 rounded-2xl border border-minimal-border space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400">
              Quick Focus
            </h3>
            <ul className="space-y-2.5 text-sm text-minimal-dark font-medium">
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-minimal-dark" />
                <span>Modern React & Next.js Architecture</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-minimal-dark" />
                <span>AI-Assisted Web Applications</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-minimal-dark" />
                <span>Minimalist Interface Design</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-minimal-dark" />
                <span>Clean API Engineering</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Dynamic Statistics Grid */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-12 border-t border-minimal-border">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-3xl sm:text-4xl font-bold tracking-tight text-minimal-dark">
                {stat.value}
              </div>
              <div className="text-xs font-medium text-minimal-subtle uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
