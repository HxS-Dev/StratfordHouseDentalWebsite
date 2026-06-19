import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const Team = defineType({
  name: 'team',
  title: 'Team',
  type: 'document',
  icon: DocumentTextIcon,
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
    defineField({
      name: 'position',
      type: 'string',
    }),
    defineField({
      name: 'gdn_no',
      title: 'GDC Number',
      type: 'number',
      description: 'General Dental Council registration number (optional)',
    }),
    // defineField({
    //   name: 'author',
    //   type: 'reference',
    //   to: {type: 'author'},
    // }),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ]
    }),
    // defineField({
    //   name: 'categories',
    //   type: 'array',
    //   of: [defineArrayMember({type: 'reference', to: {type: 'category'}})],
    // }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      hidden: true,
      initialValue: 999,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
  orderings: [
    {
      title: 'Manual Order',
      name: 'manualOrder',
      by: [{field: 'order', direction: 'asc'}],
    },
    {
      title: 'Newest First',
      name: 'newestFirst',
      by: [{field: '_createdAt', direction: 'desc'}],
    },
  ],
})
