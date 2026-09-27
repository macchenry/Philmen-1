import React, { useEffect } from 'react';
import { Phone, CheckCircle2, X, ExternalLink, Clock } from 'lucide-react';
import { Listing } from '../../types';
import { useApp } from '../../context/AppContext';

interface Props {
  listing: Listing | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CallActionModal: React.FC<Props> = ({ listing, isOpen, onClose }) => {
  const { contactSettings, recordContactInteraction } = useApp();

  useEffect(() => {
    if (isOpen && listing) {
      recordContactInteraction('call', listing);
    }
  }, [isOpen, listing]);

  if (!isOpen || !listing) return null;

  const handleInitiateCall = () => {
    window.location.href = `tel:${contactSettings.publicPhone}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-amber-600 uppercase tracking-wider">Direct Voice Call</span>
              <h3 className="text-lg font-bold text-slate-900">Call Philmen Customer Line</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5 text-xs">
          <div className="text-slate-500">Associated Inquiry Listing:</div>
          <div className="font-semibold text-slate-900 line-clamp-1">{listing.title}</div>
          <div className="flex items-center justify-between text-slate-600 pt-1 border-t border-slate-200/80">
            <span>Ref: <strong className="font-mono text-slate-800">{listing.id}</strong></span>
            <span>Category: {listing.category}</span>
          </div>
        </div>

        <div className="p-4 bg-amber-50 border border-amber-200/60 rounded-xl text-center space-y-1">
          <span className="text-xs text-amber-900 font-medium">Official Philmen Public Phone</span>
          <div className="text-2xl font-bold font-mono tracking-wider text-slate-900">
            {contactSettings.publicPhone}
          </div>
          <div className="text-[11px] text-amber-800 flex items-center justify-center gap-1 mt-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Operating Hours: {contactSettings.customerServiceHours}</span>
          </div>
        </div>

        <div className="text-xs text-slate-500 text-center">
          Clicking below will open your device dialer to connect directly with Philmen support staff.
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleInitiateCall}
            className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            Dial {contactSettings.publicPhone}
          </button>
        </div>
      </div>
    </div>
  );
};
