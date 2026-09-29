import React, { useState } from 'react';
import {
  Car,
  Key,
  Tv,
  MapPin,
  Phone,
  User,
  Send,
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
  ArrowRight,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Listing, PreferredContactMethod } from '../../types';

interface Props {
  onNavigate: (route: string) => void;
  onOpenListing: (listing: Listing) => void;
}

type ServiceTab = 'car-rental' | 'car-sales' | 'electronics-appliances';

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
  'car-rental': {
    title: 'Toyota Land Cruiser Prado VXR',
    badge: 'Chauffeur Executive Fleet',
    priceDisplay: 'GH₵ 1,800 / Day',
    image: 'https://i.ibb.co/fzY197WN/006-Toyota-Corolla-LE-2022.jpg',
    features: ['Vetted English-speaking chauffeur', 'Airport VIP pickup & protocol', 'Full comprehensive insurance', 'In-car Wi-Fi & chilled water'],
    location: 'Airport City, Accra & Nationwide',
    categorySlug: 'car-rental'
  },
  'car-sales': {
    title: 'Toyota Corolla LE 2022 (Foreign Used)',
    badge: 'Vetted Quality Inventory',
    priceDisplay: 'GH₵ 215,000',
    image: 'https://i.ibb.co/9mYCqMbD/005-Land-for-Development.jpg',
    features: ['Direct foreign-used clean title', 'Pre-inspection report available', 'Duty fully paid with documents', 'Physical viewing & test drive'],
    location: 'Achimota Mile 7, Accra',
    categorySlug: 'car-sales'
  },
  'electronics-appliances': {
    title: 'Samsung 535L Inverter Double Door Refrigerator',
    badge: 'Genuine Home Appliances',
    priceDisplay: 'GH₵ 8,500',
    image: 'https://i.ibb.co/TqWh7mdB/001-Samsung-Double-Fridge.jpg',
    features: ['Digital Inverter 10-Year Warranty', 'Multi-airflow frost-free cooling', 'Fast delivery across Greater Accra', 'ACs & gas cylinders also available'],
    location: 'Spintex Road, Accra',
    categorySlug: 'electronics-electricals-and-home-appliances'
  }
};

