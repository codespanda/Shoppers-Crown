import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Package, Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  terms: z.boolean().refine((v) => v, 'You must accept the terms'),
})
type FormData = z.infer<typeof schema>

const BENEFITS = [
  'Free US shipping address in Oregon',
  'Shop from 50,000+ US stores',
  'Tax-free shopping (no Oregon sales tax)',
  'Package consolidation service',
]

export default function SignupPage() {
  const [showPwd, setShowPwd] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { terms: false },
  })

  const onSubmit = async (data: FormData) => {
    await signup(data.name, data.email, data.password)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#001A66] to-slate-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="hidden lg:block">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-10">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <Package size={22} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-white">MyUS Shopping</span>
          </Link>
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Your Gateway to
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#0057FF] to-[#00C2FF]">
              US Shopping
            </span>
          </h2>
          <p className="text-slate-400 mb-8">Join millions of international shoppers who use MyUS to access their favorite US brands.</p>
          <div className="space-y-3">
            {BENEFITS.map((b) => (
              <div key={b} className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-[#10B981]" />
                <span className="text-slate-300 text-sm">{b}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Form */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <div className="glass rounded-3xl p-8 shadow-2xl">
            <h1 className="text-2xl font-bold text-slate-900 mb-1">Create your account</h1>
            <p className="text-slate-500 text-sm mb-8">Free to join. No credit card required.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input label="Full name" placeholder="John Smith" error={errors.name?.message} {...register('name')} />
              <Input label="Email address" type="email" placeholder="you@example.com" error={errors.email?.message} {...register('email')} />
              <Input
                label="Password"
                type={showPwd ? 'text' : 'password'}
                placeholder="••••••••"
                error={errors.password?.message}
                hint="At least 6 characters"
                iconRight={
                  <button type="button" onClick={() => setShowPwd(!showPwd)} className="text-slate-400 hover:text-slate-600">
                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                }
                {...register('password')}
              />

              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" className="rounded accent-[#0057FF] mt-0.5" {...register('terms')} />
                <span className="text-sm text-slate-600">
                  I agree to the{' '}
                  <Link to="/terms" className="text-[#0057FF] hover:underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link to="/privacy-policy" className="text-[#0057FF] hover:underline">Privacy Policy</Link>
                </span>
              </label>
              {errors.terms && <p className="text-xs text-red-500">{errors.terms.message}</p>}

              <Button type="submit" size="lg" className="w-full" loading={isSubmitting} iconRight={<ArrowRight size={18} />}>
                Create Free Account
              </Button>
            </form>

            <p className="text-center text-sm text-slate-500 mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-[#0057FF] font-semibold hover:underline">Sign in</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
