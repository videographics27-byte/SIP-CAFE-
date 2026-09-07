import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coffee, Phone, Menu as MenuIcon, X, Clock, MapPin, Shield } from 'lucide-react';
import { CafeSettings } from '../types';
import { getCafeOpenStatus } from '../utils/storage';

interface NavbarProps {
  settings: CafeSettings;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ settings, onOpenAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [status, setStatus] = useState(() => getCafeOpenStatus(settings.opening_time, settings.closing_time));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Recalculate status every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getCafeOpenStatus(settings.opening_time, settings.closing_time));
    }, 60000);
    return () => clearInterval(interval);
  }, [settings.opening_time, settings.closing_time]);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Menu', href: '#menu' },
    { label: 'About', href: '#about' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#1C140E]/95 backdrop-blur-md shadow-lg shadow-black/30 py-2.5 border-b border-[#C89D5C]/20'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 group text-decoration-none focus:outline-none focus:ring-2 focus:ring-[#C89D5C] rounded-lg p-1"
          aria-label="SIP CAFE Homepage"
        >
          <div className="w-10 h-10 rounded-full border border-[#C89D5C] bg-[#2A1810] flex items-center justify-center text-[#C89D5C] shadow-sm transition-transform group-hover:scale-105">
            <Coffee className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-serif font-bold tracking-[0.18em] text-[#FAF7F2] uppercase group-hover:text-[#C89D5C] transition-colors leading-none">
              {settings.cafe_name || 'SIP CAFE'}
            </span>
            <span className="text-[10px] tracking-widest text-[#C89D5C] uppercase font-sans mt-1">
              Kathmandu
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-7" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[#FAF7F2]/85 hover:text-[#C89D5C] tracking-wide transition-colors relative py-1 focus:outline-none focus:text-[#C89D5C]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls: Status + Call + VIEW MENU + Admin */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Status Badge */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border ${
              status.isOpen
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                : 'bg-rose-950/60 text-rose-300 border-rose-500/40'
            }`}
            title="Cafe hours: 7:00 AM – 9:00 PM"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                status.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'
              }`}
            />
            <span>{status.currentStatusText}</span>
          </div>

          {/* Quick Call Button */}
          <a
            href={`tel:${settings.phone}`}
            id="nav-call-btn"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold border border-[#FAF7F2]/30 hover:border-[#C89D5C] text-[#FAF7F2] hover:text-[#C89D5C] transition-all"
            title={`Call ${settings.phone}`}
          >
            <Phone className="w-3 h-3 text-[#C89D5C]" />
            <span>{settings.phone}</span>
          </a>

          {/* VIEW MENU Button */}
          <a
            href="#menu"
            id="nav-view-menu-btn"
            className="flex items-center gap-1.5 px-5 py-2 rounded-full text-xs uppercase tracking-wider font-semibold bg-[#C89D5C] hover:bg-[#b58c4f] text-[#1C140E] transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#C89D5C]"
          >
            <span>VIEW MENU</span>
          </a>

          {/* Admin link */}
          <button
            onClick={onOpenAdmin}
            id="nav-admin-btn"
            className="p-2 rounded-full text-[#FAF7F2]/60 hover:text-[#C89D5C] hover:bg-[#2A1810]/60 transition-colors focus:outline-none"
            title="Admin Login & Settings"
            aria-label="Admin settings"
          >
            <Shield className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Mobile status indicator */}
          <span
            className={`inline-block w-2.5 h-2.5 rounded-full ${
              status.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'
            }`}
            title={status.currentStatusText}
          />

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle"
            className="p-2 text-[#FAF7F2] hover:text-[#C89D5C] focus:outline-none focus:ring-2 focus:ring-[#C89D5C] rounded-lg"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#1C140E]/98 border-b border-[#C89D5C]/30 px-6 py-5 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex flex-col space-y-4">
              {/* Hours / Status Banner */}
              <div className="flex items-center justify-between py-2 border-b border-[#FAF7F2]/10">
                <div className="flex items-center gap-2 text-xs text-[#FAF7F2]/80 font-medium">
                  <Clock className="w-4 h-4 text-[#C89D5C]" />
                  <span>7:00 AM – 9:00 PM</span>
                </div>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    status.isOpen ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                  }`}
                >
                  {status.currentStatusText}
                </span>
              </div>

              {/* Navigation Links */}
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-serif text-[#FAF7F2] hover:text-[#C89D5C] transition-colors py-1 flex items-center justify-between border-b border-[#FAF7F2]/5"
                >
                  <span>{link.label}</span>
                  <span className="text-[#C89D5C] text-sm">→</span>
                </a>
              ))}

              {/* Mobile CTA Buttons */}
              <div className="pt-2 flex flex-col gap-2.5">
                <a
                  href={`tel:${settings.phone}`}
                  className="w-full py-3 rounded-xl bg-[#C89D5C] text-[#1C140E] font-semibold text-center text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {settings.phone}</span>
                </a>

                <a
                  href={`https://wa.me/977${settings.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] font-semibold text-center text-sm uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <span>Order on WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full py-2.5 text-xs text-[#FAF7F2]/60 hover:text-[#C89D5C] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin Login</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
