import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useSiteData } from '../context/SiteDataContext';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface ProcessSectionProps {
  onViewAllServices: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onViewAllServices }) => {
  const { data } = useSiteData();
  const [activeStep, setActiveStep] = useState<number>(0);


  return (
    <section id="our-services" className="relative py-24 sm:py-32 bg-[#121212] overflow-hidden">
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#9333ea]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-[#c084fc]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10">
          <div>
            <div className="inline-block text-xs uppercase tracking-widest text-[#a855f7] font-semibold mb-2 font-mono">
              The 360° Workflow
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase text-white font-display tracking-tight">
              Our Services
            </h2>
          </div>
          <button
            onClick={onViewAllServices}
            className="group mt-4 md:mt-0 inline-flex items-center space-x-2 text-sm uppercase tracking-wider text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            <span>View All Services</span>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#9333ea] group-hover:bg-[#9333ea] group-hover:text-white transition-all">
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </button>
        </div>

        {/* 3-Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line for desktop */}
          <div className="hidden md:block absolute top-[46px] left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-[#a855f7]/20 via-[#a855f7]/60 to-[#a855f7]/20 pointer-events-none" />

          {data.processSteps.map((step, index) => {
            const isSelected = activeStep === index;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                onClick={() => setActiveStep(index)}
                className={`relative p-8 rounded-2xl transition-all duration-400 cursor-pointer border ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#1c1c1c] to-[#151515] border-[#a855f7]/50 shadow-[0_10px_35px_rgba(168,85,247,0.2)] scale-[1.02]'
                    : 'bg-[#161616]/60 hover:bg-[#1c1c1c]/80 border-white/5 hover:border-white/15'
                }`}
              >
                {/* Header row: Number & Concentric Rings Dot */}
                <div className="flex items-center justify-between mb-8">
                  <span className="font-display text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white/90 to-white/20">
                    {step.number}
                  </span>

                  {/* Concentric Glowing Pulsing Rings (Faithful to Webflow animation) */}
                  <div className="relative flex items-center justify-center w-16 h-16">
                    {/* Center glowing dot */}
                    <div
                      className={`w-3.5 h-3.5 rounded-full z-10 transition-transform duration-300 ${
                        isSelected
                          ? 'bg-[#c084fc] shadow-[0_0_15px_#c084fc] scale-125'
                          : 'bg-[#9333ea]'
                      }`}
                    />

                    {/* Ring 1 */}
                    <div
                      className={`absolute rounded-full border border-[#a855f7]/40 ${
                        isSelected ? 'w-8 h-8 animate-pulse-ring-1' : 'w-7 h-7'
                      }`}
                    />

                    {/* Ring 2 */}
                    <div
                      className={`absolute rounded-full border border-[#a855f7]/25 ${
                        isSelected ? 'w-12 h-12 animate-pulse-ring-2' : 'w-11 h-11'
                      }`}
                    />

                    {/* Ring 3 */}
                    <div
                      className={`absolute rounded-full border border-[#a855f7]/10 ${
                        isSelected ? 'w-16 h-16 animate-pulse-ring-3' : 'w-14 h-14'
                      }`}
                    />
                  </div>
                </div>

                {/* Step Title */}
                <h3
                  className={`text-2xl font-bold tracking-tight mb-3 transition-colors ${
                    isSelected ? 'text-white' : 'text-neutral-300'
                  }`}
                >
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-sm text-neutral-400 leading-relaxed font-light mb-6">
                  {step.description}
                </p>

                {/* Deliverables badges */}
                <div className="space-y-2 pt-4 border-t border-white/10">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#c084fc]/90 block mb-2">
                    Key Deliverables
                  </span>
                  {step.deliverables.map((item, i) => (
                    <div key={i} className="flex items-center space-x-2 text-xs text-neutral-300">
                      <CheckCircle2
                        className={`w-3.5 h-3.5 flex-shrink-0 ${
                          isSelected ? 'text-[#a855f7]' : 'text-neutral-500'
                        }`}
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom line accent */}
                <div
                  className={`h-0.5 mt-6 rounded-full transition-all duration-300 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#9333ea] via-[#a855f7] to-[#c084fc] w-full'
                      : 'bg-white/10 w-12'
                  }`}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
