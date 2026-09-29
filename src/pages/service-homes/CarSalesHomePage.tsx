import React, { useState, useMemo } from 'react';
import {
  Car,
  ShieldCheck,
  Phone,
  MessageSquare,
  Search,
  Calendar,
  MapPin,
  Clock,
  ArrowLeft,
  CheckCircle2,
  Check,
  Send,
  User,
  SlidersHorizontal,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Listing, PreferredContactMethod } from '../../types';
import { ListingCard } from '../../components/common/ListingCard';

interface Props {
  onReturnToPreHome: () => void;
  onSelectListing: (listing: Listing) => void;
  onCall: (listing: Listing) => void;
  onWhatsApp: (listing: Listing) => void;
  onBook: (listing: Listing) => void;
  onNavigate: (route: string) => void;
}

export const CarSalesHomePage: React.FC<Props> = ({
  onReturnToPreHome,
  onSelectListing,
  onCall,
  onWhatsApp,
  onBook,
  onNavigate
}) => {
  const { listings, submitInquiry, contactSettings } = useApp();

  // Strictly filter only Car Sales listings
  const salesListings = useMemo(() => {
    return listings.filter(l => l.status === 'published' && l.category === 'Car Sales');
  }, [listings]);

  // Subcategory filter
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  // Quick Car Sales Inspection Request Form State
  const [vehicleChoice, setVehicleChoice] = useState('Toyota Corolla LE 2022 (Foreign Used)');
  const [inquiryType, setInquiryType] = useState('Physical Viewing & Test Drive');
  const [preferredDate, setPreferredDate] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [contactMethod, setContactMethod] = useState<PreferredContactMethod>('Phone');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedInquiryId, setSubmittedInquiryId] = useState('');

  const filteredListings = useMemo(() => {
    return salesListings.filter(item => {
      if (selectedSubcategory !== 'all' && item.subcategory !== selectedSubcategory) return false;
      if (searchKeyword.trim()) {
        const q = searchKeyword.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchDesc = item.shortDescription.toLowerCase().includes(q) || item.fullDescription.toLowerCase().includes(q);
        const matchLoc = item.location.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchLoc) return false;
      }
      return true;
    });
  }, [salesListings, selectedSubcategory, searchKeyword]);

  const handleInspectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) return;

    const targetListing = salesListings[0] || {
      id: 'PH-CS-001',
      title: 'Toyota Corolla LE 2022 (Foreign Used / Immaculate Condition)',
      slug: 'toyota-corolla-le-2022-foreign-used',
      type: 'Product',
      category: 'Car Sales',
      shortDescription: 'Direct foreign-used clean sedan',
      fullDescription: 'Car sales inquiry',
      images: ['https://i.ibb.co/9mYCqMbD/005-Land-for-Development.jpg'],
      price: 215000,
      priceType: 'exact',
      priceDisplay: 'GH₵ 215,000',
      location: 'Achimota Mile 7, Accra',
      status: 'published',
      featured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const constructedMessage = `CAR SALES INQUIRY:\n- Vehicle: ${vehicleChoice}\n- Intent: ${inquiryType}\n- Preferred Viewing Schedule: ${preferredDate || 'Flexible'}\n- Client: ${customerName} (${customerPhone})`;

    const created = submitInquiry({
      customerName,
      customerPhone,
      customerEmail: 'N/A',
      contactMethod,
      preferredDateTime: preferredDate || 'Flexible',
      message: constructedMessage,
      listing: targetListing
    });

    setSubmittedInquiryId(created.id);
    setIsSubmitted(true);
  };

  const subcategories = ['Sedans', 'SUVs & 4x4', 'Commercial Pickups', 'Luxury Vehicles'];

  return (
    <div className="space-y-12 sm:space-y-16 pb-16 overflow-x-hidden bg-slate-50">
      
      {/* Service Top Bar Navigation & Portal Switcher */}
      <div className="bg-slate-900 border-b border-slate-800 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={onReturnToPreHome}
              className="inline-flex items-center gap-1.5 font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All 3 Services (Pre-Home)</span>
            </button>
            <span className="text-slate-500">/</span>
            <span className="font-bold text-white flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5 text-amber-400" />
              Car Sales Home Page
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-400 text-[11px] sm:text-xs">
            <span className="hidden sm:inline">Switch Service:</span>
            <button
              onClick={() => onNavigate('category:car-rental')}
              className="hover:text-white underline underline-offset-2 cursor-pointer"
            >
              Car Rental
            </button>
            <span>·</span>
            <button
              onClick={() => onNavigate('category:electronics-electricals-and-home-appliances')}
              className="hover:text-white underline underline-offset-2 cursor-pointer"
            >
              Electronics & Appliances
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-slate-800">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-xs font-semibold text-amber-400 shadow-sm">
                <Car className="w-3.5 h-3.5 shrink-0" />
                <span>Verified Vehicle Sales · Ghana</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display leading-tight">
                Philmen <span className="text-amber-400">Car Sales</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Direct foreign-used and registered sedans, luxury SUVs, and commercial vehicles with full customs documentation, physical inspection booking, and authentic verification.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Verified customs clearance papers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Physical viewing & test drive in Accra</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Comprehensive mechanical checks</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Direct ownership transfer guidance</span>
                </div>
              </div>
            </div>

            {/* Hero Right: Direct Vehicle Inspection Booking Widget */}
            <div className="lg:col-span-6 bg-slate-900/90 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-slate-700/80 p-5 sm:p-7 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Book Vehicle Viewing / Inquire
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  Direct Coordination
                </span>
              </div>

              {isSubmitted ? (
                <div className="p-6 text-center space-y-3 bg-emerald-950/40 rounded-xl border border-emerald-500/40">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-white">Car Sales Inquiry Received</h4>
                  <p className="text-xs text-slate-300">
                    Reference: <strong className="font-mono text-amber-400">{submittedInquiryId}</strong>. Philmen auto sales desk will contact {customerPhone} to schedule inspection.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setCustomerName('');
                      setCustomerPhone('');
                    }}
                    className="px-4 py-2 bg-slate-800 text-xs font-semibold text-white rounded-lg hover:bg-slate-700"
                  >
                    Inquire for Another Vehicle
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInspectionSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Vehicle Model
                      </label>
                      <select
                        value={vehicleChoice}
                        onChange={e => setVehicleChoice(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                      >
                        <option value="Toyota Corolla LE 2022 (Foreign Used)">Toyota Corolla LE 2022 (Foreign Used)</option>
                        <option value="Toyota Land Cruiser Luxury SUV">Toyota Land Cruiser Luxury SUV</option>
                        <option value="Other Custom Sourcing Request">Other Custom Sourcing Request</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Purpose
                      </label>
                      <select
                        value={inquiryType}
                        onChange={e => setInquiryType(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                      >
                        <option value="Physical Viewing & Test Drive">Physical Viewing & Test Drive</option>
                        <option value="Price Negotiation & Purchase Terms">Price Negotiation & Purchase</option>
                        <option value="Customs Documentation Verification">Documentation Verification</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Preferred Date / Viewing Time
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. This Saturday afternoon at Achimota"
                      value={preferredDate}
                      onChange={e => setPreferredDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Emmanuel Osei"
                        value={customerName}
                        onChange={e => setCustomerName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 0244123456"
                        value={customerPhone}
                        onChange={e => setCustomerPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-extrabold uppercase tracking-wider shadow-lg transition-all cursor-pointer inline-flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Vehicle Inquiry</span>
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* Sales Inventory Catalog & Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Available For Purchase
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">
              Car Sales Inventory
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Inspected, duty-paid, and foreign-used vehicles ready for immediate physical viewing.
            </p>
          </div>

          {/* Search Input within Car Sales */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search sales inventory..."
              value={searchKeyword}
              onChange={e => setSearchKeyword(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Subcategory Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setSelectedSubcategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedSubcategory === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            All Car Sales ({salesListings.length})
          </button>
          {subcategories.map(sub => (
            <button
              key={sub}
              onClick={() => setSelectedSubcategory(sub)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedSubcategory === sub
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredListings.map(listing => (
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
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Looking for a Specific Car Model?
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-display">
              Contact Philmen Auto Sales Desk Directly
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Hours: {contactSettings.customerServiceHours} daily. We facilitate vehicle sourcing, clearing checks, and viewing appointments.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={`tel:${contactSettings.publicPhone}`}
              className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold inline-flex items-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call {contactSettings.publicPhone}</span>
            </a>
            <a
              href={`https://wa.me/233${contactSettings.publicWhatsApp.replace(/^0/, '')}`}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp {contactSettings.publicWhatsApp}</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
