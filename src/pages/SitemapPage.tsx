import React from 'react';
import {
  MapPin,
  ChevronRight,
  Layers,
  Car,
  Key,
  Tv,
  Phone,
  MessageSquare,
  Search,
  Star,
  HelpCircle,
  Info,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/categories';

interface Props {
  onNavigate: (route: string) => void;
  onSelectListing: (listingSlug: string) => void;
}

export const SitemapPage: React.FC<Props> = ({ onNavigate, onSelectListing }) => {
  const { listings, contactSettings } = useApp();

  const publishedListings = listings.filter(l => l.status === 'published');

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-16 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        
        {/* Header Header Banner */}
        <div className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-12 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-2.5 sm:space-y-3">
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-xs font-semibold text-amber-400">
              <Layers className="w-4 h-4 shrink-0" />
              <span>Complete Website Directory</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              Website Sitemap
            </h1>
            <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
              Explore the structured index of all public pages, official categories, and inventory listings available on the Philmen platform.
            </p>
          </div>
        </div>

        {/* Sitemap Sections */}
        <div className="space-y-6 sm:space-y-8">
          
          {/* SECTION 1: Core Website Pages */}
          <section className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-8 space-y-4 sm:space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3.5 sm:pb-4">
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs sm:text-sm font-display shrink-0">
                1
              </span>
              <div>
                <h2 className="text-base sm:text-xl font-bold text-slate-900 font-display">
                  Core Website Pages
                </h2>
                <p className="text-[11px] sm:text-xs text-slate-500">
                  Primary landing and search navigation hubs
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="p-3.5 sm:p-4 rounded-xl bg-slate-50 hover:bg-amber-50/70 border border-slate-200/80 hover:border-amber-300 text-left transition-all group flex items-start justify-between cursor-pointer"
              >
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-700">
                    Home Page
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                    Hero booking & featured showcase
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono text-slate-400 mt-2">
                    Route: /
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-transform group-hover:translate-x-1 shrink-0 ml-2" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('categories')}
                className="p-3.5 sm:p-4 rounded-xl bg-slate-50 hover:bg-amber-50/70 border border-slate-200/80 hover:border-amber-300 text-left transition-all group flex items-start justify-between cursor-pointer"
              >
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-700">
                    All Categories Directory
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                    Browse all 3 official sectors
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono text-slate-400 mt-2">
                    Route: #categories
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-transform group-hover:translate-x-1 shrink-0 ml-2" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('featured')}
                className="p-3.5 sm:p-4 rounded-xl bg-slate-50 hover:bg-amber-50/70 border border-slate-200/80 hover:border-amber-300 text-left transition-all group flex items-start justify-between cursor-pointer"
              >
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-700">
                    Featured Offerings
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                    Handpicked products & services
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono text-slate-400 mt-2">
                    Route: #featured
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-transform group-hover:translate-x-1 shrink-0 ml-2" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('search')}
                className="p-3.5 sm:p-4 rounded-xl bg-slate-50 hover:bg-amber-50/70 border border-slate-200/80 hover:border-amber-300 text-left transition-all group flex items-start justify-between cursor-pointer"
              >
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-700">
                    Product & Service Search
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                    Filter by keyword, price, and category
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono text-slate-400 mt-2">
                    Route: #search
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-transform group-hover:translate-x-1 shrink-0 ml-2" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('how-it-works')}
                className="p-3.5 sm:p-4 rounded-xl bg-slate-50 hover:bg-amber-50/70 border border-slate-200/80 hover:border-amber-300 text-left transition-all group flex items-start justify-between cursor-pointer"
              >
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-700">
                    How It Works
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                    Centralized facilitation process explained
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono text-slate-400 mt-2">
                    Route: #how-it-works
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-transform group-hover:translate-x-1 shrink-0 ml-2" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="p-3.5 sm:p-4 rounded-xl bg-slate-50 hover:bg-amber-50/70 border border-slate-200/80 hover:border-amber-300 text-left transition-all group flex items-start justify-between cursor-pointer"
              >
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-700">
                    About Philmen
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                    Company philosophy, standards & trust
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono text-slate-400 mt-2">
                    Route: #about
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-transform group-hover:translate-x-1 shrink-0 ml-2" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('the-founder')}
                className="p-3.5 sm:p-4 rounded-xl bg-slate-50 hover:bg-amber-50/70 border border-slate-200/80 hover:border-amber-300 text-left transition-all group flex items-start justify-between cursor-pointer"
              >
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-700">
                    The Founder
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                    Meet Theophilus Mensah & platform vision
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono text-slate-400 mt-2">
                    Route: #the-founder
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-transform group-hover:translate-x-1 shrink-0 ml-2" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="p-3.5 sm:p-4 rounded-xl bg-slate-50 hover:bg-amber-50/70 border border-slate-200/80 hover:border-amber-300 text-left transition-all group flex items-start justify-between cursor-pointer"
              >
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-700">
                    Contact Desk
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                    Direct phone lines, WhatsApp & hours
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono text-slate-400 mt-2">
                    Route: #contact
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-transform group-hover:translate-x-1 shrink-0 ml-2" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('sitemap')}
                className="p-3.5 sm:p-4 rounded-xl bg-amber-50/80 border border-amber-300 text-left transition-all group flex items-start justify-between cursor-pointer"
              >
                <div>
                  <div className="text-xs sm:text-sm font-bold text-amber-900">
                    Sitemap (Current Page)
                  </div>
                  <div className="text-[11px] sm:text-xs text-amber-700 mt-0.5">
                    Complete hierarchical structure
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono text-amber-800 mt-2">
                    Route: #sitemap
                  </div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 ml-2" />
              </button>
            </div>
          </section>

          {/* SECTION 2: Official Categories Directory */}
          <section className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-8 space-y-4 sm:space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3.5 sm:pb-4">
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs sm:text-sm font-display shrink-0">
                2
              </span>
              <div>
                <h2 className="text-base sm:text-xl font-bold text-slate-900 font-display">
                  Official Categories Directory
                </h2>
                <p className="text-[11px] sm:text-xs text-slate-500">
                  The 3 core sectors exclusively supported on the Philmen platform
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
              {CATEGORIES.map(category => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => onNavigate(`category:${category.slug}`)}
                  className="p-4 sm:p-5 rounded-xl bg-slate-50 hover:bg-amber-50/70 border border-slate-200/80 hover:border-amber-300 text-left transition-all group flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <div className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-amber-700">
                      {category.name}
                    </div>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-3">
                      {category.description}
                    </p>
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono text-slate-400 mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                    <span>Route: #category/{category.slug}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* SECTION 3: Published Inventory & Catalog Items */}
          <section className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-8 space-y-4 sm:space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3.5 sm:pb-4">
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs sm:text-sm font-display shrink-0">
                3
              </span>
              <div>
                <h2 className="text-base sm:text-xl font-bold text-slate-900 font-display">
                  Published Inventory & Catalog Items
                </h2>
                <p className="text-[11px] sm:text-xs text-slate-500">
                  Direct item detail pages for verified products and services ({publishedListings.length} total)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
              {publishedListings.map(listing => (
                <button
                  key={listing.id}
                  type="button"
                  onClick={() => onSelectListing(listing.slug)}
                  className="p-3 sm:p-3.5 rounded-xl bg-slate-50 hover:bg-amber-50/60 border border-slate-200/70 hover:border-amber-300 text-left transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <div className="min-w-0 pr-2">
                    <div className="text-xs font-bold text-slate-900 group-hover:text-amber-700 truncate">
                      {listing.title}
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                      <span className="text-amber-700 font-semibold truncate">{listing.category}</span>
                      <span>·</span>
                      <span className="font-mono shrink-0">{listing.priceDisplay}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 shrink-0 transition-transform group-hover:translate-x-1" />
                </button>
              ))}
            </div>
          </section>

          {/* SECTION 4: Customer Inquiries & Contact Channels */}
          <section className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-8 space-y-4 sm:space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3.5 sm:pb-4">
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs sm:text-sm font-display shrink-0">
                4
              </span>
              <div>
                <h2 className="text-base sm:text-xl font-bold text-slate-900 font-display">
                  Customer Inquiries & Contact Channels
                </h2>
                <p className="text-[11px] sm:text-xs text-slate-500">
                  Official direct communication desks for pricing, delivery, and reservations
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 sm:space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Direct Phone Call
                </div>
                <a
                  href={`tel:${contactSettings.publicPhone}`}
                  className="text-sm sm:text-base font-bold text-slate-900 hover:text-amber-600 font-mono inline-flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-500" />
                  <span>{contactSettings.publicPhone}</span>
                </a>
                <p className="text-[11px] text-slate-500">
                  Immediate customer service assistance
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/80 space-y-1.5 sm:space-y-2">
                <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  WhatsApp Concierge
                </div>
                <a
                  href={`https://wa.me/233${contactSettings.publicWhatsApp.replace(/^0/, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm sm:text-base font-bold text-emerald-700 hover:text-emerald-800 font-mono inline-flex items-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>{contactSettings.publicWhatsApp}</span>
                </a>
                <p className="text-[11px] text-slate-500">
                  Instant messaging & inventory confirmation
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 sm:space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Business Hours
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900">
                  {contactSettings.businessHours}
                </div>
                <p className="text-[11px] text-slate-500">
                  Operating 7 days a week across Ghana
                </p>
              </div>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
};
