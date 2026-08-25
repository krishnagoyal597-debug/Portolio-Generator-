import React from 'react';
import BrutalistPortfolio from './BrutalistPortfolio';
import BentoPortfolio from './BentoPortfolio';
import MinimalPortfolio from './MinimalPortfolio';
import SpatialPortfolio from './SpatialPortfolio';
import GlassmorphicPortfolio from './GlassmorphicPortfolio';
import FuturisticPortfolio from './FuturisticPortfolio';

const THEME_MAP = {
  brutalist: BrutalistPortfolio,
  brutalism: BrutalistPortfolio,
  newbrutalism: BrutalistPortfolio,
  bento: BentoPortfolio,
  minimal: MinimalPortfolio,
  minimalism: MinimalPortfolio,
  spatial: SpatialPortfolio,
  glassmorphic: GlassmorphicPortfolio,
  glassmorphism: GlassmorphicPortfolio,
  futuristic: FuturisticPortfolio
};

export default function PortfolioRenderer({ data, theme = 'bento' }) {
  if (!data) {
    return <div className="p-8 text-center text-red-500 font-bold">Error: Portfolio data is missing.</div>;
  }

  // Normalize data payload so both top-level and personalInfo accessors work seamlessly across all 6 themes
  const personal = data.personalInfo || {};
  const normalizedData = {
    ...data,
    name: data.name || personal.name || 'Candidate Name',
    title: data.title || personal.title || 'Software Engineer',
    tagline: data.tagline || personal.tagline || '',
    profileImage: data.profileImage || personal.profileImage || '',
    email: data.email || personal.email || '',
    phone: data.phone || personal.phone || '',
    location: data.location || personal.location || '',
    linkedin: data.linkedin || personal.linkedin || '',
    github: data.github || personal.github || '',
    website: data.website || personal.website || '',
    about: data.about || personal.summary || personal.about || '',
    personalInfo: {
      name: data.name || personal.name || 'Candidate Name',
      title: data.title || personal.title || 'Software Engineer',
      tagline: data.tagline || personal.tagline || '',
      profileImage: data.profileImage || personal.profileImage || '',
      email: data.email || personal.email || '',
      phone: data.phone || personal.phone || '',
      location: data.location || personal.location || '',
      linkedin: data.linkedin || personal.linkedin || '',
      github: data.github || personal.github || '',
      website: data.website || personal.website || '',
      summary: data.about || personal.summary || personal.about || '',
      about: data.about || personal.summary || personal.about || '',
    },
    skills: data.skills || [],
    education: data.education || [],
    experience: data.experience || [],
    projects: data.projects || [],
    certifications: data.certifications || [],
    achievements: data.achievements || [],
  };

  const key = (theme || 'bento').toLowerCase();
  const Component = THEME_MAP[key] || BentoPortfolio;
  
  return <Component data={normalizedData} />;
}
