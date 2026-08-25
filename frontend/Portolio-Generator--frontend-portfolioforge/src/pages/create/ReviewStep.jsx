import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';
import { useApp } from '../../context/AppContext';
import { Plus, Trash2, ChevronDown, ChevronUp, ArrowLeft, ArrowRight, X } from 'lucide-react';

export default function ReviewStep() {
  const navigate = useNavigate();
  const { portfolioData, updatePersonalInfo, updateSection } = usePortfolio();
  const { addToast } = useApp();
  const [activeTab, setActiveTab] = useState('Personal');

  const tabs = ['Personal', 'Education', 'Skills', 'Experience', 'Projects', 'Certifications', 'Achievements'];

  // Local state for lists
  const [educationItems, setEducationItems] = useState([...(portfolioData.education || [])]);
  const [experienceItems, setExperienceItems] = useState([...(portfolioData.experience || [])]);
  const [projectItems, setProjectItems] = useState([...(portfolioData.projects || [])]);
  const [certificationItems, setCertificationItems] = useState([...(portfolioData.certifications || [])]);
  const [achievementItems, setAchievementItems] = useState([...(portfolioData.achievements || [])]);
  const [skillsList, setSkillsList] = useState([...(portfolioData.skills || [])]);
  const [newSkill, setNewSkill] = useState('');

  const updateEduList = (items) => { setEducationItems(items); updateSection('education', items); };
  const updateExpList = (items) => { setExperienceItems(items); updateSection('experience', items); };
  const updateProjList = (items) => { setProjectItems(items); updateSection('projects', items); };
  const updateCertList = (items) => { setCertificationItems(items); updateSection('certifications', items); };
  const updateAchList = (items) => { setAchievementItems(items); updateSection('achievements', items); };
  const updateSkillList = (items) => { setSkillsList(items); updateSection('skills', items); };

  // Sync state whenever portfolioData updates (e.g. from resume upload)
  React.useEffect(() => {
    setEducationItems([...(portfolioData.education || [])]);
    setExperienceItems([...(portfolioData.experience || [])]);
    setProjectItems([...(portfolioData.projects || [])]);
    setCertificationItems([...(portfolioData.certifications || [])]);
    setAchievementItems([...(portfolioData.achievements || [])]);
    setSkillsList([...(portfolioData.skills || [])]);
  }, [portfolioData.education, portfolioData.experience, portfolioData.projects, portfolioData.certifications, portfolioData.achievements, portfolioData.skills]);

  // Expand state
  const [expandedEdu, setExpandedEdu] = useState(0);
  const [expandedExp, setExpandedExp] = useState(0);

  const handleSaveAndContinue = () => {
    updateSection('education', educationItems);
    updateSection('experience', experienceItems);
    updateSection('projects', projectItems);
    updateSection('certifications', certificationItems);
    updateSection('achievements', achievementItems);
    updateSection('skills', skillsList);
    addToast('Sections updated successfully', 'success');
    navigate('/create/customize');
  };

  const renderPersonal = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100" value={portfolioData.personalInfo.name || ''} onChange={(e) => updatePersonalInfo('name', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Professional Title</label>
          <input className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100" value={portfolioData.personalInfo.title || ''} onChange={(e) => updatePersonalInfo('title', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100" value={portfolioData.personalInfo.email || ''} onChange={(e) => updatePersonalInfo('email', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100" value={portfolioData.personalInfo.phone || ''} onChange={(e) => updatePersonalInfo('phone', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100" value={portfolioData.personalInfo.location || ''} onChange={(e) => updatePersonalInfo('location', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">GitHub</label>
          <input className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100" value={portfolioData.personalInfo.github || ''} onChange={(e) => updatePersonalInfo('github', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">LinkedIn</label>
          <input className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100" value={portfolioData.personalInfo.linkedin || ''} onChange={(e) => updatePersonalInfo('linkedin', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Website</label>
          <input className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100" value={portfolioData.personalInfo.website || ''} onChange={(e) => updatePersonalInfo('website', e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-1">Profile Photo / Avatar Image URL</label>
          <input className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100" placeholder="https://example.com/photo.jpg" value={portfolioData.personalInfo.profileImage || portfolioData.profileImage || ''} onChange={(e) => updatePersonalInfo('profileImage', e.target.value)} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Summary</label>
        <textarea rows={4} className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100" value={portfolioData.personalInfo.summary || portfolioData.personalInfo.about || ''} onChange={(e) => updatePersonalInfo('summary', e.target.value)} />
      </div>
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-4">
      {educationItems.map((item, idx) => (
        <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => setExpandedEdu(expandedEdu === idx ? -1 : idx)}>
            <div className="font-semibold">{item.degree || 'New Education'}</div>
            <div className="flex items-center gap-2">
              <button onClick={(e) => { e.stopPropagation(); updateEduList(educationItems.filter((_, i) => i !== idx)); }} className="text-red-500 p-1 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
              {expandedEdu === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </div>
          {expandedEdu === idx && (
            <div className="p-4 border-t border-gray-100 dark:border-gray-700 space-y-4">
              <input className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100" placeholder="Degree" value={item.degree || ''} onChange={(e) => { const newItems = [...educationItems]; newItems[idx] = { ...newItems[idx], degree: e.target.value }; updateEduList(newItems); }} />
              <input className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100" placeholder="University" value={item.university || ''} onChange={(e) => { const newItems = [...educationItems]; newItems[idx] = { ...newItems[idx], university: e.target.value }; updateEduList(newItems); }} />
              <input className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100" placeholder="Location" value={item.location || ''} onChange={(e) => { const newItems = [...educationItems]; newItems[idx] = { ...newItems[idx], location: e.target.value }; updateEduList(newItems); }} />
              <div className="grid grid-cols-2 gap-4">
                <input className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100" placeholder="Start Year" value={item.startYear || ''} onChange={(e) => { const newItems = [...educationItems]; newItems[idx] = { ...newItems[idx], startYear: e.target.value }; updateEduList(newItems); }} />
                <input className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100" placeholder="End Year" value={item.endYear || ''} onChange={(e) => { const newItems = [...educationItems]; newItems[idx] = { ...newItems[idx], endYear: e.target.value }; updateEduList(newItems); }} />
              </div>
              <input className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100" placeholder="Grade" value={item.grade || ''} onChange={(e) => { const newItems = [...educationItems]; newItems[idx] = { ...newItems[idx], grade: e.target.value }; updateEduList(newItems); }} />
              <textarea rows={3} className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100" placeholder="Description" value={item.description || ''} onChange={(e) => { const newItems = [...educationItems]; newItems[idx] = { ...newItems[idx], description: e.target.value }; updateEduList(newItems); }} />
            </div>
          )}
        </div>
      ))}
      <button onClick={() => { const newItems = [...educationItems, { degree: '', university: '' }]; setExpandedEdu(newItems.length - 1); updateEduList(newItems); }} className="w-full py-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl flex items-center justify-center gap-2 text-gray-500 hover:text-indigo-600 hover:border-indigo-600 transition-colors">
        <Plus size={20} /> Add Education
      </button>
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {skillsList.map((skill, idx) => (
          <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 rounded-full text-xs font-medium group">
            {skill}
            <button onClick={() => updateSkillList(skillsList.filter((_, i) => i !== idx))} className="opacity-0 group-hover:opacity-100 transition-opacity"><X size={12} /></button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input 
          className="flex-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100" 
          placeholder="Add a new skill..." 
          value={newSkill} 
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && newSkill) { updateSkillList([...skillsList, newSkill]); setNewSkill(''); } }}
        />
        <button onClick={() => { if (newSkill) { updateSkillList([...skillsList, newSkill]); setNewSkill(''); } }} className="bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl px-5 py-2.5 text-sm font-semibold">Add</button>
      </div>
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-4">
      {experienceItems.map((item, idx) => (
        <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => setExpandedExp(expandedExp === idx ? -1 : idx)}>
            <div className="font-semibold">{item.position || 'New Experience'} at {item.company || 'Company'}</div>
            <div className="flex items-center gap-2">
              <button onClick={(e) => { e.stopPropagation(); updateExpList(experienceItems.filter((_, i) => i !== idx)); }} className="text-red-500 p-1 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
              {expandedExp === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </div>
          {expandedExp === idx && (
            <div className="p-4 border-t border-gray-100 dark:border-gray-700 space-y-4">
              <input className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100" placeholder="Company" value={item.company || ''} onChange={(e) => { const newItems = [...experienceItems]; newItems[idx] = { ...newItems[idx], company: e.target.value }; updateExpList(newItems); }} />
              <input className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100" placeholder="Position" value={item.position || ''} onChange={(e) => { const newItems = [...experienceItems]; newItems[idx] = { ...newItems[idx], position: e.target.value }; updateExpList(newItems); }} />
              <input className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100" placeholder="Location" value={item.location || ''} onChange={(e) => { const newItems = [...experienceItems]; newItems[idx] = { ...newItems[idx], location: e.target.value }; updateExpList(newItems); }} />
              <div className="grid grid-cols-2 gap-4">
                <input className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100" placeholder="Start Date" value={item.startDate || ''} onChange={(e) => { const newItems = [...experienceItems]; newItems[idx] = { ...newItems[idx], startDate: e.target.value }; updateExpList(newItems); }} />
                <input className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100" placeholder="End Date" value={item.endDate || ''} onChange={(e) => { const newItems = [...experienceItems]; newItems[idx] = { ...newItems[idx], endDate: e.target.value }; updateExpList(newItems); }} disabled={item.current} />
              </div>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={item.current || false} onChange={(e) => { const newItems = [...experienceItems]; newItems[idx] = { ...newItems[idx], current: e.target.checked }; updateExpList(newItems); }} /> I currently work here</label>
              <textarea rows={3} className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100" placeholder="Description" value={item.description || ''} onChange={(e) => { const newItems = [...experienceItems]; newItems[idx] = { ...newItems[idx], description: e.target.value }; updateExpList(newItems); }} />
            </div>
          )}
        </div>
      ))}
      <button onClick={() => { const newItems = [...experienceItems, { position: '', company: '' }]; setExpandedExp(newItems.length - 1); updateExpList(newItems); }} className="w-full py-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl flex items-center justify-center gap-2 text-gray-500 hover:text-indigo-600 hover:border-indigo-600 transition-colors">
        <Plus size={20} /> Add Experience
      </button>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-4">
      {projectItems.map((item, idx) => (
        <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">{item.name || 'New Project'}</h4>
            <button onClick={() => updateProjList(projectItems.filter((_, i) => i !== idx))} className="text-red-500 p-1 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
          </div>
          <input className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100" placeholder="Project Name" value={item.name || ''} onChange={(e) => { const newItems = [...projectItems]; newItems[idx] = { ...newItems[idx], name: e.target.value }; updateProjList(newItems); }} />
          <textarea rows={2} className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100" placeholder="Description" value={item.description || ''} onChange={(e) => { const newItems = [...projectItems]; newItems[idx] = { ...newItems[idx], description: e.target.value }; updateProjList(newItems); }} />
          <input className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100" placeholder="Technologies (comma separated)" value={(item.technologies || []).join(', ')} onChange={(e) => { const newItems = [...projectItems]; newItems[idx] = { ...newItems[idx], technologies: e.target.value.split(',').map(s => s.trim()) }; updateProjList(newItems); }} />
          <input className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100" placeholder="Project Image / Screenshot URL (or upload)" value={item.image || ''} onChange={(e) => { const newItems = [...projectItems]; newItems[idx] = { ...newItems[idx], image: e.target.value }; updateProjList(newItems); }} />
          <div className="grid grid-cols-2 gap-4">
            <input className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100" placeholder="GitHub URL" value={item.github || ''} onChange={(e) => { const newItems = [...projectItems]; newItems[idx] = { ...newItems[idx], github: e.target.value }; updateProjList(newItems); }} />
            <input className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100" placeholder="Live Demo URL" value={item.demo || item.live || ''} onChange={(e) => { const newItems = [...projectItems]; newItems[idx] = { ...newItems[idx], demo: e.target.value, live: e.target.value }; updateProjList(newItems); }} />
          </div>
          <input className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100" placeholder="Key Highlight" value={item.highlights || item.highlight || ''} onChange={(e) => { const newItems = [...projectItems]; newItems[idx] = { ...newItems[idx], highlights: e.target.value, highlight: e.target.value }; updateProjList(newItems); }} />
        </div>
      ))}
      <button onClick={() => updateProjList([...projectItems, { name: '', description: '', technologies: [], image: '' }])} className="w-full py-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl flex items-center justify-center gap-2 text-gray-500 hover:text-indigo-600 hover:border-indigo-600 transition-colors">
        <Plus size={20} /> Add Project
      </button>
    </div>
  );

  const renderCertifications = () => (
    <div className="space-y-4">
      {certificationItems.map((item, idx) => (
        <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">{item.name || 'New Certification'}</h4>
            <button onClick={() => updateCertList(certificationItems.filter((_, i) => i !== idx))} className="text-red-500 p-1 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
          </div>
          <input className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100" placeholder="Name" value={item.name || ''} onChange={(e) => { const newItems = [...certificationItems]; newItems[idx] = { ...newItems[idx], name: e.target.value }; updateCertList(newItems); }} />
          <input className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100" placeholder="Issuer" value={item.issuer || ''} onChange={(e) => { const newItems = [...certificationItems]; newItems[idx] = { ...newItems[idx], issuer: e.target.value }; updateCertList(newItems); }} />
          <input className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100" placeholder="Certificate Photo / Badge URL" value={item.image || ''} onChange={(e) => { const newItems = [...certificationItems]; newItems[idx] = { ...newItems[idx], image: e.target.value }; updateCertList(newItems); }} />
          <div className="grid grid-cols-2 gap-4">
            <input className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100" placeholder="Date" value={item.date || ''} onChange={(e) => { const newItems = [...certificationItems]; newItems[idx] = { ...newItems[idx], date: e.target.value }; updateCertList(newItems); }} />
            <input className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100" placeholder="Credential ID" value={item.credentialId || ''} onChange={(e) => { const newItems = [...certificationItems]; newItems[idx] = { ...newItems[idx], credentialId: e.target.value }; updateCertList(newItems); }} />
          </div>
          <input className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100" placeholder="Link" value={item.link || ''} onChange={(e) => { const newItems = [...certificationItems]; newItems[idx] = { ...newItems[idx], link: e.target.value }; updateCertList(newItems); }} />
        </div>
      ))}
      <button onClick={() => updateCertList([...certificationItems, { name: '', issuer: '', image: '' }])} className="w-full py-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl flex items-center justify-center gap-2 text-gray-500 hover:text-indigo-600 hover:border-indigo-600 transition-colors">
        <Plus size={20} /> Add Certification
      </button>
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-4">
      {achievementItems.map((item, idx) => (
        <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">{item.title || 'New Achievement'}</h4>
            <button onClick={() => updateAchList(achievementItems.filter((_, i) => i !== idx))} className="text-red-500 p-1 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
          </div>
          <input className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100" placeholder="Title" value={item.title || ''} onChange={(e) => { const newItems = [...achievementItems]; newItems[idx] = { ...newItems[idx], title: e.target.value }; updateAchList(newItems); }} />
          <textarea rows={2} className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100" placeholder="Description" value={item.description || ''} onChange={(e) => { const newItems = [...achievementItems]; newItems[idx] = { ...newItems[idx], description: e.target.value }; updateAchList(newItems); }} />
          <input className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-100" placeholder="Date" value={item.date || ''} onChange={(e) => { const newItems = [...achievementItems]; newItems[idx] = { ...newItems[idx], date: e.target.value }; updateAchList(newItems); }} />
        </div>
      ))}
      <button onClick={() => updateAchList([...achievementItems, { title: '', description: '' }])} className="w-full py-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl flex items-center justify-center gap-2 text-gray-500 hover:text-indigo-600 hover:border-indigo-600 transition-colors">
        <Plus size={20} /> Add Achievement
      </button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6">Review & Edit Details</h2>
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
        {tabs.map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-colors ${activeTab === tab ? 'bg-indigo-600 text-white' : 'border border-gray-200 text-gray-600 hover:border-indigo-300 dark:border-gray-700 dark:text-gray-300'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mb-8">
        {activeTab === 'Personal' && renderPersonal()}
        {activeTab === 'Education' && renderEducation()}
        {activeTab === 'Skills' && renderSkills()}
        {activeTab === 'Experience' && renderExperience()}
        {activeTab === 'Projects' && renderProjects()}
        {activeTab === 'Certifications' && renderCertifications()}
        {activeTab === 'Achievements' && renderAchievements()}
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
        <button onClick={() => navigate('/create/analysis')} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl px-5 py-2.5 text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
          <ArrowLeft size={16} /> Back
        </button>
        <button onClick={handleSaveAndContinue} className="bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl px-5 py-2.5 text-sm font-semibold flex items-center gap-2">
          Save & Continue <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
