import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, ArrowRight } from 'lucide-react'
import { BRANDS } from '@/data/mockData'
import BrandLogo from '@/components/ui/BrandLogo'
import { useState } from 'react'

export default function BrandsPage() {
  const [search, setSearch] = useState('')
  const filtered = BRANDS.filter((b) => b.name.toLowerCase().includes(search.toLowerCase()) || b.category.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0057FF] to-[#00C2FF] py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-white mb-4">
            Top US Brands
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-white/80 mb-8">
            Shop from thousands of your favorite American brands
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="max-w-md mx-auto relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search brands..."
              className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none shadow-lg text-sm"
            />
          </motion.div>
        </div>
      </div>

      {/* Brands grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((brand, i) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Link to={`/brands/${brand.id}`}>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-200 transition-all duration-300 p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center p-1.5" style={{ backgroundColor: brand.color + '12' }}>
                      <BrandLogo name={brand.name} size={44} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 mb-0.5">{brand.name}</h3>
                      <p className="text-slate-400 text-xs mb-2">{brand.category}</p>
                      <p className="text-slate-500 text-xs line-clamp-2">{brand.description}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400">{brand.productsCount.toLocaleString()}+ products</p>
                      <p className="text-xs text-emerald-600 font-medium mt-0.5">Ships in {brand.shippingEstimate}</p>
                    </div>
                    <div className="flex items-center gap-1 text-[#0057FF] text-xs font-semibold hover:gap-2 transition-all">
                      Shop <ArrowRight size={12} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">No brands found for "{search}"</p>
          </div>
        )}
      </div>
    </div>
  )
}
