# CMS, SEO, and UI Enhancements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Sanity CMS controls for hero images and partners, improve SEO for local search, add team ordering, and fix GDC display issues.

**Architecture:** Feature-by-feature implementation adding new Sanity schemas (siteSettings, trustedPartner) with orderable lists, updating frontend components to consume CMS data, adding comprehensive SEO metadata and structured data, creating favicon assets, and updating navigation.

**Tech Stack:** Next.js 15, Sanity CMS, TypeScript, React, @sanity/orderable-document-list plugin

## Global Constraints

- Next.js 15.5.14 required
- Sanity 3.92+ required  
- TypeScript strict mode enabled
- All new dependencies must be installed via npm
- Maintain existing color scheme and design system
- All images optimized via Sanity CDN
- Fallback to existing hardcoded paths if CMS data unavailable
- Logo must maintain #126C9F brand color
- Preserve existing responsive breakpoints (md:, lg:, xl:)

---

### Task 1: Install Dependencies and Create Site Settings Schema

**Files:**
- Create: `sanity/schemaTypes/siteSettings.ts`
- Modify: `sanity/schemaTypes/index.ts:1-18`
- Modify: `sanity.config.ts:1-30`
- Modify: `package.json:1-46`

**Interfaces:**
- Consumes: N/A (first task)
- Produces: `siteSettings` schema type with fields `homeHeroImage` and `aboutHeroImage`, each with nested `asset` and `alt` fields. Plugin `@sanity/orderable-document-list` installed.

- [ ] **Step 1: Install required dependencies**

```bash
npm install @sanity/orderable-document-list
```

Run: `npm install @sanity/orderable-document-list`
Expected: Package installed successfully

- [ ] **Step 2: Create siteSettings schema file**

```typescript
// sanity/schemaTypes/siteSettings.ts
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
```

- [ ] **Step 3: Update schema index to include siteSettings**

```typescript
// sanity/schemaTypes/index.ts
import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {treatmentsType} from './treatmentsType'
import {treatmentsCategoryType} from './treatmentsCategoryType'
import {Team} from './team'
import {authorType} from './authorType'
import {Fees} from './fees'
import calloutType from './calloutType'
import {accordionType} from './accordionType'
import { bookingLink } from './bookingLink'
import {testimonialsType} from './testimonialsType'
import {siteSettings} from './siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType, Team, treatmentsType, treatmentsCategoryType, calloutType, accordionType, Fees, bookingLink, testimonialsType, siteSettings],
}
```

- [ ] **Step 4: Configure Sanity Studio with singleton plugin**

```typescript
// sanity.config.ts
'use client'

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `\app\sanitycms\[[...tool]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import { table } from '@sanity/table'
import {defineConfig, SingletonPluginOptions} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'

const singletonActions = new Set(['publish', 'discardChanges', 'restore'])
const singletonTypes = new Set(['siteSettings'])

export default defineConfig({
  basePath: '/sanitycms',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
    table(),
  ],
  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({action}) => action && singletonActions.has(action))
        : input,
  },
})
```

- [ ] **Step 5: Update Sanity structure for easy sidebar access**

Create or modify `sanity/structure.ts`:

```typescript
import {CogIcon} from '@sanity/icons'
import {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'siteSettings'
      ),
    ])
```

- [ ] **Step 6: Commit changes**

```bash
git add package.json package-lock.json sanity/schemaTypes/siteSettings.ts sanity/schemaTypes/index.ts sanity.config.ts sanity/structure.ts
git commit -m "feat: add site settings schema for hero images

- Install @sanity/orderable-document-list plugin
- Create siteSettings singleton schema
- Configure Sanity Studio with singleton plugin
- Add Settings to Studio sidebar

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 2: Add Site Settings Query and Update Homepage

**Files:**
- Modify: `lib/queries.ts:1-126`
- Modify: `app/page.tsx:1-212`

**Interfaces:**
- Consumes: `siteSettings` schema from Task 1
- Produces: `siteSettingsQuery` returning object with `homeHeroImage: {asset: {_id: string, url: string}, alt: string}` and `aboutHeroImage` with same structure. Homepage displays CMS-controlled hero image.

- [ ] **Step 1: Add siteSettings query**

