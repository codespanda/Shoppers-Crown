import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, ShoppingCart, Bell, Menu, X, Package,
  ChevronDown, Globe, Zap, Shield, HeadphonesIcon, TrendingUp,
  MapPin, Calculator, Star
} from 'lucide-react'
import Button from '@/components/ui/Button'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'

const NAV_ITEMS = [
  {
    label: 'Shop',
    href: '/shop',
    mega: true,
    sections: [
      {
        title: 'Browse',
        items: [
          { label: 'All Products', href: '/shop', icon: <TrendingUp size={16} /> },
          { label: 'Top Brands', href: '/brands', icon: <Star size={16} /> },
          { label: 'Categories', href: '/categories', icon: <Package size={16} /> },
          { label: 'Flash Deals', href: '/deals', icon: <Zap size={16} /> },
        ],
      },
      {
        title: 'Popular',
        items: [
          { label: 'Electronics', href: '/shop?cat=electronics', icon: null },
          { label: 'Fashion', href: '/shop?cat=fashion', icon: null },
          { label: 'Sportswear', href: '/shop?cat=sportswear', icon: null },
          { label: 'Beauty', href: '/shop?cat=beauty', icon: null },
        ],
      },
    ],
  },
  {
    label: 'Shipping',
    href: '/shipping',
    mega: true,
    sections: [
      {
        title: 'Services',
        items: [
          { label: 'Shipping Calculator', href: '/calculator', icon: <Calculator size={16} /> },
          { label: 'Track Package', href: '/track', icon: <MapPin size={16} /> },
          { label: 'Countries We Ship To', href: '/countries', icon: <Globe size={16} /> },
          { label: 'Insurance', href: '/insurance', icon: <Shield size={16} /> },
        ],
      },
    ],
  },
  { label: 'Tracking', href: '/track', mega: false },
  { label: 'Pricing', href: '/pricing', mega: false },
  { label: 'Support', href: '/support', mega: false, icon: <HeadphonesIcon size={16} /> },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const { items } = useCart()
  const { user } = useAuth()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setSearchOpen(false)
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActiveDropdown(null)
  }, [location])

  const cartCount = items.reduce((acc, i) => acc + i.quantity, 0)

  return (
    <>
      {/* Main navbar */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg' : 'bg-white/95 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
              <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                <Package size={20} className="text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-[#0A1628]">Shoppers</span>
                <span className="text-xl font-bold gradient-text"> Crown</span>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {!user && NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.mega && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.href}
                    className={`flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      location.pathname === item.href
                        ? 'text-[#1B4FD8] bg-blue-50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                    {item.mega && <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />}
                  </Link>

                  {/* Mega menu */}
                  <AnimatePresence>
                    {item.mega && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 glass rounded-2xl shadow-2xl border border-white/50 p-4 min-w-[400px] grid grid-cols-2 gap-6"
                      >
                        {item.sections?.map((section) => (
                          <div key={section.title}>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">{section.title}</p>
                            <div className="space-y-1">
                              {section.items.map((sub) => (
                                <Link
                                  key={sub.label}
                                  to={sub.href}
                                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-slate-600 hover:text-[#1B4FD8] hover:bg-blue-50 transition-all duration-150"
                                >
                                  {sub.icon && <span className="text-[#1B4FD8]">{sub.icon}</span>}
                                  {sub.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden md:flex p-2.5 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              <Link
                to="/notifications"
                className="relative p-2.5 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
                aria-label="Notifications"
              >
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EF4444] rounded-full" />
              </Link>

              <Link
                to="/cart"
                className="relative p-2.5 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
                aria-label="Cart"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#1B4FD8] text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>

              {user ? (
                <Link to="/dashboard" className="flex items-center gap-2 ml-1 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors">
                  <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{user.name.charAt(0)}</span>
                  </div>
                  <span className="hidden md:block text-sm font-medium text-slate-700">{user.name.split(' ')[0]}</span>
                </Link>
              ) : (
                <div className="hidden md:flex items-center gap-2 ml-1">
                  <Link to="/login">
                    <Button variant="ghost" size="sm">Sign In</Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="sm">Get Started</Button>
                  </Link>
                </div>
              )}

              <button
                className="lg:hidden p-2.5 rounded-xl hover:bg-slate-100 text-slate-600"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-slate-100 bg-white"
            >
              <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
                {!user && NAV_ITEMS.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:text-[#1B4FD8] hover:bg-blue-50 transition-all"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-3 flex gap-2">
                  <Link to="/login" className="flex-1">
                    <Button variant="outline" className="w-full">Sign In</Button>
                  </Link>
                  <Link to="/signup" className="flex-1">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="w-full max-w-2xl glass rounded-2xl shadow-2xl p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSearch} className="flex items-center gap-3">
                <Search size={20} className="text-slate-400 flex-shrink-0" />
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, brands, categories..."
                  className="flex-1 bg-transparent text-slate-900 placeholder:text-slate-400 outline-none text-base"
                />
                <button type="button" onClick={() => setSearchOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100">
                  <X size={16} className="text-slate-400" />
                </button>
              </form>
              <div className="mt-3 pt-3 border-t border-slate-100">
                <p className="text-xs font-semibold text-slate-400 mb-2">POPULAR SEARCHES</p>
                <div className="flex flex-wrap gap-2">
                  {['iPhone 15', 'Nike Air Max', 'MacBook Pro', 'Sony Headphones', 'Dyson Vacuum'].map((term) => (
                    <button key={term} onClick={() => { setSearchOpen(false); navigate(`/shop?q=${encodeURIComponent(term)}`); setSearchQuery('') }}
                      className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-sm hover:bg-blue-50 hover:text-[#1B4FD8] transition-colors">
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
