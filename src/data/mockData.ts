import type { Product, Brand, Category, Country, Testimonial, ShipmentTracking } from '@/types'

export const BRANDS: Brand[] = [
  { id: '1',  name: 'Amazon',    logo: 'https://logo.clearbit.com/amazon.com',    category: 'General',        productsCount: 50000,   popularProducts: ['Echo Dot', 'Fire TV', 'Kindle'],               shippingEstimate: '7-12 days', description: 'Everything store',         color: '#FF9900' },
  { id: '2',  name: 'Apple',     logo: 'https://logo.clearbit.com/apple.com',     category: 'Electronics',    productsCount: 200,     popularProducts: ['iPhone 15', 'MacBook Pro', 'AirPods'],         shippingEstimate: '7-14 days', description: 'Premium tech',             color: '#555555' },
  { id: '3',  name: 'Nike',      logo: 'https://logo.clearbit.com/nike.com',      category: 'Sportswear',     productsCount: 5000,    popularProducts: ['Air Max', 'Jordan 1', 'Dri-FIT'],              shippingEstimate: '8-14 days', description: 'Just do it',               color: '#111111' },
  { id: '4',  name: 'Adidas',    logo: 'https://logo.clearbit.com/adidas.com',    category: 'Sportswear',     productsCount: 4500,    popularProducts: ['Ultraboost', 'Stan Smith', 'Yeezy'],           shippingEstimate: '8-14 days', description: 'Impossible is nothing',    color: '#000000' },
  { id: '5',  name: 'Best Buy',  logo: 'https://logo.clearbit.com/bestbuy.com',   category: 'Electronics',    productsCount: 30000,   popularProducts: ['Samsung TV', 'PlayStation 5', 'Laptop'],       shippingEstimate: '7-12 days', description: 'Expert service',           color: '#003087' },
  { id: '6',  name: 'Target',    logo: 'https://logo.clearbit.com/target.com',    category: 'General',        productsCount: 25000,   popularProducts: ['Home Decor', 'Clothing', 'Toys'],              shippingEstimate: '8-13 days', description: 'Expect more, pay less',    color: '#CC0000' },
  { id: '7',  name: 'Walmart',   logo: 'https://logo.clearbit.com/walmart.com',   category: 'General',        productsCount: 80000,   popularProducts: ['Groceries', 'Electronics', 'Clothing'],        shippingEstimate: '8-14 days', description: 'Save money, live better',  color: '#0071CE' },
  { id: '8',  name: "Macy's",    logo: 'https://logo.clearbit.com/macys.com',     category: 'Fashion',        productsCount: 15000,   popularProducts: ['Coach Bag', 'Calvin Klein', 'Ralph Lauren'],   shippingEstimate: '8-14 days', description: 'Fashion authority',        color: '#E11D48' },
  { id: '9',  name: 'Costco',    logo: 'https://logo.clearbit.com/costco.com',    category: 'Wholesale',      productsCount: 8000,    popularProducts: ['Kirkland', 'Electronics', 'Food'],             shippingEstimate: '9-15 days', description: 'Quality you can count on', color: '#005DAA' },
  { id: '10', name: 'eBay',      logo: 'https://logo.clearbit.com/ebay.com',      category: 'Marketplace',    productsCount: 1000000, popularProducts: ['Vintage items', 'Electronics', 'Collectibles'], shippingEstimate: '7-14 days', description: 'Buy & sell worldwide',     color: '#E53238' },
  { id: '11', name: 'Nordstrom', logo: 'https://logo.clearbit.com/nordstrom.com', category: 'Luxury Fashion', productsCount: 10000,   popularProducts: ['Gucci', 'Prada', 'Valentino'],                shippingEstimate: '8-14 days', description: 'Best in fashion',          color: '#1C1C1C' },
  { id: '12', name: 'Sephora',   logo: 'https://logo.clearbit.com/sephora.com',   category: 'Beauty',         productsCount: 12000,   popularProducts: ['Charlotte Tilbury', 'Fenty Beauty', 'Rare Beauty'], shippingEstimate: '8-13 days', description: 'Beauty unleashed',      color: '#E2B4C8' },
]

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Electronics',  icon: '💻', productsCount: 45000, image: 'https://picsum.photos/seed/electronics/400/300',  description: 'Latest gadgets & tech' },
  { id: '2', name: 'Fashion',      icon: '👗', productsCount: 32000, image: 'https://picsum.photos/seed/fashion/400/300',      description: 'Trending styles' },
  { id: '3', name: 'Sportswear',   icon: '👟', productsCount: 18000, image: 'https://picsum.photos/seed/sportswear/400/300',   description: 'Performance gear' },
  { id: '4', name: 'Beauty',       icon: '💄', productsCount: 22000, image: 'https://picsum.photos/seed/beauty/400/300',       description: 'Skincare & makeup' },
  { id: '5', name: 'Home & Garden',icon: '🏠', productsCount: 28000, image: 'https://picsum.photos/seed/homegarden/400/300',  description: 'Home essentials' },
  { id: '6', name: 'Toys & Kids',  icon: '🧸', productsCount: 15000, image: 'https://picsum.photos/seed/toys/400/300',         description: 'Fun for all ages' },
  { id: '7', name: 'Books & Media',icon: '📚', productsCount: 10000, image: 'https://picsum.photos/seed/books/400/300',        description: 'Knowledge & entertainment' },
  { id: '8', name: 'Health',       icon: '💊', productsCount: 20000, image: 'https://picsum.photos/seed/health/400/300',       description: 'Wellness & supplements' },
]

