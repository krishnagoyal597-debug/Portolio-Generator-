import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Button from '../../components/ui/Button';
import { SkillTag } from '../../components/ui/Badge';
import { useApp } from '../../context/AppContext';

const TABS = ['Personal', 'Education', 'Skills', 'Experience', 'Projects', 'Certifications', 'Achievements'];

export default function Step3Review() {
  const { portfolioData, updatePersonalInfo, updateSection, addSkill, removeSkill, nextStep, prevStep } = usePortfolio();
  const { addToast } = useApp();
  const [activeTab, setActiveTab] = useState('Personal');
  const [newSkill, setNewSkill] = useState('');

  const handleSave = () => {
    addToast({ message: 'Information saved!', type: 'success' });
    nextStep();
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Review Your Information</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          We've extracted the following information from your resume. Review and edit anything before generating your portfolio.
        </p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 overflow-x-auto pb-1 mb-6 scrollbar-thin">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0
              ${activeTab === tab
                ? 'bg-indigo-600 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 hover:text-indigo-600'
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="animate-fade-in" key={activeTab}>
        {activeTab === 'Personal' && (
          <PersonalSection data={portfolioData.personalInfo} onChange={updatePersonalInfo} />
        )}
        {activeTab === 'Education' && (
          <ListSection
            items={portfolioData.education}
            onChange={(v) => updateSection('education', v)}
            renderItem={(item, onChange) => <EducationItem item={item} onChange={onChange} />}
            newItem={{ id: `edu-${Date.now()}`, degree: '', university: '', startYear: '', endYear: '', grade: '', description: '' }}
            addLabel="Add Education"
          />
        )}
        {activeTab === 'Skills' && (
          <SkillsSection
            skills={portfolioData.skills}
            newSkill={newSkill}
            setNewSkill={setNewSkill}
            onAdd={() => { addSkill(newSkill.trim()); setNewSkill(''); }}
            onRemove={removeSkill}
          />
        )}
        {activeTab === 'Experience' && (
          <ListSection
            items={portfolioData.experience}
            onChange={(v) => updateSection('experience', v)}
            renderItem={(item, onChange) => <ExperienceItem item={item} onChange={onChange} />}
            newItem={{ id: `exp-${Date.now()}`, company: '', position: '', startDate: '', endDate: '', current: false, description: '' }}
            addLabel="Add Experience"
          />
        )}
        {activeTab === 'Projects' && (
          <ListSection
            items={portfolioData.projects}
            onChange={(v) => updateSection('projects', v)}
            renderItem={(item, onChange) => <ProjectItem item={item} onChange={onChange} />}
            newItem={{ id: `proj-${Date.now()}`, name: '', description: '', technologies: [], github: '', demo: '', highlights: '' }}
            addLabel="Add Project"
          />
        )}
        {activeTab === 'Certifications' && (
          <ListSection
            items={portfolioData.certifications}
            onChange={(v) => updateSection('certifications', v)}
            renderItem={(item, onChange) => <CertItem item={item} onChange={onChange} />}
            newItem={{ id: `cert-${Date.now()}`, name: '', issuer: '', date: '', credentialId: '', link: '' }}
            addLabel="Add Certification"
          />
        )}
        {activeTab === 'Achievements' && (
          <ListSection
            items={portfolioData.achievements}
            onChange={(v) => updateSection('achievements', v)}
            renderItem={(item, onChange) => <AchievementItem item={item} onChange={onChange} />}
            newItem={{ id: `ach-${Date.now()}`, title: '', description: '', date: '' }}
            addLabel="Add Achievement"
          />
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
        <Button variant="secondary" icon={<ArrowLeft size={16} />} onClick={prevStep}>Back</Button>
        <Button fullWidth iconRight={<ArrowRight size={16} />} onClick={handleSave}>
          Save & Continue
        </Button>
      </div>
    </div>
  );
}

// ── Sub-sections ──────────────────────────────────────────────────────────────

function PersonalSection({ data, onChange }) {
  const fields = [
    { key: 'name', label: 'Full Name', placeholder: 'Anshika Bansal' },
    { key: 'title', label: 'Professional Title', placeholder: 'Computer Science & AI Student' },
    { key: 'email', label: 'Email', placeholder: 'anshika@email.com', type: 'email' },
    { key: 'phone', label: 'Phone', placeholder: '+91 98765 43210', type: 'tel' },
    { key: 'location', label: 'Location', placeholder: 'Delhi, India' },
    { key: 'linkedin', label: 'LinkedIn', placeholder: 'linkedin.com/in/anshikabansal' },
    { key: 'github', label: 'GitHub', placeholder: 'github.com/anshikabansal' },
    { key: 'profileImage', label: 'Profile Photo / Avatar Image URL', placeholder: 'https://example.com/photo.jpg' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 space-y-4 shadow-card">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map(f => (
          <Input
            key={f.key}
            label={f.label}
            type={f.type || 'text'}
            value={data[f.key] || ''}
            placeholder={f.placeholder}
            onChange={e => onChange(f.key, e.target.value)}
          />
        ))}
      </div>
      <Textarea
        label="Profile Summary"
        rows={4}
        value={data.summary || ''}
        placeholder="A brief professional summary..."
        onChange={e => onChange('summary', e.target.value)}
      />
    </div>
  );
}

function SkillsSection({ skills, newSkill, setNewSkill, onAdd, onRemove }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-card">
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Your Skills</p>
      <div className="flex flex-wrap gap-2 mb-5 min-h-[40px]">
        {skills.map(s => (
          <SkillTag key={s} skill={s} onRemove={onRemove} />
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          placeholder="Add a skill (e.g. React)"
          value={newSkill}
          onChange={e => setNewSkill(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); onAdd(); } }}
          containerClassName="flex-1"
        />
        <Button icon={<Plus size={16} />} onClick={onAdd} disabled={!newSkill.trim()}>Add</Button>
      </div>
      <p className="text-xs text-gray-400 mt-2">Press Enter or click Add to add a skill. Hover over a skill to remove it.</p>
    </div>
  );
}

function ListSection({ items, onChange, renderItem, newItem, addLabel }) {
  const [expanded, setExpanded] = useState({});

  const addNew = () => {
    const item = { ...newItem, id: `item-${Date.now()}` };
    onChange([...items, item]);
    setExpanded(prev => ({ ...prev, [item.id]: true }));
  };

  const remove = (id) => onChange(items.filter(i => i.id !== id));
  const update = (id, updated) => onChange(items.map(i => i.id === id ? { ...i, ...updated } : i));

  return (
    <div className="space-y-3">
      {items.map(item => (
        <div key={item.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-card">
          <div
            className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            onClick={() => setExpanded(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
          >
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {item.name || item.degree || item.position || item.company || item.title || 'Untitled'}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={e => { e.stopPropagation(); remove(item.id); }}
                className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <Trash2 size={14} />
              </button>
              {expanded[item.id] ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
            </div>
          </div>
          {expanded[item.id] && (
            <div className="px-5 pb-5 border-t border-gray-50 dark:border-gray-700 pt-4">
              {renderItem(item, (changes) => update(item.id, changes))}
            </div>
          )}
        </div>
      ))}

      <button
        onClick={addNew}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-400 hover:border-indigo-300 hover:text-indigo-600 dark:hover:border-indigo-700 dark:hover:text-indigo-400 transition-colors"
      >
        <Plus size={16} />
        {addLabel}
      </button>
    </div>
  );
}

function EducationItem({ item, onChange }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input label="Degree" value={item.degree} onChange={e => onChange({ degree: e.target.value })} placeholder="B.Tech Computer Science" />
        <Input label="University" value={item.university} onChange={e => onChange({ university: e.target.value })} placeholder="Delhi Technological University" />
        <Input label="Start Year" value={item.startYear} onChange={e => onChange({ startYear: e.target.value })} placeholder="2021" />
        <Input label="End Year" value={item.endYear} onChange={e => onChange({ endYear: e.target.value })} placeholder="2025" />
        <Input label="Grade/CGPA" value={item.grade} onChange={e => onChange({ grade: e.target.value })} placeholder="CGPA: 8.7/10" />
      </div>
      <Textarea label="Description" rows={2} value={item.description} onChange={e => onChange({ description: e.target.value })} placeholder="Relevant coursework, achievements..." />
    </div>
  );
}

function ExperienceItem({ item, onChange }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input label="Company" value={item.company} onChange={e => onChange({ company: e.target.value })} placeholder="TechSolutions Pvt. Ltd." />
        <Input label="Position" value={item.position} onChange={e => onChange({ position: e.target.value })} placeholder="Software Development Intern" />
        <Input label="Start Date" value={item.startDate} onChange={e => onChange({ startDate: e.target.value })} placeholder="June 2024" />
        <Input label="End Date" value={item.endDate} onChange={e => onChange({ endDate: e.target.value })} placeholder="August 2024 (or Present)" />
      </div>
      <Textarea label="Description" rows={3} value={item.description} onChange={e => onChange({ description: e.target.value })} placeholder="• Describe your responsibilities and achievements" />
    </div>
  );
}

function ProjectItem({ item, onChange }) {
  return (
    <div className="space-y-3">
      <Input label="Project Name" value={item.name} onChange={e => onChange({ name: e.target.value })} placeholder="SmartResume AI" />
      <Textarea label="Description" rows={2} value={item.description} onChange={e => onChange({ description: e.target.value })} placeholder="What does this project do?" />
      <Input label="Technologies (comma-separated)" value={(item.technologies || []).join(', ')} onChange={e => onChange({ technologies: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })} placeholder="Python, React, FastAPI" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input label="GitHub Link" value={item.github} onChange={e => onChange({ github: e.target.value })} placeholder="github.com/username/project" />
        <Input label="Live Demo" value={item.demo} onChange={e => onChange({ demo: e.target.value })} placeholder="project.vercel.app" />
      </div>
      <Input label="Key Highlight" value={item.highlights} onChange={e => onChange({ highlights: e.target.value })} placeholder="94% accuracy, 1000+ users" />
    </div>
  );
}

function CertItem({ item, onChange }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input label="Certificate Name" value={item.name} onChange={e => onChange({ name: e.target.value })} placeholder="Google Data Analytics" />
        <Input label="Issuer" value={item.issuer} onChange={e => onChange({ issuer: e.target.value })} placeholder="Google / Coursera" />
        <Input label="Date" value={item.date} onChange={e => onChange({ date: e.target.value })} placeholder="2024" />
        <Input label="Credential ID" value={item.credentialId} onChange={e => onChange({ credentialId: e.target.value })} placeholder="GDA-2024-AB" />
      </div>
      <Input label="Verification Link" value={item.link} onChange={e => onChange({ link: e.target.value })} placeholder="coursera.org/verify/..." />
    </div>
  );
}

function AchievementItem({ item, onChange }) {
  return (
    <div className="space-y-3">
      <Input label="Title" value={item.title} onChange={e => onChange({ title: e.target.value })} placeholder="Smart India Hackathon 2024 — Finalist" />
      <Textarea label="Description" rows={2} value={item.description} onChange={e => onChange({ description: e.target.value })} placeholder="Describe the achievement and its significance" />
      <Input label="Date/Year" value={item.date} onChange={e => onChange({ date: e.target.value })} placeholder="2024" />
    </div>
  );
}
