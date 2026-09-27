export type ListingType = 'Product' | 'Service';

export type PriceType = 'exact' | 'range' | 'contact' | 'negotiable' | 'rental' | 'service';

export type ListingStatus = 'published' | 'draft' | 'unavailable' | 'archived';

export type InquiryStatus = 'New' | 'Contacted' | 'In Progress' | 'Completed' | 'Cancelled';

export type PreferredContactMethod = 'Phone' | 'WhatsApp' | 'Email';

export type AdminRole = 'Technical Administrator' | 'Manager/Owner' | 'Editor';

export interface Listing {
  id: string;
  title: string;
  slug: string;
  type: ListingType;
  category: string;
  subcategory?: string;
  shortDescription: string;
  fullDescription: string;
  images: string[];
  price: number | string;
  priceType: PriceType;
  priceDisplay: string;
  location: string;
  status: ListingStatus;
  featured: boolean;
  specifications?: Record<string, string>;
  isSampleData?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryInfo {
  id: string;
  name: string;
  slug: string;
  description: string;
  subcategories?: string[];
  icon: string;
  image: string;
}

export interface Inquiry {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  contactMethod: PreferredContactMethod;
  preferredDateTime?: string;
  message: string;
  listingId: string;
  listingName: string;
  listingUrl: string;
  listingType: ListingType;
  category: string;
  date: string;
  time: string;
  status: InquiryStatus;
  internalNotes?: string;
  createdAt: string;
}

export interface ContactInteraction {
  id: string;
  type: 'call' | 'whatsapp';
  listingId: string;
  listingTitle: string;
  category: string;
  listingUrl: string;
  timestamp: string;
}

export interface ContactSettings {
  publicPhone: string;
  publicWhatsApp: string;
  privatePhone?: string;
  privateWhatsApp?: string;
  notificationEmail: string;
  businessHours: string;
  customerServiceHours: string;
  website: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  status: 'Active' | 'Inactive';
  lastLogin?: string;
}
