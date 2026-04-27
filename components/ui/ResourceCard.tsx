import Link from 'next/link'
import Image from 'next/image'
import { FileText, Video, Headphones, BookOpen, Download, ExternalLink, Globe } from 'lucide-react'
import type { Resource } from '@/lib/types'
import { urlFor } from '@/lib/sanity'

const typeIcons = {
  guide: BookOpen,
  report: FileText,
  toolkit: Download,
  video: Video,
  podcast: Headphones,
  curriculum: BookOpen,
  'prayer-guide': BookOpen,
  'policy-brief': FileText,
  research: FileText,
}

const typeColors = {
  guide: 'bg-blue-50 text-brand-blue',
  report: 'bg-orange-50 text-brand-orange',
  toolkit: 'bg-green-50 text-green-700',
  video: 'bg-purple-50 text-purple-700',
  podcast: 'bg-pink-50 text-pink-700',
  curriculum: 'bg-yellow-50 text-yellow-700',
  'prayer-guide': 'bg-teal-50 text-teal-700',
  'policy-brief': 'bg-gray-50 text-gray-700',
  research: 'bg-indigo-50 text-indigo-700',
}

interface ResourceCardProps {
  resource: Resource
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const Icon = typeIcons[resource.type] || FileText
  const colorClass = typeColors[resource.type] || 'bg-gray-50 text-gray-700'

  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group flex flex-col">
      {resource.thumbnail ? (
        <div className="relative h-44 overflow-hidden">
          <Image
            src={urlFor(resource.thumbnail).width(400).height(176).url()}
            alt={resource.thumbnail.alt || resource.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      ) : (
        <div className="h-44 bg-gradient-to-br from-brand-blue-50 to-brand-blue-100 flex items-center justify-center">
          <Icon size={48} className="text-brand-blue opacity-40" aria-hidden="true" />
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${colorClass}`}>
            <Icon size={12} aria-hidden="true" />
            {resource.type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </span>
          {resource.language && resource.language !== 'en' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
              <Globe size={10} aria-hidden="true" />
              {resource.language.toUpperCase()}
            </span>
          )}
        </div>

        <h3 className="font-heading font-semibold text-brand-navy text-base leading-snug mb-2 group-hover:text-brand-blue transition-colors">
          {resource.title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed flex-1 line-clamp-3">
          {resource.summary}
        </p>

        {resource.downloadUrl && (
          <a
            href={resource.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-brand-blue font-medium text-sm hover:text-brand-blue-dark transition-colors group/link"
            aria-label={`Access ${resource.title}`}
          >
            <Download size={16} aria-hidden="true" />
            Access Resource
            <ExternalLink size={12} className="opacity-60 group-hover/link:opacity-100" aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  )
}
