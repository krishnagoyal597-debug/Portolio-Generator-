import React from 'react';
import { Mail, Github, Linkedin, ExternalLink, Globe } from 'lucide-react';

export default function GlassmorphicPortfolio({ data }) {
  if (!data) return null;

  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '24px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
  };

  const glowEffect = {
    boxShadow: '0 0 40px rgba(139, 92, 246, 0.15)'
  };

  const textGradient = {
    background: 'linear-gradient(135deg, #e879f9, #818cf8, #38bdf8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  return (
    <div className="min-h-screen bg-[#0a0514] text-slate-200 font-sans relative overflow-hidden">
      
      {/* Background gradients/blobs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-violet-900/30 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-indigo-900/20 blur-[150px]" />
        <div className="absolute top-[30%] left-[60%] w-[30vw] h-[30vw] rounded-full bg-fuchsia-900/20 blur-[100px]" />
      </div>

      {/* GLASS NAV */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-8 py-4 w-[90%] max-w-4xl" style={{...glassStyle, borderRadius: '40px'}}>
        <div className="flex justify-between items-center">
          <div className="font-bold tracking-widest uppercase text-sm" style={textGradient}>
            {data.name.split(' ')[0]}
          </div>
          <div className="flex gap-6">
            {data.email && <a href={`mailto:${data.email}`} className="text-white/60 hover:text-white transition-colors"><Mail size={20} /></a>}
            {data.github && <a href={data.github} className="text-white/60 hover:text-white transition-colors"><Github size={20} /></a>}
            {data.linkedin && <a href={data.linkedin} className="text-white/60 hover:text-white transition-colors"><Linkedin size={20} /></a>}
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-40 pb-32 space-y-32">
        
        {/* HERO */}
        <section className="text-center flex flex-col items-center">
          <div className="relative mb-8 group cursor-default">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-700 animate-pulse"></div>
            {(data.profileImage || data.personalInfo?.profileImage) ? (
              <img
                src={data.profileImage || data.personalInfo?.profileImage}
                alt={data.name}
                className="w-32 h-32 rounded-full border-2 border-white/30 relative z-10 object-cover shadow-2xl"
              />
            ) : (
              <div className="w-32 h-32 rounded-full border border-white/20 relative z-10 flex items-center justify-center text-4xl font-light text-white" style={glassStyle}>
                {data.name.charAt(0)}
              </div>
            )}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6" style={textGradient}>
            {data.name}
          </h1>
          <h2 className="text-2xl md:text-3xl font-light text-white/70 mb-8 max-w-2xl">
            {data.title}
          </h2>
          <div className="inline-block px-6 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium tracking-wider uppercase text-white/50 mb-12">
            {data.location || 'Remote'}
          </div>
        </section>

        {/* ABOUT */}
        {data.about && (
          <section>
            <div className="p-8 md:p-12 relative overflow-hidden group" style={glassStyle}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700 -mr-20 -mt-20"></div>
              <h3 className="text-sm font-medium text-white/40 uppercase tracking-[0.3em] mb-6">Introduction</h3>
              <p className="text-xl md:text-2xl leading-relaxed font-light text-white/90 max-w-3xl">
                {data.about}
              </p>
            </div>
          </section>
        )}

        {/* SKILLS */}
        {(data.skillGroups && data.skillGroups.length > 0) && (
          <section>
            <h3 className="text-sm font-medium text-white/40 uppercase tracking-[0.3em] mb-10 text-center">Tech Stack</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.skillGroups.map((group, index) => (
                <div key={index} className="p-8 group hover:-translate-y-2 transition-transform duration-500" style={{...glassStyle, ...glowEffect}}>
                  <h4 className="text-lg font-medium text-white/90 mb-6 flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-fuchsia-400 shadow-[0_0_10px_#e879f9]"></span>
                    {group.category}
                  </h4>
                  <ul className="space-y-3">
                    {(group.skills || []).map((skill, i) => (
                      <li key={i} className="text-white/60 font-light flex items-center gap-2 before:content-[''] before:w-1 before:h-px before:bg-white/20">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PROJECTS */}
        {(data.projects && data.projects.length > 0) && (
          <section>
            <h3 className="text-sm font-medium text-white/40 uppercase tracking-[0.3em] mb-10 text-center">Featured Work</h3>
            <div className="space-y-8">
              {data.projects.map((project, index) => (
                <div key={project.id || index} className="p-1 group relative overflow-hidden rounded-[26px] transition-all duration-500">
                  {/* Hover gradient border effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative p-8 md:p-10 flex flex-col md:flex-row gap-8 justify-between h-full bg-[#0a0514]/90" style={glassStyle}>
                    <div className="max-w-2xl">
                      <h4 className="text-2xl font-semibold text-white/90 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-fuchsia-400 transition-colors duration-300">
                        {project.name}
                      </h4>
                      <p className="text-white/60 font-light leading-relaxed mb-8">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {(project.technologies || []).map((tech, i) => (
                          <span key={i} className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/50 text-xs tracking-wider">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-4 md:flex-col justify-end md:justify-start shrink-0">
                      {project.demo && (
                        <a href={project.demo} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/40 transition-all">
                          <ExternalLink size={20} />
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/40 transition-all">
                          <Github size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EXPERIENCE & EDUCATION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {(data.experience && data.experience.length > 0) && (
            <section className="p-8 md:p-10" style={glassStyle}>
              <h3 className="text-sm font-medium text-white/40 uppercase tracking-[0.3em] mb-10">Experience</h3>
              <div className="space-y-10">
                {data.experience.map((exp, index) => (
                  <div key={exp.id || index} className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-indigo-400 before:shadow-[0_0_10px_#818cf8] after:absolute after:left-[3px] after:top-6 after:w-px after:h-[calc(100%+16px)] after:bg-white/10 last:after:hidden">
                    <h4 className="text-lg font-medium text-white/90">{exp.position}</h4>
                    <div className="text-fuchsia-300/80 font-light text-sm mb-2">{exp.company}</div>
                    <div className="text-white/40 text-xs font-medium tracking-widest uppercase mb-4">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </div>
                    {exp.description && (
                      <p className="text-white/60 font-light text-sm leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {(data.education && data.education.length > 0) && (
            <section className="p-8 md:p-10" style={glassStyle}>
              <h3 className="text-sm font-medium text-white/40 uppercase tracking-[0.3em] mb-10">Education</h3>
              <div className="space-y-8">
                {data.education.map((edu, index) => (
                  <div key={edu.id || index} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                    <h4 className="text-lg font-medium text-white/90 mb-1">{edu.degree}</h4>
                    <div className="text-cyan-300/80 font-light text-sm mb-3">{edu.university}</div>
                    <div className="text-white/40 text-xs font-medium tracking-widest uppercase">
                      {edu.startYear} - {edu.endYear}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {(data.certifications && data.certifications.length > 0) && (
            <section className="p-8 md:p-10" style={glassStyle}>
              <h3 className="text-sm font-medium text-white/40 uppercase tracking-[0.3em] mb-8">Certifications</h3>
              <div className="space-y-4">
                {data.certifications.map((cert, index) => (
                  <div key={cert.id || index} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <h4 className="text-base font-medium text-white/90">{cert.name}</h4>
                    <div className="text-xs text-white/40 mt-1">{cert.issuer} &middot; {cert.date}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {(data.achievements && data.achievements.length > 0) && (
          <section className="p-8 md:p-10" style={glassStyle}>
            <h3 className="text-sm font-medium text-white/40 uppercase tracking-[0.3em] mb-8">Achievements & Awards</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.achievements.map((ach, index) => (
                <div key={ach.id || index} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                  <h4 className="text-base font-bold text-amber-300">🏆 {ach.title}</h4>
                  <p className="text-xs text-white/60 font-light leading-relaxed">{ach.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CONTACT */}
        <section className="p-12 md:p-16 text-center relative overflow-hidden" style={glassStyle}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-violet-500/10 to-cyan-500/10 blur-3xl pointer-events-none"></div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10" style={textGradient}>
            Let's connect
          </h2>
          <p className="text-white/60 font-light max-w-xl mx-auto mb-10 relative z-10">
            Currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          {data.email && (
            <a href={`mailto:${data.email}`} className="relative z-10 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              <Mail size={18} /> Say Hello
            </a>
          )}
        </section>

      </main>
    </div>
  );
}
