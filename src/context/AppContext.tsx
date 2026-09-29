import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Listing,
  Inquiry,
  ContactInteraction,
  ContactSettings,
  AdminUser,
  AdminRole,
  InquiryStatus,
  PreferredContactMethod
} from '../types';
import { INITIAL_LISTINGS } from '../data/initialListings';

interface AppContextType {
  listings: Listing[];
  inquiries: Inquiry[];
  contactInteractions: ContactInteraction[];
  contactSettings: ContactSettings;
  adminUsers: AdminUser[];
  currentAdminUser: AdminUser | null;
  activeInquiryNotification: Inquiry | null;
  
  // Listing Actions
  addListing: (listing: Omit<Listing, 'id' | 'createdAt' | 'updatedAt'>) => Listing;
  updateListing: (id: string, updates: Partial<Listing>) => void;
  deleteListing: (id: string) => void;
  toggleListingStatus: (id: string) => void;
  toggleFeatured: (id: string) => void;
  
  // Inquiry Actions
  submitInquiry: (data: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    contactMethod: PreferredContactMethod;
    preferredDateTime?: string;
    message: string;
    listing: Listing;
  }) => Inquiry;
  updateInquiryStatus: (id: string, status: InquiryStatus, internalNotes?: string) => void;
  dismissInquiryNotification: () => void;
  
  // Interaction Tracking
  recordContactInteraction: (type: 'call' | 'whatsapp', listing: Listing) => void;
  
  // Settings Actions
  updateContactSettings: (settings: Partial<ContactSettings>) => void;
  
  // Admin User Actions
  addAdminUser: (user: Omit<AdminUser, 'id'>) => void;
  updateAdminUser: (id: string, updates: Partial<AdminUser>) => void;
  deleteAdminUser: (id: string) => void;
  loginAs: (role: AdminRole) => void;
  logoutAdmin: () => void;
  
  // Reset
  resetToSampleData: () => void;
}

const DEFAULT_CONTACT_SETTINGS: ContactSettings = {
  publicPhone: '0546320901',
  publicWhatsApp: '0536287637',
  privatePhone: '',
  privateWhatsApp: '',
  notificationEmail: 'philmen.official@gmail.com',
  businessHours: '7:00 AM – 5:00 PM',
  customerServiceHours: '7:00 AM – 5:00 PM',
  website: 'www.philmen.shop'
};

const DEFAULT_ADMIN_USERS: AdminUser[] = [
  {
    id: 'usr-tech-01',
    name: 'Kwame Mensah',
    email: 'admin.tech@philmen.shop',
    role: 'Technical Administrator',
    status: 'Active',
    lastLogin: '2026-03-27T07:45:00.000Z'
  },
  {
    id: 'usr-owner-01',
    name: 'Philomena Asante',
    email: 'philmen.official@gmail.com',
    role: 'Manager/Owner',
    status: 'Active',
    lastLogin: '2026-03-27T08:00:00.000Z'
  },
  {
    id: 'usr-editor-01',
    name: 'Emmanuel Osei',
    email: 'emmanuel.editor@philmen.shop',
    role: 'Editor',
    status: 'Active',
    lastLogin: '2026-03-26T16:15:00.000Z'
  }
];

