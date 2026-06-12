/**
 * Particles.tsx
 * CSS-only ambient particle system for the mystical background.
 * Particles float upward with random sizes, positions, speeds, and colors.
 */

import React, { useMemo } from 'react';

interface ParticleConfig {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  color: string;
  opacity: number;
}

const PARTICLE_COLORS = [
  'rgba(167, 139, 250, 0.7)',  // purple-light
  'rgba(196, 181, 253, 0.5)',  // purple-glow
  'rgba(251, 191, 36, 0.4)',   // gold
  'rgba(255, 255, 255, 0.3)',  // white
  'rgba(124, 58, 237, 0.5)',   // purple-mystic
];

const PARTICLE_COUNT = 25;

const Particles: React.FC = () => {
  const particles = useMemo<ParticleConfig[]>(() => {
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 10,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      opacity: Math.random() * 0.5 + 0.2,
    }));
  }, []);

  return (
    <div className="particles-container" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
};

export default Particles;
