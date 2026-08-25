import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { mockPortfolios } from '../../data/mockData';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import StatusBadge from '../../components/ui/StatusBadge';
import Modal from '../../components/ui/Modal';
import { Plus, LayoutDashboard, FileText, Eye, MoreVertical, Edit3, Trash2, Copy, ExternalLink, Lightbulb } from 'lucide-react';

const DashboardHome = () => {
  const { user } = useAuth();
  const { addToast } = useApp();
  const navigate = useNavigate();
  const [portfolios, setPortfolios] = useState(mockPortfolios.slice(0, 3)); // Just show recent 3
  
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [portfolioToDelete, setPortfolioToDelete] = useState(null);

  const stats = [
    { label: 'Total Portfolios', value: portfolios.length + 1, icon: <LayoutDashboard size={20} className="text-indigo-500"/> },
    { label: 'Published', value: 2, icon: <FileText size={20} className="text-emerald-500"/> },
    { label: 'Drafts', value: 2, icon: <FileText size={20} className="text-amber-500"/> },
    { label: 'Total Views', value: '1,248', icon: <Eye size={20} className="text-blue-500"/> },
  ];

  const handleDeleteClick = (id) => {
    setPortfolioToDelete(id);
    setDeleteModalOpen(true);
    setMenuOpenId(null);
  };

  const confirmDelete = () => {
    setPortfolios(portfolios.filter(p => p.id !== portfolioToDelete));
    addToast('success', 'Portfolio deleted successfully');
    setDeleteModalOpen(false);
  };

  const handleDuplicate = (id) => {
    addToast('success', 'Portfolio duplicated as Draft');
    setMenuOpenId(null);
  };

  const toggleMenu = (e, id) => {
    e.stopPropagation();
    setMenuOpenId(menuOpenId === id ? null : id);
  };

  // Close menu if clicked outside (simple hack for demo)
  const handleContainerClick = () => {
    if (menuOpenId) setMenuOpenId(null);
  };

  const getThemeColor = (themeId) => {
    const map = {
      brutalist: 'bg-black',
      bento: 'bg-blue-500',
      minimal: 'bg-gray-300',
      spatial: 'bg-indigo-400',
      glassmorphic: 'bg-purple-500',
      futuristic: 'bg-green-500'
    };
    return map[themeId] || 'bg-indigo-500';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8" onClick={handleContainerClick}>
      {/* Header Greeting */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.name || 'Developer'} 👋
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Primary Actions & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Create New CTA */}
        <div 
          onClick={() => navigate('/create/upload')}
          className="md:col-span-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl p-6 flex flex-col justify-center items-center cursor-pointer transition-colors shadow-sm group"
        >
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Plus size={24} />
          </div>
          <span className="font-semibold text-lg">Create New</span>
          <span className="text-indigo-200 text-sm mt-1">Portfolio or Resume</span>
        </div>

        {/* Stats */}
        <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <Card key={idx} className="flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  {stat.icon}
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white pl-1">
                {stat.value}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Portfolios */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Portfolios</h2>
          <Button variant="ghost" size="sm" onClick={() => navigate('/portfolios')}>
            View All
          </Button>
        </div>

        {portfolios.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map((portfolio) => (
              <Card key={portfolio.id} hover padding="none" className="overflow-hidden flex flex-col h-full relative">
                {/* Theme Color Bar */}
                <div className={`h-2 w-full ${getThemeColor(portfolio.themeId)}`}></div>
                
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate pr-4" title={portfolio.name}>
                        {portfolio.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 capitalize">
                          {portfolio.themeId}
                        </span>
                        <StatusBadge status={portfolio.status === 'published' ? 'complete' : 'warning'} />
                      </div>
                    </div>
                    
                    {/* Kebab Menu */}
                    <div className="relative">
                      <button 
                        onClick={(e) => toggleMenu(e, portfolio.id)}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <MoreVertical size={20} />
                      </button>
                      
                      {menuOpenId === portfolio.id && (
                        <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-1 z-10">
                          <button onClick={() => { setMenuOpenId(null); navigate(`/create/review`); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
                            <Edit3 size={16}/> Edit Content
                          </button>
                          <button onClick={() => handleDuplicate(portfolio.id)} className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
                            <Copy size={16}/> Duplicate
                          </button>
                          <div className="h-px bg-gray-100 dark:bg-gray-700 my-1"></div>
                          <button onClick={() => handleDeleteClick(portfolio.id)} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2">
                            <Trash2 size={16}/> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex justify-between">
                    <span>{portfolio.views} views</span>
                    <span>Edited {new Date(portfolio.updatedAt).toLocaleDateString()}</span>
                  </div>

                  <div className="mt-auto flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-700/50">
                    <Button variant="secondary" className="flex-1" onClick={() => navigate(`/portfolio/${portfolio.id}`)} icon={<Eye size={16}/>}>
                      Preview
                    </Button>
                    {portfolio.status === 'published' ? (
                      <Button variant="primary" className="flex-1" icon={<ExternalLink size={16}/>} onClick={() => window.open(`/portfolio/${portfolio.id}`, '_blank')}>
                        Visit Site
                      </Button>
                    ) : (
                      <Button variant="primary" className="flex-1" onClick={() => navigate('/create/review')}>
                        Continue
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText size={28} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No portfolios yet</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
              You haven't created any portfolios. Upload your resume or start from scratch to build your first professional portfolio.
            </p>
            <Button variant="primary" onClick={() => navigate('/create/upload')} icon={<Plus size={18}/>}>
              Create First Portfolio
            </Button>
          </Card>
        )}
      </div>

      {/* Quick Tips */}
      <Card className="bg-indigo-50/50 dark:bg-indigo-900/10 border-indigo-100 dark:border-indigo-800/30 flex gap-4 items-start">
        <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-lg flex-shrink-0">
          <Lightbulb size={20} />
        </div>
        <div>
          <h4 className="font-semibold text-indigo-900 dark:text-indigo-300">Pro Tip: Use AI to improve your bullet points</h4>
          <p className="text-sm text-indigo-700 dark:text-indigo-400/80 mt-1">
            When reviewing your extracted resume data, use the "Enhance with AI" button on your work experience items to rewrite them for maximum impact and clarity.
          </p>
        </div>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete Portfolio" size="sm">
        <div className="p-6 pt-2">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Are you sure you want to delete this portfolio? This action cannot be undone and will permanently remove your site.
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={confirmDelete}>Delete Permanently</Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default DashboardHome;
