'use client'

import { useInView } from 'react-intersection-observer'
import { Users, Globe, FileText, HandshakeIcon } from 'lucide-react'

const stats = [
  {
    icon: Users,
    value: '200,000+',
    label: 'Faith Advocates',
    description: 'Mobilized across our global network',
    color: 'text-brand-blue',
    bg: 'bg-brand-blue-50',
  },
  {
    icon: Globe,
    value: '54',
    label: 'African Nations',
    description: 'With active faith advocacy partners',
    color: 'text-brand-orange',
    bg: 'bg-orange-50',
  },
  {
    icon: FileText,
    value: '30+',
    label: 'Policy Victories',
    description: 'Legislation influenced by faith coalitions',
    color: 'text-green-700',
    bg: 'bg-green-50',
  },
  {
    icon: HandshakeIcon,
    value: '120+',
    label: 'Partner Organizations',
    description: 'Across denominations and faith traditions',
    color: 'text-purple-700',
    bg: 'bg-purple-50',
  },
]

export default function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section
      ref={ref}
      className="py-16 bg-gradient-to-br from-brand-navy to-brand-navy-light"
      aria-label="Impact statistics"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-brand-blue-light text-sm font-semibold uppercase tracking-widest mb-10">
          Our Global Impact
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map(({ icon: Icon, value, label, description, color, bg }, i) => (
            <div
              key={label}
              className={`text-center transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center mx-auto mb-4`}>
                <Icon size={28} className={color} aria-hidden="true" />
              </div>
              <p className="font-heading font-bold text-white text-3xl lg:text-4xl">{value}</p>
              <p className="font-semibold text-white text-sm mt-1">{label}</p>
              <p className="text-blue-300 text-xs mt-1 leading-snug">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
