import { MenuItem, Category, CafeSettings, GalleryItem } from '../types';
import { INITIAL_CATEGORIES, INITIAL_MENU_ITEMS, INITIAL_CAFE_SETTINGS, INITIAL_GALLERY } from '../data/initialData';

const STORAGE_KEYS = {
  MENU_ITEMS: 'sip_cafe_cold_coffee_items_v7',
  CATEGORIES: 'sip_cafe_cold_coffee_categories_v7',
  SETTINGS: 'sip_cafe_cold_coffee_settings_v7',
  GALLERY: 'sip_cafe_cold_coffee_gallery_v7',
  ADMIN_AUTH: 'sip_cafe_admin_auth'
};

export const getStoredCategories = (): Category[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading categories from storage', e);
  }
  return INITIAL_CATEGORIES;
};

export const saveCategories = (categories: Category[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  } catch (e) {
    console.error('Error saving categories', e);
  }
};

// Full menu items support
export const getStoredMenuItems = (): MenuItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MENU_ITEMS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading menu items from storage', e);
  }
  return INITIAL_MENU_ITEMS;
};

export const saveMenuItems = (items: MenuItem[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(items));
  } catch (e) {
    console.error('Error saving menu items', e);
  }
};

export const getStoredCafeSettings = (): CafeSettings => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading settings from storage', e);
  }
  return INITIAL_CAFE_SETTINGS;
};

export const saveCafeSettings = (settings: CafeSettings): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Error saving cafe settings', e);
  }
};

export const getStoredGallery = (): GalleryItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.GALLERY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading gallery from storage', e);
  }
  return INITIAL_GALLERY;
};

export const saveGallery = (gallery: GalleryItem[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery));
  } catch (e) {
    console.error('Error saving gallery', e);
  }
};

export const resetAllToDefault = (): void => {
  localStorage.removeItem(STORAGE_KEYS.MENU_ITEMS);
  localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
  localStorage.removeItem(STORAGE_KEYS.SETTINGS);
  localStorage.removeItem(STORAGE_KEYS.GALLERY);
  // Clear legacy keys if present
  localStorage.removeItem('sip_cafe_menu_items_v2');
  localStorage.removeItem('sip_cafe_categories_v2');
};

// Calculate open/closed status based on Kathmandu operating hours: 7:00 AM (07:00) to 9:00 PM (21:00)
export const getCafeOpenStatus = (
  openingTimeStr: string = '7:00 AM',
  closingTimeStr: string = '9:00 PM'
): { isOpen: boolean; currentStatusText: string; timeDetails: string } => {
  const parseTime = (timeStr: string): number => {
    const trimmed = timeStr.trim().toUpperCase();
    const isPM = trimmed.includes('PM');
    const isAM = trimmed.includes('AM');
    const cleanTime = trimmed.replace(/[A-Z]/g, '').trim();
    const [h, m = '0'] = cleanTime.split(':');
    let hours = parseInt(h, 10);
    const minutes = parseInt(m, 10);
    
    if (isPM && hours < 12) hours += 12;
    if (isAM && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = parseTime(openingTimeStr) || (7 * 60); // 7:00 AM
  const closeMinutes = parseTime(closingTimeStr) || (21 * 60); // 9:00 PM

  const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;

  return {
    isOpen,
    currentStatusText: isOpen ? 'OPEN NOW' : 'CLOSED NOW',
    timeDetails: 'Every Day · 7:00 AM – 9:00 PM'
  };
};
