import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Save, AlertTriangle, Trash2 } from 'lucide-react';

export default function AdminSettings() {
  const { addToast } = useApp();
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [settings, setSettings] = useState({
    appName: 'PortfolioForge',
    defaultTheme: 'bento',
    modelName: 'gemini-1.5-flash',
    maxAttempts: 3,
    timeout: 30
  });

  const handleSave = (section) => {
    addToast({ message: `${section} settings saved successfully.`, type: 'success' });
  };

  const handleDanger = (action) => {
    if(window.confirm(`Are you sure you want to ${action}? This is irreversible.`)) {
      addToast({ message: `${action} completed.`, type: 'info' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6 relative">
      {maintenanceMode && (
        <div className="absolute top-0 left-0 right-0 bg-red-900/50 text-red-200 p-2 text-center text-sm font-medium border-b border-red-800">
          ⚠️ Maintenance Mode is currently active. Users cannot generate new portfolios.
        </div>
      )}
      
      <div className={`max-w-3xl mx-auto ${maintenanceMode ? 'mt-8' : ''}`}>
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6 pb-4 border-b border-gray-800">Platform Settings</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">App Name</label>
              <input 
                type="text" 
                value={settings.appName}
                onChange={e => setSettings({...settings, appName: e.target.value})}
                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-gray-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Default Theme</label>
              <select 
                value={settings.defaultTheme}
                onChange={e => setSettings({...settings, defaultTheme: e.target.value})}
                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-gray-100 focus:outline-none focus:border-indigo-500"
              >
                <option value="bento">Bento Grid</option>
                <option value="minimal">Minimalist</option>
                <option value="futuristic">Futuristic</option>
              </select>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-gray-100">Maintenance Mode</p>
                <p className="text-sm text-gray-500">Disable portfolio generation and show maintenance screen.</p>
              </div>
              <button 
                onClick={() => setMaintenanceMode(!maintenanceMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${maintenanceMode ? 'bg-red-600' : 'bg-gray-700'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${maintenanceMode ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            <div className="pt-4">
              <button onClick={() => handleSave('Platform')} className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium">
                <Save size={18} /> Save Changes
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6 pb-4 border-b border-gray-800">AI Engine Settings</h2>
          
          <div className="bg-amber-900/20 border border-amber-800/50 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertTriangle className="text-amber-500 mt-0.5 shrink-0" size={20} />
            <p className="text-sm text-amber-200/80 leading-relaxed">
              <strong className="text-amber-400">Security Note:</strong> API keys for AI models should be configured via backend environment variables. Never expose API keys in frontend settings.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Model Name</label>
              <input 
                type="text" 
                value={settings.modelName}
                onChange={e => setSettings({...settings, modelName: e.target.value})}
                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-gray-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Max Attempts</label>
                <input 
                  type="number" 
                  value={settings.maxAttempts}
                  onChange={e => setSettings({...settings, maxAttempts: e.target.value})}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-gray-100 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Timeout (seconds)</label>
                <input 
                  type="number" 
                  value={settings.timeout}
                  onChange={e => setSettings({...settings, timeout: e.target.value})}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-gray-100 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="pt-4">
              <button onClick={() => handleSave('AI Engine')} className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium">
                <Save size={18} /> Save AI Settings
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-red-900/30 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-6 pb-4 border-b border-gray-800 text-red-400 flex items-center gap-2">
            <AlertTriangle size={20} /> Danger Zone
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-800 rounded-xl">
              <div>
                <p className="font-medium text-gray-100">Clear All Portfolios</p>
                <p className="text-sm text-gray-500">Permanently delete all generated portfolios.</p>
              </div>
              <button onClick={() => handleDanger('clear portfolios')} className="px-4 py-2 bg-red-900/30 hover:bg-red-900/50 text-red-400 border border-red-800/50 rounded-lg transition-colors text-sm font-medium">
                Clear All
              </button>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-800 rounded-xl">
              <div>
                <p className="font-medium text-gray-100">Reset Analytics</p>
                <p className="text-sm text-gray-500">Wipe all generation and usage statistics.</p>
              </div>
              <button onClick={() => handleDanger('reset analytics')} className="px-4 py-2 bg-red-900/30 hover:bg-red-900/50 text-red-400 border border-red-800/50 rounded-lg transition-colors text-sm font-medium">
                Reset Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
