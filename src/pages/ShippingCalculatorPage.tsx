import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Package, Globe, Zap, Shield, Truck, CheckCircle2, Info } from 'lucide-react'
import { COUNTRIES } from '@/data/mockData'
import { formatCurrency } from '@/lib/utils'
import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'

const SPEEDS = [
  { id: 'economy',  label: 'Economy',  days: '12–20',  multiplier: 1,   icon: <Package size={18} />,  color: 'text-slate-500', popular: false },
  { id: 'standard', label: 'Standard', days: '8–14',   multiplier: 1.4, icon: <Truck size={18} />,    color: 'text-[#1B4FD8]', popular: true  },
  { id: 'express',  label: 'Express',  days: '3–7',    multiplier: 2.2, icon: <Zap size={18} />,      color: 'text-[#F59E0B]', popular: false },
]

const CARRIERS = ['DHL Express', 'FedEx', 'UPS', 'USPS Priority']

export default function ShippingCalculatorPage() {
  const [country, setCountry] = useState('1')
  const [weight, setWeight] = useState(1)
  const [speed, setSpeed] = useState('standard')
  const [insurance, setInsurance] = useState(false)
  const [carrier, setCarrier] = useState('DHL Express')
  const [length, setLength] = useState(20)
  const [width, setWidth] = useState(15)
  const [height, setHeight] = useState(10)

  const selectedCountry = COUNTRIES.find((c) => c.id === country)
  const selectedSpeed   = SPEEDS.find((s) => s.id === speed)

  // Dimensional weight (L×W×H / 5000)
  const dimWeight = (length * width * height) / 5000
  const billableWeight = Math.max(weight, dimWeight)

  const baseRate     = selectedCountry?.shippingRate ?? 30
  const shippingCost = baseRate * (selectedSpeed?.multiplier ?? 1) * Math.max(billableWeight, 0.5)
  const insuranceCost = insurance ? Math.max(shippingCost * 0.03, 5) : 0
  const total         = shippingCost + insuranceCost

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0A1628] to-[#1E3A8A] py-16 text-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm mb-5">
            <Calculator size={14} /> Instant Rate Calculator
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Shipping Rate Calculator</h1>
          <p className="text-white/60 max-w-xl mx-auto">
            Get an instant estimate for shipping your packages internationally. No account needed.
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form — 3 cols */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Destination */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Globe size={18} className="text-[#1B4FD8]" /> Destination</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Ship From</label>
                  <div className="px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-600 font-medium">
                    🇺🇸 Portland, OR (Shoppers Crown Warehouse)
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Ship To</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#1B4FD8] bg-white"
                  >
                    {COUNTRIES.map((c) => <option key={c.id} value={c.id}>{c.flag} {c.name}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Package dimensions */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Package size={18} className="text-[#1B4FD8]" /> Package Details</h3>
              <div className="mb-5">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Actual Weight: <span className="text-[#1B4FD8] font-bold">{weight} kg</span>
                </label>
                <input type="range" min="0.1" max="30" step="0.1" value={weight} onChange={(e) => setWeight(parseFloat(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{ background: `linear-gradient(to right, #1B4FD8 ${(weight / 30) * 100}%, #e2e8f0 ${(weight / 30) * 100}%)` }}
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1"><span>0.1 kg</span><span>30 kg</span></div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Length (cm)', val: length, set: setLength },
                  { label: 'Width (cm)',  val: width,  set: setWidth  },
                  { label: 'Height (cm)', val: height, set: setHeight },
                ].map(({ label, val, set }) => (
                  <div key={label}>
                    <label className="block text-xs font-medium text-slate-500 mb-1">{label}</label>
                    <input type="number" min={1} max={200} value={val} onChange={(e) => set(parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#1B4FD8]" />
                  </div>
                ))}
              </div>
              {dimWeight > weight && (
                <div className="mt-3 p-3 bg-amber-50 rounded-xl text-xs text-amber-700 flex items-start gap-2">
                  <Info size={14} className="flex-shrink-0 mt-0.5" />
                  Dimensional weight ({dimWeight.toFixed(2)} kg) is greater than actual weight. Billable weight: <strong>{billableWeight.toFixed(2)} kg</strong>
                </div>
              )}
            </div>

            {/* Shipping speed */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Zap size={18} className="text-[#1B4FD8]" /> Shipping Speed</h3>
              <div className="grid grid-cols-3 gap-3 mb-5">
                {SPEEDS.map((s) => (
                  <button key={s.id} onClick={() => setSpeed(s.id)}
                    className={`relative p-4 rounded-2xl border-2 text-left transition-all ${speed === s.id ? 'border-[#1B4FD8] bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}
                  >
                    {s.popular && (
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#1B4FD8] text-white text-xs px-2 py-0.5 rounded-full whitespace-nowrap">Popular</span>
                    )}
                    <span className={`${speed === s.id ? 'text-[#1B4FD8]' : s.color} mb-2 block`}>{s.icon}</span>
                    <p className={`font-semibold text-sm ${speed === s.id ? 'text-[#1B4FD8]' : 'text-slate-800'}`}>{s.label}</p>
                    <p className="text-xs text-slate-400">{s.days} days</p>
                  </button>
                ))}
              </div>

              {/* Carrier */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Carrier</label>
                <div className="grid grid-cols-2 gap-2">
                  {CARRIERS.map((c) => (
                    <button key={c} onClick={() => setCarrier(c)}
                      className={`px-3 py-2 rounded-xl border text-sm font-medium transition-all ${carrier === c ? 'border-[#1B4FD8] bg-blue-50 text-[#1B4FD8]' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Insurance */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center"><Shield size={18} className="text-emerald-600" /></div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">Package Insurance</p>
                    <p className="text-slate-400 text-xs">Coverage up to $2,000 · ~3% of shipping cost</p>
                  </div>
                </div>
                <button onClick={() => setInsurance(!insurance)}
                  className={`w-12 h-6 rounded-full transition-all relative flex-shrink-0 ${insurance ? 'bg-[#1B4FD8]' : 'bg-slate-200'}`}>
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${insurance ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Result — 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-2"
          >
            <div className="sticky top-24 space-y-5">
              {/* Price card */}
              <div className="bg-gradient-to-br from-[#1B4FD8] to-[#38BDF8] rounded-3xl p-6 text-white shadow-xl">
                <p className="text-white/70 text-sm mb-1">Estimated Total</p>
                <motion.div key={total} initial={{ scale: 1.05 }} animate={{ scale: 1 }}>
                  <p className="text-5xl font-bold mb-4">{formatCurrency(total)}</p>
                </motion.div>
                <div className="space-y-2 text-sm border-t border-white/20 pt-4">
                  <div className="flex justify-between text-white/80">
                    <span>Shipping ({billableWeight.toFixed(1)} kg · {selectedSpeed?.label})</span>
                    <span>{formatCurrency(shippingCost)}</span>
                  </div>
                  {insurance && (
                    <div className="flex justify-between text-white/80">
                      <span>Insurance</span><span>{formatCurrency(insuranceCost)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold text-white pt-1 border-t border-white/20">
                    <span>Delivery</span>
                    <span>{selectedSpeed?.days} business days</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Destination</span>
                    <span>{selectedCountry?.flag} {selectedCountry?.name}</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <p className="font-semibold text-slate-900 mb-1">Ready to ship?</p>
                <p className="text-slate-400 text-sm mb-4">Sign up for free to get your US address and start shopping.</p>
                <Link to="/signup">
                  <Button className="w-full mb-2">Get Free US Address</Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" className="w-full">I have an account</Button>
                </Link>
              </div>

              {/* What's included */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <p className="font-semibold text-slate-900 mb-3 text-sm">What's included</p>
                <div className="space-y-2">
                  {['Package inspection & photos', 'Customs paperwork', 'Secure consolidation', 'Real-time tracking'].map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />{f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
