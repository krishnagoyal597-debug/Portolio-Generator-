// ══════════════════════════════════════════════════════════════════════════════
// COMPREHENSIVE MOCK DATA — PortfolioForge
// ══════════════════════════════════════════════════════════════════════════════

// ─── Portfolio JSON structure (used by all 6 themes) ─────────────────────────
export const mockPortfolioJSON = {
  name: 'Anshika Bansal',
  title: 'Computer Science & AI Engineer',
  tagline: 'Building intelligent systems at the intersection of AI and software engineering.',
  profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400',
  email: 'anshika.bansal@email.com',
  phone: '+91 98765 43210',
  location: 'Delhi, India',
  linkedin: 'linkedin.com/in/anshikabansal',
  github: 'github.com/anshikabansal',
  website: 'anshikabansal.dev',
  about: "I'm a Computer Science engineer at Delhi Technological University specializing in AI/ML and full-stack development. I love building products that solve real problems — from intelligent resume analyzers to real-time collaborative tools. Currently seeking full-time roles in software engineering and applied AI.",
  skillGroups: [
    { category: 'Languages', skills: ['Python', 'Java', 'JavaScript', 'TypeScript', 'SQL', 'C++'] },
    { category: 'AI / ML', skills: ['TensorFlow', 'PyTorch', 'scikit-learn', 'Hugging Face', 'LangChain', 'YOLOv8'] },
    { category: 'Frontend', skills: ['React', 'Next.js', 'Tailwind CSS', 'HTML5', 'CSS3'] },
    { category: 'Backend', skills: ['FastAPI', 'Node.js', 'Express', 'Django', 'REST APIs'] },
    { category: 'Databases', skills: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Pinecone'] },
    { category: 'DevOps & Tools', skills: ['Docker', 'Git', 'AWS', 'Linux', 'Postman', 'Figma'] },
  ],
  skills: ['Python', 'Java', 'JavaScript', 'TypeScript', 'SQL', 'React', 'FastAPI', 'TensorFlow', 'PyTorch', 'Docker', 'AWS', 'PostgreSQL'],
  projects: [
    {
      id: 'p1', name: 'PortfolioForge', featured: true,
      description: 'AI-powered resume-to-portfolio generator. Parses plain-text resumes, uses Gemini to structure content, and generates six radically different HTML portfolios.',
      technologies: ['React', 'FastAPI', 'Gemini API', 'Python', 'Tailwind CSS'],
      github: 'github.com/anshikabansal/portfolioforge',
      demo: 'portfolioforge.vercel.app',
      highlights: '500+ portfolios generated · 6 unique themes',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=450',
    },
    {
      id: 'p2', name: 'SmartResume AI', featured: true,
      description: 'NLP-powered resume analyzer that extracts skills, detects missing sections, and generates personalized improvement recommendations using transformer models.',
      technologies: ['Python', 'Hugging Face', 'FastAPI', 'React', 'PostgreSQL'],
      github: 'github.com/anshikabansal/smartresume-ai',
      demo: 'smartresume-demo.vercel.app',
      highlights: '94% accuracy · 1,000+ resumes processed',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800&h=450',
    },
    {
      id: 'p3', name: 'CodeCollab',
      description: 'Real-time collaborative code editor with AI-powered code completion, syntax highlighting for 20+ languages, and live cursor tracking.',
      technologies: ['React', 'Node.js', 'Socket.io', 'Monaco Editor', 'Redis'],
      github: 'github.com/anshikabansal/codecollab',
      demo: 'codecollab.netlify.app',
      highlights: '50+ concurrent users · <100ms latency',
      image: null,
    },
    {
      id: 'p4', name: 'VisionGuard',
      description: 'Computer vision system for real-time industrial safety monitoring. Detects PPE compliance using YOLOv8 with live dashboard alerts.',
      technologies: ['Python', 'YOLOv8', 'OpenCV', 'FastAPI', 'React'],
      github: 'github.com/anshikabansal/visionguard',
      demo: '',
      highlights: '97.3% accuracy · Real-time detection',
      image: null,
    },
  ],
  education: [
    {
      id: 'e1',
      degree: 'B.Tech Computer Science (AI Specialization)',
      university: 'Delhi Technological University',
      location: 'Delhi, India',
      startYear: '2021',
      endYear: '2025',
      grade: 'CGPA: 8.7/10',
      description: 'Specialization in Artificial Intelligence and Machine Learning. Coursework: Data Structures, Algorithms, ML, Deep Learning, Computer Vision, NLP.',
    },
  ],
  experience: [
    {
      id: 'ex1',
      company: 'TechSolutions Pvt. Ltd.',
      position: 'Software Development Intern',
      location: 'Delhi, India',
      startDate: 'June 2024',
      endDate: 'August 2024',
      current: false,
      description: '• Developed RESTful APIs with FastAPI and integrated ML models for real-time predictions\n• Improved API response time by 35% through database query optimization\n• Built interactive dashboards with React and Recharts for data visualization\n• Collaborated with a 5-engineer team using Agile methodology',
    },
  ],
  certifications: [
    { id: 'c1', name: 'Google Data Analytics Professional Certificate', issuer: 'Google / Coursera', date: '2024', link: '' },
    { id: 'c2', name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', date: '2023', link: '' },
    { id: 'c3', name: 'TensorFlow Developer Certificate', issuer: 'Google', date: '2024', link: '' },
  ],
  achievements: [
    { id: 'a1', title: 'Smart India Hackathon 2024 — Finalist', description: 'Top 10 teams out of 50,000+ participants for AI-based agricultural solution.', date: '2024' },
    { id: 'a2', title: "Dean's List — 4 Consecutive Semesters", description: 'Maintained CGPA above 9.0 for four semesters.', date: '2022–2024' },
    { id: 'a3', title: 'Open Source Contributor — 50+ PRs Merged', description: 'Active contributor to TensorFlow and Hugging Face.', date: '2023–2024' },
  ],
};

// ─── Analysis result ──────────────────────────────────────────────────────────
export const mockAnalysisResult = {
  score: 72,
  sections: [
    { id: 'personal', label: 'Personal Information', status: 'complete', detail: 'All required fields present.' },
    { id: 'education', label: 'Education', status: 'complete', detail: 'Education details are well documented.' },
    { id: 'skills', label: 'Skills', status: 'warning', detail: 'Only 6 skills found. Consider expanding.' },
    { id: 'projects', label: 'Projects', status: 'missing', detail: 'No project information detected.' },
    { id: 'experience', label: 'Experience', status: 'warning', detail: 'Experience section is brief.' },
    { id: 'achievements', label: 'Achievements', status: 'missing', detail: 'No achievements detected.' },
    { id: 'certifications', label: 'Certifications', status: 'complete', detail: '2 certifications found.' },
  ],
  improvements: [
    { section: 'Projects', severity: 'missing', message: 'No project information detected.', recommendation: 'Add 2–3 projects including technologies used, your role, and measurable results.' },
    { section: 'Skills', severity: 'warning', message: 'Skills section is too short.', recommendation: 'Add languages, frameworks, databases, tools, and AI/ML technologies.' },
    { section: 'Achievements', severity: 'missing', message: 'No achievements or awards detected.', recommendation: 'Include hackathon wins, academic honors, or notable contributions.' },
  ],
};

// ─── Generated AI prompt ──────────────────────────────────────────────────────
export const mockGeneratedPrompt = `You are an expert portfolio content generator. Create a professional portfolio for the following candidate.

CANDIDATE INFORMATION:
Name: Anshika Bansal
Title: Computer Science & AI Engineer
Email: anshika.bansal@email.com
Location: Delhi, India
GitHub: github.com/anshikabansal
LinkedIn: linkedin.com/in/anshikabansal

EDUCATION:
- B.Tech Computer Science (AI Specialization)
  Delhi Technological University | 2021–2025 | CGPA: 8.7/10

SKILLS: Python, Java, JavaScript, TypeScript, React, FastAPI, TensorFlow, PyTorch...

PROJECTS:
1. PortfolioForge — AI-powered resume-to-portfolio generator
2. SmartResume AI — NLP resume analyzer
3. CodeCollab — Real-time collaborative code editor
4. VisionGuard — Computer vision safety system

INSTRUCTIONS:
Generate a structured JSON object for a professional developer portfolio containing:
- hero section (name, title, tagline, social links)
- about section (detailed bio, key highlights)
- skills organized by category
- featured projects with all details
- education timeline
- experience timeline
- certifications and achievements
- contact information

Return ONLY valid JSON. No explanation or markdown wrapping.`;

// ─── Generated JSON ───────────────────────────────────────────────────────────
export const mockGeneratedJSON = mockPortfolioJSON;

// ─── User portfolios ──────────────────────────────────────────────────────────
export const mockPortfolios = [
  {
    id: 'port-1', userId: 'u1',
    name: 'Developer Portfolio 2025',
    theme: 'bento', status: 'published',
    views: 847, updatedAt: 'Aug 15, 2026', createdAt: 'Aug 1, 2026',
    accentColor: '#4F46E5',
  },
  {
    id: 'port-2', userId: 'u1',
    name: 'Research Portfolio',
    theme: 'minimal', status: 'draft',
    views: 124, updatedAt: 'Aug 10, 2026', createdAt: 'Jul 28, 2026',
    accentColor: '#0D9488',
  },
  {
    id: 'port-3', userId: 'u1',
    name: 'Creative Showcase',
    theme: 'glassmorphic', status: 'draft',
    views: 0, updatedAt: 'Aug 5, 2026', createdAt: 'Aug 5, 2026',
    accentColor: '#7C3AED',
  },
  {
    id: 'port-4', userId: 'u1',
    name: 'Terminal Edition',
    theme: 'futuristic', status: 'published',
    views: 277, updatedAt: 'Jul 30, 2026', createdAt: 'Jul 20, 2026',
    accentColor: '#00ff88',
  },
];

// ─── Admin users ──────────────────────────────────────────────────────────────
export const mockAdminUsers = [
  { id: 'u1', name: 'Anshika Bansal', email: 'anshika@example.com', portfolios: 4, status: 'active', joined: 'Jan 15, 2024', lastActive: '2h ago', role: 'user' },
  { id: 'u2', name: 'Rahul Sharma', email: 'rahul@example.com', portfolios: 2, status: 'active', joined: 'Feb 3, 2024', lastActive: '1d ago', role: 'user' },
  { id: 'u3', name: 'Priya Singh', email: 'priya@example.com', portfolios: 1, status: 'active', joined: 'Mar 12, 2024', lastActive: '3d ago', role: 'user' },
  { id: 'u4', name: 'Arjun Kumar', email: 'arjun@example.com', portfolios: 3, status: 'suspended', joined: 'Apr 1, 2024', lastActive: '2w ago', role: 'user' },
  { id: 'u5', name: 'Sneha Patel', email: 'sneha@example.com', portfolios: 0, status: 'active', joined: 'Apr 22, 2024', lastActive: '5m ago', role: 'user' },
  { id: 'u6', name: 'Dev Mehta', email: 'dev@example.com', portfolios: 2, status: 'active', joined: 'May 8, 2024', lastActive: '30m ago', role: 'user' },
  { id: 'u7', name: 'Kavita Nair', email: 'kavita@example.com', portfolios: 5, status: 'active', joined: 'May 20, 2024', lastActive: 'Just now', role: 'user' },
  { id: 'u8', name: 'Aman Verma', email: 'aman@example.com', portfolios: 1, status: 'suspended', joined: 'Jun 1, 2024', lastActive: '1w ago', role: 'user' },
];

export const mockAdminPortfolios = [
  { id: 'ap1', name: 'Developer Portfolio 2025', owner: 'Anshika Bansal', theme: 'bento', status: 'published', views: 847, created: 'Aug 1, 2026', updated: 'Aug 15, 2026' },
  { id: 'ap2', name: 'Research Portfolio', owner: 'Anshika Bansal', theme: 'minimal', status: 'draft', views: 124, created: 'Jul 28, 2026', updated: 'Aug 10, 2026' },
  { id: 'ap3', name: 'Rahul Dev Portfolio', owner: 'Rahul Sharma', theme: 'futuristic', status: 'published', views: 412, created: 'Jul 15, 2026', updated: 'Aug 8, 2026' },
  { id: 'ap4', name: 'Creative Portfolio', owner: 'Priya Singh', theme: 'glassmorphic', status: 'draft', views: 0, created: 'Aug 5, 2026', updated: 'Aug 5, 2026' },
  { id: 'ap5', name: 'Brutalist Showcase', owner: 'Arjun Kumar', theme: 'brutalist', status: 'published', views: 198, created: 'Jun 20, 2026', updated: 'Jul 30, 2026' },
  { id: 'ap6', name: 'Spatial Experience', owner: 'Dev Mehta', theme: 'spatial', status: 'published', views: 321, created: 'Jul 10, 2026', updated: 'Aug 12, 2026' },
];

// ─── Admin stats ──────────────────────────────────────────────────────────────
export const mockAdminStats = {
  totalUsers: 1284,
  totalPortfolios: 3492,
  published: 2145,
  aiGenerations: 4827,
  avgScore: 68,
  successRate: 94.2,
  activeToday: 247,
  newThisWeek: 83,
};

// ─── Analytics data ───────────────────────────────────────────────────────────
const generateDailyData = (days, baseUsers, baseGenerations) =>
  Array.from({ length: days }, (_, i) => ({
    date: new Date(Date.now() - (days - i - 1) * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    users: Math.floor(baseUsers + Math.random() * 40 - 10),
    generations: Math.floor(baseGenerations + Math.random() * 60 - 15),
    portfolios: Math.floor(baseGenerations * 0.7 + Math.random() * 30),
  }));

export const mockAnalyticsData = {
  week: generateDailyData(7, 35, 80),
  month: generateDailyData(30, 42, 95),
  year: generateDailyData(12, 200, 400),
};

export const mockThemePopularity = [
  { name: 'Bento Grid', value: 28, color: '#4f46e5' },
  { name: 'Minimal', value: 22, color: '#0d9488' },
  { name: 'Glassmorphic', value: 18, color: '#7c3aed' },
  { name: 'Spatial', value: 14, color: '#0ea5e9' },
  { name: 'Brutalist', value: 11, color: '#f59e0b' },
  { name: 'Futuristic', value: 7, color: '#10b981' },
];

// ─── Resume text ──────────────────────────────────────────────────────────────
export const mockResumeText = `ANSHIKA BANSAL
Computer Science & AI Engineer
Email: anshika.bansal@email.com | Phone: +91 98765 43210
Location: Delhi, India | GitHub: github.com/anshikabansal

EDUCATION
B.Tech Computer Science (AI Specialization)
Delhi Technological University, Delhi | 2021–2025 | CGPA: 8.7/10

SKILLS
Python, Java, JavaScript, SQL

EXPERIENCE
Software Development Intern | TechSolutions Pvt. Ltd. | June–August 2024
- Developed RESTful APIs using FastAPI
- Improved performance by 35%

CERTIFICATIONS
- Google Data Analytics (2024)
- AWS Cloud Practitioner (2023)
`;

// ─── Personal info defaults ───────────────────────────────────────────────────
export const mockPersonalInfo = {
  name: 'Anshika Bansal',
  title: 'Computer Science & AI Engineer',
  email: 'anshika.bansal@email.com',
  phone: '+91 98765 43210',
  location: 'Delhi, India',
  linkedin: 'linkedin.com/in/anshikabansal',
  github: 'github.com/anshikabansal',
  website: 'anshikabansal.dev',
  summary: 'Passionate Computer Science engineer specializing in Artificial Intelligence and full-stack development. Experience building intelligent applications using Python, Java, and modern web technologies.',
};

export const THEMES = [
  { id: 'brutalist', name: 'Brutalist', label: 'RAW / EXPRESSIVE', desc: 'Bold typography, thick borders, high-contrast editorial layout', tags: ['Expressive', 'High Contrast', 'Artistic'], color: '#000000', dark: false },
  { id: 'bento', name: 'Bento Grid', label: 'MODULAR / ORGANIZED', desc: 'Clean modular grid layout with rounded cards and visual hierarchy', tags: ['Modern', 'Organized', 'Clean'], color: '#4F46E5', dark: false },
  { id: 'minimal', name: 'Minimal Editorial', label: 'MINIMAL / REFINED', desc: 'Sophisticated typography, generous whitespace, magazine-like', tags: ['Minimal', 'Elegant', 'Typography'], color: '#1a1a1a', dark: false },
  { id: 'spatial', name: 'Spatial UI', label: 'SPATIAL / IMMERSIVE', desc: 'Layered cards with depth, floating elements, and spatial composition', tags: ['Spatial', 'Immersive', 'Depth'], color: '#0EA5E9', dark: false },
  { id: 'glassmorphic', name: 'Glassmorphic', label: 'GLASS / FUTURE', desc: 'Glass panels, blur effects, gradient lighting on dark backgrounds', tags: ['Dark', 'Visual', 'Glass'], color: '#7C3AED', dark: true },
  { id: 'futuristic', name: 'Futuristic Terminal', label: 'SYSTEM / FUTURE', desc: 'Developer terminal aesthetic with monospace typography and neon accents', tags: ['Developer', 'Dark', 'Experimental'], color: '#00ff88', dark: true },
];
