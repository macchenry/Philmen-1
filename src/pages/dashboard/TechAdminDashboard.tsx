import React, { useState } from 'react';
import {
  ShieldCheck,
  Users,
  Settings,
  Database,
  Activity,
  UserPlus,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  Lock,
  KeyRound,
  CheckCircle2,
  Phone,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AdminRole, AdminUser } from '../../types';

export const TechAdminDashboard: React.FC = () => {
  const {
    adminUsers,
    addAdminUser,
    updateAdminUser,
    deleteAdminUser,
    contactInteractions,
    listings,
    inquiries,
    resetToSampleData,
    contactSettings
  } = useApp();

  const [activeTab, setActiveTab] = useState<'users' | 'system' | 'telemetry' | 'database'>('users');
  
  // New User Form State
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<AdminRole>('Editor');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;

    addAdminUser({
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      status: 'Active'
    });

    setNewUserName('');
    setNewUserEmail('');
    setShowAddUserModal(false);
    setFeedbackMsg(`User ${newUserName} added successfully with role ${newUserRole}.`);
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  const handleBackupExport = () => {
    const fullBackup = {
      timestamp: new Date().toISOString(),
      listings,
      inquiries,
      contactSettings,
      adminUsers,
      contactInteractions
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `philmen_system_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              IT Systems & Administration
            </span>
            <span className="text-[11px] bg-indigo-100 text-indigo-900 font-bold px-2 py-0.5 rounded">
              Tech Admin Role
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-0.5">
            Technical Administrator Console
          </h1>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-xs">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'users' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            User Access ({adminUsers.length})
          </button>
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'telemetry' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Interaction Logs ({contactInteractions.length})
          </button>
          <button
            onClick={() => setActiveTab('system')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'system' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            System Specs
          </button>
          <button
            onClick={() => setActiveTab('database')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'database' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Data Backup & Tools
          </button>
        </div>
      </div>

      {feedbackMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* TAB 1: USER & ROLE MANAGEMENT */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-display">Staff User Accounts & Role Permissions</h2>
              <p className="text-xs text-slate-500">
                Manage accounts for Technical Administrators, Managers/Owners, and Content Editors. No public vendor accounts exist.
              </p>
            </div>

            <button
              onClick={() => setShowAddUserModal(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add Staff User</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 font-bold border-y border-slate-200 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">User Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Assigned Role</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Role Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {adminUsers.map(user => (
                  <tr key={user.id} className="hover:bg-slate-50/80">
                    <td className="py-3 px-4 font-bold text-slate-900">{user.name}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{user.email}</td>
                    <td className="py-3 px-4">
                      <select
                        value={user.role}
                        onChange={e => updateAdminUser(user.id, { role: e.target.value as AdminRole })}
                        className="py-1 px-2.5 rounded-lg border border-slate-300 text-xs font-semibold bg-white cursor-pointer"
                      >
                        <option value="Technical Administrator">Technical Administrator</option>
                        <option value="Manager/Owner">Manager/Owner</option>
                        <option value="Editor">Editor</option>
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {adminUsers.length > 1 && (
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete staff account for ${user.name}?`)) {
                              deleteAdminUser(user.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 cursor-pointer"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTION LOGS */}
      {activeTab === 'telemetry' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 font-display">Contact Interaction Telemetry Log</h2>
            <p className="text-xs text-slate-500">
              Browser-initiated Voice Call and WhatsApp triggers associated with specific listings.
            </p>
          </div>

          <div className="space-y-2">
            {contactInteractions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-500 font-bold border-y border-slate-200 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3">Type</th>
                      <th className="py-2.5 px-3">Listing ID & Title</th>
                      <th className="py-2.5 px-3">Category</th>
                      <th className="py-2.5 px-3">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {contactInteractions.map(act => (
                      <tr key={act.id} className="hover:bg-slate-50/80">
                        <td className="py-2.5 px-3 font-semibold">
                          {act.type === 'call' ? (
                            <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-[11px]">
                              <Phone className="w-3 h-3" /> Voice Call Click
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                              <MessageSquare className="w-3 h-3" /> WhatsApp Click
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="font-mono text-slate-500 mr-2">{act.listingId}</span>
                          <span className="font-bold text-slate-900">{act.listingTitle}</span>
                        </td>
                        <td className="py-2.5 px-3 text-slate-600">{act.category}</td>
                        <td className="py-2.5 px-3 font-mono text-slate-500">{new Date(act.timestamp).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-slate-500 bg-slate-50 rounded-xl border border-slate-200">
                No interaction clicks logged in this session yet.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: SYSTEM SPECS */}
      {activeTab === 'system' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 font-display">Philmen System Configuration Audit</h2>
            <p className="text-xs text-slate-500">Architecture and RBAC configuration checklist.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="font-bold text-slate-900">Centralized Domain Configuration</div>
              <div className="text-slate-600">Primary Domain: <strong className="text-slate-900">{contactSettings.website}</strong></div>
              <div className="text-slate-600">Notification Endpoint: <strong className="text-slate-900">{contactSettings.notificationEmail}</strong></div>
              <div className="text-slate-600">Public Phone: <strong className="text-slate-900">{contactSettings.publicPhone}</strong></div>
              <div className="text-slate-600">Public WhatsApp: <strong className="text-slate-900">{contactSettings.publicWhatsApp}</strong></div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="font-bold text-slate-900">Security & RBAC Enforcement</div>
              <div className="text-slate-600">Seller/Vendor Portals: <strong className="text-rose-600">DISABLED (Single-Owner Platform)</strong></div>
              <div className="text-slate-600">Customer Registration: <strong className="text-emerald-600">UNRESTRICTED (No Signup Needed)</strong></div>
              <div className="text-slate-600">Private Contact Leak Protection: <strong className="text-emerald-600">ACTIVE</strong></div>
              <div className="text-slate-600">Inquiry Attachment Verification: <strong className="text-emerald-600">ENFORCED</strong></div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: DATABASE & TOOLS */}
      {activeTab === 'database' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 font-display">Database Maintenance & Sample Data Controls</h2>
            <p className="text-xs text-slate-500">Export backups or reset state to initial seeded inventory.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
              <div className="font-bold text-slate-900 text-sm">Full System Export</div>
              <p className="text-xs text-slate-600">
                Download a complete snapshot of all listings, customer inquiries, interaction logs, and settings in JSON format.
              </p>
              <button
                onClick={handleBackupExport}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold inline-flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Export System JSON</span>
              </button>
            </div>

            <div className="p-5 rounded-xl border border-rose-200 bg-rose-50/50 space-y-3">
              <div className="font-bold text-rose-900 text-sm">Reset to Initial Sample Data</div>
              <p className="text-xs text-rose-800/80">
                Re-seeds the store with the default verified sample listings across the 3 official categories and clears local test changes.
              </p>
              <button
                onClick={() => {
                  if (window.confirm('Reset all listings and inquiries to initial sample data?')) {
                    resetToSampleData();
                    setFeedbackMsg('Database successfully reset to initial default sample state.');
                    setTimeout(() => setFeedbackMsg(''), 3000);
                  }
                }}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold inline-flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reset Database State</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 font-display">Add Authorized Staff Account</h3>
            
            <form onSubmit={handleCreateUser} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Abena Mensah"
                  value={newUserName}
                  onChange={e => setNewUserName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Staff Email</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. abena@philmen.shop"
                  value={newUserEmail}
                  onChange={e => setNewUserEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Role Permission</label>
                <select
                  value={newUserRole}
                  onChange={e => setNewUserRole(e.target.value as AdminRole)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                >
                  <option value="Editor">Editor (Content Management Only)</option>
                  <option value="Manager/Owner">Manager/Owner (Business & Inquiries)</option>
                  <option value="Technical Administrator">Technical Administrator (IT & Security)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
