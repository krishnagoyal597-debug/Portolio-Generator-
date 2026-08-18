import React from 'react';
import { Github, Linkedin, Mail, MapPin, Phone, ExternalLink } from 'lucide-react';

// PortfolioPreview renders a full styled portfolio inside a browser chrome frame
export default function PortfolioPreview({ data, template = 'modern', scale = 1 }) {
  const templates = { minimal: MinimalTemplate, modern: ModernTemplate, creative: CreativeTemplate };
  const Template = templates[template] || ModernTemplate;

  return (
    <div className="flex flex-col h-full rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
      {/* Browser chrome */}
      <div className="flex-shrink-0 bg-gray-100 dark:bg-gray-800 px-4 py-3 flex items-center gap-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white dark:bg-gray-700 rounded-lg px-3 py-1.5 text-xs text-gray-400 font-mono truncate">
          {data?.github?.replace('github.com/', '') || 'anshikabansal'}.portfolioforge.app
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <Template data={data} />
      </div>
    </div>
  );
}

// ─── MODERN TEMPLATE ──────────────────────────────────────────────────────────
function ModernTemplate({ data }) {
  if (!data) return null;
  const { personalInfo, skillGroups, projects, education, experience, certifications, achievements } = data;
  const info = personalInfo || data;

  return (
    <div className="font-sans text-gray-900 bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-600 text-white px-8 py-16">
        <p className="text-indigo-300 text-sm font-mono mb-3 tracking-widest uppercase">Portfolio</p>
        <h1 className="text-4xl font-bold mb-2">{info.name || info.personalInfo?.name}</h1>
        <p className="text-indigo-200 text-lg mb-4">{info.title || info.personalInfo?.title}</p>
        <p className="text-indigo-100 text-sm max-w-lg leading-relaxed mb-6">
          {info.summary || info.personalInfo?.summary || info.about}
        </p>
        <div className="flex flex-wrap gap-3">
          <a href="#projects" className="px-5 py-2 bg-white text-indigo-700 rounded-xl text-sm font-semibold hover:bg-indigo-50 transition-colors">
            View Projects
          </a>
          <a href="#contact" className="px-5 py-2 bg-indigo-500/40 text-white rounded-xl text-sm font-semibold border border-indigo-400/50 hover:bg-indigo-500/60 transition-colors">
            Contact Me
          </a>
        </div>
        {/* Social */}
        <div className="flex gap-4 mt-8">
          {(info.github || info.personalInfo?.github) && (
            <a href={`https://${info.github || info.personalInfo?.github}`} className="flex items-center gap-1.5 text-xs text-indigo-200 hover:text-white transition-colors">
              <Github size={14} /> GitHub
            </a>
          )}
          {(info.linkedin || info.personalInfo?.linkedin) && (
            <a href={`https://${info.linkedin || info.personalInfo?.linkedin}`} className="flex items-center gap-1.5 text-xs text-indigo-200 hover:text-white transition-colors">
              <Linkedin size={14} /> LinkedIn
            </a>
          )}
          {(info.email || info.personalInfo?.email) && (
            <a href={`mailto:${info.email || info.personalInfo?.email}`} className="flex items-center gap-1.5 text-xs text-indigo-200 hover:text-white transition-colors">
              <Mail size={14} /> Email
            </a>
          )}
        </div>
      </div>

      <div className="px-8 py-12 space-y-14">
        {/* Skills */}
        {skillGroups && skillGroups.length > 0 && (
          <section id="skills">
            <SectionTitle>Skills</SectionTitle>
            <div className="space-y-4">
              {skillGroups.map(group => (
                <div key={group.category}>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">{group.category}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map(s => (
                      <span key={s} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-medium border border-indigo-100">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section id="projects">
            <SectionTitle>Featured Projects</SectionTitle>
            <div className="grid gap-4">
              {projects.map(p => (
                <div key={p.id || p.name} className="p-5 rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-semibold text-gray-900">{p.name}</h3>
                    <div className="flex gap-2 flex-shrink-0">
                      {p.github && <a href={`https://${p.github}`} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors"><Github size={14} /></a>}
                      {p.demo && <a href={`https://${p.demo}`} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors"><ExternalLink size={14} /></a>}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">{p.description}</p>
                  {p.highlights && <p className="text-xs text-indigo-600 mt-2 font-medium">{p.highlights}</p>}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {(p.technologies || []).map(t => (
                      <span key={t} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section id="education">
            <SectionTitle>Education</SectionTitle>
            <div className="space-y-4">
              {education.map(e => (
                <div key={e.id || e.degree} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-indigo-600 mt-1.5 flex-shrink-0" />
                    <div className="w-px flex-1 bg-indigo-100 mt-1" />
                  </div>
                  <div className="pb-4">
                    <p className="text-sm font-semibold text-gray-900">{e.degree}</p>
                    <p className="text-sm text-gray-600">{e.university}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{e.startYear} – {e.endYear} {e.grade ? `· ${e.grade}` : ''}</p>
                    {e.description && <p className="text-xs text-gray-500 mt-1">{e.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section id="experience">
            <SectionTitle>Experience</SectionTitle>
            <div className="space-y-4">
              {experience.map(e => (
                <div key={e.id || e.company} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-violet-500 mt-1.5 flex-shrink-0" />
                    <div className="w-px flex-1 bg-violet-100 mt-1" />
                  </div>
                  <div className="pb-4">
                    <p className="text-sm font-semibold text-gray-900">{e.position}</p>
                    <p className="text-sm text-indigo-600">{e.company}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{e.startDate} – {e.current ? 'Present' : e.endDate}</p>
                    <p className="text-xs text-gray-500 mt-1 whitespace-pre-line leading-relaxed">{e.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <section id="certifications">
            <SectionTitle>Certifications</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {certifications.map(c => (
                <div key={c.id || c.name} className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                  <p className="text-sm font-semibold text-gray-900">{c.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{c.issuer} · {c.date}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Achievements */}
        {achievements && achievements.length > 0 && (
          <section id="achievements">
            <SectionTitle>Achievements</SectionTitle>
            <div className="space-y-3">
              {achievements.map(a => (
                <div key={a.id || a.title} className="flex gap-3 p-4 rounded-xl border border-gray-100 hover:border-amber-200 hover:bg-amber-50/30 transition-colors">
                  <div className="text-amber-500 text-lg flex-shrink-0">🏆</div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{a.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{a.description}</p>
                    {a.date && <p className="text-xs text-gray-400 mt-1">{a.date}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        <section id="contact">
          <SectionTitle>Contact</SectionTitle>
          <div className="p-6 rounded-2xl bg-indigo-50 border border-indigo-100">
            <p className="text-sm text-gray-600 mb-4">Let's connect — I'm open to opportunities and collaborations.</p>
            <div className="space-y-2">
              {(info.email || info.personalInfo?.email) && (
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Mail size={14} className="text-indigo-500" />
                  {info.email || info.personalInfo?.email}
                </div>
              )}
              {(info.location || info.personalInfo?.location) && (
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <MapPin size={14} className="text-indigo-500" />
                  {info.location || info.personalInfo?.location}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6 text-xs">
        Built with ✦ PortfolioForge · {new Date().getFullYear()}
      </footer>
    </div>
  );
}

// ─── MINIMAL TEMPLATE ─────────────────────────────────────────────────────────
function MinimalTemplate({ data }) {
  if (!data) return null;
  const info = data.personalInfo || data;
  const { skillGroups, projects, education, experience, certifications, achievements } = data;

  return (
    <div className="font-sans text-gray-900 bg-white max-w-3xl mx-auto px-8 py-16">
      {/* Hero */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-2">{info.name}</h1>
        <p className="text-xl text-gray-400 mb-4">{info.title}</p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
          {info.email && <span className="flex items-center gap-1"><Mail size={13} />{info.email}</span>}
          {info.location && <span className="flex items-center gap-1"><MapPin size={13} />{info.location}</span>}
          {info.github && <a href={`https://${info.github}`} className="flex items-center gap-1 hover:text-gray-700"><Github size={13} />GitHub</a>}
          {info.linkedin && <a href={`https://${info.linkedin}`} className="flex items-center gap-1 hover:text-gray-700"><Linkedin size={13} />LinkedIn</a>}
        </div>
        {(info.summary || data.about) && <p className="text-sm text-gray-600 leading-relaxed mt-4 max-w-2xl">{info.summary || data.about}</p>}
      </div>

      {skillGroups && skillGroups.length > 0 && (
        <MinSection title="Skills">
          {skillGroups.map(g => (
            <div key={g.category} className="mb-3">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">{g.category}</p>
              <div className="flex flex-wrap gap-2">
                {g.skills.map(s => <span key={s} className="px-2.5 py-1 border border-gray-200 rounded text-xs text-gray-600">{s}</span>)}
              </div>
            </div>
          ))}
        </MinSection>
      )}

      {projects && projects.length > 0 && (
        <MinSection title="Projects">
          {projects.map(p => (
            <div key={p.id || p.name} className="mb-6">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-gray-900">{p.name}</h3>
                {p.github && <a href={`https://${p.github}`}><Github size={12} className="text-gray-400 hover:text-gray-600" /></a>}
                {p.demo && <a href={`https://${p.demo}`}><ExternalLink size={12} className="text-gray-400 hover:text-gray-600" /></a>}
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{p.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {(p.technologies || []).map(t => <span key={t} className="text-xs text-gray-400">{t}</span>).reduce((acc, el, i) => i === 0 ? [el] : [...acc, <span key={`sep-${i}`} className="text-gray-300">·</span>, el], [])}
              </div>
            </div>
          ))}
        </MinSection>
      )}

      {education && education.length > 0 && (
        <MinSection title="Education">
          {education.map(e => (
            <div key={e.id || e.degree} className="mb-4">
              <p className="text-sm font-semibold text-gray-900">{e.degree}</p>
              <p className="text-xs text-gray-500">{e.university} · {e.startYear}–{e.endYear} {e.grade ? `· ${e.grade}` : ''}</p>
            </div>
          ))}
        </MinSection>
      )}

      {experience && experience.length > 0 && (
        <MinSection title="Experience">
          {experience.map(e => (
            <div key={e.id || e.company} className="mb-4">
              <p className="text-sm font-semibold text-gray-900">{e.position} <span className="font-normal text-gray-500">at {e.company}</span></p>
              <p className="text-xs text-gray-400">{e.startDate} – {e.current ? 'Present' : e.endDate}</p>
              <p className="text-xs text-gray-500 mt-1 whitespace-pre-line">{e.description}</p>
            </div>
          ))}
        </MinSection>
      )}
    </div>
  );
}

function MinSection({ title, children }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-4 mb-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400">{title}</h2>
        <div className="flex-1 h-px bg-gray-100" />
      </div>
      {children}
    </div>
  );
}

// ─── CREATIVE TEMPLATE ────────────────────────────────────────────────────────
function CreativeTemplate({ data }) {
  if (!data) return null;
  const info = data.personalInfo || data;
  const { skillGroups, projects, education, experience, certifications, achievements } = data;

  return (
    <div className="font-sans" style={{ background: 'linear-gradient(160deg,#0f0c29,#302b63,#24243e)', minHeight: '100vh', color: 'white' }}>
      {/* Hero */}
      <div className="px-8 pt-16 pb-12">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-1 h-6 bg-violet-400 rounded-full" />
          <span className="text-violet-400 text-xs font-mono tracking-widest">PORTFOLIO</span>
        </div>
        <h1 className="text-6xl font-black mb-3 leading-tight" style={{ background: 'linear-gradient(90deg,#a78bfa,#38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {info.name?.split(' ')[0]}<br />{info.name?.split(' ').slice(1).join(' ')}
        </h1>
        <p className="text-violet-300 text-lg mb-4">{info.title}</p>
        <p className="text-gray-400 text-sm max-w-lg leading-relaxed mb-6">{info.summary || data.about}</p>
        <div className="flex gap-3 mb-8 flex-wrap">
          <a href="#projects" className="px-5 py-2.5 rounded-full text-sm font-semibold text-white" style={{ background: 'linear-gradient(90deg,#7c3aed,#2563eb)' }}>View Projects</a>
          <a href="#contact" className="px-5 py-2.5 rounded-full text-sm font-semibold text-violet-300 border border-violet-600">Contact Me</a>
        </div>
        <div className="flex gap-4">
          {info.github && <a href={`https://${info.github}`} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-violet-300 transition-colors"><Github size={14} />GitHub</a>}
          {info.linkedin && <a href={`https://${info.linkedin}`} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-violet-300 transition-colors"><Linkedin size={14} />LinkedIn</a>}
          {info.email && <a href={`mailto:${info.email}`} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-violet-300 transition-colors"><Mail size={14} />Email</a>}
        </div>
      </div>

      {/* Skills */}
      {skillGroups && skillGroups.length > 0 && (
        <div className="px-8 py-10 border-t border-white/10">
          <CTitle>Skills</CTitle>
          <div className="grid grid-cols-2 gap-4">
            {skillGroups.map(g => (
              <div key={g.category} className="p-4 rounded-2xl border border-white/10 bg-white/5">
                <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-3">{g.category}</p>
                <div className="flex flex-wrap gap-2">
                  {g.skills.map(s => <span key={s} className="px-2.5 py-1 bg-violet-900/40 text-violet-200 rounded-lg text-xs border border-violet-700/40">{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div id="projects" className="px-8 py-10 border-t border-white/10">
          <CTitle>Projects</CTitle>
          <div className="space-y-4">
            {projects.map(p => (
              <div key={p.id || p.name} className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-base font-bold text-white">{p.name}</h3>
                  <div className="flex gap-2">
                    {p.github && <a href={`https://${p.github}`} className="p-1.5 rounded-lg text-gray-400 hover:text-violet-300 transition-colors"><Github size={14} /></a>}
                    {p.demo && <a href={`https://${p.demo}`} className="p-1.5 rounded-lg text-gray-400 hover:text-violet-300 transition-colors"><ExternalLink size={14} /></a>}
                  </div>
                </div>
                <p className="text-sm text-gray-400">{p.description}</p>
                {p.highlights && <p className="text-xs text-violet-400 mt-2">{p.highlights}</p>}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {(p.technologies || []).map(t => <span key={t} className="px-2 py-0.5 bg-violet-800/40 text-violet-300 rounded text-xs">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="px-8 py-10 border-t border-white/10">
          <CTitle>Education</CTitle>
          {education.map(e => (
            <div key={e.id || e.degree} className="p-4 rounded-2xl border border-white/10 bg-white/5">
              <p className="text-sm font-bold text-white">{e.degree}</p>
              <p className="text-sm text-violet-300">{e.university}</p>
              <p className="text-xs text-gray-500 mt-1">{e.startYear} – {e.endYear} {e.grade ? `· ${e.grade}` : ''}</p>
            </div>
          ))}
        </div>
      )}

      {/* Contact */}
      <div id="contact" className="px-8 py-10 border-t border-white/10">
        <CTitle>Contact</CTitle>
        <div className="p-6 rounded-2xl border border-violet-700/40 bg-violet-900/20 space-y-3">
          {info.email && <div className="flex items-center gap-2 text-sm text-gray-300"><Mail size={14} className="text-violet-400" />{info.email}</div>}
          {info.location && <div className="flex items-center gap-2 text-sm text-gray-300"><MapPin size={14} className="text-violet-400" />{info.location}</div>}
        </div>
      </div>

      <footer className="text-center py-6 text-xs text-gray-600 border-t border-white/5">
        Built with ✦ PortfolioForge · {new Date().getFullYear()}
      </footer>
    </div>
  );
}

function CTitle({ children }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-1 h-5 bg-violet-500 rounded-full" />
      <h2 className="text-base font-bold text-white tracking-wide">{children}</h2>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <h2 className="text-lg font-bold text-gray-900">{children}</h2>
      <div className="flex-1 h-px bg-gray-100" />
    </div>
  );
}
