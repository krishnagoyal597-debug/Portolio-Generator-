import React, { useState } from 'react';
import { mockAnalyticsData, mockThemePopularity } from '../../data/mockData';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

export default function AdminAnalytics() {
  const [period, setPeriod] = useState('week');
  const data = mockAnalyticsData?.[period] || [];

  const chartTooltipStyle = { contentStyle: { background: '#111827', border: '1px solid #374151', borderRadius: 8, color: '#f3f4f6' } };
  const chartAxisStyle = { stroke: '#6b7280', tick: { fill: '#9ca3af', fontSize: 11 } };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <div className="flex bg-gray-900 border border-gray-800 rounded-lg p-1">
          {['week', 'month', 'year'].map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-1.5 rounded-md text-sm capitalize transition-colors ${period === p ? 'bg-gray-800 text-gray-100' : 'text-gray-400 hover:text-gray-200'}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Generations', value: '12,482' },
          { label: 'Avg Score', value: '68/100' },
          { label: 'Success Rate', value: '94.2%' },
          { label: 'Active Users', value: '247' }
        ].map((stat, i) => (
          <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-100">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-100 mb-6">Users & Generations</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis dataKey="name" {...chartAxisStyle} />
              <YAxis {...chartAxisStyle} />
              <Tooltip {...chartTooltipStyle} />
              <Legend wrapperStyle={{ color: '#9ca3af' }} />
              <Line type="monotone" dataKey="users" name="Active Users" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="generations" name="Generations" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-100 mb-6">Portfolios Created</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis dataKey="name" {...chartAxisStyle} />
              <YAxis {...chartAxisStyle} />
              <Tooltip {...chartTooltipStyle} cursor={{ fill: '#1f2937' }} />
              <Bar dataKey="portfolios" name="Portfolios" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-gray-100 mb-6">Theme Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={mockThemePopularity || []} cx="50%" cy="50%" innerRadius={70} outerRadius={90} paddingAngle={2} dataKey="value">
                  {(mockThemePopularity || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#111827" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip {...chartTooltipStyle} />
                <Legend wrapperStyle={{ color: '#9ca3af', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 overflow-x-auto">
          <h2 className="text-lg font-semibold text-gray-100 mb-4">Top Users</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="pb-3 text-gray-400 font-medium text-sm">User</th>
                <th className="pb-3 text-gray-400 font-medium text-sm text-right">Generations</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Anshika Bansal', count: 142 },
                { name: 'Alex Chen', count: 89 },
                { name: 'Sarah Doe', count: 76 },
                { name: 'Elena Rostova', count: 45 },
                { name: 'Mike Smith', count: 32 },
              ].map((row, i) => (
                <tr key={i} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                  <td className="py-3 text-gray-100 text-sm">{row.name}</td>
                  <td className="py-3 text-gray-300 text-sm font-medium text-right">{row.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
