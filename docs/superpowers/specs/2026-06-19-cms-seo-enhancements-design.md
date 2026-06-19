# CMS, SEO, and UI Enhancements Design

**Date:** 2026-06-19  
**Project:** Stratford House Dental Website  
**Approach:** Feature-by-Feature Implementation

## Overview

This design covers six key enhancements to improve content management, SEO, and user experience:

1. Make home and about-us hero images configurable in Sanity CMS
2. Hide GDC number display when not filled in (team section)
3. Make trusted partners section CMS-driven with full management capabilities
4. Add drag-and-drop ordering to team members in Sanity
5. SEO improvements for local search visibility (dentists in Milton Keynes)
6. Add favicon/logo to browser tab and update site title

## Implementation Order

Following feature-by-feature approach, each feature will be completed fully (Sanity schema + frontend + testing) before moving to the next:

1. Hero Images → 2. Trusted Partners → 3. Team Ordering + GDC Fix → 4. SEO + Favicon + Navigation

---

## Feature 1: Hero Images in Sanity CMS

### Requirements

- Make homepage hero image (`hero-img.png`) editable via Sanity
- Make about page hero image (`about-img2.png`) editable via Sanity
- Maintain existing design and decorative elements (cubes, patterns)
- Keep image optimization via Sanity CDN

### Schema Design

**New Document Type: `siteSettings` (Singleton)**

Location: `sanity/schemaTypes/siteSettings.ts`

```typescript
{
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'homeHeroImage',
      title: 'Home Page Hero Image',
      type: 'image',
      description: 'Main image displayed on homepage hero section',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Describe the image for accessibility'
        }
      ]
    },
    {
      name: 'aboutHeroImage',
      title: 'About Page Hero Image',
      type: 'image',
      description: 'Main image displayed on about page hero section',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Describe the image for accessibility'
        }
      ]
    }
  ]
}
```

**Singleton Configuration:**
- Use `singletonPlugin` from `sanity` to ensure only one settings document exists
- Add to `sanity/structure.ts` to make it easily accessible in Studio sidebar

### Frontend Changes

**Files to Update:**
1. `app/page.tsx` - Homepage hero section
2. `app/(pages)/about/page.tsx` - About page hero section
3. `lib/queries.ts` - Add query for site settings

**New Query (`lib/queries.ts`):**

```typescript
export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  homeHeroImage{
    asset->{
      _id,
      url
    },
    alt
  },
  aboutHeroImage{
    asset->{
      _id,
      url
    },
    alt
  }
}`
```

**Homepage Update (`app/page.tsx`):**

Current line 61-65:
```tsx
<img 
  src="images/hero-img.png" 
  className="inline-block" 
  alt="" 
/>
```

Updated to:
```tsx
<img 
  src={heroImage || "/images/hero-img.png"} 
  className="inline-block" 
  alt={heroImageAlt || "Stratford House Dental Practice hero"} 
/>
```

Fetch logic (add to existing useEffect or create new):
```typescript
const [heroImage, setHeroImage] = useState("");
const [heroImageAlt, setHeroImageAlt] = useState("");

