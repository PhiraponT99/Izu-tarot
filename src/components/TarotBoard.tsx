/**
 * TarotBoard.tsx
 * The main card spread area: status text → fan → action buttons.
 *
 * Layout notes:
 * - The outer flex column is the only thing inside <main>, which is already
 *   justify-center, so this block sits in the true vertical centre.
 * - gap-4 keeps instruction text, fan, and button close together so the
 *   group reads as a single centred composition.
 * - The fan container height is clamped so it feels right on every screen
 *   without a fixed-pixel assumption. Cards extend above this div via
 *   `overflow: visible`; the div itself is just the pivot anchor.
 *
 * Fan layout:
 * - All 22 cards share the same bottom-centre anchor (50% / 100% of container).
 * - Each card is rotated around that pivot (transformOrigin: center bottom)
 *   then translated upward along its own rotated axis by `radius` px.
 * - This naturally produces a circular arc — no trig needed for x/y.
 */

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TarotCard from './TarotCard';
import type { TarotCardData, Language } from '../data/tarotData';

interface TarotBoardProps {
  cards: TarotCardData[];
  selectedIds: number[];
  onCardClick: (id: number) => void;
  onReveal: () => void;
  onReset: () => void;
  izuMode: boolean;
  language: Language;
}

interface FanPosition {
  /** Rotation of the card around the bottom-centre pivot (degrees) */
  rotate: number;
  /** Upward shift in the card's own rotated axis — defines arc radius */
  translateY: number;
}

/**
 * Compute the fan spread for N cards.
 *
 * @param count   - number of cards (22 for Major Arcana)
 * @param arcDeg  - total angular spread, e.g. 130° gives a half-circle feel
 * @param radius  - distance from pivot to card centre (px)
 */
function computeFan(count: number, arcDeg = 130, radius = 252): FanPosition[] {
  return Array.from({ length: count }, (_, i) => {
    // Normalise index to [-0.5 … +0.5] then scale to arc
    const t = count > 1 ? i / (count - 1) - 0.5 : 0;
    return { rotate: t * arcDeg, translateY: -radius };
  });
}

// ─── Status messages ────────────────────────────────────────────────────────

const STATUS: Record<Language, Record<number, string>> = {
  en: {
    0: 'Choose three cards that call to you…',
    1: 'One chosen. Two more await…',
    2: 'Almost there — choose your final card…',
    3: 'Your three cards are chosen.',
  },
  th: {
    0: 'เลือกไพ่ 3 ใบที่รู้สึกเชื่อมโยงกับคุณ…',
    1: 'เลือกแล้วหนึ่งใบ ยังคงเหลืออีกสองใบ…',
    2: 'ใกล้ครบแล้ว — เลือกไพ่ใบสุดท้ายของคุณ…',
    3: 'คุณเลือกไพ่ครบทั้งสามใบแล้ว',
  }
};

// ─── Component ──────────────────────────────────────────────────────────────

