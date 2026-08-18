import React, { useState } from 'react';
import { ArrowRight, FileText, AlertCircle } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import FileUploader from '../../components/upload/FileUploader';
import Button from '../../components/ui/Button';
import { useApp } from '../../context/AppContext';

export default function Step1Upload() {
  const { setUploadedFile, nextStep } = usePortfolio();
  const { addToast } = useApp();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (f) => {
    setFile(f);
    setUploadedFile(f);
  };

  const handleAnalyze = async () => {
    if (!file) {
      addToast({ message: 'Please upload a resume file first.', type: 'error' });
      return;
    }
    setLoading(true);
    // Simulate API call POST /api/resume/upload
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    addToast({ message: 'Resume uploaded successfully!', type: 'success' });
    nextStep();
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Upload Your Resume</h1>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
          Upload your resume as a plain text (.txt) file and we'll extract the important information automatically.
        </p>
      </div>

      {/* Uploader */}
      <FileUploader onFileSelect={handleFileSelect} accept=".txt" className="mb-6" />

      {/* Tips card */}
      <div className="mb-8 p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800">
        <div className="flex items-start gap-3">
          <FileText size={16} className="text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-indigo-800 dark:text-indigo-200 mb-1">Tips for best results</p>
            <ul className="text-xs text-indigo-700 dark:text-indigo-300 space-y-1 list-disc list-inside">
              <li>Save your resume as a <code>.txt</code> file (plain text, not Word or PDF)</li>
              <li>Include sections: Education, Skills, Experience, Projects, and Certifications</li>
              <li>Use clear section headings (e.g., "EDUCATION", "SKILLS")</li>
              <li>Include contact information at the top</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Error states */}
      <div className="space-y-3 mb-8">
        {/* Demo: only shown when there's a sample file */}
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
        <p className="text-center text-xs text-gray-400 mt-3">Upload a .txt file to continue</p>
      )}
    </div>
  );
}
