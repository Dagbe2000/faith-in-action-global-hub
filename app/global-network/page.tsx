import type { Metadata } from 'next'
import { Globe, MapPin, Users, ArrowRight, ExternalLink } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import PartnerCard from '@/components/ui/PartnerCard'
import Button from '@/components/ui/Button'
import { sanityFetch } from '@/lib/sanity'
import { allPartnersQuery } from '@/lib/queries'
import type { Partner } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Global Network',
  description: 'Explore the Faith in Action Global Hub\'s worldwide network of faith organizations, NGOs, and advocacy groups working together across 50+ nations.',
}

const samplePartners: Partner[] = [
  { _id: '1', name: 'Africa Interfaith Council', country: 'Kenya', region: 'east-africa', type: 'faith', description: 'A pan-African coalition of 200+ faith organizations advocating for justice and peace.', website: '#', featured: true, africaSpotlight: true },
  { _id: '2', name: 'West Africa Justice Network', country: 'Ghana', region: 'west-africa', type: 'ngo', description: 'Faith-based NGO network focused on economic justice and governance accountability.', website: '#', featured: true, africaSpotlight: true },
  { _id: '3', name: 'Southern Africa Faith Forum', country: 'South Africa', region: 'southern-africa', type: 'faith', description: 'Ecumenical body addressing poverty, inequality, and social cohesion in Southern Africa.', website: '#', featured: false, africaSpotlight: true },
  { _id: '4', name: 'Evangelical Fellowship of Nigeria', country: 'Nigeria', region: 'west-africa', type: 'faith', description: 'Representing over 60,000 churches engaged in social advocacy and community development.', website: '#', featured: true, africaSpotlight: true },
  { _id: '5', name: 'Islamic Relief Worldwide', country: 'United Kingdom', region: 'europe', type: 'ngo', description: 'Global humanitarian organization working in 40+ countries on emergency relief and advocacy.', website: '#', featured: true, africaSpotlight: false },
  { _id: '6', name: 'World Council of Churches', country: 'Switzerland', region: 'europe', type: 'faith', description: 'Fellowship of 352 churches in 120 countries working together for unity, justice, and peace.', website: '#', featured: false, africaSpotlight: false },
  { _id: '7', name: 'Ethiopia Interfaith Forum', country: 'Ethiopia', region: 'east-africa', type: 'faith', description: 'Bringing together Orthodox, Catholic, Protestant, and Muslim leaders for social advocacy.', website: '#', featured: false, africaSpotlight: true },
  { _id: '8', name: 'Rwanda Reconciliation Initiative', country: 'Rwanda', region: 'east-africa', type: 'ngo', description: 'Faith-led program building on Rwanda\'s reconciliation journey to prevent future atrocities.', website: '#', featured: false, africaSpotlight: true },
]

const regions = [
  { name: 'Sub-Saharan Africa', count: 54, key: 'africa' },
  { name: 'Middle East & North Africa', count: 18, key: 'mena' },
  { name: 'Europe', count: 22, key: 'europe' },
  { name: 'North America', count: 15, key: 'north-america' },
  { name: 'Latin America', count: 12, key: 'latin-america' },
  { name: 'Asia Pacific', count: 8, key: 'asia-pacific' },
]

export default async function GlobalNetworkPage() {
  let partners: Partner[] = []
  try {
    partners = await sanityFetch<Partner[]>({ query: allPartnersQuery, tags: ['partner'] })
  } catch {}
  const displayPartners = partners.length > 0 ? partners : samplePartners

  return (
    <>
      {/* Hero */}
      <section className="page-hero" aria-labelledby="network-hero-heading">
        <div className="container-site relative z-10 text-center">
          <Globe size={40} className="text-brand-blue-light mx-auto mb-4" aria-hidden="true" />
          <h1 id="network-hero-heading" className="font-heading font-bold text-white text-5xl md:text-6xl mb-5">
            Our Global Network
          </h1>
          <p className="text-blue-100 text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            120+ partner organizations. 50+ nations. One shared conviction that faith communities can change the world.
          </p>
          <Button href="/contact" variant="orange" size="lg" icon={ArrowRight} iconPosition="right">
            Become a Partner
          </Button>
        </div>
      </section>

      {/* Regional Stats */}
      <section className="py-12 bg-white border-b border-gray-100" aria-label="Network regional breakdown">
        <div className="container-site">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {regions.map(({ name, count }) => (
              <div key={name} className="text-center p-4 rounded-xl bg-gray-50 hover:bg-brand-blue-50 transition-colors">
                <p className="font-heading font-bold text-brand-navy text-2xl">{count}</p>
                <p className="text-gray-600 text-xs mt-1 leading-snug">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Grid */}
      <section className="section-padding bg-white" aria-labelledby="partners-heading">
        <div className="container-site">
          <SectionHeader
            eyebrow="Our Partners"
            title="Trusted Organizations Worldwide"
            description="Faith organizations, NGOs, and advocacy groups united in the mission of translating faith into justice."
            className="mb-10"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {displayPartners.map((partner) => (
              <PartnerCard key={partner._id} partner={partner} />
            ))}
          </div>
        </div>
      </section>

      {/* Africa Focus */}
      <section className="section-padding bg-gradient-to-br from-brand-navy to-brand-blue-dark text-white" aria-labelledby="africa-network-heading">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader
                eyebrow="Africa Network"
                title="Our Deepest Roots Are in Africa"
                description="With 54 African nations represented, our continent-wide network represents the largest faith-based advocacy coalition in Africa."
                light
              />
              <ul className="mt-8 space-y-3">
                {[
                  '54 African nations with active faith partners',
                  '80+ African organizations in our network',
                  'Representation across all major faith traditions',
                  'Policy engagement at AU, national, and local levels',
                  'Annual Africa Faith Leaders Summit',
                ].map((point) => (
                  <li key={point} className="flex items-center gap-2.5 text-blue-100 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange flex-shrink-0" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button href="/news?region=africa" variant="orange" size="md" icon={ArrowRight} iconPosition="right">
                  Africa Stories & News
                </Button>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="font-heading font-bold text-white text-xl mb-6">Africa at a Glance</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '54', label: 'Nations Represented' },
                  { value: '80+', label: 'Partner Organizations' },
                  { value: '1M+', label: 'Advocates Reached' },
                  { value: '25+', label: 'Policy Victories' },
                ].map(({ value, label }) => (
                  <div key={label} className="bg-white/5 rounded-xl p-4 text-center">
                    <p className="font-heading font-bold text-white text-3xl">{value}</p>
                    <p className="text-blue-200 text-xs mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Partner CTA */}
      <section className="py-16 bg-white border-t border-gray-100" aria-label="Partner with us">
        <div className="container-site max-w-3xl text-center">
          <h2 className="font-heading font-bold text-brand-navy text-3xl mb-4">
            Is your organization ready to join the network?
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            We welcome faith organizations, NGOs, academic institutions, and civic groups that share our commitment to justice-oriented advocacy. Partnership offers training, resources, global visibility, and coalition support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="primary" size="lg">Apply for Partnership</Button>
            <Button href="/about" variant="outline" size="lg">Learn About Our Model</Button>
          </div>
        </div>
      </section>
    </>
  )
}
