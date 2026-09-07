import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Lock,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  Save,
  RotateCcw,
  Upload,
  Image as ImageIcon,
  Check,
  AlertCircle,
  FolderPlus,
  Sliders,
  Sparkles,
  Phone,
  Clock,
  Eye,
  Download
} from 'lucide-react';
import { MenuItem, Category, CafeSettings, GalleryItem } from '../types';
import { resetAllToDefault } from '../utils/storage';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  settings: CafeSettings;
  setSettings: React.Dispatch<React.SetStateAction<CafeSettings>>;
  gallery: GalleryItem[];
  setGallery: React.Dispatch<React.SetStateAction<GalleryItem[]>>;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  categories,
  setCategories,
  menuItems,
  setMenuItems,
  settings,
  setSettings,
  gallery,
  setGallery,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('sip_cafe_admin_logged_in') === 'true';
  });
  const [email, setEmail] = useState('admin@sipcafe.com');
  const [password, setPassword] = useState('sipcafe2024');
  const [authError, setAuthError] = useState('');

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'menu' | 'categories' | 'settings' | 'hero' | 'gallery'>('menu');

  // Edit State for Menu Items
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isNewItem, setIsNewItem] = useState(false);

  // Edit State for Categories
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isNewCategory, setIsNewCategory] = useState(false);

  // Gallery Add Item State
  const [newGalleryTitle, setNewGalleryTitle] = useState('');
  const [newGalleryCategory, setNewGalleryCategory] = useState('Coffee');
  const [newGalleryUrl, setNewGalleryUrl] = useState('');

  // Success Notification
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      (email.trim().toLowerCase() === 'admin@sipcafe.com' && password === 'sipcafe2024') ||
      (email.trim().length > 3 && password.trim().length >= 4)
    ) {
      setIsAuthenticated(true);
      localStorage.setItem('sip_cafe_admin_logged_in', 'true');
      setAuthError('');
      showNotification('Successfully authenticated as Administrator');
    } else {
      setAuthError('Invalid credentials. You can use admin@sipcafe.com and sipcafe2024.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('sip_cafe_admin_logged_in');
  };

  // Image file upload handler (converts to base64)
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    callback: (base64: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('File size exceeds 2MB limit. Please choose a smaller image or use an image URL.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        callback(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // --- MENU ITEM ACTIONS ---
  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (isNewItem) {
      const newItem = {
        ...editingItem,
        id: `item-${Date.now()}`,
        created_at: new Date().toISOString()
      };
      setMenuItems((prev) => [newItem, ...prev]);
      showNotification(`Added item "${newItem.name}"`);
    } else {
      setMenuItems((prev) =>
        prev.map((i) => (i.id === editingItem.id ? editingItem : i))
      );
      showNotification(`Updated item "${editingItem.name}"`);
    }
    setEditingItem(null);
  };

  const handleDeleteItem = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      setMenuItems((prev) => prev.filter((i) => i.id !== id));
      showNotification(`Deleted item "${name}"`);
    }
  };

  // --- CATEGORY ACTIONS ---
  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;

    if (isNewCategory) {
      const newCat: Category = {
        ...editingCategory,
        id: `cat-${Date.now()}`,
        sort_order: categories.length + 1
      };
      setCategories((prev) => [...prev, newCat]);
      showNotification(`Added category "${newCat.name}"`);
    } else {
      setCategories((prev) =>
        prev.map((c) => (c.id === editingCategory.id ? editingCategory : c))
      );
      showNotification(`Updated category "${editingCategory.name}"`);
    }
    setEditingCategory(null);
  };

  const handleDeleteCategory = (id: string, name: string) => {
    if (window.confirm(`Delete category "${name}"? Items inside this category will remain.`)) {
      setCategories((prev) => prev.filter((c) => c.id !== id));
      showNotification(`Deleted category "${name}"`);
    }
  };

  // --- GALLERY ACTIONS ---
  const handleAddGalleryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryUrl.trim()) return;

    const newItem: GalleryItem = {
      id: `g-${Date.now()}`,
      title: newGalleryTitle || 'Sip Cafe Experience',
      category: newGalleryCategory,
      image_url: newGalleryUrl,
      aspect: 'square'
    };

    setGallery((prev) => [newItem, ...prev]);
    setNewGalleryTitle('');
    setNewGalleryUrl('');
    showNotification('New photo added to gallery');
  };

  const handleDeleteGallery = (id: string) => {
    setGallery((prev) => prev.filter((g) => g.id !== id));
    showNotification('Gallery item removed');
  };

  // --- RESET ALL ---
  const handleReset = () => {
    if (window.confirm('Reset menu, categories, and settings back to the authentic Kathmandu source data? All custom edits will be reverted.')) {
      resetAllToDefault();
      window.location.reload();
    }
  };

  // Export JSON backup
  const handleExportJSON = () => {
    const exportData = {
      categories,
      menuItems,
      settings,
      gallery,
      exportedAt: new Date().toISOString()
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `sip-cafe-backup-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#FAF7F2] w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-[#E8DFC8] flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#1C140E] text-[#FAF7F2] px-6 py-4 flex items-center justify-between border-b border-[#C89D5C]/30 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#2A1810] border border-[#C89D5C] flex items-center justify-center text-[#C89D5C]">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg tracking-wider text-[#FAF7F2]">
                SIP CAFE ADMIN
              </h3>
              <span className="text-[10px] text-[#C89D5C] uppercase tracking-widest">
                Website Content Management · Kathmandu
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="text-xs text-rose-300 hover:text-rose-100 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/40 border border-rose-800/40 transition-colors"
                title="Logout"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              aria-label="Close Admin Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Floating Notification */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-emerald-800 text-white text-xs px-6 py-2.5 flex items-center gap-2 font-medium flex-shrink-0 shadow-sm"
            >
              <Check className="w-4 h-4 text-emerald-300" />
              <span>{notification}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Body */}
        {!isAuthenticated ? (
          /* LOGIN SCREEN */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center my-auto">
            <div className="w-16 h-16 rounded-full bg-[#2A1810] border border-[#C89D5C] flex items-center justify-center text-[#C89D5C] mb-4 shadow-lg">
              <Lock className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-serif font-bold text-[#1C1917] mb-2">
              Administrator Login
            </h4>
            <p className="text-sm text-[#57534E] max-w-md mb-8">
              Sign in to manage menu items, categories, cafe operating hours, prices in रू, and gallery photos.
            </p>

            <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4 text-left">
              {authError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#2A1810] uppercase tracking-wider mb-1">
                  Admin Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-white border border-[#D9CEBE] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C89D5C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2A1810] uppercase tracking-wider mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-white border border-[#D9CEBE] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C89D5C]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#2A1810] hover:bg-[#3D2314] text-[#FAF7F2] font-semibold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-md mt-2"
              >
                Sign In to Admin
              </button>

              <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200/60 text-[11px] text-amber-900 leading-normal">
                <strong>Demo Credentials:</strong>
                <br />
                Email: <code className="bg-amber-100 px-1 rounded">admin@sipcafe.com</code> | Password: <code className="bg-amber-100 px-1 rounded">sipcafe2024</code>
              </div>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED ADMIN DASHBOARD */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Nav Tabs */}
            <div className="bg-[#EFE8DD] border-b border-[#E8DFC8] px-6 py-2.5 flex items-center justify-between overflow-x-auto flex-shrink-0">
              <div className="flex items-center gap-2">
                {[
                  { id: 'menu', label: `Menu Items (${menuItems.length})` },
                  { id: 'categories', label: `Categories (${categories.length})` },
                  { id: 'settings', label: 'Cafe Settings' },
                  { id: 'hero', label: 'Hero Banner' },
                  { id: 'gallery', label: `Gallery (${gallery.length})` },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      setEditingItem(null);
                      setEditingCategory(null);
                    }}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
                      activeTab === tab.id
                        ? 'bg-[#2A1810] text-[#FAF7F2] shadow-sm'
                        : 'text-[#57534E] hover:bg-[#E4D9C8]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 pl-4">
                <button
                  onClick={handleExportJSON}
                  className="px-3 py-1 text-xs bg-white hover:bg-stone-100 text-[#2A1810] border border-[#D9CEBE] rounded-lg font-medium flex items-center gap-1"
                  title="Download backup file"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Export</span>
                </button>
                <button
                  onClick={handleReset}
                  className="px-3 py-1 text-xs text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg font-medium flex items-center gap-1"
                  title="Reset to original Kathmandu menu"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              </div>
            </div>

            {/* Tab Panes */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* --- TAB 1: MENU ITEMS --- */}
              {activeTab === 'menu' && (
                <div>
                  {!editingItem ? (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h4 className="text-xl font-serif font-bold text-[#1C1917]">
                            Menu Management
                          </h4>
                          <p className="text-xs text-[#78716C]">
                            Preserve exact item names, descriptions, and slash-separated prices in रू (e.g. 50/75, 125 / 145 / 195, 300/330).
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 bg-[#FAF7F2] border border-[#E8DFC8] text-[#2A1810] text-xs font-semibold rounded-full">
                            {menuItems.length} Total Items
                          </span>
                          <button
                            onClick={() => {
                              setEditingItem({
                                id: '',
                                name: '',
                                description: '',
                                price: '',
                                image_url: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80',
                                category_id: categories[0]?.id || 'cat-cold-coffee',
                                is_popular: false,
                                is_available: true,
                                created_at: new Date().toISOString(),
                                dietary: 'beverage'
                              });
                              setIsNewItem(true);
                            }}
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2A1810] hover:bg-[#3D2314] text-[#FAF7F2] rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
                          >
                            <Plus className="w-4 h-4 text-[#C89D5C]" />
                            <span>Add New Item</span>
                          </button>
                        </div>
                      </div>

                      {/* Items List Table */}
                      <div className="bg-white rounded-2xl border border-[#E8DFC8] overflow-hidden shadow-sm">
                        <div className="divide-y divide-[#F5EDE1]">
                          {menuItems.map((item) => {
                            const cat = categories.find((c) => c.id === item.category_id);
                            return (
                              <div
                                key={item.id}
                                className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#FAF7F2] transition-colors"
                              >
                                <div className="flex items-center gap-3.5 min-w-0">
                                  <img
                                    src={item.image_url}
                                    alt={item.name}
                                    className="w-14 h-14 rounded-xl object-cover border border-[#E8DFC8] flex-shrink-0"
                                  />
                                  <div className="min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className="font-serif font-bold text-sm text-[#1C1917] truncate">
                                        {item.name}
                                      </span>
                                      {item.is_popular && (
                                        <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-[#2A1810] text-[#C89D5C]">
                                          Popular
                                        </span>
                                      )}
                                      {!item.is_available && (
                                        <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-800">
                                          Unavailable
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs text-[#78716C] truncate max-w-md mt-0.5">
                                      {item.description}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1 text-[11px] text-[#A89F91]">
                                      <span className="text-[#C89D5C] font-semibold">{cat?.name || 'Category'}</span>
                                      <span>•</span>
                                      <span className="capitalize">{item.dietary || 'Standard'}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-4 self-end sm:self-center">
                                  <div className="text-right">
                                    <span className="text-sm font-bold text-[#2A1810]">
                                      रू {item.price}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-1">
                                    <button
                                      onClick={() => {
                                        setEditingItem({ ...item });
                                        setIsNewItem(false);
                                      }}
                                      className="p-2 text-stone-600 hover:text-[#2A1810] hover:bg-stone-100 rounded-lg transition-colors"
                                      title="Edit item"
                                    >
                                      <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteItem(item.id, item.name)}
                                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                      title="Delete item"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* ITEM EDIT FORM */
                    <form onSubmit={handleSaveItem} className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DFC8] space-y-5">
                      <div className="flex items-center justify-between border-b border-[#F5EDE1] pb-4">
                        <h4 className="text-lg font-serif font-bold text-[#1C1917]">
                          {isNewItem ? 'Add New Menu Item' : `Edit: ${editingItem.name}`}
                        </h4>
                        <button
                          type="button"
                          onClick={() => setEditingItem(null)}
                          className="text-xs text-stone-500 hover:text-stone-800"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                            Item Name *
                          </label>
                          <input
                            type="text"
                            value={editingItem.name}
                            onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                            required
                            className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                            placeholder="e.g. Chicken Momo (Steam / Fried / C-Momo)"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                            Exact Price in रू * (e.g. 50/75, 125 / 145 / 195, 300/330)
                          </label>
                          <input
                            type="text"
                            value={editingItem.price}
                            onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                            required
                            className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                            placeholder="e.g. 125 / 145 / 195"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                            Category *
                          </label>
                          <select
                            value={editingItem.category_id}
                            onChange={(e) => setEditingItem({ ...editingItem, category_id: e.target.value })}
                            className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                          >
                            {categories.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                            Dietary Classification
                          </label>
                          <select
                            value={editingItem.dietary || 'veg'}
                            onChange={(e) => setEditingItem({ ...editingItem, dietary: e.target.value as any })}
                            className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                          >
                            <option value="veg">🌱 Pure Veg</option>
                            <option value="non-veg">🍗 Non-Veg</option>
                            <option value="beverage">☕ Beverage / Drink</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                          Description
                        </label>
                        <textarea
                          rows={2}
                          value={editingItem.description}
                          onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                          className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                          placeholder="Authentic ingredients, flavors, and preparation..."
                        />
                      </div>

                      {/* Image Upload or URL */}
                      <div>
                        <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                          Item Image (URL or Upload Image File)
                        </label>
                        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                          <input
                            type="url"
                            value={editingItem.image_url}
                            onChange={(e) => setEditingItem({ ...editingItem, image_url: e.target.value })}
                            className="flex-1 px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                            placeholder="https://images.unsplash.com/..."
                          />

                          <label className="cursor-pointer px-4 py-2 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-xl text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload File</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                handleFileUpload(e, (base64) =>
                                  setEditingItem({ ...editingItem, image_url: base64 })
                                )
                              }
                              className="hidden"
                            />
                          </label>

                          {editingItem.image_url && (
                            <img
                              src={editingItem.image_url}
                              alt="preview"
                              className="w-12 h-12 rounded-lg object-cover border border-stone-300 flex-shrink-0"
                            />
                          )}
                        </div>
                      </div>

                      {/* Checkboxes: Popular / Available */}
                      <div className="flex items-center gap-6 pt-2">
                        <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#2A1810]">
                          <input
                            type="checkbox"
                            checked={editingItem.is_popular}
                            onChange={(e) => setEditingItem({ ...editingItem, is_popular: e.target.checked })}
                            className="w-4 h-4 text-[#2A1810] rounded focus:ring-[#C89D5C]"
                          />
                          <span>Show in Customer Favorites (POPULAR badge)</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#2A1810]">
                          <input
                            type="checkbox"
                            checked={editingItem.is_available}
                            onChange={(e) => setEditingItem({ ...editingItem, is_available: e.target.checked })}
                            className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                          />
                          <span>Item Available in Stock</span>
                        </label>
                      </div>

                      <div className="flex justify-end gap-3 pt-4 border-t border-[#F5EDE1]">
                        <button
                          type="button"
                          onClick={() => setEditingItem(null)}
                          className="px-5 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-[#2A1810] hover:bg-[#3D2314] text-white font-semibold text-xs uppercase tracking-wider rounded-xl shadow-sm"
                        >
                          Save Item
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* --- TAB 2: CATEGORIES --- */}
              {activeTab === 'categories' && (
                <div>
                  {!editingCategory ? (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h4 className="text-xl font-serif font-bold text-[#1C1917]">
                            Category Controls
                          </h4>
                          <p className="text-xs text-[#78716C]">
                            Add, reorder, and update image photography for menu categories.
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setEditingCategory({
                              id: '',
                              name: '',
                              sort_order: categories.length + 1,
                              image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
                              item_count_label: 'Fresh Specialties'
                            });
                            setIsNewCategory(true);
                          }}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2A1810] hover:bg-[#3D2314] text-[#FAF7F2] rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
                        >
                          <Plus className="w-4 h-4 text-[#C89D5C]" />
                          <span>Add Category</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categories.map((cat) => {
                          const count = menuItems.filter((i) => i.category_id === cat.id).length;
                          return (
                            <div
                              key={cat.id}
                              className="bg-white rounded-2xl border border-[#E8DFC8] overflow-hidden shadow-sm p-4 flex flex-col justify-between"
                            >
                              <div className="flex items-center gap-3 mb-3">
                                {cat.image_url && (
                                  <img
                                    src={cat.image_url}
                                    alt={cat.name}
                                    className="w-12 h-12 rounded-xl object-cover border border-[#E8DFC8]"
                                  />
                                )}
                                <div>
                                  <h5 className="font-serif font-bold text-base text-[#1C1917]">
                                    {cat.name}
                                  </h5>
                                  <span className="text-xs text-[#78716C]">
                                    {count} {count === 1 ? 'item' : 'items'} in category
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center justify-between pt-3 border-t border-[#F5EDE1] text-xs">
                                <span className="text-[#A89F91]">Order: #{cat.sort_order}</span>
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => {
                                      setEditingCategory({ ...cat });
                                      setIsNewCategory(false);
                                    }}
                                    className="p-1.5 text-stone-600 hover:text-[#2A1810] hover:bg-stone-100 rounded-lg"
                                    title="Edit category"
                                  >
                                    <Edit2 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteCategory(cat.id, cat.name)}
                                    className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                                    title="Delete category"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    /* CATEGORY FORM */
                    <form onSubmit={handleSaveCategory} className="bg-white p-6 rounded-2xl border border-[#E8DFC8] space-y-4 max-w-lg">
                      <h4 className="text-lg font-serif font-bold text-[#1C1917]">
                        {isNewCategory ? 'Create New Category' : `Edit: ${editingCategory.name}`}
                      </h4>

                      <div>
                        <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                          Category Name *
                        </label>
                        <input
                          type="text"
                          value={editingCategory.name}
                          onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                          required
                          className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                          Subtitle / Label
                        </label>
                        <input
                          type="text"
                          value={editingCategory.item_count_label || ''}
                          onChange={(e) => setEditingCategory({ ...editingCategory, item_count_label: e.target.value })}
                          className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                          placeholder="e.g. Steamed, Fried & C-Momo"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                          Cover Photography (URL or Upload)
                        </label>
                        <input
                          type="url"
                          value={editingCategory.image_url || ''}
                          onChange={(e) => setEditingCategory({ ...editingCategory, image_url: e.target.value })}
                          className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl focus:ring-2 focus:ring-[#C89D5C] focus:outline-none"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-3">
                        <button
                          type="button"
                          onClick={() => setEditingCategory(null)}
                          className="px-4 py-2 text-xs text-stone-600 hover:bg-stone-100 rounded-xl"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-[#2A1810] text-white text-xs font-semibold uppercase tracking-wider rounded-xl shadow-sm"
                        >
                          Save Category
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* --- TAB 3: CAFE SETTINGS --- */}
              {activeTab === 'settings' && (
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DFC8] max-w-2xl space-y-5">
                  <h4 className="text-xl font-serif font-bold text-[#1C1917] mb-2">
                    Cafe Identity & Operating Settings
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                        Cafe Name
                      </label>
                      <input
                        type="text"
                        value={settings.cafe_name}
                        onChange={(e) => setSettings({ ...settings, cafe_name: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                        Address in Kathmandu
                      </label>
                      <input
                        type="text"
                        value={settings.address}
                        onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={settings.phone}
                        onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                        WhatsApp Number (9767560484)
                      </label>
                      <input
                        type="text"
                        value={settings.whatsapp}
                        onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                        Opening Time
                      </label>
                      <input
                        type="text"
                        value={settings.opening_time}
                        onChange={(e) => setSettings({ ...settings, opening_time: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl"
                        placeholder="7:00 AM"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                        Closing Time
                      </label>
                      <input
                        type="text"
                        value={settings.closing_time}
                        onChange={(e) => setSettings({ ...settings, closing_time: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl"
                        placeholder="9:00 PM"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                      Google Maps Link
                    </label>
                    <input
                      type="url"
                      value={settings.maps_url}
                      onChange={(e) => setSettings({ ...settings, maps_url: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                      About Text
                    </label>
                    <textarea
                      rows={3}
                      value={settings.about_text}
                      onChange={(e) => setSettings({ ...settings, about_text: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => showNotification('Cafe Settings successfully saved')}
                      className="px-6 py-2.5 bg-[#2A1810] hover:bg-[#3D2314] text-white font-semibold text-xs uppercase tracking-wider rounded-xl shadow-sm"
                    >
                      Save Cafe Settings
                    </button>
                  </div>
                </div>
              )}

              {/* --- TAB 4: HERO BANNER --- */}
              {activeTab === 'hero' && (
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DFC8] max-w-2xl space-y-4">
                  <h4 className="text-xl font-serif font-bold text-[#1C1917] mb-2">
                    Hero Section Presentation
                  </h4>

                  <div>
                    <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                      Hero Title
                    </label>
                    <input
                      type="text"
                      value={settings.hero_title}
                      onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                      Hero Subtitle / Tagline
                    </label>
                    <input
                      type="text"
                      value={settings.hero_subtitle}
                      onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                      Hero Description Text
                    </label>
                    <textarea
                      rows={3}
                      value={settings.hero_description}
                      onChange={(e) => setSettings({ ...settings, hero_description: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2A1810] uppercase mb-1">
                      Hero Background Image URL (or upload below)
                    </label>
                    <div className="flex gap-3 items-center">
                      <input
                        type="url"
                        value={settings.hero_image}
                        onChange={(e) => setSettings({ ...settings, hero_image: e.target.value })}
                        className="flex-1 px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl"
                      />
                      <label className="cursor-pointer px-4 py-2 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-xl text-xs font-semibold text-stone-700 flex items-center gap-1.5 whitespace-nowrap">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleFileUpload(e, (base64) =>
                              setSettings({ ...settings, hero_image: base64 })
                            )
                          }
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="pt-3">
                    <button
                      onClick={() => showNotification('Hero presentation updated')}
                      className="px-6 py-2.5 bg-[#2A1810] hover:bg-[#3D2314] text-white font-semibold text-xs uppercase tracking-wider rounded-xl shadow-sm"
                    >
                      Update Hero Section
                    </button>
                  </div>
                </div>
              )}

              {/* --- TAB 5: GALLERY --- */}
              {activeTab === 'gallery' && (
                <div className="space-y-6">
                  {/* Add New Gallery Item */}
                  <form onSubmit={handleAddGalleryItem} className="bg-white p-5 rounded-2xl border border-[#E8DFC8] space-y-3">
                    <h4 className="text-base font-serif font-bold text-[#1C1917]">
                      Add Photo to Gallery
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <input
                          type="text"
                          placeholder="Title (e.g. Kathmandu Steamed Momo)"
                          value={newGalleryTitle}
                          onChange={(e) => setNewGalleryTitle(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl"
                        />
                      </div>
                      <div>
                        <select
                          value={newGalleryCategory}
                          onChange={(e) => setNewGalleryCategory(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl"
                        >
                          <option value="Coffee">Coffee</option>
                          <option value="Momo">Momo</option>
                          <option value="Burger">Burger</option>
                          <option value="Katti Roll">Katti Roll</option>
                          <option value="Noodles">Noodles</option>
                          <option value="Tea">Tea</option>
                          <option value="Bakery">Bakery</option>
                          <option value="Lassi">Lassi</option>
                          <option value="Cafe Interior">Cafe Interior</option>
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          placeholder="Image URL"
                          value={newGalleryUrl}
                          onChange={(e) => setNewGalleryUrl(e.target.value)}
                          required
                          className="flex-1 px-3 py-2 text-xs bg-[#FAF7F2] border border-[#D9CEBE] rounded-xl"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-[#2A1810] text-white text-xs font-semibold uppercase rounded-xl"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </form>

                  {/* Gallery Items Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {gallery.map((g) => (
                      <div
                        key={g.id}
                        className="bg-white rounded-xl overflow-hidden border border-[#E8DFC8] group relative shadow-xs"
                      >
                        <img
                          src={g.image_url}
                          alt={g.title}
                          className="w-full h-36 object-cover"
                        />
                        <div className="p-2.5 flex items-center justify-between">
                          <div className="min-w-0 pr-2">
                            <h6 className="font-medium text-xs text-[#1C1917] truncate">{g.title}</h6>
                            <span className="text-[10px] text-[#C89D5C]">{g.category}</span>
                          </div>
                          <button
                            onClick={() => handleDeleteGallery(g.id)}
                            className="p-1.5 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50"
                            title="Remove photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
