import { Metadata } from 'next'
import { sanityClient } from '@/lib/sanity'
import { articleBySlugQuery } from '@/lib/queries'
import { urlFor } from '@/lib/imageBuilder'
import Appointment from '@/app/components/Appoinment';
import Footer from '@/app/components/Footer'
import Header from '@/app/components/Header'
import { PortableText } from '@portabletext/react'
import { PortableTextComponents } from '@portabletext/react'
import AccordionBlockDynamic from '@/components/AccordionBlockDynamic';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await sanityClient.fetch(`*[_type == "article"]{ "slug": slug.current }`);
  return slugs.map((slug: { slug: string }) => ({
    slug: slug.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params; // Resolve the Promise
  const article = await sanityClient.fetch(articleBySlugQuery, { slug: resolvedParams.slug });

  return {
    title: article?.title || 'Article',
    description: article?.description || '',
  };
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
          className="lg:w-1/2 w-full h-auto max-h-[464px] img-wrap-cms"
        />
      </div>
    ),
    accordion: ({ value }) => <AccordionBlockDynamic value={value} />, // Only pass value, not components
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
  const resolvedParams = await params; // Resolve the Promise
  const article = await sanityClient.fetch(articleBySlugQuery, { slug: resolvedParams.slug })

  const titleParts = [
    { tag: "h1" as const, text: article?.title || "Article" },
  ]

  return (
    <div>
      <Header />
      <section className="bg-blue-1100 max-h-[287px] md:min-h-[287px] min-h-[165px] flex items-center relative">
        <div className="xl:max-w-[1270px] w-full max-w-[952px] relative md:px-5 px-4 mx-auto">
          <h4 className='text-lg font-medium text-blue-1400 mb-2'>Our latest news</h4>
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
          {article?.mainImage && (
            <img 
              src={urlFor(article.mainImage).url()} 
              alt={article.mainImage.alt || article.title}
              className='mb-8 w-full h-auto max-h-[511px] object-cover'
            />
          )}
          <h2 className='md:text-[40px] text-2xl md:mb-5 mb-2.5 font-medium md:leading-[44px] leading-7 text-blue-1300'>
            {article?.title}
          </h2>
          <p className='lg:text-lg text-base text-black mb-12'>{article?.description}</p>
          <div className='prose max-w-none prose-right flex flex-col items-start justify-center relative lg:py-12 py-8'>
            {article?.body && <PortableText value={article.body} components={components} />}
          </div>
          {article?.richText_row_1 && (
            <div className='prose max-w-none prose-left flex flex-col items-end justify-center relative lg:py-12 py-8'>
              <PortableText value={article.richText_row_1} components={components} />
            </div>
          )}
         {article?.richText_row_2 && (
          <div className='prose max-w-none prose-right flex flex-col items-start justify-center relative lg:py-12 py-8'>
            {article?.body && <PortableText value={article.richText_row_2} components={components} />}
          </div>
             )}
          {article?.richText_row_3 && (
            <div className='prose max-w-none prose-left flex flex-col items-end justify-center relative lg:py-12 py-8'>
              <PortableText value={article.richText_row_3} components={components} />
            </div>
          )}
            {article?.richText_row_4 && (
          <div className='prose max-w-none prose-right flex flex-col items-start justify-center relative lg:py-12 py-8'>
            {article?.body && <PortableText value={article.richText_row_4} components={components} />}
          </div>
             )}
        </div>
      </section>
      <Appointment />
      <Footer />
    </div>
  )
}
