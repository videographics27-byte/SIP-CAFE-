import React from 'react';
import { motion } from 'motion/react';
import { Utensils, Navigation } from 'lucide-react';
import { CafeSettings } from '../types';

interface CTASectionProps {
  settings: CafeSettings;
}

export const CTASection: React.FC<CTASectionProps> = ({ settings }) => {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#1C140E] text-[#FAF7F2] overflow-hidden">
      {/* Subtle background glow and texture */}
      <div className="absolute inset-0 bg-radial-at-c from-[#2A1810] via-[#1C140E] to-[#120E0B] opacity-90" />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#C89D5C]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#C89D5C]/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#C89D5C] text-xs font-bold uppercase tracking-[0.25em] mb-3 block">
            A Table is Waiting For You
          </span>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight mb-6">
            Good Food Is Better Shared.
          </h2>

          <p className="text-lg sm:text-xl text-[#E4D9C8] font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Come visit Sip Cafe and make your next moment a little more delicious.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#menu"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#C89D5C] hover:bg-[#b58c4f] text-[#1C140E] font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
            >
              <Utensils className="w-4 h-4" />
              <span>VIEW MENU</span>
            </a>

            <a
              href={settings.maps_url || 'https://maps.google.com/?q=Pipalbot,+Kathmandu,+Nepal'}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-transparent hover:bg-white/10 text-white border border-[#C89D5C]/50 hover:border-[#C89D5C] font-semibold text-xs uppercase tracking-widest transition-all duration-300 hover:-translate-y-0.5"
            >
              <Navigation className="w-4 h-4 text-[#C89D5C]" />
              <span>GET DIRECTIONS</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
