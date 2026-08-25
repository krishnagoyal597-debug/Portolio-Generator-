import React, { useState } from 'react';
import { Check, X, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';

// ─── Toast ────────────────────────────────────────────────────────────────────
const ICONS = {
  success: <CheckCircle size={16} className="text-green-500 flex-shrink-0" />,
  error:   <XCircle size={16} className="text-red-500 flex-shrink-0" />,
  warning: <AlertTriangle size={16} className="text-amber-500 flex-shrink-0" />,
  info:    <Info size={16} className="text-blue-500 flex-shrink-0" />,
};

export function Toast({ id, message, type = 'info' }) {
  const { removeToast } = useApp();
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border shadow-lg min-w-[240px] max-w-[360px] animate-slide-up
      ${type === 'success' ? 'border-green-100 dark:border-green-800' : ''}
      ${type === 'error'   ? 'border-red-100 dark:border-red-800'   : ''}
      ${type === 'warning' ? 'border-amber-100 dark:border-amber-800': ''}
      ${type === 'info'    ? 'border-blue-100 dark:border-blue-800'  : ''}
    `}>
      {ICONS[type]}
      <p className="text-sm text-gray-800 dark:text-gray-100 flex-1 leading-snug">{message}</p>
      <button onClick={() => removeToast(id)} className="p-0.5 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex-shrink-0">
        <X size={14} />
      </button>
    </div>
  );
}

export function ToastContainer() {
  const { toasts } = useApp();
  if (!toasts.length) return null;
  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => (
        <div key={t.id} className="pointer-events-auto">
          <Toast {...t} />
        </div>
      ))}
    </div>
  );
}

export default Toast;
