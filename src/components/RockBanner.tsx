import React, { useState } from 'react';
import { motion } from 'motion/react';

export const RockBanner: React.FC = () => {
  const [hoveredLetter, setHoveredLetter] = useState<string | null>(null);

  const words = [
    { word: 'KAMAL', color: '#a855f7' },
    { word: 'AZAM', color: '#c084fc' }
  ];

  return (
    <section className="relative py-12 sm:py-20 md:py-24 bg-[#08090b] overflow-hidden select-none border-y border-white/5">
      {/* Subtle background ambient grid */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 md:gap-10">
          {words.map((w, wIdx) => (
            <div key={wIdx} className="flex items-center justify-center space-x-0.5 sm:space-x-2 md:space-x-3">
              {w.word.split('').map((char, cIdx) => {
                const letterKey = `${wIdx}-${cIdx}`;
                const isHovered = hoveredLetter === letterKey;
                return (
                  <motion.div
                    key={letterKey}
                    onMouseEnter={() => setHoveredLetter(letterKey)}
                    onMouseLeave={() => setHoveredLetter(null)}
                    whileHover={{ scale: 1.05, y: -4 }}
                    transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                    className="cursor-pointer transition-all duration-300"
                  >
                    <span
                      className="font-display font-black uppercase text-4xl sm:text-6xl md:text-8xl lg:text-9xl tracking-tight block leading-none select-none"
                      style={{
                        WebkitTextStroke: isHovered
                          ? `2px ${w.color}`
                          : '1px rgba(255, 255, 255, 0.75)',
                        color: isHovered ? w.color : 'transparent',
                        textShadow: isHovered ? `0 0 40px ${w.color}80` : 'none',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    >
                      {char}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Ambient ticker subline matching kamalazam.com */}
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-5 text-[11px] sm:text-sm font-mono tracking-wider sm:tracking-widest text-neutral-400 uppercase px-4">
          <span>01 Video Production</span>
          <span className="text-[#a855f7]">•</span>
          <span>02 Photography</span>
          <span className="text-[#a855f7]">•</span>
          <span>03 Social Management</span>
          <span className="text-[#a855f7] hidden sm:inline">•</span>
          <span className="hidden sm:inline">04 Media Buying</span>
        </div>
      </div>
    </section>
  );
};

