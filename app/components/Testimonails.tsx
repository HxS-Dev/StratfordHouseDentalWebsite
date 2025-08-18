'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import { sanityClient } from '@/lib/sanity';
import { allTestimonialsQuery } from '@/lib/queries';
import { urlFor } from '@/lib/imageBuilder';

import 'swiper/css';
import 'swiper/css/pagination';

interface Testimonial {
  _id: string;
  quote: string;
  name: string;
  role: string;
  stars?: number;
  avatar?: any;
  mainImage?: any;
  mainImageMobile?: any;
  order: number;
  publishedAt: string;
}

// Fallback data
const fallbackTestimonialData = [
     {
          quote: "I was impressed by the professionalism and kindness of the entire team. Even as a new patient, I felt welcome and well cared for.",
          name: "Default User",
          role: "New Patient",
          avatar: "/images/emoji-icon3.svg",
          main: "/images/dental-img.png",
          stars: 5,
          mainMobile: "/images/dental-img.png"
     }
];

// Star Rating Component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1 mb-3">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

function Testimonails() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await sanityClient.fetch(allTestimonialsQuery);
        setTestimonials(data || []);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setTestimonials([]);
      }
    };

    fetchTestimonials();
  }, []);

  // Use fallback data if no CMS data or still loading
  const displayTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonialData;

  const getImageUrl = (image: any, fallback: string) => {
    if (image && image.asset) {
      return urlFor(image).url();
    }
    return fallback;
  };

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
          {displayTestimonials.map((testimonial: any, idx: number) => (
            <SwiperSlide key={testimonial._id || idx}>
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
                    {testimonial.stars && <StarRating rating={testimonial.stars} />}
                    <p className='md:text-lg text-base text-white font-normal leading-[150%] md:mb-[52px] mb-6'>{testimonial.quote}</p>
                    <div className='flex items-center gap-3'>
                      <img
                        src={getImageUrl(testimonial.avatar, '/images/emoji-icon3.svg')}
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
                      src={getImageUrl(testimonial.mainImage || testimonial.main, '/images/default-testimonial-main.png')}
                      onError={e => { e.currentTarget.src = '/images/testimonail-img.png'; }}
                      className='hidden md:inline-block object-cover rounded-xl bg-white w-[620px] h-[620px] max-w-full max-h-[620px] mx-auto shadow-lg'
                      alt="Testimonial main"
                    />
                    <img
                      src={getImageUrl(testimonial.mainImageMobile || testimonial.mainMobile, '/images/default-testimonial-main.png')}
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
  );
}

export default Testimonails
