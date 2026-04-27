import type { Metadata } from 'next'
import { Flame, Clock, Users, ArrowRight, Calendar, Mail, FileText, HandshakeIcon } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import ActionModule from '@/components/ui/ActionModule'
import Button from '@/components/ui/Button'
import { sanityFetch } from '@/lib/sanity'
import { allActionsQuery } from '@/lib/queries'
import type { ActionItem } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Take Action',
  description: 'Turn your faith into action. Find petitions, events, letter campaigns, and more ways to advocate for justice through the Faith in Action Global Hub.',
}

const defaultActions: ActionItem[] = [
  { _id: '1', _type: 'actionItem', title: 'Sign: Protect Religious Minorities in Conflict Zones', slug: { current: 'protect-religious-minorities' }, type: 'petition', urgency: 'urgent', summary: 'Call on the UN Security Council to strengthen protections for religious minorities in active conflict zones across Africa and the Middle East.', ctaLabel: 'Sign the Petition', ctaUrl: '#', goal: 50000, progress: 38240, featured: true },
  { _id: '2', _type: 'actionItem', title: 'Write to Your Representative: Climate Justice Now', slug: { current: 'climate-justice-letter' }, type: 'letter', urgency: 'high', summary: 'Use our template to send a personalized letter to your national representative demanding stronger climate commitments rooted in creation care principles.', ctaLabel: 'Send a Letter', ctaUrl: '#', featured: true },
  { _id: '3', _type: 'actionItem', title: 'Global Day of Prayer & Action — June 2024', slug: { current: 'global-day-prayer-action' }, type: 'event', urgency: 'medium', summary: 'Join millions of faith advocates worldwide for a synchronized day of prayer, fasting, and public advocacy for global justice.', ctaLabel: 'Register Now', ctaUrl: '#', deadline: '2024-06-15', featured: false },
  { _id: '4', _type: 'actionItem', title: 'Donate: Emergency Fund for Displaced Communities', slug: { current: 'emergency-fund' }, type: 'donation', urgency: 'urgent', summary: 'Support emergency assistance for faith communities displaced by conflict and climate disasters in East Africa and the Middle East.', ctaLabel: 'Donate Now', ctaUrl: '#', goal: 250000, progress: 175000, featured: false },
  { _id: '5', _type: 'actionItem', title: 'Volunteer: Policy Research & Advocacy Team', slug: { current: 'volunteer-policy' }, type: 'volunteer', urgency: 'ongoing', summary: 'Help us research policy issues, draft advocacy materials, and support our global network. Remote opportunities available.', ctaLabel: 'Apply to Volunteer', ctaUrl: '#', featured: false },
  { _id: '6', _type: 'actionItem', title: '40 Days of Prayer for Child Protection', slug: { current: 'prayer-child-protection' }, type: 'prayer', urgency: 'ongoing', summary: 'Join a global prayer movement lifting up children exploited through trafficking, forced labor, and abuse — and the policy changes needed to protect them.', ctaLabel: 'Join the Prayer', ctaUrl: '#', featured: false },
]

const actionTypeIcons = {
  petition: FileText,
  event: Calendar,
  letter: Mail,
  donation: HandshakeIcon,
  volunteer: Users,
  prayer: Flame,
  awareness: ArrowRight,
}

const actionTypeColors: Record<string, string> = {
  petition: 'bg-brand-blue-50 text-brand-blue border-brand-blue/20',
  event: 'bg-purple-50 text-purple-700 border-purple-200',
  letter: 'bg-green-50 text-green-700 border-green-200',
  donation: 'bg-orange-50 text-brand-orange border-orange-200',
  volunteer: 'bg-teal-50 text-teal-700 border-teal-200',
  prayer: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  awareness: 'bg-gray-50 text-gray-700 border-gray-200',
}

export default async function TakeActionPage() {
  let actions: ActionItem[] = []
  try {
    actions = await sanityFetch<ActionItem[]>({ query: allActionsQuery, tags: ['actionItem'] })
  } catch {}

  const displayActions = actions.length > 0 ? actions : defaultActions
  const urgent = displayActions.filter(a => a.urgency === 'urgent')
  const rest = displayActions.filter(a => a.urgency !== 'urgent')

  return (
    <>
      {/* Hero */}
      <section className="page-hero" aria-labelledby="action-hero-heading">
        <div className="container-site relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/30 rounded-full px-4 py-2 text-brand-orange-light text-sm font-semibold mb-6">
            <Flame size={14} aria-hidden="true" />
            Your faith. Your voice. Real change.
          </div>
          <h1 id="action-hero-heading" className="font-heading font-bold text-white text-5xl md:text-6xl mb-5">
            Take Action
          </h1>
          <p className="text-blue-100 text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            Choose from petitions, events, letter campaigns, prayer initiatives, and more. Every action counts.
          </p>
          <div className="flex items-center justify-center gap-6 text-white/70 text-sm">
            {[{ value: '12', label: 'Active Campaigns' }, { value: '38K+', label: 'Actions This Month' }, { value: '50+', label: 'Nations Participating' }].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="font-heading font-bold text-white text-2xl">{value}</p>
                <p className="text-xs">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgent Actions */}
      {urgent.length > 0 && (
        <section className="py-12 bg-red-50 border-b border-red-100" aria-labelledby="urgent-heading">
          <div className="container-site">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1.5 rounded-full text-sm font-semibold">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" aria-hidden="true" />
                Urgent — Act Now
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {urgent.map((action) => (
                <ActionModule key={action._id} action={action} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Actions */}
      <section className="section-padding bg-white" aria-labelledby="all-actions-heading">
        <div className="container-site">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <SectionHeader eyebrow="All Campaigns" title="Ways to Make a Difference" />
            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter actions by type">
              {['All', 'Petition', 'Event', 'Letter', 'Donate', 'Volunteer', 'Prayer'].map((filter) => (
                <button
                  key={filter}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${filter === 'All' ? 'bg-brand-navy text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  aria-pressed={filter === 'All'}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((action) => (
              <ActionModule key={action._id} action={action} />
            ))}
          </div>
        </div>
      </section>

      {/* How to get involved */}
      <section className="section-padding bg-gray-50" aria-labelledby="involvement-heading">
        <div className="container-site">
          <SectionHeader
            eyebrow="Get Involved"
            title="More Ways to Engage"
            centered
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: 'Join a Local Chapter',
                description: 'Connect with faith advocates in your city or region to organize locally and multiply your impact.',
                cta: 'Find a Chapter',
                href: '/global-network',
                color: 'text-brand-blue',
                bg: 'bg-brand-blue-50',
              },
              {
                icon: Flame,
                title: 'Start a Campaign',
                description: 'Have a passion for a specific issue? We\'ll help you launch a faith-based advocacy campaign.',
                cta: 'Start a Campaign',
                href: '/contact',
                color: 'text-brand-orange',
                bg: 'bg-orange-50',
              },
              {
                icon: HandshakeIcon,
                title: 'Become a Partner',
                description: 'Organizations and churches can formally partner with the Faith in Action Global Hub network.',
                cta: 'Become a Partner',
                href: '/contact',
                color: 'text-green-700',
                bg: 'bg-green-50',
              },
            ].map(({ icon: Icon, title, description, cta, href, color, bg }) => (
              <div key={title} className="bg-white rounded-2xl p-6 shadow-card text-center">
                <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center mx-auto mb-4`}>
                  <Icon size={28} className={color} aria-hidden="true" />
                </div>
                <h3 className="font-heading font-bold text-brand-navy text-lg mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">{description}</p>
                <Button href={href} variant="outline" size="sm">
                  {cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
