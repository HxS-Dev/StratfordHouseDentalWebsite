"use client";
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import HeroSec from '@/app/components/HeroSec';
import Button from '@/app/components/Buttons';
import { motion } from 'framer-motion';
import Appoinment from '@/app/components/Appoinment';

// Use the correct TitlePart type for tag
const heroTitleParts = [
  { tag: 'h1' as const, text: 'Contact Stratford House Dental Practice' },
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <HeroSec titleParts={heroTitleParts} />
      {/* Description under HeroSec, now matches main content width */}
      <div className="w-full bg-gradient-to-b from-white to-gray-100 py-10 border-b border-gray-200">
        <div className="xl:max-w-[1270px] max-w-[952px] md:px-5 px-4 mx-auto">
          <div className="rounded-xl shadow-md bg-white/90 px-6 py-8 md:py-10 flex flex-col items-center gap-4 w-full m-0">
            <h2 className="text-2xl md:text-3xl font-semibold text-blue-1200 mb-2 text-center">How to Get in Touch</h2>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed md:leading-8 font-normal text-center w-full">
              If you would like more information on our services or wish to arrange a consultation, please complete the form below.<br className="hidden md:block" />
              To make an appointment please use the link at the top of the page, or to register as a new patient please use the link below.<br className="hidden md:block" />
              For anything else call
              <a href="tel:01908313109" className="text-blue-1200 font-semibold whitespace-nowrap inline-flex items-center gap-1 ml-1">
                {/* Improved phone SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 inline-block -mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M22 16.92V19a2 2 0 0 1-2 2A19.72 19.72 0 0 1 3 5a2 2 0 0 1 2-2h2.09a1 1 0 0 1 1 .75l.57 2.3a1 1 0 0 1-.23.95l-1.27 1.27a16 16 0 0 0 6.6 6.6l1.27-1.27a1 1 0 0 1 .95-.23l2.3.57a1 1 0 0 1 .75 1z"/></svg>
                01908 313109
              </a>.
            </p>
          </div>
        </div>
      </div>
      <motion.section
        className="relative overflow-hidden pt-0 pb-10 bg-gray-1400"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="xl:max-w-[1270px] max-w-[952px] md:px-5 px-4 mx-auto">
          {/* 2 columns: Opening Hours and Google Map */}
          <div className="grid md:grid-cols-2 grid-cols-1 gap-8 mt-10 mb-0">
            {/* Opening Hours - improved styling */}
            <motion.div
              className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-blue-1200 flex flex-col justify-between h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <img src="/images/sheild-icon.svg" alt="Opening Hours" className="w-7 h-7" />
                  <h2 className="text-2xl font-semibold text-blue-1200">Opening Hours</h2>
                </div>
                <div className="divide-y divide-gray-200 text-base text-gray-900">
                  <div className="flex items-center justify-between py-2"><span className="font-medium">Monday</span><span>09:00-17:30</span></div>
                  <div className="flex items-center justify-between py-2"><span className="font-medium">Tuesday</span><span>09:00-17:30</span></div>
                  <div className="flex items-center justify-between py-2"><span className="font-medium">Wednesday</span><span>09:00-17:30</span></div>
                  <div className="flex items-center justify-between py-2"><span className="font-medium">Thursday</span><span>09:00-17:30</span></div>
                  <div className="flex items-center justify-between py-2"><span className="font-medium">Friday</span><span>09:00-17:15</span></div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-6 justify-end">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-1200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M22 16.92V19a2 2 0 0 1-2 2A19.72 19.72 0 0 1 3 5a2 2 0 0 1 2-2h2.09a1 1 0 0 1 1 .75l.57 2.3a1 1 0 0 1-.23.95l-1.27 1.27a16 16 0 0 0 6.6 6.6l1.27-1.27a1 1 0 0 1 .95-.23l2.3.57a1 1 0 0 1 .75 1z"/></svg>
                <a href="tel:01908313109" className="text-blue-1200 font-semibold text-lg">01908 313109</a>
              </div>
            </motion.div>
            {/* Google Map */}
            <motion.div
              className="rounded-xl overflow-hidden shadow-lg h-full min-h-[340px] flex items-stretch"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <iframe
                title="Stratford House Dental Practice Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.964964234956!2d-0.8088586841960192!3d52.06239377973209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487713e2e2e2e2e3%3A0x2e2e2e2e2e2e2e2e!2s36%20Stratford%20Rd%2C%20Wolverton%2C%20Milton%20Keynes%20MK12%205LW!5e0!3m2!1sen!2suk!4v1687891234567!5m2!1sen!2suk"
                width="100%"
                height="340"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </motion.section>
      {/* Contact form at the bottom, original styling, margin cleaned up */}
      <Appoinment />
      <Footer />
    </>
  );
}
