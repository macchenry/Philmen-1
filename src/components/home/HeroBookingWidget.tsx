import React, { useState } from 'react';
import {
  Car,
  HardHat,
  Home,
  Truck,
  Shirt,
  Calendar,
  Clock,
  MapPin,
  Phone,
  User,
  Send,
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  Search,
  ArrowRight,
  Star,
  Check,
  Fuel,
  Shield,
  BadgeCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Listing, PreferredContactMethod } from '../../types';

interface Props {
  onNavigate: (route: string) => void;
  onOpenListing: (listing: Listing) => void;
}

type ServiceTab = 'car-rentals' | 'heavy-equipment' | 'home-rentals' | 'towing' | 'suits';

interface ServicePreviewData {
  title: string;
  badge: string;
  priceDisplay: string;
  image: string;
  features: string[];
  location: string;
  categorySlug: string;
}

const SERVICE_PREVIEWS: Record<ServiceTab, ServicePreviewData> = {
  'car-rentals': {
    title: 'Toyota Land Cruiser Prado VXR',
    badge: 'Chauffeur Executive Fleet',
    priceDisplay: 'GH₵ 1,800 / Day',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80',
    features: ['Vetted English-speaking chauffeur', 'Airport VIP pickup & protocol', 'Full comprehensive insurance', 'In-car Wi-Fi & chilled water'],
    location: 'Airport City, Accra & Nationwide',
    categorySlug: 'car-rentals'
  },
  'heavy-equipment': {
    title: 'CAT 320D Hydraulic Crawler Excavator',
    badge: 'Heavy Plant Mobilization',
    priceDisplay: 'GH₵ 3,200 / Day',
    image: '/src/assets/images/service_heavy_excavator_1790521493704.jpg',
    features: ['20-Ton operating capacity', 'Certified plant operator included', 'Daily on-site maintenance', 'Fast mobilization to any region'],
    location: 'Tema Industrial Area & Nationwide',
    categorySlug: 'construction-and-heavy-equipment'
  },
  'home-rentals': {
    title: 'Luxury 2-Bedroom Serviced Apartment',
    badge: 'Prime Residential Short-let',
    priceDisplay: '$2,500 / Month (GH₵ Equivalent)',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    features: ['24/7 Security & CCTV', 'Swimming pool & private gym', 'Standby automatic generator', 'Italian fitted kitchen & balcony'],
    location: 'East Legon (Near Mensvic), Accra',
    categorySlug: 'home-rentals'
  },
  'towing': {
    title: '24/7 Emergency Hydraulic Flatbed Recovery',
    badge: 'Rapid Response Fleet',
    priceDisplay: 'From GH₵ 650 (Distance-Based)',
    image: 'https://images.unsplash.com/photo-1586191582056-a6c8e3170425?auto=format&fit=crop&w=800&q=80',
    features: ['Zero-degree damage-free slide bed', 'Average 25-40 min arrival in Accra', 'Luxury sedans, 4x4s & vans', 'Intercity recovery corridors'],
    location: 'Greater Accra, Tema & Highways',
    categorySlug: 'towing'
  },
  'suits': {
    title: 'Savile Row Italian Wool 3-Piece Suit',
    badge: 'Bespoke Executive Fitting',
    priceDisplay: 'GH₵ 3,800 – GH₵ 5,500',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
    features: ['Super 150s breathable Italian wool', 'Private home/office measurement', 'Hand-stitched peak lapels', 'Bespoke silk cupro lining'],
    location: 'Airport Residential, Accra',
    categorySlug: 'suits'
  }
};

