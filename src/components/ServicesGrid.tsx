import React from 'react';
import { motion } from 'motion/react';
import { useSiteData } from '../context/SiteDataContext';
import { ServiceItem } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ServicesGridProps {
  onSelectService: (service: ServiceItem) => void;
  onViewAllWork: () => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onSelectService, onViewAllWork }) => {
  const { data } = useSiteData();

  return (
    <section id="services-grid" className="py-24 sm:py-32 bg-[#141414] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#c084fc] font-mono font-semibold mb-2">
              Capabilities & Formats
            </div>
            <h2 className="text-4xl sm:text-5xl font-black uppercase text-white font-display">
              Production Capabilities
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm text-neutral-400 max-w-md">
            Every frame tailored to your brand's voice, broadcast standards, and audience conversion.
          </p>
        </div>

        {/* 6 Services Grid ("trio-cards") */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {data.services.map((service, index) => (

            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => onSelectService(service)}
              className="group relative h-[380px] sm:h-[420px] rounded-2xl overflow-hidden border border-white/10 bg-[#1c1c1c] flex flex-col justify-between p-7 cursor-pointer transition-all duration-300 hover:border-[#a855f7] hover:shadow-[0_15px_30px_rgba(168,85,247,0.25)]"
            >
              {/* Background Photo with Dark Cinematic Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                style={{ backgroundImage: `url(${service.bgImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/40 group-hover:from-black/95 group-hover:via-black/80 transition-colors duration-300" />

              {/* Top Row: Icon & Arrow Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 p-2.5 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#9333ea]">
                  <img src={service.icon} alt={service.title} className="w-full h-full object-contain invert brightness-0" />
                </div>

                <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-[#9333ea] group-hover:border-[#a855f7]">
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Bottom Row: Content & Descriptions */}
              <div className="relative z-10">
                <div className="inline-block px-2.5 py-0.5 rounded text-[10px] uppercase font-mono tracking-wider bg-white/10 text-white/80 mb-3">
                  Production Line
                </div>

                <h3 className="text-2xl font-bold text-white tracking-tight mb-2 group-hover:text-[#c084fc] transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2 mb-3 leading-relaxed">
                  {service.shortDesc}
                </p>

                <p className="text-xs text-neutral-400 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-24 transition-all duration-300 leading-relaxed font-light border-t border-white/10 pt-2">
                  {service.fullDesc}
                </p>

                {/* Bottom line marker */}
                <div className="h-[2px] w-10 bg-gradient-to-r from-[#9333ea] to-[#c084fc] mt-4 transition-all duration-300 group-hover:w-full" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={onViewAllWork}
            className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 hover:border-[#a855f7] cursor-pointer group"
          >
            <span>Explore Portfolio & Showreels</span>
            <ArrowUpRight className="w-4 h-4 text-[#a855f7] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </section>
  );
};
