import { useState } from 'react';
import type { TarotCardData } from '../../shared/tarotData';

type SelectedCardIds = [number, number, number];

interface TestReadingControlsProps {
  cards: readonly TarotCardData[];
  onUseSelectedCards: (ids: SelectedCardIds) => void;
}

const POSITION_LABELS = ['Past card', 'Present card', 'Future card'] as const;

const TestReadingControls: React.FC<TestReadingControlsProps> = ({
  cards,
  onUseSelectedCards,
}) => {
  const initialIds: SelectedCardIds = [
    cards[0]?.id ?? 0,
    cards[1]?.id ?? 1,
    cards[2]?.id ?? 2,
  ];
  const [selectedIds, setSelectedIds] = useState<SelectedCardIds>(initialIds);

  const updateSelection = (position: number, id: number) => {
    setSelectedIds((current) => {
      const next: SelectedCardIds = [...current];
      next[position] = id;
      return next;
    });
  };

  return (
    <section
      aria-labelledby="test-reading-controls-title"
      className="mx-auto mb-4 w-[calc(100%-2rem)] max-w-2xl rounded-xl border border-dashed border-gold/30 bg-navy/70 px-4 py-3 shadow-[0_0_20px_rgba(124,58,237,0.12)] backdrop-blur-sm"
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2
          id="test-reading-controls-title"
          className="font-cinzel text-[11px] uppercase tracking-widest text-gold/75"
        >
          Test Reading Controls
        </h2>
        <span className="font-inter text-[10px] uppercase tracking-wider text-purple-light/40">
          Dev only
        </span>
      </div>

      <div className="grid gap-2 sm:grid-cols-3">
        {POSITION_LABELS.map((label, position) => (
          <label
            key={label}
            className="flex flex-col gap-1 font-inter text-[10px] uppercase tracking-wider text-purple-light/55"
          >
            {label}
            <select
              value={selectedIds[position]}
              onChange={(event) => updateSelection(position, Number(event.target.value))}
              className="min-w-0 rounded-md border border-purple-light/20 bg-slate-950/80 px-2 py-2 font-inter text-xs normal-case tracking-normal text-white/80 outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/40"
            >
              {cards.map((card) => (
                <option
                  key={card.id}
                  value={card.id}
                  disabled={selectedIds.some(
                    (selectedId, selectedPosition) =>
                      selectedPosition !== position && selectedId === card.id,
                  )}
                >
                  {card.id}. {card.name}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onUseSelectedCards(selectedIds)}
        className="mt-3 w-full rounded-full border border-gold/35 bg-gold/10 px-4 py-2 font-cinzel text-[10px] uppercase tracking-widest text-gold/80 transition-colors hover:bg-gold/15 hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:w-auto"
      >
        Use Selected Cards
      </button>
    </section>
  );
};

export default TestReadingControls;
