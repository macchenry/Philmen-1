import React, { useState } from 'react';
import {
  Search,
  Phone,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  TrendingUp,
  SlidersHorizontal,
  ChevronRight,
  Award,
  Zap,
  Check,
  Shield
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/categories';
import { ListingCard } from '../components/common/ListingCard';
import { HeroBookingWidget } from '../components/home/HeroBookingWidget';
import { Listing } from '../types';

interface Props {
  onNavigate: (route: string) => void;
  onSelectListing: (listing: Listing) => void;
  onCall: (listing: Listing) => void;
  onWhatsApp: (listing: Listing) => void;
  onBook: (listing: Listing) => void;
}

export const HomePage: React.FC<Props> = ({
  onNavigate,
  onSelectListing,
  onCall,
  onWhatsApp,
  onBook
}) => {
  const { listings, contactSettings } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');

  // Filter only published listings for public view
  const publishedListings = listings.filter(item => item.status === 'published');
  const featuredListings = publishedListings.filter(item => item.featured);
  const latestListings = [...publishedListings].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 8);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() || selectedCategoryFilter !== 'all') {
      onNavigate(`search?q=${encodeURIComponent(searchQuery)}&category=${encodeURIComponent(selectedCategoryFilter)}`);
    } else {
      onNavigate('categories');
    }
  };

  return (
    <div className="space-y-12 sm:space-y-20 lg:space-y-24 pb-16 overflow-x-hidden">
      
      {/* Master Structured Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-24 border-b border-slate-800">
        
        {/* Subtle decorative background ambient gradients */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-10">
          
          {/* Top Headline & Quick Search Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end">
            
            {/* Left Header Copy */}
            <div className="lg:col-span-7 space-y-3 sm:space-y-3.5">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-[11px] sm:text-xs font-semibold text-amber-400 shadow-sm max-w-full truncate">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="truncate">Centralized Verified Services & Products · Ghana</span>
              </div>

              {/* Display Headline */}
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-display text-balance">
                Book Verified Services & <span className="text-amber-400">Quality Products</span> Across Ghana.
              </h1>

              {/* Sub-headline */}
              <p className="text-xs sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                Philmen is the official centralized platform for car rentals, verified vehicle sales, and genuine electronics, electricals & home appliances across Ghana.
              </p>

              {/* Trust Micro-Badges */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] sm:text-xs text-slate-400 pt-1">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="text-slate-200 font-medium">Instant Inquiry Dispatch</span>
                </div>
                <span className="hidden min-[400px]:inline">·</span>
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-slate-200 font-medium">100% Vetted Inventory</span>
                </div>
                <span className="hidden min-[400px]:inline">·</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span className="text-slate-200 font-medium">7:00 AM – 5:00 PM Daily</span>
                </div>
              </div>
            </div>

            {/* Right Quick Product Search Bar */}
            <div className="lg:col-span-5 space-y-2.5 sm:space-y-3">
              <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-2.5 sm:p-3 shadow-lg space-y-2">
                <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between px-1">
                  <span>Product & Service Search</span>
                  <span className="text-amber-400 font-mono text-[10px]">3 Categories</span>
                </div>

                <form onSubmit={handleHeroSearch} className="flex gap-2">
                  <div className="relative flex-1 min-w-0">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search items by name, brand, area..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 sm:py-2.5 bg-slate-950/80 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 sm:px-4 py-2 sm:py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-colors shrink-0 cursor-pointer shadow-sm"
                  >
                    Search
                  </button>
                </form>
              </div>

              {/* Direct Voice & WhatsApp Quick Bar */}
              <div className="flex flex-wrap items-center justify-between gap-1 text-xs text-slate-400 px-1">
                <span className="text-[11px]">Customer Desk:</span>
                <div className="flex items-center gap-2 sm:gap-3">
                  <a
                    href={`tel:${contactSettings.publicPhone}`}
                    className="text-white font-mono hover:text-amber-400 transition-colors inline-flex items-center gap-1 font-semibold text-[11px] sm:text-xs"
                  >
                    <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
                    <span>{contactSettings.publicPhone}</span>
                  </a>
                  <span>·</span>
                  <a
                    href={`https://wa.me/233${contactSettings.publicWhatsApp.replace(/^0/, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 font-mono hover:text-emerald-300 transition-colors inline-flex items-center gap-1 font-semibold text-[11px] sm:text-xs"
                  >
                    <MessageSquare className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>{contactSettings.publicWhatsApp}</span>
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Architectural Centerpiece: The Booking Widget */}
          <HeroBookingWidget
            onNavigate={onNavigate}
            onOpenListing={onSelectListing}
          />

        </div>
      </section>

      {/* Official Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3 sm:gap-4">
          <div>
            <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Explore Our Catalog
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 mt-1 font-display">
              Official Categories
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Browse products and specialized services centrally managed by Philmen.
            </p>
          </div>

          <button
            onClick={() => onNavigate('categories')}
            className="text-xs font-bold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {CATEGORIES.map(cat => {
            const count = publishedListings.filter(l => l.category === cat.name).length;
            return (
              <div
                key={cat.id}
                onClick={() => onNavigate(`category:${cat.slug}`)}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 hover:border-amber-400 hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors leading-snug">
                    {cat.name}
                  </h3>

                  <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-medium text-slate-600">{count} {count === 1 ? 'Listing' : 'Listings'}</span>
                  <span className="text-amber-600 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center">
                    Browse <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Listings Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3 sm:gap-4">
          <div>
            <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Handpicked & Verified
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 mt-1 font-display">
              Featured Listings
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Top requested products and services currently available for instant inquiry.
            </p>
          </div>

          <button
            onClick={() => onNavigate('featured')}
            className="text-xs font-bold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>View All Featured</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {featuredListings.slice(0, 8).map(listing => (
            <ListingCard
              key={listing.id}
              listing={listing}
              onViewDetails={onSelectListing}
              onCall={onCall}
              onWhatsApp={onWhatsApp}
              onBook={onBook}
            />
          ))}
        </div>
      </section>

      {/* How Philmen Works (Centralized Model) */}
      <section className="bg-slate-900 text-white py-12 sm:py-16 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Centralized Facilitation
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 font-display">
              How Philmen Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              No complicated seller accounts. No third-party middlemen. Philmen directly coordinates every transaction from inquiry to delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Step 1 */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 sm:p-6 relative">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-bold text-lg flex items-center justify-center mb-4 font-display">
                01
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                Browse & Select Listing
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Explore our catalog of vetted car rentals, verified car sales, and genuine electronics, electricals & home appliances.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 sm:p-6 relative">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-bold text-lg flex items-center justify-center mb-4 font-display">
                02
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                Contact Philmen Directly
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Initiate a call to <strong className="text-white">{contactSettings.publicPhone}</strong>, WhatsApp <strong className="text-white">{contactSettings.publicWhatsApp}</strong>, or submit an online booking request.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 sm:p-6 relative">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-bold text-lg flex items-center justify-center mb-4 font-display">
                03
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                Fast Facilitation & Fulfillment
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Philmen coordinates inspection, dispatch, service mobilization, or verified delivery with complete accountability.
              </p>
            </div>
          </div>

          <div className="mt-8 sm:mt-12 text-center">
            <button
              onClick={() => onNavigate('how-it-works')}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 text-xs font-bold inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>Read Full Facilitation Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* Latest Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3 sm:gap-4">
          <div>
            <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Recently Added
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 mt-1 font-display">
              Latest Inventory & Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Fresh listings updated directly by Philmen management.
            </p>
          </div>

          <button
            onClick={() => onNavigate('search')}
            className="text-xs font-bold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>Search All Inventory</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {latestListings.map(listing => (
            <ListingCard
              key={listing.id}
              listing={listing}
              onViewDetails={onSelectListing}
              onCall={onCall}
              onWhatsApp={onWhatsApp}
              onBook={onBook}
            />
          ))}
        </div>
      </section>

      {/* Direct Contact Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-6 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-2.5 sm:space-y-3">
              <span className="text-[11px] sm:text-xs font-bold text-amber-400 uppercase tracking-wider">
                Immediate Customer Assistance
              </span>
              <h3 className="text-xl sm:text-3xl font-extrabold text-white font-display">
                Need Help Finding a Specific Product or Service?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                Contact Philmen directly during operating hours (<strong className="text-white">{contactSettings.customerServiceHours}</strong>). Our team will source or coordinate exactly what you need.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5 sm:gap-3">
              <a
                href={`tel:${contactSettings.publicPhone}`}
                className="py-3 px-5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Call {contactSettings.publicPhone}</span>
              </a>

              <a
                href={`https://wa.me/233${contactSettings.publicWhatsApp.replace(/^0/, '')}`}
                target="_blank"
                rel="noreferrer"
                className="py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp {contactSettings.publicWhatsApp}</span>
              </a>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
