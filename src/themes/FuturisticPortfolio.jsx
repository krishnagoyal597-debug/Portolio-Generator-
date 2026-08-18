import React, { useEffect, useState } from 'react';

export default function FuturisticPortfolio({ data }) {
  const [booting, setBooting] = useState(true);
  const [bootLog, setBootLog] = useState([]);

  const bootSequence = [
    "> INITIALIZING SYSTEM CORE...",
    "> LOADING NEURAL INTERFACE...",
    "> BYPASSING SECURITY PROTOCOLS... [OK]",
    "> DECRYPTING USER PROFILE...",
    "> ACCESS GRANTED."
  ];

  useEffect(() => {
    if (!booting) return;
    
    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < bootSequence.length) {
        setBootLog(prev => [...prev, bootSequence[currentLog]]);
        currentLog++;
      } else {
        clearInterval(interval);
        setTimeout(() => setBooting(false), 800);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [booting]);

  if (!data) return null;

  const terminalStyle = {
    fontFamily: '"JetBrains Mono", "Fira Code", monospace',
    backgroundColor: '#050510',
    color: '#00ff88'
  };

  const panelClass = "border border-[#00ff8840] bg-[#00ff88]/5 p-6 mb-8 relative";
  const headerClass = "absolute -top-3 left-4 bg-[#050510] px-2 text-xs font-bold tracking-widest text-[#00ff88]";

  if (booting) {
    return (
      <div className="min-h-screen flex flex-col p-8" style={terminalStyle}>
        <div className="max-w-2xl w-full mx-auto mt-24">
          {bootLog.map((log, i) => (
            <div key={i} className="mb-2 opacity-80">{log}</div>
          ))}
          <div className="animate-pulse">_</div>
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
          .cursor-blink { animation: blink 1s step-end infinite; }
        `}} />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 relative selection:bg-[#00ff88] selection:text-[#050510]" style={terminalStyle}>
      
      {/* Scanline overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-10" 
           style={{ background: 'linear-gradient(transparent 50%, rgba(0,0,0,0.5) 50%)', backgroundSize: '100% 4px' }} />

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .cursor-blink { animation: blink 1s step-end infinite; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #050510; border-left: 1px solid #00ff8840; }
        ::-webkit-scrollbar-thumb { background: #00ff8840; }
        ::-webkit-scrollbar-thumb:hover { background: #00ff88; }
      `}} />

      <div className="max-w-5xl mx-auto space-y-12 pb-20 relative z-10">
        
        {/* HEADER / PROFILE */}
        <header className={panelClass}>
          <div className={headerClass}>{'// SYS.PROFILE_DATA'}</div>
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center mt-4">
            <div className="w-32 h-32 border-2 border-[#00ff88] flex items-center justify-center relative overflow-hidden shrink-0">
              <div className="absolute inset-0 bg-[#00ff88] opacity-20 animate-pulse"></div>
              <span className="text-4xl font-bold">{data.name.substring(0,2).toUpperCase()}</span>
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00ff88]"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00ff88]"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00ff88]"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00ff88]"></div>
            </div>
            
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {data.name.toUpperCase()} <span className="cursor-blink inline-block w-4 h-8 bg-[#00ff88] align-middle"></span>
              </h1>
              <div className="text-[#4a5568] mb-4 text-lg">{'>>'} {data.title.toUpperCase()}</div>
              <p className="text-sm leading-relaxed max-w-2xl opacity-90">
                {data.about || data.tagline}
              </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* SKILLS TERMINAL */}
          <div className="lg:col-span-1 space-y-8">
            {(data.skillGroups && data.skillGroups.length > 0) && (
              <section className={panelClass}>
                <div className={headerClass}>{'// SYS.CAPABILITIES'}</div>
                <div className="mt-4 space-y-6">
                  {data.skillGroups.map((group, idx) => (
                    <div key={idx}>
                      <div className="text-xs text-[#4a5568] mb-2 font-bold">[{group.category.toUpperCase()}]</div>
                      <div className="space-y-2 text-sm">
                        {(group.skills || []).map((skill, sIdx) => (
                          <div key={sIdx} className="flex justify-between items-center group cursor-default hover:bg-[#00ff88]/10 px-1">
                            <span>{(sIdx + 1).toString().padStart(2, '0')} {skill}</span>
                            <span className="text-[#4a5568] group-hover:text-[#00ff88] transition-colors">
                              [{Array(8).fill('█').join('')}]
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {(data.education && data.education.length > 0) && (
              <section className={panelClass}>
                <div className={headerClass}>{'// SYS.TRAINING_DATA'}</div>
                <div className="mt-4 space-y-6 text-sm">
                  {data.education.map((edu, idx) => (
                    <div key={idx} className="border-l border-[#4a5568] pl-4 relative">
                      <div className="absolute top-1 -left-[5px] w-2 h-2 bg-[#00ff88]"></div>
                      <div className="font-bold mb-1 text-[#00ff88]">{edu.degree.toUpperCase()}</div>
                      <div className="text-[#4a5568] mb-1">{edu.university.toUpperCase()}</div>
                      <div className="text-xs opacity-70">
                        {edu.startYear} - {edu.endYear}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="lg:col-span-2 space-y-8">
            
            {/* PROJECTS MODULES */}
            {(data.projects && data.projects.length > 0) && (
              <section className={panelClass}>
                <div className={headerClass}>{'// SYS.PROJECT_MODULES'}</div>
                <div className="mt-4 grid grid-cols-1 gap-6">
                  {data.projects.map((project, idx) => (
                    <div key={idx} className="border border-[#4a5568] bg-[#050510] p-4 group hover:border-[#00ff88] transition-colors">
                      <div className="flex justify-between items-center mb-4 border-b border-[#4a5568] pb-2 group-hover:border-[#00ff88] transition-colors">
                        <div className="font-bold text-lg">
                          <span className="text-[#4a5568] mr-2">MOD_{(idx+1).toString().padStart(2,'0')}</span>
                          {project.name.toUpperCase()}
                        </div>
                        <div className="flex gap-4 text-sm">
                          {project.github && <a href={project.github} className="hover:text-white hover:underline">[SRC]</a>}
                          {project.demo && <a href={project.demo} className="hover:text-white hover:underline">[EXE]</a>}
                        </div>
                      </div>
                      <p className="text-sm opacity-80 mb-4 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 text-xs">
                        {(project.technologies || []).map((tech, tIdx) => (
                          <span key={tIdx} className="bg-[#00ff88]/10 text-[#00ff88] px-2 py-1">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* EXPERIENCE LOG */}
            {(data.experience && data.experience.length > 0) && (
              <section className={panelClass}>
                <div className={headerClass}>{'// SYS.EXPERIENCE_LOG'}</div>
                <div className="mt-4 space-y-0 text-sm">
                  {data.experience.map((exp, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row gap-4 p-4 hover:bg-[#00ff88]/5 border-b border-[#00ff8820] last:border-0">
                      <div className="w-32 shrink-0 text-[#4a5568] font-bold">
                        [{exp.startDate} -<br/>{exp.current ? 'PRESENT' : exp.endDate}]
                      </div>
                      <div>
                        <div className="font-bold text-[#00ff88] mb-1">{exp.position.toUpperCase()}</div>
                        <div className="opacity-80 mb-2">@ {exp.company.toUpperCase()}</div>
                        {exp.description && (
                          <div className="text-xs opacity-70 leading-relaxed border-l-2 border-[#4a5568] pl-3">
                            {exp.description}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* CONTACT */}
            <section className={panelClass}>
              <div className={headerClass}>{'// SYS.COMM_LINK'}</div>
              <div className="mt-4 text-sm space-y-2">
                <div><span className="text-[#4a5568]">root@portfolio:~$</span> contact --ping</div>
                {data.email && (
                  <div>
                    <span className="text-[#4a5568]">{'>>'} EMAIL: </span>
                    <a href={`mailto:${data.email}`} className="hover:underline hover:text-white">{data.email}</a>
                  </div>
                )}
                {data.github && (
                  <div>
                    <span className="text-[#4a5568]">{'>>'} GITHUB: </span>
                    <a href={data.github} className="hover:underline hover:text-white">{data.github}</a>
                  </div>
                )}
                {data.linkedin && (
                  <div>
                    <span className="text-[#4a5568]">{'>>'} LINKEDIN: </span>
                    <a href={data.linkedin} className="hover:underline hover:text-white">{data.linkedin}</a>
                  </div>
                )}
                <div className="animate-pulse mt-4">_</div>
              </div>
            </section>
            
          </div>
        </div>
      </div>
    </div>
  );
}
