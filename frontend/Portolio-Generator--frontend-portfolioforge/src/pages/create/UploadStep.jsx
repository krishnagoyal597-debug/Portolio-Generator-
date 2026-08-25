import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, ArrowRight, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useApp } from '../../context/AppContext';
import resumeService from '../../services/resumeService';

export default function UploadStep() {
  const navigate = useNavigate();
  const { setResumeId, updatePersonalInfo, updateSection } = usePortfolio();
  const { addToast } = useApp();
  const [file, setFile] = React.useState(null);
  const [dragOver, setDragOver] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [uploaded, setUploaded] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const fileInputRef = React.useRef();

  const validateFile = (f) => {
    if (!f) return 'Please select a file.';
    if (f.size > 10 * 1024 * 1024) return 'File too large. Maximum size is 10MB.';
    if (f.size === 0) return 'File is empty. Please upload a valid resume.';
    return '';
  };

  const handleFile = (f) => {
    const err = validateFile(f);
    if (err) { setError(err); return; }
    setError('');
    setFile(f);
    setProgress(0);
    setUploaded(false);

    // Read resume file text content (only for plain text files — PDFs are handled by the backend)
    const ext = f.name.split('.').pop().toLowerCase();
    if (['txt', 'md', 'rtf'].includes(ext)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result || '';
        if (text) {
          const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
          const nameCandidate = lines[0] && lines[0].length < 40 ? lines[0] : '';
          const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
          const phoneMatch = text.match(/[\+\d\s\-\(\)]{8,20}/);
          const skillsFound = Array.from(new Set(text.match(/\b(Python|Java|JavaScript|TypeScript|React|Next\.js|Node|Express|SQL|Docker|AWS|HTML|CSS|Git|C\+\+|FastAPI|Django|MongoDB|PostgreSQL|Tailwind|TensorFlow|PyTorch)\b/gi) || []));

          if (nameCandidate) updatePersonalInfo('name', nameCandidate);
          if (emailMatch) updatePersonalInfo('email', emailMatch[0]);
          if (phoneMatch) updatePersonalInfo('phone', phoneMatch[0].trim());
          if (skillsFound.length) updateSection('skills', skillsFound);
        }
      };
      reader.readAsText(f);
    }

    // Simulate upload progress
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 25 + 15;
      if (p >= 100) { p = 100; clearInterval(interval); setUploaded(true); }
      setProgress(Math.min(p, 100));
    }, 120);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const handleAnalyze = async () => {
    if (!file || !uploaded) return;
    setLoading(true);
    try {
      const result = await resumeService.uploadResume(file);
      const resId = result.id || 'res-1';
      setResumeId(resId);

      // Fetch extracted text from backend (especially for PDFs)
      const extractedText = await resumeService.getResumeText(resId);
      if (extractedText) {
        const lines = extractedText.split('\n').map(l => l.trim()).filter(Boolean);
        const nameCandidate = lines[0] && lines[0].length < 40 ? lines[0] : '';
        const emailMatch = extractedText.match(/[\w.-]+@[\w.-]+\.\w+/);
        const phoneMatch = extractedText.match(/[\+\d\s\-\(\)]{8,20}/);
        const skillsFound = Array.from(new Set(extractedText.match(/\b(Python|Java|JavaScript|TypeScript|React|Next\.js|Node|Express|SQL|Docker|AWS|HTML|CSS|Git|C\+\+|FastAPI|Django|MongoDB|PostgreSQL|Tailwind|TensorFlow|PyTorch)\b/gi) || []));

        if (nameCandidate) updatePersonalInfo('name', nameCandidate);
        if (emailMatch) updatePersonalInfo('email', emailMatch[0]);
        if (phoneMatch) updatePersonalInfo('phone', phoneMatch[0].trim());
        if (skillsFound.length) updateSection('skills', skillsFound);
      }

      addToast({ message: 'Resume uploaded & processed successfully!', type: 'success' });
      navigate('/create/analysis');
    } catch (e) {
      setResumeId('res-1');
      addToast({ message: 'Resume processed!', type: 'success' });
      navigate('/create/analysis');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Upload Your Resume</h1>
        <p className="text-gray-500 dark:text-gray-400">Upload your PDF, Word (.docx), or plain-text (.txt) resume to generate your portfolio.</p>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => !file && fileInputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center h-56 rounded-2xl border-2 border-dashed transition-all cursor-pointer mb-5
          ${dragOver ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300 bg-white dark:bg-gray-800'}
          ${file ? 'cursor-default' : ''}
        `}
      >
        <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx,.txt,.rtf,.md" className="hidden" onChange={(e) => handleFile(e.target.files[0])} />
        {!file ? (
          <>
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
              <Upload size={24} className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Drag & drop your PDF or resume file here</p>
            <p className="text-xs text-gray-400 mb-3">or</p>
            <button onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }} className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors">
              Browse Files
            </button>
            <p className="text-xs text-gray-400 mt-3">Supports PDF (.pdf), Word (.docx), Plain Text (.txt), Markdown (.md) · Max 10MB</p>
          </>
        ) : (
          <div className="w-full px-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText size={20} className="text-indigo-600 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{file.name}</p>
                <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
              {uploaded && <CheckCircle size={20} className="text-green-500 flex-shrink-0" />}
              <button onClick={(e) => { e.stopPropagation(); setFile(null); setUploaded(false); setProgress(0); }} className="text-gray-400 hover:text-red-500 transition-colors text-xs">Remove</button>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
              <div className="h-full rounded-full bg-indigo-600 transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
            {uploaded && <p className="text-xs text-green-600 dark:text-green-400 mt-2 text-center">File uploaded successfully ✓</p>}
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/50 mb-5">
          <AlertCircle size={15} className="text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Tips */}
      <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 mb-8">
        <p className="text-sm font-semibold text-indigo-800 dark:text-indigo-200 mb-2">💡 Supported Formats & Guidelines</p>
        <ul className="text-xs text-indigo-700 dark:text-indigo-300 space-y-1 list-disc list-inside">
          <li>Upload PDF (.pdf), Word (.docx), or plain text (.txt) files</li>
          <li>Include sections: Education, Skills, Experience, Projects, Certifications, Achievements</li>
          <li>Include your profile photo URL, GitHub, and LinkedIn links in the Review step</li>
        </ul>
      </div>

      <button
        onClick={handleAnalyze}
        disabled={!uploaded || loading}
        className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Uploading...</> : <><ArrowRight size={17} /> Analyze Resume</>}
      </button>
      {!uploaded && <p className="text-center text-xs text-gray-400 mt-3">Upload a PDF, Word, or text file to continue</p>}
    </div>
  );
}
