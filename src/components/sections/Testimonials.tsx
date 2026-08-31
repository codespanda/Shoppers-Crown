import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react'
import { TESTIMONIALS } from '@/data/mockData'

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length)

  const visible = [
    TESTIMONIALS[current],
    TESTIMONIALS[(current + 1) % TESTIMONIALS.length],
    TESTIMONIALS[(current + 2) % TESTIMONIALS.length],
  ]

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
            Customer Reviews
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-[#0A1628] mb-2"
          >
            Loved by Shoppers
            <span className="gradient-text"> Worldwide</span>
          </motion.h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} className="text-[#F59E0B] fill-[#F59E0B]" />
            ))}
            <span className="text-slate-600 font-semibold ml-2">4.8/5</span>
            <span className="text-slate-400 text-sm">from 50,000+ reviews</span>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {visible.map((testimonial, i) => (
                <motion.div
                  key={`${testimonial.id}-${current}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className={`bg-white rounded-2xl p-6 border border-slate-100 shadow-sm ${i === 1 ? 'md:scale-105 shadow-xl border-[#1B4FD8]/20' : ''}`}
                >
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={14} className={j < testimonial.rating ? 'text-[#F59E0B] fill-[#F59E0B]' : 'text-slate-200'} />
                    ))}
                  </div>

                  {/* Review */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">"{testimonial.review}"</p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5">
                        <p className="font-semibold text-slate-900 text-sm">{testimonial.name}</p>
                        {testimonial.verified && (
                          <CheckCircle2 size={14} className="text-[#1B4FD8]" />
                        )}
                      </div>
                      <p className="text-slate-400 text-xs">{testimonial.country}</p>
                    </div>
                    <span className="text-slate-300 text-xs">{testimonial.date}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-500 hover:border-[#1B4FD8] hover:text-[#1B4FD8] transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-[#1B4FD8]' : 'w-2 bg-slate-200'}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-500 hover:border-[#1B4FD8] hover:text-[#1B4FD8] transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
