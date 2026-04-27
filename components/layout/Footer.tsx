'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react'
import Logo from '@/components/Logo'

const footerLinks = {
  'Our Work': [
    { label: 'Faith in Action', href: '/faith-in-action' },
    { label: 'Policy Hub', href: '/policy-hub' },
    { label: 'Take Action', href: '/take-action' },
    { label: 'Global Network', href: '/global-network' },
  ],
  Resources: [
    { label: 'Resource Library', href: '/resources' },
    { label: 'News & Insights', href: '/news' },
    { label: 'Impact Stories', href: '/news?tab=stories' },
    { label: 'Research & Reports', href: '/resources?type=report' },
  ],
  Organization: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Team', href: '/about#team' },
    { label: 'Partners', href: '/global-network' },
    { label: 'Contact', href: '/contact' },
  ],
}

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter / X' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-brand-navy text-white" role="contentinfo">
      {/* Newsletter Banner */}
      <div className="bg-brand-orange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-heading font-bold text-white text-xl md:text-2xl">
                Stay connected. Stay engaged.
              </h2>
              <p className="text-orange-100 text-sm mt-1">
                Join thousands of faith leaders taking action on the issues that matter most.
              </p>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-2 w-full md:w-auto"
              aria-label="Newsletter signup"
            >
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input
                id="footer-email"
                type="email"
                placeholder="Your email address"
                required
                className="flex-1 md:w-64 px-4 py-2.5 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-white text-brand-orange font-semibold rounded-lg hover:bg-orange-50 transition-colors text-sm whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Logo variant="light" size="lg" />
            <p className="mt-4 text-blue-200 text-sm leading-relaxed max-w-xs">
              Mobilizing the global faith community to translate spiritual conviction into transformative policy advocacy and community action.
            </p>
            <address className="mt-6 not-italic space-y-2">
              <a href="mailto:info@faithinactionglobalhub.org" className="flex items-center gap-2 text-blue-200 hover:text-white text-sm transition-colors">
                <Mail size={14} aria-hidden="true" />
                info@faithinactionglobalhub.org
              </a>
              <p className="flex items-center gap-2 text-blue-200 text-sm">
                <MapPin size={14} aria-hidden="true" />
                Global — Washington D.C. | Nairobi | Lagos
              </p>
            </address>
            <div className="flex gap-3 mt-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-brand-blue flex items-center justify-center transition-colors"
                  aria-label={label}
                >
                  <Icon size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">
                {heading}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-blue-200 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-blue-300 text-xs">
              © {year} Faith in Action Global Hub. All rights reserved.
            </p>
            <div className="flex gap-4">
              {['Privacy Policy', 'Terms of Use', 'Accessibility'].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(/ /g, '-')}`}
                  className="text-blue-300 hover:text-white text-xs transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
