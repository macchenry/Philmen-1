import React, { useState, useRef, useEffect } from 'react';
import {
  Phone,
  MessageSquare,
  Search,
  Lock,
  ChevronDown,
  Car,
  Key,
  Tv,
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
    id: 'car-rental',
    name: 'Car Rental',
    categorySlug: 'car-rental',
    description: 'Chauffeur Prado VXR, VIP sedans, airport transfers & corporate leases',
    icon: Key,
    tag: 'Chauffeur'
  },
  {
    id: 'car-sales',
    name: 'Car Sales',
    categorySlug: 'car-sales',
    description: 'Vetted foreign-used sedans, SUVs, pickups & physical inspections',
    icon: Car,
    tag: 'Verified'
  },
  {
    id: 'electronics-appliances',
    name: 'Electronics & Appliances',
    categorySlug: 'electronics-electricals-and-home-appliances',
    description: 'Inverter ACs, safety gas cylinders, double door fridges & appliances',
    icon: Tv,
    tag: 'Genuine'
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
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          
          {/* Zone 1: Brand Logo */}
          <div className="flex items-center shrink-0">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center text-left focus:outline-hidden group cursor-pointer"
              title="Philmen Home"
            >
              <img
                src="https://i.ibb.co/sJcgCgS7/Philmen.png"
                alt="Philmen"
                referrerPolicy="no-referrer"
                className="h-9 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </button>
          </div>

          {/* Zone 2: Book a Service Dropdown Menu */}
          <div className="relative shrink-0" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 sm:gap-2 cursor-pointer shadow-xs ${
                dropdownOpen
                  ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400'
                  : 'bg-amber-50 text-amber-900 hover:bg-amber-100/90 border border-amber-300'
              }`}
            >
              <CalendarCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-700 shrink-0" />
              <span className="hidden min-[380px]:inline">Book a Service</span>
              <span className="min-[380px]:hidden">Services</span>
              <ChevronDown
                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-200 ${
                  dropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Responsive Dropdown Menu Panel (Centered on mobile, left-aligned on tablet/desktop) */}
            {dropdownOpen && (
              <div className="fixed sm:absolute left-3 right-3 sm:left-0 sm:right-auto sm:translate-x-0 top-16 sm:top-full mt-1.5 sm:mt-2.5 max-w-[calc(100vw-1.5rem)] sm:w-[380px] bg-white rounded-2xl shadow-2xl border border-slate-200 p-2.5 sm:p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-2.5 py-1.5 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Select a Service to Reserve
                  </span>
                  <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.5 rounded">
                    Direct Facilitation
                  </span>
                </div>

                <div className="divide-y divide-slate-100 max-h-[60vh] sm:max-h-[380px] overflow-y-auto pt-1">
                  {BOOKABLE_SERVICES.map(service => {
                    const IconComponent = service.icon;
                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => handleServiceClick(service)}
                        className="w-full p-2.5 sm:p-3 rounded-xl hover:bg-amber-50/60 text-left transition-colors flex items-start gap-2.5 sm:gap-3 group cursor-pointer"
                      >
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-slate-100 group-hover:bg-amber-100 text-slate-700 group-hover:text-amber-800 flex items-center justify-center shrink-0 transition-colors mt-0.5">
                          <IconComponent className="w-4 h-4" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1.5">
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

                <div className="p-2 sm:p-2.5 mt-1 bg-slate-50 border-t border-slate-100 rounded-xl flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[10px] sm:text-[11px] truncate">Need custom help?</span>
                  <a
                    href={`tel:${contactSettings.publicPhone}`}
                    className="font-bold text-slate-900 hover:text-amber-600 inline-flex items-center gap-1 text-[11px] shrink-0"
                  >
                    <Phone className="w-3 h-3 text-amber-500" />
                    <span>{contactSettings.publicPhone}</span>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Zone 3: Primary Actions (Search, WhatsApp, Direct Call, Staff Portal) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 sm:p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Search products & services"
              aria-label="Search catalog"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden md:inline text-xs font-semibold text-slate-600">Search</span>
            </button>

            {/* Quick WhatsApp Philmen Button */}
            <a
              href={`https://wa.me/233${contactSettings.publicWhatsApp.replace(/^0/, '')}?text=${encodeURIComponent(
                'Hello Philmen, I am contacting you from www.philmen.shop regarding your products and services.'
              )}`}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold transition-colors border border-emerald-200/80 cursor-pointer"
              title="Chat with Philmen on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-mono hidden lg:inline">{contactSettings.publicWhatsApp}</span>
              <span className="lg:hidden">WhatsApp</span>
            </a>

            {/* Direct Call Philmen Button */}
            <a
              href={`tel:${contactSettings.publicPhone}`}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
              title="Call Philmen"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="hidden md:inline">Call Philmen</span>
              <span className="font-mono hidden sm:inline">{contactSettings.publicPhone}</span>
              <span className="sm:hidden">Call</span>
            </a>

            {/* Staff / Dashboard Portal Indicator */}
            <button
              onClick={onOpenAdminAuth}
              className={`p-2 sm:p-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                currentAdminUser
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title={currentAdminUser ? `Logged in as ${currentAdminUser.role}` : 'Staff Portal'}
              aria-label="Staff Portal"
            >
              <Lock className="w-4 h-4" />
              {currentAdminUser && (
                <span className="hidden xl:inline max-w-[90px] truncate text-[11px]">
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
