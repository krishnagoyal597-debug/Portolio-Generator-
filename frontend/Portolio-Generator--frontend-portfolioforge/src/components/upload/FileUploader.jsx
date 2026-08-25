import React, { useState, useCallback } from 'react';
import { Upload, FileText, X, CheckCircle, AlertCircle } from 'lucide-react';

export default function FileUploader({ onFileSelect, accept = '.pdf,.doc,.docx,.txt,.rtf,.md', className = '' }) {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const validate = (f) => {
    if (!f) return 'No file selected.';
    if (f.size === 0) return 'The file appears to be empty.';
    if (f.size > 10 * 1024 * 1024) return 'File is too large. Maximum 10MB.';
    return '';
  };

  const processFile = useCallback((f) => {
    const err = validate(f);
    if (err) {
      setError(err);
      setFile(null);
      return;
    }
    setError('');
    setFile(f);
    onFileSelect?.(f);
  }, [onFileSelect]);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) processFile(f);
  }, [processFile]);

  const onInputChange = (e) => {
    const f = e.target.files[0];
    if (f) processFile(f);
  };

  const removeFile = () => {
    setFile(null);
    setError('');
    onFileSelect?.(null);
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (file) {
    return (
      <div className={`rounded-2xl border-2 border-green-300 bg-green-50 dark:bg-green-900/20 dark:border-green-700/50 p-6 ${className}`}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center flex-shrink-0">
            <FileText size={24} className="text-green-600 dark:text-green-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{file.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{formatSize(file.size)}</p>
          </div>
          <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
          <button
            onClick={removeFile}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-white dark:hover:bg-gray-800 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
        <p className="mt-3 text-xs text-green-700 dark:text-green-400 font-medium">✓ File uploaded successfully</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <label
        className={`
          block rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer
          transition-all duration-200
          ${dragOver
            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 scale-[1.01]'
            : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 hover:border-indigo-300 hover:bg-indigo-50/50 dark:hover:border-indigo-700'
          }
        `}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
      >
        <input type="file" accept={accept} className="sr-only" onChange={onInputChange} />

        <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-colors ${dragOver ? 'bg-indigo-100 dark:bg-indigo-900/40' : 'bg-white dark:bg-gray-700 shadow-sm'}`}>
          <Upload size={28} className={dragOver ? 'text-indigo-600' : 'text-gray-400'} />
        </div>

        <p className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
          {dragOver ? 'Drop your file here' : 'Drag & drop your resume here'}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">or</p>
        <span className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors">
          Browse Files
        </span>
        <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">Supported formats: .pdf, .docx, .txt, .md · Max 10MB</p>
      </label>

      {error && (
        <div className="mt-3 flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/50">
          <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}
    </div>
  );
}
