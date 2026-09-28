import { CategoryInfo } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'cat-electronics',
    name: 'Electronic & Electricals',
    slug: 'electronic-and-electricals',
    description: 'High-performance air conditioners, certified gas cylinders, refrigerators, and essential home & office electrical appliances.',
    subcategories: ['Air Conditioners', 'Gas Cylinders', 'Fridges'],
    icon: 'Tv',
    image: 'https://i.ibb.co/TqWh7mdB/001-Samsung-Double-Fridge.jpg'
  },
  {
    id: 'cat-furniture',
    name: 'Furniture',
    slug: 'furniture',
    description: 'Contemporary living room sets, ergonomic executive office furniture, handcrafted dining tables, and luxury bedroom furnishings.',
    subcategories: ['Living Room', 'Office Furniture', 'Bedroom Sets', 'Dining Sets'],
    icon: 'Armchair',
    image: 'https://i.ibb.co/mfy9MFG/002-Milano-Sofa.jpg'
  },
  {
    id: 'cat-heavy-equipment',
    name: 'Construction & Heavy Equipment',
    slug: 'construction-and-heavy-equipment',
    description: 'Certified excavators, wheel loaders, backhoes, site cranes, and heavy roadworks machinery available for project deployment.',
    subcategories: ['Excavators', 'Loaders & Backhoes', 'Cranes', 'Compaction Equipment'],
    icon: 'HardHat',
    image: 'https://i.ibb.co/HLNyjGzj/003-CAT-Excavator.jpg'
  },
  {
    id: 'cat-phones',
    name: 'Phones',
    slug: 'phones',
    description: 'Flagship smartphones, durable business handsets, 5G devices, and genuine mobile communication hardware.',
    subcategories: ['iOS Smartphones', 'Android Flagships', 'Budget & Utility Handsets'],
    icon: 'Smartphone',
    image: 'https://i.ibb.co/NgyJTs13/004-Iphone-16-Pro-Max.jpg'
  },
  {
    id: 'cat-laptops',
    name: 'Laptops',
    slug: 'laptops',
    description: 'High-spec workstation laptops, ultrabooks for executives, developer notebooks, and enterprise computing hardware.',
    subcategories: ['Executive Ultrabooks', 'Developer Workstations', 'Budget Productivity'],
    icon: 'Laptop',
    image: 'https://i.ibb.co/4vPJNXR/012-Dell-XPS-15-9530.jpg'
  },
  {
    id: 'cat-real-estate',
    name: 'Real Estate',
    slug: 'real-estate',
    description: 'Prime commercial spaces, executive office developments, residential plots, and titled investment properties across Ghana.',
    subcategories: ['Commercial Property', 'Residential Land & Plots', 'Luxury Estates'],
    icon: 'Building2',
    image: 'https://i.ibb.co/9mYCqMbD/005-Land-for-Development.jpg'
  },
  {
    id: 'cat-car-sales',
    name: 'Car Sales',
    slug: 'car-sales',
    description: 'Vetted registered and unregistered sedans, luxury SUVs, commercial pickup trucks, and executive vehicles for outright purchase.',
    subcategories: ['Sedans', 'SUVs & 4x4', 'Commercial Pickups', 'Luxury Vehicles'],
    icon: 'Car',
    image: 'https://i.ibb.co/9mYCqMbD/005-Land-for-Development.jpg'
  },
  {
    id: 'cat-car-rentals',
    name: 'Car Rentals',
    slug: 'car-rentals',
    description: 'Chauffeur-driven executive VIP sedans, airport transfers, self-drive 4x4s, and corporate fleet rentals for short and long-term lease.',
    subcategories: ['Daily Rental', 'Airport Transfer', 'Corporate Lease', 'VIP Escort'],
    icon: 'Key',
    image: 'https://i.ibb.co/fzY197WN/006-Toyota-Corolla-LE-2022.jpg'
  },
  {
    id: 'cat-home-rentals',
    name: 'Home Rentals',
    slug: 'home-rentals',
    description: 'Furnished executive apartments, gated community townhouses, 2-to-4 bedroom family houses for short and long-term rental.',
    subcategories: ['Furnished Apartments', 'Gated Townhouses', 'Short-let Stays', 'Family Homes'],
    icon: 'Home',
    image: 'https://i.ibb.co/6cXmtvS1/008-2-Bedroom-Luxury-Apartment.jpg'
  },
  {
    id: 'cat-towing',
    name: 'Towing',
    slug: 'towing',
    description: '24/7 rapid vehicle towing, flatbed breakdown recovery, heavy-duty truck towing, and interstate vehicle transport services.',
    subcategories: ['Flatbed Towing', 'Heavy-Duty Recovery', 'Breakdown Assistance', 'Intercity Haulage'],
    icon: 'Truck',
    image: 'https://i.ibb.co/HLNyjGzj/003-CAT-Excavator.jpg'
  },
  {
    id: 'cat-building-materials',
    name: 'Building Material Supply',
    slug: 'building-material-supply',
    description: 'High-grade Portland cement, reinforcement iron rods, quarry stones, sharp sand, roofing sheets, and structural construction supplies.',
    subcategories: ['Iron Rods & Steel', 'Cement & Aggregates', 'Roofing & Timber', 'Plumbing & Electrical'],
    icon: 'Layers',
    image: 'https://i.ibb.co/HLNyjGzj/003-CAT-Excavator.jpg'
  },
  {
    id: 'cat-perfume',
    name: 'Perfume',
    slug: 'perfume',
    description: 'Authentic designer perfumes, artisanal Arabian oud, long-lasting niche fragrances, and luxury scent collections.',
    subcategories: ['Men Fragrances', 'Women Fragrances', 'Unisex & Niche Oud', 'Gift Sets'],
    icon: 'Sparkles',
    image: 'https://i.ibb.co/PBqbMCN/013-Suite.jpg'
  },
  {
    id: 'cat-suits',
    name: 'Suits',
    slug: 'suits',
    description: 'Bespoke tailored two-piece and three-piece men suits, executive blazers, tuxedos, and premium formal wear for corporate and wedding occasions.',
    subcategories: ['Three-Piece Suits', 'Corporate Two-Piece', 'Tuxedos & Wedding', 'Blazers & Trousers'],
    icon: 'Shirt',
    image: 'https://i.ibb.co/PBqbMCN/013-Suite.jpg'
  }
];

export const getCategoryBySlug = (slug: string): CategoryInfo | undefined => {
  return CATEGORIES.find(c => c.slug === slug);
};

export const getCategoryByName = (name: string): CategoryInfo | undefined => {
  return CATEGORIES.find(c => c.name.toLowerCase() === name.toLowerCase());
};
