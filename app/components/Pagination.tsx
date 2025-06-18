"use client";
import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from "@/app/components/ui/PaginationIcons";

interface PaginationProps {
     currentPage: number;
     totalPages: number;
     onPageChange: (pageNumber: number) => void;
     totalItems: number;
     itemsPerPage: number;
     currentItemsStart: number;
     currentItemsEnd: number;
}

const Pagination: React.FC<PaginationProps> = ({
     currentPage,
     totalPages,
     onPageChange,
     totalItems,
     itemsPerPage,
     currentItemsStart,
     currentItemsEnd
}) => {
     // Generate page numbers
     const getPageNumbers = () => {
          const pageNumbers = [];
          const maxVisiblePages = 6;
          
          if (totalPages <= maxVisiblePages) {
               for (let i = 1; i <= totalPages; i++) {
                    pageNumbers.push(i);
               }
          } else {
               if (currentPage <= 3) {
                    for (let i = 1; i <= 4; i++) {
                         pageNumbers.push(i);
                    }
                    pageNumbers.push('...');
                    pageNumbers.push(totalPages);
               } else if (currentPage >= totalPages - 2) {
                    pageNumbers.push(1);
                    pageNumbers.push('...');
                    for (let i = totalPages - 3; i <= totalPages; i++) {
                         pageNumbers.push(i);
                    }
               } else {
                    pageNumbers.push(1);
                    pageNumbers.push('...');
                    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                         pageNumbers.push(i);
                    }
                    pageNumbers.push('...');
                    pageNumbers.push(totalPages);
               }
          }
          
          return pageNumbers;
     };

     if (totalPages <= 1) return null;

     return (
          <div className="flex flex-col items-center space-y-3">
               {/* Pagination Controls */}
               <div className="flex justify-center items-center gap-1 md:gap-2">
                    <button
                         onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                         disabled={currentPage === 1}
                         className="group flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full border border-blue-200 bg-white text-blue-900 hover:bg-blue-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                         aria-label="Previous page"
                    >
                         <ChevronLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    </button>

                    {getPageNumbers().map((number, index) => (
                         typeof number === 'number' ? (
                              <button
                                   key={index}
                                   onClick={() => onPageChange(number)}
                                   className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center font-semibold text-base transition-all border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
                                        ${currentPage === number
                                             ? 'bg-blue-100 text-blue-900 shadow-lg scale-110'
                                             : 'bg-white text-blue-900 hover:bg-blue-50'}
                                   `}
                                   aria-current={currentPage === number ? 'page' : undefined}
                              >
                                   {number}
                              </button>
                         ) : (
                              <span key={index} className="px-2 text-blue-400 text-lg select-none">…</span>
                         )
                    ))}

                    <button
                         onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                         disabled={currentPage === totalPages}
                         className="group flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full border border-blue-200 bg-white text-blue-900 hover:bg-blue-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                         aria-label="Next page"
                    >
                         <ChevronRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
               </div>

               {/* Page Info */}
               {/* <div className="text-center text-xs text-gray-600">
                    Showing {currentItemsStart + 1} to {Math.min(currentItemsEnd, totalItems)} of {totalItems} items
               </div> */}
          </div>
     );
};

export default Pagination;