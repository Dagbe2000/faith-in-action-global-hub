import type { Metadata } from 'next'
import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Search, Filter } from 'lucide-react'
import { Shield, Heart, Leaf, Globe, BookOpen, Users, Droplets, Scale, Home, Baby } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'
import { sanityFetch, urlFor } from '@/lib/sanity'
import { policyIssuesQuery } from '@/lib/queries'
import type { PolicyIssue } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Policy Hub',
  description: 'Explore the critical policy issues where faith communities are making a transformative difference. From religious freedom to climate justice.',
}

const defaultIssues = [
  { _id: '1', title: 'Religious Freedom & Persecution', slug: { current: 'religious-freedom' }, icon: Shield, color: 'purple', summary: 'Protecting the universal right to believe, practice, and change one\'s faith without state or social persecution.', keyFacts: [{ stat: '5.1B', label: 'People in restricted countries' }, { stat: '80%', label: 'World covered by restrictions' }] },
  { _id: '2', title: 'Poverty & Economic Justice', slug: { current: 'poverty-justice' }, icon: Heart, color: 'blue', summary: 'Addressing systemic inequality through faith-rooted advocacy for living wages, fair trade, and access to basic services.', keyFacts: [{ stat: '700M', label: 'In extreme poverty' }, { stat: '$2.15', label: 'Daily income threshold' }] },
  { _id: '3', title: 'Climate & Creation Care', slug: { current: 'climate-creation' }, icon: Leaf, color: 'green', summary: 'Stewardship of God\'s creation through advocacy for climate justice, renewable energy, and sustainable development.', keyFacts: [{ stat: '1.5°C', label: 'Critical warming limit' }, { stat: '3.3B', label: 'Highly vulnerable people' }] },
  { _id: '4', title: 'Peacebuilding & Reconciliation', slug: { current: 'peacebuilding' }, icon: Globe, color: 'orange', summary: 'Faith-led approaches to ending conflict, healing ethnic and religious divisions, and building durable peace.', keyFacts: [{ stat: '56', label: 'Active conflicts globally' }, { stat: '110M', label: 'Forcibly displaced' }] },
  { _id: '5', title: 'Education Access & Quality', slug: { current: 'education' }, icon: BookOpen, color: 'teal', summary: 'Ensuring every child, especially girls and children in conflict zones, has access to safe, quality education.', keyFacts: [{ stat: '244M', label: 'Out-of-school children' }, { stat: '60%', label: 'Learning poverty rate in LMICs' }] },
  { _id: '6', title: 'Health & Human Dignity', slug: { current: 'health-dignity' }, icon: Users, color: 'red', summary: 'Championing universal health coverage, mental health access, and policies that honor the dignity of every person.', keyFacts: [{ stat: '4.5B', label: 'Lack full health coverage' }, { stat: '40%', label: 'Cannot afford essential medicines' }] },
  { _id: '7', title: 'Gender Justice & Women\'s Rights', slug: { current: 'gender-justice' }, icon: Scale, color: 'pink', summary: 'Advancing gender equity, ending violence against women, and ensuring women\'s full participation in public life.', keyFacts: [{ stat: '1 in 3', label: 'Women experience violence' }, { stat: '131', label: 'Countries have gender gaps in law' }] },
  { _id: '8', title: 'Child Protection & Rights', slug: { current: 'child-protection' }, icon: Baby, color: 'yellow', summary: 'Protecting children from exploitation, trafficking, and abuse while ensuring access to nurturing environments.', keyFacts: [{ stat: '160M', label: 'Child laborers worldwide' }, { stat: '1.2M', label: 'Children trafficked annually' }] },
]

