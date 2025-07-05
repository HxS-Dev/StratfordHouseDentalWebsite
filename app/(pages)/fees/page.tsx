'use client';

import Header from '@/app/components/Header'
import React, { useEffect, useState } from 'react'
import HeroSec from '@/app/components/HeroSec'
import Appoinment from '@/app/components/Appoinment';
import Footer from '@/app/components/Footer';
import { sanityClient } from '@/lib/sanity';
import { allFeesQuery } from '@/lib/queries';
import { PortableText } from '@portabletext/react';

type TitlePart = {
     tag: "h1" | "h6";
     text: string;
};
const exampleTitleParts: TitlePart[] = [
     { tag: "h1", text: "Paying for treatments" },
];
function page() {
     const [fees, setFees] = useState<any[]>([]);

     useEffect(() => {
          const fetchFees = async () => {
               try {
                    const data = await sanityClient.fetch(allFeesQuery);
                    setFees(data);
               } catch (error) {
                    console.error('Error fetching fees:', error);
               }
          };

          fetchFees();
     }, []);

     return (
          <div>
               <Header></Header>
               <HeroSec titleParts={exampleTitleParts}></HeroSec>
               <section className='md:py-[105px] md:pb-12 pt-8'>
                    <div className="xl:max-w-[1270px]  w-full max-w-[952px] relative md:px-5 px-4 mx-auto">
                         <img src="images/nhs-img.png" className='md:mb-8 mb-6' alt="" />
                         <h2 className='md:text-[40px] text-2xl md:mb-[18px] mb-2.5 font-medium md:leading-[44px] leading-7 text-blue-1300'>Ways To Pay For Treatment</h2>
                         <p className='md:text-lg text-base max-w-[1142px] font-normal md:leading-7 leading-6 text-black'><strong>Stratford House Dental Practice</strong> offer a full range of NHS dental services as well as a choice of private and cosmetic dental treatments. We also offer a number of alternative ways to finance private or cosmetic dental work, to make obtaining the dental health your need easier to afford.</p>
                    </div>
               </section>
               <section className='md:py-24 py-10 pt-4'>
                    <div className="xl:max-w-[1270px] w-full max-w-[952px] relative md:px-5 px-4 mx-auto">
                         <div className='grid md:grid-cols-2 grid-cols-1 gap-10'>
                              {fees.map((fee) => (
                                   <div key={fee._id} className='border p-4 rounded-lg shadow-md'>
                                        <a href={`/fees/${fee.slug.current}`} className='block'>
                                             <h4 className='text-xl leading-[30px] font-semibold mb-2 text-blue-1300'>{fee.title}</h4>
                                        </a>
                                        <div className='text-base font-normal leading-6 text-tertiary-600'>
                                             {fee.body ? <PortableText value={fee.body.slice(0, 2)} /> : 'No body available.'}
                                        </div>
                                   </div>
                              ))}
                         </div>
                    </div>
               </section>
               <Appoinment/>
               <Footer></Footer>
          </div >
     )
}

export default page
