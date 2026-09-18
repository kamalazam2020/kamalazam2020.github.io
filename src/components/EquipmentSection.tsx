import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSiteData } from '../context/SiteDataContext';
import { MediaServicePackage } from '../types';
import { 
  Film, 
  Camera, 
  Layers, 
  Mic2, 
  Sparkles, 
  Clock, 
  Check, 
  ArrowUpRight, 
  Search, 
  SlidersHorizontal,
  Calendar,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface EquipmentSectionProps {
  onOpenBooking?: (serviceName?: string) => void;
}

export const EquipmentSection: React.FC<EquipmentSectionProps> = ({ onOpenBooking }) => {
  const { data } = useSiteData();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedServiceForQuickView, setSelectedServiceForQuickView] = useState<MediaServicePackage | null>(null);

  const categories = [
    { label: 'All', icon: Sparkles },
    { label: 'Video Production', icon: Film },
    { label: 'Editorial & Stills', icon: Camera },
    { label: 'Post-Production & VFX', icon: Layers },
    { label: 'Audio & Vodcasts', icon: Mic2 },
  ];

  const filteredServices = data.productionPackages.filter((service) => {
    const matchesCategory = activeCategory === 'All' || service.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.specs.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });


  const handleBook = (serviceName: string) => {
    if (onOpenBooking) {
      onOpenBooking(serviceName);
    }
  };

  return (
    <section id="our-equipment" className="py-24 sm:py-32 bg-[#0a0c10] relative overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#9333ea]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#c084fc]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 pb-6 border-b border-white/10 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#a855f7] font-mono font-semibold mb-2">
              <Zap className="w-3.5 h-3.5" />
              <span>Production Catalog & Shop</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black uppercase text-white font-display tracking-tight">
              Media Production Services
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-lg font-light leading-relaxed">
            Transparent scopes, fixed deliverables, and cinema-grade execution. Select turnkey commercial packages, social video sprints, luxury stills, or audio-video podcast suites.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 sm:mb-10">
          {/* Category Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.label;
              return (
                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(cat.label)}
                  className={`flex items-center space-x-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer border ${
                    isActive
                      ? 'bg-gradient-to-r from-[#9333ea] via-[#a855f7] to-[#c084fc] text-white border-transparent shadow-[0_0_20px_rgba(168,85,247,0.45)]'
                      : 'bg-white/5 text-neutral-300 border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px] sm:min-w-[280px]">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search production services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#a855f7] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-neutral-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Services Shop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className={`group bg-[#111318] rounded-3xl border overflow-hidden flex flex-col justify-between transition-all duration-400 hover:shadow-2xl ${
                  service.popular
                    ? 'border-[#a855f7]/40 shadow-[0_0_30px_rgba(168,85,247,0.2)]'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {/* Visual Image Header */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111318] via-[#111318]/40 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-neutral-300 border border-white/10">
                      {service.category}
                    </span>
                    {service.badge && (
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#9333ea] via-[#a855f7] to-[#c084fc] text-white font-extrabold text-[10px] uppercase tracking-wider shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Price overlay pill */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 flex items-end justify-between">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                        Package Pricing
                      </div>
                      <div className="text-xl font-bold font-display text-white">
                        {service.pricing}{' '}
                        <span className="text-xs text-neutral-400 font-normal font-sans">
                          {service.ratePeriod ? `/ ${service.ratePeriod}` : ''}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono text-neutral-300">
                      <Clock className="w-3 h-3 text-[#c084fc]" />
                      <span>{service.turnaround}</span>
                    </div>
                  </div>
                </div>

                {/* Service Details Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#c084fc] transition-colors leading-snug">
                      {service.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed mb-4">
                      {service.tagline}
                    </p>

                    {/* Scope Specs */}
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 mb-5">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-[#a855f7] mb-1">
                        Production Scope:
                      </div>
                      <p className="text-xs text-neutral-300 font-light leading-relaxed">
                        {service.specs}
                      </p>
                    </div>

                    {/* Deliverables checklist */}
                    <div className="space-y-2 mb-6">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                        Included Deliverables:
                      </div>
                      {service.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-xs text-neutral-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                    <button
                      onClick={() => handleBook(service.name)}
                      className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#9333ea] via-[#a855f7] to-[#c084fc] text-white text-xs font-semibold uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center space-x-1.5 shadow-[0_0_20px_rgba(168,85,247,0.35)] cursor-pointer"
                    >
                      <span>Book Service</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setSelectedServiceForQuickView(service)}
                      className="px-3.5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 text-xs font-mono transition-colors cursor-pointer"
                      title="View Scope Details"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty Search Result Fallback */}
        {filteredServices.length === 0 && (
          <div className="text-center py-16 px-4 rounded-3xl bg-white/[0.02] border border-white/10 mb-16">
            <Search className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No services found matching "{searchQuery}"</h3>
            <p className="text-xs text-neutral-400 mb-4">Try checking for typos or clear your search query.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs text-white uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bespoke Production Scope Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#14171f] via-[#171b24] to-[#14171f] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center space-x-2 text-[11px] font-mono uppercase tracking-widest text-[#c084fc]">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Tailored Enterprise Solutions</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold uppercase text-white font-display">
              Need a Custom Campaign Scope?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
              Multi-city commercial shoots, regional brand documentary tours, high-volume e-commerce catalogs, or ongoing monthly video retainers. We tailor full production crews to your exact budget and deadline.
            </p>
          </div>

          <button
            onClick={() => handleBook('Custom Production Scope')}
            className="px-8 py-4 rounded-full bg-white text-black font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-neutral-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)] cursor-pointer whitespace-nowrap flex items-center space-x-2"
          >
            <span>Request Custom Scope</span>
            <ArrowUpRight className="w-4 h-4 text-[#a855f7]" />
          </button>
        </div>
      </div>

      {/* Quick View Scope Modal */}
      <AnimatePresence>
        {selectedServiceForQuickView && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedServiceForQuickView(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-xl bg-[#14171f] border border-white/20 rounded-3xl p-6 sm:p-8 text-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-[10px] font-mono uppercase text-[#a855f7] border border-white/10">
                    {selectedServiceForQuickView.category}
                  </span>
                  <h3 className="text-2xl font-bold font-display mt-2">{selectedServiceForQuickView.name}</h3>
                </div>
                <button
                  onClick={() => setSelectedServiceForQuickView(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-6">
                {selectedServiceForQuickView.tagline}
              </p>

              <div className="space-y-4 mb-6 text-xs sm:text-sm">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                  <div className="text-[11px] font-mono text-[#c084fc] uppercase mb-1">Production Equipment & Crew:</div>
                  <div className="text-neutral-300 font-light">{selectedServiceForQuickView.specs}</div>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                  <div className="text-[11px] font-mono text-[#a855f7] uppercase mb-2">Detailed Deliverables:</div>
                  <ul className="space-y-2">
                    {selectedServiceForQuickView.deliverables.map((item, i) => (
                      <li key={i} className="flex items-center space-x-2 text-neutral-200">
                        <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 font-mono text-xs">
                  <span className="text-neutral-400">Estimated Turnaround:</span>
                  <span className="text-white font-bold">{selectedServiceForQuickView.turnaround}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    const name = selectedServiceForQuickView.name;
                    setSelectedServiceForQuickView(null);
                    handleBook(name);
                  }}
                  className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#9333ea] via-[#a855f7] to-[#c084fc] text-white font-semibold text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book This Service Brief</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
