// lib/sanity.ts
import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'agua7wra',
  dataset: 'production',
  useCdn: true, // Use CDN for better performance in production
  apiVersion: '2025-06-16',
  perspective: "published",
  stega: {
    enabled: false,
  },
});
