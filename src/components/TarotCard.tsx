/**
 * TarotCard.tsx
 * Individual tarot card component displayed in the fan.
 *
 * Positioning: Cards are placed at the center of the fan container, then
 * translated and rotated via CSS transform to their arc position.
 * This uses transformOrigin: 'center bottom' on an outer wrapper so that
 * rotating the card fans it outward from the pivot at the container center.
 */

import React from 'react';
import { motion } from 'framer-motion';
import type { TarotCardData } from '../../shared/tarotData';

const CARD_W = 68;
const CARD_H = 102;

interface TarotCardProps {
  card: TarotCardData;
  /** Rotation angle in degrees (position in the fan arc) */
  rotate: number;
  /** Upward offset in px from the arc baseline (Y-axis adjustment per card to create the arc curve) */
  translateY: number;
  isSelected: boolean;
  selectionOrder: number | null;
  isDisabled: boolean;
  onClick: (id: number) => void;
  zIndex: number;
}

const TarotCard: React.FC<TarotCardProps> = ({
  card,
  rotate,
  translateY,
  isSelected,
  selectionOrder,
  isDisabled,
  onClick,
  zIndex,
}) => {
  return (
    // Outer wrapper: positions card absolutely at center of fan container
    // then applies fan rotation about the bottom-center pivot
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        // Centre the card horizontally on the pivot
        marginLeft: -CARD_W / 2,
        width: CARD_W,
        // The visual distance from pivot to card center
        height: CARD_H,
        // Rotate around the bottom-center point to fan the cards
        transformOrigin: 'center bottom',
        transform: `rotate(${rotate}deg) translateY(${translateY}px)`,
        zIndex,
        pointerEvents: isSelected ? 'none' : 'auto',
      }}
    >
      {/* Selected fan cards stay in place as inert ghost placeholders. */}
      <motion.div
        style={{ width: '100%', height: '100%', position: 'relative' }}
        animate={{
          opacity: isSelected ? 0.2 : 1,
          scale: isSelected ? 0.96 : 1,
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 22 }}
        whileHover={
          !isDisabled && !isSelected
            ? {
                y: -10,
                scale: 1.1,
                transition: { duration: 0.15 },
              }
            : {}
        }
        whileTap={!isDisabled && !isSelected ? { scale: 0.97 } : {}}
      >
        <button
          onClick={() => !isDisabled && !isSelected && onClick(card.id)}
          disabled={isDisabled || isSelected}
          aria-label={`Tarot card ${card.id + 1}${isSelected ? `, selected placeholder for card ${selectionOrder}` : ''}`}
          aria-pressed={isSelected}
          className={[
            'relative h-full w-full overflow-hidden rounded-[10px] border border-gold/70 bg-gradient-to-br from-indigo-deep via-purple-mystic to-navy p-0',
            'box-border shadow-[0_4px_14px_rgba(0,0,0,0.45),0_0_10px_rgba(251,191,36,0.22)]',
            'transition-shadow duration-200 hover:shadow-[0_6px_18px_rgba(0,0,0,0.5),0_0_18px_rgba(251,191,36,0.5)] focus:outline-none',
            isDisabled || isSelected ? 'cursor-default' : 'cursor-pointer',
          ].join(' ')}
        >
          <img
            src="/cards/v2/CardBack-CelestialMoon.webp"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 block h-full w-full object-contain pointer-events-none"
          />
        </button>
      </motion.div>
    </div>
  );
};

export default TarotCard;