const TarotBoard: React.FC<TarotBoardProps> = ({
  cards,
  selectedIds,
  onCardClick,
  onReveal,
  onReset,
  izuMode,
  language,
}) => {
  const fanPositions = useMemo(() => computeFan(cards.length), [cards.length]);
  const selectionFull = selectedIds.length >= 3;

  // Localized taglines
  const tagline = izuMode
    ? language === 'th'
      ? 'พื้นที่อันเงียบสงบสำหรับหยุดพักและฟังเสียงตัวคุณเอง'
      : 'A quiet space to pause and listen to yourself.'
    : language === 'th'
      ? 'ไพ่ทาโรต์กำลังรอคอยคุณอยู่ สามใบนี้จะบอกความจริงในใจคุณ'
      : 'The cards await. Three will speak your truth.';

  return (
    /*
     * Outer flex column — tightly grouped so the whole composition is
     * centred as a unit inside the justify-center <main>.
     * gap-5 on desktop / gap-3 on mobile gives breathing room without
     * pushing the fan too far from the surrounding text.
     */
    <div className="flex flex-col items-center gap-5 w-full">

      {/* ── Subtitle / mode tagline ── */}
      <motion.p
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className={[
          'font-cormorant italic text-base text-center px-4',
          izuMode ? 'text-purple-glow/70' : 'text-purple-light/50',
        ].join(' ')}
      >
        {tagline}
      </motion.p>

      {/* ── Selection status line ── */}
      <AnimatePresence mode="wait">
        <motion.p
          key={selectedIds.length}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.35 }}
          className={[
            'font-cormorant text-lg italic text-center px-4 min-h-[1.75rem]',
            izuMode ? 'text-purple-glow text-glow-purple' : 'text-purple-light/80',
          ].join(' ')}
        >
          {STATUS[language][selectedIds.length] ?? ''}
        </motion.p>
      </AnimatePresence>

      {/* Spacer to prevent selected cards from overlapping instruction text */}
      <div className="h-12 flex-shrink-0" aria-hidden="true" />

      {/* ── Fan container ──
          Height is the pixel budget for the pivot zone at the bottom.
          The cards extend visually ABOVE this box (overflow: visible).
          On mobile the CSS `.fan-container` rule scales the whole thing down.
      */}
      <div
        className="fan-container relative flex-shrink-0"
        style={{
          width: '100%',
          maxWidth: 820,
          // The container only needs to be as tall as the pivot offset
          // from the bottom. Cards rise above it; nothing is clipped.
          height: 290,
          overflow: 'visible',
        }}
      >
        {cards.map((card, i) => {
          const { rotate, translateY } = fanPositions[i];
          const selOrder = selectedIds.indexOf(card.id);
          return (
            <TarotCard
              key={card.id}
              card={card}
              rotate={rotate}
              translateY={translateY}
              isSelected={selectedIds.includes(card.id)}
              selectionOrder={selOrder >= 0 ? selOrder + 1 : null}
              isDisabled={selectionFull && !selectedIds.includes(card.id)}
              onClick={onCardClick}
              izuMode={izuMode}
              zIndex={i}
            />
          );
        })}
      </div>

      {/* ── Action area (reveal + reset) ── */}
      <AnimatePresence>
        {selectionFull && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 16 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            className="flex flex-col items-center gap-3"
          >
            {/* Primary CTA */}
            <button
              id="reveal-btn"
              onClick={onReveal}
              className={[
                'relative px-10 py-4 rounded-full font-cinzel text-sm tracking-widest uppercase',
                'transition-all duration-300',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                izuMode
                  ? 'bg-gradient-to-r from-purple-mystic to-indigo-deep text-purple-glow border border-purple-light/40 focus-visible:ring-purple-light'
                  : 'bg-gradient-to-r from-gold-dark to-gold text-navy border border-gold/60 focus-visible:ring-gold',
              ].join(' ')}
              style={{
                boxShadow: izuMode
                  ? '0 0 30px rgba(124,58,237,0.5), 0 0 60px rgba(124,58,237,0.25)'
                  : '0 0 30px rgba(251,191,36,0.5), 0 0 60px rgba(251,191,36,0.25)',
              }}
            >
              {/* Shimmer sweep — CSS class avoids background/backgroundSize inline conflict */}
              <span
                className={[
                  'absolute inset-0 rounded-full opacity-40 pointer-events-none',
                  izuMode ? 'shimmer-purple' : 'shimmer-gold',
                ].join(' ')}
                aria-hidden="true"
              />
              <span className="relative z-10">
                {izuMode
                  ? language === 'th' ? '✦ เปิดคำสะท้อนของฉัน ✦' : '✦ Receive Your Reflection ✦'
                  : language === 'th' ? '✦ เปิดคำทำนายของฉัน ✦' : '✦ Reveal My Reading ✦'}
              </span>
            </button>

            {/* Secondary: start over */}
            <button
              id="reset-btn"
              onClick={onReset}
              className="font-inter text-xs text-white/30 hover:text-white/60 tracking-widest uppercase transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30 rounded"
            >
              {language === 'th' ? '↺ เริ่มต้นใหม่' : '↺ Start Over'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TarotBoard;
