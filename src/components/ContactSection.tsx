import React from 'react';
import { motion } from 'motion/react';
import { Phone, MessageCircle, Navigation, Instagram, Facebook, Mail } from 'lucide-react';
import { CafeSettings } from '../types';

interface ContactSectionProps {
  settings: CafeSettings;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ settings }) => {
  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2]">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#C89D5C] text-xs font-bold uppercase tracking-[0.25em] mb-3 block">
            We Are Always Here For You
          </span>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1C1917] tracking-tight mb-4">
            Let's Connect
          </h2>

          <p className="text-base sm:text-lg text-[#57534E] max-w-xl mx-auto font-light mb-10">
            Have questions, need to place a takeout order, or want to reserve a cozy table for a gathering? Reach out anytime!
          </p>

          {/* Primary Big Contacts Display */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 mb-12">
            <a
              href={`tel:${settings.phone}`}
              className="flex items-center gap-3 text-xl sm:text-2xl font-serif font-bold text-[#2A1810] hover:text-[#C89D5C] transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#C89D5C] flex items-center justify-center text-[#C89D5C] shadow-sm">
                <Phone className="w-5 h-5" />
              </div>
              <span>{settings.phone}</span>
            </a>

            <div className="hidden sm:block w-[1px] h-8 bg-[#D9CEBE]" />

            <a
              href={`https://wa.me/977${settings.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-xl sm:text-2xl font-serif font-bold text-[#2A1810] hover:text-emerald-600 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-500/40 flex items-center justify-center text-emerald-600 shadow-sm">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span>WhatsApp Chat</span>
            </a>
          </div>

          {/* Buttons Matrix */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {/* CALL US */}
            <a
              href={`tel:${settings.phone}`}
              id="contact-call-btn"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#2A1810] hover:bg-[#3D2314] text-[#FAF7F2] font-semibold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg"
            >
              <Phone className="w-4 h-4 text-[#C89D5C]" />
              <span>CALL US</span>
            </a>

            {/* WHATSAPP */}
            <a
              href={`https://wa.me/977${settings.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              id="contact-whatsapp-btn"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WHATSAPP</span>
            </a>

            {/* GET DIRECTIONS */}
            <a
              href={settings.maps_url || 'https://maps.google.com/?q=Pipalbot,+Kathmandu,+Nepal'}
              target="_blank"
              rel="noopener noreferrer"
              id="contact-directions-btn"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-[#FAF7F2] border border-[#D9CEBE] text-[#2A1810] font-semibold text-xs uppercase tracking-wider transition-all shadow-xs hover:shadow-md"
            >
              <Navigation className="w-4 h-4 text-[#C89D5C]" />
              <span>GET DIRECTIONS</span>
            </a>

            {/* INSTAGRAM */}
            <a
              href={settings.instagram || 'https://instagram.com/sipcafe_ktm'}
              target="_blank"
              rel="noopener noreferrer"
              id="contact-instagram-btn"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-[#FAF7F2] border border-[#D9CEBE] text-[#2A1810] font-semibold text-xs uppercase tracking-wider transition-all shadow-xs hover:shadow-md"
            >
              <Instagram className="w-4 h-4 text-pink-600" />
              <span>INSTAGRAM</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
