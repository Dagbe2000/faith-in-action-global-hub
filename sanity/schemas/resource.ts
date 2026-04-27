import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'resource',
  title: 'Resource',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Resource Type',
      type: 'string',
      options: {
        list: [
          { title: 'Guide', value: 'guide' },
          { title: 'Report', value: 'report' },
          { title: 'Toolkit', value: 'toolkit' },
          { title: 'Video', value: 'video' },
          { title: 'Podcast', value: 'podcast' },
          { title: 'Curriculum', value: 'curriculum' },
          { title: 'Prayer Guide', value: 'prayer-guide' },
          { title: 'Policy Brief', value: 'policy-brief' },
          { title: 'Research', value: 'research' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
      ],
    }),
    defineField({
      name: 'downloadUrl',
      title: 'Download / External URL',
      type: 'url',
    }),
    defineField({
      name: 'file',
      title: 'File Upload',
      type: 'file',
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'English', value: 'en' },
          { title: 'French', value: 'fr' },
          { title: 'Swahili', value: 'sw' },
          { title: 'Arabic', value: 'ar' },
          { title: 'Portuguese', value: 'pt' },
          { title: 'Spanish', value: 'es' },
        ],
      },
      initialValue: 'en',
    }),
    defineField({
      name: 'relatedIssue',
      title: 'Related Policy Issue',
      type: 'reference',
      to: [{ type: 'policyIssue' }],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Resource',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'type', media: 'thumbnail' },
  },
})
