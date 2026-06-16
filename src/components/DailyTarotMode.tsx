import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Language, TarotCardData } from '../../shared/tarotData';
import CardArtwork from './CardArtwork';

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
            'font-pixel text-lg tracking-widest',
            izuMode ? 'text-izu-purple-soft text-glow-purple' : 'text-izu-gold text-glow-gold',
          ].join(' ')}
        >
          {language === 'th' ? 'ไพ่ประจำวัน' : 'Daily Card'}
        </h2>
        <p className="mt-2 font-body text-base text-izu-muted/70">
          {selectedCard ? COPY[language].stored : COPY[language].instruction}
        </p>
      </div>

      <div
        className="relative aspect-[2/3] w-[clamp(160px,36vw,192px)]"
        style={{ perspective: 1000 }}
      >
        <motion.div
          className="relative h-full w-full"
          animate={{ rotateY: isRevealed ? 180 : 0, y: isRevealed ? -4 : 0 }}
          transition={{ rotateY: { duration: 0.8 }, y: { duration: 0.4 } }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div
            className="absolute inset-0 box-border overflow-hidden rounded-md border border-izu-gold/75 bg-gradient-to-br from-indigo-deep via-purple-mystic to-navy shadow-[0_0_28px_rgba(251,191,36,0.38),0_16px_45px_rgba(0,0,0,0.45)]"
            style={{
              backfaceVisibility: 'hidden',
            }}
          >
            <img
              src="/cards/v2/CardBack-CelestialMoon.webp"
              alt=""
              aria-hidden="true"
              className="block h-full w-full object-contain"
            />
          </div>

          <div
            className={[
              'absolute inset-0 box-border overflow-hidden rounded-md border bg-gradient-to-br from-indigo-deep via-purple-mystic to-navy',
              izuMode
                ? 'border-izu-purple-soft/80 shadow-[0_0_30px_rgba(167,139,250,0.48),0_16px_45px_rgba(0,0,0,0.45)]'
                : 'border-izu-gold/80 shadow-[0_0_30px_rgba(251,191,36,0.42),0_16px_45px_rgba(0,0,0,0.45)]',
            ].join(' ')}
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            {selectedCard && <CardArtwork card={selectedCard} />}
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
          <p className="font-pixel text-[11px] uppercase tracking-widest text-white/35">
            {COPY[language].keyword}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {selectedCard.keywords[language].map((keyword) => (
              <span
                key={keyword}
                className="rounded-md border border-izu-purple-soft/20 bg-izu-purple/20 px-3 py-1 font-pixel text-xs text-izu-purple-soft"
              >
                {keyword}
              </span>
            ))}
          </div>
          <p className="font-pixel text-[11px] uppercase tracking-widest text-white/35">
            {COPY[language].meaning}
          </p>
          <p
            className="leading-relaxed font-body text-sm text-izu-text/90"
          >
            {meaning}
          </p>
        </motion.div>
      ) : (
        <motion.button
          type="button"
          onClick={handleDraw}
          whileHover={{ y: -1, scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className={[
            'w-full max-w-xs rounded-md px-5 py-3 font-pixel text-xs uppercase tracking-widest transition-colors focus:outline-none focus-visible:ring-2 sm:px-8',
            izuMode
              ? 'pixel-btn-purple focus-visible:ring-izu-purple-soft'
              : 'pixel-btn-gold focus-visible:ring-izu-gold-soft',
          ].join(' ')}
        >
          {COPY[language].draw}
        </motion.button>
      )}
    </motion.section>
  );
};

export default DailyTarotMode;
