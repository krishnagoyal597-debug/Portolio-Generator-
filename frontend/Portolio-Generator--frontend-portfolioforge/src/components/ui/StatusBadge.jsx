import React from 'react';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

// StatusBadge component
const CONFIG = {
  complete: { label: 'Complete', icon: CheckCircle, bg: 'bg-green-50 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', border: 'border-green-200 dark:border-green-700/50' },
  warning:  { label: 'Needs Work', icon: AlertTriangle, bg: 'bg-amber-50 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-400', border: 'border-amber-200 dark:border-amber-700/50' },
  missing:  { label: 'Missing', icon: XCircle, bg: 'bg-red-50 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', border: 'border-red-200 dark:border-red-700/50' },
};

export default function StatusBadge({ status = 'complete', showLabel = true }) {
  const cfg = CONFIG[status] || CONFIG.complete;
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
      <Icon size={11} className="flex-shrink-0" />
      {showLabel && cfg.label}
    </span>
  );
}
