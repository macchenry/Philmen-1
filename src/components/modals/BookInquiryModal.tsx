import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldCheck, Mail, Phone, MessageSquare, Clock, MapPin, Tag } from 'lucide-react';
import { Listing, PreferredContactMethod } from '../../types';
import { useApp } from '../../context/AppContext';

interface Props {
  listing: Listing | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BookInquiryModal: React.FC<Props> = ({ listing, isOpen, onClose }) => {
  const { submitInquiry, contactSettings } = useApp();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [contactMethod, setContactMethod] = useState<PreferredContactMethod>('Phone');
  const [preferredDateTime, setPreferredDateTime] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedInquiryId, setSubmittedInquiryId] = useState('');

  if (!isOpen || !listing) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;

    const newInquiry = submitInquiry({
      customerName,
      customerPhone,
      customerEmail: customerEmail || 'N/A',
      contactMethod,
      preferredDateTime,
      message: message || `I am interested in ${listing.title}. Please provide more details.`,
      listing
    });

    setSubmittedInquiryId(newInquiry.id);
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setCustomerName('');
    setCustomerPhone('');
    setCustomerEmail('');
    setMessage('');
    setPreferredDateTime('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[92vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-100 bg-slate-50/50 sticky top-0 z-10">
          <div>
            <span className="text-[10px] sm:text-xs font-semibold text-amber-600 tracking-wider uppercase">Direct Philmen Facilitation</span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">Book / Request Information</h3>
          </div>
          <button
            onClick={handleResetAndClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-6 sm:p-8 text-center space-y-5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 sm:w-9 sm:h-9" />
            </div>

            <div className="space-y-2">
              <h4 className="text-xl sm:text-2xl font-bold text-slate-900">Inquiry Dispatched to Philmen</h4>
              <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-slate-900">{customerName}</span>. Your request regarding{' '}
                <span className="font-semibold text-slate-900">{listing.title}</span> has been logged and sent to Philmen customer service.
              </p>
            </div>

            {/* Email dispatch payload confirmation */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 sm:p-4 text-left text-xs space-y-2 text-slate-600">
              <div className="flex items-center gap-2 text-slate-900 font-semibold border-b border-slate-200 pb-2">
                <Mail className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Dispatched Notification Summary</span>
              </div>
              <p><strong className="text-slate-700">To:</strong> <span className="break-all">{contactSettings.notificationEmail}</span></p>
              <p><strong className="text-slate-700">Subject:</strong> New Customer Inquiry — {listing.title}</p>
              <p><strong className="text-slate-700">Inquiry Ref:</strong> <span className="font-mono text-amber-700 font-semibold">{submittedInquiryId}</span></p>
              <p><strong className="text-slate-700">Listing:</strong> {listing.title} ({listing.id})</p>
              <p><strong className="text-slate-700">Contact Method:</strong> {contactMethod} via {customerPhone}</p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center">
              <button
                onClick={handleResetAndClose}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                Close Window
              </button>
              <a
                href={`https://wa.me/233${contactSettings.publicWhatsApp.replace(/^0/, '')}?text=${encodeURIComponent(
                  `Hello Philmen, I just submitted an inquiry (${submittedInquiryId}) for ${listing.title}. My name is ${customerName}.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5">
            {/* Attached Listing Card */}
            <div className="p-3.5 bg-amber-50/60 border border-amber-200/80 rounded-xl flex items-start gap-3 sm:gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-amber-200/60">
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] text-amber-900 font-medium">
                  <span className="font-mono">{listing.id}</span>
                  <span>·</span>
                  <span className="truncate">{listing.category}</span>
                  <span>·</span>
                  <span className="font-semibold text-slate-900 tabular-nums">{listing.priceDisplay}</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate mt-0.5">{listing.title}</h4>
                <div className="flex items-center gap-1 text-[11px] text-slate-600 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="truncate">{listing.location}</span>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Mensah"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number (Call / WhatsApp) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0244123456"
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address <span className="text-slate-400 text-[11px]">(Optional)</span>
                </label>
                <input
                  type="email"
                  placeholder="e.g. yourname@example.com"
                  value={customerEmail}
                  onChange={e => setCustomerEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preferred Contact Method
                </label>
                <select
                  value={contactMethod}
                  onChange={e => setContactMethod(e.target.value as PreferredContactMethod)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white cursor-pointer"
                >
                  <option value="Phone">Phone Call ({contactSettings.publicPhone})</option>
                  <option value="WhatsApp">WhatsApp ({contactSettings.publicWhatsApp})</option>
                  <option value="Email">Email</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Preferred Date / Time for Inspection or Delivery <span className="text-slate-400 text-[11px]">(Optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. This Saturday morning / Next Tuesday at 2:00 PM"
                value={preferredDateTime}
                onChange={e => setPreferredDateTime(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Message / Specific Requirements
              </label>
              <textarea
                rows={3}
                placeholder="I would like more information regarding physical inspection, pricing negotiation, and availability..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 resize-none"
              />
            </div>

            <div className="bg-slate-50 rounded-xl p-3 text-[11px] sm:text-xs text-slate-600 flex items-start gap-2 border border-slate-200">
              <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Centralized Philmen Privacy:</strong> Your request goes directly to Philmen staff. We coordinate with vetted suppliers and service teams to fulfill your exact request. No third-party spam.
              </span>
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3 pt-2">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-4 py-2.5 text-slate-600 hover:text-slate-900 text-xs sm:text-sm font-medium transition-colors text-center cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry to Philmen</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
