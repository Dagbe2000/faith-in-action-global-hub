import Link from 'next/link'
import { LucideIcon } from 'lucide-react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'orange' | 'white'
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  external?: boolean
  'aria-label'?: string
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-brand-blue hover:bg-brand-blue-dark text-white shadow-md hover:shadow-lg',
  secondary: 'bg-brand-navy hover:bg-brand-navy-light text-white shadow-md hover:shadow-lg',
  outline: 'border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white',
  ghost: 'text-brand-blue hover:bg-brand-blue-50',
  orange: 'bg-brand-orange hover:bg-brand-orange-dark text-white shadow-orange hover:shadow-lg',
  white: 'bg-white hover:bg-gray-50 text-brand-navy shadow-md hover:shadow-lg',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-6 py-3 text-base gap-2',
  xl: 'px-8 py-4 text-lg gap-2.5',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  disabled = false,
  type = 'button',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  external = false,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const base = `inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed`
  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${className}`

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 14 : size === 'xl' ? 22 : 18} aria-hidden="true" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 14 : size === 'xl' ? 22 : 18} aria-hidden="true" />}
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        aria-label={ariaLabel}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  )
}
