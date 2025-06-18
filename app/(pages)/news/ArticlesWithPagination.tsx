"use client";
import Pagination from '@/app/components/Pagination';
import { urlFor } from '@/lib/imageBuilder';
import Link from 'next/link';
import React, { useState } from 'react';

interface ArticlesWithPaginationProps {
     items: any[];
}

const ArticlesWithPagination: React.FC<ArticlesWithPaginationProps> = ({ items }) => {
     const [currentPage, setCurrentPage] = useState(1);
     const [ItemsPerPage] = useState(6);

     // Calculate pagination
     const indexOfLast = currentPage * ItemsPerPage;
     const indexOfFirst = indexOfLast - ItemsPerPage;
     const currentItems = items.slice(indexOfFirst, indexOfLast);
     const totalPages = Math.ceil(items.length / ItemsPerPage);

     const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

     return (
          <>
           <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-6 md:mt-[106px] mt-10'>
               {currentItems.map((article: any) => (
                    <Link href={`/news/${article.slug.current}`} key={article._id}>
                         <div className="hover:opacity-90 transition-opacity">
                              <img 
                                   src={article.mainImage ? urlFor(article.mainImage).url() : "images/card-img1.png"} 
                                   alt={article.mainImage?.alt || article.title} 
                                   height={231}
                                   className='w-full h-[231px] object-cover object-center'
                              />
                              <h4 className='text-2xl text-limit font-semibold leading-[130%] tracking-[-0.72px] mt-8 mb-3 text-grayscale-900'>
                                   {article.title}
                              </h4>
                              <p className='text-lg font-normal leading-[150%] tracking-[-0.36px] text-grayscale-500'>
                                   {article.description}
                              </p>
                         </div>
                    </Link>
               ))}
          </div>

               {/* Pagination */}
               <div className="mt-12">
                    <Pagination
                         currentPage={currentPage}
                         totalPages={totalPages}
                         onPageChange={paginate}
                         totalItems={items.length}
                         itemsPerPage={ItemsPerPage}
                         currentItemsStart={indexOfFirst}
                         currentItemsEnd={indexOfLast}
                    />
               </div>
          </>
     );
};

export default ArticlesWithPagination; 