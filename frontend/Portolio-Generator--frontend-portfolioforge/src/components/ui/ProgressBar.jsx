import React from 'react';

export function ProgressBar({ value = 0, max = 100, className = '', showLabel = false, color = 'indigo' }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const colors = {
    indigo: 'bg-indigo-600',
    green: 'bg-green-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
  };
  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>{value}</span>
          <span>{max}</span>
        </div>
      )}
      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${colors[color] || colors.indigo}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// Circular score indicator
export function ScoreCircle({ score = 0, max = 100, size = 140 }) {
  const pct = score / max;
  const r = (size - 16) / 2;
  const circ = 2 * Math.PI * r;
  const dash = circ * pct;
  const gap = circ - dash;

  const color = score >= 80 ? '#22c55e' : score >= 55 ? '#f59e0b' : '#ef4444';

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        {/* Track */}
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e7eb" strokeWidth={8} />
        {/* Progress */}
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color} strokeWidth={8}
          strokeDasharray={`${dash} ${gap}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 1s ease-out' }}
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">{score}</div>
        <div className="text-xs text-gray-400">/ {max}</div>
      </div>
    </div>
  );
}

export default ProgressBar;
