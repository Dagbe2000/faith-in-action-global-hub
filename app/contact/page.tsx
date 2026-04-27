'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle, Globe, Users } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'

const contactReasons = [
  'Partnership Inquiry',
  'Media / Press',
  'Policy Collaboration',
  'Volunteer Opportunities',
  'Resource Submission',
  'Speaking / Events',
  'General Inquiry',
  'Technical Support',
]

const officeLocations = [
  {
    city: 'Nairobi',
    country: 'Kenya (Africa HQ)',
    email: 'africa@faithinactionglobalhub.org',
    description: 'Continental headquarters for Africa network coordination',
  },
  {
    city: 'Washington D.C.',
    country: 'USA (North America)',
    email: 'us@faithinactionglobalhub.org',
    description: 'Policy advocacy and UN/World Bank engagement hub',
  },
  {
    city: 'Lagos',
    country: 'Nigeria (West Africa)',
    email: 'westafrica@faithinactionglobalhub.org',
    description: 'West and Central Africa regional coordination',
  },
]

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    organization: '',
    subject: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      })
      if (!res.ok) throw new Error('Failed to send message')
      setSubmitted(true)
    } catch (err) {
      setError('Something went wrong. Please try again or email us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="page-hero" aria-labelledby="contact-hero-heading">
        <div className="container-site relative z-10 text-center">
          <h1 id="contact-hero-heading" className="font-heading font-bold text-white text-5xl md:text-6xl mb-5">
            Get in Touch
          </h1>
          <p className="text-blue-100 text-xl max-w-2xl mx-auto leading-relaxed">
            We'd love to hear from you — whether you're a faith leader, policy advocate, journalist, or someone ready to get involved.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white" aria-labelledby="contact-form-heading">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <SectionHeader
                eyebrow="Send a Message"
                title="We'll respond within 48 hours"
                className="mb-8"
              />

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center" role="status">
                  <CheckCircle size={56} className="text-green-500 mb-4" aria-hidden="true" />
                  <h2 className="font-heading font-bold text-brand-navy text-2xl mb-2">
                    Message Received!
                  </h2>
                  <p className="text-gray-600 mb-6 max-w-sm">
                    Thank you for reaching out. A member of our team will be in touch within 48 hours.
                  </p>
                  <Button onClick={() => setSubmitted(false)} variant="outline" size="md">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Full Name <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue text-sm transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Email Address <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue text-sm transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label htmlFor="contact-org" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Organization (optional)
                    </label>
                    <input
                      id="contact-org"
                      type="text"
                      value={formState.organization}
                      onChange={(e) => setFormState({ ...formState, organization: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue text-sm transition-colors"
                      placeholder="Your church, NGO, or organization"
                    />
                  </div>

                  <div className="mb-5">
                    <label htmlFor="contact-subject" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Reason for Contact <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="contact-subject"
                      required
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue text-sm transition-colors bg-white"
                    >
                      <option value="">Select a reason...</option>
                      {contactReasons.map((reason) => (
                        <option key={reason} value={reason}>{reason}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="contact-message" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Message <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={6}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue text-sm transition-colors resize-none"
                      placeholder="Tell us how we can help or collaborate..."
                    />
                  </div>

                  {error && (
                    <p className="text-red-600 text-sm mb-4 bg-red-50 border border-red-200 rounded-lg px-4 py-3" role="alert">
                      {error}
                    </p>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={submitting}
                    icon={Send}
                    iconPosition="right"
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <aside aria-label="Contact information">
              <div className="space-y-6">
                {/* General contact */}
                <div className="bg-brand-blue-50 rounded-2xl p-6">
                  <h3 className="font-heading font-bold text-brand-navy text-lg mb-4">Direct Contact</h3>
                  <div className="space-y-3">
                    <a href="mailto:info@faithinactionglobalhub.org" className="flex items-center gap-2.5 text-brand-blue hover:text-brand-blue-dark text-sm transition-colors">
                      <Mail size={16} aria-hidden="true" />
                      info@faithinactionglobalhub.org
                    </a>
                    <p className="flex items-center gap-2.5 text-gray-600 text-sm">
                      <Globe size={16} aria-hidden="true" />
                      Global Offices (see below)
                    </p>
                  </div>
                </div>

                {/* Office locations */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6">
                  <h3 className="font-heading font-bold text-brand-navy text-lg mb-4">Our Offices</h3>
                  <div className="space-y-5">
                    {officeLocations.map(({ city, country, email, description }) => (
                      <div key={city} className="pb-5 last:pb-0 border-b border-gray-50 last:border-0">
                        <div className="flex items-start gap-2">
                          <MapPin size={14} className="text-brand-orange mt-0.5 flex-shrink-0" aria-hidden="true" />
                          <div>
                            <p className="font-semibold text-brand-navy text-sm">{city}</p>
                            <p className="text-gray-500 text-xs">{country}</p>
                            <p className="text-gray-500 text-xs mt-1">{description}</p>
                            <a href={`mailto:${email}`} className="text-brand-blue text-xs hover:text-brand-blue-dark transition-colors mt-1 block">
                              {email}
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Partnership */}
                <div className="bg-gradient-to-br from-brand-orange to-brand-orange-dark rounded-2xl p-6 text-white">
                  <Users size={24} className="mb-3" aria-hidden="true" />
                  <h3 className="font-heading font-bold text-white text-lg mb-2">Partner With Us</h3>
                  <p className="text-orange-100 text-sm mb-4">
                    Is your organization ready to join our global network of 120+ partners?
                  </p>
                  <Button href="/global-network" variant="white" size="sm" fullWidth>
                    Learn About Partnership
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
