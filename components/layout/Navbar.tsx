'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, Search } from 'lucide-react'
import Logo from '@/components/Logo'
import Button from '@/components/ui/Button'

const navLinks = [
  { label: 'Home', href: '/' },
  {
    label: 'Our Work',
    href: '#',
    children: [
      { label: 'Faith in Action', href: '/faith-in-action' },
      { label: 'Policy Hub', href: '/policy-hub' },
      { label: 'Take Action', href: '/take-action' },
    ],
  },
  { label: 'Resources', href: '/resources' },
  { label: 'Global Network', href: '/global-network' },
  { label: 'News & Insights', href: '/news' },
  { label: 'About', href: '/about' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white/90 backdrop-blur-sm'
      }`}
      role="banner"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Logo size="md" />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
            {navLinks.map((link) => (
              <div key={link.href} className="relative">
                {link.children ? (
                  <div>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive('/faith-in-action') || isActive('/policy-hub') || isActive('/take-action')
                          ? 'text-brand-blue bg-brand-blue-50'
                          : 'text-gray-700 hover:text-brand-blue hover:bg-gray-50'
                      }`}
                      aria-expanded={openDropdown === link.label}
                      aria-haspopup="true"
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${openDropdown === link.label ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                      />
                    </button>
                    {openDropdown === link.label && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block px-4 py-2.5 text-sm transition-colors ${
                              isActive(child.href)
                                ? 'text-brand-blue bg-brand-blue-50 font-medium'
                                : 'text-gray-700 hover:text-brand-blue hover:bg-gray-50'
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? 'text-brand-blue bg-brand-blue-50'
                        : 'text-gray-700 hover:text-brand-blue hover:bg-gray-50'
                    }`}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Button href="/contact" variant="outline" size="sm">
              Contact
            </Button>
            <Button href="/take-action" variant="orange" size="sm">
              Take Action
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div id="mobile-menu" className="lg:hidden border-t border-gray-100 py-4 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <div key={link.href}>
                  {link.children ? (
                    <>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:text-brand-blue hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        {link.label}
                        <ChevronDown
                          size={14}
                          className={`transition-transform ${openDropdown === link.label ? 'rotate-180' : ''}`}
                          aria-hidden="true"
                        />
                      </button>
                      {openDropdown === link.label && (
                        <div className="ml-4 mt-1 flex flex-col gap-1">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`px-4 py-2.5 text-sm rounded-lg transition-colors ${
                                isActive(child.href)
                                  ? 'text-brand-blue bg-brand-blue-50 font-medium'
                                  : 'text-gray-600 hover:text-brand-blue hover:bg-gray-50'
                              }`}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        isActive(link.href)
                          ? 'text-brand-blue bg-brand-blue-50'
                          : 'text-gray-700 hover:text-brand-blue hover:bg-gray-50'
                      }`}
                      aria-current={isActive(link.href) ? 'page' : undefined}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3 px-4">
              <Button href="/contact" variant="outline" size="md" fullWidth>
                Contact Us
              </Button>
              <Button href="/take-action" variant="orange" size="md" fullWidth>
                Take Action
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
