"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="pageloader"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.5 } }}
            transition={{ duration: 1, ease: "anticipate" }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-blue-1000 via-blue-500 to-blue-300"
          >
            <motion.div
              initial={{ rotate: 0, scale: 1 }}
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
              className="rounded-full bg-white/80 shadow-2xl p-8 flex flex-col items-center"
            >
              <img src="/images/logo.svg" alt="Loading..." className="w-20 h-20 mb-4 animate-pulse" />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                className="h-1 bg-blue-1000 rounded-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}