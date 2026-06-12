import { useEffect, useRef, useState } from 'react';
import type { Language, TarotCardData } from '../data/tarotData';
import { askIzu } from '../services/askIzuApi';
import type { AskIzuMessage } from '../types/askIzu';

const MAX_QUESTIONS = 3;
const MAX_MESSAGES = 6;

interface UseAskIzuOptions {
  cards: TarotCardData[];
  language: Language;
  izuMode: boolean;
}

export function useAskIzu({ cards, language, izuMode }: UseAskIzuOptions) {
  const [messages, setMessages] = useState<AskIzuMessage[]>([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => () => abortControllerRef.current?.abort(), []);

  const ask = async (question: string) => {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion || isLoading || questionCount >= MAX_QUESTIONS) return false;

    const previousMessages = messages.slice(-MAX_MESSAGES);
    const userMessage: AskIzuMessage = { role: 'user', content: trimmedQuestion };
    setMessages([...previousMessages, userMessage].slice(-MAX_MESSAGES));
    setIsLoading(true);
    setError(null);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await askIzu(
        {
          language,
          izuMode,
          readingMode: 'three-card',
          cardIds: cards.map((card) => card.id) as [number, number, number],
          question: trimmedQuestion,
          messages: previousMessages,
        },
        controller.signal,
      );

      const assistantMessage: AskIzuMessage = {
        role: 'assistant',
        content: response.answer,
      };
      setMessages((current) => [...current, assistantMessage].slice(-MAX_MESSAGES));
      setQuestionCount((count) => count + 1);
      return true;
    } catch (requestError) {
      if (!controller.signal.aborted) {
        setMessages(previousMessages);
        setError(
          requestError instanceof Error
            ? requestError.message
            : language === 'th'
              ? 'ตอนนี้อิซุยังตอบไม่ได้ ลองอีกครั้งในสักครู่'
              : 'Izu could not respond right now. Please try again shortly.',
        );
      }
      return false;
    } finally {
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
      }
      setIsLoading(false);
    }
  };

  return {
    messages,
    questionCount,
    questionsRemaining: MAX_QUESTIONS - questionCount,
    isLoading,
    error,
    ask,
  };
}
