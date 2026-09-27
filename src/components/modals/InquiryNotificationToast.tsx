import React from 'react';
import { Mail, CheckCircle2, X, ExternalLink, Phone, MessageSquare } from 'lucide-react';
import { Inquiry } from '../../types';

interface Props {
  inquiry: Inquiry | null;
  onClose: () => void;
  onOpenDashboard?: () => void;
}

export const InquiryNotificationToast: React.FC<Props> = ({ inquiry, onClose, onOpenDashboard }) => {
  if (!inquiry) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-slate-900 text-white rounded-xl shadow-2xl border border-slate-800 p-5 overflow-hidden relative">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Inquiry Dispatched</span>
                <span className="text-xs text-slate-400">· {inquiry.time}</span>
              </div>
              <h4 className="text-sm font-semibold text-white mt-0.5">Notification Sent to philmen.official@gmail.com</h4>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-3.5 pt-3.5 border-t border-slate-800/80 text-xs text-slate-300 space-y-1.5">
          <div className="flex justify-between">
            <span className="text-slate-400">Customer:</span>
            <span className="font-medium text-white">{inquiry.customerName} ({inquiry.customerPhone})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Listing:</span>
            <span className="font-medium text-white truncate max-w-[220px] text-right">{inquiry.listingName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Reference:</span>
            <span className="font-mono text-amber-400">{inquiry.id}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-2 pt-2">
          <span className="text-[11px] text-slate-400">Associated with {inquiry.category}</span>
          {onOpenDashboard && (
            <button
              onClick={() => {
                onClose();
                onOpenDashboard();
              }}
              className="text-xs text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1 transition-colors"
            >
              View in Dashboard
              <ExternalLink className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
