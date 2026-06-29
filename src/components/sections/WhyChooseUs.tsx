import { motion } from 'framer-motion'
import { Package, DollarSign, Shield, Zap, Lock, RotateCcw, HeadphonesIcon, Camera } from 'lucide-react'

const FEATURES = [
  { icon: <Package size={24} />, title: 'Package Consolidation', description: 'Combine up to 10 packages into one shipment and save up to 80% on shipping costs.', color: '#0057FF', bg: 'bg-blue-50' },
  { icon: <DollarSign size={24} />, title: 'Tax-Free Shopping', description: 'Shop from Oregon — no state sales tax. Save on every purchase from any US store.', color: '#10B981', bg: 'bg-emerald-50' },
  { icon: <Shield size={24} />, title: 'Secure Warehouse', description: 'State-of-the-art secure facility with 24/7 monitoring and comprehensive insurance.', color: '#8B5CF6', bg: 'bg-violet-50' },
  { icon: <Zap size={24} />, title: 'Fast Delivery', description: 'Express shipping options to 220+ countries. Arrive in as little as 3-5 business days.', color: '#FFB800', bg: 'bg-amber-50' },
  { icon: <Lock size={24} />, title: 'Full Insurance', description: 'Optional coverage up to $2,000 per shipment. Your packages are always protected.', color: '#EF4444', bg: 'bg-red-50' },
  { icon: <RotateCcw size={24} />, title: 'Easy Returns', description: 'We handle returns on your behalf. Send items back to US stores without any hassle.', color: '#00C2FF', bg: 'bg-sky-50' },
  { icon: <HeadphonesIcon size={24} />, title: '24/7 Support', description: 'Our dedicated team is available around the clock via chat, email, and phone.', color: '#F97316', bg: 'bg-orange-50' },
  { icon: <Camera size={24} />, title: 'Package Photos', description: 'We photograph every package so you can see exactly what arrived before shipping.', color: '#EC4899', bg: 'bg-pink-50' },
]

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#0057FF] font-semibold text-sm mb-3 uppercase tracking-wider"
          >
            Why MyUS Shopping
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-[#0F172A] mb-4"
          >
            Everything You Need to
            <span className="gradient-text"> Shop Globally</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg max-w-xl mx-auto"
          >
            We've built the most comprehensive international shopping platform with features designed for global shoppers
          </motion.p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-200 transition-all duration-300 group"
            >
              <div
                className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                style={{ color: feature.color }}
              >
                {feature.icon}
              </div>
              <h3 className="font-bold text-[#0F172A] text-base mb-2">{feature.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