```typescript
// lib/queries.ts - Add after bookingLinkQuery
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

- [ ] **Step 2: Import urlFor utility in homepage**

Add import at top of `app/page.tsx`:

```typescript
import { urlFor } from "@/lib/imageBuilder";
import { siteSettingsQuery } from "@/lib/queries";
```

- [ ] **Step 3: Add state for hero image**

In `app/page.tsx` after `const [bookingLink, setBookingLink] = useState("");`:

```typescript
const [heroImage, setHeroImage] = useState("");
const [heroImageAlt, setHeroImageAlt] = useState("");
```

- [ ] **Step 4: Add fetch logic for site settings**

Update the useEffect in `app/page.tsx`:

```typescript
useEffect(() => {
  const fetchLink = async () => {
    const data = await sanityClient.fetch(bookingLinkQuery);
    setBookingLink(data?.bookingLink || "");
  };
  
  const fetchSettings = async () => {
    const data = await sanityClient.fetch(siteSettingsQuery);
    if (data?.homeHeroImage) {
      setHeroImage(urlFor(data.homeHeroImage).width(600).url());
      setHeroImageAlt(data.homeHeroImage.alt || "Stratford House Dental Practice hero");
    }
  };
  
  fetchLink();
  fetchSettings();
}, []);
```

- [ ] **Step 5: Update hero image element**

Replace lines 61-65 in `app/page.tsx`:

```typescript
<img 
  src={heroImage || "/images/hero-img.png"} 
  className="inline-block" 
  alt={heroImageAlt || "Stratford House Dental Practice"} 
/>
```

- [ ] **Step 6: Test in browser**

Run: `npm run dev`
Expected: Homepage loads successfully, hero image displays (fallback if CMS empty)

- [ ] **Step 7: Commit changes**

```bash
git add lib/queries.ts app/page.tsx
git commit -m "feat: add CMS control for homepage hero image

- Add siteSettingsQuery to lib/queries
- Fetch and display homepage hero image from CMS
- Maintain fallback to hardcoded image
- Add proper alt text support

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 3: Update About Page Hero Image

**Files:**
- Modify: `app/(pages)/about/page.tsx:1-101`

**Interfaces:**
- Consumes: `siteSettingsQuery` from Task 2
- Produces: About page displays CMS-controlled hero image

- [ ] **Step 1: Import necessary utilities**

Add imports to `app/(pages)/about/page.tsx`:

```typescript
import { urlFor } from "@/lib/imageBuilder";
import { siteSettingsQuery } from "@/lib/queries";
```

- [ ] **Step 2: Add state for hero image**

After the existing `const [loading, setLoading] = useState(true);`:

```typescript
const [aboutImage, setAboutImage] = useState("");
const [aboutImageAlt, setAboutImageAlt] = useState("");
```

- [ ] **Step 3: Update useEffect to fetch settings**

Modify the useEffect:

```typescript
useEffect(() => {
  const fetchData = async () => {
    const teamData = await sanityClient.fetch(allTeamQuery);
    setTeam(teamData);
    
    const settings = await sanityClient.fetch(siteSettingsQuery);
    if (settings?.aboutHeroImage) {
      setAboutImage(urlFor(settings.aboutHeroImage).width(1270).url());
      setAboutImageAlt(settings.aboutHeroImage.alt || "About Stratford House Dental Practice");
    }
    
    setLoading(false);
  };
  fetchData();
}, []);
```

- [ ] **Step 4: Update about hero image element**

Replace line 43:

```typescript
<img 
  src={aboutImage || "/images/about-img2.png"} 
  className='md:mb-8 mb-6' 
  alt={aboutImageAlt || "About Stratford House Dental Practice"} 
/>
```

- [ ] **Step 5: Test in browser**

Run: `npm run dev`
Navigate to `/about`
Expected: About page hero image displays correctly, fallback works

- [ ] **Step 6: Commit changes**

