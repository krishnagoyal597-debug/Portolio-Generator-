import React from 'react';

// Input component
export default function Input({
  label,
  id,
  error,
  hint,
  icon: Icon,
  containerClassName = '',
  className = '',
  ...props
}) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className={`flex flex-col gap-1 ${containerClassName}`}>
      {label && (
        <label htmlFor={inputId} className="text-xs font-medium text-gray-600 dark:text-gray-400">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <Icon size={15} />
          </div>
        )}
        <input
          id={inputId}
          className={`
            w-full rounded-xl border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
            text-sm placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors
            disabled:opacity-60 disabled:cursor-not-allowed
            ${Icon ? 'pl-9 pr-3.5 py-2.5' : 'px-3.5 py-2.5'}
            ${error ? 'border-red-400 dark:border-red-600' : 'border-gray-200 dark:border-gray-700'}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}