const colorMap: Record<string, { border: string; bg: string; text: string; badge: string }> = {
  blue: { border: 'border-brand-blue/20', bg: 'hover:bg-brand-blue-50', text: 'text-brand-blue', badge: 'bg-brand-blue-100 text-brand-blue' },
  orange: { border: 'border-orange-200', bg: 'hover:bg-orange-50', text: 'text-brand-orange', badge: 'bg-orange-100 text-brand-orange' },
  green: { border: 'border-green-200', bg: 'hover:bg-green-50', text: 'text-green-700', badge: 'bg-green-100 text-green-700' },
  purple: { border: 'border-purple-200', bg: 'hover:bg-purple-50', text: 'text-purple-700', badge: 'bg-purple-100 text-purple-700' },
  red: { border: 'border-red-200', bg: 'hover:bg-red-50', text: 'text-red-700', badge: 'bg-red-100 text-red-700' },
  teal: { border: 'border-teal-200', bg: 'hover:bg-teal-50', text: 'text-teal-700', badge: 'bg-teal-100 text-teal-700' },
  pink: { border: 'border-pink-200', bg: 'hover:bg-pink-50', text: 'text-pink-700', badge: 'bg-pink-100 text-pink-700' },
  yellow: { border: 'border-yellow-200', bg: 'hover:bg-yellow-50', text: 'text-yellow-700', badge: 'bg-yellow-100 text-yellow-700' },
}

export default async function PolicyHubPage() {
  let issues: PolicyIssue[] = []
  try {
    issues = await sanityFetch<PolicyIssue[]>({ query: policyIssuesQuery, tags: ['policyIssue'] })
  } catch {}

  const displayIssues = issues.length > 0 ? issues : defaultIssues

  return (
    <>
      {/* Hero */}
      <section className="page-hero" aria-labelledby="policy-hero-heading">
        <div className="container-site text-center relative z-10">
          <p className="text-brand-blue-light font-semibold uppercase tracking-widest text-sm mb-4">Policy Hub</p>
          <h1 id="policy-hero-heading" className="font-heading font-bold text-white text-5xl md:text-6xl mb-5">
            The Issues We Champion
          </h1>
          <p className="text-blue-100 text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
            Explore the policy areas where faith communities are making the most impact — and discover how you can add your voice.
          </p>
        </div>
      </section>

      {/* Search/Filter Bar */}
      <div className="bg-white border-b border-gray-100 sticky top-16 lg:top-20 z-30">
        <div className="container-site py-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
              <input
                type="search"
                placeholder="Search issues..."
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                aria-label="Search policy issues"
              />
            </div>
            <p className="text-sm text-gray-500 hidden sm:block">
              {displayIssues.length} policy areas
            </p>
          </div>
        </div>
      </div>

      {/* Issues Grid */}
      <section className="section-padding bg-white" aria-labelledby="issues-list-heading">
        <div className="container-site">
          <h2 id="issues-list-heading" className="sr-only">Policy Issues</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayIssues.map((issue) => {
              const color = colorMap[('color' in issue ? issue.color : undefined) || 'blue']
              const IssueIcon = ('icon' in issue ? issue.icon : Globe) as LucideIcon
              const href = `policy-hub/${'slug' in issue ? issue.slug.current : '#'}`
              const keyFacts = 'keyFacts' in issue ? issue.keyFacts : undefined

              return (
                <Link key={issue._id} href={`/${href}`} className="group">
                  <article className={`h-full bg-white border ${color.border} rounded-2xl p-6 shadow-card hover:shadow-card-hover ${color.bg} transition-all duration-300 hover:-translate-y-1 flex flex-col`}>
                    <div className={`w-12 h-12 rounded-xl ${color.badge} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <IssueIcon size={24} aria-hidden="true" />
                    </div>
                    <h3 className={`font-heading font-bold text-xl ${color.text} mb-2`}>
                      {issue.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed flex-1">
                      {issue.summary}
                    </p>
                    {keyFacts && keyFacts.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-3">
                        {keyFacts.slice(0, 2).map(({ stat, label }) => (
                          <div key={label}>
                            <p className={`font-heading font-bold text-xl ${color.text}`}>{stat}</p>
                            <p className="text-gray-500 text-xs">{label}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className={`mt-4 flex items-center gap-1.5 ${color.text} text-sm font-semibold group-hover:gap-3 transition-all`}>
                      Explore Issue <ArrowRight size={16} aria-hidden="true" />
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-blue-50 border-t border-brand-blue/10" aria-label="Policy hub call to action">
        <div className="container-site text-center">
          <h2 className="font-heading font-bold text-brand-navy text-3xl mb-4">
            Don't see your issue?
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Our network is growing. Get in touch to discuss how faith communities are engaging your priority issue.
          </p>
          <Button href="/contact" variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
            Contact Our Policy Team
          </Button>
        </div>
      </section>
    </>
  )
}
