import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { mockPortfolios } from '../../data/mockData';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import StatusBadge from '../../components/ui/StatusBadge';
import Modal from '../../components/ui/Modal';
import { Search, Filter, Grid, List, Plus, MoreVertical, Edit3, Trash2, Copy, ExternalLink, Eye, LayoutGrid } from 'lucide-react';

const PortfoliosPage = () => {
  const navigate = useNavigate();
  const { addToast } = useApp();
  
  const [portfolios, setPortfolios] = useState(mockPortfolios);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [portfolioToDelete, setPortfolioToDelete] = useState(null);

  // Filtering
  const filteredPortfolios = portfolios.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

  const toggleMenu = (e, id) => {
    e.stopPropagation();
    setMenuOpenId(menuOpenId === id ? null : id);
  };

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
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">My Portfolios</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage and edit your published sites and drafts.</p>
        </div>
        <Button variant="primary" onClick={() => navigate('/create/upload')} icon={<Plus size={18}/>}>
          New Portfolio
        </Button>
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="w-full sm:w-96">
          <Input 
            placeholder="Search portfolios..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search size={18} className="text-gray-400"/>}
          />
        </div>
        <div className="flex w-full sm:w-auto items-center gap-3">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="flex-1 sm:flex-none bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>

          <div className="flex bg-gray-100 dark:bg-gray-900 rounded-xl p-1 border border-gray-200 dark:border-gray-700">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
              title="Grid View"
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
              title="List View"
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Create New Slot */}
          <Card 
            hover 
            onClick={() => navigate('/create/upload')}
            className="border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 flex flex-col items-center justify-center text-center h-full min-h-[300px] cursor-pointer"
          >
            <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mb-4">
              <Plus size={28} />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-1">Create New</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Start from resume or scratch</p>
          </Card>

          {/* Portfolios */}
          {filteredPortfolios.map((portfolio) => (
            <Card key={portfolio.id} padding="none" className="overflow-hidden flex flex-col h-full relative group">
              <div className={`h-2 w-full ${getThemeColor(portfolio.themeId)}`}></div>
              
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate pr-4" title={portfolio.name}>
                      {portfolio.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 capitalize">
                        Theme: {portfolio.themeId}
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
                          <Edit3 size={16}/> Edit
                        </button>
                        <button onClick={() => { setMenuOpenId(null); addToast('success', 'Duplicated successfully'); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
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

                <div className="text-sm text-gray-500 dark:text-gray-400 mb-6 space-y-1">
                  <div className="flex justify-between"><span>Views:</span> <span>{portfolio.views}</span></div>
                  <div className="flex justify-between"><span>Created:</span> <span>{new Date(portfolio.createdAt).toLocaleDateString()}</span></div>
                  <div className="flex justify-between"><span>Edited:</span> <span>{new Date(portfolio.updatedAt).toLocaleDateString()}</span></div>
                </div>

                <div className="mt-auto flex gap-2 pt-4 border-t border-gray-100 dark:border-gray-700/50 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <Button variant="secondary" className="flex-1 text-xs" onClick={() => navigate(`/portfolio/${portfolio.id}`)}>
                    Preview
                  </Button>
                  <Button variant="primary" className="flex-1 text-xs" onClick={() => navigate('/create/review')}>
                    {portfolio.status === 'published' ? 'Edit' : 'Continue'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Theme</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Views</th>
                  <th className="px-6 py-4 font-medium">Last Edited</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredPortfolios.map(portfolio => (
                  <tr key={portfolio.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getThemeColor(portfolio.themeId)}`}></div>
                        {portfolio.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 capitalize text-gray-600 dark:text-gray-300 text-sm">
                      {portfolio.themeId}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={portfolio.status === 'published' ? 'complete' : 'warning'} />
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300 text-sm">
                      {portfolio.views}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300 text-sm">
                       {new Date(portfolio.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button onClick={() => navigate(`/portfolio/${portfolio.id}`)} className="p-2 text-gray-500 hover:text-indigo-600 bg-gray-100 hover:bg-indigo-50 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg">
                           <Eye size={16}/>
                         </button>
                         <button onClick={() => navigate('/create/review')} className="p-2 text-gray-500 hover:text-indigo-600 bg-gray-100 hover:bg-indigo-50 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg">
                           <Edit3 size={16}/>
                         </button>
                         <button onClick={() => handleDeleteClick(portfolio.id)} className="p-2 text-gray-500 hover:text-red-600 bg-gray-100 hover:bg-red-50 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg">
                           <Trash2 size={16}/>
                         </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredPortfolios.length === 0 && (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                No portfolios match your filters.
              </div>
            )}
          </div>
        </div>
      )}

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

export default PortfoliosPage;
