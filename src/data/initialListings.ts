import { Listing } from '../types';

export const INITIAL_LISTINGS: Listing[] = [
  // 1. Electronic & Electricals - Fridges
  {
    id: 'PH-EL-001',
    title: 'Samsung 535L Inverter Double Door Refrigerator',
    slug: 'samsung-535l-inverter-double-door-refrigerator',
    type: 'Product',
    category: 'Electronic & Electricals',
    subcategory: 'Fridges',
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
  // 1. Electronic & Electricals - Air Conditioners
  {
    id: 'PH-EL-002',
    title: 'Gree 2.0 HP R32 Eco Inverter Split Air Conditioner',
    slug: 'gree-2hp-eco-inverter-split-air-conditioner',
    type: 'Product',
    category: 'Electronic & Electricals',
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
  // 1. Electronic & Electricals - Gas Cylinders
  {
    id: 'PH-EL-003',
    title: 'Certified 14.5kg Composite Safety Gas Cylinder with Low-Pressure Regulator',
    slug: 'certified-14kg-composite-safety-gas-cylinder',
    type: 'Product',
    category: 'Electronic & Electricals',
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
    category: 'Electronic & Electricals',
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
    category: 'Electronic & Electricals',
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
    category: 'Electronic & Electricals',
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
  },

  // 2. Furniture
  {
    id: 'PH-FN-001',
    title: 'Milano Executive Solid Hardwood L-Shaped Modular Sofa Set',
    slug: 'milano-executive-hardwood-modular-sofa-set',
    type: 'Product',
    category: 'Furniture',
    subcategory: 'Living Room',
    shortDescription: 'Handcrafted premium velvet fabric modular sectional sofa with kiln-dried Ghanaian teak framework and high-density orthopaedic foam.',
    fullDescription: 'The Milano Sectional Sofa combines master craftsmanship with modern minimalist comfort. Built on heavy-gauge Ghanaian teak timber frames, this 6-seater sofa features stain-resistant velvet fabric, pocketed coil spring support, and reinforced joinery. Perfect for spacious executive living rooms and contemporary reception lounges.',
    images: [
      'https://i.ibb.co/mfy9MFG/002-Milano-Sofa.jpg'
    ],
    price: '14,500 - 18,000',
    priceType: 'range',
    priceDisplay: 'GH₵ 14,500 – GH₵ 18,000',
    location: 'East Legon, Accra',
    status: 'published',
    featured: true,
    isSampleData: true,
    specifications: {
      'Configuration': '6-Seater L-Shape with Ottoman',
      'Wood Structure': 'Seasoned Teak Hardwood',
      'Upholstery': 'Stain-Resistant Luxury Velvet',
      'Warranty': '3 Years on Timber Framework'
    },
    createdAt: '2026-03-05T09:00:00.000Z',
    updatedAt: '2026-03-18T16:20:00.000Z'
  },

  // 3. Construction & Heavy Equipment
  {
    id: 'PH-EQ-001',
    title: 'CAT 320D Hydraulic Crawler Excavator (Project Hire & Operator)',
    slug: 'cat-320d-hydraulic-crawler-excavator',
    type: 'Service',
    category: 'Construction & Heavy Equipment',
    subcategory: 'Excavators',
    shortDescription: '20-ton Caterpillar 320D crawler excavator available for site excavation, foundation trenching, and bulk earthmoving with certified operator.',
    fullDescription: 'Philmen coordinates fully-inspected, heavy-duty CAT 320D hydraulic excavators for medium to large construction, drainage, and mining infrastructure projects across Ghana. Equipment is serviced and supplied with an experienced certified plant operator, daily maintenance support, and rapid mobilization anywhere in Greater Accra, Ashanti, and Western regions.',
    images: [
      'https://i.ibb.co/HLNyjGzj/003-CAT-Excavator.jpg'
    ],
    price: 3200,
    priceType: 'service',
    priceDisplay: 'GH₵ 3,200 / Day (Plus Operator)',
    location: 'Heavy Industrial Area, Tema & Nationwide',
    status: 'published',
    featured: true,
    isSampleData: true,
    specifications: {
      'Operating Weight': '21,500 kg',
      'Bucket Capacity': '1.2 m³',
      'Max Digging Depth': '6.72 meters',
      'Fuel Policy': 'Wet or Dry Lease Options Available',
      'Operator': 'Certified Philmen-verified operator included'
    },
    createdAt: '2026-03-01T12:00:00.000Z',
    updatedAt: '2026-03-24T10:10:00.000Z'
  },

  // 4. Phones
  {
    id: 'PH-PH-001',
    title: 'Apple iPhone 16 Pro Max 256GB (Brand New Factory Sealed)',
    slug: 'apple-iphone-16-pro-max-256gb',
    type: 'Product',
    category: 'Phones',
    subcategory: 'iOS Smartphones',
    shortDescription: 'Factory sealed iPhone 16 Pro Max with Grade 5 Titanium chassis, A18 Pro chip, 48MP camera control, and full Apple 1-year warranty.',
    fullDescription: 'Get the latest Apple iPhone 16 Pro Max in Desert Titanium and Natural Titanium. Features a stunning 6.9-inch Super Retina XDR display with ProMotion, A18 Pro bionic chip for peak gaming and productivity, next-generation photographic styles, and all-day battery life. 100% genuine sealed stock verified through Philmen.',
    images: [
      'https://i.ibb.co/NgyJTs13/004-Iphone-16-Pro-Max.jpg'
    ],
    price: 16800,
    priceType: 'exact',
    priceDisplay: 'GH₵ 16,800',
    location: 'Osu Oxford Street, Accra',
    status: 'published',
    featured: true,
    isSampleData: true,
    specifications: {
      'Storage': '256 GB NVMe',
      'Chipset': 'Apple A18 Pro (3nm)',
      'Display': '6.9" OLED 120Hz ProMotion',
      'Camera': '48MP Main + 48MP Ultra-wide + 12MP 5x Telephoto',
      'Warranty': '1 Year Apple Official'
    },
    createdAt: '2026-03-15T09:30:00.000Z',
    updatedAt: '2026-03-25T11:00:00.000Z'
  },

  // 5. Laptops
  {
    id: 'PH-LP-001',
    title: 'Dell XPS 15 9530 Core i9 32GB RAM 1TB SSD RTX 4070 3.5K OLED',
    slug: 'dell-xps-15-9530-core-i9-oled',
    type: 'Product',
    category: 'Laptops',
    subcategory: 'Executive Ultrabooks',
    shortDescription: 'High-performance workstation laptop with 13th Gen Intel Core i9, 32GB DDR5 RAM, 1TB NVMe SSD, and dedicated NVIDIA RTX 4070 graphics.',
    fullDescription: 'Designed for creative professionals, architects, software engineers, and executives. The Dell XPS 15 features CNC machined aluminum, carbon fiber palm rest, a breathtaking 3.5K OLED touch display with 100% DCI-P3 color gamut, and raw computing power for 3D rendering and demanding multitasking.',
    images: [
      'https://i.ibb.co/4vPJNXR/012-Dell-XPS-15-9530.jpg'
    ],
    price: 26500,
    priceType: 'negotiable',
    priceDisplay: 'GH₵ 26,500 (Negotiable)',
    location: 'Ridge Financial District, Accra',
    status: 'published',
    featured: false,
    isSampleData: true,
    specifications: {
      'Processor': 'Intel Core i9-13900H (14 Cores, 20 Threads)',
      'Memory': '32 GB DDR5 4800MHz',
      'Storage': '1 TB PCIe Gen4 M.2 NVMe SSD',
      'Graphics': 'NVIDIA GeForce RTX 4070 8GB GDDR6',
      'Display': '15.6" 3.5K (3456x2160) OLED Touch'
    },
    createdAt: '2026-03-16T14:00:00.000Z',
    updatedAt: '2026-03-20T10:00:00.000Z'
  },

  // 6. Real Estate
  {
    id: 'PH-RE-001',
    title: '4-Plot Titled Commercial Development Land on Main George Walker Bush Motorway',
    slug: '4-plot-titled-commercial-development-land-accra',
    type: 'Product',
    category: 'Real Estate',
    subcategory: 'Commercial Property',
    shortDescription: 'Prime 1.2-acre roadside commercial land with Land Title Certificate (LDC), ideal for corporate headquarters, hotel, or retail complex.',
    fullDescription: 'Strategically located directly along the N1 George Walker Bush Motorway with high vehicular exposure and seamless access to Kotoka International Airport. Land is fully titled, litigation-free, walled, gated, and connected to 3-phase grid power and municipal water pipelines. Direct facilitation through Philmen.',
    images: [
      'https://i.ibb.co/9mYCqMbD/005-Land-for-Development.jpg'
    ],
    price: 'Contact for Price',
    priceType: 'contact',
    priceDisplay: 'Contact for Price',
    location: 'Dzorwulu / N1 Highway, Accra',
    status: 'published',
    featured: true,
    isSampleData: true,
    specifications: {
      'Plot Size': '1.2 Acres (4 Standard Commercial Plots)',
      'Documentation': 'Lands Commission Registered Title (Freehold/Leasehold)',
      'Zoning': 'Mixed Commercial & High-Density Office',
      'Road Frontage': 'Over 85 meters frontage'
    },
    createdAt: '2026-03-02T16:00:00.000Z',
    updatedAt: '2026-03-21T15:45:00.000Z'
  },

  // 7. Car Sales
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

  // 8. Car Rentals
  {
    id: 'PH-CR-001',
    title: 'Toyota Land Cruiser Prado VXR (Chauffeur-Driven Executive Rental)',
    slug: 'toyota-land-cruiser-prado-executive-rental',
    type: 'Service',
    category: 'Car Rentals',
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

  // 9. Home Rentals
  {
    id: 'HM-0001',
    title: 'Luxury 2-Bedroom Furnished Apartment with Pool & 24/7 Security',
    slug: 'luxury-2-bedroom-furnished-apartment-east-legon',
    type: 'Product',
    category: 'Home Rentals',
    subcategory: 'Furnished Apartments',
    shortDescription: 'Modern, fully air-conditioned 2-bedroom en-suite serviced apartment in a gated residential enclave with standby generator and gym.',
    fullDescription: 'Located in the prime residential hub of East Legon, this 2-bedroom executive apartment comes fully furnished with Italian fitted kitchen, washing machine, smart TVs, high-speed fibre internet, private balcony, swimming pool access, and continuous 24-hour manned security with CCTV surveillance. Water supply and automatic standby generator included in rent.',
    images: [
      'https://i.ibb.co/6cXmtvS1/008-2-Bedroom-Luxury-Apartment.jpg'
    ],
    price: 2500,
    priceType: 'rental',
    priceDisplay: '$2,500 / Month (Cedi Equivalent Accepted)',
    location: 'East Legon (Near Mensvic), Accra',
    status: 'published',
    featured: true,
    isSampleData: true,
    specifications: {
      'Bedrooms': '2 En-suite Bedrooms',
      'Bathrooms': '2.5 Bathrooms with Water Heaters',
      'Amenities': 'Swimming Pool, Gym, Backup Generator, Borehole',
      'Lease Term': 'Minimum 3 months / 1 year standard',
      'Service Charge': 'Included in listing price'
    },
    createdAt: '2026-03-04T15:00:00.000Z',
    updatedAt: '2026-03-25T14:15:00.000Z'
  },

  // 10. Towing
  {
    id: 'PH-TW-001',
    title: '24/7 Emergency Hydraulic Flatbed Towing & Vehicle Recovery',
    slug: '24-7-hydraulic-flatbed-towing-recovery',
    type: 'Service',
    category: 'Towing',
    subcategory: 'Flatbed Towing',
    shortDescription: 'Rapid-response hydraulic zero-degree flatbed tow trucks for luxury sedans, SUVs, disabled vehicles, and machinery transport.',
    fullDescription: 'Fast, secure, damage-free vehicle recovery coordinated across Greater Accra and inter-regional highways. Our modern hydraulic slide-bed tow trucks ensure zero bumper scraping for low-clearance sports cars and luxury SUVs. Available 24 hours daily with prompt dispatch and experienced recovery specialists.',
    images: [
      'https://i.ibb.co/HLNyjGzj/003-CAT-Excavator.jpg'
    ],
    price: 650,
    priceType: 'service',
    priceDisplay: 'From GH₵ 650 (Based on Distance)',
    location: 'Accra, Tema, Kasoa & Highway Corridors',
    status: 'published',
    featured: false,
    isSampleData: true,
    specifications: {
      'Response Time': 'Average 25–40 Minutes in Urban Accra',
      'Vehicle Types': 'Sedans, 4x4s, Luxury Vans, Light Commercial',
      'Bed Mechanism': 'Zero-Degree Hydraulic Slide Bed (Anti-Scratch)',
      'Coverage': 'Accra-Tema Metropolis & Interstate Routes'
    },
    createdAt: '2026-03-07T08:00:00.000Z',
    updatedAt: '2026-03-24T09:00:00.000Z'
  },

  // 11. Building Material Supply
  {
    id: 'PH-BM-001',
    title: 'High-Tensile B500B Construction Reinforcement Iron Rods (Per Tonne)',
    slug: 'b500b-reinforcement-iron-rods-per-tonne',
    type: 'Product',
    category: 'Building Material Supply',
    subcategory: 'Iron Rods & Steel',
    shortDescription: 'Certified standard high-tensile 10mm, 12mm, 16mm, and 20mm ribbed iron rods with direct site crane-offloading across Ghana.',
    fullDescription: 'Philmen coordinates bulk and retail supply of certified B500B standard ribbed steel reinforcement rods for foundations, columns, beams, and suspended slabs. All rods undergo stringent tensile tests to meet Ghana Standards Authority (GSA) guidelines. Bulk delivery straight to your construction site with automated weight receipts.',
    images: [
      'https://i.ibb.co/HLNyjGzj/003-CAT-Excavator.jpg'
    ],
    price: 8900,
    priceType: 'exact',
    priceDisplay: 'GH₵ 8,900 / Tonne',
    location: 'Kpone Industrial Area / Site Delivery Nationwide',
    status: 'published',
    featured: false,
    isSampleData: true,
    specifications: {
      'Sizes Available': '10mm, 12mm, 16mm, 20mm, 25mm',
      'Standard Grade': 'B500B High Tensile Ribbed',
      'Certification': 'GSA & ISO 9001 Compliant',
      'Minimum Order': '1 Tonne (Discounts for 10+ Tonnes)'
    },
    createdAt: '2026-03-06T11:00:00.000Z',
    updatedAt: '2026-03-23T16:30:00.000Z'
  },

  // 12. Perfume
  {
    id: 'PH-PF-001',
    title: 'Imperial Royal Oud Extrait de Parfum (100ml Artisanal Niche)',
    slug: 'imperial-royal-oud-extrait-de-parfum-100ml',
    type: 'Product',
    category: 'Perfume',
    subcategory: 'Unisex & Niche Oud',
    shortDescription: 'Pure luxury 30% concentration extrait de parfum with smoky Cambodian agarwood, Madagascar vanilla, and saffron notes.',
    fullDescription: 'Handcrafted for discerning connoisseurs of niche perfumery, Imperial Royal Oud delivers remarkable sillage and 24-hour skin longevity. Opens with sparkling spicy saffron and bergamot, evolving into an opulent heart of Bulgarian rose, aged agarwood (oud), and warm amber crystal.',
    images: [
      'https://i.ibb.co/PBqbMCN/013-Suite.jpg'
    ],
    price: 1850,
    priceType: 'exact',
    priceDisplay: 'GH₵ 1,850',
    location: 'Cantonments, Accra',
    status: 'published',
    featured: true,
    isSampleData: true,
    specifications: {
      'Volume': '100 ml / 3.4 fl. oz.',
      'Concentration': 'Extrait de Parfum (30% Oil)',
      'Top Notes': 'Saffron, Pink Pepper, Bergamot',
      'Heart Notes': 'Bulgarian Rose, Smoked Leather',
      'Base Notes': 'Cambodian Oud, Amber, Bourbon Vanilla',
      'Longevity': '24+ Hours'
    },
    createdAt: '2026-03-11T14:20:00.000Z',
    updatedAt: '2026-03-24T17:00:00.000Z'
  },

  // 13. Suits
  {
    id: 'PH-ST-001',
    title: 'Savile Row Custom Tailored Italian Wool 3-Piece Executive Suit',
    slug: 'savile-row-tailored-italian-wool-3-piece-suit',
    type: 'Product',
    category: 'Suits',
    subcategory: 'Three-Piece Suits',
    shortDescription: 'Super 150s pure Italian wool bespoke 3-piece suit with hand-stitched peak lapels, matching double-breasted vest, and tailored trousers.',
    fullDescription: 'Command attention in corporate boardrooms and grand celebratory occasions with this hand-finished three-piece suit. Tailored from premium Super 150s breathable Italian wool with natural shoulder construction, fully lined with silk cupro, functional buttonhole cuffs, and customized waistband adjustment tabs. In-person fitting coordinated directly via Philmen.',
    images: [
      'https://i.ibb.co/PBqbMCN/013-Suite.jpg'
    ],
    price: '3,800 - 5,500',
    priceType: 'range',
    priceDisplay: 'GH₵ 3,800 – GH₵ 5,500',
    location: 'Airport Residential, Accra',
    status: 'published',
    featured: true,
    isSampleData: true,
    specifications: {
      'Material': '100% Italian Super 150s Wool',
      'Set Includes': 'Jacket, Double-Breasted Waistcoat, Trousers',
      'Fit': 'Modern Tailored Slim / Classic Executive',
      'Occasion': 'Executive Corporate, Weddings, Black-Tie Galas',
      'Customization': 'Bespoke measurement service included'
    },
    createdAt: '2026-03-13T10:00:00.000Z',
    updatedAt: '2026-03-22T13:40:00.000Z'
  }
];
