import type { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import IssueSelector from '@/components/home/IssueSelector'
import StatsSection from '@/components/home/StatsSection'
import AfricaSpotlight from '@/components/home/AfricaSpotlight'
import BlogFeed from '@/components/home/BlogFeed'
import Button from '@/components/ui/Button'
import { ArrowRight, Flame } from 'lucide-react'
import { sanityFetch } from '@/lib/sanity'
import {
  featuredPolicyIssuesQuery,
  featuredActionsQuery,
  africaSpotlightStoriesQuery,
  recentPostsQuery,
} from '@/lib/queries'
import type { PolicyIssue, ActionItem, Story, Post } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Faith in Action Global Hub — Where Faith Meets Policy Change',
}

export default async function HomePage() {
  const [issues, actions, africaStories, recentPosts] = await Promise.allSettled([
    sanityFetch<PolicyIssue[]>({ query: featuredPolicyIssuesQuery, tags: ['policyIssue'] }),
    sanityFetch<ActionItem[]>({ query: featuredActionsQuery, tags: ['actionItem'] }),
    sanityFetch<Story[]>({ query: africaSpotlightStoriesQuery, tags: ['story'] }),
    sanityFetch<Post[]>({ query: recentPostsQuery, params: { limit: 6 }, tags: ['post'] }),
  ])

  const issuesData = issues.status === 'fulfilled' ? issues.value : []
  const actionsData = actions.status === 'fulfilled' ? actions.value : []
  const africaStoriesData = africaStories.status === 'fulfilled' ? africaStories.value : []
  const postsData = recentPosts.status === 'fulfilled' ? recentPosts.value : []

  return (
    <>
      {/* Hero */}
      <Hero issues={issuesData} />

      {/* Issue Selector */}
      <IssueSelector issues={issuesData} />

      {/* Stats Banner */}
      <StatsSection />

      {/* Featured Action */}
      {actionsData.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-brand-orange to-brand-orange-dark" aria-label="Featured action call to action">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Flame size={24} className="text-white" aria-hidden="true" />
              <span className="text-orange-100 font-semibold uppercase tracking-wider text-sm">
                {actionsData[0].urgency === 'urgent' ? 'Urgent Action Needed' : 'Take Action Now'}
              </span>
            </div>
            <h2 className="font-heading font-bold text-white text-3xl md:text-4xl mb-4">
              {actionsData[0].title}
            </h2>
            <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
              {actionsData[0].summary}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href={actionsData[0].ctaUrl || '/take-action'}
                variant="white"
                size="xl"
                icon={ArrowRight}
                iconPosition="right"
                external={!!actionsData[0].ctaUrl}
              >
                {actionsData[0].ctaLabel || 'Take Action Now'}
              </Button>
              <Button href="/take-action" variant="outline" size="xl" className="border-white/40 text-white hover:bg-white/10">
                View All Actions
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Africa Spotlight */}
      <AfricaSpotlight stories={africaStoriesData} />

      {/* Blog Feed */}
      <BlogFeed posts={postsData} />

      {/* Newsletter / Join CTA */}
      <section className="py-20 bg-white" aria-labelledby="join-cta-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-brand-orange font-semibold uppercase tracking-widest text-sm mb-4">
            Join the Movement
          </p>
          <h2 id="join-cta-heading" className="font-heading font-bold text-brand-navy text-4xl md:text-5xl mb-5">
            Ready to turn your faith into action?
          </h2>
          <p className="text-gray-600 text-xl mb-10 max-w-2xl mx-auto">
            Connect with 200,000+ advocates who are transforming policy through the power of faith. Choose your issue. Build your network. Make change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button href="/take-action" variant="primary" size="xl" icon={ArrowRight} iconPosition="right">
              Start Taking Action
            </Button>
            <Button href="/about" variant="outline" size="xl">
              Learn Our Story
            </Button>
          </div>
          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-gray-100">
            {['Non-partisan', 'Interfaith', 'Global Network', 'Impact-Driven', 'Transparent'].map((badge) => (
              <span key={badge} className="flex items-center gap-2 text-sm text-gray-500">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" aria-hidden="true" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
