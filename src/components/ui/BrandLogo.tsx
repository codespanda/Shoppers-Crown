/**
 * Inline SVG brand logos — no external CDN needed.
 * Each logo is a minimal, recognisable rendition of the brand mark.
 */

interface BrandLogoProps {
  name: string
  size?: number
  className?: string
}

/* ─── Inline SVG marks ───────────────────────────────────────────────────── */

const LOGOS: Record<string, (size: number) => React.ReactNode> = {
  Amazon: (s) => (
    <svg width={s} height={s} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="50%" y="38%" dominantBaseline="middle" textAnchor="middle" fontSize="36" fontWeight="900" fontFamily="Arial Black,sans-serif" fill="#FF9900">a</text>
      <path d="M20 62 Q50 75 80 62" stroke="#FF9900" strokeWidth="5" strokeLinecap="round" fill="none"/>
      <path d="M76 57 L82 62 L76 67" stroke="#FF9900" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  ),

  Apple: (s) => (
    <svg width={s} height={s} viewBox="0 0 170 170" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#444"
        d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.2-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.93.21-9.84-1.96-14.75-6.52-3.13-2.73-7.04-7.41-11.73-14.04-5.03-7.08-9.17-15.29-12.41-24.65-3.47-10.11-5.21-19.9-5.21-29.38 0-10.86 2.35-20.22 7.05-28.07 3.69-6.3 8.61-11.27 14.75-14.92 6.15-3.65 12.79-5.51 19.95-5.63 3.91 0 9.05 1.21 15.43 3.59 6.36 2.39 10.45 3.6 12.24 3.6 1.34 0 5.88-1.42 13.57-4.24 7.27-2.62 13.41-3.7 18.44-3.27 13.63 1.1 23.87 6.47 30.68 16.15-12.19 7.39-18.22 17.73-18.1 31 .11 10.34 3.86 18.94 11.23 25.77 3.34 3.17 7.07 5.62 11.22 7.36-.9 2.61-1.85 5.11-2.86 7.51zm-31.26-123.01c0 8.1-2.96 15.67-8.86 22.68-7.12 8.33-15.73 13.15-25.07 12.39-.12-.97-.19-1.99-.19-3.07 0-7.78 3.39-16.11 9.4-22.91 3-3.45 6.82-6.31 11.45-8.6 4.62-2.25 8.99-3.5 13.1-3.71.12 1.08.17 2.17.17 3.22z"
      />
    </svg>
  ),

  Nike: (s) => (
    <svg width={s} height={s} viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 70 Q80 10 190 30 Q130 50 70 90 Q40 100 10 70Z" fill="#111"/>
    </svg>
  ),

  Adidas: (s) => (
    <svg width={s} height={s} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,10 90,80 10,80" fill="none" stroke="#000" strokeWidth="8"/>
      <line x1="35" y1="57" x2="65" y2="57" stroke="#000" strokeWidth="8" strokeLinecap="round"/>
      <line x1="27" y1="70" x2="73" y2="70" stroke="#000" strokeWidth="8" strokeLinecap="round"/>
    </svg>
  ),

  'Best Buy': (s) => (
    <svg width={s} height={s} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="12" fill="#003087"/>
      <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle" fontSize="28" fontWeight="900" fontFamily="Arial Black,sans-serif" fill="#FFE000">BB</text>
    </svg>
  ),

  Target: (s) => (
    <svg width={s} height={s} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="44" stroke="#CC0000" strokeWidth="8" fill="none"/>
      <circle cx="50" cy="50" r="27" stroke="#CC0000" strokeWidth="8" fill="none"/>
      <circle cx="50" cy="50" r="10" fill="#CC0000"/>
    </svg>
  ),

  Walmart: (s) => (
    <svg width={s} height={s} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 6-petal spark */}
      {[0,60,120,180,240,300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180
        const x1 = 50 + 14 * Math.cos(rad)
        const y1 = 50 + 14 * Math.sin(rad)
        const x2 = 50 + 36 * Math.cos(rad)
        const y2 = 50 + 36 * Math.sin(rad)
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#0071CE" strokeWidth="8" strokeLinecap="round"/>
      })}
    </svg>
  ),

  "Macy's": (s) => (
    <svg width={s} height={s} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,8 62,38 94,38 68,58 78,88 50,68 22,88 32,58 6,38 38,38" fill="#E11D48"/>
    </svg>
  ),

  Costco: (s) => (
    <svg width={s} height={s} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="12" fill="#005DAA"/>
      <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle" fontSize="22" fontWeight="900" fontFamily="Arial Black,sans-serif" fill="white">COSTCO</text>
    </svg>
  ),

  eBay: (s) => (
    <svg width={s} height={s} viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="50" fontSize="54" fontWeight="900" fontFamily="Arial Black,sans-serif">
        <tspan fill="#E53238">e</tspan>
        <tspan fill="#0064D2">B</tspan>
        <tspan fill="#F5AF02">a</tspan>
        <tspan fill="#86B817">y</tspan>
      </text>
    </svg>
  ),

  Nordstrom: (s) => (
    <svg width={s} height={s} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="12" fill="#1C1C1C"/>
      <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle" fontSize="24" fontWeight="900" fontFamily="Arial Black,sans-serif" fill="white">N</text>
    </svg>
  ),

  Sephora: (s) => (
    <svg width={s} height={s} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="50" fill="#1C1C1C"/>
      <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle" fontSize="22" fontWeight="900" fontFamily="Arial Black,sans-serif" fill="white">S</text>
    </svg>
  ),
}

export default function BrandLogo({ name, size = 48, className = '' }: BrandLogoProps) {
  const render = LOGOS[name]
  if (render) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
        {render(size)}
      </span>
    )
  }
  // Generic fallback: coloured initials
  return (
    <span
      className={`inline-flex items-center justify-center rounded-xl font-black text-white ${className}`}
      style={{ width: size, height: size, background: '#0057FF', fontSize: size * 0.35 }}
    >
      {name.slice(0, 2).toUpperCase()}
    </span>
  )
}
