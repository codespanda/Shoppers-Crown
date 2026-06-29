import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, TrendingUp } from 'lucide-react'
import { BRANDS } from '@/data/mockData'
import BrandLogo from '@/components/ui/BrandLogo'

export default function BrandsSection() {
  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-[#0057FF] font-semibold text-sm mb-3"
            >
              <TrendingUp size={16} />
              TOP US BRANDS
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold text-[#0F172A]"
            >
              Shop Your Favorite
              <span className="gradient-text"> US Stores</span>
            </motion.h2>
          </div>
          <Link to="/brands" className="hidden md:flex items-center gap-2 text-[#0057FF] font-semibold text-sm hover:gap-3 transition-all">
            View All Brands <ArrowRight size={16} />
          </Link>
        </div>

        {/* Brands grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {BRANDS.map((brand, i) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group"
            >
              <Link to={`/brands/${brand.id}`}>
                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#0057FF]/20 transition-all duration-300 text-center">
                  {/* Logo */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm overflow-hidden p-1.5"
                    style={{ backgroundColor: brand.color + '12' }}
                  >
                    <BrandLogo name={brand.name} size={44} />
                  </div>

                  {/* Name */}
                  <p className="font-semibold text-slate-900 text-sm mb-1 group-hover:text-[#0057FF] transition-colors">
                    {brand.name}
                  </p>

                  {/* Category */}
                  <p className="text-slate-400 text-xs mb-2">{brand.category}</p>

                  {/* Shipping */}
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {brand.shippingEstimate}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
