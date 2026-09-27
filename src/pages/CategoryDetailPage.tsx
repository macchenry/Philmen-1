import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search, SlidersHorizontal, Filter, MapPin, Phone, MessageSquare } from 'lucide-react';
import { CATEGORIES, getCategoryBySlug } from '../data/categories';
import { ListingCard } from '../components/common/ListingCard';
import { Listing, ListingType } from '../types';
import { useApp } from '../context/AppContext';

interface Props {
  categorySlug: string;
  onBack: () => void;
  onSelectListing: (listing: Listing) => void;
  onCall: (listing: Listing) => void;
  onWhatsApp: (listing: Listing) => void;
  onBook: (listing: Listing) => void;
  onSelectCategory: (slug: string) => void;
}

export const CategoryDetailPage: React.FC<Props> = ({
  categorySlug,
  onBack,
  onSelectListing,
  onCall,
  onWhatsApp,
  onBook,
  onSelectCategory
}) => {
  const { listings, contactSettings } = useApp();
  const category = getCategoryBySlug(categorySlug);

  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Category Not Found</h2>
        <p className="text-sm text-slate-600">The requested category does not exist in Philmen's directory.</p>
        <button
          onClick={onBack}
          className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold"
        >
          Return to Categories
        </button>
      </div>
    );
  }

  // Filter listings for this category
  const filteredListings = useMemo(() => {
    return listings
      .filter(item => {
        if (item.status !== 'published') return false;
        if (item.category !== category.name) return false;
        if (selectedSubcategory !== 'all' && item.subcategory !== selectedSubcategory) return false;
        if (selectedType !== 'all' && item.type !== selectedType) return false;
        if (searchKeyword.trim()) {
          const q = searchKeyword.toLowerCase();
          const matchTitle = item.title.toLowerCase().includes(q);
          const matchDesc = item.shortDescription.toLowerCase().includes(q) || item.fullDescription.toLowerCase().includes(q);
          const matchLoc = item.location.toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchLoc) return false;
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
  }, [listings, category.name, selectedSubcategory, selectedType, searchKeyword, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Navigation Breadcrumbs & Back */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <button
          onClick={onBack}
          className="hover:text-slate-900 font-medium inline-flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Categories
        </button>
        <span>/</span>
        <span className="font-semibold text-slate-900">{category.name}</span>
      </div>

      {/* Category Header Hero */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden border border-slate-800">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Philmen Vetted Category
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            {category.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            {category.description}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <span>Direct Philmen Inquiries:</span>
            <a
              href={`tel:${contactSettings.publicPhone}`}
              className="text-white hover:text-amber-400 font-mono font-semibold"
            >
              {contactSettings.publicPhone}
            </a>
            <span>·</span>
            <a
              href={`https://wa.me/233${contactSettings.publicWhatsApp.replace(/^0/, '')}`}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-mono font-semibold"
            >
              WhatsApp {contactSettings.publicWhatsApp}
            </a>
          </div>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-4">
        
        {/* Subcategories Tabs if available */}
        {category.subcategories && category.subcategories.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
              Subcategory:
            </span>
            <button
              onClick={() => setSelectedSubcategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedSubcategory === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All {category.name}
            </button>
            {category.subcategories.map(sub => (
              <button
                key={sub}
                onClick={() => setSelectedSubcategory(sub)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedSubcategory === sub
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        {/* Search, Type Filter & Sort Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
          
          {/* Search inside category */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Filter within ${category.name}...`}
              value={searchKeyword}
              onChange={e => setSearchKeyword(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Type Selector (All / Products / Services) */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500 shrink-0">Type:</span>
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="w-full py-2 px-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="Product">Products Only</option>
              <option value="Service">Services Only</option>
            </select>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500 shrink-0">Sort:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="w-full py-2 px-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

        </div>
      </div>

      {/* Results Listing Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>
            Showing <strong className="text-slate-900">{filteredListings.length}</strong> {filteredListings.length === 1 ? 'listing' : 'listings'} in {category.name}
          </span>
          {(selectedSubcategory !== 'all' || selectedType !== 'all' || searchKeyword) && (
            <button
              onClick={() => {
                setSelectedSubcategory('all');
                setSelectedType('all');
                setSearchKeyword('');
              }}
              className="text-amber-600 hover:text-amber-700 font-semibold"
            >
              Reset Filters
            </button>
          )}
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
            <h3 className="text-base font-bold text-slate-900">No Listings Match Your Filters</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              We could not find listings matching your active filters in {category.name}. Try selecting "All" subcategories or contact Philmen directly.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => {
                  setSelectedSubcategory('all');
                  setSelectedType('all');
                  setSearchKeyword('');
                }}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold"
              >
                Clear Filters
              </button>
              <a
                href={`tel:${contactSettings.publicPhone}`}
                className="px-4 py-2 bg-amber-600 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                Call Philmen
              </a>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