export const COUNTRIES: Country[] = [
  { id: '1', name: 'United Arab Emirates', code: 'AE', flag: '🇦🇪', shippingRate: 29.99, deliveryDays: '7-12', popular: true },
  { id: '2', name: 'Saudi Arabia', code: 'SA', flag: '🇸🇦', shippingRate: 32.99, deliveryDays: '8-14', popular: true },
  { id: '3', name: 'United Kingdom', code: 'GB', flag: '🇬🇧', shippingRate: 24.99, deliveryDays: '6-10', popular: true },
  { id: '4', name: 'Canada', code: 'CA', flag: '🇨🇦', shippingRate: 18.99, deliveryDays: '5-8', popular: true },
  { id: '5', name: 'Australia', code: 'AU', flag: '🇦🇺', shippingRate: 34.99, deliveryDays: '9-14', popular: true },
  { id: '6', name: 'Germany', code: 'DE', flag: '🇩🇪', shippingRate: 26.99, deliveryDays: '7-11', popular: true },
  { id: '7', name: 'India', code: 'IN', flag: '🇮🇳', shippingRate: 27.99, deliveryDays: '8-14', popular: true },
  { id: '8', name: 'Singapore', code: 'SG', flag: '🇸🇬', shippingRate: 31.99, deliveryDays: '8-13', popular: true },
  { id: '9', name: 'Japan', code: 'JP', flag: '🇯🇵', shippingRate: 33.99, deliveryDays: '9-14', popular: false },
  { id: '10', name: 'Brazil', code: 'BR', flag: '🇧🇷', shippingRate: 39.99, deliveryDays: '12-20', popular: false },
  { id: '11', name: 'Mexico', code: 'MX', flag: '🇲🇽', shippingRate: 22.99, deliveryDays: '6-10', popular: false },
  { id: '12', name: 'France', code: 'FR', flag: '🇫🇷', shippingRate: 26.99, deliveryDays: '7-11', popular: false },
]

