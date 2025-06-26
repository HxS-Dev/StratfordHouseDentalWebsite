'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { motion } from "framer-motion";

import 'swiper/css';
import 'swiper/css/pagination';

const testimonialData = [
     {
          quote: "I was impressed by the professionalism and kindness of the entire team. Even as a new patient, I felt welcome and well cared for.",
          name: "Default User",
          role: "New Patient",
          avatar: "/images/emoji-icon3.svg", // profile icon style
          main: "/images/testimonail-img.png", // default main image
          mainMobile: "/images/testimonail-img-m.png" // default mobile image
     },
     {
          quote: "Stratford House Dental Practice made me feel at ease from the moment I walked in. The staff are friendly and professional, and my treatment was painless and quick. Highly recommended!",
          name: "Sarah Johnson",
          role: "Marketing Manager",
          avatar: "/images/avatar.png",
          main: "/images/about-img.png",
          mainMobile: "/images/about-img.png"
     },
     {
          quote: "I was nervous about visiting the dentist, but Dr. Patel explained everything clearly and made sure I was comfortable. The results are fantastic!",
          name: "James Lee",
          role: "Software Engineer",
          avatar: "/images/team-img1.png",
          main: "/images/slide-img1.png",
          mainMobile: "/images/slide-img1.png"
     },
     {
          quote: "The hygienist was gentle and thorough. My teeth have never felt cleaner. I appreciate the care and attention to detail.",
          name: "Emily Carter",
          role: "Teacher",
          avatar: "/images/emoji-icon2.svg",
          main: "/images/about-img2.png",
          mainMobile: "/images/about-img2.png"
     },
     {
          quote: "Booking an appointment was easy and convenient. The clinic is modern and spotless. I will definitely return for future treatments.",
          name: "Michael Brown",
          role: "Business Owner",
          avatar: "/images/emoji-icon4.svg",
          main: "/images/dental-img.png",
          mainMobile: "/images/dental-img.png"
     }
];

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
                         {testimonialData.map((testimonial, idx) => (
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
                                             <p className='md:text-lg text-base text-white font-normal leading-[150%] md:mb-[52px] mb-6'>{testimonial.quote}</p>
                                             <div className='flex items-center gap-3'>
                                                  <img
                                                    src={testimonial.avatar}
                                                    onError={e => { e.currentTarget.src = '/images/emoji-icon3.svg'; }}
                                                    className='w-[54px] h-[54px] rounded-full object-cover bg-white border border-blue-300'
                                                    alt="Profile icon"
                                                  />
                                                  <div className=''>
                                                       <h6 className='text-base mb-0.5 tracking-[-0.32px] font-semibold text-white'>{testimonial.name}</h6>
                                                       <span className='block text-white text-sm font-normal leading-[160%] tracking-[-0.28px]'>{testimonial.role}</span>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                                   <div className='lg:w-5/12 w-full'>
                                        <div className='lg:-my-[180px] lg:text-start text-center'>
                                             <img
                                               src={testimonial.main}
                                               onError={e => { e.currentTarget.src = '/images/testimonail-img.png'; }}
                                               className='hidden md:inline-block object-cover rounded-xl bg-white w-[620px] h-[620px] max-w-full max-h-[620px] mx-auto shadow-lg'
                                               alt="Testimonial main"
                                             />
                                             <img
                                               src={testimonial.mainMobile}
                                               onError={e => { e.currentTarget.src = '/images/testimonail-img-m.png'; }}
                                               className='w-full md:hidden inline-block object-cover rounded-xl bg-white max-h-[340px] mx-auto'
                                               alt="Testimonial main mobile"
                                             />
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
