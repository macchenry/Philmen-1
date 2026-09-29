import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, MapPin, X, ArrowLeft } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { ListingCard } from '../components/common/ListingCard';
import { Listing } from '../types';
import { useApp } from '../context/AppContext';

interface Props {
  initialQuery?: string;
  initialCategory?: string;
  onSelectListing: (listing: Listing) => void;
  onCall: (listing: Listing) => void;
  onWhatsApp: (listing: Listing) => void;
  onBook: (listing: Listing) => void;
}

export const SearchPage: React.FC<Props> = ({
  initialQuery = '',
  initialCategory = 'all',
  onSelectListing,
  onCall,
  onWhatsApp,
  onBook
}) => {
  const { listings } = useApp();
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [type, setType] = useState<string>('all');
  const [locationQuery, setLocationQuery] = useState('');
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'relevance' | 'newest' | 'price-asc' | 'price-desc'>('relevance');

  const filteredListings = useMemo(() => {
    return listings
      .filter(item => {
        if (item.status !== 'published') return false;
        if (category !== 'all' && item.category !== category) return false;
        if (type !== 'all' && item.type !== type) return false;
        if (featuredOnly && !item.featured) return false;

        if (locationQuery.trim()) {
          const lq = locationQuery.toLowerCase();
          if (!item.location.toLowerCase().includes(lq)) return false;
        }

        if (query.trim()) {
          const q = query.toLowerCase();
          const matchTitle = item.title.toLowerCase().includes(q);
          const matchDesc = item.shortDescription.toLowerCase().includes(q) || item.fullDescription.toLowerCase().includes(q);
          const matchCat = item.category.toLowerCase().includes(q);
          const matchSub = item.subcategory ? item.subcategory.toLowerCase().includes(q) : false;
          const matchId = item.id.toLowerCase().includes(q);
          const matchLoc = item.location.toLowerCase().includes(q);

          if (!matchTitle && !matchDesc && !matchCat && !matchSub && !matchId && !matchLoc) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (sortBy === 'price-asc') {
          const numA = typeof a.price === 'number' ? a.price : 9999999;
          const numB = typeof b.price === 'number' ? b.price : 9999999;
          return numA - numB;
        }
        if (sortBy === 'price-desc') {
          const numA = typeof a.price === 'number' ? a.price : 0;
          const numB = typeof b.price === 'number' ? b.price : 0;
          return numB - numA;
        }
        return 0;
      });
  }, [listings, query, category, type, locationQuery, featuredOnly, sortBy]);

  const handleReset = () => {
    setQuery('');
    setCategory('all');
    setType('all');
    setLocationQuery('');
    setFeaturedOnly(false);
    setSortBy('relevance');
  };

  return (
    <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 overflow-x-hidden">
      
      {/* Header */}
      <div className="space-y-1.5 sm:space-y-2">
        <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
          Search Catalog
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
          Find Products & Services
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Search across all 3 official Philmen categories, locations, and inventory.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Main Keyword Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search keyword (e.g. Fridge, Corolla, Prado, AC, Gas Cylinder)..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-4">
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full py-2.5 px-3 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
            >
              <option value="all">All 3 Categories</option>
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Listing Type Dropdown */}
          <div className="md:col-span-3">
            <select
              value={type}
              onChange={e => setType(e.target.value)}
              className="w-full py-2.5 px-3 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
            >
              <option value="all">All Types (Product & Service)</option>
              <option value="Product">Products Only</option>
              <option value="Service">Services Only</option>
            </select>
          </div>

        </div>

        {/* Secondary Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100 text-xs">
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Location filter */}
            <div className="relative">
              <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter by city/area..."
                value={locationQuery}
                onChange={e => setLocationQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Featured Checkbox */}
            <label className="flex items-center gap-2 text-slate-700 font-medium cursor-pointer select-none">
              <input
                type="checkbox"
                checked={featuredOnly}
                onChange={e => setFeaturedOnly(e.target.checked)}
                className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
              />
              <span>Featured Only</span>
            </label>
          </div>

          {/* Sort By & Reset */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-slate-500">
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="py-1 px-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-800 font-medium focus:outline-none cursor-pointer"
              >
                <option value="relevance">Relevance</option>
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            {(query || category !== 'all' || type !== 'all' || locationQuery || featuredOnly) && (
              <button
                onClick={handleReset}
                className="text-amber-600 hover:text-amber-700 font-bold transition-colors"
              >
                Clear All
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Search Results Display */}
      <div className="space-y-4">
        <div className="text-xs text-slate-500 px-1">
          Found <strong className="text-slate-900">{filteredListings.length}</strong> matching {filteredListings.length === 1 ? 'listing' : 'listings'}
        </div>

        {filteredListings.length > 0 ? (
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
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <h3 className="text-base font-bold text-slate-900">No Listings Match Your Search</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              We couldn't find any products or services matching "{query || category}". Try broadening your search terms or contact Philmen support directly.
            </p>
            <div className="pt-2">
              <button
                onClick={handleReset}
                className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
