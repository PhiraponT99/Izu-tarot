/**
 * App.tsx
 * Root application component for Izu Tarot.
 *
 * Layout model:
 * - The outermost div fills the full viewport (min-h-screen).
 * - The <header> is positioned absolutely so it never consumes vertical flow.
 * - <main> fills all remaining height and centers its content both axes,
 *   so the tarot board is always the visual focus of the page.
 * - A thin <footer> sits at the very bottom via absolute positioning.
 *
 * Manages:
 * - Card selection state (max 3)
 * - Modal open/close
 * - Ambient sound toggle (requires /public/ambient.mp3)
 * - Izu Mode toggle
 * - Background effects (starfield + particles)
 */

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TarotBoard from './components/TarotBoard';
import RevealModal from './components/RevealModal';
import Particles from './components/Particles';
import { useAmbientSound } from './hooks/useAmbientSound';
import { MAJOR_ARCANA } from './data/tarotData';

// Maximum selectable cards
const MAX_SELECTION = 3;

const App: React.FC = () => {
  // --- State ---
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [izuMode, setIzuMode] = useState(false);

  // Ambient sound — only plays on explicit user interaction (no autoplay).
  // TODO: Place your ambient audio file at /public/ambient.mp3 to enable sound.
  //       The button renders but stays silent until the file is present.
  const { isPlaying, toggle: toggleSound, canPlay } = useAmbientSound('/ambient.mp3');

  // --- Handlers ---

  /** Toggle card selection. Max 3; tap again to deselect. */
  const handleCardClick = useCallback((id: number) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((cid) => cid !== id);
      if (prev.length >= MAX_SELECTION) return prev;
      return [...prev, id];
    });
  }, []);

  const handleReveal = useCallback(() => setIsModalOpen(true), []);

  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);

  /** Reset all selections to begin a new reading. */
  const handleReset = useCallback(() => {
    setSelectedIds([]);
    setIsModalOpen(false);
  }, []);

  // Derive ordered selected card data
  const selectedCards = selectedIds
    .map((id) => MAJOR_ARCANA.find((c) => c.id === id))
    .filter(Boolean) as typeof MAJOR_ARCANA;

  // --- Render ---
  return (
    <div
      className={[
        // Fill full viewport; position context for the absolute header/footer
        'relative w-full min-h-screen overflow-hidden',
        izuMode ? 'izu-mode-active' : '',
      ].join(' ')}
      style={{
        background: 'radial-gradient(ellipse at 50% 45%, #1E1B4B 0%, #0F172A 55%, #080E1A 100%)',
      }}
    >
      {/* ── Fixed background layers (below all content) ── */}
      <div className="starfield" aria-hidden="true" />
      <Particles />

      {/* Soft radial centre glow that follows the accent colour */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: izuMode
            ? 'radial-gradient(ellipse at 50% 55%, rgba(124,58,237,0.09) 0%, transparent 65%)'
            : 'radial-gradient(ellipse at 50% 55%, rgba(251,191,36,0.06) 0%, transparent 65%)',
          transition: 'background 0.6s ease',
        }}
      />

      {/* ── Header — absolute so it never pushes content down ── */}
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 sm:px-8 pt-5 pb-3">
        {/* Logo */}
        <div className="flex flex-col">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={[
              'font-cinzel text-xl sm:text-2xl tracking-widest',
              izuMode ? 'text-purple-glow text-glow-purple' : 'text-gold text-glow-gold',
            ].join(' ')}
          >
            IZU TAROT
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-cormorant italic text-xs text-purple-light/50 tracking-wider"
          >
            A mystical reading experience
          </motion.p>
        </div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex items-center gap-3"
        >
          {/* Izu Mode toggle */}
          <button
            id="izu-mode-btn"
            onClick={() => setIzuMode((v) => !v)}
            aria-pressed={izuMode}
            title={izuMode ? 'Disable Izu Mode' : 'Enable Izu Mode'}
            className={[
              'flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-inter',
              'border transition-all duration-300 focus:outline-none focus-visible:ring-2',
              izuMode
                ? 'bg-purple-mystic/20 border-purple-light/50 text-purple-light focus-visible:ring-purple-light'
                : 'bg-white/5 border-white/15 text-white/50 hover:text-purple-light hover:border-purple-light/30 focus-visible:ring-purple-light',
            ].join(' ')}
          >
            <span className="text-base" aria-hidden="true">✦</span>
            <span className="hidden sm:inline">Izu Mode</span>
            {/* Toggle pill */}
            <span
              className={[
                'inline-flex w-7 h-4 rounded-full transition-all duration-300 relative flex-shrink-0',
                izuMode ? 'bg-purple-mystic' : 'bg-white/15',
              ].join(' ')}
              aria-hidden="true"
            >
              <span
                className={[
                  'absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all duration-300',
                  izuMode ? 'left-[14px]' : 'left-0.5',
                ].join(' ')}
              />
            </span>
          </button>

          {/* Ambient sound toggle
              Only plays after explicit user click — no autoplay.
              Shown dimmed with a tooltip when no audio file is found. */}
          <button
            id="sound-toggle-btn"
            onClick={toggleSound}
            aria-label={isPlaying ? 'Mute ambient sound' : 'Play ambient sound'}
            title={
              canPlay
                ? isPlaying ? 'Mute ambient sound' : 'Play ambient sound'
                : 'Place ambient.mp3 in /public to enable sound'
            }
            className={[
              'flex items-center justify-center w-9 h-9 rounded-full',
              'border transition-all duration-300 focus:outline-none focus-visible:ring-2',
              isPlaying
                ? 'bg-gold/10 border-gold/40 text-gold focus-visible:ring-gold'
                : canPlay
                ? 'bg-white/5 border-white/15 text-white/40 hover:text-gold/60 hover:border-gold/20 focus-visible:ring-gold'
                : 'bg-white/3 border-white/8 text-white/20 cursor-default focus-visible:ring-white/20',
            ].join(' ')}
          >
            <span className="text-base" aria-hidden="true">
              {isPlaying ? '🔊' : canPlay ? '🔇' : '🔕'}
            </span>
          </button>
        </motion.div>
      </header>

      {/* ── Main — fills viewport, centres the board both axes ── */}
      <main
        className="relative z-10 flex min-h-screen flex-col items-center justify-center"
        style={{
          // paddingTop clears the absolute header (~72px).
          // paddingBottom is set larger so flex justify-center treats the
          // usable zone as header-to-footer, shifting the board downward
          // to feel like cards resting on the centre of the page.
          paddingTop: '72px',
          paddingBottom: '112px',
        }}
      >
        <TarotBoard
          cards={MAJOR_ARCANA}
          selectedIds={selectedIds}
          onCardClick={handleCardClick}
          onReveal={handleReveal}
          onReset={handleReset}
          izuMode={izuMode}
        />
      </main>

      {/* ── Footer — absolute at bottom, purely decorative ── */}
      <footer className="absolute bottom-0 left-0 right-0 z-10 text-center py-3 pointer-events-none">
        <p className="font-inter text-xs text-white/18 tracking-wider">
          IZU TAROT · MAJOR ARCANA · {new Date().getFullYear()}
        </p>
      </footer>

      {/* ── Reveal Modal ── */}
      <RevealModal
        isOpen={isModalOpen}
        selectedCards={selectedCards}
        onClose={handleCloseModal}
        izuMode={izuMode}
      />
    </div>
  );
};

export default App;
