import type { PortableTextBlock } from '@portabletext/react'

export interface SanityImage {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number }
  alt?: string
}

export interface PolicyIssue {
  _id: string
  _type: 'policyIssue'
  title: string
  slug: { current: string }
  icon?: string
  color?: 'blue' | 'orange' | 'green' | 'purple' | 'red' | 'teal'
  summary: string
  description?: PortableTextBlock[]
  coverImage?: SanityImage
  keyFacts?: { stat: string; label: string }[]
  relatedActions?: ActionItem[]
  relatedResources?: Resource[]
  order?: number
  featured?: boolean
  seo?: { metaTitle?: string; metaDescription?: string }
}

export interface ActionItem {
  _id: string
  _type: 'actionItem'
  title: string
  slug: { current: string }
  type: 'petition' | 'event' | 'letter' | 'donation' | 'volunteer' | 'prayer' | 'awareness'
  urgency?: 'urgent' | 'high' | 'medium' | 'ongoing'
  summary: string
  description?: PortableTextBlock[]
  coverImage?: SanityImage
  ctaLabel?: string
  ctaUrl?: string
  deadline?: string
  goal?: number
  progress?: number
  relatedIssue?: PolicyIssue
  featured?: boolean
}

export interface Resource {
  _id: string
  _type: 'resource'
  title: string
  slug: { current: string }
  type: 'guide' | 'report' | 'toolkit' | 'video' | 'podcast' | 'curriculum' | 'prayer-guide' | 'policy-brief' | 'research'
  summary: string
  thumbnail?: SanityImage
  downloadUrl?: string
  language?: string
  relatedIssue?: PolicyIssue
  featured?: boolean
  tags?: string[]
  publishedAt?: string
}

export interface Partner {
  _id: string
  _type: 'partner'
  name: string
  slug?: { current: string }
  logo?: SanityImage
  type?: string
  region?: string
  country?: string
  description?: string
  website?: string
  featured?: boolean
  africaSpotlight?: boolean
  coordinates?: { lat: number; lng: number }
}

export interface Story {
  _id: string
  _type: 'story'
  title: string
  slug: { current: string }
  subject?: string
  location?: string
  country?: string
  region?: string
  summary: string
  content?: PortableTextBlock[]
  coverImage?: SanityImage
  relatedIssue?: PolicyIssue
  relatedPartner?: Partner
  featured?: boolean
  africaSpotlight?: boolean
  publishedAt?: string
  videoUrl?: string
}

export interface Post {
  _id: string
  _type: 'post'
  title: string
  slug: { current: string }
  category: string
  excerpt: string
  body?: PortableTextBlock[]
  coverImage?: SanityImage
  author?: {
    name: string
    role?: string
    photo?: SanityImage
  }
  relatedIssue?: PolicyIssue
  tags?: string[]
  featured?: boolean
  publishedAt: string
  seo?: { metaTitle?: string; metaDescription?: string }
}

export interface NavLink {
  label: string
  href: string
  children?: NavLink[]
}

export interface ContactFormData {
  name: string
  email: string
  organization?: string
  subject: string
  message: string
}
