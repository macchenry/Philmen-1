import { CategoryInfo } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'cat-electronics',
    name: 'Electronic & Electricals',
    slug: 'electronic-and-electricals',
    description: 'High-performance air conditioners, certified gas cylinders, refrigerators, and essential home & office electrical appliances.',
    subcategories: ['Air Conditioners', 'Gas Cylinders', 'Fridges'],
    icon: 'Tv',
    image: '/src/assets/images/product_samsung_fridge_1790521460343.jpg'
  },
  {
    id: 'cat-furniture',
    name: 'Furniture',
    slug: 'furniture',
    description: 'Contemporary living room sets, ergonomic executive office furniture, handcrafted dining tables, and luxury bedroom furnishings.',
    subcategories: ['Living Room', 'Office Furniture', 'Bedroom Sets', 'Dining Sets'],
    icon: 'Armchair',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cat-heavy-equipment',
    name: 'Construction & Heavy Equipment',
    slug: 'construction-and-heavy-equipment',
    description: 'Certified excavators, wheel loaders, backhoes, site cranes, and heavy roadworks machinery available for project deployment.',
    subcategories: ['Excavators', 'Loaders & Backhoes', 'Cranes', 'Compaction Equipment'],
    icon: 'HardHat',
    image: '/src/assets/images/service_heavy_excavator_1790521493704.jpg'
  },
  {
    id: 'cat-phones',
    name: 'Phones',
    slug: 'phones',
    description: 'Flagship smartphones, durable business handsets, 5G devices, and genuine mobile communication hardware.',
    subcategories: ['iOS Smartphones', 'Android Flagships', 'Budget & Utility Handsets'],
    icon: 'Smartphone',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cat-laptops',
    name: 'Laptops',
    slug: 'laptops',
    description: 'High-spec workstation laptops, ultrabooks for executives, developer notebooks, and enterprise computing hardware.',
    subcategories: ['Executive Ultrabooks', 'Developer Workstations', 'Budget Productivity'],
    icon: 'Laptop',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cat-real-estate',
    name: 'Real Estate',
    slug: 'real-estate',
    description: 'Prime commercial spaces, executive office developments, residential plots, and titled investment properties across Ghana.',
    subcategories: ['Commercial Property', 'Residential Land & Plots', 'Luxury Estates'],
    icon: 'Building2',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cat-car-sales',
    name: 'Car Sales',
    slug: 'car-sales',
    description: 'Vetted registered and unregistered sedans, luxury SUVs, commercial pickup trucks, and executive vehicles for outright purchase.',
    subcategories: ['Sedans', 'SUVs & 4x4', 'Commercial Pickups', 'Luxury Vehicles'],
    icon: 'Car',
    image: '/src/assets/images/product_toyota_corolla_1790521470974.jpg'
  },
  {
    id: 'cat-car-rentals',
    name: 'Car Rentals',
    slug: 'car-rentals',
    description: 'Chauffeur-driven executive VIP sedans, airport transfers, self-drive 4x4s, and corporate fleet rentals for short and long-term lease.',
    subcategories: ['Daily Rental', 'Airport Transfer', 'Corporate Lease', 'VIP Escort'],
    icon: 'Key',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cat-home-rentals',
    name: 'Home Rentals',
    slug: 'home-rentals',
    description: 'Furnished executive apartments, gated community townhouses, 2-to-4 bedroom family houses for short and long-term rental.',
    subcategories: ['Furnished Apartments', 'Gated Townhouses', 'Short-let Stays', 'Family Homes'],
    icon: 'Home',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cat-towing',
    name: 'Towing',
    slug: 'towing',
    description: '24/7 rapid vehicle towing, flatbed breakdown recovery, heavy-duty truck towing, and interstate vehicle transport services.',
    subcategories: ['Flatbed Towing', 'Heavy-Duty Recovery', 'Breakdown Assistance', 'Intercity Haulage'],
    icon: 'Truck',
    image: 'https://images.unsplash.com/photo-1586191582056-a6c8e3170425?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cat-building-materials',
    name: 'Building Material Supply',
    slug: 'building-material-supply',
    description: 'High-grade Portland cement, reinforcement iron rods, quarry stones, sharp sand, roofing sheets, and structural construction supplies.',
    subcategories: ['Iron Rods & Steel', 'Cement & Aggregates', 'Roofing & Timber', 'Plumbing & Electrical'],
    icon: 'Layers',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cat-perfume',
    name: 'Perfume',
    slug: 'perfume',
    description: 'Authentic designer perfumes, artisanal Arabian oud, long-lasting niche fragrances, and luxury scent collections.',
    subcategories: ['Men Fragrances', 'Women Fragrances', 'Unisex & Niche Oud', 'Gift Sets'],
    icon: 'Sparkles',
    image: '/src/assets/images/product_luxury_perfume_1790521482404.jpg'
  },
  {
    id: 'cat-suits',
    name: 'Suits',
    slug: 'suits',
    description: 'Bespoke tailored two-piece and three-piece men suits, executive blazers, tuxedos, and premium formal wear for corporate and wedding occasions.',
    subcategories: ['Three-Piece Suits', 'Corporate Two-Piece', 'Tuxedos & Wedding', 'Blazers & Trousers'],
    icon: 'Shirt',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80'
  }
];

export const getCategoryBySlug = (slug: string): CategoryInfo | undefined => {
  return CATEGORIES.find(c => c.slug === slug);
};

export const getCategoryByName = (name: string): CategoryInfo | undefined => {
  return CATEGORIES.find(c => c.name.toLowerCase() === name.toLowerCase());
};
