import React, { useRef, useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSiteData } from '../context/SiteDataContext';
import { useAudio } from '../context/AudioContext';
import { Play, Volume2, VolumeX, Pause, Sparkles, Film, ArrowDown, Music } from 'lucide-react';

interface HeroProps {
  onWatchShowreel: () => void;
  onExploreWork: () => void;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = memo(({ onWatchShowreel, onExploreWork, onOpenBooking }) => {
  const { data } = useSiteData();
  const heroData = data.heroData;
  const {
    isMuted,
    isPlaying,
    isAutoplayBlocked,
    toggleMute,
    togglePlay,
    enableSound,
    registerVideoElement,
  } = useAudio();

  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);

  // Helper to generate optimized Cloudinary stream URLs (Desktop & Mobile optimized)
  const getOptimizedStream = (url: string, ext: string, isMobile: boolean = false) => {
    if (!url) return '';
    if (url.includes('player.cloudinary.com/embed')) {
      try {
        const urlObj = new URL(url);
        const cloudName = urlObj.searchParams.get('cloud_name') || 'spk1t8xs';
        const publicId = urlObj.searchParams.get('public_id') || '0917_3';
        const transform = isMobile
          ? 'w_1280,h_720,c_limit,q_auto:good,f_auto,vc_auto'
          : 'q_auto:good,f_auto,vc_auto';
        return `https://res.cloudinary.com/${cloudName}/video/upload/${transform}/${publicId}.${ext}`;
      } catch {
        return `https://res.cloudinary.com/spk1t8xs/video/upload/q_auto:good,f_auto,vc_auto/0917_3.${ext}`;
      }
    }
    return url;
  };

  const webmSrc = getOptimizedStream(heroData.videoWebm || 'https://res.cloudinary.com/spk1t8xs/video/upload/0917_3.webm', 'webm');
  const mp4Src = getOptimizedStream(heroData.videoMp4 || 'https://res.cloudinary.com/spk1t8xs/video/upload/0917_3.mp4', 'mp4');

  // Register video element once on mount to persistent Audio Context
  useEffect(() => {
    if (videoRef.current) {
      registerVideoElement(videoRef.current);
    }
  }, [registerVideoElement]);

  const handleVideoCanPlay = () => {
    setVideoLoaded(true);
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100dvh] sm:min-h-screen w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Poster Image (Renders Instantly to eliminate layout shifts or black frames) */}
      <div
        className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
          videoLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        style={{
          backgroundImage: `url(${heroData.posterUrl || 'https://kamalazam.com/assets/hero_cinematic_automotive_1789133676136-Bf8Y8A7B.jpg'})`,
          backgroundPosition: 'center 30%',
        }}
      />

