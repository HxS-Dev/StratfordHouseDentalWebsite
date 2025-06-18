import Appoinment from '@/app/components/Appoinment';
import Contact from '@/app/components/Contact';
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
     { tag: "h6", text: "The Treatments We Offer" },
     { tag: "h1", text: "Preventative Care" },
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
                         <h2 className='md:text-[40px] text-2xl md:mb-8 mb-2.5 font-medium md:leading-[44px] leading-7 text-blue-1300'>Preventative Care</h2>
                         <p className='md:text-lg text-base font-normal md:leading-7 leading-6 text-black'>To ensure that your teeth and gums remain healthy, it is recommended that you visit your dentist frequently for a routine examination. Regular dental check-ups are vital to ensure that any problems are spotted before they develop into issues, requiring major restorative treatment.</p>
                    </div>
               </section>
               <section className='md:py-[105px] md:pb-12 pt-8'>
                    <div className="xl:max-w-[1270px]  w-full max-w-[952px] relative md:px-5 px-4 mx-auto">
                         <TreatmentsWithPagination treatments={treatments} />
                    </div>
               </section>
               <Appoinment></Appoinment>
               <Contact></Contact>
               <Footer></Footer>
          </>
     )
}

export default page