useEffect(() => {
  const fetchSettings = async () => {
    const data = await sanityClient.fetch(siteSettingsQuery);
    if (data?.homeHeroImage) {
      setHeroImage(urlFor(data.homeHeroImage).width(600).url());
      setHeroImageAlt(data.homeHeroImage.alt || "");
    }
  };
  fetchSettings();
}, []);
```

**About Page Update (`app/(pages)/about/page.tsx`):**

Current line 43:
```tsx
<img src="images/about-img2.png" className='md:mb-8 mb-6' alt="" />
```

Updated similarly with fetch from `siteSettings.aboutHeroImage`

### Fallback Strategy

If no image is set in Sanity CMS:
- Fall back to existing hardcoded image paths
- Prevents broken images during content migration
- Allows gradual rollout

---

## Feature 2: Trusted Partners CMS

### Requirements

- Replace hardcoded `logos-img.png` with dynamic CMS-managed partners
- Allow adding/removing partners
- Support manual ordering with drag-and-drop
- Include partner name, logo, website link, and description
- Maintain similar visual layout

### Current Partners (from logos-img.png)

Eight partners to migrate:
1. **FGDP** (Faculty of General Dental Practice)
2. **BDA good practice**
3. **Dentalign - The Invisible Orthodontic** (Member Practice)
4. **The Dental Awards** (Member)
5. **Invisalign**
6. **CODE DENTAL PLANS**
7. **medenta®**
8. **straumann**

### Schema Design

**New Document Type: `trustedPartner`**

Location: `sanity/schemaTypes/trustedPartner.ts`

```typescript
{
  name: 'trustedPartner',
  title: 'Trusted Partner',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Partner Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'logo',
      title: 'Partner Logo',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          validation: Rule => Rule.required()
        }
      ]
    },
    {
      name: 'websiteUrl',
      title: 'Website URL',
      type: 'url',
      description: 'Partner website link (optional)'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Brief description of partnership (optional)'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      hidden: true // Hidden because drag-and-drop handles this
    }
  ],
  orderings: [
    {
      title: 'Manual Order',
      name: 'manualOrder',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ]
}
```

**Sanity Studio Configuration:**

Install and configure `@sanity/orderable-document-list` plugin for drag-and-drop:

```typescript
// sanity.config.ts
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

export default defineConfig({
  // ... other config
  plugins: [
    orderableDocumentListDeskItem({ type: 'trustedPartner', title: 'Trusted Partners' }),
    // ... other plugins
  ]
})
```

### Frontend Changes

**New Component: `app/components/TrustedPartners.tsx`**

```typescript
'use client'

import { urlFor } from '@/lib/imageBuilder'
import { motion } from 'framer-motion'

type Partner = {
  _id: string
  name: string
  logo: any
  websiteUrl?: string
  description?: string
}

