import React from 'react';

export default function Select({
  label,
  id,
  error,
  hint,
  options = [],
  className = '',
  containerClassName = '',
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`
          w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm
          text-gray-900 transition-colors duration-150 cursor-pointer
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
          dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100
          ${error ? 'border-red-400' : 'border-gray-200'}
          ${className}
        `}
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}
