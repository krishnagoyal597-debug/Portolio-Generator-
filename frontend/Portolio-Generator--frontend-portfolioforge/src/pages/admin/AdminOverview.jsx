import React from 'react';
import { Users, FolderOpen, Zap, TrendingUp, Activity, Star, CheckCircle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { mockAdminStats, mockAnalyticsData, mockThemePopularity } from '../../data/mockData';

export default function AdminOverview() {
  const chartTooltipStyle = { contentStyle: { background: '#111827', border: '1px solid #374151', borderRadius: 8, color: '#f3f4f6' } };
  const chartAxisStyle = { stroke: '#6b7280', tick: { fill: '#9ca3af', fontSize: 11 } };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-100">Overview</h1>
        <p className="text-gray-400 mt-1">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-indigo-900/50 text-indigo-400 rounded-xl"><Users size={24} /></div>
          <div>
            <p className="text-sm text-gray-400">Total Users</p>
            <p className="text-2xl font-bold text-gray-100">1,284</p>
            <p className="text-xs text-green-400">+83 this week</p>
          </div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-violet-900/50 text-violet-400 rounded-xl"><FolderOpen size={24} /></div>
          <div>
            <p className="text-sm text-gray-400">Total Portfolios</p>
            <p className="text-2xl font-bold text-gray-100">3,492</p>
            <p className="text-xs text-green-400">+124 this week</p>
          </div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-blue-900/50 text-blue-400 rounded-xl"><Zap size={24} /></div>
          <div>
            <p className="text-sm text-gray-400">AI Generations</p>
            <p className="text-2xl font-bold text-gray-100">4,827</p>
            <p className="text-xs text-green-400">+412 this week</p>
          </div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-center gap-4">
          <div className="p-3 bg-green-900/50 text-green-400 rounded-xl"><CheckCircle size={24} /></div>
          <div>
            <p className="text-sm text-gray-400">Published</p>
            <p className="text-2xl font-bold text-gray-100">2,145</p>
            <p className="text-xs text-green-400">+93 this week</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
          <h2 className="text-lg font-semibold text-gray-100 mb-4">User Growth — This Month</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockAnalyticsData?.month || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="name" {...chartAxisStyle} />
                <YAxis {...chartAxisStyle} />
                <Tooltip {...chartTooltipStyle} />
                <Line type="monotone" dataKey="users" stroke="#6366f1" strokeWidth={2} dot={{ r: 4, fill: '#6366f1', strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
          <h2 className="text-lg font-semibold text-gray-100 mb-4">Daily Generations</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockAnalyticsData?.month || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="name" {...chartAxisStyle} />
                <YAxis {...chartAxisStyle} />
                <Tooltip {...chartTooltipStyle} cursor={{ fill: '#1f2937' }} />
                <Bar dataKey="generations" fill="#7c3aed" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
          <h2 className="text-lg font-semibold text-gray-100 mb-4">Theme Popularity</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={mockThemePopularity || []} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {(mockThemePopularity || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip {...chartTooltipStyle} />
                <Legend wrapperStyle={{ fontSize: '12px', color: '#9ca3af' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col justify-between">
          <h2 className="text-lg font-semibold text-gray-100 mb-4">Platform Health</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Avg Score</span>
                <span className="text-gray-100 font-medium">68/100</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Success Rate</span>
                <span className="text-gray-100 font-medium">94.2%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '94.2%' }}></div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-800">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-100">247</p>
                <p className="text-xs text-gray-500">Active Today</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-100">83</p>
                <p className="text-xs text-gray-500">New This Week</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 overflow-x-auto">
        <h2 className="text-lg font-semibold text-gray-100 mb-4">Recent Activity</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="pb-3 text-gray-400 font-medium text-sm">User</th>
              <th className="pb-3 text-gray-400 font-medium text-sm">Action</th>
              <th className="pb-3 text-gray-400 font-medium text-sm">Portfolio</th>
              <th className="pb-3 text-gray-400 font-medium text-sm text-right">Time</th>
            </tr>
          </thead>
          <tbody>
            {[
              { user: 'Anshika Bansal', action: 'Generated portfolio', portfolio: 'Bento Grid', time: '2 min ago' },
              { user: 'Alex Chen', action: 'Published portfolio', portfolio: 'Minimalist', time: '15 min ago' },
              { user: 'Sarah Doe', action: 'Updated theme', portfolio: 'Futuristic', time: '1 hour ago' },
              { user: 'Mike Smith', action: 'Created account', portfolio: '-', time: '2 hours ago' },
              { user: 'Elena Rostova', action: 'Generated portfolio', portfolio: 'Spatial', time: '3 hours ago' },
            ].map((row, i) => (
              <tr key={i} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                <td className="py-4 text-gray-100 text-sm">{row.user}</td>
                <td className="py-4 text-gray-400 text-sm">{row.action}</td>
                <td className="py-4 text-gray-100 text-sm">{row.portfolio}</td>
                <td className="py-4 text-gray-500 text-sm text-right">{row.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
