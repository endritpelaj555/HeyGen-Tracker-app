'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import {
  Users,
  Plus,
  Trash2,
  Edit2,
  Shield,
  Eye,
  Key,
  Activity,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Header } from '@/components/layout/Header';
import { mockUsers } from '@/lib/data';

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
  createdAt: string;
  lastLogin?: string;
}

export default function AdminPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<AdminUser[]>(mockUsers);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    role: 'editor' as 'admin' | 'editor' | 'viewer',
  });

  const isAdmin = (session?.user as any)?.role === 'admin';

  if (!isAdmin) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Admin Panel" subtitle="Restricted access" />
        <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-heygen-dark to-heygen-dark-2">
          <div className="text-center">
            <Shield className="w-16 h-16 text-heygen-red mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-bold text-heygen-white mb-2">
              Access Denied
            </h2>
            <p className="text-heygen-gray">
              You don't have permission to view this page
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleAddUser = () => {
    if (!formData.email || !formData.name) {
      toast.error('Please fill in all fields');
      return;
    }

    if (users.some((u) => u.email === formData.email)) {
      toast.error('User already exists');
      return;
    }

    const newUser: AdminUser = {
      id: Date.now().toString(),
      email: formData.email,
      name: formData.name,
      role: formData.role,
      createdAt: new Date().toISOString(),
    };

    setUsers((prev) => [newUser, ...prev]);
    setFormData({ email: '', name: '', role: 'editor' });
    setIsAddingUser(false);
    toast.success('User added successfully');
  };

  const handleDeleteUser = (id: string) => {
    if (users.length === 1) {
      toast.error('Cannot delete the last user');
      return;
    }

    setUsers((prev) => prev.filter((u) => u.id !== id));
    toast.success('User deleted');
  };

  const handleRoleChange = (id: string, newRole: 'admin' | 'editor' | 'viewer') => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
    );
    toast.success('Role updated');
  };

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

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title="Admin Panel" subtitle="User management and system settings" />

      <div className="flex-1 overflow-auto bg-gradient-to-b from-heygen-dark to-heygen-dark-2">
        <div className="p-6 max-w-6xl mx-auto">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-4 gap-4 mb-8"
          >
            <div className="p-4 rounded-lg bg-heygen-dark-2 border border-heygen-dark-5">
              <p className="text-heygen-gray text-sm mb-2">Total Users</p>
              <p className="text-3xl font-bold text-heygen-white">{users.length}</p>
            </div>
            <div className="p-4 rounded-lg bg-heygen-dark-2 border border-heygen-dark-5">
              <p className="text-heygen-gray text-sm mb-2">Admins</p>
              <p className="text-3xl font-bold text-heygen-red">
                {users.filter((u) => u.role === 'admin').length}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-heygen-dark-2 border border-heygen-dark-5">
              <p className="text-heygen-gray text-sm mb-2">Editors</p>
              <p className="text-3xl font-bold text-heygen-teal">
                {users.filter((u) => u.role === 'editor').length}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-heygen-dark-2 border border-heygen-dark-5">
              <p className="text-heygen-gray text-sm mb-2">Viewers</p>
              <p className="text-3xl font-bold text-heygen-blue">
                {users.filter((u) => u.role === 'viewer').length}
              </p>
            </div>
          </motion.div>

          {/* Add user form */}
          {isAddingUser && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-lg bg-heygen-dark-2 border border-heygen-dark-5 mb-8"
            >
              <h2 className="text-lg font-semibold text-heygen-white mb-4">
                Add New User
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-heygen-white mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      placeholder="user@example.com"
                      className="w-full px-3 py-2 bg-heygen-dark-3 border border-heygen-dark-5 rounded-lg text-heygen-white placeholder-heygen-gray focus:outline-none focus:ring-2 focus:ring-heygen-teal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-heygen-white mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="Full name"
                      className="w-full px-3 py-2 bg-heygen-dark-3 border border-heygen-dark-5 rounded-lg text-heygen-white placeholder-heygen-gray focus:outline-none focus:ring-2 focus:ring-heygen-teal"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-heygen-white mb-2">
                    Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        role: e.target.value as 'admin' | 'editor' | 'viewer',
                      }))
                    }
                    className="w-full px-3 py-2 bg-heygen-dark-3 border border-heygen-dark-5 rounded-lg text-heygen-white focus:outline-none focus:ring-2 focus:ring-heygen-teal"
                  >
                    <option value="viewer">Viewer (Read-only)</option>
                    <option value="editor">Editor (Can add/edit data)</option>
                    <option value="admin">Admin (Full access)</option>
                  </select>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleAddUser}
                    className="flex-1 px-4 py-2 rounded-lg bg-heygen-teal text-heygen-dark font-semibold hover:shadow-heygen transition-all"
                  >
                    Add User
                  </button>
                  <button
                    onClick={() => {
                      setIsAddingUser(false);
                      setFormData({ email: '', name: '', role: 'editor' });
                    }}
                    className="px-4 py-2 rounded-lg border border-heygen-dark-5 text-heygen-gray hover:text-heygen-white transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Users section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-heygen-white">
                Users ({users.length})
              </h2>
              {!isAddingUser && (
                <button
                  onClick={() => setIsAddingUser(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-heygen-teal text-heygen-dark font-semibold hover:shadow-heygen transition-all"
                >
                  <Plus className="w-5 h-5" />
                  Add User
                </button>
              )}
            </div>

            {/* Users table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="overflow-x-auto rounded-lg border border-heygen-dark-5 bg-heygen-dark-2"
            >
              <table className="w-full">
                <thead>
                  <tr className="border-b border-heygen-dark-5 bg-heygen-dark-3">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-heygen-gray">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-heygen-gray">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-heygen-gray">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-heygen-gray">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-heygen-gray">
                      Last Login
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-heygen-gray">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b border-heygen-dark-5 hover:bg-heygen-dark-3 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-heygen-gradient flex items-center justify-center text-white text-sm font-semibold">
                            {user.name.charAt(0)}
                          </div>
                          <span className="font-medium text-heygen-white">
                            {user.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-heygen-gray">{user.email}</td>
                      <td className="px-6 py-4">
                        <select
                          value={user.role}
                          onChange={(e) =>
                            handleRoleChange(
                              user.id,
                              e.target.value as 'admin' | 'editor' | 'viewer'
                            )
                          }
                          className={`px-2 py-1 rounded text-xs font-semibold border ${getRoleColor(user.role)} bg-transparent cursor-pointer`}
                        >
                          <option value="viewer">Viewer</option>
                          <option value="editor">Editor</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-heygen-gray text-sm">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-heygen-gray text-sm">
                        {user.lastLogin
                          ? new Date(user.lastLogin).toLocaleDateString()
                          : 'Never'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 rounded hover:bg-heygen-dark-4 text-heygen-gray hover:text-heygen-teal transition-colors">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-2 rounded hover:bg-heygen-dark-4 text-heygen-gray hover:text-heygen-red transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>

          {/* System info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 p-6 rounded-lg bg-heygen-dark-2 border border-heygen-dark-5"
          >
            <h3 className="text-lg font-semibold text-heygen-white mb-4">
              System Information
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-heygen-gray mb-1">Application Version</p>
                <p className="font-semibold text-heygen-white">1.0.0</p>
              </div>
              <div>
                <p className="text-sm text-heygen-gray mb-1">Environment</p>
                <p className="font-semibold text-heygen-white">Production</p>
              </div>
              <div>
                <p className="text-sm text-heygen-gray mb-1">Last Updated</p>
                <p className="font-semibold text-heygen-white">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-heygen-gray mb-1">Active Sessions</p>
                <p className="font-semibold text-heygen-teal">
                  {users.filter((u) => u.lastLogin).length}
                </p>
              </div>
              <div>
                <p className="text-sm text-heygen-gray mb-1">Total Data Points</p>
                <p className="font-semibold text-heygen-teal">1,234,567</p>
              </div>
              <div>
                <p className="text-sm text-heygen-gray mb-1">System Status</p>
                <p className="font-semibold text-heygen-green">Operational</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
