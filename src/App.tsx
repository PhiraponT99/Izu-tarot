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
import { AnimatePresence, motion } from 'framer-motion';
import TarotBoard from './components/TarotBoard';
import DailyTarotMode from './components/DailyTarotMode';
import ModeSelector from './components/ModeSelector';
import RevealModal from './components/RevealModal';
import Particles from './components/Particles';
import { useAmbientSound } from './hooks/useAmbientSound';
import { MAJOR_ARCANA } from './data/tarotData';
import type { Language } from './data/tarotData';
import type { ReadingMode } from './components/ModeSelector';

// Maximum selectable cards
const MAX_SELECTION = 3;

const App: React.FC = () => {
  // --- State ---
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [izuMode, setIzuMode] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [readingMode, setReadingMode] = useState<ReadingMode>('daily');

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

  const handleModeChange = useCallback((mode: ReadingMode) => {
    setReadingMode(mode);
    setIsModalOpen(false);
  }, []);

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
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-3 pt-4 pb-3 sm:px-8 sm:pt-5">
        {/* Logo */}
        <div className="flex flex-col">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={[
              'font-cinzel text-lg tracking-widest sm:text-2xl',
              izuMode ? 'text-purple-glow text-glow-purple' : 'text-gold text-glow-gold',
            ].join(' ')}
          >
            IZU TAROT
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="hidden font-cormorant text-xs italic tracking-wider text-purple-light/50 min-[430px]:block"
          >
            {language === 'th' ? 'พื้นที่เล็ก ๆ สำหรับฟังเสียงข้างใน' : 'A mystical reading experience'}
          </motion.p>
        </div>

        <div className="absolute left-1/2 top-[64px] -translate-x-1/2 min-[430px]:top-[72px] md:top-5">
          <ModeSelector mode={readingMode} onChange={handleModeChange} language={language} />
        </div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex items-center gap-2 sm:gap-3"
        >
          {/* Language toggle */}
          <button
            id="lang-toggle-btn"
            onClick={() => setLanguage((l) => (l === 'en' ? 'th' : 'en'))}
            aria-label={language === 'en' ? 'Switch to Thai' : 'Switch to English'}
            title={language === 'en' ? 'Switch to Thai' : 'Switch to English'}
            className={[
              'flex items-center gap-1 px-2 py-1.5 rounded-full text-xs font-inter border transition-all duration-300 focus:outline-none focus-visible:ring-2 sm:gap-1.5 sm:px-3',
              'bg-white/5 border-white/15 text-white/70 hover:text-gold hover:border-gold/40 focus-visible:ring-gold',
            ].join(' ')}
          >
            <span className={language === 'en' ? 'text-gold font-bold' : 'text-white/40'}>EN</span>
            <span className="text-white/20">|</span>
            <span className={language === 'th' ? 'text-gold font-bold' : 'text-white/40'}>TH</span>
          </button>

          {/* Izu Mode toggle */}
          <button
            id="izu-mode-btn"
            onClick={() => setIzuMode((v) => !v)}
            aria-pressed={izuMode}
            title={language === 'th' 
              ? (izuMode ? 'ปิดโหมดอิซุ' : 'เปิดโหมดอิซุ')
              : (izuMode ? 'Disable Izu Mode' : 'Enable Izu Mode')}
            className={[
              'flex items-center gap-1.5 px-2 py-1.5 rounded-full text-xs font-inter sm:gap-2 sm:px-3',
              'border transition-all duration-300 focus:outline-none focus-visible:ring-2',
              izuMode
                ? 'bg-purple-mystic/20 border-purple-light/50 text-purple-light focus-visible:ring-purple-light'
                : 'bg-white/5 border-white/15 text-white/50 hover:text-purple-light hover:border-purple-light/30 focus-visible:ring-purple-light',
            ].join(' ')}
          >
            <span className="text-base" aria-hidden="true">✦</span>
            <span className="hidden sm:inline">
              {language === 'th' ? 'โหมดอิซุ' : 'Izu Mode'}
            </span>
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
                aria-hidden="true"
              />
            </span>
          </button>

          {/* Ambient sound toggle
              Only plays after explicit user click — no autoplay.
              Shown dimmed with a tooltip when no audio file is found. */}
          <button
            id="sound-toggle-btn"
            onClick={toggleSound}
            disabled={!canPlay}
            aria-label={
              !canPlay
                ? language === 'th'
                  ? 'ยังไม่มีเสียงบรรยากาศ'
                  : 'Ambient sound unavailable'
                : language === 'th'
                ? (isPlaying ? 'ปิดเสียงบรรยากาศ' : 'เปิดเสียงบรรยากาศ')
                : (isPlaying ? 'Mute ambient sound' : 'Play ambient sound')
            }
            title={
              canPlay
                ? (language === 'th'
                  ? (isPlaying ? 'ปิดเสียงบรรยากาศ' : 'เปิดเสียงบรรยากาศ')
                  : (isPlaying ? 'Mute ambient sound' : 'Play ambient sound'))
                : (language === 'th'
                  ? 'เพิ่มไฟล์ ambient.mp3 ในโฟลเดอร์ public เพื่อเปิดเสียงบรรยากาศ'
                  : 'Place ambient.mp3 in /public to enable sound')
            }
            className={[
              'flex h-8 w-8 items-center justify-center rounded-full sm:h-9 sm:w-9',
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
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-2 pb-20 pt-[124px] min-[430px]:pt-[136px] md:pt-[104px]"
      >
        <AnimatePresence mode="wait">
          {readingMode === 'daily' ? (
            <DailyTarotMode
              key="daily"
              cards={MAJOR_ARCANA}
              izuMode={izuMode}
              language={language}
            />
          ) : (
            <motion.div
              key="three-card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <TarotBoard
                cards={MAJOR_ARCANA}
                selectedIds={selectedIds}
                onCardClick={handleCardClick}
                onReveal={handleReveal}
                onReset={handleReset}
                izuMode={izuMode}
                language={language}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ── Footer — absolute at bottom, purely decorative ── */}
      <footer className="absolute bottom-0 left-0 right-0 z-10 text-center py-3 pointer-events-none">
        <p className="font-inter text-[10px] text-white/15 tracking-[0.16em]">
          IZU TAROT · MAJOR ARCANA · {new Date().getFullYear()}
        </p>
      </footer>

      {/* ── Reveal Modal ── */}
      <RevealModal
        isOpen={isModalOpen}
        selectedCards={selectedCards}
        onClose={handleCloseModal}
        izuMode={izuMode}
        language={language}
      />
    </div>
  );
};

export default App;
