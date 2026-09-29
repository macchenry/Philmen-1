import React, { useState, useMemo } from 'react';
import {
  Tv,
  ShieldCheck,
  Phone,
  MessageSquare,
  Search,
  MapPin,
  Clock,
  ArrowLeft,
  CheckCircle2,
  Check,
  Send,
  Truck,
  Sparkles,
  Zap,
  Flame,
  Wind
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

export const ElectronicsHomePage: React.FC<Props> = ({
  onReturnToPreHome,
  onSelectListing,
  onCall,
  onWhatsApp,
  onBook,
  onNavigate
}) => {
  const { listings, submitInquiry, contactSettings } = useApp();

  // Strictly filter only Electronics, Electricals & Home Appliances listings
  const electronicsListings = useMemo(() => {
    return listings.filter(
      l => l.status === 'published' && l.category === 'Electronics, Electricals & Home Appliances'
    );
  }, [listings]);

  // Subcategory filter
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  // Quick Appliance Order / Inquiry Form State
  const [productChoice, setProductChoice] = useState('Samsung 350L Double-Door Inverter Refrigerator');
  const [inquiryType, setInquiryType] = useState('Direct Purchase with Home Delivery');
  const [deliveryLocation, setDeliveryLocation] = useState('Greater Accra (Home / Office Delivery)');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [contactMethod, setContactMethod] = useState<PreferredContactMethod>('Phone');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedInquiryId, setSubmittedInquiryId] = useState('');

  const filteredListings = useMemo(() => {
    return electronicsListings.filter(item => {
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
  }, [electronicsListings, selectedSubcategory, searchKeyword]);

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) return;

    const targetListing = electronicsListings[0] || {
      id: 'PH-EL-001',
      title: 'Samsung 350L Double-Door Inverter Refrigerator',
      slug: 'samsung-double-door-inverter-refrigerator',
      type: 'Product',
      category: 'Electronics, Electricals & Home Appliances',
      shortDescription: 'Energy-efficient digital inverter fridge',
      fullDescription: 'Appliance order inquiry',
      images: ['https://i.ibb.co/TqWh7mdB/001-Samsung-Double-Fridge.jpg'],
      price: 8500,
      priceType: 'exact',
      priceDisplay: 'GH₵ 8,500',
      location: 'Spintex Road, Accra',
      status: 'published',
      featured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const constructedMessage = `APPLIANCE & ELECTRONICS ORDER:\n- Item: ${productChoice}\n- Intent: ${inquiryType}\n- Delivery Area: ${deliveryLocation}\n- Client: ${customerName} (${customerPhone})`;

    const created = submitInquiry({
      customerName,
      customerPhone,
      customerEmail: 'N/A',
      contactMethod,
      preferredDateTime: 'Earliest Available Delivery',
      message: constructedMessage,
      listing: targetListing
    });

    setSubmittedInquiryId(created.id);
    setIsSubmitted(true);
  };

  const subcategories = [
    'Refrigerators & Freezers',
    'Air Conditioners',
    'Gas Cylinders & Energy'
  ];

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
              <Tv className="w-3.5 h-3.5 text-amber-400" />
              Electronics, Electricals & Home Appliances
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
              onClick={() => onNavigate('category:car-sales')}
              className="hover:text-white underline underline-offset-2 cursor-pointer"
            >
              Car Sales
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
                <Tv className="w-3.5 h-3.5 shrink-0" />
                <span>Genuine Home Appliances & Energy · Ghana</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display leading-tight">
                Philmen <span className="text-amber-400">Electronics & Appliances</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Brand-new digital inverter refrigerators, energy-efficient split air conditioners, and certified explosion-proof LPG gas cylinders with warranty and doorstep dispatch across Ghana.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Genuine manufacturer warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>GSA certified safe LPG cylinders</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Fast door-to-door delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Technical setup & installation support</span>
                </div>
              </div>
            </div>

            {/* Hero Right: Direct Order / Inquiry Widget */}
            <div className="lg:col-span-6 bg-slate-900/90 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-slate-700/80 p-5 sm:p-7 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Direct Appliance Order / Dispatch
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  Instant Support
                </span>
              </div>

              {isSubmitted ? (
                <div className="p-6 text-center space-y-3 bg-emerald-950/40 rounded-xl border border-emerald-500/40">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-white">Appliance Order Received</h4>
                  <p className="text-xs text-slate-300">
                    Reference: <strong className="font-mono text-amber-400">{submittedInquiryId}</strong>. Philmen sales desk will contact {customerPhone} to finalize delivery.
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
                    Order Another Item
                  </button>
                </div>
              ) : (
                <form onSubmit={handleOrderSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Select Product / Category
                      </label>
                      <select
                        value={productChoice}
                        onChange={e => setProductChoice(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                      >
                        <option value="Samsung 350L Double-Door Inverter Refrigerator">Samsung 350L Inverter Refrigerator (GH₵ 8,500)</option>
                        <option value="Gree 1.5 HP Inverter Split Air Conditioner">Gree 1.5 HP Split Air Conditioner (GH₵ 4,200)</option>
                        <option value="Certified Composite 14.5kg LPG Safety Gas Cylinder">Composite 14.5kg LPG Safety Gas Cylinder (GH₵ 750)</option>
                        <option value="Heavy-Duty Steel 12.5kg Industrial Gas Cylinder">Steel 12.5kg Gas Cylinder (GH₵ 420)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Order Intent
                      </label>
                      <select
                        value={inquiryType}
                        onChange={e => setInquiryType(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                      >
                        <option value="Direct Purchase with Home Delivery">Direct Purchase + Home Delivery</option>
                        <option value="Bulk / Wholesale Pricing Inquiry">Bulk / Corporate Order</option>
                        <option value="Installation & Setup Inquiry">AC Installation & Fitting</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Delivery Location / Town
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Spintex, East Legon, Tema, Kumasi"
                      value={deliveryLocation}
                      onChange={e => setDeliveryLocation(e.target.value)}
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
                        placeholder="e.g. Joyce Mensah"
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
                    <span>Confirm Order Inquiry</span>
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* Appliances Catalog & Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Verified Stock
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-1">
              Electronics, Electricals & Home Appliances
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Genuine brand appliances, cooling systems, and certified safety gas cylinders.
            </p>
          </div>

          {/* Search Input within Electronics & Appliances */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search appliances & cylinders..."
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
            All Products ({electronicsListings.length})
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
              Need Direct Delivery or Bulk Inquiries?
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-display">
              Contact Philmen Electronics & Appliances Desk
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Hours: {contactSettings.customerServiceHours} daily. Direct dispatch, warranty registrations, and doorstep drop-off.
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
