import React, { useEffect, useState } from 'react';
import { Search, Shield, Trash2, UserCheck, UserX, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import { mockAdminUsers } from '../../data/mockData';
// import adminService from '../../services/adminService';
import { useApp } from '../../context/AppContext';

export default function AdminUsers() {
  const { addToast } = useApp();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock adminService call
    setTimeout(() => {
      setUsers(mockAdminUsers || [
        { id: 1, name: 'Anshika Bansal', email: 'anshika@example.com', portfolios: 2, status: 'active', joined: '2024-01-15', lastActive: '2 mins ago' },
        { id: 2, name: 'John Doe', email: 'john@example.com', portfolios: 1, status: 'suspended', joined: '2024-02-10', lastActive: '5 days ago' }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleSuspend = (user) => {
    setUsers(users.map(u => u.id === user.id ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u));
    addToast({ message: `User ${user.name} ${user.status === 'active' ? 'suspended' : 'activated'}.`, type: 'success' });
  };

  const handleDelete = () => {
    setUsers(users.filter(u => u.id !== confirmDelete.id));
    addToast({ message: `User ${confirmDelete.name} deleted.`, type: 'success' });
    setConfirmDelete(null);
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || u.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6 relative">
      <h1 className="text-3xl font-bold mb-6">Users</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-gray-100 focus:outline-none focus:border-indigo-500 transition-colors"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex bg-gray-900 border border-gray-800 rounded-lg p-1">
          {['All', 'Active', 'Suspended'].map(status => (
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
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">Portfolios</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Joined</th>
                <th className="px-6 py-4 font-medium">Last Active</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold text-white">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-100">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">{user.portfolios}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${user.status === 'active' ? 'bg-green-900/40 text-green-400 border-green-700/50' : 'bg-red-900/40 text-red-400 border-red-700/50'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">{user.joined}</td>
                  <td className="px-6 py-4 text-sm text-gray-400">{user.lastActive}</td>
                  <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                    <button className="p-1.5 text-gray-400 hover:text-indigo-400 transition-colors rounded-lg hover:bg-gray-800"><Shield size={16} /></button>
                    <button onClick={() => handleSuspend(user)} className={`p-1.5 transition-colors rounded-lg hover:bg-gray-800 ${user.status === 'active' ? 'text-gray-400 hover:text-amber-400' : 'text-amber-400'}`}>
                      {user.status === 'active' ? <UserX size={16} /> : <UserCheck size={16} />}
                    </button>
                    <button onClick={() => setConfirmDelete(user)} className="p-1.5 text-gray-400 hover:text-red-400 transition-colors rounded-lg hover:bg-gray-800"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-800 flex items-center justify-between text-sm text-gray-400">
          <button className="flex items-center gap-1 hover:text-gray-200 transition-colors disabled:opacity-50" disabled={page === 1}><ChevronLeft size={16} /> Prev</button>
          <span>Page {page} of 1</span>
          <button className="flex items-center gap-1 hover:text-gray-200 transition-colors disabled:opacity-50" disabled={true}>Next <ChevronRight size={16} /></button>
        </div>
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 max-w-sm w-full">
            <div className="flex items-center gap-3 mb-4 text-red-400">
              <AlertTriangle size={24} />
              <h3 className="text-lg font-semibold text-gray-100">Delete User</h3>
            </div>
            <p className="text-gray-400 text-sm mb-6">Are you sure you want to delete {confirmDelete.name}? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setConfirmDelete(null)} className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-700 transition-colors">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