```bash
git add app/\(pages\)/about/page.tsx
git commit -m "feat: add CMS control for about page hero image

- Fetch and display about hero image from CMS
- Maintain fallback to hardcoded image
- Add proper alt text support

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 4: Create Trusted Partner Schema

**Files:**
- Create: `sanity/schemaTypes/trustedPartner.ts`
- Modify: `sanity/schemaTypes/index.ts:1-18`
- Modify: `sanity.config.ts:1-40`

**Interfaces:**
- Consumes: `@sanity/orderable-document-list` from Task 1
- Produces: `trustedPartner` document type with fields: `name` (string), `logo` (image with alt), `websiteUrl` (url, optional), `description` (text, optional), `order` (number, hidden). Orderable in Sanity Studio via drag-and-drop.

- [ ] **Step 1: Create trustedPartner schema**

```typescript
// sanity/schemaTypes/trustedPartner.ts
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
      name: 'order',
      title: 'Display Order',
      type: 'number',
      hidden: true,
    }),
  ],
  orderings: [
    {
      title: 'Manual Order',
      name: 'manualOrder',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
})
```

- [ ] **Step 2: Update schema index**

```typescript
// sanity/schemaTypes/index.ts
import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {treatmentsType} from './treatmentsType'
import {treatmentsCategoryType} from './treatmentsCategoryType'
import {Team} from './team'
import {authorType} from './authorType'
import {Fees} from './fees'
import calloutType from './calloutType'
import {accordionType} from './accordionType'
import { bookingLink } from './bookingLink'
import {testimonialsType} from './testimonialsType'
import {siteSettings} from './siteSettings'
import {trustedPartner} from './trustedPartner'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType, Team, treatmentsType, treatmentsCategoryType, calloutType, accordionType, Fees, bookingLink, testimonialsType, siteSettings, trustedPartner],
}
```

- [ ] **Step 3: Configure orderable list in Sanity config**

```typescript
// sanity.config.ts
'use client'

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `\app\sanitycms\[[...tool]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import { table } from '@sanity/table'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'

const singletonActions = new Set(['publish', 'discardChanges', 'restore'])
const singletonTypes = new Set(['siteSettings'])

export default defineConfig({
  basePath: '/sanitycms',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({
      structure: (S, context) => {
        return S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            orderableDocumentListDeskItem({
              type: 'trustedPartner',
              title: 'Trusted Partners',
              S,
              context,
            }),
            ...S.documentTypeListItems().filter(
              (item) => !['siteSettings', 'trustedPartner'].includes(item.getId()!)
            ),
          ])
      },
    }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
    table(),
  ],
  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({action}) => action && singletonActions.has(action))
        : input,
  },
})
```

- [ ] **Step 4: Commit changes**

```bash
git add sanity/schemaTypes/trustedPartner.ts sanity/schemaTypes/index.ts sanity.config.ts
git commit -m "feat: add trusted partner schema with ordering

- Create trustedPartner document type
- Configure drag-and-drop ordering in Studio
- Add fields for logo, name, URL, description

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 5: Create TrustedPartners Component and Update Homepage

**Files:**
- Create: `app/components/TrustedPartners.tsx`
- Modify: `lib/queries.ts:1-140`
- Modify: `app/page.tsx:1-220`

**Interfaces:**
- Consumes: `trustedPartner` schema from Task 4
- Produces: `trustedPartnersQuery` returning array of partners sorted by order. `TrustedPartners` component accepting `partners: {_id: string, name: string, logo: {asset: {_id: string, url: string}, alt: string}, websiteUrl?: string}[]` prop. Homepage displays dynamic partner logos.

- [ ] **Step 1: Add trusted partners query**

```typescript
// lib/queries.ts - Add after siteSettingsQuery
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

- [ ] **Step 2: Create TrustedPartners component**

```typescript
// app/components/TrustedPartners.tsx
'use client'

import { urlFor } from '@/lib/imageBuilder'
import { motion } from 'framer-motion'

type Partner = {
  _id: string
  name: string
  logo: {
    asset: {
      _id: string
      url: string
    }
    alt: string
  }
  websiteUrl?: string
  description?: string
}

export default function TrustedPartners({ partners }: { partners: Partner[] }) {
  if (!partners || partners.length === 0) {
    return null
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

- [ ] **Step 3: Update homepage to use TrustedPartners**

Add import to `app/page.tsx`:

```typescript
import TrustedPartners from "./components/TrustedPartners";
import { trustedPartnersQuery } from "@/lib/queries";
```

Add state after heroImage state:

```typescript
const [partners, setPartners] = useState([]);
```

Add fetch in useEffect:

```typescript
const fetchPartners = async () => {
  const data = await sanityClient.fetch(trustedPartnersQuery);
  setPartners(data || []);
};

