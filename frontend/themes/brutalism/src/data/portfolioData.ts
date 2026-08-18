import type { PortfolioData } from '../types/portfolio';

const portfolioData: PortfolioData = {
  personal: {
    name: "Aarav Sharma",
    headline: "FULL STACK DEVELOPER & AI ENTHUSIAST",
    summary: "Computer Science undergraduate passionate about building modern web applications and AI-powered solutions. Experienced in developing responsive interfaces, backend systems, and intelligent applications using modern technologies.",
    location: "New Delhi, India",
    profileImage: "/images/avatar.png",
    badges: [
      "AVAILABLE FOR INTERNSHIPS",
      "BASED IN INDIA",
      "OPEN TO COLLABORATION"
    ]
  },

  skills: [
    {
      category: "PROGRAMMING",
      title: "Programming Languages",
      color: "#FFE600",
      skills: [
        { name: "Java", level: 90 },
        { name: "Python", level: 92 },
        { name: "JavaScript", level: 88 },
        { name: "C++", level: 80 }
      ]
    },
    {
      category: "FRONTEND",
      title: "Frontend Engineering",
      color: "#00F0FF",
      skills: [
        { name: "HTML5", level: 95 },
        { name: "CSS3 / SASS", level: 90 },
        { name: "React.js", level: 88 },
        { name: "Tailwind CSS", level: 92 }
      ]
    },
    {
      category: "BACKEND",
      title: "Backend & Systems",
      color: "#FF597B",
      skills: [
        { name: "Node.js", level: 85 },
        { name: "Express.js", level: 86 },
        { name: "Flask", level: 82 }
      ]
    },
    {
      category: "DATABASE",
      title: "Databases & Storage",
      color: "#FF9F29",
      skills: [
        { name: "MySQL", level: 84 },
        { name: "MongoDB", level: 80 },
        { name: "SQLite", level: 88 }
      ]
    },
    {
      category: "AI / ML",
      title: "Artificial Intelligence",
      color: "#9D4EDD",
      skills: [
        { name: "Machine Learning", level: 82 },
        { name: "Generative AI", level: 85 },
        { name: "NLP", level: 78 },
        { name: "Data Analysis", level: 84 }
      ]
    },
    {
      category: "TOOLS",
      title: "Tools & Workflows",
      color: "#CCFF00",
      skills: [
        { name: "Git", level: 90 },
        { name: "GitHub", level: 92 },
        { name: "VS Code", level: 95 },
        { name: "Figma", level: 80 }
      ]
    }
  ],

  education: [
    {
      id: "edu-1",
      degree: "B.Tech — Computer Science Engineering",
      institution: "GLA University, Mathura",
      duration: "2024 – 2028",
      gpaOrScore: "CGPA: 8.7 / 10",
      description: "Focusing on core Computer Science topics including Data Structures, Algorithms, Artificial Intelligence, Database Management Systems, and Web Engineering.",
      isHighlighted: true
    },
    {
      id: "edu-2",
      degree: "Senior Secondary Education (Class XII)",
      institution: "ABC Public School",
      duration: "2024",
      gpaOrScore: "Percentage: 91%",
      description: "Completed CBSE Senior Secondary curriculum with major focus on Physics, Chemistry, Mathematics, and Computer Science.",
      isHighlighted: false
    }
  ],

  experience: [
    {
      id: "exp-1",
      role: "Frontend Development Intern",
      company: "TechNova Solutions",
      duration: "June 2026 – August 2026",
      location: "Remote / Gurgaon",
      responsibilities: [
        "Developed responsive and accessible React interfaces adhering to modern UI design systems.",
        "Created a modular library of reusable components, speeding up feature delivery by 25%.",
        "Improved website responsiveness across mobile and tablet viewports.",
        "Collaborated with backend developers to integrate RESTful API endpoints securely.",
        "Integrated client-side state management and error handling routines."
      ],
      technologies: ["React", "JavaScript", "Tailwind CSS", "REST API", "Git"]
    },
    {
      id: "exp-2",
      role: "Web Development Intern",
      company: "CodeCraft Labs",
      duration: "May 2025 – July 2025",
      location: "New Delhi, India",
      responsibilities: [
        "Built responsive client-facing web pages from Figma designs.",
        "Worked extensively with HTML5, CSS3, and modern JavaScript ES6+ features.",
        "Fixed cross-browser UI rendering bugs and layout shifts.",
        "Implemented interactive components including drop-down menus, carousels, and forms."
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "Figma", "Git"]
    }
  ],

  projects: [
    {
      id: 1,
      projectNumber: "01",
      title: "AI Interview Bot",
      category: "AI / ML",
      description: "An intelligent AI-powered interview platform that conducts automated technical interviews, evaluates candidate responses in real-time, and generates structured feedback reports.",
      technologies: ["Python", "Flask", "SQLite", "AI / LLM", "HTML5", "CSS3"],
      features: [
        "Dynamic AI Question Generation",
        "Automated Response Evaluation & Scoring",
        "Voice Input & Speech-to-Text Support",
        "Comprehensive Skill Analytics Dashboard"
      ],
      image: "/images/project2.png",
      github: "https://github.com/aaravsharma/ai-interview-bot",
      live: "https://ai-interview-bot-demo.example.com"
    },
    {
      id: 2,
      projectNumber: "02",
      title: "Smart Bharat",
      category: "FULL STACK",
      description: "An AI-enabled civic governance portal empowering citizens to discover relevant government welfare schemes and submit geo-tagged civic issue reports directly to municipal authorities.",
      technologies: ["React", "Python", "Flask", "AI Assistance", "REST API"],
      features: [
        "AI Scheme Finder with Multilingual Support",
        "Geo-tagged Civic Problem Reporting System",
        "Real-time Issue Status Tracking Timeline",
        "Interactive Community Action Dashboard"
      ],
      image: "/images/project1.png",
      github: "https://github.com/aaravsharma/smart-bharat",
      live: "https://smart-bharat-demo.example.com"
    },
    {
      id: 3,
      projectNumber: "03",
      title: "Portfolio Generator",
      category: "WEB",
      description: "An automated web application that ingests resume data and instantly produces high-contrast, production-ready Neo-Brutalist portfolio websites with zero coding required.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js", "AI Engine"],
      features: [
        "Dynamic Theme Selection (Brutalism, Glassmorphism, etc.)",
        "Instant Interactive Client-side Preview",
        "Resume JSON Schema Parser",
        "One-click Export & Deployment Ready Assets"
      ],
      image: "/images/project1.png",
      github: "https://github.com/aaravsharma/portfolio-generator",
      live: "https://brutalist-portfolio-demo.example.com"
    },
    {
      id: 4,
      projectNumber: "04",
      title: "Student Management System",
      category: "FULL STACK",
      description: "Comprehensive desktop and web application designed for academic institutions to manage student enrollment, grade transcripts, course scheduling, and attendance tracking.",
      technologies: ["Java", "MySQL", "HTML5", "CSS3", "Express"],
      features: [
        "Secure Role-based Access (Student / Teacher / Admin)",
        "Automated GPA & Percentage Calculator",
        "Attendance Visualizer & Low-Attendance Alerts",
        "PDF Transcript & Report Card Generator"
      ],
      image: "/images/project2.png",
      github: "https://github.com/aaravsharma/student-management-system",
      live: "https://student-sys-demo.example.com"
    }
  ],

  achievements: [
    {
      id: 1,
      numberStr: "01",
      title: "Microsoft Azure AZ-900",
      type: "Certification",
      organization: "Microsoft Certified",
      year: "2026",
      description: "Earned official certification in Azure Cloud Fundamentals covering cloud concepts, security, privacy, and core Azure architectural components.",
      accentColor: "#FFE600"
    },
    {
      id: 2,
      numberStr: "02",
      title: "Hackathon Finalist",
      type: "Achievement",
      organization: "TECHNEX26 - IIT BHU",
      year: "2026",
      description: "Selected among top 10 finalists out of 300+ national teams for building an AI-powered automated interview assessment platform.",
      accentColor: "#00F0FF"
    },
    {
      id: 3,
      numberStr: "03",
      title: "Technical Workshop",
      type: "Workshop",
      organization: "Intel NEC Workshop",
      year: "2025",
      description: "Completed intensive hands-on technical workshop on Deep Learning pipelines, neural networks, and edge AI deployment.",
      accentColor: "#FF597B"
    },
    {
      id: 4,
      numberStr: "04",
      title: "Academic Excellence",
      type: "Academic",
      organization: "GLA University",
      year: "2024 - 2028",
      description: "Maintained a consistent 8.7+ CGPA across all academic semesters in B.Tech Computer Science Engineering.",
      accentColor: "#FF9F29"
    }
  ],

  contact: {
    email: "aarav.sharma@example.com",
    phone: "+91 98765 43210",
    linkedin: "https://linkedin.com/in/aaravsharma",
    github: "https://github.com/aaravsharma",
    location: "New Delhi, India"
  }
};

export default portfolioData;
