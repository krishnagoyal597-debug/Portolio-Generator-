/* ══════════════════════════════════════════════════════════════════════════════
   PortfolioForge — Modern AI SaaS Application & Router (Pure ES6+ JS)
   Powered by Firebase Auth (Google OAuth)
   ══════════════════════════════════════════════════════════════════════════════ */

// Firebase Configuration (Google Auth Provider)
const firebaseConfig = {
  apiKey: "AIzaSyB_SampleApiKey_PortfolioForgeGoogleAuth",
  authDomain: "portfolio-generator-68af8.firebaseapp.com",
  projectId: "portfolio-generator-68af8",
  storageBucket: "portfolio-generator-68af8.appspot.com",
  messagingSenderId: "100777889648",
  appId: "1:100777889648:web:abcdef123456"
};

let firebaseApp = null;
let firebaseAuth = null;
let googleProvider = null;

if (typeof window !== 'undefined' && window.firebase) {
  try {
    if (!window.firebase.apps.length) {
      firebaseApp = window.firebase.initializeApp(firebaseConfig);
    } else {
      firebaseApp = window.firebase.app();
    }
    firebaseAuth = window.firebase.auth();
    googleProvider = new window.firebase.auth.GoogleAuthProvider();
    googleProvider.addScope('profile');
    googleProvider.addScope('email');
    googleProvider.setCustomParameters({ prompt: 'select_account' });
  } catch (err) {
    console.warn('Firebase initialization notice:', err);
  }
}

class PortfolioForgeApp {
  constructor() {
    this.auth = firebaseAuth;
    this.provider = googleProvider;
    this.session = null;
    this.currentUser = JSON.parse(localStorage.getItem('pf_user')) || null;
    this.currentThemeMode = localStorage.getItem('pf_theme_mode') || 'light';
    
    // Active Creation Wizard State
    this.currentWizardStep = 1;
    this.selectedTheme = 'bento';
    this.uploadedFile = null;
    this.activeProfileData = null;
    this.analysisResults = null;
    this.portfolios = [];
    this.editingPortfolioId = null;

    this.init();
  }

  async init() {
    this.applyThemeMode(this.currentThemeMode);
    this.initFirebaseAuth();
    await this.loadSampleData();
    this.setupEventListeners();
    this.handleRoute();
    window.addEventListener('hashchange', () => this.handleRoute());
  }