// Add to existing useEffect
fetchPartners();
```

Replace the section at lines 201-208:

```typescript
<TrustedPartners partners={partners} />
```

- [ ] **Step 4: Test in browser**

Run: `npm run dev`
Expected: Homepage loads, partner section hidden if no partners

- [ ] **Step 5: Commit changes**

```bash
git add lib/queries.ts app/components/TrustedPartners.tsx app/page.tsx
git commit -m "feat: add dynamic trusted partners section

- Create TrustedPartners component with motion effects
- Add trustedPartnersQuery to fetch ordered partners
- Replace hardcoded logos with CMS-driven display
- Support clickable logos with external URLs

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 6: Update Team Schema with Ordering

**Files:**
- Modify: `sanity/schemaTypes/team.ts:1-74`
- Modify: `sanity.config.ts:1-50`

**Interfaces:**
- Consumes: `@sanity/orderable-document-list` from Task 1
- Produces: Updated `team` schema with `order` field (number, hidden, initialValue 999). Orderable in Sanity Studio. `gdn_no` field is optional.

- [ ] **Step 1: Update team schema**

```typescript
// sanity/schemaTypes/team.ts
import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

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
```

- [ ] **Step 2: Configure orderable team list in Sanity config**

Update the structure section in `sanity.config.ts`:

```typescript
// In the structureTool plugin configuration
structure: (S, context) => {
  return S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.divider(),
      orderableDocumentListDeskItem({
        type: 'trustedPartner',
        title: 'Trusted Partners',
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: 'team',
        title: 'Team Members',
        S,
        context,
      }),
      ...S.documentTypeListItems().filter(
        (item) => !['siteSettings', 'trustedPartner', 'team'].includes(item.getId()!)
      ),
    ])
},
```

- [ ] **Step 3: Commit changes**

```bash
git add sanity/schemaTypes/team.ts sanity.config.ts
git commit -m "feat: add ordering to team members schema

- Add order field with default value 999
- Configure drag-and-drop in Studio
- Make GDC number optional
- Add manual ordering option

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 7: Update Team Query and Fix GDC Display

**Files:**
- Modify: `lib/queries.ts:1-145`
- Modify: `app/components/TeamSection.tsx:1-108`

**Interfaces:**
- Consumes: Updated `team` schema from Task 6
- Produces: Updated `allTeamQuery` returning teams ordered by `order` field then `_createdAt`, including `order` field. `TeamSection` component only displays GDC when `gdn_no` exists and > 0.

- [ ] **Step 1: Update team query**

```typescript
// lib/queries.ts - Replace existing allTeamQuery
export const allTeamQuery = groq`*[_type == "team"] | order(order asc, _createdAt asc) {
  _id,
  title,
  slug,
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

- [ ] **Step 2: Update TeamSection GDC display logic**

In `app/components/TeamSection.tsx`, replace lines 92-96:

```typescript
{member.gdn_no && member.gdn_no > 0 && (
  <span className='text-base font-normal leading-6 text-tertiary-600'>
    GDC No: {member.gdn_no}
  </span>
)}
```

- [ ] **Step 3: Test in browser**

Run: `npm run dev`
Navigate to `/about`
Expected: Team members display in correct order, GDC only shows when filled

- [ ] **Step 4: Commit changes**

```bash
git add lib/queries.ts app/components/TeamSection.tsx
git commit -m "feat: add team ordering and fix GDC display

- Update query to sort by order field then creation date
- Only display GDC number when value exists and > 0
- Include order field in query response

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 8: Update SEO Metadata

**Files:**
- Modify: `app/layout.tsx:1-19`

**Interfaces:**
- Consumes: N/A
- Produces: Updated `metadata` object with comprehensive SEO fields including title template, keywords, Open Graph, Twitter cards, and robots configuration.

- [ ] **Step 1: Update layout metadata**

