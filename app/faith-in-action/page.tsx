import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BookOpen, Users, Globe, Heart, Shield, Zap } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Faith in Action',
  description: 'Discover how faith communities around the world are translating spiritual conviction into transformative social and policy change.',
}

const pillars = [
  {
    icon: BookOpen,
    title: 'Theological Foundation',
    description: 'Every major faith tradition carries a deep mandate for justice, compassion, and the care of the vulnerable. We ground our advocacy in these shared convictions.',
    color: 'text-brand-blue',
    bg: 'bg-brand-blue-50',
  },
  {
    icon: Users,
    title: 'Community Mobilization',
    description: 'Faith communities are among the most trusted and organized institutions in the world. We help mobilize this immense social capital for policy impact.',
    color: 'text-brand-orange',
    bg: 'bg-orange-50',
  },
  {
    icon: Globe,
    title: 'Global Reach, Local Action',
    description: 'Our network spans 50+ nations, enabling both global advocacy at the UN level and hyper-local community action that creates change from the ground up.',
    color: 'text-green-700',
    bg: 'bg-green-50',
  },
  {
    icon: Shield,
    title: 'Non-Partisan Principles',
    description: 'We work across political divides, uniting people of all faiths around shared values of human dignity, justice, and the common good.',
    color: 'text-purple-700',
    bg: 'bg-purple-50',
  },
  {
    icon: Zap,
    title: 'Strategic Advocacy',
    description: 'We equip faith leaders with policy expertise, advocacy training, and strategic connections to maximize their impact in legislative and UN processes.',
    color: 'text-teal-700',
    bg: 'bg-teal-50',
  },
  {
    icon: Heart,
    title: 'Holistic Transformation',
    description: 'True change is both structural and spiritual. We pursue policy victories alongside community healing, reconciliation, and empowerment.',
    color: 'text-red-700',
    bg: 'bg-red-50',
  },
]

const faithTraditions = [
  { name: 'Christianity', description: 'Drawing on the prophetic tradition of speaking truth to power and caring for the "least of these."', percentage: 45 },
  { name: 'Islam', description: 'Rooted in the Quranic call to justice (\'adl), compassion (rahma), and care for the vulnerable.', percentage: 30 },
  { name: 'African Traditional', description: 'Ubuntu philosophy — "I am because we are" — grounds communal approaches to justice.', percentage: 15 },
  { name: 'Other Traditions', description: 'Including Judaism, Hinduism, and indigenous faith traditions with deep justice mandates.', percentage: 10 },
]

export default function FaithInActionPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="page-hero" aria-labelledby="faith-hero-heading">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" aria-hidden="true" />
        <div className="container-site relative z-10 text-center">
          <p className="text-brand-blue-light font-semibold uppercase tracking-widest text-sm mb-4">
            Our Approach
          </p>
          <h1 id="faith-hero-heading" className="font-heading font-bold text-white text-5xl md:text-6xl mb-6">
            Faith in Action
          </h1>
          <p className="text-blue-100 text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
            The intersection of spiritual conviction and public engagement — where the sacred becomes the catalyst for structural change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/policy-hub" variant="orange" size="lg" icon={ArrowRight} iconPosition="right">
              Explore Policy Issues
            </Button>
            <Button href="/take-action" variant="white" size="lg">
              Take Action
            </Button>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-white" aria-labelledby="mission-heading">
        <div className="container-site max-w-4xl">
          <div className="text-center">
            <blockquote className="font-heading text-2xl md:text-3xl text-brand-navy font-semibold leading-relaxed italic mb-6">
              "We believe that every act of justice is an act of faith, and every faithful community has the power to reshape the world."
            </blockquote>
            <p className="text-gray-600 text-lg leading-relaxed">
              Faith in Action Global Hub exists at the intersection of theology and policy. We believe that faith communities hold unique moral authority, organizational capacity, and grassroots reach that, when channeled strategically, can produce transformative policy outcomes — locally, nationally, and globally.
            </p>
          </div>
        </div>
      </section>

      {/* Six Pillars */}
      <section className="section-padding bg-gray-50" aria-labelledby="pillars-heading">
        <div className="container-site">
          <SectionHeader
            eyebrow="Our Framework"
            title="Six Pillars of Faithful Advocacy"
            description="How we approach the intersection of faith, community, and policy change."
            centered
            className="mb-14"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map(({ icon: Icon, title, description, color, bg }) => (
              <div key={title} className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all group">
                <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon size={24} className={color} aria-hidden="true" />
                </div>
                <h3 className={`font-heading font-bold text-lg ${color} mb-2`}>{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interfaith Approach */}
      <section className="section-padding bg-white" aria-labelledby="interfaith-heading">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader
                eyebrow="Interfaith Engagement"
                title="United Across Traditions"
                description="Our network bridges diverse faith traditions, finding common ground in the shared conviction that every human being has inherent dignity and deserves justice."
              />
              <div className="mt-8 space-y-4">
                {faithTraditions.map(({ name, description, percentage }) => (
                  <div key={name} className="flex gap-4 items-start">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-brand-navy text-sm">{name}</span>
                        <span className="text-brand-blue text-xs font-medium">{percentage}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full mb-2" role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100} aria-label={`${name}: ${percentage}%`}>
                        <div
                          className="h-full bg-gradient-to-r from-brand-blue to-brand-blue-light rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <p className="text-gray-600 text-xs leading-relaxed">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-brand-navy to-brand-blue rounded-3xl p-8 text-white">
              <h3 className="font-heading font-bold text-2xl mb-4">Our Shared Values</h3>
              <ul className="space-y-3">
                {[
                  'Every human being has inherent dignity and worth',
                  'Communities have the power to create structural change',
                  'Advocacy must be rooted in truth, compassion, and justice',
                  'Global solidarity strengthens local action',
                  'Policy change and spiritual renewal are inseparable',
                  'The vulnerable deserve the strongest protection',
                ].map((value) => (
                  <li key={value} className="flex items-start gap-2.5 text-blue-100 text-sm">
                    <span className="w-5 h-5 rounded-full bg-brand-orange/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" aria-hidden="true" />
                    </span>
                    {value}
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-white/20">
                <Button href="/about" variant="white" size="md" icon={ArrowRight} iconPosition="right">
                  Learn About Our Organization
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-orange-50 border-t border-orange-100" aria-label="Call to action">
        <div className="container-site text-center">
          <h2 className="font-heading font-bold text-brand-navy text-3xl mb-4">
            Ready to put your faith into action?
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Explore our policy hub, take action on current campaigns, or connect with our global network.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/policy-hub" variant="primary" size="lg">Explore Policy Issues</Button>
            <Button href="/global-network" variant="outline" size="lg">Join Our Network</Button>
          </div>
        </div>
      </section>
    </>
  )
}
