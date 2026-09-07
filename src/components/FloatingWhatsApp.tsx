import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X } from 'lucide-react';

interface FloatingWhatsAppProps {
  whatsappNumber: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ whatsappNumber }) => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Optional Help/Order Prompt Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 15 }}
            className="hidden sm:flex items-center gap-2 bg-white text-[#1C1917] px-3.5 py-2 rounded-2xl shadow-xl border border-[#E8DFC8] text-xs font-medium"
          >
            <span>Questions or Takeout? Chat with us!</span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-stone-400 hover:text-stone-600 p-0.5"
              aria-label="Dismiss tooltip"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Button */}
      <motion.a
        href={`https://wa.me/977${whatsappNumber}?text=${encodeURIComponent('Hello Sip Cafe Kathmandu, I would like to make an inquiry / order!')}`}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:shadow-[#25D366]/40 transition-shadow duration-300 relative group"
        aria-label="Chat with Sip Cafe on WhatsApp"
      >
        {/* Pulse ripple */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none" />

        <MessageCircle className="w-7 h-7 fill-white/20 stroke-white" />
      </motion.a>
    </div>
  );
};