export const HeroBookingWidget: React.FC<Props> = ({ onNavigate, onOpenListing }) => {
  const { listings, submitInquiry, contactSettings } = useApp();

  const [activeTab, setActiveTab] = useState<ServiceTab>('car-rental');
  
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
  
  // 2. Car Sales State
  const [saleVehicleType, setSaleVehicleType] = useState('Toyota Corolla LE 2022 (Foreign Used)');
  const [purchasePreference, setPurchasePreference] = useState('Physical Viewing & Test Drive');
  const [preferredInspectionDate, setPreferredInspectionDate] = useState('');

  // 3. Electronics & Appliances State
  const [applianceItem, setApplianceItem] = useState('Samsung 535L Inverter Double Door Refrigerator');
  const [deliveryArea, setDeliveryArea] = useState('Accra / Tema');
  const [orderQuantity, setOrderQuantity] = useState('1 Unit');

  // Submission State
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedInquiryCode, setSubmittedInquiryCode] = useState('');
  const [submittedSummary, setSubmittedSummary] = useState('');

  const currentPreview = SERVICE_PREVIEWS[activeTab];

  // Helper to find matching listing or synthetic listing
  const getAssociatedListing = (): Listing => {
    const categoryNameMap: Record<ServiceTab, string> = {
      'car-rental': 'Car Rental',
      'car-sales': 'Car Sales',
      'electronics-appliances': 'Electronics, Electricals & Home Appliances'
    };

    const targetCat = categoryNameMap[activeTab];
    const found = listings.find(l => l.category === targetCat);
    if (found) return found;

    return {
      id: `PH-${activeTab.toUpperCase().slice(0, 4)}-01`,
      title: currentPreview.title,
      slug: currentPreview.categorySlug,
      type: activeTab === 'car-rental' ? 'Service' : 'Product',
      category: targetCat,
      shortDescription: currentPreview.badge,
      fullDescription: `Reservation request for ${currentPreview.title}`,
      images: [currentPreview.image],
      price: currentPreview.priceDisplay,
      priceType: activeTab === 'car-rental' ? 'rental' : 'exact',
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

    if (activeTab === 'car-rental') {
      constructedMessage = `CAR RENTAL RESERVATION:\n- Vehicle: ${carModel}\n- Option: ${carRentalType}\n- Pickup Location: ${pickupLocation}\n- Pickup Date: ${pickupDate || 'Earliest Available'}\n- Return Date: ${returnDate || 'Flexible'}\n- Client: ${customerName} (${customerPhone})`;
      summaryText = `Car Rental: ${carModel} (${carRentalType})`;
      preferredSchedule = pickupDate ? `Pickup: ${pickupDate} (Return: ${returnDate || 'TBD'})` : 'Earliest Available';
    } else if (activeTab === 'car-sales') {
      constructedMessage = `CAR SALES / INSPECTION INQUIRY:\n- Vehicle: ${saleVehicleType}\n- Action: ${purchasePreference}\n- Inspection Date: ${preferredInspectionDate || 'Flexible Schedule'}\n- Client: ${customerName} (${customerPhone})`;
      summaryText = `Car Sales: ${saleVehicleType}`;
      preferredSchedule = preferredInspectionDate || 'Inspection to be confirmed';
    } else if (activeTab === 'electronics-appliances') {
      constructedMessage = `ELECTRONICS & APPLIANCES INQUIRY:\n- Item: ${applianceItem}\n- Quantity: ${orderQuantity}\n- Delivery Area: ${deliveryArea}\n- Client: ${customerName} (${customerPhone})`;
      summaryText = `Appliances: ${applianceItem}`;
      preferredSchedule = 'Standard Delivery';
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
    setPreferredInspectionDate('');
  };

  return (
    <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-slate-700/70 shadow-2xl overflow-hidden text-white w-full">
      
      {/* Tab Selector Bar */}
      <div className="p-2.5 sm:p-4 bg-slate-950/70 border-b border-slate-800">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          
          {/* TAB 1: CAR RENTAL */}
          <button
            type="button"
            onClick={() => setActiveTab('car-rental')}
            className={`px-3 sm:px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between gap-2 cursor-pointer ${
              activeTab === 'car-rental'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 ring-1 ring-amber-400'
                : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700/80 border border-slate-700/60'
            }`}
          >
            <div className="flex items-center gap-2 truncate">
              <Key className="w-4 h-4 shrink-0" />
              <span className="tracking-wide truncate">Car Rental</span>
            </div>
            <span className={`text-[9px] px-1.5 py-0.5 rounded font-extrabold uppercase shrink-0 ${
              activeTab === 'car-rental' ? 'bg-slate-950 text-amber-400' : 'bg-amber-400/20 text-amber-300'
            }`}>
              Chauffeur & Fleet
            </span>
          </button>

          {/* TAB 2: CAR SALES */}
          <button
            type="button"
            onClick={() => setActiveTab('car-sales')}
            className={`px-3 sm:px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between gap-2 cursor-pointer ${
              activeTab === 'car-sales'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 ring-1 ring-amber-400'
                : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700/80 border border-slate-700/60'
            }`}
          >
            <div className="flex items-center gap-2 truncate">
              <Car className="w-4 h-4 shrink-0" />
              <span className="tracking-wide truncate">Car Sales</span>
            </div>
            <span className={`text-[9px] px-1.5 py-0.5 rounded font-extrabold uppercase shrink-0 ${
              activeTab === 'car-sales' ? 'bg-slate-950 text-amber-400' : 'bg-amber-400/20 text-amber-300'
            }`}>
              Foreign-Used & New
            </span>
          </button>

          {/* TAB 3: ELECTRONICS & APPLIANCES */}
          <button
            type="button"
            onClick={() => setActiveTab('electronics-appliances')}
            className={`px-3 sm:px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between gap-2 cursor-pointer ${
              activeTab === 'electronics-appliances'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 ring-1 ring-amber-400'
                : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700/80 border border-slate-700/60'
            }`}
          >
            <div className="flex items-center gap-2 truncate">
              <Tv className="w-4 h-4 shrink-0" />
              <span className="tracking-wide truncate">Electronics & Appliances</span>
            </div>
            <span className={`text-[9px] px-1.5 py-0.5 rounded font-extrabold uppercase shrink-0 ${
              activeTab === 'electronics-appliances' ? 'bg-slate-950 text-amber-400' : 'bg-amber-400/20 text-amber-300'
            }`}>
              Fridges & ACs
            </span>
          </button>

        </div>
      </div>

      {/* Main Split Grid: Form (7 cols) + Showcase Card (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
        
        {/* Left Form Area */}
        <div className="lg:col-span-7 p-4 sm:p-7">
          {isSubmitted ? (
            <div className="py-6 sm:py-8 text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] sm:text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Request Dispatched
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-white font-display">
                  Philmen Received Your Request
                </h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  Reference: <strong className="font-mono text-amber-400">{submittedInquiryCode}</strong>. Our team will reach you via {contactMethod} at <strong className="text-white">{customerPhone}</strong>.
                </p>
              </div>

              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-300 max-w-sm mx-auto text-left space-y-1">
                <div className="text-slate-400 font-medium">Selected Item / Service:</div>
                <div className="font-bold text-white truncate">{submittedSummary}</div>
                <div className="text-[11px] text-slate-400 pt-1">
                  Sent to: <span className="text-amber-300 font-mono break-all">{contactSettings.notificationEmail}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 justify-center pt-2 max-w-sm mx-auto">
                <a
                  href={`https://wa.me/233${contactSettings.publicWhatsApp.replace(/^0/, '')}?text=${encodeURIComponent(
                    `Hello Philmen, I just submitted request ${submittedInquiryCode} for ${submittedSummary}. Please confirm.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Desk</span>
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
              {activeTab === 'car-rental' && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="min-w-0">
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Select Rental Vehicle
                      </label>
                      <select
                        value={carModel}
                        onChange={e => setCarModel(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                      >
                        <option value="Toyota Land Cruiser Prado VXR">Toyota Land Cruiser Prado VXR (Executive 4x4)</option>
                        <option value="Toyota Land Cruiser">Toyota Land Cruiser V8</option>
                        <option value="Toyota Camry Executive Sedan">Toyota Camry Executive Sedan</option>
                        <option value="Executive Airport VIP Van">Executive Airport VIP Van</option>
                      </select>
                    </div>

                    <div className="min-w-0">
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Chauffeur Preference
                      </label>
                      <select
                        value={carRentalType}
                        onChange={e => setCarRentalType(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                      >
                        <option value="Chauffeur-Driven (Professional Driver)">Chauffeur-Driven (Professional Driver)</option>
                        <option value="Airport VIP Protocol Transfer">Airport VIP Protocol Transfer</option>
                        <option value="Corporate Monthly Lease">Corporate Monthly Lease</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="min-w-0">
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

                    <div className="min-w-0">
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

                    <div className="min-w-0">
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Rental Duration
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 3 Days / 1 Week"
                        value={returnDate}
                        onChange={e => setReturnDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'car-sales' && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="min-w-0">
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Vehicle For Sale
                      </label>
                      <select
                        value={saleVehicleType}
                        onChange={e => setSaleVehicleType(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                      >
                        <option value="Toyota Corolla LE 2022 (Foreign Used)">Toyota Corolla LE 2022 (Foreign Used)</option>
                        <option value="Toyota Land Cruiser Prado / SUVs">Toyota Land Cruiser / Luxury SUV</option>
                        <option value="Custom Vehicle Request">Custom Model Sourcing / Inquiry</option>
                      </select>
                    </div>

                    <div className="min-w-0">
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Inquiry Purpose
                      </label>
                      <select
                        value={purchasePreference}
                        onChange={e => setPurchasePreference(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                      >
                        <option value="Physical Viewing & Test Drive">Physical Viewing & Test Drive</option>
                        <option value="Price Negotiation & Outright Purchase">Price Negotiation & Outright Purchase</option>
                        <option value="Documentation & Duty Verification">Documentation & Duty Verification</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Preferred Viewing Date & Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Saturday afternoon at Achimota Mile 7"
                      value={preferredInspectionDate}
                      onChange={e => setPreferredInspectionDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'electronics-appliances' && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="min-w-0">
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Product / Appliance
                      </label>
                      <select
                        value={applianceItem}
                        onChange={e => setApplianceItem(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                      >
                        <option value="Samsung 535L Inverter Double Door Refrigerator">Samsung 535L Double Door Refrigerator</option>
                        <option value="Gree 2.0 HP R32 Eco Inverter Split Air Conditioner">Gree 2.0 HP Split Air Conditioner</option>
                        <option value="Certified 14.5kg Composite Safety Gas Cylinder">Certified 14.5kg Composite Gas Cylinder</option>
                        <option value="24.5kg Anti-Explosion Translucent Composite Cylinder">24.5kg Translucent Composite Cylinder</option>
                        <option value="50kg Heavy-Duty Industrial Steel LPG Gas Cylinder">50kg Industrial Steel Gas Cylinder</option>
                        <option value="6kg Compact Domestic Steel Gas Cylinder with Burner">6kg Compact Steel Gas Cylinder</option>
                      </select>
                    </div>

                    <div className="min-w-0">
                      <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                        Quantity Required
                      </label>
                      <select
                        value={orderQuantity}
                        onChange={e => setOrderQuantity(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                      >
                        <option value="1 Unit">1 Unit</option>
                        <option value="2 - 5 Units">2 - 5 Units</option>
                        <option value="Bulk Commercial Supply">Bulk Commercial Supply</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Delivery Address / Region in Ghana
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Spintex / East Legon / Kumasi"
                      value={deliveryArea}
                      onChange={e => setDeliveryArea(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              )}

              {/* Universal Customer Contact Row */}
              <div className="pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="min-w-0">
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

                <div className="min-w-0">
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

                <div className="min-w-0">
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
                <div className="text-[11px] text-slate-400 flex items-center gap-1.5 text-center sm:text-left">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Facilitated directly by Philmen desk. No account needed.</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 sm:px-7 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-extrabold tracking-wide uppercase shadow-lg shadow-amber-500/20 transition-all inline-flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Inquiry</span>
                </button>
              </div>

            </form>
          )}
        </div>

        {/* Right Showcase Card */}
        <div className="lg:col-span-5 bg-slate-950/60 p-4 sm:p-6 flex flex-col justify-between space-y-4">
          
          <div className="space-y-3">
            {/* Visual Thumbnail Frame */}
            <div className="relative aspect-16/10 rounded-2xl overflow-hidden border border-slate-800 shadow-md group">
              <img
                src={currentPreview.image}
                alt={currentPreview.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              
              <div className="absolute top-2.5 left-2.5">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-amber-400 text-slate-950 shadow-sm">
                  {currentPreview.badge}
                </span>
              </div>

              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-end justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-[10px] sm:text-[11px] text-slate-300 font-medium">Rate / Price:</div>
                  <div className="text-sm sm:text-base font-extrabold text-white tabular-nums truncate">
                    {currentPreview.priceDisplay}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate(`category:${currentPreview.categorySlug}`)}
                  className="px-2.5 py-1 bg-white/90 hover:bg-white text-slate-950 text-[10px] sm:text-[11px] font-bold rounded-lg shadow-sm inline-flex items-center gap-1 transition-colors shrink-0 cursor-pointer"
                >
                  <span>Explore</span>
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
                <span className="truncate">{currentPreview.location}</span>
              </div>
            </div>

            {/* Key Inclusions / Checklist */}
            <div className="space-y-1.5 pt-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Included in Philmen Facilitation:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-slate-300">
                {currentPreview.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 min-w-0">
                    <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Direct Desk Connect */}
          <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="text-slate-400 text-[11px]">Direct Desk:</span>
            <div className="flex items-center gap-3">
              <a
                href={`tel:${contactSettings.publicPhone}`}
                className="font-bold text-white hover:text-amber-400 inline-flex items-center gap-1 font-mono text-[11px]"
              >
                <Phone className="w-3 h-3 text-amber-400" />
                <span>{contactSettings.publicPhone}</span>
              </a>
              <span className="text-slate-600">·</span>
              <a
                href={`https://wa.me/233${contactSettings.publicWhatsApp.replace(/^0/, '')}`}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 font-mono text-[11px]"
              >
                <MessageSquare className="w-3 h-3" />
                <span>{contactSettings.publicWhatsApp}</span>
              </a>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
