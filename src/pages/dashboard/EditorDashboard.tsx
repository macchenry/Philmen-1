import React, { useState, useMemo } from 'react';
import { Plus, Search, Eye, Edit2, ShieldAlert, Sparkles, MapPin, Tag } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Listing } from '../../types';
import { CATEGORIES } from '../../data/categories';
import { ListingEditModal } from '../../components/dashboard/ListingEditModal';

interface Props {
  onViewPublicListing: (listing: Listing) => void;
}

export const EditorDashboard: React.FC<Props> = ({ onViewPublicListing }) => {
  const { listings, addListing, updateListing } = useApp();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingListing, setEditingListing] = useState<Listing | null>(null);

  const filteredListings = useMemo(() => {
    return listings.filter(item => {
      if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return item.title.toLowerCase().includes(q) || item.id.toLowerCase().includes(q);
      }
      return true;
    });
  }, [listings, categoryFilter, search]);

  const handleOpenCreate = () => {
    setEditingListing(null);
    setIsEditModalOpen(true);
  };

  const handleOpenEdit = (item: Listing) => {
    setEditingListing(item);
    setIsEditModalOpen(true);
  };

  const handleSaveListing = (data: any) => {
    if (editingListing) {
      updateListing(editingListing.id, data);
    } else {
      addListing(data);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Content Management Hub
            </span>
            <span className="text-[11px] bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded">
              Editor Role
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-0.5">
            Content Editor Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Create listings, update descriptions, refine prices, upload photos, and update locations.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Listing</span>
        </button>
      </div>

      {/* Permission Restriction Banner */}
      <div className="p-4 bg-amber-50 border border-amber-200/80 rounded-2xl flex items-start gap-3 text-xs text-amber-900">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Editor Permission Scope:</strong> You have authorization to manage listing content, pricing, specifications, and availability across all 3 official categories. Security settings, private management phone lines, user roles, and system configurations are restricted to Manager/Owner and Technical Admin roles.
        </div>
      </div>

      {/* Listings Table with Search */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
        
        {/* Search & Category Filter */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search listings by title or ID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="w-full py-2 px-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All 13 Categories</option>
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Listings List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 font-bold border-y border-slate-200 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-3">Listing Item</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Current Price</th>
                <th className="py-3 px-3">Location</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredListings.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                        <img
                          src={item.images[0]}
                          alt=""
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80';
                          }}
                        />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 max-w-[220px] truncate">{item.title}</div>
                        <div className="font-mono text-[10px] text-slate-400">{item.id} · {item.type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-800">{item.category}</td>
                  <td className="py-3 px-3 font-bold text-slate-900 tabular-nums">{item.priceDisplay}</td>
                  <td className="py-3 px-3 text-slate-600 max-w-[140px] truncate">{item.location}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800 uppercase">
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onViewPublicListing(item)}
                        className="p-1.5 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
                        title="View Live Listing"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-amber-400" />
                        <span>Edit Content</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Reusable Editor Modal */}
      <ListingEditModal
        isOpen={isEditModalOpen}
        listing={editingListing}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveListing}
        isEditor={true}
      />

    </div>
  );
};
