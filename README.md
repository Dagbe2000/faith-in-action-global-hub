# Faith in Action Global Hub

A full-stack website mobilizing the global faith community to translate spiritual conviction into transformative policy change.

**Tech Stack:** Next.js 14 (App Router) · TypeScript · TailwindCSS · Sanity CMS v3

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Sanity CMS

**Create a Sanity project:**
1. Go to [sanity.io](https://www.sanity.io) and sign in
2. Create a new project — name it "Faith in Action Global Hub"
3. Choose the **production** dataset

**Get your credentials:**
- Project ID → your `NEXT_PUBLIC_SANITY_PROJECT_ID`
- API token → create at Manage → your project → API → Tokens → Add API token (Editor)

### 3. Configure environment variables

```bash
cp .env.local.example .env.local
```

Fill in `.env.local`:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_api_token
SANITY_WEBHOOK_SECRET=your_webhook_secret
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Run the development server

```bash
npm run dev
```

Visit:
- **Website:** http://localhost:3000
- **Sanity Studio:** http://localhost:3000/studio

---

## Project Structure

```
faith-in-action-global-hub/
├── app/
│   ├── layout.tsx              # Root layout (Navbar + Footer)
│   ├── globals.css             # Global styles + TailwindCSS
│   ├── page.tsx                # Home page
│   ├── faith-in-action/        # Faith in Action page
│   ├── policy-hub/
│   │   ├── page.tsx            # Policy issues listing
│   │   └── [slug]/page.tsx     # Dynamic issue page
│   ├── take-action/            # Actions & campaigns
│   ├── resources/              # Resource library
│   ├── global-network/         # Partner network
│   ├── news/
│   │   ├── page.tsx            # News listing
│   │   └── [slug]/page.tsx     # Individual article
│   ├── about/                  # About page
│   ├── contact/                # Contact page
│   ├── studio/[[...tool]]/     # Embedded Sanity Studio
│   └── api/
│       ├── contact/route.ts    # Contact form API
│       └── revalidate/route.ts # Sanity webhook revalidation
│
├── components/
│   ├── Logo.tsx                # Flame + rock SVG logo
│   ├── layout/
│   │   ├── Navbar.tsx          # Responsive navigation
│   │   └── Footer.tsx          # Footer with newsletter
│   ├── home/
│   │   ├── Hero.tsx            # Full-screen hero with issue selector
│   │   ├── IssueSelector.tsx   # Policy issue cards
│   │   ├── StatsSection.tsx    # Animated impact statistics
│   │   ├── AfricaSpotlight.tsx # Africa map + stories
│   │   └── BlogFeed.tsx        # Latest posts grid
│   └── ui/
│       ├── Button.tsx          # Multi-variant button component
│       ├── SectionHeader.tsx   # Reusable section headings
│       ├── ResourceCard.tsx    # Resource library card
│       ├── ActionModule.tsx    # Action/campaign card
│       ├── PartnerCard.tsx     # Partner organization card
│       ├── StoryCard.tsx       # Impact story card
│       └── PostCard.tsx        # Blog post card
│
├── sanity/
│   ├── schema.ts               # Schema registry
│   └── schemas/
│       ├── policyIssue.ts      # Policy issue content model
│       ├── actionItem.ts       # Action/campaign model
│       ├── resource.ts         # Resource library model
│       ├── partner.ts          # Partner organization model
│       ├── story.ts            # Impact story model
│       └── post.ts             # Blog post model
│
├── lib/
│   ├── sanity.ts               # Sanity client + image builder
│   ├── queries.ts              # All GROQ queries
│   └── types.ts                # TypeScript interfaces
│
├── sanity.config.ts            # Sanity Studio configuration
├── tailwind.config.ts          # TailwindCSS + brand colors
└── next.config.ts              # Next.js configuration
```

---

## Content Models

| Model | Description |
|-------|-------------|
| **PolicyIssue** | Policy areas (Religious Freedom, Climate, Poverty, etc.) with key facts, related actions & resources |
| **ActionItem** | Petitions, events, letter campaigns, donations, volunteer ops, prayer initiatives |
| **Resource** | Guides, reports, toolkits, videos, podcasts, curriculum, policy briefs |
| **Partner** | Organizations in the global network with region, type, coordinates |
| **Story** | Impact stories from the field with location, subject, related issue |
| **Post** | Blog/news articles with categories, author, tags, SEO |

---

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `brand-blue` | `#2A9FD6` | Primary brand blue (CTAs, links) |
| `brand-navy` | `#1E3A5F` | Dark navy (headings, hero bg) |
| `brand-orange` | `#F97316` | Accent orange (CTAs, urgency, flame) |

---

## Key Features

- **SEO optimized** — metadata, OG tags, structured data-ready, semantic HTML
- **Accessibility** — ARIA labels, skip links, keyboard navigation, focus management, color contrast
- **Mobile-first** — responsive at all breakpoints with a collapsible mobile nav
- **Graceful degradation** — all pages work with sample/fallback data when CMS is empty
- **ISR (Incremental Static Regeneration)** — 60-second revalidation + webhook-triggered revalidation
- **Sanity Studio embedded** — content management at `/studio`

---

## Adding Contact Form Email

Edit `app/api/contact/route.ts` and uncomment the Resend section, then add your API key to `.env.local`:

```bash
npm install resend
```

```env
RESEND_API_KEY=re_xxxxx
CONTACT_EMAIL_TO=info@faithinactionglobalhub.org
```

---

## Deployment

### Vercel (recommended)

```bash
npm install -g vercel
vercel --prod
```

Set all `.env.local` variables as Vercel environment variables.

**Sanity Webhook for revalidation:**
1. Sanity Manage → your project → API → Webhooks
2. URL: `https://your-domain.com/api/revalidate`
3. Method: POST
4. Set header: `x-webhook-secret: your_webhook_secret`

---

## Logo Concept

The SVG logo in `components/Logo.tsx` combines:
- **Flame** (orange gradient) — representing spiritual fire, conviction, and transformation
- **Rock/Mountain** (navy) — representing solid foundation, endurance, and the "rock" imagery across faith traditions

---

Built with Next.js 14, TailwindCSS, and Sanity CMS.
