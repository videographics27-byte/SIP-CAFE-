export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string; // preserve exact format like "50/75", "125 / 145 / 195", "300/330", "220"
  image_url: string;
  category_id: string;
  is_popular: boolean;
  is_available: boolean;
  created_at: string;
  dietary?: 'veg' | 'non-veg' | 'beverage';
}

export interface Category {
  id: string;
  name: string;
  sort_order: number;
  image_url?: string;
  item_count_label?: string;
}

export interface CafeSettings {
  id: string;
  cafe_name: string;
  address: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  maps_url: string;
  opening_time: string; // "07:00" or "7:00 AM"
  closing_time: string; // "21:00" or "9:00 PM"
  opening_days: string;
  about_text: string;
  hero_title: string;
  hero_subtitle: string;
  hero_description: string;
  hero_image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image_url: string;
  aspect?: 'tall' | 'wide' | 'square';
}
