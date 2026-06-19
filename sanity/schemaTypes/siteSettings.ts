import {CogIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'homeHeroImage',
      title: 'Home Page Hero Image',
      type: 'image',
      description: 'Main image displayed on homepage hero section',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Describe the image for accessibility',
        }),
      ],
    }),
    defineField({
      name: 'aboutHeroImage',
      title: 'About Page Hero Image',
      type: 'image',
      description: 'Main image displayed on about page hero section',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Describe the image for accessibility',
        }),
      ],
    }),
  ],
})
