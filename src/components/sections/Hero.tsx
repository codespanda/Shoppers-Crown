import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Package, Globe, Zap, Shield, Star, CheckCircle2 } from 'lucide-react'
import Button from '@/components/ui/Button'

const FLOATING_CARDS = [
  { icon: '📱', label: 'iPhone 15 Pro', price: '$1,199', delay: 0, x: -60, y: -40 },
  { icon: '👟', label: 'Nike Air Max', price: '$149', delay: 1.5, x: 60, y: 20 },
  { icon: '💻', label: 'MacBook Pro', price: '$1,999', delay: 0.8, x: -40, y: 60 },
]

const TRUST_BADGES = [
  { icon: <Shield size={14} />, text: 'Secure Payments' },
  { icon: <CheckCircle2 size={14} />, text: '100% Authentic' },
  { icon: <Zap size={14} />, text: 'Fast Delivery' },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-[#001A66] to-slate-900 min-h-[92vh] flex items-center">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0057FF]/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#00C2FF]/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-[#FFB800]/10 rounded-full blur-3xl"
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <Star size={14} className="text-[#FFB800]" />
              Trusted by 5M+ shoppers worldwide
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6"
            >
              Shop From
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#0057FF] via-[#00C2FF] to-[#00E5FF]"> Thousands</span>
              of US Stores &
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FFB800] to-[#FF8C00]"> Ship Worldwide</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-300 text-lg lg:text-xl mb-10 leading-relaxed max-w-xl"
            >
              Get a free US shipping address, shop any US store, and we'll forward your packages to
              <strong className="text-white"> 220+ countries</strong> worldwide. Fast, secure, and affordable.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <Link to="/signup">
                <Button size="xl" className="shadow-[0_0_40px_rgba(0,87,255,0.4)] hover:shadow-[0_0_60px_rgba(0,87,255,0.6)]">
                  Start Shopping Free
                  <ArrowRight size={20} />
                </Button>
              </Link>
              <Link to="/calculator">
                <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10 hover:text-white hover:border-white/50">
                  <Package size={20} />
                  Calculate Shipping
                </Button>
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              {TRUST_BADGES.map((badge) => (
                <div key={badge.text} className="flex items-center gap-2 text-slate-300 text-sm">
                  <span className="text-[#10B981]">{badge.icon}</span>
                  {badge.text}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Visual */}
          <div className="relative hidden lg:block">
            {/* Main card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative"
            >
              {/* World map placeholder */}
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Globe visualization */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border border-[#0057FF]/20"
                  style={{
                    background: 'radial-gradient(circle at 40% 40%, rgba(0,87,255,0.15) 0%, transparent 60%)',
                  }}
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-8 rounded-full border border-[#00C2FF]/15"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-16 rounded-full border border-white/10"
                />

                {/* Center hub */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-28 h-28 gradient-primary rounded-2xl flex items-center justify-center shadow-[0_0_60px_rgba(0,87,255,0.5)]"
                  >
                    <Package size={52} className="text-white" />
                  </motion.div>
                </div>

                {/* Orbit dots */}
                {['🇺🇸', '🇦🇪', '🇬🇧', '🇯🇵', '🇦🇺', '🇩🇪'].map((flag, i) => {
                  const angle = (i * 360) / 6
                  const radius = 160
                  const x = Math.cos((angle * Math.PI) / 180) * radius
                  const y = Math.sin((angle * Math.PI) / 180) * radius
                  return (
                    <motion.div
                      key={flag}
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear', delay: i * 0.5 }}
                      style={{ position: 'absolute', left: '50%', top: '50%' }}
                    >
                      <div
                        style={{ transform: `translate(${x}px, ${y}px) translate(-50%, -50%)` }}
                        className="w-10 h-10 glass rounded-full flex items-center justify-center text-xl shadow-lg"
                      >
                        {flag}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Floating product cards */}
            {FLOATING_CARDS.map((card) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + card.delay }}
                style={{
                  position: 'absolute',
                  ...(card.x < 0 ? { left: `${Math.abs(card.x) - 80}px` } : { right: `${card.x - 80}px` }),
                  ...(card.y < 0 ? { top: `${Math.abs(card.y) + 20}px` } : { bottom: `${card.y + 20}px` }),
                }}
                className="animate-float"
              >
                <div className="glass rounded-2xl p-3 flex items-center gap-3 shadow-xl min-w-[160px]">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-xl">
                    {card.icon}
                  </div>
                  <div>
                    <p className="text-white text-xs font-medium">{card.label}</p>
                    <p className="text-[#00C2FF] text-sm font-bold">{card.price}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Shipping route indicator */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="absolute bottom-4 right-0 glass rounded-2xl p-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <Globe size={20} className="text-[#0057FF]" />
                <div>
                  <p className="text-white text-xs font-semibold">Live Shipping Route</p>
                  <p className="text-slate-300 text-xs">Portland, OR → Dubai, UAE</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse ml-1" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Brand logos scroll */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 pt-10 border-t border-white/10"
        >
          <p className="text-slate-400 text-sm text-center mb-6">Shop from thousands of US stores including</p>
          <div className="flex items-center justify-center flex-wrap gap-8">
            {['Amazon', 'Apple', 'Nike', 'Adidas', 'Best Buy', 'Target', 'Walmart', "Macy's", 'Sephora', 'Nordstrom'].map((brand) => (
              <motion.span
                key={brand}
                whileHover={{ scale: 1.1 }}
                className="text-white/40 hover:text-white/80 font-bold text-base transition-colors duration-200 cursor-pointer"
              >
                {brand}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
