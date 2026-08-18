import React, { createContext, useContext, useState } from 'react';
import { mockPortfolioJSON } from '../data/mockData';

const PortfolioContext = createContext(null);

const initialData = {
  personalInfo: {
    name: mockPortfolioJSON?.name || '',
    title: mockPortfolioJSON?.title || '',
    email: mockPortfolioJSON?.email || '',
    phone: mockPortfolioJSON?.phone || '',
    location: mockPortfolioJSON?.location || '',
    linkedin: mockPortfolioJSON?.linkedin || '',
    github: mockPortfolioJSON?.github || '',
    website: mockPortfolioJSON?.website || '',
    summary: mockPortfolioJSON?.about || '',
  },
  education: mockPortfolioJSON?.education || [],
  skills: mockPortfolioJSON?.skills || [],
  experience: mockPortfolioJSON?.experience || [],
  projects: mockPortfolioJSON?.projects || [],
  certifications: mockPortfolioJSON?.certifications || [],
  achievements: mockPortfolioJSON?.achievements || [],
};

export function PortfolioProvider({ children }) {
  const [portfolioData, setPortfolioData] = useState(initialData);
  const [resumeId, setResumeId] = useState(null);
  const [generatedJSON, setGeneratedJSON] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState('bento');
  const [appearance, setAppearance] = useState({ theme: 'light', accentColor: '#4F46E5', font: 'Inter' });
  const [enabledSections, setEnabledSections] = useState({
    about: true, skills: true, education: true, experience: true,
    projects: true, certifications: true, achievements: true, contact: true,
  });

  const updatePersonalInfo = (field, value) =>
    setPortfolioData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: value } }));

  const updateSection = (section, value) =>
    setPortfolioData(prev => ({ ...prev, [section]: value }));

  const addSkill = (skill) => {
    if (skill && !portfolioData.skills.includes(skill)) {
      setPortfolioData(prev => ({ ...prev, skills: [...prev.skills, skill] }));
    }
  };

  const removeSkill = (skill) =>
    setPortfolioData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));

  return (
    <PortfolioContext.Provider value={{
      portfolioData, setPortfolioData, updatePersonalInfo, updateSection,
      addSkill, removeSkill,
      resumeId, setResumeId,
      generatedJSON, setGeneratedJSON,
      selectedTheme, setSelectedTheme,
      appearance, setAppearance,
      enabledSections, setEnabledSections,
    }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be inside PortfolioProvider');
  return ctx;
}
