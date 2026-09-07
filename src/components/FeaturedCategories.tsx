import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Utensils } from 'lucide-react';
import { Category } from '../types';

interface FeaturedCategoriesProps {
  categories?: Category[];
  onSelectCategory?: (categoryId: string) => void;
}

export const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({
  onSelectCategory,
}) => {
  // Exactly 4 visual category blocks as specified:
  // Coffee & Tea, Food, Drinks, Snacks
  const visualCategories = [
    {
      id: 'feat-cold-coffee-american',
      categoryId: 'cat-cold-coffee',
      name: 'American',
      subtitle: 'Crisp & Invigorating · रू 175',
      image_url: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'feat-cold-coffee-lutte',
      categoryId: 'cat-cold-coffee',
      name: 'Lutte',
      subtitle: 'Velvety Layered Iced Latte · रू 195',
      image_url: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'feat-cold-coffee-honey-lemon',
      categoryId: 'cat-cold-coffee',
      name: 'Americano honey Lemon',
      subtitle: 'Citrus & Himalayan Honey · रू 245',
      image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'feat-cold-coffee-mocha',
      categoryId: 'cat-cold-coffee',
      name: 'Mocha',
      subtitle: 'Decadent Dark Chocolate · रू 215',
      image_url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    }
  ];

  const handleClickCategory = (catId: string) => {
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="featured-categories"
      className="relative bg-[#FAF7F2] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E8DFC8]/60"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-[#C89D5C] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
              <Utensils className="w-3.5 h-3.5" />
              <span>Curated Selection</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1C1917] tracking-tight">
              Something Delicious Awaits
            </h2>
            <p className="text-[#57534E] text-base sm:text-lg mt-2 font-light">
              "Explore our favorites, made for every mood."
            </p>
          </div>

          <a
            href="#menu"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-[#2A1810] hover:text-[#C89D5C] transition-colors group"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#C89D5C]" />
          </a>
        </div>

        {/* 4 Visual Category Blocks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visualCategories.map((cat, index) => (
            <motion.button
              key={cat.id}
              onClick={() => handleClickCategory(cat.categoryId || cat.id)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className="group relative h-72 sm:h-80 rounded-2xl overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-[#C89D5C] shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Category Photography with gentle hover zoom */}
              <img
                src={cat.image_url}
                alt={cat.name}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 group-hover:from-black/95" />

              {/* Text content over card */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end text-[#FAF7F2]">
                <span className="text-[11px] uppercase tracking-wider text-[#C89D5C] font-semibold mb-1">
                  {cat.subtitle}
                </span>
                <h3 className="text-2xl font-serif font-bold tracking-wide text-[#FAF7F2] group-hover:text-[#C89D5C] transition-colors">
                  {cat.name}
                </h3>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-[#FAF7F2]/80 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <span>Explore items</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C89D5C]" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};
