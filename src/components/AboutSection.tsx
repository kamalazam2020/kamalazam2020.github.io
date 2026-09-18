import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useSiteData } from '../context/SiteDataContext';
import { ChevronDown, Sparkles, Heart, Film, Target, Award } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { data } = useSiteData();
  const [openFaq, setOpenFaq] = useState<number | null>(0);


  const pillars = [
    {
      icon: Film,
      title: 'We Want to Tell Stories',
      desc: 'Founded on the conviction that powerful visuals and honest storytelling drive lasting emotional connection for modern brands.'
    },
    {
      icon: Heart,
      title: 'Respecting the Creative Process',
      desc: 'Every script, lighting scheme, and audio master receives painstaking attention to detail without rushing the craft.'
    },
    {
      icon: Award,
      title: 'Passionate Filmmakers & Creators',
      desc: 'Immersed in the cultural pulse of modern cinema, visual arts, and high-impact digital storytelling.'
    },
    {
      icon: Target,
      title: 'Innovating with Intention',
      desc: 'We adopt cutting-edge cinema technology, gimbal workflows, and color workflows to serve the narrative, not just vanity.'
    }
  ];

  return (
    <section id="about-us" className="py-24 sm:py-32 bg-[#141414] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#a855f7] font-mono font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Story & Mission</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white font-display leading-tight">
            Crafting Films Where Every Frame Has Meaning
          </h2>
          <p className="mt-6 text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
            Synthesizing cinematic vision with strategic digital distribution, Content Creator & Director Kamal Azam leads an acclaimed production collective trusted by global corporations, regional enterprises, and independent innovators.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-7 rounded-2xl bg-[#1c1c1c] border border-white/10 hover:border-[#a855f7]/60 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#a855f7] mb-6 group-hover:scale-110 group-hover:bg-[#9333ea] group-hover:text-white transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#c084fc] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                    {p.desc}
                  </p>
                </div>
                <div className="h-0.5 w-8 bg-[#a855f7]/40 mt-6 group-hover:w-full transition-all duration-300" />
              </motion.div>
            );
          })}
        </div>

        {/* FAQs Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-xs font-mono uppercase tracking-widest text-[#a855f7] mb-2">
              Common Inquiries
            </div>
            <h3 className="text-3xl font-extrabold uppercase text-white font-display">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-4">
            {data.faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-[#181818] overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between space-x-4 cursor-pointer"
                  >
                    <span className="text-base font-semibold text-white">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#a855f7] transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm text-neutral-300 font-light leading-relaxed border-t border-white/5">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
