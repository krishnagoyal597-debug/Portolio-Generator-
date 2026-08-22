/* ══════════════════════════════════════════════════════════════════════════════
   PortfolioForge — Main Application Logic & Single-Page Router (Pure JS)
   ══════════════════════════════════════════════════════════════════════════════ */

class PortfolioForgeApp {
  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('pf_user')) || null;
    this.currentThemeMode = localStorage.getItem('pf_theme_mode') || 'light';
    
    // Active Creation Wizard State
    this.currentWizardStep = 1;
    this.selectedTheme = 'bento';
    this.uploadedFile = null;
    this.activeProfileData = null;
    this.analysisResults = null;

    this.init();
  }

  async init() {
    this.applyThemeMode(this.currentThemeMode);
    await this.loadSampleData();
    this.setupEventListeners();
    this.handleRoute();
    window.addEventListener('hashchange', () => this.handleRoute());
  }

  async loadSampleData() {
    try {
      const res = await fetch('data/data.json');
      this.db = await res.json();
      this.activeProfileData = JSON.parse(JSON.stringify(this.db.sampleProfile));
    } catch (e) {
      console.warn('Fallback to inline sample profile');
      this.activeProfileData = {
        name: 'Anshika Bansal',
        title: 'Computer Science & AI Engineer',
        email: 'anshika.bansal@email.com',
        location: 'Delhi, India',
        tagline: 'Building intelligent systems at the intersection of AI and software engineering.',
        about: 'Computer Science engineer specializing in AI/ML and full-stack development. Building intelligent applications from transformer models to high-throughput distributed systems.',
        skills: ['Python', 'Java', 'JavaScript', 'TypeScript', 'FastAPI', 'React', 'TensorFlow', 'Docker', 'AWS', 'PostgreSQL'],
        projects: [
          {
            name: 'PortfolioForge',
            description: 'AI-powered resume-to-portfolio engine converting plain text resumes into six distinct responsive HTML portfolios.',
            technologies: ['Vanilla JS', 'FastAPI', 'Gemini API', 'HTML5', 'CSS3'],
            highlights: '6 Distinct Themes · 100% Client Exportable'
          },
          {
            name: 'SmartResume AI',
            description: 'Transformer-driven resume diagnostics tool with semantic skill gap analysis and automated ATS recommendations.',
            technologies: ['Python', 'Hugging Face', 'FastAPI', 'React'],
            highlights: '94.2% Diagnostic Accuracy'
          }
        ],
        experience: [
          {
            company: 'TechSolutions Pvt. Ltd.',
            position: 'Software Engineering Intern',
            startDate: 'June 2024',
            endDate: 'August 2024',
            description: 'Architected high-performance FastAPI endpoints reducing latency by 35% across 50k+ daily queries.'
          }
        ],
        education: [
          {
            degree: 'B.Tech in Computer Science & Engineering',
            university: 'Delhi Technological University',
            startYear: '2021',
            endYear: '2025',
            grade: 'CGPA: 8.8 / 10'
          }
        ]
      };
    }
  }

  applyThemeMode(mode) {
    this.currentThemeMode = mode;
    localStorage.setItem('pf_theme_mode', mode);
    document.documentElement.setAttribute('data-theme', mode);
    const themeBtns = document.querySelectorAll('.mode-toggle-btn');
    themeBtns.forEach(btn => {
      btn.innerHTML = mode === 'dark' ? '☀️' : '🌙';
      btn.title = mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    });
  }

  toggleThemeMode() {
    const next = this.currentThemeMode === 'dark' ? 'light' : 'dark';
    this.applyThemeMode(next);
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '❌';
    if (type === 'warning') icon = '⚠️';

    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 3500);
  }

  setupEventListeners() {
    // Navigation click delegates
    document.addEventListener('click', (e) => {
      const link = e.target.closest('[data-route]');
      if (link) {
        e.preventDefault();
        const route = link.getAttribute('data-route');
        window.location.hash = route;
      }
    });

    // Mobile menu toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu-drawer');
    if (mobileBtn && mobileMenu) {
      mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
      });
    }
  }

  handleRoute() {
    const rawHash = window.location.hash.slice(1) || 'home';
    const [route, param] = rawHash.split('/');

    const appRoot = document.getElementById('app-root');
    if (!appRoot) return;

    // Close mobile menu if open
    const mobileMenu = document.getElementById('mobile-menu-drawer');
    if (mobileMenu) mobileMenu.classList.remove('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });

    switch (route) {
      case 'home':
        this.renderLandingPage();
        break;
      case 'login':
        this.renderLoginPage();
        break;
      case 'signup':
        this.renderSignupPage();
        break;
      case 'dashboard':
        this.renderDashboard();
        break;
      case 'portfolios':
        this.renderPortfoliosView();
        break;
      case 'themes':
        this.renderThemesView();
        break;
      case 'settings':
        this.renderSettingsView();
        break;
      case 'create':
        this.renderWizardStep(parseInt(param) || 1);
        break;
      case 'admin':
        this.renderAdminDashboard(param || 'overview');
        break;
      case 'portfolio-view':
        this.renderFullPortfolioView(param || this.selectedTheme);
        break;
      default:
        this.renderLandingPage();
    }
  }

  /* ──────────────────────────────────────────────────────────────────────────
     1. PUBLIC LANDING PAGE (Clean, Minimal, Focused SaaS)
     ────────────────────────────────────────────────────────────────────────── */

  renderLandingPage() {
    const root = document.getElementById('app-root');
    root.innerHTML = `
      <!-- Simple Public Navigation Bar -->
      <nav class="navbar">
        <div class="container nav-container">
          <a href="#home" class="brand-logo">
            <span class="brand-sparkle">✦</span>
            <span>PortfolioForge</span>
          </a>

          <div class="flex items-center gap-3">
            ${this.currentUser ? `
              <a href="#dashboard" class="btn btn-primary btn-sm">Dashboard →</a>
            ` : `
              <a href="#login" class="btn btn-ghost btn-sm">Login</a>
              <a href="#signup" class="btn btn-primary btn-sm">Sign Up</a>
            `}
          </div>
        </div>
      </nav>

      <!-- Clean Focused Hero Section -->
      <section class="hero-section" style="min-height: calc(100vh - 4.25rem); display: flex; align-items: center;">
        <div class="hero-glow-1"></div>
        <div class="hero-glow-2"></div>
        
        <div class="container">
          <div class="hero-grid">
            <div>
              <div class="badge badge-glow" style="margin-bottom: 1rem;">
                ✦ Resume to Portfolio Generator
              </div>
              <h1 class="heading-display hero-title">
                Turn Your Resume Into <br>a <span class="text-gradient">Professional Portfolio</span>
              </h1>
              <p class="hero-subtitle">
                Upload your resume, let AI structure your information, choose a theme, and generate your portfolio website in minutes.
              </p>
              
              <div class="flex items-center gap-4 flex-wrap">
                <a href="${this.currentUser ? '#dashboard' : '#signup'}" class="btn btn-primary btn-lg">
                  Create My Portfolio →
                </a>
                ${!this.currentUser ? `
                  <a href="#login" class="btn btn-secondary btn-lg">
                    Sign In
                  </a>
                ` : `
                  <a href="#create/1" class="btn btn-secondary btn-lg">
                    Start Creation Wizard
                  </a>
                `}
              </div>

              <div style="margin-top: 2rem; font-size: 0.9rem; color: #94a3b8; font-weight: 500;">
                <span class="flex items-center gap-2">
                  <span style="color: #10b981;">●</span> Simple &nbsp;•&nbsp; 
                  <span style="color: #6366f1;">●</span> AI-Powered &nbsp;•&nbsp; 
                  <span style="color: #38bdf8;">●</span> Fast
                </span>
              </div>
            </div>

            <!-- Single Polished Hero Portfolio Preview (Clean & Focused) -->
            <div style="display: flex; justify-content: center; align-items: center;">
              <div class="card" style="width: 100%; max-width: 440px; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 24px; padding: 2rem; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6); color: #fff;">
                <div class="flex justify-between items-center" style="margin-bottom: 1.25rem;">
                  <span class="badge badge-primary" style="font-size: 0.7rem;">Live Portfolio Preview</span>
                  <span style="font-size: 0.75rem; color: #10b981; font-weight: 700;">● Online</span>
                </div>
                
                <div style="font-weight: 800; font-size: 1.5rem; margin-bottom: 0.25rem; color: #fff;">Anshika Bansal</div>
                <div style="font-size: 0.85rem; color: #818cf8; font-weight: 600; margin-bottom: 1rem;">Computer Science & AI Engineer</div>
                
                <p style="font-size: 0.85rem; color: #cbd5e1; line-height: 1.5; margin-bottom: 1.25rem;">
                  Specializing in machine learning, high-performance distributed systems, and intelligent full-stack architectures.
                </p>

                <div style="margin-bottom: 1.25rem;">
                  <div style="font-size: 0.75rem; text-transform: uppercase; color: #94a3b8; font-weight: 700; margin-bottom: 0.5rem;">Extracted Core Stack</div>
                  <div style="display: flex; flex-wrap: wrap; gap: 0.35rem;">
                    <span style="font-size: 0.75rem; background: rgba(99, 102, 241, 0.15); color: #a5b4fc; border: 1px solid rgba(99, 102, 241, 0.3); padding: 0.2rem 0.55rem; border-radius: 6px; font-weight: 600;">Python</span>
                    <span style="font-size: 0.75rem; background: rgba(99, 102, 241, 0.15); color: #a5b4fc; border: 1px solid rgba(99, 102, 241, 0.3); padding: 0.2rem 0.55rem; border-radius: 6px; font-weight: 600;">FastAPI</span>
                    <span style="font-size: 0.75rem; background: rgba(99, 102, 241, 0.15); color: #a5b4fc; border: 1px solid rgba(99, 102, 241, 0.3); padding: 0.2rem 0.55rem; border-radius: 6px; font-weight: 600;">React</span>
                    <span style="font-size: 0.75rem; background: rgba(99, 102, 241, 0.15); color: #a5b4fc; border: 1px solid rgba(99, 102, 241, 0.3); padding: 0.2rem 0.55rem; border-radius: 6px; font-weight: 600;">TensorFlow</span>
                  </div>
                </div>

                <div style="border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 1rem; display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 0.75rem; color: #94a3b8;">Single-File HTML Exportable</span>
                  <a href="${this.currentUser ? '#create/1' : '#signup'}" style="font-size: 0.8rem; font-weight: 700; color: #6366f1;">Generate Yours ↗</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- Minimal Public Footer -->
      <footer style="background: #090d16; color: #64748b; padding: 2rem 0; font-size: 0.85rem; border-top: 1px solid #1e293b;">
        <div class="container flex justify-between items-center md-flex-col gap-4">
          <div class="flex items-center gap-2">
            <span style="color:#6366f1; font-weight:800; font-size:1rem;">✦ PortfolioForge</span>
            <span>— AI Resume to Portfolio Studio</span>
          </div>
          <div>
            Built with Clean HTML5, CSS3, ES6 JavaScript & JSON.
          </div>
        </div>
      </footer>
    `;
  }

  /* ──────────────────────────────────────────────────────────────────────────
     2. AUTH VIEWS (Login / Signup)
     ────────────────────────────────────────────────────────────────────────── */

  renderLoginPage() {
    const root = document.getElementById('app-root');
    root.innerHTML = `
      <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem; background: var(--bg-primary);">
        <div style="max-width: 440px; width: 100%;" class="card">
          <div style="text-align: center; margin-bottom: 2rem;">
            <a href="#home" class="brand-logo" style="justify-content: center; margin-bottom: 0.5rem;">
              <span class="brand-sparkle">✦</span>
              <span>PortfolioForge</span>
            </a>
            <h2 style="font-size: 1.5rem; font-weight: 800; margin-top: 0.5rem;">Welcome back 👋</h2>
            <p style="font-size: 0.85rem; color: var(--text-secondary);">Enter your credentials to access your dashboard</p>
          </div>

          <form id="login-form" onsubmit="event.preventDefault(); app.handleLogin();">
            <div class="form-group">
              <label class="form-label">Email Address</label>
              <input id="login-email" type="email" class="form-input" value="anshika@example.com" required placeholder="name@domain.com">
            </div>
            <div class="form-group">
              <label class="form-label">Password</label>
              <input id="login-password" type="password" class="form-input" value="password123" required placeholder="••••••••">
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 0.5rem; padding: 0.75rem;">
              Sign In to Dashboard
            </button>
          </form>

          <div style="margin-top: 1.5rem; padding: 0.75rem; background: var(--bg-subtle); border-radius: var(--radius-md); font-size: 0.75rem; color: var(--text-secondary);">
            <strong>Demo Credentials:</strong><br>
            User: <code>anshika@example.com</code> / <code>password123</code><br>
            Admin: <code>admin@portfolioforge.com</code> / <code>admin123</code>
          </div>

          <div style="text-align: center; margin-top: 1.5rem; font-size: 0.85rem; color: var(--text-secondary);">
            Don't have an account? <a href="#signup" style="color: var(--primary); font-weight: 600;">Sign up</a>
          </div>
        </div>
      </div>
    `;
  }

  handleLogin() {
    const email = document.getElementById('login-email').value;
    if (email === 'admin@portfolioforge.com') {
      this.currentUser = { name: 'Admin', email, role: 'admin' };
      localStorage.setItem('pf_user', JSON.stringify(this.currentUser));
      this.showToast('Logged in as Administrator', 'success');
      window.location.hash = '#admin';
    } else {
      this.currentUser = { name: 'Anshika Bansal', email, role: 'user' };
      localStorage.setItem('pf_user', JSON.stringify(this.currentUser));
      this.showToast('Welcome back, Anshika!', 'success');
      window.location.hash = '#dashboard';
    }
  }

  renderSignupPage() {
    const root = document.getElementById('app-root');
    root.innerHTML = `
      <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem; background: var(--bg-primary);">
        <div style="max-width: 440px; width: 100%;" class="card">
          <div style="text-align: center; margin-bottom: 2rem;">
            <a href="#home" class="brand-logo" style="justify-content: center; margin-bottom: 0.5rem;">
              <span class="brand-sparkle">✦</span>
              <span>PortfolioForge</span>
            </a>
            <h2 style="font-size: 1.5rem; font-weight: 800; margin-top: 0.5rem;">Create an Account</h2>
            <p style="font-size: 0.85rem; color: var(--text-secondary);">Start generating beautiful portfolios in seconds</p>
          </div>

          <form onsubmit="event.preventDefault(); app.handleSignup();">
            <div class="form-group">
              <label class="form-label">Full Name</label>
              <input id="signup-name" type="text" class="form-input" required placeholder="Anshika Bansal">
            </div>
            <div class="form-group">
              <label class="form-label">Email Address</label>
              <input id="signup-email" type="email" class="form-input" required placeholder="anshika@example.com">
            </div>
            <div class="form-group">
              <label class="form-label">Password</label>
              <input id="signup-password" type="password" class="form-input" required placeholder="••••••••">
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 0.5rem; padding: 0.75rem;">
              Create Free Account
            </button>
          </form>

          <div style="text-align: center; margin-top: 1.5rem; font-size: 0.85rem; color: var(--text-secondary);">
            Already have an account? <a href="#login" style="color: var(--primary); font-weight: 600;">Sign in</a>
          </div>
        </div>
      </div>
    `;
  }

  handleSignup() {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    this.currentUser = { name: name || 'Developer', email, role: 'user' };
    localStorage.setItem('pf_user', JSON.stringify(this.currentUser));
    this.showToast('Account created successfully!', 'success');
    window.location.hash = '#dashboard';
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('pf_user');
    this.showToast('Signed out successfully', 'info');
    window.location.hash = '#home';
  }

  /* ──────────────────────────────────────────────────────────────────────────
     AUTHENTICATED APPLICATION SHELL & HEADER (Top-right Mode Switch)
     ────────────────────────────────────────────────────────────────────────── */

  renderAuthenticatedLayout(pageTitle, contentHtml, activeNav = 'dashboard') {
    const user = this.currentUser || { name: 'Anshika Bansal', email: 'anshika@example.com' };
    const root = document.getElementById('app-root');

    root.innerHTML = `
      <div style="display: flex; min-height: 100vh; background: var(--bg-primary);">
        
        <!-- Minimal Clean Sidebar -->
        <aside style="width: 250px; background: var(--bg-surface); border-right: 1px solid var(--border-color); padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between; flex-shrink: 0;">
          <div>
            <a href="#dashboard" class="brand-logo" style="margin-bottom: 2rem;">
              <span class="brand-sparkle">✦</span>
              <span>PortfolioForge</span>
            </a>

            <nav style="display: flex; flex-direction: column; gap: 0.35rem;">
              <a href="#dashboard" class="btn ${activeNav === 'dashboard' ? 'btn-secondary' : 'btn-ghost'}" style="justify-content: flex-start; ${activeNav === 'dashboard' ? 'background: var(--primary-light); color: var(--primary); border-color: transparent;' : ''}">
                📊 Dashboard
              </a>
              <a href="#portfolios" class="btn ${activeNav === 'portfolios' ? 'btn-secondary' : 'btn-ghost'}" style="justify-content: flex-start; ${activeNav === 'portfolios' ? 'background: var(--primary-light); color: var(--primary); border-color: transparent;' : ''}">
                📁 My Portfolios
              </a>
              <a href="#create/1" class="btn btn-ghost" style="justify-content: flex-start;">
                ⚡ Create Portfolio
              </a>
              <a href="#themes" class="btn ${activeNav === 'themes' ? 'btn-secondary' : 'btn-ghost'}" style="justify-content: flex-start; ${activeNav === 'themes' ? 'background: var(--primary-light); color: var(--primary); border-color: transparent;' : ''}">
                🎨 Themes
              </a>

              <div style="height: 1px; background: var(--border-color); margin: 0.75rem 0;"></div>

              <a href="#settings" class="btn ${activeNav === 'settings' ? 'btn-secondary' : 'btn-ghost'}" style="justify-content: flex-start; ${activeNav === 'settings' ? 'background: var(--primary-light); color: var(--primary); border-color: transparent;' : ''}">
                ⚙️ Settings
              </a>
              <a href="javascript:void(0)" onclick="app.showToast('Need help? Drop a resume to get started!', 'info')" class="btn btn-ghost" style="justify-content: flex-start;">
                ❓ Help
              </a>
            </nav>
          </div>

          <div style="border-top: 1px solid var(--border-color); padding-top: 1rem;">
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
              <div style="width: 34px; height: 34px; border-radius: 50%; background: var(--primary); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.85rem;">
                ${user.name[0]}
              </div>
              <div style="overflow: hidden;">
                <div style="font-weight: 700; font-size: 0.85rem; white-space: nowrap; text-overflow: ellipsis;">${user.name}</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">${user.email}</div>
              </div>
            </div>
            <button class="btn btn-ghost btn-sm" style="width: 100%; justify-content: flex-start; color: var(--accent-rose);" onclick="app.logout()">
              🚪 Sign Out
            </button>
          </div>
        </aside>

        <!-- Main Content Area with Top Header containing Mode Switch -->
        <div style="flex: 1; display: flex; flex-direction: column; overflow-y: auto;">
          
          <!-- Authenticated Application Header -->
          <header style="height: 4.25rem; background: var(--bg-surface); border-bottom: 1px solid var(--border-color); padding: 0 2rem; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 50;">
            <div style="font-weight: 800; font-size: 1.25rem; color: var(--text-primary);">
              ${pageTitle}
            </div>

            <!-- Top-Right Controls: Mode Switch, Notifications, Profile -->
            <div class="flex items-center gap-3">
              <!-- Mode Toggle Control (Top-Right) -->
              <button class="btn btn-secondary btn-sm mode-toggle-btn" onclick="app.toggleThemeMode()" title="${this.currentThemeMode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}" style="font-size: 1rem; padding: 0.4rem 0.65rem;">
                ${this.currentThemeMode === 'dark' ? '☀️' : '🌙'}
              </button>

              <!-- Notifications Indicator -->
              <button class="btn btn-ghost btn-sm" title="Notifications" onclick="app.showToast('No new notifications', 'info')">
                🔔
              </button>

              <!-- User Profile Indicator -->
              <div class="flex items-center gap-2" style="padding-left: 0.5rem; border-left: 1px solid var(--border-color);">
                <div style="width: 30px; height: 30px; border-radius: 50%; background: var(--primary); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.75rem;">
                  ${user.name[0]}
                </div>
                <span style="font-size: 0.85rem; font-weight: 600;">${user.name.split(' ')[0]}</span>
              </div>
            </div>
          </header>

          <!-- Main Page Body -->
          <main style="flex: 1; padding: 2.5rem;">
            ${contentHtml}
          </main>

        </div>
      </div>
    `;
  }

  /* ──────────────────────────────────────────────────────────────────────────
     3. AUTHENTICATED DASHBOARD VIEW (Clean Original SaaS Style)
     ────────────────────────────────────────────────────────────────────────── */

  renderDashboard() {
    const user = this.currentUser || { name: 'Anshika Bansal', email: 'anshika@example.com' };

    const bodyHtml = `
      <div class="flex justify-between items-center" style="margin-bottom: 2rem;">
        <div>
          <h1 class="heading-display" style="font-size: 1.85rem;">Welcome back, ${user.name.split(' ')[0]} 👋</h1>
          <p style="color: var(--text-secondary); margin-top: 0.25rem;">Create, customize, and manage your AI developer portfolios.</p>
        </div>
        <a href="#create/1" class="btn btn-primary">
          + Create New Portfolio
        </a>
      </div>

      <!-- Quick Metrics Grid -->
      <div class="grid grid-cols-4 md-grid-cols-2 gap-4" style="margin-bottom: 2.5rem;">
        <div class="card">
          <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Total Portfolios</span>
          <div style="font-size: 1.8rem; font-weight: 800; margin-top: 0.4rem;">4</div>
        </div>
        <div class="card">
          <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Published</span>
          <div style="font-size: 1.8rem; font-weight: 800; margin-top: 0.4rem; color: var(--accent-emerald);">2</div>
        </div>
        <div class="card">
          <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Total Views</span>
          <div style="font-size: 1.8rem; font-weight: 800; margin-top: 0.4rem; color: var(--primary);">1,248</div>
        </div>
        <div class="card">
          <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Resume Score</span>
          <div style="font-size: 1.8rem; font-weight: 800; margin-top: 0.4rem; color: var(--accent-purple);">72/100</div>
        </div>
      </div>

      <!-- Recent Portfolios Section -->
      <div style="margin-bottom: 2.5rem;">
        <div class="flex justify-between items-center" style="margin-bottom: 1.25rem;">
          <h2 style="font-size: 1.3rem; font-weight: 800;">Recent Portfolios</h2>
          <a href="#portfolios" style="color: var(--primary); font-size: 0.85rem; font-weight: 600;">View all →</a>
        </div>

        <div class="grid grid-cols-3 md-grid-cols-1 gap-6">
          
          <!-- Portfolio Card 1 -->
          <div class="card card-hover" style="border-top: 4px solid #6366f1;">
            <div class="flex justify-between items-center" style="margin-bottom: 0.75rem;">
              <span class="badge badge-primary">Bento Grid</span>
              <span style="font-size: 0.75rem; color: var(--accent-emerald); font-weight: 700;">● Published</span>
            </div>
            <h3 style="font-weight: 800; font-size: 1.15rem; margin-bottom: 0.25rem;">Developer Portfolio 2026</h3>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1.25rem;">Updated 2 hours ago • 847 Views</p>
            <div class="flex gap-2">
              <a href="#portfolio-view/bento" class="btn btn-secondary btn-sm" style="flex:1;">Preview</a>
              <a href="#create/3" class="btn btn-ghost btn-sm">Edit</a>
            </div>
          </div>

          <!-- Portfolio Card 2 -->
          <div class="card card-hover" style="border-top: 4px solid #00ff88;">
            <div class="flex justify-between items-center" style="margin-bottom: 0.75rem;">
              <span class="badge" style="background:rgba(0,255,136,0.1); color:#10b981;">Terminal</span>
              <span style="font-size: 0.75rem; color: var(--accent-emerald); font-weight: 700;">● Published</span>
            </div>
            <h3 style="font-weight: 800; font-size: 1.15rem; margin-bottom: 0.25rem;">Terminal Edition</h3>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1.25rem;">Updated 3 days ago • 277 Views</p>
            <div class="flex gap-2">
              <a href="#portfolio-view/futuristic" class="btn btn-secondary btn-sm" style="flex:1;">Preview</a>
              <a href="#create/3" class="btn btn-ghost btn-sm">Edit</a>
            </div>
          </div>

          <!-- Portfolio Card 3 -->
          <div class="card card-hover" style="border-top: 4px solid #000;">
            <div class="flex justify-between items-center" style="margin-bottom: 0.75rem;">
              <span class="badge" style="background:#e2e8f0; color:#0f172a;">Brutalist</span>
              <span style="font-size: 0.75rem; color: var(--accent-amber); font-weight: 700;">○ Draft</span>
            </div>
            <h3 style="font-weight: 800; font-size: 1.15rem; margin-bottom: 0.25rem;">Brutalist Showcase</h3>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1.25rem;">Updated 1 week ago • 124 Views</p>
            <div class="flex gap-2">
              <a href="#portfolio-view/brutalist" class="btn btn-secondary btn-sm" style="flex:1;">Preview</a>
              <a href="#create/3" class="btn btn-ghost btn-sm">Edit</a>
            </div>
          </div>

        </div>
      </div>
    `;

    this.renderAuthenticatedLayout('Dashboard', bodyHtml, 'dashboard');
  }

  /* ──────────────────────────────────────────────────────────────────────────
     4. AUTHENTICATED THEMES PAGE (Only after sign-in)
     ────────────────────────────────────────────────────────────────────────── */

  renderThemesView() {
    const themesList = [
      { id: 'brutalist', name: '01. Brutalist', label: 'RAW / EXPRESSIVE', desc: 'Heavy black borders, high contrast, oversized typography and sharp editorial grid.', badge: 'High Contrast' },
      { id: 'bento', name: '02. Bento Grid', label: 'MODULAR / CLEAN', desc: 'Modern dashboard-inspired modular cards, compact layout, and balanced visual hierarchy.', badge: 'Popular' },
      { id: 'minimal', name: '03. Minimal Editorial', label: 'MINIMAL / REFINED', desc: 'Serif headings, generous breathing space, hairline dividers, and magazine-style elegance.', badge: 'Editorial' },
      { id: 'spatial', name: '04. Spatial UI', label: 'SPATIAL / IMMERSIVE', desc: 'Layered floating cards with deep ambient shadows and dimensional hierarchy.', badge: '3D Depth' },
      { id: 'glassmorphic', name: '05. Glassmorphic', label: 'GLASS / FUTURE', desc: 'Midnight violet backdrop, frosted glass panels, illuminated neon gradient text, and glows.', badge: 'Dark UI' },
      { id: 'futuristic', name: '06. Futuristic Terminal', label: 'SYSTEM / TERMINAL', desc: 'Command-line developer shell, monospace typography, neon green accents, and system logs.', badge: 'Developer' }
    ];

    const bodyHtml = `
      <div style="margin-bottom: 2rem;">
        <h1 class="heading-display" style="font-size: 1.85rem;">Portfolio Themes</h1>
        <p style="color: var(--text-secondary); margin-top: 0.25rem;">
          Choose or preview any of the 6 distinct visual systems for your generated portfolio.
        </p>
      </div>

      <div class="grid grid-cols-3 md-grid-cols-1 gap-6">
        ${themesList.map(t => `
          <div class="card card-hover" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div class="flex justify-between items-center" style="margin-bottom: 0.5rem;">
                <span class="badge badge-primary" style="font-size: 0.65rem;">${t.label}</span>
                <span style="font-size: 0.75rem; color: var(--text-muted);">${t.badge}</span>
              </div>
              <h3 style="font-weight: 800; font-size: 1.25rem; margin-bottom: 0.4rem;">${t.name}</h3>
              <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 1.5rem;">${t.desc}</p>
            </div>
            
            <div class="flex gap-2">
              <button class="btn btn-secondary btn-sm" style="flex:1;" onclick="app.openThemePreviewModal('${t.id}')">Preview Theme</button>
              <a href="#create/4" class="btn btn-primary btn-sm" onclick="app.selectedTheme='${t.id}'">Use Theme</a>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    this.renderAuthenticatedLayout('Themes', bodyHtml, 'themes');
  }

  /* ──────────────────────────────────────────────────────────────────────────
     5. AUTHENTICATED MY PORTFOLIOS PAGE
     ────────────────────────────────────────────────────────────────────────── */

  renderPortfoliosView() {
    const bodyHtml = `
      <div class="flex justify-between items-center" style="margin-bottom: 2rem;">
        <div>
          <h1 class="heading-display" style="font-size: 1.85rem;">My Portfolios</h1>
          <p style="color: var(--text-secondary); margin-top: 0.25rem;">Manage, edit, and export your personal portfolio websites.</p>
        </div>
        <a href="#create/1" class="btn btn-primary">
          + Create New Portfolio
        </a>
      </div>

      <div class="grid grid-cols-3 md-grid-cols-1 gap-6">
        <!-- Portfolio 1 -->
        <div class="card card-hover">
          <div class="flex justify-between items-center" style="margin-bottom: 0.75rem;">
            <span class="badge badge-primary">Bento Grid</span>
            <span style="font-size: 0.75rem; color: var(--accent-emerald); font-weight: 700;">● Published</span>
          </div>
          <h3 style="font-weight: 800; font-size: 1.2rem; margin-bottom: 0.25rem;">Developer Portfolio 2026</h3>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1.25rem;">Updated 2 hours ago • 847 Views</p>
          <div class="flex gap-2">
            <a href="#portfolio-view/bento" class="btn btn-secondary btn-sm" style="flex:1;">View Live ↗</a>
            <a href="#create/3" class="btn btn-ghost btn-sm">Edit</a>
          </div>
        </div>

        <!-- Portfolio 2 -->
        <div class="card card-hover">
          <div class="flex justify-between items-center" style="margin-bottom: 0.75rem;">
            <span class="badge" style="background:rgba(0,255,136,0.1); color:#10b981;">Terminal</span>
            <span style="font-size: 0.75rem; color: var(--accent-emerald); font-weight: 700;">● Published</span>
          </div>
          <h3 style="font-weight: 800; font-size: 1.2rem; margin-bottom: 0.25rem;">Terminal Edition</h3>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1.25rem;">Updated 3 days ago • 277 Views</p>
          <div class="flex gap-2">
            <a href="#portfolio-view/futuristic" class="btn btn-secondary btn-sm" style="flex:1;">View Live ↗</a>
            <a href="#create/3" class="btn btn-ghost btn-sm">Edit</a>
          </div>
        </div>

        <!-- Portfolio 3 -->
        <div class="card card-hover">
          <div class="flex justify-between items-center" style="margin-bottom: 0.75rem;">
            <span class="badge" style="background:#e2e8f0; color:#0f172a;">Brutalist</span>
            <span style="font-size: 0.75rem; color: var(--accent-amber); font-weight: 700;">○ Draft</span>
          </div>
          <h3 style="font-weight: 800; font-size: 1.2rem; margin-bottom: 0.25rem;">Brutalist Showcase</h3>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1.25rem;">Updated 1 week ago • 124 Views</p>
          <div class="flex gap-2">
            <a href="#portfolio-view/brutalist" class="btn btn-secondary btn-sm" style="flex:1;">View Live ↗</a>
            <a href="#create/3" class="btn btn-ghost btn-sm">Edit</a>
          </div>
        </div>
      </div>
    `;

    this.renderAuthenticatedLayout('My Portfolios', bodyHtml, 'portfolios');
  }

  /* ──────────────────────────────────────────────────────────────────────────
     6. AUTHENTICATED SETTINGS PAGE
     ────────────────────────────────────────────────────────────────────────── */

  renderSettingsView() {
    const user = this.currentUser || { name: 'Anshika Bansal', email: 'anshika@example.com' };

    const bodyHtml = `
      <div style="max-width: 680px;">
        <h1 class="heading-display" style="font-size: 1.85rem; margin-bottom: 2rem;">Account & Preferences</h1>

        <div class="card" style="margin-bottom: 2rem;">
          <h3 style="font-weight: 700; margin-bottom: 1.25rem;">User Profile</h3>
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input class="form-input" value="${user.name}" readonly>
          </div>
          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input class="form-input" value="${user.email}" readonly>
          </div>
        </div>

        <div class="card" style="margin-bottom: 2rem;">
          <h3 style="font-weight: 700; margin-bottom: 1.25rem;">Appearance Mode</h3>
          <div class="flex gap-3">
            <button class="btn ${this.currentThemeMode === 'light' ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="app.applyThemeMode('light')">☀️ Light Mode</button>
            <button class="btn ${this.currentThemeMode === 'dark' ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="app.applyThemeMode('dark')">🌙 Dark Mode</button>
          </div>
        </div>
      </div>
    `;

    this.renderAuthenticatedLayout('Settings', bodyHtml, 'settings');
  }

  /* ──────────────────────────────────────────────────────────────────────────
     7. 6-STEP CREATION WIZARD ENGINE
     ────────────────────────────────────────────────────────────────────────── */

  renderWizardStep(step = 1) {
    this.currentWizardStep = step;
    const root = document.getElementById('app-root');

    const stepTitles = ['Upload', 'Analysis', 'Review', 'Theme', 'Generate', 'Preview'];

    root.innerHTML = `
      <!-- Stepper Header -->
      <div class="wizard-header">
        <div class="container flex justify-between items-center">
          <a href="#dashboard" class="brand-logo">
            <span class="brand-sparkle">✦</span>
            <span>PortfolioForge</span>
          </a>
          
          <!-- Horizontal Stepper Indicator -->
          <div class="stepper-nav" style="flex: 1; max-width: 600px; margin: 0 2rem;">
            ${[1, 2, 3, 4, 5, 6].map(i => `
              <div class="stepper-item ${i === step ? 'active' : ''} ${i < step ? 'completed' : ''}" onclick="app.renderWizardStep(${i})">
                <div class="stepper-circle">${i < step ? '✓' : i}</div>
                <span style="font-size: 0.75rem; font-weight: 600; color: ${i === step ? 'var(--primary)' : 'var(--text-muted)'};">
                  ${stepTitles[i - 1]}
                </span>
              </div>
            `).join('')}
          </div>

          <div class="flex items-center gap-3">
            <button class="btn btn-secondary btn-sm mode-toggle-btn" onclick="app.toggleThemeMode()" title="Toggle Dark/Light Mode">
              ${this.currentThemeMode === 'dark' ? '☀️' : '🌙'}
            </button>
            <a href="#dashboard" class="btn btn-ghost btn-sm">Exit</a>
          </div>
        </div>
      </div>

      <!-- Step Content Container -->
      <div class="container-narrow" style="padding: 3rem 1.5rem 6rem 1.5rem;">
        <div id="wizard-step-container"></div>
      </div>
    `;

    const container = document.getElementById('wizard-step-container');
    switch (step) {
      case 1: this.renderWizardStep1_Upload(container); break;
      case 2: this.renderWizardStep2_Analysis(container); break;
      case 3: this.renderWizardStep3_Review(container); break;
      case 4: this.renderWizardStep4_Customize(container); break;
      case 5: this.renderWizardStep5_Generate(container); break;
      case 6: this.renderWizardStep6_Preview(container); break;
      default: this.renderWizardStep1_Upload(container);
    }
  }

  // STEP 1: Upload
  renderWizardStep1_Upload(container) {
    container.innerHTML = `
      <div style="text-align: center; margin-bottom: 2.5rem;">
        <span class="badge badge-primary">Step 01 / 06</span>
        <h1 class="heading-display" style="font-size: 2.2rem; margin-top: 0.5rem;">Upload Plain-Text Resume</h1>
        <p style="color: var(--text-secondary);">Drop your .txt resume file below to begin AI analysis and extraction.</p>
      </div>

      <div class="card" style="margin-bottom: 2rem;">
        <div id="dropzone-box" class="dropzone" onclick="document.getElementById('resume-file-input').click()">
          <input type="file" id="resume-file-input" accept=".txt" style="display: none;" onchange="app.handleFileSelect(event)">
          <div style="font-size: 3rem; margin-bottom: 1rem;">📄</div>
          <h3 style="font-weight: 700; font-size: 1.2rem; margin-bottom: 0.4rem;">Drag & drop your .txt resume here</h3>
          <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1.5rem;">Supports plain text UTF-8 format (up to 5MB)</p>
          <button class="btn btn-secondary" type="button">Browse Files</button>
        </div>

        <div id="file-status-box" style="display: none; margin-top: 1.5rem; padding: 1rem; background: var(--bg-subtle); border-radius: var(--radius-md); display: flex; justify-content: space-between; align-items: center;">
          <div class="flex items-center gap-3">
            <span style="font-size: 1.5rem;">✅</span>
            <div>
              <div id="uploaded-filename" style="font-weight: 700; font-size: 0.9rem;">anshika_resume.txt</div>
              <div id="uploaded-filesize" style="font-size: 0.75rem; color: var(--text-muted);">4.2 KB • Ready for extraction</div>
            </div>
          </div>
          <button class="btn btn-ghost btn-sm" onclick="app.clearUploadedFile()">Remove</button>
        </div>
      </div>

      <!-- Quick Sample Loader -->
      <div class="card flex justify-between items-center md-flex-col gap-4" style="background: var(--primary-light); border-color: rgba(99,102,241,0.3); margin-bottom: 2.5rem;">
        <div>
          <div style="font-weight: 700; color: var(--primary);">Want to test with sample data?</div>
          <div style="font-size: 0.85rem; color: var(--text-secondary);">Load our pre-configured CS & AI Engineer profile.</div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="app.loadDemoProfileAndProceed()">⚡ Load Sample Resume</button>
      </div>

      <div class="flex justify-end">
        <button id="step1-next-btn" class="btn btn-primary btn-lg" onclick="app.renderWizardStep(2)">
          Analyze Resume Content →
        </button>
      </div>
    `;
  }

  handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;
    if (!file.name.endsWith('.txt')) {
      this.showToast('Please upload a valid .txt resume file.', 'error');
      return;
    }
    this.uploadedFile = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      this.rawResumeText = e.target.result;
      this.showToast('Resume uploaded and verified!', 'success');
      document.getElementById('uploaded-filename').innerText = file.name;
      document.getElementById('uploaded-filesize').innerText = `${(file.size / 1024).toFixed(1)} KB • Ready for extraction`;
      document.getElementById('file-status-box').style.display = 'flex';
    };
    reader.readAsText(file);
  }

  loadDemoProfileAndProceed() {
    this.showToast('Loaded demo engineering resume!', 'success');
    this.renderWizardStep(2);
  }

  clearUploadedFile() {
    this.uploadedFile = null;
    this.rawResumeText = null;
    document.getElementById('file-status-box').style.display = 'none';
  }

  // STEP 2: Diagnostic Analysis
  renderWizardStep2_Analysis(container) {
    container.innerHTML = `
      <div style="text-align: center; margin-bottom: 2.5rem;">
        <span class="badge badge-primary">Step 02 / 06</span>
        <h1 class="heading-display" style="font-size: 2.2rem; margin-top: 0.5rem;">AI Resume Diagnostics</h1>
        <p style="color: var(--text-secondary);">Our content analyzer evaluated your resume sections for portfolio readiness.</p>
      </div>

      <!-- Score Card -->
      <div class="card flex items-center justify-between md-flex-col gap-6" style="margin-bottom: 2rem;">
        <div>
          <span class="badge badge-primary" style="margin-bottom: 0.5rem;">Overall Readiness Score</span>
          <div style="font-size: 3.5rem; font-weight: 900; color: var(--accent-emerald); line-height: 1;">
            88<span style="font-size: 1.5rem; color: var(--text-muted);">/100</span>
          </div>
          <p style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 0.5rem;">
            Great foundation! Your core contact details, education, and technical skills are strong.
          </p>
        </div>

        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <div style="padding: 1rem; background: var(--bg-subtle); border-radius: var(--radius-md); text-align: center;">
            <div style="font-weight: 800; font-size: 1.2rem; color: var(--accent-emerald);">4/4</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">Core Sections</div>
          </div>
          <div style="padding: 1rem; background: var(--bg-subtle); border-radius: var(--radius-md); text-align: center;">
            <div style="font-weight: 800; font-size: 1.2rem; color: var(--primary);">18</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">Extracted Skills</div>
          </div>
          <div style="padding: 1rem; background: var(--bg-subtle); border-radius: var(--radius-md); text-align: center;">
            <div style="font-weight: 800; font-size: 1.2rem; color: var(--accent-purple);">4</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">Projects Identified</div>
          </div>
        </div>
      </div>

      <!-- Section Completeness Breakdown -->
      <div class="grid grid-cols-2 md-grid-cols-1 gap-4" style="margin-bottom: 2rem;">
        <div class="card" style="padding: 1.25rem;">
          <div class="flex justify-between items-center">
            <span style="font-weight: 700;">👤 Personal & Contact Info</span>
            <span style="color: var(--accent-emerald); font-weight: 700; font-size: 0.85rem;">✓ Complete</span>
          </div>
        </div>
        <div class="card" style="padding: 1.25rem;">
          <div class="flex justify-between items-center">
            <span style="font-weight: 700;">🎓 Education Details</span>
            <span style="color: var(--accent-emerald); font-weight: 700; font-size: 0.85rem;">✓ Complete</span>
          </div>
        </div>
        <div class="card" style="padding: 1.25rem;">
          <div class="flex justify-between items-center">
            <span style="font-weight: 700;">⚡ Technical Skills</span>
            <span style="color: var(--accent-emerald); font-weight: 700; font-size: 0.85rem;">✓ 18 Detected</span>
          </div>
        </div>
        <div class="card" style="padding: 1.25rem;">
          <div class="flex justify-between items-center">
            <span style="font-weight: 700;">🚀 Projects & Demos</span>
            <span style="color: var(--accent-amber); font-weight: 700; font-size: 0.85rem;">⚠️ Add Live Links</span>
          </div>
        </div>
      </div>

      <div class="flex justify-between items-center">
        <button class="btn btn-secondary" onclick="app.renderWizardStep(1)">← Back</button>
        <button class="btn btn-primary btn-lg" onclick="app.renderWizardStep(3)">Review & Edit Data →</button>
      </div>
    `;
  }

  // STEP 3: Review & Edit
  renderWizardStep3_Review(container) {
    const data = this.activeProfileData;

    container.innerHTML = `
      <div style="text-align: center; margin-bottom: 2.5rem;">
        <span class="badge badge-primary">Step 03 / 06</span>
        <h1 class="heading-display" style="font-size: 2.2rem; margin-top: 0.5rem;">Review & Polish Information</h1>
        <p style="color: var(--text-secondary);">Fine-tune your extracted details before choosing a theme.</p>
      </div>

      <div class="card" style="margin-bottom: 2.5rem;">
        <h3 style="font-size: 1.2rem; font-weight: 800; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
          👤 Personal Identity & Bio
        </h3>

        <div class="grid grid-cols-2 md-grid-cols-1 gap-4">
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input id="edit-name" class="form-input" value="${data.name || ''}">
          </div>
          <div class="form-group">
            <label class="form-label">Professional Headline</label>
            <input id="edit-title" class="form-input" value="${data.title || ''}">
          </div>
          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input id="edit-email" class="form-input" value="${data.email || ''}">
          </div>
          <div class="form-group">
            <label class="form-label">Location</label>
            <input id="edit-location" class="form-input" value="${data.location || ''}">
          </div>
          <div class="form-group">
            <label class="form-label">GitHub URL</label>
            <input id="edit-github" class="form-input" value="${data.github || ''}">
          </div>
          <div class="form-group">
            <label class="form-label">LinkedIn URL</label>
            <input id="edit-linkedin" class="form-input" value="${data.linkedin || ''}">
          </div>
        </div>

        <div class="form-group" style="margin-top: 1rem;">
          <label class="form-label">About / Summary</label>
          <textarea id="edit-about" class="form-textarea" rows="3">${data.about || ''}</textarea>
        </div>

        <h3 style="font-size: 1.2rem; font-weight: 800; margin: 2rem 0 1rem 0; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
          ⚡ Technical Skills
        </h3>
        <div class="form-group">
          <label class="form-label">Comma-separated skills</label>
          <input id="edit-skills" class="form-input" value="${(data.skills || []).join(', ')}">
        </div>
      </div>

      <div class="flex justify-between items-center">
        <button class="btn btn-secondary" onclick="app.renderWizardStep(2)">← Back</button>
        <button class="btn btn-primary btn-lg" onclick="app.saveReviewedDataAndProceed()">Choose Visual Theme →</button>
      </div>
    `;
  }

  saveReviewedDataAndProceed() {
    this.activeProfileData.name = document.getElementById('edit-name').value;
    this.activeProfileData.title = document.getElementById('edit-title').value;
    this.activeProfileData.email = document.getElementById('edit-email').value;
    this.activeProfileData.location = document.getElementById('edit-location').value;
    this.activeProfileData.github = document.getElementById('edit-github').value;
    this.activeProfileData.linkedin = document.getElementById('edit-linkedin').value;
    this.activeProfileData.about = document.getElementById('edit-about').value;

    const skillsRaw = document.getElementById('edit-skills').value;
    this.activeProfileData.skills = skillsRaw.split(',').map(s => s.trim()).filter(Boolean);

    this.showToast('Profile data saved!', 'success');
    this.renderWizardStep(4);
  }

  // STEP 4: Choose Visual Theme (Inside Creator Wizard)
  renderWizardStep4_Customize(container) {
    const themesList = [
      { id: 'brutalist', name: '01. Brutalist', label: 'RAW / EXPRESSIVE', desc: 'Heavy borders, high contrast, oversized typography' },
      { id: 'bento', name: '02. Bento Grid', label: 'MODULAR / CLEAN', desc: 'Dashboard modules, soft badges, organized hierarchy' },
      { id: 'minimal', name: '03. Minimal Editorial', label: 'MINIMAL / REFINED', desc: 'Serif headings, generous breathing space, magazine style' },
      { id: 'spatial', name: '04. Spatial UI', label: 'SPATIAL / IMMERSIVE', desc: 'Layered floating cards with deep ambient shadows' },
      { id: 'glassmorphic', name: '05. Glassmorphic', label: 'GLASS / FUTURE', desc: 'Midnight violet backdrop, frosted glass, glowing borders' },
      { id: 'futuristic', name: '06. Futuristic Terminal', label: 'SYSTEM / TERMINAL', desc: 'Command line shell, neon green accents, ASCII blocks' }
    ];

    container.innerHTML = `
      <div style="text-align: center; margin-bottom: 2.5rem;">
        <span class="badge badge-primary">Step 04 / 06</span>
        <h1 class="heading-display" style="font-size: 2.2rem; margin-top: 0.5rem;">Choose Your Portfolio Theme</h1>
        <p style="color: var(--text-secondary);">Select the visual design system for your generated portfolio.</p>
      </div>

      <div class="grid grid-cols-3 md-grid-cols-1 gap-6" style="margin-bottom: 2.5rem;">
        ${themesList.map(t => `
          <div class="card card-hover" style="cursor: pointer; border: 2px solid ${this.selectedTheme === t.id ? 'var(--primary)' : 'var(--border-color)'}; box-shadow: ${this.selectedTheme === t.id ? '0 0 25px var(--primary-glow)' : 'none'};" onclick="app.selectTheme('${t.id}')">
            <div class="flex justify-between items-center" style="margin-bottom: 0.5rem;">
              <span class="badge badge-primary" style="font-size: 0.65rem;">${t.label}</span>
              ${this.selectedTheme === t.id ? '<span style="color: var(--primary); font-weight: 800;">✓ SELECTED</span>' : ''}
            </div>
            <h3 style="font-weight: 800; font-size: 1.25rem; margin-bottom: 0.25rem;">${t.name}</h3>
            <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 1rem;">${t.desc}</p>
            <button class="btn btn-secondary btn-sm" style="width: 100%;" onclick="event.stopPropagation(); app.openThemePreviewModal('${t.id}')">Preview Theme</button>
          </div>
        `).join('')}
      </div>

      <div class="flex justify-between items-center">
        <button class="btn btn-secondary" onclick="app.renderWizardStep(3)">← Back</button>
        <button class="btn btn-primary btn-lg" onclick="app.renderWizardStep(5)">Generate AI Portfolio →</button>
      </div>
    `;
  }

  selectTheme(themeId) {
    this.selectedTheme = themeId;
    this.renderWizardStep4_Customize(document.getElementById('wizard-step-container'));
    this.showToast(`Selected ${themeId.toUpperCase()} theme!`, 'info');
  }

  // STEP 5: AI Generation Pipeline
  renderWizardStep5_Generate(container) {
    container.innerHTML = `
      <div style="text-align: center; margin-bottom: 2.5rem;">
        <span class="badge badge-primary">Step 05 / 06</span>
        <h1 class="heading-display" style="font-size: 2.2rem; margin-top: 0.5rem;">Generating Portfolio</h1>
        <p style="color: var(--text-secondary);">Structuring content & compiling your chosen design template.</p>
      </div>

      <div class="card" style="margin-bottom: 2rem;">
        <div id="gen-pipeline" style="display: flex; flex-direction: column; gap: 1.25rem;">
          <div class="flex items-center gap-3">
            <span id="p-step-1" class="badge badge-primary">✓</span>
            <span style="font-weight: 600;">1. Normalizing resume entities and technical taxonomy</span>
          </div>
          <div class="flex items-center gap-3">
            <span id="p-step-2" class="badge badge-primary">✓</span>
            <span style="font-weight: 600;">2. Formatting Gemini prompt schema for structured JSON output</span>
          </div>
          <div class="flex items-center gap-3">
            <span id="p-step-3" class="badge badge-glow animate-pulse">●</span>
            <span style="font-weight: 600;">3. Injecting structured data into ${this.selectedTheme.toUpperCase()} template engine...</span>
          </div>
        </div>
      </div>

      <div class="card" style="margin-bottom: 2.5rem;">
        <div class="flex justify-between items-center" style="margin-bottom: 0.75rem;">
          <span style="font-weight: 700; font-size: 0.85rem; color: var(--text-muted);">STRUCTURED JSON PAYLOAD</span>
          <button class="btn btn-ghost btn-sm" onclick="navigator.clipboard.writeText(JSON.stringify(app.activeProfileData, null, 2)); app.showToast('Copied JSON to clipboard!', 'success');">📋 Copy JSON</button>
        </div>
        <div class="code-container" style="max-height: 200px;">
          <pre>${JSON.stringify(this.activeProfileData, null, 2)}</pre>
        </div>
      </div>

      <div class="flex justify-end">
        <button id="gen-finish-btn" class="btn btn-primary btn-lg" onclick="app.renderWizardStep(6)">
          View Final Portfolio Preview →
        </button>
      </div>
    `;

    setTimeout(() => {
      const step3 = document.getElementById('p-step-3');
      if (step3) {
        step3.className = 'badge badge-primary';
        step3.innerText = '✓';
      }
      this.showToast('Portfolio generated successfully! 🎉', 'success');
    }, 1000);
  }

  // STEP 6: Final Portfolio Preview & Export
  renderWizardStep6_Preview(container) {
    const renderedHtml = PortfolioThemes.render(this.selectedTheme, this.activeProfileData);

    container.innerHTML = `
      <div style="text-align: center; margin-bottom: 2rem;">
        <span class="badge badge-primary">Step 06 / 06</span>
        <h1 class="heading-display" style="font-size: 2.2rem; margin-top: 0.5rem;">Your Portfolio is Ready! 🎉</h1>
        <p style="color: var(--text-secondary);">Test interactions below or download the standalone single-file HTML website.</p>
      </div>

      <!-- Action Bar -->
      <div class="card flex justify-between items-center md-flex-col gap-4" style="margin-bottom: 1.5rem; padding: 1rem 1.5rem;">
        <div class="flex items-center gap-3">
          <span style="font-weight: 700; font-size: 0.9rem;">Theme:</span>
          <select class="form-select" style="width: auto; padding: 0.4rem 1rem;" onchange="app.selectedTheme = this.value; app.renderWizardStep(6);">
            <option value="brutalist" ${this.selectedTheme === 'brutalist' ? 'selected' : ''}>01. Brutalist</option>
            <option value="bento" ${this.selectedTheme === 'bento' ? 'selected' : ''}>02. Bento Grid</option>
            <option value="minimal" ${this.selectedTheme === 'minimal' ? 'selected' : ''}>03. Minimal Editorial</option>
            <option value="spatial" ${this.selectedTheme === 'spatial' ? 'selected' : ''}>04. Spatial UI</option>
            <option value="glassmorphic" ${this.selectedTheme === 'glassmorphic' ? 'selected' : ''}>05. Glassmorphic</option>
            <option value="futuristic" ${this.selectedTheme === 'futuristic' ? 'selected' : ''}>06. Futuristic Terminal</option>
          </select>
        </div>

        <div class="flex gap-2">
          <button class="btn btn-secondary btn-sm" onclick="app.downloadStandalonePortfolio()">
            📥 Download HTML
          </button>
          <a href="#portfolio-view/${this.selectedTheme}" class="btn btn-primary btn-sm" target="_blank">
            Fullscreen Preview ↗
          </a>
        </div>
      </div>

      <!-- Live Interactive Browser Frame -->
      <div style="border-radius: var(--radius-xl); overflow: hidden; border: 1px solid var(--border-color); box-shadow: var(--shadow-xl); background: #ffffff;">
        <div style="background: #e2e8f0; padding: 0.6rem 1rem; display: flex; align-items: center; gap: 0.5rem;">
          <span style="width: 10px; height: 10px; border-radius: 50%; background: #ef4444; display: inline-block;"></span>
          <span style="width: 10px; height: 10px; border-radius: 50%; background: #f59e0b; display: inline-block;"></span>
          <span style="width: 10px; height: 10px; border-radius: 50%; background: #10b981; display: inline-block;"></span>
          <div style="flex: 1; background: #ffffff; border-radius: 6px; padding: 0.2rem 0.75rem; font-size: 0.75rem; color: #64748b; font-family: monospace; text-align: center;">
            https://${this.activeProfileData.name.toLowerCase().replace(/\s+/g, '')}.portfolioforge.app
          </div>
        </div>
        <div id="portfolio-frame-content" style="max-height: 650px; overflow-y: auto;">
          ${renderedHtml}
        </div>
      </div>

      <div class="flex justify-between items-center" style="margin-top: 2rem;">
        <button class="btn btn-secondary" onclick="app.renderWizardStep(4)">← Change Theme</button>
        <a href="#dashboard" class="btn btn-primary btn-lg">Finish & Go to Dashboard →</a>
      </div>
    `;
  }

  downloadStandalonePortfolio() {
    const content = PortfolioThemes.render(this.selectedTheme, this.activeProfileData);
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${this.activeProfileData.name} — Portfolio</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=JetBrains+Mono:wght@400;700&family=Space+Grotesk:wght@700;900&family=Newsreader:ital,wght@0,400;1,400&family=Plus+Jakarta+Sans:wght@700;800&display=swap" rel="stylesheet">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { min-height: 100vh; font-family: 'Inter', sans-serif; }
    a { text-decoration: none; color: inherit; }
  </style>
</head>
<body>
  ${content}
</body>
</html>`;

    const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.activeProfileData.name.toLowerCase().replace(/\s+/g, '_')}_${this.selectedTheme}_portfolio.html`;
    a.click();
    URL.revokeObjectURL(url);
    this.showToast('Downloaded standalone HTML portfolio!', 'success');
  }

  /* ──────────────────────────────────────────────────────────────────────────
     8. STANDALONE FULLSCREEN PORTFOLIO VIEW
     ────────────────────────────────────────────────────────────────────────── */

  renderFullPortfolioView(theme = 'bento') {
    const data = this.activeProfileData || this.db?.sampleProfile;
    const root = document.getElementById('app-root');
    const content = PortfolioThemes.render(theme, data);

    root.innerHTML = `
      <!-- Floating Top Action Bar -->
      <div style="position: fixed; top: 1rem; right: 1rem; z-index: 9999; display: flex; gap: 0.5rem; background: rgba(15,23,42,0.85); backdrop-filter: blur(12px); padding: 0.5rem; border-radius: 999px; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
        <button class="btn btn-ghost btn-sm" style="color: #fff;" onclick="window.history.back()">← Back</button>
        <button class="btn btn-primary btn-sm" onclick="app.downloadStandalonePortfolio()">📥 Export HTML</button>
      </div>
      <div>${content}</div>
    `;
  }

  /* ──────────────────────────────────────────────────────────────────────────
     9. ADMIN DASHBOARD (Internal Route #admin)
     ────────────────────────────────────────────────────────────────────────── */

  renderAdminDashboard(section = 'overview') {
    const root = document.getElementById('app-root');
    root.innerHTML = `
      <div style="display: flex; min-height: 100vh; background: #090d16; color: #f8fafc;">
        
        <!-- Admin Sidebar -->
        <aside style="width: 260px; background: #0f172a; border-right: 1px solid #1e293b; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="brand-logo" style="margin-bottom: 2rem; color: #fff;">
              <span class="brand-sparkle">✦</span>
              <span>Admin Console</span>
            </div>

            <nav style="display: flex; flex-direction: column; gap: 0.4rem;">
              <a href="#admin/overview" class="btn btn-secondary" style="justify-content: flex-start; background: #1e293b; color: #fff; border-color: transparent;">📈 Platform Telemetry</a>
              <a href="#admin/users" class="btn btn-ghost" style="justify-content: flex-start; color: #94a3b8;">👥 User Registry</a>
              <a href="#dashboard" class="btn btn-ghost" style="justify-content: flex-start; color: #94a3b8;">← User Dashboard</a>
            </nav>
          </div>

          <button class="btn btn-ghost btn-sm" style="color: var(--accent-rose);" onclick="app.logout()">
            Sign Out Admin
          </button>
        </aside>

        <!-- Admin Content -->
        <main style="flex: 1; padding: 2.5rem; overflow-y: auto;">
          <div class="flex justify-between items-center" style="margin-bottom: 2rem;">
            <div>
              <h1 class="heading-display" style="font-size: 2rem; color: #fff;">System Analytics & Telemetry</h1>
              <p style="color: #94a3b8;">Live overview of resume ingestions, theme distribution, and latency.</p>
            </div>
            <span class="badge" style="background:#064e3b; color:#34d399;">● FASTAPI PROXY HEALTHY</span>
          </div>

          <!-- Admin Metric Cards -->
          <div class="grid grid-cols-4 md-grid-cols-2 gap-4" style="margin-bottom: 2.5rem;">
            <div class="card card-dark">
              <span style="font-size: 0.8rem; color: #94a3b8; font-weight: 600; text-transform: uppercase;">Total Users</span>
              <div style="font-size: 1.8rem; font-weight: 800; margin-top: 0.4rem; color: #fff;">1,284</div>
            </div>
            <div class="card card-dark">
              <span style="font-size: 0.8rem; color: #94a3b8; font-weight: 600; text-transform: uppercase;">AI Generations</span>
              <div style="font-size: 1.8rem; font-weight: 800; margin-top: 0.4rem; color: var(--primary);">4,827</div>
            </div>
            <div class="card card-dark">
              <span style="font-size: 0.8rem; color: #94a3b8; font-weight: 600; text-transform: uppercase;">Published Portfolios</span>
              <div style="font-size: 1.8rem; font-weight: 800; margin-top: 0.4rem; color: var(--accent-emerald);">2,145</div>
            </div>
            <div class="card card-dark">
              <span style="font-size: 0.8rem; color: #94a3b8; font-weight: 600; text-transform: uppercase;">Success Rate</span>
              <div style="font-size: 1.8rem; font-weight: 800; margin-top: 0.4rem; color: var(--accent-purple);">98.4%</div>
            </div>
          </div>

          <!-- Generation Volume Chart (Pure SVG) -->
          <div class="card card-dark" style="margin-bottom: 2rem;">
            <h3 style="font-weight: 700; margin-bottom: 1.5rem; color: #fff;">Daily Generation Volume</h3>
            <div style="height: 180px; width: 100%; display: flex; align-items: flex-end; gap: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid #1e293b;">
              ${[45, 68, 89, 124, 156, 180, 210].map((v, i) => `
                <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
                  <div style="font-size: 0.75rem; color: #94a3b8;">${v}</div>
                  <div style="width: 100%; height: ${v * 0.7}px; background: linear-gradient(180deg, #6366f1 0%, #4338ca 100%); border-radius: 6px 6px 0 0;"></div>
                  <div style="font-size: 0.75rem; color: #64748b;">Day 0${i + 1}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Theme Popularity Breakdown -->
          <div class="card card-dark">
            <h3 style="font-weight: 700; margin-bottom: 1rem; color: #fff;">Theme Adoption Metrics</h3>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              <div>
                <div class="flex justify-between" style="font-size: 0.85rem; margin-bottom: 0.25rem;">
                  <span>02. Bento Grid</span>
                  <span>38%</span>
                </div>
                <div style="width: 100%; background: #1e293b; height: 8px; border-radius: 999px;">
                  <div style="width: 38%; background: #6366f1; height: 100%; border-radius: 999px;"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between" style="font-size: 0.85rem; margin-bottom: 0.25rem;">
                  <span>06. Futuristic Terminal</span>
                  <span>24%</span>
                </div>
                <div style="width: 100%; background: #1e293b; height: 8px; border-radius: 999px;">
                  <div style="width: 24%; background: #00ff88; height: 100%; border-radius: 999px;"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between" style="font-size: 0.85rem; margin-bottom: 0.25rem;">
                  <span>01. Brutalist</span>
                  <span>18%</span>
                </div>
                <div style="width: 100%; background: #1e293b; height: 8px; border-radius: 999px;">
                  <div style="width: 18%; background: #f8fafc; height: 100%; border-radius: 999px;"></div>
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>
    `;
  }

  /* ──────────────────────────────────────────────────────────────────────────
     10. THEME PREVIEW MODAL
     ────────────────────────────────────────────────────────────────────────── */

  openThemePreviewModal(themeId) {
    const modal = document.getElementById('preview-modal-overlay');
    const contentBox = document.getElementById('modal-theme-content');
    if (!modal || !contentBox) return;

    contentBox.innerHTML = PortfolioThemes.render(themeId, this.activeProfileData || this.db?.sampleProfile);
    modal.classList.add('active');
  }

  closeThemePreviewModal() {
    const modal = document.getElementById('preview-modal-overlay');
    if (modal) modal.classList.remove('active');
  }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  window.app = new PortfolioForgeApp();
});
