import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { ArrowLeft, Calendar, User, Tag, Share2 } from 'lucide-react'
import { sanityFetch, urlFor } from '@/lib/sanity'
import { postBySlugQuery, allPostsQuery } from '@/lib/queries'
import type { Post } from '@/lib/types'
import Button from '@/components/ui/Button'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = await sanityFetch<Post>({
      query: postBySlugQuery,
      params: { slug: params.slug },
      tags: ['post'],
    })
    if (!post) return { title: 'Article' }
    return {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.publishedAt,
        images: post.coverImage ? [{ url: urlFor(post.coverImage).width(1200).height(630).url() }] : [],
      },
    }
  } catch {
    return { title: 'Article' }
  }
}

export async function generateStaticParams() {
  try {
    const posts = await sanityFetch<Post[]>({ query: allPostsQuery, tags: ['post'] })
    return posts.map((p) => ({ slug: p.slug.current }))
  } catch {
    return []
  }
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

const portableComponents = {
  block: {
    h2: ({ children }: any) => <h2 className="font-heading text-2xl font-bold text-brand-navy mt-10 mb-4">{children}</h2>,
    h3: ({ children }: any) => <h3 className="font-heading text-xl font-semibold text-brand-navy mt-8 mb-3">{children}</h3>,
    normal: ({ children }: any) => <p className="text-gray-700 leading-relaxed mb-5 text-lg">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-brand-orange bg-orange-50 px-6 py-4 my-8 rounded-r-xl italic text-gray-700 text-xl">{children}</blockquote>
    ),
  },
  types: {
    image: ({ value }: any) => (
      <figure className="my-8">
        <Image
          src={urlFor(value).width(800).height(450).url()}
          alt={value.alt || ''}
          width={800}
          height={450}
          className="rounded-2xl w-full"
        />
        {value.caption && <figcaption className="text-center text-gray-500 text-sm mt-2">{value.caption}</figcaption>}
      </figure>
    ),
  },
}

export default async function PostPage({ params }: Props) {
  let post: Post | null = null
  try {
    post = await sanityFetch<Post>({
      query: postBySlugQuery,
      params: { slug: params.slug },
      tags: ['post'],
    })
  } catch {}

  if (!post) notFound()

  return (
    <>
      {/* Breadcrumb */}
      <nav className="bg-white border-b border-gray-100" aria-label="Breadcrumb">
        <div className="container-site py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-brand-blue transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/news" className="hover:text-brand-blue transition-colors">News</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-brand-navy font-medium truncate max-w-xs" aria-current="page">{post.title}</li>
          </ol>
        </div>
      </nav>

      {/* Article Hero */}
      <header className="bg-white pt-10 pb-6">
        <div className="container-site max-w-4xl">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-brand-blue-100 text-brand-blue">
              {categoryLabels[post.category] || post.category}
            </span>
            {post.relatedIssue && (
              <Link
                href={`/policy-hub/${post.relatedIssue.slug.current}`}
                className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-brand-orange hover:bg-orange-200 transition-colors"
              >
                {post.relatedIssue.title}
              </Link>
            )}
          </div>
          <h1 className="font-heading font-bold text-brand-navy text-4xl md:text-5xl leading-tight mb-5">
            {post.title}
          </h1>
          <p className="text-gray-600 text-xl leading-relaxed mb-6">{post.excerpt}</p>
          <div className="flex items-center gap-4 flex-wrap">
            {post.author?.name && (
              <div className="flex items-center gap-2">
                {post.author.photo && (
                  <Image
                    src={urlFor(post.author.photo).width(32).height(32).url()}
                    alt={post.author.photo.alt || post.author.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
                <div>
                  <p className="font-semibold text-brand-navy text-sm">{post.author.name}</p>
                  {post.author.role && <p className="text-gray-500 text-xs">{post.author.role}</p>}
                </div>
              </div>
            )}
            <time className="flex items-center gap-1.5 text-sm text-gray-500" dateTime={post.publishedAt}>
              <Calendar size={14} aria-hidden="true" />
              {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </time>
            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap">
                <Tag size={12} className="text-gray-400" aria-hidden="true" />
                {post.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="container-site max-w-4xl mb-0 pb-8">
          <Image
            src={urlFor(post.coverImage).width(1200).height(600).url()}
            alt={post.coverImage.alt || post.title}
            width={1200}
            height={600}
            className="rounded-2xl w-full object-cover"
            priority
          />
        </div>
      )}

      {/* Article Content */}
      <article className="container-site max-w-4xl pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3">
            {post.body ? (
              <PortableText value={post.body} components={portableComponents} />
            ) : (
              <p className="text-gray-700 text-lg leading-relaxed">
                Full article content will appear here. Add content via the Sanity Studio CMS.
              </p>
            )}
          </div>
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-6">
              <div className="bg-brand-blue-50 rounded-2xl p-5">
                <h3 className="font-heading font-bold text-brand-navy text-base mb-3">Take Action</h3>
                <p className="text-gray-600 text-sm mb-4">Inspired by this story? Join thousands of advocates making a difference.</p>
                <Button href="/take-action" variant="primary" size="sm" fullWidth>
                  Take Action
                </Button>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-5">
                <h3 className="font-heading font-bold text-brand-navy text-base mb-3">Share this story</h3>
                <div className="flex gap-2">
                  {['Twitter', 'Facebook', 'LinkedIn', 'Email'].map((platform) => (
                    <button
                      key={platform}
                      className="flex-1 py-2 bg-gray-100 hover:bg-brand-blue-50 text-gray-600 hover:text-brand-blue rounded-lg text-xs font-medium transition-colors"
                      aria-label={`Share on ${platform}`}
                    >
                      {platform.slice(0, 2)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </article>

      {/* Back */}
      <div className="border-t border-gray-100 py-6">
        <div className="container-site">
          <Button href="/news" variant="ghost" size="md" icon={ArrowLeft} iconPosition="left">
            Back to News & Insights
          </Button>
        </div>
      </div>
    </>
  )
}
