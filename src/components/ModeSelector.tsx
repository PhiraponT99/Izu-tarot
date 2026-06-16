import React from 'react';
import type { Language } from '../../shared/tarotData';

export type ReadingMode = 'daily' | 'three-card';

interface ModeSelectorProps {
  mode: ReadingMode;
  onChange: (mode: ReadingMode) => void;
  language: Language;
}

const LABELS: Record<Language, Record<ReadingMode, string>> = {
  en: {
    daily: 'Daily Card',
    'three-card': 'Three Card Reading',
  },
  th: {
    daily: 'ไพ่ประจำวัน',
    'three-card': 'อ่านไพ่สามใบ',
  },
};

const ModeSelector: React.FC<ModeSelectorProps> = ({ mode, onChange, language }) => (
  <div
    className="flex items-center rounded-md border border-white/10 bg-izu-panel/80 p-1 shadow-lg backdrop-blur-sm"
    role="group"
    aria-label={language === 'th' ? 'เลือกรูปแบบการเปิดไพ่' : 'Choose reading mode'}
  >
    {(['daily', 'three-card'] as ReadingMode[]).map((option) => {
      const isActive = mode === option;

      return (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          aria-pressed={isActive}
          className={[
            'rounded-md px-3 py-1.5 font-pixel text-[11px] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-izu-gold',
            isActive
              ? 'bg-izu-gold/15 text-izu-gold shadow-[0_0_14px_rgba(251,191,36,0.12)] border border-izu-gold/30'
              : 'text-white/45 hover:text-white/75 border border-transparent',
          ].join(' ')}
        >
          {LABELS[language][option]}
        </button>
      );
    })}
  </div>
);

export default ModeSelector;
