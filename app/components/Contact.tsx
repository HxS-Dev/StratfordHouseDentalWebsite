import React from 'react'
import Button from './Buttons'
function Contact() {
     return (
          <section id='contact-sec' className="md:my-24 mt-12">
               <div className="xl:max-w-[1270px] max-w-[952px]  relative md:px-5 px-4 mx-auto">
                    <div className="bg-gray-1400 items-center md:mx-0 -mx-4 md:pb-0 pb-9 grid lg:grid-cols-2">
                         <div className="md:py-[29px] pt-12 pb-[29px] xl:px-0 px-4 mx-auto max-w-[480px]">
                              <h2 className="md:text-[36px] text-2xl font-semibold md:leading-[44px] leading-[130%] md:tracking-[-0.72px] tracking-[-0.48px] text-blue-1300">Begin Your Journey to Better Dental Health Today</h2>
                              <p className="md:text-xl text-base md:mt-5 mt-4 md:mb-12 mb-6 font-normal md:leading-[30px] leading-6 text-tertiary-600">Take the first step towards a healthier smile and improved confidence. Our expert team is ready to provide you with exceptional dental care.</p>
                              <form action="" className="flex items-center gap-4">
                                   <input type="email" className="text-base flex-1 leading-6 font-normal text-gray-1500 placeholder:text-gray-1500 px-[14px] border border-gray-1200 bg-white w-full h-12 shadow-3xl" placeholder="Enter your email"></input>
                                   <Button>Contact Us</Button>
                              </form>
                         </div>
                         <div className="md:mx-0 mx-4">
                              <img src="/images/contact-img.png" className='w-full' alt="" />
                         </div>
                    </div>
               </div>
          </section>
     )
}

export default Contact
