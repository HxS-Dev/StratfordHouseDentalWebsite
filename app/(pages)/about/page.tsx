"use client";
import Appoinment from '@/app/components/Appoinment';
import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import HeroSec from '@/app/components/HeroSec';
import TeamSection from '@/app/components/TeamSection';
import { allTeamQuery } from '@/lib/queries';
import { sanityClient } from '@/lib/sanity';
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type TitlePart = {
     tag: "h1" | "h6";
     text: string;
};
const exampleTitleParts: TitlePart[] = [
     { tag: "h1", text: "About Stratford House Dental Practice" },
];


export default function About() {
  const [team, setTeam] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sanityClient.fetch(allTeamQuery).then((data) => {
      setTeam(data);
      setLoading(false);
    });
  }, []);
  return (
    <>
      <Header />
      <HeroSec titleParts={exampleTitleParts} />
      <motion.section
        className='md:py-[105px] md:pb-12 pt-8'
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7 }}
      >
        <div className="xl:max-w-[1270px]  w-full max-w-[952px] relative md:px-5 px-4 mx-auto">
          <img src="images/about-img2.png" className='md:mb-8 mb-6' alt="" />
          <h2 className='md:text-[40px] text-2xl md:mb-[18px] mb-2.5 font-medium md:leading-[44px] leading-7 text-blue-1300'>About Our Surgery</h2>
          <p className='md:text-lg text-base max-w-[1142px] font-normal md:leading-7 leading-6 text-black'><strong>Stratford House Dental Practice</strong> is located in Wolverton, which is just outside the centre of Milton Keynes and is one of the oldest dental practices in Milton Keynes with its origins dating back to 1921.</p>
        </div>
      </motion.section>
      <motion.section
        className='md:py-12 py-10'
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <div className="xl:max-w-[1270px]  w-full max-w-[952px] relative md:px-5 px-4 mx-auto">
          <div className='flex md:gap-4 gap-10 md:flex-nowrap flex-wrap items-center'>
            <div className='md:w-1/2 w-full'>
              <img src="images/surgery-img.png" alt="" />
            </div>
            <div className='md:w-1/2 w-full'>
              <div className='max-w-[560px] ml-auto'>
                <div className='mb-12'>
                  <h4 className='text-xl leading-[30px] font-semibold mb-2 text-blue-1300'>A Local Dental Practice</h4>
                  <p className='text-base font-normal leading-6 text-tertiary-600'>Located in Wolverton, we also serve the surrounding areas of Central Milton Keynes, Crownhill, Great Linford, Knowlhill, Middleton, Newport Pagnell, Pennyland, Stony Stratford, Stonebridge, Tongwell and more.</p>
                </div>
                <div >
                  <h4 className='text-xl leading-[30px] font-semibold mb-2 text-blue-1300'>Modern and Clean Facilities</h4>
                  <p className='text-base font-normal leading-6 text-tertiary-600 md:mb-6 mb-4'>Our premises are within a period victorian building which has been updated and modernised internally, offering a clean and comfortable welcome to all our patients.</p>
                  <p className='text-base font-normal leading-6 text-tertiary-600'>A continuous professional development plan ensures our surgery keeps up with developments, using the latest equipment and our dentists continue to train in the application of new treatments and techniques.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
      <motion.section
        className='md:py-12 pt-0'
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="xl:max-w-[1270px] w-full max-w-[952px] relative md:px-5 px-4 mx-auto">
          <div className="md:text-center md:mb-16 mb-6">
            <h2 className='md:text-[40px] text-2xl md:mb-6 mb-2.5 font-medium max-w-[660px] mx-auto md:leading-[44px] leading-7 text-grayscale-900'>The Team At Stratford House Dental Practice</h2>
            <p className='md:text-lg text-base max-w-[1142px] mx-auto font-normal md:leading-7 leading-6 text-grayscale-500'>The team at Stratford House Dental Practice have many years of experience between them, guaranteed to put a healthy smile on your face.</p>
          </div>
          {/* Show loading or the team section */}
          {loading ? (
            <div className="text-center py-10 text-lg text-gray-500">Loading team...</div>
          ) : (
            <TeamSection team={team} />
          )}
        </div>
      </motion.section>
      <Appoinment />
      <Footer />
    </>
  );
}
