import Appoinment from '@/app/components/Appoinment';
import Button from '@/app/components/Buttons';
import Footer from '@/app/components/Footer'
import Header from '@/app/components/Header'
import HeroSec from '@/app/components/HeroSec'
import React from 'react'
type TitlePart = {
     tag: "h1" | "h6";
     text: string;
};
const exampleTitleParts: TitlePart[] = [
     { tag: "h6", text: "The Treatments We Offer" },
     { tag: "h1", text: "Preventative Care" },
];
function page() {
     return (
          <>
               <Header></Header>
               <HeroSec titleParts={exampleTitleParts} />
               <section className='md:pt-[105px]  pt-8'>
                    <div className="xl:max-w-[1270px]  w-full max-w-[952px] relative md:px-5 px-4 mx-auto">
                         <img src="images/article-2.png" className='md:mb-8 mb-6' alt="" />
                         <h2 className='md:text-[40px] text-2xl md:mb-8 mb-2.5 font-medium md:leading-[44px] leading-7 text-blue-1300'>Preventative Care</h2>
                         <p className='md:text-lg text-base font-normal md:leading-7 leading-6 text-black'>To ensure that your teeth and gums remain healthy, it is recommended that you visit your dentist frequently for a routine examination. Regular dental check-ups are vital to ensure that any problems are spotted before they develop into issues, requiring major restorative treatment.</p>
                    </div>
               </section>
               <section className='md:mt-20 mt-8 mb-4 relative overflow-hidden'>
                    <div className="xl:max-w-[1270px] w-full max-w-[952px]  md:px-5 px-4 mx-auto">
                         <div className='flex lg:flex-nowrap flex-wrap md:gap-4 gap-8'>
                              <div className="lg:w-1/2  lg:order-1 order-2 w-full justify-center flex flex-col">
                                   <div className='max-w-[530px]'>
                                        <h2 className='md:text-[30px] text-2xl md:mb-8 mb-2.5 font-medium md:leading-[44px] leading-7 text-blue-1300'>Dental Examinations</h2>
                                        <p className='md:text-lg text-base font-normal md:leading-7 leading-6 text-tertiary-600 md:mb-6'>Prior to a dental examination your dentist will gather your dental history, including your dental x-rays.</p>
                                        <p className='md:text-lg text-base font-normal md:leading-7 leading-6 text-tertiary-600 md:mb-6'>A thorough examination will be made of all your teeth, paying particular attention to any previous dental work to check their integrity. The dentist may take the opportunity to give your teeth a scale and polish.</p>
                                        <p className='md:text-lg text-base font-normal md:leading-7 leading-6 text-tertiary-600 md:mb-6'>If any problems are spotted, your dentist will explain their diagnosis and discuss treatment options.</p>
                                   </div>
                              </div>
                              <div className='lg:w-1/2 w-full  lg:order-2 order-1'>
                                   <div className="text-center">
                                        <img src="images/treatment-img1.png" className='inline-block' alt="" />
                                   </div>
                              </div>
                         </div>

                    </div>
               </section>
               <section className='md:mb-6  relative overflow-hidden'>
                    <div className="xl:max-w-[1270px]  w-full max-w-[952px]  md:px-5 px-4 mx-auto">
                         <div className='flex lg:flex-nowrap flex-wrap md:gap-4 gap-8'>
                              <div className='lg:w-1/2 w-full'>
                                   <div className='text-center'>
                                        <img src="images/treatment-img2.png" className='inline-block' alt="" />
                                   </div>
                              </div>
                              <div className="lg:w-1/2 w-full  2xl:max-w-full 2xl:min-h-[560px] xl:min-h-[465px] lg:min-h-[384px] justify-center flex flex-col">
                                   <div className='lg:max-w-[560px] lg:ml-auto'>
                                        <h2 className='md:text-[30px] text-2xl md:mb-8 mb-2.5 font-medium md:leading-[44px] leading-7 text-blue-1300'>Fissure Sealants and Fluoride Varnish</h2>
                                        <p className='md:text-lg text-base font-normal md:leading-7 leading-6 text-tertiary-600 md:mb-6'>As well as regular checkups we can also offer preventative treatments such as Fissure Sealants. Ideal for children between the ages of 6 and 14, they offer an invisible sealant that protects teeth from decay.</p>
                                        <p className='md:text-lg text-base font-normal md:leading-7 leading-6 text-tertiary-600'>We can also offer Fluoride Varnish, a short term treatment applied to the enamel, dentine or cementum of the tooth. It helps prevent decay, remineralise the tooth surface and to treat dentine hypersensitivity.</p>
                                   </div>
                              </div>
                         </div>

                    </div>
               </section>
               <Appoinment></Appoinment>
               <section className='bg-gray-1000 lg:pt-28 py-20 lg:pb-24'>
                    <div className='flex 2xl:gap-14 lg:flex-nowrap flex-wrap gap-8 items-center'>
                         <div className='lg:w-1/3 w-full'>
                              <div className='lg:text-start z-10 lg:w-fit relative text-center'>
                                   <img src="images/left-img.png" className='inline-block' alt="" />
                                   <div className='-bottom-12 -z-10 absolute right-0'>
                                        <img src="images/emoji-icon4.svg" alt="" />
                                   </div>
                              </div>
                         </div>
                         <div className="lg:w-1/3 w-full">
                              <div className="lg:px-0 relative z-10 md:px-10 px-4">
                                   <h2 className="2xl:text-[36px] text-center text-2xl font-semibold 2xl:leading-[44px] leading-[130%] md:tracking-[-0.72px] tracking-[-0.48px] text-blue-1300">Begin Your Journey to Better Dental Health Today</h2>
                                   <p className="2xl:text-xl text-center text-base md:mt-5 mt-4 md:mb-12 mb-6 font-normal 2xl:leading-[30px] leading-6 text-tertiary-600">Take the first step towards a healthier smile and improved confidence. Our expert team is ready to provide you with exceptional dental care.</p>
                                   <form action="" className="flex items-center gap-4">
                                        <input type="email" className="text-base flex-1 leading-6 font-normal text-gray-1500 placeholder:text-gray-1500 px-[14px] border border-gray-1200 bg-white w-full h-12 shadow-3xl" placeholder="Enter your email"></input>
                                        <Button>Contact Us</Button>
                                   </form>
                              </div>
                         </div>
                         <div className='lg:w-1/3 w-full'>
                              <div className='lg:text-end z-10 w-fit md:ml-auto text-center relative'>
                                   <img src="images/right-img.png" className='inline-block' alt="" />
                                   <div className='absolute -z-10 -top-11 -left-14'>
                                        <img src="images/emoji-icon.svg" alt="" />
                                   </div>
                              </div>
                         </div>
                    </div>
               </section>
               <Footer></Footer>
          </>
     )
}

export default page
