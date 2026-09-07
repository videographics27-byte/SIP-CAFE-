import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Coffee, Leaf } from 'lucide-react';
import { CafeSettings } from '../types';

interface AboutSectionProps {
  settings: CafeSettings;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ settings }) => {
  const highlights = [
    {
      title: 'Fresh',
      desc: 'Made fresh to order with hand-selected local herbs, crisp greens, and authentic mountain spices.',
      icon: Leaf
    },
    {
      title: 'Flavorful',
      desc: 'Signature Nepali and cafe recipes perfected with rich textures, bold aromas, and heartfelt seasonings.',
      icon: Sparkles
    },
    {
      title: 'Welcoming',
      desc: 'A calm, sunlit sanctuary in Pipalbot to relax, share laughs with friends, and recharge your day.',
      icon: Heart
    }
  ];

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#F4EFE6] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Imagery Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative">
              {/* Primary large image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/60 aspect-[4/5] max-h-[540px]"
              >
                <img
                  src="./sip_cafe_storefront.jpg"
                  alt="Sip Cafe welcoming two-story storefront in Pipalbot, Kathmandu"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Overlapping secondary image card */}
              <motion.div
                initial={{ opacity: 0, y: 30, x: -20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="absolute -bottom-8 -right-6 sm:-right-8 w-48 sm:w-56 rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-square hidden sm:block"
              >
                <img
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80"
                  alt="Freshly brewed artisan coffee at Sip Cafe"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Floating badge */}
              <div className="absolute top-6 left-6 bg-[#2A1810]/90 backdrop-blur-md text-[#FAF7F2] px-4 py-2.5 rounded-full shadow-lg border border-[#C89D5C]/30 flex items-center gap-2">
                <Coffee className="w-4 h-4 text-[#C89D5C]" />
                <span className="text-xs font-semibold tracking-wider uppercase">Pipalbot, Kathmandu</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Text and Philosophy */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[#C89D5C] text-xs font-bold uppercase tracking-[0.25em] mb-3 block">
                Our Story & Space
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1C1917] tracking-tight leading-tight mb-6">
                A Place to Sip, Eat & Enjoy
              </h2>

              <div className="space-y-4 text-base sm:text-lg text-[#44403C] font-light leading-relaxed mb-8">
                <p>
                  "Sip Cafe is a welcoming cafe in Kathmandu created for people who appreciate delicious food, refreshing drinks, great coffee and good company."
                </p>
                <p>
                  "Whether you're meeting friends, grabbing a quick bite, or relaxing with your favorite drink, Sip Cafe is a place to enjoy every moment."
                </p>
              </div>

              {/* 3 Core Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4 border-t border-[#D9CEBE]">
                {highlights.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 * idx }}
                      className="flex flex-col"
                    >
                      <div className="w-9 h-9 rounded-xl bg-[#2A1810] text-[#C89D5C] flex items-center justify-center mb-3 shadow-sm">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="text-lg font-serif font-bold text-[#1C1917] mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#57534E] leading-relaxed">
                        {item.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
