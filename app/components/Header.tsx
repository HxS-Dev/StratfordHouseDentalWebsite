'use client';
import Link from 'next/link'
import { useState, useEffect } from "react";
import TreatmentsDropdown from './TreatmentsDropdown';
import FeesDropdown from './FeesDropdown';
import { motion } from "framer-motion";
import { usePathname } from 'next/navigation';
import { bookingLinkQuery } from '@/lib/queries';
import { sanityClient } from '@/lib/sanity';



function Header() {
     const [menuOpen, setMenuOpen] = useState(false);
     const [bookingLink, setBookingLink] = useState('');
     const pathname = usePathname();

     useEffect(() => {
          const fetchLink = async () => {
               const data = await sanityClient.fetch(bookingLinkQuery);
               setBookingLink(data?.bookingLink || '');
          };
          fetchLink();
     }, []);

     return (
          <motion.div
               className='bg-gray-1000 md:py-7 py-4'
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ type: "spring", stiffness: 80, damping: 14, duration: 0.7 }}
          >
               <div className='xl:max-w-[1270px] max-w-[952px]  md:px-5 px-4 mx-auto'>
                    <div className='flex items-center justify-between'>
                         <Link href="/" className='hover:opacity-70 transition-all duration-300'><img className='w-32 object-contain' src="/images/logo.svg" alt="no-img" /></Link>
                         <div className={`${menuOpen ? "block" : "hidden"
                              } lg:flex  lg:static absolute top-20 left-0 lg:p-0 py-10 p-4 w-full z-[99] lg:bg-transparent bg-gray-1000 gap-8 justify-end transition-all duration-300`}>
                              <ul className="lg:flex items-center xl:gap-10 gap-5">
                                   <li>
                                        <Link className={`text-lg lg:pb-0 pb-4 font-medium leading-6 block transition-all duration-300 rounded-md px-2 ${pathname === '/' ? 'bg-blue-1000 text-white shadow-md' : 'text-black hover:bg-blue-50 hover:text-blue-1000'}`} href="/">
                                        Home
                                        </Link>
                                   </li>
                                   <li>
                                        <Link className={`text-lg lg:pb-0 pb-4 font-medium leading-6 block transition-all duration-300 rounded-md px-2 ${pathname.startsWith('/about') ? 'bg-blue-1000 text-white shadow-md' : 'text-black hover:bg-blue-50 hover:text-blue-1000'}`} href="/about">
                                        About Us
                                        </Link>
                                   </li>
                                   <li>
                                        <FeesDropdown/>
                                   </li>
                                   <li>
                                        <Link className={`text-lg lg:pb-0 pb-4 font-medium leading-6 block transition-all duration-300 rounded-md px-2 ${pathname.startsWith('/news') ? 'bg-blue-1000 text-white shadow-md' : 'text-black hover:bg-blue-50 hover:text-blue-1000'}`} href="/news">
                                        News
                                        </Link>
                                   </li>

                                   <li>
                                     <TreatmentsDropdown/>
                                   </li>
                                   <li>
                                        <Link className={`text-lg lg:pb-0 pb-4 font-medium leading-6 block transition-all duration-300 rounded-md px-2 ${pathname.includes('/contact') ? 'bg-blue-1000 text-white shadow-md' : 'text-black hover:bg-blue-50 hover:text-blue-1000'}`} href="/contact">
                                        Contact
                                        </Link>
                                   </li>
                              </ul>
                              <div className="flex flex-col items-center">
                                   <a
                                        href="tel:01908313109"
                                        className="text-black md:text-base text-sm font-medium leading-6 mb-2"
                                        >
                                        01908 313109
                                   </a>
                                   <a
                                        href={bookingLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white md:text-base text-sm transtion ease-in-out duration-500 hover:text-blue-1000 hover:bg-transparent border border-blue-1000 font-medium leading-6 p-4 py-3 bg-blue-1000 inline-block"
                                        >
                                        Book Appointment
                                   </a>
                              </div>
                         </div>
                         <button type='button' onClick={() => setMenuOpen(!menuOpen)} className='bg-transparent border-0 p-0 lg:hidden'><img src="images/hamburger.svg" alt=''></img></button>
                    </div>
               </div>
          </motion.div>
     )
}

export default Header
