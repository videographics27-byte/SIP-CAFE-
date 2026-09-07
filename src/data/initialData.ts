import { MenuItem, Category, CafeSettings, GalleryItem } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-cold-coffee',
    name: 'Cold Coffee',
    sort_order: 1,
    image_url: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    item_count_label: 'Chilled Handcrafted Cold Coffees'
  }
];

// EXCLUSIVE COLD COFFEE MENU ITEMS AS SPECIFIED
export const INITIAL_MENU_ITEMS: MenuItem[] = [
  {
    id: 'cc-1',
    name: 'American',
    description: 'Crisp, invigorating iced espresso poured over crystal clear ice with chilled mountain spring water.',
    price: '175',
    image_url: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-cold-coffee',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-07T00:01:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'cc-2',
    name: 'Fiavored.',
    description: 'Handcrafted chilled iced coffee infused with your choice of artisan syrup flavors (hazelnut, caramel, or vanilla).',
    price: '205',
    image_url: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-cold-coffee',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-07T00:02:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'cc-3',
    name: 'Lutte',
    description: 'Smooth and refreshing iced latte layered with bold espresso and cold velvety fresh milk poured over ice.',
    price: '195',
    image_url: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-cold-coffee',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-07T00:03:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'cc-4',
    name: 'cappuccino',
    description: 'Iced espresso vigorously shaken over ice, topped with a dense cloud of cold micro-foam and cocoa dusting.',
    price: '205',
    image_url: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-cold-coffee',
    is_popular: false,
    is_available: true,
    created_at: '2026-09-07T00:04:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'cc-5',
    name: 'Americano honey Lemon',
    description: 'Kathmandu signature refresher: crisp iced espresso elevated with fresh lemon juice and pure natural Himalayan honey.',
    price: '245',
    image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-cold-coffee',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-07T00:05:00.000Z',
    dietary: 'beverage'
  },
  {
    id: 'cc-6',
    name: 'Mocha',
    description: 'Decadent dark chocolate mocha sauce blended with bold espresso, chilled whole milk, and ice cubes.',
    price: '215',
    image_url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    category_id: 'cat-cold-coffee',
    is_popular: true,
    is_available: true,
    created_at: '2026-09-07T00:06:00.000Z',
    dietary: 'beverage'
  }
];

export const INITIAL_CAFE_SETTINGS: CafeSettings = {
  id: 'settings-1',
  cafe_name: 'SIP CAFE',
  address: 'Pipalbot (people boat), Kathmandu, Nepal',
  phone: '9767560484',
  whatsapp: '9767560484',
  instagram: 'https://instagram.com/sipcafe.jp',
  facebook: 'https://facebook.com/sipcafe',
  maps_url: 'https://maps.google.com/?q=Pipalbot,+Kathmandu,+Nepal',
  opening_time: '7:00 AM',
  closing_time: '9:00 PM',
  opening_days: 'Every Day',
  about_text: 'Sip Cafe is your cozy neighborhood sanctuary in Pipalbot, Kathmandu — created for people who appreciate handcrafted cold brews, authentic Himalayan specialty coffee, and refreshing moments with friends. Every drink is prepared fresh to order with pure mountain spring water and locally roasted beans.',
  hero_title: 'SIP CAFE',
  hero_subtitle: 'COLD COFFEE • HANDCRAFTED BREWS • GOOD VIBES',
  hero_description: 'Brewed in the Himalayas, Made for You. Delicious cold coffees, refreshing iced drinks, and relaxed moments in Pipalbot, Kathmandu.',
  hero_image: './sip_cafe_storefront.jpg'
};

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'g-storefront',
    title: 'Our Kathmandu Storefront at Pipalbot',
    category: 'Storefront',
    image_url: './sip_cafe_storefront.jpg',
    aspect: 'wide'
  },
  {
    id: 'g-menuboard',
    title: 'The Official Sip Cafe Himalayan Menu Board',
    category: 'Menu Board',
    image_url: './sip_cafe_menu_board.jpg',
    aspect: 'wide'
  },
  {
    id: 'g1',
    title: 'Iced Americano Honey Lemon with Mountain Honey',
    category: 'Cold Coffee',
    image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    aspect: 'tall'
  },
  {
    id: 'g2',
    title: 'Chilled American with Crystal Clear Ice',
    category: 'Cold Coffee',
    image_url: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    aspect: 'square'
  },
  {
    id: 'g3',
    title: 'Cozy Second Floor Balcony & Sunlit Corners',
    category: 'Atmosphere',
    image_url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    aspect: 'wide'
  },
  {
    id: 'g4',
    title: 'Layered Iced Lutte in Frosty Glass',
    category: 'Cold Coffee',
    image_url: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=800&q=80',
    aspect: 'tall'
  },
  {
    id: 'g5',
    title: 'Decadent Iced Mocha with Chocolate Swirls',
    category: 'Cold Coffee',
    image_url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    aspect: 'square'
  },
  {
    id: 'g6',
    title: 'Flavored Iced Coffee with Caramel Notes',
    category: 'Cold Coffee',
    image_url: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80',
    aspect: 'tall'
  }
];
