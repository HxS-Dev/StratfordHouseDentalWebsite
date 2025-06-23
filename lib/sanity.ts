// lib/sanity.js
import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'agua7wra',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-03-19',
  perspective: "published",
});
