import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Eye, Edit3, Clock, LayoutTemplate, ArrowRight, TrendingUp } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import Button from '../components/ui/Button';
import Card, { CardTitle, CardDescription } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { mockPortfolios } from '../data/mockData';

export default function Dashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: 'Portfolios Created', value: '2', icon: LayoutTemplate, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/30' },
    { label: 'Profile Completeness', value: '78%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/30' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-10">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                Welcome back 👋
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Create a professional portfolio from your resume.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {stats.map(s => (
              <Card key={s.label} className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${s.bg}`}>
                  <s.icon size={18} className={s.color} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Create new */}
          <div
            onClick={() => navigate('/create')}
            className="mb-10 p-8 rounded-2xl border-2 border-dashed border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-900/10 cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-200 group"
          >
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Plus size={24} className="text-white" />
              </div>
              <div className="text-center sm:text-left flex-1">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">+ Create New Portfolio</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Upload your resume and let AI build a professional portfolio in minutes.
                </p>
              </div>
              <ArrowRight size={20} className="text-indigo-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all flex-shrink-0 hidden sm:block" />
            </div>
          </div>

          {/* Recent portfolios */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Portfolios</h2>
              <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline font-medium">View all</button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {mockPortfolios.map(p => (
                <PortfolioCard key={p.id} portfolio={p} onView={() => navigate('/preview')} onEdit={() => navigate('/create')} />
              ))}

              {/* Empty slot */}
              <div
                onClick={() => navigate('/create')}
                className="flex items-center justify-center p-8 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-gray-400 hover:border-indigo-300 hover:text-indigo-400 cursor-pointer transition-colors"
              >
                <div className="text-center">
                  <Plus size={24} className="mx-auto mb-2" />
                  <p className="text-sm font-medium">New Portfolio</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function PortfolioCard({ portfolio, onView, onEdit }) {
  const statusColors = {
    published: 'bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-700/50',
    draft: 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-700/50',
  };

  return (
    <Card hover className="group !p-0 overflow-hidden">
      {/* Preview bar */}
      <div
        className="h-24 flex items-center justify-center relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${portfolio.previewColor}22 0%, ${portfolio.previewColor}11 100%)` }}
      >
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{ background: portfolio.previewColor + '22', border: `1px solid ${portfolio.previewColor}33` }}>
          <LayoutTemplate size={24} style={{ color: portfolio.previewColor }} />
        </div>
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[portfolio.status]}`}>
            {portfolio.status}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1 truncate">{portfolio.name}</h3>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs text-gray-400 dark:text-gray-500">Template: {portfolio.template}</span>
          <span className="text-gray-200 dark:text-gray-700">·</span>
          <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
            <Clock size={11} /> {portfolio.updatedAt}
          </span>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="secondary" icon={<Eye size={13} />} onClick={onView} className="flex-1 justify-center">
            View
          </Button>
          <Button size="sm" variant="ghost" icon={<Edit3 size={13} />} onClick={onEdit} className="flex-1 justify-center">
            Edit
          </Button>
        </div>
      </div>
    </Card>
  );
}
