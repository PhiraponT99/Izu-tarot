/**
 * RevealModal.tsx
 * Modal that reveals the three selected tarot cards one-by-one with 800ms delay.
 *
 * Features:
 * - Staggered card reveal animation (flip from face-down to face-up)
 * - Card name, keywords, and reading interpretation displayed per card
 * - Izu Mode shows gentle reflection text instead of standard description
 * - Close button with backdrop click support
 * - Framer Motion AnimatePresence for enter/exit transitions
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AskIzuPanel from './ask-izu/AskIzuPanel';
import CardArtwork from './CardArtwork';
import IzuReflectionBubble from './IzuReflectionBubble';
import { createReadingStoryImage } from '../utils/createReadingStoryImage';
import { downloadStoryImage } from '../utils/downloadStoryImage';
import { getIzuThreeCardReflection } from '../utils/izuThreeCardReflection';

/**
 * Feature flag: Ask Izu is disabled in production while OpenAI billing is inactive.
 * To re-enable Ask Izu, set VITE_ASK_IZU_ENABLED=true in your .env / Vercel env vars.
 */
const ASK_IZU_ENABLED = import.meta.env.VITE_ASK_IZU_ENABLED === 'true';
import type { TarotCardData, Language } from '../../shared/tarotData';

interface RevealModalProps {
  isOpen: boolean;
  selectedCards: TarotCardData[];
  onClose: () => void;
  izuMode: boolean;
  language: Language;
}

// Symbols for each card position in a 3-card spread
const POSITION_LABELS: Record<Language, string[]> = {
  en: ['Past', 'Present', 'Future'],
  th: ['อดีต', 'ปัจจุบัน', 'อนาคต'],
};
const POSITION_COLORS = [
  'from-indigo-deep to-purple-mystic',
  'from-purple-mystic to-purple-light',
  'from-gold-dark to-gold',
];

/** Animated card face revealed in the modal */
const RevealedCard: React.FC<{
  card: TarotCardData;
  position: number;
  isVisible: boolean;
  izuMode: boolean;
  language: Language;
}> = ({ card, position, isVisible, izuMode, language }) => {
  return (
    <motion.div
      initial={false}
      animate={{
        opacity: isVisible ? 1 : 0,
        rotateY: isVisible ? 0 : -90,
        scale: isVisible ? 1 : 0.8,
      }}
      transition={{
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1],
        rotateY: { duration: 0.6 },
      }}
      aria-hidden={!isVisible}
      className="flex w-full max-w-[160px] flex-col items-center gap-3"
      style={{ perspective: 1000, pointerEvents: isVisible ? 'auto' : 'none' }}
    >
      {/* Position label */}
      <span
            className={[
              'font-pixel text-xs tracking-widest uppercase px-3 py-1 rounded-md',
              `bg-gradient-to-r ${POSITION_COLORS[position]}`,
              position === 2 ? 'text-navy font-bold' : 'text-white font-bold',
            ].join(' ')}
          >
            {POSITION_LABELS[language][position]}
      </span>

      {/* Card face */}
      <div
        className={[
          'relative aspect-[2/3] w-[clamp(108px,18vw,144px)] overflow-hidden rounded-md border',
          'box-border bg-gradient-to-br from-indigo-deep via-purple-mystic to-navy',
          position === 2
            ? 'border-izu-gold/80 shadow-[0_0_25px_rgba(251,191,36,0.45),0_8px_32px_rgba(0,0,0,0.5)]'
            : 'border-izu-purple-soft/60 shadow-[0_0_20px_rgba(124,58,237,0.45),0_8px_32px_rgba(0,0,0,0.5)]',
        ].join(' ')}
      >
        <CardArtwork card={card} />
      </div>

      {/* Keywords */}
      <motion.div
            initial={false}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ delay: isVisible ? 0.5 : 0 }}
            className="flex flex-wrap justify-center gap-1"
          >
            {card.keywords[language].map((kw) => (
              <span
                key={kw}
                className="text-[10px] font-pixel px-2 py-0.5 rounded-md bg-izu-purple/20 text-izu-purple-soft border border-izu-purple-soft/20"
              >
                {kw}
              </span>
            ))}
      </motion.div>

      {/* Reading text */}
      <motion.p
            initial={false}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 6 }}
            transition={{ delay: isVisible ? 0.6 : 0 }}
            className="text-center max-w-[140px] leading-relaxed font-body text-xs text-izu-text/90"
          >
            {izuMode ? card.izuReflection[language] : card.description[language]}
      </motion.p>
    </motion.div>
  );
};

