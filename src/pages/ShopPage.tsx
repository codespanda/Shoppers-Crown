import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Grid3X3, List, Heart, Star, ShoppingCart, ChevronDown } from 'lucide-react'
import { PRODUCTS, CATEGORIES } from '@/data/mockData'
import { useCart } from '@/context/CartContext'
import { formatCurrency } from '@/lib/utils'
import Badge from '@/components/ui/Badge'
import { Link, useSearchParams } from 'react-router-dom'

const SORT_OPTIONS = ['Best Match', 'Price: Low to High', 'Price: High to Low', 'Newest', 'Best Rated']

export default function ShopPage() {
  const [searchParams] = useSearchParams()
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [sort, setSort] = useState('Best Match')
  const [activeCategory, setActiveCategory] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [wishlist, setWishlist] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') ?? '')
  const { addItem } = useCart()

  useEffect(() => {
    const q = searchParams.get('q') ?? ''
    setSearchQuery(q)
    const cat = searchParams.get('cat') ?? 'all'
    setActiveCategory(cat)
  }, [searchParams])

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const filteredProducts = PRODUCTS
    .filter((p) => activeCategory === 'all' || p.category.toLowerCase() === CATEGORIES.find((c) => c.id === activeCategory)?.name.toLowerCase())
    .filter((p) => p.price <= priceRange[1])
    .filter((p) => !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'Price: Low to High') return a.price - b.price
      if (sort === 'Price: High to Low') return b.price - a.price
      if (sort === 'Best Rated') return b.rating - a.rating
      return 0
    })

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Page header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#0F172A]">Shop All Products</h1>
              <p className="text-slate-500 text-sm mt-1">Discover {PRODUCTS.length.toLocaleString()}+ products from top US brands</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0057FF] w-64"
                />
              </div>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="pl-4 pr-10 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0057FF] appearance-none bg-white cursor-pointer"
                >
                  {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
              <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1">
                <button onClick={() => setView('grid')} className={`p-1.5 rounded-lg transition-colors ${view === 'grid' ? 'bg-[#0057FF] text-white' : 'text-slate-500'}`}><Grid3X3 size={16} /></button>
                <button onClick={() => setView('list')} className={`p-1.5 rounded-lg transition-colors ${view === 'list' ? 'bg-[#0057FF] text-white' : 'text-slate-500'}`}><List size={16} /></button>
              </div>
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex items-center gap-2 mt-4 overflow-x-auto scrollbar-hide pb-1">
            <button
              onClick={() => setActiveCategory('all')}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === 'all' ? 'bg-[#0057FF] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              All Products
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat.id ? 'bg-[#0057FF] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-slate-100 p-5 sticky top-24">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-slate-900">Filters</h3>
                <button className="text-[#0057FF] text-xs font-medium hover:underline">Clear All</button>
              </div>

              {/* Price range */}
              <div className="mb-6">
                <h4 className="font-semibold text-slate-800 text-sm mb-3">Price Range</h4>
                <input
                  type="range"
                  min="0"
                  max="5000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full cursor-pointer accent-[#0057FF]"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>$0</span><span>${priceRange[1].toLocaleString()}</span>
                </div>
              </div>

              {/* Brands */}
              <div className="mb-6">
                <h4 className="font-semibold text-slate-800 text-sm mb-3">Brand</h4>
                <div className="space-y-2">
                  {['Apple', 'Nike', 'Adidas', 'Sony', 'Samsung'].map((brand) => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" className="rounded accent-[#0057FF] cursor-pointer" />
                      <span className="text-sm text-slate-600 group-hover:text-slate-900">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <h4 className="font-semibold text-slate-800 text-sm mb-3">Min Rating</h4>
                <div className="space-y-2">
                  {[4.5, 4, 3.5, 3].map((r) => (
                    <label key={r} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="rating" className="accent-[#0057FF] cursor-pointer" />
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} className={i < Math.floor(r) ? 'text-[#FFB800] fill-[#FFB800]' : 'text-slate-200'} />
                        ))}
                        <span className="text-xs text-slate-500">& up</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            <p className="text-slate-500 text-sm mb-6">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              {searchQuery && <span> for "<span className="font-medium text-slate-800">{searchQuery}</span>"</span>}
            </p>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-slate-400 text-lg mb-2">No products found</p>
                <p className="text-slate-400 text-sm">Try a different search or category</p>
              </div>
            )}

            <div className={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5' : 'space-y-4'}>
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {view === 'grid' ? (
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-200 transition-all duration-300 overflow-hidden group">
                      <div className="relative aspect-square bg-slate-50 overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                          {product.discount && <Badge variant="error" className="text-xs font-bold">-{product.discount}%</Badge>}
                        </div>
                        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button onClick={() => toggleWishlist(product.id)} className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-lg ${wishlist.has(product.id) ? 'bg-red-500 text-white' : 'bg-white text-slate-500 hover:text-red-500'}`}>
                            <Heart size={14} fill={wishlist.has(product.id) ? 'currentColor' : 'none'} />
                          </button>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-slate-400 font-medium mb-1">{product.brand}</p>
                        <Link to={`/product/${product.id}`}>
                          <h3 className="font-semibold text-slate-900 text-sm leading-tight mb-2 hover:text-[#0057FF] transition-colors line-clamp-2">{product.name}</h3>
                        </Link>
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(5)].map((_, j) => <Star key={j} size={11} className={j < Math.floor(product.rating) ? 'text-[#FFB800] fill-[#FFB800]' : 'text-slate-200'} />)}
                          <span className="text-xs text-slate-400 ml-1">({product.reviews.toLocaleString()})</span>
                        </div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#0F172A]">{formatCurrency(product.price)}</span>
                            {product.originalPrice && <span className="text-sm text-slate-400 line-through">{formatCurrency(product.originalPrice)}</span>}
                          </div>
                        </div>
                        <button
                          onClick={() => addItem({ productId: product.id, name: product.name, image: product.image, quantity: 1, price: product.price })}
                          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#0057FF] text-white text-sm font-medium hover:bg-[#0040CC] transition-colors"
                        >
                          <ShoppingCart size={15} /> Add to Cart
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all p-4 flex gap-4">
                      <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-xl flex-shrink-0" loading="lazy" />
                      <div className="flex-1">
                        <p className="text-xs text-slate-400 font-medium mb-1">{product.brand}</p>
                        <Link to={`/product/${product.id}`}>
                          <h3 className="font-semibold text-slate-900 text-sm hover:text-[#0057FF] transition-colors">{product.name}</h3>
                        </Link>
                        <div className="flex items-center gap-1 my-1">
                          {[...Array(5)].map((_, j) => <Star key={j} size={11} className={j < Math.floor(product.rating) ? 'text-[#FFB800] fill-[#FFB800]' : 'text-slate-200'} />)}
                          <span className="text-xs text-slate-400 ml-1">({product.reviews.toLocaleString()})</span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1">{product.description}</p>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <div className="text-right">
                          <p className="font-bold text-[#0F172A]">{formatCurrency(product.price)}</p>
                          {product.originalPrice && <p className="text-xs text-slate-400 line-through">{formatCurrency(product.originalPrice)}</p>}
                        </div>
                        <button
                          onClick={() => addItem({ productId: product.id, name: product.name, image: product.image, quantity: 1, price: product.price })}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0057FF] text-white text-sm font-medium hover:bg-[#0040CC] transition-colors"
                        >
                          <ShoppingCart size={14} /> Add
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
