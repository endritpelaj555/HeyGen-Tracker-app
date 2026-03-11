'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { motion } from 'framer-motion';
import {
  LogOut,
  Bell,
  Settings,
  User,
  ChevronDown,
  Calendar,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getCurrentMonth } from '@/lib/utils';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showDatePicker?: boolean;
}

export function Header({ title, subtitle, showDatePicker }: HeaderProps) {
  const { data: session } = useSession();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-heygen-red/10 text-heygen-red border-heygen-red/20';
      case 'editor':
        return 'bg-heygen-teal/10 text-heygen-teal border-heygen-teal/20';
      case 'viewer':
        return 'bg-heygen-blue/10 text-heygen-blue border-heygen-blue/20';
      default:
        return 'bg-heygen-gray/10 text-heygen-gray border-heygen-gray/20';
    }
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 z-30 bg-heygen-dark-2 border-b border-heygen-dark-5 backdrop-blur-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          {/* Left side - Title and subtitle */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-2xl font-bold text-heygen-white">{title}</h1>
            {subtitle && (
              <p className="text-sm text-heygen-gray mt-1">{subtitle}</p>
            )}
          </motion.div>

          {/* Right side - Controls */}
          <div className="flex items-center gap-4">
            {/* Date range (optional) */}
            {showDatePicker && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-heygen-dark-3 border border-heygen-dark-5 text-heygen-gray text-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>{getCurrentMonth()}</span>
              </motion.div>
            )}

            {/* Notifications */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="p-2 rounded-lg hover:bg-heygen-dark-3 text-heygen-gray hover:text-heygen-teal transition-all relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-heygen-red rounded-full"></span>
            </motion.button>

            {/* Profile menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-heygen-dark-3 transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-heygen-gradient flex items-center justify-center text-white text-sm font-semibold">
                  {getInitials(session?.user?.name)}
                </div>
                <ChevronDown className="w-4 h-4 text-heygen-gray group-hover:text-heygen-teal transition-colors" />
              </button>

              {/* Dropdown */}
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-56 bg-heygen-dark-3 border border-heygen-dark-5 rounded-lg shadow-card overflow-hidden"
                  onMouseLeave={() => setIsProfileOpen(false)}
                >
                  {/* User info */}
                  <div className="px-4 py-3 border-b border-heygen-dark-5">
                    <p className="text-sm font-semibold text-heygen-white">
                      {session?.user?.name}
                    </p>
                    <p className="text-xs text-heygen-gray">
                      {session?.user?.email}
                    </p>
                    <div
                      className={cn(
                        'mt-2 inline-block px-2 py-1 rounded border text-xs font-medium',
                        getRoleColor(
                          (session?.user as any)?.role || 'viewer'
                        )
                      )}
                    >
                      {(session?.user as any)?.role || 'Viewer'}
                    </div>
                  </div>

                  {/* Menu items */}
                  <nav className="py-2">
                    <Link
                      href="/settings"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-heygen-gray hover:text-heygen-white hover:bg-heygen-dark-4 transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-heygen-gray hover:text-heygen-white hover:bg-heygen-dark-4 transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </Link>
                  </nav>

                  {/* Logout */}
                  <div className="border-t border-heygen-dark-5 p-2">
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        signOut({ callbackUrl: '/' });
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-heygen-red hover:text-heygen-white hover:bg-heygen-red/10 rounded transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
}
