import React, { useState } from 'react';
import {
  ArrowLeft,
  Phone,
  MessageSquare,
  Calendar,
  MapPin,
  ShieldCheck,
  Check,
  Clock,
  Share2,
  Tag,
  Info,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Listing } from '../types';
import { useApp } from '../context/AppContext';
import { ListingCard } from '../components/common/ListingCard';

interface Props {
  listing: Listing;
  onBack: () => void;
  onNavigateCategory: (categoryName: string) => void;
  onSelectListing: (listing: Listing) => void;
  onCall: (listing: Listing) => void;
  onWhatsApp: (listing: Listing) => void;
  onBook: (listing: Listing) => void;
}

export const ListingDetailPage: React.FC<Props> = ({
  listing,
  onBack,
  onNavigateCategory,
  onSelectListing,
  onCall,
  onWhatsApp,
  onBook
}) => {
  const { listings, contactSettings } = useApp();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  // Related listings in same category (excluding current)
  const relatedListings = listings
    .filter(item => item.status === 'published' && item.category === listing.category && item.id !== listing.id)
    .slice(0, 4);

  const listingUrl = `https://${contactSettings.website}/listing/${listing.slug}`;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href || listingUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 sm:space-y-12 overflow-x-hidden">
      
      {/* Breadcrumb Navigation */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs text-slate-500">
        <button
          onClick={onBack}
          className="hover:text-slate-900 font-medium inline-flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </button>
        <span>/</span>
        <button
          onClick={() => onNavigateCategory(listing.category)}
          className="hover:text-amber-600 font-medium cursor-pointer truncate max-w-[150px]"
        >
          {listing.category}
        </button>
        {listing.subcategory && (
          <>
            <span>/</span>
            <span className="text-slate-600 truncate max-w-[120px]">{listing.subcategory}</span>
          </>
        )}
        <span>/</span>
        <span className="font-semibold text-slate-900 truncate max-w-[180px] sm:max-w-[240px]">{listing.title}</span>
      </div>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10">
        
        {/* Left Column: Image Gallery (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-4/3 sm:aspect-16/10 rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
            <img
              src={listing.images[selectedImageIndex] || listing.images[0]}
              alt={listing.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-all duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://i.ibb.co/fzY197WN/006-Toyota-Corolla-LE-2022.jpg';
              }}
            />

            {/* Type & Featured Tag */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 bg-white/95 backdrop-blur-xs text-slate-900 text-xs font-bold rounded-lg shadow-sm">
                {listing.type}
              </span>
              {listing.featured && (
                <span className="px-3 py-1 bg-amber-400 text-slate-950 text-xs font-bold rounded-lg shadow-sm">
                  Featured
                </span>
              )}
            </div>

            {/* Reference ID Pill */}
            <div className="absolute top-4 right-4">
              <span className="px-2.5 py-1 bg-slate-950/75 backdrop-blur-xs text-white text-xs font-mono rounded-lg shadow-sm">
                {listing.id}
              </span>
            </div>
          </div>

          {/* Thumbnails Row if multiple images */}
          {listing.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {listing.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    selectedImageIndex === idx ? 'border-amber-600 ring-2 ring-amber-500/20' : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${listing.title} thumbnail ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Facilitation Guarantee Card */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 text-xs text-amber-950 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-900">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Philmen Direct Facilitation & Inspection Guarantee</span>
            </div>
            <p className="leading-relaxed text-amber-900/80">
              This {listing.type.toLowerCase()} is listed and facilitated through Philmen. When you inquire, call, or book, Philmen customer service coordinates physical inspection, authenticity verification, price negotiation, and delivery or service fulfillment on your behalf.
            </p>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase / Contact Module (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Metadata & Title */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-amber-700">{listing.category}</span>
                {listing.subcategory && (
                  <>
                    <span>·</span>
                    <span>{listing.subcategory}</span>
                  </>
                )}
              </div>

              {/* Share button */}
              <button
                onClick={handleShare}
                className="text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 text-xs cursor-pointer"
                title="Copy listing link"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </>
                )}
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display leading-snug">
              {listing.title}
            </h1>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="font-medium">{listing.location}</span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <div className="text-xs text-slate-500 font-medium">Pricing / Terms:</div>
            <div className="text-3xl font-extrabold text-slate-950 font-display tabular-nums tracking-tight">
              {listing.priceDisplay}
            </div>
            <div className="text-[11px] text-slate-500">
              {listing.priceType === 'negotiable' && 'Price is open for reasonable negotiation upon inspection.'}
              {listing.priceType === 'contact' && 'Contact Philmen directly for latest quote and availability.'}
              {listing.priceType === 'rental' && 'Rental rates subject to lease duration and terms.'}
              {listing.priceType === 'service' && 'Service fee varies with project scope and site distance.'}
              {listing.priceType === 'exact' && 'Standard official rate. Contact for payment and delivery schedule.'}
            </div>
          </div>

          {/* Primary Action Buttons: Call, WhatsApp, Book */}
          <div className="space-y-3 pt-2">
            
            {/* Book / Request Information Primary Button */}
            <button
              onClick={() => onBook(listing)}
              className="w-full py-3.5 px-6 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book / Request Information</span>
            </button>

            {/* 2-Col Quick Contact Grid */}
            <div className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-2.5 sm:gap-3">
              {/* Call Philmen Button */}
              <button
                onClick={() => onCall(listing)}
                className="py-3 px-3 sm:px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 sm:gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Call {contactSettings.publicPhone}</span>
              </button>

              {/* WhatsApp Philmen Button */}
              <button
                onClick={() => onWhatsApp(listing)}
                className="py-3 px-3 sm:px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 sm:gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>WhatsApp Philmen</span>
              </button>
            </div>

            <div className="text-center text-[11px] text-slate-500 pt-1">
              Customer Service Hours: <strong className="text-slate-700">{contactSettings.customerServiceHours}</strong>
            </div>
          </div>

          {/* Quick Specifications Table */}
          {listing.specifications && Object.keys(listing.specifications).length > 0 && (
            <div className="border-t border-slate-200 pt-5 space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Key Specifications
              </h3>
              <div className="divide-y divide-slate-100 text-xs">
                {Object.entries(listing.specifications).map(([key, val]) => (
                  <div key={key} className="py-2 flex justify-between gap-4">
                    <span className="text-slate-500">{key}</span>
                    <span className="font-semibold text-slate-900 text-right">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Description and In-Depth Information */}
      <div className="border-t border-slate-200 pt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Full Prose Description (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <h2 className="text-xl font-bold text-slate-900 font-display">
            About this {listing.type}
          </h2>
          <div className="prose prose-slate max-w-none text-sm text-slate-700 leading-relaxed space-y-4">
            <p className="font-medium text-slate-900 text-base">
              {listing.shortDescription}
            </p>
            <p className="whitespace-pre-line leading-relaxed">
              {listing.fullDescription}
            </p>
          </div>
        </div>

        {/* Facilitation Journey (4 cols) */}
        <div className="lg:col-span-4 bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4 h-fit">
          <h3 className="text-sm font-bold text-slate-900 font-display">
            Customer Journey For This Listing
          </h3>
          <ul className="space-y-3 text-xs text-slate-600">
            <li className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                1
              </div>
              <div>
                <strong className="text-slate-900">Inquiry Received:</strong> Philmen staff records your inquiry with ID <span className="font-mono text-amber-700">{listing.id}</span>.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                2
              </div>
              <div>
                <strong className="text-slate-900">Philmen Coordination:</strong> We verify inventory status, schedule site inspection, or prepare service crew.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                3
              </div>
              <div>
                <strong className="text-slate-900">Safe Handover / Fulfillment:</strong> Direct delivery, key collection, or machine deployment with Philmen accountability.
              </div>
            </li>
          </ul>
        </div>

      </div>

      {/* Related Listings Carousel / Grid */}
      {relatedListings.length > 0 && (
        <div className="border-t border-slate-200 pt-12 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                Explore More In {listing.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display mt-1">
                Related Listings
              </h2>
            </div>
            <button
              onClick={() => onNavigateCategory(listing.category)}
              className="text-xs font-bold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View All {listing.category}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedListings.map(item => (
              <ListingCard
                key={item.id}
                listing={item}
                onViewDetails={onSelectListing}
                onCall={onCall}
                onWhatsApp={onWhatsApp}
                onBook={onBook}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
