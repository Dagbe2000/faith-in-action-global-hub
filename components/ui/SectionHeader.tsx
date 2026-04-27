interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  centered?: boolean
  light?: boolean
  className?: string
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  centered = false,
  light = false,
  className = '',
}: SectionHeaderProps) {
  const textAlign = centered ? 'text-center mx-auto' : ''
  const titleColor = light ? 'text-white' : 'text-brand-navy'
  const eyebrowColor = light ? 'text-brand-blue-light' : 'text-brand-orange'
  const descColor = light ? 'text-blue-100' : 'text-gray-600'

  return (
    <div className={`max-w-3xl ${textAlign} ${className}`}>
      {eyebrow && (
        <p className={`text-sm font-semibold uppercase tracking-widest mb-3 ${eyebrowColor}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ${titleColor}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-lg leading-relaxed ${descColor}`}>
          {description}
        </p>
      )}
    </div>
  )
}
