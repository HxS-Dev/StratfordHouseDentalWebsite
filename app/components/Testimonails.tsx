'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { motion } from "framer-motion";

import 'swiper/css';
import 'swiper/css/pagination';
function Testimonails() {
     return (
          <>
               <motion.div
                 className='lg:mx-0 -mx-4'
                 initial={{ opacity: 0, y: 40 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, amount: 0.2 }}
                 transition={{ duration: 0.7 }}
               >
                    <Swiper
                         modules={[Pagination]}
                         pagination={{ clickable: true }}
                         spaceBetween={30}
                         slidesPerView={1}
                    >
                         {[0,1,2,3].map((idx) => (
                           <SwiperSlide key={idx}>
                              <motion.div
                                className="bg-blue-1200 lg:pt-0 pt-12 lg:pb-0 md:pb-[82px] pb-12 lg:flex-nowrap flex-wrap flex items-center lg:pl-[62px] px-4  lg:pr-[87px] min-h-[490px] xl:gap-0 gap-5"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.7, delay: 0.1 * idx }}
                              >
                                   <div className='lg:w-7/12 w-full'>
                                        <div className='max-w-[550px] lg:mx-0 mx-auto'>
                                             <img src="images/double-quotes-l.svg" alt="" />
                                             <p className='md:text-lg text-base text-white font-normal leading-[150%] md:mb-[52px] mb-6'>Facilisis fusce nulla mauris et faucibus ut sodales maecenas. Dui pellentesque orci aliquam tempus at at mi arcu. Nibh nunc amet molestie ornare pellentesque. Enim in id elit adipiscing ac velit pretium.</p>
                                             <div className='flex items-center gap-3'>
                                                  <img src="images/avatar.png" className='w-[54px] h-[54px] rounded-full' alt="" />
                                                  <div className=''>
                                                       <h6 className='text-base mb-0.5 tracking-[-0.32px] font-semibold text-white'>Eleanor Pena</h6>
                                                       <span className='block text-white text-sm font-normal leading-[160%] tracking-[-0.28px]'>Co-Founder, Heroes Digital</span>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                                   <div className='lg:w-5/12 w-full'>
                                        <div className='lg:-my-[53px] lg:text-start text-center'>
                                             <img src="images/testimonail-img.png" className='hidden md:inline-block' alt="" />
                                             <img src="images/testimonail-img-m.png" className='w-full md:hidden inline-block' alt="" />
                                        </div>
                                   </div>
                              </motion.div>
                           </SwiperSlide>
                         ))}
                    </Swiper>
               </motion.div>
          </>
     )
}

export default Testimonails
