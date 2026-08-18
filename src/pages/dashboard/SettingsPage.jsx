import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import { User, Mail, Lock, Moon, Sun, Monitor, Bell, Shield, Trash2, CheckCircle2 } from 'lucide-react';

const SettingsPage = () => {
  const { user } = useAuth();
  const { darkMode, toggleDarkMode, addToast } = useApp();
  
  const [profileForm, setProfileForm] = useState({
    name: user?.name || 'Developer',
    email: user?.email || 'developer@example.com'
  });
  
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [preferences, setPreferences] = useState({
    autoSave: true,
    emailNotifications: true,
    defaultTheme: 'bento'
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);

  const handleProfileSave = (e) => {
    e.preventDefault();
    setSavingProfile(true);
    setTimeout(() => {
      setSavingProfile(false);
      addToast('success', 'Profile updated successfully');
    }, 800);
  };

  const handlePasswordSave = (e) => {
    e.preventDefault();
    if (passwordForm.new !== passwordForm.confirm) {
      addToast('error', 'New passwords do not match');
      return;
    }
    addToast('success', 'Password changed successfully');
    setPasswordForm({ current: '', new: '', confirm: '' });
  };

  const togglePreference = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    addToast('success', 'Preference updated');
  };

  const confirmDeleteAccount = () => {
    addToast('info', 'Account deletion is mocked for this demo.');
    setDeleteModalOpen(false);
  };

  // Avatar initials generator
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'U';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your account preferences and settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Settings Navigation (Optional for sidebar on large screens, but inline works well too) */}
        {/* We'll use a stacked layout for simplicity here as it's cleaner */}
        <div className="lg:col-span-12 space-y-8">
          
          {/* Section: Profile */}
          <Card className="border border-gray-200 dark:border-gray-800">
             <div className="border-b border-gray-100 dark:border-gray-800 pb-4 mb-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <User size={20} className="text-indigo-500" /> Profile Information
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Update your account's profile information and email address.</p>
             </div>

             <div className="flex flex-col sm:flex-row gap-8 mb-8">
               <div className="flex-shrink-0 flex flex-col items-center gap-3">
                 <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-md">
                   {getInitials(profileForm.name)}
                 </div>
                 <Button variant="ghost" size="sm">Change Avatar</Button>
               </div>
               
               <form className="flex-1 space-y-4" onSubmit={handleProfileSave}>
                 <Input 
                   label="Full Name" 
                   value={profileForm.name}
                   onChange={e => setProfileForm({...profileForm, name: e.target.value})}
                   icon={<User size={16} className="text-gray-400" />}
                 />
                 <Input 
                   label="Email Address" 
                   type="email"
                   value={profileForm.email}
                   onChange={e => setProfileForm({...profileForm, email: e.target.value})}
                   icon={<Mail size={16} className="text-gray-400" />}
                 />
                 <div className="flex justify-end pt-2">
                   <Button type="submit" variant="primary" loading={savingProfile} icon={<CheckCircle2 size={16}/>}>
                     Save Changes
                   </Button>
                 </div>
               </form>
             </div>
          </Card>

          {/* Section: Appearance */}
          <Card className="border border-gray-200 dark:border-gray-800">
             <div className="border-b border-gray-100 dark:border-gray-800 pb-4 mb-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Sun size={20} className="text-amber-500" /> Appearance
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Customize how PortfolioForge looks on your device.</p>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div 
                 onClick={() => { if(darkMode) toggleDarkMode(); }}
                 className={`cursor-pointer p-4 rounded-xl border-2 flex items-center gap-4 transition-colors ${!darkMode ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300'}`}
               >
                 <div className={`p-2 rounded-lg ${!darkMode ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-500 dark:bg-gray-700'}`}>
                   <Sun size={20} />
                 </div>
                 <div>
                   <h3 className="font-semibold text-gray-900 dark:text-white">Light Mode</h3>
                   <p className="text-xs text-gray-500 dark:text-gray-400">Crisp and clear</p>
                 </div>
               </div>

               <div 
                 onClick={() => { if(!darkMode) toggleDarkMode(); }}
                 className={`cursor-pointer p-4 rounded-xl border-2 flex items-center gap-4 transition-colors ${darkMode ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300'}`}
               >
                 <div className={`p-2 rounded-lg ${darkMode ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400' : 'bg-gray-100 text-gray-500 dark:bg-gray-700'}`}>
                   <Moon size={20} />
                 </div>
                 <div>
                   <h3 className="font-semibold text-gray-900 dark:text-white">Dark Mode</h3>
                   <p className="text-xs text-gray-500 dark:text-gray-400">Easy on the eyes</p>
                 </div>
               </div>
             </div>
          </Card>

          {/* Section: Preferences */}
          <Card className="border border-gray-200 dark:border-gray-800">
             <div className="border-b border-gray-100 dark:border-gray-800 pb-4 mb-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Monitor size={20} className="text-blue-500" /> App Preferences
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage defaults and notifications.</p>
             </div>

             <div className="space-y-6">
               <div className="flex items-center justify-between">
                 <div>
                   <h3 className="font-medium text-gray-900 dark:text-white">Auto-save Drafts</h3>
                   <p className="text-sm text-gray-500 dark:text-gray-400">Automatically save your portfolio while editing.</p>
                 </div>
                 <button 
                   onClick={() => togglePreference('autoSave')}
                   className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${preferences.autoSave ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}`}
                 >
                   <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${preferences.autoSave ? 'translate-x-6' : 'translate-x-1'}`} />
                 </button>
               </div>

               <div className="flex items-center justify-between">
                 <div>
                   <h3 className="font-medium text-gray-900 dark:text-white">Email Notifications</h3>
                   <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates about your published portfolios.</p>
                 </div>
                 <button 
                   onClick={() => togglePreference('emailNotifications')}
                   className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${preferences.emailNotifications ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}`}
                 >
                   <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${preferences.emailNotifications ? 'translate-x-6' : 'translate-x-1'}`} />
                 </button>
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Default Theme</label>
                 <select 
                   value={preferences.defaultTheme}
                   onChange={(e) => { setPreferences({...preferences, defaultTheme: e.target.value}); addToast('success', 'Default theme updated'); }}
                   className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                 >
                   <option value="brutalist">Brutalist</option>
                   <option value="bento">Bento Grid</option>
                   <option value="minimal">Minimal</option>
                   <option value="spatial">Spatial</option>
                   <option value="glassmorphic">Glassmorphic</option>
                   <option value="futuristic">Futuristic</option>
                 </select>
               </div>
             </div>
          </Card>

          {/* Section: Security */}
          <Card className="border border-gray-200 dark:border-gray-800">
             <div className="border-b border-gray-100 dark:border-gray-800 pb-4 mb-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Shield size={20} className="text-emerald-500" /> Security
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Update your password and secure your account.</p>
             </div>

             <form className="space-y-4 max-w-md" onSubmit={handlePasswordSave}>
                <Input 
                  label="Current Password" 
                  type="password"
                  value={passwordForm.current}
                  onChange={e => setPasswordForm({...passwordForm, current: e.target.value})}
                  icon={<Lock size={16} className="text-gray-400" />}
                />
                <Input 
                  label="New Password" 
                  type="password"
                  value={passwordForm.new}
                  onChange={e => setPasswordForm({...passwordForm, new: e.target.value})}
                  icon={<Lock size={16} className="text-gray-400" />}
                />
                <Input 
                  label="Confirm New Password" 
                  type="password"
                  value={passwordForm.confirm}
                  onChange={e => setPasswordForm({...passwordForm, confirm: e.target.value})}
                  icon={<Lock size={16} className="text-gray-400" />}
                />
                <div className="pt-2">
                  <Button type="submit" variant="secondary">Update Password</Button>
                </div>
             </form>
          </Card>

          {/* Section: Danger Zone */}
          <Card className="border border-red-200 dark:border-red-900/30 bg-red-50/30 dark:bg-red-900/10">
             <div className="border-b border-red-100 dark:border-red-900/30 pb-4 mb-6">
                <h2 className="text-lg font-bold text-red-700 dark:text-red-400 flex items-center gap-2">
                  <Trash2 size={20} /> Danger Zone
                </h2>
                <p className="text-sm text-red-600/80 dark:text-red-400/80 mt-1">Irreversible actions for your account.</p>
             </div>

             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
               <div>
                 <h3 className="font-semibold text-gray-900 dark:text-white">Delete Account</h3>
                 <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-md">
                   Permanently delete your account and all of your portfolios. This action cannot be undone.
                 </p>
               </div>
               <Button variant="danger" onClick={() => setDeleteModalOpen(true)}>
                 Delete Account
               </Button>
             </div>
          </Card>

        </div>
      </div>

      {/* Delete Account Modal */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete Account" size="sm">
        <div className="p-6 pt-2">
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-100 dark:border-red-900/50 mb-6 text-red-800 dark:text-red-300 text-sm">
            <strong>Warning:</strong> You are about to permanently delete your account, all published portfolios, and all data. You will lose access immediately.
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              To confirm, type "delete my account"
            </label>
            <Input placeholder="delete my account" />
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={confirmDelete}>Permanently Delete</Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default SettingsPage;
