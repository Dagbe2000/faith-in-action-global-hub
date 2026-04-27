import Image from 'next/image'
import Link from 'next/link'
import { Globe, MapPin, ExternalLink } from 'lucide-react'
import type { Partner } from '@/lib/types'
import { urlFor } from '@/lib/sanity'

interface PartnerCardProps {
  partner: Partner
}

export default function PartnerCard({ partner }: PartnerCardProps) {
  return (
    <article className="bg-white rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col items-center text-center group">
      <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
        {partner.logo ? (
          <Image
            src={urlFor(partner.logo).width(80).height(80).url()}
            alt={partner.logo.alt || partner.name}
            width={80}
            height={80}
            className="object-contain p-2"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-brand-blue-50 to-brand-blue-100 flex items-center justify-center">
            <span className="font-heading font-bold text-2xl text-brand-blue">
              {partner.name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <h3 className="font-heading font-semibold text-brand-navy text-sm leading-tight mb-1 group-hover:text-brand-blue transition-colors">
        {partner.name}
      </h3>

      {(partner.country || partner.region) && (
        <p className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-2">
          <MapPin size={10} aria-hidden="true" />
          {partner.country || partner.region}
        </p>
      )}

      {partner.description && (
        <p className="text-xs text-gray-600 line-clamp-2 mb-3">{partner.description}</p>
      )}

      {partner.website && (
        <a
          href={partner.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-brand-blue font-medium hover:text-brand-blue-dark transition-colors mt-auto"
          aria-label={`Visit ${partner.name} website`}
        >
          <Globe size={12} aria-hidden="true" />
          Visit Website
          <ExternalLink size={10} aria-hidden="true" />
        </a>
      )}
    </article>
  )
}
