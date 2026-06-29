import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingCart, Minus, Plus, Trash2, ArrowRight, Package } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatCurrency } from '@/lib/utils'
import Button from '@/components/ui/Button'

export default function CartPage() {
  const { items, removeItem, updateQty, total, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-glow">
            <ShoppingCart size={40} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-[#0F172A] mb-3">Your cart is empty</h2>
          <p className="text-slate-500 mb-8">Browse our collection and add items to your cart</p>
          <Link to="/shop">
            <Button size="lg" iconRight={<ArrowRight size={18} />}>Start Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  const shipping = 34.99
  const tax = total * 0.0
  const grandTotal = total + shipping + tax

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#0F172A]">Shopping Cart</h1>
          <button onClick={clearCart} className="text-sm text-red-500 hover:text-red-600 font-medium">Clear All</button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, i) => (
              <motion.div
                key={item.productId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex gap-4"
              >
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 text-sm mb-2">{item.name}</h3>
                  <p className="font-bold text-[#0057FF] text-lg">{formatCurrency(item.price)}</p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button onClick={() => removeItem(item.productId)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                    <Trash2 size={16} />
                  </button>
                  <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1">
                    <button onClick={() => updateQty(item.productId, item.quantity - 1)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white transition-colors text-slate-600">
                      <Minus size={13} />
                    </button>
                    <span className="w-6 text-center font-semibold text-slate-900 text-sm">{item.quantity}</span>
                    <button onClick={() => updateQty(item.productId, item.quantity + 1)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white transition-colors text-slate-600">
                      <Plus size={13} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order summary */}
          <div>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sticky top-24">
              <h2 className="font-bold text-slate-900 text-lg mb-5">Order Summary</h2>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Subtotal ({items.length} items)</span>
                  <span className="font-medium text-slate-900">{formatCurrency(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Shipping (est.)</span>
                  <span className="font-medium text-slate-900">{formatCurrency(shipping)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Tax</span>
                  <span className="font-medium text-emerald-600">Free (Oregon)</span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="font-bold text-slate-900">Total</span>
                  <span className="font-bold text-xl text-[#0F172A]">{formatCurrency(grandTotal)}</span>
                </div>
              </div>

              {/* Promo code */}
              <div className="flex gap-2 mb-5">
                <input placeholder="Promo code" className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0057FF]" />
                <button className="px-4 py-2 bg-slate-100 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-200 transition-colors">Apply</button>
              </div>

              <Link to="/checkout">
                <Button className="w-full" size="lg" iconRight={<ArrowRight size={18} />}>
                  Proceed to Checkout
                </Button>
              </Link>

              <div className="mt-4 flex items-center justify-center gap-2 text-slate-400 text-xs">
                <Package size={12} />
                Free consolidation available
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
