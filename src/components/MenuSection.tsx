import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Utensils, MessageCircle, X, Check, Search, Eye, Filter, Coffee } from 'lucide-react';
import { MenuItem, Category } from '../types';

interface MenuSectionProps {
  categories: Category[];
  items: MenuItem[];
  selectedCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
  whatsappNumber: string;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  categories,
  items,
  selectedCategoryId,
  onSelectCategory,
  whatsappNumber,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'non-veg' | 'beverage'>('all');
  const [activeModalItem, setActiveModalItem] = useState<MenuItem | null>(null);
  const [showMenuBoardModal, setShowMenuBoardModal] = useState(false);

  // Filter items by category, dietary preference, and search query
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category filter
      if (selectedCategoryId !== 'all' && item.category_id !== selectedCategoryId) {
        return false;
      }
      // Dietary filter
      if (dietaryFilter !== 'all' && item.dietary !== dietaryFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesPrice = item.price.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesPrice) {
          return false;
        }
      }
      return true;
    });
  }, [items, selectedCategoryId, dietaryFilter, searchQuery]);

  const handleWhatsAppOrder = (item: MenuItem) => {
    const text = encodeURIComponent(
      `Hello Sip Cafe Kathmandu! I would like to order: ${item.name} (रू ${item.price}). Is it available right now?`
    );
    window.open(`https://wa.me/977${whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="menu" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#F4EFE6] border-y border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2A1810]/10 text-[#2A1810] text-xs font-semibold uppercase tracking-[0.25em] mb-3">
            <Coffee className="w-3.5 h-3.5 text-[#C89D5C]" />
            <span>Official Himalayan Menu</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1C1917] tracking-tight mb-3">
            Our Cold Coffee Menu
          </h2>
          <p className="text-[#57534E] text-base sm:text-lg font-light italic">
            "Chilled Himalayan brews, handcrafted iced lattes, and refreshing cold coffee specialties."
          </p>

          {/* Quick Action: View Original Menu Board */}
          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              onClick={() => setShowMenuBoardModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-[#FAF7F2] text-[#2A1810] border border-[#C89D5C] text-xs font-semibold shadow-sm hover:shadow transition-all"
            >
              <Eye className="w-3.5 h-3.5 text-[#C89D5C]" />
              <span>View Authentic Chalkboard Menu Board</span>
            </button>
          </div>
        </div>

        {/* Search & Dietary Filters Bar */}
        <div className="mb-8 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-3 justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#8C7A6B] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, coffees, drinks..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-[#E8DFC8] text-sm text-[#1C1917] placeholder-[#8C7A6B] focus:outline-none focus:ring-2 focus:ring-[#C89D5C] transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Dietary Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <span className="text-xs text-[#78716C] font-medium mr-1 hidden sm:inline">Dietary:</span>
            {[
              { key: 'all', label: 'All Items' },
              { key: 'veg', label: '🌱 Veg' },
              { key: 'non-veg', label: '🍗 Non-Veg' },
              { key: 'beverage', label: '☕ Beverages' },
            ].map((diet) => (
              <button
                key={diet.key}
                onClick={() => setDietaryFilter(diet.key as any)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                  dietaryFilter === diet.key
                    ? 'bg-[#2A1810] text-[#FAF7F2] shadow-xs'
                    : 'bg-white/80 hover:bg-white text-[#57534E] border border-[#E8DFC8]'
                }`}
              >
                {diet.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Tabs Carousel */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap flex-shrink-0 ${
              selectedCategoryId === 'all'
                ? 'bg-[#2A1810] text-[#FAF7F2] shadow-md'
                : 'bg-white text-[#57534E] hover:bg-[#EFE8DD] border border-[#E8DFC8]'
            }`}
          >
            All Menu ({items.length})
          </button>

          {categories.map((cat) => {
            const count = items.filter((i) => i.category_id === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap flex-shrink-0 flex items-center gap-1.5 ${
                  selectedCategoryId === cat.id
                    ? 'bg-[#2A1810] text-[#FAF7F2] shadow-md'
                    : 'bg-white text-[#57534E] hover:bg-[#EFE8DD] border border-[#E8DFC8]'
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-[10px] opacity-75 font-normal">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white/60 rounded-3xl border border-dashed border-[#D6CBB8] p-8">
            <Utensils className="w-10 h-10 text-[#C89D5C] mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-serif font-bold text-[#2A1810] mb-1">No Menu Items Found</h3>
            <p className="text-sm text-[#78716C] max-w-md mx-auto">
              We couldn't find any dishes matching your filters. Try selecting another category or clearing your search.
            </p>
            <button
              onClick={() => {
                onSelectCategory('all');
                setSearchQuery('');
                setDietaryFilter('all');
              }}
              className="mt-4 px-4 py-2 bg-[#2A1810] text-white text-xs font-semibold rounded-full"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item, index) => {
              const categoryObj = categories.find((c) => c.id === item.category_id);
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.4) }}
                  onClick={() => setActiveModalItem(item)}
                  className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-[#EBE3D5] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
                >
                  {/* Item Photography with referrerPolicy="no-referrer" */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#FAF7F2]">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Gradient highlight */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Popular Badge */}
                    {item.is_popular && (
                      <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#2A1810]/95 backdrop-blur-md text-[#C89D5C] text-[10px] font-bold uppercase tracking-wider border border-[#C89D5C]/30 shadow-md">
                        <Sparkles className="w-3 h-3" />
                        <span>POPULAR</span>
                      </div>
                    )}

                    {/* Sold out overlay */}
                    {!item.is_available && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-10">
                        <span className="bg-red-700 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          Sold Out
                        </span>
                      </div>
                    )}

                    {/* Price Pill in रू (NPR) */}
                    <div className="absolute bottom-3 right-3 z-10 px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#2A1810] font-bold text-xs sm:text-sm shadow-md border border-[#E8DFC8]">
                      <span className="text-[#C89D5C] mr-1 font-bold">रू</span>
                      <span>{item.price}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[10px] font-semibold text-[#C89D5C] uppercase tracking-wider truncate">
                          {categoryObj?.name || 'Sip Cafe Specialty'}
                        </span>
                        {item.dietary && (
                          <span
                            className={`text-[9px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                              item.dietary === 'veg'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : item.dietary === 'non-veg'
                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}
                          >
                            {item.dietary}
                          </span>
                        )}
                      </div>

                      {/* Item Name */}
                      <h3 className="text-lg font-serif font-bold text-[#1C1917] group-hover:text-[#C89D5C] transition-colors leading-snug mb-1.5 line-clamp-1">
                        {item.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-[#57534E] font-light leading-relaxed line-clamp-2 mb-3">
                        {item.description}
                      </p>
                    </div>

                    {/* Card Footer */}
                    <div className="pt-3 border-t border-[#F5EDE1] flex items-center justify-between">
                      <span className="text-[11px] text-stone-500 font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Made to order
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWhatsAppOrder(item);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition-colors border border-emerald-200 shadow-2xs"
                        title="Order via WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Order</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Item Detail & Order Modal */}
      <AnimatePresence>
        {activeModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E8DFC8] relative max-h-[90vh] flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-black flex items-center justify-center transition-colors focus:outline-none"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Hero Image */}
              <div className="relative h-64 sm:h-72 bg-stone-100 flex-shrink-0">
                <img
                  src={activeModalItem.image_url}
                  alt={activeModalItem.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Price badge */}
                <div className="absolute bottom-4 left-4 px-4 py-2 rounded-full bg-white text-[#2A1810] font-bold text-base shadow-lg border border-[#E8DFC8]">
                  <span className="text-[#C89D5C] mr-1">रू</span>
                  <span>{activeModalItem.price}</span>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {activeModalItem.is_popular && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#2A1810] text-[#C89D5C]">
                        Popular
                      </span>
                    )}
                    <span className="text-xs text-[#78716C] capitalize font-medium">
                      {activeModalItem.dietary || 'Beverage & Cafe Snack'}
                    </span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#1C1917]">
                    {activeModalItem.name}
                  </h3>
                </div>

                <p className="text-sm text-[#44403C] leading-relaxed font-light">
                  {activeModalItem.description}
                </p>

                <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8DFC8] text-xs text-[#57534E] space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[#2A1810] font-semibold">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Locally Sourced & Made with Love in Pipalbot, Kathmandu</span>
                  </div>
                  <p>
                    Official Menu Price: <strong className="text-[#2A1810]">रू {activeModalItem.price}</strong>
                  </p>
                </div>

                {/* Order Actions */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleWhatsAppOrder(activeModalItem)}
                    className="flex-1 py-3.5 px-5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Order on WhatsApp</span>
                  </button>

                  <a
                    href={`tel:${whatsappNumber}`}
                    className="py-3.5 px-6 rounded-2xl bg-[#2A1810] hover:bg-[#3D2314] text-[#FAF7F2] font-semibold text-xs uppercase tracking-wider text-center transition-all shadow-md"
                  >
                    Call Cafe
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Authentic Chalkboard Menu Board Lightbox */}
      <AnimatePresence>
        {showMenuBoardModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#1C140E] text-[#FAF7F2] rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-[#C89D5C]/40 flex flex-col relative"
            >
              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-[#3D2314] flex items-center justify-between bg-[#140D08]">
                <div>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-[#C89D5C]">
                    SIPCAFE Official Menu Board
                  </h3>
                  <p className="text-xs text-stone-400">
                    Brewed in the Himalayas, Made for You · Pipalbot (people boat), Kathmandu, Nepal
                  </p>
                </div>
                <button
                  onClick={() => setShowMenuBoardModal(false)}
                  className="w-9 h-9 rounded-full bg-[#2A1810] text-[#FAF7F2] hover:text-[#C89D5C] flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Menu Board Image */}
              <div className="p-4 overflow-y-auto flex-1 flex flex-col items-center justify-center bg-[#0F0A06]">
                <img
                  src="/sip_cafe_menu_board.jpg"
                  alt="SIPCAFE Original Chalkboard Menu Board"
                  className="max-h-[70vh] w-auto object-contain rounded-xl shadow-2xl border border-[#C89D5C]/20"
                />
              </div>

              {/* Footer info */}
              <div className="p-4 bg-[#140D08] border-t border-[#3D2314] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-300">
                <span>Free WiFi · Locally Sourced · Instagram: @sipcafe.jp</span>
                <a
                  href={`tel:${whatsappNumber}`}
                  className="px-4 py-1.5 rounded-full bg-[#C89D5C] hover:bg-[#b58c4f] text-[#1C140E] font-semibold text-xs transition-colors"
                >
                  Call: {whatsappNumber}
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
