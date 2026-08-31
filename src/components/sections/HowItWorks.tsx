import { motion } from 'framer-motion'
import { MapPin, ShoppingBag, Package, Plane, Home } from 'lucide-react'

const STEPS = [
  {
    step: '01',
    icon: <MapPin size={28} />,
    title: 'Get Your Free US Address',
    description: 'Sign up and instantly receive a unique US shipping address in Portland, Oregon. Use it when shopping at any US store.',
    color: '#1B4FD8',
    bg: 'bg-blue-50',
  },
  {
    step: '02',
    icon: <ShoppingBag size={28} />,
    title: 'Shop Any US Store',
    description: "Browse thousands of US online stores. Use your Shoppers Crown address at checkout — shop Amazon, Nike, Apple, or any US retailer.",
    color: '#38BDF8',
    bg: 'bg-sky-50',
  },
  {
    step: '03',
    icon: <Package size={28} />,
    title: 'Packages Arrive at Warehouse',
    description: "Your packages arrive at our secure Portland warehouse. We photograph, weigh, and inspect each item for your peace of mind.",
    color: '#10B981',
    bg: 'bg-emerald-50',
  },
  {
    step: '04',
    icon: <Plane size={28} />,
    title: 'We Ship Internationally',
    description: 'Choose your shipping speed and destination. We consolidate packages to save you money and ship with trusted global carriers.',
    color: '#F59E0B',
    bg: 'bg-amber-50',
  },
  {
    step: '05',
    icon: <Home size={28} />,
    title: 'Delivered to Your Door',
    description: 'Track your shipment in real-time. Receive your packages at your door, anywhere in the world, fast and safely.',
    color: '#8B5CF6',
    bg: 'bg-violet-50',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24 bg-[#F8FAFC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#1B4FD8] font-semibold text-sm mb-3 uppercase tracking-wider"
          >
            Simple Process
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-[#0A1628] mb-4"
          >
            How It
            <span className="gradient-text"> Works</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg max-w-xl mx-auto"
          >
            Shop from any US store and receive your package anywhere in the world in 5 easy steps
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-[#1B4FD8] via-[#38BDF8] to-[#8B5CF6] opacity-20" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative text-center group"
              >
                {/* Step number + icon */}
                <div className="relative inline-block mb-6">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-16 h-16 ${step.bg} rounded-2xl flex items-center justify-center mx-auto shadow-sm group-hover:shadow-lg transition-shadow duration-300`}
                    style={{ color: step.color }}
                  >
                    {step.icon}
                  </motion.div>
                  <span
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center shadow-md"
                    style={{ backgroundColor: step.color }}
                  >
                    {i + 1}
                  </span>
                </div>

                <h3 className="font-bold text-[#0A1628] text-base mb-2">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>

                {/* Arrow connector */}
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-4 text-slate-300 text-2xl z-10">→</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
