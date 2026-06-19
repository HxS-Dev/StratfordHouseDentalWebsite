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
