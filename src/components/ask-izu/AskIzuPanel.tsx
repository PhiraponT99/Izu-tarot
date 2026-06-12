import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Language, TarotCardData } from '../../../shared/tarotData';
import { useAskIzu } from '../../hooks/useAskIzu';

interface AskIzuPanelProps {
  cards: TarotCardData[];
  language: Language;
  izuMode: boolean;
}

const COPY = {
  en: {
    title: 'Ask Izu',
    intro: 'Ask a gentle follow-up about these three cards.',
    placeholder: 'What would you like to reflect on?',
    send: 'Ask Izu',
    sending: 'Listening…',
    remaining: (count: number) => `${count} question${count === 1 ? '' : 's'} remaining`,
    complete: 'You have asked three questions for this reading.',
  },
  th: {
    title: 'ถามอิซุ',
    intro: 'ชวนอิซุช่วยสะท้อนคำถามจากไพ่ทั้งสามใบ',
    placeholder: 'ตอนนี้คุณอยากค่อย ๆ มองเรื่องอะไร?',
    send: 'ถามอิซุ',
    sending: 'กำลังรับฟัง…',
    remaining: (count: number) => 'เหลืออีก ' + count + ' คำถาม',
    complete: 'คุณถามครบสามคำถามสำหรับการอ่านครั้งนี้แล้ว',
  },
} satisfies Record<Language, {
  title: string;
  intro: string;
  placeholder: string;
  send: string;
  sending: string;
  remaining: (count: number) => string;
  complete: string;
}>;

const AskIzuPanel: React.FC<AskIzuPanelProps> = ({ cards, language, izuMode }) => {
  const [question, setQuestion] = useState('');
  const { messages, questionsRemaining, isLoading, error, ask } = useAskIzu({
    cards,
    language,
    izuMode,
  });
  const copy = COPY[language];
  const limitReached = questionsRemaining === 0;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (await ask(question)) setQuestion('');
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.45 }}
      className="mx-4 mb-4 rounded-2xl border border-purple-light/20 bg-slate-950/35 p-4 text-left sm:mx-8 sm:p-5"
      aria-labelledby="ask-izu-heading"
    >
      <div className="text-center">
        <h3
          id="ask-izu-heading"
          className={[
            'font-cinzel text-base tracking-widest',
            izuMode ? 'text-purple-glow' : 'text-gold',
          ].join(' ')}
        >
          {copy.title}
        </h3>
        <p className="mt-1 font-cormorant text-sm italic text-purple-light/65">
          {copy.intro}
        </p>
      </div>

      {messages.length > 0 && (
        <div className="mt-4 max-h-64 space-y-3 overflow-y-auto pr-1" aria-live="polite">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={[
                'max-w-[90%] rounded-xl px-3 py-2 text-sm leading-relaxed',
                message.role === 'user'
                  ? 'ml-auto bg-gold/10 text-slate-200'
                  : 'mr-auto border border-purple-light/15 bg-purple-mystic/15 text-purple-light/90',
              ].join(' ')}
            >
              {message.content}
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <label htmlFor="ask-izu-question" className="sr-only">
          {copy.placeholder}
        </label>
        <textarea
          id="ask-izu-question"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder={copy.placeholder}
          maxLength={600}
          rows={3}
          disabled={isLoading || limitReached}
          className="w-full resize-none rounded-xl border border-white/10 bg-navy/70 px-3 py-2 font-inter text-sm text-slate-200 outline-none transition placeholder:text-white/25 focus:border-purple-light/40 focus:ring-1 focus:ring-purple-light/30 disabled:cursor-not-allowed disabled:opacity-50"
        />

        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
          <p className="font-inter text-[11px] text-white/35">
            {limitReached ? copy.complete : copy.remaining(questionsRemaining)}
          </p>
          <button
            type="submit"
            disabled={!question.trim() || isLoading || limitReached}
            className={[
              'rounded-full border px-5 py-2 font-cinzel text-[11px] uppercase tracking-widest transition',
              'disabled:cursor-not-allowed disabled:opacity-40',
              izuMode
                ? 'border-purple-light/35 text-purple-glow hover:bg-purple-mystic/15'
                : 'border-gold/35 text-gold hover:bg-gold/10',
            ].join(' ')}
          >
            {isLoading ? copy.sending : copy.send}
          </button>
        </div>

        {error && (
          <p role="alert" className="text-center font-inter text-xs text-rose-300/80">
            {error}
          </p>
        )}
      </form>
    </motion.section>
  );
};

export default AskIzuPanel;
