import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Heart, Star, ShoppingCart, Eye, ArrowRight, Zap } from 'lucide-react'
import { PRODUCTS } from '@/data/mockData'
import { useCart } from '@/context/CartContext'
import { formatCurrency } from '@/lib/utils'
import Badge from '@/components/ui/Badge'

export default function FeaturedProducts() {
  const { addItem } = useCart()
  const [wishlist, setWishlist] = useState<Set<string>>(new Set())

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-[#FFB800] font-semibold text-sm mb-3"
            >
              <Zap size={16} />
              FEATURED PRODUCTS
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold text-[#0F172A]"
            >
              Trending Right
              <span className="gradient-text"> Now</span>
            </motion.h2>
          </div>
          <Link to="/shop" className="hidden md:flex items-center gap-2 text-[#0057FF] font-semibold text-sm hover:gap-3 transition-all">
            Shop All <ArrowRight size={16} />
          </Link>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group"
            >
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-200 transition-all duration-300 overflow-hidden">
                {/* Image */}
                <div className="relative aspect-square bg-slate-50 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.discount && (
                      <Badge variant="error" className="text-xs font-bold">-{product.discount}%</Badge>
                    )}
                    {product.tags.includes('new') && (
                      <Badge variant="info" className="text-xs font-semibold">NEW</Badge>
                    )}
                    {product.tags.includes('bestseller') && (
                      <Badge variant="warning" className="text-xs font-semibold">BESTSELLER</Badge>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-lg transition-all ${
                        wishlist.has(product.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white text-slate-500 hover:text-red-500'
                      }`}
                    >
                      <Heart size={16} fill={wishlist.has(product.id) ? 'currentColor' : 'none'} />
                    </button>
                    <Link
                      to={`/product/${product.id}`}
                      className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-lg text-slate-500 hover:text-[#0057FF] transition-colors"
                    >
                      <Eye size={16} />
                    </Link>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="text-xs text-slate-400 font-medium mb-1">{product.brand}</p>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold text-slate-900 text-sm leading-tight mb-2 hover:text-[#0057FF] transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        size={12}
                        className={j < Math.floor(product.rating) ? 'text-[#FFB800] fill-[#FFB800]' : 'text-slate-200'}
                      />
                    ))}
                    <span className="text-xs text-slate-400 ml-1">({product.reviews.toLocaleString()})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-bold text-[#0F172A]">{formatCurrency(product.price)}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-slate-400 line-through">{formatCurrency(product.originalPrice)}</span>
                    )}
                  </div>

                  {/* Shipping */}
                  <p className="text-xs text-emerald-600 font-medium mb-4">
                    🚚 Ships in {product.shippingEstimate}
                  </p>

                  {/* Add to cart */}
                  <button
                    onClick={() => addItem({
                      productId: product.id,
                      name: product.name,
                      image: product.image,
                      quantity: 1,
                      price: product.price,
                    })}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#0057FF] text-white text-sm font-medium hover:bg-[#0040CC] transition-colors group-hover:shadow-lg"
                  >
                    <ShoppingCart size={16} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
