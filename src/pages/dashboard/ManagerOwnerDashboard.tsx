import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  Layers,
  Inbox,
  Settings,
  Plus,
  Search,
  Filter,
  Eye,
  Edit2,
  Trash2,
  CheckCircle,
  Clock,
  Phone,
  MessageSquare,
  Mail,
  ShieldCheck,
  Star,
  ExternalLink,
  Download,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Listing, Inquiry, InquiryStatus, ListingStatus } from '../../types';
import { CATEGORIES } from '../../data/categories';
import { ListingEditModal } from '../../components/dashboard/ListingEditModal';

interface Props {
  onViewPublicListing: (listing: Listing) => void;
}

export const ManagerOwnerDashboard: React.FC<Props> = ({ onViewPublicListing }) => {
  const {
    listings,
    inquiries,
    contactSettings,
    contactInteractions,
    addListing,
    updateListing,
    deleteListing,
    toggleListingStatus,
    toggleFeatured,
    updateInquiryStatus,
    updateContactSettings
  } = useApp();

  const [activeTab, setActiveTab] = useState<'listings' | 'inquiries' | 'contact-settings' | 'categories'>('listings');
  const [searchListings, setSearchListings] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Modals
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingListing, setEditingListing] = useState<Listing | null>(null);

  // Inquiries filtering & search
  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState<string>('all');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState('');

  // Contact Settings Form State
  const [publicPhone, setPublicPhone] = useState(contactSettings.publicPhone);
  const [publicWhatsApp, setPublicWhatsApp] = useState(contactSettings.publicWhatsApp);
  const [privatePhone, setPrivatePhone] = useState(contactSettings.privatePhone || '');
  const [privateWhatsApp, setPrivateWhatsApp] = useState(contactSettings.privateWhatsApp || '');
  const [notificationEmail, setNotificationEmail] = useState(contactSettings.notificationEmail);
  const [businessHours, setBusinessHours] = useState(contactSettings.businessHours);
  const [settingsSavedMessage, setSettingsSavedMessage] = useState(false);

  // Filtered Listings
  const filteredListings = useMemo(() => {
    return listings.filter(item => {
      if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
      if (statusFilter !== 'all' && item.status !== statusFilter) return false;
      if (searchListings.trim()) {
        const q = searchListings.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.id.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [listings, categoryFilter, statusFilter, searchListings]);

  // Filtered Inquiries
  const filteredInquiries = useMemo(() => {
    return inquiries.filter(inq => {
      if (inquiryStatusFilter !== 'all' && inq.status !== inquiryStatusFilter) return false;
      if (inquirySearch.trim()) {
        const q = inquirySearch.toLowerCase();
        return (
          inq.customerName.toLowerCase().includes(q) ||
          inq.customerPhone.toLowerCase().includes(q) ||
          inq.listingName.toLowerCase().includes(q) ||
          inq.id.toLowerCase().includes(q) ||
          inq.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [inquiries, inquiryStatusFilter, inquirySearch]);

  // Metrics
  const totalListings = listings.length;
  const publishedListings = listings.filter(l => l.status === 'published').length;
  const newInquiriesCount = inquiries.filter(i => i.status === 'New').length;
  const totalInteractions = contactInteractions.length;

  const handleSaveListing = (data: any) => {
    if (editingListing) {
      updateListing(editingListing.id, data);
    } else {
      addListing(data);
    }
  };

  const handleOpenCreateModal = () => {
    setEditingListing(null);
    setIsEditModalOpen(true);
  };

  const handleOpenEditModal = (item: Listing) => {
    setEditingListing(item);
    setIsEditModalOpen(true);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateContactSettings({
      publicPhone,
      publicWhatsApp,
      privatePhone,
      privateWhatsApp,
      notificationEmail,
      businessHours
    });
    setSettingsSavedMessage(true);
    setTimeout(() => setSettingsSavedMessage(false), 3000);
  };

  const handleExportInquiries = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(inquiries, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `philmen_inquiries_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-8">
      
      {/* Dashboard Top Header & Metrics */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                Primary Business Control
              </span>
              <span className="text-[11px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded">
                Owner Role
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-0.5">
              Manager & Owner Dashboard
            </h1>
          </div>

          {/* Quick Tab Switcher */}
          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-xs">
            <button
              onClick={() => setActiveTab('listings')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'listings' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Listings ({listings.length})
            </button>
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors relative cursor-pointer ${
                activeTab === 'inquiries' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Inquiries ({inquiries.length})
              {newInquiriesCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.2 bg-rose-500 text-white rounded-full text-[10px]">
                  {newInquiriesCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('contact-settings')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'contact-settings' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Contact Settings
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'categories' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Categories
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Total Inventory</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1 tabular-nums font-display">{totalListings}</div>
            <div className="text-[11px] text-emerald-600 font-medium mt-0.5">{publishedListings} Published Publicly</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">New Inquiries</div>
            <div className="text-2xl font-extrabold text-amber-600 mt-1 tabular-nums font-display">{newInquiriesCount}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Awaiting first contact</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Total Inquiries Logged</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1 tabular-nums font-display">{inquiries.length}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">All listing requests</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Recorded Contact Clicks</div>
            <div className="text-2xl font-extrabold text-indigo-600 mt-1 tabular-nums font-display">{totalInteractions}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Calls & WhatsApp clicks</div>
          </div>
        </div>
      </div>

      {/* TAB 1: LISTINGS MANAGEMENT */}
      {activeTab === 'listings' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
          
          {/* Controls Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-display">Manage Products & Services</h2>
              <p className="text-xs text-slate-500">Create, edit, toggle visibility, and update pricing across all categories.</p>
            </div>

            <button
              onClick={handleOpenCreateModal}
              className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Listing</span>
            </button>
          </div>

          {/* Filter and Search Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search listing by title or ID..."
                value={searchListings}
                onChange={e => setSearchListings(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <select
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                className="w-full py-2 px-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="w-full py-2 px-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="all">All Statuses</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="unavailable">Unavailable</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          {/* Table of Listings */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 font-bold border-y border-slate-200 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-3">Listing</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Price</th>
                  <th className="py-3 px-3">Location</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Featured</th>
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
                          <div className="font-bold text-slate-900 max-w-[200px] truncate">{item.title}</div>
                          <div className="font-mono text-[10px] text-slate-400">{item.id} · {item.type}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-medium text-slate-900">{item.category}</div>
                      {item.subcategory && <div className="text-[10px] text-slate-500">{item.subcategory}</div>}
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-900 tabular-nums">
                      {item.priceDisplay}
                    </td>
                    <td className="py-3 px-3 text-slate-600 max-w-[140px] truncate">
                      {item.location}
                    </td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => toggleListingStatus(item.id)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer ${
                          item.status === 'published'
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                        }`}
                      >
                        {item.status}
                      </button>
                    </td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => toggleFeatured(item.id)}
                        className={`p-1.5 rounded-lg cursor-pointer ${
                          item.featured ? 'text-amber-500 bg-amber-50' : 'text-slate-300 hover:text-slate-500'
                        }`}
                        title={item.featured ? 'Unfeature' : 'Mark as Featured'}
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </button>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onViewPublicListing(item)}
                          className="p-1.5 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
                          title="View on Public Site"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEditModal(item)}
                          className="p-1.5 text-amber-600 hover:text-amber-800 rounded-lg hover:bg-amber-50 cursor-pointer"
                          title="Edit Listing"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete listing "${item.title}"?`)) {
                              deleteListing(item.id);
                            }
                          }}
                          className="p-1.5 text-rose-500 hover:text-rose-700 rounded-lg hover:bg-rose-50 cursor-pointer"
                          title="Delete Listing"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: CUSTOMER INQUIRIES MANAGEMENT */}
      {activeTab === 'inquiries' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-display">Customer Inquiries Hub</h2>
              <p className="text-xs text-slate-500">
                All booking requests and customer inquiries sent to <strong className="text-slate-700">{contactSettings.notificationEmail}</strong>.
              </p>
            </div>

            <button
              onClick={handleExportInquiries}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export Inquiries (JSON)</span>
            </button>
          </div>

          {/* Search & Filter */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by customer name, phone, or listing..."
                value={inquirySearch}
                onChange={e => setInquirySearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <select
                value={inquiryStatusFilter}
                onChange={e => setInquiryStatusFilter(e.target.value)}
                className="w-full py-2 px-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Inquiries List */}
          <div className="space-y-4">
            {filteredInquiries.length > 0 ? (
              filteredInquiries.map(inq => {
                const isEditingNotes = editingNotesId === inq.id;

                return (
                  <div
                    key={inq.id}
                    className="p-5 bg-slate-50/70 rounded-2xl border border-slate-200 space-y-4 hover:border-slate-300 transition-colors"
                  >
                    {/* Top Row: Ref, Customer, Status */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-amber-700 bg-amber-100/80 px-2.5 py-0.5 rounded">
                          {inq.id}
                        </span>
                        <div className="text-xs text-slate-500">
                          {inq.date} at {inq.time}
                        </div>
                      </div>

                      {/* Status Dropdown */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-500">Status:</span>
                        <select
                          value={inq.status}
                          onChange={e => updateInquiryStatus(inq.id, e.target.value as InquiryStatus)}
                          className={`text-xs font-bold py-1 px-2.5 rounded-lg border focus:outline-none cursor-pointer ${
                            inq.status === 'New'
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : inq.status === 'Contacted'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : inq.status === 'In Progress'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : inq.status === 'Completed'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-slate-100 text-slate-600 border-slate-300'
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    {/* Customer & Listing Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      
                      {/* Customer Info */}
                      <div className="space-y-1.5 p-3.5 bg-white rounded-xl border border-slate-200">
                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Customer Details</div>
                        <div className="text-sm font-bold text-slate-900">{inq.customerName}</div>
                        <div className="text-slate-600 flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-amber-600" />
                          <span className="font-mono font-medium">{inq.customerPhone}</span>
                        </div>
                        {inq.customerEmail && inq.customerEmail !== 'N/A' && (
                          <div className="text-slate-600 flex items-center gap-2">
                            <Mail className="w-3.5 h-3.5 text-slate-400" />
                            <span>{inq.customerEmail}</span>
                          </div>
                        )}
                        <div className="text-slate-500 pt-1">
                          Preferred Contact: <strong className="text-slate-800">{inq.contactMethod}</strong>
                        </div>
                        {inq.preferredDateTime && (
                          <div className="text-slate-500">
                            Requested Time: <strong className="text-slate-800">{inq.preferredDateTime}</strong>
                          </div>
                        )}
                      </div>

                      {/* Associated Listing Info */}
                      <div className="space-y-1.5 p-3.5 bg-white rounded-xl border border-slate-200">
                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Associated Listing</div>
                        <div className="font-bold text-slate-900 line-clamp-1">{inq.listingName}</div>
                        <div className="text-slate-600 flex items-center gap-2">
                          <span className="font-mono text-slate-500">{inq.listingId}</span>
                          <span>·</span>
                          <span className="text-amber-700 font-medium">{inq.category}</span>
                        </div>
                        <div className="pt-2">
                          <a
                            href={inq.listingUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] text-amber-600 hover:text-amber-700 font-semibold inline-flex items-center gap-1"
                          >
                            <span>Open Public Listing URL</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>

                    </div>

                    {/* Customer Message */}
                    <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1 text-xs">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Customer Message:</div>
                      <p className="text-slate-800 italic leading-relaxed">"{inq.message}"</p>
                    </div>

                    {/* Staff Notes & Fast Reply Action */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
                      {/* Notes Box */}
                      <div className="flex-1 w-full text-xs">
                        {isEditingNotes ? (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={tempNotes}
                              onChange={e => setTempNotes(e.target.value)}
                              placeholder="Add internal staff note..."
                              className="w-full px-3 py-1.5 bg-white rounded-lg border border-slate-300 text-xs"
                            />
                            <button
                              onClick={() => {
                                updateInquiryStatus(inq.id, inq.status, tempNotes);
                                setEditingNotesId(null);
                              }}
                              className="px-3 py-1 bg-slate-900 text-white rounded-lg text-xs font-semibold"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingNotesId(null)}
                              className="px-2 py-1 text-slate-500 text-xs"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-slate-600">
                            <span className="text-slate-400">Note:</span>
                            <span>{inq.internalNotes || 'No notes added yet.'}</span>
                            <button
                              onClick={() => {
                                setEditingNotesId(inq.id);
                                setTempNotes(inq.internalNotes || '');
                              }}
                              className="text-amber-600 hover:text-amber-700 underline text-[11px] ml-1"
                            >
                              Edit
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Fast Contact Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={`tel:${inq.customerPhone}`}
                          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1.5"
                        >
                          <Phone className="w-3.5 h-3.5 text-amber-400" />
                          <span>Call Customer</span>
                        </a>

                        <a
                          href={`https://wa.me/233${inq.customerPhone.replace(/^0/, '')}?text=${encodeURIComponent(
                            `Hello ${inq.customerName}, this is Philmen customer service following up on your inquiry (${inq.id}) regarding ${inq.listingName}.`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1.5"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp Customer</span>
                        </a>
                      </div>
                    </div>

                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-xs text-slate-500 bg-slate-50 rounded-xl border border-slate-200">
                No customer inquiries match your active filter.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: CONTACT & NOTIFICATION SETTINGS */}
      {activeTab === 'contact-settings' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
          
          <div className="pb-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 font-display">Philmen Contact & Notification Settings</h2>
            <p className="text-xs text-slate-500">
              Manage the official public numbers shown to customers, internal secondary lines, and booking notification email dispatch.
            </p>
          </div>

          {settingsSavedMessage && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Contact and notification settings saved successfully!</span>
            </div>
          )}

          <form onSubmit={handleSaveSettings} className="space-y-6 max-w-2xl">
            
            {/* Public Numbers Section */}
            <div className="space-y-4">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                1. Designated Public Contact Channels (Visible on Website)
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Primary Public Phone Number
                  </label>
                  <input
                    type="text"
                    required
                    value={publicPhone}
                    onChange={e => setPublicPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <div className="text-[11px] text-slate-400 mt-1">Default: 0546320901</div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Primary Public WhatsApp Number
                  </label>
                  <input
                    type="text"
                    required
                    value={publicWhatsApp}
                    onChange={e => setPublicWhatsApp(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <div className="text-[11px] text-slate-400 mt-1">Default: 0536287637</div>
                </div>
              </div>
            </div>

            {/* Private / Internal Numbers Section */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  2. Private / Internal Management Numbers (Strictly Confidential)
                </div>
                <span className="text-[10px] bg-rose-100 text-rose-800 font-semibold px-2 py-0.2 rounded">
                  Never Shown Publicly
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Secondary Private Phone (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 024XXXXXXX (Owner line)"
                    value={privatePhone}
                    onChange={e => setPrivatePhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <div className="text-[11px] text-slate-400 mt-1">For internal management escalation only</div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Secondary Private WhatsApp (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 050XXXXXXX (Internal line)"
                    value={privateWhatsApp}
                    onChange={e => setPrivateWhatsApp(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <div className="text-[11px] text-slate-400 mt-1">Never exposed to public visitors</div>
                </div>
              </div>
            </div>

            {/* Email & Operational Hours */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                3. Notification Infrastructure & Operating Hours
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Booking / Inquiry Notification Email
                  </label>
                  <input
                    type="email"
                    required
                    value={notificationEmail}
                    onChange={e => setNotificationEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <div className="text-[11px] text-slate-400 mt-1">Official: philmen.official@gmail.com</div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Customer Service Operating Hours
                  </label>
                  <input
                    type="text"
                    required
                    value={businessHours}
                    onChange={e => setBusinessHours(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <div className="text-[11px] text-slate-400 mt-1">Official: 7:00 AM – 5:00 PM</div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-sm transition-colors cursor-pointer"
              >
                Save Contact Settings
              </button>
            </div>

          </form>

        </div>
      )}

      {/* TAB 4: CATEGORIES & SUBCATEGORIES ORGANIZER */}
      {activeTab === 'categories' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 font-display">3 Official Categories & Inventory Count</h2>
            <p className="text-xs text-slate-500">
              Overview of listing distribution across the Philmen directory structure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORIES.map(c => {
              const count = listings.filter(l => l.category === c.name).length;
              return (
                <div key={c.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm font-display">{c.name}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-mono">
                      {count} items
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2">{c.description}</p>
                  {c.subcategories && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {c.subcategories.map(s => (
                        <span key={s} className="text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-600">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal for Creating / Editing Listing */}
      <ListingEditModal
        isOpen={isEditModalOpen}
        listing={editingListing}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveListing}
      />

    </div>
  );
};
