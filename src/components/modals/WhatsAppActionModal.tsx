import React, { useEffect } from 'react';
import { MessageSquare, CheckCircle2, X, ExternalLink, Clock } from 'lucide-react';
import { Listing } from '../../types';
import { useApp } from '../../context/AppContext';

interface Props {
  listing: Listing | null;
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppActionModal: React.FC<Props> = ({ listing, isOpen, onClose }) => {
  const { contactSettings, recordContactInteraction } = useApp();

  useEffect(() => {
    if (isOpen && listing) {
      recordContactInteraction('whatsapp', listing);
    }
  }, [isOpen, listing]);

  if (!isOpen || !listing) return null;

  const listingUrl = `https://${contactSettings.website}/listing/${listing.slug}`;
  const prefilledText = `Hello Philmen, I am interested in ${listing.title} (${listing.id}). Please provide more information. ${listingUrl}`;
  
  // Format for WhatsApp API: Ghana country code is 233, remove leading 0
  const cleanNumber = contactSettings.publicWhatsApp.startsWith('0')
    ? `233${contactSettings.publicWhatsApp.slice(1)}`
    : contactSettings.publicWhatsApp;

  const waLink = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(prefilledText)}`;

  const handleOpenWhatsApp = () => {
    window.open(waLink, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-md w-full p-4 sm:p-6 shadow-2xl border border-slate-200 space-y-4 sm:space-y-5 my-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-600 uppercase tracking-wider">Instant WhatsApp Chat</span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">Contact Philmen Desk</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3.5 sm:p-4 bg-emerald-50/70 border border-emerald-200/70 rounded-xl space-y-2 text-xs">
          <div className="text-emerald-900 font-semibold flex items-center justify-between">
            <span>Pre-Filled Listing Context:</span>
            <span className="font-mono text-emerald-700">{listing.id}</span>
          </div>
          <div className="p-2.5 bg-white/90 rounded-lg border border-emerald-200/50 text-slate-700 italic break-words text-[11px] leading-relaxed">
            "{prefilledText}"
          </div>
        </div>

        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
          <div>
            <div className="text-slate-500 text-[11px]">Philmen WhatsApp Number</div>
            <div className="font-bold text-slate-900 text-xs sm:text-sm font-mono mt-0.5">{contactSettings.publicWhatsApp}</div>
          </div>
          <div className="text-right text-slate-500">
            <div className="flex items-center gap-1 text-[11px]">
              <Clock className="w-3 h-3 text-slate-400 shrink-0" />
              <span>{contactSettings.customerServiceHours}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 text-xs sm:text-sm font-medium hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleOpenWhatsApp}
            className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Open WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
