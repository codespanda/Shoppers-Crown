export interface Product {
  id: string
  name: string
  brand: string
  category: string
  price: number
  originalPrice?: number
  discount?: number
  rating: number
  reviews: number
  image: string
  images?: string[]
  description: string
  inStock: boolean
  tags: string[]
  shippingEstimate: string
  weight: number
}

export interface Brand {
  id: string
  name: string
  logo: string
  category: string
  productsCount: number
  popularProducts: string[]
  shippingEstimate: string
  description: string
  color: string
}

export interface Category {
  id: string
  name: string
  icon: string
  productsCount: number
  image: string
  description: string
}

export interface Country {
  id: string
  name: string
  code: string
  flag: string
  shippingRate: number
  deliveryDays: string
  popular: boolean
}

export interface ShipmentTracking {
  id: string
  trackingNumber: string
  status: 'processing' | 'in-transit' | 'out-for-delivery' | 'delivered' | 'exception'
  origin: string
  destination: string
  estimatedDelivery: string
  carrier: string
  weight: number
  dimensions: { l: number; w: number; h: number }
  events: TrackingEvent[]
  items: string[]
}

export interface TrackingEvent {
  id: string
  timestamp: string
  location: string
  description: string
  status: string
}

export interface Order {
  id: string
  orderNumber: string
  date: string
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  items: OrderItem[]
  total: number
  shippingCost: number
  trackingNumber?: string
  destination: Country
}

export interface OrderItem {
  productId: string
  name: string
  image: string
  quantity: number
  price: number
}

export interface CartItem extends OrderItem {
  productId: string
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  country: string
  usAddress: string
  memberSince: string
  tier: 'free' | 'premium' | 'vip'
  totalSaved: number
  packagesShipped: number
}

export interface Testimonial {
  id: string
  name: string
  country: string
  avatar: string
  rating: number
  review: string
  date: string
  verified: boolean
}

export interface ShippingRate {
  carrier: string
  speed: string
  days: string
  price: number
  features: string[]
}

export interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  timestamp: string
  read: boolean
}

export interface SupportTicket {
  id: string
  subject: string
  status: 'open' | 'in-progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high'
  createdAt: string
  lastUpdate: string
  messages: number
}
