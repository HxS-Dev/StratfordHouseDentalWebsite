import { defineType, defineField } from 'sanity';

export const bookingLink = defineType({
  name: 'bookingLink',
  title: 'Booking Link',
  type: 'document',
  fields: [
    defineField({
      name: 'bookingLink',
      title: 'Booking Link',
      type: 'string',
    }),
  ],
});
