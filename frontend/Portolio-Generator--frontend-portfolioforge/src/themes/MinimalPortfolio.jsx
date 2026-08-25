import React from 'react';
import { Mail, Github, Linkedin, Globe } from 'lucide-react';

export default function MinimalPortfolio({ data }) {
  if (!data) return null;

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-gray-200">
      <div className="max-w-4xl mx-auto px-6 sm:px-12 py-16 md:py-24 font-sans">
        
        {/* HEADER */}
        <header className="mb-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
            {(data.profileImage || data.personalInfo?.profileImage) && (
              <img
                src={data.profileImage || data.personalInfo?.profileImage}
                alt={data.name}
                className="w-24 h-24 rounded-full object-cover border border-gray-200 shadow-sm"
              />
            )}
            <div>
              <h1 
                className="text-4xl md:text-5xl tracking-tight text-black"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {data.name}
              </h1>
              <p className="text-lg text-gray-500 font-light mt-1 max-w-lg leading-relaxed">
                {data.title} &middot; {data.tagline}
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm">
            {data.email && (
              <a href={`mailto:${data.email}`} className="text-gray-500 hover:text-black transition-colors flex items-center gap-1.5">
                <Mail size={14} /> Email
              </a>
            )}
            {data.github && (
              <a href={data.github} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-black transition-colors flex items-center gap-1.5">
                <Github size={14} /> GitHub
              </a>
            )}
            {data.linkedin && (
              <a href={data.linkedin} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-black transition-colors flex items-center gap-1.5">
                <Linkedin size={14} /> LinkedIn
              </a>
            )}
            {data.website && (
              <a href={data.website} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-black transition-colors flex items-center gap-1.5">
                <Globe size={14} /> Website
              </a>
            )}
          </div>
        </header>

        <hr className="border-gray-200 my-16" />

        {/* ABOUT */}
        {data.about && (
          <section className="mb-16">
            <h2 className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-6 font-semibold">About</h2>
            <div className="prose prose-gray text-sm leading-8 text-gray-600 font-light">
              <p>{data.about}</p>
            </div>
          </section>
        )}

        {data.about && <hr className="border-gray-200 my-16" />}

        {/* SKILLS */}
        {(data.skillGroups && data.skillGroups.length > 0) && (
          <section className="mb-16">
            <h2 className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-6 font-semibold">Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-sm text-gray-600">
              {data.skillGroups.map((group, index) => (
                <div key={index}>
                  <strong className="block text-black font-medium mb-2">{group.category}</strong>
                  <div className="font-light leading-relaxed">
                    {(group.skills || []).join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {(data.skillGroups && data.skillGroups.length > 0) && <hr className="border-gray-200 my-16" />}

        {/* PROJECTS */}
        {(data.projects && data.projects.length > 0) && (
          <section className="mb-16">
            <h2 className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-8 font-semibold">Selected Works</h2>
            <div className="space-y-12">
              {data.projects.map((project, index) => (
                <div key={project.id || index} className="group">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-2 gap-2">
                    <h3 className="text-base font-medium text-black">
                      {project.demo ? (
                        <a href={project.demo} className="hover:underline decoration-gray-300 underline-offset-4">{project.name}</a>
                      ) : project.name}
                    </h3>
                    <div className="flex gap-3 text-xs text-gray-400">
                      {project.github && <a href={project.github} className="hover:text-black transition-colors">Code</a>}
                      {project.demo && <a href={project.demo} className="hover:text-black transition-colors">Live</a>}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed font-light mb-3">
                    {project.description}
                  </p>
                  {(project.technologies && project.technologies.length > 0) && (
                    <div className="text-xs text-gray-400 font-mono tracking-tight">
                      {project.technologies.join(' · ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {(data.projects && data.projects.length > 0) && <hr className="border-gray-200 my-16" />}

        {/* EXPERIENCE */}
        {(data.experience && data.experience.length > 0) && (
          <section className="mb-16">
            <h2 className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-8 font-semibold">Experience</h2>
            <div className="space-y-10">
              {data.experience.map((exp, index) => (
                <div key={exp.id || index}>
                  <div className="flex flex-col sm:flex-row sm:justify-between mb-2 gap-1 sm:gap-4">
                    <h3 className="text-base font-medium text-black">{exp.position}</h3>
                    <span className="text-xs text-gray-400 font-mono tracking-tight whitespace-nowrap mt-1 sm:mt-0">
                      {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mb-3">{exp.company}</div>
                  {exp.description && (
                    <p className="text-sm text-gray-600 leading-relaxed font-light">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {(data.experience && data.experience.length > 0) && <hr className="border-gray-200 my-16" />}

        {/* EDUCATION */}
        {(data.education && data.education.length > 0) && (
          <section className="mb-16">
            <h2 className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-8 font-semibold">Education</h2>
            <div className="space-y-8">
              {data.education.map((edu, index) => (
                <div key={edu.id || index}>
                  <div className="flex flex-col sm:flex-row sm:justify-between mb-1 gap-1 sm:gap-4">
                    <h3 className="text-base font-medium text-black">{edu.degree}</h3>
                    <span className="text-xs text-gray-400 font-mono tracking-tight whitespace-nowrap mt-1 sm:mt-0">
                      {edu.startYear} — {edu.endYear}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">{edu.university}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {(data.education && data.education.length > 0) && <hr className="border-gray-200 my-16" />}

        {/* CERTIFICATIONS */}
        {(data.certifications && data.certifications.length > 0) && (
          <section className="mb-16">
            <h2 className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-8 font-semibold">Certifications</h2>
            <div className="space-y-6 text-sm">
              {data.certifications.map((cert, index) => (
                <div key={cert.id || index} className="flex justify-between items-baseline">
                  <div>
                    <strong className="text-black font-medium">{cert.name}</strong>
                    <div className="text-xs text-gray-500">{cert.issuer}</div>
                  </div>
                  <span className="text-xs text-gray-400 font-mono">{cert.date}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {(data.certifications && data.certifications.length > 0) && <hr className="border-gray-200 my-16" />}

        {/* ACHIEVEMENTS */}
        {(data.achievements && data.achievements.length > 0) && (
          <section className="mb-16">
            <h2 className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-8 font-semibold">Achievements</h2>
            <div className="space-y-6">
              {data.achievements.map((ach, index) => (
                <div key={ach.id || index}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-base font-medium text-black">{ach.title}</h3>
                    <span className="text-xs text-gray-400 font-mono">{ach.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 font-light">{ach.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <hr className="border-gray-200 my-16" />

        {/* FOOTER */}
        <footer className="text-center text-xs text-gray-400 font-light">
          <p>&copy; {new Date().getFullYear()} {data.name}. All rights reserved.</p>
        </footer>

      </div>
    </div>
  );
}
