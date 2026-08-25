import React from 'react';

// Card component
export default function Card({ children, className = '', hover = false, padding = true, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm
        ${hover ? 'hover:shadow-md hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-200 cursor-pointer' : ''}
        ${padding ? 'p-5' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = '' }) {
  return <h3 className={`font-semibold text-gray-900 dark:text-gray-100 ${className}`}>{children}</h3>;
}

export function CardDescription({ children, className = '' }) {
  return <p className={`text-sm text-gray-500 dark:text-gray-400 mt-0.5 ${className}`}>{children}</p>;
}
