"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { sanityClient } from '@/lib/sanity';
import { allTreatmentsQuery } from '@/lib/queries';

function Footer() {
     const [topTreatments, setTopTreatments] = useState<any[]>([]);

     useEffect(() => {
          const fetchTreatments = async () => {
               try {
                    const data = await sanityClient.fetch(allTreatmentsQuery);
                    setTopTreatments(data.slice(0, 4)); // Fetch top 4 treatments
               } catch (error) {
                    console.error('Error fetching treatments:', error);
               }
          };

          fetchTreatments();
     }, []);

     return (
          <footer className='bg-blue-1200 md:pt-20 md:pb-14 py-12'>
               <div className="xl:max-w-[1270px] max-w-[952px] relative md:px-5 px-4 mx-auto">
                    <div className='flex mb-14 items-center justify-between'>
                         <Link href={"/#hero-sec"}>
                              <img src="/images/footer-logo.svg" alt="" />
                         </Link>
                         <ul className='flex items-center gap-2'>
                              <li>
                                   <Link href="https://uk.linkedin.com/company/stratford-house-dental-practice" className='w-10 h-10 transition-all duration-300 hover:opacity-80 flex items-center justify-center bg-white'><img src="/images/linkdin.svg" alt="" /></Link>
                              </li>
                              <li>
                                   <Link href="https://www.facebook.com/p/Stratford-House-Dental-Practice-100063300785517/" className='w-10 h-10 transition-all duration-300 hover:opacity-80 flex items-center justify-center bg-white'><img src="/images/fb-icon.svg" alt="" /></Link>
                              </li>
                         </ul>
                    </div>
                    <div className='flex md:flex-nowrap flex-wrap md:gap-5 gap-y-10'>
                         <div className='md:w-3/12 w-1/2'>
                              <h4 className='text-lg font-semibold mb-4 leading-[150%] text-white'>Navigation</h4>
                              <ul>
                                   <li>
                                        <Link href="/" className='text-lg w-fit hover:underline font-normal leading-[150%] tracking-[-0.36px] mb-4 text-gray-1000 block'>Home </Link>
                                   </li>
                                   <li>
                                        <Link href="/about" className='text-lg font-normal w-fit hover:underline leading-[150%] tracking-[-0.36px] mb-4 text-gray-1000 block'>About Us </Link>
                                   </li>
                                   <li>
                                        <Link href="/treatment" className='text-lg font-normal w-fit hover:underline leading-[150%] tracking-[-0.36px] mb-4 text-gray-1000 block'>Treatments </Link>
                                   </li>
                                   <li>
                                        <Link href="/contact" className='text-lg font-normal w-fit hover:underline leading-[150%] tracking-[-0.36px] text-gray-1000 block'>Contact </Link>
                                   </li>
                              </ul>
                         </div>
                         <div className='md:w-3/12 w-1/2'>
                              <h4 className='text-lg font-semibold mb-4 leading-[150%] text-white'>Treatments</h4>
                              <ul>
                                   {topTreatments.map((treatment) => (
                                        <li key={treatment._id}>
                                             <Link href={`/treatment/${treatment.slug.current}`} className='text-lg font-normal w-fit hover:underline leading-[150%] tracking-[-0.36px] mb-4 text-gray-1000 block'>
                                                  {treatment.title}
                                             </Link>
                                        </li>
                                   ))}
                              </ul>
                         </div>
                         <div className='md:w-3/12 w-1/2'>
                              <h4 className='text-lg font-semibold mb-4 leading-[150%] text-white'>Resources</h4>
                              <ul>
                                   <li>
                                        <Link href="/fees" className='text-lg font-normal w-fit hover:underline leading-[150%] tracking-[-0.36px] mb-4 text-gray-1000 block'>Fees </Link>
                                   </li>
                                   <li>
                                        <Link href="/news" className='text-lg font-normal w-fit hover:underline leading-[150%] tracking-[-0.36px]  text-gray-1000 block'>News </Link>
                                   </li>
                              </ul>
                         </div>
                    </div>
                    <div className='md:mt-14 mt-[38px] md:flex items-center justify-between md:pt-14 pt-[38px] border-t border-white/[10%]'>
                         <p className='text-base md:mt-0 mt-3 text-white font-medium leading-6 tracking-[-0.32px]'>© Stratford Hours, All Rights Reserved</p>
                    </div>
               </div>
          </footer>
     );
}

export default Footer;
