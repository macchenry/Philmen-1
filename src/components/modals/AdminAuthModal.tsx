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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-4 sm:p-6 shadow-2xl border border-slate-200 space-y-4 sm:space-y-6 my-auto">
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Internal Portal</span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">Philmen Staff & Admin</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {currentAdminUser ? (
          <div className="space-y-4">
            <div className="p-3.5 sm:p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Currently Logged In:</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                  {currentAdminUser.role}
                </span>
              </div>
              <div className="font-bold text-slate-900 text-sm">{currentAdminUser.name}</div>
              <div className="text-xs text-slate-600 break-all">{currentAdminUser.email}</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={() => {
                  logoutAdmin();
                }}
                className="w-full sm:flex-1 py-2.5 px-4 rounded-xl border border-rose-300 text-rose-700 text-xs sm:text-sm font-semibold hover:bg-rose-50 transition-colors cursor-pointer"
              >
                Sign Out
              </button>
              <button
                type="button"
                onClick={() => {
                  onSuccess(currentAdminUser.role);
                  onClose();
                }}
                className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Go to {currentAdminUser.role.split(' ')[0]} Hub</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-5">
            <p className="text-xs text-slate-600 leading-relaxed">
              Philmen utilizes role-based access control. Public customers do not require accounts. Select an authorized staff role below:
            </p>

            <div className="grid grid-cols-1 gap-2.5">
              {/* Manager / Owner */}
              <button
                type="button"
                onClick={() => handleQuickLogin('Manager/Owner')}
                className="p-3 sm:p-3.5 rounded-xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/40 text-left flex items-center justify-between transition-all group cursor-pointer"
              >
                <div className="min-w-0 pr-2">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-700">Manager / Owner</span>
                    <span className="text-[9px] sm:text-[10px] uppercase font-semibold text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded">Primary Hub</span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-1 line-clamp-2">
                    Manage listings, prices, inquiries, customer tracking & public contacts.
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-transform group-hover:translate-x-1 shrink-0" />
              </button>

              {/* Technical Administrator */}
              <button
                type="button"
                onClick={() => handleQuickLogin('Technical Administrator')}
                className="p-3 sm:p-3.5 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/40 text-left flex items-center justify-between transition-all group cursor-pointer"
              >
                <div className="min-w-0 pr-2">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-700">Technical Administrator</span>
                    <span className="text-[9px] sm:text-[10px] uppercase font-semibold text-indigo-800 bg-indigo-100 px-1.5 py-0.2 rounded">IT & System</span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-1 line-clamp-2">
                    System configuration, user management, category structure, database tools & audit logs.
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-transform group-hover:translate-x-1 shrink-0" />
              </button>

              {/* Content Editor */}
              <button
                type="button"
                onClick={() => handleQuickLogin('Editor')}
                className="p-3 sm:p-3.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 text-left flex items-center justify-between transition-all group cursor-pointer"
              >
                <div className="min-w-0 pr-2">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700">Content Editor</span>
                    <span className="text-[9px] sm:text-[10px] uppercase font-semibold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">Content Only</span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-1 line-clamp-2">
                    Create & edit listings, update product descriptions, prices, images & locations.
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-1 shrink-0" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
