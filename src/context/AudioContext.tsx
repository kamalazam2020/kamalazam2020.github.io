import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

interface AudioContextType {
  isMuted: boolean;
  isPlaying: boolean;
  isAutoplayBlocked: boolean;
  toggleMute: () => void;
  togglePlay: () => void;
  enableSound: () => void;
  setDucked: (ducked: boolean) => void;
  registerVideoElement: (el: HTMLVideoElement | null) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

const SOUND_PREF_KEY = 'kamal_sound_pref_v1';

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(SOUND_PREF_KEY);
      // Default to unmuted (sound on) unless user explicitly turned it off
      return saved === 'off';
    } catch {
      return false;
    }
  });

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isAutoplayBlocked, setIsAutoplayBlocked] = useState<boolean>(false);
  const [isDucked, setIsDuckedState] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasInteractedRef = useRef<boolean>(false);

  // Sync video audio state smoothly
  const syncAudioToVideo = useCallback(
    (muted: boolean, playing: boolean, ducked: boolean) => {
      const video = videoRef.current;
      if (!video) return;

      if (ducked) {
        video.muted = true;
      } else {
        video.muted = muted;
        video.volume = muted ? 0 : 0.85;
      }

      if (playing && video.paused) {
        video.play().catch(() => {});
      } else if (!playing && !video.paused) {
        video.pause();
      }
    },
    []
  );

  const registerVideoElement = useCallback(
    (el: HTMLVideoElement | null) => {
      videoRef.current = el;
      if (!el) return;

      // Check user preference
      const savedPref = localStorage.getItem(SOUND_PREF_KEY);
      const shouldMute = savedPref === 'off';

      el.muted = shouldMute;
      el.volume = shouldMute ? 0 : 0.85;

      const playPromise = el.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsAutoplayBlocked(false);
          })
          .catch((err) => {
            // Autoplay with sound was blocked by browser policy
            console.log('Autoplay audio blocked by browser policy. Awaiting user interaction.', err?.message);
            setIsAutoplayBlocked(true);
            // Fallback to muted playback so visuals still play smoothly
            el.muted = true;
            el.play().catch(() => {});
          });
      }
    },
    []
  );

  // User gesture listener to automatically unlock audio if blocked
  useEffect(() => {
    const handleFirstGesture = () => {
      if (hasInteractedRef.current) return;
      hasInteractedRef.current = true;

      const savedPref = localStorage.getItem(SOUND_PREF_KEY);
      const userWantsSound = savedPref !== 'off';

      if (userWantsSound && videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.volume = 0.85;
        videoRef.current.play().catch(() => {});
        setIsMuted(false);
        setIsAutoplayBlocked(false);
      }
    };

    window.addEventListener('click', handleFirstGesture, { once: true, passive: true });
    window.addEventListener('touchstart', handleFirstGesture, { once: true, passive: true });
    window.addEventListener('keydown', handleFirstGesture, { once: true, passive: true });

    return () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(SOUND_PREF_KEY, next ? 'off' : 'on');
      } catch {}

      if (videoRef.current) {
        videoRef.current.muted = next;
        videoRef.current.volume = next ? 0 : 0.85;
        if (!next && videoRef.current.paused) {
          videoRef.current.play().catch(() => {});
          setIsPlaying(true);
        }
      }
      setIsAutoplayBlocked(false);
      return next;
    });
  }, []);

  const enableSound = useCallback(() => {
    try {
      localStorage.setItem(SOUND_PREF_KEY, 'on');
    } catch {}
    setIsMuted(false);
    setIsAutoplayBlocked(false);
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 0.85;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => {
      const next = !prev;
      if (videoRef.current) {
        if (next) {
          videoRef.current.play().catch(() => {});
        } else {
          videoRef.current.pause();
        }
      }
      return next;
    });
  }, []);

  const setDucked = useCallback((ducked: boolean) => {
    setIsDuckedState(ducked);
    if (videoRef.current) {
      if (ducked) {
        videoRef.current.muted = true;
      } else {
        const savedPref = localStorage.getItem(SOUND_PREF_KEY);
        const shouldMute = savedPref === 'off';
        videoRef.current.muted = shouldMute;
        videoRef.current.volume = shouldMute ? 0 : 0.85;
      }
    }
  }, []);

  return (
    <AudioContext.Provider
      value={{
        isMuted,
        isPlaying,
        isAutoplayBlocked,
        toggleMute,
        togglePlay,
        enableSound,
        setDucked,
        registerVideoElement,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
