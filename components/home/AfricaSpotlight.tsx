import Link from 'next/link'
import Image from 'next/image'
import { MapPin, ArrowRight, Star } from 'lucide-react'
import type { Story, Partner } from '@/lib/types'
import { urlFor } from '@/lib/sanity'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'

const defaultStories = [
  {
    _id: '1',
    title: 'Faith Leaders Unite Against Land Grabbing in Kenya',
    slug: { current: 'kenya-land-rights' },
    country: 'Kenya',
    location: 'Rift Valley, Kenya',
    summary: 'A coalition of Muslim and Christian leaders successfully halted a corporate land seizure affecting 12,000 smallholder farmers by mobilizing faith networks and engaging Parliament.',
    publishedAt: '2024-03-15',
  },
  {
    _id: '2',
    title: 'Nigeria\'s Interfaith Council Drives Historic Healthcare Bill',
    slug: { current: 'nigeria-healthcare' },
    country: 'Nigeria',
    location: 'Abuja, Nigeria',
    summary: 'After two years of advocacy, a faith-led coalition secured universal primary care legislation impacting over 15 million Nigerians in underserved communities.',
    publishedAt: '2024-01-22',
  },
  {
    _id: '3',
    title: 'South Africa: Churches Protect Migrant Dignity',
    slug: { current: 'south-africa-migrants' },
    country: 'South Africa',
    location: 'Cape Town, South Africa',
    summary: 'A network of 200+ congregations in Cape Town created a sanctuary movement, advocating for migrant rights and providing critical legal and pastoral support.',
    publishedAt: '2023-11-08',
  },
]

const africaCountries = [
  { name: 'Nigeria', active: true, x: '42%', y: '52%' },
  { name: 'Kenya', active: true, x: '58%', y: '55%' },
  { name: 'South Africa', active: true, x: '52%', y: '80%' },
  { name: 'Ethiopia', active: true, x: '62%', y: '45%' },
  { name: 'Ghana', active: true, x: '36%', y: '52%' },
  { name: 'Uganda', active: true, x: '58%', y: '52%' },
  { name: 'Tanzania', active: true, x: '60%', y: '60%' },
  { name: 'Rwanda', active: true, x: '57%', y: '57%' },
  { name: 'Congo DRC', active: true, x: '53%', y: '57%' },
  { name: 'Senegal', active: true, x: '28%', y: '44%' },
]

interface AfricaSpotlightProps {
  stories?: Story[]
  partners?: Partner[]
}

export default function AfricaSpotlight({ stories = [], partners = [] }: AfricaSpotlightProps) {
  const displayStories = stories.length > 0 ? stories : defaultStories

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-blue-dark overflow-hidden" aria-labelledby="africa-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-16">

          {/* Left: Content */}
          <div className="lg:w-1/2">
            <SectionHeader
              eyebrow="Africa Spotlight"
              title="Faith in Action Across the Continent"
              description="From Nairobi to Lagos, Cape Town to Dakar — faith communities are reshaping policy, protecting the vulnerable, and building just societies."
              light
              className="mb-8"
            />

            <div className="space-y-5">
              {displayStories.slice(0, 3).map((story) => (
                <Link
                  key={story._id}
                  href={`/news/${'slug' in story && story.slug ? story.slug.current : '#'}`}
                  className="group block"
                  aria-label={`Read story: ${story.title}`}
                >
                  <article className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-blue/40 rounded-xl p-5 transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-brand-orange/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Star size={16} className="text-brand-orange" aria-hidden="true" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="flex items-center gap-1 text-xs text-brand-blue-light font-medium">
                            <MapPin size={10} aria-hidden="true" />
                            {story.country || ('location' in story ? story.location : '')}
                          </span>
                          {'publishedAt' in story && story.publishedAt && (
                            <span className="text-white/40 text-xs">
                              {new Date(story.publishedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                            </span>
                          )}
                        </div>
                        <h3 className="font-heading font-semibold text-white text-sm leading-snug mb-1.5 group-hover:text-brand-blue-light transition-colors">
                          {story.title}
                        </h3>
                        <p className="text-blue-200 text-xs leading-relaxed line-clamp-2">
                          {story.summary}
                        </p>
                        <span className="inline-flex items-center gap-1 text-brand-blue-light text-xs font-medium mt-2 group-hover:gap-1.5 transition-all">
                          Read story <ArrowRight size={10} aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            <div className="mt-8">
              <Button href="/global-network" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 hover:border-white/50">
                Explore Our Africa Network
              </Button>
            </div>
          </div>

          {/* Right: Africa Map visualization */}
          <div className="lg:w-1/2 flex items-center justify-center">
            <div className="relative w-full max-w-md">
              {/* Stylized Africa outline */}
              <div className="relative">
                <svg
                  viewBox="0 0 300 380"
                  className="w-full h-auto opacity-90"
                  aria-hidden="true"
                  role="presentation"
                >
                  {/* Africa continent outline */}
                  <path
                    d="M110 20 L160 15 L195 25 L220 55 L240 90 L245 130 L255 165 L260 200 L255 235 L245 260 L230 285 L210 310 L190 335 L175 355 L160 365 L145 360 L130 348 L115 330 L100 305 L85 278 L72 248 L65 215 L62 180 L65 145 L68 110 L72 80 L80 55 L95 35 Z"
                    fill="rgba(255,255,255,0.05)"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="1.5"
                  />
                  {/* Highlighted regions */}
                  <path
                    d="M140 200 L170 195 L185 210 L180 235 L165 250 L145 248 L130 235 L128 215 Z"
                    fill="rgba(42, 159, 214, 0.3)"
                    stroke="rgba(42, 159, 214, 0.6)"
                    strokeWidth="1"
                  />
                  {/* Active country markers */}
                  {africaCountries.map(({ name, x, y }) => (
                    <g key={name}>
                      <circle
                        cx={x}
                        cy={y}
                        r="5"
                        fill="#F97316"
                        opacity="0.9"
                      />
                      <circle
                        cx={x}
                        cy={y}
                        r="10"
                        fill="none"
                        stroke="#F97316"
                        strokeWidth="1.5"
                        opacity="0.4"
                      />
                    </g>
                  ))}
                </svg>

                {/* Country labels overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  {['Nigeria', 'Kenya', 'South Africa', 'Ethiopia'].map((country, i) => {
                    const positions = [
                      { top: '50%', left: '38%' },
                      { top: '53%', left: '60%' },
                      { top: '78%', left: '52%' },
                      { top: '43%', left: '62%' },
                    ]
                    return (
                      <span
                        key={country}
                        className="absolute text-xs text-white/60 font-medium whitespace-nowrap"
                        style={positions[i]}
                      >
                        {country}
                      </span>
                    )
                  })}
                </div>
              </div>

              {/* Stats overlay */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4/5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { value: '54', label: 'Nations' },
                    { value: '80+', label: 'Partners' },
                    { value: '1M+', label: 'Impacted' },
                  ].map(({ value, label }) => (
                    <div key={label}>
                      <p className="font-heading font-bold text-white text-xl">{value}</p>
                      <p className="text-blue-200 text-xs">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