```typescript
// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-inter-display antialiased`}>{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Verify metadata in browser**

Run: `npm run dev`
Expected: Browser tab shows new title, view page source shows meta tags

- [ ] **Step 3: Commit changes**

```bash
git add app/layout.tsx
git commit -m "feat: enhance SEO metadata

- Update site title for local search visibility
- Add comprehensive keywords for Milton Keynes area
- Configure Open Graph for social sharing
- Add Twitter card metadata
- Optimize robots configuration

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 9: Add Structured Data Component

**Files:**
- Create: `app/components/StructuredData.tsx`
- Modify: `app/layout.tsx:1-80`

**Interfaces:**
- Consumes: N/A
- Produces: `StructuredData` component generating JSON-LD schema for `Dentist` business type with placeholder values for address, phone, hours. Component outputs `<script type="application/ld+json">` element.

- [ ] **Step 1: Create StructuredData component**

```typescript
// app/components/StructuredData.tsx
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
    "telephone": "+44-1908-313109", // Update with actual phone if different
    "email": "info@stratfordhousedentalpractice.co.uk", // Update with actual email
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Stratford House, [Street Address]", // TODO: Add actual address
      "addressLocality": "Wolverton",
      "addressRegion": "Milton Keynes",
      "postalCode": "MK12 XXX", // TODO: Add actual postcode
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "52.XXXXX", // TODO: Add actual coordinates
      "longitude": "-0.XXXXX"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "17:00"
      }
      // TODO: Add actual opening hours
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
      "ratingValue": "4.8", // TODO: Add actual rating if available
      "reviewCount": "50" // TODO: Add actual count if available
    },
    "sameAs": [
      // TODO: Add social media URLs when available
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

- [ ] **Step 2: Add StructuredData to layout**

```typescript
// app/layout.tsx - Add import
import StructuredData from './components/StructuredData'

// Update the HTML structure
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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

- [ ] **Step 3: Test structured data**

Run: `npm run dev`
View page source, search for `application/ld+json`
Expected: JSON-LD script tag present with dentist schema

- [ ] **Step 4: Validate structured data**

Visit: https://search.google.com/test/rich-results
Test URL: http://localhost:3000
Expected: Dentist schema detected (with warnings for placeholder data)

- [ ] **Step 5: Commit changes**

```bash
git add app/components/StructuredData.tsx app/layout.tsx
git commit -m "feat: add structured data for local business

- Create StructuredData component with JSON-LD schema
- Add Dentist business type markup
- Include address, phone, hours (placeholders for actual data)
- Configure areas served and ratings
- Improve local search visibility

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 10: Create Robots.txt and Sitemap

**Files:**
- Create: `public/robots.txt`
- Create: `app/sitemap.ts`

**Interfaces:**
- Consumes: N/A
- Produces: `robots.txt` file with sitemap reference and disallow rules for admin paths. Dynamic `sitemap.ts` generating sitemap for main pages with priorities and change frequencies.

- [ ] **Step 1: Create robots.txt**

```txt
User-agent: *
Allow: /
Sitemap: https://stratfordhousedentalpractice.co.uk/sitemap.xml

User-agent: *
Disallow: /api/
Disallow: /sanity/
Disallow: /sanitycms/
```

Create file at: `public/robots.txt`

- [ ] **Step 2: Create sitemap generator**

```typescript
// app/sitemap.ts
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

- [ ] **Step 3: Verify robots.txt and sitemap**

Run: `npm run dev`
Visit: http://localhost:3000/robots.txt
Expected: Robots.txt content visible

Visit: http://localhost:3000/sitemap.xml
Expected: XML sitemap with all pages

- [ ] **Step 4: Commit changes**

```bash
git add public/robots.txt app/sitemap.ts
git commit -m "feat: add robots.txt and dynamic sitemap

- Create robots.txt with sitemap reference
- Disallow admin and API paths
- Generate dynamic XML sitemap with priorities
- Configure change frequencies for pages

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 11: Generate Favicon Assets

**Files:**
- Create: `public/favicon.ico`
- Create: `public/favicon-16x16.png`
- Create: `public/favicon-32x32.png`
- Create: `public/apple-touch-icon.png`
- Create: `public/android-chrome-192x192.png`
- Create: `public/android-chrome-512x512.png`
- Create: `public/manifest.json`
- Modify: `app/layout.tsx:1-90`

**Interfaces:**
- Consumes: Circular portion of logo.svg (excluding text)
- Produces: Multiple favicon files in various sizes, manifest.json for PWA support. Layout metadata includes icon configuration.

- [ ] **Step 1: Extract circular logo from SVG**

The logo.svg contains a bitmap image embedded as base64. We need to extract just the circular logo portion (excluding the "STRATFORD HOUSE DENTAL PRACTICE" text).

Note: This will require manual extraction using an image editor to:
1. Extract the base64 image data
2. Decode to PNG
3. Crop to circular logo only (removing text)
4. Save as source for favicon generation

Due to the complexity of the embedded image, recommend using an online tool or image editor.

- [ ] **Step 2: Generate favicon sizes**

Using the extracted circular logo, create:
- 16x16 PNG → `public/favicon-16x16.png`
- 32x32 PNG → `public/favicon-32x32.png`
- 180x180 PNG → `public/apple-touch-icon.png`
- 192x192 PNG → `public/android-chrome-192x192.png`
- 512x512 PNG → `public/android-chrome-512x512.png`
- Multi-resolution ICO (16x16, 32x32) → `public/favicon.ico`

Recommended tool: https://realfavicongenerator.net/

- [ ] **Step 3: Create manifest.json**

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

Create at: `public/manifest.json`

- [ ] **Step 4: Update layout metadata with icons**

```typescript
// app/layout.tsx - Update metadata object
export const metadata: Metadata = {
  // ... existing metadata fields
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

- [ ] **Step 5: Test favicon display**

Run: `npm run dev`
Expected: Favicon appears in browser tab

Test on mobile: Add to homescreen
Expected: Custom icon appears

- [ ] **Step 6: Commit changes**

```bash
git add public/favicon.ico public/favicon-16x16.png public/favicon-32x32.png public/apple-touch-icon.png public/android-chrome-192x192.png public/android-chrome-512x512.png public/manifest.json app/layout.tsx
git commit -m "feat: add favicon and PWA manifest

- Extract circular logo from brand logo
- Generate multiple favicon sizes for all devices
- Create PWA manifest with brand colors
- Configure icon metadata in layout
- Support iOS and Android homescreen icons

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 12: Remove Home Button from Navigation

**Files:**
- Modify: `app/components/Header.tsx:1-92`

**Interfaces:**
- Consumes: N/A
- Produces: Header component with "Home" menu item removed. Logo remains clickable and links to homepage.

- [ ] **Step 1: Remove Home menu item**

In `app/components/Header.tsx`, delete lines 39-43:

```typescript
// DELETE THESE LINES:
<li className="w-full lg:w-auto">
  <Link className={`text-lg font-medium leading-6 block transition-all duration-300 rounded-md px-2 ${pathname === '/' ? 'bg-blue-1000 text-white shadow-md' : 'text-black hover:bg-blue-50 hover:text-blue-1000'}`} href="/">
  Home
  </Link>
</li>
```

The resulting navigation should start with "About Us" as the first item.

- [ ] **Step 2: Verify logo still links to home**

Confirm line 35 still has:

```typescript
<Link href="/" className='hover:opacity-70 transition-all duration-300'>
```

Expected: Logo wraps homepage link

- [ ] **Step 3: Test navigation**

Run: `npm run dev`
Expected: Home button removed, About Us is first menu item, logo still clickable

Test mobile menu:
Expected: Home button also removed from mobile menu

- [ ] **Step 4: Commit changes**

```bash
git add app/components/Header.tsx
git commit -m "refactor: remove redundant Home button from navigation

- Remove Home menu item from desktop navigation
- Remove Home menu item from mobile navigation
- Logo already serves as home link
- Cleaner navigation UI

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

### Task 13: Final Testing and Documentation

**Files:**
- Create: `docs/CMS_USAGE.md`

**Interfaces:**
- Consumes: All completed tasks
- Produces: Documentation for CMS usage, testing verification checklist completed.

- [ ] **Step 1: Comprehensive testing checklist**

Test each feature:

**Hero Images:**
- [ ] Upload home hero image in Sanity
- [ ] Verify displays on homepage
- [ ] Upload about hero image
- [ ] Verify displays on about page
- [ ] Clear images, verify fallbacks work
- [ ] Check alt text displays properly

**Trusted Partners:**
- [ ] Create 8 partner entries in Sanity
- [ ] Add logos for each partner
- [ ] Test drag-and-drop reordering
- [ ] Verify order reflected on homepage
- [ ] Test with/without website URLs
- [ ] Verify hover effects work
- [ ] Check grayscale/color transition

**Team Ordering:**
- [ ] Drag team members to reorder in Sanity
- [ ] Verify order on about page
- [ ] Add team member without GDC number
- [ ] Verify GDC field hidden
- [ ] Add team member with GDC = 0
- [ ] Verify GDC field hidden
- [ ] Add team member with valid GDC
- [ ] Verify GDC displays

**SEO & Navigation:**
- [ ] Check browser tab title
- [ ] Verify favicon displays
- [ ] View page source, check meta tags
- [ ] Verify structured data present
- [ ] Test robots.txt accessible
- [ ] Test sitemap.xml accessible
- [ ] Verify Home button removed
- [ ] Test logo links to homepage

- [ ] **Step 2: Create CMS usage documentation**

```markdown
# CMS Usage Guide

## Site Settings

Access: Sanity Studio → Site Settings

### Hero Images

**Homepage Hero Image:**
1. Navigate to Site Settings
2. Upload image to "Home Page Hero Image"
3. Add descriptive alt text
4. Publish changes
5. Verify on homepage

**About Page Hero Image:**
1. Navigate to Site Settings
2. Upload image to "About Page Hero Image"
3. Add descriptive alt text
4. Publish changes
5. Verify on /about page

**Image Recommendations:**
- Format: JPG or PNG
- Homepage: 600px wide minimum
- About page: 1270px wide minimum
- Aspect ratio: 16:9 or wider
- File size: Under 500KB for optimal performance

## Trusted Partners

Access: Sanity Studio → Trusted Partners

### Adding a Partner

1. Click "Create" or "+" button
2. Fill in required fields:
   - **Partner Name:** Full name of partner/accreditation
   - **Partner Logo:** Upload logo image
   - **Alt Text:** Describe logo for accessibility
3. Optional fields:
   - **Website URL:** External partner website
   - **Description:** Brief partnership description
4. Publish

### Reordering Partners

1. Open Trusted Partners list
2. Drag and drop partners to desired order
3. Changes save automatically
4. Verify order on homepage

**Logo Recommendations:**
- Format: PNG with transparency preferred
- Size: 150px wide minimum
- Aspect ratio: Maintain original
- Background: Transparent or white

## Team Members

Access: Sanity Studio → Team Members

### Adding a Team Member

1. Create new team member
2. Fill in details:
   - **Title:** Member name
   - **Position:** Job title
   - **GDC Number:** Optional registration number
   - **Main Image:** Member photo
   - **Body:** Biography (rich text)
3. Publish

### Reordering Team

1. Open Team Members list
2. Drag and drop to reorder
3. Changes save automatically
4. Verify order on /about page

**Photo Recommendations:**
- Format: JPG or PNG
- Size: 231px height minimum
- Aspect ratio: 1:1 (square) preferred
- Background: Professional setting

### GDC Number Display

- Leave empty if member doesn't have GDC registration
- Enter 0 to explicitly hide the field
- GDC numbers > 0 will display publicly
- Used for dentists and clinical staff

## Best Practices

### Images

- Always add descriptive alt text
- Optimize images before upload
- Use consistent aspect ratios
- Test on mobile devices

### Content

- Publish changes to make them live
- Preview before publishing
- Keep partner descriptions brief
- Maintain professional tone

### Ordering

- Most important partners/team at the top
- Drag and drop is immediate
- No need to save after reordering
- Changes reflect immediately on site

## Troubleshooting

**Image not showing:**
- Check image published in Sanity
- Verify image asset uploaded correctly
- Clear browser cache
- Check alt text present

**Order not updating:**
- Verify changes published
- Check "order" field populated
- Clear browser cache
- Contact developer if persists

**GDC number showing when empty:**
- Ensure field truly empty or set to 0
- Re-save member profile
- Contact developer if persists
```

Create at: `docs/CMS_USAGE.md`

- [ ] **Step 3: Run final build test**

```bash
npm run build
```

Run: `npm run build`
Expected: Build completes without errors

- [ ] **Step 4: Create completion commit**

```bash
git add docs/CMS_USAGE.md
git commit -m "docs: add CMS usage guide

- Document hero image management
- Document trusted partners workflow
- Document team member ordering
- Include image recommendations
- Add troubleshooting section

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

- [ ] **Step 5: Create summary of changes**

Document completed:
- ✅ Hero images configurable in CMS
- ✅ Trusted partners with drag-and-drop ordering
- ✅ Team member ordering
- ✅ GDC number conditional display
- ✅ SEO metadata optimization
- ✅ Structured data for local business
- ✅ Robots.txt and sitemap
- ✅ Favicon multi-size support
- ✅ PWA manifest
- ✅ Home button removed from navigation

Known limitations/TODO:
- Favicon extraction requires manual work (logo.svg has embedded bitmap)
- Structured data contains placeholder values (address, coordinates, hours)
- Partner logos need individual extraction from logos-img.png
- No email/phone validation in structured data

---

## Post-Implementation Notes

### Manual Steps Required

1. **Favicon Generation:**
   - Extract circular logo from logo.svg using image editor
   - Generate multiple sizes using favicon generator tool
   - Upload to public/ directory
   - Maintain #126C9F brand color

2. **Partner Logo Extraction:**
   - Open images/logos-img.png in image editor
   - Crop each of 8 logos individually
   - Save as transparent PNGs
   - Upload to Sanity as partner entries

3. **Structured Data Completion:**
   - Update telephone number in StructuredData.tsx
   - Update email address
   - Add complete street address
   - Add postcode
   - Add GPS coordinates
   - Update opening hours
   - Add social media URLs if available
   - Update rating/review counts if available

### Testing Recommendations

1. **Browser Testing:**
   - Chrome (desktop & mobile)
   - Safari (desktop & mobile)
   - Firefox
   - Edge

2. **Device Testing:**
   - Desktop (1920x1080)
   - Tablet (768x1024)
   - Mobile (375x667)

3. **SEO Validation:**
   - Google Rich Results Test
   - Google Search Console verification
   - Meta tag validator
   - Structured data testing tool

4. **Accessibility:**
   - Screen reader testing
   - Keyboard navigation
   - Alt text verification
   - Color contrast checks

### Deployment Checklist

- [ ] All tests passing
- [ ] Build successful
- [ ] Favicon assets generated
- [ ] Partner logos uploaded to Sanity
- [ ] Structured data placeholders replaced
- [ ] CMS content added for testing
- [ ] Documentation reviewed
- [ ] Backup of current production
- [ ] Deploy to staging environment
- [ ] Staging validation
- [ ] Deploy to production
- [ ] Post-deployment smoke test
- [ ] Submit sitemap to Google Search Console
- [ ] Monitor search console for errors

### Performance Optimization

All images served through Sanity CDN are automatically optimized. No additional optimization required for:
- Hero images
- Partner logos  
- Team member photos

Consider future enhancements:
- Image lazy loading (Next.js Image component)
- WebP format conversion
- Responsive image srcsets
- CDN caching configuration

### Security Notes

- All Sanity queries are read-only on frontend
- No sensitive data in structured schema
- Admin paths blocked in robots.txt
- CORS configured in Sanity dashboard
- Content Security Policy headers recommended

---

## Success Metrics

### Immediate (Post-Launch)
- All features functional without errors
- Sanity CMS content editable by non-technical users
- Site passes SEO validation tools
- Favicon displays across all devices
- No console errors in browser

### Short-Term (1-4 weeks)
- Google indexes new metadata
- Structured data appears in Google Search Console
- Site appears for "dentist milton keynes" searches
- Improved click-through rates from search

### Long-Term (2-6 months)
- Improved rankings for target keywords
- Increased organic traffic from local searches
- More "near me" search visibility
- Better engagement metrics (time on site, pages per session)