const RevealModal: React.FC<RevealModalProps> = ({
  isOpen,
  selectedCards,
  onClose,
  izuMode,
  language,
}) => {
  // Track how many cards have been revealed (0 → 3)
  const [revealedCount, setRevealedCount] = useState(0);
  const [isCreatingStory, setIsCreatingStory] = useState(false);
  const [storyError, setStoryError] = useState<string | null>(null);
  const [isStorySaved, setIsStorySaved] = useState(false);

  // Stagger card reveals with 800ms delay each
  useEffect(() => {
    if (!isOpen) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    selectedCards.forEach((_, i) => {
      const t = setTimeout(() => {
        setRevealedCount((prev) => Math.max(prev, i + 1));
      }, i * 850 + 400); // stagger: 400ms, 1250ms, 2100ms
      timers.push(t);
    });

    return () => timers.forEach(clearTimeout);
  }, [isOpen, selectedCards]);

  const handleClose = () => {
    setRevealedCount(0);
    setStoryError(null);
    setIsStorySaved(false);
    onClose();
  };

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const modalTitle = izuMode
    ? language === 'th' ? '✦ ข้อความสะท้อนใจ ✦' : '✦ Your Reflection ✦'
    : language === 'th' ? '✦ ข้อความจากไพ่ ✦' : '✦ Your Reading ✦';

  const modalSubtitle = izuMode
    ? language === 'th'
      ? 'พื้นที่อ่อนโยนให้คุณได้มองกลับเข้ามาข้างใน'
      : "A gentle mirror for your soul's journey"
    : language === 'th'
      ? 'ลองมองอดีต ปัจจุบัน และสิ่งที่อาจค่อย ๆ คลี่คลายต่อไป'
      : 'The cards have spoken — past, present, and future';

  const threeCardReflection = getIzuThreeCardReflection(selectedCards, language);

  const handleSaveStoryImage = async () => {
    setIsCreatingStory(true);
    setStoryError(null);
    setIsStorySaved(false);

    try {
      const blob = await createReadingStoryImage({
        cards: selectedCards,
        reflection: threeCardReflection,
        language,
      });
      downloadStoryImage(blob);
      setIsStorySaved(true);
    } catch (error) {
      console.error('Unable to create story image', error);
      setStoryError(
        language === 'th'
          ? 'ไม่สามารถสร้างรูปได้ในขณะนี้ กรุณาลองอีกครั้ง'
          : 'Could not create the story image. Please try again.',
      );
    } finally {
      setIsCreatingStory(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
          style={{ backgroundColor: 'rgba(8, 14, 26, 0.85)' }}
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-label="Tarot Reading Reveal"
        >
          <motion.div
            key="modal-content"
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="hide-scrollbar relative max-h-[calc(100dvh-1rem)] w-full max-w-3xl overflow-y-auto rounded-lg sm:max-h-[90vh]"
            style={{
              background: 'var(--izu-panel)',
              border: `2px solid ${izuMode ? 'var(--izu-purple-soft)' : 'var(--izu-gold)'}`,
              boxShadow: izuMode
                ? 'inset 0 0 15px rgba(124,58,237,0.2), 0 0 50px rgba(124,58,237,0.35), 0 25px 80px rgba(0,0,0,0.7)'
                : 'inset 0 0 15px rgba(251,191,36,0.15), 0 0 50px rgba(251,191,36,0.3), 0 25px 80px rgba(0,0,0,0.7)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="relative px-4 pb-3 pt-6 text-center sm:px-8 sm:pb-4 sm:pt-8">
              {/* Top decorative line */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(251,191,36,0.6), transparent)',
                }}
              />

              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={[
                  'font-pixel text-xl md:text-2xl mb-1',
                  izuMode ? 'text-izu-purple-soft text-glow-purple' : 'text-izu-gold text-glow-gold',
                ].join(' ')}
              >
                {modalTitle}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="font-body text-xs text-izu-muted/70"
              >
                {modalSubtitle}
              </motion.p>
            </div>

            {/* Cards row */}
            <div className="flex flex-col items-center justify-center gap-6 px-4 pb-6 pt-3 sm:flex-row sm:items-start sm:gap-6 sm:px-6 sm:pt-4">
              {selectedCards.map((card, i) => (
                <RevealedCard
                  key={card.id}
                  card={card}
                  position={i}
                  isVisible={revealedCount > i}
                  izuMode={izuMode}
                  language={language}
                />
              ))}
            </div>

            {/* Full reading revealed message */}
            <AnimatePresence>
              {revealedCount >= 3 && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="px-4 pb-4 sm:px-8"
                  >
                    <div
                      className="h-px mb-4"
                      style={{
                        background:
                          'linear-gradient(90deg, transparent, rgba(167,139,250,0.3), transparent)',
                      }}
                    />
                    <IzuReflectionBubble reflection={threeCardReflection} />
                  </motion.div>

                  {ASK_IZU_ENABLED && (
                    <AskIzuPanel
                      cards={selectedCards}
                      language={language}
                      izuMode={izuMode}
                    />
                  )}
                </>
              )}
            </AnimatePresence>

            {/* Story download and close actions */}
            <div className="sticky bottom-0 z-20 flex flex-col items-center gap-3 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent px-4 pb-5 pt-8 sm:pb-8">
              <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
                {revealedCount >= 3 && (
                  <button
                    id="save-story-image-btn"
                    type="button"
                    onClick={handleSaveStoryImage}
                    disabled={isCreatingStory}
                    className={[
                      'w-full max-w-xs rounded-md px-8 py-3 sm:w-auto',
                      'font-pixel text-xs uppercase tracking-widest',
                      'focus:outline-none focus-visible:ring-2',
                      'disabled:cursor-wait disabled:opacity-60',
                      'pixel-btn-gold focus-visible:ring-izu-gold-soft',
                    ].join(' ')}
                  >
                    {isCreatingStory
                      ? (language === 'th' ? 'กำลังเตรียม...' : 'Preparing...')
                      : (language === 'th' ? 'บันทึกภาพสำหรับสตอรี่' : 'Save Story Image')}
                  </button>
                )}

                <button
                  id="modal-close-btn"
                  type="button"
                  onClick={handleClose}
                  className={[
                    'w-full max-w-xs rounded-md px-8 py-3 font-pixel text-xs uppercase tracking-widest sm:w-auto',
                    'focus:outline-none focus-visible:ring-2',
                    izuMode
                      ? 'pixel-btn-purple focus-visible:ring-izu-purple-soft'
                      : 'pixel-btn-gold focus-visible:ring-izu-gold-soft',
                  ].join(' ')}
                >
                  {language === 'th' ? 'ปิด' : 'Close'}
                </button>
              </div>

              {storyError && (
                <p role="alert" className="text-center font-inter text-xs text-rose-300">
                  {storyError}
                </p>
              )}

              <AnimatePresence>
                {isStorySaved && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    role="status"
                    aria-live="polite"
                    className="max-w-sm rounded-xl border border-gold/20 bg-slate-950/90 px-4 py-3 text-center font-inter text-xs leading-relaxed text-slate-200 shadow-[0_0_20px_rgba(251,191,36,0.08)]"
                  >
                    <p className="font-medium text-gold-light">
                      {language === 'th'
                        ? '✨ บันทึกภาพเรียบร้อยแล้ว'
                        : '✨ Story image saved successfully.'}
                    </p>
                    <p className="mt-2 whitespace-pre-line text-slate-300/90">
                      {language === 'th'
                        ? 'เปิด Instagram → Story → Recent\nเพื่อแชร์ผลการอ่านของคุณได้เลย'
                        : 'Open Instagram → Story → Recent\nto share your reflection.'}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RevealModal;
