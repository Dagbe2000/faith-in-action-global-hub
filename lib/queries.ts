import { groq } from 'next-sanity'

const imageFields = groq`
  asset->{ _id, url, metadata { dimensions } },
  hotspot,
  alt
`

const policyIssueCardFields = groq`
  _id,
  title,
  slug,
  icon,
  color,
  summary,
  featured,
  order,
  coverImage { ${imageFields} }
`

export const policyIssuesQuery = groq`
  *[_type == "policyIssue"] | order(order asc) {
    ${policyIssueCardFields}
  }
`

export const featuredPolicyIssuesQuery = groq`
  *[_type == "policyIssue" && featured == true] | order(order asc) {
    ${policyIssueCardFields}
  }
`

export const policyIssueBySlugQuery = groq`
  *[_type == "policyIssue" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    icon,
    color,
    summary,
    description,
    featured,
    coverImage { ${imageFields} },
    keyFacts,
    seo,
    "relatedActions": relatedActions[]-> {
      _id, title, slug, type, urgency, summary, ctaLabel, ctaUrl,
      coverImage { ${imageFields} }
    },
    "relatedResources": relatedResources[]-> {
      _id, title, slug, type, summary,
      thumbnail { ${imageFields} }
    }
  }
`

export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    category,
    excerpt,
    publishedAt,
    featured,
    coverImage { ${imageFields} },
    author { name, role, photo { ${imageFields} } },
    "relatedIssue": relatedIssue->{ title, slug }
  }
`

export const featuredPostsQuery = groq`
  *[_type == "post" && featured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    category,
    excerpt,
    publishedAt,
    coverImage { ${imageFields} },
    author { name, role }
  }
`

export const recentPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc)[0...$limit] {
    _id,
    title,
    slug,
    category,
    excerpt,
    publishedAt,
    coverImage { ${imageFields} },
    author { name, role }
  }
`

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    excerpt,
    body,
    publishedAt,
    tags,
    seo,
    coverImage { ${imageFields} },
    author { name, role, photo { ${imageFields} } },
    "relatedIssue": relatedIssue->{ title, slug }
  }
`

export const allResourcesQuery = groq`
  *[_type == "resource"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    type,
    summary,
    downloadUrl,
    language,
    featured,
    tags,
    publishedAt,
    thumbnail { ${imageFields} },
    "relatedIssue": relatedIssue->{ title, slug }
  }
`

export const featuredResourcesQuery = groq`
  *[_type == "resource" && featured == true][0...6] {
    _id,
    title,
    slug,
    type,
    summary,
    downloadUrl,
    language,
    thumbnail { ${imageFields} }
  }
`

export const allActionsQuery = groq`
  *[_type == "actionItem"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    type,
    urgency,
    summary,
    ctaLabel,
    ctaUrl,
    deadline,
    goal,
    progress,
    featured,
    coverImage { ${imageFields} },
    "relatedIssue": relatedIssue->{ title, slug }
  }
`

export const featuredActionsQuery = groq`
  *[_type == "actionItem" && featured == true][0...4] {
    _id,
    title,
    slug,
    type,
    urgency,
    summary,
    ctaLabel,
    ctaUrl,
    goal,
    progress,
    coverImage { ${imageFields} }
  }
`

export const allPartnersQuery = groq`
  *[_type == "partner"] | order(name asc) {
    _id,
    name,
    slug,
    type,
    region,
    country,
    description,
    website,
    featured,
    africaSpotlight,
    coordinates,
    logo { ${imageFields} }
  }
`

export const africaSpotlightPartnersQuery = groq`
  *[_type == "partner" && africaSpotlight == true][0...8] {
    _id,
    name,
    country,
    region,
    description,
    website,
    coordinates,
    logo { ${imageFields} }
  }
`

export const allStoriesQuery = groq`
  *[_type == "story"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    subject,
    location,
    country,
    region,
    summary,
    publishedAt,
    featured,
    africaSpotlight,
    coverImage { ${imageFields} },
    "relatedIssue": relatedIssue->{ title, slug }
  }
`

export const africaSpotlightStoriesQuery = groq`
  *[_type == "story" && africaSpotlight == true][0...4] {
    _id,
    title,
    slug,
    subject,
    location,
    country,
    summary,
    publishedAt,
    coverImage { ${imageFields} }
  }
`
