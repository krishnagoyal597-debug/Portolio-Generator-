/* ══════════════════════════════════════════════════════════════════════════════
   PortfolioForge — 6 Radically Distinct Portfolio Theme Renderers
   ══════════════════════════════════════════════════════════════════════════════ */

const PortfolioThemes = {
  /**
   * 1. BRUTALIST THEME
   * Characteristics: Heavy black borders, giant uppercase typography, raw asymmetry, high contrast
   */
  renderBrutalist(data) {
    return `
      <div style="background:#ffffff; color:#000000; font-family:'Space Grotesk', -apple-system, sans-serif; padding:2.5rem 1.5rem; min-height:100%; box-sizing:border-box;">
        <div style="max-width:960px; margin:0 auto; border:4px solid #000; padding:2rem; box-shadow:12px 12px 0px #000000;">
          
          <!-- Header Bar -->
          <div style="border-bottom:4px solid #000; padding-bottom:1.5rem; display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1rem;">
            <div>
              <span style="display:inline-block; background:#000; color:#fff; font-weight:800; font-size:0.75rem; padding:0.25rem 0.5rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:0.75rem;">PORTFOLIO // VOL. 2026</span>
              <h1 style="font-size: clamp(2.5rem, 6vw, 4.5rem); font-weight:900; line-height:0.95; text-transform:uppercase; letter-spacing:-0.04em; margin:0;">
                ${data.name}
              </h1>
              <p style="font-size:1.25rem; font-weight:700; text-transform:uppercase; margin-top:0.5rem; color:#444;">
                ${data.title}
              </p>
            </div>
            <div style="border:3px solid #000; padding:0.75rem 1rem; background:#fff; font-family:monospace; font-weight:700; font-size:0.85rem;">
              <div>LOC: ${data.location || 'GLOBAL'}</div>
              <div>STATUS: AVAILABLE</div>
            </div>
          </div>

          <!-- Statement / About -->
          <div style="margin:2.5rem 0; border-left:8px solid #000; padding-left:1.5rem;">
            <p style="font-size:1.35rem; font-weight:600; line-height:1.4;">
              "${data.about || data.tagline}"
            </p>
          </div>

          <!-- Skills Grid -->
          <div style="margin:2.5rem 0; border:3px solid #000; padding:1.5rem;">
            <h2 style="font-size:1.2rem; font-weight:900; text-transform:uppercase; background:#000; color:#fff; display:inline-block; padding:0.25rem 0.75rem; margin-top:-2.25rem; margin-bottom:1rem;">
              // ARSENAL & SKILLS
            </h2>
            <div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-top:0.5rem;">
              ${(data.skills || []).map((s, i) => `
                <span style="border:2px solid #000; padding:0.4rem 0.75rem; font-weight:700; font-size:0.85rem; text-transform:uppercase; background:#f4f4f4;">
                  [${i + 1 < 10 ? '0' + (i + 1) : i + 1}] ${s}
                </span>
              `).join('')}
            </div>
          </div>

          <!-- Selected Projects -->
          <div style="margin:3rem 0;">
            <h2 style="font-size:1.75rem; font-weight:900; text-transform:uppercase; border-bottom:4px solid #000; padding-bottom:0.5rem; margin-bottom:1.5rem;">
              SELECTED WORKS [0${(data.projects || []).length}]
            </h2>
            <div style="display:grid; grid-template-columns:1fr; gap:1.5rem;">
              ${(data.projects || []).map((p, idx) => `
                <div style="border:3px solid #000; padding:1.5rem; background:#fff; transition:transform 0.2s; box-shadow:6px 6px 0 #000;">
                  <div style="display:flex; justify-content:space-between; align-items:baseline; border-bottom:2px solid #000; padding-bottom:0.5rem; margin-bottom:0.75rem;">
                    <h3 style="font-size:1.5rem; font-weight:900; text-transform:uppercase; margin:0;">${idx + 1}. ${p.name}</h3>
                    <span style="font-weight:700; font-size:0.8rem; background:#000; color:#fff; padding:0.2rem 0.5rem;">${p.highlights || 'PROJECT'}</span>
                  </div>
                  <p style="font-size:0.95rem; line-height:1.5; font-weight:500; margin-bottom:1rem;">
                    ${p.description}
                  </p>
                  <div style="display:flex; flex-wrap:wrap; gap:0.4rem; font-family:monospace; font-size:0.8rem; font-weight:700;">
                    ${(p.technologies || []).map(t => `<span style="border:1px solid #000; padding:0.2rem 0.4rem;">#${t}</span>`).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Experience & Education -->
          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:1.5rem; margin:2.5rem 0;">
            <div style="border:3px solid #000; padding:1.25rem;">
              <h3 style="font-size:1.1rem; font-weight:900; text-transform:uppercase; margin-bottom:1rem; border-bottom:2px solid #000; padding-bottom:0.25rem;">// EXPERIENCE</h3>
              ${(data.experience || []).map(e => `
                <div style="margin-bottom:1rem;">
                  <div style="font-weight:800; font-size:1rem;">${e.position}</div>
                  <div style="font-size:0.85rem; font-weight:600; color:#555;">${e.company} | ${e.startDate} - ${e.endDate}</div>
                  <p style="font-size:0.85rem; margin-top:0.4rem; line-height:1.4;">${e.description}</p>
                </div>
              `).join('')}
            </div>
            <div style="border:3px solid #000; padding:1.25rem;">
              <h3 style="font-size:1.1rem; font-weight:900; text-transform:uppercase; margin-bottom:1rem; border-bottom:2px solid #000; padding-bottom:0.25rem;">// EDUCATION</h3>
              ${(data.education || []).map(ed => `
                <div style="margin-bottom:1rem;">
                  <div style="font-weight:800; font-size:1rem;">${ed.degree}</div>
                  <div style="font-size:0.85rem; font-weight:600; color:#555;">${ed.university} (${ed.startYear} - ${ed.endYear})</div>
                  <p style="font-size:0.85rem; font-weight:700; margin-top:0.2rem;">${ed.grade}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Contact Footer -->
          <div style="border-top:4px solid #000; padding-top:1.5rem; text-align:center; background:#000; color:#fff; margin:-2rem; margin-top:2rem; padding:2rem;">
            <h2 style="font-size:1.8rem; font-weight:900; text-transform:uppercase; margin-bottom:0.5rem;">READY TO COLLABORATE?</h2>
            <p style="font-size:1rem; font-family:monospace; margin-bottom:1rem;">${data.email} | ${data.phone}</p>
            <div style="display:flex; justify-content:center; gap:1rem; font-weight:800; font-size:0.9rem;">
              ${data.github ? `<a href="${data.github}" target="_blank" style="color:#fff; text-decoration:underline;">GITHUB ↗</a>` : ''}
              ${data.linkedin ? `<a href="${data.linkedin}" target="_blank" style="color:#fff; text-decoration:underline;">LINKEDIN ↗</a>` : ''}
            </div>
          </div>

        </div>
      </div>
    `;
  },

  /**
   * 2. BENTO GRID THEME
   * Characteristics: Rounded modules, dashboard-style organization, cohesive soft colors
   */
  renderBento(data) {
    return `
      <div style="background:#f8fafc; color:#0f172a; font-family:'Inter', sans-serif; padding:2.5rem 1.5rem; min-height:100%;">
        <div style="max-width:1080px; margin:0 auto; display:grid; grid-template-columns: repeat(12, 1fr); gap:1.25rem;">
          
          <!-- Hero Bento Tile (Span 8) -->
          <div style="grid-column: span 8; background:linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color:#fff; border-radius:24px; padding:2.5rem; box-shadow:0 10px 25px rgba(79,70,229,0.25); display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <span style="background:rgba(255,255,255,0.2); backdrop-filter:blur(8px); padding:0.35rem 0.85rem; border-radius:999px; font-size:0.75rem; font-weight:700; letter-spacing:0.05em; text-transform:uppercase;">
                👋 Available for Opportunities
              </span>
              <h1 style="font-size: clamp(2rem, 4vw, 3rem); font-weight:800; line-height:1.1; margin:1rem 0 0.5rem 0;">
                ${data.name}
              </h1>
              <p style="font-size:1.15rem; color:#e0e7ff; font-weight:500;">
                ${data.title}
              </p>
            </div>
            <p style="margin-top:1.5rem; font-size:0.95rem; line-height:1.6; color:#f1f5f9; max-width:90%;">
              ${data.about || data.tagline}
            </p>
          </div>

          <!-- Quick Connect Bento Tile (Span 4) -->
          <div style="grid-column: span 4; background:#ffffff; border:1px solid #e2e8f0; border-radius:24px; padding:2rem; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
            <div>
              <span style="color:#6366f1; font-weight:700; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em;">CONNECT</span>
              <h3 style="font-size:1.25rem; font-weight:700; margin-top:0.25rem;">Get in Touch</h3>
              <p style="font-size:0.85rem; color:#64748b; margin-top:0.5rem;">Let's build something memorable together.</p>
            </div>
            <div style="display:flex; flex-direction:column; gap:0.5rem; margin-top:1rem;">
              <a href="mailto:${data.email}" style="display:flex; align-items:center; gap:0.5rem; padding:0.6rem 0.8rem; background:#f1f5f9; border-radius:12px; font-size:0.85rem; font-weight:600; color:#1e293b;">
                ✉️ ${data.email || 'Email Me'}
              </a>
              ${data.github ? `<a href="${data.github}" target="_blank" style="display:flex; align-items:center; gap:0.5rem; padding:0.6rem 0.8rem; background:#0f172a; color:#fff; border-radius:12px; font-size:0.85rem; font-weight:600;">💻 GitHub Profile</a>` : ''}
              ${data.linkedin ? `<a href="${data.linkedin}" target="_blank" style="display:flex; align-items:center; gap:0.5rem; padding:0.6rem 0.8rem; background:#0284c7; color:#fff; border-radius:12px; font-size:0.85rem; font-weight:600;">🔗 LinkedIn</a>` : ''}
            </div>
          </div>

          <!-- Skills Bento Tile (Span 12) -->
          <div style="grid-column: span 12; background:#ffffff; border:1px solid #e2e8f0; border-radius:24px; padding:2rem; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
              <h3 style="font-size:1.2rem; font-weight:700; color:#0f172a;">Technical Stack & Capabilities</h3>
              <span style="font-size:0.8rem; color:#64748b; font-weight:500;">${(data.skills || []).length} technologies</span>
            </div>
            <div style="display:flex; flex-wrap:wrap; gap:0.6rem;">
              ${(data.skills || []).map(s => `
                <span style="padding:0.4rem 0.85rem; background:#f1f5f9; color:#334155; border:1px solid #e2e8f0; border-radius:999px; font-size:0.85rem; font-weight:600;">
                  ${s}
                </span>
              `).join('')}
            </div>
          </div>

          <!-- Featured Projects (Span 6 each) -->
          ${(data.projects || []).map((p, i) => `
            <div style="grid-column: span 6; background:#ffffff; border:1px solid #e2e8f0; border-radius:24px; padding:2rem; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05); border-top:4px solid ${i % 2 === 0 ? '#6366f1' : '#ec4899'};">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                  <h4 style="font-size:1.25rem; font-weight:800; color:#0f172a;">${p.name}</h4>
                  <span style="font-size:0.75rem; font-weight:700; background:#f1f5f9; color:#6366f1; padding:0.2rem 0.6rem; border-radius:8px;">${p.highlights || 'PROJECT'}</span>
                </div>
                <p style="font-size:0.9rem; color:#475569; line-height:1.5; margin:0.75rem 0 1.25rem 0;">
                  ${p.description}
                </p>
              </div>
              <div>
                <div style="display:flex; flex-wrap:wrap; gap:0.4rem; margin-bottom:1rem;">
                  ${(p.technologies || []).map(t => `<span style="font-size:0.75rem; background:#f8fafc; border:1px solid #e2e8f0; color:#64748b; padding:0.2rem 0.5rem; border-radius:6px; font-weight:600;">${t}</span>`).join('')}
                </div>
                ${p.github ? `<a href="${p.github}" target="_blank" style="font-size:0.85rem; font-weight:700; color:#6366f1; display:inline-flex; align-items:center; gap:0.3rem;">View Code Repository ↗</a>` : ''}
              </div>
            </div>
          `).join('')}

          <!-- Experience Tile (Span 6) -->
          <div style="grid-column: span 6; background:#ffffff; border:1px solid #e2e8f0; border-radius:24px; padding:2rem; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
            <h3 style="font-size:1.15rem; font-weight:700; margin-bottom:1rem; color:#0f172a;">💼 Experience</h3>
            ${(data.experience || []).map(exp => `
              <div style="border-left:2px solid #e2e8f0; padding-left:1rem; margin-left:0.25rem; margin-bottom:1rem;">
                <div style="font-weight:700; font-size:0.95rem;">${exp.position}</div>
                <div style="font-size:0.8rem; color:#64748b; font-weight:500;">${exp.company} • ${exp.startDate} - ${exp.endDate}</div>
                <p style="font-size:0.85rem; color:#475569; margin-top:0.4rem; line-height:1.4;">${exp.description}</p>
              </div>
            `).join('')}
          </div>

          <!-- Education Tile (Span 6) -->
          <div style="grid-column: span 6; background:#ffffff; border:1px solid #e2e8f0; border-radius:24px; padding:2rem; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
            <h3 style="font-size:1.15rem; font-weight:700; margin-bottom:1rem; color:#0f172a;">🎓 Education</h3>
            ${(data.education || []).map(edu => `
              <div style="border-left:2px solid #e2e8f0; padding-left:1rem; margin-left:0.25rem; margin-bottom:1rem;">
                <div style="font-weight:700; font-size:0.95rem;">${edu.degree}</div>
                <div style="font-size:0.8rem; color:#64748b; font-weight:500;">${edu.university} • ${edu.startYear} - ${edu.endYear}</div>
                <p style="font-size:0.85rem; color:#10b981; font-weight:700; margin-top:0.2rem;">${edu.grade}</p>
              </div>
            `).join('')}
          </div>

        </div>
      </div>
    `;
  },

  /**
   * 3. MINIMAL EDITORIAL THEME
   * Characteristics: Serif headings, generous whitespace, understated elegance, magazine aesthetic
   */
  renderMinimal(data) {
    return `
      <div style="background:#fafaf9; color:#1c1917; font-family:'Newsreader', Georgia, serif; padding:4rem 1.5rem; min-height:100%;">
        <div style="max-width:720px; margin:0 auto; line-height:1.7;">
          
          <!-- Editorial Masthead -->
          <header style="text-align:center; padding-bottom:3rem; border-bottom:1px solid #e7e5e4;">
            <p style="font-family:'Inter', sans-serif; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.2em; color:#78716c; margin-bottom:1rem;">
              PORTFOLIO & SELECTED WRITINGS
            </p>
            <h1 style="font-size: clamp(2.5rem, 5vw, 3.8rem); font-style:italic; font-weight:400; margin:0 0 0.5rem 0;">
              ${data.name}
            </h1>
            <p style="font-family:'Inter', sans-serif; font-size:0.95rem; color:#57534e; font-weight:400;">
              ${data.title} — ${data.location}
            </p>
          </header>

          <!-- Biography Section -->
          <section style="padding:3rem 0; border-bottom:1px solid #e7e5e4;">
            <p style="font-size:1.35rem; line-height:1.6; font-style:italic; color:#292524;">
              "${data.about || data.tagline}"
            </p>
          </section>

          <!-- Selected Projects -->
          <section style="padding:3rem 0; border-bottom:1px solid #e7e5e4;">
            <h2 style="font-family:'Inter', sans-serif; font-size:0.8rem; text-transform:uppercase; letter-spacing:0.15em; color:#78716c; margin-bottom:2rem;">
              SELECTED WORKS
            </h2>
            <div style="display:flex; flex-direction:column; gap:2.5rem;">
              ${(data.projects || []).map(p => `
                <article>
                  <div style="display:flex; justify-content:space-between; align-items:baseline;">
                    <h3 style="font-size:1.5rem; font-weight:600; font-style:italic; margin:0;">${p.name}</h3>
                    <span style="font-family:'Inter', sans-serif; font-size:0.75rem; color:#a8a29e;">${p.highlights || ''}</span>
                  </div>
                  <p style="font-size:1.05rem; color:#44403c; margin:0.75rem 0 0.5rem 0;">
                    ${p.description}
                  </p>
                  <p style="font-family:'Inter', sans-serif; font-size:0.8rem; color:#78716c;">
                    Tech: ${(p.technologies || []).join(' · ')}
                  </p>
                </article>
              `).join('')}
            </div>
          </section>

          <!-- Expertise / Skills -->
          <section style="padding:3rem 0; border-bottom:1px solid #e7e5e4;">
            <h2 style="font-family:'Inter', sans-serif; font-size:0.8rem; text-transform:uppercase; letter-spacing:0.15em; color:#78716c; margin-bottom:1.5rem;">
              CORE COMPETENCIES
            </h2>
            <p style="font-size:1.15rem; color:#44403c; line-height:2;">
              ${(data.skills || []).map(s => `<span style="white-space:nowrap;">${s}</span>`).join(' &nbsp;/&nbsp; ')}
            </p>
          </section>

          <!-- Career & Education -->
          <section style="padding:3rem 0; border-bottom:1px solid #e7e5e4; display:grid; grid-template-columns:1fr 1fr; gap:2rem;">
            <div>
              <h3 style="font-family:'Inter', sans-serif; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.15em; color:#78716c; margin-bottom:1rem;">EXPERIENCE</h3>
              ${(data.experience || []).map(e => `
                <div style="margin-bottom:1.25rem;">
                  <div style="font-weight:600; font-size:1.05rem;">${e.position}</div>
                  <div style="font-family:'Inter', sans-serif; font-size:0.8rem; color:#78716c;">${e.company} (${e.startDate} - ${e.endDate})</div>
                </div>
              `).join('')}
            </div>
            <div>
              <h3 style="font-family:'Inter', sans-serif; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.15em; color:#78716c; margin-bottom:1rem;">ACADEMICS</h3>
              ${(data.education || []).map(ed => `
                <div style="margin-bottom:1.25rem;">
                  <div style="font-weight:600; font-size:1.05rem;">${ed.degree}</div>
                  <div style="font-family:'Inter', sans-serif; font-size:0.8rem; color:#78716c;">${ed.university} · ${ed.grade}</div>
                </div>
              `).join('')}
            </div>
          </section>

          <!-- Contact Footer -->
          <footer style="padding-top:3rem; text-align:center; font-family:'Inter', sans-serif; font-size:0.85rem; color:#78716c;">
            <p style="margin-bottom:1rem;">Inquiries & Correspondence</p>
            <p style="font-weight:600; color:#1c1917; font-size:1rem; margin-bottom:1rem;">${data.email}</p>
            <div style="display:flex; justify-content:center; gap:1.5rem;">
              ${data.github ? `<a href="${data.github}" target="_blank" style="color:#1c1917; text-decoration:underline;">GitHub</a>` : ''}
              ${data.linkedin ? `<a href="${data.linkedin}" target="_blank" style="color:#1c1917; text-decoration:underline;">LinkedIn</a>` : ''}
            </div>
          </footer>

        </div>
      </div>
    `;
  },

  /**
   * 4. SPATIAL UI THEME
   * Characteristics: Floating layered cards, spatial drop shadows, soft ambient gradients, depth
   */
  renderSpatial(data) {
    return `
      <div style="background:linear-gradient(135deg, #eef2ff 0%, #f5f3ff 50%, #fdf2f8 100%); color:#1e1b4b; font-family:'Plus Jakarta Sans', sans-serif; padding:3rem 1.5rem; min-height:100%;">
        <div style="max-width:980px; margin:0 auto;">
          
          <!-- Floating Hero Panel -->
          <div style="background:rgba(255,255,255,0.9); backdrop-filter:blur(16px); border-radius:32px; padding:3rem; box-shadow:0 25px 50px -12px rgba(79,70,229,0.15), 0 0 0 1px rgba(255,255,255,0.8); margin-bottom:2rem; transform:translateY(-5px);">
            <div style="display:inline-block; padding:0.35rem 0.9rem; background:#e0e7ff; color:#4338ca; border-radius:999px; font-size:0.8rem; font-weight:700; margin-bottom:1rem;">
              SPATIAL INTERFACE // 3D CANVAS
            </div>
            <h1 style="font-size: clamp(2.2rem, 5vw, 3.5rem); font-weight:800; letter-spacing:-0.03em; margin:0; color:#1e1b4b;">
              ${data.name}
            </h1>
            <p style="font-size:1.25rem; font-weight:600; color:#6366f1; margin:0.5rem 0 1.5rem 0;">
              ${data.title}
            </p>
            <p style="font-size:1.05rem; line-height:1.6; color:#475569; max-width:780px;">
              ${data.about || data.tagline}
            </p>
          </div>

          <!-- Floating Skill Badges -->
          <div style="background:rgba(255,255,255,0.7); backdrop-filter:blur(12px); border-radius:24px; padding:1.75rem; box-shadow:0 15px 30px -10px rgba(0,0,0,0.06); margin-bottom:2rem;">
            <h3 style="font-size:0.85rem; font-weight:800; text-transform:uppercase; color:#6366f1; letter-spacing:0.05em; margin-bottom:1rem;">
              ELEVATED TECH STACK
            </h3>
            <div style="display:flex; flex-wrap:wrap; gap:0.6rem;">
              ${(data.skills || []).map(s => `
                <div style="background:#ffffff; padding:0.5rem 1rem; border-radius:16px; font-weight:700; font-size:0.85rem; color:#312e81; box-shadow:0 4px 10px rgba(0,0,0,0.04); border:1px solid rgba(255,255,255,0.9);">
                  ${s}
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Spatial Project Cards -->
          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:1.75rem; margin-bottom:2rem;">
            ${(data.projects || []).map((p, idx) => `
              <div style="background:rgba(255,255,255,0.85); backdrop-filter:blur(16px); border-radius:28px; padding:2rem; box-shadow:0 20px 35px -10px rgba(0,0,0,0.08); display:flex; flex-direction:column; justify-content:space-between; transform:rotate(${idx % 2 === 0 ? '-0.5deg' : '0.5deg'});">
                <div>
                  <span style="font-size:0.75rem; font-weight:800; color:#8b5cf6; text-transform:uppercase;">${p.highlights || 'PROJECT SPEC'}</span>
                  <h3 style="font-size:1.4rem; font-weight:800; color:#1e1b4b; margin:0.25rem 0 0.75rem 0;">${p.name}</h3>
                  <p style="font-size:0.9rem; color:#475569; line-height:1.5; margin-bottom:1rem;">${p.description}</p>
                </div>
                <div>
                  <div style="display:flex; flex-wrap:wrap; gap:0.35rem; margin-bottom:1rem;">
                    ${(p.technologies || []).map(t => `<span style="background:#f1f5f9; color:#475569; padding:0.2rem 0.5rem; border-radius:8px; font-size:0.75rem; font-weight:700;">${t}</span>`).join('')}
                  </div>
                  ${p.github ? `<a href="${p.github}" target="_blank" style="color:#4f46e5; font-weight:700; font-size:0.85rem;">Explore Architecture ↗</a>` : ''}
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Education & Experience Dock -->
          <div style="background:#ffffff; border-radius:28px; padding:2rem; box-shadow:0 15px 35px -5px rgba(0,0,0,0.05); display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:2rem;">
            <div>
              <h4 style="font-weight:800; font-size:1rem; color:#1e1b4b; margin-bottom:1rem;">🎓 Education Track</h4>
              ${(data.education || []).map(edu => `
                <div>
                  <div style="font-weight:700; font-size:0.95rem;">${edu.degree}</div>
                  <div style="font-size:0.85rem; color:#6366f1;">${edu.university} (${edu.startYear}-${edu.endYear})</div>
                  <div style="font-size:0.8rem; font-weight:700; color:#10b981; margin-top:0.2rem;">${edu.grade}</div>
                </div>
              `).join('')}
            </div>
            <div>
              <h4 style="font-weight:800; font-size:1rem; color:#1e1b4b; margin-bottom:1rem;">💼 Experience Path</h4>
              ${(data.experience || []).map(exp => `
                <div>
                  <div style="font-weight:700; font-size:0.95rem;">${exp.position}</div>
                  <div style="font-size:0.85rem; color:#6366f1;">${exp.company} (${exp.startDate} - ${exp.endDate})</div>
                  <div style="font-size:0.8rem; color:#64748b; margin-top:0.2rem;">${exp.description}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Spatial Contact Footer -->
          <div style="text-align:center; padding:3rem 0 1rem 0;">
            <p style="font-size:0.9rem; font-weight:700; color:#64748b; margin-bottom:0.5rem;">READY FOR IMMERSIVE CREATION?</p>
            <p style="font-size:1.25rem; font-weight:800; color:#1e1b4b;">${data.email}</p>
          </div>

        </div>
      </div>
    `;
  },

  /**
   * 5. GLASSMORPHIC THEME
   * Characteristics: Dark futuristic purple/black canvas, frosted glass cards, glow effects, neon accents
   */
  renderGlassmorphic(data) {
    return `
      <div style="background:radial-gradient(circle at 20% 20%, #1e0b36 0%, #090d16 60%, #030712 100%); color:#f8fafc; font-family:'Inter', sans-serif; padding:3rem 1.5rem; min-height:100%;">
        <div style="max-width:960px; margin:0 auto;">
          
          <!-- Glass Nav Pill -->
          <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.05); backdrop-filter:blur(20px); border:1px solid rgba(255,255,255,0.1); border-radius:999px; padding:0.75rem 1.75rem; margin-bottom:3rem; box-shadow:0 0 30px rgba(168,85,247,0.15);">
            <span style="font-weight:800; background:linear-gradient(135deg, #c084fc, #38bdf8); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">✦ ${data.name}</span>
            <span style="font-size:0.8rem; color:#94a3b8;">${data.location}</span>
          </div>

          <!-- Glass Hero -->
          <div style="background:rgba(255,255,255,0.04); backdrop-filter:blur(24px); border:1px solid rgba(255,255,255,0.12); border-radius:32px; padding:3rem; margin-bottom:2rem; box-shadow:0 20px 40px rgba(0,0,0,0.5), inset 0 0 30px rgba(255,255,255,0.02);">
            <h1 style="font-size: clamp(2.2rem, 5vw, 3.6rem); font-weight:900; line-height:1.1; margin:0 0 0.5rem 0; background:linear-gradient(135deg, #ffffff 0%, #c084fc 60%, #60a5fa 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">
              ${data.name}
            </h1>
            <p style="font-size:1.25rem; font-weight:600; color:#c084fc; margin-bottom:1.5rem;">
              ${data.title}
            </p>
            <p style="font-size:1rem; line-height:1.6; color:#cbd5e1; max-width:700px;">
              ${data.about || data.tagline}
            </p>
          </div>

          <!-- Glass Skills Stack -->
          <div style="background:rgba(255,255,255,0.03); backdrop-filter:blur(16px); border:1px solid rgba(255,255,255,0.08); border-radius:24px; padding:2rem; margin-bottom:2rem;">
            <h3 style="font-size:0.85rem; font-weight:700; text-transform:uppercase; color:#38bdf8; letter-spacing:0.1em; margin-bottom:1rem;">
              ACTIVE CORE TECHNOLOGIES
            </h3>
            <div style="display:flex; flex-wrap:wrap; gap:0.6rem;">
              ${(data.skills || []).map(s => `
                <span style="background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.15); backdrop-filter:blur(10px); padding:0.4rem 0.9rem; border-radius:12px; font-size:0.85rem; font-weight:600; color:#e2e8f0;">
                  ${s}
                </span>
              `).join('')}
            </div>
          </div>

          <!-- Glass Project Cards -->
          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:1.5rem; margin-bottom:2rem;">
            ${(data.projects || []).map(p => `
              <div style="background:rgba(255,255,255,0.03); backdrop-filter:blur(20px); border:1px solid rgba(255,255,255,0.1); border-radius:24px; padding:1.75rem; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 15px 30px rgba(0,0,0,0.3);">
                <div>
                  <span style="font-size:0.75rem; color:#c084fc; font-weight:700; text-transform:uppercase;">${p.highlights || 'PROJECT'}</span>
                  <h3 style="font-size:1.35rem; font-weight:700; color:#ffffff; margin:0.25rem 0 0.75rem 0;">${p.name}</h3>
                  <p style="font-size:0.85rem; color:#94a3b8; line-height:1.5; margin-bottom:1rem;">${p.description}</p>
                </div>
                <div>
                  <div style="display:flex; flex-wrap:wrap; gap:0.35rem; margin-bottom:1rem;">
                    ${(p.technologies || []).map(t => `<span style="background:rgba(192,132,252,0.1); color:#c084fc; border:1px solid rgba(192,132,252,0.2); padding:0.2rem 0.5rem; border-radius:6px; font-size:0.75rem; font-weight:600;">${t}</span>`).join('')}
                  </div>
                  ${p.github ? `<a href="${p.github}" target="_blank" style="font-size:0.85rem; font-weight:700; color:#38bdf8;">View Source ↗</a>` : ''}
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Glass Experience & Education -->
          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:1.5rem; margin-bottom:2rem;">
            <div style="background:rgba(255,255,255,0.03); backdrop-filter:blur(16px); border:1px solid rgba(255,255,255,0.08); border-radius:24px; padding:1.75rem;">
              <h4 style="color:#c084fc; font-weight:700; margin-bottom:1rem;">EXPERIENCE RECORD</h4>
              ${(data.experience || []).map(exp => `
                <div style="margin-bottom:1rem;">
                  <div style="font-weight:700; font-size:0.95rem;">${exp.position}</div>
                  <div style="font-size:0.8rem; color:#94a3b8;">${exp.company} • ${exp.startDate} - ${exp.endDate}</div>
                  <p style="font-size:0.8rem; color:#cbd5e1; margin-top:0.3rem;">${exp.description}</p>
                </div>
              `).join('')}
            </div>
            <div style="background:rgba(255,255,255,0.03); backdrop-filter:blur(16px); border:1px solid rgba(255,255,255,0.08); border-radius:24px; padding:1.75rem;">
              <h4 style="color:#38bdf8; font-weight:700; margin-bottom:1rem;">ACADEMIC QUALIFICATIONS</h4>
              ${(data.education || []).map(edu => `
                <div style="margin-bottom:1rem;">
                  <div style="font-weight:700; font-size:0.95rem;">${edu.degree}</div>
                  <div style="font-size:0.8rem; color:#94a3b8;">${edu.university} • ${edu.startYear} - ${edu.endYear}</div>
                  <div style="font-size:0.8rem; color:#4ade80; font-weight:700; margin-top:0.2rem;">${edu.grade}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Glass Footer -->
          <footer style="text-align:center; padding:2rem 0; border-top:1px solid rgba(255,255,255,0.08); color:#94a3b8; font-size:0.9rem;">
            <p>Connect: <a href="mailto:${data.email}" style="color:#fff; font-weight:600;">${data.email}</a></p>
          </footer>

        </div>
      </div>
    `;
  },

  /**
   * 6. FUTURISTIC TERMINAL THEME
   * Characteristics: Monospace typography, hacker shell aesthetic, neon green accents, ASCII progress bars
   */
  renderFuturistic(data) {
    return `
      <div style="background:#05050c; color:#00ff88; font-family:'JetBrains Mono', monospace; padding:2.5rem 1.5rem; min-height:100%; box-sizing:border-box;">
        <div style="max-width:960px; margin:0 auto; border:1px solid #00ff88; box-shadow:0 0 30px rgba(0,255,136,0.15); background:#090d16; border-radius:12px; overflow:hidden;">
          
          <!-- Terminal Titlebar -->
          <div style="background:#111827; border-bottom:1px solid #1f2937; padding:0.6rem 1rem; display:flex; align-items:center; justify-content:space-between;">
            <div style="display:flex; gap:0.5rem;">
              <span style="width:12px; height:12px; border-radius:50%; background:#ef4444; display:inline-block;"></span>
              <span style="width:12px; height:12px; border-radius:50%; background:#f59e0b; display:inline-block;"></span>
              <span style="width:12px; height:12px; border-radius:50%; background:#10b981; display:inline-block;"></span>
            </div>
            <span style="font-size:0.8rem; color:#6b7280; font-weight:700;">portfolio-forge://user@${data.name.toLowerCase().replace(/\s+/g, '')}</span>
            <span style="font-size:0.75rem; color:#10b981;">● RUNNING</span>
          </div>

          <div style="padding:2rem;">
            <!-- Boot Banner -->
            <pre style="color:#00ff88; font-size: clamp(0.45rem, 1.2vw, 0.75rem); line-height:1.1; margin:0 0 1.5rem 0; overflow-x:auto;">
██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗ 
██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝ 
            </pre>

            <div style="border-bottom:1px dashed #1e293b; padding-bottom:1.5rem; margin-bottom:1.5rem;">
              <p style="color:#94a3b8; font-size:0.85rem;">[INIT] System Loaded 2026.08.18 | Node Identity Verified</p>
              <h1 style="font-size:2rem; font-weight:800; color:#fff; margin:0.5rem 0;">
                > IDENTITY: ${data.name}
              </h1>
              <p style="font-size:1.1rem; color:#00ff88; font-weight:600;">
                > ROLE: ${data.title}
              </p>
              <p style="color:#cbd5e1; font-size:0.9rem; line-height:1.6; margin-top:0.75rem;">
                > BIO: "${data.about || data.tagline}"
              </p>
            </div>

            <!-- Skills Terminal Matrix -->
            <div style="margin-bottom:2rem;">
              <p style="color:#38bdf8; font-weight:700; font-size:0.9rem; margin-bottom:0.75rem;">> cat /sys/modules/skills.cfg</p>
              <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:0.5rem; font-size:0.85rem;">
                ${(data.skills || []).map((s, i) => `
                  <div style="border:1px solid #1e293b; padding:0.4rem 0.6rem; background:#040711;">
                    <span style="color:#64748b;">[${i < 10 ? '0' + i : i}]</span> <span style="color:#fff;">${s}</span> <span style="color:#00ff88;">[OK]</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Projects Log -->
            <div style="margin-bottom:2rem;">
              <p style="color:#38bdf8; font-weight:700; font-size:0.9rem; margin-bottom:0.75rem;">> execute --scan=projects</p>
              <div style="display:flex; flex-direction:column; gap:1rem;">
                ${(data.projects || []).map((p, i) => `
                  <div style="border:1px solid #1e293b; border-left:3px solid #00ff88; padding:1.25rem; background:#040711;">
                    <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:0.5rem;">
                      <span style="font-weight:700; color:#fff; font-size:1.1rem;">MODULE_0${i + 1} :: ${p.name}</span>
                      <span style="color:#f59e0b; font-size:0.75rem;">[${p.highlights || 'DEPLOYED'}]</span>
                    </div>
                    <p style="color:#94a3b8; font-size:0.85rem; line-height:1.5; margin-bottom:0.75rem;">${p.description}</p>
                    <div style="color:#38bdf8; font-size:0.75rem; margin-bottom:0.5rem;">
                      STACK: ${(p.technologies || []).join(' | ')}
                    </div>
                    ${p.github ? `<a href="${p.github}" target="_blank" style="color:#00ff88; font-size:0.8rem; text-decoration:underline;">$ git clone ${p.github}</a>` : ''}
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- System Info (Education / Experience) -->
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:1.5rem; margin-bottom:2rem;">
              <div style="border:1px solid #1e293b; padding:1rem; background:#040711;">
                <p style="color:#38bdf8; font-size:0.85rem; font-weight:700; margin-bottom:0.5rem;">> trace career_history</p>
                ${(data.experience || []).map(exp => `
                  <div style="font-size:0.8rem; margin-bottom:0.75rem;">
                    <div style="color:#fff; font-weight:700;">${exp.position} @ ${exp.company}</div>
                    <div style="color:#64748b;">${exp.startDate} - ${exp.endDate}</div>
                    <div style="color:#94a3b8; margin-top:0.2rem;">${exp.description}</div>
                  </div>
                `).join('')}
              </div>
              <div style="border:1px solid #1e293b; padding:1rem; background:#040711;">
                <p style="color:#38bdf8; font-size:0.85rem; font-weight:700; margin-bottom:0.5rem;">> query credentials</p>
                ${(data.education || []).map(edu => `
                  <div style="font-size:0.8rem; margin-bottom:0.75rem;">
                    <div style="color:#fff; font-weight:700;">${edu.degree}</div>
                    <div style="color:#64748b;">${edu.university} (${edu.startYear}-${edu.endYear})</div>
                    <div style="color:#10b981; font-weight:700;">GPA: ${edu.grade}</div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Terminal Prompt Contact -->
            <div style="border-top:1px solid #1e293b; padding-top:1rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
              <div>
                <span style="color:#00ff88;">user@portfolio:~$</span> ping <a href="mailto:${data.email}" style="color:#fff; text-decoration:underline;">${data.email}</a>
              </div>
              <div style="color:#64748b; font-size:0.8rem;">
                PACKETS: 0% LOSS
              </div>
            </div>

          </div>
        </div>
      </div>
    `;
  },

  /**
   * Router function to render chosen theme
   */
  render(theme, data) {
    switch (theme) {
      case 'brutalist': return this.renderBrutalist(data);
      case 'minimal': return this.renderMinimal(data);
      case 'spatial': return this.renderSpatial(data);
      case 'glassmorphic': return this.renderGlassmorphic(data);
      case 'futuristic': return this.renderFuturistic(data);
      case 'bento':
      default:
        return this.renderBento(data);
    }
  }
};
