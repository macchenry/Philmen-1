import React, { useState } from 'react';
import { ShieldCheck, Lock, UserCheck, X, KeyRound, ArrowRight, User } from 'lucide-react';
import { AdminRole } from '../../types';
import { useApp } from '../../context/AppContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (role: AdminRole) => void;
}

export const AdminAuthModal: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
  const { currentAdminUser, loginAs, logoutAdmin, adminUsers } = useApp();
  const [selectedRole, setSelectedRole] = useState<AdminRole>('Manager/Owner');

  if (!isOpen) return null;

  const handleQuickLogin = (role: AdminRole) => {
    loginAs(role);
    onSuccess(role);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Internal Portal</span>
              <h3 className="text-lg font-bold text-slate-900">Philmen Staff & Administration</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {currentAdminUser ? (
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Currently Logged In:</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                  {currentAdminUser.role}
                </span>
              </div>
              <div className="font-bold text-slate-900">{currentAdminUser.name}</div>
              <div className="text-xs text-slate-600">{currentAdminUser.email}</div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  logoutAdmin();
                }}
                className="flex-1 py-2.5 px-4 rounded-xl border border-rose-300 text-rose-700 text-sm font-semibold hover:bg-rose-50 transition-colors"
              >
                Sign Out
              </button>
              <button
                type="button"
                onClick={() => {
                  onSuccess(currentAdminUser.role);
                  onClose();
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors"
              >
                Go to {currentAdminUser.role.split(' ')[0]} Dashboard
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <p className="text-xs text-slate-600 leading-relaxed">
              Philmen utilizes role-based access control. Public customers do not require accounts. Select an authorized staff role below to access the management interface:
            </p>

            <div className="grid grid-cols-1 gap-2.5">
              {/* Manager / Owner */}
              <button
                type="button"
                onClick={() => handleQuickLogin('Manager/Owner')}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/40 text-left flex items-center justify-between transition-all group cursor-pointer"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 group-hover:text-amber-700">Manager / Owner</span>
                    <span className="text-[10px] uppercase font-semibold text-amber-800 bg-amber-100 px-2 py-0.2 rounded">Primary Hub</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Manage listings, prices, inquiries, customer tracking & public/private contact settings.
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Technical Administrator */}
              <button
                type="button"
                onClick={() => handleQuickLogin('Technical Administrator')}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/40 text-left flex items-center justify-between transition-all group cursor-pointer"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 group-hover:text-indigo-700">Technical Administrator</span>
                    <span className="text-[10px] uppercase font-semibold text-indigo-800 bg-indigo-100 px-2 py-0.2 rounded">IT & System</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    System configuration, user management, category structure, database tools & audit logs.
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Content Editor */}
              <button
                type="button"
                onClick={() => handleQuickLogin('Editor')}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 text-left flex items-center justify-between transition-all group cursor-pointer"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 group-hover:text-emerald-700">Content Editor</span>
                    <span className="text-[10px] uppercase font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.2 rounded">Content Only</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Create & edit listings, update product descriptions, prices, images & locations.
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
