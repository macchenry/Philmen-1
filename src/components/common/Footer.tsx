import React from 'react';
import {
  Phone,
  MessageSquare,
  Mail,
  Clock,
  Globe,
  ShieldCheck,
  Lock,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Layers,
  Star,
  Info,
  HelpCircle,
  Headphones
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/categories';

interface Props {
  onNavigate: (route: string) => void;
  onOpenAdminAuth: () => void;
}

export const Footer: React.FC<Props> = ({ onNavigate, onOpenAdminAuth }) => {
  const { contactSettings } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 overflow-x-hidden">
      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10 sm:space-y-12">
        
        {/* Primary Nav Menu Items Grid */}
        <div className="p-4 sm:p-8 bg-slate-900/70 border border-slate-800/90 rounded-2xl sm:rounded-3xl">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-4 font-display">
            Philmen Main Navigation
          </div>

          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
            
            {/* 1. Categories */}
            <button
              onClick={() => onNavigate('categories')}
              className="p-3.5 sm:p-4 bg-slate-950/80 hover:bg-slate-950 border border-slate-800/80 hover:border-amber-500/60 rounded-2xl text-left transition-all group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                <Layers className="w-4 h-4" />
              </div>
              <div className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                Categories
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                3 Official Sectors
              </div>
            </button>

            {/* 2. Featured */}
            <button
              onClick={() => onNavigate('featured')}
              className="p-3.5 sm:p-4 bg-slate-950/80 hover:bg-slate-950 border border-slate-800/80 hover:border-amber-500/60 rounded-2xl text-left transition-all group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                <Star className="w-4 h-4" />
              </div>
              <div className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                Featured
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Handpicked offerings
              </div>
            </button>

            {/* 3. How It Works */}
            <button
              onClick={() => onNavigate('how-it-works')}
              className="p-3.5 sm:p-4 bg-slate-950/80 hover:bg-slate-950 border border-slate-800/80 hover:border-amber-500/60 rounded-2xl text-left transition-all group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                How It Works
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Centralized journey
              </div>
            </button>

            {/* 4. About Philmen */}
            <button
              onClick={() => onNavigate('about')}
              className="p-3.5 sm:p-4 bg-slate-950/80 hover:bg-slate-950 border border-slate-800/80 hover:border-amber-500/60 rounded-2xl text-left transition-all group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                <Info className="w-4 h-4" />
              </div>
              <div className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                About Philmen
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Trust & standards
              </div>
            </button>

            {/* 5. Contact */}
            <button
              onClick={() => onNavigate('contact')}
              className="p-3.5 sm:p-4 bg-slate-950/80 hover:bg-slate-950 border border-slate-800/80 hover:border-amber-500/60 rounded-2xl text-left transition-all group cursor-pointer min-[420px]:col-span-2 md:col-span-1"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                <Headphones className="w-4 h-4" />
              </div>
              <div className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                Contact
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Voice, WhatsApp, Email
              </div>
            </button>

          </div>
        </div>

        {/* Detailed Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          
          {/* Col 1: Brand & Philosophy */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center">
              <img
                src="https://i.ibb.co/sJcgCgS7/Philmen.png"
                alt="Philmen"
                referrerPolicy="no-referrer"
                className="h-10 sm:h-12 w-auto object-contain brightness-110"
              />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Philmen is a centralized platform for displaying and promoting vetted products and services across Ghana. We connect prospective customers directly to verified car rentals, certified vehicle sales, and genuine electronics, electricals & home appliances.
            </p>
            <div className="pt-2">
              <div className="text-[11px] uppercase tracking-wider font-semibold text-amber-500 mb-1.5">
                Facilitation Assurance
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Customer → Philmen → Relevant Product/Service Provider. Streamlined, safe, and accountable.
              </p>
            </div>
          </div>

          {/* Col 2: Categories Directory */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3.5 font-display">
              Categories Directory
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {CATEGORIES.map(cat => (
                <li key={cat.id}>
                  <button
                    onClick={() => onNavigate(`category:${cat.slug}`)}
                    className="hover:text-amber-400 transition-colors text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Official Public Contacts */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">
              Public Contact
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div>
                <div className="text-[11px] text-slate-400">Customer Service Phone:</div>
                <a
                  href={`tel:${contactSettings.publicPhone}`}
                  className="font-bold text-white hover:text-amber-400 transition-colors font-mono text-sm inline-flex items-center gap-1.5 mt-0.5"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-500" />
                  {contactSettings.publicPhone}
                </a>
              </div>

              <div>
                <div className="text-[11px] text-slate-400">Customer Service WhatsApp:</div>
                <a
                  href={`https://wa.me/233${contactSettings.publicWhatsApp.replace(/^0/, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-white hover:text-emerald-400 transition-colors font-mono text-sm inline-flex items-center gap-1.5 mt-0.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                  {contactSettings.publicWhatsApp}
                </a>
              </div>

              <div>
                <div className="text-[11px] text-slate-400">Booking / Inquiry Email:</div>
                <a
                  href={`mailto:${contactSettings.notificationEmail}`}
                  className="font-medium text-slate-200 hover:text-amber-400 transition-colors inline-flex items-center gap-1.5 mt-0.5 break-all"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  {contactSettings.notificationEmail}
                </a>
              </div>

              <div>
                <div className="text-[11px] text-slate-400">Operating Hours:</div>
                <div className="text-slate-200 mt-0.5">
                  {contactSettings.businessHours} (Daily)
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} Philmen ({contactSettings.website}). All rights reserved.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <button
              onClick={() => onNavigate('categories')}
              className="hover:text-white transition-colors"
            >
              Categories
            </button>
            <button
              onClick={() => onNavigate('featured')}
              className="hover:text-white transition-colors"
            >
              Featured
            </button>
            <button
              onClick={() => onNavigate('how-it-works')}
              className="hover:text-white transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="hover:text-white transition-colors"
            >
              About Philmen
            </button>
            <button
              onClick={() => onNavigate('the-founder')}
              className="hover:text-white transition-colors"
            >
              The Founder
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-white transition-colors"
            >
              Contact
            </button>
            <button
              onClick={() => onNavigate('sitemap')}
              className="hover:text-white transition-colors"
            >
              Sitemap
            </button>
            <button
              onClick={onOpenAdminAuth}
              className="hover:text-amber-400 transition-colors inline-flex items-center gap-1 text-slate-400"
            >
              <Lock className="w-3 h-3" />
              Staff Login
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
