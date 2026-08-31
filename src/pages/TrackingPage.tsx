import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Package, MapPin, CheckCircle2, Clock, Truck } from 'lucide-react'
import { TRACKING_EVENTS } from '@/data/mockData'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

const STATUS_ICONS = {
  received: <Package size={16} />,
  processed: <CheckCircle2 size={16} />,
  dispatched: <Truck size={16} />,
  'in-transit': <Truck size={16} />,
  customs: <Clock size={16} />,
  delivered: <CheckCircle2 size={16} />,
}

export default function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [result, setResult] = useState<typeof TRACKING_EVENTS | null>(null)
  const [loading, setLoading] = useState(false)

  const handleTrack = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setResult(TRACKING_EVENTS)
    setLoading(false)
  }

  const progressSteps = ['Received', 'Processing', 'Dispatched', 'In Transit', 'Customs', 'Delivered']
  const currentStep = 4

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0A1628] to-[#1E3A8A] py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm mb-6">
              <MapPin size={14} />
              Real-time Package Tracking
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Track Your Package</h1>
            <p className="text-white/60 mb-8">Enter your Shoppers Crown tracking number or carrier tracking number</p>

            <div className="flex gap-3 max-w-xl mx-auto">
              <div className="flex-1 relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
                  placeholder="e.g. Shoppers Crown-2026-789456"
                  className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-[#1B4FD8]/20 text-sm shadow-lg"
                />
              </div>
              <Button size="lg" onClick={handleTrack} loading={loading} className="px-8 rounded-2xl">
                Track
              </Button>
            </div>

            <button onClick={() => setResult(TRACKING_EVENTS)} className="mt-4 text-white/50 hover:text-white/80 text-sm transition-colors">
              Try demo tracking →
            </button>
          </motion.div>
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="max-w-4xl mx-auto px-4 py-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Summary card */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-slate-400 text-sm mb-1">Tracking Number</p>
                  <p className="text-xl font-bold text-[#0A1628] font-mono">{result.trackingNumber}</p>
                </div>
                <Badge variant="warning" size="md" className="text-sm px-4 py-2 self-start md:self-auto">
                  <Truck size={14} className="mr-1.5" /> In Transit
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'From', value: result.origin },
                  { label: 'To', value: result.destination },
                  { label: 'Carrier', value: result.carrier },
                  { label: 'Est. Delivery', value: result.estimatedDelivery },
                ].map((item) => (
                  <div key={item.label} className="bg-slate-50 rounded-xl p-3">
                    <p className="text-slate-400 text-xs mb-1">{item.label}</p>
                    <p className="font-semibold text-slate-900 text-sm">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  {progressSteps.map((step, i) => (
                    <div key={step} className="flex flex-col items-center gap-1">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        i < currentStep ? 'bg-[#1B4FD8] text-white' :
                        i === currentStep ? 'bg-[#1B4FD8] text-white ring-4 ring-[#1B4FD8]/20' :
                        'bg-slate-100 text-slate-400'
                      }`}>
                        {i < currentStep ? <CheckCircle2 size={14} /> : i + 1}
                      </div>
                      <span className="hidden md:block text-xs text-slate-500 text-center max-w-[60px]">{step}</span>
                    </div>
                  ))}
                </div>
                <div className="absolute top-3.5 left-0 right-0 h-0.5 bg-slate-100 -z-0">
                  <div className="h-full bg-[#1B4FD8] transition-all" style={{ width: `${(currentStep / (progressSteps.length - 1)) * 100}%` }} />
                </div>
              </div>
            </div>

            {/* Events timeline */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
              <h3 className="font-bold text-slate-900 mb-5">Tracking History</h3>
              <div className="space-y-4">
                {[...result.events].reverse().map((event, i) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-4"
                  >
                    <div className="flex flex-col items-center">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        i === 0 ? 'bg-[#1B4FD8] text-white shadow-md' : 'bg-slate-100 text-slate-400'
                      }`}>
                        {STATUS_ICONS[event.status as keyof typeof STATUS_ICONS] ?? <Package size={16} />}
                      </div>
                      {i < result.events.length - 1 && <div className="w-0.5 h-6 bg-slate-100 mt-2" />}
                    </div>
                    <div className="pb-4">
                      <p className="font-semibold text-slate-900 text-sm">{event.description}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{event.location} · {event.timestamp}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Empty state */}
      {!result && (
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-5">
            <Package size={36} className="text-slate-300" />
          </div>
          <h3 className="font-bold text-slate-900 text-xl mb-2">Enter a tracking number</h3>
          <p className="text-slate-400">We'll show you the real-time status of your shipment</p>
        </div>
      )}
    </div>
  )
}
