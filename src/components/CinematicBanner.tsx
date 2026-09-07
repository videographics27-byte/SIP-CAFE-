import React from 'react';
import { motion } from 'motion/react';
import { Utensils } from 'lucide-react';

export const CinematicBanner: React.FC = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-[#120E0B] text-[#FAF7F2] py-24">
      {/* Background with Dark Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1920&q=80"
          alt="Coffee roasting and cafe atmosphere"
          loading="lazy"
          className="w-full h-full object-cover object-center filter brightness-[0.4]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center"
        >
          <span className="text-[#C89D5C] text-xs font-bold uppercase tracking-[0.3em] mb-4">
            Kathmandu's Cozy Corner
          </span>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-[#FAF7F2] tracking-tight mb-4">
            Taste the Moment
          </h2>

          <p className="text-xl sm:text-2xl font-serif italic text-[#E4D9C8] mb-8 font-light">
            "Good food, good drinks, good company."
          </p>

          <a
            href="#menu"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#C89D5C] hover:bg-[#b58c4f] text-[#1C140E] font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
          >
            <Utensils className="w-4 h-4" />
            <span>EXPLORE MENU</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
