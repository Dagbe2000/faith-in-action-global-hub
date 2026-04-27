import Link from 'next/link'
import Image from 'next/image'
import type { LucideIcon } from 'lucide-react'
import { ArrowRight, Shield, Heart, Globe, Leaf, BookOpen, Users, Droplets, Scale } from 'lucide-react'
import type { PolicyIssue } from '@/lib/types'
import { urlFor } from '@/lib/sanity'
import SectionHeader from '@/components/ui/SectionHeader'

const defaultIssues = [
  { id: '1', title: 'Religious Freedom', summary: 'Protecting the universal right to believe, practice, and change one\'s faith without persecution or discrimination.', color: 'purple', icon: Shield, href: '/policy-hub' },
  { id: '2', title: 'Poverty & Economic Justice', summary: 'Addressing systemic inequality and championing policies that lift communities out of poverty.', color: 'blue', icon: Heart, href: '/policy-hub' },
  { id: '3', title: 'Climate & Creation Care', summary: 'Faithful stewardship of the environment through advocacy for sustainable policies and practices.', color: 'green', icon: Leaf, href: '/policy-hub' },
  { id: '4', title: 'Peacebuilding & Reconciliation', summary: 'Faith-led approaches to resolving conflict, healing divisions, and building lasting peace.', color: 'orange', icon: Globe, href: '/policy-hub' },
  { id: '5', title: 'Education & Access', summary: 'Ensuring quality education for all children, especially in underserved and conflict-affected communities.', color: 'teal', icon: BookOpen, href: '/policy-hub' },
  { id: '6', title: 'Health & Human Dignity', summary: 'Championing holistic health policies rooted in the inherent worth and dignity of every person.', color: 'red', icon: Users, href: '/policy-hub' },
]

const colorMap: Record<string, { bg: string; text: string; border: string; badge: string }> = {
  blue: { bg: 'from-brand-blue-50 to-blue-50', text: 'text-brand-blue', border: 'border-brand-blue/20', badge: 'bg-brand-blue-100 text-brand-blue' },
  orange: { bg: 'from-orange-50 to-brand-orange-50', text: 'text-brand-orange', border: 'border-brand-orange/20', badge: 'bg-orange-100 text-brand-orange' },
  green: { bg: 'from-green-50 to-emerald-50', text: 'text-green-700', border: 'border-green-200', badge: 'bg-green-100 text-green-700' },
  purple: { bg: 'from-purple-50 to-violet-50', text: 'text-purple-700', border: 'border-purple-200', badge: 'bg-purple-100 text-purple-700' },
  red: { bg: 'from-rose-50 to-red-50', text: 'text-red-700', border: 'border-red-200', badge: 'bg-red-100 text-red-700' },
  teal: { bg: 'from-teal-50 to-cyan-50', text: 'text-teal-700', border: 'border-teal-200', badge: 'bg-teal-100 text-teal-700' },
}

interface IssueSelectorProps {
  issues: PolicyIssue[]
}

export default function IssueSelector({ issues }: IssueSelectorProps) {
  const displayIssues = issues.length > 0 ? issues : defaultIssues

  return (
    <section className="py-20 lg:py-28 bg-white" aria-labelledby="issues-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <SectionHeader
            eyebrow="Policy Hub"
            title="The Issues We Champion"
            description="Explore the critical policy areas where faith communities are making a difference globally."
          />
          <Link
            href="/policy-hub"
            className="flex items-center gap-2 text-brand-blue font-semibold hover:gap-3 transition-all whitespace-nowrap lg:mb-2"
          >
            View all issues <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayIssues.slice(0, 6).map((issue) => {
            const color = colorMap[('color' in issue ? issue.color : undefined) || 'blue']
            const issueHref = 'slug' in issue && issue.slug ? `/policy-hub/${issue.slug.current}` : ('href' in issue ? issue.href : '/policy-hub')
            const IssueIcon = ('icon' in issue ? issue.icon : Globe) as LucideIcon

            return (
              <Link
                key={('_id' in issue ? issue._id : ('id' in issue ? (issue as { id: string }).id : String(Math.random())))}
                href={issueHref as string}
                className={`group relative bg-gradient-to-br ${color.bg} border ${color.border} rounded-2xl p-6 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1`}
                aria-label={`Explore issue: ${issue.title}`}
              >
                {/* Cover image overlay if available */}
                {'coverImage' in issue && issue.coverImage && (
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <Image
                      src={urlFor(issue.coverImage).width(400).height(300).url()}
                      alt=""
                      fill
                      className="object-cover opacity-5 group-hover:opacity-10 transition-opacity"
                      aria-hidden="true"
                    />
                  </div>
                )}

                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl ${color.badge} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <IssueIcon size={24} aria-hidden="true" />
                  </div>

                  <h3 className={`font-heading font-bold text-lg ${color.text} mb-2 group-hover:text-opacity-90`}>
                    {issue.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {issue.summary}
                  </p>

                  <div className={`mt-5 flex items-center gap-1.5 ${color.text} text-sm font-semibold group-hover:gap-2.5 transition-all`}>
                    Explore
                    <ArrowRight size={16} aria-hidden="true" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
