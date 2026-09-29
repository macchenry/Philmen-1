import React from 'react';
import { Phone, MessageSquare, MapPin, Eye, Calendar, ArrowUpRight } from 'lucide-react';
import { Listing } from '../../types';

interface Props {
  listing: Listing;
  onViewDetails: (listing: Listing) => void;
  onCall: (listing: Listing) => void;
  onWhatsApp: (listing: Listing) => void;
  onBook: (listing: Listing) => void;
}

export const ListingCard: React.FC<Props> = ({
  listing,
  onViewDetails,
  onCall,
  onWhatsApp,
  onBook
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col group">
      
      {/* Image Container with clean tag */}
      <div
        onClick={() => onViewDetails(listing)}
        className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden cursor-pointer"
      >
        <img
          src={listing.images[0]}
          alt={listing.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // Graceful fallback container using approved category image
            (e.target as HTMLImageElement).src = 'https://i.ibb.co/fzY197WN/006-Toyota-Corolla-LE-2022.jpg';
          }}
        />

        {/* Quiet overlay metadata banner */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="text-[11px] font-bold text-slate-900 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md shadow-xs">
            {listing.type}
          </span>
          {listing.featured && (
            <span className="text-[11px] font-bold text-amber-900 bg-amber-300/95 backdrop-blur-xs px-2.5 py-1 rounded-md shadow-xs">
              Featured
            </span>
          )}
        </div>

        {/* Hover preview button */}
        <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="px-3.5 py-1.5 bg-white text-slate-900 text-xs font-bold rounded-lg shadow-md inline-flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-amber-600" />
            View Listing
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Metadata line without pill enclosure */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-amber-700">{listing.category}</span>
            {listing.subcategory && (
              <>
                <span aria-hidden="true">·</span>
                <span>{listing.subcategory}</span>
              </>
            )}
            <span aria-hidden="true">·</span>
            <span className="font-mono text-[11px]">{listing.id}</span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onViewDetails(listing)}
            className="text-base font-bold text-slate-900 line-clamp-2 hover:text-amber-600 transition-colors cursor-pointer leading-snug"
          >
            {listing.title}
          </h3>

          {/* Short description */}
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {listing.shortDescription}
          </p>
        </div>

        {/* Location & Price Section */}
        <div className="space-y-3 pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-slate-600 truncate max-w-[180px]">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{listing.location}</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-extrabold text-slate-950 tabular-nums">
                {listing.priceDisplay}
              </span>
            </div>
          </div>

          {/* Action Buttons: 3 Zone Row */}
          <div className="grid grid-cols-3 gap-1.5 pt-1">
            {/* View Details */}
            <button
              type="button"
              onClick={() => onViewDetails(listing)}
              className="py-2 px-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold text-center transition-colors cursor-pointer"
            >
              Details
            </button>

            {/* Call */}
            <button
              type="button"
              onClick={() => onCall(listing)}
              className="py-2 px-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-1 transition-colors cursor-pointer"
              title="Call Philmen (0546320901)"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Call</span>
            </button>

            {/* WhatsApp */}
            <button
              type="button"
              onClick={() => onWhatsApp(listing)}
              className="py-2 px-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-1 transition-colors cursor-pointer"
              title="WhatsApp Philmen (0536287637)"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
