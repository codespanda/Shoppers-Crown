import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import {
  Package, Truck, MapPin, CreditCard, Bell, Settings, LogOut, ShoppingCart,
  TrendingUp, ShoppingBag, DollarSign, Star, ChevronRight,
  LayoutDashboard, FileText, HeadphonesIcon, Gift, Users,
  CheckCircle2, Plus, Copy, ExternalLink,
  Wallet, Receipt, Zap, Phone, Mail, MessageCircle, Search
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/context/AuthContext'
import { TRACKING_EVENTS } from '@/data/mockData'
import { formatCurrency } from '@/lib/utils'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

const SIDEBAR_ITEMS = [
  { label: 'Overview', icon: <LayoutDashboard size={18} />, id: 'overview' },
  { label: 'Orders', icon: <ShoppingBag size={18} />, id: 'orders' },
  { label: 'Shipments', icon: <Truck size={18} />, id: 'shipments' },
  { label: 'Tracking', icon: <MapPin size={18} />, id: 'tracking' },
  { label: 'Warehouse', icon: <Package size={18} />, id: 'warehouse' },
  { label: 'Invoices', icon: <FileText size={18} />, id: 'invoices' },
  { label: 'Payment', icon: <CreditCard size={18} />, id: 'payment' },
  { label: 'Rewards', icon: <Gift size={18} />, id: 'rewards' },
  { label: 'Referral', icon: <Users size={18} />, id: 'referral' },
  { label: 'Support', icon: <HeadphonesIcon size={18} />, id: 'support' },
  { label: 'Settings', icon: <Settings size={18} />, id: 'settings' },
]

const RECENT_ORDERS = [
  { id: '#ORD-2026-001', items: 'iPhone 15 Pro Max', status: 'delivered', date: '2026-06-15', total: 1259.99 },
  { id: '#ORD-2026-002', items: 'Nike Air Max 270 × 2', status: 'shipped', date: '2026-06-22', total: 298.00 },
  { id: '#ORD-2026-003', items: 'MacBook Pro 14"', status: 'processing', date: '2026-06-28', total: 2049.99 },
]

const STATUS_COLOR: Record<string, string> = {
  delivered: 'success',
  shipped: 'info',
  processing: 'warning',
  cancelled: 'error',
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 mb-4">Please sign in to view your dashboard</p>
          <Link to="/login" className="text-[#1B4FD8] font-semibold hover:underline">Sign In</Link>
        </div>
      </div>
    )
  }

  const handleLogout = () => { logout(); navigate('/') }

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex overflow-hidden" style={{ height: '100vh' }}>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 h-full flex-shrink-0">
          {/* Brand */}
          <div className="px-6 py-6 border-b border-slate-100 flex flex-col items-center text-center gap-4">
            <Link to="/" className="flex items-center gap-2.5 whitespace-nowrap">
              <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center shadow-glow flex-shrink-0">
                <Package size={18} className="text-white" />
              </div>
              <span className="text-lg font-bold text-[#0A1628]">Shoppers<span className="gradient-text"> Crown</span></span>
            </Link>
            <div className="w-14 h-14 gradient-primary rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">{user.name.charAt(0)}</span>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-600">
              <Star size={11} className="fill-amber-500 text-amber-500" /> Premium Member
            </span>
          </div>

          {/* Nav items */}
          <nav className="flex-1 overflow-y-auto p-3">
            {SIDEBAR_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mb-1 ${
                  activeTab === item.id
                    ? 'bg-[#1B4FD8] text-white shadow-md'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-3 border-t border-slate-100">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Top bar — only over main area */}
          <header className="h-16 bg-white border-b border-slate-100 shadow-sm flex items-center px-6 justify-end flex-shrink-0">
            <div className="flex items-center gap-3">
              <button className="relative p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-500 hover:text-slate-800 transition-colors">
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <Link to="/cart" className="relative p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-500 hover:text-slate-800 transition-colors">
                <ShoppingCart size={18} />
              </Link>
              <div className="w-9 h-9 gradient-primary rounded-full flex items-center justify-center cursor-pointer">
                <span className="text-white text-sm font-bold">{user.name.charAt(0)}</span>
              </div>
            </div>
          </header>
          <div className="flex-1 overflow-y-auto p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-[#0A1628] capitalize">
                {activeTab === 'overview' ? 'Welcome back!' : activeTab}
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                {activeTab === 'overview' ? "Here's what's happening with your account" : `Manage your ${activeTab}`}
              </p>
            </div>

        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              {[
                { label: 'Total Orders', value: '42', change: '+8%', icon: <ShoppingBag size={20} />, color: 'text-[#1B4FD8]', bg: 'bg-blue-50' },
                { label: 'Packages Shipped', value: user.packagesShipped.toString(), change: '+12%', icon: <Package size={20} />, color: 'text-[#10B981]', bg: 'bg-emerald-50' },
                { label: 'Total Saved', value: formatCurrency(user.totalSaved), change: '+$120', icon: <DollarSign size={20} />, color: 'text-[#F59E0B]', bg: 'bg-amber-50' },
                { label: 'In Warehouse', value: '3', change: 'Active', icon: <Truck size={20} />, color: 'text-[#8B5CF6]', bg: 'bg-violet-50' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-semibold ${stat.color} uppercase tracking-wide`}>{stat.label}</span>
                    <div className={`w-9 h-9 ${stat.bg} rounded-xl flex items-center justify-center ${stat.color}`}>
                      {stat.icon}
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-[#0A1628]">{stat.value}</p>
                  <p className="text-xs text-emerald-500 font-medium mt-1 flex items-center gap-1">
                    <TrendingUp size={11} /> {stat.change} this month
                  </p>
                </motion.div>
              ))}
            </div>

            {/* US Address */}
            <div className="bg-gradient-to-br from-[#1B4FD8] to-[#38BDF8] rounded-2xl p-6 mb-8 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white/70 text-sm mb-1 flex items-center gap-1.5"><MapPin size={14} /> Your Free US Address</p>
                  <p className="text-white font-semibold text-lg mb-1">{user.name}</p>
                  <p className="text-white/90 text-sm">{user.usAddress}</p>
                </div>
                <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-medium transition-colors">
                  Copy
                </button>
              </div>
            </div>

            {/* Recent orders */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm mb-8">
              <div className="flex items-center justify-between p-5 border-b border-slate-100">
                <h3 className="font-bold text-slate-900">Recent Orders</h3>
                <button onClick={() => setActiveTab('orders')} className="text-[#1B4FD8] text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                  View All <ChevronRight size={14} />
                </button>
              </div>
              <div className="divide-y divide-slate-50">
                {RECENT_ORDERS.map((order) => (
                  <div key={order.id} className="flex items-center gap-4 p-5 hover:bg-slate-50 transition-colors">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <ShoppingBag size={18} className="text-slate-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 text-sm">{order.id}</p>
                      <p className="text-slate-500 text-xs truncate">{order.items}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-slate-900 text-sm">{formatCurrency(order.total)}</p>
                      <p className="text-slate-400 text-xs">{order.date}</p>
                    </div>
                    <Badge variant={STATUS_COLOR[order.status] as any} className="flex-shrink-0">{order.status}</Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Live tracking preview */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-slate-900">Live Shipment Tracking</h3>
                <Badge variant="info">{TRACKING_EVENTS.carrier}</Badge>
              </div>
              <div className="flex items-center gap-3 mb-4 p-3 bg-slate-50 rounded-xl">
                <Package size={18} className="text-[#1B4FD8]" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{TRACKING_EVENTS.trackingNumber}</p>
                  <p className="text-xs text-slate-500">{TRACKING_EVENTS.origin} → {TRACKING_EVENTS.destination}</p>
                </div>
                <Badge variant="warning" className="ml-auto">In Transit</Badge>
              </div>
              <div className="space-y-3">
                {TRACKING_EVENTS.events.slice(-3).map((ev, i) => (
                  <div key={ev.id} className="flex gap-3 items-start">
                    <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${i === 0 ? 'bg-[#1B4FD8]' : 'bg-slate-200'}`} />
                    <div>
                      <p className="text-sm font-medium text-slate-800">{ev.description}</p>
                      <p className="text-xs text-slate-400">{ev.location} · {ev.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'orders' && <OrdersTab />}
        {activeTab === 'shipments' && <ShipmentsTab />}
        {activeTab === 'tracking' && <TrackingTab />}
        {activeTab === 'warehouse' && <WarehouseTab />}
        {activeTab === 'invoices' && <InvoicesTab />}
        {activeTab === 'payment' && <PaymentTab />}
        {activeTab === 'rewards' && <RewardsTab />}
        {activeTab === 'referral' && <ReferralTab />}
        {activeTab === 'support' && <SupportTab />}
        {activeTab === 'settings' && <SettingsTab user={user} />}
          </div>
        </main>
      </div>
    </div>
  )
}

/* ─── Tab components ─────────────────────────────────────────────────────── */

const ALL_ORDERS = [
  { id: '#ORD-2026-001', items: 'iPhone 15 Pro Max', status: 'delivered', date: '2026-06-15', total: 1259.99, carrier: 'DHL Express' },
  { id: '#ORD-2026-002', items: 'Nike Air Max 270 × 2', status: 'shipped', date: '2026-06-22', total: 298.00, carrier: 'FedEx' },
  { id: '#ORD-2026-003', items: 'MacBook Pro 14" M3', status: 'processing', date: '2026-06-28', total: 2049.99, carrier: 'Pending' },
  { id: '#ORD-2026-004', items: 'Sony WH-1000XM5', status: 'delivered', date: '2026-05-30', total: 369.00, carrier: 'UPS' },
  { id: '#ORD-2026-005', items: 'Adidas Ultraboost 22', status: 'delivered', date: '2026-05-18', total: 199.00, carrier: 'DHL Express' },
  { id: '#ORD-2026-006', items: 'Charlotte Tilbury Cream', status: 'cancelled', date: '2026-05-05', total: 115.00, carrier: '—' },
]

function OrdersTab() {
  const [filter, setFilter] = useState('all')
  const filtered = filter === 'all' ? ALL_ORDERS : ALL_ORDERS.filter((o) => o.status === filter)
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'processing', 'shipped', 'delivered', 'cancelled'].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all ${filter === f ? 'bg-[#1B4FD8] text-white' : 'bg-white border border-slate-200 text-slate-500 hover:border-[#1B4FD8] hover:text-[#1B4FD8]'}`}>{f}</button>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="hidden md:grid grid-cols-6 px-5 py-3 bg-slate-50 text-xs font-semibold text-slate-400 uppercase tracking-wide border-b border-slate-100">
          <span className="col-span-2">Order</span><span>Date</span><span>Total</span><span>Carrier</span><span>Status</span>
        </div>
        <div className="divide-y divide-slate-50">
          {filtered.map((order) => (
            <div key={order.id} className="grid md:grid-cols-6 gap-2 items-center px-5 py-4 hover:bg-slate-50 transition-colors">
              <div className="md:col-span-2">
                <p className="font-semibold text-slate-900 text-sm">{order.id}</p>
                <p className="text-slate-400 text-xs truncate">{order.items}</p>
              </div>
              <p className="text-slate-500 text-sm">{order.date}</p>
              <p className="font-semibold text-slate-900 text-sm">{formatCurrency(order.total)}</p>
              <p className="text-slate-500 text-sm">{order.carrier}</p>
              <Badge variant={STATUS_COLOR[order.status] as any}>{order.status}</Badge>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-400">No {filter} orders found.</div>
        )}
      </div>
    </motion.div>
  )
}

const SHIPMENTS = [
  { id: 'Shoppers Crown-2026-789456', from: 'Portland, OR', to: 'Dubai, UAE', status: 'in-transit', carrier: 'DHL Express', est: '2026-07-05', weight: '2.3 kg' },
  { id: 'Shoppers Crown-2026-654321', from: 'Portland, OR', to: 'Mumbai, India', status: 'delivered', carrier: 'FedEx', est: '2026-06-20', weight: '1.1 kg' },
  { id: 'Shoppers Crown-2026-112233', from: 'Portland, OR', to: 'London, UK', status: 'processing', carrier: 'UPS', est: '2026-07-10', weight: '0.5 kg' },
]

function ShipmentsTab() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      {SHIPMENTS.map((s) => (
        <div key={s.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${s.status === 'delivered' ? 'bg-emerald-50 text-emerald-500' : s.status === 'in-transit' ? 'bg-blue-50 text-[#1B4FD8]' : 'bg-amber-50 text-amber-500'}`}>
                <Truck size={18} />
              </div>
              <div>
                <p className="font-bold text-slate-900 font-mono text-sm">{s.id}</p>
                <p className="text-slate-400 text-xs">{s.from} → {s.to}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div><p className="text-xs text-slate-400">Carrier</p><p className="font-medium text-slate-700">{s.carrier}</p></div>
              <div><p className="text-xs text-slate-400">Est. Delivery</p><p className="font-medium text-slate-700">{s.est}</p></div>
              <div><p className="text-xs text-slate-400">Weight</p><p className="font-medium text-slate-700">{s.weight}</p></div>
              <Badge variant={s.status === 'delivered' ? 'success' : s.status === 'in-transit' ? 'info' : 'warning'}>{s.status}</Badge>
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  )
}

