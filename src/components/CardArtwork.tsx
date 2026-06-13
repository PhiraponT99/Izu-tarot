import { useState } from 'react';
import type { TarotCardData } from '../../shared/tarotData';

interface CardArtworkProps {
  card: TarotCardData;
}

const CardArtwork: React.FC<CardArtworkProps> = ({ card }) => {
  const [hasError, setHasError] = useState(false);

  if (!card.image || hasError) return null;

  return (
    <img
      src={card.image}
      alt={`${card.name} tarot card`}
      className="absolute inset-0 h-full w-full object-cover"
      onError={() => setHasError(true)}
    />
  );
};

export default CardArtwork;
