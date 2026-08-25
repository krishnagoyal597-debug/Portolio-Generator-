import React from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Globe, ExternalLink, Briefcase, GraduationCap } from 'lucide-react';

export default function BentoPortfolio({ data }) {
  if (!data) return null;

  const cardClass = "bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 hover:shadow-md transition-shadow";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min">
          
          {/* HERO CARD - Spans 2 columns on desktop */}
          <div className={`md:col-span-2 bg-gradient-to-br from-indigo-600 to-violet-700 text-white rounded-3xl p-8 md:p-12 shadow-md relative overflow-hidden`}>
            <div className="relative z-10 h-full flex flex-col justify-center">
              <div className="flex items-center gap-6 mb-6">
                {(data.profileImage || data.personalInfo?.profileImage) ? (
                  <img
                    src={data.profileImage || data.personalInfo?.profileImage}
                    alt={data.name}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-white/30 shadow-md flex-shrink-0"
                  />
                ) : (
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/20 border-4 border-white/30 flex items-center justify-center text-3xl font-bold text-white flex-shrink-0">
                    {data.name?.charAt(0) || 'U'}
                  </div>
                )}
                <div>
                  <div className="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold mb-2">
                    📍 {data.location || 'Available for work'}
                  </div>
                  <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                    Hi, I'm {data.name}
                  </h1>
                </div>
              </div>
              <h2 className="text-xl md:text-2xl text-indigo-100 font-medium max-w-xl mb-8">
                {data.title}
              </h2>
              <div className="flex flex-wrap gap-4 mt-auto">
                {data.email && (
                  <a href={`mailto:${data.email}`} className="bg-white text-indigo-700 hover:bg-indigo-50 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors">
                    <Mail size={18} /> Contact Me
                  </a>
                )}
                {data.github && (
                  <a href={data.github} target="_blank" rel="noreferrer" className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors backdrop-blur-sm">
                    <Github size={18} /> GitHub
                  </a>
                )}
              </div>
            </div>
            {/* Decorative blobs */}
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute top-12 -right-12 w-48 h-48 bg-violet-400/20 rounded-full blur-2xl pointer-events-none"></div>
          </div>

          {/* ABOUT CARD */}
          <div className={`${cardClass} md:col-span-1 flex flex-col`}>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">About</h3>
            <p className="text-slate-600 leading-relaxed font-medium text-lg flex-grow">
              {data.about || data.tagline}
            </p>
            <div className="flex gap-4 mt-6 pt-6 border-t border-slate-100">
              {data.linkedin && <a href={data.linkedin} className="text-slate-400 hover:text-blue-600 transition-colors"><Linkedin /></a>}
              {data.website && <a href={data.website} className="text-slate-400 hover:text-slate-800 transition-colors"><Globe /></a>}
            </div>
          </div>

          {/* SKILLS CARD */}
          {(data.skillGroups && data.skillGroups.length > 0) && (
            <div className={`${cardClass} md:col-span-3`}>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Skills & Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {data.skillGroups.map((group, index) => {
                  const colors = ['bg-blue-100 text-blue-700', 'bg-emerald-100 text-emerald-700', 'bg-purple-100 text-purple-700', 'bg-amber-100 text-amber-700', 'bg-rose-100 text-rose-700'];
                  const colorClass = colors[index % colors.length];
                  return (
                    <div key={index}>
                      <h4 className="font-semibold text-slate-700 mb-4">{group.category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {(group.skills || []).map((skill, i) => (
                          <span key={i} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${colorClass}`}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* PROJECTS - Spans across columns */}
          {(data.projects && data.projects.length > 0) && (
            <>
              <div className="md:col-span-3 mt-4 mb-2 px-2">
                <h3 className="text-xl font-bold text-slate-800">Selected Projects</h3>
              </div>
              {data.projects.map((project, index) => {
                const borderColors = ['border-t-indigo-500', 'border-t-violet-500', 'border-t-blue-500', 'border-t-teal-500'];
                const bColor = borderColors[index % borderColors.length];
                const spanClass = data.projects.length === 1 ? 'md:col-span-3' : (index === 0 && data.projects.length % 2 !== 0 ? 'md:col-span-3' : 'md:col-span-1 lg:col-span-1 xl:col-span-1');
                
                return (
                  <div key={project.id || index} className={`${cardClass} ${bColor} border-t-4 flex flex-col h-full`}>
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-bold text-xl text-slate-800">{project.name}</h4>
                      <div className="flex gap-2">
                        {project.github && <a href={project.github} className="text-slate-400 hover:text-slate-800"><Github size={18} /></a>}
                        {project.demo && <a href={project.demo} className="text-slate-400 hover:text-slate-800"><ExternalLink size={18} /></a>}
                      </div>
                    </div>
                    <p className="text-slate-600 mb-6 text-sm flex-grow">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-50">
                      {(project.technologies || []).slice(0, 4).map((tech, i) => (
                        <span key={i} className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {/* EXPERIENCE */}
          {(data.experience && data.experience.length > 0) && (
            <div className={`${cardClass} md:col-span-2`}>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                <Briefcase size={16} /> Experience
              </h3>
              <div className="space-y-6">
                {data.experience.map((exp, index) => (
                  <div key={exp.id || index} className="flex gap-4">
                    <div className="hidden sm:block w-12 h-12 rounded-2xl bg-slate-100 flex-shrink-0 flex items-center justify-center text-slate-400 font-bold">
                      {exp.company.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg">{exp.position}</h4>
                      <div className="text-indigo-600 font-medium text-sm mb-1">{exp.company}</div>
                      <div className="text-slate-400 text-xs font-medium mb-3">
                        {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EDUCATION & CONTACT */}
          <div className="md:col-span-1 flex flex-col gap-6">
            {(data.education && data.education.length > 0) && (
              <div className={`${cardClass} flex-grow`}>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                  <GraduationCap size={16} /> Education
                </h3>
                <div className="space-y-6">
                  {data.education.map((edu, index) => (
                    <div key={edu.id || index}>
                      <h4 className="font-bold text-slate-800">{edu.degree}</h4>
                      <div className="text-slate-600 text-sm font-medium mt-1">{edu.university}</div>
                      <div className="text-slate-400 text-xs font-medium mt-1">
                        {edu.startYear} — {edu.endYear}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className={`${cardClass} bg-slate-800 text-white border-none`}>
              <h3 className="font-bold text-xl mb-2">Let's build something</h3>
              <p className="text-slate-300 text-sm mb-6">Open for new opportunities and interesting projects.</p>
              {data.email && (
                <a href={`mailto:${data.email}`} className="block w-full text-center bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-xl font-semibold transition-colors">
                  Say Hello
                </a>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
