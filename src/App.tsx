import React, { useState, useEffect } from 'react';
import {
  getStoredCategories,
  saveCategories,
  getStoredMenuItems,
  saveMenuItems,
  getStoredCafeSettings,
  saveCafeSettings,
  getStoredGallery,
  saveGallery
} from './utils/storage';
import { Category, MenuItem, CafeSettings, GalleryItem } from './types';
import { InitialLoader } from './components/InitialLoader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedCategories } from './components/FeaturedCategories';
import { AboutSection } from './components/AboutSection';
import { CustomerFavorites } from './components/CustomerFavorites';
import { MenuSection } from './components/MenuSection';
import { WhySipCafe } from './components/WhySipCafe';
import { CinematicBanner } from './components/CinematicBanner';
import { GallerySection } from './components/GallerySection';
import { CTASection } from './components/CTASection';
import { LocationSection } from './components/LocationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminModal } from './components/AdminModal';

export default function App() {
  // Application Data State
  const [categories, setCategories] = useState<Category[]>(getStoredCategories);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(getStoredMenuItems);
  const [settings, setSettings] = useState<CafeSettings>(getStoredCafeSettings);
  const [gallery, setGallery] = useState<GalleryItem[]>(getStoredGallery);

  // UI Interactive States
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [adminOpen, setAdminOpen] = useState(false);

  // Sync to local storage whenever state changes
  useEffect(() => {
    saveCategories(categories);
  }, [categories]);

  useEffect(() => {
    saveMenuItems(menuItems);
  }, [menuItems]);

  useEffect(() => {
    saveCafeSettings(settings);
  }, [settings]);

  useEffect(() => {
    saveGallery(gallery);
  }, [gallery]);

  // Check URL for /admin or #admin on mount or popstate
  useEffect(() => {
    const checkAdminRoute = () => {
      if (
        window.location.pathname.includes('/admin') ||
        window.location.hash.includes('#admin') ||
        window.location.search.includes('admin=true')
      ) {
        setAdminOpen(true);
      }
    };

    checkAdminRoute();
    window.addEventListener('popstate', checkAdminRoute);
    window.addEventListener('hashchange', checkAdminRoute);
    return () => {
      window.removeEventListener('popstate', checkAdminRoute);
      window.removeEventListener('hashchange', checkAdminRoute);
    };
  }, []);

  // Handle selecting a customer favorite to jump to or open
  const handleSelectFavorite = (item: MenuItem) => {
    setSelectedCategoryId(item.category_id);
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1917] flex flex-col selection:bg-[#C89D5C]/30 selection:text-[#2A1810]">
      {/* 1-Second Initial Loader Animation */}
      {!loadingComplete && (
        <InitialLoader onComplete={() => setLoadingComplete(true)} />
      )}

      {/* Persistent Navigation Bar */}
      <Navbar
        settings={settings}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Main Flow (Strict Natural Sequence Without White Gaps) */}
      <main className="flex-1">
        {/* 1. HERO */}
        <Hero settings={settings} />

        {/* 2. FEATURED CATEGORIES */}
        <FeaturedCategories
          categories={categories}
          onSelectCategory={(catId) => setSelectedCategoryId(catId)}
        />

        {/* 3. ABOUT */}
        <AboutSection settings={settings} />

        {/* 4. CUSTOMER FAVORITES */}
        <CustomerFavorites
          items={menuItems}
          onSelectItem={handleSelectFavorite}
        />

        {/* 5. MENU (The Core Source of Truth) */}
        <MenuSection
          categories={categories}
          items={menuItems}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={(catId) => setSelectedCategoryId(catId)}
          whatsappNumber={settings.whatsapp}
        />

        {/* 6. WHY SIP CAFE */}
        <WhySipCafe />

        {/* 7. CINEMATIC BANNER */}
        <CinematicBanner />

        {/* 8. GALLERY */}
        <GallerySection gallery={gallery} />

        {/* 9. CTA */}
        <CTASection settings={settings} />

        {/* 10. LOCATION & TIMINGS */}
        <LocationSection settings={settings} />

        {/* 11. CONTACT */}
        <ContactSection settings={settings} />
      </main>

      {/* 12. FOOTER */}
      <Footer
        settings={settings}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp whatsappNumber={settings.whatsapp} />

      {/* Admin Content Management Modal */}
      <AdminModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        categories={categories}
        setCategories={setCategories}
        menuItems={menuItems}
        setMenuItems={setMenuItems}
        settings={settings}
        setSettings={setSettings}
        gallery={gallery}
        setGallery={setGallery}
      />
    </div>
  );
}