export const HeroBookingWidget: React.FC<Props> = ({ onNavigate, onOpenListing }) => {
  const { listings, submitInquiry, contactSettings } = useApp();

  const [activeTab, setActiveTab] = useState<ServiceTab>('car-rentals');
  
  // Common Form State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [contactMethod, setContactMethod] = useState<PreferredContactMethod>('Phone');
  
  // 1. Car Rental State
  const [carModel, setCarModel] = useState('Toyota Land Cruiser Prado VXR');
  const [carRentalType, setCarRentalType] = useState('Chauffeur-Driven (Professional Driver)');
  const [pickupLocation, setPickupLocation] = useState('Kotoka International Airport (ACC)');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  
  // 2. Heavy Equipment State
  const [equipmentType, setEquipmentType] = useState('CAT 320D Hydraulic Excavator (20-Ton)');
  const [projectLocation, setProjectLocation] = useState('Tema Industrial / Greater Accra');
  const [operatorRequired, setOperatorRequired] = useState('Yes (Certified Operator Included)');
  const [projectStartDate, setProjectStartDate] = useState('');

  // 3. Home Rental State
  const [homeType, setHomeType] = useState('Luxury 2-Bedroom Furnished Apartment (East Legon)');
  const [homeLocation, setHomeLocation] = useState('East Legon, Accra');
  const [leaseDuration, setLeaseDuration] = useState('Short-let (1–4 Weeks)');
  const [moveInDate, setMoveInDate] = useState('');

  // 4. Towing State
  const [towingService, setTowingService] = useState('Emergency Hydraulic Flatbed Towing');
  const [vehicleMakeModel, setVehicleMakeModel] = useState('');
  const [breakdownLocation, setBreakdownLocation] = useState('');
  const [towingDestination, setTowingDestination] = useState('');

  // 5. Suit Fitting State
  const [suitStyle, setSuitStyle] = useState('Savile Row Italian Wool 3-Piece Bespoke Suit');
  const [fittingType, setFittingType] = useState('Executive Office / Home Measurement Visit');
  const [fittingDate, setFittingDate] = useState('');

  // Submission State
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedInquiryCode, setSubmittedInquiryCode] = useState('');
  const [submittedSummary, setSubmittedSummary] = useState('');

  const currentPreview = SERVICE_PREVIEWS[activeTab];

  // Helper to find matching listing or synthetic listing
  const getAssociatedListing = (): Listing => {
    const categoryNameMap: Record<ServiceTab, string> = {
      'car-rentals': 'Car Rentals',
      'heavy-equipment': 'Construction & Heavy Equipment',
      'home-rentals': 'Home Rentals',
      'towing': 'Towing',
      'suits': 'Suits'
    };

    const targetCat = categoryNameMap[activeTab];
    const found = listings.find(l => l.category === targetCat);
    if (found) return found;

    return {
      id: `PH-${activeTab.toUpperCase().slice(0, 4)}-01`,
      title: currentPreview.title,
      slug: currentPreview.categorySlug,
      type: 'Service',
      category: targetCat,
      shortDescription: currentPreview.badge,
      fullDescription: `Reservation request for ${currentPreview.title}`,
      images: [currentPreview.image],
      price: currentPreview.priceDisplay,
      priceType: 'service',
      priceDisplay: currentPreview.priceDisplay,
      location: currentPreview.location,
      status: 'published',
      featured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) return;

    const targetListing = getAssociatedListing();
    let constructedMessage = '';
    let summaryText = '';
    let preferredSchedule = '';

    if (activeTab === 'car-rentals') {
      constructedMessage = `CAR RENTAL RESERVATION:\n- Vehicle: ${carModel}\n- Option: ${carRentalType}\n- Pickup Location: ${pickupLocation}\n- Pickup Date: ${pickupDate || 'Earliest Available'}\n- Return Date: ${returnDate || 'Flexible'}\n- Client: ${customerName} (${customerPhone})`;
      summaryText = `Car Rental: ${carModel} (${carRentalType})`;
      preferredSchedule = pickupDate ? `Pickup: ${pickupDate} (Return: ${returnDate || 'TBD'})` : 'Earliest Available';
    } else if (activeTab === 'heavy-equipment') {
      constructedMessage = `HEAVY EQUIPMENT HIRE:\n- Machinery: ${equipmentType}\n- Site Location: ${projectLocation}\n- Operator: ${operatorRequired}\n- Start Date: ${projectStartDate || 'Immediate'}\n- Client: ${customerName} (${customerPhone})`;
      summaryText = `Heavy Equipment: ${equipmentType}`;
      preferredSchedule = projectStartDate || 'Immediate Deployment';
    } else if (activeTab === 'home-rentals') {
      constructedMessage = `HOME RENTAL INQUIRY:\n- Property: ${homeType}\n- Preferred Area: ${homeLocation}\n- Term: ${leaseDuration}\n- Target Move-in: ${moveInDate || 'Flexible'}\n- Client: ${customerName} (${customerPhone})`;
      summaryText = `Home Rental: ${homeType}`;
      preferredSchedule = moveInDate ? `Move-in: ${moveInDate} (${leaseDuration})` : leaseDuration;
    } else if (activeTab === 'towing') {
      constructedMessage = `EMERGENCY TOWING DISPATCH:\n- Service: ${towingService}\n- Vehicle: ${vehicleMakeModel || 'Specified upon call'}\n- Breakdown Spot: ${breakdownLocation || 'Location TBD'}\n- Destination: ${towingDestination || 'TBD'}\n- Client: ${customerName} (${customerPhone})`;
      summaryText = `Towing Recovery: ${towingService}`;
      preferredSchedule = 'Urgent / Immediate Dispatch';
    } else if (activeTab === 'suits') {
      constructedMessage = `BESPOKE SUIT FITTING:\n- Style: ${suitStyle}\n- Appointment: ${fittingType}\n- Preferred Date: ${fittingDate || 'Flexible'}\n- Client: ${customerName} (${customerPhone})`;
      summaryText = `Suit Fitting: ${suitStyle}`;
      preferredSchedule = fittingDate || 'Flexible Fitting Schedule';
    }

    const createdInquiry = submitInquiry({
      customerName,
      customerPhone,
      customerEmail: customerEmail || 'N/A',
      contactMethod,
      preferredDateTime: preferredSchedule,
      message: constructedMessage,
      listing: targetListing
    });

    setSubmittedInquiryCode(createdInquiry.id);
    setSubmittedSummary(summaryText);
    setIsSubmitted(true);
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setCustomerName('');
    setCustomerPhone('');
    setCustomerEmail('');
    setPickupDate('');
    setReturnDate('');
    setProjectStartDate('');
    setMoveInDate('');
    setFittingDate('');
  };

  return (
    <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-700/70 shadow-2xl overflow-hidden text-white">
      
      {/* Tab Selector Bar */}
      <div className="p-3 sm:p-4 bg-slate-950/70 border-b border-slate-800">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
          
          {/* TAB 1: CAR RENTALS (PREDOMINANT / PRIMARY) */}
          <button
            type="button"
            onClick={() => setActiveTab('car-rentals')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 shrink-0 cursor-pointer ${
              activeTab === 'car-rentals'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 ring-1 ring-amber-400'
                : 'bg-amber-500/15 text-amber-300 hover:bg-amber-500/25 border border-amber-500/30'
            }`}
          >
            <Car className="w-4 h-4" />
            <span className="tracking-wide">Car Rentals</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-sm font-extrabold uppercase ${
              activeTab === 'car-rentals' ? 'bg-slate-950 text-amber-400' : 'bg-amber-400 text-slate-950'
            }`}>
              Primary Fleet
            </span>
          </button>

          {/* TAB 2: HEAVY EQUIPMENT */}
          <button
            type="button"
            onClick={() => setActiveTab('heavy-equipment')}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === 'heavy-equipment'
                ? 'bg-white text-slate-950 font-bold shadow-md'
                : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700/80 border border-slate-700/60'
            }`}
          >
            <HardHat className="w-3.5 h-3.5" />
            <span>Heavy Machinery</span>
          </button>

          {/* TAB 3: HOME RENTALS */}
          <button
            type="button"
            onClick={() => setActiveTab('home-rentals')}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === 'home-rentals'
                ? 'bg-white text-slate-950 font-bold shadow-md'
                : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700/80 border border-slate-700/60'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home Rentals</span>
          </button>

          {/* TAB 4: 24/7 TOWING */}
          <button
            type="button"
            onClick={() => setActiveTab('towing')}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === 'towing'
                ? 'bg-white text-slate-950 font-bold shadow-md'
                : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700/80 border border-slate-700/60'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>24/7 Towing</span>
          </button>

          {/* TAB 5: SUITS */}
          <button
            type="button"
            onClick={() => setActiveTab('suits')}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === 'suits'
                ? 'bg-white text-slate-950 font-bold shadow-md'
                : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700/80 border border-slate-700/60'
            }`}
          >
            <Shirt className="w-3.5 h-3.5" />
            <span>Bespoke Suits</span>
          </button>

        </div>
      </div>

      {/* Main Split Grid: Booking Fields (7 cols) + Showcase Card (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
        
        {/* Left Form Area */}
        <div className="lg:col-span-7 p-5 sm:p-7">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Reservation Dispatched
                </span>
                <h4 className="text-xl font-bold text-white font-display">
                  Philmen Received Your Booking
                </h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  Reference: <strong className="font-mono text-amber-400">{submittedInquiryCode}</strong>. Our team will reach you via {contactMethod} at <strong className="text-white">{customerPhone}</strong>.
                </p>
              </div>

              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-300 max-w-sm mx-auto text-left space-y-1">
                <div className="text-slate-400 font-medium">Selected Service:</div>
                <div className="font-bold text-white">{submittedSummary}</div>
                <div className="text-[11px] text-slate-400 pt-1">
                  Sent to: <span className="text-amber-300 font-mono">{contactSettings.notificationEmail}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 justify-center pt-2 max-w-sm mx-auto">
                <a
                  href={`https://wa.me/233${contactSettings.publicWhatsApp.replace(/^0/, '')}?text=${encodeURIComponent(
                    `Hello Philmen, I just submitted booking ${submittedInquiryCode} for ${submittedSummary}. Please confirm.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Desk ({contactSettings.publicWhatsApp})</span>
                </a>

                <button
                  type="button"
                  onClick={handleResetForm}
                  className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Make Another Request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              
              {/* Dynamic Service Configuration Fields */}
              {activeTab === 'car-rentals' && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Select Vehicle Model
                      </label>
                      <select
                        value={carModel}
                        onChange={e => setCarModel(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                      >
                        <option value="Toyota Land Cruiser Prado VXR">Toyota Land Cruiser Prado VXR (VIP 4x4)</option>
                        <option value="Toyota Land Cruiser V8 300 Series">Toyota Land Cruiser V8 300 Series (Executive)</option>
                        <option value="Toyota Camry Executive Sedan">Toyota Camry Executive Sedan</option>
                        <option value="Mercedes-Benz E-Class VIP">Mercedes-Benz E-Class VIP</option>
                        <option value="Toyota Hilux 4x4 Double Cabin">Toyota Hilux 4x4 Double Cabin (Project)</option>
                        <option value="Toyota Coaster 30-Seater Bus">Toyota Coaster 30-Seater Executive Bus</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Chauffeur / Driver Preference
                      </label>
                      <select
                        value={carRentalType}
                        onChange={e => setCarRentalType(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                      >
                        <option value="Chauffeur-Driven (Professional Driver)">Chauffeur-Driven (Vetted Professional Driver)</option>
                        <option value="Self-Drive (Security Terms Apply)">Self-Drive (Security Verification Required)</option>
                        <option value="Airport VIP Protocol Transfer">Airport VIP Pickup & Protocol Transfer</option>
                        <option value="Corporate Monthly Lease">Corporate Long-Term Lease</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Pickup Location
                      </label>
                      <div className="relative">
                        <MapPin className="w-3.5 h-3.5 text-amber-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Airport / East Legon..."
                          value={pickupLocation}
                          onChange={e => setPickupLocation(e.target.value)}
                          className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Pickup Date / Time
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Tomorrow 8:00 AM"
                        value={pickupDate}
                        onChange={e => setPickupDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Return Date / Duration
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 3 Days"
                        value={returnDate}
                        onChange={e => setReturnDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'heavy-equipment' && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Machinery Type
                      </label>
                      <select
                        value={equipmentType}
                        onChange={e => setEquipmentType(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                      >
                        <option value="CAT 320D Hydraulic Excavator (20-Ton)">CAT 320D Hydraulic Excavator (20-Ton)</option>
                        <option value="CAT 950H Heavy Wheel Loader">CAT 950H Heavy Wheel Loader</option>
                        <option value="JCB 3CX Backhoe Loader">JCB 3CX Backhoe Loader</option>
                        <option value="50-Ton Mobile All-Terrain Crane">50-Ton Mobile All-Terrain Crane</option>
                        <option value="12-Ton Vibratory Soil Compactor">12-Ton Vibratory Soil Compactor</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Site Location
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Tema Industrial / Takoradi..."
                        value={projectLocation}
                        onChange={e => setProjectLocation(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Operator
                      </label>
                      <select
                        value={operatorRequired}
                        onChange={e => setOperatorRequired(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                      >
                        <option value="Yes (Certified Operator Included)">Yes (Certified Operator Included)</option>
                        <option value="Dry Lease (Client Supplies Operator)">Dry Lease (No Operator)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Project Start Date
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Next Monday / Immediate"
                        value={projectStartDate}
                        onChange={e => setProjectStartDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'home-rentals' && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Property Type
                      </label>
                      <select
                        value={homeType}
                        onChange={e => setHomeType(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                      >
                        <option value="Luxury 2-Bedroom Furnished Apartment (East Legon)">Luxury 2-Bedroom Furnished Apartment</option>
                        <option value="3-Bedroom Gated Community Townhouse">3-Bedroom Gated Community Townhouse</option>
                        <option value="Executive 1-Bedroom Serviced Short-let">Executive 1-Bedroom Serviced Short-let</option>
                        <option value="4-Bedroom Standalone House with Pool">4-Bedroom Standalone House with Pool</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Target Area
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. East Legon, Cantonments..."
                        value={homeLocation}
                        onChange={e => setHomeLocation(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Target Move-in Date
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 1st of next month / Immediate"
                        value={moveInDate}
                        onChange={e => setMoveInDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Lease Term
                      </label>
                      <select
                        value={leaseDuration}
                        onChange={e => setLeaseDuration(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                      >
                        <option value="Short-let (1–4 Weeks)">Short-let (1–4 Weeks)</option>
                        <option value="Medium-term (3–6 Months)">Medium-term (3–6 Months)</option>
                        <option value="1 Year Standard Lease">1 Year Standard Lease</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'towing' && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Towing Service
                      </label>
                      <select
                        value={towingService}
                        onChange={e => setTowingService(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                      >
                        <option value="Emergency Hydraulic Flatbed Towing">Emergency Hydraulic Flatbed Towing</option>
                        <option value="Heavy-Duty Commercial Truck Recovery">Heavy-Duty Commercial Truck Recovery</option>
                        <option value="Intercity Vehicle Transport">Intercity Vehicle Transport</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Vehicle Make & Model
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Mercedes Benz C300"
                        value={vehicleMakeModel}
                        onChange={e => setVehicleMakeModel(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Current Breakdown Location
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tema Motorway / Spintex Rd"
                        value={breakdownLocation}
                        onChange={e => setBreakdownLocation(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Destination Garage / Home
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Workshop in Kokomlemle"
                        value={towingDestination}
                        onChange={e => setTowingDestination(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'suits' && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Suit Style
                      </label>
                      <select
                        value={suitStyle}
                        onChange={e => setSuitStyle(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                      >
                        <option value="Savile Row Italian Wool 3-Piece Bespoke Suit">Savile Row Italian Wool 3-Piece Bespoke</option>
                        <option value="Executive Corporate 2-Piece Suit">Executive Corporate 2-Piece Suit</option>
                        <option value="Luxury Black-Tie Wedding Tuxedo">Luxury Black-Tie Wedding Tuxedo</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Fitting Location
                      </label>
                      <select
                        value={fittingType}
                        onChange={e => setFittingType(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                      >
                        <option value="Executive Office / Home Measurement Visit">Executive Office / Home Measurement Visit</option>
                        <option value="Philmen Partner Tailoring Studio">Philmen Partner Tailoring Studio</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Preferred Date & Time for Fitting
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. This Friday afternoon at 3:00 PM"
                      value={fittingDate}
                      onChange={e => setFittingDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              )}

              {/* Universal Customer Contact Row */}
              <div className="pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Your Full Name <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nana Kwame"
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Phone Number <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0244123456"
                      value={customerPhone}
                      onChange={e => setCustomerPhone(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Contact Method
                  </label>
                  <select
                    value={contactMethod}
                    onChange={e => setContactMethod(e.target.value as PreferredContactMethod)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                  >
                    <option value="Phone">Phone Call ({contactSettings.publicPhone})</option>
                    <option value="WhatsApp">WhatsApp ({contactSettings.publicWhatsApp})</option>
                    <option value="Email">Email</option>
                  </select>
                </div>
              </div>

              {/* Submit & Guarantee */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Facilitated directly by Philmen desk. No account needed.</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-extrabold tracking-wide uppercase shadow-lg shadow-amber-500/20 transition-all inline-flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    {activeTab === 'car-rentals' ? 'Reserve Car Rental' : 'Submit Reservation'}
                  </span>
                </button>
              </div>

            </form>
          )}
        </div>

        {/* Right Showcase Card (Dynamic per Active Service Tab) */}
        <div className="lg:col-span-5 bg-slate-950/60 p-5 sm:p-6 flex flex-col justify-between space-y-4">
          
          <div className="space-y-3">
            {/* Visual Thumbnail Frame */}
            <div className="relative aspect-16/10 rounded-2xl overflow-hidden border border-slate-800 shadow-md group">
              <img
                src={currentPreview.image}
                alt={currentPreview.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              
              <div className="absolute top-2.5 left-2.5">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-amber-400 text-slate-950 shadow-sm">
                  {currentPreview.badge}
                </span>
              </div>

              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-end justify-between">
                <div>
                  <div className="text-[11px] text-slate-300 font-medium">Starting Rate:</div>
                  <div className="text-base font-extrabold text-white tabular-nums">
                    {currentPreview.priceDisplay}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate(`category:${currentPreview.categorySlug}`)}
                  className="px-2.5 py-1 bg-white/90 hover:bg-white text-slate-950 text-[11px] font-bold rounded-lg shadow-sm inline-flex items-center gap-1 transition-colors"
                >
                  <span>Explore Catalog</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Title & Location */}
            <div>
              <h4 className="text-sm font-bold text-white font-display line-clamp-1">
                {currentPreview.title}
              </h4>
              <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                <span>{currentPreview.location}</span>
              </div>
            </div>

            {/* Key Inclusions / Checklist */}
            <div className="space-y-1.5 pt-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Included in Philmen Facilitation:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-slate-300">
                {currentPreview.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Direct Desk Connect */}
          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs">
            <div className="text-slate-400 text-[11px]">
              Need immediate assistance?
            </div>
            <div className="flex items-center gap-2">
              <a
                href={`tel:${contactSettings.publicPhone}`}
                className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-mono font-semibold text-[11px] inline-flex items-center gap-1"
                title="Call Philmen"
              >
                <Phone className="w-3 h-3 text-amber-400" />
                <span>{contactSettings.publicPhone}</span>
              </a>
              <a
                href={`https://wa.me/233${contactSettings.publicWhatsApp.replace(/^0/, '')}`}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-mono font-semibold text-[11px] inline-flex items-center gap-1"
                title="WhatsApp Philmen"
              >
                <MessageSquare className="w-3 h-3" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
