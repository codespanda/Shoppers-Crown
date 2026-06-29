import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="text-9xl font-black gradient-text mb-6">404</div>
        <h1 className="text-2xl font-bold text-[#0F172A] mb-3">Page not found</h1>
        <p className="text-slate-500 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => window.history.back()}>
            <Button variant="outline" size="lg" icon={<ArrowLeft size={18} />}>Go Back</Button>
          </button>
          <Link to="/">
            <Button size="lg" icon={<Home size={18} />}>Home</Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
