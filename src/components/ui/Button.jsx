import React from 'react';

// Button component with variants, sizes, loading state
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  icon = null,
  iconRight = null,
  onClick,
  type = 'button',
  className = '',
  ...props
}) {
  const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const variants = {
    primary:   'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-sm',
    secondary: 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-indigo-500',
    ghost:     'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-indigo-500',
    danger:    'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm',
    outline:   'border border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 focus:ring-indigo-500',
    success:   'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
  };

  const sizes = {
    xs: 'text-xs px-2.5 py-1.5',
    sm: 'text-xs px-3 py-2',
    md: 'text-sm px-4 py-2.5',
    lg: 'text-sm px-5 py-3',
    xl: 'text-base px-6 py-3.5',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : icon}
      {children}
      {!loading && iconRight}
    </button>
  );
}
