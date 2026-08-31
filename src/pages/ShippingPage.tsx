import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Globe, Package, Zap, Shield, Calculator, Truck, CheckCircle2, ArrowRight, Clock, Star } from 'lucide-react'
import Button from '@/components/ui/Button'

const SERVICES = [
  {
    icon: <Globe size={28} />,
    title: 'International Forwarding',
    desc: 'Shop from any US store and we\'ll forward your packages to 220+ countries at the best rates.',
    color: 'text-[#1B4FD8]', bg: 'bg-blue-50',
    features: ['220+ destination countries', 'Multiple carrier options', 'Real-time tracking', 'Customs paperwork included'],
    link: '/countries', linkLabel: 'View All Countries',
  },
  {
    icon: <Package size={28} />,
    title: 'Package Consolidation',
    desc: 'Combine multiple packages into one shipment and save up to 80% on international shipping.',
    color: 'text-[#10B981]', bg: 'bg-emerald-50',
    features: ['Up to 10 packages per shipment', 'Save up to 80%', 'Free repackaging', 'Photo confirmation'],
    link: '/signup', linkLabel: 'Start Consolidating',
  },
  {
    icon: <Shield size={28} />,
    title: 'Package Insurance',
    desc: 'Protect your purchases with comprehensive coverage against loss or damage during transit.',
    color: 'text-violet-500', bg: 'bg-violet-50',
    features: ['Coverage up to $10,000', 'Easy claims process', 'Instant approval', 'Full replacement value'],
    link: '/insurance', linkLabel: 'Learn About Insurance',
  },
  {
    icon: <Zap size={28} />,
    title: 'Express Shipping',
    desc: 'Need it fast? Our Express service delivers to most countries in 3–7 business days.',
    color: 'text-[#F59E0B]', bg: 'bg-amber-50',
    features: ['3–7 business days', 'Priority handling', 'Saturday delivery', 'Door-to-door service'],
    link: '/calculator', linkLabel: 'Calculate Express Rate',
  },
]

const HOW_IT_WORKS = [
  { step: '01', title: 'Get Your Free US Address', desc: 'Sign up and instantly receive a free US shipping address in Portland, Oregon — tax-free.', icon: <Star size={22} />, color: 'bg-[#1B4FD8]' },
  { step: '02', title: 'Shop US Stores',           desc: 'Shop from Amazon, Apple, Nike, Sephora and 50,000+ more US stores using your Shoppers Crown address.', icon: <Package size={22} />, color: 'bg-[#10B981]' },
  { step: '03', title: 'We Receive & Inspect',     desc: 'Packages arrive at our secure Portland warehouse. We inspect, photograph, and store them for you.', icon: <CheckCircle2 size={22} />, color: 'bg-violet-500' },
  { step: '04', title: 'Choose How to Ship',       desc: 'Select your shipping speed, carrier, and add-ons. We handle customs paperwork automatically.', icon: <Truck size={22} />, color: 'bg-[#F59E0B]' },
  { step: '05', title: 'Delivered to Your Door',   desc: 'Track your package in real-time as it travels from our warehouse to your front door.', icon: <Globe size={22} />, color: 'bg-rose-500' },
]

const CARRIERS = [
  { name: 'DHL Express',  speed: '3–6 days',   logo: '🟡', desc: 'Fastest international delivery' },
  { name: 'FedEx',        speed: '5–8 days',   logo: '🟣', desc: 'Reliable door-to-door' },
  { name: 'UPS',          speed: '5–10 days',  logo: '🟤', desc: 'Broad international network' },
  { name: 'USPS Priority',speed: '6–15 days',  logo: '🔵', desc: 'Affordable option' },
]

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0A1628] to-[#1E3A8A] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm mb-6">
              <Truck size={14} /> Shipping Services
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">Ship Anything, Anywhere</h1>
            <p className="text-white/60 text-lg max-w-xl mx-auto mb-8">
              Fast, affordable international shipping from the US to 220+ countries. Your packages, our expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/calculator"><Button size="lg" icon={<Calculator size={18} />}>Calculate Rates</Button></Link>
              <Link to="/signup"><Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">Get Free US Address</Button></Link>
            </div>
          </motion.div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { val: '220+', label: 'Countries' },
              { val: '82%', label: 'Savings vs retail' },
              { val: '500K+', label: 'Happy members' },
              { val: '4.8★', label: 'Avg rating' },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="bg-white/10 rounded-2xl p-4 text-center text-white">
                <p className="text-3xl font-bold">{s.val}</p>
                <p className="text-white/60 text-sm">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-[#0A1628] text-center mb-3">Our Shipping Services</h2>
        <p className="text-slate-500 text-center mb-10">Everything you need to ship internationally with confidence.</p>
        <div className="grid md:grid-cols-2 gap-6">
          {SERVICES.map((svc, i) => (
            <motion.div key={svc.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className={`w-14 h-14 ${svc.bg} rounded-2xl flex items-center justify-center ${svc.color} mb-5`}>{svc.icon}</div>
              <h3 className="text-xl font-bold text-[#0A1628] mb-2">{svc.title}</h3>
              <p className="text-slate-500 text-sm mb-4">{svc.desc}</p>
              <div className="space-y-2 mb-5">
                {svc.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />{f}
                  </div>
                ))}
              </div>
              <Link to={svc.link} className={`flex items-center gap-1.5 ${svc.color} text-sm font-semibold hover:gap-2.5 transition-all`}>
                {svc.linkLabel} <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0A1628] text-center mb-3">How It Works</h2>
          <p className="text-slate-500 text-center mb-10">From US store to your doorstep in 5 simple steps.</p>
          <div className="relative">
            <div className="hidden md:block absolute left-8 top-5 bottom-5 w-0.5 bg-slate-100" />
            <div className="space-y-6">
              {HOW_IT_WORKS.map((step, i) => (
                <motion.div key={step.step} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex gap-5">
                  <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-md`}>
                    {step.icon}
                  </div>
                  <div className="pt-3">
                    <p className="text-xs text-slate-400 font-semibold mb-0.5">STEP {step.step}</p>
                    <h4 className="font-bold text-slate-900 mb-1">{step.title}</h4>
                    <p className="text-slate-500 text-sm">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Carriers */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-[#0A1628] text-center mb-3">Our Carrier Partners</h2>
        <p className="text-slate-500 text-center mb-10">We work with the world's leading carriers to give you the best rates and reliability.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {CARRIERS.map((c, i) => (
            <motion.div key={c.name} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 text-center hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">{c.logo}</div>
              <p className="font-bold text-slate-900 mb-1">{c.name}</p>
              <div className="flex items-center justify-center gap-1.5 text-emerald-600 text-xs font-medium mb-1">
                <Clock size={11} /> {c.speed}
              </div>
              <p className="text-slate-400 text-xs">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-[#1B4FD8] to-[#38BDF8] py-16 px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold text-white mb-3">Start Shipping Today</h2>
          <p className="text-white/70 mb-8">Join 500,000+ shoppers who use Shoppers Crown to shop from the US.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/signup"><Button size="lg" variant="accent" iconRight={<ArrowRight size={18} />}>Get Free US Address</Button></Link>
            <Link to="/calculator"><Button size="lg" className="bg-white/20 text-white border border-white/30 hover:bg-white/30">Calculate Rates</Button></Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
