"use client";
import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import Link from "next/link";
import { urlFor } from "@/lib/imageBuilder";
import { sanityClient } from "@/lib/sanity";
import { allTreatmentsQuery } from "@/lib/queries";
import { motion } from "framer-motion";

function Treatment() {
     const prevRef = useRef<HTMLButtonElement>(null);
     const nextRef = useRef<HTMLButtonElement>(null);
     const [swiperInstance, setSwiperInstance] = useState<any>(null);
     const [treatments, setTreatments] = useState<any[]>([]);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          const fetchTreatments = async () => {
               try {
                    const data = await sanityClient.fetch(allTreatmentsQuery);
                    setTreatments(data);
               } catch (error) {
                    console.error('Error fetching treatments:', error);
               } finally {
                    setLoading(false);
               }
          };

          fetchTreatments();
     }, []);

     useEffect(() => {
          if (
               swiperInstance &&
               prevRef.current !== null &&
               nextRef.current !== null
          ) {
               swiperInstance.params.navigation.prevEl = prevRef.current;
               swiperInstance.params.navigation.nextEl = nextRef.current;

               swiperInstance.navigation.destroy();
               swiperInstance.navigation.init();
               swiperInstance.navigation.update();
          }
     }, [swiperInstance]);

     if (loading) {
          return (
               <motion.div
                 className="relative md:-mt-[232px] -mt-[100px] xl:max-w-[1270px] max-w-[952px] md:px-5 px-4 mx-auto "
                 initial={{ opacity: 0, y: 40 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.7 }}
               >
                    <div className="flex gap-4 items-center md:justify-end justify-start">
                         <button
                              ref={prevRef}
                              className="custom-prev-button cursor-pointer transition-all duration-300 hover:bg-blue-1000 hover:border-transparent rounded-full md:w-[46px] w-10 md:h-[46px] h-10 border border-gray-1000 flex items-center justify-center"
                              aria-label="Previous slide"
                         >
                              <img src="images/arrow-left.svg" alt="Previous" />
                         </button>
                         <button
                              ref={nextRef}
                              className="custom-next-button cursor-pointer transition-all duration-300 hover:bg-blue-1000 hover:border-transparent rounded-full md:w-[46px] w-10 md:h-[46px] h-10 border border-gray-1000 flex items-center justify-center"
                              aria-label="Next slide"
                         >
                              <img src="images/arrow-right.svg" alt="Next" />
                         </button>
                    </div>
                    <div className="mySwiper !overflow-visible md:mt-[34px] mt-4">
                         <div className="flex space-x-6">
                              {[1, 2, 3].map((i) => (
                                   <div key={i} className="animate-pulse">
                                        <div className="w-full h-[231px] bg-gray-200 rounded"></div>
                                        <div className="h-6 bg-gray-200 rounded mt-8 mb-3"></div>
                                        <div className="h-4 bg-gray-200 rounded"></div>
                                   </div>
                              ))}
                         </div>
                    </div>
               </motion.div>
          );
     }

     return (
          <motion.div
            className="relative md:-mt-[232px] -mt-[100px] xl:max-w-[1270px] max-w-[952px]   md:px-5 px-4 mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
               <div className="flex gap-4 items-center md:justify-end justify-start padding-10">
                    <button
                         ref={prevRef}
                         className="custom-prev-button cursor-pointer transition-all duration-300 hover:bg-blue-1000 hover:border-transparent rounded-full md:w-[46px] w-10 md:h-[46px] h-10 border border-gray-1000 flex items-center justify-center"
                         aria-label="Previous slide"
                    >
                         <img src="images/arrow-left.svg" alt="Previous" />
                    </button>
                    <button
                         ref={nextRef}
                         className="custom-next-button cursor-pointer transition-all duration-300 hover:bg-blue-1000 hover:border-transparent rounded-full md:w-[46px] w-10 md:h-[46px] h-10 border border-gray-1000 flex items-center justify-center"
                         aria-label="Next slide"
                    >
                         <img src="images/arrow-right.svg" alt="Next" />
                    </button>
               </div>
               <Swiper
                    slidesPerView={3.1}
                    spaceBetween={24}
                    modules={[Navigation]}
                    onSwiper={setSwiperInstance}
                    breakpoints={{
                         320: { slidesPerView: 1, spaceBetween: 20 },
                         575: { slidesPerView: 1.2, },
                         767: { slidesPerView: 1.9 },
                         991: { slidesPerView: 3.1 },
                    }}
                    className="mySwiper !overflow-visible md:mt-[34px] mt-4"
               >
                    {treatments.slice(0, 10).map((treatment: any, idx: number) => (
                         <SwiperSlide key={treatment._id}>
  <Link href={`/treatment/${treatment.slug.current}`} >
    <motion.div
      className="w-full bg-white h-full flex flex-col"
      whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.img
        src={treatment.mainImage ? urlFor(treatment.mainImage).url() : "images/card-img1.png"}
        alt={treatment.mainImage?.alt || treatment.title}
        height={231}
        className='w-full h-[231px] object-cover object-center '
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 * idx, duration: 0.5 }}
      />
      <div className="pt-6 pb-4 px-2 flex-1 flex flex-col">
        <h4 className='text-2xl text-limit font-semibold leading-[130%] tracking-[-0.72px] mb-3 text-grayscale-900'>
          {treatment.title}
        </h4>
        <p className='text-lg font-normal leading-[150%] tracking-[-0.36px] text-grayscale-500 line-clamp-3 min-h-[72px]'>
          {treatment.description}
        </p>
      </div>
    </motion.div>
  </Link>
</SwiperSlide>
                    ))}
               </Swiper>
          </motion.div>
     )
}

export default Treatment
