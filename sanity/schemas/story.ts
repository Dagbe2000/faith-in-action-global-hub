import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'story',
  title: 'Story',
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
      name: 'subject',
      title: 'Subject / Person',
      type: 'string',
      description: 'Name of the person or community featured',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
    }),
    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
      options: {
        list: [
          { title: 'Sub-Saharan Africa', value: 'sub-saharan-africa' },
          { title: 'North Africa', value: 'north-africa' },
          { title: 'Middle East', value: 'middle-east' },
          { title: 'Europe', value: 'europe' },
          { title: 'North America', value: 'north-america' },
          { title: 'Latin America', value: 'latin-america' },
          { title: 'Asia Pacific', value: 'asia-pacific' },
        ],
      },
    }),
    defineField({
      name: 'summary',
      title: 'Summary / Pull Quote',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Full Story',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Alt Text', type: 'string' },
            { name: 'caption', title: 'Caption', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
      ],
    }),
    defineField({
      name: 'relatedIssue',
      title: 'Related Policy Issue',
      type: 'reference',
      to: [{ type: 'policyIssue' }],
    }),
    defineField({
      name: 'relatedPartner',
      title: 'Related Partner',
      type: 'reference',
      to: [{ type: 'partner' }],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Story',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'africaSpotlight',
      title: 'Africa Spotlight',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL (YouTube/Vimeo)',
      type: 'url',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'location', media: 'coverImage' },
  },
})
