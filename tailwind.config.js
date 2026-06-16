/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0F172A',
          light: '#1E293B',
          dark: '#080E1A',
        },
        indigo: {
          deep: '#312E81',
          mid: '#4338CA',
        },
        purple: {
          mystic: '#7C3AED',
          light: '#A78BFA',
          glow: '#C4B5FD',
        },
        gold: {
          DEFAULT: '#FBBF24',
          light: '#FDE68A',
          dark: '#D97706',
        },
        izu: {
          bg: 'var(--izu-bg)',
          panel: 'var(--izu-panel)',
          'panel-soft': 'var(--izu-panel-soft)',
          indigo: 'var(--izu-indigo)',
          purple: 'var(--izu-purple)',
          'purple-soft': 'var(--izu-purple-soft)',
          gold: 'var(--izu-gold)',
          'gold-soft': 'var(--izu-gold-soft)',
          cream: 'var(--izu-cream)',
          text: 'var(--izu-text)',
          muted: 'var(--izu-muted)',
        },
      },
      fontFamily: {
        cinzel: ['"Cinzel Decorative"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        inter: ['Inter', 'sans-serif'],
        pixel: ['var(--font-pixel-en)', 'monospace'],
        thai: ['var(--font-thai)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'particle': 'particle 8s linear infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(251,191,36,0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(251,191,36,0.9), 0 0 70px rgba(251,191,36,0.4)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        particle: {
          '0%': { transform: 'translateY(100vh) scale(0)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-10vh) scale(1)', opacity: '0' },
        },
      },
      backgroundImage: {
        'radial-mystic': 'radial-gradient(ellipse at center, #1E1B4B 0%, #0F172A 60%, #080E1A 100%)',
        'card-gradient': 'linear-gradient(135deg, #312E81 0%, #1E1B4B 50%, #0F172A 100%)',
      },
    },
  },
  plugins: [],
}
