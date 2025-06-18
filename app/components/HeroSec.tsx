"use client";
import React from "react";
import { motion } from "framer-motion";

type TitlePart = {
     text: string;
     tag: "h6" | "h1";
};

interface HeroSecProps {
     titleParts: TitlePart[];
}

function HeroSec({ titleParts }: HeroSecProps) {
     return (
          <motion.section
               className="bg-blue-1100 max-h-[287px] md:min-h-[287px] min-h-[165px] flex items-center relative"
               initial={{ opacity: 0, y: 40 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.7 }}
          >
               <div className="xl:max-w-[1270px] w-full max-w-[952px] relative md:px-5 px-4 mx-auto">
                    {titleParts.map((part, i) => {
                         const Tag = part.tag;
                         const className =
                              part.tag === "h1"
                                   ? "md:text-[56px] text-[32px] sm:max-w-full max-w-[315px] font-medium leading-[125%] text-white"
                                   : "text-lg font-medium leading-[125%] text-blue-1400";

                         return (
                              <motion.div
                                   key={i}
                                   initial={{ opacity: 0, y: 30 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                              >
                                   <Tag className={className}>{part.text}</Tag>
                              </motion.div>
                         );
                    })}
               </div>
               <motion.div
                    className="absolute right-0 md:top-0 md:bottom-auto bottom-0"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.7 }}
               >
                    <img src="/images/cube-icon2.png" className="md:w-auto w-[86px]" alt="" />
               </motion.div>
          </motion.section>
     );
}

export default HeroSec;
