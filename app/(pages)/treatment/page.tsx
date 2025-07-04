import Appoinment from '@/app/components/Appoinment';
import Footer from '@/app/components/Footer'
import Header from '@/app/components/Header'
import HeroSec from '@/app/components/HeroSec'
import { allTreatmentsQuery } from '@/lib/queries';
import { sanityClient } from '@/lib/sanity';
import React from 'react'
import TreatmentsWithPagination from './TreatmentsWithPagination';

type TitlePart = {
     tag: "h1" | "h6";
     text: string;
};

const exampleTitleParts: TitlePart[] = [
     { tag: "h1", text: "The Treatments We Offer" },
];

async function page() {
     const treatments = await sanityClient.fetch(allTreatmentsQuery);

     return (
          <>
               <Header></Header>
               <HeroSec titleParts={exampleTitleParts} />
               <section className='md:py-[105px] md:pb-12 pt-8'>
                    <div className="xl:max-w-[1270px]  w-full max-w-[952px] relative md:px-5 px-4 mx-auto">
                         <img src="images/article-2.png" className='md:mb-8 mb-6' alt="" />
                         <h2 className='md:text-[40px] text-2xl md:mb-8 mb-2.5 font-medium md:leading-[44px] leading-7 text-blue-1300'>A Comprehensive Range Of Services</h2>
                         <p className='md:text-lg text-base font-normal md:leading-7 leading-6 text-black'>Stratford House Dental Practice offer a comprehensive range of treatments to keep your smile healthy and pain free in a patient-focused, relaxed and friendly environment. If you have neglected your teeth up until now, we will not pass judgement, but will help restore your oral health.</p>
                    </div>
               </section>
               <section className='md:py-[105px] md:pb-12 pt-8'>
                    <div className="xl:max-w-[1270px]  w-full max-w-[952px] relative md:px-5 px-4 mx-auto">
                         <TreatmentsWithPagination treatments={treatments} />
                    </div>
               </section>
               <Appoinment></Appoinment>
               <Footer></Footer>
          </>
     )
}

export default page