      {/* Persistent Single Background Video Stream */}
      <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center">
        <video
          ref={videoRef}
          autoPlay
          loop
          playsInline
          preload="metadata"
          onCanPlay={handleVideoCanPlay}
          poster={heroData.posterUrl}
          style={{ willChange: 'transform', transform: 'translate3d(0,0,0)' }}
          className={`w-full h-full object-cover object-[center_30%] sm:object-center scale-100 sm:scale-105 transition-opacity duration-1000 ease-out ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Browser evaluates WebM/VP9 first, falls back to MP4/H264 without duplicate downloads */}
          <source src={webmSrc} type="video/webm" />
          <source src={mp4Src} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>

        {/* Atmospheric Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090b] via-black/40 sm:via-black/50 to-black/75 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/30 to-[#08090b]/90 pointer-events-none" />

        {/* Film grain layer */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating Video Media Controls */}
      <div className="absolute top-20 right-4 sm:top-auto sm:bottom-8 sm:right-10 z-20 flex items-center space-x-2">
        <button
          id="hero-play-pause-btn"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
          className="p-2.5 sm:p-3 rounded-full bg-black/70 hover:bg-black/90 text-white/80 hover:text-white border border-white/20 backdrop-blur-md transition-all duration-200 cursor-pointer shadow-lg active:scale-95 hover:scale-105"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-0.5" />}
        </button>
        <button
          id="hero-sound-toggle-btn"
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute background video sound' : 'Mute background video sound'}
          className="p-2.5 sm:p-3 rounded-full bg-black/70 hover:bg-black/90 text-white/80 hover:text-white border border-white/20 backdrop-blur-md transition-all duration-200 cursor-pointer shadow-lg active:scale-95 hover:scale-105"
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c084fc]" />}
        </button>
      </div>

      {/* Autoplay Blocked "SOUND ON / ENTER AUDIO" Banner (If browser blocked audio on initial load) */}
      <AnimatePresence>
        {isAutoplayBlocked && isMuted && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 z-30"
          >
            <button
              onClick={enableSound}
              className="px-4 py-2 rounded-full bg-purple-950/80 hover:bg-purple-900/90 text-white text-xs font-semibold uppercase tracking-wider border border-[#a855f7]/60 shadow-[0_0_20px_rgba(168,85,247,0.4)] backdrop-blur-xl flex items-center space-x-2 active:scale-95 transition-all cursor-pointer animate-pulse"
            >
              <Music className="w-3.5 h-3.5 text-[#e879f9]" />
              <span>Click to Enable Sound</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Hero Foreground Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 sm:pt-28 pb-16">
        {/* Top Signature & Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex flex-col items-center justify-center mb-4 sm:mb-6"
        >
          <img
            src={heroData.logoUrl || '/kamal-azam-logo.png'}
            alt={heroData.name}
            className="h-14 sm:h-20 md:h-24 w-auto object-contain mb-2 sm:mb-3 drop-shadow-[0_0_30px_rgba(192,132,252,0.45)]"
          />
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/15 text-[11px] sm:text-xs md:text-sm font-medium tracking-widest text-[#c084fc] uppercase shadow-xl">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#a855f7]" />
            <span>{heroData.role}</span>
          </div>
        </motion.div>

        {/* Primary Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase font-display leading-[1.12] sm:leading-[1.08] drop-shadow-2xl px-1"
        >
          {(() => {
            const text = heroData.tagline || 'We Start With Art.';
            const regex = /(with\s+art[.]?)/i;
            const parts = text.split(regex);
            if (parts.length < 2) {
              return text;
            }
            return (
              <>
                {parts.map((part, index) => {
                  if (regex.test(part)) {
                    return (
                      <span
                        key={index}
                        className="text-transparent bg-clip-text bg-gradient-to-r from-[#c084fc] via-[#a855f7] to-[#e879f9] drop-shadow-[0_0_35px_rgba(168,85,247,0.7)]"
                      >
                        {part}
                      </span>
                    );
                  }
                  return <span key={index}>{part}</span>;
                })}
              </>
            );
          })()}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-3 sm:mt-6 max-w-3xl mx-auto text-xs sm:text-base md:text-lg text-neutral-300 leading-relaxed font-light px-2"
        >
          {heroData.subtagline}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-6 sm:mt-9 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 px-2 sm:px-0"
        >
          <button
            id="hero-watch-showreel-btn"
            onClick={onWatchShowreel}
            className="w-full sm:w-auto flex items-center justify-center space-x-3 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-neutral-200 transition-all duration-200 shadow-[0_0_30px_rgba(255,255,255,0.25)] active:scale-95 hover:scale-105 cursor-pointer group"
          >
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#9333ea] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <Play className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-current ml-0.5" />
            </div>
            <span>Watch Showreel 2026</span>
          </button>

          <button
            id="hero-explore-work-btn"
            onClick={onExploreWork}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 sm:py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-medium text-xs sm:text-sm uppercase tracking-wider border border-white/20 backdrop-blur-md transition-all duration-200 active:scale-95 hover:scale-105 cursor-pointer"
          >
            <Film className="w-4 h-4 text-[#c084fc]" />
            <span>Our Works</span>
          </button>

          <button
            id="hero-book-btn"
            onClick={onOpenBooking}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#9333ea] via-[#a855f7] to-[#c084fc] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 transition-all duration-200 shadow-[0_0_25px_rgba(168,85,247,0.45)] active:scale-95 hover:scale-105 cursor-pointer"
          >
            <span>Book Production</span>
          </button>
        </motion.div>

        {/* Capability Ribbon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 sm:mt-14 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] sm:text-xs text-neutral-400 font-mono"
        >
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for New Projects</span>
          </div>
          <span className="hidden sm:inline text-white/20">•</span>
          <div className="hidden xs:inline">Commercial Campaigns & Films</div>
          <span className="hidden sm:inline text-white/20">•</span>
          <div className="hidden xs:inline">Cinema 4K & Social Sprints</div>
        </motion.div>
      </div>

      {/* Down indicator */}
      <button
        onClick={onExploreWork}
        aria-label="Scroll down to services"
        className="hidden sm:block absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-white/50 hover:text-white transition-colors duration-200 animate-bounce cursor-pointer p-2"
      >
        <ArrowDown className="w-5 h-5" />
      </button>
    </section>
  );
});
