import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSiteData } from '../context/SiteDataContext';
import { PortfolioProject } from '../types';
import { Play, Clock, ArrowUpRight, Image as ImageIcon, Film, Sparkles } from 'lucide-react';

interface WorkPortfolioProps {
  onPlayVideo: (project: PortfolioProject) => void;
  onOpenBooking: () => void;
}

export const WorkPortfolio: React.FC<WorkPortfolioProps> = ({ onPlayVideo, onOpenBooking }) => {
  const { data } = useSiteData();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Derive categories dynamically from customPartitions + available portfolio items
  const basePartitions = data.customPartitions || [
    'Commercial Ads',
    'Documentaries',
    'Podcasts',
    'Brand Films',
    '2D Animation',
    'Photography & Stills',
  ];
  const projectCategories = Array.from(new Set(data.portfolioProjects.map((p) => p.category)));
  const categories = ['All', ...Array.from(new Set([...basePartitions, ...projectCategories]))];

  const filteredProjects = selectedCategory === 'All'
    ? data.portfolioProjects
    : data.portfolioProjects.filter((p) => p.category === selectedCategory);

  return (
    <section id="our-work" className="py-16 sm:py-24 md:py-32 bg-[#101010] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 pb-6 border-b border-white/10">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#a855f7] font-mono font-semibold mb-2">
              Selected Works & Partitions
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white font-display tracking-tight">
              Our Work
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-xs sm:text-sm text-neutral-400 max-w-md leading-relaxed">
            A showcase of TV campaigns, luxury photography, podcast suites, and cinematic documentaries produced across Cairo, Dubai, and global markets.
          </p>
        </div>

        {/* Filter Tabs - Mobile touch-scrollable */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-3 mb-8 sm:mb-10 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            const count = cat === 'All'
              ? data.portfolioProjects.length
              : data.portfolioProjects.filter((p) => p.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 sm:px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer border flex items-center space-x-1.5 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#9333ea] to-[#a855f7] text-white border-[#a855f7] shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                    : 'bg-white/5 hover:bg-white/10 text-neutral-300 border-white/10'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20' : 'bg-white/10 text-neutral-400'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 px-4 bg-[#141416] rounded-2xl border border-dashed border-white/15">
            <Film className="w-10 h-10 text-neutral-600 mx-auto mb-2" />
            <p className="text-sm text-neutral-300 font-medium">No projects in this partition yet.</p>
            <p className="text-xs text-neutral-500 mt-1">Open Editor mode to upload videos and pictures to this partition.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => {
                const isImageMedia = project.mediaType === 'image' || (!project.videoUrl && (project.imageUrl || project.thumbnail));
                const displayThumbnail = project.imageUrl || project.thumbnail;

                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    className="group relative rounded-2xl overflow-hidden bg-[#181818] border border-white/10 hover:border-[#a855f7]/80 transition-all duration-400 flex flex-col shadow-lg"
                  >
                    {/* Media Thumbnail Container */}
                    <div
                      className="relative aspect-video w-full overflow-hidden cursor-pointer bg-neutral-900"
                      onClick={() => onPlayVideo(project)}
                    >
                      <img
                        src={displayThumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Action Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        {isImageMedia ? (
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-[#9333ea] group-hover:border-[#a855f7] shadow-2xl">
                            <ImageIcon className="w-5 h-5" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-[#9333ea] group-hover:border-[#a855f7] shadow-2xl">
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          </div>
                        )}
                      </div>

                      {/* Duration or Image Tag badge */}
                      {isImageMedia ? (
                        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md text-[11px] font-mono text-white/90 flex items-center space-x-1 border border-white/10">
                          <ImageIcon className="w-3 h-3 text-[#c084fc]" />
                          <span>Photo</span>
                        </div>
                      ) : project.duration ? (
                        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md text-[11px] font-mono text-white/90 flex items-center space-x-1 border border-white/10">
                          <Clock className="w-3 h-3 text-[#c084fc]" />
                          <span>{project.duration}</span>
                        </div>
                      ) : null}

                      {/* Category Partition Pill */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-[#a855f7] border border-white/10">
                        {project.category}
                      </div>

                      {project.featured && (
                        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-[#9333ea]/90 text-[10px] font-mono uppercase tracking-wider text-white">
                          Featured
                        </div>
                      )}
                    </div>

                    {/* Metadata Body */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs text-neutral-400 mb-2 font-mono">
                          <span className="truncate pr-2">Client: {project.client}</span>
                          <span className="shrink-0">{project.year}</span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-[#c084fc] transition-colors mb-2">
                          {project.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-neutral-400 font-light line-clamp-2 leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                        <button
                          onClick={() => onPlayVideo(project)}
                          className="text-xs uppercase font-semibold tracking-wider text-[#a855f7] hover:text-[#c084fc] transition-colors inline-flex items-center space-x-1 cursor-pointer"
                        >
                          <span>{isImageMedia ? 'View Photo' : 'Watch Reel'}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={onOpenBooking}
                          className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
                        >
                          Request Similar
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};

