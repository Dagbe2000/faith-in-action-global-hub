import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Calendar, ArrowRight } from 'lucide-react'
import type { Story } from '@/lib/types'
import { urlFor } from '@/lib/sanity'

interface StoryCardProps {
  story: Story
  featured?: boolean
}

export default function StoryCard({ story, featured = false }: StoryCardProps) {
  if (featured) {
    return (
      <Link href={`/news/${story.slug.current}`} className="group block">
        <article className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300">
          <div className="relative h-64 overflow-hidden">
            {story.coverImage ? (
              <Image
                src={urlFor(story.coverImage).width(700).height(256).url()}
                alt={story.coverImage.alt || story.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-brand-navy to-brand-blue" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-white/80 text-xs font-medium uppercase tracking-wide mb-1">Impact Story</p>
              <h3 className="font-heading font-bold text-white text-xl leading-snug group-hover:text-brand-blue-light transition-colors">
                {story.title}
              </h3>
            </div>
          </div>
          <div className="p-5">
            {(story.location || story.country) && (
              <p className="flex items-center gap-1.5 text-sm text-gray-500 mb-2">
                <MapPin size={14} aria-hidden="true" />
                {story.location || story.country}
              </p>
            )}
            <p className="text-gray-700 text-sm leading-relaxed line-clamp-3 italic">
              "{story.summary}"
            </p>
            {story.subject && (
              <p className="mt-3 text-xs font-semibold text-brand-blue">— {story.subject}</p>
            )}
          </div>
        </article>
      </Link>
    )
  }

  return (
    <Link href={`/news/${story.slug.current}`} className="group block">
      <article className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-brand-blue/30 hover:shadow-card transition-all duration-300 flex gap-4 p-4">
        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
          {story.coverImage ? (
            <Image
              src={urlFor(story.coverImage).width(80).height(80).url()}
              alt={story.coverImage.alt || story.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-brand-blue-100 to-brand-blue" />
          )}
        </div>
        <div>
          <h3 className="font-semibold text-brand-navy text-sm leading-snug mb-1 group-hover:text-brand-blue transition-colors">
            {story.title}
          </h3>
          {(story.location || story.country) && (
            <p className="flex items-center gap-1 text-xs text-gray-500 mb-1.5">
              <MapPin size={10} aria-hidden="true" />
              {story.location || story.country}
            </p>
          )}
          <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">{story.summary}</p>
        </div>
      </article>
    </Link>
  )
}