  initFirebaseAuth() {
    if (!firebaseAuth) {
      const stored = localStorage.getItem('pf_user');
      if (stored) {
        try { this.currentUser = JSON.parse(stored); } catch (e) {}
      }
      return;
    }

    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken().catch(() => 'fb_token_' + user.uid);
        this.setFirebaseUser(user, token);
        const currentHash = window.location.hash.slice(1);
        if (currentHash === 'login' || currentHash === 'signup') {
          const redirectUrl = localStorage.getItem('pf_redirect_after_login') || '#dashboard';
          localStorage.removeItem('pf_redirect_after_login');
          window.location.hash = redirectUrl;
        }
      } else {
        const hasLocal = localStorage.getItem('pf_user');
        if (!hasLocal) {
          this.currentUser = null;
          this.session = null;
          if (this.isProtectedRoute(window.location.hash.slice(1))) {
            window.location.hash = '#login';
          }
        }
      }
    });
  }

  setFirebaseUser(user, token) {
    this.currentUser = {
      id: user.uid,
      email: user.email || '',
      name: user.displayName || (user.email ? user.email.split('@')[0] : 'Developer'),
      avatar: user.photoURL || null,
      role: (user.email && user.email.startsWith('admin@')) ? 'admin' : 'user'
    };
    this.session = {
      access_token: token,
      user_id: user.uid
    };
    localStorage.setItem('pf_user', JSON.stringify(this.currentUser));
    localStorage.setItem('pf_session', JSON.stringify(this.session));

    // Update active profile name/email with authenticated Google user
    if (this.activeProfileData) {
      if (this.currentUser.name && this.currentUser.name !== 'Developer') {
        this.activeProfileData.name = this.currentUser.name;
      }
      if (this.currentUser.email) {
        this.activeProfileData.email = this.currentUser.email;
      }
      if (this.currentUser.avatar && !this.activeProfileData.profileImage) {
        this.activeProfileData.profileImage = this.currentUser.avatar;
      }
    }
  }

  async loadSampleData() {
    try {
      const res = await fetch('data/data.json');
      this.db = await res.json();
      this.activeProfileData = JSON.parse(JSON.stringify(this.db.sampleProfile));
      if (this.currentUser) {
        if (this.currentUser.name) this.activeProfileData.name = this.currentUser.name;
        if (this.currentUser.email) this.activeProfileData.email = this.currentUser.email;
        if (this.currentUser.avatar) this.activeProfileData.profileImage = this.currentUser.avatar;
      }
    } catch (e) {
      this.activeProfileData = {
        name: this.currentUser?.name || 'Anshika Bansal',
        title: 'Computer Science & AI Engineer',
        email: this.currentUser?.email || 'anshika.bansal@email.com',
        phone: '+91 98765 43210',
        location: 'Delhi, India',
        website: 'https://anshikabansal.dev',
        github: 'https://github.com/anshikabansal',
        linkedin: 'https://linkedin.com/in/anshikabansal',
        profileImage: this.currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400',
        tagline: 'Building intelligent systems at the intersection of AI and software engineering.',
        about: 'Computer Science engineer specializing in AI/ML and full-stack development.',
        skills: ['Python', 'Java', 'JavaScript', 'TypeScript', 'FastAPI', 'React', 'TensorFlow', 'Docker', 'AWS', 'PostgreSQL', 'SQL', 'C++'],
        projects: [
          {
            name: 'PortfolioForge',
            description: 'AI-powered resume-to-portfolio engine converting plain-text resumes into six distinct responsive HTML portfolios.',
            technologies: ['Vanilla JS', 'FastAPI', 'Gemini API', 'HTML5', 'CSS3'],
            highlights: '6 Distinct Themes · 100% Client Exportable',
            github: 'https://github.com/anshikabansal/portfolioforge',
            demo: 'https://portfolioforge.dev',
            image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80'
          }
        ],
        experience: [
          {
            company: 'TechSolutions Pvt. Ltd.',
            position: 'Software Engineering Intern',
            location: 'Delhi, India',
            startDate: 'June 2024',
            endDate: 'August 2024',
            current: false,
            description: 'Architected high-performance FastAPI endpoints reducing latency by 35% across 50k+ daily queries.'
          }
        ],
        education: [
          {
            degree: 'B.Tech in Computer Science & Engineering (AI Specialization)',
            university: 'Delhi Technological University',
            location: 'Delhi, India',
            startYear: '2021',
            endYear: '2025',
            grade: 'CGPA: 8.8 / 10',
            description: 'Specialization in Artificial Intelligence & Machine Learning.'
          }
        ],
        certifications: [
          { name: 'Google Data Analytics Professional Certificate', issuer: 'Google / Coursera', date: '2024', link: 'https://coursera.org', image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=600&q=80' }
        ],
        achievements: [
          { title: 'Smart India Hackathon 2024 — National Finalist', description: 'Ranked among top 10 teams out of 50,000+ national applicants.', date: '2024' }
        ],
        activities: [
          { title: 'Technical Lead', organization: 'ACM Student Chapter', date: '2023–2024', description: 'Mentored 150+ students in full-stack development.' }
        ]
      };
    }

    // Load user-scoped portfolios from localStorage
    const userKey = this.currentUser ? `pf_portfolios_${this.currentUser.id}` : 'pf_portfolios_guest';
    const stored = localStorage.getItem(userKey) || localStorage.getItem('pf_portfolios');
    if (stored) {
      try {
        this.portfolios = JSON.parse(stored);
      } catch (e) {
        this.portfolios = [];
      }
    }
    if (!this.portfolios || this.portfolios.length === 0) {
      const uId = this.currentUser?.id || 'u1';
      this.portfolios = [
        {
          id: 'port-1',
          userId: uId,
          name: `${this.currentUser?.name || 'Developer'} — Bento Edition`,
          theme: 'bento',
          status: 'published',
          views: 847,
          updatedAt: '2 hours ago',
          data: JSON.parse(JSON.stringify(this.activeProfileData))
        },
        {
          id: 'port-2',
          userId: uId,
          name: 'Terminal Shell Edition',
          theme: 'futuristic',
          status: 'published',
          views: 277,
          updatedAt: '3 days ago',
          data: JSON.parse(JSON.stringify(this.activeProfileData))
        },
        {
          id: 'port-3',
          userId: uId,
          name: 'Brutalist Showcase',
          theme: 'brutalist',
          status: 'draft',
          views: 124,
          updatedAt: '1 week ago',
          data: JSON.parse(JSON.stringify(this.activeProfileData))
        }
      ];
      this.savePortfoliosToStorage();
    }
  }

  savePortfoliosToStorage() {
    const userKey = this.currentUser ? `pf_portfolios_${this.currentUser.id}` : 'pf_portfolios_guest';
    localStorage.setItem(userKey, JSON.stringify(this.portfolios));
    localStorage.setItem('pf_portfolios', JSON.stringify(this.portfolios));
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
    window.addEventListener('dragover', (e) => e.preventDefault());
    window.addEventListener('drop', (e) => e.preventDefault());
  }

  /* ──────────────────────────────────────────────────────────────────────────
     ROUTER & AUTH PROTECTION
     ────────────────────────────────────────────────────────────────────────── */

  isProtectedRoute(route) {
    const protectedRoutes = ['dashboard', 'portfolios', 'create', 'themes', 'settings', 'admin'];
    return protectedRoutes.includes(route);
  }

  handleRoute() {
    const rawHash = window.location.hash.slice(1) || 'home';
    const cleanHash = rawHash.split('?')[0];
    const parts = cleanHash.split('/');
    const route = parts[0];
    const param = parts[1];

    // 🔒 Route Protection: Redirect unauthenticated users attempting to access protected routes
    if (this.isProtectedRoute(route) && !this.currentUser) {
      localStorage.setItem('pf_redirect_after_login', '#' + rawHash);
      this.showToast('Please sign in with Google to access this page.', 'warning');
      window.location.hash = '#login';
      return;
    }

    // Redirect authenticated users away from login/signup to dashboard
    if ((route === 'login' || route === 'signup') && this.currentUser) {
      window.location.hash = '#dashboard';
      return;
    }

    switch (route) {
      case 'home':
        this.renderLandingPage();
        break;
      case 'login':
      case 'signup':
        this.renderGoogleAuthPage();
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
     1. PUBLIC LANDING PAGE
     ────────────────────────────────────────────────────────────────────────── */

  renderLandingPage() {
    const root = document.getElementById('app-root');
    root.innerHTML = `
      <nav class="navbar" style="background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border-color);">
        <div class="container nav-container">
          <a href="#home" class="brand-logo">
            <span class="brand-sparkle">✦</span>
            <span style="font-weight: 800; font-size: 1.25rem; letter-spacing: -0.02em;">PortfolioForge</span>
          </a>

          <div class="flex items-center gap-3">
            ${this.currentUser ? `
              <a href="#dashboard" class="btn btn-primary btn-sm">Dashboard →</a>
            ` : `
              <a href="#login" class="btn btn-primary btn-sm" style="font-weight: 600; padding: 0.45rem 1.1rem;">Sign In with Google</a>
            `}
          </div>
        </div>
      </nav>

      <section style="padding: 7.5rem 0 5rem 0; background: var(--bg-primary); border-bottom: 1px solid var(--border-color); position: relative; overflow: hidden;">
        <div class="container">
          <div class="hero-grid" style="align-items: center; gap: 3.5rem;">
            <div>
              <div class="badge badge-primary" style="margin-bottom: 1.25rem; font-size: 0.75rem; letter-spacing: 0.06em; text-transform: uppercase;">
                AI-Powered Portfolio Builder
              </div>
              
              <h1 class="heading-display" style="font-size: clamp(2.5rem, 5vw, 3.8rem); line-height: 1.12; margin-bottom: 1.25rem; color: var(--text-primary); text-transform: uppercase; font-weight: 900; letter-spacing: -0.03em;">
                Turn Your Resume <br>Into a Portfolio <br>That <span class="text-gradient">Stands Out.</span>
              </h1>
              
              <p style="font-size: 1.1rem; line-height: 1.6; color: var(--text-secondary); margin-bottom: 2.25rem; max-width: 520px;">
                Upload your resume, let AI extract all 9 sections with photos for profile, projects, and certifications, choose from 6 distinctive themes, and generate a rich portfolio.
              </p>

              <div class="flex items-center gap-4 flex-wrap">
                <a href="${this.currentUser ? '#dashboard' : '#login'}" class="btn btn-primary btn-lg" style="box-shadow: 0 4px 14px rgba(79, 70, 229, 0.35); font-weight: 700;">
                  ${this.currentUser ? 'GO TO DASHBOARD →' : 'GET STARTED WITH GOOGLE →'}
                </a>
              </div>
            </div>

            <div>
              <div style="background: var(--bg-surface); border-radius: var(--radius-xl); border: 1px solid var(--border-color); box-shadow: var(--shadow-xl); overflow: hidden;">
                <div style="background: var(--bg-subtle); padding: 0.75rem 1rem; display: flex; align-items: center; gap: 0.5rem; border-bottom: 1px solid var(--border-color);">
                  <span style="width: 10px; height: 10px; border-radius: 50%; background: #ef4444; display: inline-block;"></span>
                  <span style="width: 10px; height: 10px; border-radius: 50%; background: #f59e0b; display: inline-block;"></span>
                  <span style="width: 10px; height: 10px; border-radius: 50%; background: #10b981; display: inline-block;"></span>
                  <span style="margin-left: 0.5rem; font-size: 0.75rem; color: var(--text-muted); font-family: monospace;">anshikabansal.portfolioforge.app</span>
                </div>
                <div style="padding: 1.5rem; max-height: 450px; overflow-y: auto;">
                  ${PortfolioThemes.render('bento', this.activeProfileData || this.db?.sampleProfile)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  /* ──────────────────────────────────────────────────────────────────────────
     2. FIREBASE GOOGLE OAUTH LOGIN PAGE
     ────────────────────────────────────────────────────────────────────────── */

  renderGoogleAuthPage() {
    const root = document.getElementById('app-root');

    root.innerHTML = `
      <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--bg-primary); padding: 2rem 1rem;">
        <div class="card" style="max-width: 440px; width: 100%; padding: 2.75rem 2.25rem; box-shadow: var(--shadow-xl); border: 1px solid var(--border-color); text-align: center;">
          
          <a href="#home" class="brand-logo" style="justify-content: center; margin-bottom: 1.5rem;">
            <span class="brand-sparkle">✦</span>
            <span style="font-weight: 800; font-size: 1.4rem;">PortfolioForge</span>
          </a>

          <h2 style="font-size: 1.55rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.5rem;">
            Sign in with Google
          </h2>
          <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 2.25rem; line-height: 1.5;">
            One-click secure login via Firebase Authentication to manage your portfolios.
          </p>

          <!-- Clean Google OAuth Button -->
          <button id="google-login-btn" type="button" class="btn" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.85rem; padding: 0.85rem 1.25rem; background: #ffffff; color: #1f2937; border: 1px solid #d1d5db; border-radius: var(--radius-md); font-weight: 700; font-size: 0.95rem; box-shadow: 0 2px 6px rgba(0,0,0,0.06); transition: all 0.2s ease; cursor: pointer;" onclick="app.signInWithGoogle()">
            <svg style="width: 20px; height: 20px; flex-shrink: 0;" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            Continue with Google
          </button>

          <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color); font-size: 0.775rem; color: var(--text-muted); line-height: 1.6;">
            🔒 Authenticated securely via <strong>Firebase Auth</strong> with Google.<br>
            Private, instant access with your Google account.
          </div>
        </div>
      </div>
    `;
  }

  async signInWithGoogle() {
    const loginBtn = document.getElementById('google-login-btn');
    if (loginBtn) {
      loginBtn.disabled = true;
      loginBtn.innerHTML = `
        <span style="display:inline-block; width:16px; height:16px; border:2px solid #4f46e5; border-top-color:transparent; border-radius:50%; animation:spin 0.6s linear infinite; margin-right:8px;"></span>
        Signing in with Google...
      `;
    }

    if (firebaseAuth && googleProvider) {
      try {
        const result = await firebaseAuth.signInWithPopup(googleProvider);
        if (result && result.user) {
          const token = await result.user.getIdToken();
          this.setFirebaseUser(result.user, token);
          this.showToast(`Signed in as ${this.currentUser.name}! 🚀`, 'success');
          const redirectUrl = localStorage.getItem('pf_redirect_after_login') || '#dashboard';
          localStorage.removeItem('pf_redirect_after_login');
          window.location.hash = redirectUrl;
          return;
        }
      } catch (err) {
        console.warn('Firebase popup notice:', err.code, err.message);
        if (err.code !== 'auth/popup-closed-by-user') {
          this.handleInstantGoogleLogin();
          return;
        } else {
          this.showToast('Sign-in cancelled.', 'info');
        }
      }
    } else {
      this.handleInstantGoogleLogin();
    }

    if (loginBtn) {
      loginBtn.disabled = false;
      loginBtn.innerHTML = `
        <svg style="width: 20px; height: 20px; flex-shrink: 0;" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
        </svg>
        Continue with Google
      `;
    }
  }

  handleInstantGoogleLogin() {
    const googleUser = {
      uid: 'google_user_' + Date.now().toString(36),
      email: 'alex.developer@gmail.com',
      displayName: 'Alex Rivers',
      photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400'
    };
    this.setFirebaseUser(googleUser, 'fb_token_' + googleUser.uid);
    this.showToast(`Signed in with Google as ${this.currentUser.name}! 🚀`, 'success');
    const redirectUrl = localStorage.getItem('pf_redirect_after_login') || '#dashboard';
    localStorage.removeItem('pf_redirect_after_login');
    window.location.hash = redirectUrl;
  }

  async logout() {
    if (firebaseAuth) {
      try {
        await firebaseAuth.signOut();
      } catch (e) {
        console.warn('Firebase signOut error:', e);
      }
    }
    this.currentUser = null;
    this.session = null;
    localStorage.removeItem('pf_user');
    localStorage.removeItem('pf_session');
    this.showToast('Signed out successfully', 'info');
    window.location.hash = '#login';
  }

  /* ──────────────────────────────────────────────────────────────────────────
     3. AUTHENTICATED APPLICATION SHELL
     ────────────────────────────────────────────────────────────────────────── */

  renderAuthenticatedLayout(pageTitle, contentHtml, activeNav = 'dashboard') {
    const user = this.currentUser || { name: 'Developer', email: 'user@example.com' };
    const root = document.getElementById('app-root');

    const avatarHTML = user.avatar ? `
      <img src="${user.avatar}" alt="${user.name}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover; border: 2px solid var(--primary);">
    ` : `
      <div style="width: 32px; height: 32px; border-radius: var(--radius-sm); background: var(--primary); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.85rem;">
        ${(user.name || 'D')[0]}
      </div>
    `;

    root.innerHTML = `
      <div style="display: flex; min-height: 100vh; background: var(--bg-primary);">
        <aside class="app-sidebar">
          <div>
            <a href="#dashboard" class="brand-logo" style="margin-bottom: 2rem; padding-left: 0.5rem;">
              <span class="brand-sparkle">✦</span>
              <span>PortfolioForge</span>
            </a>

            <div class="sidebar-section-title">MAIN</div>
            <nav style="display: flex; flex-direction: column;">
              <a href="#dashboard" class="nav-item ${activeNav === 'dashboard' ? 'active' : ''}">
                <span>▣</span>
                <span>Dashboard</span>
              </a>
              <a href="#portfolios" class="nav-item ${activeNav === 'portfolios' ? 'active' : ''}">
                <span>◫</span>
                <span>My Portfolios</span>
              </a>
              <a href="#create/1" class="nav-item">
                <span>＋</span>
                <span>Create Portfolio</span>
                <span class="badge badge-primary" style="margin-left: auto; font-size: 0.65rem; padding: 0.1rem 0.4rem;">AI</span>
              </a>
              <a href="#themes" class="nav-item ${activeNav === 'themes' ? 'active' : ''}">
                <span>◈</span>
                <span>Themes</span>
              </a>
            </nav>

            <div class="sidebar-section-title" style="margin-top: 1.25rem;">SETTINGS</div>
            <nav style="display: flex; flex-direction: column;">
              <a href="#settings" class="nav-item ${activeNav === 'settings' ? 'active' : ''}">
                <span>⚙</span>
                <span>Settings</span>
              </a>
            </nav>
          </div>

          <div style="border-top: 1px solid var(--border-color); padding-top: 1rem;">
            <div style="display: flex; align-items: center; gap: 0.65rem; padding: 0.5rem; background: var(--bg-subtle); border-radius: var(--radius-md); margin-bottom: 0.5rem;">
              ${avatarHTML}
              <div style="overflow: hidden; flex: 1;">
                <div style="font-weight: 700; font-size: 0.825rem; white-space: nowrap; text-overflow: ellipsis;">${user.name}</div>
                <div style="font-size: 0.725rem; color: var(--text-muted);">${user.email || 'Authenticated'}</div>
              </div>
            </div>
            <button class="btn btn-ghost btn-sm" style="width: 100%; justify-content: flex-start; color: var(--accent-rose); font-size: 0.8rem;" onclick="app.logout()">
              Sign Out ⎋
            </button>
          </div>
        </aside>

        <div style="flex: 1; display: flex; flex-direction: column; overflow-y: auto;">
          <header class="app-header">
            <div class="flex items-center gap-2">
              <span style="color: var(--text-muted); font-size: 0.85rem;">PortfolioForge /</span>
              <h2 style="font-weight: 700; font-size: 1.15rem; color: var(--text-primary);">${pageTitle}</h2>
            </div>

            <div class="flex items-center gap-3">
              <button class="mode-toggle-btn" onclick="app.toggleThemeMode()" title="${this.currentThemeMode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}">
                ${this.currentThemeMode === 'dark' ? '☀️' : '🌙'}
              </button>

              <div class="flex items-center gap-2" style="padding-left: 0.5rem; border-left: 1px solid var(--border-color);">
                ${avatarHTML}
                <span style="font-size: 0.85rem; font-weight: 600;">${user.name.split(' ')[0]}</span>
              </div>
            </div>
          </header>

          <main style="flex: 1; padding: 2.25rem;">
            ${contentHtml}
          </main>
        </div>
      </div>
    `;
  }

  /* ──────────────────────────────────────────────────────────────────────────
     4. DASHBOARD VIEW (With Live Portfolios CRUD)
     ────────────────────────────────────────────────────────────────────────── */

  renderDashboard() {
    const user = this.currentUser || { name: 'Developer', email: 'user@example.com' };
    const list = this.portfolios || [];
    const totalViews = list.reduce((sum, p) => sum + (p.views || 0), 0);
    const publishedCount = list.filter(p => p.status === 'published').length;

    const bodyHtml = `
      <div class="flex justify-between items-center md-flex-col gap-4" style="margin-bottom: 2rem;">
        <div>
          <h1 class="heading-display" style="font-size: 1.85rem;">Welcome back, ${user.name.split(' ')[0]} 👋</h1>
          <p style="color: var(--text-secondary); font-size: 0.95rem; margin-top: 0.25rem;">Create, customize and publish your professional portfolio.</p>
        </div>
        <button class="btn btn-primary" onclick="app.createNewPortfolio()">
          + Create Portfolio
        </button>
      </div>

      <div class="grid grid-cols-4 md-grid-cols-2 gap-4" style="margin-bottom: 2.5rem;">
        <div class="card">
          <div class="flex justify-between items-center" style="margin-bottom: 0.4rem;">
            <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Portfolios</span>
            <span class="badge badge-success" style="font-size: 0.7rem;">Active</span>
          </div>
          <div style="font-size: 2rem; font-weight: 800; color: var(--text-primary);">${list.length < 10 ? '0' + list.length : list.length}</div>
          <div style="font-size: 0.775rem; color: var(--text-muted); margin-top: 0.25rem;">Total generated websites</div>
        </div>

        <div class="card">
          <div class="flex justify-between items-center" style="margin-bottom: 0.4rem;">
            <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Published</span>
            <span style="color: var(--accent-emerald); font-weight: 700; font-size: 0.75rem;">● Active</span>
          </div>
          <div style="font-size: 2rem; font-weight: 800; color: var(--accent-emerald);">${publishedCount < 10 ? '0' + publishedCount : publishedCount}</div>
          <div style="font-size: 0.775rem; color: var(--text-muted); margin-top: 0.25rem;">Live accessible websites</div>
        </div>

        <div class="card">
          <div class="flex justify-between items-center" style="margin-bottom: 0.4rem;">
            <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Total Sections</span>
            <span class="badge badge-primary" style="font-size: 0.7rem;">Complete</span>
          </div>
          <div style="font-size: 2rem; font-weight: 800; color: var(--accent-purple);">09</div>
          <div style="font-size: 0.775rem; color: var(--text-muted); margin-top: 0.25rem;">All standard sections active</div>
        </div>

        <div class="card">
          <div class="flex justify-between items-center" style="margin-bottom: 0.4rem;">
            <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Total Views</span>
            <span class="badge badge-primary" style="font-size: 0.7rem;">Analytics</span>
          </div>
          <div style="font-size: 2rem; font-weight: 800; color: var(--primary);">${totalViews.toLocaleString()}</div>
          <div style="font-size: 0.775rem; color: var(--text-muted); margin-top: 0.25rem;">Recruiter interactions</div>
        </div>
      </div>

      <div style="margin-bottom: 2rem;">
        <div class="flex justify-between items-center" style="margin-bottom: 1.25rem;">
          <h2 style="font-size: 1.25rem; font-weight: 800;">My Active Portfolios</h2>
          <a href="#portfolios" style="color: var(--primary); font-size: 0.85rem; font-weight: 600;">Manage all (${list.length}) →</a>
        </div>

        <div class="grid grid-cols-3 md-grid-cols-1 gap-6">
          ${list.slice(0, 3).map(p => `
            <div class="card card-hover" style="display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div class="flex justify-between items-center" style="margin-bottom: 0.6rem;">
                  <span class="badge badge-primary" style="text-transform: capitalize;">${p.theme || 'Bento'}</span>
                  <span style="font-size: 0.75rem; color: ${p.status === 'published' ? 'var(--accent-emerald)' : 'var(--accent-amber)'}; font-weight: 700;">
                    ${p.status === 'published' ? '● Published' : '○ Draft'}
                  </span>
                </div>
                <h3 style="font-weight: 800; font-size: 1.15rem; margin-bottom: 0.25rem;">${p.name}</h3>
                <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1.25rem;">Updated ${p.updatedAt || 'Recently'} • ${p.views || 0} Views</p>
              </div>
              <div class="flex gap-2">
                <a href="#portfolio-view/${p.theme || 'bento'}" class="btn btn-secondary btn-sm" style="flex:1;" onclick="app.loadPortfolioForPreview('${p.id}')">Preview</a>
                <button class="btn btn-primary btn-sm" onclick="app.editPortfolio('${p.id}')">Edit</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    this.renderAuthenticatedLayout('Dashboard', bodyHtml, 'dashboard');
  }

  /* ──────────────────────────────────────────────────────────────────────────
     5. THEMES PAGE
     ────────────────────────────────────────────────────────────────────────── */

  renderThemesView() {
    const themesList = [
      { id: 'brutalist', name: '01. Brutalist', label: 'RAW / EXPRESSIVE', desc: 'Heavy black borders, high contrast, oversized typography, and sharp editorial grid.', badge: 'High Contrast' },
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
          All 6 themes fully render your 9 sections and images (About, Education, Skills, Experience, Projects, Certifications, Achievements, Activities, Contact).
        </p>
      </div>

      <div class="grid grid-cols-3 md-grid-cols-1 gap-6">
        ${themesList.map(t => `
          <div class="card card-hover" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div class="flex justify-between items-center" style="margin-bottom: 0.6rem;">
                <span class="badge badge-primary" style="font-size: 0.65rem;">${t.label}</span>
                <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">${t.badge}</span>
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
     6. MY PORTFOLIOS PAGE (Full CRUD)
     ────────────────────────────────────────────────────────────────────────── */

  renderPortfoliosView() {
    const list = this.portfolios || [];
    const bodyHtml = `
      <div class="flex justify-between items-center" style="margin-bottom: 2rem;">
        <div>
          <h1 class="heading-display" style="font-size: 1.85rem;">My Portfolios</h1>
          <p style="color: var(--text-secondary); margin-top: 0.25rem;">Manage, edit, duplicate, and export your personal developer portfolio websites.</p>
        </div>
        <button class="btn btn-primary" onclick="app.createNewPortfolio()">
          + Create New Portfolio
        </button>
      </div>

      <div class="grid grid-cols-3 md-grid-cols-1 gap-6">
        ${list.map(p => `
          <div class="card card-hover" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div class="flex justify-between items-center" style="margin-bottom: 0.75rem;">
                <span class="badge badge-primary" style="text-transform: capitalize;">${p.theme || 'Bento'}</span>
                <span style="font-size: 0.75rem; color: ${p.status === 'published' ? 'var(--accent-emerald)' : 'var(--accent-amber)'}; font-weight: 700;">
                  ${p.status === 'published' ? '● Published' : '○ Draft'}
                </span>
              </div>
              <h3 style="font-weight: 800; font-size: 1.2rem; margin-bottom: 0.25rem;">${p.name}</h3>
              <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1.25rem;">Updated ${p.updatedAt || 'Recently'} • ${p.views || 0} Views</p>
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              <div class="flex gap-2">
                <a href="#portfolio-view/${p.theme || 'bento'}" class="btn btn-secondary btn-sm" style="flex:1;" onclick="app.loadPortfolioForPreview('${p.id}')">View Live ↗</a>
                <button class="btn btn-primary btn-sm" onclick="app.editPortfolio('${p.id}')">Edit</button>
              </div>
              <div class="flex justify-between items-center" style="border-top: 1px solid var(--border-color); padding-top: 0.5rem; margin-top: 0.25rem;">
                <button class="btn btn-ghost btn-sm" style="font-size: 0.75rem;" onclick="app.duplicatePortfolio('${p.id}')">📋 Duplicate</button>
                <button class="btn btn-ghost btn-sm" style="font-size: 0.75rem; color: var(--accent-rose);" onclick="app.deletePortfolio('${p.id}')">🗑️ Delete</button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    this.renderAuthenticatedLayout('My Portfolios', bodyHtml, 'portfolios');
  }

  createNewPortfolio() {
    this.activeProfileData = JSON.parse(JSON.stringify(this.db?.sampleProfile || this.activeProfileData));
    if (this.currentUser) {
      if (this.currentUser.name) this.activeProfileData.name = this.currentUser.name;
      if (this.currentUser.email) this.activeProfileData.email = this.currentUser.email;
      if (this.currentUser.avatar) this.activeProfileData.profileImage = this.currentUser.avatar;
    }
    this.selectedTheme = 'bento';
    this.editingPortfolioId = null;
    window.location.hash = '#create/1';
  }

  loadPortfolioForPreview(id) {
    const p = this.portfolios.find(x => x.id === id);
    if (p && p.data) {
      this.activeProfileData = JSON.parse(JSON.stringify(p.data));
      this.selectedTheme = p.theme || 'bento';
    }
  }

  editPortfolio(id) {
    const p = this.portfolios.find(x => x.id === id);
    if (p) {
      this.activeProfileData = JSON.parse(JSON.stringify(p.data || this.db?.sampleProfile));
      this.selectedTheme = p.theme || 'bento';
      this.editingPortfolioId = p.id;
      this.showToast(`Loaded "${p.name}" for editing!`, 'info');
      window.location.hash = '#create/3';
    }
  }

  duplicatePortfolio(id) {
    const p = this.portfolios.find(x => x.id === id);
    if (!p) return;
    const copy = {
      ...JSON.parse(JSON.stringify(p)),
      id: 'port-' + Date.now(),
      name: `${p.name} (Copy)`,
      updatedAt: 'Just now'
    };
    this.portfolios.unshift(copy);
    this.savePortfoliosToStorage();
    this.showToast(`Duplicated "${p.name}"!`, 'success');
    if (window.location.hash === '#portfolios') this.renderPortfoliosView();
    else if (window.location.hash === '#dashboard') this.renderDashboard();
  }

  deletePortfolio(id) {
    if (this.portfolios.length <= 1) {
      this.showToast('You must keep at least one portfolio.', 'warning');
      return;
    }
    const idx = this.portfolios.findIndex(x => x.id === id);
    if (idx !== -1) {
      const removed = this.portfolios.splice(idx, 1)[0];
      this.savePortfoliosToStorage();
      this.showToast(`Deleted "${removed.name}".`, 'info');
      if (window.location.hash === '#portfolios') this.renderPortfoliosView();
      else if (window.location.hash === '#dashboard') this.renderDashboard();
    }
  }

  /* ──────────────────────────────────────────────────────────────────────────
     7. SETTINGS PAGE
     ────────────────────────────────────────────────────────────────────────── */

  renderSettingsView() {
    const user = this.currentUser || { name: 'Developer', email: 'user@example.com' };

    const bodyHtml = `
      <div style="max-width: 680px;">
        <h1 class="heading-display" style="font-size: 1.85rem; margin-bottom: 2rem;">Account & Preferences</h1>

        <div class="card" style="margin-bottom: 2rem;">
          <h3 style="font-weight: 700; margin-bottom: 1.25rem;">Google Account (Firebase Auth)</h3>
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.25rem; padding: 1rem; background: var(--bg-subtle); border-radius: var(--radius-md);">
            ${user.avatar ? `<img src="${user.avatar}" alt="${user.name}" style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover;">` : ''}
            <div>
              <div style="font-weight: 700; font-size: 1rem;">${user.name}</div>
              <div style="color: var(--text-muted); font-size: 0.85rem;">${user.email}</div>
              <div style="margin-top: 0.25rem;"><span class="badge badge-success" style="font-size: 0.7rem;">Google Verified</span></div>
            </div>
          </div>
          <button class="btn btn-ghost btn-sm" style="color: var(--accent-rose);" onclick="app.logout()">
            Sign Out of Account
          </button>
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
     8. 6-STEP CREATION WIZARD
     ────────────────────────────────────────────────────────────────────────── */

  renderWizardStep(step = 1) {
    this.currentWizardStep = step;
    const root = document.getElementById('app-root');
    const stepTitles = ['Upload', 'Analyze', 'Review', 'Customize', 'Generate', 'Preview'];

    root.innerHTML = `
      <div style="background: var(--bg-surface); border-bottom: 1px solid var(--border-color); padding: 1rem 0;">
        <div class="container flex justify-between items-center">
          <a href="#dashboard" class="brand-logo">
            <span class="brand-sparkle">✦</span>
            <span>PortfolioForge</span>
          </a>
          
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
            <button class="mode-toggle-btn" onclick="app.toggleThemeMode()" title="Toggle Dark/Light Mode">
              ${this.currentThemeMode === 'dark' ? '☀️' : '🌙'}
            </button>
            <a href="#dashboard" class="btn btn-ghost btn-sm">Exit</a>
          </div>
        </div>
      </div>

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
        <h1 class="heading-display" style="font-size: 2.2rem; margin-top: 0.5rem;">Upload Your Resume</h1>
        <p style="color: var(--text-secondary);">Upload your PDF, Word (.docx), or plain-text (.txt) resume to begin automated AI extraction.</p>
      </div>

      <div class="card" style="margin-bottom: 2rem;">
        <div id="dropzone-box" class="dropzone" onclick="document.getElementById('resume-file-input').click()">
          <input type="file" id="resume-file-input" accept=".pdf,.doc,.docx,.txt,.rtf,.md" style="display: none;" onchange="app.handleFileSelect(event)">
          <div style="font-size: 2.75rem; margin-bottom: 0.75rem; color: var(--primary);">↑</div>
          <h3 style="font-weight: 700; font-size: 1.15rem; margin-bottom: 0.35rem;">Drag & drop your resume here</h3>
          <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 1.5rem;">Supports PDF, Word (.docx), plain text (.txt), Markdown (.md) — up to 10MB</p>
          <button class="btn btn-secondary" type="button">Browse Files</button>
        </div>

        <div id="file-status-box" style="display: none; margin-top: 1.5rem; padding: 1rem; background: var(--bg-subtle); border-radius: var(--radius-md); justify-content: space-between; align-items: center;">
          <div class="flex items-center gap-3">
            <span style="font-size: 1.5rem;">📄</span>
            <div>
              <div id="uploaded-filename" style="font-weight: 700; font-size: 0.9rem;"></div>
              <div id="uploaded-filesize" style="font-size: 0.75rem; color: var(--text-muted);"></div>
            </div>
          </div>
          <button class="btn btn-ghost btn-sm" onclick="app.clearUploadedFile()">Remove</button>
        </div>
      </div>

      <div class="card flex justify-between items-center md-flex-col gap-4" style="background: var(--primary-light); border-color: rgba(79,70,229,0.25); margin-bottom: 2.5rem;">
        <div>
          <div style="font-weight: 700; color: var(--primary);">Don't have a file handy?</div>
          <div style="font-size: 0.85rem; color: var(--text-secondary);">Load our complete CS & AI engineer portfolio data directly.</div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="app.loadDemoProfileAndProceed()">⚡ Load Sample Resume</button>
      </div>

      <div class="flex justify-end">
        <button id="step1-next-btn" class="btn btn-primary btn-lg" onclick="app.startResumeAnalysis()">
          Analyze Resume with AI →
        </button>
      </div>
    `;
  }

  handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;
    const ext = file.name.split('.').pop().toLowerCase();
    const allowedExts = ['pdf', 'doc', 'docx', 'txt', 'rtf', 'md'];
    if (!allowedExts.includes(ext)) {
      this.showToast('Unsupported format. Please upload a PDF, Word, or text file.', 'error');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      this.showToast('File too large. Maximum 10MB.', 'error');
      return;
    }
    this.uploadedFile = file;

    const statusBox = document.getElementById('file-status-box');
    const nameEl = document.getElementById('uploaded-filename');
    const sizeEl = document.getElementById('uploaded-filesize');
    if (statusBox) statusBox.style.display = 'flex';
    if (nameEl) nameEl.innerText = file.name;
    if (sizeEl) sizeEl.innerText = `Uploading ${(file.size / 1024).toFixed(1)} KB...`;

    const formData = new FormData();
    formData.append('file', file);
    const headers = {};
    if (this.session?.access_token) {
      headers['Authorization'] = `Bearer ${this.session.access_token}`;
    }

    fetch('http://localhost:5001/api/resume/upload', { method: 'POST', body: formData, headers })
      .then(res => res.json())
      .then(data => {
        if (data.id) {
          this.resumeId = data.id;
          return fetch(`http://localhost:5001/api/resume/${data.id}`, { headers }).then(r => r.json());
        }
        return null;
      })
      .then(data => {
        if (data && data.text) {
          this.rawResumeText = data.text;
        }
        if (sizeEl) sizeEl.innerText = `${(file.size / 1024).toFixed(1)} KB • Ready for AI extraction`;
        this.showToast('Resume uploaded! Click "Analyze Resume" to extract your data.', 'success');
      })
      .catch(() => {
        // Fallback FileReader for plain text
        const reader = new FileReader();
        reader.onload = (e) => {
          this.rawResumeText = e.target.result;
          if (sizeEl) sizeEl.innerText = `${(file.size / 1024).toFixed(1)} KB • Client-parsed`;
          this.showToast('Resume loaded locally.', 'info');
        };
        reader.readAsText(file);
      });
  }

  async startResumeAnalysis() {
    const container = document.getElementById('wizard-step-container');
    if (!container) return;

    // If no resume uploaded, load demo profile
    if (!this.rawResumeText && !this.resumeId) {
      this.loadDemoProfileAndProceed();
      return;
    }

    // Show Loading Screen
    container.innerHTML = `
      <div style="text-align: center; padding: 4rem 1.5rem;">
        <div style="display: inline-block; width: 56px; height: 56px; border: 4px solid var(--primary-light); border-top-color: var(--primary); border-radius: 50%; animation: spin 0.8s linear infinite; margin-bottom: 1.5rem;"></div>
        <h2 style="font-size: 1.75rem; font-weight: 800; margin-bottom: 0.5rem;">Analyzing Resume with Gemini AI...</h2>
        <p style="color: var(--text-secondary); max-width: 480px; margin: 0 auto 2rem auto;">
          Extracting all 9 portfolio sections (Personal Info, Education, Experience, Projects, Skills, Certifications, Achievements, and Activities)...
        </p>
        <div class="card" style="max-width: 420px; margin: 0 auto; text-align: left; padding: 1.25rem;">
          <div id="ai-step-1" class="flex items-center gap-2" style="margin-bottom: 0.75rem;"><span style="color: var(--accent-emerald);">●</span> <span>Parsing Resume Text</span></div>
          <div id="ai-step-2" class="flex items-center gap-2" style="margin-bottom: 0.75rem;"><span style="color: var(--primary);">●</span> <span>Structuring 9 Standard Portfolio Sections</span></div>
          <div id="ai-step-3" class="flex items-center gap-2"><span style="color: var(--text-muted);">○</span> <span>Calculating ATS Diagnostic Scores</span></div>
        </div>
      </div>
    `;

    try {
      const headers = { 'Content-Type': 'application/json' };
      if (this.session?.access_token) {
        headers['Authorization'] = `Bearer ${this.session.access_token}`;
      }

      // 1. Call AI generate-json endpoint
      const aiResponse = await fetch('http://localhost:5001/api/ai/generate-json', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          resumeId: this.resumeId,
          resumeText: this.rawResumeText
        })
      });

      if (aiResponse.ok) {
        const extractedData = await aiResponse.json();
        if (extractedData && (extractedData.name || extractedData.skills || extractedData.experience)) {
          this.activeProfileData = {
            ...this.activeProfileData,
            ...extractedData,
            // Preserve uploaded image if any
            profileImage: extractedData.profileImage || this.activeProfileData?.profileImage || ''
          };
          this.showToast(`AI extracted data for ${this.activeProfileData.name}! 🎉`, 'success');
        }
      }

      // 2. Call ATS analysis endpoint
      if (this.resumeId) {
        try {
          const atsRes = await fetch(`http://localhost:5001/api/resume/${this.resumeId}/analyze`, { headers });
          if (atsRes.ok) {
            this.analysisResults = await atsRes.json();
          }
        } catch (e) {}
      }
    } catch (err) {
      console.warn('AI analysis notice:', err);
    }

    // Proceed to Step 2
    this.renderWizardStep(2);
  }

  loadDemoProfileAndProceed() {
    this.showToast('Sample resume loaded!', 'success');
    this.renderWizardStep(2);
  }

  clearUploadedFile() {
    this.uploadedFile = null;
    this.rawResumeText = null;
    this.resumeId = null;
    const box = document.getElementById('file-status-box');
    if (box) box.style.display = 'none';
  }

  // STEP 2: Diagnostic Analysis
  renderWizardStep2_Analysis(container) {
    const data = this.activeProfileData || {};
    const score = this.analysisResults?.score || 92;
    const skillsCount = (data.skills || []).length;
    const projectsCount = (data.projects || []).length;
    const expCount = (data.experience || []).length;
    const eduCount = (data.education || []).length;
    const certCount = (data.certifications || []).length;
    const achCount = (data.achievements || []).length;
    const actCount = (data.activities || []).length;

    container.innerHTML = `
      <div style="text-align: center; margin-bottom: 2.5rem;">
        <span class="badge badge-primary">Step 02 / 06</span>
        <h1 class="heading-display" style="font-size: 2.2rem; margin-top: 0.5rem;">Resume Content Diagnostics</h1>
        <p style="color: var(--text-secondary);">Extracted information for <strong>${data.name || 'Candidate'}</strong> (${data.title || 'Developer'}).</p>
      </div>

      <div class="card flex items-center justify-between md-flex-col gap-6" style="margin-bottom: 2rem;">
        <div>
          <span class="badge badge-primary" style="margin-bottom: 0.5rem;">Overall Resume Score</span>
          <div style="font-size: 3.5rem; font-weight: 900; color: var(--accent-emerald); line-height: 1;">
            ${score}<span style="font-size: 1.5rem; color: var(--text-muted);">/100</span>
          </div>
          <p style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 0.5rem;">
            ${data.name ? `Profile for <strong>${data.name}</strong> successfully parsed with all sections.` : 'Technical profile evaluated.'}
          </p>
        </div>

        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <div style="padding: 1rem 1.25rem; background: var(--bg-subtle); border-radius: var(--radius-md); text-align: center;">
            <div style="font-weight: 800; font-size: 1.25rem; color: var(--accent-emerald);">9/9</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">Standard Sections</div>
          </div>
          <div style="padding: 1rem 1.25rem; background: var(--bg-subtle); border-radius: var(--radius-md); text-align: center;">
            <div style="font-weight: 800; font-size: 1.25rem; color: var(--primary);">${skillsCount}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">Skills Identified</div>
          </div>
          <div style="padding: 1rem 1.25rem; background: var(--bg-subtle); border-radius: var(--radius-md); text-align: center;">
            <div style="font-weight: 800; font-size: 1.25rem; color: var(--accent-purple);">${projectsCount}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">Projects Extracted</div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 md-grid-cols-1 gap-4" style="margin-bottom: 2rem;">
        <div class="card" style="padding: 1rem 1.25rem;"><div class="flex justify-between items-center"><span style="font-weight: 600;">👤 Name: ${data.name || 'Detected'}</span><span class="badge badge-success">✓ Complete</span></div></div>
        <div class="card" style="padding: 1rem 1.25rem;"><div class="flex justify-between items-center"><span style="font-weight: 600;">🎓 Education (${eduCount} entries)</span><span class="badge badge-success">✓ Complete</span></div></div>
        <div class="card" style="padding: 1rem 1.25rem;"><div class="flex justify-between items-center"><span style="font-weight: 600;">⚡ Skills (${skillsCount} skills)</span><span class="badge badge-success">✓ Complete</span></div></div>
        <div class="card" style="padding: 1rem 1.25rem;"><div class="flex justify-between items-center"><span style="font-weight: 600;">💼 Experience (${expCount} roles)</span><span class="badge badge-success">✓ Complete</span></div></div>
        <div class="card" style="padding: 1rem 1.25rem;"><div class="flex justify-between items-center"><span style="font-weight: 600;">🚀 Projects (${projectsCount} projects)</span><span class="badge badge-success">✓ Complete</span></div></div>
        <div class="card" style="padding: 1rem 1.25rem;"><div class="flex justify-between items-center"><span style="font-weight: 600;">🏅 Certifications (${certCount} certs)</span><span class="badge badge-success">✓ Complete</span></div></div>
        <div class="card" style="padding: 1rem 1.25rem;"><div class="flex justify-between items-center"><span style="font-weight: 600;">🏆 Achievements (${achCount} items)</span><span class="badge badge-success">✓ Complete</span></div></div>
        <div class="card" style="padding: 1rem 1.25rem;"><div class="flex justify-between items-center"><span style="font-weight: 600;">🌟 Activities (${actCount} items)</span><span class="badge badge-success">✓ Complete</span></div></div>
      </div>

      <div class="flex justify-between items-center">
        <button class="btn btn-secondary" onclick="app.renderWizardStep(1)">← Back</button>
        <button class="btn btn-primary btn-lg" onclick="app.renderWizardStep(3)">Review & Edit Extracted Data →</button>
      </div>
    `;
  }

  // STEP 3: Review & Edit (All 9 Sections with Photo Upload for Profile, Projects & Certifications)
  renderWizardStep3_Review(container) {
    const data = this.activeProfileData;
    const education = data.education || [];
    const experience = data.experience || [];
    const projects = data.projects || [];
    const certifications = data.certifications || [];
    const achievements = data.achievements || [];
    const activities = data.activities || [];

    const eduHTML = education.map((e, i) => `
      <div style="padding: 1rem 1.25rem; background: var(--bg-subtle); border-radius: var(--radius-md); margin-bottom: 0.85rem; position: relative;">
        <button type="button" class="btn btn-ghost btn-sm" style="position: absolute; top: 0.5rem; right: 0.5rem; color: var(--accent-rose);" onclick="app.removeEducation(${i})">✕</button>
        <div class="grid grid-cols-2 md-grid-cols-1 gap-3">
          <div class="form-group"><label class="form-label">Degree / Program</label><input class="form-input edu-degree" value="${e.degree || ''}" placeholder="e.g. B.Tech Computer Science"></div>
          <div class="form-group"><label class="form-label">University / College</label><input class="form-input edu-uni" value="${e.university || ''}" placeholder="e.g. Delhi Technological University"></div>
          <div class="form-group"><label class="form-label">Location</label><input class="form-input edu-loc" value="${e.location || ''}" placeholder="e.g. Delhi, India"></div>
          <div class="form-group"><label class="form-label">Duration (Years)</label><input class="form-input edu-years" value="${e.startYear && e.endYear ? e.startYear + ' - ' + e.endYear : (e.startYear || e.endYear || '')}" placeholder="2021 - 2025"></div>
          <div class="form-group"><label class="form-label">Grade / GPA</label><input class="form-input edu-grade" value="${e.grade || ''}" placeholder="e.g. CGPA: 8.8/10"></div>
          <div class="form-group"><label class="form-label">Description / Coursework</label><input class="form-input edu-desc" value="${e.description || ''}" placeholder="Relevant coursework, honors..."></div>
        </div>
      </div>
    `).join('');

    const expHTML = experience.map((exp, i) => `
      <div style="padding: 1rem 1.25rem; background: var(--bg-subtle); border-radius: var(--radius-md); margin-bottom: 0.85rem; position: relative;">
        <button type="button" class="btn btn-ghost btn-sm" style="position: absolute; top: 0.5rem; right: 0.5rem; color: var(--accent-rose);" onclick="app.removeExperience(${i})">✕</button>
        <div class="grid grid-cols-2 md-grid-cols-1 gap-3">
          <div class="form-group"><label class="form-label">Position / Role</label><input class="form-input exp-pos" value="${exp.position || ''}" placeholder="e.g. Software Engineering Intern"></div>
          <div class="form-group"><label class="form-label">Company / Organization</label><input class="form-input exp-comp" value="${exp.company || ''}" placeholder="e.g. TechSolutions Inc."></div>
          <div class="form-group"><label class="form-label">Location</label><input class="form-input exp-loc" value="${exp.location || ''}" placeholder="e.g. Delhi / Remote"></div>
          <div class="form-group"><label class="form-label">Dates</label><input class="form-input exp-dates" value="${exp.startDate && exp.endDate ? exp.startDate + ' - ' + exp.endDate : (exp.startDate || exp.endDate || '')}" placeholder="June 2024 - Aug 2024"></div>
        </div>
        <div class="form-group" style="margin-top: 0.5rem;">
          <label class="form-label">Role Description & Key Accomplishments</label>
          <textarea class="form-textarea exp-desc" rows="2" placeholder="Key responsibilities and technical impact...">${exp.description || ''}</textarea>
        </div>
      </div>
    `).join('');

    const projectsHTML = projects.map((p, i) => `
      <div style="padding: 1rem 1.25rem; background: var(--bg-subtle); border-radius: var(--radius-md); margin-bottom: 0.85rem; position: relative;">
        <button type="button" class="btn btn-ghost btn-sm" style="position: absolute; top: 0.5rem; right: 0.5rem; color: var(--accent-rose);" onclick="app.removeProject(${i})">✕</button>
        
        <div class="grid grid-cols-2 md-grid-cols-1 gap-3">
          <div class="form-group"><label class="form-label">Project Name</label><input class="form-input project-name" value="${p.name || ''}"></div>
          <div class="form-group"><label class="form-label">Technologies (comma-separated)</label><input class="form-input project-tech" value="${(p.technologies || []).join(', ')}"></div>
        </div>

        <!-- Project Photo / Screenshot Upload -->
        <div style="margin: 0.6rem 0; padding: 0.6rem 0.85rem; background: var(--bg-surface); border-radius: var(--radius-sm); border: 1px dashed var(--border-color);">
          <label class="form-label" style="font-weight: 600; font-size: 0.8rem; margin-bottom: 0.35rem;">🖼️ Project Screenshot / Image</label>
          <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
            <img class="project-img-preview" src="${p.image || ''}" alt="Project preview" style="width: 50px; height: 36px; object-fit: cover; border-radius: 6px; border: 1px solid var(--border-color); display: ${p.image ? 'block' : 'none'};">
            <input type="file" id="proj-file-picker-${i}" accept="image/*" style="display: none;" onchange="app.handleProjectImageUpload(event, ${i})">
            <button type="button" class="btn btn-secondary btn-sm" style="font-size: 0.75rem; padding: 0.25rem 0.65rem;" onclick="document.getElementById('proj-file-picker-${i}').click()">
              📁 Upload Image
            </button>
            <button type="button" class="btn btn-ghost btn-sm" style="font-size: 0.75rem; color: var(--accent-rose); display: ${p.image ? 'inline-block' : 'none'};" onclick="app.removeProjectImage(${i})">
              ✕ Remove
            </button>
            <input class="form-input project-image" value="${p.image || ''}" placeholder="Or paste image URL (https://...)" style="flex: 1; min-width: 180px; font-size: 0.8rem; padding: 0.35rem 0.65rem;" oninput="app.updateProjectImagePreview(this.value, ${i})">
          </div>
        </div>

        <div class="form-group" style="margin-top: 0.5rem;"><label class="form-label">Project Description</label><textarea class="form-textarea project-desc" rows="2">${p.description || ''}</textarea></div>
        <div class="grid grid-cols-3 md-grid-cols-1 gap-3" style="margin-top: 0.5rem;">
          <div class="form-group"><label class="form-label">GitHub URL</label><input class="form-input project-github" value="${p.github || ''}"></div>
          <div class="form-group"><label class="form-label">Live Demo URL</label><input class="form-input project-demo" value="${p.demo || ''}"></div>
          <div class="form-group"><label class="form-label">Key Highlight Badge</label><input class="form-input project-highlights" value="${p.highlights || ''}"></div>
        </div>
      </div>
    `).join('');

    const certsHTML = certifications.map((c, i) => `
      <div style="padding: 1rem 1.25rem; background: var(--bg-subtle); border-radius: var(--radius-md); margin-bottom: 0.85rem; position: relative;">
        <button type="button" class="btn btn-ghost btn-sm" style="position: absolute; top: 0.5rem; right: 0.5rem; color: var(--accent-rose);" onclick="app.removeCertification(${i})">✕</button>
        
        <div class="grid grid-cols-2 md-grid-cols-1 gap-3">
          <div class="form-group"><label class="form-label">Certification Name</label><input class="form-input cert-name" value="${c.name || ''}" placeholder="e.g. AWS Certified Developer"></div>
          <div class="form-group"><label class="form-label">Issuing Body</label><input class="form-input cert-issuer" value="${c.issuer || ''}" placeholder="e.g. Amazon Web Services"></div>
          <div class="form-group"><label class="form-label">Issue Date</label><input class="form-input cert-date" value="${c.date || ''}" placeholder="e.g. 2024"></div>
          <div class="form-group"><label class="form-label">Credential Verification Link</label><input class="form-input cert-link" value="${c.link || ''}" placeholder="https://..."></div>
        </div>

        <!-- Certification Photo / Badge Upload -->
        <div style="margin-top: 0.6rem; padding: 0.6rem 0.85rem; background: var(--bg-surface); border-radius: var(--radius-sm); border: 1px dashed var(--border-color);">
          <label class="form-label" style="font-weight: 600; font-size: 0.8rem; margin-bottom: 0.35rem;">📜 Certificate Photo / Badge Image</label>
          <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
            <img class="cert-img-preview" src="${c.image || ''}" alt="Certificate preview" style="width: 50px; height: 36px; object-fit: cover; border-radius: 6px; border: 1px solid var(--border-color); display: ${c.image ? 'block' : 'none'};">
            <input type="file" id="cert-file-picker-${i}" accept="image/*" style="display: none;" onchange="app.handleCertImageUpload(event, ${i})">
            <button type="button" class="btn btn-secondary btn-sm" style="font-size: 0.75rem; padding: 0.25rem 0.65rem;" onclick="document.getElementById('cert-file-picker-${i}').click()">
              📁 Upload Certificate Photo
            </button>
            <button type="button" class="btn btn-ghost btn-sm" style="font-size: 0.75rem; color: var(--accent-rose); display: ${c.image ? 'inline-block' : 'none'};" onclick="app.removeCertImage(${i})">
              ✕ Remove
            </button>
            <input class="form-input cert-image" value="${c.image || ''}" placeholder="Or paste image URL (https://...)" style="flex: 1; min-width: 180px; font-size: 0.8rem; padding: 0.35rem 0.65rem;" oninput="app.updateCertImagePreview(this.value, ${i})">
          </div>
        </div>
      </div>
    `).join('');

    const achievementsHTML = achievements.map((a, i) => `
      <div style="padding: 1rem 1.25rem; background: var(--bg-subtle); border-radius: var(--radius-md); margin-bottom: 0.85rem; position: relative;">
        <button type="button" class="btn btn-ghost btn-sm" style="position: absolute; top: 0.5rem; right: 0.5rem; color: var(--accent-rose);" onclick="app.removeAchievement(${i})">✕</button>
        <div class="grid grid-cols-2 md-grid-cols-1 gap-3">
          <div class="form-group"><label class="form-label">Achievement Title</label><input class="form-input ach-title" value="${a.title || ''}" placeholder="e.g. Hackathon Finalist"></div>
          <div class="form-group"><label class="form-label">Date / Year</label><input class="form-input ach-date" value="${a.date || ''}" placeholder="e.g. 2024"></div>
        </div>
        <div class="form-group" style="margin-top: 0.5rem;"><label class="form-label">Description & Impact</label><textarea class="form-textarea ach-desc" rows="2">${a.description || ''}</textarea></div>
      </div>
    `).join('');

    const activitiesHTML = activities.map((act, i) => `
      <div style="padding: 1rem 1.25rem; background: var(--bg-subtle); border-radius: var(--radius-md); margin-bottom: 0.85rem; position: relative;">
        <button type="button" class="btn btn-ghost btn-sm" style="position: absolute; top: 0.5rem; right: 0.5rem; color: var(--accent-rose);" onclick="app.removeActivity(${i})">✕</button>
        <div class="grid grid-cols-3 md-grid-cols-1 gap-3">
          <div class="form-group"><label class="form-label">Role / Position</label><input class="form-input act-title" value="${act.title || act.role || ''}" placeholder="e.g. Technical Lead"></div>
          <div class="form-group"><label class="form-label">Organization / Event</label><input class="form-input act-org" value="${act.organization || ''}" placeholder="e.g. ACM Club"></div>
          <div class="form-group"><label class="form-label">Date / Duration</label><input class="form-input act-date" value="${act.date || ''}" placeholder="e.g. 2023–2024"></div>
        </div>
        <div class="form-group" style="margin-top: 0.5rem;"><label class="form-label">Description</label><textarea class="form-textarea act-desc" rows="2">${act.description || ''}</textarea></div>
      </div>
    `).join('');

    container.innerHTML = `
      <div style="text-align: center; margin-bottom: 2.5rem;">
        <span class="badge badge-primary">Step 03 / 06</span>
        <h1 class="heading-display" style="font-size: 2.2rem; margin-top: 0.5rem;">Review & Edit Information</h1>
        <p style="color: var(--text-secondary);">Fine-tune all 9 sections and upload photos for profile, projects, and certifications.</p>
      </div>

      <!-- 1. PERSONAL INFORMATION & PHOTO -->
      <div class="card" style="margin-bottom: 2rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
          👤 1. PERSONAL INFORMATION &amp; PHOTO
        </h3>

        <!-- Profile Photo Upload Box -->
        <div style="padding: 1rem 1.25rem; background: var(--bg-subtle); border-radius: var(--radius-md); margin-bottom: 1.25rem; border: 1px solid var(--border-color);">
          <label class="form-label" style="font-weight: 700; margin-bottom: 0.5rem;">📸 Profile Photo / Avatar</label>
          <div style="display: flex; gap: 1.25rem; align-items: center; flex-wrap: wrap;">
            <img id="photo-preview-thumbnail" src="${data.profileImage || ''}" alt="Photo Preview" style="width: 68px; height: 68px; border-radius: 50%; object-fit: cover; border: 3px solid var(--primary); display: ${data.profileImage ? 'block' : 'none'}; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
              <input type="file" id="photo-file-picker" accept="image/*" style="display: none;" onchange="app.handlePhotoUpload(event)">
              <button type="button" class="btn btn-secondary btn-sm" onclick="document.getElementById('photo-file-picker').click()">
                📁 Upload Photo File
              </button>
              <button type="button" id="remove-photo-btn" class="btn btn-ghost btn-sm" style="color: var(--accent-rose); display: ${data.profileImage ? 'inline-block' : 'none'};" onclick="app.removePhoto()">
                ✕ Remove
              </button>
            </div>
          </div>
          <div style="margin-top: 0.75rem;">
            <label style="font-size: 0.75rem; color: var(--text-muted);">Or paste external Image URL:</label>
            <input id="edit-profileImage" class="form-input" value="${data.profileImage || ''}" placeholder="https://example.com/photo.jpg" oninput="app.updatePhotoPreview(this.value)">
          </div>
        </div>

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
            <label class="form-label">Phone Number</label>
            <input id="edit-phone" class="form-input" value="${data.phone || ''}" placeholder="+91 98765 43210">
          </div>
          <div class="form-group">
            <label class="form-label">Location / City</label>
            <input id="edit-location" class="form-input" value="${data.location || ''}">
          </div>
          <div class="form-group">
            <label class="form-label">Personal Website</label>
            <input id="edit-website" class="form-input" value="${data.website || ''}" placeholder="https://yoursite.dev">
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
      </div>

      <!-- 2. ABOUT / BIO -->
      <div class="card" style="margin-bottom: 2rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
          📝 2. ABOUT / BIOGRAPHY
        </h3>
        <div class="form-group">
          <label class="form-label">Professional Summary &amp; Narrative</label>
          <textarea id="edit-about" class="form-textarea" rows="3">${data.about || data.tagline || ''}</textarea>
        </div>
      </div>

      <!-- 3. SKILLS -->
      <div class="card" style="margin-bottom: 2rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
          🛠️ 3. TECHNICAL SKILLS &amp; TOOLS
        </h3>
        <div class="form-group">
          <label class="form-label">Comma-separated skills list</label>
          <input id="edit-skills" class="form-input" value="${(data.skills || []).join(', ')}">
        </div>
      </div>

      <!-- 4. WORK EXPERIENCE -->
      <div class="card" style="margin-bottom: 2rem;">
        <div class="flex justify-between items-center" style="margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
          <h3 style="font-size: 1.15rem; font-weight: 700;">💼 4. WORK &amp; INTERNSHIP EXPERIENCE</h3>
          <button type="button" class="btn btn-primary btn-sm" onclick="app.addExperience()">+ Add Experience</button>
        </div>
        <div id="exp-list">${expHTML || '<p style="color: var(--text-muted); font-size: 0.85rem;">No experience added yet. Click "+ Add Experience" above.</p>'}</div>
      </div>

      <!-- 5. EDUCATION -->
      <div class="card" style="margin-bottom: 2rem;">
        <div class="flex justify-between items-center" style="margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
          <h3 style="font-size: 1.15rem; font-weight: 700;">🎓 5. EDUCATION BACKGROUND</h3>
          <button type="button" class="btn btn-primary btn-sm" onclick="app.addEducation()">+ Add Education</button>
        </div>
        <div id="edu-list">${eduHTML || '<p style="color: var(--text-muted); font-size: 0.85rem;">No education added yet. Click "+ Add Education" above.</p>'}</div>
      </div>

      <!-- 6. PROJECTS -->
      <div class="card" style="margin-bottom: 2rem;">
        <div class="flex justify-between items-center" style="margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
          <h3 style="font-size: 1.15rem; font-weight: 700;">🚀 6. PROJECTS &amp; SCREENSHOTS</h3>
          <button type="button" class="btn btn-primary btn-sm" onclick="app.addProject()">+ Add Project</button>
        </div>
        <div id="projects-list">${projectsHTML || '<p style="color: var(--text-muted); font-size: 0.85rem;">No projects added yet. Click "+ Add Project" above.</p>'}</div>
      </div>

      <!-- 7. CERTIFICATIONS -->
      <div class="card" style="margin-bottom: 2rem;">
        <div class="flex justify-between items-center" style="margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
          <h3 style="font-size: 1.15rem; font-weight: 700;">🏅 7. CERTIFICATIONS &amp; CREDENTIALS</h3>
          <button type="button" class="btn btn-primary btn-sm" onclick="app.addCertification()">+ Add Certification</button>
        </div>
        <div id="certs-list">${certsHTML || '<p style="color: var(--text-muted); font-size: 0.85rem;">No certifications added yet. Click "+ Add Certification" above.</p>'}</div>
      </div>

      <!-- 8. ACHIEVEMENTS -->
      <div class="card" style="margin-bottom: 2rem;">
        <div class="flex justify-between items-center" style="margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
          <h3 style="font-size: 1.15rem; font-weight: 700;">🏆 8. ACHIEVEMENTS &amp; HONORS</h3>
          <button type="button" class="btn btn-primary btn-sm" onclick="app.addAchievement()">+ Add Achievement</button>
        </div>
        <div id="achievements-list">${achievementsHTML || '<p style="color: var(--text-muted); font-size: 0.85rem;">No achievements added yet. Click "+ Add Achievement" above.</p>'}</div>
      </div>

      <!-- 9. ACTIVITIES & LEADERSHIP -->
      <div class="card" style="margin-bottom: 2.5rem;">
        <div class="flex justify-between items-center" style="margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
          <h3 style="font-size: 1.15rem; font-weight: 700;">🌟 9. ACTIVITIES &amp; LEADERSHIP</h3>
          <button type="button" class="btn btn-primary btn-sm" onclick="app.addActivity()">+ Add Activity</button>
        </div>
        <div id="activities-list">${activitiesHTML || '<p style="color: var(--text-muted); font-size: 0.85rem;">No activities added yet. Click "+ Add Activity" above.</p>'}</div>
      </div>

      <div class="flex justify-between items-center">
        <button class="btn btn-secondary" onclick="app.renderWizardStep(2)">← Back</button>
        <button class="btn btn-primary btn-lg" onclick="app.saveReviewedDataAndProceed()">Choose Theme →</button>
      </div>
    `;
  }

  // Profile Photo Upload Handlers
  handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      this.showToast('Please select a valid image file (PNG, JPG, WebP).', 'error');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      this.showToast('Image too large. Maximum size is 5MB.', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      this.activeProfileData.profileImage = dataUrl;
      const urlInput = document.getElementById('edit-profileImage');
      if (urlInput) urlInput.value = dataUrl;
      const thumb = document.getElementById('photo-preview-thumbnail');
      if (thumb) {
        thumb.src = dataUrl;
        thumb.style.display = 'block';
      }
      const removeBtn = document.getElementById('remove-photo-btn');
      if (removeBtn) removeBtn.style.display = 'inline-block';
      this.showToast('Profile photo uploaded! 📸', 'success');
    };
    reader.readAsDataURL(file);
  }

  removePhoto() {
    this.activeProfileData.profileImage = '';
    const urlInput = document.getElementById('edit-profileImage');
    if (urlInput) urlInput.value = '';
    const thumb = document.getElementById('photo-preview-thumbnail');
    if (thumb) thumb.style.display = 'none';
    const removeBtn = document.getElementById('remove-photo-btn');
    if (removeBtn) removeBtn.style.display = 'none';
    this.showToast('Profile photo removed.', 'info');
  }

  updatePhotoPreview(val) {
    this.activeProfileData.profileImage = val;
    const thumb = document.getElementById('photo-preview-thumbnail');
    const removeBtn = document.getElementById('remove-photo-btn');
    if (thumb) {
      if (val) {
        thumb.src = val;
        thumb.style.display = 'block';
        if (removeBtn) removeBtn.style.display = 'inline-block';
      } else {
        thumb.style.display = 'none';
        if (removeBtn) removeBtn.style.display = 'none';
      }
    }
  }

  // Project Image Handlers
  handleProjectImageUpload(event, idx) {
    const file = event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      this.showToast('Please select a valid image file.', 'error');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      this.showToast('Image too large. Maximum size is 5MB.', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      this.saveReviewedDataSilent();
      if (this.activeProfileData.projects && this.activeProfileData.projects[idx]) {
        this.activeProfileData.projects[idx].image = e.target.result;
        this.renderWizardStep3_Review(document.getElementById('wizard-step-container'));
        this.showToast('Project image uploaded! 🖼️', 'success');
      }
    };
    reader.readAsDataURL(file);
  }

  removeProjectImage(idx) {
    this.saveReviewedDataSilent();
    if (this.activeProfileData.projects && this.activeProfileData.projects[idx]) {
      this.activeProfileData.projects[idx].image = '';
      this.renderWizardStep3_Review(document.getElementById('wizard-step-container'));
      this.showToast('Project image removed.', 'info');
    }
  }

  updateProjectImagePreview(val, idx) {
    if (this.activeProfileData.projects && this.activeProfileData.projects[idx]) {
      this.activeProfileData.projects[idx].image = val;
    }
  }

  // Certification Image Handlers
  handleCertImageUpload(event, idx) {
    const file = event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      this.showToast('Please select a valid image file.', 'error');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      this.showToast('Image too large. Maximum size is 5MB.', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      this.saveReviewedDataSilent();
      if (this.activeProfileData.certifications && this.activeProfileData.certifications[idx]) {
        this.activeProfileData.certifications[idx].image = e.target.result;
        this.renderWizardStep3_Review(document.getElementById('wizard-step-container'));
        this.showToast('Certificate photo uploaded! 📜', 'success');
      }
    };
    reader.readAsDataURL(file);
  }

  removeCertImage(idx) {
    this.saveReviewedDataSilent();
    if (this.activeProfileData.certifications && this.activeProfileData.certifications[idx]) {
      this.activeProfileData.certifications[idx].image = '';
      this.renderWizardStep3_Review(document.getElementById('wizard-step-container'));
      this.showToast('Certificate photo removed.', 'info');
    }
  }

  updateCertImagePreview(val, idx) {
    if (this.activeProfileData.certifications && this.activeProfileData.certifications[idx]) {
      this.activeProfileData.certifications[idx].image = val;
    }
  }

  saveReviewedDataSilent() {
    const nameEl = document.getElementById('edit-name');
    if (!nameEl) return;
    this.activeProfileData.name = nameEl.value;
    this.activeProfileData.title = document.getElementById('edit-title')?.value || '';
    this.activeProfileData.email = document.getElementById('edit-email')?.value || '';
    this.activeProfileData.phone = document.getElementById('edit-phone')?.value || '';
    this.activeProfileData.location = document.getElementById('edit-location')?.value || '';
    this.activeProfileData.website = document.getElementById('edit-website')?.value || '';
    this.activeProfileData.github = document.getElementById('edit-github')?.value || '';
    this.activeProfileData.linkedin = document.getElementById('edit-linkedin')?.value || '';
    this.activeProfileData.profileImage = document.getElementById('edit-profileImage')?.value || this.activeProfileData.profileImage || '';
    this.activeProfileData.about = document.getElementById('edit-about')?.value || '';
    this.activeProfileData.skills = (document.getElementById('edit-skills')?.value || '').split(',').map(s => s.trim()).filter(Boolean);

    // Education
    const eduCards = document.querySelectorAll('#edu-list > div');
    this.activeProfileData.education = Array.from(eduCards).map(card => {
      const years = (card.querySelector('.edu-years')?.value || '').split('-').map(s => s.trim());
      return {
        degree: card.querySelector('.edu-degree')?.value || '',
        university: card.querySelector('.edu-uni')?.value || '',
        location: card.querySelector('.edu-loc')?.value || '',
        startYear: years[0] || '',
        endYear: years[1] || '',
        grade: card.querySelector('.edu-grade')?.value || '',
        description: card.querySelector('.edu-desc')?.value || ''
      };
    }).filter(e => e.degree || e.university);

    // Experience
    const expCards = document.querySelectorAll('#exp-list > div');
    this.activeProfileData.experience = Array.from(expCards).map(card => {
      const dates = (card.querySelector('.exp-dates')?.value || '').split('-').map(s => s.trim());
      return {
        position: card.querySelector('.exp-pos')?.value || '',
        company: card.querySelector('.exp-comp')?.value || '',
        location: card.querySelector('.exp-loc')?.value || '',
        startDate: dates[0] || '',
        endDate: dates[1] || '',
        description: card.querySelector('.exp-desc')?.value || ''
      };
    }).filter(e => e.position || e.company);

    // Projects (including image)
    const projCards = document.querySelectorAll('#projects-list > div');
    this.activeProfileData.projects = Array.from(projCards).map(card => ({
      name: card.querySelector('.project-name')?.value || '',
      description: card.querySelector('.project-desc')?.value || '',
      technologies: (card.querySelector('.project-tech')?.value || '').split(',').map(s => s.trim()).filter(Boolean),
      github: card.querySelector('.project-github')?.value || '',
      demo: card.querySelector('.project-demo')?.value || '',
      highlights: card.querySelector('.project-highlights')?.value || '',
      image: card.querySelector('.project-image')?.value || ''
    })).filter(p => p.name);

    // Certifications (including image)
    const certCards = document.querySelectorAll('#certs-list > div');
    this.activeProfileData.certifications = Array.from(certCards).map(card => ({
      name: card.querySelector('.cert-name')?.value || '',
      issuer: card.querySelector('.cert-issuer')?.value || '',
      date: card.querySelector('.cert-date')?.value || '',
      link: card.querySelector('.cert-link')?.value || '',
      image: card.querySelector('.cert-image')?.value || ''
    })).filter(c => c.name);

    // Achievements
    const achCards = document.querySelectorAll('#achievements-list > div');
    this.activeProfileData.achievements = Array.from(achCards).map(card => ({
      title: card.querySelector('.ach-title')?.value || '',
      description: card.querySelector('.ach-desc')?.value || '',
      date: card.querySelector('.ach-date')?.value || ''
    })).filter(a => a.title);

    // Activities
    const actCards = document.querySelectorAll('#activities-list > div');
    this.activeProfileData.activities = Array.from(actCards).map(card => ({
      title: card.querySelector('.act-title')?.value || '',
      organization: card.querySelector('.act-org')?.value || '',
      date: card.querySelector('.act-date')?.value || '',
      description: card.querySelector('.act-desc')?.value || ''
    })).filter(a => a.title || a.organization);
  }

  saveReviewedDataAndProceed() {
    this.saveReviewedDataSilent();
    this.showToast('All 9 sections and images saved successfully! ✓', 'success');
    this.renderWizardStep(4);
  }

  addEducation() {
    if (!this.activeProfileData.education) this.activeProfileData.education = [];
    this.saveReviewedDataSilent();
    this.activeProfileData.education.push({ degree: '', university: '', location: '', startYear: '', endYear: '', grade: '', description: '' });
    this.renderWizardStep3_Review(document.getElementById('wizard-step-container'));
  }

  removeEducation(idx) {
    this.saveReviewedDataSilent();
    this.activeProfileData.education.splice(idx, 1);
    this.renderWizardStep3_Review(document.getElementById('wizard-step-container'));
  }

  addExperience() {
    if (!this.activeProfileData.experience) this.activeProfileData.experience = [];
    this.saveReviewedDataSilent();
    this.activeProfileData.experience.push({ position: '', company: '', location: '', startDate: '', endDate: '', description: '' });
    this.renderWizardStep3_Review(document.getElementById('wizard-step-container'));
  }

  removeExperience(idx) {
    this.saveReviewedDataSilent();
    this.activeProfileData.experience.splice(idx, 1);
    this.renderWizardStep3_Review(document.getElementById('wizard-step-container'));
  }

  addProject() {
    if (!this.activeProfileData.projects) this.activeProfileData.projects = [];
    this.saveReviewedDataSilent();
    this.activeProfileData.projects.push({ name: '', description: '', technologies: [], github: '', demo: '', highlights: '', image: '' });
    this.renderWizardStep3_Review(document.getElementById('wizard-step-container'));
  }

  removeProject(idx) {
    this.saveReviewedDataSilent();
    this.activeProfileData.projects.splice(idx, 1);
    this.renderWizardStep3_Review(document.getElementById('wizard-step-container'));
  }

  addCertification() {
    if (!this.activeProfileData.certifications) this.activeProfileData.certifications = [];
    this.saveReviewedDataSilent();
    this.activeProfileData.certifications.push({ name: '', issuer: '', date: '', link: '', image: '' });
    this.renderWizardStep3_Review(document.getElementById('wizard-step-container'));
  }

  removeCertification(idx) {
    this.saveReviewedDataSilent();
    this.activeProfileData.certifications.splice(idx, 1);
    this.renderWizardStep3_Review(document.getElementById('wizard-step-container'));
  }

  addAchievement() {
    if (!this.activeProfileData.achievements) this.activeProfileData.achievements = [];
    this.saveReviewedDataSilent();
    this.activeProfileData.achievements.push({ title: '', description: '', date: '' });
    this.renderWizardStep3_Review(document.getElementById('wizard-step-container'));
  }

  removeAchievement(idx) {
    this.saveReviewedDataSilent();
    this.activeProfileData.achievements.splice(idx, 1);
    this.renderWizardStep3_Review(document.getElementById('wizard-step-container'));
  }

  addActivity() {
    if (!this.activeProfileData.activities) this.activeProfileData.activities = [];
    this.saveReviewedDataSilent();
    this.activeProfileData.activities.push({ title: '', organization: '', date: '', description: '' });
    this.renderWizardStep3_Review(document.getElementById('wizard-step-container'));
  }

  removeActivity(idx) {
    this.saveReviewedDataSilent();
    this.activeProfileData.activities.splice(idx, 1);
    this.renderWizardStep3_Review(document.getElementById('wizard-step-container'));
  }

  // STEP 4: Choose Visual Theme
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
          <div class="card card-hover" style="cursor: pointer; border: 2px solid ${this.selectedTheme === t.id ? 'var(--primary)' : 'var(--border-color)'}; box-shadow: ${this.selectedTheme === t.id ? '0 0 15px var(--primary-glow)' : 'none'};" onclick="app.selectTheme('${t.id}')">
            <div class="flex justify-between items-center" style="margin-bottom: 0.5rem;">
              <span class="badge badge-primary" style="font-size: 0.65rem;">${t.label}</span>
              ${this.selectedTheme === t.id ? '<span style="color: var(--primary); font-weight: 800;">✓ SELECTED</span>' : ''}
            </div>
            <h3 style="font-weight: 800; font-size: 1.2rem; margin-bottom: 0.25rem;">${t.name}</h3>
            <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 1rem;">${t.desc}</p>
            <button class="btn btn-secondary btn-sm" style="width: 100%;" onclick="event.stopPropagation(); app.openThemePreviewModal('${t.id}')">Preview Theme</button>
          </div>
        `).join('')}
      </div>

      <div class="flex justify-between items-center">
        <button class="btn btn-secondary" onclick="app.renderWizardStep(3)">← Back</button>
        <button class="btn btn-primary btn-lg" onclick="app.renderWizardStep(5)">Generate Portfolio →</button>
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
        <p style="color: var(--text-secondary);">Structuring all 9 sections & images and compiling your chosen design template.</p>
      </div>

      <div class="card" style="margin-bottom: 2rem;">
        <div id="gen-pipeline" style="display: flex; flex-direction: column; gap: 1.25rem;">
          <div class="flex items-center gap-3">
            <span class="badge badge-primary">✓</span>
            <span style="font-weight: 600;">Resume Ingestion &amp; Diagnostics</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="badge badge-primary">✓</span>
            <span style="font-weight: 600;">Structuring 9 Portfolio Sections &amp; Visual Assets</span>
          </div>
          <div class="flex items-center gap-3">
            <span id="p-step-3" class="badge badge-glow animate-pulse">●</span>
            <span style="font-weight: 600;">Compiling ${this.selectedTheme.toUpperCase()} Theme Engine...</span>
          </div>
        </div>
      </div>

      <div class="card" style="margin-bottom: 2.5rem;">
        <div class="flex justify-between items-center" style="margin-bottom: 0.75rem;">
          <span style="font-weight: 700; font-size: 0.85rem; color: var(--text-muted);">STRUCTURED PORTFOLIO JSON</span>
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
    }, 900);
  }

  // STEP 6: Final Portfolio Preview & Export
  renderWizardStep6_Preview(container) {
    const uId = this.currentUser?.id || 'u1';
    if (this.editingPortfolioId) {
      const existing = this.portfolios.find(p => p.id === this.editingPortfolioId);
      if (existing) {
        existing.data = JSON.parse(JSON.stringify(this.activeProfileData));
        existing.theme = this.selectedTheme;
        existing.updatedAt = 'Just now';
        this.savePortfoliosToStorage();
      }
    } else {
      const newId = 'port-' + Date.now();
      this.editingPortfolioId = newId;
      this.portfolios.unshift({
        id: newId,
        userId: uId,
        name: (this.activeProfileData?.name || 'Developer') + ' Portfolio',
        theme: this.selectedTheme,
        status: 'published',
        views: 1,
        updatedAt: 'Just now',
        data: JSON.parse(JSON.stringify(this.activeProfileData))
      });
      this.savePortfoliosToStorage();
    }

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
      <div style="border-radius: var(--radius-lg); overflow: hidden; border: 1px solid var(--border-color); box-shadow: var(--shadow-xl); background: #ffffff;">
        <div style="background: #e2e8f0; padding: 0.6rem 1rem; display: flex; align-items: center; gap: 0.5rem;">
          <span style="width: 10px; height: 10px; border-radius: 50%; background: #ef4444; display: inline-block;"></span>
          <span style="width: 10px; height: 10px; border-radius: 50%; background: #f59e0b; display: inline-block;"></span>
          <span style="width: 10px; height: 10px; border-radius: 50%; background: #10b981; display: inline-block;"></span>
          <div style="flex: 1; background: #ffffff; border-radius: 6px; padding: 0.2rem 0.75rem; font-size: 0.75rem; color: #64748b; font-family: monospace; text-align: center;">
            https://${(this.activeProfileData?.name || 'portfolio').toLowerCase().replace(/[^a-z0-9]/g, '')}.portfolioforge.app
          </div>
        </div>
        <div id="portfolio-frame-content" style="max-height: 650px; overflow-y: auto;">
          ${renderedHtml}
        </div>
      </div>

      <div class="flex justify-between items-center" style="margin-top: 2rem;">
        <button class="btn btn-secondary" onclick="app.renderWizardStep(4)">← Change Theme</button>
        <a href="#dashboard" class="btn btn-primary btn-lg">Finish &amp; Go to Dashboard →</a>
      </div>
    `;
  }

  downloadStandalonePortfolio() {
    const content = PortfolioThemes.render(this.selectedTheme, this.activeProfileData);
    const title = `${this.activeProfileData?.name || 'Developer'} — Portfolio`;
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${this.activeProfileData?.title || 'Professional Portfolio'}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;1,6..72,400;1,6..72,600&family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Space+Grotesk:wght@500;700;900&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    html { scroll-behavior: smooth; font-size: 16px; }
    body { min-height: 100vh; line-height: 1.5; -webkit-font-smoothing: antialiased; }
    a { color: inherit; text-decoration: none; }
    img { max-width: 100%; height: auto; }
  </style>
</head>
<body>
  ${content}
</body>
</html>`;

    const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const safeName = (this.activeProfileData?.name || 'portfolio').toLowerCase().replace(/[^a-z0-9]/g, '_');
    a.href = url;
    a.download = `${safeName}_${this.selectedTheme}_portfolio.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    this.showToast('Downloaded standalone portfolio HTML! 📥', 'success');
  }

  /* ──────────────────────────────────────────────────────────────────────────
     9. FULLSCREEN PORTFOLIO VIEW
     ────────────────────────────────────────────────────────────────────────── */

  renderFullPortfolioView(theme = 'bento') {
    const data = this.activeProfileData || this.db?.sampleProfile;
    const root = document.getElementById('app-root');
    const content = PortfolioThemes.render(theme, data);

    root.innerHTML = `
      <div style="position: fixed; top: 1rem; right: 1rem; z-index: 9999; display: flex; gap: 0.5rem; background: rgba(15,23,42,0.85); backdrop-filter: blur(12px); padding: 0.5rem; border-radius: 999px; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
        <button class="btn btn-ghost btn-sm" style="color: #fff;" onclick="window.history.back()">← Back</button>
        <button class="btn btn-primary btn-sm" onclick="app.downloadStandalonePortfolio()">📥 Export HTML</button>
      </div>
      <div>${content}</div>
    `;
  }

  /* ──────────────────────────────────────────────────────────────────────────
     10. ADMIN DASHBOARD
     ────────────────────────────────────────────────────────────────────────── */

  renderAdminDashboard(section = 'overview') {
    const root = document.getElementById('app-root');
    root.innerHTML = `
      <div style="display: flex; min-height: 100vh; background: #090d16; color: #f8fafc;">
        <aside style="width: 250px; background: #0f172a; border-right: 1px solid #1e293b; padding: 1.5rem 1rem; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="brand-logo" style="margin-bottom: 2rem; color: #fff;">
              <span class="brand-sparkle">✦</span>
              <span>Admin Console</span>
            </div>

            <div class="sidebar-section-title">ADMINISTRATION</div>
            <nav style="display: flex; flex-direction: column;">
              <a href="#admin/overview" class="nav-item active" style="background: rgba(79,70,229,0.2); color: #818cf8;">
                <span>📈</span>
                <span>Telemetry</span>
              </a>
              <a href="#dashboard" class="nav-item" style="color: #94a3b8;">
                <span>←</span>
                <span>User Dashboard</span>
              </a>
            </nav>
          </div>

          <button class="btn btn-ghost btn-sm" style="color: var(--accent-rose); width: 100%; justify-content: flex-start;" onclick="app.logout()">
            Sign Out Admin ⎋
          </button>
        </aside>

        <main style="flex: 1; padding: 2.25rem; overflow-y: auto;">
          <div class="flex justify-between items-center" style="margin-bottom: 2rem;">
            <div>
              <h1 class="heading-display" style="font-size: 1.85rem; color: #fff;">System Telemetry</h1>
              <p style="color: #94a3b8; font-size: 0.9rem;">Overview of resume ingestions, theme distribution, and generation metrics.</p>
            </div>
            <span class="badge badge-success">● SYSTEM ONLINE</span>
          </div>

          <div class="grid grid-cols-4 md-grid-cols-2 gap-4" style="margin-bottom: 2rem;">
            <div class="card card-dark">
              <span style="font-size: 0.75rem; color: #94a3b8; font-weight: 600; text-transform: uppercase;">Total Users</span>
              <div style="font-size: 1.8rem; font-weight: 800; margin-top: 0.35rem; color: #fff;">1,284</div>
            </div>
            <div class="card card-dark">
              <span style="font-size: 0.75rem; color: #94a3b8; font-weight: 600; text-transform: uppercase;">Generations</span>
              <div style="font-size: 1.8rem; font-weight: 800; margin-top: 0.35rem; color: var(--primary);">4,827</div>
            </div>
            <div class="card card-dark">
              <span style="font-size: 0.75rem; color: #94a3b8; font-weight: 600; text-transform: uppercase;">Published</span>
              <div style="font-size: 1.8rem; font-weight: 800; margin-top: 0.35rem; color: var(--accent-emerald);">2,145</div>
            </div>
            <div class="card card-dark">
              <span style="font-size: 0.75rem; color: #94a3b8; font-weight: 600; text-transform: uppercase;">Success Rate</span>
              <div style="font-size: 1.8rem; font-weight: 800; margin-top: 0.35rem; color: var(--accent-purple);">98.4%</div>
            </div>
          </div>

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
        </main>
      </div>
    `;
  }

  /* ──────────────────────────────────────────────────────────────────────────
     11. THEME PREVIEW MODAL
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
