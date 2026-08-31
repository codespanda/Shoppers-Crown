import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CheckCircle2, Package, ArrowRight, MapPin } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function OrderSuccessPage() {
  const orderNumber = `#ORD-${Date.now().toString().slice(-6)}`

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="max-w-md w-full text-center"
      >
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-24 h-24 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 size={48} className="text-emerald-500" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h1 className="text-3xl font-bold text-[#0A1628] mb-2">Order Confirmed!</h1>
          <p className="text-slate-500 mb-2">Thank you for your purchase</p>
          <p className="text-slate-400 text-sm mb-8">Order number: <span className="font-semibold text-slate-700">{orderNumber}</span></p>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6 text-left space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                <Package size={18} className="text-[#1B4FD8]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Processing your order</p>
                <p className="text-xs text-slate-400">We'll confirm within 2 hours</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center">
                <MapPin size={18} className="text-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Track your shipment</p>
                <p className="text-xs text-slate-400">Track in real-time from your dashboard</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link to="/dashboard">
              <Button size="lg" className="w-full" iconRight={<ArrowRight size={18} />}>
                Go to Dashboard
              </Button>
            </Link>
            <Link to="/shop">
              <Button size="lg" variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
