import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1E3A5F',
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://faithinactionglobalhub.org'),
  title: {
    default: 'Faith in Action Global Hub — Where Faith Meets Policy Change',
    template: '%s | Faith in Action Global Hub',
  },
  description:
    'Faith in Action Global Hub mobilizes the global faith community to transform spiritual conviction into lasting policy change. Join 200,000+ advocates across 50+ nations.',
  keywords: [
    'faith advocacy',
    'policy change',
    'religious freedom',
    'Africa faith leaders',
    'faith and politics',
    'global network',
    'interfaith advocacy',
    'social justice',
    'Christian advocacy',
    'Muslim advocacy',
  ],
  authors: [{ name: 'Faith in Action Global Hub' }],
  creator: 'Faith in Action Global Hub',
  publisher: 'Faith in Action Global Hub',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Faith in Action Global Hub',
    title: 'Faith in Action Global Hub — Where Faith Meets Policy Change',
    description:
      'Mobilizing the global faith community to transform spiritual conviction into lasting policy change.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Faith in Action Global Hub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Faith in Action Global Hub',
    description: 'Where faith meets policy change. Join the global movement.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-white text-gray-900">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1 pt-16 lg:pt-20" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
