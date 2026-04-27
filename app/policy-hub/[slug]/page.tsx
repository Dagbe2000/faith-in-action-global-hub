import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { ArrowLeft, ArrowRight, BookOpen, ExternalLink } from 'lucide-react'
import { sanityFetch, urlFor } from '@/lib/sanity'
import { policyIssueBySlugQuery, policyIssuesQuery } from '@/lib/queries'
import type { PolicyIssue } from '@/lib/types'
import ActionModule from '@/components/ui/ActionModule'
import ResourceCard from '@/components/ui/ResourceCard'
import Button from '@/components/ui/Button'
import SectionHeader from '@/components/ui/SectionHeader'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const issue = await sanityFetch<PolicyIssue>({
      query: policyIssueBySlugQuery,
      params: { slug: params.slug },
      tags: ['policyIssue'],
    })
    if (!issue) return { title: 'Policy Issue' }
    return {
      title: issue.seo?.metaTitle || issue.title,
      description: issue.seo?.metaDescription || issue.summary,
      openGraph: {
        title: issue.title,
        description: issue.summary,
        images: issue.coverImage ? [{ url: urlFor(issue.coverImage).width(1200).height(630).url() }] : [],
      },
    }
  } catch {
    return { title: 'Policy Issue' }
  }
}

export async function generateStaticParams() {
  try {
    const issues = await sanityFetch<PolicyIssue[]>({ query: policyIssuesQuery, tags: ['policyIssue'] })
    return issues.map((issue) => ({ slug: issue.slug.current }))
  } catch {
    return []
  }
}

const portableComponents = {
  block: {
    h2: ({ children }: any) => <h2 className="font-heading text-2xl font-bold text-brand-navy mt-8 mb-4">{children}</h2>,
    h3: ({ children }: any) => <h3 className="font-heading text-xl font-semibold text-brand-navy mt-6 mb-3">{children}</h3>,
    normal: ({ children }: any) => <p className="text-gray-700 leading-relaxed mb-4">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-brand-orange bg-orange-50 px-5 py-3 my-6 rounded-r-xl italic text-gray-700">{children}</blockquote>
    ),
  },
}

export default async function PolicyIssuePage({ params }: Props) {
  let issue: PolicyIssue | null = null
  try {
    issue = await sanityFetch<PolicyIssue>({
      query: policyIssueBySlugQuery,
      params: { slug: params.slug },
      tags: ['policyIssue'],
    })
  } catch {}

  if (!issue) {
    notFound()
  }

  return (
    <>
      {/* Breadcrumb */}
      <nav className="bg-white border-b border-gray-100" aria-label="Breadcrumb">
        <div className="container-site py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-brand-blue transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/policy-hub" className="hover:text-brand-blue transition-colors">Policy Hub</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-brand-navy font-medium" aria-current="page">{issue.title}</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative bg-hero-gradient overflow-hidden" aria-labelledby="issue-heading">
        {issue.coverImage && (
          <div className="absolute inset-0 opacity-20">
            <Image
              src={urlFor(issue.coverImage).width(1400).height(500).url()}
              alt=""
              fill
              className="object-cover"
              priority
              aria-hidden="true"
            />
          </div>
        )}
        <div className="relative z-10 container-site py-20 md:py-28">
          <Link href="/policy-hub" className="inline-flex items-center gap-2 text-blue-200 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft size={16} aria-hidden="true" /> Back to Policy Hub
          </Link>
          <h1 id="issue-heading" className="font-heading font-bold text-white text-4xl md:text-5xl lg:text-6xl mb-5 max-w-3xl">
            {issue.title}
          </h1>
          <p className="text-blue-100 text-xl max-w-2xl leading-relaxed">
            {issue.summary}
          </p>

          {/* Key Facts */}
          {issue.keyFacts && issue.keyFacts.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-6">
              {issue.keyFacts.map(({ stat, label }) => (
                <div key={label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3 text-center">
                  <p className="font-heading font-bold text-white text-2xl">{stat}</p>
                  <p className="text-blue-200 text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <div className="container-site py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <article className="lg:col-span-2">
            {issue.description && (
              <div className="portable-text">
                <PortableText value={issue.description} components={portableComponents} />
              </div>
            )}
            {!issue.description && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">
                  Faith communities around the world are taking a stand on this critical issue, bringing moral authority, grassroots networks, and theological conviction to the policy arena. Our hub connects advocates, resources, and actions to maximize impact.
                </p>
                <p className="text-gray-600 leading-relaxed mt-4">
                  Through interfaith coalitions, legislative advocacy, and community organizing, the Faith in Action Global Hub network is working to ensure that this issue receives the attention and policy response it deserves. Join thousands of advocates already engaged.
                </p>
              </div>
            )}

            {/* Related Actions */}
            {issue.relatedActions && issue.relatedActions.length > 0 && (
              <section className="mt-12" aria-labelledby="actions-heading">
                <h2 id="actions-heading" className="font-heading font-bold text-brand-navy text-2xl mb-6">
                  Take Action on {issue.title}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {issue.relatedActions.map((action) => (
                    <ActionModule key={action._id} action={action} />
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* Sidebar */}
          <aside aria-label="Issue sidebar">
            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-brand-orange to-brand-orange-dark rounded-2xl p-6 text-white mb-6">
              <h3 className="font-heading font-bold text-xl mb-3">Ready to Act?</h3>
              <p className="text-orange-100 text-sm mb-5">
                Join thousands of faith advocates mobilizing on this issue right now.
              </p>
              <Button href="/take-action" variant="white" size="md" fullWidth icon={ArrowRight} iconPosition="right">
                Take Action
              </Button>
              <Button href="/contact" variant="ghost" size="sm" fullWidth className="mt-2 text-white hover:bg-white/10">
                Connect with Our Team
              </Button>
            </div>

            {/* Related Resources */}
            {issue.relatedResources && issue.relatedResources.length > 0 && (
              <div>
                <h3 className="font-heading font-bold text-brand-navy text-lg mb-4">Related Resources</h3>
                <div className="space-y-4">
                  {issue.relatedResources.slice(0, 3).map((resource) => (
                    <ResourceCard key={resource._id} resource={resource} />
                  ))}
                </div>
                <Link href="/resources" className="mt-4 flex items-center gap-2 text-brand-blue text-sm font-medium hover:gap-3 transition-all">
                  View all resources <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* Back navigation */}
      <div className="border-t border-gray-100 py-6">
        <div className="container-site">
          <Button href="/policy-hub" variant="ghost" size="md" icon={ArrowLeft} iconPosition="left">
            Back to All Policy Issues
          </Button>
        </div>
      </div>
    </>
  )
}
