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
    className="flex items-center justify-center gap-3 sm:gap-6"
    aria-label={language === 'th' ? 'ไพ่ที่คุณเลือก' : 'Selected cards'}
  >
    {Array.from({ length: SLOT_COUNT }, (_, index) => {
      const card = selectedCards[index];

      return (
        <div
          key={index}
          className="relative flex h-[92px] w-[58px] items-center justify-center rounded-lg border border-dashed border-purple-light/20 bg-white/[0.025]"
        >
          <AnimatePresence mode="wait">
            {card ? (
              <motion.button
                key={card.id}
                type="button"
                initial={{ opacity: 0, y: -20, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.85 }}
                whileHover={{ y: -4, scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                onClick={() => onDeselect(card.id)}
                aria-label={
                  language === 'th'
                    ? `นำไพ่ใบที่ ${index + 1} ออกจากชุด`
                    : `Deselect card ${index + 1}`
                }
                className="relative h-[88px] w-[54px] cursor-pointer overflow-visible rounded-lg focus:outline-none focus-visible:ring-2"
                style={{
                  background: 'linear-gradient(145deg, #2D2A6E 0%, #1A1744 50%, #0E1229 100%)',
                  border: izuMode
                    ? '1.5px solid rgba(167,139,250,0.9)'
                    : '1.5px solid rgba(251,191,36,0.9)',
                  boxShadow: izuMode
                    ? '0 0 18px rgba(167,139,250,0.55), 0 0 36px rgba(124,58,237,0.25)'
                    : '0 0 18px rgba(251,191,36,0.55), 0 0 36px rgba(251,191,36,0.2)',
                }}
              >
                <span className="absolute inset-1 rounded border border-gold/15" aria-hidden="true" />
                <span
                  className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/25"
                  aria-hidden="true"
                >
                  <span className="absolute inset-2 rounded-full border border-purple-light/30" />
                </span>
                <span
                  className={[
                    'absolute inset-0 rounded-lg opacity-50 pointer-events-none',
                    izuMode ? 'shimmer-purple' : 'shimmer-gold',
                  ].join(' ')}
                  aria-hidden="true"
                />
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-2 -top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full font-cinzel text-[10px] font-bold"
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
              </motion.button>
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
