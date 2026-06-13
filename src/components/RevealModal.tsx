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
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, rotateY: -90, scale: 0.8 }}
          animate={{ opacity: 1, rotateY: 0, scale: 1 }}
          transition={{
            duration: 0.7,
            ease: [0.4, 0, 0.2, 1],
            rotateY: { duration: 0.6 },
          }}
          className="flex flex-col items-center gap-3"
          style={{ perspective: 1000 }}
        >
          {/* Position label */}
          <span
            className={[
              'font-cinzel text-xs tracking-widest uppercase px-3 py-1 rounded-full',
              `bg-gradient-to-r ${POSITION_COLORS[position]}`,
              position === 2 ? 'text-navy' : 'text-white',
            ].join(' ')}
          >
            {POSITION_LABELS[language][position]}
          </span>

          {/* Card face */}
          <div
            className="relative rounded-xl overflow-hidden"
            style={{
              width: 120,
              height: 200,
              background:
                'linear-gradient(160deg, #1E1B4B 0%, #312E81 40%, #1E1B4B 100%)',
              border: position === 2
                ? '2px solid rgba(251,191,36,0.7)'
                : '2px solid rgba(167,139,250,0.5)',
              boxShadow:
                position === 2
                  ? '0 0 25px rgba(251,191,36,0.4), 0 8px 32px rgba(0,0,0,0.5)'
                  : '0 0 20px rgba(124,58,237,0.4), 0 8px 32px rgba(0,0,0,0.5)',
            }}
          >
            <CardArtwork card={card} />
          </div>

          {/* Keywords */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-1"
          >
            {card.keywords[language].map((kw) => (
              <span
                key={kw}
                className="text-xs font-inter px-2 py-0.5 rounded-full bg-purple-mystic/20 text-purple-light border border-purple-light/20"
              >
                {kw}
              </span>
            ))}
          </motion.div>

          {/* Reading text */}
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className={[
              'text-center max-w-[140px] leading-relaxed',
              izuMode
                ? 'font-cormorant italic text-sm text-purple-glow/90'
                : 'font-inter text-xs text-slate-300/80',
            ].join(' ')}
          >
            {izuMode ? card.izuReflection[language] : card.description[language]}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
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

  const fullReadingText = izuMode
    ? language === 'th'
      ? 'คุณไม่จำเป็นต้องหาคำตอบทั้งหมดในวันนี้ แค่หายใจลึก ๆ และไว้ใจก้าวเล็ก ๆ ถัดไปก็พอ'
      : "You don't need to figure it all out today. Just breathe, and trust the next small step."
    : language === 'th'
      ? 'เก็บเฉพาะข้อความที่ตรงกับใจไว้ แล้วค่อย ๆ ก้าวต่อไปในจังหวะของคุณ'
      : 'The universe has revealed what lies in your path. Walk forward with courage and clarity.';

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
            className="relative max-h-[calc(100dvh-1rem)] w-full max-w-3xl overflow-y-auto rounded-2xl sm:max-h-[90vh]"
            style={{
              background:
                'linear-gradient(145deg, rgba(30,27,75,0.95) 0%, rgba(15,23,42,0.98) 100%)',
              border: '1px solid rgba(167,139,250,0.25)',
              boxShadow:
                '0 0 60px rgba(124,58,237,0.3), 0 25px 80px rgba(0,0,0,0.7)',
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
                  'font-cinzel text-xl md:text-2xl mb-1',
                  izuMode ? 'text-purple-glow text-glow-purple' : 'text-gold text-glow-gold',
                ].join(' ')}
              >
                {modalTitle}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="font-cormorant italic text-purple-light/60 text-sm"
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
                    className="px-4 pb-4 text-center sm:px-8"
                  >
                    <div
                      className="h-px mb-4"
                      style={{
                        background:
                          'linear-gradient(90deg, transparent, rgba(167,139,250,0.3), transparent)',
                      }}
                    />
                    <p
                      className={[
                        'font-cormorant italic text-base leading-relaxed',
                        izuMode ? 'text-purple-light/70' : 'text-slate-400',
                      ].join(' ')}
                    >
                      {fullReadingText}
                    </p>
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

            {/* Close button */}
            <div className="sticky bottom-0 z-20 flex justify-center bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent px-4 pb-5 pt-8 sm:pb-8">
              <button
                id="modal-close-btn"
                onClick={handleClose}
                className={[
                  'font-cinzel text-xs tracking-widest uppercase px-8 py-3 rounded-full',
                  'transition-all duration-300 focus:outline-none focus-visible:ring-2',
                  izuMode
                    ? 'border border-purple-light/30 text-purple-light/60 hover:text-purple-light hover:border-purple-light/60 hover:bg-purple-mystic/10 focus-visible:ring-purple-light'
                    : 'border border-gold/30 text-gold/60 hover:text-gold hover:border-gold/60 hover:bg-gold/5 focus-visible:ring-gold',
                ].join(' ')}
              >
                {language === 'th' ? 'ปิด' : 'Close'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RevealModal;
