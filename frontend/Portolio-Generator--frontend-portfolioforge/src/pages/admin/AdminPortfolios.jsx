import React, { useState } from 'react';
import { Search, Eye, Trash2, EyeOff } from 'lucide-react';
import { mockAdminPortfolios, THEMES } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function AdminPortfolios() {
  const { addToast } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [themeFilter, setThemeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const portfolios = mockAdminPortfolios || [
    { id: '1', name: 'Dev Portfolio', owner: 'Anshika', theme: 'bento', status: 'published', views: 120, created: '2024-03-01', updated: '2024-03-05' }
  ];

  const themes = ['All', 'bento', 'brutalist', 'minimal', 'spatial', 'glassmorphic', 'futuristic'];

  const getThemeColor = (theme) => {
    switch (theme) {
      case 'bento': return 'bg-indigo-900/40 text-indigo-400 border-indigo-700/50';
      case 'brutalist': return 'bg-gray-800 text-gray-300 border-gray-600';
      case 'minimal': return 'bg-teal-900/40 text-teal-400 border-teal-700/50';
      case 'spatial': return 'bg-sky-900/40 text-sky-400 border-sky-700/50';
      case 'glassmorphic': return 'bg-violet-900/40 text-violet-400 border-violet-700/50';
      case 'futuristic': return 'bg-green-900/40 text-green-400 border-green-700/50';
      default: return 'bg-gray-800 text-gray-400 border-gray-700';
    }
  };

  const filteredPortfolios = portfolios.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.owner.toLowerCase().includes(search.toLowerCase());
    const matchesTheme = themeFilter === 'All' || p.theme === themeFilter;
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter.toLowerCase();
    return matchesSearch && matchesTheme && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Portfolios</h1>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search portfolios..."
            className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-gray-100 focus:outline-none focus:border-indigo-500 transition-colors"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select 
          className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-indigo-500"
          value={themeFilter}
          onChange={(e) => setThemeFilter(e.target.value)}
        >
          {themes.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <div className="flex bg-gray-900 border border-gray-800 rounded-lg p-1">
          {['All', 'Published', 'Draft'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-1.5 rounded-md text-sm transition-colors ${statusFilter === status ? 'bg-gray-800 text-gray-100' : 'text-gray-400 hover:text-gray-200'}`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-800 text-gray-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Portfolio Name</th>
                <th className="px-6 py-4 font-medium">Owner</th>
                <th className="px-6 py-4 font-medium">Theme</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Views</th>
                <th className="px-6 py-4 font-medium">Updated</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPortfolios.map((port, i) => (
                <tr key={port.id || i} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-100">{port.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-400">{port.owner}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getThemeColor(port.theme)}`}>
                      {port.theme}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${port.status === 'published' ? 'bg-green-900/40 text-green-400 border-green-700/50' : 'bg-amber-900/40 text-amber-400 border-amber-700/50'}`}>
                      {port.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">{port.views}</td>
                  <td className="px-6 py-4 text-sm text-gray-400">{port.updated}</td>
                  <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                    <button onClick={() => navigate(`/portfolio/${port.id}`)} className="p-1.5 text-gray-400 hover:text-indigo-400 transition-colors rounded-lg hover:bg-gray-800"><Eye size={16} /></button>
                    <button onClick={() => addToast({message: 'Delete clicked', type: 'info'})} className="p-1.5 text-gray-400 hover:text-red-400 transition-colors rounded-lg hover:bg-gray-800"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
