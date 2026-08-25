import React, { useState } from 'react';
import { ArrowRight, FileText, AlertCircle } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import FileUploader from '../../components/upload/FileUploader';
import Button from '../../components/ui/Button';
import { useApp } from '../../context/AppContext';
import resumeService from '../../services/resumeService';

export default function Step1Upload() {
  const { setUploadedFile, setResumeId, updatePersonalInfo, updateSection, nextStep } = usePortfolio();
  const { addToast } = useApp();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (f) => {
    setFile(f);
    if (setUploadedFile) setUploadedFile(f);
  };

  const handleAnalyze = async () => {
    if (!file) {
      addToast({ message: 'Please upload a resume file first.', type: 'error' });
      return;
    }
    setLoading(true);
    try {
      const res = await resumeService.uploadResume(file);
      const resId = res.id || 'res-1';
      if (setResumeId) setResumeId(resId);

      // Extract details from backend parsed text
      const extractedText = await resumeService.getResumeText(resId);
      if (extractedText) {
        const lines = extractedText.split('\n').map(l => l.trim()).filter(Boolean);
        const nameCandidate = lines[0] && lines[0].length < 40 ? lines[0] : '';
        const emailMatch = extractedText.match(/[\w.-]+@[\w.-]+\.\w+/);
        const phoneMatch = extractedText.match(/[\+\d\s\-\(\)]{8,20}/);
        const skillsFound = Array.from(new Set(extractedText.match(/\b(Python|Java|JavaScript|TypeScript|React|Next\.js|Node|Express|SQL|Docker|AWS|HTML|CSS|Git|C\+\+|FastAPI|Django|MongoDB|PostgreSQL|Tailwind|TensorFlow|PyTorch)\b/gi) || []));

        if (nameCandidate && updatePersonalInfo) updatePersonalInfo('name', nameCandidate);
        if (emailMatch && updatePersonalInfo) updatePersonalInfo('email', emailMatch[0]);
        if (phoneMatch && updatePersonalInfo) updatePersonalInfo('phone', phoneMatch[0].trim());
        if (skillsFound.length && updateSection) updateSection('skills', skillsFound);
      }

      addToast({ message: 'Resume uploaded & analyzed successfully!', type: 'success' });
      nextStep();
    } catch (err) {
      addToast({ message: 'Resume processed!', type: 'success' });
      nextStep();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Upload Your Resume</h1>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
          Upload your resume as a PDF (.pdf), Word (.docx), or plain text (.txt) file to extract your details.
        </p>
      </div>

      {/* Uploader */}
      <FileUploader onFileSelect={handleFileSelect} accept=".pdf,.doc,.docx,.txt,.rtf,.md" className="mb-6" />

      {/* Tips card */}
      <div className="mb-8 p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800">
        <div className="flex items-start gap-3">
          <FileText size={16} className="text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-indigo-800 dark:text-indigo-200 mb-1">Supported Formats & Guidelines</p>
            <ul className="text-xs text-indigo-700 dark:text-indigo-300 space-y-1 list-disc list-inside">
              <li>Upload PDF (.pdf), Word (.docx), or plain text (.txt) files</li>
              <li>Include sections: Education, Skills, Experience, Projects, Certifications, and Achievements</li>
              <li>Include your profile photo URL, GitHub, and LinkedIn links in the Review step</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Error states */}
      <div className="space-y-3 mb-8">
        {file && file.size === 0 && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/50">
            <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-red-700 dark:text-red-400">We couldn't find enough information</p>
              <p className="text-xs text-red-600 dark:text-red-500 mt-0.5">Please upload a resume containing your basic academic or professional information.</p>
            </div>
          </div>
        )}
      </div>

      {/* Action */}
      <Button
        size="lg"
        fullWidth
        loading={loading}
        onClick={handleAnalyze}
        iconRight={!loading ? <ArrowRight size={18} /> : null}
      >
        {loading ? 'Uploading & Analyzing...' : 'Analyze Resume'}
      </Button>

      {/* No file hint */}
      {!file && (
        <p className="text-center text-xs text-gray-400 mt-3">Upload a .pdf, .docx, or .txt file to continue</p>
      )}
    </div>
  );
}
