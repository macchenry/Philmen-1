import { Listing } from '../types';

export const INITIAL_LISTINGS: Listing[] = [
  // 1. Car Rental
  {
    id: 'PH-CR-001',
    title: 'Toyota Land Cruiser Prado VXR (Chauffeur-Driven Executive Rental)',
    slug: 'toyota-land-cruiser-prado-executive-rental',
    type: 'Service',
    category: 'Car Rental',
    subcategory: 'Daily Rental',
    shortDescription: 'Luxury 4x4 Land Cruiser Prado with professional suit-clad chauffeur for executive delegations, weddings, VIP airport pickup, and regional trips.',
    fullDescription: 'Enjoy smooth, secure, and prestigious transport with Philmen executive car rental services. Our top-spec Toyota Land Cruiser Prado VXR includes a seasoned, professional English-speaking chauffeur, in-car Wi-Fi, bottled mineral water, and full comprehensive insurance. Available for daily hire within Greater Accra or intercity deployment to Kumasi, Takoradi, and Tamale.',
    images: [
      'https://i.ibb.co/fzY197WN/006-Toyota-Corolla-LE-2022.jpg',
      'https://i.ibb.co/Gv8vXdQR/007-Toyota-Land-Cruiser.jpg'
    ],
    price: 1800,
    priceType: 'rental',
    priceDisplay: 'GH₵ 1,800 / Day',
    location: 'Airport City, Accra & Nationwide',
    status: 'published',
    featured: true,
    isSampleData: true,
    specifications: {
      'Capacity': '7 Passengers',
      'Chauffeur': 'Included (Professional & Vetted)',
      'Daily Hours': '12 Hours (7:00 AM – 7:00 PM standard)',
      'Fuel Policy': 'Client provides fuel according to journey',
      'Insurance': 'Comprehensive Fleet Coverage'
    },
    createdAt: '2026-03-09T13:00:00.000Z',
    updatedAt: '2026-03-23T11:20:00.000Z'
  },

  // 2. Car Sales
  {
    id: 'PH-CS-001',
    title: 'Toyota Corolla LE 2022 (Foreign Used / Immaculate Condition)',
    slug: 'toyota-corolla-le-2022-foreign-used',
    type: 'Product',
    category: 'Car Sales',
    subcategory: 'Sedans',
    shortDescription: 'Direct foreign-used 2022 Toyota Corolla LE with 1.8L fuel-efficient engine, lane departure assist, reverse camera, and 34,000 km.',
    fullDescription: 'Unregistered clean foreign-used 2022 Toyota Corolla LE. Finished in pearl white with pristine dark charcoal fabric interior. Key features include Toyota Safety Sense 2.0 with pre-collision detection, adaptive cruise control, Apple CarPlay/Android Auto touch screen, keyless entry, and ice-cold factory AC. Full customs clearance documentation available.',
    images: [
      'https://i.ibb.co/9mYCqMbD/005-Land-for-Development.jpg'
    ],
    price: 215000,
    priceType: 'exact',
    priceDisplay: 'GH₵ 215,000',
    location: 'Achimota Mile 7, Accra',
    status: 'published',
    featured: true,
    isSampleData: true,
    specifications: {
      'Year': '2022',
      'Mileage': '34,200 km',
      'Engine': '1.8L 4-Cylinder DOHC 16-Valve',
      'Transmission': 'CVT Automatic',
      'Fuel Type': 'Petrol',
      'Drive Type': 'Front Wheel Drive (FWD)'
    },
    createdAt: '2026-03-08T10:00:00.000Z',
    updatedAt: '2026-03-24T12:00:00.000Z'
  },

  // 3. Electronics, Electricals & Home Appliances - Fridges
  {
    id: 'PH-EL-001',
    title: 'Samsung 535L Inverter Double Door Refrigerator',
    slug: 'samsung-535l-inverter-double-door-refrigerator',
    type: 'Product',
    category: 'Electronics, Electricals & Home Appliances',
    subcategory: 'Fridges & Freezers',
    shortDescription: 'Energy-saving digital inverter Samsung double door refrigerator with multi-airflow cooling and frost-free technology.',
    fullDescription: 'Experience superior cooling and long-lasting freshness with the Samsung 535L Inverter Double Door Refrigerator. Engineered with smart digital inverter compressor technology, it reduces energy consumption by up to 40% while maintaining optimum humidity for fruits and vegetables. Includes power-cool and power-freeze modes, tempered glass shelves, anti-bacterial seal, and modern stainless steel finish.',
    images: [
      'https://i.ibb.co/TqWh7mdB/001-Samsung-Double-Fridge.jpg'
    ],
    price: 8500,
    priceType: 'exact',
    priceDisplay: 'GH₵ 8,500',
    location: 'Spintex Road, Accra',
    status: 'published',
    featured: true,
    isSampleData: true,
    specifications: {
      'Capacity': '535 Liters',
      'Compressor': 'Digital Inverter (10-Year Warranty)',
      'Cooling Type': 'All-Around Multi Air Flow',
      'Energy Rating': 'A+++ Efficiency',
      'Finish': 'Refined Stainless Steel',
      'Dimensions': '1785 x 790 x 720 mm'
    },
    createdAt: '2026-03-10T10:00:00.000Z',
    updatedAt: '2026-03-20T14:30:00.000Z'
  },

  // 3. Electronics, Electricals & Home Appliances - Air Conditioners
  {
    id: 'PH-EL-002',
    title: 'Gree 2.0 HP R32 Eco Inverter Split Air Conditioner',
    slug: 'gree-2hp-eco-inverter-split-air-conditioner',
    type: 'Product',
    category: 'Electronics, Electricals & Home Appliances',
    subcategory: 'Air Conditioners',
    shortDescription: 'Ultra-quiet 2.0HP Gree energy-efficient split unit air conditioner with rapid turbo cooling and I-Feel intelligent sensor.',
    fullDescription: 'The Gree 2.0 HP Eco Inverter Air Conditioner is designed specifically for tropical climates, delivering rapid, quiet cooling while cutting electricity usage. Equipped with high-density gold fin anti-corrosion protection, smart self-cleaning, and intelligent temperature sensing via the remote control. Complete with official Philmen warranty coverage.',
    images: [
      'https://i.ibb.co/4wJ7S3V9/014-Sigma-Airconditioner.jpg'
    ],
    price: 4950,
    priceType: 'exact',
    priceDisplay: 'GH₵ 4,950',
    location: 'Airport Residential, Accra',
    status: 'published',
    featured: false,
    isSampleData: true,
    specifications: {
      'Capacity': '2.0 Horsepower (18,000 BTU)',
      'Refrigerant': 'Eco-Friendly R32',
      'Condenser': '100% Pure Copper with Gold Fin',
      'Special Features': 'Turbo Cooling, Sleep Mode, Self-Clean'
    },
    createdAt: '2026-03-12T11:20:00.000Z',
    updatedAt: '2026-03-22T09:15:00.000Z'
  },

  // 3. Electronics, Electricals & Home Appliances - Gas Cylinders
  {
    id: 'PH-EL-003',
    title: 'Certified 14.5kg Composite Safety Gas Cylinder with Low-Pressure Regulator',
    slug: 'certified-14kg-composite-safety-gas-cylinder',
    type: 'Product',
    category: 'Electronics, Electricals & Home Appliances',
    subcategory: 'Gas Cylinders',
    shortDescription: 'Lightweight, explosion-proof translucent composite LPG gas cylinder with anti-leak automatic safety shut-off regulator.',
    fullDescription: 'Upgrade your home cooking safety with this certified 14.5kg translucent composite LPG cylinder. Unlike heavy steel cylinders, it is 100% rust-free, lightweight, explosion-proof under extreme heat, and lets you visually inspect gas levels at any time. Comes bundled with an EU-standard high-precision pressure regulator and reinforced safety hose.',
    images: [
      'https://i.ibb.co/Swwp6nMM/011-Gas-Cylinder.jpg'
    ],
    price: 980,
    priceType: 'exact',
    priceDisplay: 'GH₵ 980',
    location: 'Tema Community 1, Greater Accra',
    status: 'published',
    featured: false,
    isSampleData: true,
    specifications: {
      'Capacity': '14.5 kg LPG',
      'Material': 'High-tensile Fiberglass Composite',
      'Safety Standard': 'ISO 11119-3 & EN 12245 Certified',
      'Included': 'Auto shut-off brass regulator & 1.5m reinforced hose'
    },
    createdAt: '2026-03-14T08:45:00.000Z',
    updatedAt: '2026-03-14T08:45:00.000Z'
  },
  {
    id: 'PH-EL-004',
    title: '50kg Heavy-Duty Industrial Steel LPG Gas Cylinder (GSA Certified)',
    slug: '50kg-heavy-duty-industrial-steel-lpg-gas-cylinder',
    type: 'Product',
    category: 'Electronics, Electricals & Home Appliances',
    subcategory: 'Gas Cylinders',
    shortDescription: 'Heavy-gauge reinforced 50kg industrial LPG gas cylinder with high-flow brass valve for hotels, bakeries, restaurants, and catering outfits.',
    fullDescription: 'Engineered for high-capacity catering and industrial applications in Ghana. Built with 3.5mm thick high-tensile HP295 steel, hot-dip galvanized anti-corrosive base ring, and Ghana Standards Authority (GSA) certified brass safety valve with built-in pressure release. Ideal for commercial kitchens, schools, food processing factories, and restaurants across Accra and nationwide.',
    images: [
      'https://i.ibb.co/svzqxf7d/009-Gas-Cylinder-1.jpg'
    ],
    price: 1850,
    priceType: 'exact',
    priceDisplay: 'GH₵ 1,850',
    location: 'North Industrial Area, Accra',
    status: 'published',
    featured: true,
    isSampleData: true,
    specifications: {
      'Capacity': '50 kg LPG (108 Liters Water Volume)',
      'Material': 'HP295 Heavy-Gauge Cold-Rolled Steel (3.5mm)',
      'Safety Standard': 'Ghana Standards Authority & NPA Certified',
      'Test Pressure': '34 Bar (3.4 MPa) Hydrostatic Verified',
      'Valve': 'Heavy-duty brass industrial valve with safety relief',
      'Applications': 'Hotels, Bakeries, Restaurants & Industrial Processing'
    },
    createdAt: '2026-03-17T09:30:00.000Z',
    updatedAt: '2026-03-24T15:00:00.000Z'
  },
  {
    id: 'PH-EL-005',
    title: '6kg Compact Domestic Steel Gas Cylinder with Heavy-Duty Cooker Burner Top',
    slug: '6kg-compact-domestic-steel-gas-cylinder-with-burner',
    type: 'Product',
    category: 'Electronics, Electricals & Home Appliances',
    subcategory: 'Gas Cylinders',
    shortDescription: 'Portable 6kg steel LPG cylinder with direct screw-on cast iron burner and safety handle, ideal for apartments, single homes, and student hostels.',
    fullDescription: 'Convenient, economical, and space-saving 6kg domestic LPG cylinder with direct screw-on cast iron cooker top. Built from seam-welded high-density steel with anti-rust baked enamel coating. Features an integrated carry handle, broad stable base ring, and leak-tested brass valve. Perfect for studio apartments, student residences in Legon/KNUST/UCC, and emergency home backup cooking.',
    images: [
      'https://i.ibb.co/VWSrxwQh/010-Gas-Cylinder-2.jpg'
    ],
    price: 420,
    priceType: 'exact',
    priceDisplay: 'GH₵ 420',
    location: 'Madina / Legon, Greater Accra',
    status: 'published',
    featured: false,
    isSampleData: true,
    specifications: {
      'Capacity': '6 kg LPG',
      'Construction': 'Deep-drawn stamped steel with protective anti-rust coat',
      'Included': 'Cast iron screw-on burner top & stability stand',
      'Safety Standard': 'GSA Approved & Hydro-Pressure Certified',
      'Tare Weight': '5.8 kg empty',
      'Ideal For': 'Students, Single Households & Quick Domestic Utility'
    },
    createdAt: '2026-03-18T10:15:00.000Z',
    updatedAt: '2026-03-25T08:30:00.000Z'
  },
  {
    id: 'PH-EL-006',
    title: '24.5kg Anti-Explosion Translucent Composite Safety Gas Cylinder with Snap-On Regulator',
    slug: '24kg-anti-explosion-composite-safety-gas-cylinder',
    type: 'Product',
    category: 'Electronics, Electricals & Home Appliances',
    subcategory: 'Gas Cylinders',
    shortDescription: '100% blast-proof translucent 24.5kg composite LPG cylinder with visible fuel-level indicator, rust-free outer casing, and snap-on safety regulator.',
    fullDescription: 'Experience modern safety with this premium 24.5kg composite LPG gas cylinder. Manufactured from three-layer seamless filament-wound fiberglass and aerospace-grade resin, it will never explode even in direct fire conditions. The semi-translucent body allows you to see the exact liquid gas level inside so you never run out during cooking. Includes click-on safety regulator and zero floor rust stains.',
    images: [
      'https://i.ibb.co/svzqxf7d/009-Gas-Cylinder-1.jpg'
    ],
    price: 1350,
    priceType: 'exact',
    priceDisplay: 'GH₵ 1,350',
    location: 'Spintex / Cantonments, Accra',
    status: 'published',
    featured: true,
    isSampleData: true,
    specifications: {
      'Capacity': '24.5 kg LPG',
      'Material': 'High-Tensile Polyethylene & Wound Glass Fiber Composite',
      'Safety Standards': 'EN 14427 / ISO 11119-3 Certified (Blast-Proof)',
      'Tare Weight': 'Only 7.5 kg (50% lighter than equivalent steel)',
      'Regulator Type': 'Quick Snap-On Safety Click Regulator Included',
      'Key Benefits': 'Visible Gas Level, 100% Rust-Proof, Heat & Fire Safe'
    },
    createdAt: '2026-03-19T11:45:00.000Z',
    updatedAt: '2026-03-25T14:20:00.000Z'
  }
];
