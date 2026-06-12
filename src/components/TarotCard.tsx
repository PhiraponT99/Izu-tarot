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
const CARD_H = 112;

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

/** SVG Mandala ornament for the card back */
const MandalaSVG: React.FC = () => (
  <svg
    viewBox="0 0 80 80"
    width="52"
    height="52"
    aria-hidden="true"
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      opacity: 0.55,
      pointerEvents: 'none',
    }}
  >
    <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(251,191,36,0.3)" strokeWidth="0.6" />
    <circle cx="40" cy="40" r="27" fill="none" stroke="rgba(167,139,250,0.3)" strokeWidth="0.5" />
    <circle cx="40" cy="40" r="17" fill="none" stroke="rgba(251,191,36,0.2)" strokeWidth="0.5" />
    {Array.from({ length: 8 }, (_, i) => {
      const a = (i * 45 * Math.PI) / 180;
      return (
        <line
          key={i}
          x1={40 + 36 * Math.cos(a)} y1={40 + 36 * Math.sin(a)}
          x2={40 + 36 * Math.cos(a + Math.PI)} y2={40 + 36 * Math.sin(a + Math.PI)}
          stroke="rgba(251,191,36,0.12)" strokeWidth="0.4"
        />
      );
    })}
    {Array.from({ length: 6 }, (_, i) => {
      const a = (i * 60 * Math.PI) / 180;
      return (
        <circle
          key={i}
          cx={40 + 12 * Math.cos(a)}
          cy={40 + 12 * Math.sin(a)}
          r="5" fill="none"
          stroke="rgba(167,139,250,0.28)"
          strokeWidth="0.5"
        />
      );
    })}
    <circle cx="40" cy="40" r="2.5" fill="rgba(251,191,36,0.45)" />
  </svg>
);

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
          opacity: isSelected ? 0.2 : isDisabled ? 0.4 : 1,
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
            'relative w-full h-full rounded-lg overflow-visible',
            'focus:outline-none',
            isDisabled || isSelected ? 'cursor-default' : 'cursor-pointer',
          ].join(' ')}
          style={{
            background: 'linear-gradient(145deg, #2D2A6E 0%, #1A1744 50%, #0E1229 100%)',
            border: '1px solid rgba(124,58,237,0.3)',
            boxShadow: '0 4px 14px rgba(0,0,0,0.45)',
            borderRadius: 8,
          }}
        >
          {/* Inner border frame with diagonal pattern */}
          <div
            style={{
              position: 'absolute',
              inset: 4,
              borderRadius: 5,
              border: '1px solid rgba(251,191,36,0.13)',
              background:
                'repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(167,139,250,0.03) 6px, rgba(167,139,250,0.03) 7px)',
              pointerEvents: 'none',
            }}
          />

          {/* Mandala */}
          <MandalaSVG />

          {/* Corner ornaments */}
          {[
            { top: 3, left: 3, bt: true, bl: true },
            { top: 3, right: 3, bt: true, br: true },
            { bottom: 3, left: 3, bb: true, bl: true },
            { bottom: 3, right: 3, bb: true, br: true },
          ].map((c, ci) => (
            <div
              key={ci}
              style={{
                position: 'absolute',
                width: 9,
                height: 9,
                top: c.top,
                left: (c as { left?: number }).left,
                right: (c as { right?: number }).right,
                bottom: c.bottom,
                borderTop: c.bt ? '1px solid rgba(251,191,36,0.24)' : 'none',
                borderBottom: c.bb ? '1px solid rgba(251,191,36,0.24)' : 'none',
                borderLeft: c.bl ? '1px solid rgba(251,191,36,0.24)' : 'none',
                borderRight: c.br ? '1px solid rgba(251,191,36,0.24)' : 'none',
                pointerEvents: 'none',
              }}
            />
          ))}

        </button>
      </motion.div>
    </div>
  );
};

export default TarotCard;