export default function TrustedPartners({ partners }: { partners: Partner[] }) {
  if (!partners || partners.length === 0) {
    return null // Don't show section if no partners
  }

  return (
    <section className="bg-gray-1400 md:block hidden py-16">
      <div className="xl:max-w-[1270px] max-w-[952px] relative md:px-5 px-4 mx-auto">
        <div className="bg-white py-12 px-8">
          <h2 className="text-center text-[32px] font-medium leading-[125%] text-grayscale-900 mb-6">
            Trusted Partners & Accreditations
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {partners.map((partner, index) => {
              const logoUrl = urlFor(partner.logo).width(150).url()
              const content = (
                <img
                  src={logoUrl}
                  alt={partner.logo.alt || partner.name}
                  className="max-h-[50px] w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  title={partner.name}
                />
              )

              return partner.websiteUrl ? (
                <motion.a
                  key={partner._id}
                  href={partner.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {content}
                </motion.a>
              ) : (
                <motion.div
                  key={partner._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  {content}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
```

**Query (`lib/queries.ts`):**

```typescript
export const trustedPartnersQuery = groq`*[_type == "trustedPartner"] | order(order asc) {
  _id,
  name,
  logo{
    asset->{
      _id,
      url
    },
    alt
  },
  websiteUrl,
  description
}`
```

**Update Homepage (`app/page.tsx`):**

Replace section at lines 201-208 with:

```tsx
{partners && partners.length > 0 && <TrustedPartners partners={partners} />}
```

Add fetch logic:
```typescript
const [partners, setPartners] = useState([]);

useEffect(() => {
  const fetchPartners = async () => {
    const data = await sanityClient.fetch(trustedPartnersQuery);
    setPartners(data || []);
  };
  fetchPartners();
}, []);
```

### Visual Design Notes

- Logos displayed in responsive grid (flex-wrap)
- Grayscale by default, color on hover (matches professional partner display)
- Max height constraint ensures consistent sizing
- Clickable if website URL provided
- Smooth animations on scroll into view

---

## Feature 3: Team Ordering & GDC Number Fix

### Requirements

- Add drag-and-drop ordering to team members in Sanity Studio
- Ensure GDC number only displays when value exists
- Handle edge cases (null, undefined, 0, empty string)

### Schema Changes

**Update: `sanity/schemaTypes/team.ts`**

Add order field:
```typescript
defineField({
  name: 'order',
  title: 'Display Order',
  type: 'number',
  hidden: true, // Hidden because drag-and-drop handles this
  initialValue: 999 // New members appear at end by default
})
```

Ensure `gdn_no` is optional:
```typescript
defineField({
  name: 'gdn_no',
  title: 'GDC Number',
  type: 'number',
  description: 'General Dental Council registration number (optional)',
  // Remove validation: Rule => Rule.required() if present
})
```

Add ordering configuration:
```typescript
orderings: [
  {
    title: 'Manual Order',
    name: 'manualOrder',
    by: [{ field: 'order', direction: 'asc' }]
  },
  {
    title: 'Newest First',
    name: 'newestFirst',
    by: [{ field: '_createdAt', direction: 'desc' }]
  }
]
```

**Sanity Studio Configuration:**

```typescript
// sanity.config.ts
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

plugins: [
  orderableDocumentListDeskItem({ 
    type: 'team', 
    title: 'Team Members',
    icon: DocumentTextIcon 
  }),
  // ... other plugins
]
```

### Frontend Changes

**Update Query (`lib/queries.ts`):**

Current query:
```typescript
export const allTeamQuery = groq`*[_type == "team"]`
```

Updated to:
```typescript
export const allTeamQuery = groq`*[_type == "team"] | order(order asc, _createdAt asc) {
  _id,
  title,
  position,
  gdn_no,
  mainImage{
    asset->{
      _id,
      url
    },
    alt
  },
  body,
  order
}`
```

**Why:** `order asc` primary sort, `_createdAt asc` fallback if order values equal

**Update Component (`app/components/TeamSection.tsx`):**

Current GDC display logic (lines 92-96):
```tsx
{member.gdn_no && (
  <span className='text-base font-normal leading-6 text-tertiary-600'>
    GDC No: {member.gdn_no}
  </span>
)}
```

Enhanced version:
```tsx
{member.gdn_no && member.gdn_no > 0 && (
  <span className='text-base font-normal leading-6 text-tertiary-600'>
    GDC No: {member.gdn_no}
  </span>
)}
```

**Why:** Additional `> 0` check ensures GDC number 0 doesn't display (edge case where 0 is truthy in conditional but meaningless as GDC number)

### Edge Cases Handled

1. **Null/undefined `gdn_no`:** Already handled by `member.gdn_no &&` check
2. **GDC number is 0:** Handled by additional `> 0` check
3. **Empty string:** Type is `number` in schema, so impossible
4. **Two team members with same order:** Fallback to `_createdAt` in query
5. **New members without order set:** `initialValue: 999` in schema puts them at end
6. **Missing order field on existing records:** Query fallback to `_createdAt` handles gracefully

---

## Feature 4: SEO, Favicon, and Navigation Updates

### Requirements

- Update site title from "Stratford House" to "Stratford House Dental Practice | Dentist in Milton Keynes"
- Replace generic description with SEO-optimized content
- Add structured data (Schema.org JSON-LD) for local business
- Create favicon from logo (circular portion only, remove text)
- Generate multiple favicon sizes for all devices
- Remove "Home" button from navigation menu

### SEO Strategy

**Target Keywords:**
- Primary: "dentist milton keynes", "dental practice wolverton"
- Secondary: "nhs dentist milton keynes", "private dentist milton keynes"  
- Long-tail: "milton keynes dentist near me", "wolverton dental practice"

**Local SEO Focus:**
- Emphasize location (Milton Keynes, Wolverton) in metadata
- Add structured data with business address, phone, hours
- Optimize for "near me" searches via schema markup

### Metadata Updates

**Update: `app/layout.tsx`**

Current metadata (lines 4-7):
```typescript
export const metadata: Metadata = {
  title: "Stratford House",
  description: "Generated by create next app",
};
```

Updated to:
```typescript
export const metadata: Metadata = {
  title: {
    default: "Stratford House Dental Practice | Dentist in Milton Keynes",
    template: "%s | Stratford House Dental Practice"
  },
  description: "Expert dental care in Milton Keynes & Wolverton. NHS & private dentistry with latest technology. Serving Milton Keynes, Wolverton, Newport Pagnell & surrounding areas. Book your appointment today.",
  keywords: [
    "dentist milton keynes",
    "dental practice wolverton", 
    "nhs dentist milton keynes",
    "private dentist milton keynes",
    "dentist near me",
    "milton keynes dentist",
    "wolverton dentist",
    "dental practice near me"
  ],
  authors: [{ name: "Stratford House Dental Practice" }],
  creator: "Stratford House Dental Practice",
  publisher: "Stratford House Dental Practice",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://stratfordhousedentalpractice.co.uk",
    siteName: "Stratford House Dental Practice",
    title: "Stratford House Dental Practice | Dentist in Milton Keynes",
    description: "Expert dental care in Milton Keynes & Wolverton. NHS & private dentistry with latest technology.",
    images: [
      {
        url: "/images/hero-img.png",
        width: 1200,
        height: 630,
        alt: "Stratford House Dental Practice"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Stratford House Dental Practice | Dentist in Milton Keynes",
    description: "Expert dental care in Milton Keynes & Wolverton. NHS & private dentistry with latest technology.",
    images: ["/images/hero-img.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add when available:
    // google: 'verification-code',
  }
};
```

### Structured Data (JSON-LD)

**Create: `app/components/StructuredData.tsx`**

```tsx
export default function StructuredData() {
  const dentalPracticeSchema = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": "https://stratfordhousedentalpractice.co.uk",
    "name": "Stratford House Dental Practice",
    "url": "https://stratfordhousedentalpractice.co.uk",
    "logo": "https://stratfordhousedentalpractice.co.uk/images/logo.svg",
    "image": "https://stratfordhousedentalpractice.co.uk/images/hero-img.png",
    "description": "Expert dental care in Milton Keynes & Wolverton. NHS & private dentistry with latest technology.",
    "telephone": "+44-XXXX-XXXXXX", // Add actual phone number
    "email": "info@stratfordhousedentalpractice.co.uk", // Add actual email
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Stratford House, [Street Address]", // Add actual address
      "addressLocality": "Wolverton",
      "addressRegion": "Milton Keynes",
      "postalCode": "MK12 XXX", // Add actual postcode
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "52.XXXXX", // Add actual coordinates
      "longitude": "-0.XXXXX"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "17:00"
      }
      // Add actual opening hours
    ],
    "priceRange": "££",
    "paymentAccepted": "Cash, Card, NHS",
    "currenciesAccepted": "GBP",
    "areaServed": [
      {
        "@type": "City",
        "name": "Milton Keynes"
      },
      {
        "@type": "City", 
        "name": "Wolverton"
      },
      {
        "@type": "City",
        "name": "Newport Pagnell"
      },
      {
        "@type": "City",
        "name": "Stony Stratford"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8", // Add actual rating if available
      "reviewCount": "50" // Add actual count if available
    },
    "sameAs": [
      // Add social media URLs when available
      // "https://www.facebook.com/stratfordhouse",
      // "https://www.instagram.com/stratfordhouse"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dentalPracticeSchema) }}
    />
  );
}
```

**Add to `app/layout.tsx`:**
```tsx
import StructuredData from './components/StructuredData'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body className={`font-inter-display antialiased`}>{children}</body>
    </html>
  );
}
```

### Favicon Generation

**Process:**

1. Extract circular logo from `public/images/logo.svg`
2. Remove "STRATFORD HOUSE DENTAL PRACTICE" text
3. Keep only the circular emblem portion
4. Generate following files in `public/` directory:
   - `favicon.ico` (32x32 and 16x16 multi-resolution)
   - `favicon-16x16.png`
   - `favicon-32x32.png`
   - `apple-touch-icon.png` (180x180)
   - `android-chrome-192x192.png`
   - `android-chrome-512x512.png`

**Create: `public/manifest.json`**

```json
{
  "name": "Stratford House Dental Practice",
  "short_name": "Stratford House",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#1E40AF",
  "background_color": "#FFFFFF",
  "display": "standalone"
}
```

**Add to `app/layout.tsx` metadata:**

```typescript
export const metadata: Metadata = {
  // ... existing metadata
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  },
  manifest: '/manifest.json'
};
```

### Navigation Update

**Update: `app/components/Header.tsx`**

Find and remove "Home" link from navigation menu.

Current structure likely includes:
```tsx
<Link href="/">Home</Link>
```

Remove this link entirely. The logo already links to home (standard web convention).

**Why:** Redundant navigation element. Logo serves as home link, freeing up menu space and reducing visual clutter.

### Robots.txt and Sitemap

**Create: `public/robots.txt`**

```txt
User-agent: *
Allow: /
Sitemap: https://stratfordhousedentalpractice.co.uk/sitemap.xml

User-agent: *
Disallow: /api/
Disallow: /sanity/
Disallow: /sanitycms/
```

**Create: `app/sitemap.ts`** (Next.js 13+ dynamic sitemap)

```typescript
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://stratfordhousedentalpractice.co.uk'
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/treatment`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/fees`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ]
}
```

**Note:** Sitemap will automatically be served at `/sitemap.xml` by Next.js

---

## Technical Requirements

### Dependencies to Install

```bash
npm install @sanity/orderable-document-list
```

### Sanity Studio Updates

1. Add `siteSettings.ts` to `sanity/schemaTypes/index.ts`
2. Add `trustedPartner.ts` to `sanity/schemaTypes/index.ts`
3. Update `team.ts` with order field
4. Configure singleton plugin for siteSettings
5. Configure orderable-document-list for trustedPartner and team

### Environment Variables

No new environment variables required. Uses existing Sanity configuration.

---

## Testing Checklist

### Feature 1: Hero Images
- [ ] Can upload home hero image in Sanity
- [ ] Can upload about hero image in Sanity
- [ ] Images display correctly on frontend
- [ ] Fallback works if no image set
- [ ] Alt text displays correctly
- [ ] Images are optimized (check network tab)

### Feature 2: Trusted Partners
- [ ] Can create new partner in Sanity
- [ ] Can drag-and-drop reorder partners
- [ ] Logos display in correct order on homepage
- [ ] Links open in new tab when URL provided
- [ ] Grayscale to color hover effect works
- [ ] Section hides if no partners exist

### Feature 3: Team Ordering & GDC
- [ ] Can drag-and-drop reorder team members in Sanity
- [ ] Team displays in correct order on about page
- [ ] GDC number shows only when filled
- [ ] GDC number hides when null/undefined/0
- [ ] New team members without order appear at end

### Feature 4: SEO & Navigation
- [ ] Browser tab shows "Stratford House Dental Practice | Dentist in Milton Keynes"
- [ ] Favicon displays correctly in browser tab
- [ ] Favicon displays correctly on mobile (add to homescreen test)
- [ ] "Home" button removed from navigation
- [ ] Logo still links to homepage
- [ ] Structured data validates (Google Rich Results Test)
- [ ] Sitemap accessible at /sitemap.xml
- [ ] Robots.txt accessible at /robots.txt
- [ ] Meta description appears in Google search preview

---

## Migration Notes

### Partner Logos

The existing `images/logos-img.png` contains 8 partner logos. These need to be extracted as individual images and uploaded to Sanity:

1. FGDP - Extract logo from position 1
2. BDA good practice - Extract logo from position 2
3. Dentalign - Extract logo from position 3
4. The Dental Awards - Extract logo from position 4
5. Invisalign - Extract logo from position 5
6. CODE DENTAL PLANS - Extract logo from position 6
7. medenta - Extract logo from position 7
8. straumann - Extract logo from position 8

**Process:** Use image editing tool to crop each logo individually, save as transparent PNG files, then upload to Sanity as trustedPartner entries.

### Team Members

Existing team members need `order` field populated:
- Can be done manually in Sanity Studio via drag-and-drop
- Or run data migration script to set initial order based on `_createdAt`

### Structured Data Placeholders

Replace placeholder values in `StructuredData.tsx`:
- Phone number
- Email address
- Full street address
- Postcode
- GPS coordinates
- Opening hours
- Actual ratings (if available)
- Social media URLs (if available)

---

## Post-Launch SEO Recommendations

While not part of this implementation, these actions will further improve local search rankings:

1. **Google Business Profile:**
   - Claim/verify listing
   - Add photos, hours, services
   - Encourage patient reviews

2. **Local Citations:**
   - List on NHS Choices
   - Register with local directories (Yell, Thomson Local)
   - Ensure NAP (Name, Address, Phone) consistency

3. **Content Strategy:**
   - Regular blog posts via news section
   - Target long-tail keywords (e.g., "dental implants milton keynes")
   - Create treatment-specific landing pages

4. **Technical SEO:**
   - Monitor Core Web Vitals
   - Ensure mobile-first indexing
   - Set up Google Search Console

5. **Link Building:**
   - Partner with local businesses
   - Get featured in local news/blogs
   - Professional association memberships

---

## Implementation Timeline Estimate

**Feature 1 (Hero Images):** 2-3 hours
- Schema creation: 30 min
- Frontend updates: 1-2 hours
- Testing: 30 min

**Feature 2 (Trusted Partners):** 4-5 hours
- Schema creation: 1 hour
- Plugin configuration: 30 min
- Component creation: 2 hours
- Logo extraction: 1 hour
- Testing: 30 min

**Feature 3 (Team Ordering & GDC):** 2-3 hours
- Schema updates: 30 min
- Plugin configuration: 30 min
- Frontend updates: 1 hour
- Testing: 30 min

**Feature 4 (SEO & Navigation):** 3-4 hours
- Metadata updates: 1 hour
- Structured data: 1 hour
- Favicon generation: 1 hour
- Navigation update: 30 min
- Sitemap/robots: 30 min
- Testing: 30 min

**Total:** 11-15 hours

---

## Success Metrics

### Immediate (Post-Launch)
- All features functional without errors
- Sanity CMS content editable by non-technical users
- Site passes SEO validation tools
- Favicon displays across all devices

### Short-Term (1-4 weeks)
- Google indexes new metadata
- Structured data appears in Google Search Console
- Site appears for "dentist milton keynes" searches (may be on page 2-3 initially)

### Long-Term (2-6 months)
- Improved rankings for target keywords
- Increased organic traffic from local searches
- More "near me" search visibility
- Better click-through rates from search results

---

## Rollback Plan

Each feature can be rolled back independently:

**Feature 1:** Revert to hardcoded image paths in components  
**Feature 2:** Restore hardcoded logos-img.png section  
**Feature 3:** Query can fall back to _createdAt ordering, GDC conditional already safe  
**Feature 4:** Revert metadata changes, remove structured data script, restore Home button

All changes are non-destructive to existing data.
