import { Metadata } from 'next'
import { sanityClient } from '@/lib/sanity'
import { feesBySlugQuery } from '@/lib/queries'
import { urlFor } from '@/lib/imageBuilder'
import Contact from '@/app/components/Contact'
import Footer from '@/app/components/Footer'
import Header from '@/app/components/Header'
import { PortableText } from '@portabletext/react'
import { PortableTextComponents } from '@portabletext/react'
import AccordionBlockDynamic from '@/components/AccordionBlockDynamic';
import dynamic from 'next/dynamic';

// Remove PageTransition import and usage
// const PageTransition = dynamic(() => import('@/components/PageTransition'), { ssr: false });

// Add a client-side wrapper for scroll animation
// const ScrollReveal = dynamic(() => import('@/components/ui/ScrollReveal'));

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const fee = await sanityClient.fetch(feesBySlugQuery, { slug: resolvedParams.slug })

  return {
    title: fee?.title || 'Fees',
    description: fee?.body || '',
  }
}

export async function generateStaticParams() {
  const slugs = await sanityClient.fetch(`*[_type == "fees"]{ "slug": slug.current }`);

  return slugs.map((slug: { slug: string }) => ({
    slug: slug.slug,
  }));
}

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mb-4 text-blue-1300">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mb-3 text-blue-1200">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold mb-2 text-blue-1100">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold mb-2 text-blue-1000">{children}</h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-lg font-semibold mb-2 text-blue-900">{children}</h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-base font-semibold mb-2 text-blue-800">{children}</h6>
    ),
    normal: ({ children }) => (
      <p className="mb-4 text-gray-700">{children}</p>
    ),
    ul: ({ children }) => <ul className="list-disc pl-6 mb-4">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal pl-6 mb-4">{children}</ol>,
    li: ({ children }) => <li className="mb-1">{children}</li>,
    blockquote: ({ children }) => <blockquote className="border-l-4 border-blue-200 pl-4 italic text-blue-900 my-4">{children}</blockquote>,
    code: ({ children }) => <pre className="bg-gray-100 rounded p-2 text-sm overflow-x-auto my-4"><code>{children}</code></pre>,
    strong: ({ children }) => <strong className="font-bold text-blue-1300">{children}</strong>,
    em: ({ children }) => <em className="italic text-blue-900">{children}</em>,
    hr: () => <hr className="my-6 border-blue-200" />,
    // Remove the custom 'a' block renderer, as links are handled in 'marks' below
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
    callout: ({ value }) => {
      let color = 'bg-blue-50 border-blue-300 text-blue-900';
      let icon = (
        <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
          <text x="12" y="16" textAnchor="middle" fontSize="12" fontWeight="bold" fill="currentColor" fontFamily="Arial, Helvetica, sans-serif">i</text>
        </svg>
      );
      if (value.style === 'warning') {
        color = 'bg-yellow-50 border-yellow-300 text-yellow-900';
        icon = (
          <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M12 8v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="16" r="1.2" fill="currentColor" />
          </svg>
        );
      }
      if (value.style === 'success') {
        color = 'bg-green-50 border-green-300 text-green-900';
        icon = (
          <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M12 8v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="16" r="1.2" fill="currentColor" />
          </svg>
        );
      }
      return (
        <div className={`my-6 p-5 border-l-4 rounded-xl flex items-start shadow-sm ${color}`}> 
          <div className="flex flex-col w-full">
            <div className="flex items-center gap-2 mb-1">
              <span className="flex-shrink-0">{icon}</span>
              {value.title && <div className="font-bold text-base leading-tight">{value.title}</div>}
            </div>
            <div className="prose max-w-none text-inherit mt-2">
              <PortableText value={value.body} components={components} />
            </div>
          </div>
        </div>
      );
    },
    accordion: ({ value }) => <AccordionBlockDynamic value={value} />, // Use the client wrapper, no components prop
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
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-4">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-4">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-1">{children}</li>,
    number: ({ children }) => <li className="mb-1">{children}</li>,
  },
}