function TrackingTab() {
  const [loaded, setLoaded] = useState(false)
  const progressSteps = ['Received', 'Processing', 'Dispatched', 'In Transit', 'Customs', 'Delivered']
  const currentStep = 4
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input placeholder="Enter tracking number..." className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#1B4FD8]" />
        </div>
        <Button onClick={() => setLoaded(true)}>Track</Button>
        <Button variant="outline" onClick={() => setLoaded(true)}>Demo</Button>
      </div>
      {loaded && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs text-slate-400 mb-1">Tracking Number</p>
              <p className="font-bold text-[#0A1628] font-mono">{TRACKING_EVENTS.trackingNumber}</p>
            </div>
            <Badge variant="warning">In Transit</Badge>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[['From', TRACKING_EVENTS.origin], ['To', TRACKING_EVENTS.destination], ['Carrier', TRACKING_EVENTS.carrier], ['Est. Delivery', TRACKING_EVENTS.estimatedDelivery]].map(([l, v]) => (
              <div key={l} className="bg-slate-50 rounded-xl p-3"><p className="text-xs text-slate-400 mb-0.5">{l}</p><p className="font-semibold text-slate-900 text-sm">{v}</p></div>
            ))}
          </div>
          <div className="relative mb-2">
            <div className="flex justify-between mb-3">
              {progressSteps.map((step, i) => (
                <div key={step} className="flex flex-col items-center gap-1">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${i < currentStep ? 'bg-[#1B4FD8] text-white' : i === currentStep ? 'bg-[#1B4FD8] text-white ring-4 ring-[#1B4FD8]/20' : 'bg-slate-100 text-slate-400'}`}>
                    {i < currentStep ? <CheckCircle2 size={13} /> : i + 1}
                  </div>
                  <span className="hidden md:block text-xs text-slate-400 text-center max-w-[55px]">{step}</span>
                </div>
              ))}
            </div>
            <div className="absolute top-3.5 left-0 right-0 h-0.5 bg-slate-100 -z-0">
              <div className="h-full bg-[#1B4FD8]" style={{ width: `${(currentStep / (progressSteps.length - 1)) * 100}%` }} />
            </div>
          </div>
          <div className="mt-6 space-y-3 border-t border-slate-50 pt-5">
            {[...TRACKING_EVENTS.events].reverse().map((ev, i) => (
              <div key={ev.id} className="flex gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${i === 0 ? 'bg-[#1B4FD8] text-white' : 'bg-slate-100 text-slate-400'}`}><Package size={14} /></div>
                <div><p className="text-sm font-medium text-slate-800">{ev.description}</p><p className="text-xs text-slate-400">{ev.location} · {ev.timestamp}</p></div>
              </div>
            ))}
          </div>
        </div>
      )}
      {!loaded && (
        <div className="text-center py-16 text-slate-400">
          <Package size={40} className="mx-auto mb-3 text-slate-200" />
          <p>Enter a tracking number to see live updates</p>
        </div>
      )}
    </motion.div>
  )
}

