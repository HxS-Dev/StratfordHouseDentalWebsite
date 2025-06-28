import Header from '@/app/components/Header'
import React from 'react'
import HeroSec from '@/app/components/HeroSec'
import Appoinment from '@/app/components/Appoinment';
import Contact from '@/app/components/Contact';
import Footer from '@/app/components/Footer';
type TitlePart = {
     tag: "h1" | "h6";
     text: string;
};
const exampleTitleParts: TitlePart[] = [
     { tag: "h6", text: "Paying for treatments" },
     { tag: "h1", text: "NHS Dental Care" },
];
function page() {
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
                    <div className="xl:max-w-[1270px]  w-full max-w-[952px] relative md:px-5 px-4 mx-auto">
                         <div className='flex md:gap-4 gap-10 lg:flex-nowrap flex-wrap items-center'>
                              <div className='lg:w-1/2 w-full lg:order-1 order-2'>
                                   <div className='max-w-[526px]'>
                                        <div className='mb-12'>
                                             <h4 className='text-xl leading-[30px] font-semibold mb-2 text-blue-1300'>NHS Dental Treatmentt</h4>
                                             <p className='text-base font-normal leading-6 text-tertiary-600'>We are proud to continue to support NHS Dental Care offering a full range of treatments within the government scheme. Details of what services are included in this can be found using the links on the right.</p>
                                        </div>
                                        <div className='mb-12'>
                                             <h4 className='text-xl leading-[30px] font-semibold mb-2 text-blue-1300'>Private Dental Treatment</h4>
                                             <p className='text-base font-normal leading-6 text-tertiary-600'>We also offer a comprehensive range of private and cosmetic dental treatments. Details of the fees we charge for Private Dental Care and the various treatments offered, can be found using the links on the right.</p>
                                        </div>
                                        <div >
                                             <h4 className='text-xl leading-[30px] font-semibold mb-2 text-blue-1300'>Dental Finance Schemes</h4>
                                             <p className='text-base font-normal leading-6 text-tertiary-600'>We also offer other ways to finance private dentistry. Details of each scheme can be found using the links on the right.</p>
                                        </div>
                                   </div>
                              </div>
                              <div className='lg:w-1/2 w-full lg:order-2 order-1'>
                                   <img src="images/content-img.png" alt="" />
                              </div>

                         </div>
                    </div>
               </section>
               <section className=''>
                    <div className="xl:max-w-[1270px]  w-full max-w-[952px] relative md:px-5 px-4 mx-auto">
                         <h2 className='md:text-[36px] text-xl font-semibold md:leading-[44px] leading-[30px] md:mb-5 mb-2 md:tracking-[-0.72px] text-blue-1300'>NHS Treatment Fee</h2>
                         <p className='md:text-xl text-base max-w-[1142px] font-normal md:leading-[30px] leading-6 text-tertiary-600'>We believe Untitled should be accessible to all companies, no matter the size.</p>
                         <div className='md:block hidden'>
                              <table className='border mt-8 mb-16 font-inter w-full border-gray-1200'>
                                   <thead>
                                        <tr className='text-xl font-semibold text-blue-1200'>
                                             <th><span className='h-[62px] flex items-center justify-center'>Features</span></th>
                                             <th><span className='h-[62px] flex items-center justify-center'>Band 1</span></th>
                                             <th><span className='h-[62px] flex items-center justify-center'>Band 2</span></th>
                                             <th><span className='h-[62px] flex items-center justify-center'>Band 3</span></th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        <tr>
                                             <td><span className='text-5xl block opacity-0 pt-8 pb-12 text-center leading-[60px] font-semibold tracking-[-0.96px] text-blue-1300'>£26.80</span></td>
                                             <td><span className='text-5xl block  text-center  pt-8 pb-12 leading-[60px] font-semibold tracking-[-0.96px] text-blue-1300'>£26.80</span></td>
                                             <td><span className='text-5xl block text-center  pt-8 pb-12 leading-[60px] font-semibold tracking-[-0.96px] text-blue-1300'>£26.80</span></td>
                                             <td><span className='text-5xl block  text-center  pt-8 pb-12 leading-[60px] font-semibold tracking-[-0.96px] text-blue-1300'>£26.80</span></td>
                                        </tr>
                                        <tr className='bg-gray-1400'>
                                             <td><span className='text-sm block py-5 px-4 leading-5 font-medium tracking-[-0.96px] text-blue-1300'>Dental Examination</span></td>
                                             <td><span className='block py-5 text-center '><img src="images/check-icon.svg" className='inline-block' alt="" /></span></td>
                                             <td><span className='block py-5 text-center '><img src="images/check-icon.svg" className='inline-block' alt="" /></span></td>
                                             <td><span className='block py-5 text-center '><img src="images/check-icon.svg" className='inline-block' alt="" /></span></td>
                                        </tr>
                                        <tr className=''>
                                             <td><span className='text-sm block py-5 px-4 leading-5 font-medium tracking-[-0.96px] text-blue-1300'>Diagnosis (inc X-Rays)</span></td>
                                             <td><span className='block py-5 text-center '><img src="images/check-icon.svg" className='inline-block' alt="" /></span></td>
                                             <td><span className='block py-5 text-center '><img src="images/check-icon.svg" className='inline-block' alt="" /></span></td>
                                             <td><span className='block py-5 text-center '><img src="images/check-icon.svg" className='inline-block' alt="" /></span></td>
                                        </tr>
                                        <tr className='bg-gray-1400'>
                                             <td><span className='text-sm block py-5 px-4 leading-5 font-medium tracking-[-0.96px] text-blue-1300'>Prevention Advice</span></td>
                                             <td><span className='block py-5 text-center '><img src="images/check-icon.svg" className='inline-block' alt="" /></span></td>
                                             <td><span className='block py-5 text-center '><img src="images/check-icon.svg" className='inline-block' alt="" /></span></td>
                                             <td><span className='block py-5 text-center '><img src="images/check-icon.svg" className='inline-block' alt="" /></span></td>
                                        </tr>
                                        <tr className=''>
                                             <td><span className='text-sm block py-5 px-4 leading-5 font-medium tracking-[-0.96px] text-blue-1300'>Scale / Polish</span></td>
                                             <td><span className='block py-5 text-center '><img src="images/check-icon.svg" className='inline-block' alt="" /></span></td>
                                             <td><span className='block py-5 text-center '><img src="images/check-icon.svg" className='inline-block' alt="" /></span></td>
                                             <td><span className='block py-5 text-center '><img src="images/check-icon.svg" className='inline-block' alt="" /></span></td>
                                        </tr>
                                        <tr className='bg-gray-1400'>
                                             <td><span className='text-sm block py-5 px-4 leading-5 font-medium tracking-[-0.96px] text-blue-1300'>Fluoride Varnish</span></td>
                                             <td><span className='block py-5 text-center '><img src="images/check-icon.svg" className='inline-block' alt="" /></span></td>
                                             <td><span className='block py-5 text-center '><img src="images/check-icon.svg" className='inline-block' alt="" /></span></td>
                                             <td><span className='block py-5 text-center '><img src="images/check-icon.svg" className='inline-block' alt="" /></span></td>
                                        </tr>
                                        <tr className=''>
                                             <td><span className='text-sm block py-5 px-4 leading-5 font-medium tracking-[-0.96px] text-blue-1300'>Fissure Sealant</span></td>
                                             <td><span className='block py-5 text-center '><img src="images/check-icon.svg" className='inline-block' alt="" /></span></td>
                                             <td><span className='block py-5 text-center '><img src="images/check-icon.svg" className='inline-block' alt="" /></span></td>
                                             <td><span className='block py-5 text-center '><img src="images/check-icon.svg" className='inline-block' alt="" /></span></td>
                                        </tr>
                                        <tr className='bg-gray-1400'>
                                             <td><span className='text-sm block py-5 px-4 leading-5 font-medium tracking-[-0.96px] text-blue-1300'>Fillings</span></td>
                                             <td><span className='block py-5 text-center '><img src="images/minus.svg" className='inline-block' alt="" /></span></td>
                                             <td><span className='block py-5 text-center '><img src="images/check-icon.svg" className='inline-block' alt="" /></span></td>
                                             <td><span className='block py-5 text-center '><img src="images/check-icon.svg" className='inline-block' alt="" /></span></td>
                                        </tr>
                                        <tr className=''>
                                             <td><span className='text-sm block py-5 px-4 leading-5 font-medium tracking-[-0.96px] text-blue-1300'>Root Canals</span></td>
                                             <td><span className='block py-5 text-center '><img src="images/minus.svg" className='inline-block' alt="" /></span></td>
                                             <td><span className='block py-5 text-center '><img src="images/check-icon.svg" className='inline-block' alt="" /></span></td>
                                             <td><span className='block py-5 text-center '><img src="images/check-icon.svg" className='inline-block' alt="" /></span></td>
                                        </tr>
                                        <tr className='bg-gray-1400'>
                                             <td><span className='text-sm block py-5 px-4 leading-5 font-medium tracking-[-0.96px] text-blue-1300'>Tooth Extraction</span></td>
                                             <td><span className='block py-5 text-center '><img src="images/minus.svg" className='inline-block' alt="" /></span></td>
                                             <td><span className='block py-5 text-center '><img src="images/check-icon.svg" className='inline-block' alt="" /></span></td>
                                             <td><span className='block py-5 text-center '><img src="images/check-icon.svg" className='inline-block' alt="" /></span></td>
                                        </tr>
                                        <tr className=''>
                                             <td><span className='text-sm block py-5 px-4 leading-5 font-medium tracking-[-0.96px] text-blue-1300'>Crowns</span></td>
                                             <td><span className='block py-5 text-center '><img src="images/minus.svg" className='inline-block' alt="" /></span></td>
                                             <td><span className='block py-5 text-center '><img src="images/minus.svg" className='inline-block' alt="" /></span></td>
                                             <td><span className='block py-5 text-center '><img src="images/check-icon.svg" className='inline-block' alt="" /></span></td>
                                        </tr>
                                        <tr className='bg-gray-1400'>
                                             <td><span className='text-sm block py-5 px-4 leading-5 font-medium tracking-[-0.96px] text-blue-1300'>Dentures / Bridges </span></td>
                                             <td><span className='block py-5 text-center '><img src="images/minus.svg" className='inline-block' alt="" /></span></td>
                                             <td><span className='block py-5 text-center '><img src="images/minus.svg" className='inline-block' alt="" /></span></td>
                                             <td><span className='block py-5 text-center '><img src="images/check-icon.svg" className='inline-block' alt="" /></span></td>
                                        </tr>
                                        <tr className=''>
                                             <td><span className='text-sm block py-5 px-4 leading-5 font-medium tracking-[-0.96px] text-blue-1300'>* If Required</span></td>
                                             <td><span className='block py-5 text-center '><img src="images/check-icon.svg" className='inline-block' alt="" /></span></td>
                                             <td><span className='block py-5 text-center '><img src="images/check-icon.svg" className='inline-block' alt="" /></span></td>
                                             <td><span className='block py-5 text-center '><img src="images/check-icon.svg" className='inline-block' alt="" /></span></td>
                                        </tr>
                                   </tbody>
                              </table>
                         </div>
                         <div className='md:hidden block mt-6'>
                              <div className='border  mb-6 font-inter border-gray-1200 '>
                                   <div className='p-4'>
                                        <h4 className='text-xl font-semibold leading-[30px] text-blue-1200'>Band 1</h4>
                                   </div>
                                   <div className='pt-8 px-4 pb-12'>
                                        <h2 className='text-5xl font-semibold tracking-[-0.96px] leading-[60px] text-blue-1300'>£26.80</h2>
                                   </div>
                                   <div className='flex items-center p-4 justify-between bg-gray-1400'>
                                        <h6 className='text-sm font-medium leading-5 text-blue-1300'>Dental Examination</h6>
                                        <img src="images/check-icon.svg" alt="" />
                                   </div>
                                   <div className='flex items-center p-4 justify-between '>
                                        <h6 className='text-sm font-medium leading-5 text-blue-1300'>Diagnosis (inc X-Rays)</h6>
                                        <img src="images/check-icon.svg" alt="" />
                                   </div>
                                   <div className='flex items-center p-4 justify-between bg-gray-1400'>
                                        <h6 className='text-sm font-medium leading-5 text-blue-1300'>Prevention Advice</h6>
                                        <img src="images/check-icon.svg" alt="" />
                                   </div>
                                   <div className='flex items-center p-4 justify-between '>
                                        <h6 className='text-sm font-medium leading-5 text-blue-1300'>Scale / Polish</h6>
                                        <img src="images/check-icon.svg" alt="" />
                                   </div>
                                   <div className='flex items-center p-4 justify-between bg-gray-1400'>
                                        <h6 className='text-sm font-medium leading-5 text-blue-1300'>Fluoride Varnish</h6>
                                        <img src="images/check-icon.svg" alt="" />
                                   </div>
                                   <div className='flex items-center p-4 justify-between '>
                                        <h6 className='text-sm font-medium leading-5 text-blue-1300'>Fissure Sealant</h6>
                                        <img src="images/check-icon.svg" alt="" />
                                   </div>
                                   <div className='flex items-center p-4 justify-between bg-gray-1400'>
                                        <h6 className='text-sm font-medium leading-5 text-blue-1300'>* If Required</h6>
                                        <img src="images/check-icon.svg" alt="" />
                                   </div>
                              </div>
                              <div className='border mb-6 font-inter border-gray-1200 '>
                                   <div className='p-4'>
                                        <h4 className='text-xl font-semibold leading-[30px] text-blue-1200'>Band 2</h4>
                                   </div>
                                   <div className='pt-8 px-4 pb-12'>
                                        <h2 className='text-5xl font-semibold tracking-[-0.96px] leading-[60px] text-blue-1300'>£73.50</h2>
                                   </div>
                                   <div className='flex items-center p-4 justify-between bg-gray-1400'>
                                        <h6 className='text-sm font-medium leading-5 text-blue-1300'>Dental Examination</h6>
                                        <img src="images/check-icon.svg" alt="" />
                                   </div>
                                   <div className='flex items-center p-4 justify-between '>
                                        <h6 className='text-sm font-medium leading-5 text-blue-1300'>Diagnosis (inc X-Rays)</h6>
                                        <img src="images/check-icon.svg" alt="" />
                                   </div>
                                   <div className='flex items-center p-4 justify-between bg-gray-1400'>
                                        <h6 className='text-sm font-medium leading-5 text-blue-1300'>Prevention Advice</h6>
                                        <img src="images/check-icon.svg" alt="" />
                                   </div>
                                   <div className='flex items-center p-4 justify-between '>
                                        <h6 className='text-sm font-medium leading-5 text-blue-1300'>Scale / Polish</h6>
                                        <img src="images/check-icon.svg" alt="" />
                                   </div>
                                   <div className='flex items-center p-4 justify-between bg-gray-1400'>
                                        <h6 className='text-sm font-medium leading-5 text-blue-1300'>Fluoride Varnish</h6>
                                        <img src="images/check-icon.svg" alt="" />
                                   </div>
                                   <div className='flex items-center p-4 justify-between '>
                                        <h6 className='text-sm font-medium leading-5 text-blue-1300'>Fillings</h6>
                                        <img src="images/check-icon.svg" alt="" />
                                   </div>
                                   <div className='flex items-center p-4 justify-between bg-gray-1400'>
                                        <h6 className='text-sm font-medium leading-5 text-blue-1300'>Root Canals</h6>
                                        <img src="images/check-icon.svg" alt="" />
                                   </div>
                                   <div className='flex items-center p-4 justify-between '>
                                        <h6 className='text-sm font-medium leading-5 text-blue-1300'>Tooth Extraction</h6>
                                        <img src="images/check-icon.svg" alt="" />
                                   </div>
                                   <div className='flex items-center p-4 justify-between bg-gray-1400'>
                                        <h6 className='text-sm font-medium leading-5 text-blue-1300'>Crowns</h6>
                                        <img src="images/check-icon.svg" alt="" />
                                   </div>
                                   <div className='flex items-center p-4 justify-between '>
                                        <h6 className='text-sm font-medium leading-5 text-blue-1300'>Dentures / Bridges </h6>
                                        <img src="images/check-icon.svg" alt="" />
                                   </div>
                                   <div className='flex items-center p-4 justify-between bg-gray-1400'>
                                        <h6 className='text-sm font-medium leading-5 text-blue-1300'>* If Required</h6>
                                        <img src="images/check-icon.svg" alt="" />
                                   </div>
                              </div>
                              <div className='border mb-6 font-inter border-gray-1200 '>
                                   <div className='p-4'>
                                        <h4 className='text-xl font-semibold leading-[30px] text-blue-1200'>Band 2</h4>
                                   </div>
                                   <div className='pt-8 px-4 pb-12'>
                                        <h2 className='text-5xl font-semibold tracking-[-0.96px] leading-[60px] text-blue-1300'>£73.50</h2>
                                   </div>
                                   <div className='flex items-center p-4 justify-between bg-gray-1400'>
                                        <h6 className='text-sm font-medium leading-5 text-blue-1300'>Dental Examination</h6>
                                        <img src="images/check-icon.svg" alt="" />
                                   </div>
                                   <div className='flex items-center p-4 justify-between '>
                                        <h6 className='text-sm font-medium leading-5 text-blue-1300'>Diagnosis (inc X-Rays)</h6>
                                        <img src="images/check-icon.svg" alt="" />
                                   </div>
                                   <div className='flex items-center p-4 justify-between bg-gray-1400'>
                                        <h6 className='text-sm font-medium leading-5 text-blue-1300'>Prevention Advice</h6>
                                        <img src="images/check-icon.svg" alt="" />
                                   </div>
                                   <div className='flex items-center p-4 justify-between '>
                                        <h6 className='text-sm font-medium leading-5 text-blue-1300'>Scale / Polish</h6>
                                        <img src="images/check-icon.svg" alt="" />
                                   </div>
                                   <div className='flex items-center p-4 justify-between bg-gray-1400'>
                                        <h6 className='text-sm font-medium leading-5 text-blue-1300'>Fluoride Varnish</h6>
                                        <img src="images/check-icon.svg" alt="" />
                                   </div>
                                   <div className='flex items-center p-4 justify-between '>
                                        <h6 className='text-sm font-medium leading-5 text-blue-1300'>Fillings</h6>
                                        <img src="images/check-icon.svg" alt="" />
                                   </div>
                                   <div className='flex items-center p-4 justify-between bg-gray-1400'>
                                        <h6 className='text-sm font-medium leading-5 text-blue-1300'>Root Canals</h6>
                                        <img src="images/check-icon.svg" alt="" />
                                   </div>
                                   <div className='flex items-center p-4 justify-between '>
                                        <h6 className='text-sm font-medium leading-5 text-blue-1300'>Tooth Extraction</h6>
                                        <img src="images/check-icon.svg" alt="" />
                                   </div>
                                   <div className='flex items-center p-4 justify-between bg-gray-1400'>
                                        <h6 className='text-sm font-medium leading-5 text-blue-1300'>* If Required</h6>
                                        <img src="images/check-icon.svg" alt="" />
                                   </div>
                              </div>
                              <div className='border mb-6 font-inter border-gray-1200 '>
                                   <div className='p-4'>
                                        <h4 className='text-xl font-semibold leading-[30px] text-blue-1200'>Band 3</h4>
                                   </div>
                                   <div className='pt-8 px-4 pb-12'>
                                        <h2 className='text-5xl font-semibold tracking-[-0.96px] leading-[60px] text-blue-1300'>£319.10</h2>
                                   </div>
                                   <div className='flex items-center p-4 justify-between bg-gray-1400'>
                                        <h6 className='text-sm font-medium leading-5 text-blue-1300'>Dental Examination</h6>
                                        <img src="images/check-icon.svg" alt="" />
                                   </div>
                                   <div className='flex items-center p-4 justify-between '>
                                        <h6 className='text-sm font-medium leading-5 text-blue-1300'>Diagnosis (inc X-Rays)</h6>
                                        <img src="images/check-icon.svg" alt="" />
                                   </div>
                                   <div className='flex items-center p-4 justify-between bg-gray-1400'>
                                        <h6 className='text-sm font-medium leading-5 text-blue-1300'>Prevention Advice</h6>
                                        <img src="images/check-icon.svg" alt="" />
                                   </div>
                                   <div className='flex items-center p-4 justify-between '>
                                        <h6 className='text-sm font-medium leading-5 text-blue-1300'>Scale / Polish</h6>
                                        <img src="images/check-icon.svg" alt="" />
                                   </div>
                                   <div className='flex items-center p-4 justify-between bg-gray-1400'>
                                        <h6 className='text-sm font-medium leading-5 text-blue-1300'>Fluoride Varnish</h6>
                                        <img src="images/check-icon.svg" alt="" />
                                   </div>
                                   <div className='flex items-center p-4 justify-between '>
                                        <h6 className='text-sm font-medium leading-5 text-blue-1300'>Fillings</h6>
                                        <img src="images/check-icon.svg" alt="" />
                                   </div>
                                   <div className='flex items-center p-4 justify-between bg-gray-1400'>
                                        <h6 className='text-sm font-medium leading-5 text-blue-1300'>Root Canals</h6>
                                        <img src="images/check-icon.svg" alt="" />
                                   </div>
                                   <div className='flex items-center p-4 justify-between '>
                                        <h6 className='text-sm font-medium leading-5 text-blue-1300'>Tooth Extraction</h6>
                                        <img src="images/check-icon.svg" alt="" />
                                   </div>
                                   <div className='flex items-center p-4 justify-between bg-gray-1400'>
                                        <h6 className='text-sm font-medium leading-5 text-blue-1300'>Crowns</h6>
                                        <img src="images/check-icon.svg" alt="" />
                                   </div>
                                   <div className='flex items-center p-4 justify-between '>
                                        <h6 className='text-sm font-medium leading-5 text-blue-1300'>Dentures / Bridges </h6>
                                        <img src="images/check-icon.svg" alt="" />
                                   </div>
                                   <div className='flex items-center p-4 justify-between bg-gray-1400'>
                                        <h6 className='text-sm font-medium leading-5 text-blue-1300'>* If Required</h6>
                                        <img src="images/check-icon.svg" alt="" />
                                   </div>
                              </div>
                         </div>
                    </div>
               </section >
               <Appoinment></Appoinment>
               <Footer></Footer>
          </div >
     )
}

export default page
