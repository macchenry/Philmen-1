import React, { useState, useRef, useEffect } from 'react';
import {
  Phone,
  MessageSquare,
  Search,
  Lock,
  ChevronDown,
  Car,
  HardHat,
  Home,
  Truck,
  Shirt,
  Building,
  Package,
  CalendarCheck,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ServiceItem {
  id: string;
  name: string;
  categorySlug: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tag?: string;
}

const BOOKABLE_SERVICES: ServiceItem[] = [
  {
    id: 'car-rentals',
    name: 'Executive Car Rentals',
    categorySlug: 'car-rentals',
    description: 'Chauffeur Prado VXR, V8 300, Camry & VIP airport transfers',
    icon: Car,
    tag: 'Popular'
  },
  {
    id: 'heavy-equipment',
    name: 'Construction & Heavy Equipment',
    categorySlug: 'construction-and-heavy-equipment',
    description: 'CAT excavators, wheel loaders, 50-ton cranes & compactors',
    icon: HardHat
  },
  {
    id: 'home-rentals',
    name: 'Home & Apartment Rentals',
    categorySlug: 'home-rentals',
    description: 'Furnished apartments in East Legon, townhouses & short-lets',
    icon: Home
  },
  {
    id: 'towing',
    name: '24/7 Emergency Towing',
    categorySlug: 'towing',
    description: 'Zero-damage hydraulic flatbed recovery across Accra & highways',
    icon: Truck,
    tag: '24/7 Rapid'
  },
  {
    id: 'suits',
    name: 'Bespoke Suit Tailoring',
    categorySlug: 'suits',
    description: 'Italian wool 3-piece custom fitting & measurement visits',
    icon: Shirt
  },
  {
    id: 'real-estate',
    name: 'Real Estate & Land Inspection',
    categorySlug: 'real-estate',
    description: 'Verified residential plots, commercial properties & developments',
    icon: Building
  },
  {
    id: 'building-materials',
    name: 'Building Material Bulk Supply',
    categorySlug: 'building-material-supply',
    description: 'Direct quarry granite, high-grade sand & structural cement',
    icon: Package
  }
];

interface Props {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenAdminAuth: () => void;
  onOpenSearch: () => void;
  onSelectServiceBooking?: (serviceSlug: string) => void;
}

export const Header: React.FC<Props> = ({
  currentRoute,
  onNavigate,
  onOpenAdminAuth,
  onOpenSearch,
  onSelectServiceBooking
}) => {
  const { contactSettings, currentAdminUser } = useApp();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleServiceClick = (item: ServiceItem) => {
    setDropdownOpen(false);
    if (onSelectServiceBooking) {
      onSelectServiceBooking(item.categorySlug);
    } else {
      onNavigate(`category:${item.categorySlug}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Brand Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center text-left focus:outline-hidden group cursor-pointer"
              title="Philmen Home"
            >
              <img
                src="https://i.ibb.co/sJcgCgS7/Philmen.png"
                alt="Philmen"
                referrerPolicy="no-referrer"
                className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </button>
          </div>

          {/* Zone 2: Book a Service Dropdown Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-2 cursor-pointer shadow-xs ${
                dropdownOpen
                  ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400'
                  : 'bg-amber-50 text-amber-900 hover:bg-amber-100/90 border border-amber-300'
              }`}
            >
              <CalendarCheck className="w-4 h-4 text-amber-700" />
              <span>Book a Service</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  dropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu Panel */}
            {dropdownOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 top-full mt-2.5 w-[330px] sm:w-[400px] bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Select a Service to Reserve
                  </span>
                  <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded">
                    Direct Facilitation
                  </span>
                </div>

                <div className="divide-y divide-slate-100 max-h-[380px] overflow-y-auto pt-1">
                  {BOOKABLE_SERVICES.map(service => {
                    const IconComponent = service.icon;
                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => handleServiceClick(service)}
                        className="w-full p-3 rounded-xl hover:bg-amber-50/60 text-left transition-colors flex items-start gap-3 group cursor-pointer"
                      >
                        <div className="w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-amber-100 text-slate-700 group-hover:text-amber-800 flex items-center justify-center shrink-0 transition-colors mt-0.5">
                          <IconComponent className="w-4 h-4" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-slate-900 group-hover:text-amber-700 truncate">
                              {service.name}
                            </span>
                            {service.tag && (
                              <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-amber-500 text-slate-950 shrink-0">
                                {service.tag}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 leading-snug">
                            {service.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="p-2.5 mt-1 bg-slate-50 border-t border-slate-100 rounded-xl flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[11px]">Need custom consultation?</span>
                  <a
                    href={`tel:${contactSettings.publicPhone}`}
                    className="font-bold text-slate-900 hover:text-amber-600 inline-flex items-center gap-1 text-[11px]"
                  >
                    <Phone className="w-3 h-3 text-amber-500" />
                    <span>Call {contactSettings.publicPhone}</span>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Zone 3: Primary Actions (Search, WhatsApp, Direct Call, Staff Portal) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-2 cursor-pointer"
              title="Search products & services"
            >
              <Search className="w-5 h-5" />
              <span className="hidden md:inline text-xs font-semibold text-slate-600">Search</span>
            </button>

            {/* Quick WhatsApp Philmen Button */}
            <a
              href={`https://wa.me/233${contactSettings.publicWhatsApp.replace(/^0/, '')}?text=${encodeURIComponent(
                'Hello Philmen, I am contacting you from www.philmen.shop regarding your products and services.'
              )}`}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold transition-colors border border-emerald-200/80 cursor-pointer"
              title="Chat with Philmen on WhatsApp"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span className="font-mono">{contactSettings.publicWhatsApp}</span>
            </a>

            {/* Direct Call Philmen Button */}
            <a
              href={`tel:${contactSettings.publicPhone}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
              title="Call Philmen"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">Call Philmen</span>
              <span className="font-mono">{contactSettings.publicPhone}</span>
            </a>

            {/* Staff / Dashboard Portal Indicator */}
            <button
              onClick={onOpenAdminAuth}
              className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                currentAdminUser
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title={currentAdminUser ? `Logged in as ${currentAdminUser.role}` : 'Staff Portal'}
            >
              <Lock className="w-4 h-4" />
              {currentAdminUser && (
                <span className="hidden xl:inline max-w-[100px] truncate text-[11px]">
                  {currentAdminUser.role.split(' ')[0]}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
