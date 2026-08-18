import React, { useState } from 'react';
import { Star, Eye, ToggleLeft, ToggleRight, BarChart2 } from 'lucide-react';
import { THEMES, mockThemePopularity } from '../../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useApp } from '../../context/AppContext';

export default function AdminThemes() {
  const { addToast } = useApp();
  const [activeThemes, setActiveThemes] = useState(THEMES.map(t => t.id));
  const [featuredThemes, setFeaturedThemes] = useState(['bento']);

  const toggleActive = (id) => {
    setActiveThemes(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);
    addToast({ message: 'Theme status updated', type: 'success' });
  };

  const toggleFeatured = (id) => {
    setFeaturedThemes(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);
  };

  const chartTooltipStyle = { contentStyle: { background: '#111827', border: '1px solid #374151', borderRadius: 8, color: '#f3f4f6' } };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Themes</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {THEMES.map((theme) => {
          const popularity = (mockThemePopularity?.find(p => p.name === theme.name)?.value || 10);
          const isActive = activeThemes.includes(theme.id);
          const isFeatured = featuredThemes.includes(theme.id);
          
          return (
            <div key={theme.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col">
              <div className="h-24 rounded-xl mb-4 overflow-hidden bg-gray-800 border border-gray-700 relative">
                 <div className="absolute inset-0 flex items-center justify-center opacity-30" style={{background: theme.color}}>
                   <Eye size={32} className="text-white" />
                 </div>
              </div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-100">{theme.name}</h3>
                <button onClick={() => toggleFeatured(theme.id)} className={`p-1 rounded-full ${isFeatured ? 'text-yellow-400' : 'text-gray-600 hover:text-gray-400'}`}>
                  <Star size={18} fill={isFeatured ? "currentColor" : "none"} />
                </button>
              </div>
              <p className="text-sm text-gray-400 mb-4 flex-1 line-clamp-2">{theme.description}</p>
              
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Usage: {popularity}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full" style={{ width: `${popularity}%`, backgroundColor: theme.color }}></div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                <button onClick={() => toggleActive(theme.id)} className={`flex items-center gap-2 text-sm ${isActive ? 'text-green-400' : 'text-gray-500'}`}>
                  {isActive ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                  {isActive ? 'Active' : 'Disabled'}
                </button>
                <button onClick={() => addToast({message: `Managing ${theme.name}`, type:'info'})} className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors text-gray-300">
                  Manage
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-gray-100 mb-6 flex items-center gap-2"><BarChart2 size={20} className="text-indigo-400"/> Theme Popularity Overview</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockThemePopularity || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis dataKey="name" stroke="#6b7280" tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <YAxis stroke="#6b7280" tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <Tooltip {...chartTooltipStyle} cursor={{ fill: '#1f2937' }} />
              <Bar dataKey="value" name="Usage %" radius={[4, 4, 0, 0]}>
                {(mockThemePopularity || []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
