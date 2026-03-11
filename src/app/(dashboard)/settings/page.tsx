'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  Bell,
  Key,
  Eye,
  EyeOff,
  Save,
  Copy,
  Check,
  ToggleRight,
  ToggleLeft,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Header } from '@/components/layout/Header';

interface SettingsState {
  apiKey: string;
  apiKeyVisible: boolean;
  notifications: {
    weeklyReport: boolean;
    dailyDigest: boolean;
    alerts: boolean;
    emailNotifications: boolean;
  };
  privacy: {
    shareData: boolean;
    publicProfile: boolean;
  };
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsState>({
    apiKey: 'heyg_demo_key_123456789abcdef',
    apiKeyVisible: false,
    notifications: {
      weeklyReport: true,
      dailyDigest: false,
      alerts: true,
      emailNotifications: true,
    },
    privacy: {
      shareData: true,
      publicProfile: false,
    },
  });

  const [copiedApiKey, setCopiedApiKey] = useState(false);

  const copyApiKey = () => {
    navigator.clipboard.writeText(settings.apiKey);
    setCopiedApiKey(true);
    toast.success('API key copied to clipboard');

    setTimeout(() => setCopiedApiKey(false), 2000);
  };

  const toggleNotification = (
    key: keyof typeof settings.notifications
  ) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  };

  const togglePrivacy = (key: keyof typeof settings.privacy) => {
    setSettings((prev) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: !prev.privacy[key],
      },
    }));
  };

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title="Settings" subtitle="Manage your account and preferences" />

      <div className="flex-1 overflow-auto bg-gradient-to-b from-heygen-dark to-heygen-dark-2">
        <div className="p-6 max-w-4xl mx-auto">
          {/* API Keys section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-lg bg-heygen-dark-2 border border-heygen-dark-5 mb-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Key className="w-5 h-5 text-heygen-teal" />
              <h2 className="text-lg font-semibold text-heygen-white">
                API Keys
              </h2>
            </div>

            <p className="text-heygen-gray text-sm mb-4">
              Manage your HeyGen API keys for integrations
            </p>

            <div className="space-y-4">
              {/* Current API Key */}
              <div className="p-4 rounded-lg bg-heygen-dark-3 border border-heygen-dark-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-heygen-white">
                    HeyGen API Key
                  </p>
                  <span className="px-2 py-1 rounded text-xs font-semibold bg-heygen-green/10 text-heygen-green">
                    Active
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-heygen-dark rounded-lg border border-heygen-dark-5">
                    <input
                      type={settings.apiKeyVisible ? 'text' : 'password'}
                      value={settings.apiKey}
                      readOnly
                      className="flex-1 bg-transparent text-heygen-white outline-none text-sm font-mono"
                    />
                    <button
                      onClick={() =>
                        setSettings((prev) => ({
                          ...prev,
                          apiKeyVisible: !prev.apiKeyVisible,
                        }))
                      }
                      className="text-heygen-gray hover:text-heygen-teal transition-colors"
                    >
                      {settings.apiKeyVisible ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <button
                    onClick={copyApiKey}
                    className="p-2 rounded-lg bg-heygen-dark hover:bg-heygen-dark-3 border border-heygen-dark-5 text-heygen-teal transition-all"
                  >
                    {copiedApiKey ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <p className="text-xs text-heygen-gray mt-2">
                  Created on January 15, 2024
                </p>
              </div>

              {/* Generate new key button */}
              <button className="w-full px-4 py-2 rounded-lg border border-heygen-dark-5 text-heygen-teal hover:bg-heygen-dark-3 transition-all font-medium">
                Generate New Key
              </button>

              <p className="text-xs text-heygen-gray bg-heygen-dark/50 p-3 rounded-lg">
                Keep your API key secure. Don't share it with anyone. If you
                suspect your key has been compromised, generate a new one
                immediately.
              </p>
            </div>
          </motion.div>

          {/* Notifications section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-lg bg-heygen-dark-2 border border-heygen-dark-5 mb-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-5 h-5 text-heygen-teal" />
              <h2 className="text-lg font-semibold text-heygen-white">
                Notifications
              </h2>
            </div>

            <p className="text-heygen-gray text-sm mb-4">
              Control how you want to be notified about updates and alerts
            </p>

            <div className="space-y-3">
              {/* Weekly Report */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-heygen-dark-3 border border-heygen-dark-5">
                <div>
                  <p className="font-medium text-heygen-white">
                    Weekly Report
                  </p>
                  <p className="text-xs text-heygen-gray">
                    Get a summary every Monday morning
                  </p>
                </div>
                <button
                  onClick={() => toggleNotification('weeklyReport')}
                  className="text-heygen-teal hover:text-heygen-teal/80 transition-colors"
                >
                  {settings.notifications.weeklyReport ? (
                    <ToggleRight className="w-6 h-6" />
                  ) : (
                    <ToggleLeft className="w-6 h-6" />
                  )}
                </button>
              </div>

              {/* Daily Digest */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-heygen-dark-3 border border-heygen-dark-5">
                <div>
                  <p className="font-medium text-heygen-white">Daily Digest</p>
                  <p className="text-xs text-heygen-gray">
                    Receive a daily summary of your metrics
                  </p>
                </div>
                <button
                  onClick={() => toggleNotification('dailyDigest')}
                  className="text-heygen-teal hover:text-heygen-teal/80 transition-colors"
                >
                  {settings.notifications.dailyDigest ? (
                    <ToggleRight className="w-6 h-6" />
                  ) : (
                    <ToggleLeft className="w-6 h-6" />
                  )}
                </button>
              </div>

              {/* Alerts */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-heygen-dark-3 border border-heygen-dark-5">
                <div>
                  <p className="font-medium text-heygen-white">
                    Performance Alerts
                  </p>
                  <p className="text-xs text-heygen-gray">
                    Get notified about unusual activity
                  </p>
                </div>
                <button
                  onClick={() => toggleNotification('alerts')}
                  className="text-heygen-teal hover:text-heygen-teal/80 transition-colors"
                >
                  {settings.notifications.alerts ? (
                    <ToggleRight className="w-6 h-6" />
                  ) : (
                    <ToggleLeft className="w-6 h-6" />
                  )}
                </button>
              </div>

              {/* Email notifications */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-heygen-dark-3 border border-heygen-dark-5">
                <div>
                  <p className="font-medium text-heygen-white">
                    Email Notifications
                  </p>
                  <p className="text-xs text-heygen-gray">
                    Send notifications to your email
                  </p>
                </div>
                <button
                  onClick={() => toggleNotification('emailNotifications')}
                  className="text-heygen-teal hover:text-heygen-teal/80 transition-colors"
                >
                  {settings.notifications.emailNotifications ? (
                    <ToggleRight className="w-6 h-6" />
                  ) : (
                    <ToggleLeft className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Privacy section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-lg bg-heygen-dark-2 border border-heygen-dark-5 mb-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-5 h-5 text-heygen-teal" />
              <h2 className="text-lg font-semibold text-heygen-white">
                Privacy & Security
              </h2>
            </div>

            <p className="text-heygen-gray text-sm mb-4">
              Control your privacy settings
            </p>

            <div className="space-y-3">
              {/* Share data */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-heygen-dark-3 border border-heygen-dark-5">
                <div>
                  <p className="font-medium text-heygen-white">
                    Share Analytics Data
                  </p>
                  <p className="text-xs text-heygen-gray">
                    Help improve HeyGen by sharing anonymized data
                  </p>
                </div>
                <button
                  onClick={() => togglePrivacy('shareData')}
                  className="text-heygen-teal hover:text-heygen-teal/80 transition-colors"
                >
                  {settings.privacy.shareData ? (
                    <ToggleRight className="w-6 h-6" />
                  ) : (
                    <ToggleLeft className="w-6 h-6" />
                  )}
                </button>
              </div>

              {/* Public profile */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-heygen-dark-3 border border-heygen-dark-5">
                <div>
                  <p className="font-medium text-heygen-white">
                    Public Profile
                  </p>
                  <p className="text-xs text-heygen-gray">
                    Make your profile visible to other users
                  </p>
                </div>
                <button
                  onClick={() => togglePrivacy('publicProfile')}
                  className="text-heygen-teal hover:text-heygen-teal/80 transition-colors"
                >
                  {settings.privacy.publicProfile ? (
                    <ToggleRight className="w-6 h-6" />
                  ) : (
                    <ToggleLeft className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Danger zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-lg border border-heygen-red/20 bg-heygen-red/5 mb-6"
          >
            <h2 className="text-lg font-semibold text-heygen-red mb-4">
              Danger Zone
            </h2>

            <p className="text-heygen-gray text-sm mb-4">
              Irreversible actions
            </p>

            <button className="w-full px-4 py-2 rounded-lg border border-heygen-red text-heygen-red hover:bg-heygen-red/10 transition-all font-medium">
              Delete Account
            </button>
          </motion.div>

          {/* Save button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-end gap-3"
          >
            <button className="px-6 py-2 rounded-lg border border-heygen-dark-5 text-heygen-gray hover:text-heygen-white transition-colors">
              Cancel
            </button>
            <button
              onClick={handleSaveSettings}
              className="flex items-center gap-2 px-6 py-2 rounded-lg bg-heygen-teal text-heygen-dark font-semibold hover:shadow-heygen transition-all"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
