import { CategoryInfo } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'cat-car-rentals',
    name: 'Car Rental',
    slug: 'car-rental',
    description: 'Chauffeur-driven executive VIP sedans, luxury 4x4 SUVs, airport transfers, and corporate fleet rentals for short and long-term lease.',
    subcategories: ['Daily Rental', 'Airport Transfer', 'Corporate Lease', 'VIP Escort'],
    icon: 'Key',
    image: 'https://i.ibb.co/fzY197WN/006-Toyota-Corolla-LE-2022.jpg'
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
    id: 'cat-electronics',
    name: 'Electronics, Electricals & Home Appliances',
    slug: 'electronics-electricals-and-home-appliances',
    description: 'High-performance inverter air conditioners, certified safety gas cylinders, double-door refrigerators, and essential home & office electrical appliances.',
    subcategories: ['Air Conditioners', 'Gas Cylinders', 'Fridges & Freezers', 'Home Appliances'],
    icon: 'Tv',
    image: 'https://i.ibb.co/TqWh7mdB/001-Samsung-Double-Fridge.jpg'
  }
];

export const getCategoryBySlug = (slug: string): CategoryInfo | undefined => {
  const normalized = slug.toLowerCase().trim();
  if (normalized === 'car-rental' || normalized === 'car-rentals') {
    return CATEGORIES.find(c => c.id === 'cat-car-rentals');
  }
  if (normalized === 'car-sales' || normalized === 'car-sale') {
    return CATEGORIES.find(c => c.id === 'cat-car-sales');
  }
  if (
    normalized === 'electronics-electricals-and-home-appliances' ||
    normalized === 'electronic-and-electricals' ||
    normalized === 'electronics' ||
    normalized === 'electricals'
  ) {
    return CATEGORIES.find(c => c.id === 'cat-electronics');
  }
  return CATEGORIES.find(c => c.slug === normalized);
};

export const getCategoryByName = (name: string): CategoryInfo | undefined => {
  const normalized = name.toLowerCase().trim();
  if (normalized.includes('rental')) return CATEGORIES.find(c => c.id === 'cat-car-rentals');
  if (normalized.includes('car sale') || normalized.includes('sales')) return CATEGORIES.find(c => c.id === 'cat-car-sales');
  if (normalized.includes('electronic') || normalized.includes('appliance')) return CATEGORIES.find(c => c.id === 'cat-electronics');
  return CATEGORIES.find(c => c.name.toLowerCase() === normalized);
};
