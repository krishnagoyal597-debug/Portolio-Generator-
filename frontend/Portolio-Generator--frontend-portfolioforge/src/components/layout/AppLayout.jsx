import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, FolderOpen, Layers, Settings, HelpCircle,
  Moon, Sun, User, Sparkles, LogOut, ChevronLeft, ChevronRight,
  PlusCircle, Menu, X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

const NAV = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
  { label: 'My Portfolios', icon: FolderOpen, to: '/dashboard/portfolios' },
  { label: 'Themes', icon: Layers, to: '/dashboard/templates' },
  { label: 'Settings', icon: Settings, to: '/dashboard/settings' },
];

function SidebarContent({ collapsed, onToggle }) {
  const { darkMode, toggleDarkMode } = useApp();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className={`flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 transition-all duration-300 ${collapsed ? 'w-16' : 'w-60'}`}>
      {/* Logo */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
        {!collapsed && (
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center"><Sparkles size={13} className="text-white" /></div>
            <span className="font-bold text-gray-900 dark:text-gray-100">PortfolioForge</span>
          </button>
        )}
        {collapsed && <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center mx-auto"><Sparkles size={13} className="text-white" /></div>}
        <button onClick={onToggle} className={`p-1 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${collapsed ? 'hidden' : ''}`}>
          <ChevronLeft size={15} />
        </button>
      </div>

      {/* Create button */}
      {!collapsed ? (
        <div className="px-3 py-3 flex-shrink-0">
          <button
            onClick={() => navigate('/create/upload')}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            <PlusCircle size={15} /> New Portfolio
          </button>
        </div>
      ) : (
        <div className="px-2 py-3 flex-shrink-0">
          <button onClick={() => navigate('/create/upload')} className="w-full flex items-center justify-center p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors">
            <PlusCircle size={16} />
          </button>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-2 py-1 space-y-0.5 overflow-y-auto">
        {NAV.map(item => (
          <NavLink key={item.to} to={item.to} end={item.to === '/dashboard'}
            className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200'} ${collapsed ? 'justify-center' : ''}`}
          >
            <item.icon size={17} className="flex-shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-2 pb-4 space-y-0.5 flex-shrink-0 border-t border-gray-100 dark:border-gray-800 pt-2">
        <button onClick={toggleDarkMode} className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors ${collapsed ? 'justify-center' : ''}`}>
          {darkMode ? <Sun size={17} className="flex-shrink-0" /> : <Moon size={17} className="flex-shrink-0" />}
          {!collapsed && <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>
        <button className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors ${collapsed ? 'justify-center' : ''}`}>
          <HelpCircle size={17} className="flex-shrink-0" />
          {!collapsed && <span>Help</span>}
        </button>
        <button onClick={logout} className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors ${collapsed ? 'justify-center' : ''}`}>
          <LogOut size={17} className="flex-shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>

        {/* User */}
        {!collapsed && user && (
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl mt-1">
            <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{user.name[0]}</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate">{user.name}</p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-shrink-0">
        <SidebarContent collapsed={collapsed} onToggle={() => setCollapsed(v => !v)} />
      </div>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="relative flex-shrink-0">
            <SidebarContent collapsed={false} onToggle={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between px-4 h-14 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
          <button onClick={() => setMobileOpen(true)} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center"><Sparkles size={11} className="text-white" /></div>
            <span className="font-bold text-sm text-gray-900 dark:text-gray-100">PortfolioForge</span>
          </div>
          <div className="w-8" />
        </div>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
