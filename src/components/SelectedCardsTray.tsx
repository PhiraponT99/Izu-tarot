import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Language, TarotCardData } from '../../shared/tarotData';

interface SelectedCardsTrayProps {
  selectedCards: TarotCardData[];
  onDeselect: (id: number) => void;
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
              : 'rounded-lg border border-dashed border-purple-light/20 bg-white/[0.025]',
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
                  onClick={() => onDeselect(card.id)}
                  aria-label={
                    language === 'th'
                      ? `นำไพ่ใบที่ ${index + 1} ออกจากชุด`
                      : `Deselect card ${index + 1}`
                  }
                  className={[
                    'absolute inset-0 block h-full w-full cursor-pointer overflow-hidden rounded-[10px] border p-0',
                    'box-border bg-gradient-to-br from-indigo-deep via-purple-mystic to-navy',
                    'transition-shadow duration-200 focus:outline-none focus-visible:ring-2',
                    izuMode
                      ? 'border-purple-light/80 shadow-[0_0_18px_rgba(167,139,250,0.55),0_0_32px_rgba(124,58,237,0.28)] hover:shadow-[0_0_24px_rgba(167,139,250,0.72),0_0_40px_rgba(124,58,237,0.35)]'
                      : 'border-gold/90 shadow-[0_0_18px_rgba(251,191,36,0.55),0_0_32px_rgba(251,191,36,0.24)] hover:shadow-[0_0_24px_rgba(251,191,36,0.75),0_0_40px_rgba(251,191,36,0.32)]',
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
                  className="pointer-events-none absolute -right-2 -top-2 z-30 flex h-5 w-5 items-center justify-center rounded-full font-cinzel text-[10px] font-bold"
                  style={{
                    background: izuMode
                      ? 'radial-gradient(circle, #A78BFA 0%, #7C3AED 100%)'
                      : 'radial-gradient(circle, #FBBF24 0%, #D97706 100%)',
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
                className="font-cinzel text-xs text-purple-light/25"
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
