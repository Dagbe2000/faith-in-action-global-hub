import type { Metadata } from 'next'
import { FileText, Video, Headphones, BookOpen, Download, Filter, Search } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import ResourceCard from '@/components/ui/ResourceCard'
import Button from '@/components/ui/Button'
import { sanityFetch } from '@/lib/sanity'
import { allResourcesQuery } from '@/lib/queries'
import type { Resource } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Resource Library',
  description: 'Access guides, reports, toolkits, policy briefs, videos, and curriculum for faith-based advocacy. Available in multiple languages.',
}

const sampleResources: Resource[] = [
  { _id: '1', _type: 'resource', title: 'Faith & Policy Advocacy Starter Kit', slug: { current: 'advocacy-starter-kit' }, type: 'toolkit', summary: 'Everything you need to begin engaging your congregation in meaningful policy advocacy. Includes templates, scripts, and step-by-step guidance.', language: 'en', featured: true, tags: ['advocacy', 'beginners'], publishedAt: '2024-01-15' },
  { _id: '2', _type: 'resource', title: 'Religious Freedom Index 2024', slug: { current: 'religious-freedom-index-2024' }, type: 'report', summary: 'Annual assessment of religious freedom conditions across 196 countries, with special focus on Sub-Saharan Africa and the Middle East.', language: 'en', featured: true, tags: ['religious freedom', 'data'], publishedAt: '2024-03-01' },
  { _id: '3', _type: 'resource', title: 'Creation Care Theological Foundations', slug: { current: 'creation-care-theology' }, type: 'guide', summary: 'A cross-traditional theological resource exploring how different faith traditions ground environmental stewardship in scripture and tradition.', language: 'en', featured: true, tags: ['climate', 'theology'], publishedAt: '2023-11-20' },
  { _id: '4', _type: 'resource', title: 'Advocacy Training Video Series', slug: { current: 'advocacy-training-videos' }, type: 'video', summary: '12-part video series covering policy research, coalition building, media engagement, and legislative advocacy for faith communities.', language: 'en', featured: false, tags: ['training', 'video'], publishedAt: '2024-02-10' },
  { _id: '5', _type: 'resource', title: 'Guide de Plaidoyer pour les Communautés de Foi', slug: { current: 'guide-plaidoyer-foi-fr' }, type: 'guide', summary: 'Version française du guide de plaidoyer pour les communautés religieuses francophones d\'Afrique de l\'Ouest et Centrale.', language: 'fr', featured: false, tags: ['advocacy', 'french'], publishedAt: '2024-01-30' },
  { _id: '6', _type: 'resource', title: 'Poverty & Faith: A Policy Brief', slug: { current: 'poverty-faith-policy-brief' }, type: 'policy-brief', summary: 'Examination of how faith-inspired policy frameworks can address root causes of poverty more effectively than secular approaches alone.', language: 'en', featured: false, tags: ['poverty', 'policy'], publishedAt: '2023-12-15' },
  { _id: '7', _type: 'resource', title: 'Interfaith Peacebuilding Curriculum', slug: { current: 'interfaith-peacebuilding' }, type: 'curriculum', summary: '8-week curriculum for faith communities engaging in post-conflict peacebuilding and inter-religious reconciliation work.', language: 'en', featured: false, tags: ['peace', 'curriculum'], publishedAt: '2023-10-05' },
  { _id: '8', _type: 'resource', title: 'Faith Leaders Podcast: Justice & Policy', slug: { current: 'faith-leaders-podcast' }, type: 'podcast', summary: 'Weekly conversations with faith leaders, policymakers, and activists navigating the intersection of faith and public life.', language: 'en', featured: false, tags: ['podcast', 'interviews'], publishedAt: '2024-04-01' },
  { _id: '9', _type: 'resource', title: '40 Days of Prayer for Justice Guide', slug: { current: 'prayer-justice-guide' }, type: 'prayer-guide', summary: 'A daily prayer and action guide for faith communities committing to 40 days of focused intercession and advocacy for justice.', language: 'en', featured: false, tags: ['prayer', 'spiritual'], publishedAt: '2024-03-10' },
]

const resourceTypes = [
  { id: 'all', label: 'All Types', icon: null },
  { id: 'guide', label: 'Guides', icon: BookOpen },
  { id: 'report', label: 'Reports', icon: FileText },
  { id: 'toolkit', label: 'Toolkits', icon: Download },
  { id: 'video', label: 'Videos', icon: Video },
  { id: 'podcast', label: 'Podcasts', icon: Headphones },
  { id: 'policy-brief', label: 'Policy Briefs', icon: FileText },
  { id: 'curriculum', label: 'Curriculum', icon: BookOpen },
  { id: 'prayer-guide', label: 'Prayer Guides', icon: BookOpen },
]

export default async function ResourcesPage() {
  let resources: Resource[] = []
  try {
    resources = await sanityFetch<Resource[]>({ query: allResourcesQuery, tags: ['resource'] })
  } catch {}
  const displayResources = resources.length > 0 ? resources : sampleResources

  return (
    <>
      {/* Hero */}
      <section className="page-hero" aria-labelledby="resources-hero-heading">
        <div className="container-site relative z-10 text-center">
          <p className="text-brand-blue-light font-semibold uppercase tracking-widest text-sm mb-4">Resource Library</p>
          <h1 id="resources-hero-heading" className="font-heading font-bold text-white text-5xl md:text-6xl mb-5">
            Tools for Faithful Advocates
          </h1>
          <p className="text-blue-100 text-xl max-w-2xl mx-auto mb-6 leading-relaxed">
            Guides, reports, toolkits, videos, and curriculum — everything you need to effectively advocate at the intersection of faith and policy.
          </p>
          <div className="flex items-center justify-center gap-6 text-blue-200 text-sm">
            <span>{displayResources.length}+ Resources</span>
            <span aria-hidden="true">·</span>
            <span>6 Languages</span>
            <span aria-hidden="true">·</span>
            <span>Free Access</span>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <div className="bg-white border-b border-gray-100 sticky top-16 lg:top-20 z-30">
        <div className="container-site py-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
              <input
                type="search"
                placeholder="Search resources..."
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                aria-label="Search resources"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0" role="group" aria-label="Filter by resource type">
              {resourceTypes.map(({ id, label }) => (
                <button
                  key={id}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${id === 'all' ? 'bg-brand-navy text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  aria-pressed={id === 'all'}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <section className="section-padding bg-white" aria-labelledby="resources-grid-heading">
        <div className="container-site">
          <h2 id="resources-grid-heading" className="sr-only">All Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayResources.map((resource) => (
              <ResourceCard key={resource._id} resource={resource} />
            ))}
          </div>

          {displayResources.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              <BookOpen size={48} className="mx-auto mb-4 opacity-30" aria-hidden="true" />
              <p>No resources found. Check back soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* Submit / Suggest Resource CTA */}
      <section className="py-16 bg-brand-blue-50 border-t border-brand-blue/10" aria-label="Submit a resource">
        <div className="container-site text-center">
          <h2 className="font-heading font-bold text-brand-navy text-2xl mb-3">
            Have a resource to share?
          </h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            We welcome high-quality resources from partner organizations across our global network.
          </p>
          <Button href="/contact" variant="primary" size="md">
            Submit a Resource
          </Button>
        </div>
      </section>
    </>
  )
}
