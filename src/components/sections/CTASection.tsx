import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Package, Globe } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#1B4FD8] to-[#38BDF8] overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/3" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-sm mb-8"
        >
          <Globe size={14} />
          Join 5 million+ global shoppers
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight"
        >
          Start Shopping the US
          <span className="block">Today. Ship Tomorrow.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/80 text-lg mb-10 max-w-xl mx-auto"
        >
          Get your free US address instantly. No credit card required. Start shopping from thousands of US stores today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/signup">
            <Button size="xl" className="bg-white text-[#1B4FD8] hover:bg-slate-50 shadow-xl">
              <Package size={20} />
              Get Free US Address
              <ArrowRight size={20} />
            </Button>
          </Link>
          <Link to="/how-it-works">
            <Button size="xl" variant="outline" className="border-white/50 text-white hover:bg-white/10">
              Learn How It Works
            </Button>
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-white/60 text-sm mt-8"
        >
          Free to sign up · No monthly fees · Cancel anytime
        </motion.p>
      </div>
    </section>
  )
}
