import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioProject } from '../types';
import { X, Play, Image as ImageIcon, Film, Clock, Calendar, Building2, ZoomIn } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  project: PortfolioProject | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  const isImageMedia = project.mediaType === 'image' || (!project.videoUrl && (project.imageUrl || project.thumbnail));
  const displayImage = project.imageUrl || project.thumbnail;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/95 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative w-full max-w-5xl max-h-[92vh] bg-[#141518] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 shadow-[0_25px_70px_rgba(0,0,0,0.9)] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-[#0e0f12] border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="min-w-0 pr-4">
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-[#c084fc] uppercase mb-1">
                  <span className="px-2 py-0.5 rounded bg-[#9333ea]/20 border border-[#a855f7]/30 text-white font-semibold">
                    {project.category}
                  </span>
                  {isImageMedia ? (
                    <span className="flex items-center space-x-1 text-neutral-400">
                      <ImageIcon className="w-3 h-3 text-[#a855f7]" />
                      <span>Photo / Stills</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-1 text-neutral-400">
                      <Film className="w-3 h-3 text-[#a855f7]" />
                      <span>Cinema Video</span>
                    </span>
                  )}
                  {project.client && (
                    <span className="text-neutral-400 hidden sm:inline">• Client: {project.client}</span>
                  )}
                </div>
                <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight truncate">
                  {project.title}
                </h3>
              </div>

              <button
                onClick={onClose}
                className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Media Stage */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
              {isImageMedia ? (
                <div className="relative w-full h-full flex items-center justify-center p-2 bg-[#0a0a0c]">
                  <img
                    src={displayImage}
                    alt={project.title}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  />
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-mono text-white flex items-center space-x-1.5 pointer-events-none">
                    <ZoomIn className="w-3.5 h-3.5 text-[#c084fc]" />
                    <span>High-Res Stills</span>
                  </div>
                </div>
              ) : project.videoUrl?.includes('player.cloudinary.com') || project.videoUrl?.includes('embed') ? (
                <iframe
                  src={project.videoUrl.includes('?') ? `${project.videoUrl}&autoplay=true` : `${project.videoUrl}?autoplay=true`}
                  title={project.title}
                  className="w-full h-full border-0"
                  allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  controls
                  autoPlay
                  playsInline
                  poster={project.thumbnail}
                  className="w-full h-full object-contain"
                >
                  {project.videoUrl && <source src={project.videoUrl} type="video/mp4" />}
                  Your browser does not support HTML5 video.
                </video>
              )}
            </div>

            {/* Modal Footer Description */}
            <div className="p-4 sm:p-6 bg-[#0f1013] overflow-y-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10 shrink-0">
              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed max-w-2xl">
                {project.description}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-400 shrink-0">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-[#a855f7]" />
                  <span>{project.year}</span>
                </span>
                {project.duration && (
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-[#c084fc]" />
                    <span>{project.duration}</span>
                  </span>
                )}
                {project.client && (
                  <span className="flex items-center space-x-1 sm:hidden">
                    <Building2 className="w-3.5 h-3.5 text-[#a855f7]" />
                    <span>{project.client}</span>
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