// Helper to check if a PortableText value contains an image block
function getImageBlock(blocks: any[] = []) {
  return Array.isArray(blocks) ? blocks.find(block => block._type === 'image') : null;
}

function RenderSection({ value, index = 0 }: { value: any[], index?: number }) {
  if (!value) return null;
  const imageBlock = getImageBlock(value);
  const textBlocks = value.filter((block: any) => block._type !== 'image');

  if (imageBlock) {
    // Alternate image order for left/right alignment
    const isImageLeft = index % 2 === 0;
    return (
      <div className="w-full max-w-[1200px] mx-auto my-12">
        <div className={`flex flex-col md:flex-row ${!isImageLeft ? 'md:flex-row-reverse' : ''} items-start gap-8`}>
          <div className="w-full md:basis-2/5 flex-shrink-0 flex-grow-0 flex justify-center items-start">
            <img
              src={urlFor(imageBlock).url()}
              alt={imageBlock.alt || ''}
              className="w-full max-w-full md:max-h-[600px] max-h-[350px] object-contain rounded-xl !shadow-none self-start md:self-stretch"
              style={{ background: 'transparent', border: 'none', boxShadow: 'none', display: 'block', objectFit: 'contain' }}
            />
          </div>
          <div className="prose max-w-none !leading-relaxed overflow-hidden w-full md:basis-3/5 flex-1">
            <PortableText value={textBlocks} components={components} />
          </div>
        </div>
      </div>
    );
  }
  // No image: single column, but use the same max width as image sections
  return (
    <div className="prose max-w-none w-full max-w-[1200px] mx-auto !leading-relaxed my-12">
      <PortableText value={value} components={components} />
    </div>
  );
}

export default async function ArticlePage({ params }: PageProps) {
  const resolvedParams = await params;
  const fees = await sanityClient.fetch(feesBySlugQuery, { slug: resolvedParams.slug });

  const titleParts = [
    { tag: "h1" as const, text: fees?.title || "Fees" },
  ]

  // Handle feesTable when it is not an array by converting it to an array of rows
  const feesTableRows = fees?.feesTable?.rows || [];

  return (
    <>
      <Header />
      <section className="bg-blue-1100 max-h-[287px] md:min-h-[287px] min-h-[165px] flex items-center relative">
        <div className="xl:max-w-[1270px] w-full max-w-[952px] relative md:px-5 px-4 mx-auto">
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
          {fees?.mainImage && (
            <img 
              src={urlFor(fees.mainImage).url()} 
              alt={fees.mainImage.alt || fees.title}
              className='mb-8 w-full h-auto max-h-[511px] object-cover'
            />
          )}
          {/* Main body with alternating image float */}
          {fees?.body && <RenderSection value={fees.body} index={0} />}
          {/* Render feesTable */}
          {feesTableRows.length > 0 && (
            <div className="mt-8">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    {feesTableRows[0]?.cells.map((header: string, index: number) => (
                      <th 
                        key={index} 
                        className={`border border-gray-300 px-4 py-2 bg-gray-100 ${index === 0 && !feesTableRows[0]?.cells[0] ? 'text-left font-bold' : ''}`}
                        style={index === 0 ? { width: 'max-content' } : { width: `${100 / (feesTableRows[0]?.cells.length - 1)}%` }}
                      >
                        {header || ' '}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {feesTableRows.slice(1).map((row: { cells: string[] }, rowIndex: number) => (
                    <tr key={rowIndex}>
                      {row.cells.map((cell: string, cellIndex: number) => (
                        <td 
                          key={cellIndex} 
                          className={`border border-gray-300 px-4 py-2 ${cellIndex === 0 && !feesTableRows[0]?.cells[0] ? 'text-left font-bold bg-gray-100' : ''}`}
                          style={cellIndex === 0 ? { width: 'max-content' } : { width: `${100 / (feesTableRows[0]?.cells.length - 1)}%` }}
                        >
                          {cell || ' '}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
      <Contact />
      <Footer />
    </>
  )
}
