import Link from 'next/link'
import type { Post } from '@/lib/types'
import PostCard from '@/components/ui/PostCard'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'

const defaultPosts = [
  {
    _id: '1',
    _type: 'post' as const,
    title: 'How African Faith Leaders Are Reshaping Climate Policy',
    slug: { current: 'african-faith-leaders-climate' },
    category: 'africa-update',
    excerpt: 'Across sub-Saharan Africa, a new generation of faith leaders is leveraging moral authority to push governments toward bolder climate commitments.',
    publishedAt: '2024-04-10',
    author: { name: 'Dr. Amara Diallo', role: 'Policy Director' },
    featured: true,
  },
  {
    _id: '2',
    _type: 'post' as const,
    title: 'The Theology of Advocacy: Why Faith Demands Political Engagement',
    slug: { current: 'theology-of-advocacy' },
    category: 'faith-politics',
    excerpt: 'An exploration of the theological foundations that compel people of faith to engage the political sphere, not despite their beliefs, but because of them.',
    publishedAt: '2024-03-28',
    author: { name: 'Rev. Sarah Mbeki', role: 'Senior Theologian' },
    featured: true,
  },
  {
    _id: '3',
    _type: 'post' as const,
    title: 'Religious Freedom Under Pressure: A 2024 Global Assessment',
    slug: { current: 'religious-freedom-2024' },
    category: 'analysis',
    excerpt: 'Our annual review reveals troubling trends in religious freedom worldwide — and the faith communities that are fighting back.',
    publishedAt: '2024-03-15',
    author: { name: 'Marcus Chen', role: 'Research Analyst' },
    featured: true,
  },
  {
    _id: '4',
    _type: 'post' as const,
    title: 'Victory: Uganda Parliament Passes Landmark Education Access Bill',
    slug: { current: 'uganda-education-bill-victory' },
    category: 'success-story',
    excerpt: 'After three years of interfaith advocacy, Uganda\'s Parliament unanimously passed legislation guaranteeing free secondary education for orphans and vulnerable children.',
    publishedAt: '2024-04-01',
    author: { name: 'Faith in Action Team', role: '' },
    featured: false,
  },
  {
    _id: '5',
    _type: 'post' as const,
    title: 'Interview: The UN Special Rapporteur on Poverty Speaks with Faith Leaders',
    slug: { current: 'un-rapporteur-interview' },
    category: 'interview',
    excerpt: 'An in-depth conversation about how faith communities can partner with UN mechanisms to address extreme poverty at scale.',
    publishedAt: '2024-02-20',
    author: { name: 'Communications Team', role: '' },
    featured: false,
  },
]

interface BlogFeedProps {
  posts?: Post[]
}

export default function BlogFeed({ posts = [] }: BlogFeedProps) {
  const displayPosts = posts.length > 0 ? posts : defaultPosts
  const featuredPosts = displayPosts.slice(0, 3)
  const recentPosts = displayPosts.slice(3, 6)

  return (
    <section className="py-20 lg:py-28 bg-gray-50" aria-labelledby="blog-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <SectionHeader
            eyebrow="News & Insights"
            title="Voices from the Global Movement"
            description="Analysis, stories, and updates from faith advocates around the world."
          />
          <Link
            href="/news"
            className="flex items-center gap-2 text-brand-blue font-semibold hover:gap-3 transition-all whitespace-nowrap lg:mb-2"
            aria-label="View all news and insights"
          >
            View all posts <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured posts */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {featuredPosts.map((post) => (
              <PostCard key={post._id} post={post as Post} featured />
            ))}
          </div>

          {/* Sidebar: Recent */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-brand-navy text-sm uppercase tracking-wide mb-4">
              More Recent
            </h3>
            {recentPosts.map((post) => (
              <PostCard key={post._id} post={post as Post} />
            ))}
            <div className="pt-2">
              <Button href="/news" variant="outline" size="sm" fullWidth icon={ArrowRight} iconPosition="right">
                All Articles
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
