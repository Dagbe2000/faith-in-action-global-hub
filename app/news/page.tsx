import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import PostCard from '@/components/ui/PostCard'
import Button from '@/components/ui/Button'
import NewsletterForm from '@/components/ui/NewsletterForm'
import { sanityFetch } from '@/lib/sanity'
import { allPostsQuery } from '@/lib/queries'
import type { Post } from '@/lib/types'

export const metadata: Metadata = {
  title: 'News & Insights',
  description: 'Analysis, news, opinion, and updates from faith advocates, policy experts, and community leaders around the world.',
}

const samplePosts: Post[] = [
  { _id: '1', _type: 'post', title: 'How African Faith Leaders Are Reshaping Climate Policy', slug: { current: 'african-faith-leaders-climate' }, category: 'africa-update', excerpt: 'Across sub-Saharan Africa, a new generation of faith leaders is leveraging moral authority to push governments toward bolder climate commitments.', publishedAt: '2024-04-10', featured: true, author: { name: 'Dr. Amara Diallo', role: 'Policy Director' } },
  { _id: '2', _type: 'post', title: 'The Theology of Advocacy: Why Faith Demands Political Engagement', slug: { current: 'theology-of-advocacy' }, category: 'faith-politics', excerpt: 'An exploration of the theological foundations that compel people of faith to engage the political sphere, not despite their beliefs, but because of them.', publishedAt: '2024-03-28', featured: true, author: { name: 'Rev. Sarah Mbeki', role: 'Senior Theologian' } },
  { _id: '3', _type: 'post', title: 'Religious Freedom Under Pressure: A 2024 Global Assessment', slug: { current: 'religious-freedom-2024' }, category: 'analysis', excerpt: 'Our annual review reveals troubling trends in religious freedom worldwide — and the faith communities that are fighting back.', publishedAt: '2024-03-15', featured: true, author: { name: 'Marcus Chen', role: 'Research Analyst' } },
  { _id: '4', _type: 'post', title: 'Victory: Uganda Parliament Passes Landmark Education Access Bill', slug: { current: 'uganda-education-victory' }, category: 'success-story', excerpt: 'After three years of interfaith advocacy, Uganda\'s Parliament unanimously passed legislation guaranteeing free secondary education for vulnerable children.', publishedAt: '2024-04-01', featured: false, author: { name: 'Faith in Action Team', role: '' } },
  { _id: '5', _type: 'post', title: 'Interview: UN Special Rapporteur on Extreme Poverty', slug: { current: 'un-rapporteur-poverty-interview' }, category: 'interview', excerpt: 'An in-depth conversation about how faith communities can partner with UN mechanisms to address extreme poverty at scale.', publishedAt: '2024-02-20', featured: false, author: { name: 'Communications Team', role: '' } },
  { _id: '6', _type: 'post', title: 'Nigeria\'s Interfaith Coalition Wins Historic Healthcare Reform', slug: { current: 'nigeria-healthcare-reform' }, category: 'success-story', excerpt: 'A two-year faith advocacy campaign culminated in landmark legislation extending primary healthcare to 15 million underserved Nigerians.', publishedAt: '2024-01-22', featured: false, author: { name: 'West Africa Bureau', role: '' } },
  { _id: '7', _type: 'post', title: 'Opinion: On Why Silence Is Not an Option for Faith Leaders', slug: { current: 'silence-not-option' }, category: 'opinion', excerpt: 'In an era of political polarization, some faith leaders retreat from public life. One theologian argues this is a profound moral failure.', publishedAt: '2024-01-08', featured: false, author: { name: 'Prof. John Kariuki', role: 'Guest Contributor' } },
  { _id: '8', _type: 'post', title: 'Event Recap: Africa Faith Leaders Summit 2024', slug: { current: 'africa-summit-2024-recap' }, category: 'event-recap', excerpt: '500 faith leaders from 30 African nations convened for three days of prayer, dialogue, and advocacy strategy in Nairobi.', publishedAt: '2024-02-05', featured: false, author: { name: 'Events Team', role: '' } },
]

const categories = [
  { id: 'all', label: 'All' },
  { id: 'news', label: 'News' },
  { id: 'analysis', label: 'Analysis' },
  { id: 'opinion', label: 'Opinion' },
  { id: 'faith-politics', label: 'Faith & Politics' },
  { id: 'africa-update', label: 'Africa' },
  { id: 'success-story', label: 'Victories' },
  { id: 'interview', label: 'Interviews' },
]

export default async function NewsPage() {
  let posts: Post[] = []
  try {
    posts = await sanityFetch<Post[]>({ query: allPostsQuery, tags: ['post'] })
  } catch {}
  const displayPosts = posts.length > 0 ? posts : samplePosts

  const featured = displayPosts.filter(p => p.featured).slice(0, 3)
  const rest = displayPosts.filter(p => !p.featured)

  return (
    <>
      {/* Hero */}
      <section className="page-hero" aria-labelledby="news-hero-heading">
        <div className="container-site relative z-10 text-center">
          <p className="text-brand-blue-light font-semibold uppercase tracking-widest text-sm mb-4">News & Insights</p>
          <h1 id="news-hero-heading" className="font-heading font-bold text-white text-5xl md:text-6xl mb-5">
            Voices from the Movement
          </h1>
          <p className="text-blue-100 text-xl max-w-2xl mx-auto leading-relaxed">
            News, analysis, and stories from faith advocates shaping policy across the globe.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <div className="bg-white border-b border-gray-100 sticky top-16 lg:top-20 z-30">
        <div className="container-site py-4">
          <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter by category">
            {categories.map(({ id, label }) => (
              <button
                key={id}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${id === 'all' ? 'bg-brand-navy text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                aria-pressed={id === 'all'}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Posts */}
      {featured.length > 0 && (
        <section className="section-padding bg-white" aria-labelledby="featured-posts-heading">
          <div className="container-site">
            <h2 id="featured-posts-heading" className="font-heading font-bold text-brand-navy text-2xl mb-6">
              Featured Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featured.map((post) => (
                <PostCard key={post._id} post={post} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="section-padding bg-gray-50 border-t border-gray-100" aria-labelledby="all-posts-heading">
        <div className="container-site">
          <h2 id="all-posts-heading" className="font-heading font-bold text-brand-navy text-2xl mb-6">
            Latest Articles
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {(rest.length > 0 ? rest : displayPosts.slice(3)).map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-brand-navy text-white" aria-label="Newsletter signup">
        <div className="container-site max-w-2xl text-center">
          <h2 className="font-heading font-bold text-white text-2xl mb-3">
            Never miss a story
          </h2>
          <p className="text-blue-200 mb-6">
            Get our weekly digest of the most important faith & policy news delivered to your inbox.
          </p>
          <NewsletterForm id="news-email" dark />
        </div>
      </section>
    </>
  )
}
