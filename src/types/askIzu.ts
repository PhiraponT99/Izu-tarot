import type { Language } from '../data/tarotData';

export type AskIzuSafety = 'standard' | 'supportive-redirect';

export interface AskIzuMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AskIzuRequest {
  language: Language;
  izuMode: boolean;
  readingMode: 'three-card';
  cardIds: [number, number, number];
  question: string;
  messages?: AskIzuMessage[];
}

export interface AskIzuResponse {
  answer: string;
  safety: AskIzuSafety;
  requestId: string;
}
