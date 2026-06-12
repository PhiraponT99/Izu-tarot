/**
 * Particles.tsx
 * CSS-only ambient particle system for the mystical background.
 * Particles float upward with random sizes, positions, speeds, and colors.
 */

import React from 'react';

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

const seededValue = (index: number, salt: number) => {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
};

const PARTICLES: ParticleConfig[] = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  left: `${seededValue(i, 1) * 100}%`,
  size: seededValue(i, 2) * 4 + 1,
  duration: seededValue(i, 3) * 12 + 8,
  delay: seededValue(i, 4) * 10,
  color: PARTICLE_COLORS[Math.floor(seededValue(i, 5) * PARTICLE_COLORS.length)],
  opacity: seededValue(i, 6) * 0.5 + 0.2,
}));

const Particles: React.FC = () => {

  return (
    <div className="particles-container" aria-hidden="true">
      {PARTICLES.map((p) => (
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
