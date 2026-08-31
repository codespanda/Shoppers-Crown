import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CheckCircle2, X, Zap, Star, Building2, ArrowRight, Package, Truck, Shield } from 'lucide-react'
import Button from '@/components/ui/Button'

const PLANS = [
  {
    id: 'free',
    name: 'Basic',
    icon: <Package size={24} />,
    monthlyPrice: 0,
    annualPrice: 0,
    color: 'text-slate-600',
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    description: 'Perfect for occasional shoppers exploring US brands.',
    features: [
      { text: 'Free US shipping address', included: true },
      { text: 'Up to 3 packages stored', included: true },
      { text: 'Basic package photos', included: true },
      { text: 'Standard shipping rates', included: true },
      { text: 'Email support', included: true },
      { text: 'Package consolidation', included: false },
      { text: 'Priority processing', included: false },
      { text: 'Insurance up to $200', included: false },
      { text: 'Dedicated account manager', included: false },
    ],
    cta: 'Get Started Free',
    ctaVariant: 'outline' as const,
  },
  {
    id: 'premium',
    name: 'Premium',
    icon: <Zap size={24} />,
    monthlyPrice: 9.99,
    annualPrice: 7.99,
    color: 'text-[#1B4FD8]',
    bg: 'bg-blue-50',
    border: 'border-[#1B4FD8]',
    popular: true,
    description: 'Best for regular shoppers who want more savings and flexibility.',
    features: [
      { text: 'Free US shipping address', included: true },
      { text: 'Unlimited package storage (60 days)', included: true },
      { text: 'HD package photos (10/shipment)', included: true },
      { text: 'Discounted shipping rates (up to 80% off)', included: true },
      { text: 'Priority email & chat support', included: true },
      { text: 'Package consolidation (up to 10 pkgs)', included: true },
      { text: 'Priority processing', included: true },
      { text: 'Insurance up to $2,000', included: true },
      { text: 'Dedicated account manager', included: false },
    ],
    cta: 'Start Premium',
    ctaVariant: 'primary' as const,
  },
  {
    id: 'business',
    name: 'Business',
    icon: <Building2 size={24} />,
    monthlyPrice: 49.99,
    annualPrice: 39.99,
    color: 'text-[#F59E0B]',
    bg: 'bg-amber-50',
    border: 'border-amber-300',
    description: 'For high-volume shippers and businesses with complex needs.',
    features: [
      { text: 'Multiple US shipping addresses', included: true },
      { text: 'Unlimited package storage (180 days)', included: true },
      { text: 'Unlimited HD package photos', included: true },
      { text: 'Best-in-class shipping rates (up to 82% off)', included: true },
      { text: '24/7 priority phone & chat support', included: true },
      { text: 'Package consolidation (unlimited)', included: true },
      { text: 'Same-day priority processing', included: true },
      { text: 'Insurance up to $10,000', included: true },
      { text: 'Dedicated account manager', included: true },
    ],
    cta: 'Contact Sales',
    ctaVariant: 'outline' as const,
  },
]

const FAQS = [
  { q: 'Can I upgrade or downgrade my plan?', a: 'Yes, you can change your plan at any time. Changes take effect on your next billing cycle.' },
  { q: 'What happens to my packages if I cancel?', a: 'Your packages will remain at our warehouse for 15 days after cancellation. You can still ship them out at standard rates.' },
  { q: 'Is there a free trial for Premium?', a: 'Yes! New users get a 30-day free trial of Premium with no credit card required.' },
  { q: 'What currencies do you accept?', a: 'We accept USD, EUR, GBP, AED, INR, and 30+ other currencies via Stripe.' },
  { q: 'Are there any hidden fees?', a: 'No hidden fees. The plan price covers membership. Shipping and insurance are charged separately at the rates shown.' },
]

export default function PricingPage() {
  const [annual, setAnnual] = useState(true)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0A1628] to-[#1E3A8A] py-20 text-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm mb-6">
            <Star size={14} className="text-[#F59E0B]" />
            Simple, transparent pricing
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Plans for Every Shopper</h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto mb-10">
            Start free and upgrade as you grow. All plans include a free US shipping address.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-white/10 rounded-2xl p-1.5">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${!annual ? 'bg-white text-[#0A1628]' : 'text-white/70 hover:text-white'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${annual ? 'bg-white text-[#0A1628]' : 'text-white/70 hover:text-white'}`}
            >
              Annual
              <span className="bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full">Save 20%</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Plans */}
      <div className="max-w-6xl mx-auto px-4 -mt-8 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative bg-white rounded-3xl border-2 ${plan.border} shadow-sm overflow-hidden ${plan.popular ? 'shadow-xl scale-[1.03]' : ''}`}
            >
              {plan.popular && (
                <div className="bg-[#1B4FD8] text-white text-xs font-bold text-center py-2 tracking-wider uppercase">
                  Most Popular
                </div>
              )}
              <div className="p-7">
                {/* Header */}
                <div className={`w-12 h-12 ${plan.bg} rounded-2xl flex items-center justify-center ${plan.color} mb-4`}>
                  {plan.icon}
                </div>
                <h3 className="text-xl font-bold text-[#0A1628] mb-1">{plan.name}</h3>
                <p className="text-slate-500 text-sm mb-5">{plan.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-[#0A1628]">
                      ${annual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    {plan.monthlyPrice > 0 && (
                      <span className="text-slate-400 text-sm">/mo{annual ? ', billed annually' : ''}</span>
                    )}
                  </div>
                  {plan.monthlyPrice === 0 && <p className="text-slate-400 text-sm mt-1">Free forever</p>}
                </div>

                <Link to="/signup">
                  <Button
                    variant={plan.popular ? 'primary' : 'outline'}
                    size="lg"
                    className="w-full mb-6"
                    iconRight={<ArrowRight size={16} />}
                  >
                    {plan.cta}
                  </Button>
                </Link>

                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((f) => (
                    <div key={f.text} className="flex items-start gap-2.5">
                      {f.included ? (
                        <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X size={16} className="text-slate-300 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={`text-sm ${f.included ? 'text-slate-700' : 'text-slate-400'}`}>{f.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-14 mb-16">
          {[
            { icon: <Shield size={22} className="text-[#1B4FD8]" />, title: '30-Day Free Trial', desc: 'Try Premium risk-free, no credit card required.' },
            { icon: <Truck size={22} className="text-[#10B981]" />, title: 'Ships to 220+ Countries', desc: 'Every plan supports all our international destinations.' },
            { icon: <Star size={22} className="text-[#F59E0B]" />, title: '500,000+ Members', desc: 'Join shoppers from every corner of the world.' },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex items-start gap-4">
              <div className="bg-slate-50 rounded-xl p-2.5 flex-shrink-0">{item.icon}</div>
              <div>
                <p className="font-semibold text-slate-900 mb-1">{item.title}</p>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0A1628] text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold text-slate-900 text-sm">{faq.q}</span>
                  <span className={`text-[#1B4FD8] transition-transform ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="px-5 pb-5 text-slate-500 text-sm leading-relaxed border-t border-slate-50"
                  >
                    <div className="pt-4">{faq.a}</div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
