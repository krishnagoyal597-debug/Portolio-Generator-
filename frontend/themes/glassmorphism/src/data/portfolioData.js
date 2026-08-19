const portfolioData = {
  personal: {
    name: "Alex Sharma",
    brandName: "Alex.dev",
    headline: "Full Stack Developer",
    subHeadline: "Building Next-Generation Digital Experiences & AI Solutions",
    summary:
      "Passionate about creating beautiful, functional digital experiences using modern technologies and innovative solutions.",
    availability: "AVAILABLE FOR PROJECTS",
    location: "New Delhi, India",
    email: "alex.sharma@example.com",
    phone: "+91 98765 43210",
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    aboutBio:
      "I am a Full Stack Developer with a strong focus on modern web engineering, interactive visual aesthetics, and intelligent web applications. Over the past 5+ years, I have built products ranging from real-time analytics platforms to AI-driven mock interview bots. My passion lies at the intersection of design, code performance, and intuitive user experiences.",
    aboutHighlights: [
      { id: 1, title: "5+ Years", desc: "Crafting scalable web apps & interactive interfaces" },
      { id: 2, title: "50+ Projects", desc: "Delivered with precision and 100% client satisfaction" },
      { id: 3, title: "Modern Tech", desc: "React, Node.js, TypeScript, Python, and AI Workflows" },
      { id: 4, title: "UI/UX Focus", desc: "Specialized in Glassmorphism, animations & smooth interactions" }
    ],
    interests: ["Artificial Intelligence", "Web3 & Cloud", "Interactive 3D", "Open Source", "System Architecture"]
  },

  stats: [
    { id: 1, value: "5+", label: "Years Experience" },
    { id: 2, value: "50+", label: "Projects Completed" },
    { id: 3, value: "100%", label: "Client Satisfaction" },
    { id: 4, value: "25+", label: "Open Source Repos" }
  ],

  skills: [
    {
      category: "Frontend",
      items: [
        { name: "React", proficiency: 95, icon: "Code2", level: "Expert" },
        { name: "JavaScript (ES6+)", proficiency: 92, icon: "FileCode", level: "Expert" },
        { name: "TypeScript", proficiency: 88, icon: "FileJson", level: "Advanced" },
        { name: "HTML5 / CSS3", proficiency: 95, icon: "Layout", level: "Expert" },
        { name: "Tailwind CSS", proficiency: 94, icon: "Palette", level: "Expert" },
        { name: "Next.js", proficiency: 85, icon: "Globe", level: "Advanced" }
      ]
    },
    {
      category: "Backend",
      items: [
        { name: "Node.js", proficiency: 90, icon: "Server", level: "Expert" },
        { name: "Express.js", proficiency: 88, icon: "Cpu", level: "Advanced" },
        { name: "Python", proficiency: 86, icon: "Terminal", level: "Advanced" },
        { name: "Flask", proficiency: 82, icon: "Box", level: "Advanced" },
        { name: "PostgreSQL", proficiency: 80, icon: "Database", level: "Intermediate" },
        { name: "MongoDB", proficiency: 84, icon: "HardDrive", level: "Advanced" }
      ]
    },
    {
      category: "AI / ML",
      items: [
        { name: "Python AI Ecosystem", proficiency: 85, icon: "Sparkles", level: "Advanced" },
        { name: "Machine Learning", proficiency: 80, icon: "BrainCircuit", level: "Intermediate" },
        { name: "Pandas & NumPy", proficiency: 88, icon: "Binary", level: "Advanced" },
        { name: "LLM API Integration", proficiency: 90, icon: "Bot", level: "Expert" }
      ]
    },
    {
      category: "Tools",
      items: [
        { name: "Git & GitHub", proficiency: 95, icon: "GitBranch", level: "Expert" },
        { name: "Docker", proficiency: 78, icon: "Container", level: "Intermediate" },
        { name: "VS Code", proficiency: 98, icon: "Monitor", level: "Expert" },
        { name: "Vite / Webpack", proficiency: 90, icon: "Zap", level: "Advanced" },
        { name: "Figma", proficiency: 85, icon: "Figma", level: "Advanced" }
      ]
    }
  ],

  education: [
    {
      id: 1,
      degree: "B.Tech in Computer Science Engineering",
      institution: "GLA University",
      location: "Mathura, India",
      duration: "2024 - 2028",
      description:
        "Specializing in Software Engineering, Artificial Intelligence, Database Architectures, and Modern Web Application Development.",
      highlights: [
        "Head of Web Development Student Cell",
        "Top 5% Academic Ranking in Algorithms & Data Structures",
        "Led University Hackathon Team to National Finals"
      ]
    },
    {
      id: 2,
      degree: "Higher Secondary Education (PCM)",
      institution: "Delhi Public School",
      location: "New Delhi, India",
      duration: "2022 - 2024",
      description:
        "Graduated with Distinction in Physics, Chemistry, and Mathematics with a strong emphasis on Computer Science fundamentals.",
      highlights: [
        "President of High School Computer Science Club",
        "Winner of Regional Science & Tech Exhibition"
      ]
    }
  ],

  experience: [
    {
      id: 1,
      role: "Software Development Intern",
      company: "TechNova Solutions",
      duration: "May 2026 - July 2026",
      location: "Remote",
      type: "Internship",
      description:
        "Worked on core modern web applications and engineered reusable high-performance glassmorphism frontend component libraries.",
      responsibilities: [
        "Engineered 20+ accessible and reusable React glassmorphism UI components across multi-team projects.",
        "Integrated asynchronous microservice REST APIs, reducing initial page render payload by 35%.",
        "Collaborated with product designers to implement pixel-perfect responsive layouts and smooth micro-animations.",
        "Optimized frontend bundle size using code splitting, dynamic imports, and asset compression."
      ],
      technologies: ["React", "JavaScript", "Node.js", "Tailwind CSS", "Vite"]
    },
    {
      id: 2,
      role: "Frontend Engineer Contractor",
      company: "Apex Digital Labs",
      duration: "Jan 2026 - April 2026",
      location: "Hybrid",
      type: "Contract",
      description:
        "Designed and deployed interactive dashboard interfaces for client enterprise SaaS applications.",
      responsibilities: [
        "Developed dynamic analytics reporting charts using Canvas and SVG data rendering techniques.",
        "Implemented real-time client state management using custom hooks and context providers.",
        "Refactored legacy UI components to modern React 19 standards, improving web vital scores."
      ],
      technologies: ["React", "TypeScript", "Tailwind CSS", "Chart.js", "Git"]
    },
    {
      id: 3,
      role: "Open Source Contributor & Lead Developer",
      company: "Community Tech Initiative",
      duration: "2024 - Present",
      location: "Remote",
      type: "Open Source",
      description:
        "Actively building and maintaining open source developer utility tools and civic tech projects.",
      responsibilities: [
        "Maintained 5 popular GitHub repositories focused on glassmorphic web templates.",
        "Reviewed community pull requests and wrote technical documentation for incoming developers."
      ],
      technologies: ["JavaScript", "Python", "React", "Docker", "GitHub Actions"]
    }
  ],

  projects: [
    {
      id: 1,
      title: "Smart Bharat Platform",
      category: "AI / Full Stack",
      filterCategory: "AI / ML",
      description:
        "An AI-powered civic platform helping citizens discover government services and report local civic issues effortlessly.",
      longDescription:
        "Smart Bharat is a unified digital ecosystem designed to bridge the gap between citizens and public administration. Featuring intelligent search powered by NLP, real-time ticket tracking, and multi-language support, it simplifies how people interact with public infrastructure.",
      technologies: ["React", "Python", "Flask", "Tailwind CSS", "AI Engine"],
      features: [
        "Multilingual Conversational AI Assistant",
        "Geo-tagged Civic Issue Reporting with Image Verification",
        "Dynamic Eligibility Filter for Government Schemes",
        "Glassmorphic Interactive Dashboard"
      ],
      problem: "Citizens struggle with fragmented portals and complex bureaucratic processes when trying to access services or report local infrastructural issues.",
      solution: "Smart Bharat unifies services into a single intelligent glassmorphic interface with voice & text assistance, cutting down resolution times significantly.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      github: "https://github.com",
      live: "https://example.com"
    },
    {
      id: 2,
      title: "AI Interview Bot",
      category: "AI / Web",
      filterCategory: "AI / ML",
      description:
        "An interactive AI-powered platform for conducting realistic mock technical interviews and instant response feedback.",
      longDescription:
        "AI Interview Bot simulates real-time coding and architectural interviews. It listens to user voice responses, analyzes code submissions, and provides detailed rubrics on technical accuracy, communication skills, and areas for improvement.",
      technologies: ["Python", "Flask", "React", "Web Speech API", "SQLite"],
      features: [
        "Real-Time Speech-to-Text & Voice Synthesis",
        "Adaptive Technical Question Generator",
        "Instant Code Execution & Performance Feedback",
        "Detailed Skill Competency Matrix"
      ],
      problem: "Software candidates lack affordable, realistic practice environments to get objective feedback before high-stakes job interviews.",
      solution: "Built a realistic interactive interviewing simulator powered by smart evaluation prompts and comprehensive performance reporting.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
      github: "https://github.com",
      live: "https://example.com"
    },
    {
      id: 3,
      title: "Nexus Analytics Dashboard",
      category: "Web",
      filterCategory: "Web",
      description:
        "A high-performance responsive web dashboard for visualizing complex SaaS application metrics in real-time.",
      longDescription:
        "Nexus Analytics provides modern businesses with real-time telemetry, user behavior funnels, and revenue forecasting presented through custom translucent glass visuals and interactive charts.",
      technologies: ["React", "JavaScript", "Tailwind CSS", "Recharts", "Vite"],
      features: [
        "Interactive Charting with Custom Time Range Filters",
        "Live Data Stream Simulation & Notification Feed",
        "Dark Glassmorphic UI Theme with Customizable Widgets",
        "Exportable PDF & CSV Analytics Reports"
      ],
      problem: "Standard analytics software can be cluttered, rigid, and unpleasant to use during rapid daily data analysis.",
      solution: "Created a sleek, visually intuitive dashboard featuring modular glass cards, customizable key metric widgets, and smooth dataset filtering.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      github: "https://github.com",
      live: "https://example.com"
    },
    {
      id: 4,
      title: "Lumina Glass UI Kit",
      category: "Web",
      filterCategory: "Web",
      description:
        "A comprehensive frontend component library featuring frosted glass cards, glow effects, and micro-interactions.",
      longDescription:
        "Lumina Glass UI Kit offers developers an easy-to-use suite of glassmorphic React components optimized for accessibility, cross-browser backdrop filter consistency, and visual impact.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "CSS Modules"],
      features: [
        "40+ Pre-built Accessible Glass Components",
        "Built-in Cross-Browser Backdrop Blur Fallbacks",
        "Custom Tailwind Preset & Color Palette",
        "Interactive Documentation & Playground"
      ],
      problem: "Implementing glassmorphism reliably across different browsers requires verbose CSS fallbacks and complex layer stacking.",
      solution: "Encapsulated frosted glass aesthetics into clean, performant React components with zero configuration setup.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      github: "https://github.com",
      live: "https://example.com"
    },
    {
      id: 5,
      title: "DataPulse Metrics Engine",
      category: "Data",
      filterCategory: "Data",
      description:
        "An automated data processing pipeline and visualization engine for monitoring system resource utilization.",
      longDescription:
        "DataPulse aggregates telemetry logs from server nodes, analyzes memory & CPU consumption patterns, and alerts DevOps engineers to anomalous traffic spikes.",
      technologies: ["Python", "Pandas", "React", "Chart.js", "REST API"],
      features: [
        "Anomaly Detection Algorithm for High Load Spikes",
        "Real-Time Server Node Health Matrix",
        "Customizable Alert Threshold Controls",
        "Clean Low-Latency Data Stream Parsing"
      ],
      problem: "Engineers miss critical system outages due to noisy alert logs and lack of visual clarity during infrastructure incidents.",
      solution: "Engineered a visual metric aggregation panel that highlights critical server anomalies instantly using clear glass status cards.",
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80",
      github: "https://github.com",
      live: "https://example.com"
    },
    {
      id: 6,
      title: "Aura Neural Code Assistant",
      category: "AI / Full Stack",
      filterCategory: "Full Stack",
      description:
        "A contextual developer workspace extension that offers code explanations and auto-reformatting suggestions.",
      longDescription:
        "Aura acts as an intelligent pair programming companion inside the web browser. It analyzes code snippets, detects syntax flaws, and explains complex algorithm implementations.",
      technologies: ["React", "Node.js", "Python", "Tailwind CSS", "Monaco Editor"],
      features: [
        "Embedded Monaco Code Editor with Syntax Highlighting",
        "Contextual Bug Finder & Refactoring Hints",
        "Natural Language Code Explanation Panel",
        "One-Click Code Re-formatting"
      ],
      problem: "Developers lose context switching between documentation tabs and code editors when trying to debug complex errors.",
      solution: "Created an in-browser floating glass workspace with built-in code editor and instant automated code explanations.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      github: "https://github.com",
      live: "https://example.com"
    }
  ],

  achievements: [
    {
      id: 1,
      title: "Microsoft Certified: Azure Fundamentals",
      type: "Certification",
      organization: "Microsoft",
      year: "2026",
      description: "Demonstrated foundational knowledge of cloud services, security, privacy, compliance, and cloud architecture."
    },
    {
      id: 2,
      title: "Hackathon Finalist & Best UI Award",
      type: "Achievement",
      organization: "TECHNEX26 - IIT BHU",
      year: "2026",
      description: "Awarded top honor for designing and building an outstanding glassmorphism accessibility app within 36 hours."
    },
    {
      id: 3,
      title: "AI Project Showcase Winner",
      type: "Award",
      organization: "University Innovation Cell",
      year: "2026",
      description: "Recognized for building the Smart Bharat AI civic platform among 100+ competing student projects."
    },
    {
      id: 4,
      title: "Full Stack Web Development Certification",
      type: "Certification",
      organization: "FreeCodeCamp & Meta",
      year: "2025",
      description: "Completed 500+ hours of coursework in advanced React, JavaScript, and backend API engineering."
    }
  ],

  contact: {
    email: "alex.sharma@example.com",
    phone: "+91 98765 43210",
    location: "New Delhi, India",
    availability: "Open for Full-time Roles & High-Impact Contracts",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "mailto:alex.sharma@example.com"
    }
  }
};

export default portfolioData;
