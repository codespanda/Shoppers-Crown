import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MessageCircle, Phone, Mail, FileText, Package, Truck, CreditCard, Settings, ChevronRight, CheckCircle2, Clock, ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useForm } from 'react-hook-form'

const CATEGORIES = [
  { icon: <Package size={22} />, label: 'Warehouse & Packages', color: 'text-[#1B4FD8]', bg: 'bg-blue-50', articles: 12 },
  { icon: <Truck size={22} />, label: 'Shipping & Tracking', color: 'text-[#10B981]', bg: 'bg-emerald-50', articles: 18 },
  { icon: <CreditCard size={22} />, label: 'Billing & Payments', color: 'text-[#F59E0B]', bg: 'bg-amber-50', articles: 9 },
  { icon: <Settings size={22} />, label: 'Account & Settings', color: 'text-violet-500', bg: 'bg-violet-50', articles: 7 },
  { icon: <FileText size={22} />, label: 'Returns & Refunds', color: 'text-rose-500', bg: 'bg-rose-50', articles: 6 },
  { icon: <MessageCircle size={22} />, label: 'Getting Started', color: 'text-cyan-500', bg: 'bg-cyan-50', articles: 10 },
]

const POPULAR_ARTICLES = [
  { title: 'How do I get my free US address?', category: 'Getting Started', views: '12.4k' },
  { title: 'How long does shipping take to my country?', category: 'Shipping & Tracking', views: '9.8k' },
  { title: 'Can I consolidate multiple packages into one?', category: 'Warehouse & Packages', views: '8.1k' },
  { title: 'What items are prohibited for shipping?', category: 'Shipping & Tracking', views: '7.5k' },
  { title: 'How do I cancel or change my membership?', category: 'Account & Settings', views: '6.9k' },
  { title: 'What payment methods are accepted?', category: 'Billing & Payments', views: '5.7k' },
]

export default function SupportPage() {
  const [query, setQuery] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { isSubmitting } } = useForm()

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 1000))
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1B4FD8] to-[#38BDF8] py-20 text-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold text-white mb-3">How can we help?</h1>
          <p className="text-white/70 mb-8">Search our knowledge base or contact our team</p>
          <div className="max-w-xl mx-auto relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles, FAQs, guides..."
              className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none shadow-lg text-sm"
            />
          </div>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-14">
        {/* Contact channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {[
            {
              icon: <MessageCircle size={24} className="text-[#1B4FD8]" />,
              bg: 'bg-blue-50',
              title: 'Live Chat',
              desc: 'Chat with our support team instantly.',
              action: 'Start Chat',
              badge: 'Online now',
              badgeColor: 'text-emerald-600 bg-emerald-50',
            },
            {
              icon: <Mail size={24} className="text-violet-500" />,
              bg: 'bg-violet-50',
              title: 'Email Support',
              desc: 'Send us a message, we reply within 4 hours.',
              action: 'Send Email',
              badge: '< 4h response',
              badgeColor: 'text-violet-600 bg-violet-50',
            },
            {
              icon: <Phone size={24} className="text-[#10B981]" />,
              bg: 'bg-emerald-50',
              title: 'Phone Support',
              desc: 'Premium & Business members only.',
              action: 'Call Us',
              badge: 'Premium+',
              badgeColor: 'text-amber-600 bg-amber-50',
            },
          ].map((ch, i) => (
            <motion.div
              key={ch.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 ${ch.bg} rounded-2xl flex items-center justify-center mb-4`}>{ch.icon}</div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-slate-900">{ch.title}</h3>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${ch.badgeColor}`}>{ch.badge}</span>
              </div>
              <p className="text-slate-500 text-sm mb-4">{ch.desc}</p>
              <button className="flex items-center gap-1.5 text-[#1B4FD8] text-sm font-semibold hover:gap-2.5 transition-all">
                {ch.action} <ArrowRight size={14} />
              </button>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left: Categories + Popular */}
          <div className="lg:col-span-2">
            {/* Categories */}
            <h2 className="text-xl font-bold text-[#0A1628] mb-5">Browse by Topic</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
              {CATEGORIES.map((cat, i) => (
                <motion.button
                  key={cat.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 text-left hover:shadow-md hover:border-slate-200 transition-all group"
                >
                  <div className={`w-10 h-10 ${cat.bg} rounded-xl flex items-center justify-center ${cat.color} mb-3`}>
                    {cat.icon}
                  </div>
                  <p className="font-semibold text-slate-900 text-sm mb-1 group-hover:text-[#1B4FD8] transition-colors">{cat.label}</p>
                  <p className="text-slate-400 text-xs">{cat.articles} articles</p>
                </motion.button>
              ))}
            </div>

            {/* Popular articles */}
            <h2 className="text-xl font-bold text-[#0A1628] mb-5">Popular Articles</h2>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-50">
              {POPULAR_ARTICLES.map((article, i) => (
                <button key={i} className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors text-left group">
                  <div>
                    <p className="font-medium text-slate-900 text-sm group-hover:text-[#1B4FD8] transition-colors mb-0.5">{article.title}</p>
                    <p className="text-xs text-slate-400">{article.category} · {article.views} views</p>
                  </div>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-[#1B4FD8] flex-shrink-0 ml-4 transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Contact form */}
          <div>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sticky top-24">
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
                  <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={28} className="text-emerald-500" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-slate-500 text-sm">We'll get back to you within 4 hours.</p>
                  <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs mt-3">
                    <Clock size={12} /> Expected response: within 4 hours
                  </div>
                </motion.div>
              ) : (
                <>
                  <h3 className="font-bold text-slate-900 mb-1">Send a Message</h3>
                  <p className="text-slate-400 text-sm mb-5">We typically respond within 4 hours.</p>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input label="Your Name" placeholder="John Smith" {...register('name')} />
                    <Input label="Email" type="email" placeholder="you@example.com" {...register('email')} />
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Topic</label>
                      <select className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#1B4FD8] bg-white" {...register('topic')}>
                        <option>Shipping & Tracking</option>
                        <option>Billing & Payments</option>
                        <option>Warehouse & Packages</option>
                        <option>Account & Settings</option>
                        <option>Returns & Refunds</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
                      <textarea
                        rows={4}
                        placeholder="Describe your issue..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#1B4FD8] resize-none"
                        {...register('message')}
                      />
                    </div>
                    <Button type="submit" size="lg" className="w-full" loading={isSubmitting}>
                      Send Message
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
