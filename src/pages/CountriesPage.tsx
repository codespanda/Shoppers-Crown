import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Globe, Truck, Clock, Star } from 'lucide-react'
import { COUNTRIES } from '@/data/mockData'
import { formatCurrency } from '@/lib/utils'
import { Link } from 'react-router-dom'

// Extend with more countries for a richer page
const ALL_COUNTRIES = [
  ...COUNTRIES,
  { id: '13', name: 'Australia',     code: 'AU', flag: '🇦🇺', shippingRate: 24.99, deliveryDays: '7-12',  popular: true  },
  { id: '14', name: 'Japan',         code: 'JP', flag: '🇯🇵', shippingRate: 21.99, deliveryDays: '6-10',  popular: true  },
  { id: '15', name: 'South Korea',   code: 'KR', flag: '🇰🇷', shippingRate: 22.99, deliveryDays: '6-11',  popular: false },
  { id: '16', name: 'Brazil',        code: 'BR', flag: '🇧🇷', shippingRate: 29.99, deliveryDays: '10-16', popular: false },
  { id: '17', name: 'South Africa',  code: 'ZA', flag: '🇿🇦', shippingRate: 27.99, deliveryDays: '9-14',  popular: false },
  { id: '18', name: 'Nigeria',       code: 'NG', flag: '🇳🇬', shippingRate: 30.99, deliveryDays: '10-16', popular: false },
  { id: '19', name: 'Egypt',         code: 'EG', flag: '🇪🇬', shippingRate: 26.99, deliveryDays: '8-13',  popular: false },
  { id: '20', name: 'Pakistan',      code: 'PK', flag: '🇵🇰', shippingRate: 23.99, deliveryDays: '7-12',  popular: false },
  { id: '21', name: 'Philippines',   code: 'PH', flag: '🇵🇭', shippingRate: 22.99, deliveryDays: '7-11',  popular: false },
  { id: '22', name: 'Thailand',      code: 'TH', flag: '🇹🇭', shippingRate: 21.99, deliveryDays: '6-10',  popular: false },
  { id: '23', name: 'Netherlands',   code: 'NL', flag: '🇳🇱', shippingRate: 25.99, deliveryDays: '7-11',  popular: false },
  { id: '24', name: 'Italy',         code: 'IT', flag: '🇮🇹', shippingRate: 26.99, deliveryDays: '7-12',  popular: false },
  { id: '25', name: 'Spain',         code: 'ES', flag: '🇪🇸', shippingRate: 25.99, deliveryDays: '7-12',  popular: false },
  { id: '26', name: 'Turkey',        code: 'TR', flag: '🇹🇷', shippingRate: 24.99, deliveryDays: '7-11',  popular: false },
  { id: '27', name: 'Malaysia',      code: 'MY', flag: '🇲🇾', shippingRate: 20.99, deliveryDays: '6-10',  popular: false },
  { id: '28', name: 'Indonesia',     code: 'ID', flag: '🇮🇩', shippingRate: 22.99, deliveryDays: '7-12',  popular: false },
  { id: '29', name: 'Israel',        code: 'IL', flag: '🇮🇱', shippingRate: 24.99, deliveryDays: '7-11',  popular: false },
  { id: '30', name: 'New Zealand',   code: 'NZ', flag: '🇳🇿', shippingRate: 26.99, deliveryDays: '8-13',  popular: false },
]

export default function CountriesPage() {
  const [query, setQuery] = useState('')
  const [view, setView] = useState<'all' | 'popular'>('all')

  const filtered = ALL_COUNTRIES
    .filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
    .filter((c) => view === 'popular' ? c.popular : true)
    .sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1B4FD8] to-[#38BDF8] py-16 text-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm mb-5">
            <Globe size={14} /> International Shipping
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">We Ship to 220+ Countries</h1>
          <p className="text-white/70 mb-8 max-w-lg mx-auto">Find shipping rates and delivery estimates to your country.</p>
          <div className="max-w-md mx-auto relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search countries..."
              className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none shadow-lg text-sm"
            />
          </div>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-5 mb-10">
          {[
            { icon: <Globe size={22} className="text-[#1B4FD8]" />, bg: 'bg-blue-50', label: '220+ Countries', sub: 'Global reach' },
            { icon: <Truck size={22} className="text-[#10B981]" />, bg: 'bg-emerald-50', label: '3–20 Day Delivery', sub: 'Multiple speed options' },
            { icon: <Star size={22} className="text-[#F59E0B]" />, bg: 'bg-amber-50', label: 'Up to 82% Off', sub: 'vs. standard retail rates' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-4">
              <div className={`w-11 h-11 ${s.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>{s.icon}</div>
              <div><p className="font-bold text-slate-900">{s.label}</p><p className="text-slate-400 text-xs">{s.sub}</p></div>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setView('all')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${view === 'all' ? 'bg-[#1B4FD8] text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-[#1B4FD8]'}`}>
            All Countries ({ALL_COUNTRIES.length})
          </button>
          <button onClick={() => setView('popular')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${view === 'popular' ? 'bg-[#1B4FD8] text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-[#1B4FD8]'}`}>
            Most Popular
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-4 px-5 py-3 bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <span className="col-span-2">Country</span>
            <span className="flex items-center gap-1"><Truck size={12} /> Base Rate / kg</span>
            <span className="flex items-center gap-1"><Clock size={12} /> Delivery Days</span>
          </div>
          <div className="divide-y divide-slate-50">
            {filtered.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.02 }}
                className="grid grid-cols-4 items-center px-5 py-3.5 hover:bg-slate-50 transition-colors"
              >
                <div className="col-span-2 flex items-center gap-3">
                  <span className="text-2xl">{c.flag}</span>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{c.name}</p>
                    <p className="text-slate-400 text-xs">{c.code}</p>
                  </div>
                  {c.popular && <span className="bg-blue-50 text-[#1B4FD8] text-xs px-2 py-0.5 rounded-full font-medium">Popular</span>}
                </div>
                <p className="font-semibold text-slate-900 text-sm">From {formatCurrency(c.shippingRate)}</p>
                <div className="flex items-center justify-between">
                  <p className="text-slate-600 text-sm">{c.deliveryDays} days</p>
                  <Link to="/calculator" className="text-[#1B4FD8] text-xs font-medium hover:underline hidden sm:block">Calculate →</Link>
                </div>
              </motion.div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-400">No countries found matching "{query}"</div>
          )}
        </div>

        <p className="text-center text-slate-400 text-sm mt-6">
          Don't see your country?{' '}
          <Link to="/support" className="text-[#1B4FD8] hover:underline">Contact us</Link>
          {' '}— we're constantly expanding.
        </p>
      </div>
    </div>
  )
}
