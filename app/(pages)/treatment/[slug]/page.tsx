import { Metadata } from 'next'
import { sanityClient } from '@/lib/sanity'
import { treatmentsBySlugQuery } from '@/lib/queries'
import { urlFor } from '@/lib/imageBuilder'
import Contact from '@/app/components/Contact'
import Footer from '@/app/components/Footer'
import Header from '@/app/components/Header'
import { PortableText } from '@portabletext/react'
import { PortableTextComponents } from '@portabletext/react'

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const treatment = await sanityClient.fetch(treatmentsBySlugQuery, { slug: resolvedParams.slug })

  return {
    title: treatment?.title || 'Treatments',
    description: treatment?.description || '',
  }
}


const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold mb-2">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="mb-4">{children}</p>
    ),
  },
  types: {
    image: ({ value }) => (
      <div className="my-8">
        <img
          src={urlFor(value).url()}
          alt={value.alt || ''}
          className="lg:w-1/2 w-full h-auto max-h-[464px] object-contain img-wrap-cms"
        />
      </div>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noopener noreferrer' : undefined
      const target = !value.href.startsWith('/') ? '_blank' : undefined
      return (
        <a href={value.href} target={target} rel={rel} className="text-blue-600 hover:underline">
          {children}
        </a>
      )
    },
  },
}


export default async function ArticlePage({ params }: PageProps) {
  const treatments = await sanityClient.fetch(treatmentsBySlugQuery, { slug: params.slug })

  const titleParts = [
    { tag: "h1" as const, text: treatments?.title || "Treatments" },
  ]

  return (
    <div>
      <Header />
      <section className="bg-blue-1100 max-h-[287px] md:min-h-[287px] min-h-[165px] flex items-center relative">
        <div className="xl:max-w-[1270px] w-full max-w-[952px] relative md:px-5 px-4 mx-auto">
          <h4 className='text-lg font-medium text-blue-1400 mb-2'>The Treatments We Offer</h4>
          {titleParts.map((part, i) => {
            const Tag = part.tag;
            const className =
              part.tag === "h1"
                ? "md:text-[56px] text-[32px] sm:max-w-full max-w-[315px] font-medium leading-[125%] text-white"
                : "text-lg font-medium leading-[125%] text-blue-1400";

            return (
              <Tag key={i} className={className}>
                {part.text}
              </Tag>
            );
          })}
        </div>
        <div className="absolute right-0 md:top-0 md:bottom-auto bottom-0">
          <img src="/images/cube-icon2.png" className="md:w-auto w-[86px]" alt="" />
        </div>
      </section>
      <section className='md:py-[105px] pt-10'>
        <div className="xl:max-w-[1270px] w-full max-w-[952px] relative md:px-5 px-4 mx-auto">
          {treatments?.mainImage && (
            <img 
              src={urlFor(treatments.mainImage).url()} 
              alt={treatments.mainImage.alt || treatments.title}
              className='mb-8 w-full h-auto max-h-[511px] object-cover'
            />
          )}
          <h2 className='md:text-[40px] text-2xl md:mb-5 mb-2.5 font-medium md:leading-[44px] leading-7 text-blue-1300'>
            {treatments?.title}
          </h2>
          <p className='lg:text-lg text-base text-black pb-16'>{treatments?.description}</p>
          <div className='prose max-w-none prose-right flex flex-col items-start justify-center relative lg:py-12 py-8'>
            {treatments?.body && <PortableText value={treatments.body} components={components} />}
          </div>

          {treatments?.richText_row_1 && (
            <div className='prose max-w-none prose-left flex flex-col items-end justify-center relative lg:py-12 py-8'>
              <PortableText value={treatments.richText_row_1} components={components} />
            </div>
          )}
         {treatments?.richText_row_2 && (
          <div className='prose max-w-none prose-right flex flex-col items-start justify-center relative lg:py-12 py-8'>
            {treatments?.body && <PortableText value={treatments.richText_row_2} components={components} />}
          </div>
             )}
          {treatments?.richText_row_3 && (
            <div className='prose max-w-none prose-left flex flex-col items-end justify-center relative lg:py-12 py-8'>
              <PortableText value={treatments.richText_row_3} components={components} />
            </div>
          )}
            {treatments?.richText_row_4 && (
          <div className='prose max-w-none prose-right flex flex-col items-start justify-center relative lg:py-12 py-8'>
            {treatments?.body && <PortableText value={treatments.richText_row_4} components={components} />}
          </div>
             )}
        </div>
      </section>
      <Contact />
      <Footer />
    </div>
  )
}
