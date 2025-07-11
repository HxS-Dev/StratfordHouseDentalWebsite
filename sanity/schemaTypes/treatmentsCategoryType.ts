import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const treatmentsCategoryType = defineType({
  name: 'treatmentCategory',
  title: 'Treatment Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
 
  ],
})
