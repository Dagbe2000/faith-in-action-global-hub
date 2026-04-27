import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'actionItem',
  title: 'Action Item',
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
      title: 'Action Type',
      type: 'string',
      options: {
        list: [
          { title: 'Petition', value: 'petition' },
          { title: 'Event', value: 'event' },
          { title: 'Letter Campaign', value: 'letter' },
          { title: 'Donation', value: 'donation' },
          { title: 'Volunteer', value: 'volunteer' },
          { title: 'Prayer', value: 'prayer' },
          { title: 'Awareness', value: 'awareness' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'urgency',
      title: 'Urgency Level',
      type: 'string',
      options: {
        list: [
          { title: 'Urgent', value: 'urgent' },
          { title: 'High', value: 'high' },
          { title: 'Medium', value: 'medium' },
          { title: 'Ongoing', value: 'ongoing' },
        ],
      },
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'array',
      of: [{ type: 'block' }],
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
      name: 'ctaLabel',
      title: 'Call-to-Action Label',
      type: 'string',
      initialValue: 'Take Action Now',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'Call-to-Action URL',
      type: 'url',
    }),
    defineField({
      name: 'deadline',
      title: 'Deadline',
      type: 'datetime',
    }),
    defineField({
      name: 'goal',
      title: 'Goal / Target',
      type: 'number',
      description: 'For petitions: number of signatures needed',
    }),
    defineField({
      name: 'progress',
      title: 'Current Progress',
      type: 'number',
    }),
    defineField({
      name: 'relatedIssue',
      title: 'Related Policy Issue',
      type: 'reference',
      to: [{ type: 'policyIssue' }],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Action',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'type', media: 'coverImage' },
  },
})
