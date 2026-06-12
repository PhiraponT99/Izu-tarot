import React from 'react';
import type { Language } from '../data/tarotData';

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
    'three-card': 'ไพ่สามใบ',
  },
};

const ModeSelector: React.FC<ModeSelectorProps> = ({ mode, onChange, language }) => (
  <div
    className="flex items-center rounded-full border border-white/10 bg-navy/60 p-1 shadow-lg backdrop-blur-sm"
    role="group"
    aria-label={language === 'th' ? 'เลือกรูปแบบการอ่านไพ่' : 'Choose reading mode'}
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
            'rounded-full px-3 py-1.5 font-inter text-[11px] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold',
            isActive
              ? 'bg-gold/12 text-gold shadow-[0_0_14px_rgba(251,191,36,0.12)]'
              : 'text-white/45 hover:text-white/75',
          ].join(' ')}
        >
          {LABELS[language][option]}
        </button>
      );
    })}
  </div>
);

export default ModeSelector;
