import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Language, TarotCardData } from '../../shared/tarotData';

interface SelectedCardsTrayProps {
  selectedCards: Array<TarotCardData | null>;
  onDeselect: (slotIndex: number) => void;
  izuMode: boolean;
  language: Language;
}

const SLOT_COUNT = 3;

const SelectedCardsTray: React.FC<SelectedCardsTrayProps> = ({
  selectedCards,
  onDeselect,
  izuMode,
  language,
}) => (
  <div
    className="flex w-full items-center justify-center gap-3 px-3 sm:gap-6 sm:px-0"
    aria-label={language === 'th' ? 'ไพ่ที่คุณเลือก' : 'Selected cards'}
  >
    {Array.from({ length: SLOT_COUNT }, (_, index) => {
      const card = selectedCards[index];

      return (
        <div
          key={index}
          className={[
            'relative aspect-[2/3] w-[clamp(58px,18vw,76px)] flex-none',
            card
              ? 'bg-transparent'
              : 'flex items-center justify-center rounded-md border border-dashed border-izu-muted/25 bg-white/[0.025]',
          ].join(' ')}
        >
          <AnimatePresence mode="wait">
            {card ? (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: -20, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.85 }}
                whileHover={{ y: -4, scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                className="absolute inset-0 overflow-visible"
              >
                <button
                  type="button"
                  onClick={() => onDeselect(index)}
                  aria-label={
                    language === 'th'
                      ? `นำไพ่ใบที่ ${index + 1} ออกจากชุด`
                      : `Deselect card ${index + 1}`
                  }
                  className={[
                    'absolute inset-0 block h-full w-full cursor-pointer overflow-hidden rounded-md border p-0',
                    'box-border bg-gradient-to-br from-indigo-deep via-purple-mystic to-navy',
                    'transition-shadow duration-200 focus:outline-none focus-visible:ring-2',
                    izuMode
                      ? 'border-izu-purple-soft/80 shadow-[0_0_18px_rgba(167,139,250,0.45),0_0_32px_rgba(124,58,237,0.2)] hover:shadow-[0_0_24px_rgba(167,139,250,0.6),0_0_40px_rgba(124,58,237,0.3)] focus-visible:ring-izu-purple-soft'
                      : 'border-izu-gold/90 shadow-[0_0_18px_rgba(251,191,36,0.45),0_0_32px_rgba(251,191,36,0.2)] hover:shadow-[0_0_24px_rgba(251,191,36,0.6),0_0_40px_rgba(251,191,36,0.25)] focus-visible:ring-izu-gold',
                  ].join(' ')}
                >
                  <img
                    src="/cards/v2/CardBack-CelestialMoon.webp"
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 block h-full w-full object-contain pointer-events-none"
                  />
                </button>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="pointer-events-none absolute -right-2 -top-2 z-30 flex h-5 w-5 items-center justify-center rounded-[4px] font-pixel text-[10px] font-bold"
                  style={{
                    background: izuMode
                      ? 'radial-gradient(circle, var(--izu-purple-soft) 0%, var(--izu-purple) 100%)'
                      : 'radial-gradient(circle, var(--izu-gold-soft) 0%, var(--izu-gold) 100%)',
                    color: izuMode ? '#fff' : '#0F172A',
                    boxShadow: izuMode
                      ? '0 0 10px rgba(167,139,250,0.8)'
                      : '0 0 10px rgba(251,191,36,0.8)',
                  }}
                >
                  {index + 1}
                </motion.span>
              </motion.div>
            ) : (
              <motion.span
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-pixel text-[11px] text-izu-muted/30"
              >
                {index + 1}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
);

export default SelectedCardsTray;
