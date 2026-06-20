import {StarIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const trustedPartner = defineType({
  name: 'trustedPartner',
  title: 'Trusted Partner',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Partner Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Partner Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'websiteUrl',
      title: 'Website URL',
      type: 'url',
      description: 'Partner website link (optional)',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Brief description of partnership (optional)',
    }),
    defineField({
      name: 'orderRank',
      title: 'Display Order',
      type: 'string',
      hidden: true,
    }),
  ],
  orderings: [
    {
      title: 'Manual Order',
      name: 'manualOrder',
      by: [{field: 'orderRank', direction: 'asc'}],
    },
  ],
})
