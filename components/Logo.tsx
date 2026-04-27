import Link from 'next/link'

interface LogoProps {
  variant?: 'dark' | 'light'
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
}

export default function Logo({ variant = 'dark', size = 'md', showText = true }: LogoProps) {
  const sizes = { sm: 32, md: 40, lg: 52 }
  const dim = sizes[size]
  const textColor = variant === 'light' ? 'text-white' : 'text-brand-navy'
  const subtextColor = variant === 'light' ? 'text-brand-blue-100' : 'text-brand-blue'

  return (
    <Link href="/" className="flex items-center gap-2.5 group" aria-label="Faith in Action Global Hub - Home">
      <div className="relative flex-shrink-0" style={{ width: dim, height: dim }}>
        <svg
          width={dim}
          height={dim}
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-hidden="true"
        >
          {/* Rock / Foundation base */}
          <path
            d="M6 42 L18 22 L26 30 L34 18 L46 42 Z"
            fill="#1E3A5F"
            className="group-hover:opacity-90 transition-opacity"
          />
          <path
            d="M6 42 L18 22 L26 30 L34 18 L46 42 Z"
            fill="url(#rockGradient)"
            className="group-hover:opacity-90 transition-opacity"
          />
          {/* Flame */}
          <path
            d="M26 6 C26 6 20 14 22 20 C22 20 18 17 20 12 C20 12 14 18 16 26 C16 26 13 23 14 18 C14 18 8 26 12 34 C14 38 20 40 26 40 C32 40 38 38 40 34 C44 26 38 18 38 18 C39 23 36 26 36 26 C38 18 32 12 32 12 C34 17 30 20 30 20 C32 14 26 6 26 6 Z"
            fill="url(#flameGradient)"
            className="group-hover:scale-105 transition-transform origin-center"
          />
          {/* Inner flame highlight */}
          <path
            d="M26 14 C26 14 22 20 24 24 C25 26 26 28 26 30 C26 28 27 26 28 24 C30 20 26 14 26 14 Z"
            fill="rgba(255,255,255,0.6)"
          />
          <defs>
            <linearGradient id="flameGradient" x1="26" y1="6" x2="26" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FCD34D" />
              <stop offset="40%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
            <linearGradient id="rockGradient" x1="6" y1="22" x2="46" y2="42" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2A9FD6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#1E3A5F" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-tight">
          <span className={`font-heading font-bold tracking-tight ${textColor} ${size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : 'text-base'}`}>
            Faith in Action
          </span>
          <span className={`font-sans text-xs font-medium tracking-wider uppercase ${subtextColor}`}>
            Global Hub
          </span>
        </div>
      )}
    </Link>
  )
}
