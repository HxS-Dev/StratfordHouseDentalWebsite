import React from 'react'
import Link from 'next/link'
function Footer() {
     return (
          <footer className='bg-blue-1200 md:pt-20 md:pb-14 py-12'>
               <div className="xl:max-w-[1270px] max-w-[952px]  relative md:px-5 px-4 mx-auto">
                    <div className='flex mb-14 items-center justify-between'>
                         <Link href={"/#hero-sec"}>
                         <img src="/images/footer-logo.svg" alt="" />
                         </Link>
                         <ul className='flex items-center gap-2'>
                              <li>
                                   <Link href="/" className='w-10 h-10 transition-all duration-300 hover:opacity-80 flex items-center justify-center bg-white'><img src="/images/linkdin.svg" alt="" /></Link>
                              </li>
                              <li>
                                   <Link href="/" className='w-10 h-10 transition-all duration-300 hover:opacity-80 flex items-center justify-center bg-white'><img src="/images/fb-icon.svg" alt="" /></Link>
                              </li>
                              <li>
                                   <Link href="/" className='w-10 h-10 transition-all duration-300 hover:opacity-80 flex items-center justify-center bg-white'><img src="/images/insta-icon.svg" alt="" /></Link>
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
                                        <Link href="/" className='text-lg font-normal w-fit hover:underline leading-[150%] tracking-[-0.36px] mb-4 text-gray-1000 block'>Services </Link>
                                   </li>
                                   <li>
                                        <Link href="/#contact-sec" className='text-lg font-normal w-fit hover:underline leading-[150%] tracking-[-0.36px] text-gray-1000 block'>Contact Us </Link>
                                   </li>
                              </ul>
                         </div>
                         <div className='md:w-3/12 w-1/2'>
                              <h4 className='text-lg font-semibold mb-4 leading-[150%] text-white'>Services</h4>
                              <ul>
                                   <li>
                                        <Link href="/" className='text-lg font-normal w-fit hover:underline leading-[150%] tracking-[-0.36px] mb-4 text-gray-1000 block'>Preventive Treatemtn </Link>
                                   </li>
                                   <li>
                                        <Link href="/" className='text-lg font-normal w-fit hover:underline leading-[150%] tracking-[-0.36px] mb-4 text-gray-1000 block'>Cavity Treatment</Link>
                                   </li>
                                   <li>
                                        <Link href="/" className='text-lg font-normal w-fit hover:underline leading-[150%] tracking-[-0.36px] mb-4 text-gray-1000 block'>Hygeine Services  </Link>
                                   </li>
                                   <li>
                                        <Link href="/" className='text-lg font-normal w-fit hover:underline leading-[150%] tracking-[-0.36px]  text-gray-1000 block'>Teeth Implants </Link>
                                   </li>
                              </ul>
                         </div>
                         <div className='md:w-3/12 w-1/2'>
                              <h4 className='text-lg font-semibold mb-4 leading-[150%] text-white'>Resources</h4>
                              <ul>
                                   <li>
                                        <Link href="/" className='text-lg font-normal w-fit hover:underline leading-[150%] tracking-[-0.36px] mb-4 text-gray-1000 block'>Customer Service </Link>
                                   </li>
                                   <li>
                                        <Link href="/" className='text-lg font-normal w-fit hover:underline leading-[150%] tracking-[-0.36px] mb-4 text-gray-1000 block'>Help Center</Link>
                                   </li>
                                   <li>
                                        <Link href="/" className='text-lg font-normal w-fit hover:underline leading-[150%] tracking-[-0.36px]  text-gray-1000 block'>News </Link>
                                   </li>
                              </ul>
                         </div>
                    </div>
                    <div className='md:mt-14 mt-[38px] md:flex items-center justify-between md:pt-14 pt-[38px] border-t border-white/[10%]'>
                         <p className='text-base md:mt-0 mt-3 text-white font-medium leading-6 tracking-[-0.32px]'>© Stratford Hours, All Rights Reserved</p>
                    </div>
               </div>
          </footer>
     )
}

export default Footer
