import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Navigation, Phone, Calendar } from 'lucide-react';
import { CafeSettings } from '../types';
import { getCafeOpenStatus } from '../utils/storage';

interface LocationSectionProps {
  settings: CafeSettings;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ settings }) => {
  const status = getCafeOpenStatus(settings.opening_time, settings.closing_time);

  return (
    <section id="location" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] border-t border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Details Column */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[#C89D5C] text-xs font-bold uppercase tracking-[0.25em] mb-2 block">
                Find Your Way
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1C1917] tracking-tight mb-6">
                Visit SIP CAFE
              </h2>

              {/* Status Badge */}
              <div className="mb-8 inline-flex items-center gap-2.5 px-4 py-2 rounded-full border shadow-xs bg-white">
                <span
                  className={`w-3 h-3 rounded-full ${
                    status.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'
                  }`}
                />
                <span className="text-xs font-bold uppercase tracking-wider text-[#1C1917]">
                  {status.currentStatusText}
                </span>
                <span className="text-xs text-[#78716C]">|</span>
                <span className="text-xs text-[#57534E] font-medium">
                  {status.timeDetails}
                </span>
              </div>

              {/* Location & Timings Details Card */}
              <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#EBE3D5] shadow-sm mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#FAF7F2] border border-[#E8DFC8] flex items-center justify-center text-[#C89D5C] flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm uppercase tracking-wider font-bold text-[#2A1810] mb-1">
                      Our Address
                    </h4>
                    <p className="text-base text-[#44403C] font-light">
                      {settings.address || 'Pipalbot, Kathmandu, Nepal'}
                    </p>
                    <p className="text-xs text-[#78716C] mt-1">
                      Central, convenient location with easy walking access and bike parking.
                    </p>
                  </div>
                </div>

                <div className="h-[1px] bg-[#F5EDE1]" />

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#FAF7F2] border border-[#E8DFC8] flex items-center justify-center text-[#C89D5C] flex-shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm uppercase tracking-wider font-bold text-[#2A1810] mb-1">
                      Operating Hours
                    </h4>
                    <p className="text-base text-[#44403C] font-semibold">
                      Every Day · 7:00 AM – 9:00 PM
                    </p>
                    <p className="text-xs text-[#78716C] mt-1">
                      Kitchen serves hot food all day until 8:45 PM.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action button */}
              <div className="flex flex-wrap gap-4">
                <a
                  href={settings.maps_url || 'https://maps.google.com/?q=Pipalbot,+Kathmandu,+Nepal'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#2A1810] hover:bg-[#3D2314] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider transition-all shadow-md"
                >
                  <Navigation className="w-4 h-4 text-[#C89D5C]" />
                  <span>Open in Google Maps</span>
                </a>

                <a
                  href={`tel:${settings.phone}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#FAF7F2] border border-[#D9CEBE] text-[#2A1810] text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  <Phone className="w-4 h-4 text-[#C89D5C]" />
                  <span>Call {settings.phone}</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Interactive Google Map Embed */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[420px] sm:h-[480px] rounded-3xl overflow-hidden shadow-xl border-4 border-white"
            >
              {/* Google Maps iFrame for Pipalbot, Kathmandu */}
              <iframe
                title="Sip Cafe Pipalbot Kathmandu Location"
                src="https://maps.google.com/maps?q=Pipalbot%20Kathmandu%20Nepal&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[15%] contrast-[105%]"
              />

              {/* Map Floating Card */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-[#E8DFC8] flex items-center gap-3 pointer-events-none">
                <div className="w-3 h-3 rounded-full bg-[#C89D5C]" />
                <div>
                  <div className="text-xs font-bold text-[#1C1917] uppercase tracking-wider">
                    SIP CAFE
                  </div>
                  <div className="text-[11px] text-[#57534E]">
                    Pipalbot, Kathmandu
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
