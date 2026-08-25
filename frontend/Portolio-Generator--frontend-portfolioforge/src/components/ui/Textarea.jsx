import React from 'react';

// Textarea component
export default function Textarea({ label, id, error, hint, rows = 4, containerClassName = '', className = '', ...props }) {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className={`flex flex-col gap-1 ${containerClassName}`}>
      {label && <label htmlFor={textareaId} className="text-xs font-medium text-gray-600 dark:text-gray-400">{label}</label>}
      <textarea
        id={textareaId}
        rows={rows}
        className={`
          w-full rounded-xl border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
          text-sm placeholder-gray-400 dark:placeholder-gray-500 px-3.5 py-2.5
          focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors resize-y
          ${error ? 'border-red-400 dark:border-red-600' : 'border-gray-200 dark:border-gray-700'}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}
