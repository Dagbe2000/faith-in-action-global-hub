import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, Tag, ArrowRight } from 'lucide-react'
import type { Post } from '@/lib/types'
import { urlFor } from '@/lib/sanity'

const categoryColors: Record<string, string> = {
  news: 'bg-blue-50 text-brand-blue',
  analysis: 'bg-purple-50 text-purple-700',
  opinion: 'bg-orange-50 text-brand-orange',
  'faith-politics': 'bg-teal-50 text-teal-700',
  'africa-update': 'bg-green-50 text-green-700',
  'success-story': 'bg-yellow-50 text-yellow-700',
  'event-recap': 'bg-pink-50 text-pink-700',
  interview: 'bg-indigo-50 text-indigo-700',
}

const categoryLabels: Record<string, string> = {
  news: 'News',
  analysis: 'Analysis',
  opinion: 'Opinion',
  'faith-politics': 'Faith & Politics',
  'africa-update': 'Africa Update',
  'success-story': 'Success Story',
  'event-recap': 'Event Recap',
  interview: 'Interview',
}

interface PostCardProps {
  post: Post
  featured?: boolean
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const categoryColor = categoryColors[post.category] || 'bg-gray-100 text-gray-700'
  const categoryLabel = categoryLabels[post.category] || post.category

  if (featured) {
    return (
      <Link href={`/news/${post.slug.current}`} className="group block">
        <article className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300">
          <div className="relative h-56 overflow-hidden">
            {post.coverImage ? (
              <Image
                src={urlFor(post.coverImage).width(600).height(224).url()}
                alt={post.coverImage.alt || post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-brand-navy to-brand-blue flex items-center justify-center">
                <span className="text-white/30 font-heading font-bold text-6xl">F</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
          <div className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColor}`}>
                {categoryLabel}
              </span>
              <time className="text-xs text-gray-500" dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </time>
            </div>
            <h3 className="font-heading font-bold text-brand-navy text-lg leading-snug mb-2 group-hover:text-brand-blue transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
            <div className="mt-4 flex items-center justify-between">
              {post.author?.name && (
                <span className="flex items-center gap-1.5 text-xs text-gray-500">
                  <User size={12} aria-hidden="true" />
                  {post.author.name}
                </span>
              )}
              <span className="inline-flex items-center gap-1 text-brand-blue text-xs font-medium group-hover:gap-2 transition-all">
                Read more <ArrowRight size={12} aria-hidden="true" />
              </span>
            </div>
          </div>
        </article>
      </Link>
    )
  }

  return (
    <Link href={`/news/${post.slug.current}`} className="group block">
      <article className="bg-white rounded-xl border border-gray-100 hover:border-brand-blue/20 hover:shadow-card transition-all duration-300 flex gap-4 p-4">
        <div className="relative w-24 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
          {post.coverImage && (
            <Image
              src={urlFor(post.coverImage).width(96).height(80).url()}
              alt={post.coverImage.alt || post.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColor}`}>
              {categoryLabel}
            </span>
          </div>
          <h3 className="font-semibold text-brand-navy text-sm leading-snug mb-1 group-hover:text-brand-blue transition-colors line-clamp-2">
            {post.title}
          </h3>
          <time className="text-xs text-gray-400" dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </time>
        </div>
      </article>
    </Link>
  )
}
