import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Monitor, Moon, Sun, Bell, Shield, User, Lock, Palette, Save, 
  Eye, EyeOff, Camera, Settings as SettingsIcon, CheckCircle, AlertCircle
} from 'lucide-react';
import { Card, Button, Input } from '../components/ui/index.js';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    // Profile Settings
    name: 'Shay Acoca',
    email: 'shay@example.com',
    bio: 'Digital Creator & Full-Stack Developer',
    avatar: '/api/placeholder/150/150',
    
    // Account Settings
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    projectUpdates: true,
    marketingEmails: false,
    
    // Appearance Settings
    theme: 'dark',
    accentColor: 'cyan',
    fontSize: 'medium',
    
    // Privacy Settings
    profileVisibility: 'public',
    showEmail: false,
    showProjects: true,
    
    // Language & Region
    language: 'en',
    timezone: 'UTC-8',
    dateFormat: 'MM/DD/YYYY'
  });

  const [saveStatus, setSaveStatus] = useState(null);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSaveStatus('success');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'account', name: 'Account', icon: Lock },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'privacy', name: 'Privacy', icon: Shield },
    { id: 'preferences', name: 'Preferences', icon: SettingsIcon }
  ];

  const themeOptions = [
    { id: 'dark', name: 'Dark', icon: Moon },
    { id: 'light', name: 'Light', icon: Sun },
    { id: 'auto', name: 'Auto', icon: Monitor }
  ];

  const accentColors = [
    { id: 'cyan', name: 'Cyan', color: 'bg-cyan-500' },
    { id: 'blue', name: 'Blue', color: 'bg-blue-500' },
    { id: 'purple', name: 'Purple', color: 'bg-purple-500' },
    { id: 'pink', name: 'Pink', color: 'bg-pink-500' },
    { id: 'green', name: 'Green', color: 'bg-green-500' }
  ];

  const ProfileSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-r from-neon-cyan/20 to-neon-blue/20 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-neon-cyan" />
          </div>
          <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-neon-cyan rounded-full flex items-center justify-center hover:bg-neon-cyan/80 transition-colors">
            <Camera className="w-4 h-4 text-white" />
          </button>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Profile Photo</h3>
          <p className="text-gray-400 text-sm">Update your profile picture</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          type="text"
          label="Full Name"
          value={settings.name}
          onChange={(e) => handleSettingChange('name', e.target.value)}
          variant="glass"
        />
        <Input
          type="email"
          label="Email Address"
          value={settings.email}
          onChange={(e) => handleSettingChange('email', e.target.value)}
          variant="glass"
        />
      </div>

      <div>
        <label className="block text-white text-sm font-medium mb-2">Bio</label>
        <textarea
          value={settings.bio}
          onChange={(e) => handleSettingChange('bio', e.target.value)}
          rows={4}
          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-cyan/50 focus:bg-white/10 transition-all resize-none"
          placeholder="Tell us about yourself..."
        />
      </div>
    </div>
  );

  const AccountSettings = () => (
    <div className="space-y-6">
      <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-400" />
          <p className="text-yellow-200 text-sm">
            Password changes will require re-authentication on all devices.
          </p>
        </div>
      </div>

      <Input
        type={showPassword ? 'text' : 'password'}
        label="Current Password"
        value={settings.currentPassword}
        onChange={(e) => handleSettingChange('currentPassword', e.target.value)}
        variant="glass"
        icon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          type="password"
          label="New Password"
          value={settings.newPassword}
          onChange={(e) => handleSettingChange('newPassword', e.target.value)}
          variant="glass"
        />
        <Input
          type="password"
          label="Confirm New Password"
          value={settings.confirmPassword}
          onChange={(e) => handleSettingChange('confirmPassword', e.target.value)}
          variant="glass"
        />
      </div>
    </div>
  );

  const NotificationSettings = () => (
    <div className="space-y-6">
      {[
        { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
        { key: 'pushNotifications', label: 'Push Notifications', desc: 'Receive push notifications in browser' },
        { key: 'projectUpdates', label: 'Project Updates', desc: 'Get notified about project status changes' },
        { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Receive promotional content and updates' }
      ].map((item) => (
        <div key={item.key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
          <div>
            <h4 className="text-white font-medium">{item.label}</h4>
            <p className="text-gray-400 text-sm">{item.desc}</p>
          </div>
          <button
            onClick={() => handleSettingChange(item.key, !settings[item.key])}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              settings[item.key] ? 'bg-neon-cyan' : 'bg-gray-600'
            }`}
          >
            <div
              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                settings[item.key] ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      ))}
    </div>
  );

  const AppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-white font-medium mb-4">Theme</h4>
        <div className="grid grid-cols-3 gap-4">
          {themeOptions.map((theme) => {
            const Icon = theme.icon;
            return (
              <button
                key={theme.id}
                onClick={() => handleSettingChange('theme', theme.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  settings.theme === theme.id
                    ? 'border-neon-cyan bg-neon-cyan/10'
                    : 'border-white/20 bg-white/5 hover:bg-white/10'
                }`}
              >
                <Icon className="w-6 h-6 text-white mx-auto mb-2" />
                <p className="text-white text-sm">{theme.name}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h4 className="text-white font-medium mb-4">Accent Color</h4>
        <div className="flex gap-3">
          {accentColors.map((color) => (
            <button
              key={color.id}
              onClick={() => handleSettingChange('accentColor', color.id)}
              className={`w-12 h-12 rounded-full ${color.color} relative ${
                settings.accentColor === color.id ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-900' : ''
              }`}
            >
              {settings.accentColor === color.id && (
                <CheckCircle className="w-6 h-6 text-white absolute inset-0 m-auto" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-white text-sm font-medium mb-2">Font Size</label>
        <select
          value={settings.fontSize}
          onChange={(e) => handleSettingChange('fontSize', e.target.value)}
          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-neon-cyan/50"
        >
          <option value="small" className="bg-gray-800">Small</option>
          <option value="medium" className="bg-gray-800">Medium</option>
          <option value="large" className="bg-gray-800">Large</option>
        </select>
      </div>
    </div>
  );

  const PrivacySettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-white text-sm font-medium mb-2">Profile Visibility</label>
        <select
          value={settings.profileVisibility}
          onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-neon-cyan/50"
        >
          <option value="public" className="bg-gray-800">Public</option>
          <option value="private" className="bg-gray-800">Private</option>
          <option value="contacts" className="bg-gray-800">Contacts Only</option>
        </select>
      </div>

      {[
        { key: 'showEmail', label: 'Show Email Address', desc: 'Display your email on your public profile' },
        { key: 'showProjects', label: 'Show Projects', desc: 'Display your projects on your public profile' }
      ].map((item) => (
        <div key={item.key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
          <div>
            <h4 className="text-white font-medium">{item.label}</h4>
            <p className="text-gray-400 text-sm">{item.desc}</p>
          </div>
          <button
            onClick={() => handleSettingChange(item.key, !settings[item.key])}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              settings[item.key] ? 'bg-neon-cyan' : 'bg-gray-600'
            }`}
          >
            <div
              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                settings[item.key] ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      ))}
    </div>
  );

  const PreferencesSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white text-sm font-medium mb-2">Language</label>
          <select
            value={settings.language}
            onChange={(e) => handleSettingChange('language', e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-neon-cyan/50"
          >
            <option value="en" className="bg-gray-800">English</option>
            <option value="fr" className="bg-gray-800">Français</option>
            <option value="es" className="bg-gray-800">Español</option>
            <option value="de" className="bg-gray-800">Deutsch</option>
          </select>
        </div>

        <div>
          <label className="block text-white text-sm font-medium mb-2">Timezone</label>
          <select
            value={settings.timezone}
            onChange={(e) => handleSettingChange('timezone', e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-neon-cyan/50"
          >
            <option value="UTC-8" className="bg-gray-800">Pacific Time (UTC-8)</option>
            <option value="UTC-5" className="bg-gray-800">Eastern Time (UTC-5)</option>
            <option value="UTC+0" className="bg-gray-800">GMT (UTC+0)</option>
            <option value="UTC+1" className="bg-gray-800">Central European (UTC+1)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-white text-sm font-medium mb-2">Date Format</label>
        <select
          value={settings.dateFormat}
          onChange={(e) => handleSettingChange('dateFormat', e.target.value)}
          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-neon-cyan/50"
        >
          <option value="MM/DD/YYYY" className="bg-gray-800">MM/DD/YYYY</option>
          <option value="DD/MM/YYYY" className="bg-gray-800">DD/MM/YYYY</option>
          <option value="YYYY-MM-DD" className="bg-gray-800">YYYY-MM-DD</option>
        </select>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile': return <ProfileSettings />;
      case 'account': return <AccountSettings />;
      case 'notifications': return <NotificationSettings />;
      case 'appearance': return <AppearanceSettings />;
      case 'privacy': return <PrivacySettings />;
      case 'preferences': return <PreferencesSettings />;
      default: return <ProfileSettings />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          <span className="bg-gradient-to-r from-neon-cyan to-neon-blue bg-clip-text text-transparent">Settings</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Customize your experience and manage your account preferences.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-1"
        >
          <Card variant="glass" className="p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                      activeTab === tab.id
                        ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </Card>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-3"
        >
          <Card variant="glass" className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">
                {tabs.find(tab => tab.id === activeTab)?.name}
              </h2>
              
              {/* Save Status */}
              {saveStatus && (
                <div className="flex items-center gap-2">
                  {saveStatus === 'saving' && (
                    <>
                      <div className="w-4 h-4 border-2 border-neon-cyan/30 border-t-neon-cyan rounded-full animate-spin" />
                      <span className="text-gray-300 text-sm">Saving...</span>
                    </>
                  )}
                  {saveStatus === 'success' && (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 text-sm">Saved successfully!</span>
                    </>
                  )}
                </div>
              )}
            </div>

            {renderTabContent()}

            {/* Save Button */}
            <div className="flex justify-end mt-8 pt-6 border-t border-white/10">
              <Button
                variant="primary"
                onClick={handleSave}
                disabled={saveStatus === 'saving'}
                className="min-w-32"
              >
                {saveStatus === 'saving' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;
