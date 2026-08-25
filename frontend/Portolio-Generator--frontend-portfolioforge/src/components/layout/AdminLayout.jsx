import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { BarChart3, Users, FolderOpen, Layers, Settings, Sparkles, LogOut, Menu, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

const NAV = [
  { label: 'Overview', icon: BarChart3, to: '/admin' },
  { label: 'Users', icon: Users, to: '/admin/users' },
  { label: 'Portfolios', icon: FolderOpen, to: '/admin/portfolios' },
  { label: 'Themes', icon: Layers, to: '/admin/templates' },
  { label: 'Analytics', icon: BarChart3, to: '/admin/analytics' },
  { label: 'Settings', icon: Settings, to: '/admin/settings' },
];

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useApp();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const sidebar = (
    <div className="flex flex-col h-full w-60 bg-gray-900 text-white">
      <div className="flex items-center gap-3 px-5 h-16 border-b border-gray-800 flex-shrink-0">
        <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center"><Sparkles size={13} /></div>
        <div>
          <p className="font-bold text-sm">PortfolioForge</p>
          <div className="flex items-center gap-1"><Shield size={9} className="text-amber-400" /><p className="text-xs text-amber-400 font-medium">Admin</p></div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV.map(item => (
          <NavLink key={item.to} to={item.to} end={item.to === '/admin'}
            className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <item.icon size={16} className="flex-shrink-0" /> {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 pb-5 space-y-1 border-t border-gray-800 pt-3 flex-shrink-0">
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
          <FolderOpen size={16} /> User View
        </button>
        <button onClick={logout} className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm text-gray-400 hover:bg-red-900/30 hover:text-red-400 transition-colors">
          <LogOut size={16} /> Sign Out
        </button>
        {user && (
          <div className="flex items-center gap-3 px-3 py-2 mt-1">
            <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0"><span className="text-xs font-bold">{user.name[0]}</span></div>
            <div className="min-w-0"><p className="text-xs font-semibold text-white truncate">{user.name}</p><p className="text-xs text-gray-500 truncate">{user.email}</p></div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-950 overflow-hidden">
      <div className="hidden lg:flex flex-shrink-0">{sidebar}</div>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="relative">{sidebar}</div>
        </div>
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="lg:hidden flex items-center justify-between px-4 h-14 bg-gray-900 border-b border-gray-800 flex-shrink-0">
          <button onClick={() => setMobileOpen(true)} className="p-2 rounded-lg text-gray-400 hover:bg-gray-800"><Menu size={20} /></button>
          <span className="font-bold text-white text-sm">Admin Panel</span>
          <div className="w-8" />
        </div>
        <main className="flex-1 overflow-y-auto bg-gray-950">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
