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
import SelectedCardsTray from './SelectedCardsTray';
import type { TarotCardData, Language } from '../../shared/tarotData';

interface TarotBoardProps {
  cards: TarotCardData[];
  selectedIds: Array<number | null>;
  onCardClick: (id: number) => void;
  onDeselectSlot: (slotIndex: number) => void;
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
    0: 'ค่อย ๆ เลือกไพ่ 3 ใบที่ดึงดูดความรู้สึกของคุณ…',
    1: 'ได้แล้วหนึ่งใบ ลองฟังใจแล้วเลือกอีกสองใบ…',
    2: 'เหลืออีกหนึ่งใบ เลือกใบที่เรียกหาคุณ…',
    3: 'ไพ่ทั้งสามใบพร้อมแล้ว',
  }
};

// ─── Component ──────────────────────────────────────────────────────────────

const TarotBoard: React.FC<TarotBoardProps> = ({
  cards,
  selectedIds,
  onCardClick,
  onDeselectSlot,
  onReveal,
  onReset,
  izuMode,
  language,
}) => {
  const fanPositions = useMemo(() => computeFan(cards.length), [cards.length]);
  const selectedCards = selectedIds.map((id) =>
    id === null ? null : cards.find((card) => card.id === id) ?? null,
  );
  const selectedCount = selectedCards.filter((card): card is TarotCardData => Boolean(card)).length;
  const selectionFull = selectedCards.every((card) => card !== null);

  // Localized taglines
  const tagline = izuMode
    ? language === 'th'
      ? 'พื้นที่เงียบ ๆ ให้คุณได้พักและกลับมาฟังเสียงข้างใน'
      : 'A quiet space to pause and listen to yourself.'
    : language === 'th'
      ? 'ไพ่กำลังรออยู่ สามใบจะสะท้อนความรู้สึกในใจคุณ'
      : 'The cards await. Three will speak your truth.';

  return (
    /*
     * Outer flex column — tightly grouped so the whole composition is
     * centred as a unit inside the justify-center <main>.
     * gap-5 on desktop / gap-3 on mobile gives breathing room without
     * pushing the fan too far from the surrounding text.
     */
    <div className="flex w-full flex-col items-center gap-4 sm:gap-5">

      {/* ── Subtitle / mode tagline ── */}
      <motion.p
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className={[
          'font-body text-base text-center px-4',
          izuMode ? 'text-izu-purple-soft/70' : 'text-izu-muted/50',
        ].join(' ')}
      >
        {tagline}
      </motion.p>

      {/* ── Selection status line ── */}
      <AnimatePresence mode="wait">
        <motion.p
          key={selectedCount}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.35 }}
          className={[
            'min-h-[1.75rem] px-4 text-center font-body text-base sm:text-lg',
            izuMode ? 'text-izu-purple-soft text-glow-purple' : 'text-izu-muted/80',
          ].join(' ')}
        >
          {STATUS[language][selectedCount] ?? ''}
        </motion.p>
      </AnimatePresence>

      {/* Spacer to prevent selected cards from overlapping instruction text */}
      <div className="h-8 flex-shrink-0 sm:h-12" aria-hidden="true" />

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
          const selOrder = selectedIds.findIndex((id) => id === card.id);
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
              zIndex={i}
            />
          );
        })}
      </div>

      <div className="-mt-6 sm:-mt-16">
        <SelectedCardsTray
          selectedCards={selectedCards}
          onDeselect={onDeselectSlot}
          izuMode={izuMode}
          language={language}
        />
      </div>

      {/* ── Action area (reveal + reset) ── */}
      <AnimatePresence>
        {selectionFull && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 16 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            className="flex w-full flex-col items-center gap-3 px-4"
          >
            {/* Primary CTA */}
            <button
              id="reveal-btn"
              onClick={onReveal}
              className={[
                'relative w-full max-w-[300px] sm:max-w-sm rounded-md px-4 py-2.5 sm:px-10 sm:py-4 font-pixel text-[11px] sm:text-sm uppercase tracking-widest mt-8 sm:mt-0 mx-auto',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                izuMode
                  ? 'pixel-btn-purple focus-visible:ring-izu-purple-soft'
                  : 'pixel-btn-gold focus-visible:ring-izu-gold-soft',
              ].join(' ')}
            >
              {/* Shimmer sweep */}
              <span
                className={[
                  'absolute inset-0 rounded-md opacity-25 pointer-events-none',
                  izuMode ? 'shimmer-purple' : 'shimmer-gold',
                ].join(' ')}
                aria-hidden="true"
              />
              <span className="relative z-10 font-bold">
                {izuMode
                  ? language === 'th' ? '✦ รับข้อความสะท้อนใจ ✦' : '✦ Receive Your Reflection ✦'
                  : language === 'th' ? '✦ เปิดข้อความจากไพ่ ✦' : '✦ Reveal My Reading ✦'}
              </span>
            </button>

            {/* Secondary: start over */}
            <button
              id="reset-btn"
              onClick={onReset}
              className="font-pixel text-xs text-white/30 hover:text-white/60 tracking-widest uppercase transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30 rounded"
            >
              {language === 'th' ? '↺ เลือกไพ่ใหม่' : '↺ Start Over'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TarotBoard;
