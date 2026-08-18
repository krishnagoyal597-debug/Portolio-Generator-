const portfolioData = {
  personal: {
    name: "Aarav Sharma",
    headline: "Full Stack Developer & AI Enthusiast",
    availability: "Available for Projects",
    summary:
      "I build beautiful, functional, and high-performance web applications using modern technologies with a focus on clean interfaces, intuitive user experiences, and robust frontend architecture.",
    location: "New Delhi, India",
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400",
    resumeUrl: "#",
  },

  skills: [
    {
      category: "Frontend",
      items: [
        "React",
        "JavaScript",
        "TypeScript",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "Next.js",
        "Redux Toolkit"
      ]
    },
    {
      category: "Backend",
      items: [
        "Node.js",
        "Express",
        "Python",
        "Flask",
        "REST APIs",
        "PostgreSQL",
        "MongoDB"
      ]
    },
    {
      category: "AI / ML",
      items: [
        "Python",
        "Machine Learning",
        "Pandas",
        "NumPy",
        "OpenAI API",
        "LangChain",
        "TensorFlow"
      ]
    },
    {
      category: "Tools",
      items: [
        "Git",
        "GitHub",
        "Docker",
        "VS Code",
        "Postman",
        "Vite",
        "Figma"
      ]
    }
  ],

  education: [
    {
      degree: "B.Tech in Computer Science Engineering",
      institution: "GLA University",
      location: "Mathura, India",
      duration: "2024 — 2028",
      description:
        "Focused on software engineering principles, algorithm design, artificial intelligence, relational databases, and modern web application development. Active lead at University Developer Student Club."
    },
    {
      degree: "Senior Secondary Education (CBSE)",
      institution: "Delhi Public School",
      location: "New Delhi, India",
      duration: "2022 — 2024",
      description:
        "Specialized in Physics, Chemistry, and Mathematics with Computer Science. Graduated with distinction."
    }
  ],

  experience: [
    {
      id: 1,
      role: "Software Development Intern",
      company: "TechNova Solutions",
      duration: "May 2026 — July 2026",
      location: "Remote",
      description:
        "Worked on core frontend web applications and built reusable UI component library used across multiple client products.",
      responsibilities: [
        "Built responsive React interfaces supporting light and dark themes",
        "Created reusable design system components with Tailwind CSS",
        "Integrated client-side state management and REST APIs",
        "Improved UI page load performance and accessibility scores by 25%"
      ],
      technologies: [
        "React",
        "JavaScript",
        "Tailwind CSS",
        "Node.js",
        "Git"
      ]
    },
    {
      id: 2,
      role: "Frontend Developer Contributor",
      company: "OpenSource Collective",
      duration: "Jan 2026 — Present",
      location: "Remote",
      description:
        "Contributing to developer-centric web tools and open-source UI libraries.",
      responsibilities: [
        "Developed accessible modal drawers, tab bar controls, and form validators",
        "Reviewed community pull requests and wrote automated unit tests",
        "Optimized bundle size and component lifecycle rendering performance"
      ],
      technologies: [
        "TypeScript",
        "React",
        "Vite",
        "Tailwind CSS"
      ]
    }
  ],

  projects: [
    {
      id: 1,
      title: "Smart Bharat",
      category: "AI / Full Stack",
      filterCategory: "AI / ML",
      description:
        "An AI-powered civic platform designed to help citizens discover government services, translate notices in real-time, and report localized civic issues seamlessly.",
      technologies: [
        "React",
        "Python",
        "Flask",
        "Tailwind CSS",
        "OpenAI API"
      ],
      features: [
        "AI Assistant for public policy guidance",
        "Multilingual interface with dynamic language translation",
        "Geo-tagged civic issue reporting dashboard",
        "Real-time analytics and ticket status tracking"
      ],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200&h=800",
      github: "https://github.com/aaravsharma/smart-bharat",
      live: "https://smartbharat-demo.netlify.app"
    },
    {
      id: 2,
      title: "AI Interview Bot",
      category: "AI / Web",
      filterCategory: "AI / ML",
      description:
        "An interactive AI-powered mock interview platform designed to help candidates practice technical interviews with real-time feedback and voice evaluation.",
      technologies: [
        "Python",
        "Flask",
        "React",
        "Web Speech API",
        "SQLite"
      ],
      features: [
        "Contextual AI interview question generator",
        "Real-time voice-to-text response parsing",
        "Comprehensive candidate evaluation scorecard",
        "Detailed performance insights and improvement feedback"
      ],
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200&h=800",
      github: "https://github.com/aaravsharma/ai-interview-bot",
      live: "https://ai-interviewbot.vercel.app"
    },
    {
      id: 3,
      title: "Analytics Dashboard",
      category: "Web",
      filterCategory: "WEB",
      description:
        "A sleek, high-performance analytics interface for visualizing business, user engagement, and web application performance metrics.",
      technologies: [
        "React",
        "JavaScript",
        "Recharts",
        "Tailwind CSS",
        "Vite"
      ],
      features: [
        "Interactive real-time data charts and graphs",
        "Customizable data filters and date range selectors",
        "Fully responsive layout optimized for all screen sizes",
        "Exportable PDF & CSV reporting utilities"
      ],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200&h=800",
      github: "https://github.com/aaravsharma/analytics-dashboard",
      live: "https://analytics-dash-minimal.vercel.app"
    },
    {
      id: 4,
      title: "DevPulse Workspace",
      category: "Full Stack",
      filterCategory: "FULL STACK",
      description:
        "A minimal developer workspace tool for managing code snippets, project notes, and daily task priorities in one minimalist dashboard.",
      technologies: [
        "React",
        "Node.js",
        "Express",
        "Tailwind CSS",
        "MongoDB"
      ],
      features: [
        "Markdown preview editor with syntax highlighting",
        "Instant search and tag-based snippet organizing",
        "Keyboard shortcut navigation system",
        "Offline local storage fallback mode"
      ],
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200&h=800",
      github: "https://github.com/aaravsharma/devpulse-workspace",
      live: "https://devpulse-app.vercel.app"
    }
  ],

  achievements: [
    {
      id: 1,
      title: "Microsoft Azure Fundamentals",
      type: "Certification",
      organization: "Microsoft",
      year: "2026",
      credentialUrl: "#"
    },
    {
      id: 2,
      title: "Hackathon Finalist",
      type: "Achievement",
      organization: "TECHNEX26 — IIT BHU",
      year: "2026",
      credentialUrl: "#"
    },
    {
      id: 3,
      title: "AI Project Showcase Winner",
      type: "Award",
      organization: "University Innovation Cell",
      year: "2026",
      credentialUrl: "#"
    },
    {
      id: 4,
      title: "Google Cloud Skill Boost Badge",
      type: "Certification",
      organization: "Google Cloud",
      year: "2025",
      credentialUrl: "#"
    }
  ],

  contact: {
    email: "aarav.sharma@example.com",
    phone: "+91 98765 43210",
    location: "New Delhi, India",
    linkedin: "https://linkedin.com/in/aaravsharma-dev",
    github: "https://github.com/aaravsharma",
    twitter: "https://twitter.com/aaravsharma_dev"
  }
};

export default portfolioData;
