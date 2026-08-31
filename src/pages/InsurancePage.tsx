import { motion } from 'framer-motion'
import { Shield, CheckCircle2, AlertCircle, ArrowRight, Star, Clock, DollarSign } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'
import { useState } from 'react'

const PLANS = [
  { name: 'Basic Coverage', price: 'Free', coverage: '$200', included: true, features: ['Lost package reimbursement', 'Damage claims', 'Standard processing (7-10 days)'] },
  { name: 'Standard Coverage', price: '3% of shipping cost', coverage: '$2,000', included: false, popular: true, features: ['Everything in Basic', 'High-value item coverage', 'Priority claims (3-5 days)', 'Full replacement value'] },
  { name: 'Premium Coverage', price: '5% of shipping cost', coverage: '$10,000', included: false, features: ['Everything in Standard', 'Luxury & fragile items', '24h claims processing', 'Dedicated claims agent', 'Electronics coverage'] },
]

const NOT_COVERED = [
  'Prohibited items (see our prohibited items list)',
  'Perishables and food items',
  'Cash, gift cards, or negotiable instruments',
  'Items improperly packaged by the shipper',
  'Damage due to inherent defect',
]

const FAQS = [
  { q: 'How do I file a claim?', a: 'Log into your dashboard, navigate to Shipments, find the affected shipment, and click "File a Claim." Attach photos and a description. We\'ll respond within the timeframe for your coverage level.' },
  { q: 'What proof do I need for a claim?', a: 'We typically need photos of the damage, the original purchase receipt or invoice, and the package photos taken at our warehouse.' },
  { q: 'How long does it take to receive reimbursement?', a: 'Standard coverage: 7–10 business days. Standard+: 3–5 days. Premium: within 24 hours of claim approval.' },
  { q: 'Can I add insurance after my package ships?', a: 'No, insurance must be added before the package ships from our warehouse. Once a shipment is dispatched, coverage cannot be added.' },
  { q: 'Does insurance cover the full purchase price?', a: 'Yes, for Standard and Premium plans we reimburse the full replacement value up to the coverage limit, not the depreciated value.' },
]

export default function InsurancePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0A1628] to-[#1E3A8A] py-20 text-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm mb-6">
            <Shield size={14} /> Package Protection
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Ship with Confidence</h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto mb-8">
            Protect your purchases with comprehensive insurance coverage against loss or damage during international transit.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/signup"><Button size="lg">Get Protected</Button></Link>
            <Link to="/calculator"><Button size="lg" className="bg-white/10 text-white border border-white/30 hover:bg-white/20">Calculate With Insurance</Button></Link>
          </div>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-3 gap-6 text-center">
          {[
            { icon: <DollarSign size={22} className="text-[#10B981]" />, bg: 'bg-emerald-50', val: '$10M+', label: 'Claims paid out' },
            { icon: <Clock size={22} className="text-[#1B4FD8]" />, bg: 'bg-blue-50', val: '24h', label: 'Fastest claim resolution' },
            { icon: <Star size={22} className="text-[#F59E0B]" />, bg: 'bg-amber-50', val: '98%', label: 'Claims approval rate' },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-2">
              <div className={`w-11 h-11 ${s.bg} rounded-xl flex items-center justify-center`}>{s.icon}</div>
              <p className="text-2xl font-bold text-[#0A1628]">{s.val}</p>
              <p className="text-slate-400 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Plans */}
        <h2 className="text-3xl font-bold text-[#0A1628] text-center mb-3">Coverage Plans</h2>
        <p className="text-slate-500 text-center mb-10">Choose the right level of protection for your shipments.</p>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {PLANS.map((plan, i) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className={`relative bg-white rounded-2xl border-2 p-6 ${plan.popular ? 'border-[#1B4FD8] shadow-xl' : 'border-slate-100 shadow-sm'}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1B4FD8] text-white text-xs font-bold px-4 py-1 rounded-full">Most Popular</div>
              )}
              <Shield size={28} className={plan.popular ? 'text-[#1B4FD8]' : 'text-slate-400'} />
              <h3 className="text-lg font-bold text-slate-900 mt-3 mb-1">{plan.name}</h3>
              <p className="text-3xl font-bold text-[#0A1628] mb-1">{plan.coverage}</p>
              <p className="text-slate-400 text-xs mb-5">coverage · {plan.price}</p>
              {plan.included && <span className="inline-block bg-emerald-50 text-emerald-600 text-xs font-medium px-3 py-1 rounded-full mb-4">Included free with all plans</span>}
              <div className="space-y-2.5 mb-6">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />{f}
                  </div>
                ))}
              </div>
              <Link to="/calculator">
                <Button variant={plan.popular ? 'primary' : 'outline'} className="w-full" iconRight={<ArrowRight size={14} />}>
                  {plan.included ? 'Already included' : 'Add to shipment'}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* What's NOT covered */}
        <div className="bg-amber-50 rounded-2xl border border-amber-100 p-6 mb-16">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><AlertCircle size={18} className="text-amber-500" /> What's Not Covered</h3>
          <div className="grid md:grid-cols-2 gap-2">
            {NOT_COVERED.map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-slate-600">
                <AlertCircle size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />{item}
              </div>
            ))}
          </div>
        </div>

        {/* How to claim */}
        <h2 className="text-2xl font-bold text-[#0A1628] mb-6">How to File a Claim</h2>
        <div className="grid md:grid-cols-4 gap-5 mb-16">
          {[
            { step: '1', title: 'Log In', desc: 'Sign in to your Shoppers Crown dashboard', color: 'bg-[#1B4FD8]' },
            { step: '2', title: 'Find Shipment', desc: 'Navigate to the affected shipment', color: 'bg-[#10B981]' },
            { step: '3', title: 'Submit Claim', desc: 'Fill out the form and attach photos', color: 'bg-violet-500' },
            { step: '4', title: 'Get Paid', desc: 'Receive reimbursement within your plan\'s timeline', color: 'bg-[#F59E0B]' },
          ].map((s) => (
            <div key={s.step} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 text-center">
              <div className={`w-10 h-10 ${s.color} rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3`}>{s.step}</div>
              <p className="font-semibold text-slate-900 mb-1">{s.title}</p>
              <p className="text-slate-400 text-xs">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <h2 className="text-2xl font-bold text-[#0A1628] mb-6">Insurance FAQs</h2>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                <span className="font-semibold text-slate-900 text-sm">{faq.q}</span>
                <span className={`text-[#1B4FD8] text-lg transition-transform ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              {openFaq === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="px-5 pb-5 text-slate-500 text-sm leading-relaxed border-t border-slate-50 pt-4">
                  {faq.a}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
