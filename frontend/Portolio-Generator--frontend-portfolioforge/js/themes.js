/* ══════════════════════════════════════════════════════════════════════════════
   PortfolioForge — 6 Radically Distinct Portfolio Theme Renderers
   Supports all 9 standard sections with conditional rendering & image support
   for profile avatar, project screenshots, and certification credentials.
   ══════════════════════════════════════════════════════════════════════════════ */

const PortfolioThemes = {
  /**
   * Helper: Escape HTML entities for safe output
   */
  escape(str) {
    if (!str) return '';
    return String(str).replace(/[&<>"']/g, m => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    })[m]);
  },

  /**
   * 1. BRUTALIST THEME
   * Characteristics: Heavy black borders, giant uppercase typography, raw asymmetry, high contrast
   */
  renderBrutalist(data) {
    const photo = data.profileImage ? `
      <div style="border:4px solid #000; padding:4px; background:#000; width:120px; height:120px; flex-shrink:0; box-shadow:6px 6px 0 #000;">
        <img src="${data.profileImage}" alt="${data.name}" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.parentElement.style.display='none'">
      </div>
    ` : '';

    const aboutSec = (data.about || data.tagline) ? `
      <div style="margin:2.5rem 0; border-left:8px solid #000; padding-left:1.5rem;">
        <span style="font-weight:900; font-size:0.75rem; background:#000; color:#fff; padding:0.2rem 0.5rem; text-transform:uppercase; letter-spacing:0.1em; display:inline-block; margin-bottom:0.5rem;">ABOUT // MANIFESTO</span>
        <p style="font-size:1.25rem; font-weight:600; line-height:1.5; margin:0;">
          "${data.about || data.tagline}"
        </p>
      </div>
    ` : '';

    const skillsSec = (data.skills && data.skills.length > 0) ? `
      <div style="margin:2.5rem 0; border:3px solid #000; padding:1.5rem; background:#fff; box-shadow:8px 8px 0 #000;">
        <h2 style="font-size:1.2rem; font-weight:900; text-transform:uppercase; background:#000; color:#fff; display:inline-block; padding:0.25rem 0.75rem; margin-top:-2.25rem; margin-bottom:1rem;">
          // ARSENAL &amp; SKILLS
        </h2>
        <div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-top:0.5rem;">
          ${data.skills.map((s, i) => `
            <span style="border:2px solid #000; padding:0.4rem 0.75rem; font-weight:700; font-size:0.85rem; text-transform:uppercase; background:#f4f4f4;">
              [${i + 1 < 10 ? '0' + (i + 1) : i + 1}] ${s}
            </span>
          `).join('')}
        </div>
      </div>
    ` : '';

    const projectsSec = (data.projects && data.projects.length > 0) ? `
      <div style="margin:3rem 0;">
        <h2 style="font-size:1.75rem; font-weight:900; text-transform:uppercase; border-bottom:4px solid #000; padding-bottom:0.5rem; margin-bottom:1.5rem;">
          SELECTED WORKS [0${data.projects.length}]
        </h2>
        <div style="display:grid; grid-template-columns:1fr; gap:2rem;">
          ${data.projects.map((p, idx) => `
            <div style="border:3px solid #000; padding:1.5rem; background:#fff; box-shadow:8px 8px 0 #000;">
              ${p.image ? `
                <div style="border:3px solid #000; margin-bottom:1.25rem; max-height:260px; overflow:hidden; background:#f4f4f4;">
                  <img src="${p.image}" alt="${p.name}" style="width:100%; height:220px; object-fit:cover; display:block;" onerror="this.parentElement.style.display='none'">
                </div>
              ` : ''}
              <div style="display:flex; justify-content:space-between; align-items:baseline; border-bottom:2px solid #000; padding-bottom:0.5rem; margin-bottom:0.75rem; flex-wrap:wrap; gap:0.5rem;">
                <h3 style="font-size:1.4rem; font-weight:900; text-transform:uppercase; margin:0;">${idx + 1}. ${p.name}</h3>
                ${p.highlights ? `<span style="font-weight:700; font-size:0.8rem; background:#000; color:#fff; padding:0.2rem 0.5rem;">${p.highlights}</span>` : ''}
              </div>
              <p style="font-size:0.95rem; line-height:1.5; font-weight:500; margin-bottom:1rem;">
                ${p.description || ''}
              </p>
              ${p.technologies && p.technologies.length > 0 ? `
                <div style="display:flex; flex-wrap:wrap; gap:0.4rem; font-family:monospace; font-size:0.8rem; font-weight:700; margin-bottom:1rem;">
                  ${p.technologies.map(t => `<span style="border:1px solid #000; padding:0.2rem 0.4rem; background:#f9f9f9;">#${t}</span>`).join('')}
                </div>
              ` : ''}
              <div style="display:flex; gap:1rem; flex-wrap:wrap; font-weight:800; font-size:0.85rem;">
                ${p.github ? `<a href="${p.github}" target="_blank" style="text-decoration:underline; color:#000;">[ GITHUB REPO ↗ ]</a>` : ''}
                ${p.demo ? `<a href="${p.demo}" target="_blank" style="text-decoration:underline; color:#000;">[ LIVE DEMO ↗ ]</a>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : '';

    const expSec = (data.experience && data.experience.length > 0) ? `
      <div style="border:3px solid #000; padding:1.5rem; background:#fff; box-shadow:8px 8px 0 #000; margin-bottom:1.5rem;">
        <h3 style="font-size:1.15rem; font-weight:900; text-transform:uppercase; margin-bottom:1.25rem; border-bottom:3px solid #000; padding-bottom:0.4rem;">
          // EXPERIENCE
        </h3>
        ${data.experience.map(e => `
          <div style="margin-bottom:1.25rem; border-bottom:1px dashed #ccc; padding-bottom:0.75rem;">
            <div style="font-weight:900; font-size:1.05rem; text-transform:uppercase;">${e.position}</div>
            <div style="font-size:0.85rem; font-weight:700; color:#444; margin-top:0.15rem;">
              ${e.company}${e.location ? ' • ' + e.location : ''} | ${e.startDate || ''} - ${e.endDate || (e.current ? 'PRESENT' : '')}
            </div>
            ${e.description ? `<p style="font-size:0.9rem; margin-top:0.4rem; line-height:1.45; white-space:pre-line;">${e.description}</p>` : ''}
          </div>
        `).join('')}
      </div>
    ` : '';

    const eduSec = (data.education && data.education.length > 0) ? `
      <div style="border:3px solid #000; padding:1.5rem; background:#fff; box-shadow:8px 8px 0 #000; margin-bottom:1.5rem;">
        <h3 style="font-size:1.15rem; font-weight:900; text-transform:uppercase; margin-bottom:1.25rem; border-bottom:3px solid #000; padding-bottom:0.4rem;">
          // EDUCATION
        </h3>
        ${data.education.map(ed => `
          <div style="margin-bottom:1.25rem; border-bottom:1px dashed #ccc; padding-bottom:0.75rem;">
            <div style="font-weight:900; font-size:1.05rem; text-transform:uppercase;">${ed.degree}</div>
            <div style="font-size:0.85rem; font-weight:700; color:#444; margin-top:0.15rem;">
              ${ed.university}${ed.location ? ' • ' + ed.location : ''} (${ed.startYear || ''} - ${ed.endYear || ''})
            </div>
            ${ed.grade ? `<div style="font-size:0.85rem; font-weight:800; color:#000; margin-top:0.25rem; background:#eee; display:inline-block; padding:0.1rem 0.4rem;">${ed.grade}</div>` : ''}
            ${ed.description ? `<p style="font-size:0.85rem; margin-top:0.4rem; line-height:1.4;">${ed.description}</p>` : ''}
          </div>
        `).join('')}
      </div>
    ` : '';

    const certSec = (data.certifications && data.certifications.length > 0) ? `
      <div style="border:3px solid #000; padding:1.5rem; background:#fff; box-shadow:8px 8px 0 #000; margin:2.5rem 0;">
        <h3 style="font-size:1.2rem; font-weight:900; text-transform:uppercase; margin-bottom:1.25rem; border-bottom:3px solid #000; padding-bottom:0.4rem;">
          // CERTIFICATIONS &amp; ACCREDITATIONS
        </h3>
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:1.25rem;">
          ${data.certifications.map(c => `
            <div style="border:2px solid #000; padding:1.25rem; background:#fafafa; display:flex; flex-direction:column; justify-content:space-between;">
              <div>
                ${c.image ? `
                  <div style="border:2px solid #000; margin-bottom:0.75rem; max-height:140px; overflow:hidden; background:#fff;">
                    <img src="${c.image}" alt="${c.name}" style="width:100%; height:120px; object-fit:cover; display:block;" onerror="this.parentElement.style.display='none'">
                  </div>
                ` : ''}
                <div style="font-weight:800; font-size:0.95rem; text-transform:uppercase;">${c.name}</div>
                <div style="font-size:0.85rem; font-weight:600; color:#555; margin-top:0.25rem;">
                  ${c.issuer || ''} ${c.date ? '• ' + c.date : ''}
                </div>
              </div>
              ${c.link ? `<a href="${c.link}" target="_blank" style="font-size:0.8rem; font-weight:800; color:#000; text-decoration:underline; display:inline-block; margin-top:0.75rem;">VERIFY CREDENTIAL ↗</a>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    ` : '';

    const achSec = (data.achievements && data.achievements.length > 0) ? `
      <div style="border:3px solid #000; padding:1.5rem; background:#fff; box-shadow:8px 8px 0 #000; margin:2.5rem 0;">
        <h3 style="font-size:1.2rem; font-weight:900; text-transform:uppercase; margin-bottom:1.25rem; border-bottom:3px solid #000; padding-bottom:0.4rem;">
          // ACHIEVEMENTS &amp; HONORS
        </h3>
        <div style="display:flex; flex-direction:column; gap:1rem;">
          ${data.achievements.map((a, i) => `
            <div style="border-left:4px solid #000; padding-left:1rem;">
              <div style="display:flex; justify-content:space-between; align-items:baseline; flex-wrap:wrap; gap:0.5rem;">
                <span style="font-weight:900; font-size:1rem; text-transform:uppercase;">${a.title}</span>
                ${a.date ? `<span style="font-weight:700; font-size:0.8rem; background:#000; color:#fff; padding:0.15rem 0.4rem;">${a.date}</span>` : ''}
              </div>
              ${a.description ? `<p style="font-size:0.9rem; margin-top:0.25rem; line-height:1.45;">${a.description}</p>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    ` : '';

    const actSec = (data.activities && data.activities.length > 0) ? `
      <div style="border:3px solid #000; padding:1.5rem; background:#fff; box-shadow:8px 8px 0 #000; margin:2.5rem 0;">
        <h3 style="font-size:1.2rem; font-weight:900; text-transform:uppercase; margin-bottom:1.25rem; border-bottom:3px solid #000; padding-bottom:0.4rem;">
          // ACTIVITIES &amp; LEADERSHIP
        </h3>
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:1rem;">
          ${data.activities.map(act => `
            <div style="border:2px solid #000; padding:1rem; background:#fafafa;">
              <div style="font-weight:900; font-size:0.95rem; text-transform:uppercase;">${act.title || act.role || 'Leadership'}</div>
              <div style="font-size:0.85rem; font-weight:700; color:#555; margin-top:0.2rem;">
                ${act.organization ? act.organization + ' ' : ''}${act.date ? '(' + act.date + ')' : ''}
              </div>
              ${act.description ? `<p style="font-size:0.85rem; margin-top:0.4rem; line-height:1.4;">${act.description}</p>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    ` : '';

    return `
      <div style="background:#ffffff; color:#000000; font-family:'Space Grotesk', -apple-system, sans-serif; padding:2.5rem 1.5rem; min-height:100%; box-sizing:border-box;">
        <div style="max-width:960px; margin:0 auto; border:4px solid #000; padding:2rem; box-shadow:12px 12px 0px #000000;">
          
          <!-- Header Bar -->
          <div style="border-bottom:4px solid #000; padding-bottom:1.5rem; display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1.5rem;">
            <div style="display:flex; gap:1.5rem; align-items:flex-start; flex-wrap:wrap;">
              ${photo}
              <div>
                <span style="display:inline-block; background:#000; color:#fff; font-weight:800; font-size:0.75rem; padding:0.25rem 0.5rem; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:0.5rem;">PORTFOLIO // VOL. 2026</span>
                <h1 style="font-size: clamp(2.2rem, 5vw, 3.8rem); font-weight:900; line-height:0.95; text-transform:uppercase; letter-spacing:-0.04em; margin:0;">
                  ${data.name}
                </h1>
                <p style="font-size:1.2rem; font-weight:700; text-transform:uppercase; margin-top:0.5rem; color:#333;">
                  ${data.title}
                </p>
              </div>
            </div>
            <div style="border:3px solid #000; padding:0.75rem 1rem; background:#fff; font-family:monospace; font-weight:700; font-size:0.85rem;">
              <div>LOC: ${data.location || 'GLOBAL'}</div>
              <div>STATUS: AVAILABLE</div>
            </div>
          </div>

          <!-- About / Statement -->
          ${aboutSec}

          <!-- Skills Grid -->
          ${skillsSec}

          <!-- Selected Projects -->
          ${projectsSec}

          <!-- Experience & Education -->
          ${(expSec || eduSec) ? `
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:1.5rem; margin:2.5rem 0;">
              ${expSec}
              ${eduSec}
            </div>
          ` : ''}

          <!-- Certifications -->
          ${certSec}

          <!-- Achievements -->
          ${achSec}

          <!-- Activities / Leadership -->
          ${actSec}

          <!-- Contact Footer -->
          <div style="border-top:4px solid #000; padding-top:2rem; margin-top:3rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1.5rem;">
            <div>
              <span style="font-weight:900; font-size:0.8rem; text-transform:uppercase; background:#000; color:#fff; padding:0.2rem 0.5rem;">DIRECT TRANSMISSION</span>
              <div style="font-size:1.3rem; font-weight:900; margin-top:0.5rem;">
                <a href="mailto:${data.email}" style="color:#000; text-decoration:none; border-bottom:2px solid #000;">${data.email}</a>
              </div>
              ${data.phone ? `<div style="font-weight:700; font-size:0.95rem; color:#444; margin-top:0.25rem;">📞 ${data.phone}</div>` : ''}
              ${data.location ? `<div style="font-weight:700; font-size:0.85rem; color:#666;">📍 ${data.location}</div>` : ''}
            </div>
            <div style="display:flex; gap:0.75rem; flex-wrap:wrap; font-weight:800; font-size:0.85rem;">
              ${data.website ? `<a href="${data.website}" target="_blank" style="border:2px solid #000; padding:0.5rem 1rem; color:#000; text-decoration:none; background:#fff; box-shadow:3px 3px 0 #000;">WEBSITE ↗</a>` : ''}
              ${data.github ? `<a href="${data.github}" target="_blank" style="border:2px solid #000; padding:0.5rem 1rem; color:#000; text-decoration:none; background:#fff; box-shadow:3px 3px 0 #000;">GITHUB ↗</a>` : ''}
              ${data.linkedin ? `<a href="${data.linkedin}" target="_blank" style="border:2px solid #000; padding:0.5rem 1rem; color:#000; text-decoration:none; background:#fff; box-shadow:3px 3px 0 #000;">LINKEDIN ↗</a>` : ''}
            </div>
          </div>

        </div>
      </div>
    `;
  },

  /**
   * 2. BENTO GRID THEME
   * Characteristics: Rounded modular cards, clean visual hierarchy, cohesive modern palette
   */
  renderBento(data) {
    const photo = data.profileImage ? `
      <img src="${data.profileImage}" alt="${data.name}" style="width:72px; height:72px; border-radius:18px; object-fit:cover; border:2px solid rgba(255,255,255,0.4); box-shadow:0 4px 12px rgba(0,0,0,0.15); flex-shrink:0;" onerror="this.style.display='none'">
    ` : '';

    const certTile = (data.certifications && data.certifications.length > 0) ? `
      <div style="grid-column: span 12; background:#ffffff; border:1px solid #e2e8f0; border-radius:24px; padding:2rem; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
          <h3 style="font-size:1.2rem; font-weight:700; color:#0f172a;">🏅 Professional Certifications</h3>
          <span style="font-size:0.8rem; color:#64748b;">${data.certifications.length} Credentials</span>
        </div>
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:1.25rem;">
          ${data.certifications.map(c => `
            <div style="padding:1.25rem; background:#f8fafc; border:1px solid #e2e8f0; border-radius:18px; display:flex; flex-direction:column; justify-content:space-between;">
              <div>
                ${c.image ? `
                  <div style="border-radius:12px; overflow:hidden; margin-bottom:0.75rem; border:1px solid #e2e8f0; max-height:120px; background:#fff;">
                    <img src="${c.image}" alt="${c.name}" style="width:100%; height:100px; object-fit:cover; display:block;" onerror="this.parentElement.style.display='none'">
                  </div>
                ` : ''}
                <div style="font-weight:700; font-size:0.95rem; color:#1e293b;">${c.name}</div>
                <div style="font-size:0.8rem; color:#64748b; margin-top:0.25rem;">${c.issuer || ''} ${c.date ? '• ' + c.date : ''}</div>
              </div>
              ${c.link ? `<a href="${c.link}" target="_blank" style="font-size:0.8rem; font-weight:700; color:#4f46e5; margin-top:0.75rem; text-decoration:none;">View Credential ↗</a>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    ` : '';

    const achTile = (data.achievements && data.achievements.length > 0) ? `
      <div style="grid-column: span 6; background:#ffffff; border:1px solid #e2e8f0; border-radius:24px; padding:2rem; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
        <h3 style="font-size:1.15rem; font-weight:700; margin-bottom:1.25rem; color:#0f172a;">🏆 Honors &amp; Achievements</h3>
        <div style="display:flex; flex-direction:column; gap:1rem;">
          ${data.achievements.map(a => `
            <div style="border-left:3px solid #f59e0b; padding-left:1rem;">
              <div style="display:flex; justify-content:space-between; align-items:baseline;">
                <span style="font-weight:700; font-size:0.95rem; color:#1e293b;">${a.title}</span>
                ${a.date ? `<span style="font-size:0.75rem; font-weight:600; color:#64748b;">${a.date}</span>` : ''}
              </div>
              ${a.description ? `<p style="font-size:0.85rem; color:#475569; margin-top:0.25rem; line-height:1.4;">${a.description}</p>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    ` : '';

    const actTile = (data.activities && data.activities.length > 0) ? `
      <div style="grid-column: span ${achTile ? '6' : '12'}; background:#ffffff; border:1px solid #e2e8f0; border-radius:24px; padding:2rem; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
        <h3 style="font-size:1.15rem; font-weight:700; margin-bottom:1.25rem; color:#0f172a;">🌟 Activities &amp; Leadership</h3>
        <div style="display:flex; flex-direction:column; gap:1rem;">
          ${data.activities.map(act => `
            <div style="border-left:3px solid #10b981; padding-left:1rem;">
              <div style="font-weight:700; font-size:0.95rem; color:#1e293b;">${act.title || act.role || 'Leader'}</div>
              <div style="font-size:0.8rem; color:#64748b;">${act.organization || ''} ${act.date ? '• ' + act.date : ''}</div>
              ${act.description ? `<p style="font-size:0.85rem; color:#475569; margin-top:0.25rem; line-height:1.4;">${act.description}</p>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    ` : '';

    return `
      <div style="background:#f8fafc; color:#0f172a; font-family:'Inter', sans-serif; padding:2.5rem 1.5rem; min-height:100%;">
        <div style="max-width:1080px; margin:0 auto; display:grid; grid-template-columns: repeat(12, 1fr); gap:1.25rem;">
          
          <!-- Hero Bento Tile (Span 8) -->
          <div style="grid-column: span 8; background:linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color:#fff; border-radius:24px; padding:2.5rem; box-shadow:0 10px 25px rgba(79,70,229,0.25); display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:1rem;">
                <span style="background:rgba(255,255,255,0.2); backdrop-filter:blur(8px); padding:0.35rem 0.85rem; border-radius:999px; font-size:0.75rem; font-weight:700; letter-spacing:0.05em; text-transform:uppercase;">
                  👋 Available for Opportunities
                </span>
                ${photo}
              </div>
              <h1 style="font-size: clamp(2rem, 4vw, 3rem); font-weight:800; line-height:1.1; margin:1rem 0 0.5rem 0;">
                ${data.name}
              </h1>
              <p style="font-size:1.15rem; color:#e0e7ff; font-weight:500;">
                ${data.title}
              </p>
            </div>
            ${(data.about || data.tagline) ? `
              <p style="margin-top:1.5rem; font-size:0.95rem; line-height:1.6; color:#f1f5f9; max-width:90%;">
                ${data.about || data.tagline}
              </p>
            ` : ''}
          </div>

          <!-- Quick Connect Bento Tile (Span 4) -->
          <div style="grid-column: span 4; background:#ffffff; border:1px solid #e2e8f0; border-radius:24px; padding:2rem; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
            <div>
              <span style="color:#6366f1; font-weight:700; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em;">CONNECT</span>
              <h3 style="font-size:1.25rem; font-weight:700; margin-top:0.25rem;">Get in Touch</h3>
              ${data.location ? `<p style="font-size:0.85rem; color:#64748b; margin-top:0.25rem;">📍 ${data.location}</p>` : ''}
              ${data.phone ? `<p style="font-size:0.85rem; color:#64748b; margin-top:0.15rem;">📞 ${data.phone}</p>` : ''}
            </div>
            <div style="display:flex; flex-direction:column; gap:0.5rem; margin-top:1rem;">
              <a href="mailto:${data.email}" style="display:flex; align-items:center; gap:0.5rem; padding:0.6rem 0.8rem; background:#f1f5f9; border-radius:12px; font-size:0.85rem; font-weight:600; color:#1e293b; text-decoration:none;">
                ✉️ ${data.email || 'Email Me'}
              </a>
              ${data.website ? `<a href="${data.website}" target="_blank" style="display:flex; align-items:center; gap:0.5rem; padding:0.6rem 0.8rem; background:#4f46e5; color:#fff; border-radius:12px; font-size:0.85rem; font-weight:600; text-decoration:none;">🌐 Personal Website</a>` : ''}
              ${data.github ? `<a href="${data.github}" target="_blank" style="display:flex; align-items:center; gap:0.5rem; padding:0.6rem 0.8rem; background:#0f172a; color:#fff; border-radius:12px; font-size:0.85rem; font-weight:600; text-decoration:none;">💻 GitHub Profile</a>` : ''}
              ${data.linkedin ? `<a href="${data.linkedin}" target="_blank" style="display:flex; align-items:center; gap:0.5rem; padding:0.6rem 0.8rem; background:#0284c7; color:#fff; border-radius:12px; font-size:0.85rem; font-weight:600; text-decoration:none;">🔗 LinkedIn</a>` : ''}
            </div>
          </div>

          <!-- Skills Bento Tile (Span 12) -->
          ${data.skills && data.skills.length > 0 ? `
            <div style="grid-column: span 12; background:#ffffff; border:1px solid #e2e8f0; border-radius:24px; padding:2rem; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
                <h3 style="font-size:1.2rem; font-weight:700; color:#0f172a;">🛠️ Technical Stack &amp; Capabilities</h3>
                <span style="font-size:0.8rem; color:#64748b; font-weight:500;">${data.skills.length} technologies</span>
              </div>
              <div style="display:flex; flex-wrap:wrap; gap:0.6rem;">
                ${data.skills.map(s => `
                  <span style="padding:0.4rem 0.85rem; background:#f1f5f9; color:#334155; border:1px solid #e2e8f0; border-radius:999px; font-size:0.85rem; font-weight:600;">
                    ${s}
                  </span>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Featured Projects (Span 6 each) -->
          ${(data.projects || []).map((p, i) => `
            <div style="grid-column: span 6; background:#ffffff; border:1px solid #e2e8f0; border-radius:24px; padding:2rem; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05); border-top:4px solid ${i % 2 === 0 ? '#6366f1' : '#ec4899'};">
              <div>
                ${p.image ? `
                  <div style="border-radius:14px; overflow:hidden; margin-bottom:1.25rem; border:1px solid #e2e8f0; max-height:200px; background:#f8fafc;">
                    <img src="${p.image}" alt="${p.name}" style="width:100%; height:180px; object-fit:cover; display:block;" onerror="this.parentElement.style.display='none'">
                  </div>
                ` : ''}
                <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                  <h4 style="font-size:1.25rem; font-weight:800; color:#0f172a;">${p.name}</h4>
                  ${p.highlights ? `<span style="font-size:0.75rem; font-weight:700; background:#f1f5f9; color:#6366f1; padding:0.2rem 0.6rem; border-radius:8px;">${p.highlights}</span>` : ''}
                </div>
                <p style="font-size:0.9rem; color:#475569; line-height:1.5; margin:0.75rem 0 1.25rem 0;">
                  ${p.description || ''}
                </p>
              </div>
              <div>
                ${p.technologies && p.technologies.length > 0 ? `
                  <div style="display:flex; flex-wrap:wrap; gap:0.4rem; margin-bottom:1rem;">
                    ${p.technologies.map(t => `<span style="font-size:0.75rem; background:#f8fafc; border:1px solid #e2e8f0; color:#64748b; padding:0.2rem 0.5rem; border-radius:6px; font-weight:600;">${t}</span>`).join('')}
                  </div>
                ` : ''}
                <div style="display:flex; gap:1rem; align-items:center;">
                  ${p.github ? `<a href="${p.github}" target="_blank" style="font-size:0.85rem; font-weight:700; color:#6366f1; text-decoration:none; display:inline-flex; align-items:center; gap:0.3rem;">Code Repository ↗</a>` : ''}
                  ${p.demo ? `<a href="${p.demo}" target="_blank" style="font-size:0.85rem; font-weight:700; color:#059669; text-decoration:none; display:inline-flex; align-items:center; gap:0.3rem;">Live Demo ↗</a>` : ''}
                </div>
              </div>
            </div>
          `).join('')}

          <!-- Experience Tile (Span 6) -->
          ${data.experience && data.experience.length > 0 ? `
            <div style="grid-column: span ${data.education && data.education.length > 0 ? '6' : '12'}; background:#ffffff; border:1px solid #e2e8f0; border-radius:24px; padding:2rem; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
              <h3 style="font-size:1.15rem; font-weight:700; margin-bottom:1.25rem; color:#0f172a;">💼 Experience</h3>
              ${data.experience.map(exp => `
                <div style="border-left:2px solid #6366f1; padding-left:1rem; margin-left:0.25rem; margin-bottom:1.25rem;">
                  <div style="font-weight:700; font-size:0.95rem; color:#0f172a;">${exp.position}</div>
                  <div style="font-size:0.8rem; color:#64748b; font-weight:500;">${exp.company}${exp.location ? ' • ' + exp.location : ''} (${exp.startDate || ''} - ${exp.endDate || (exp.current ? 'Present' : '')})</div>
                  ${exp.description ? `<p style="font-size:0.85rem; color:#475569; margin-top:0.4rem; line-height:1.45; white-space:pre-line;">${exp.description}</p>` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}

          <!-- Education Tile (Span 6) -->
          ${data.education && data.education.length > 0 ? `
            <div style="grid-column: span ${data.experience && data.experience.length > 0 ? '6' : '12'}; background:#ffffff; border:1px solid #e2e8f0; border-radius:24px; padding:2rem; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
              <h3 style="font-size:1.15rem; font-weight:700; margin-bottom:1.25rem; color:#0f172a;">🎓 Education</h3>
              ${data.education.map(edu => `
                <div style="border-left:2px solid #10b981; padding-left:1rem; margin-left:0.25rem; margin-bottom:1.25rem;">
                  <div style="font-weight:700; font-size:0.95rem; color:#0f172a;">${edu.degree}</div>
                  <div style="font-size:0.8rem; color:#64748b; font-weight:500;">${edu.university}${edu.location ? ' • ' + edu.location : ''} (${edu.startYear || ''} - ${edu.endYear || ''})</div>
                  ${edu.grade ? `<div style="font-size:0.85rem; color:#059669; font-weight:700; margin-top:0.2rem;">${edu.grade}</div>` : ''}
                  ${edu.description ? `<p style="font-size:0.85rem; color:#475569; margin-top:0.3rem; line-height:1.4;">${edu.description}</p>` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}

          <!-- Certifications Tile -->
          ${certTile}

          <!-- Achievements Tile -->
          ${achTile}

          <!-- Activities Tile -->
          ${actTile}

        </div>
      </div>
    `;
  },

  /**
   * 3. MINIMAL EDITORIAL THEME
   * Characteristics: Serif headings, generous whitespace, understated elegance, magazine aesthetic
   */
  renderMinimal(data) {
    const photo = data.profileImage ? `
      <div style="margin:0 auto 1.5rem auto; width:90px; height:90px; border-radius:50%; overflow:hidden; border:1px solid #e7e5e4;">
        <img src="${data.profileImage}" alt="${data.name}" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.parentElement.style.display='none'">
      </div>
    ` : '';

    return `
      <div style="background:#fafaf9; color:#1c1917; font-family:'Newsreader', Georgia, serif; padding:4rem 1.5rem; min-height:100%;">
        <div style="max-width:720px; margin:0 auto; line-height:1.7;">
          
          <!-- Editorial Masthead -->
          <header style="text-align:center; padding-bottom:3rem; border-bottom:1px solid #e7e5e4;">
            ${photo}
            <p style="font-family:'Inter', sans-serif; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.2em; color:#78716c; margin-bottom:0.75rem;">
              PORTFOLIO &amp; SELECTED WORKS
            </p>
            <h1 style="font-size: clamp(2.5rem, 5vw, 3.8rem); font-style:italic; font-weight:400; margin:0 0 0.5rem 0;">
              ${data.name}
            </h1>
            <p style="font-family:'Inter', sans-serif; font-size:0.95rem; color:#57534e; font-weight:400;">
              ${data.title} ${data.location ? '— ' + data.location : ''}
            </p>
          </header>

          <!-- Biography Section -->
          ${(data.about || data.tagline) ? `
            <section style="padding:3rem 0; border-bottom:1px solid #e7e5e4;">
              <p style="font-size:1.3rem; line-height:1.65; font-style:italic; color:#292524; margin:0;">
                "${data.about || data.tagline}"
              </p>
            </section>
          ` : ''}

          <!-- Selected Projects -->
          ${data.projects && data.projects.length > 0 ? `
            <section style="padding:3rem 0; border-bottom:1px solid #e7e5e4;">
              <h2 style="font-family:'Inter', sans-serif; font-size:0.8rem; text-transform:uppercase; letter-spacing:0.15em; color:#78716c; margin-bottom:2rem;">
                SELECTED WORKS
              </h2>
              <div style="display:flex; flex-direction:column; gap:3rem;">
                ${data.projects.map(p => `
                  <article>
                    ${p.image ? `
                      <div style="border:1px solid #e7e5e4; margin-bottom:1rem; max-height:220px; overflow:hidden; border-radius:4px;">
                        <img src="${p.image}" alt="${p.name}" style="width:100%; height:180px; object-fit:cover; display:block;" onerror="this.parentElement.style.display='none'">
                      </div>
                    ` : ''}
                    <div style="display:flex; justify-content:space-between; align-items:baseline; flex-wrap:wrap; gap:0.5rem;">
                      <h3 style="font-size:1.45rem; font-weight:600; font-style:italic; margin:0;">${p.name}</h3>
                      ${p.highlights ? `<span style="font-family:'Inter', sans-serif; font-size:0.75rem; color:#a8a29e;">${p.highlights}</span>` : ''}
                    </div>
                    <p style="font-size:1.05rem; color:#44403c; margin:0.75rem 0 0.5rem 0;">
                      ${p.description || ''}
                    </p>
                    ${p.technologies && p.technologies.length > 0 ? `
                      <p style="font-family:'Inter', sans-serif; font-size:0.8rem; color:#78716c; margin-bottom:0.5rem;">
                        Technologies: ${p.technologies.join(' · ')}
                      </p>
                    ` : ''}
                    <div style="font-family:'Inter', sans-serif; font-size:0.8rem; display:flex; gap:1.25rem;">
                      ${p.github ? `<a href="${p.github}" target="_blank" style="color:#1c1917; text-decoration:underline;">Source Code ↗</a>` : ''}
                      ${p.demo ? `<a href="${p.demo}" target="_blank" style="color:#1c1917; text-decoration:underline;">Live Demo ↗</a>` : ''}
                    </div>
                  </article>
                `).join('')}
              </div>
            </section>
          ` : ''}

          <!-- Expertise / Skills -->
          ${data.skills && data.skills.length > 0 ? `
            <section style="padding:3rem 0; border-bottom:1px solid #e7e5e4;">
              <h2 style="font-family:'Inter', sans-serif; font-size:0.8rem; text-transform:uppercase; letter-spacing:0.15em; color:#78716c; margin-bottom:1.5rem;">
                CORE COMPETENCIES
              </h2>
              <p style="font-size:1.15rem; color:#44403c; line-height:2;">
                ${data.skills.map(s => `<span style="white-space:nowrap;">${s}</span>`).join(' &nbsp;/&nbsp; ')}
              </p>
            </section>
          ` : ''}

          <!-- Career & Education -->
          ${(data.experience?.length || data.education?.length) ? `
            <section style="padding:3rem 0; border-bottom:1px solid #e7e5e4; display:grid; grid-template-columns:1fr 1fr; gap:2rem;">
              ${data.experience && data.experience.length > 0 ? `
                <div>
                  <h3 style="font-family:'Inter', sans-serif; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.15em; color:#78716c; margin-bottom:1.25rem;">EXPERIENCE</h3>
                  ${data.experience.map(e => `
                    <div style="margin-bottom:1.5rem;">
                      <div style="font-weight:600; font-size:1.05rem;">${e.position}</div>
                      <div style="font-family:'Inter', sans-serif; font-size:0.8rem; color:#78716c;">${e.company} (${e.startDate || ''} - ${e.endDate || 'Present'})</div>
                      ${e.description ? `<p style="font-size:0.95rem; color:#57534e; margin-top:0.35rem; line-height:1.5;">${e.description}</p>` : ''}
                    </div>
                  `).join('')}
                </div>
              ` : ''}
              ${data.education && data.education.length > 0 ? `
                <div>
                  <h3 style="font-family:'Inter', sans-serif; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.15em; color:#78716c; margin-bottom:1.25rem;">ACADEMICS</h3>
                  ${data.education.map(ed => `
                    <div style="margin-bottom:1.5rem;">
                      <div style="font-weight:600; font-size:1.05rem;">${ed.degree}</div>
                      <div style="font-family:'Inter', sans-serif; font-size:0.8rem; color:#78716c;">${ed.university} (${ed.startYear || ''} - ${ed.endYear || ''})</div>
                      ${ed.grade ? `<div style="font-family:'Inter', sans-serif; font-size:0.8rem; font-weight:600; color:#1c1917; margin-top:0.2rem;">${ed.grade}</div>` : ''}
                      ${ed.description ? `<p style="font-size:0.95rem; color:#57534e; margin-top:0.35rem; line-height:1.5;">${ed.description}</p>` : ''}
                    </div>
                  `).join('')}
                </div>
              ` : ''}
            </section>
          ` : ''}

          <!-- Certifications -->
          ${data.certifications && data.certifications.length > 0 ? `
            <section style="padding:3rem 0; border-bottom:1px solid #e7e5e4;">
              <h2 style="font-family:'Inter', sans-serif; font-size:0.8rem; text-transform:uppercase; letter-spacing:0.15em; color:#78716c; margin-bottom:1.5rem;">
                CERTIFICATIONS &amp; HONORS
              </h2>
              <div style="display:flex; flex-direction:column; gap:1.5rem;">
                ${data.certifications.map(c => `
                  <div>
                    ${c.image ? `
                      <div style="border:1px solid #e7e5e4; margin-bottom:0.5rem; max-height:120px; overflow:hidden; border-radius:4px; max-width:200px;">
                        <img src="${c.image}" alt="${c.name}" style="width:100%; height:100px; object-fit:cover; display:block;" onerror="this.parentElement.style.display='none'">
                      </div>
                    ` : ''}
                    <div style="font-weight:600; font-size:1.05rem;">${c.name}</div>
                    <div style="font-family:'Inter', sans-serif; font-size:0.8rem; color:#78716c;">
                      ${c.issuer || ''} ${c.date ? '— ' + c.date : ''}
                      ${c.link ? ` · <a href="${c.link}" target="_blank" style="color:#1c1917; text-decoration:underline;">Credential Link</a>` : ''}
                    </div>
                  </div>
                `).join('')}
              </div>
            </section>
          ` : ''}

          <!-- Achievements & Leadership -->
          ${(data.achievements?.length || data.activities?.length) ? `
            <section style="padding:3rem 0; border-bottom:1px solid #e7e5e4;">
              <h2 style="font-family:'Inter', sans-serif; font-size:0.8rem; text-transform:uppercase; letter-spacing:0.15em; color:#78716c; margin-bottom:1.5rem;">
                DISTINCTIONS &amp; LEADERSHIP
              </h2>
              <div style="display:flex; flex-direction:column; gap:1.5rem;">
                ${(data.achievements || []).map(a => `
                  <div>
                    <div style="font-weight:600; font-size:1.05rem;">${a.title} ${a.date ? '<span style="font-family:Inter; font-size:0.8rem; color:#78716c; font-weight:normal;">(' + a.date + ')</span>' : ''}</div>
                    ${a.description ? `<p style="font-size:0.95rem; color:#57534e; margin-top:0.25rem;">${a.description}</p>` : ''}
                  </div>
                `).join('')}
                ${(data.activities || []).map(act => `
                  <div>
                    <div style="font-weight:600; font-size:1.05rem;">${act.title || act.role} ${act.organization ? '— ' + act.organization : ''}</div>
                    ${act.description ? `<p style="font-size:0.95rem; color:#57534e; margin-top:0.25rem;">${act.description}</p>` : ''}
                  </div>
                `).join('')}
              </div>
            </section>
          ` : ''}

          <!-- Contact Footer -->
          <footer style="padding-top:3rem; text-align:center; font-family:'Inter', sans-serif; font-size:0.85rem; color:#78716c;">
            <p style="margin-bottom:0.75rem;">Inquiries &amp; Correspondence</p>
            <p style="font-weight:600; color:#1c1917; font-size:1.1rem; margin-bottom:0.5rem;">
              <a href="mailto:${data.email}" style="color:#1c1917; text-decoration:none;">${data.email}</a>
            </p>
            ${data.phone ? `<p style="margin-bottom:1rem;">📞 ${data.phone}</p>` : ''}
            <div style="display:flex; justify-content:center; gap:1.5rem; flex-wrap:wrap; margin-top:1rem;">
              ${data.website ? `<a href="${data.website}" target="_blank" style="color:#1c1917; text-decoration:underline;">Website</a>` : ''}
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
    const photo = data.profileImage ? `
      <img src="${data.profileImage}" alt="${data.name}" style="width:80px; height:80px; border-radius:24px; object-fit:cover; box-shadow:0 10px 25px rgba(79,70,229,0.25); border:3px solid #fff;" onerror="this.style.display='none'">
    ` : '';

    return `
      <div style="background:linear-gradient(135deg, #eef2ff 0%, #f5f3ff 50%, #fdf2f8 100%); color:#1e1b4b; font-family:'Plus Jakarta Sans', sans-serif; padding:3rem 1.5rem; min-height:100%;">
        <div style="max-width:980px; margin:0 auto;">
          
          <!-- Floating Hero Panel -->
          <div style="background:rgba(255,255,255,0.9); backdrop-filter:blur(16px); border-radius:32px; padding:3rem; box-shadow:0 25px 50px -12px rgba(79,70,229,0.15), 0 0 0 1px rgba(255,255,255,0.8); margin-bottom:2rem;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:1.5rem; flex-wrap:wrap;">
              <div>
                <div style="display:inline-block; padding:0.35rem 0.9rem; background:#e0e7ff; color:#4338ca; border-radius:999px; font-size:0.8rem; font-weight:700; margin-bottom:1rem;">
                  SPATIAL INTERFACE // 3D CANVAS
                </div>
                <h1 style="font-size: clamp(2.2rem, 5vw, 3.5rem); font-weight:800; letter-spacing:-0.03em; margin:0; color:#1e1b4b;">
                  ${data.name}
                </h1>
                <p style="font-size:1.25rem; font-weight:600; color:#6366f1; margin:0.5rem 0 1rem 0;">
                  ${data.title}
                </p>
              </div>
              ${photo}
            </div>
            ${(data.about || data.tagline) ? `
              <p style="font-size:1.05rem; line-height:1.6; color:#475569; max-width:780px; margin-top:0.75rem;">
                ${data.about || data.tagline}
              </p>
            ` : ''}
          </div>

          <!-- Floating Skill Badges -->
          ${data.skills && data.skills.length > 0 ? `
            <div style="background:rgba(255,255,255,0.7); backdrop-filter:blur(12px); border-radius:24px; padding:1.75rem; box-shadow:0 15px 30px -10px rgba(0,0,0,0.06); margin-bottom:2rem;">
              <h3 style="font-size:0.85rem; font-weight:800; text-transform:uppercase; color:#6366f1; letter-spacing:0.05em; margin-bottom:1rem;">
                ELEVATED TECH STACK
              </h3>
              <div style="display:flex; flex-wrap:wrap; gap:0.6rem;">
                ${data.skills.map(s => `
                  <div style="background:#ffffff; padding:0.5rem 1rem; border-radius:16px; font-weight:700; font-size:0.85rem; color:#312e81; box-shadow:0 4px 10px rgba(0,0,0,0.04); border:1px solid rgba(255,255,255,0.9);">
                    ${s}
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Spatial Project Cards -->
          ${data.projects && data.projects.length > 0 ? `
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:1.75rem; margin-bottom:2rem;">
              ${data.projects.map((p, idx) => `
                <div style="background:rgba(255,255,255,0.85); backdrop-filter:blur(16px); border-radius:28px; padding:2rem; box-shadow:0 20px 35px -10px rgba(0,0,0,0.08); display:flex; flex-direction:column; justify-content:space-between;">
                  <div>
                    ${p.image ? `
                      <div style="border-radius:18px; overflow:hidden; margin-bottom:1rem; box-shadow:0 8px 20px rgba(0,0,0,0.08); border:1px solid rgba(255,255,255,0.8); max-height:180px;">
                        <img src="${p.image}" alt="${p.name}" style="width:100%; height:160px; object-fit:cover; display:block;" onerror="this.parentElement.style.display='none'">
                      </div>
                    ` : ''}
                    ${p.highlights ? `<span style="font-size:0.75rem; font-weight:800; color:#8b5cf6; text-transform:uppercase;">${p.highlights}</span>` : ''}
                    <h3 style="font-size:1.4rem; font-weight:800; color:#1e1b4b; margin:0.25rem 0 0.75rem 0;">${p.name}</h3>
                    <p style="font-size:0.9rem; color:#475569; line-height:1.5; margin-bottom:1rem;">${p.description || ''}</p>
                  </div>
                  <div>
                    ${p.technologies && p.technologies.length > 0 ? `
                      <div style="display:flex; flex-wrap:wrap; gap:0.35rem; margin-bottom:1rem;">
                        ${p.technologies.map(t => `<span style="background:#f1f5f9; color:#475569; padding:0.2rem 0.5rem; border-radius:8px; font-size:0.75rem; font-weight:700;">${t}</span>`).join('')}
                      </div>
                    ` : ''}
                    <div style="display:flex; gap:1rem;">
                      ${p.github ? `<a href="${p.github}" target="_blank" style="color:#4f46e5; font-weight:700; font-size:0.85rem; text-decoration:none;">Code ↗</a>` : ''}
                      ${p.demo ? `<a href="${p.demo}" target="_blank" style="color:#059669; font-weight:700; font-size:0.85rem; text-decoration:none;">Live Demo ↗</a>` : ''}
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : ''}

          <!-- Education & Experience Dock -->
          ${(data.education?.length || data.experience?.length) ? `
            <div style="background:#ffffff; border-radius:28px; padding:2rem; box-shadow:0 15px 35px -5px rgba(0,0,0,0.05); display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:2rem; margin-bottom:2rem;">
              ${data.experience && data.experience.length > 0 ? `
                <div>
                  <h4 style="font-weight:800; font-size:1rem; color:#1e1b4b; margin-bottom:1.25rem;">💼 Experience Path</h4>
                  ${data.experience.map(exp => `
                    <div style="margin-bottom:1.25rem;">
                      <div style="font-weight:700; font-size:0.95rem; color:#1e1b4b;">${exp.position}</div>
                      <div style="font-size:0.85rem; color:#6366f1;">${exp.company} (${exp.startDate || ''} - ${exp.endDate || 'Present'})</div>
                      ${exp.description ? `<p style="font-size:0.85rem; color:#64748b; margin-top:0.3rem; line-height:1.45;">${exp.description}</p>` : ''}
                    </div>
                  `).join('')}
                </div>
              ` : ''}
              ${data.education && data.education.length > 0 ? `
                <div>
                  <h4 style="font-weight:800; font-size:1rem; color:#1e1b4b; margin-bottom:1.25rem;">🎓 Education Track</h4>
                  ${data.education.map(edu => `
                    <div style="margin-bottom:1.25rem;">
                      <div style="font-weight:700; font-size:0.95rem; color:#1e1b4b;">${edu.degree}</div>
                      <div style="font-size:0.85rem; color:#6366f1;">${edu.university} (${edu.startYear || ''} - ${edu.endYear || ''})</div>
                      ${edu.grade ? `<div style="font-size:0.8rem; font-weight:700; color:#10b981; margin-top:0.2rem;">${edu.grade}</div>` : ''}
                      ${edu.description ? `<p style="font-size:0.85rem; color:#64748b; margin-top:0.3rem; line-height:1.45;">${edu.description}</p>` : ''}
                    </div>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          ` : ''}

          <!-- Certifications & Achievements Dock -->
          ${(data.certifications?.length || data.achievements?.length || data.activities?.length) ? `
            <div style="background:#ffffff; border-radius:28px; padding:2rem; box-shadow:0 15px 35px -5px rgba(0,0,0,0.05); display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:2rem; margin-bottom:2rem;">
              ${data.certifications && data.certifications.length > 0 ? `
                <div>
                  <h4 style="font-weight:800; font-size:1rem; color:#1e1b4b; margin-bottom:1rem;">🏅 Certifications</h4>
                  ${data.certifications.map(c => `
                    <div style="margin-bottom:1rem; padding:0.85rem; background:#f8fafc; border-radius:16px;">
                      ${c.image ? `
                        <div style="border-radius:10px; overflow:hidden; margin-bottom:0.5rem; border:1px solid #e2e8f0; max-height:100px;">
                          <img src="${c.image}" alt="${c.name}" style="width:100%; height:90px; object-fit:cover; display:block;" onerror="this.parentElement.style.display='none'">
                        </div>
                      ` : ''}
                      <div style="font-weight:700; font-size:0.9rem; color:#1e1b4b;">${c.name}</div>
                      <div style="font-size:0.8rem; color:#6366f1;">${c.issuer || ''} ${c.date ? '• ' + c.date : ''}</div>
                      ${c.link ? `<a href="${c.link}" target="_blank" style="font-size:0.75rem; font-weight:700; color:#4f46e5; text-decoration:underline; display:inline-block; margin-top:0.25rem;">Credential ↗</a>` : ''}
                    </div>
                  `).join('')}
                </div>
              ` : ''}
              ${data.achievements && data.achievements.length > 0 ? `
                <div>
                  <h4 style="font-weight:800; font-size:1rem; color:#1e1b4b; margin-bottom:1rem;">🏆 Achievements</h4>
                  ${data.achievements.map(a => `
                    <div style="margin-bottom:1rem; padding:0.75rem; background:#f8fafc; border-radius:14px;">
                      <div style="font-weight:700; font-size:0.9rem; color:#1e1b4b;">${a.title}</div>
                      ${a.description ? `<p style="font-size:0.8rem; color:#64748b; margin-top:0.2rem;">${a.description}</p>` : ''}
                    </div>
                  `).join('')}
                </div>
              ` : ''}
              ${data.activities && data.activities.length > 0 ? `
                <div>
                  <h4 style="font-weight:800; font-size:1rem; color:#1e1b4b; margin-bottom:1rem;">🌟 Leadership</h4>
                  ${data.activities.map(act => `
                    <div style="margin-bottom:1rem; padding:0.75rem; background:#f8fafc; border-radius:14px;">
                      <div style="font-weight:700; font-size:0.9rem; color:#1e1b4b;">${act.title || act.role}</div>
                      <div style="font-size:0.8rem; color:#6366f1;">${act.organization || ''} ${act.date ? '• ' + act.date : ''}</div>
                      ${act.description ? `<p style="font-size:0.8rem; color:#64748b; margin-top:0.2rem;">${act.description}</p>` : ''}
                    </div>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          ` : ''}

          <!-- Spatial Contact Footer -->
          <div style="text-align:center; padding:3rem 0 1rem 0;">
            <p style="font-size:0.9rem; font-weight:700; color:#64748b; margin-bottom:0.5rem;">READY FOR COLLABORATION?</p>
            <p style="font-size:1.35rem; font-weight:800; color:#1e1b4b;">
              <a href="mailto:${data.email}" style="color:#1e1b4b; text-decoration:none;">${data.email}</a>
            </p>
            ${data.phone ? `<p style="font-size:0.9rem; color:#64748b; margin-top:0.25rem;">📞 ${data.phone}</p>` : ''}
            <div style="display:flex; justify-content:center; gap:1rem; margin-top:1.25rem; flex-wrap:wrap;">
              ${data.website ? `<a href="${data.website}" target="_blank" style="padding:0.5rem 1rem; background:#fff; border-radius:12px; font-weight:700; font-size:0.85rem; color:#4f46e5; text-decoration:none; box-shadow:0 4px 10px rgba(0,0,0,0.05);">Website ↗</a>` : ''}
              ${data.github ? `<a href="${data.github}" target="_blank" style="padding:0.5rem 1rem; background:#fff; border-radius:12px; font-weight:700; font-size:0.85rem; color:#1e1b4b; text-decoration:none; box-shadow:0 4px 10px rgba(0,0,0,0.05);">GitHub ↗</a>` : ''}
              ${data.linkedin ? `<a href="${data.linkedin}" target="_blank" style="padding:0.5rem 1rem; background:#fff; border-radius:12px; font-weight:700; font-size:0.85rem; color:#0284c7; text-decoration:none; box-shadow:0 4px 10px rgba(0,0,0,0.05);">LinkedIn ↗</a>` : ''}
            </div>
          </div>

        </div>
      </div>
    `;
  },

  /**
   * 5. GLASSMORPHIC THEME
   * Characteristics: Dark midnight canvas, glowing violet/blue accents, translucent frosted glass cards
   */
  renderGlassmorphic(data) {
    const photo = data.profileImage ? `
      <img src="${data.profileImage}" alt="${data.name}" style="width:75px; height:75px; border-radius:20px; object-fit:cover; border:2px solid rgba(192,132,252,0.4); box-shadow:0 0 20px rgba(168,85,247,0.3); flex-shrink:0;" onerror="this.style.display='none'">
    ` : '';

    return `
      <div style="background:radial-gradient(circle at 20% 20%, #1e0b36 0%, #090d16 60%, #030712 100%); color:#f8fafc; font-family:'Inter', sans-serif; padding:3rem 1.5rem; min-height:100%;">
        <div style="max-width:960px; margin:0 auto;">
          
          <!-- Glass Nav Pill -->
          <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.05); backdrop-filter:blur(20px); border:1px solid rgba(255,255,255,0.1); border-radius:999px; padding:0.75rem 1.75rem; margin-bottom:3rem; box-shadow:0 0 30px rgba(168,85,247,0.15);">
            <span style="font-weight:800; background:linear-gradient(135deg, #c084fc, #38bdf8); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">✦ ${data.name}</span>
            <span style="font-size:0.8rem; color:#94a3b8;">${data.location || 'AVAILABLE'}</span>
          </div>

          <!-- Glass Hero -->
          <div style="background:rgba(255,255,255,0.04); backdrop-filter:blur(24px); border:1px solid rgba(255,255,255,0.12); border-radius:32px; padding:3rem; margin-bottom:2rem; box-shadow:0 20px 40px rgba(0,0,0,0.5), inset 0 0 30px rgba(255,255,255,0.02);">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:1.5rem; flex-wrap:wrap;">
              <div>
                <h1 style="font-size: clamp(2.2rem, 5vw, 3.6rem); font-weight:900; line-height:1.1; margin:0 0 0.5rem 0; background:linear-gradient(135deg, #ffffff 0%, #c084fc 60%, #60a5fa 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">
                  ${data.name}
                </h1>
                <p style="font-size:1.25rem; font-weight:600; color:#c084fc; margin-bottom:1rem;">
                  ${data.title}
                </p>
              </div>
              ${photo}
            </div>
            ${(data.about || data.tagline) ? `
              <p style="font-size:1rem; line-height:1.6; color:#cbd5e1; max-width:700px; margin-top:0.75rem;">
                ${data.about || data.tagline}
              </p>
            ` : ''}
          </div>

          <!-- Glass Skills Stack -->
          ${data.skills && data.skills.length > 0 ? `
            <div style="background:rgba(255,255,255,0.03); backdrop-filter:blur(16px); border:1px solid rgba(255,255,255,0.08); border-radius:24px; padding:2rem; margin-bottom:2rem;">
              <h3 style="font-size:0.85rem; font-weight:700; text-transform:uppercase; color:#38bdf8; letter-spacing:0.1em; margin-bottom:1rem;">
                ACTIVE CORE TECHNOLOGIES
              </h3>
              <div style="display:flex; flex-wrap:wrap; gap:0.6rem;">
                ${data.skills.map(s => `
                  <span style="background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.15); backdrop-filter:blur(10px); padding:0.4rem 0.9rem; border-radius:12px; font-size:0.85rem; font-weight:600; color:#e2e8f0;">
                    ${s}
                  </span>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Glass Project Cards -->
          ${data.projects && data.projects.length > 0 ? `
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:1.5rem; margin-bottom:2rem;">
              ${data.projects.map(p => `
                <div style="background:rgba(255,255,255,0.03); backdrop-filter:blur(20px); border:1px solid rgba(255,255,255,0.1); border-radius:24px; padding:1.75rem; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 15px 30px rgba(0,0,0,0.3);">
                  <div>
                    ${p.image ? `
                      <div style="border-radius:14px; overflow:hidden; margin-bottom:1rem; border:1px solid rgba(255,255,255,0.15); max-height:160px;">
                        <img src="${p.image}" alt="${p.name}" style="width:100%; height:140px; object-fit:cover; display:block;" onerror="this.parentElement.style.display='none'">
                      </div>
                    ` : ''}
                    ${p.highlights ? `<span style="font-size:0.75rem; color:#c084fc; font-weight:700; text-transform:uppercase;">${p.highlights}</span>` : ''}
                    <h3 style="font-size:1.35rem; font-weight:700; color:#ffffff; margin:0.25rem 0 0.75rem 0;">${p.name}</h3>
                    <p style="font-size:0.85rem; color:#94a3b8; line-height:1.5; margin-bottom:1rem;">${p.description || ''}</p>
                  </div>
                  <div>
                    ${p.technologies && p.technologies.length > 0 ? `
                      <div style="display:flex; flex-wrap:wrap; gap:0.35rem; margin-bottom:1rem;">
                        ${p.technologies.map(t => `<span style="background:rgba(192,132,252,0.1); color:#c084fc; border:1px solid rgba(192,132,252,0.2); padding:0.2rem 0.5rem; border-radius:6px; font-size:0.75rem; font-weight:600;">${t}</span>`).join('')}
                      </div>
                    ` : ''}
                    <div style="display:flex; gap:1rem;">
                      ${p.github ? `<a href="${p.github}" target="_blank" style="font-size:0.85rem; font-weight:700; color:#38bdf8; text-decoration:none;">View Source ↗</a>` : ''}
                      ${p.demo ? `<a href="${p.demo}" target="_blank" style="font-size:0.85rem; font-weight:700; color:#4ade80; text-decoration:none;">Live Demo ↗</a>` : ''}
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : ''}

          <!-- Glass Experience & Education -->
          ${(data.experience?.length || data.education?.length) ? `
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:1.5rem; margin-bottom:2rem;">
              ${data.experience && data.experience.length > 0 ? `
                <div style="background:rgba(255,255,255,0.03); backdrop-filter:blur(16px); border:1px solid rgba(255,255,255,0.08); border-radius:24px; padding:1.75rem;">
                  <h4 style="color:#c084fc; font-weight:700; margin-bottom:1rem;">💼 EXPERIENCE RECORD</h4>
                  ${data.experience.map(exp => `
                    <div style="margin-bottom:1.25rem;">
                      <div style="font-weight:700; font-size:0.95rem; color:#fff;">${exp.position}</div>
                      <div style="font-size:0.8rem; color:#94a3b8;">${exp.company} • ${exp.startDate || ''} - ${exp.endDate || 'Present'}</div>
                      ${exp.description ? `<p style="font-size:0.8rem; color:#cbd5e1; margin-top:0.3rem; line-height:1.45;">${exp.description}</p>` : ''}
                    </div>
                  `).join('')}
                </div>
              ` : ''}
              ${data.education && data.education.length > 0 ? `
                <div style="background:rgba(255,255,255,0.03); backdrop-filter:blur(16px); border:1px solid rgba(255,255,255,0.08); border-radius:24px; padding:1.75rem;">
                  <h4 style="color:#38bdf8; font-weight:700; margin-bottom:1rem;">🎓 ACADEMIC QUALIFICATIONS</h4>
                  ${data.education.map(edu => `
                    <div style="margin-bottom:1.25rem;">
                      <div style="font-weight:700; font-size:0.95rem; color:#fff;">${edu.degree}</div>
                      <div style="font-size:0.8rem; color:#94a3b8;">${edu.university} • ${edu.startYear || ''} - ${edu.endYear || ''}</div>
                      ${edu.grade ? `<div style="font-size:0.8rem; color:#4ade80; font-weight:700; margin-top:0.2rem;">${edu.grade}</div>` : ''}
                      ${edu.description ? `<p style="font-size:0.8rem; color:#cbd5e1; margin-top:0.3rem; line-height:1.45;">${edu.description}</p>` : ''}
                    </div>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          ` : ''}

          <!-- Glass Certifications & Achievements -->
          ${(data.certifications?.length || data.achievements?.length || data.activities?.length) ? `
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:1.5rem; margin-bottom:2rem;">
              ${data.certifications && data.certifications.length > 0 ? `
                <div style="background:rgba(255,255,255,0.03); backdrop-filter:blur(16px); border:1px solid rgba(255,255,255,0.08); border-radius:24px; padding:1.75rem;">
                  <h4 style="color:#c084fc; font-weight:700; margin-bottom:1rem;">🏅 CERTIFICATIONS</h4>
                  ${data.certifications.map(c => `
                    <div style="margin-bottom:1rem; padding:0.85rem; background:rgba(255,255,255,0.02); border-radius:14px; border:1px solid rgba(255,255,255,0.05);">
                      ${c.image ? `
                        <div style="border-radius:8px; overflow:hidden; margin-bottom:0.5rem; border:1px solid rgba(192,132,252,0.2); max-height:100px;">
                          <img src="${c.image}" alt="${c.name}" style="width:100%; height:90px; object-fit:cover; display:block;" onerror="this.parentElement.style.display='none'">
                        </div>
                      ` : ''}
                      <div style="font-weight:700; font-size:0.9rem; color:#fff;">${c.name}</div>
                      <div style="font-size:0.8rem; color:#94a3b8;">${c.issuer || ''} ${c.date ? '• ' + c.date : ''}</div>
                      ${c.link ? `<a href="${c.link}" target="_blank" style="color:#38bdf8; font-size:0.75rem; text-decoration:underline; display:inline-block; margin-top:0.25rem;">Credential ↗</a>` : ''}
                    </div>
                  `).join('')}
                </div>
              ` : ''}
              ${data.achievements && data.achievements.length > 0 ? `
                <div style="background:rgba(255,255,255,0.03); backdrop-filter:blur(16px); border:1px solid rgba(255,255,255,0.08); border-radius:24px; padding:1.75rem;">
                  <h4 style="color:#38bdf8; font-weight:700; margin-bottom:1rem;">🏆 HONORS &amp; AWARDS</h4>
                  ${data.achievements.map(a => `
                    <div style="margin-bottom:1rem; padding:0.75rem; background:rgba(255,255,255,0.02); border-radius:12px;">
                      <div style="font-weight:700; font-size:0.9rem; color:#fff;">${a.title}</div>
                      ${a.description ? `<p style="font-size:0.8rem; color:#cbd5e1; margin-top:0.2rem;">${a.description}</p>` : ''}
                    </div>
                  `).join('')}
                </div>
              ` : ''}
              ${data.activities && data.activities.length > 0 ? `
                <div style="background:rgba(255,255,255,0.03); backdrop-filter:blur(16px); border:1px solid rgba(255,255,255,0.08); border-radius:24px; padding:1.75rem;">
                  <h4 style="color:#4ade80; font-weight:700; margin-bottom:1rem;">🌟 ACTIVITIES</h4>
                  ${data.activities.map(act => `
                    <div style="margin-bottom:1rem; padding:0.75rem; background:rgba(255,255,255,0.02); border-radius:12px;">
                      <div style="font-weight:700; font-size:0.9rem; color:#fff;">${act.title || act.role}</div>
                      <div style="font-size:0.8rem; color:#94a3b8;">${act.organization || ''} ${act.date ? '• ' + act.date : ''}</div>
                      ${act.description ? `<p style="font-size:0.8rem; color:#cbd5e1; margin-top:0.2rem;">${act.description}</p>` : ''}
                    </div>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          ` : ''}

          <!-- Glass Footer -->
          <footer style="text-align:center; padding:2.5rem 0; border-top:1px solid rgba(255,255,255,0.08); color:#94a3b8; font-size:0.9rem;">
            <p style="margin-bottom:0.5rem;">Connect directly: <a href="mailto:${data.email}" style="color:#fff; font-weight:600;">${data.email}</a></p>
            ${data.phone ? `<p style="font-size:0.85rem; color:#94a3b8; margin-bottom:0.75rem;">📞 ${data.phone}</p>` : ''}
            <div style="display:flex; justify-content:center; gap:1.5rem; margin-top:1rem; flex-wrap:wrap;">
              ${data.website ? `<a href="${data.website}" target="_blank" style="color:#c084fc; text-decoration:none; font-weight:600;">Website ↗</a>` : ''}
              ${data.github ? `<a href="${data.github}" target="_blank" style="color:#38bdf8; text-decoration:none; font-weight:600;">GitHub ↗</a>` : ''}
              ${data.linkedin ? `<a href="${data.linkedin}" target="_blank" style="color:#60a5fa; text-decoration:none; font-weight:600;">LinkedIn ↗</a>` : ''}
            </div>
          </footer>

        </div>
      </div>
    `;
  },

  /**
   * 6. FUTURISTIC TERMINAL THEME
   * Characteristics: Monospace typography, hacker shell aesthetic, neon green accents, ASCII frames
   */
  renderFuturistic(data) {
    const photo = data.profileImage ? `
      <div style="border:1px solid #00ff88; padding:3px; background:#000; width:80px; height:80px; box-shadow:0 0 10px rgba(0,255,136,0.3); flex-shrink:0;">
        <img src="${data.profileImage}" alt="${data.name}" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.parentElement.style.display='none'">
      </div>
    ` : '';

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
            <span style="font-size:0.8rem; color:#6b7280; font-weight:700;">portfolio-forge://user@${data.name.toLowerCase().replace(/[^a-z0-9]/g, '')}</span>
            <span style="font-size:0.75rem; color:#10b981;">● RUNNING</span>
          </div>

          <div style="padding:2rem;">
            <!-- Boot Banner -->
            <div style="border-bottom:1px dashed #1e293b; padding-bottom:1.5rem; margin-bottom:1.5rem;">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:1rem; flex-wrap:wrap;">
                <div>
                  <p style="color:#94a3b8; font-size:0.85rem; margin:0;">[INIT] System Loaded 2026.08 | Node Identity Verified</p>
                  <h1 style="font-size: clamp(1.8rem, 4vw, 2.5rem); font-weight:800; color:#fff; margin:0.5rem 0;">
                    &gt; IDENTITY: ${data.name}
                  </h1>
                  <p style="font-size:1.1rem; color:#00ff88; font-weight:600; margin:0.25rem 0;">
                    &gt; ROLE: ${data.title}
                  </p>
                  ${data.location ? `<p style="color:#64748b; font-size:0.85rem; margin:0.25rem 0;">&gt; LOC: ${data.location}</p>` : ''}
                </div>
                ${photo}
              </div>
              ${(data.about || data.tagline) ? `
                <p style="color:#cbd5e1; font-size:0.9rem; line-height:1.6; margin-top:0.75rem;">
                  &gt; BIO: "${data.about || data.tagline}"
                </p>
              ` : ''}
            </div>

            <!-- Skills Terminal Matrix -->
            ${data.skills && data.skills.length > 0 ? `
              <div style="margin-bottom:2rem;">
                <p style="color:#38bdf8; font-weight:700; font-size:0.9rem; margin-bottom:0.75rem;">&gt; cat /sys/modules/skills.cfg</p>
                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:0.5rem; font-size:0.85rem;">
                  ${data.skills.map((s, i) => `
                    <div style="border:1px solid #1e293b; padding:0.4rem 0.6rem; background:#040711;">
                      <span style="color:#64748b;">[${i < 10 ? '0' + i : i}]</span> <span style="color:#fff;">${s}</span> <span style="color:#00ff88;">[OK]</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- Projects Log -->
            ${data.projects && data.projects.length > 0 ? `
              <div style="margin-bottom:2rem;">
                <p style="color:#38bdf8; font-weight:700; font-size:0.9rem; margin-bottom:0.75rem;">&gt; execute --scan=projects</p>
                <div style="display:flex; flex-direction:column; gap:1.25rem;">
                  ${data.projects.map((p, i) => `
                    <div style="border:1px solid #1e293b; border-left:3px solid #00ff88; padding:1.25rem; background:#040711;">
                      ${p.image ? `
                        <div style="border:1px solid #00ff88; margin-bottom:0.75rem; max-height:160px; overflow:hidden; background:#000;">
                          <img src="${p.image}" alt="${p.name}" style="width:100%; height:140px; object-fit:cover; display:block; opacity:0.9;" onerror="this.parentElement.style.display='none'">
                        </div>
                      ` : ''}
                      <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:0.5rem; flex-wrap:wrap; gap:0.5rem;">
                        <span style="font-weight:700; color:#fff; font-size:1.1rem;">MODULE_0${i + 1} :: ${p.name}</span>
                        ${p.highlights ? `<span style="color:#f59e0b; font-size:0.75rem;">[${p.highlights}]</span>` : ''}
                      </div>
                      <p style="color:#94a3b8; font-size:0.85rem; line-height:1.5; margin-bottom:0.75rem;">${p.description || ''}</p>
                      ${p.technologies && p.technologies.length > 0 ? `
                        <div style="color:#38bdf8; font-size:0.75rem; margin-bottom:0.5rem;">
                          STACK: ${p.technologies.join(' | ')}
                        </div>
                      ` : ''}
                      <div style="display:flex; gap:1.25rem; margin-top:0.5rem;">
                        ${p.github ? `<a href="${p.github}" target="_blank" style="color:#00ff88; font-size:0.8rem; text-decoration:underline;">$ git clone ${p.github}</a>` : ''}
                        ${p.demo ? `<a href="${p.demo}" target="_blank" style="color:#38bdf8; font-size:0.8rem; text-decoration:underline;">$ open ${p.demo}</a>` : ''}
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- System Info (Education / Experience) -->
            ${(data.experience?.length || data.education?.length) ? `
              <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:1.5rem; margin-bottom:2rem;">
                ${data.experience && data.experience.length > 0 ? `
                  <div style="border:1px solid #1e293b; padding:1rem; background:#040711;">
                    <p style="color:#38bdf8; font-size:0.85rem; font-weight:700; margin-bottom:0.5rem;">&gt; trace career_history</p>
                    ${data.experience.map(exp => `
                      <div style="font-size:0.8rem; margin-bottom:0.75rem;">
                        <div style="color:#fff; font-weight:700;">${exp.position} @ ${exp.company}</div>
                        <div style="color:#64748b;">${exp.startDate || ''} - ${exp.endDate || (exp.current ? 'Present' : '')}</div>
                        ${exp.description ? `<div style="color:#94a3b8; margin-top:0.2rem;">${exp.description}</div>` : ''}
                      </div>
                    `).join('')}
                  </div>
                ` : ''}
                ${data.education && data.education.length > 0 ? `
                  <div style="border:1px solid #1e293b; padding:1rem; background:#040711;">
                    <p style="color:#38bdf8; font-size:0.85rem; font-weight:700; margin-bottom:0.5rem;">&gt; query credentials</p>
                    ${data.education.map(edu => `
                      <div style="font-size:0.8rem; margin-bottom:0.75rem;">
                        <div style="color:#fff; font-weight:700;">${edu.degree}</div>
                        <div style="color:#64748b;">${edu.university} (${edu.startYear || ''}-${edu.endYear || ''})</div>
                        ${edu.grade ? `<div style="color:#10b981; font-weight:700;">GPA: ${edu.grade}</div>` : ''}
                        ${edu.description ? `<div style="color:#94a3b8; margin-top:0.2rem;">${edu.description}</div>` : ''}
                      </div>
                    `).join('')}
                  </div>
                ` : ''}
              </div>
            ` : ''}

            <!-- Certifications & Achievements Matrix -->
            ${(data.certifications?.length || data.achievements?.length || data.activities?.length) ? `
              <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:1.5rem; margin-bottom:2rem;">
                ${data.certifications && data.certifications.length > 0 ? `
                  <div style="border:1px solid #1e293b; padding:1rem; background:#040711;">
                    <p style="color:#38bdf8; font-size:0.85rem; font-weight:700; margin-bottom:0.5rem;">&gt; query /sys/certifications.db</p>
                    ${data.certifications.map(c => `
                      <div style="font-size:0.8rem; margin-bottom:0.75rem; border-left:2px solid #00ff88; padding-left:0.5rem;">
                        ${c.image ? `
                          <div style="border:1px solid #00ff88; margin-bottom:0.4rem; max-height:90px; overflow:hidden; background:#000;">
                            <img src="${c.image}" alt="${c.name}" style="width:100%; height:75px; object-fit:cover; display:block;" onerror="this.parentElement.style.display='none'">
                          </div>
                        ` : ''}
                        <div style="color:#fff; font-weight:700;">${c.name}</div>
                        <div style="color:#64748b;">${c.issuer || ''} ${c.date ? '[' + c.date + ']' : ''}</div>
                        ${c.link ? `<a href="${c.link}" target="_blank" style="color:#00ff88; font-size:0.75rem; text-decoration:underline;">VERIFY_URL</a>` : ''}
                      </div>
                    `).join('')}
                  </div>
                ` : ''}
                ${data.achievements && data.achievements.length > 0 ? `
                  <div style="border:1px solid #1e293b; padding:1rem; background:#040711;">
                    <p style="color:#38bdf8; font-size:0.85rem; font-weight:700; margin-bottom:0.5rem;">&gt; cat /sys/logs/achievements.log</p>
                    ${data.achievements.map(a => `
                      <div style="font-size:0.8rem; margin-bottom:0.6rem; border-left:2px solid #f59e0b; padding-left:0.5rem;">
                        <div style="color:#fff; font-weight:700;">${a.title}</div>
                        ${a.description ? `<div style="color:#94a3b8; margin-top:0.15rem;">${a.description}</div>` : ''}
                      </div>
                    `).join('')}
                  </div>
                ` : ''}
                ${data.activities && data.activities.length > 0 ? `
                  <div style="border:1px solid #1e293b; padding:1rem; background:#040711;">
                    <p style="color:#38bdf8; font-size:0.85rem; font-weight:700; margin-bottom:0.5rem;">&gt; list /org/leadership_roles</p>
                    ${data.activities.map(act => `
                      <div style="font-size:0.8rem; margin-bottom:0.6rem; border-left:2px solid #38bdf8; padding-left:0.5rem;">
                        <div style="color:#fff; font-weight:700;">${act.title || act.role}</div>
                        <div style="color:#64748b;">${act.organization || ''} ${act.date ? '[' + act.date + ']' : ''}</div>
                        ${act.description ? `<div style="color:#94a3b8; margin-top:0.15rem;">${act.description}</div>` : ''}
                      </div>
                    `).join('')}
                  </div>
                ` : ''}
              </div>
            ` : ''}

            <!-- Terminal Prompt Contact -->
            <div style="border-top:1px solid #1e293b; padding-top:1rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
              <div>
                <span style="color:#00ff88;">user@portfolio:~$</span> ping <a href="mailto:${data.email}" style="color:#fff; text-decoration:underline;">${data.email}</a>
                ${data.phone ? `<span style="color:#64748b; margin-left:1rem;">TEL: ${data.phone}</span>` : ''}
              </div>
              <div style="display:flex; gap:1rem; font-size:0.8rem;">
                ${data.website ? `<a href="${data.website}" target="_blank" style="color:#38bdf8; text-decoration:underline;">$ www</a>` : ''}
                ${data.github ? `<a href="${data.github}" target="_blank" style="color:#00ff88; text-decoration:underline;">$ github</a>` : ''}
                ${data.linkedin ? `<a href="${data.linkedin}" target="_blank" style="color:#60a5fa; text-decoration:underline;">$ linkedin</a>` : ''}
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
    if (!data) return '<div style="padding:2rem; text-align:center;">No portfolio data found.</div>';
    
    // Normalize data structure in case data has nested personalInfo or top-level
    const normalized = {
      ...data,
      name: data.name || data.personalInfo?.name || 'Your Name',
      title: data.title || data.personalInfo?.title || 'Software Developer',
      tagline: data.tagline || data.personalInfo?.tagline || '',
      profileImage: data.profileImage || data.personalInfo?.profileImage || '',
      email: data.email || data.personalInfo?.email || '',
      phone: data.phone || data.personalInfo?.phone || '',
      location: data.location || data.personalInfo?.location || '',
      website: data.website || data.personalInfo?.website || '',
      github: data.github || data.personalInfo?.github || '',
      linkedin: data.linkedin || data.personalInfo?.linkedin || '',
      about: data.about || data.personalInfo?.summary || data.personalInfo?.about || data.summary || '',
      skills: data.skills || [],
      projects: data.projects || [],
      experience: data.experience || [],
      education: data.education || [],
      certifications: data.certifications || [],
      achievements: data.achievements || [],
      activities: data.activities || data.leadership || []
    };

    switch (theme) {
      case 'brutalist': return this.renderBrutalist(normalized);
      case 'minimal': return this.renderMinimal(normalized);
      case 'spatial': return this.renderSpatial(normalized);
      case 'glassmorphic': return this.renderGlassmorphic(normalized);
      case 'futuristic': return this.renderFuturistic(normalized);
      case 'bento':
      default:
        return this.renderBento(normalized);
    }
  }
};

if (typeof window !== 'undefined') {
  window.PortfolioThemes = PortfolioThemes;
}
export default PortfolioThemes;