export const PRODUCTS: Product[] = [
  { id: '1',  name: 'Apple iPhone 15 Pro Max 256GB', brand: 'Apple',    category: 'Electronics',   price: 1199, originalPrice: 1399, discount: 14, rating: 4.9, reviews: 2847, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&auto=format', description: 'Latest iPhone with titanium design and A17 Pro chip.',              inStock: true, tags: ['new', 'popular'], shippingEstimate: '7-14 days',  weight: 0.5  },
  { id: '2',  name: 'Nike Air Max 270 React',         brand: 'Nike',     category: 'Sportswear',    price: 149,  originalPrice: 180,  discount: 17, rating: 4.7, reviews: 1523, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&auto=format', description: 'Next-generation cushioning for all-day comfort.',                   inStock: true, tags: ['bestseller'],     shippingEstimate: '8-14 days',  weight: 0.8  },
  { id: '3',  name: 'Sony WH-1000XM5 Headphones',    brand: 'Sony',     category: 'Electronics',   price: 349,  originalPrice: 399,  discount: 13, rating: 4.8, reviews: 3201, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&auto=format', description: 'Industry-leading noise cancellation with 30-hour battery.',        inStock: true, tags: ['top-rated'],      shippingEstimate: '7-12 days',  weight: 0.3  },
  { id: '4',  name: 'Adidas Ultraboost 22',           brand: 'Adidas',   category: 'Sportswear',    price: 189,  originalPrice: 220,  discount: 14, rating: 4.6, reviews: 987,  image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop&auto=format', description: 'Energy-returning boost cushioning for runners.',                    inStock: true, tags: ['new'],            shippingEstimate: '8-14 days',  weight: 0.7  },
  { id: '5',  name: 'MacBook Pro 14" M3 Pro',         brand: 'Apple',    category: 'Electronics',   price: 1999, originalPrice: 2199, discount: 9,  rating: 4.9, reviews: 1456, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop&auto=format', description: 'Supercharged by M3 Pro for professionals.',                         inStock: true, tags: ['premium'],        shippingEstimate: '7-14 days',  weight: 1.6  },
  { id: '6',  name: 'Charlotte Tilbury Magic Cream',  brand: 'Sephora',  category: 'Beauty',        price: 105,  originalPrice: 115,  discount: 9,  rating: 4.7, reviews: 2341, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop&auto=format', description: 'Hollywood favourite moisturiser for glowing skin.',                 inStock: true, tags: ['bestseller'],     shippingEstimate: '8-13 days',  weight: 0.2  },
  { id: '7',  name: 'Dyson V15 Detect Vacuum',        brand: 'Dyson',    category: 'Home & Garden', price: 749,  originalPrice: 849,  discount: 12, rating: 4.8, reviews: 1892, image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&h=400&fit=crop&auto=format', description: 'Laser reveals hidden dust. Most powerful cordless vacuum.',         inStock: true, tags: ['top-rated'],      shippingEstimate: '9-15 days',  weight: 2.6  },
  { id: '8',  name: 'Samsung 65" Neo QLED 4K TV',     brand: 'Best Buy', category: 'Electronics',   price: 1499, originalPrice: 1999, discount: 25, rating: 4.7, reviews: 876,  image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&h=400&fit=crop&auto=format', description: 'Neo Quantum Processor with Quantum HDR 32X.',                       inStock: true, tags: ['deal'],           shippingEstimate: '12-20 days', weight: 28   },
  { id: '9',  name: 'iPad Pro 12.9" M2',              brand: 'Apple',    category: 'Electronics',   price: 1099, originalPrice: 1199, discount: 8,  rating: 4.8, reviews: 1102, image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=400&fit=crop&auto=format', description: 'The ultimate iPad experience with M2 chip and Liquid Retina XDR.',  inStock: true, tags: ['new'],            shippingEstimate: '7-14 days',  weight: 0.7  },
  { id: '10', name: 'AirPods Pro 2nd Generation',     brand: 'Apple',    category: 'Electronics',   price: 249,  originalPrice: 279,  discount: 11, rating: 4.8, reviews: 4521, image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400&h=400&fit=crop&auto=format', description: 'Active noise cancellation with Adaptive Transparency mode.',        inStock: true, tags: ['bestseller'],     shippingEstimate: '7-14 days',  weight: 0.06 },
  { id: '11', name: "Levi's 501 Original Jeans",      brand: "Macy's",   category: 'Fashion',       price: 79,   originalPrice: 99,   discount: 20, rating: 4.5, reviews: 3870, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop&auto=format', description: 'The iconic straight-fit jean that started it all.',                 inStock: true, tags: ['bestseller'],     shippingEstimate: '8-14 days',  weight: 0.6  },
  { id: '12', name: 'KitchenAid Stand Mixer 5Qt',     brand: 'Target',   category: 'Home & Garden', price: 399,  originalPrice: 499,  discount: 20, rating: 4.9, reviews: 7832, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&auto=format', description: 'Professional-grade 5-quart stand mixer with 10 speeds.',            inStock: true, tags: ['deal'],           shippingEstimate: '10-16 days', weight: 11.8 },
]

export const TESTIMONIALS: Testimonial[] = [
  { id: '1', name: 'Ahmed Al-Rashid', country: 'UAE', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', rating: 5, review: 'Shoppers Crown made it so easy to shop from US stores. I received my iPhone 15 in just 9 days! The packaging was perfect and tracking was seamless throughout.', date: '2026-05-15', verified: true },
  { id: '2', name: 'Priya Sharma', country: 'India', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', rating: 5, review: 'I\'ve been using Shoppers Crown for 3 years now. The consolidation service saves me so much money. Their customer support is incredibly responsive and helpful.', date: '2026-05-20', verified: true },
  { id: '3', name: 'Lars Andersson', country: 'Sweden', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', rating: 4, review: 'Great service for getting US-exclusive products. Shipping to Scandinavia is well-priced and the app makes tracking very convenient.', date: '2026-06-01', verified: true },
  { id: '4', name: 'Yuki Tanaka', country: 'Japan', avatar: 'https://randomuser.me/api/portraits/women/4.jpg', rating: 5, review: 'Absolutely love Shoppers Crown! I shop from Nike, Sephora, and Amazon regularly. The free US address is a game changer for international shoppers.', date: '2026-06-10', verified: true },
  { id: '5', name: 'Carlos Mendez', country: 'Mexico', avatar: 'https://randomuser.me/api/portraits/men/5.jpg', rating: 5, review: 'Fast, reliable and affordable. I\'ve shipped over 50 packages through Shoppers Crown and never had a single issue. Highly recommended!', date: '2026-06-15', verified: true },
  { id: '6', name: 'Sophie Martin', country: 'France', avatar: 'https://randomuser.me/api/portraits/women/6.jpg', rating: 4, review: 'Shoppers Crown is my go-to for American fashion brands. The package photos before shipping give me great peace of mind. Will continue using!', date: '2026-06-20', verified: true },
]

export const TRACKING_EVENTS: ShipmentTracking = {
  id: '1',
  trackingNumber: 'Shoppers Crown-2026-789456',
  status: 'in-transit',
  origin: 'Portland, OR, USA',
  destination: 'Dubai, UAE',
  estimatedDelivery: '2026-07-05',
  carrier: 'DHL Express',
  weight: 2.3,
  dimensions: { l: 35, w: 25, h: 15 },
  items: ['iPhone 15 Pro Max', 'AirPods Pro'],
  events: [
    { id: '1', timestamp: '2026-07-01 14:32', location: 'Portland, OR', description: 'Package received at Shoppers Crown warehouse', status: 'received' },
    { id: '2', timestamp: '2026-07-01 18:45', location: 'Portland, OR', description: 'Package inspected and processed', status: 'processed' },
    { id: '3', timestamp: '2026-07-02 06:12', location: 'Portland, OR', description: 'Handed over to DHL Express', status: 'dispatched' },
    { id: '4', timestamp: '2026-07-02 22:08', location: 'Cincinnati, OH', description: 'Departed DHL hub', status: 'in-transit' },
    { id: '5', timestamp: '2026-07-03 08:30', location: 'Leipzig, Germany', description: 'Arrived at international hub', status: 'in-transit' },
    { id: '6', timestamp: '2026-07-03 14:15', location: 'Dubai, UAE', description: 'Arrived at destination country', status: 'customs' },
  ],
}

export const STATS = [
  { label: 'Countries Served', value: 220, suffix: '+', icon: '🌍' },
  { label: 'Packages Delivered', value: 25, suffix: 'M+', icon: '📦' },
  { label: 'Customer Reviews', value: 4.8, suffix: '/5', icon: '⭐' },
  { label: 'Years in Business', value: 20, suffix: '+', icon: '🏆' },
]

export const FAQ_ITEMS = [
  { q: 'How do I get my free US address?', a: 'Simply sign up for a free Shoppers Crown account. You\'ll instantly receive a unique US address in Portland, Oregon that you can use when shopping at any US store.' },
  { q: 'How long does shipping take?', a: 'Shipping times vary by destination and service level. Economy shipping typically takes 12-20 days, while Express services deliver in 5-10 days to most countries.' },
  { q: 'Can I consolidate multiple packages?', a: 'Yes! Package consolidation is one of our most popular features. We can combine up to 10 packages into one shipment, saving you up to 80% on shipping costs.' },
  { q: 'What items can I ship internationally?', a: 'Most consumer goods can be shipped internationally. We\'ll help you understand any restrictions for your destination country and ensure compliance with customs regulations.' },
  { q: 'How is shipping cost calculated?', a: 'Shipping cost is based on the greater of actual weight or dimensional weight, your destination country, and chosen shipping speed. Use our calculator for an instant estimate.' },
  { q: 'Is my package insured?', a: 'Basic insurance is included with all shipments. We offer optional enhanced coverage up to $2,000 for high-value items for complete peace of mind.' },
  { q: 'How do I track my shipment?', a: 'You can track your shipment in real-time from your Shoppers Crown dashboard, or using the tracking number on the carrier\'s website. We also send proactive email and SMS updates.' },
  { q: 'What happens if my package arrives damaged?', a: 'We photograph every package upon arrival and before shipping. If damage occurs, our claims team works with the carrier to resolve it quickly and fairly.' },
]
