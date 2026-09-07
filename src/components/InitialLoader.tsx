import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coffee } from 'lucide-react';

interface InitialLoaderProps {
  onComplete: () => void;
}

export const InitialLoader: React.FC<InitialLoaderProps> = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 500);
    }, 1100);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="sip-cafe-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#1C140E] text-[#FAF7F2]"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col items-center text-center px-4"
          >
            {/* Logo Emblem */}
            <div className="w-16 h-16 rounded-full border border-[#C89D5C]/40 flex items-center justify-center mb-4 bg-[#2A1810]/60 shadow-lg shadow-black/40">
              <Coffee className="w-8 h-8 text-[#C89D5C]" />
            </div>

            <h1 className="text-3xl sm:text-4xl tracking-[0.25em] font-serif font-bold text-[#FAF7F2] uppercase mb-2">
              SIP CAFE
            </h1>

            <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-[#C89D5C] to-transparent my-3" />

            <p className="text-xs sm:text-sm tracking-widest text-[#E4D9C8]/80 uppercase font-medium">
              Good Food · Great Coffee · Better Moments
            </p>

            <span className="text-[11px] text-[#C89D5C]/70 tracking-wider mt-2">
              Kathmandu · Nepal
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
