import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'partner',
  title: 'Partner',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Organization Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
      ],
    }),
    defineField({
      name: 'type',
      title: 'Partner Type',
      type: 'string',
      options: {
        list: [
          { title: 'Faith Organization', value: 'faith' },
          { title: 'NGO / Civil Society', value: 'ngo' },
          { title: 'Government', value: 'government' },
          { title: 'Academic', value: 'academic' },
          { title: 'Media', value: 'media' },
          { title: 'Corporate', value: 'corporate' },
        ],
      },
    }),
    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
      options: {
        list: [
          { title: 'Sub-Saharan Africa', value: 'sub-saharan-africa' },
          { title: 'North Africa', value: 'north-africa' },
          { title: 'East Africa', value: 'east-africa' },
          { title: 'West Africa', value: 'west-africa' },
          { title: 'Central Africa', value: 'central-africa' },
          { title: 'Southern Africa', value: 'southern-africa' },
          { title: 'Middle East', value: 'middle-east' },
          { title: 'Europe', value: 'europe' },
          { title: 'North America', value: 'north-america' },
          { title: 'Latin America', value: 'latin-america' },
          { title: 'Asia Pacific', value: 'asia-pacific' },
          { title: 'Global', value: 'global' },
        ],
      },
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'website',
      title: 'Website URL',
      type: 'url',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Partner',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'africaSpotlight',
      title: 'Africa Spotlight',
      type: 'boolean',
      description: 'Feature in the Africa Spotlight section',
      initialValue: false,
    }),
    defineField({
      name: 'coordinates',
      title: 'Map Coordinates',
      type: 'object',
      fields: [
        { name: 'lat', title: 'Latitude', type: 'number' },
        { name: 'lng', title: 'Longitude', type: 'number' },
      ],
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'country', media: 'logo' },
  },
})
