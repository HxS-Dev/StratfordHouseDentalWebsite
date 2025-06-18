'use client';
import Link from 'next/link'
import Button from './Buttons';
import { useState } from "react";
import TreatmentsDropdown from './TreatmentsDropdown';
import { motion } from "framer-motion";



function Header() {
     const [menuOpen, setMenuOpen] = useState(false);
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
                                        <Link className='text-lg lg:pb-0 pb-4 font-medium leading-6 text-black block transition-all duration-300 hover:text-blue-1000' href="/">
                                        Home
                                        </Link>
                                   </li>
                                   <li>
                                        <Link className='text-lg lg:pb-0 pb-4 font-medium leading-6 text-black block transition-all duration-300 hover:text-blue-1000' href="/about">
                                        About Us
                                        </Link>
                                   </li>
                                   <li>
                                        <Link className='text-lg lg:pb-0 pb-4 font-medium leading-6 text-black block transition-all duration-300 hover:text-blue-1000' href="/dentalfees">
                                        Fees
                                        </Link>
                                   </li>
                                   <li>
                                        <Link className='text-lg lg:pb-0 pb-4 font-medium leading-6 text-black block transition-all duration-300 hover:text-blue-1000' href="/news">
                                        News
                                        </Link>
                                   </li>
                                   <li>
                                        <Link className='text-lg lg:pb-0 pb-4 font-medium leading-6 text-black block transition-all duration-300 hover:text-blue-1000' href="/#contact-sec">
                                        Contact
                                        </Link>
                                   </li>
                                   <li>
                                     <TreatmentsDropdown/>
                                   </li>
                              </ul>
                              <Button>Book Appointment</Button>
                         </div>
                         <button type='button' onClick={() => setMenuOpen(!menuOpen)} className='bg-transparent border-0 p-0 lg:hidden'><img src="images/hamburger.svg" alt=''></img></button>
                    </div>
               </div>
          </motion.div>
     )
}

export default Header
