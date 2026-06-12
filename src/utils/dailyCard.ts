export const DAILY_CARD_STORAGE_KEY = 'izu-tarot-daily-card';

export interface DailyCardStorage {
  date: string;
  cardId: number;
}

export function getLocalDateKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function loadTodaysCard(): DailyCardStorage | null {
  if (typeof window === 'undefined') return null;

  try {
    const rawValue = window.localStorage.getItem(DAILY_CARD_STORAGE_KEY);
    if (!rawValue) return null;

    const stored = JSON.parse(rawValue) as Partial<DailyCardStorage>;
    if (stored.date !== getLocalDateKey() || typeof stored.cardId !== 'number') {
      return null;
    }

    return { date: stored.date, cardId: stored.cardId };
  } catch {
    return null;
  }
}

export function saveTodaysCard(cardId: number): DailyCardStorage {
  const stored = { date: getLocalDateKey(), cardId };
  window.localStorage.setItem(DAILY_CARD_STORAGE_KEY, JSON.stringify(stored));
  return stored;
}
