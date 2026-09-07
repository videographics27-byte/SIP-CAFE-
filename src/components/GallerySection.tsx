import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { GalleryItem } from '../types';

interface GallerySectionProps {
  gallery: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ gallery }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = ['all', 'Storefront', 'Menu Board', 'Coffee', 'Momo', 'Food', 'Drinks', 'Snacks', 'Tea'];

  const filteredGallery = selectedCategory === 'all'
    ? gallery
    : gallery.filter((item) => item.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const nextImage = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredGallery.length);
    }
  };

  const prevImage = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex(
        (activeLightboxIndex - 1 + filteredGallery.length) % filteredGallery.length
      );
    }
  };

  return (
    <section id="gallery" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[#C89D5C] text-xs font-bold uppercase tracking-[0.25em] mb-2 block">
            Visual Journey
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1C1917] tracking-tight mb-4">
            Moments at Sip Cafe
          </h2>
          <p className="text-[#57534E] text-base sm:text-lg font-light">
            From sizzling steamed momos to hand-crafted espresso, witness the craftsmanship and welcoming atmosphere in Kathmandu.
          </p>
        </div>

        {/* Gallery Filter Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 -mx-4 px-4 sm:mx-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#2A1810] text-[#FAF7F2] shadow-sm'
                  : 'bg-white text-[#57534E] hover:bg-[#EFE8DD] border border-[#E8DFC8]'
              }`}
            >
              {cat === 'all' ? 'All Gallery' : cat}
            </button>
          ))}
        </div>

        {/* Masonry-Style Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredGallery.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
              onClick={() => openLightbox(index)}
              className="break-inside-avoid group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl cursor-pointer bg-[#EFE8DD] border border-[#E8DFC8]"
            >
              <img
                src={item.image_url}
                alt={item.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#C89D5C] mb-1">
                  {item.category}
                </span>
                <h4 className="text-lg font-serif font-bold leading-snug">
                  {item.title}
                </h4>
                <div className="mt-3 flex items-center gap-1 text-xs text-white/70">
                  <Maximize2 className="w-3.5 h-3.5 text-[#C89D5C]" />
                  <span>Click to expand</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Viewer */}
      <AnimatePresence>
        {activeLightboxIndex !== null && filteredGallery[activeLightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev */}
            <button
              onClick={prevImage}
              className="absolute left-4 sm:left-8 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next */}
            <button
              onClick={nextImage}
              className="absolute right-4 sm:right-8 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Image & Caption */}
            <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
              <img
                src={filteredGallery[activeLightboxIndex].image_url}
                alt={filteredGallery[activeLightboxIndex].title}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
              />
              <div className="mt-4 text-center text-white">
                <span className="text-xs uppercase tracking-widest text-[#C89D5C] block">
                  {filteredGallery[activeLightboxIndex].category}
                </span>
                <h4 className="text-xl font-serif font-bold mt-1">
                  {filteredGallery[activeLightboxIndex].title}
                </h4>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
