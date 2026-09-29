import React, { useEffect } from 'react';
import {
  Phone,
  MessageSquare,
  Mail,
  Clock,
  Globe,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Compass,
  Layers,
  Search,
  FileText,
  Send,
  HelpCircle,
  Building2,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/categories';

interface Props {
  onNavigate: (route: string) => void;
}

export const FounderPage: React.FC<Props> = ({ onNavigate }) => {
  const { contactSettings } = useApp();

  // Update page title & meta description on mount
  useEffect(() => {
    document.title = 'The Founder | Philmen';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Meet Theophilus Mensah, the Founder of Philmen, and learn about the vision and purpose behind the platform.'
      );
    }
    return () => {
      document.title = 'Philmen · Verified Products & Services | Ghana';
    };
  }, []);

  const steps = [
    {
      number: '1',
      title: 'Discover',
      description: 'Customers browse products and services available on Philmen.'
    },
    {
      number: '2',
      title: 'Explore',
      description: 'Customers open a listing to view its images, description, price, location and other available information.'
    },
    {
      number: '3',
      title: 'Contact Philmen',
      description: 'Customers can contact Philmen by phone or WhatsApp.'
    },
    {
      number: '4',
      title: 'Make a Request',
      description: 'Customers can submit a booking or inquiry request for a particular product or service.'
    },
    {
      number: '5',
      title: 'Philmen Responds',
      description: "Philmen receives the request and handles the customer's inquiry or connects the customer with the relevant provider where applicable."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-16 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Section 1: Founder Profile Hero */}
        <section className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden p-5 sm:p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Desktop Left / Mobile Top: Founder Profile Image */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start">
              <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-md">
                <img
                  src="https://i.ibb.co/8nGL7spX/Founder-Profile-Picture.jpg"
                  alt="Theophilus Mensah - Founder of Philmen"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                    Founder
                  </div>
                  <div className="text-lg sm:text-xl font-bold font-display">
                    Theophilus Mensah
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Right / Mobile Bottom: Founder Information & Vision */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              
              {/* Introduction */}
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-xs font-semibold text-amber-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Leadership & Purpose</span>
                </div>
                <h1 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500 font-mono">
                  The Founder
                </h1>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
                  Theophilus Mensah
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Theophilus Mensah is the Founder of Philmen, a platform created to bring a wide range of products and services together in one convenient place. Through Philmen, customers can discover products and services and contact Philmen directly for inquiries, bookings and requests.
                </p>
              </div>

              {/* Vision Section */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 sm:p-6 space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                    <Compass className="w-4 h-4" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                    The Vision Behind Philmen
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Philmen was established to make it easier for customers to discover different products and services through one convenient platform. The platform brings together categories including Car Rental, Car Sales, and Electronics, Electricals & Home Appliances.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* Section 2: About Philmen */}
        <section className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-800 shadow-xl relative overflow-hidden space-y-4 sm:space-y-6">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
              Centralized Facilitation
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
              About Philmen
            </h2>
            <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
              Philmen is a centralized platform for displaying and promoting a variety of products and services. Customers can browse listings, explore product and service details, and contact Philmen directly for inquiries, bookings and requests. Where applicable, Philmen facilitates the connection between customers and the relevant product or service provider.
            </p>
          </div>
        </section>

        {/* Section 3: What Philmen Offers */}
        <section className="space-y-6 sm:space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider font-mono">
                Catalog & Sectors
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">
                What Philmen Offers
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Explore our full spectrum of curated product sectors and managed service categories.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('categories')}
              className="text-xs font-bold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1 transition-colors cursor-pointer self-start sm:self-auto"
            >
              <span>View All Categories</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {CATEGORIES.map(category => (
              <button
                key={category.id}
                type="button"
                onClick={() => onNavigate(`category:${category.slug}`)}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-amber-400 hover:shadow-md transition-all text-left group flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                    {category.name}
                  </div>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-600">
                  <span>Browse Category</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Section 4: How Philmen Helps Customers */}
        <section className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 lg:p-12 space-y-8">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider font-mono">
              Simple Step-by-Step Experience
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">
              How Philmen Helps Customers
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              A transparent, streamlined journey from discovering an item to verified fulfillment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {steps.map(step => (
              <div
                key={step.number}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs font-display">
                    {step.number}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 font-display">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Connect With Philmen */}
        <section className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl border border-slate-800 shadow-lg p-6 sm:p-10 lg:p-12 space-y-8">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
              Official Business Communication
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white mt-1">
              Connect With Philmen
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Reach out directly to Philmen for inquiries, bookings, inventory availability, and customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            
            {/* Phone */}
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Phone
              </div>
              <a
                href={`tel:${contactSettings.publicPhone}`}
                className="text-base sm:text-lg font-bold text-white hover:text-amber-400 font-mono inline-flex items-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{contactSettings.publicPhone}</span>
              </a>
              <p className="text-[11px] text-slate-400">
                Direct phone customer support
              </p>
            </div>

            {/* WhatsApp */}
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                WhatsApp
              </div>
              <a
                href={`https://wa.me/233${contactSettings.publicWhatsApp.replace(/^0/, '')}`}
                target="_blank"
                rel="noreferrer"
                className="text-base sm:text-lg font-bold text-emerald-400 hover:text-emerald-300 font-mono inline-flex items-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{contactSettings.publicWhatsApp}</span>
              </a>
              <p className="text-[11px] text-slate-400">
                Direct WhatsApp inquiry line
              </p>
            </div>

            {/* Email */}
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Email
              </div>
              <a
                href={`mailto:${contactSettings.notificationEmail}`}
                className="text-xs sm:text-sm font-semibold text-white hover:text-amber-400 transition-colors inline-flex items-center gap-2 break-all"
              >
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{contactSettings.notificationEmail}</span>
              </a>
              <p className="text-[11px] text-slate-400">
                Official booking & inquiry email
              </p>
            </div>

            {/* Website */}
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Website
              </div>
              <div className="text-sm font-bold text-white font-mono inline-flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{contactSettings.website}</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Official web platform
              </p>
            </div>

            {/* Business Hours */}
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Business Hours
              </div>
              <div className="text-sm font-bold text-white inline-flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{contactSettings.businessHours}</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Operating 7 days a week
              </p>
            </div>

            {/* Customer Service Hours */}
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Customer Service Hours
              </div>
              <div className="text-sm font-bold text-white inline-flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{contactSettings.customerServiceHours}</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Direct inquiry desk response hours
              </p>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
};
