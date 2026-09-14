import { Link } from 'react-router-dom'
import { Package, Globe, Mail, Phone } from 'lucide-react'

const LINKS = {
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
    { label: 'Blog', href: '/blog' },
    { label: 'Partners', href: '/partners' },
  ],
  Shipping: [
    { label: 'Shipping Rates', href: '/pricing' },
    { label: 'Delivery Times', href: '/shipping' },
    { label: 'Countries', href: '/countries' },
    { label: 'Customs Guide', href: '/customs' },
    { label: 'Insurance', href: '/insurance' },
  ],
  Services: [
    { label: 'US Address', href: '/us-address' },
    { label: 'Package Consolidation', href: '/consolidation' },
    { label: 'Package Photos', href: '/photos' },
    { label: 'Returns', href: '/returns' },
    { label: 'Prepaid Labels', href: '/labels' },
  ],
  Support: [
    { label: 'Help Center', href: '/support' },
    { label: 'Track Package', href: '/track' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Live Chat', href: '/chat' },
    { label: 'Community', href: '/community' },
  ],
}

const SOCIAL = [
  { icon: <span className="text-xs font-bold">𝕏</span>, href: '#', label: 'Twitter' },
  { icon: <span className="text-sm">📸</span>, href: '#', label: 'Instagram' },
  { icon: <span className="text-sm">📘</span>, href: '#', label: 'Facebook' },
  { icon: <span className="text-sm">▶</span>, href: '#', label: 'YouTube' },
  { icon: <span className="text-xs font-bold">in</span>, href: '#', label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0A1628] text-slate-400">
      {/* Newsletter */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white text-xl font-bold mb-1">Stay in the loop</h3>
              <p className="text-slate-400 text-sm">Get deals, shipping tips, and exclusive offers.</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-72 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#1B4FD8] text-sm"
              />
              <button className="px-6 py-3 gradient-primary rounded-xl text-white text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center">
                <Package size={20} className="text-white" />
              </div>
              <span className="text-white text-xl font-bold">Shoppers Crown</span>
            </Link>
            <p className="text-sm leading-relaxed mb-5">
              Your gateway to thousands of US stores. Shop, consolidate, and ship worldwide.
            </p>
            <div className="space-y-2">
              <a href="mailto:support@Shoppers Crown.com" className="flex items-center gap-2 text-sm hover:text-white transition-colors">
                <Mail size={14} /> support@Shoppers Crown.com
              </a>
              <span className="flex items-center gap-2 text-sm">
                <Phone size={14} /> +1 (***) ***-1234
              </span>
              <span className="flex items-center gap-2 text-sm">
                <Globe size={14} /> Portland, Oregon USA
              </span>
            </div>
          </div>

          {Object.entries(LINKS).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link to={item.href} className="text-sm hover:text-white transition-colors duration-150">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Shoppers Crown. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Sitemap'].map((link) => (
              <Link key={link} to={`/${link.toLowerCase().replace(/ /g, '-')}`} className="text-xs hover:text-white transition-colors">
                {link}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-[#1B4FD8] hover:text-white transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