const WAREHOUSE_ITEMS = [
  { id: 'PKG-001', name: 'iPhone 15 Pro Max', store: 'Apple.com', arrived: '2026-06-28', expires: '2026-08-27', weight: '0.5 kg', status: 'ready' },
  { id: 'PKG-002', name: 'Nike Air Max 270 × 2', store: 'Nike.com', arrived: '2026-06-27', expires: '2026-08-26', weight: '1.6 kg', status: 'ready' },
  { id: 'PKG-003', name: 'MacBook Pro 14"', store: 'Apple.com', arrived: '2026-06-29', expires: '2026-08-28', weight: '1.6 kg', status: 'inspecting' },
]

function WarehouseTab() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-5">
        <p className="text-slate-500 text-sm">{WAREHOUSE_ITEMS.length} packages at your US address</p>
        <Button size="sm" icon={<Plus size={14} />}>Ship Selected</Button>
      </div>
      <div className="space-y-4">
        {WAREHOUSE_ITEMS.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-4">
            <input type="checkbox" className="accent-[#1B4FD8] w-4 h-4 rounded flex-shrink-0" />
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${pkg.status === 'ready' ? 'bg-emerald-50 text-emerald-500' : 'bg-amber-50 text-amber-500'}`}>
              <Package size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-900 text-sm">{pkg.name}</p>
              <p className="text-slate-400 text-xs">from {pkg.store} · arrived {pkg.arrived}</p>
            </div>
            <div className="hidden md:flex gap-6 text-sm">
              <div><p className="text-xs text-slate-400">Weight</p><p className="font-medium text-slate-700">{pkg.weight}</p></div>
              <div><p className="text-xs text-slate-400">Storage expires</p><p className="font-medium text-amber-600">{pkg.expires}</p></div>
            </div>
            <Badge variant={pkg.status === 'ready' ? 'success' : 'warning'}>{pkg.status}</Badge>
          </div>
        ))}
      </div>
      <div className="mt-5 p-4 bg-blue-50 rounded-2xl text-sm text-[#1B4FD8]">
        <p className="font-semibold mb-0.5">Storage Policy</p>
        <p className="text-blue-600/80">Premium members: packages stored free for 60 days. After that, $2/package/day applies.</p>
      </div>
    </motion.div>
  )
}

const INVOICES = [
  { id: 'INV-2026-0042', date: '2026-06-01', amount: 9.99, desc: 'Premium membership — June 2026', status: 'paid' },
  { id: 'INV-2026-0041', date: '2026-05-01', amount: 9.99, desc: 'Premium membership — May 2026', status: 'paid' },
  { id: 'INV-2026-0035', date: '2026-06-20', amount: 34.99, desc: 'International shipping — DHL Express', status: 'paid' },
  { id: 'INV-2026-0030', date: '2026-05-28', amount: 22.50, desc: 'International shipping — UPS Worldwide', status: 'paid' },
  { id: 'INV-2026-0029', date: '2026-05-15', amount: 9.99, desc: 'Premium membership — April 2026', status: 'paid' },
]

function InvoicesTab() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="hidden md:grid grid-cols-5 px-5 py-3 bg-slate-50 text-xs font-semibold text-slate-400 uppercase tracking-wide border-b border-slate-100">
          <span>Invoice</span><span>Date</span><span className="col-span-2">Description</span><span>Amount</span>
        </div>
        <div className="divide-y divide-slate-50">
          {INVOICES.map((inv) => (
            <div key={inv.id} className="grid md:grid-cols-5 gap-2 items-center px-5 py-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-2">
                <Receipt size={14} className="text-slate-300" />
                <span className="font-mono text-sm text-slate-700">{inv.id}</span>
              </div>
              <p className="text-slate-500 text-sm">{inv.date}</p>
              <p className="text-slate-700 text-sm md:col-span-2">{inv.desc}</p>
              <div className="flex items-center justify-between md:justify-start gap-3">
                <p className="font-semibold text-slate-900">{formatCurrency(inv.amount)}</p>
                <button className="text-[#1B4FD8] hover:text-blue-700 p-1 rounded-lg hover:bg-blue-50 transition-colors"><ExternalLink size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function PaymentTab() {
  const [adding, setAdding] = useState(false)
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Saved cards */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900">Saved Cards</h3>
            <button onClick={() => setAdding(!adding)} className="flex items-center gap-1.5 text-sm text-[#1B4FD8] font-medium hover:underline"><Plus size={14} /> Add Card</button>
          </div>
          <div className="space-y-3">
            {[
              { brand: 'Visa', last4: '4242', exp: '12/28', color: 'from-[#1B4FD8] to-[#38BDF8]', default: true },
              { brand: 'Mastercard', last4: '8888', exp: '09/27', color: 'from-slate-700 to-slate-900', default: false },
            ].map((card) => (
              <div key={card.last4} className={`bg-gradient-to-br ${card.color} rounded-2xl p-5 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="flex justify-between items-start mb-6">
                  <Wallet size={22} />
                  {card.default && <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full">Default</span>}
                </div>
                <p className="font-mono text-sm tracking-widest mb-1">•••• •••• •••• {card.last4}</p>
                <div className="flex justify-between text-xs text-white/70 mt-2">
                  <span>{card.brand}</span><span>Exp {card.exp}</span>
                </div>
              </div>
            ))}
          </div>
          {adding && (
            <div className="mt-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-3">
              <Input label="Card Number" placeholder="1234 5678 9012 3456" />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Expiry" placeholder="MM/YY" />
                <Input label="CVV" placeholder="123" type="password" />
              </div>
              <Button size="sm" className="w-full">Save Card</Button>
            </div>
          )}
        </div>

        {/* Billing summary */}
        <div>
          <h3 className="font-bold text-slate-900 mb-4">Billing Summary</h3>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
              <Zap size={18} className="text-[#1B4FD8]" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900">Premium Plan</p>
                <p className="text-xs text-slate-400">Renews on July 1, 2026</p>
              </div>
              <span className="font-bold text-[#1B4FD8]">$9.99/mo</span>
            </div>
            <div className="space-y-2 text-sm">
              {[['June 2026', '$9.99'], ['May 2026', '$9.99'], ['Apr 2026', '$9.99']].map(([month, amt]) => (
                <div key={month} className="flex justify-between text-slate-600">
                  <span>{month}</span><span className="font-medium text-slate-900">{amt}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-100 pt-3 flex justify-between font-bold">
              <span>Total (3 months)</span><span>$29.97</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function RewardsTab() {
  const points = 2450
  const nextTier = 5000
  const pct = Math.round((points / nextTier) * 100)
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      {/* Points card */}
      <div className="bg-gradient-to-br from-[#F59E0B] to-[#FF7A00] rounded-3xl p-6 text-white mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/70 text-sm mb-1">Your Points Balance</p>
            <p className="text-5xl font-bold">{points.toLocaleString()}</p>
            <p className="text-white/70 text-sm mt-1">≈ {formatCurrency(points * 0.01)} in savings</p>
          </div>
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center"><Gift size={28} /></div>
        </div>
        <div>
          <div className="flex justify-between text-sm text-white/80 mb-2">
            <span>Gold Tier</span><span>{points.toLocaleString()} / {nextTier.toLocaleString()} pts to Platinum</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full">
            <div className="h-full bg-white rounded-full transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      {/* Earn ways */}
      <h3 className="font-bold text-slate-900 mb-4">Earn More Points</h3>
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Every $1 spent on shipping', pts: '+1 pt', icon: <Truck size={18} />, color: 'text-[#1B4FD8] bg-blue-50' },
          { label: 'Refer a friend', pts: '+500 pts', icon: <Users size={18} />, color: 'text-[#10B981] bg-emerald-50' },
          { label: 'Write a review', pts: '+50 pts', icon: <Star size={18} />, color: 'text-[#F59E0B] bg-amber-50' },
        ].map((item) => (
          <div key={item.label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${item.color}`}>{item.icon}</div>
            <p className="text-sm text-slate-600 mb-1">{item.label}</p>
            <p className="font-bold text-[#1B4FD8]">{item.pts}</p>
          </div>
        ))}
      </div>

      {/* Redeem */}
      <h3 className="font-bold text-slate-900 mb-4">Redeem Points</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          { reward: '$5 off shipping', pts: 500 },
          { reward: '$10 off any order', pts: 1000 },
          { reward: '1 month Premium free', pts: 2000 },
          { reward: '$25 shopping credit', pts: 2500 },
        ].map((r) => (
          <div key={r.reward} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-900 text-sm">{r.reward}</p>
              <p className="text-xs text-slate-400">{r.pts.toLocaleString()} points</p>
            </div>
            <Button size="sm" variant={points >= r.pts ? 'primary' : 'outline'} disabled={points < r.pts}>
              {points >= r.pts ? 'Redeem' : 'Not enough'}
            </Button>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function ReferralTab() {
  const [copied, setCopied] = useState(false)
  const code = 'Shoppers Crown-ALEX2026'
  const copyCode = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      {/* Referral card */}
      <div className="bg-gradient-to-br from-[#1B4FD8] to-[#38BDF8] rounded-3xl p-8 text-white text-center mb-8">
        <Users size={40} className="mx-auto mb-3 text-white/80" />
        <h3 className="text-2xl font-bold mb-2">Refer Friends, Earn Rewards</h3>
        <p className="text-white/70 mb-6">Earn 500 points for every friend who signs up with your code.</p>
        <div className="flex items-center gap-3 bg-white/10 rounded-2xl p-3 max-w-xs mx-auto">
          <span className="flex-1 font-mono font-bold text-lg tracking-widest">{code}</span>
          <button onClick={copyCode} className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors">
            {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[['Friends Referred', '7'], ['Pending Earnings', '1,500 pts'], ['Total Earned', '3,500 pts']].map(([l, v]) => (
          <div key={l} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 text-center">
            <p className="text-2xl font-bold text-[#0A1628] mb-1">{v}</p>
            <p className="text-slate-400 text-xs">{l}</p>
          </div>
        ))}
      </div>

      {/* Referral history */}
      <h3 className="font-bold text-slate-900 mb-4">Referral History</h3>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-50">
        {[
          { name: 'Ahmed K.', date: '2026-06-10', status: 'completed', pts: '+500 pts' },
          { name: 'Maria S.', date: '2026-05-28', status: 'completed', pts: '+500 pts' },
          { name: 'Lars A.', date: '2026-06-25', status: 'pending', pts: 'Pending' },
        ].map((r) => (
          <div key={r.name} className="flex items-center gap-4 px-5 py-4">
            <div className="w-9 h-9 gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">{r.name[0]}</div>
            <div className="flex-1">
              <p className="font-medium text-slate-900 text-sm">{r.name}</p>
              <p className="text-xs text-slate-400">{r.date}</p>
            </div>
            <span className={`text-sm font-bold ${r.status === 'completed' ? 'text-emerald-500' : 'text-slate-400'}`}>{r.pts}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function SupportTab() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { isSubmitting } } = useForm()
  const onSubmit = async () => { await new Promise(r => setTimeout(r, 800)); setSubmitted(true) }
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      {/* Contact options */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {[
          { icon: <MessageCircle size={20} />, title: 'Live Chat', sub: 'Online now · ~2 min wait', color: 'text-[#1B4FD8] bg-blue-50' },
          { icon: <Mail size={20} />, title: 'Email Support', sub: 'Reply within 4 hours', color: 'text-violet-500 bg-violet-50' },
          { icon: <Phone size={20} />, title: 'Phone Support', sub: 'Premium & Business only', color: 'text-[#10B981] bg-emerald-50' },
        ].map((c) => (
          <button key={c.title} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 text-left hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${c.color}`}>{c.icon}</div>
            <p className="font-semibold text-slate-900 text-sm mb-0.5">{c.title}</p>
            <p className="text-xs text-slate-400">{c.sub}</p>
          </button>
        ))}
      </div>

      {/* Ticket form */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h3 className="font-bold text-slate-900 mb-5">Submit a Support Ticket</h3>
        {submitted ? (
          <div className="text-center py-6">
            <CheckCircle2 size={40} className="text-emerald-500 mx-auto mb-3" />
            <p className="font-bold text-slate-900 mb-1">Ticket Submitted!</p>
            <p className="text-slate-400 text-sm">Ticket #TKT-{Date.now().toString().slice(-5)} · We'll respond within 4 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Topic</label>
              <select className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#1B4FD8] bg-white" {...register('topic')}>
                <option>Shipping Issue</option><option>Package Damage</option><option>Billing Question</option><option>Account Problem</option><option>Other</option>
              </select>
            </div>
            <Input label="Subject" placeholder="Brief description of your issue" {...register('subject')} />
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Details</label>
              <textarea rows={4} placeholder="Describe your issue in detail..." className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#1B4FD8] resize-none" {...register('details')} />
            </div>
            <Button type="submit" loading={isSubmitting}>Submit Ticket</Button>
          </form>
        )}
      </div>
    </motion.div>
  )
}

function maskPhone(phone: string): string {
  // Keep country code + last 4 digits, mask middle
  const digits = phone.replace(/\D/g, '')
  if (digits.length < 7) return phone
  const last4 = digits.slice(-4)
  const countryCode = phone.match(/^\+\d+/)?.[0] ?? ''
  return `${countryCode} (***) ***-${last4}`
}

function SettingsTab({ user }: { user: NonNullable<ReturnType<typeof useAuth>['user']> }) {
  const [saved, setSaved] = useState(false)
  const [phoneFocused, setPhoneFocused] = useState(false)
  const { register, handleSubmit, formState: { isSubmitting }, watch } = useForm({
    defaultValues: { name: user.name, email: user.email, phone: user.phone ?? '', country: user.country }
  })
  const phoneValue = watch('phone')
  const onSubmit = async () => { await new Promise(r => setTimeout(r, 800)); setSaved(true); setTimeout(() => setSaved(false), 2500) }
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl">
      {/* Profile */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-slate-900 mb-5">Profile Information</h3>
        <div className="flex items-center gap-4 mb-6">
          <div className="relative group flex-shrink-0">
            <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
              {user.name.charAt(0)}
            </div>
            <label className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
              <input type="file" accept="image/*" className="hidden" onChange={() => {}} />
              <span className="text-white text-xs font-medium text-center leading-tight">Change<br/>Photo</span>
            </label>
          </div>
          <div>
            <p className="font-semibold text-slate-900">{user.name}</p>
            <p className="text-slate-400 text-sm">{user.email}</p>
            <span className="inline-flex items-center gap-1 text-xs text-[#F59E0B] font-medium mt-1"><Star size={11} className="fill-[#F59E0B]" /> Premium Member</span>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Full Name" {...register('name')} />
            <Input label="Email" type="email" {...register('email')} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
            <div className="relative">
              {/* Real input — always mounted so RHF tracks value */}
              <input
                type="text"
                className={`w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#1B4FD8] bg-white pr-20 ${phoneFocused ? '' : 'opacity-0 absolute inset-0 pointer-events-none'}`}
                placeholder="+1 (555) 000-0000"
                onFocus={() => setPhoneFocused(true)}
                {...register('phone', { onBlur: () => setPhoneFocused(false) })}
              />
              {/* Masked display — shown when not focused */}
              {!phoneFocused && (
                <div
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-white pr-20 cursor-text text-slate-700"
                  onClick={() => setPhoneFocused(true)}
                >
                  {phoneValue ? maskPhone(phoneValue) : <span className="text-slate-400">+1 (555) 000-0000</span>}
                  {phoneValue && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-200 select-none">
                      masked
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Default Country</label>
            <select className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#1B4FD8] bg-white" {...register('country')}>
              <option>United Arab Emirates</option><option>India</option><option>United Kingdom</option><option>Saudi Arabia</option><option>Germany</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <Button type="submit" loading={isSubmitting}>Save Changes</Button>
            {saved && <span className="text-emerald-600 text-sm flex items-center gap-1"><CheckCircle2 size={14} /> Saved!</span>}
          </div>
        </form>
      </div>

      {/* Password */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-5">
        <h3 className="font-bold text-slate-900 mb-5">Change Password</h3>
        <div className="space-y-4">
          <Input label="Current Password" type="password" placeholder="••••••••" />
          <Input label="New Password" type="password" placeholder="••••••••" hint="At least 8 characters" />
          <Input label="Confirm New Password" type="password" placeholder="••••••••" />
          <Button variant="outline">Update Password</Button>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h3 className="font-bold text-slate-900 mb-5">Notification Preferences</h3>
        <div className="space-y-4">
          {[
            ['Email me when packages arrive', true],
            ['Email me shipping updates', true],
            ['Promotional emails', false],
            ['SMS tracking alerts', false],
          ].map(([label, def]) => (
            <div key={label as string} className="flex items-center justify-between">
              <span className="text-sm text-slate-700">{label as string}</span>
              <input type="checkbox" defaultChecked={def as boolean} className="accent-[#1B4FD8] w-4 h-4 rounded" />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
