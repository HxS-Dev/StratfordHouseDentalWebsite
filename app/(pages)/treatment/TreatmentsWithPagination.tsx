"use client";
import Pagination from '@/app/components/Pagination';
import { urlFor } from '@/lib/imageBuilder';
import Link from 'next/link';
import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";

interface TreatmentsWithPaginationProps {
     treatments: any[];
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const TreatmentsWithPagination: React.FC<TreatmentsWithPaginationProps> = ({ treatments }) => {
     const [currentPage, setCurrentPage] = useState(1);
     const [treatmentsPerPage] = useState(3);
     const [pageKey, setPageKey] = useState(0);

     // Calculate pagination
     const indexOfLastTreatment = currentPage * treatmentsPerPage;
     const indexOfFirstTreatment = indexOfLastTreatment - treatmentsPerPage;
     const currentTreatments = treatments.slice(indexOfFirstTreatment, indexOfLastTreatment);
     const totalPages = Math.ceil(treatments.length / treatmentsPerPage);

     const paginate = (pageNumber: number) => {
       setCurrentPage(pageNumber);
       setPageKey(prev => prev + 1); // force AnimatePresence to re-animate
     };

     return (
          <>
               <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-6'>
                 <AnimatePresence mode="wait" initial={false}>
                   {currentTreatments.map((treatment: any, i: number) => (
                     <motion.div
                       key={treatment._id + pageKey}
                       variants={cardVariants}
                       initial="hidden"
                       animate="visible"
                       exit="hidden"
                       transition={{ delay: i * 0.10, duration: 0.5, type: "spring" }}
                       whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(0, 60, 255, 0.10)" }}
                     >
                       <Link href={`/treatment/${treatment.slug.current}`}> 
                         <div className="bg-white rounded-xl shadow-md border border-blue-100 overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
                           <img 
                             src={treatment.mainImage ? urlFor(treatment.mainImage).url() : "images/card-img1.png"} 
                             alt={treatment.mainImage?.alt || treatment.title} 
                             height={231}
                             className='w-full h-[231px] object-cover object-center rounded-t-xl'
                           />
                           <div className="flex-1 flex flex-col p-5">
                             <h4 className='text-2xl text-limit font-semibold leading-[130%] tracking-[-0.72px] mb-3 text-blue-1300'>
                               {treatment.title}
                             </h4>
                             <p className='text-lg font-normal leading-[150%] tracking-[-0.36px] text-gray-500 mb-4 flex-1'>
                               {treatment.description}
                             </p>
                             <span className="inline-block mt-auto text-blue-900 font-medium text-sm hover:underline transition-colors">Learn More →</span>
                           </div>
                         </div>
                       </Link>
                     </motion.div>
                   ))}
                 </AnimatePresence>
               </div>

               {/* Pagination */}
               <div className="mt-12">
                    <Pagination
                         currentPage={currentPage}
                         totalPages={totalPages}
                         onPageChange={paginate}
                         totalItems={treatments.length}
                         itemsPerPage={treatmentsPerPage}
                         currentItemsStart={indexOfFirstTreatment}
                         currentItemsEnd={indexOfLastTreatment}
                    />
               </div>
          </>
     );
};

export default TreatmentsWithPagination;