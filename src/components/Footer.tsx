import React from 'react';
import { Coffee, MapPin, Phone, Clock, MessageCircle, Instagram, Facebook, Shield } from 'lucide-react';
import { CafeSettings } from '../types';
import { getCafeOpenStatus } from '../utils/storage';

interface FooterProps {
  settings: CafeSettings;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onOpenAdmin }) => {
  const status = getCafeOpenStatus(settings.opening_time, settings.closing_time);

  return (
    <footer className="bg-[#140E0A] text-[#FAF7F2] border-t border-[#C89D5C]/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full border border-[#C89D5C] bg-[#2A1810] flex items-center justify-center text-[#C89D5C]">
                <Coffee className="w-5 h-5" />
              </div>
              <span className="text-2xl font-serif font-bold tracking-[0.18em] text-[#FAF7F2] uppercase">
                {settings.cafe_name || 'SIP CAFE'}
              </span>
            </div>
            <p className="text-xs italic text-[#C89D5C] font-serif">
              "{settings.hero_subtitle || 'Good Food. Great Coffee. Better Moments.'}"
            </p>
            <p className="text-xs text-[#E4D9C8]/80 font-light leading-relaxed">
              Your neighborhood haven in Kathmandu for handcrafted coffee, freshly made momos, flavorful bites, and peaceful moments.
            </p>
          </div>

          {/* Location & Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-serif font-bold uppercase tracking-wider text-[#FAF7F2] border-b border-[#FAF7F2]/10 pb-2">
              Visit & Timings
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-[#E4D9C8]/90 font-light">
              <MapPin className="w-4 h-4 text-[#C89D5C] flex-shrink-0 mt-0.5" />
              <span>{settings.address || 'Pipalbot, Kathmandu, Nepal'}</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-[#E4D9C8]/90 font-light">
              <Clock className="w-4 h-4 text-[#C89D5C] flex-shrink-0 mt-0.5" />
              <div>
                <p>Every Day</p>
                <p className="font-semibold text-white">7:00 AM – 9:00 PM</p>
              </div>
            </div>
            <div className="pt-1">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                  status.isOpen
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                    : 'bg-rose-950 text-rose-300 border border-rose-500/40'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${status.isOpen ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                {status.currentStatusText}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-serif font-bold uppercase tracking-wider text-[#FAF7F2] border-b border-[#FAF7F2]/10 pb-2">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-[#E4D9C8]/80">
              <li>
                <a href="#hero" className="hover:text-[#C89D5C] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#favorites" className="hover:text-[#C89D5C] transition-colors">
                  Customer Favorites
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#C89D5C] transition-colors">
                  Food & Drinks Menu
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#C89D5C] transition-colors">
                  About Our Space
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#C89D5C] transition-colors">
                  Photo Gallery
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-[#C89D5C] transition-colors">
                  Location & Map
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="space-y-3">
            <h4 className="text-sm font-serif font-bold uppercase tracking-wider text-[#FAF7F2] border-b border-[#FAF7F2]/10 pb-2">
              Get in Touch
            </h4>
            <div className="space-y-2 text-xs text-[#E4D9C8]/90">
              <a
                href={`tel:${settings.phone}`}
                className="flex items-center gap-2 hover:text-[#C89D5C] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#C89D5C]" />
                <span>+977 {settings.phone}</span>
              </a>
              <a
                href={`https://wa.me/977${settings.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#25D366] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp: {settings.whatsapp}</span>
              </a>
            </div>

            <div className="flex items-center gap-3 pt-3">
              <a
                href={settings.instagram || 'https://instagram.com/sipcafe_ktm'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#2A1810] hover:bg-[#C89D5C] text-[#FAF7F2] hover:text-[#140E0A] flex items-center justify-center transition-all"
                aria-label="Follow Sip Cafe on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={settings.facebook || 'https://facebook.com/sipcafe'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#2A1810] hover:bg-[#C89D5C] text-[#FAF7F2] hover:text-[#140E0A] flex items-center justify-center transition-all"
                aria-label="Follow Sip Cafe on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/977${settings.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#2A1810] hover:bg-[#25D366] text-[#FAF7F2] hover:text-white flex items-center justify-center transition-all"
                aria-label="Chat with Sip Cafe on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Admin Portal Access */}
        <div className="pt-8 border-t border-[#FAF7F2]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#E4D9C8]/60">
          <p>© {new Date().getFullYear()} SIP CAFE · Kathmandu, Nepal. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="hover:text-[#C89D5C] flex items-center gap-1.5 transition-colors focus:outline-none"
            >
              <Shield className="w-3.5 h-3.5 text-[#C89D5C]" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
