export interface PersonalInfo {
  name: string;
  headline: string;
  summary: string;
  location: string;
  profileImage: string;
  badges: string[];
}

export interface SkillCategory {
  category: 'ALL' | 'PROGRAMMING' | 'FRONTEND' | 'BACKEND' | 'DATABASE' | 'AI / ML' | 'TOOLS';
  title: string;
  color: string;
  skills: {
    name: string;
    level?: number;
    iconName?: string;
  }[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  gpaOrScore: string;
  description: string;
  isHighlighted?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  location: string;
  responsibilities: string[];
  technologies: string[];
}

export interface ProjectItem {
  id: number;
  projectNumber: string;
  title: string;
  category: 'WEB' | 'AI / ML' | 'FULL STACK';
  description: string;
  technologies: string[];
  features: string[];
  image: string;
  github: string;
  live: string;
}

export interface AchievementItem {
  id: number;
  numberStr: string;
  title: string;
  type: 'Certification' | 'Achievement' | 'Workshop' | 'Academic';
  organization: string;
  year: string;
  description: string;
  accentColor: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  location: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  skills: SkillCategory[];
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  achievements: AchievementItem[];
  contact: ContactInfo;
}
