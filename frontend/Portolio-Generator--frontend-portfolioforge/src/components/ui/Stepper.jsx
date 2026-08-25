import React from 'react';
import { Check } from 'lucide-react';

export default function Stepper({ steps, currentStep }) {
  return (
    <div className="flex items-center w-full">
      {steps.map((step, i) => {
        const idx = i + 1;
        const isCompleted = idx < currentStep;
        const isCurrent = idx === currentStep;
        const isPending = idx > currentStep;

        return (
          <React.Fragment key={step.label}>
            {/* Step */}
            <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
              {/* Circle */}
              <div
                className={`
                  w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold
                  transition-all duration-300
                  ${isCompleted ? 'bg-indigo-600 text-white' : ''}
                  ${isCurrent ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 dark:ring-indigo-900/50' : ''}
                  ${isPending ? 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500' : ''}
                `}
              >
                {isCompleted ? <Check size={16} /> : idx}
              </div>
              {/* Label */}
              <span
                className={`text-xs font-medium whitespace-nowrap hidden sm:block
                  ${isCurrent ? 'text-indigo-600 dark:text-indigo-400' : ''}
                  ${isCompleted ? 'text-gray-700 dark:text-gray-300' : ''}
                  ${isPending ? 'text-gray-400 dark:text-gray-500' : ''}
                `}
              >
                {step.label}
              </span>
            </div>

            {/* Connector */}
            {i < steps.length - 1 && (
              <div className="flex-1 h-px mx-2 sm:mx-3 transition-colors duration-500"
                style={{ background: isCompleted ? '#4f46e5' : '#e5e7eb' }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
