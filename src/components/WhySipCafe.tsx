import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Coffee, Smile, Compass } from 'lucide-react';

export const WhySipCafe: React.FC = () => {
  const pillars = [
    {
      title: 'Fresh Ingredients',
      description: 'Quality ingredients and delicious flavors in every single plate, bowl, and beverage we serve.',
      icon: Sparkles
    },
    {
      title: 'Great Coffee',
      description: 'Freshly prepared coffee and beverages, ground to order with precision roast profiles and rich crema.',
      icon: Coffee
    },
    {
      title: 'Cozy Atmosphere',
      description: 'A comfortable place to relax, work, meet close friends, and enjoy the calming rhythm of the afternoon.',
      icon: Smile
    },
    {
      title: 'Kathmandu Experience',
      description: 'A welcoming local cafe experience in Kathmandu that blends genuine hospitality with modern cafe charm.',
      icon: Compass
    }
  ];

  return (
    <section id="why-us" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#C89D5C] text-xs font-bold uppercase tracking-[0.25em] mb-2 block">
            The Sip Cafe Standard
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1C1917] tracking-tight mb-4">
            Why Sip Cafe
          </h2>
          <p className="text-[#57534E] text-base sm:text-lg font-light">
            More than just a stop for food — a neighborhood destination where quality and warmth meet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-3xl border border-[#EBE3D5] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-start"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#2A1810] text-[#C89D5C] flex items-center justify-center mb-6 shadow-md">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#1C1917] mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#57534E] font-light leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
