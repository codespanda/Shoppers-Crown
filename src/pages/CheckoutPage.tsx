import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { MapPin, CreditCard, Package, CheckCircle2, ChevronRight } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatCurrency } from '@/lib/utils'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { COUNTRIES } from '@/data/mockData'

const STEPS = ['Shipping', 'Payment', 'Review']

export default function CheckoutPage() {
  const [step, setStep] = useState(0)
  const { items, total, clearCart } = useCart()
  const navigate = useNavigate()
  const { register } = useForm()
  const [placing, setPlacing] = useState(false)

  const shipping = 34.99
  const grandTotal = total + shipping

  const handlePlaceOrder = async () => {
    setPlacing(true)
    await new Promise((r) => setTimeout(r, 1500))
    clearCart()
    navigate('/order-success')
  }

  if (items.length === 0) {
    navigate('/cart')
    return null
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Steps */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <button
                onClick={() => i < step && setStep(i)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  i === step ? 'bg-[#1B4FD8] text-white' :
                  i < step ? 'bg-emerald-500 text-white' :
                  'bg-slate-100 text-slate-400'
                }`}
              >
                {i < step ? <CheckCircle2 size={14} /> : <span>{i + 1}</span>}
                {s}
              </button>
              {i < STEPS.length - 1 && <ChevronRight size={14} className="text-slate-300" />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left */}
          <div className="lg:col-span-2">
            {step === 0 && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-5">
                  <h2 className="font-bold text-slate-900 text-lg mb-5 flex items-center gap-2"><MapPin size={18} className="text-[#1B4FD8]" /> Shipping Address</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="First Name" placeholder="John" {...register('firstName')} />
                    <Input label="Last Name" placeholder="Smith" {...register('lastName')} />
                    <div className="col-span-2">
                      <Input label="Address Line 1" placeholder="123 Main St" {...register('address')} />
                    </div>
                    <Input label="City" placeholder="Dubai" {...register('city')} />
                    <Input label="Postal Code" placeholder="12345" {...register('postal')} />
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Country</label>
                      <select className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#1B4FD8] bg-white" {...register('country')}>
                        {COUNTRIES.map((c) => <option key={c.id} value={c.code}>{c.flag} {c.name}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
                <Button size="lg" onClick={() => setStep(1)} iconRight={<ChevronRight size={18} />}>
                  Continue to Payment
                </Button>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-5">
                  <h2 className="font-bold text-slate-900 text-lg mb-5 flex items-center gap-2"><CreditCard size={18} className="text-[#1B4FD8]" /> Payment Details</h2>
                  <div className="space-y-4">
                    <Input label="Card Number" placeholder="1234 5678 9012 3456" {...register('cardNumber')} />
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="Expiry Date" placeholder="MM/YY" {...register('expiry')} />
                      <Input label="CVV" placeholder="123" type="password" {...register('cvv')} />
                    </div>
                    <Input label="Cardholder Name" placeholder="John Smith" {...register('cardName')} />
                  </div>
                  <div className="mt-4 flex gap-3">
                    {['💳 Visa', '💳 Mastercard', '💳 Amex', '🔒 PayPal'].map((m) => (
                      <div key={m} className="px-3 py-1.5 bg-slate-50 rounded-lg text-xs text-slate-500">{m}</div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(0)} className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50">Back</button>
                  <Button size="lg" onClick={() => setStep(2)} iconRight={<ChevronRight size={18} />}>
                    Review Order
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-5">
                  <h2 className="font-bold text-slate-900 text-lg mb-5 flex items-center gap-2"><Package size={18} className="text-[#1B4FD8]" /> Order Review</h2>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.productId} className="flex gap-3 items-center">
                        <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-xl" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900">{item.name}</p>
                          <p className="text-xs text-slate-400">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-slate-900">{formatCurrency(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50">Back</button>
                  <Button size="lg" className="flex-1" loading={placing} onClick={handlePlaceOrder}>
                    Place Order — {formatCurrency(grandTotal)}
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Summary sidebar */}
          <div>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sticky top-24">
              <h3 className="font-bold text-slate-900 mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm mb-4">
                {items.map((item) => (
                  <div key={item.productId} className="flex justify-between">
                    <span className="text-slate-500 truncate pr-2">{item.name} ×{item.quantity}</span>
                    <span className="font-medium text-slate-900 flex-shrink-0">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-100 pt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Subtotal</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Shipping</span>
                  <span>{formatCurrency(shipping)}</span>
                </div>
                <div className="flex justify-between font-bold text-base pt-2 border-t border-slate-100">
                  <span>Total</span>
                  <span className="text-[#1B4FD8]">{formatCurrency(grandTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
