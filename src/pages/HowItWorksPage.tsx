import React from 'react';
import { ShieldCheck, Phone, MessageSquare, CheckCircle2, ArrowRight, UserCheck, Search, FileText } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface Props {
  onNavigate: (route: string) => void;
}

export const HowItWorksPage: React.FC<Props> = ({ onNavigate }) => {
  const { contactSettings } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
          Centralized Facilitation Architecture
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
          How Philmen Works
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Philmen is a single-owner centralized platform. We bridge the gap between quality-conscious customers and verified product & service providers across Ghana.
        </p>
      </div>

      {/* The Centralized Customer Journey */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 space-y-8">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">The Philmen Model</span>
          <h2 className="text-2xl font-bold text-white font-display mt-1">Customer → Philmen → Relevant Provider</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-bold flex items-center justify-center font-display">
              01
            </div>
            <h3 className="text-base font-bold text-white">1. You Browse & Inquire</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Customers do not need to register accounts or navigate separate vendor storefronts. You simply browse our verified catalog and tap Call, WhatsApp, or Book.
            </p>
          </div>

          <div className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-bold flex items-center justify-center font-display">
              02
            </div>
            <h3 className="text-base font-bold text-white">2. Philmen Takes Charge</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every inquiry is automatically linked to the exact listing. Philmen management verifies availability, checks condition, and arranges inspection or booking.
            </p>
          </div>

          <div className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-bold flex items-center justify-center font-display">
              03
            </div>
            <h3 className="text-base font-bold text-white">3. Safe Fulfillment</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              You receive genuine appliances, certified vehicle purchases, and verified rental cars with Philmen accountability.
            </p>
          </div>
        </div>
      </div>

      {/* Why Single-Owner Centralized Platform Beats Cluttered Multi-Vendor Portals */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 font-display">
          Why Centralized Management Matters
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-slate-200/90 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No Unknown Random Sellers</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Unlike open marketplaces where anyone can post unverified items, all Philmen listings are curated, vetted, and approved by Philmen management.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200/90 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-2">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">One Dedicated Point of Contact</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              You always talk directly with Philmen customer service via <strong className="text-slate-900">{contactSettings.publicPhone}</strong> or WhatsApp <strong className="text-slate-900">{contactSettings.publicWhatsApp}</strong>.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200/90 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center mb-2">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Zero Customer Registration Hassle</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No passwords to remember or buyer profiles to create. Submit your inquiry with your phone number and receive prompt assistance.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200/90 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-2">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Listing-Specific Inquiries</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every inquiry carries the exact product/service title, ID, category, and link so our team immediately knows what you need.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-8 bg-amber-50 border border-amber-200/80 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-lg font-bold text-amber-950 font-display">Ready to find your product or service?</h3>
          <p className="text-xs text-amber-900/80">Explore our catalog across our 3 official categories today.</p>
        </div>
        <button
          onClick={() => onNavigate('categories')}
          className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 transition-colors shrink-0 shadow-sm"
        >
          <span>Browse All Categories</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
