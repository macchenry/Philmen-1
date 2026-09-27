import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2, Image as ImageIcon, MapPin, Tag } from 'lucide-react';
import { Listing, ListingType, PriceType, ListingStatus } from '../../types';
import { CATEGORIES } from '../../data/categories';

interface Props {
  listing?: Listing | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  isEditor?: boolean;
}

export const ListingEditModal: React.FC<Props> = ({
  listing,
  isOpen,
  onClose,
  onSave,
  isEditor = false
}) => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [type, setType] = useState<ListingType>('Product');
  const [category, setCategory] = useState(CATEGORIES[0].name);
  const [subcategory, setSubcategory] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [images, setImages] = useState<string[]>(['']);
  const [price, setPrice] = useState<string | number>('');
  const [priceType, setPriceType] = useState<PriceType>('exact');
  const [priceDisplay, setPriceDisplay] = useState('');
  const [location, setLocation] = useState('Accra, Ghana');
  const [status, setStatus] = useState<ListingStatus>('published');
  const [featured, setFeatured] = useState(false);
  const [specKey, setSpecKey] = useState('');
  const [specVal, setSpecVal] = useState('');
  const [specifications, setSpecifications] = useState<Record<string, string>>({});

  useEffect(() => {
    if (listing) {
      setTitle(listing.title);
      setSlug(listing.slug);
      setType(listing.type);
      setCategory(listing.category);
      setSubcategory(listing.subcategory || '');
      setShortDescription(listing.shortDescription);
      setFullDescription(listing.fullDescription);
      setImages(listing.images && listing.images.length > 0 ? listing.images : ['']);
      setPrice(listing.price);
      setPriceType(listing.priceType);
      setPriceDisplay(listing.priceDisplay);
      setLocation(listing.location);
      setStatus(listing.status);
      setFeatured(listing.featured);
      setSpecifications(listing.specifications || {});
    } else {
      // New Listing defaults
      setTitle('');
      setSlug('');
      setType('Product');
      setCategory(CATEGORIES[0].name);
      setSubcategory(CATEGORIES[0].subcategories ? CATEGORIES[0].subcategories[0] : '');
      setShortDescription('');
      setFullDescription('');
      setImages(['']);
      setPrice('');
      setPriceType('exact');
      setPriceDisplay('GH₵ ');
      setLocation('Accra, Ghana');
      setStatus('published');
      setFeatured(false);
      setSpecifications({});
    }
  }, [listing, isOpen]);

  // Available subcategories for selected category
  const selectedCatObj = CATEGORIES.find(c => c.name === category);
  const availableSubcategories = selectedCatObj?.subcategories || [];

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!listing) {
      // Auto-generate clean slug for new listing
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      );
    }
  };

  const handleAddImage = () => {
    setImages(prev => [...prev, '']);
  };

  const handleUpdateImage = (index: number, val: string) => {
    setImages(prev => {
      const next = [...prev];
      next[index] = val;
      return next;
    });
  };

  const handleRemoveImage = (index: number) => {
    if (images.length <= 1) {
      setImages(['']);
      return;
    }
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddSpec = () => {
    if (specKey.trim() && specVal.trim()) {
      setSpecifications(prev => ({ ...prev, [specKey.trim()]: specVal.trim() }));
      setSpecKey('');
      setSpecVal('');
    }
  };

  const handleRemoveSpec = (key: string) => {
    setSpecifications(prev => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Filter valid images
    const validImages = images.filter(img => img.trim().length > 0);
    const finalImages = validImages.length > 0 ? validImages : ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80'];

    // Auto format price display if empty
    let finalPriceDisplay = priceDisplay.trim();
    if (!finalPriceDisplay) {
      if (priceType === 'contact') finalPriceDisplay = 'Contact for Price';
      else if (priceType === 'negotiable') finalPriceDisplay = price ? `GH₵ ${price} (Negotiable)` : 'Negotiable';
      else if (priceType === 'rental') finalPriceDisplay = price ? `GH₵ ${price} / Day` : 'Rental Price';
      else if (priceType === 'service') finalPriceDisplay = price ? `GH₵ ${price} Service Fee` : 'Service Price';
      else finalPriceDisplay = price ? `GH₵ ${price}` : 'GH₵ 0';
    }

    const payload = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      type,
      category,
      subcategory: subcategory || undefined,
      shortDescription: shortDescription || title,
      fullDescription: fullDescription || shortDescription || title,
      images: finalImages,
      price: price || 0,
      priceType,
      priceDisplay: finalPriceDisplay,
      location: location || 'Accra, Ghana',
      status,
      featured,
      specifications
    };

    onSave(payload);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50 sticky top-0 z-10">
          <div>
            <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">
              {listing ? `Edit Listing · ${listing.id}` : 'Create New Philmen Listing'}
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-0.5">
              {listing ? listing.title : 'Add Product or Service'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Title and Slug */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Listing Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Samsung 535L Inverter Double Door Refrigerator"
                value={title}
                onChange={handleTitleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Public URL Slug <span className="text-slate-400 text-[11px]">(Unique identifier)</span>
                </label>
                <div className="flex items-center">
                  <span className="text-xs text-slate-400 bg-slate-100 border border-r-0 border-slate-300 px-2.5 py-2.5 rounded-l-xl">
                    /listing/
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="samsung-535l-fridge"
                    value={slug}
                    onChange={e => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    className="w-full px-3 py-2.5 rounded-r-xl border border-slate-300 text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Listing Type
                </label>
                <select
                  value={type}
                  onChange={e => setType(e.target.value as ListingType)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 font-medium bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Product">Product (Physical Item / Goods / Real Estate)</option>
                  <option value="Service">Service (Equipment Rental / Towing / Chauffeur)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category & Subcategory */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Official Category <span className="text-rose-500">*</span>
              </label>
              <select
                value={category}
                onChange={e => {
                  const newCat = e.target.value;
                  setCategory(newCat);
                  const catObj = CATEGORIES.find(c => c.name === newCat);
                  setSubcategory(catObj?.subcategories ? catObj.subcategories[0] : '');
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 font-medium bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Subcategory <span className="text-slate-400 text-[11px]">(Optional)</span>
              </label>
              {availableSubcategories.length > 0 ? (
                <select
                  value={subcategory}
                  onChange={e => setSubcategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="">None / General</option>
                  {availableSubcategories.map(sub => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  placeholder="e.g. Specific model or classification"
                  value={subcategory}
                  onChange={e => setSubcategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              )}
            </div>
          </div>

          {/* Pricing & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Price Display Mode
              </label>
              <select
                value={priceType}
                onChange={e => setPriceType(e.target.value as PriceType)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="exact">Exact Price (e.g. GH₵ 8,500)</option>
                <option value="range">Price Range (e.g. GH₵ 3,800 – GH₵ 5,500)</option>
                <option value="negotiable">Negotiable</option>
                <option value="rental">Rental Price (e.g. GH₵ 1,800 / Day)</option>
                <option value="service">Service Rate</option>
                <option value="contact">Contact for Price</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Public Price Label / Display <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. GH₵ 8,500 or Contact for Price"
                value={priceDisplay}
                onChange={e => setPriceDisplay(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Location (Ghana)
              </label>
              <input
                type="text"
                placeholder="e.g. East Legon, Accra"
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Descriptions */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Short Description (Cards & Previews)
              </label>
              <textarea
                rows={2}
                placeholder="Brief 1-2 sentence overview shown in listing cards and search snippets..."
                value={shortDescription}
                onChange={e => setShortDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Detailed Description (Detail Page)
              </label>
              <textarea
                rows={4}
                placeholder="Comprehensive details, features, conditions, terms, warranties, and deployment instructions..."
                value={fullDescription}
                onChange={e => setFullDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Image URLs */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-slate-700">
                Image URLs <span className="text-slate-400 text-[11px]">(First image is main cover)</span>
              </label>
              <button
                type="button"
                onClick={handleAddImage}
                className="text-xs text-amber-600 hover:text-amber-700 font-semibold inline-flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Image URL
              </button>
            </div>

            <div className="space-y-2">
              {images.map((imgUrl, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200 flex items-center justify-center">
                    {imgUrl ? (
                      <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="https://... image url"
                    value={imgUrl}
                    onChange={e => handleUpdateImage(idx, e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="p-2 text-slate-400 hover:text-rose-600 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Specifications Key-Values */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <label className="block text-xs font-semibold text-slate-700">
              Technical Specifications & Key Attributes
            </label>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Attribute (e.g. Capacity)"
                value={specKey}
                onChange={e => setSpecKey(e.target.value)}
                className="w-1/3 px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="text"
                placeholder="Value (e.g. 535 Liters)"
                value={specVal}
                onChange={e => setSpecVal(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="button"
                onClick={handleAddSpec}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 shrink-0"
              >
                Add Spec
              </button>
            </div>

            {Object.keys(specifications).length > 0 && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 divide-y divide-slate-200 text-xs">
                {Object.entries(specifications).map(([k, v]) => (
                  <div key={k} className="py-1.5 flex items-center justify-between">
                    <span className="text-slate-600 font-medium">{k}: <strong className="text-slate-900">{v}</strong></span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSpec(k)}
                      className="text-rose-500 hover:text-rose-700 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Publication Status & Feature Flags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Publication Status
              </label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as ListingStatus)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="published">Published (Visible to Public)</option>
                <option value="draft">Draft (Hidden from Public)</option>
                <option value="unavailable">Unavailable</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2.5 text-xs font-bold text-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={e => setFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                />
                <span>Pin as Featured Listing on Homepage</span>
              </label>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-slate-600 hover:text-slate-900 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4 text-amber-400" />
              <span>{listing ? 'Save Changes' : 'Publish Listing'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
