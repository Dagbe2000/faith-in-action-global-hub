'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, ChevronDown, ArrowRight, Flame, Globe } from 'lucide-react'
import type { PolicyIssue } from '@/lib/types'
import Button from '@/components/ui/Button'

interface HeroProps {
  issues: PolicyIssue[]
}

const issueIcons: Record<string, string> = {
  blue: '💙',
  orange: '🔥',
  green: '🌿',
  purple: '✊',
  red: '❤️',
  teal: '🌊',
}

export default function Hero({ issues }: HeroProps) {
  const [selectedIssue, setSelectedIssue] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const router = useRouter()

  const handleIssueSelect = (slug: string) => {
    setSelectedIssue(slug)
    setDropdownOpen(false)
  }

  const handleExplore = () => {
    if (selectedIssue) {
      router.push(`/policy-hub/${selectedIssue}`)
    } else {
      router.push('/policy-hub')
    }
  }

  const selectedLabel = issues.find(i => i.slug.current === selectedIssue)?.title || ''

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-hero-gradient" aria-hidden="true" />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Animated orbs */}
      <div className="absolute top-1/4 left-1/6 w-64 h-64 rounded-full bg-brand-blue/20 blur-3xl animate-pulse-slow" aria-hidden="true" />
      <div className="absolute bottom-1/4 right-1/6 w-96 h-96 rounded-full bg-brand-orange/15 blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} aria-hidden="true" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm text-white/90 mb-8">
          <Globe size={14} className="text-brand-blue-light" aria-hidden="true" />
          <span>Faith communities across 50+ nations</span>
        </div>

        {/* Headline */}
        <h1
          id="hero-heading"
          className="font-heading font-bold text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none tracking-tight mb-6"
        >
          Faith{' '}
          <span className="relative inline-block">
            <span className="relative z-10 text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #FCD34D, #F97316)' }}>
              Meets
            </span>
          </span>
          {' '}Action
        </h1>

        <p className="text-xl md:text-2xl text-blue-100 mb-4 max-w-3xl mx-auto leading-relaxed">
          Where spiritual conviction becomes transformative policy change.
          <br className="hidden sm:block" />
          Join the global movement bridging faith and justice.
        </p>

        {/* Primary CTA */}
        <p className="text-brand-orange-light font-semibold text-lg mb-8 flex items-center justify-center gap-2">
          <Flame size={20} aria-hidden="true" />
          Choose the policy issue you care about
        </p>

        {/* Issue Selector */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between gap-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl px-5 py-4 text-white hover:bg-white/15 transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen}
              aria-label="Select a policy issue"
            >
              <span className={selectedLabel ? 'text-white font-medium' : 'text-white/60'}>
                {selectedLabel || 'Select a policy issue...'}
              </span>
              <ChevronDown
                size={18}
                className={`text-white/60 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>

            {dropdownOpen && (
              <div
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-20 max-h-72 overflow-y-auto"
                role="listbox"
                aria-label="Policy issues"
              >
                {issues.length > 0 ? (
                  issues.map((issue) => (
                    <button
                      key={issue._id}
                      role="option"
                      aria-selected={selectedIssue === issue.slug.current}
                      onClick={() => handleIssueSelect(issue.slug.current)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-brand-blue-50 transition-colors ${
                        selectedIssue === issue.slug.current ? 'bg-brand-blue-50 text-brand-blue' : 'text-brand-navy'
                      }`}
                    >
                      <span className="text-lg">{issueIcons[issue.color || 'blue']}</span>
                      <div>
                        <p className="font-medium text-sm">{issue.title}</p>
                        <p className="text-xs text-gray-500 line-clamp-1">{issue.summary}</p>
                      </div>
                    </button>
                  ))
                ) : (
                  // Fallback sample issues
                  [
                    { label: 'Religious Freedom', icon: '✊', summary: 'Protecting the right to believe' },
                    { label: 'Poverty & Economic Justice', icon: '💙', summary: 'Addressing systemic poverty' },
                    { label: 'Climate & Creation Care', icon: '🌿', summary: 'Stewarding God\'s creation' },
                    { label: 'Peacebuilding & Conflict', icon: '🕊️', summary: 'Faith-led reconciliation' },
                    { label: 'Education Access', icon: '📚', summary: 'Universal quality education' },
                    { label: 'Health & Dignity', icon: '❤️', summary: 'Holistic community health' },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => router.push('/policy-hub')}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-brand-blue-50 transition-colors text-brand-navy"
                    >
                      <span className="text-lg">{item.icon}</span>
                      <div>
                        <p className="font-medium text-sm">{item.label}</p>
                        <p className="text-xs text-gray-500">{item.summary}</p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <Button
              variant="orange"
              size="lg"
              onClick={handleExplore}
              fullWidth
              icon={ArrowRight}
              iconPosition="right"
            >
              {selectedIssue ? 'Explore This Issue' : 'Explore All Issues'}
            </Button>
            <Button
              href="/take-action"
              variant="white"
              size="lg"
              fullWidth
            >
              Take Action Now
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto mt-12 pt-12 border-t border-white/20">
          {[
            { value: '50+', label: 'Nations' },
            { value: '200K+', label: 'Advocates' },
            { value: '12', label: 'Policy Issues' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-heading font-bold text-3xl text-white">{value}</p>
              <p className="text-blue-200 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <ChevronDown size={24} className="text-white/50" />
      </div>
    </section>
  )
}
