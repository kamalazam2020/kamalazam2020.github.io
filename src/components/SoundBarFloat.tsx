import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export const SoundBarFloat: React.FC = () => {
  const { isMuted, isPlaying, toggleMute } = useAudio();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center">
      {/* Sound Pill */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex items-center bg-black/80 hover:bg-black/95 text-white pl-3.5 pr-2.5 py-2 rounded-full border border-white/15 hover:border-[#a855f7]/50 shadow-[0_4px_25px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-300"
      >
        {/* Animated Equalizer Wave Bars */}
        <div className="flex items-end space-x-0.5 h-3.5 mr-2.5">
          <span
            className={`w-0.5 bg-[#c084fc] rounded-full transition-all ${
              !isMuted && isPlaying ? 'animate-[pulse_0.6s_ease-in-out_infinite] h-3.5' : 'h-1 opacity-40'
            }`}
          />
          <span
            className={`w-0.5 bg-[#a855f7] rounded-full transition-all ${
              !isMuted && isPlaying ? 'animate-[pulse_0.4s_ease-in-out_infinite_0.15s] h-2.5' : 'h-1 opacity-40'
            }`}
          />
          <span
            className={`w-0.5 bg-white rounded-full transition-all ${
              !isMuted && isPlaying ? 'animate-[pulse_0.8s_ease-in-out_infinite_0.3s] h-3' : 'h-1 opacity-40'
            }`}
          />
          <span
            className={`w-0.5 bg-[#e879f9] rounded-full transition-all ${
              !isMuted && isPlaying ? 'animate-[pulse_0.5s_ease-in-out_infinite_0.2s] h-2' : 'h-1 opacity-40'
            }`}
          />
        </div>

        {/* Audio Label */}
        <div className="flex flex-col pr-2 text-left">
          <span className="text-[10px] font-mono tracking-wider uppercase text-neutral-400 leading-none">
            Soundtrack
          </span>
          <span className="text-[11px] font-semibold text-white tracking-wide leading-tight flex items-center space-x-1">
            <span>{isMuted ? 'Sound Muted' : isPlaying ? 'Cinema Audio' : 'Paused'}</span>
          </span>
        </div>

        {/* Action Toggle Button */}
        <div className="flex items-center space-x-1 ml-1 pl-1 border-l border-white/10">
          <button
            id="floating-sound-mute-btn"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            className="p-1.5 rounded-full hover:bg-white/15 text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-red-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#c084fc]" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
