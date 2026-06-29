import { createContext, useContext, useState } from 'react'
import type { User } from '@/types'

const DEMO_USER: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  country: 'UAE',
  usAddress: '3450 NW 115th Ave, Suite 205, Portland, OR 97229',
  memberSince: '2023-01-15',
  tier: 'premium',
  totalSaved: 847.50,
  packagesShipped: 42,
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  signup: (name: string, email: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = async (email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 800))
    setUser({ ...DEMO_USER, email })
  }

  const signup = async (name: string, email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 800))
    setUser({ ...DEMO_USER, name, email })
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
