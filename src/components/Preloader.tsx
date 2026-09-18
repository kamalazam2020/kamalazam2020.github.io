import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FastForward, Sparkles } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

interface PreloaderProps {
  onComplete?: () => void;
}

// Lightweight prism particle data for zero-data GPU visual explosion
const PRISM_BEAMS = [
  { id: 1, angle: -80, color: '#9333ea', width: 3, delay: 0.05, length: 140 },
  { id: 2, angle: -60, color: '#a855f7', width: 2, delay: 0.1, length: 180 },
  { id: 3, angle: -40, color: '#c084fc', width: 3.5, delay: 0.05, length: 170 },
  { id: 4, angle: -20, color: '#e879f9', width: 2.5, delay: 0.15, length: 200 },
  { id: 5, angle: 0, color: '#ffffff', width: 4, delay: 0.0, length: 230 },
  { id: 6, angle: 20, color: '#e879f9', width: 2.5, delay: 0.15, length: 200 },
  { id: 7, angle: 40, color: '#c084fc', width: 3.5, delay: 0.05, length: 170 },
  { id: 8, angle: 60, color: '#a855f7', width: 2, delay: 0.1, length: 180 },
  { id: 9, angle: 80, color: '#9333ea', width: 3, delay: 0.05, length: 140 },
];

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const { data } = useSiteData();
  const logoUrl = data?.heroData?.logoUrl || '/kamal-azam-logo.png';

  // Stages:
  // 0: Darkness (0.0s - 0.4s)
  // 1: Netflix-style "K" Letter Ribbon surge & audio boom (0.4s - 1.4s)
  // 2: The Logo emerges and expands OUT from the center of the "K" (1.4s - 2.5s)
  // 3: Logo cinematic glory & subtitle display (2.5s - 3.4s)
  // 4: Smooth warp dissolve into live site (3.4s - 4.0s)
  // 5: Complete (Unmounted)
  const [stage, setStage] = useState<number>(0);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Play cinematic "Ta-Dum" bass sound via Web Audio API (0 KB data download)
  const playCinematicSound = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const now = ctx.currentTime;

      // Deep Sub-Bass Impact (The "Ta-")
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      const filter1 = ctx.createBiquadFilter();

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(80, now);
      osc1.frequency.exponentialRampToValueAtTime(32, now + 0.9);

      filter1.type = 'lowpass';
      filter1.frequency.setValueAtTime(140, now);
      filter1.frequency.exponentialRampToValueAtTime(45, now + 1.2);

      gain1.gain.setValueAtTime(0.01, now);
      gain1.gain.linearRampToValueAtTime(0.4, now + 0.08);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

      osc1.connect(filter1);
      filter1.connect(gain1);
      gain1.connect(ctx.destination);

      osc1.start(now);
      osc1.stop(now + 1.5);

      // Resonant Harmonic Chord (The "-Dum")
      setTimeout(() => {
        if (ctx.state === 'closed') return;
        const now2 = ctx.currentTime;

        const osc2 = ctx.createOscillator();
        const osc3 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        const filter2 = ctx.createBiquadFilter();

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(110, now2); // A2
        osc2.frequency.exponentialRampToValueAtTime(55, now2 + 1.5);

        osc3.type = 'sine';
        osc3.frequency.setValueAtTime(164.81, now2); // E3
        osc3.frequency.exponentialRampToValueAtTime(82.4, now2 + 1.5);

        filter2.type = 'lowpass';
        filter2.frequency.setValueAtTime(450, now2);
        filter2.frequency.exponentialRampToValueAtTime(80, now2 + 1.8);

        gain2.gain.setValueAtTime(0.01, now2);
        gain2.gain.linearRampToValueAtTime(0.35, now2 + 0.05);
        gain2.gain.exponentialRampToValueAtTime(0.001, now2 + 2.0);

        osc2.connect(filter2);
        osc3.connect(filter2);
        filter2.connect(gain2);
        gain2.connect(ctx.destination);

        osc2.start(now2);
        osc3.start(now2);
        osc2.stop(now2 + 2.2);
        osc3.stop(now2 + 2.2);
      }, 300);
    } catch {
      // Audio playback fails silently if browser policy blocks autoplay
    }
  };

  // Skip Intro immediately & safely release scroll lock
  const handleSkip = () => {
    setStage(5);
    document.body.style.overflow = '';
    onComplete?.();
  };

  // Ultra-responsive Roll Down / Swipe detection (instant exit to main page)
  useEffect(() => {
    const handleWheelOrScroll = (e: WheelEvent) => {
      if (e.deltaY > 5 || e.deltaY < -15) {
        handleSkip();
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY || 0;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0]?.clientY || 0;
      if (Math.abs(touchStartY - currentY) > 15) {
        handleSkip();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'ArrowDown') {
        handleSkip();
      }
    };

    window.addEventListener('wheel', handleWheelOrScroll, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheelOrScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Lock scroll temporarily while intro runs
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    return () => {
      document.body.style.overflow = originalOverflow;
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Chronological Sequence
  useEffect(() => {
    // 1: Ribbon "K" surge + Sound
    const t1 = setTimeout(() => {
      setStage(1);
      playCinematicSound();
    }, 400);

    // 2: Logo emerges right out from center of K
    const t2 = setTimeout(() => {
      setStage(2);
    }, 1400);

    // 3: Logo in full focus & subtitle
    const t3 = setTimeout(() => {
      setStage(3);
    }, 2400);

    // 4: Warp dive into live site
    const t4 = setTimeout(() => {
      setStage(4);
    }, 3400);

    // 5: Complete
    const t5 = setTimeout(() => {
      setStage(5);
      document.body.style.overflow = '';
      onComplete?.();
    }, 4000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  if (stage >= 5) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        id="netflix-welcome-screen"
        key="netflix-welcome-container"
        initial={{ opacity: 1 }}
        animate={{ opacity: stage === 4 ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[9999] bg-[#050507] flex items-center justify-center overflow-hidden select-none cursor-pointer"
        onClick={handleSkip}
        style={{ willChange: 'transform, opacity' }}
      >
        {/* Deep Atmospheric Core Radial Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: stage >= 1 ? (stage >= 2 ? 0.95 : 0.6) : 0,
              scale: stage >= 2 ? 1.3 : 1,
            }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.35)_0%,rgba(147,51,234,0.15)_40%,transparent_70%)] blur-3xl"
          />

          {/* Anamorphic Horizontal Laser Beam (Cinematic Lens Flare) */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: stage === 1 ? [0, 1.3, 1] : stage >= 2 ? 1.8 : 0,
              opacity: stage === 1 ? [0, 0.9, 0.6] : stage >= 2 ? 0.85 : 0,
            }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c084fc] to-transparent shadow-[0_0_30px_#a855f7] -translate-y-1/2"
          />

          {/* Shockwave Energy Rings */}
          {stage >= 1 && stage < 3 && (
            <motion.div
              initial={{ scale: 0.2, opacity: 0.9 }}
              animate={{ scale: 3.2, opacity: 0 }}
              transition={{ duration: 1.3, ease: 'easeOut' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full border border-[#c084fc]/60 shadow-[0_0_45px_rgba(168,85,247,0.5)]"
            />
          )}
        </div>

        {/* ========================================================================= */}
        {/* STAGE 1: THE RIBBON "K" (NETFLIX STYLE)                                    */}
        {/* ========================================================================= */}
        <div className="relative z-20 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={
              stage === 1
                ? { scale: 1, opacity: 1 }
                : stage >= 2
                ? { scale: 1.4, opacity: 0, filter: 'blur(12px)' }
                : { scale: 0.85, opacity: 0 }
            }
            transition={{
              duration: stage >= 2 ? 0.7 : 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`relative w-32 sm:w-44 h-44 sm:h-56 flex items-center justify-center ${
              stage >= 3 ? 'pointer-events-none hidden' : ''
            }`}
          >
            {/* 1. Left Vertical Stem of "K" */}
            <motion.div
              initial={{ height: '0%' }}
              animate={{ height: stage >= 1 ? '100%' : '0%' }}
              transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-3 sm:left-5 top-0 bottom-0 w-4.5 sm:w-6 bg-gradient-to-t from-[#581c87] via-[#9333ea] to-[#e879f9] rounded-sm shadow-[0_0_35px_rgba(168,85,247,0.95)] z-10"
            >
              <div className="absolute inset-y-0 left-1 w-1 bg-white/40 rounded-full blur-[1px]" />
            </motion.div>

            {/* 2. Upper Diagonal Arm of "K" */}
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: stage >= 1 ? '65%' : '0%' }}
              transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              style={{
                transformOrigin: 'left center',
                transform: 'rotate(-40deg)',
                top: '48%',
                left: '26%',
              }}
              className="absolute h-4.5 sm:h-6 bg-gradient-to-r from-[#9333ea] via-[#c084fc] to-white rounded-sm shadow-[0_0_40px_rgba(232,121,249,0.95)] z-20"
            >
              <div className="absolute inset-x-0 top-1 h-1 bg-white/50 rounded-full blur-[1px]" />
            </motion.div>

            {/* 3. Lower Diagonal Leg of "K" */}
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: stage >= 1 ? '68%' : '0%' }}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{
                transformOrigin: 'left center',
                transform: 'rotate(40deg)',
                top: '46%',
                left: '26%',
              }}
              className="absolute h-4.5 sm:h-6 bg-gradient-to-r from-[#7e22ce] via-[#a855f7] to-[#c084fc] rounded-sm shadow-[0_0_35px_rgba(168,85,247,0.9)] z-20"
            >
              <div className="absolute inset-x-0 bottom-1 h-1 bg-white/35 rounded-full blur-[1px]" />
            </motion.div>

            {/* Glowing Epicenter Core where Logo emerges from */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: stage === 1 ? [0, 1.2, 1] : stage === 2 ? 3 : 0,
                opacity: stage === 1 ? 1 : stage === 2 ? 0.8 : 0,
              }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              className="absolute left-[24%] top-[44%] w-8 h-8 rounded-full bg-white/90 blur-md z-30 shadow-[0_0_30px_#ffffff]"
            />
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* STAGE 2: PRISM LIGHT STREAMS EXPANDING OUTWARD                             */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {stage === 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1.6 }}
              exit={{ opacity: 0, scale: 2.2 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 pointer-events-none flex items-center justify-center"
            >
              {PRISM_BEAMS.map((beam) => (
                <motion.div
                  key={beam.id}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: `${beam.length}vh`, opacity: [0, 0.9, 0.15] }}
                  transition={{ duration: 0.75, delay: beam.delay, ease: 'easeOut' }}
                  style={{
                    transform: `rotate(${beam.angle}deg)`,
                    width: `${beam.width}px`,
                    backgroundColor: beam.color,
                    boxShadow: `0 0 20px ${beam.color}, 0 0 40px ${beam.color}`,
                  }}
                  className="absolute origin-center rounded-full"
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* STAGE 2 & 3: THE LOGO EMERGES DIRECTLY OUT FROM THE CENTER OF THE "K"     */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {stage >= 2 && (
            <motion.div
              initial={{ scale: 0.15, opacity: 0, filter: 'blur(10px)' }}
              animate={
                stage === 4
                  ? { opacity: 0, scale: 1.3, y: -25, filter: 'blur(8px)' }
                  : { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }
              }
              transition={{
                duration: 0.85,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute z-30 flex flex-col items-center justify-center text-center px-4"
            >
              {/* Emerging Halo Core */}
              <div className="relative group max-w-[280px] sm:max-w-sm md:max-w-md">
                {/* Backlight Neon Violet Halo */}
                <div className="absolute inset-0 -m-8 bg-gradient-to-r from-[#9333ea]/35 via-[#c084fc]/30 to-[#e879f9]/35 rounded-3xl blur-2xl pointer-events-none" />

                {/* The Signature Logo Image (emerged from the K) */}
                <div className="relative overflow-hidden rounded-2xl p-2 sm:p-4">
                  <motion.img
                    src={logoUrl}
                    alt="Kamal Azam Media Production"
                    initial={{ scale: 0.6 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    className="max-h-20 sm:max-h-28 md:max-h-36 w-auto object-contain mx-auto select-none brightness-110 drop-shadow-[0_0_30px_rgba(192,132,252,0.7)]"
                  />

                  {/* Metallic Light Sheen Sweep Across the Logo */}
                  <motion.div
                    initial={{ x: '-130%' }}
                    animate={{ x: '230%' }}
                    transition={{ duration: 1.0, delay: 0.15, ease: 'easeInOut' }}
                    className="absolute inset-0 w-2/3 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 pointer-events-none"
                  />
                </div>
              </div>

              {/* Monospace Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.25 }}
                className="mt-3 sm:mt-4 flex items-center space-x-2 sm:space-x-3 text-[10px] sm:text-xs md:text-sm font-mono tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#c084fc]"
              >
                <span>Cinema & Direction</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7]" />
                <span>Media Production</span>
              </motion.div>

              {/* Studio Dividing Laser Line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 sm:mt-5 w-28 sm:w-56 h-[1.5px] bg-gradient-to-r from-transparent via-[#c084fc] to-transparent shadow-[0_0_20px_#a855f7]"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skip Intro & Roll Down Action Hint */}
        <div className="absolute bottom-5 right-5 sm:bottom-8 sm:right-8 z-40 flex items-center space-x-3">
          <div className="hidden sm:flex items-center space-x-1.5 text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
            <span>Scroll down or tap to enter</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSkip();
            }}
            className="flex items-center space-x-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white text-[11px] sm:text-xs font-mono uppercase tracking-wider border border-white/10 hover:border-white/25 transition-all duration-300 backdrop-blur-md cursor-pointer group"
          >
            <span>Skip Intro</span>
            <FastForward className="w-3.5 h-3.5 text-[#c084fc] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Cinematic Film Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.85)_100%)]" />
      </motion.div>
    </AnimatePresence>
  );
};

export { Preloader as WelcomeAnimation };
