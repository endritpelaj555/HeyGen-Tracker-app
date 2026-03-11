'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Twitter,
  Linkedin,
  Zap,
  Edit3,
  FileText,
  Settings,
  Users,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  isAdmin?: boolean;
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    label: 'X (Twitter)',
    href: '/twitter',
    icon: <Twitter className="w-5 h-5" />,
  },
  {
    label: 'LinkedIn',
    href: '/linkedin',
    icon: <Linkedin className="w-5 h-5" />,
  },
  {
    label: 'HeyGen API',
    href: '/heygen',
    icon: <Zap className="w-5 h-5" />,
  },
  {
    label: 'Manual Entry',
    href: '/manual-entry',
    icon: <Edit3 className="w-5 h-5" />,
  },
  {
    label: 'Reports',
    href: '/reports',
    icon: <FileText className="w-5 h-5" />,
  },
  {
    label: 'Admin',
    href: '/admin',
    icon: <Users className="w-5 h-5" />,
    isAdmin: true,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: <Settings className="w-5 h-5" />,
  },
];

export function Sidebar({ isAdmin = false }: { isAdmin?: boolean }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const filteredItems = navItems.filter(
    (item) => !item.isAdmin || isAdmin
  );

  const HeyGenLogo = () => (
    <svg
      className="w-8 h-8"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="heygenGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" style={{ stopColor: '#00C2B2' }} />
          <stop offset="100%" style={{ stopColor: '#7C3AED' }} />
        </linearGradient>
      </defs>
      <path
        d="M8 8H20V40H8V8Z"
        fill="url(#heygenGradient)"
        opacity="0.9"
      />
      <path
        d="M28 16H40V40H28V16Z"
        fill="url(#heygenGradient)"
        opacity="0.6"
      />
    </svg>
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-heygen-dark-2 border border-heygen-dark-5 text-heygen-teal hover:bg-heygen-dark-3"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={cn(
          'fixed inset-y-0 left-0 w-64 bg-heygen-dark-2 border-r border-heygen-dark-5 p-6 overflow-y-auto z-40',
          'lg:relative lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-3 mb-8 group">
          <HeyGenLogo />
          <div>
            <h1 className="text-lg font-bold text-heygen-white group-hover:text-heygen-teal transition-colors">
              HeyGen
            </h1>
            <p className="text-xs text-heygen-gray">Tracker</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="space-y-2">
          {filteredItems.map((item, index) => {
            const isActive = pathname.includes(item.href);

            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all group',
                    isActive
                      ? 'bg-heygen-teal text-heygen-dark font-semibold'
                      : 'text-heygen-gray hover:text-heygen-white hover:bg-heygen-dark-3'
                  )}
                >
                  <span
                    className={cn(
                      'transition-colors',
                      isActive ? 'text-heygen-dark' : 'group-hover:text-heygen-teal'
                    )}
                  >
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Footer info */}
        <div className="absolute bottom-6 left-6 right-6 pt-6 border-t border-heygen-dark-5">
          <p className="text-xs text-heygen-gray text-center">
            HeyGen Social Tracker<br />
            <span className="text-heygen-teal">v1.0.0</span>
          </p>
        </div>
      </motion.aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
