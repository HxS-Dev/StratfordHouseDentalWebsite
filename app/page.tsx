"use client";
import { motion } from "framer-motion";
import Button from "./components/Buttons";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Testimonails from "./components/Testimonails";
import Treatment from "./components/Treatment";
import Link from "next/link";
import { useEffect, useState } from "react";
import { bookingLinkQuery } from "@/lib/queries";
import { sanityClient } from "@/lib/sanity";

export default function Home() {
  const [bookingLink, setBookingLink] = useState("");

  useEffect(() => {
    const fetchLink = async () => {
      const data = await sanityClient.fetch(bookingLinkQuery);
      setBookingLink(data?.bookingLink || "");
    };
    fetchLink();
  }, []);

  return (
    <>
      <Header />
      <motion.section 
        className="relative overflow-hidden lg:pt-0 pt-[29px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="xl:max-w-[1270px] max-w-[952px] md:px-5 px-4 mx-auto">
          <div className="flex lg:flex-nowrap flex-wrap md:gap-6 gap-10 xl:min-h-[612px] min-h-[536px] items-center">
            <motion.div 
              className="xl:w-1/2 lg:w-5/12 w-full lg:text-start text-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="xl:text-5xl md:text-4xl text-[32px] text-black lg:mx-0 mx-auto font-semibold leading-[120%] font-inter-display">Welcome to Stratford House Dental Practice</h1>
              <p className="xl:text-lg text-base text-black lg:mx-0 mx-auto max-w-[500px] leading-[150%] tracking-[-0.36px] md:mt-4 mt-2 mb-8">Expert dental care in a comfortable environment, using the latest technology to give you the healthy, beautiful smile you deserve.</p>
              <motion.div whileTap={{ scale: 0.95 }}>
                <a
                  href={bookingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white md:text-base text-sm transtion ease-in-out duration-500 hover:text-blue-1000 hover:bg-transparent border border-blue-1000 font-medium leading-6 p-4 py-3 bg-blue-1000 inline-block"
                >
                  Book Appointment Now
                </a>
              </motion.div>
            </motion.div>
            <motion.div 
              className="lg:w-1/2 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="lg:absolute xl:max-w-full md:mb-0 -mb-1.5 lg:mr-0 md:-mr-5 lg:max-w-[600px] text-end -bottom-9 right-0">
                <img 
                  src="images/hero-img.png" 
                  className="inline-block" 
                  alt="" 
                />
                <div className="absolute right-0 bottom-0 z-10">
                  <img src="images/cube-img.svg" className="md:w-auto w-[123px]" alt="" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
      <section className=" overflow-hidden ">
        <div className="bg-blue-1100 md:pb-[252px] pb-[113px] md:pt-[112px] pt-[42px]">
          <div className="xl:max-w-[1270px] max-w-[952px]   md:px-5 px-4 mx-auto">
            <div className="flex mf:flex-nowrap flex-wrap items-center md:gap-11 gap-4 justify-between">
              <motion.h2
                className="xl:text-[56px] md:text-[40px] text-2xl max-w-[645px] font-medium text-white leading-[125%]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7 }}
              >
                An Extensive Range of Treatments
              </motion.h2>
              <p className="text-base font-normal leading-[150%] text-white">We provide comprehensive dental care with the latest technology and techniques to ensure your optimal oral health.</p>
            </div>
          </div>
        </div>
        <Treatment></Treatment>
      </section>
      <section className="md:pt-[126px] pt-16 md:pb-[98px] pb-12">
        <motion.div
          className="xl:max-w-[1270px] max-w-[952px]   md:px-5 px-4 mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex lg:flex-nowrap flex-wrap md:gap-5 gap-[54px] items-center">
            <div className="lg:w-1/2 w-full">
              <div className="relative xl:ml-0 md:-ml-10 float-end z-10">
                <img src="images/about-img.png" className="xl:max-w-[inherit]" alt="" />
                <div className="absolute -z-10 xl:-bottom-9 md:-bottom-5 -bottom-2 xl:right-[-46px] md:-right-4 -right-2">
                  <img src="images/line-pattern.svg" className="xl:w-auto md:w-[155px] w-[141px]" alt="" />
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <div className="max-w-[500px] relative z-10 lg:mr-0 mr-auto ml-auto">
                <div className="absolute -top-10 right-0 -z-10">
                  <img src="images/emoji-icon3.svg" alt="" />
                </div>
                <span className="text-sm font-medium leading-5 text-blue-1000">About Us</span>
                <h2 className="md:text-5xl text-2xl mt-3 md:mb-[34px] mb-2 text-black font-semibold leading-[120%] font-inter-display">Local Wolverton Dental Practice</h2>
                <p className="md:text-lg text-base md:mb-[34px] mb-[26px] text-black font-normal">Stratford House Dental Practice is based in Wolverton just outside the centre of Milton Keynes and easily accessible to the surrounding villages. We offer exceptional dentistry, whether via the NHS or privately.</p>
                <Link href="/about" className="text-base md:w-auto w-full transition-all duration-300 hover:border-transparent hover:bg-blue-1000 hover:text-white text-center font-semibold px-5 py-2 border border-gray-1200 leading-6">View More</Link>
              </div>
            </div></div>
        </motion.div>
      </section>
      <section className="testimonails-sec">
        <div className="xl:max-w-[1270px] max-w-[952px]  relative md:px-5 px-4 mx-auto">
          <div className="text-end md:block hidden -mb-[53px]">
            <img src="images/cubes-img.svg" className="inline-block"></img>
          </div>
          <div className="absolute md:block hidden left-[-61px] top-[90px]">
            <img src="images/emoji-icon.svg" className="inline-block"></img>
          </div>
          <div className="absolute md:block hidden right-14 -top-[150px]">
            <img src="images/emoji-icon2.svg" alt="" />
          </div>
          <Testimonails></Testimonails>
        </div>
      </section>
      <motion.section 
        className="md:pt-[154px] pt-9 md:pb-[113px] pb-0"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="xl:max-w-[1270px] max-w-[952px] relative md:px-5 px-4 mx-auto">
          <div className="md:text-center text-start md:mb-14 mb-[26px]">
            <h2 className="md:text-[40px] text-2xl max-w-[660px] mx-auto md:mb-6 mb-2 font-medium leading-[125%] tracking-[-1.2px] text-grayscale-900">Welcome to Stratford House Dental Practice</h2>
            <p className="text-base font-normal max-w-[967px] mx-auto leading-6 tracking-[-0.32px] text-grayscale-500">Your local dentist in Wolverton and Milton Keynes! Nothing is more beautiful than a healthy smile. It looks great to those around you and makes you feel good. We aim to put the smile back on your face by offering preventative and restorative treatments.</p>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2">
            <motion.div
              className="border border-gray-1300 py-[54px] px-[34px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <img src="images/file-icon.svg" alt="" />
              <h4 className="text-2xl font-semibold mt-5 leading-[130%] tracking-[-0.72px] text-grayscale-900">Latest News</h4>
              <p className="text-base font-normal leading-6  mt-5 mb-2 tracking-[-0.32px] text-grayscale-500">Stay up to date with our latest news, updates, and dental care tips from our expert team.</p>
              <Link href="/news" className="inline-flex w-fit transition-all duration-300 group items-center gap-2 text-base font-medium leading-[150%] text-blue-1200">Read News
                <img className="group-hover:translate-x-1 transition-all duration-300" src="images/chevron-right.svg" alt="" />
              </Link>
            </motion.div>
            <motion.div
              className="border border-gray-1300 py-[54px] px-[34px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <img src="images/wallet-icon.svg" alt="" />
              <h4 className="text-2xl font-semibold mt-5 leading-[130%] tracking-[-0.72px] text-grayscale-900">Dental Fees</h4>
              <p className="text-base font-normal leading-6  mt-5 mb-2 tracking-[-0.32px] text-grayscale-500">Explore our transparent dental fees and payment options to plan your treatment with confidence.</p>
              <Link href="/fees" className="inline-flex w-fit transition-all duration-300 group items-center gap-2 text-base font-medium leading-[150%] text-blue-1200">View Fees
                <img className="group-hover:translate-x-1 transition-all duration-300" src="images/chevron-right.svg" alt="" />
              </Link>
            </motion.div>
            <motion.div
              className="border border-gray-1300 py-[54px] px-[34px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <img src="images/sheild-icon.svg" alt="" />
              <h4 className="text-2xl font-semibold mt-5 leading-[130%] tracking-[-0.72px] text-grayscale-900">A Range of Treatments</h4>
              <p className="text-base font-normal leading-6 mt-5 mb-2 tracking-[-0.32px] text-grayscale-500">We offer a range of preventative and restorative treatments to put the smile back on your face when pain strikes, as well as providing cosmetic dentistry to give you the confidence you deserve.</p>
              <Link href="/treatment" className="inline-flex w-fit transition-all duration-300 group items-center gap-2 text-base font-medium leading-[150%] text-blue-1200">Read More
                <img className="group-hover:translate-x-1 transition-all duration-300" src="images/chevron-right.svg" alt="no" />
              </Link>
            </motion.div>
          </div>
          <div className="absolute -left-20 top-0">
            <img src="images/emoji-icon.svg" alt="" />
          </div>
        </div>
      </motion.section>
      <section className="bg-gray-1400 md:block hidden py-16">
        <div className="xl:max-w-[1270px] max-w-[952px]  relative md:px-5 px-4 mx-auto">
          <div className="bg-white py-12 px-8">
            <h2 className="text-center text-[32px] font-medium leading-[125%] text-grayscale-900 mb-6">Trusted Partners & Accreditations</h2>
            <img src="images/logos-img.png" alt="" />
          </div>
        </div>
      </section>
      <Footer></Footer>
    </>
  );
}