const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'INQ-1001',
    customerName: 'Kofi Annan Jr.',
    customerPhone: '0244123456',
    customerEmail: 'kofi.annan@example.com',
    contactMethod: 'Phone',
    preferredDateTime: 'Morning (9:00 AM - 12:00 PM)',
    message: 'Hello Philmen, I would like to reserve the Toyota Land Cruiser Prado for an executive airport pickup this weekend. Please confirm availability.',
    listingId: 'PH-CR-001',
    listingName: 'Toyota Land Cruiser Prado VXR (Chauffeur-Driven Executive Rental)',
    listingUrl: 'https://www.philmen.shop/listing/toyota-land-cruiser-prado-executive-rental',
    listingType: 'Service',
    category: 'Car Rental',
    date: '2026-03-26',
    time: '14:25',
    status: 'New',
    createdAt: '2026-03-26T14:25:00.000Z'
  },
  {
    id: 'INQ-1002',
    customerName: 'Nana Yaa Boateng',
    customerPhone: '0501987654',
    customerEmail: 'yaa.boateng@example.com',
    contactMethod: 'WhatsApp',
    preferredDateTime: 'Anytime during working hours',
    message: 'Good day Philmen, I want to confirm if the 2022 Toyota Corolla is still available for physical inspection at your showroom.',
    listingId: 'PH-CS-001',
    listingName: 'Toyota Corolla LE 2022 (Foreign Used / Immaculate Condition)',
    listingUrl: 'https://www.philmen.shop/listing/toyota-corolla-le-2022-foreign-used',
    listingType: 'Product',
    category: 'Car Sales',
    date: '2026-03-26',
    time: '10:15',
    status: 'Contacted',
    internalNotes: 'Contacted on WhatsApp. Scheduled test drive for Friday 11am.',
    createdAt: '2026-03-26T10:15:00.000Z'
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

const CANONICAL_CATEGORIES = new Set([
  'Car Rental',
  'Car Sales',
  'Electronics, Electricals & Home Appliances'
]);

const normalizeCategory = (cat: string): string => {
  if (cat === 'Car Rentals') return 'Car Rental';
  if (cat === 'Electronic & Electricals' || cat === 'Electronics & Electricals' || cat === 'Electronics') {
    return 'Electronics, Electricals & Home Appliances';
  }
  return cat;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [listings, setListings] = useState<Listing[]>(() => {
    try {
      const saved = localStorage.getItem('philmen_listings');
      if (saved) {
        const parsed: Listing[] = JSON.parse(saved);
        const initialMap = new Map(INITIAL_LISTINGS.map(item => [item.id, item]));
        
        // Filter out any listings from removed categories, normalize names and sync official listings
        const updatedParsed = parsed
          .map(item => {
            const initialMatch = initialMap.get(item.id);
            if (initialMatch) {
              return {
                ...item,
                category: initialMatch.category,
                images: initialMatch.images
              };
            }
            return {
              ...item,
              category: normalizeCategory(item.category)
            };
          })
          .filter(item => CANONICAL_CATEGORIES.has(item.category));

        const existingIds = new Set(updatedParsed.map(item => item.id));
        const missingInitial = INITIAL_LISTINGS.filter(item => !existingIds.has(item.id));
        if (missingInitial.length > 0) {
          return [...updatedParsed, ...missingInitial];
        }
        return updatedParsed.length > 0 ? updatedParsed : INITIAL_LISTINGS;
      }
      return INITIAL_LISTINGS;
    } catch {
      return INITIAL_LISTINGS;
    }
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    try {
      const saved = localStorage.getItem('philmen_inquiries');
      return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
    } catch {
      return INITIAL_INQUIRIES;
    }
  });

  const [contactInteractions, setContactInteractions] = useState<ContactInteraction[]>(() => {
    try {
      const saved = localStorage.getItem('philmen_interactions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [contactSettings, setContactSettings] = useState<ContactSettings>(() => {
    try {
      const saved = localStorage.getItem('philmen_contact_settings');
      return saved ? JSON.parse(saved) : DEFAULT_CONTACT_SETTINGS;
    } catch {
      return DEFAULT_CONTACT_SETTINGS;
    }
  });

  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(() => {
    try {
      const saved = localStorage.getItem('philmen_admin_users');
      return saved ? JSON.parse(saved) : DEFAULT_ADMIN_USERS;
    } catch {
      return DEFAULT_ADMIN_USERS;
    }
  });

  const [currentAdminUser, setCurrentAdminUser] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem('philmen_current_admin');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [activeInquiryNotification, setActiveInquiryNotification] = useState<Inquiry | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('philmen_listings', JSON.stringify(listings));
    } catch (e) {
      console.error(e);
    }
  }, [listings]);

  useEffect(() => {
    try {
      localStorage.setItem('philmen_inquiries', JSON.stringify(inquiries));
    } catch (e) {
      console.error(e);
    }
  }, [inquiries]);

  useEffect(() => {
    try {
      localStorage.setItem('philmen_interactions', JSON.stringify(contactInteractions));
    } catch (e) {
      console.error(e);
    }
  }, [contactInteractions]);

  useEffect(() => {
    try {
      localStorage.setItem('philmen_contact_settings', JSON.stringify(contactSettings));
    } catch (e) {
      console.error(e);
    }
  }, [contactSettings]);

  useEffect(() => {
    try {
      localStorage.setItem('philmen_admin_users', JSON.stringify(adminUsers));
    } catch (e) {
      console.error(e);
    }
  }, [adminUsers]);

  useEffect(() => {
    try {
      if (currentAdminUser) {
        localStorage.setItem('philmen_current_admin', JSON.stringify(currentAdminUser));
      } else {
        localStorage.removeItem('philmen_current_admin');
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentAdminUser]);

  // Actions
  const addListing = (newListingData: Omit<Listing, 'id' | 'createdAt' | 'updatedAt'>): Listing => {
    const newId = `PH-${Date.now().toString().slice(-6)}`;
    const now = new Date().toISOString();
    const newListing: Listing = {
      ...newListingData,
      id: newId,
      createdAt: now,
      updatedAt: now
    };
    setListings(prev => [newListing, ...prev]);
    return newListing;
  };

  const updateListing = (id: string, updates: Partial<Listing>) => {
    setListings(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updates, updatedAt: new Date().toISOString() } : item))
    );
  };

  const deleteListing = (id: string) => {
    setListings(prev => prev.filter(item => item.id !== id));
  };

  const toggleListingStatus = (id: string) => {
    setListings(prev =>
      prev.map(item => {
        if (item.id === id) {
          const nextStatus = item.status === 'published' ? 'draft' : 'published';
          return { ...item, status: nextStatus, updatedAt: new Date().toISOString() };
        }
        return item;
      })
    );
  };

  const toggleFeatured = (id: string) => {
    setListings(prev =>
      prev.map(item => (item.id === id ? { ...item, featured: !item.featured, updatedAt: new Date().toISOString() } : item))
    );
  };

  const submitInquiry = (data: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    contactMethod: PreferredContactMethod;
    preferredDateTime?: string;
    message: string;
    listing: Listing;
  }): Inquiry => {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    const inqId = `INQ-${Math.floor(1000 + Math.random() * 9000)}`;

    const newInquiry: Inquiry = {
      id: inqId,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerEmail: data.customerEmail,
      contactMethod: data.contactMethod,
      preferredDateTime: data.preferredDateTime || undefined,
      message: data.message,
      listingId: data.listing.id,
      listingName: data.listing.title,
      listingUrl: `https://${contactSettings.website}/listing/${data.listing.slug}`,
      listingType: data.listing.type,
      category: data.listing.category,
      date: dateStr,
      time: timeStr,
      status: 'New',
      createdAt: now.toISOString()
    };

    setInquiries(prev => [newInquiry, ...prev]);
    setActiveInquiryNotification(newInquiry);
    return newInquiry;
  };

  const updateInquiryStatus = (id: string, status: InquiryStatus, internalNotes?: string) => {
    setInquiries(prev =>
      prev.map(inq => {
        if (inq.id === id) {
          return {
            ...inq,
            status,
            ...(internalNotes !== undefined ? { internalNotes } : {})
          };
        }
        return inq;
      })
    );
  };

  const dismissInquiryNotification = () => {
    setActiveInquiryNotification(null);
  };

  const recordContactInteraction = (type: 'call' | 'whatsapp', listing: Listing) => {
    const newInteraction: ContactInteraction = {
      id: `act-${Date.now()}`,
      type,
      listingId: listing.id,
      listingTitle: listing.title,
      category: listing.category,
      listingUrl: `https://${contactSettings.website}/listing/${listing.slug}`,
      timestamp: new Date().toISOString()
    };
    setContactInteractions(prev => [newInteraction, ...prev.slice(0, 99)]);
  };

  const updateContactSettings = (updates: Partial<ContactSettings>) => {
    setContactSettings(prev => ({ ...prev, ...updates }));
  };

  const addAdminUser = (user: Omit<AdminUser, 'id'>) => {
    const newUser: AdminUser = {
      ...user,
      id: `usr-${Date.now().toString().slice(-6)}`
    };
    setAdminUsers(prev => [...prev, newUser]);
  };

  const updateAdminUser = (id: string, updates: Partial<AdminUser>) => {
    setAdminUsers(prev => prev.map(u => (u.id === id ? { ...u, ...updates } : u)));
    if (currentAdminUser?.id === id) {
      setCurrentAdminUser(prev => (prev ? { ...prev, ...updates } : null));
    }
  };

  const deleteAdminUser = (id: string) => {
    setAdminUsers(prev => prev.filter(u => u.id !== id));
  };

  const loginAs = (role: AdminRole) => {
    const user = adminUsers.find(u => u.role === role) || {
      id: `usr-demo-${role.toLowerCase().replace(/\s+/g, '-')}`,
      name: role,
      email: `${role.toLowerCase().replace(/[^a-z]/g, '')}@philmen.shop`,
      role,
      status: 'Active',
      lastLogin: new Date().toISOString()
    };
    setCurrentAdminUser(user);
  };

  const logoutAdmin = () => {
    setCurrentAdminUser(null);
  };

  const resetToSampleData = () => {
    setListings(INITIAL_LISTINGS);
    setInquiries(INITIAL_INQUIRIES);
    setContactSettings(DEFAULT_CONTACT_SETTINGS);
    setAdminUsers(DEFAULT_ADMIN_USERS);
    setContactInteractions([]);
    localStorage.removeItem('philmen_listings');
    localStorage.removeItem('philmen_inquiries');
    localStorage.removeItem('philmen_interactions');
    localStorage.removeItem('philmen_contact_settings');
    localStorage.removeItem('philmen_admin_users');
  };

  return (
    <AppContext.Provider
      value={{
        listings,
        inquiries,
        contactInteractions,
        contactSettings,
        adminUsers,
        currentAdminUser,
        activeInquiryNotification,
        addListing,
        updateListing,
        deleteListing,
        toggleListingStatus,
        toggleFeatured,
        submitInquiry,
        updateInquiryStatus,
        dismissInquiryNotification,
        recordContactInteraction,
        updateContactSettings,
        addAdminUser,
        updateAdminUser,
        deleteAdminUser,
        loginAs,
        logoutAdmin,
        resetToSampleData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
