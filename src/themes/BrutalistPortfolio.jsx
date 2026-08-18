import React from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Globe, ArrowRight, ExternalLink } from 'lucide-react';

export default function BrutalistPortfolio({ data }) {
  if (!data) return null;

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white pb-24">
      {/* HEADER */}
      <header className="bg-black text-white p-6 border-b-8 border-black flex flex-col md:flex-row justify-between items-start md:items-center">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-4 md:mb-0">
          {data.name || 'PORTFOLIO'}
        </h1>
        <div className="flex gap-4">
          {data.email && <a href={`mailto:${data.email}`} className="hover:underline font-black uppercase text-xl">Email</a>}
          {data.github && <a href={data.github} target="_blank" rel="noreferrer" className="hover:underline font-black uppercase text-xl">Github</a>}
          {data.linkedin && <a href={data.linkedin} target="_blank" rel="noreferrer" className="hover:underline font-black uppercase text-xl">LinkedIn</a>}
        </div>
      </header>

      <main className="px-6 mt-12 max-w-screen-2xl mx-auto space-y-24">
        {/* HERO */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end">
          <div className="md:col-span-7">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none break-words">
              {data.title || 'CREATIVE DEVELOPER'}
            </h2>
          </div>
          <div className="md:col-span-5 bg-black text-white p-8 border-4 border-black group hover:bg-white hover:text-black transition-colors duration-0 cursor-default">
            <p className="text-2xl md:text-3xl font-bold uppercase leading-tight group-hover:font-black">
              {data.tagline || 'Building radical digital experiences.'}
            </p>
          </div>
        </section>

        {/* ABOUT */}
        {data.about && (
          <section className="border-l-8 border-black pl-6 md:pl-12 py-4">
            <div className="text-xs uppercase tracking-widest border-b-4 border-black pb-2 mb-8 inline-block font-bold">
              ABOUT
            </div>
            <p className="text-2xl md:text-4xl font-medium leading-tight max-w-4xl uppercase">
              {data.about}
            </p>
          </section>
        )}

        {/* PROJECTS */}
        {(data.projects && data.projects.length > 0) && (
          <section>
            <div className="text-xs uppercase tracking-widest border-b-4 border-black pb-2 mb-12 inline-block font-bold">
              SELECTED WORK
            </div>
            <div className="grid grid-cols-1 gap-12 md:gap-24">
              {data.projects.map((project, index) => (
                <div key={project.id || index} className="border-8 border-black p-6 md:p-12 relative group hover:bg-black hover:text-white transition-colors duration-0">
                  <div className="absolute top-0 right-0 bg-black text-white px-4 py-2 font-black text-2xl border-l-8 border-b-8 border-black group-hover:bg-white group-hover:text-black">
                    {(index + 1).toString().padStart(2, '0')}
                  </div>
                  <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 break-words">
                    {project.name}
                  </h3>
                  <p className="text-xl md:text-2xl font-bold mb-8 max-w-3xl uppercase">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-4 mb-8">
                    {(project.technologies || []).map((tech, i) => (
                      <span key={i} className="text-lg font-black uppercase border-2 border-current px-3 py-1">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-6">
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-2xl font-black uppercase hover:underline">
                        LIVE <ExternalLink className="w-6 h-6" strokeWidth={3} />
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-2xl font-black uppercase hover:underline">
                        CODE <Github className="w-6 h-6" strokeWidth={3} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SKILLS */}
        {(data.skillGroups && data.skillGroups.length > 0) && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t-8 border-black pt-12">
            <div>
              <div className="text-xs uppercase tracking-widest border-b-4 border-black pb-2 mb-8 inline-block font-bold">
                CAPABILITIES
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {data.skillGroups.map((group, index) => (
                <div key={index}>
                  <h4 className="text-2xl font-black uppercase mb-4 underline decoration-4 underline-offset-4">{group.category}</h4>
                  <ul className="space-y-2">
                    {(group.skills || []).map((skill, i) => (
                      <li key={i} className="text-xl font-bold uppercase flex gap-4">
                        <span className="opacity-50">{(i + 1).toString().padStart(2, '0')}</span>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EXPERIENCE */}
        {(data.experience && data.experience.length > 0) && (
          <section>
            <div className="text-xs uppercase tracking-widest border-b-4 border-black pb-2 mb-12 inline-block font-bold">
              EXPERIENCE
            </div>
            <div className="space-y-16 border-l-8 border-black pl-8">
              {data.experience.map((exp, index) => (
                <div key={exp.id || index} className="relative">
                  <div className="absolute -left-11 top-2 w-4 h-4 bg-black border-4 border-white"></div>
                  <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2">
                    {exp.position}
                  </h3>
                  <div className="text-2xl font-bold uppercase mb-4 flex flex-wrap gap-4 items-center">
                    <span className="bg-black text-white px-3 py-1">{exp.company}</span>
                    <span>{exp.startDate} — {exp.current ? 'PRESENT' : exp.endDate}</span>
                  </div>
                  {exp.description && (
                    <p className="text-xl font-medium uppercase max-w-3xl border-l-4 border-black pl-4">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer className="mt-32 bg-black text-white p-6 md:p-12 border-t-8 border-black">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
          <div>
            <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-8">
              LET'S<br />TALK
            </h2>
            <div className="flex flex-col gap-4 font-mono text-xl md:text-3xl font-bold">
              {data.email && <a href={`mailto:${data.email}`} className="hover:underline hover:text-red-500">> {data.email}</a>}
              {data.phone && <a href={`tel:${data.phone}`} className="hover:underline hover:text-red-500">> {data.phone}</a>}
            </div>
          </div>
          <div className="text-right">
            <div className="font-black text-4xl uppercase">
              {data.name}
            </div>
            <div className="font-bold text-xl uppercase mt-2 opacity-50">
              © {new Date().getFullYear()} ALL RIGHTS RESERVED.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
