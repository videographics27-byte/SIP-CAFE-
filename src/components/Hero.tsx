import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Utensils, MapPin } from 'lucide-react';
import { CafeSettings } from '../types';

interface HeroProps {
  settings: CafeSettings;
}

export const Hero: React.FC<HeroProps> = ({ settings }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#120E0B] text-[#FAF7F2] pt-20 pb-16"
    >
      {/* Background Image with Cinematic Slow Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.img
          src={settings.hero_image || './sip_cafe_storefront.jpg'}
          alt="Sip Cafe Pipalbot Kathmandu Storefront"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1.12 }}
          transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        />
        {/* Multi-layer Dark Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C140E] via-[#120E0B]/75 to-[#120E0B]/60" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/40 to-black/80" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Subtle Location & Welcoming Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF7F2]/10 border border-[#C89D5C]/40 backdrop-blur-md text-[#E4D9C8] text-xs uppercase tracking-[0.2em] mb-6 shadow-sm"
        >
          <MapPin className="w-3.5 h-3.5 text-[#C89D5C]" />
          <span>Pipalbot, Kathmandu · Open 7:00 AM – 9:00 PM</span>
        </motion.div>

        {/* Primary Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-serif font-extrabold tracking-[0.15em] text-[#FAF7F2] uppercase mb-4 drop-shadow-md"
        >
          {settings.hero_title || 'SIP CAFE'}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-xl sm:text-2xl lg:text-3xl font-serif italic text-[#C89D5C] tracking-wide max-w-3xl mb-6"
        >
          {settings.hero_subtitle || 'Good Food. Great Coffee. Better Moments.'}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-base sm:text-lg text-[#E4D9C8]/90 max-w-2xl font-sans font-light leading-relaxed mb-10"
        >
          {settings.hero_description ||
            'Your cozy destination in Kathmandu for delicious food, refreshing drinks, great coffee and memorable moments.'}
        </motion.p>

        {/* Hero CTA Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a
            href="#menu"
            id="hero-explore-menu-btn"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#C89D5C] hover:bg-[#b58c4f] text-[#1C140E] font-semibold text-sm tracking-wider uppercase transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#C89D5C]"
          >
            <Utensils className="w-4 h-4" />
            <span>EXPLORE MENU</span>
          </a>

          <a
            href="#location"
            id="hero-visit-us-btn"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-transparent hover:bg-[#FAF7F2]/10 text-[#FAF7F2] border border-[#FAF7F2]/40 hover:border-[#C89D5C] font-semibold text-sm tracking-wider uppercase backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#C89D5C]"
          >
            <MapPin className="w-4 h-4 text-[#C89D5C]" />
            <span>VISIT US</span>
          </a>
        </motion.div>

        {/* Animated Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-14 flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-[#FAF7F2]/60 hover:text-[#C89D5C] transition-colors"
        >
          <a href="#featured-categories" className="flex flex-col items-center gap-1 group focus:outline-none" aria-label="Scroll to featured categories">
            <span className="text-[10px] tracking-[0.2em] group-hover:text-[#C89D5C]">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-5 h-5 text-[#C89D5C]" />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
