import React from 'react';
import { X } from 'lucide-react';

// Badge component
export function Badge({ children, variant = 'default', removable = false, onRemove, className = '' }) {
  const variants = {
    default:  'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
    primary:  'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300',
    success:  'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300',
    warning:  'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300',
    danger:   'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300',
    outline:  'border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300',
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${variants[variant] || variants.default} ${className}`}>
      {children}
      {removable && onRemove && (
        <button onClick={onRemove} className="ml-0.5 hover:opacity-70 transition-opacity"><X size={10} /></button>
      )}
    </span>
  );
}

// SkillTag component
export function SkillTag({ skill, onRemove }) {
  return (
    <span className="group inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-medium border border-indigo-100 dark:border-indigo-800">
      {skill}
      {onRemove && (
        <button onClick={() => onRemove(skill)} className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500">
          <X size={10} />
        </button>
      )}
    </span>
  );
}

export default Badge;
