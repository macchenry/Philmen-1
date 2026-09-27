import React from 'react';
import { Shield, Target, Award, Users, CheckCircle, Clock, MapPin, Phone, MessageSquare } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface Props {
  onNavigate: (route: string) => void;
}

export const AboutPage: React.FC<Props> = ({ onNavigate }) => {
  const { contactSettings } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Intro Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
          About Philmen
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
          A Centralized Platform Built on Trust & Accountability
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Philmen (<span className="text-amber-700 font-semibold">{contactSettings.website}</span>) was established to solve the fragmentation, unreliability, and safety concerns often experienced in open online marketplaces across Ghana.
        </p>
      </div>

      {/* Philosophy and Core Model */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <h2 className="text-xl font-bold text-slate-900 font-display">
            The Philmen Philosophy
          </h2>
          <p>
            Rather than operating as an uncurated open directory where unknown sellers post arbitrary items, Philmen is an intentionally single-owner centralized platform.
          </p>
          <p>
            Every product and service on this website is evaluated, documented, and published directly by Philmen management. When you contact Philmen, our dedicated customer service team handles your request personally, coordinating with trusted supplier networks and service providers to ensure authentic items, transparent pricing, and punctual delivery.
          </p>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs">
            <span className="font-bold text-slate-900">Official Operational Hours:</span>
            <div className="text-slate-600">{contactSettings.businessHours} (Monday – Sunday)</div>
          </div>
        </div>

        <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 space-y-6">
          <h3 className="text-lg font-bold text-amber-400 font-display">
            Our 4 Core Commitments
          </h3>
          <ul className="space-y-4 text-xs text-slate-300">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong className="text-white">Strict Vetting:</strong> No counterfeit goods or non-functional equipment.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong className="text-white">Listing Context Tracking:</strong> Your inquiry is never lost in a generic inbox; we always know the exact listing you need.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong className="text-white">Prompt Response:</strong> Fast replies during business hours via phone or WhatsApp.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong className="text-white">Zero Buyer Registration:</strong> Instant access without signup barriers.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Fast Contact Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-4">
        <h2 className="text-lg font-bold text-slate-900 font-display">Get in Touch with Philmen Management</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-white rounded-xl border border-slate-200">
            <div className="text-slate-500 mb-1">Public Phone Line:</div>
            <a href={`tel:${contactSettings.publicPhone}`} className="font-bold text-slate-900 font-mono text-sm hover:text-amber-600">
              {contactSettings.publicPhone}
            </a>
          </div>
          <div className="p-4 bg-white rounded-xl border border-slate-200">
            <div className="text-slate-500 mb-1">Public WhatsApp:</div>
            <a
              href={`https://wa.me/233${contactSettings.publicWhatsApp.replace(/^0/, '')}`}
              target="_blank"
              rel="noreferrer"
              className="font-bold text-slate-900 font-mono text-sm hover:text-emerald-600"
            >
              {contactSettings.publicWhatsApp}
            </a>
          </div>
          <div className="p-4 bg-white rounded-xl border border-slate-200">
            <div className="text-slate-500 mb-1">Inquiries Email:</div>
            <a href={`mailto:${contactSettings.notificationEmail}`} className="font-bold text-slate-900 text-xs hover:text-amber-600 break-all">
              {contactSettings.notificationEmail}
            </a>
          </div>
        </div>
      </div>

    </div>
  );
};
