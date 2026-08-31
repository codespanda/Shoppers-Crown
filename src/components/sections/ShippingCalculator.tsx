import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Package, Globe, Zap, Shield } from 'lucide-react'
import { COUNTRIES } from '@/data/mockData'
import { formatCurrency } from '@/lib/utils'

const SPEEDS = [
  { id: 'economy', label: 'Economy', days: '12-20 days', multiplier: 1, icon: '📦' },
  { id: 'standard', label: 'Standard', days: '8-14 days', multiplier: 1.4, icon: '🚚' },
  { id: 'express', label: 'Express', days: '5-8 days', multiplier: 2, icon: '⚡' },
]

export default function ShippingCalculator() {
  const [country, setCountry] = useState('1')
  const [weight, setWeight] = useState(1)
  const [speed, setSpeed] = useState('standard')
  const [insurance, setInsurance] = useState(false)

  const selectedCountry = COUNTRIES.find((c) => c.id === country)
  const selectedSpeed = SPEEDS.find((s) => s.id === speed)

  const baseRate = selectedCountry?.shippingRate ?? 30
  const shippingCost = baseRate * (selectedSpeed?.multiplier ?? 1) * Math.max(weight, 0.5)
  const insuranceCost = insurance ? Math.max(shippingCost * 0.03, 5) : 0
  const total = shippingCost + insuranceCost

  return (
    <section className="py-24 bg-gradient-to-br from-[#0A1628] to-[#1E293B] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 text-[#38BDF8] font-semibold text-sm mb-4">
              <Calculator size={16} />
              SHIPPING CALCULATOR
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Know Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#1B4FD8] to-[#38BDF8]">
                Shipping Cost
              </span>
              Before You Buy
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Get instant shipping estimates to any country. No surprises at checkout — transparent pricing always.
            </p>

            <div className="space-y-4">
              {[
                { icon: <Globe size={18} />, text: '220+ countries supported', color: 'text-[#1B4FD8]' },
                { icon: <Zap size={18} />, text: 'Real-time rate calculation', color: 'text-[#F59E0B]' },
                { icon: <Shield size={18} />, text: 'Includes customs estimate', color: 'text-[#10B981]' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <span className={item.color}>{item.icon}</span>
                  <span className="text-slate-300 text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Calculator card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <h3 className="font-bold text-[#0A1628] text-xl mb-6 flex items-center gap-2">
                <Package size={20} className="text-[#1B4FD8]" />
                Calculate Your Rate
              </h3>

              {/* Country */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Destination Country</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#1B4FD8] focus:ring-4 focus:ring-[#1B4FD8]/10 bg-white"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.id} value={c.id}>{c.flag} {c.name}</option>
                  ))}
                </select>
              </div>

              {/* Weight */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Package Weight: <span className="text-[#1B4FD8]">{weight} kg</span>
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="30"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#1B4FD8] [&::-webkit-slider-thumb]:shadow-md"
                  style={{ background: `linear-gradient(to right, #1B4FD8 ${(weight / 30) * 100}%, #e2e8f0 ${(weight / 30) * 100}%)` }}
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>0.1 kg</span><span>30 kg</span>
                </div>
              </div>

              {/* Speed */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Shipping Speed</label>
                <div className="grid grid-cols-3 gap-3">
                  {SPEEDS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSpeed(s.id)}
                      className={`p-3 rounded-xl border-2 text-center transition-all duration-200 ${
                        speed === s.id
                          ? 'border-[#1B4FD8] bg-blue-50 text-[#1B4FD8]'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-xl mb-1">{s.icon}</div>
                      <div className="text-xs font-semibold">{s.label}</div>
                      <div className="text-xs text-slate-400">{s.days}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Insurance */}
              <div className="flex items-center justify-between mb-6 p-4 bg-slate-50 rounded-xl">
                <div>
                  <p className="font-medium text-slate-800 text-sm">Add Insurance</p>
                  <p className="text-slate-400 text-xs">Coverage up to $2,000</p>
                </div>
                <button
                  onClick={() => setInsurance(!insurance)}
                  className={`w-12 h-6 rounded-full transition-all duration-200 relative ${insurance ? 'bg-[#1B4FD8]' : 'bg-slate-200'}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${insurance ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
              </div>

              {/* Result */}
              <div className="bg-gradient-to-br from-[#1B4FD8] to-[#38BDF8] rounded-2xl p-5 text-white">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white/80 text-sm">Estimated Total</span>
                  <motion.span
                    key={total}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className="text-3xl font-bold"
                  >
                    {formatCurrency(total)}
                  </motion.span>
                </div>
                <div className="text-xs text-white/70 space-y-1">
                  <div className="flex justify-between">
                    <span>Shipping ({weight}kg × {selectedSpeed?.label})</span>
                    <span>{formatCurrency(shippingCost)}</span>
                  </div>
                  {insurance && (
                    <div className="flex justify-between">
                      <span>Insurance</span>
                      <span>{formatCurrency(insuranceCost)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-medium text-white/90 pt-1 border-t border-white/20">
                    <span>Delivery</span>
                    <span>{selectedCountry?.deliveryDays} days</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
