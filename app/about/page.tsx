import type { Metadata } from 'next'
import { ArrowRight, Heart, Globe, Flame, BookOpen, Target } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about the Faith in Action Global Hub — our mission, vision, team, and the story behind the movement connecting faith and policy change.',
}

const teamMembers = [
  { name: 'Rev. Dr. Grace Amoah', role: 'Executive Director', location: 'Accra, Ghana', bio: 'Former UN Special Adviser with 25 years in interfaith advocacy. Ordained minister and human rights lawyer.', initial: 'GA' },
  { name: 'Dr. Yusuf Al-Rashid', role: 'Director of Policy', location: 'Nairobi, Kenya', bio: 'Expert in Islamic jurisprudence and international law. Led landmark religious freedom cases at the African Court.', initial: 'YA' },
  { name: 'Sarah Mitchell', role: 'Global Networks Director', location: 'Washington D.C., USA', bio: 'Built faith-based coalitions across 40 nations. Former Director of International Programs at World Vision.', initial: 'SM' },
  { name: 'Prof. Emmanuel Nkrumah', role: 'Research & Impact Lead', location: 'Lagos, Nigeria', bio: 'Academic theologian and public policy researcher. Author of "Faith, Power & Justice: African Perspectives."', initial: 'EN' },
  { name: 'Fatima Traoré', role: 'West Africa Regional Director', location: 'Dakar, Senegal', bio: 'Leads our 22-nation West Africa network with a focus on education equity and governance accountability.', initial: 'FT' },
  { name: 'Bishop John Kariuki', role: 'East Africa Regional Director', location: 'Kampala, Uganda', bio: 'Ecumenical leader who brokered the Uganda Interfaith Peace Accord and led education advocacy campaigns.', initial: 'JK' },
]

const timeline = [
  { year: '2012', event: 'Founded in Nairobi by a coalition of 15 faith leaders from 10 African nations' },
  { year: '2014', event: 'First major policy victory: Education access bill passed in Uganda with interfaith support' },
  { year: '2016', event: 'Launched Global Network, expanding to 30+ nations across 5 continents' },
  { year: '2018', event: 'Achieved UN ECOSOC special consultative status' },
  { year: '2020', event: 'COVID-19 response mobilized 500+ faith communities across Africa' },
  { year: '2022', event: 'Reached 100,000 advocates milestone; launched Africa Faith Leaders Summit' },
  { year: '2024', event: 'Expanded to 50+ nations with 120+ partner organizations, 200,000+ advocates' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero" aria-labelledby="about-hero-heading">
        <div className="container-site relative z-10 text-center">
          <h1 id="about-hero-heading" className="font-heading font-bold text-white text-5xl md:text-6xl mb-5">
            Our Story
          </h1>
          <p className="text-blue-100 text-xl max-w-3xl mx-auto leading-relaxed">
            Born in Africa. Built on faith. Committed to justice worldwide. We exist because the world's most marginalized communities deserve the moral power of united faith advocacy.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-white" aria-labelledby="mission-vision-heading">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Flame,
                label: 'Our Mission',
                text: 'To mobilize the global faith community to translate spiritual conviction into lasting policy change — for justice, dignity, and the flourishing of all people.',
                color: 'text-brand-orange',
                bg: 'bg-orange-50',
              },
              {
                icon: Target,
                label: 'Our Vision',
                text: 'A world where every person — regardless of faith, geography, or circumstance — is protected by just laws and lives in communities of dignity and peace.',
                color: 'text-brand-blue',
                bg: 'bg-brand-blue-50',
              },
              {
                icon: Heart,
                label: 'Our Values',
                text: 'Justice. Dignity. Solidarity. Truth-telling. Non-partisanship. Interfaith respect. Accountability. Transformation from the ground up.',
                color: 'text-green-700',
                bg: 'bg-green-50',
              },
            ].map(({ icon: Icon, label, text, color, bg }) => (
              <div key={label} className="text-center p-8 bg-gray-50 rounded-2xl">
                <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center mx-auto mb-5`}>
                  <Icon size={28} className={color} aria-hidden="true" />
                </div>
                <h2 className={`font-heading font-bold text-xl ${color} mb-3`}>{label}</h2>
                <p className="text-gray-700 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="section-padding bg-gradient-to-br from-brand-navy to-brand-blue-dark text-white" aria-labelledby="story-heading">
        <div className="container-site max-w-4xl">
          <SectionHeader
            eyebrow="Our Origins"
            title="Born Out of Crisis, Built for the Long Haul"
            light
            className="mb-8"
          />
          <div className="space-y-5 text-blue-100 text-lg leading-relaxed">
            <p>
              In 2012, fifteen faith leaders gathered in Nairobi, Kenya, with a shared frustration: the enormous moral and organizational power of Africa's faith communities was rarely channeled into systematic policy advocacy. Churches, mosques, and temples were doing extraordinary community work — but legislative change remained elusive.
            </p>
            <p>
              From that gathering emerged a simple but radical idea: what if faith communities organized with the same strategic discipline as political movements? What if the prophetic voice of religion found expression not just in sermons, but in parliamentary testimony, UN advocacy, and coalition-led legislative campaigns?
            </p>
            <p>
              A decade later, the Faith in Action Global Hub stands as proof that this vision works. We have helped pass legislation, shift UN resolutions, protect religious minorities, and build bridges across faith divides in over 50 nations.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-white" aria-labelledby="timeline-heading">
        <div className="container-site">
          <SectionHeader
            eyebrow="Our Journey"
            title="A Decade of Impact"
            centered
            className="mb-12"
          />
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-blue to-brand-orange" aria-hidden="true" />
            <ol className="space-y-6">
              {timeline.map(({ year, event }) => (
                <li key={year} className="relative flex items-start gap-6 pl-16">
                  <div className="absolute left-0 w-12 h-12 rounded-full bg-brand-blue-50 border-2 border-brand-blue flex items-center justify-center">
                    <span className="font-heading font-bold text-brand-blue text-xs">{year}</span>
                  </div>
                  <div className="pt-2.5">
                    <p className="text-gray-700 leading-relaxed">{event}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="section-padding bg-gray-50" aria-labelledby="team-heading">
        <div className="container-site">
          <SectionHeader
            eyebrow="Our Team"
            title="Led by Faith. Driven by Justice."
            description="Our team combines deep theological expertise with policy acumen and grassroots experience across the Global South."
            centered
            className="mb-12"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map(({ name, role, location, bio, initial }) => (
              <div key={name} className="bg-white rounded-2xl p-6 shadow-card text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-blue to-brand-navy flex items-center justify-center mx-auto mb-4">
                  <span className="font-heading font-bold text-white text-xl">{initial}</span>
                </div>
                <h3 className="font-heading font-bold text-brand-navy text-base">{name}</h3>
                <p className="text-brand-blue text-sm font-medium mt-0.5">{role}</p>
                <p className="text-gray-400 text-xs mt-1 mb-3">{location}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white border-t border-gray-100" aria-label="About page call to action">
        <div className="container-site text-center">
          <h2 className="font-heading font-bold text-brand-navy text-3xl mb-4">
            Join us in this work
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Whether as an individual advocate, a partner organization, or a supporter — there's a place for you in this global movement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/take-action" variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
              Get Involved
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Contact Our Team
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
