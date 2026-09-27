import React from 'react';
import {
  LayoutDashboard,
  Layers,
  Inbox,
  Settings,
  Users,
  Shield,
  LogOut,
  ArrowLeft,
  PhoneCall,
  Activity,
  UserCheck,
  FileEdit,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AdminRole } from '../../types';

interface Props {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onExitDashboard: () => void;
  onSwitchRole: (role: AdminRole) => void;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<Props> = ({
  activeTab,
  onSelectTab,
  onExitDashboard,
  onSwitchRole,
  children
}) => {
  const { currentAdminUser, logoutAdmin } = useApp();
  const role = currentAdminUser?.role || 'Manager/Owner';

  const isOwner = role === 'Manager/Owner';
  const isTechAdmin = role === 'Technical Administrator';
  const isEditor = role === 'Editor';

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      
      {/* Top Bar for Internal Dashboards */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Left: Brand and Return to Public Site */}
            <div className="flex items-center gap-4">
              <button
                onClick={onExitDashboard}
                className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors py-1.5 px-3 rounded-lg hover:bg-slate-800"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Public Website</span>
              </button>

              <div className="h-5 w-px bg-slate-800 hidden sm:block" />

              <div className="flex items-center gap-2">
                <img
                  src="https://i.ibb.co/sJcgCgS7/Philmen.png"
                  alt="Philmen"
                  referrerPolicy="no-referrer"
                  className="h-8 w-auto object-contain"
                />
                <span className="font-semibold text-slate-300 text-xs px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                  Central Ops
                </span>
              </div>
            </div>

            {/* Right: Active Role & Role Switcher */}
            <div className="flex items-center gap-3">
              
              {/* Role Badge with Quick Switch */}
              <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-1.5 text-xs">
                <span className="text-slate-400 hidden md:inline">Current Role:</span>
                <select
                  value={role}
                  onChange={e => onSwitchRole(e.target.value as AdminRole)}
                  className="bg-transparent text-amber-400 font-bold focus:outline-none cursor-pointer text-xs"
                >
                  <option value="Manager/Owner" className="bg-slate-900 text-white">Manager / Owner</option>
                  <option value="Technical Administrator" className="bg-slate-900 text-white">Technical Administrator</option>
                  <option value="Editor" className="bg-slate-900 text-white">Editor (Content Only)</option>
                </select>
              </div>

              {/* Logout */}
              <button
                onClick={() => {
                  logoutAdmin();
                  onExitDashboard();
                }}
                className="p-2 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* Main Dashboard Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>

    </div>
  );
};
