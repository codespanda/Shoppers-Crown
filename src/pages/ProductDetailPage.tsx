import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Heart, ShoppingCart, Package, Shield, RotateCcw, Truck, ChevronRight, Minus, Plus, Share2 } from 'lucide-react'
import { PRODUCTS } from '@/data/mockData'
import { useCart } from '@/context/CartContext'
import { formatCurrency } from '@/lib/utils'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

export default function ProductDetailPage() {
  const { id } = useParams()
  const product = PRODUCTS.find((p) => p.id === id) ?? PRODUCTS[0]
  const [qty, setQty] = useState(1)
  const [wishlist, setWishlist] = useState(false)
  const [activeTab, setActiveTab] = useState('description')
  const { addItem } = useCart()

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4)

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Link to="/" className="hover:text-[#0057FF]">Home</Link>
            <ChevronRight size={14} />
            <Link to="/shop" className="hover:text-[#0057FF]">Shop</Link>
            <ChevronRight size={14} />
            <span className="text-slate-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="aspect-square bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm mb-4">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-white rounded-xl overflow-hidden border-2 border-slate-100 hover:border-[#0057FF] cursor-pointer transition-colors">
                  <img src={product.image} alt="" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.discount && <Badge variant="error">-{product.discount}% OFF</Badge>}
              {product.inStock ? <Badge variant="success">In Stock</Badge> : <Badge variant="error">Out of Stock</Badge>}
              {product.tags.map((tag) => <Badge key={tag} variant="info">{tag.toUpperCase()}</Badge>)}
            </div>

            {/* Brand */}
            <p className="text-[#0057FF] font-semibold text-sm mb-2">{product.brand}</p>

            {/* Name */}
            <h1 className="text-3xl font-bold text-[#0F172A] leading-tight mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < Math.floor(product.rating) ? 'text-[#FFB800] fill-[#FFB800]' : 'text-slate-200'} />
                ))}
              </div>
              <span className="font-semibold text-slate-900">{product.rating}</span>
              <span className="text-slate-400 text-sm">({product.reviews.toLocaleString()} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-[#0F172A]">{formatCurrency(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-slate-400 line-through">{formatCurrency(product.originalPrice)}</span>
                  <Badge variant="error" size="md">{formatCurrency(product.originalPrice - product.price)} saved</Badge>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-slate-600 leading-relaxed mb-6">{product.description}</p>

            {/* Shipping info */}
            <div className="bg-emerald-50 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 text-emerald-700 font-medium text-sm mb-1">
                <Truck size={16} />
                Estimated Delivery: {product.shippingEstimate}
              </div>
              <p className="text-emerald-600 text-xs">Ships from our Portland, OR warehouse after consolidation</p>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-medium text-slate-700 text-sm">Quantity:</span>
              <div className="flex items-center gap-3 bg-slate-100 rounded-xl p-1">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white transition-colors text-slate-600">
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center font-semibold text-slate-900">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white transition-colors text-slate-600">
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <Button
                size="lg"
                className="flex-1"
                icon={<ShoppingCart size={18} />}
                onClick={() => addItem({ productId: product.id, name: product.name, image: product.image, quantity: qty, price: product.price })}
              >
                Add to Cart
              </Button>
              <button
                onClick={() => setWishlist(!wishlist)}
                className={`p-4 rounded-xl border-2 transition-all ${wishlist ? 'bg-red-500 border-red-500 text-white' : 'border-slate-200 text-slate-400 hover:border-red-300 hover:text-red-500'}`}
              >
                <Heart size={20} fill={wishlist ? 'currentColor' : 'none'} />
              </button>
              <button className="p-4 rounded-xl border-2 border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-600 transition-all">
                <Share2 size={20} />
              </button>
            </div>

            {/* Trust signals */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: <Shield size={18} />, label: 'Secure Payment', color: 'text-[#0057FF]' },
                { icon: <Package size={18} />, label: 'Packaged Safely', color: 'text-[#10B981]' },
                { icon: <RotateCcw size={18} />, label: 'Easy Returns', color: 'text-[#FFB800]' },
              ].map((item) => (
                <div key={item.label} className="text-center p-3 bg-slate-50 rounded-xl">
                  <span className={`${item.color} flex justify-center mb-1`}>{item.icon}</span>
                  <p className="text-xs text-slate-600 font-medium">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden mb-12">
          <div className="flex border-b border-slate-100">
            {['description', 'reviews', 'shipping'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 text-sm font-semibold capitalize transition-colors ${activeTab === tab ? 'text-[#0057FF] border-b-2 border-[#0057FF] bg-blue-50/50' : 'text-slate-500 hover:text-slate-800'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="p-6">
            {activeTab === 'description' && (
              <p className="text-slate-600 leading-relaxed">{product.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            )}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="p-4 border border-slate-100 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0057FF] to-[#00C2FF] flex items-center justify-center text-white text-xs font-bold">
                        {['A', 'M', 'J'][i]}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 text-sm">{['Ahmed K.', 'Maria S.', 'John D.'][i]}</p>
                        <div className="flex">{[...Array(5)].map((_, j) => <Star key={j} size={11} className="text-[#FFB800] fill-[#FFB800]" />)}</div>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm">Excellent product! Exactly as described and arrived in perfect condition. Shipping through MyUS was smooth and the tracking was great.</p>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'shipping' && (
              <div className="space-y-3">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <p className="font-semibold text-[#0057FF] mb-1">Estimated Shipping: {product.shippingEstimate}</p>
                  <p className="text-slate-600 text-sm">Ships from Portland, OR to your destination country via your chosen carrier.</p>
                </div>
                <p className="text-slate-600 text-sm">Weight: {product.weight} kg | Package consolidation available</p>
              </div>
            )}
          </div>
        </div>

        {/* Related products */}
        <div>
          <h2 className="text-2xl font-bold text-[#0F172A] mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {relatedProducts.map((p) => (
              <Link key={p.id} to={`/product/${p.id}`}>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden group">
                  <div className="aspect-square overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-slate-400 mb-1">{p.brand}</p>
                    <p className="font-semibold text-slate-900 text-sm line-clamp-1">{p.name}</p>
                    <p className="font-bold text-[#0057FF] text-sm mt-1">{formatCurrency(p.price)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
