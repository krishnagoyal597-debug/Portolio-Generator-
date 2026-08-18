import React from 'react';
import { Mail, Github, Linkedin, ExternalLink, Calendar, MapPin } from 'lucide-react';

export default function SpatialPortfolio({ data }) {
  if (!data) return null;

  const floatingCardBase = "bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-500 ease-out border border-white/40";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50 overflow-hidden text-slate-800 font-sans relative pb-32">
      
      {/* Background soft shapes */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/10 blur-[100px] pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-400/10 blur-[120px] pointer-events-none z-0" />
      <div className="fixed top-[40%] right-[20%] w-[30%] h-[30%] rounded-full bg-teal-400/10 blur-[90px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-24 md:pt-32">
        
        {/* HERO */}
        <header className="mb-32 relative">
          <div className="max-w-3xl">
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6 drop-shadow-sm">
              {data.name}
            </h1>
            <h2 className="text-2xl md:text-4xl font-medium text-indigo-600/80 mb-8">
              {data.title}
            </h2>
            <div className="flex gap-4">
              {data.github && (
                <a href={data.github} className="w-14 h-14 rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(99,102,241,0.2)] transition-all duration-300">
                  <Github size={24} />
                </a>
              )}
              {data.linkedin && (
                <a href={data.linkedin} className="w-14 h-14 rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(99,102,241,0.2)] transition-all duration-300">
                  <Linkedin size={24} />
                </a>
              )}
              {data.email && (
                <a href={`mailto:${data.email}`} className="px-8 h-14 rounded-full bg-indigo-600 text-white shadow-[0_10px_30px_rgba(99,102,241,0.3)] flex items-center justify-center font-bold tracking-wide hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(99,102,241,0.4)] transition-all duration-300">
                  Get in touch
                </a>
              )}
            </div>
          </div>
          
          {/* Floating About Card overlapping hero slightly */}
          <div className="md:absolute top-1/2 right-0 md:w-[450px] mt-16 md:mt-0 z-20">
            <div className={floatingCardBase} style={{ transform: 'translateZ(0) rotate(1deg)' }}>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">About Me</h3>
              <p className="text-lg leading-relaxed text-slate-700 font-medium">
                {data.about || data.tagline}
              </p>
              {data.location && (
                <div className="mt-6 flex items-center gap-2 text-slate-500 text-sm font-medium">
                  <MapPin size={16} /> {data.location}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* SKILLS */}
        {(data.skillGroups && data.skillGroups.length > 0) && (
          <section className="mb-40">
            <h2 className="text-4xl font-bold mb-12 text-slate-800 ml-4">Expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.skillGroups.map((group, index) => (
                <div key={index} className={floatingCardBase} style={{ transform: `translateY(${index % 2 === 0 ? '0' : '24px'}) translateZ(0)` }}>
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xl mb-6 shadow-inner">
                    {(index + 1).toString().padStart(2, '0')}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">{group.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {(group.skills || []).map((skill, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PROJECTS */}
        {(data.projects && data.projects.length > 0) && (
          <section className="mb-40">
            <h2 className="text-4xl font-bold mb-12 text-slate-800 ml-4">Selected Work</h2>
            <div className="space-y-24">
              {data.projects.map((project, index) => (
                <div key={project.id || index} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-teal-400 rounded-3xl transform group-hover:scale-[1.02] transition-transform duration-500 opacity-20 blur-xl"></div>
                  <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.04)] border border-white flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex-1">
                      <div className="text-indigo-600 font-bold tracking-wider text-sm mb-2 uppercase">Project {(index + 1).toString().padStart(2, '0')}</div>
                      <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{project.name}</h3>
                      <p className="text-lg text-slate-600 leading-relaxed mb-8">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-3 mb-8">
                        {(project.technologies || []).map((tech, i) => (
                          <span key={i} className="px-4 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-600 text-sm font-medium shadow-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        {project.demo && (
                          <a href={project.demo} className="px-6 py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-indigo-600 hover:shadow-[0_10px_20px_rgba(99,102,241,0.3)] transition-all flex items-center gap-2">
                            View Live <ExternalLink size={18} />
                          </a>
                        )}
                        {project.github && (
                          <a href={project.github} className="px-6 py-3 rounded-xl bg-white text-slate-700 border border-slate-200 font-medium hover:bg-slate-50 transition-all flex items-center gap-2">
                            Source <Github size={18} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EXPERIENCE & EDUCATION */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          
          {(data.experience && data.experience.length > 0) && (
            <div>
              <h2 className="text-3xl font-bold mb-10 text-slate-800 ml-4">Experience</h2>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-indigo-500 before:via-slate-200 before:to-transparent">
                {data.experience.map((exp, index) => (
                  <div key={exp.id || index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-indigo-100 text-indigo-600 shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 md:left-1/2 md:-ml-6 z-10">
                      <BriefcaseIcon />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] ml-16 md:ml-0 p-6 rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-slate-50 hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition-all">
                      <div className="flex items-center gap-2 text-indigo-600 text-sm font-bold mb-1">
                        <Calendar size={14} /> {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </div>
                      <h4 className="font-bold text-xl text-slate-800">{exp.position}</h4>
                      <div className="text-slate-500 font-medium mb-3">{exp.company}</div>
                      {exp.description && <p className="text-slate-600 text-sm leading-relaxed">{exp.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(data.education && data.education.length > 0) && (
            <div>
              <h2 className="text-3xl font-bold mb-10 text-slate-800 ml-4">Education</h2>
              <div className="space-y-6">
                {data.education.map((edu, index) => (
                  <div key={edu.id || index} className={floatingCardBase}>
                    <h4 className="font-bold text-xl text-slate-800 mb-1">{edu.degree}</h4>
                    <div className="text-indigo-600 font-medium mb-3">{edu.university}</div>
                    <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                      <Calendar size={14} /> {edu.startYear} - {edu.endYear}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
        </section>

      </div>
    </div>
  );
}

// Simple icon for experience timeline
function BriefcaseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  );
}
