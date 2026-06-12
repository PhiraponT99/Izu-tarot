/**
 * useAmbientSound.ts
 * Custom hook for managing ambient audio playback with toggle support.
 */

import { useRef, useState, useCallback, useEffect } from 'react';

interface UseAmbientSoundReturn {
  isPlaying: boolean;
  toggle: () => void;
  canPlay: boolean;
}

export function useAmbientSound(src: string): UseAmbientSoundReturn {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [canPlay, setCanPlay] = useState(false);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.35;

    audio.addEventListener('canplaythrough', () => setCanPlay(true));
    audio.addEventListener('error', () => setCanPlay(false));

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [src]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay policy blocked — silently fail
        setIsPlaying(false);
      });
    }
  }, [isPlaying]);

  return { isPlaying, toggle, canPlay };
}
