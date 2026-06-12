import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Language, TarotCardData } from '../../shared/tarotData';

interface DailyTarotModeProps {
  cards: TarotCardData[];
  language: Language;
  izuMode: boolean;
}

const COPY = {
  en: {
    instruction: 'Take a quiet breath. Draw one card for today.',
    stored: 'Your card for today is here whenever you need it.',
    draw: 'Draw Today’s Card',
    keyword: 'Keyword',
    meaning: 'Meaning',
  },
  th: {
    instruction: 'ค่อย ๆ หายใจ แล้วเปิดไพ่หนึ่งใบเพื่อรับฟังใจตัวเองในวันนี้',
    stored: 'ลองใช้เวลาสักครู่กับข้อความจากไพ่ใบนี้',
    draw: 'เปิดไพ่ของวันนี้',
    keyword: 'ถ้อยคำชวนคิด',
    meaning: 'ข้อความจากไพ่',
  },
} satisfies Record<Language, Record<string, string>>;

const DailyTarotMode: React.FC<DailyTarotModeProps> = ({ cards, language, izuMode }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [selectedCard, setSelectedCard] = useState<TarotCardData | null>(null);

  const handleDraw = () => {
    if (isRevealed || cards.length === 0) return;

    const card = cards[Math.floor(Math.random() * cards.length)];
    setSelectedCard(card);
    setIsRevealed(true);
  };

  const meaning = selectedCard
    ? izuMode
      ? selectedCard.izuReflection[language]
      : selectedCard.description[language]
    : '';

  return (
    <motion.section
      key="daily-card-mode"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="flex w-full flex-col items-center gap-5 px-4 text-center"
      aria-labelledby="daily-card-heading"
    >
      <div>
        <h2
          id="daily-card-heading"
          className={[
            'font-cinzel text-lg tracking-widest',
            izuMode ? 'text-purple-glow text-glow-purple' : 'text-gold text-glow-gold',
          ].join(' ')}
        >
          {language === 'th' ? 'ไพ่ประจำวัน' : 'Daily Card'}
        </h2>
        <p className="mt-2 font-cormorant text-lg italic text-purple-light/70">
          {selectedCard ? COPY[language].stored : COPY[language].instruction}
        </p>
      </div>

      <div className="relative h-[240px] w-[144px]" style={{ perspective: 1000 }}>
        <motion.div
          className="relative h-full w-full"
          animate={{ rotateY: isRevealed ? 180 : 0, y: isRevealed ? -4 : 0 }}
          transition={{ rotateY: { duration: 0.8 }, y: { duration: 0.4 } }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div
            className="absolute inset-0 overflow-hidden rounded-xl"
            style={{
              backfaceVisibility: 'hidden',
              background: 'linear-gradient(145deg, #2D2A6E 0%, #1A1744 50%, #0E1229 100%)',
              border: '1.5px solid rgba(251,191,36,0.55)',
              boxShadow: '0 0 28px rgba(124,58,237,0.32), 0 16px 45px rgba(0,0,0,0.45)',
            }}
          >
            <div className="absolute inset-2 rounded-lg border border-gold/20" />
            <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/30">
              <div className="absolute inset-3 rounded-full border border-purple-light/35" />
              <div className="absolute inset-7 rounded-full bg-gold/35 shadow-[0_0_18px_rgba(251,191,36,0.45)]" />
            </div>
          </div>

          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 overflow-hidden rounded-xl px-4"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              background: 'linear-gradient(160deg, #1E1B4B 0%, #312E81 45%, #111827 100%)',
              border: izuMode
                ? '2px solid rgba(167,139,250,0.75)'
                : '2px solid rgba(251,191,36,0.7)',
              boxShadow: izuMode
                ? '0 0 30px rgba(167,139,250,0.4), 0 16px 45px rgba(0,0,0,0.45)'
                : '0 0 30px rgba(251,191,36,0.35), 0 16px 45px rgba(0,0,0,0.45)',
            }}
          >
            <span className="text-4xl text-gold" aria-hidden="true">✦</span>
            <p className="font-cinzel text-sm leading-snug text-white/90">
              {selectedCard?.name ?? ''}
            </p>
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          </div>
        </motion.div>
      </div>

      {isRevealed && selectedCard ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="w-full max-w-md space-y-3"
        >
          <p className="font-inter text-xs uppercase tracking-widest text-white/35">
            {COPY[language].keyword}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {selectedCard.keywords[language].map((keyword) => (
              <span
                key={keyword}
                className="rounded-full border border-purple-light/20 bg-purple-mystic/20 px-3 py-1 font-inter text-xs text-purple-light"
              >
                {keyword}
              </span>
            ))}
          </div>
          <p className="font-inter text-xs uppercase tracking-widest text-white/35">
            {COPY[language].meaning}
          </p>
          <p
            className={[
              'leading-relaxed',
              izuMode
                ? 'font-cormorant text-base italic text-purple-glow/90'
                : 'font-inter text-sm text-slate-300/85',
            ].join(' ')}
          >
            {meaning}
          </p>
        </motion.div>
      ) : (
        <motion.button
          type="button"
          onClick={handleDraw}
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={[
            'w-full max-w-xs rounded-full px-5 py-3 font-cinzel text-xs uppercase tracking-widest transition-colors focus:outline-none focus-visible:ring-2 sm:px-8',
            izuMode
              ? 'border border-purple-light/40 bg-purple-mystic/20 text-purple-glow focus-visible:ring-purple-light'
              : 'border border-gold/50 bg-gold/10 text-gold focus-visible:ring-gold',
          ].join(' ')}
        >
          {COPY[language].draw}
        </motion.button>
      )}
    </motion.section>
  );
};

export default DailyTarotMode;
