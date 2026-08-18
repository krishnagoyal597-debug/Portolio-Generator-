import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, PlusCircle, FolderOpen, Layers, Settings,
  HelpCircle, ChevronLeft, ChevronRight, Moon, Sun, User, Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const navItems = [
  { label: 'Dashboard',        icon: LayoutDashboard, to: '/dashboard' },
  { label: 'Create Portfolio', icon: PlusCircle,       to: '/create' },
  { label: 'My Portfolios',    icon: FolderOpen,       to: '/portfolios' },
  { label: 'Templates',        icon: Layers,            to: '/templates' },
  { label: 'Settings',         icon: Settings,          to: '/settings' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { darkMode, toggleDarkMode } = useApp();
  const navigate = useNavigate();

  return (
    <aside
      className={`
        flex-shrink-0 flex flex-col bg-white dark:bg-gray-900
        border-r border-gray-100 dark:border-gray-800
        transition-all duration-300 ease-in-out h-full
        ${collapsed ? 'w-16' : 'w-60'}
      `}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-gray-100 dark:border-gray-800">
        {!collapsed && (
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0">
              <Sparkles size={14} className="text-white" />
            </div>
            <span className="text-base font-bold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 transition-colors">
              PortfolioForge
            </span>
          </button>
        )}
        {collapsed && (
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center mx-auto">
            <Sparkles size={14} className="text-white" />
          </div>
        )}
        <button
          onClick={() => setCollapsed(v => !v)}
          className={`p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${collapsed ? 'hidden' : ''}`}
        >
          <ChevronLeft size={16} />
        </button>
      </div>

      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="mt-2 mx-auto p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      )}

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
              transition-all duration-150
              ${isActive
                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200'
              }
              ${collapsed ? 'justify-center' : ''}
            `}
          >
            <item.icon size={18} className="flex-shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-2 py-4 border-t border-gray-100 dark:border-gray-800 space-y-1">
        <button
          onClick={toggleDarkMode}
          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200 transition-colors ${collapsed ? 'justify-center' : ''}`}
        >
          {darkMode ? <Sun size={18} className="flex-shrink-0" /> : <Moon size={18} className="flex-shrink-0" />}
          {!collapsed && <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>
        <button className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors ${collapsed ? 'justify-center' : ''}`}>
          <HelpCircle size={18} className="flex-shrink-0" />
          {!collapsed && <span>Help</span>}
        </button>

        {/* User */}
        <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center flex-shrink-0">
            <User size={14} className="text-indigo-600 dark:text-indigo-400" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">Anshika Bansal</p>
              <p className="text-xs text-gray-400 truncate">anshika@email.com</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
