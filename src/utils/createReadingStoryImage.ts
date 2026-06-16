import type { Language, TarotCardData } from '../../shared/tarotData';
import type { IzuThreeCardReflection } from './izuThreeCardReflection';

const STORY_WIDTH = 1080;
const STORY_HEIGHT = 1920;
const POSITION_LABELS: Record<Language, readonly string[]> = {
  en: ['Past', 'Present', 'Future'],
  th: ['อดีต', 'ปัจจุบัน', 'อนาคต'],
};
const STORY_COPY: Record<Language, { subtitle: string }> = {
  en: {
    subtitle: 'A gentle reflective tarot reading',
  },
  th: {
    subtitle: 'การอ่านไพ่เพื่อสะท้อนใจอย่างอ่อนโยน',
  },
};

export interface CreateReadingStoryImageInput {
  cards: readonly TarotCardData[];
  reflection: IzuThreeCardReflection;
  language: Language;
}

function loadImage(source: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Unable to load story image: ${source}`));
    image.src = new URL(source, window.location.href).href;
  });
}

function drawRoundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  context.beginPath();
  context.roundRect(x, y, width, height, radius);
}

function drawContainedImage(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  context.drawImage(
    image,
    x + (width - drawWidth) / 2,
    y + (height - drawHeight) / 2,
    drawWidth,
    drawHeight,
  );
}

function getWrappedLines(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const lines: string[] = [];

  for (const paragraph of text.split('\n')) {
    if (!paragraph.trim()) {
      lines.push('');
      continue;
    }

    const tokens = paragraph.includes(' ')
      ? paragraph.split(/\s+/)
      : Array.from(paragraph);
    let currentLine = '';

    for (const token of tokens) {
      const separator = paragraph.includes(' ') && currentLine ? ' ' : '';
      const candidate = `${currentLine}${separator}${token}`;

      if (currentLine && context.measureText(candidate).width > maxWidth) {
        lines.push(currentLine);
        currentLine = token;
      } else {
        currentLine = candidate;
      }
    }

    if (currentLine) lines.push(currentLine);
  }

  return lines;
}

function drawCenteredWrappedText(
  context: CanvasRenderingContext2D,
  text: string,
  centerX: number,
  startY: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number,
) {
  const lines = getWrappedLines(context, text, maxWidth).slice(0, maxLines);
  lines.forEach((line, index) => {
    context.fillText(line, centerX, startY + index * lineHeight);
  });
}

function getFittedWrappedText(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number,
  language: Language,
): { lines: string[]; fontSize: number; lineHeight: number } {
  let fontSize = language === 'th' ? 29 : 30;
  const minimumFontSize = language === 'th' ? 19 : 18;

  while (fontSize > minimumFontSize) {
    context.font = language === 'th'
      ? `400 ${fontSize}px "IBM Plex Sans Thai", "Noto Sans Thai", sans-serif`
      : `400 ${fontSize}px Inter, Arial, sans-serif`;
    const lines = getWrappedLines(context, text, maxWidth);
    if (lines.length <= maxLines) {
      return {
        lines,
        fontSize,
        lineHeight: Math.round(fontSize * (language === 'th' ? 1.65 : 1.55)),
      };
    }
    fontSize -= 1;
  }

  context.font = language === 'th'
    ? `400 ${minimumFontSize}px "IBM Plex Sans Thai", "Noto Sans Thai", sans-serif`
    : `400 ${minimumFontSize}px Inter, Arial, sans-serif`;
  return {
    lines: getWrappedLines(context, text, maxWidth).slice(0, maxLines),
    fontSize: minimumFontSize,
    lineHeight: Math.round(minimumFontSize * (language === 'th' ? 1.65 : 1.55)),
  };
}

function drawCelestialDecoration(context: CanvasRenderingContext2D) {
  const stars = [
    [92, 154, 3], [173, 267, 2], [947, 206, 3], [873, 318, 2],
    [73, 690, 2], [1004, 748, 3], [130, 1012, 2], [943, 1120, 2],
    [78, 1510, 3], [972, 1608, 2], [198, 1745, 2], [874, 1810, 3],
  ] as const;

  context.save();
  for (const [x, y, radius] of stars) {
    context.fillStyle = radius === 3 ? 'rgba(251, 191, 36, 0.65)' : 'rgba(196, 181, 253, 0.55)';
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
  }

  context.strokeStyle = 'rgba(196, 181, 253, 0.24)';
  context.lineWidth = 2;
  context.beginPath();
  context.arc(540, 151, 54, 0.18 * Math.PI, 1.82 * Math.PI);
  context.stroke();
  context.restore();
}

export async function createReadingStoryImage({
  cards,
  reflection,
  language,
}: CreateReadingStoryImageInput): Promise<Blob> {
  if (cards.length !== 3) {
    throw new Error('A story image requires exactly three cards.');
  }

  await document.fonts?.ready;
  const [cardImages, bubbleImage] = await Promise.all([
    Promise.all(cards.map((card) => {
      if (!card.image) throw new Error(`Card image is missing for ${card.name}.`);
      return loadImage(card.image);
    })),
    loadImage('/ui/izu-message-bubble.png'),
  ]);

  const canvas = document.createElement('canvas');
  canvas.width = STORY_WIDTH;
  canvas.height = STORY_HEIGHT;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Canvas is unavailable in this browser.');

  const background = context.createLinearGradient(0, 0, STORY_WIDTH, STORY_HEIGHT);
  background.addColorStop(0, '#080E1A');
  background.addColorStop(0.48, '#15133B');
  background.addColorStop(1, '#0F172A');
  context.fillStyle = background;
  context.fillRect(0, 0, STORY_WIDTH, STORY_HEIGHT);

  const glow = context.createRadialGradient(540, 760, 80, 540, 760, 720);
  glow.addColorStop(0, 'rgba(124, 58, 237, 0.30)');
  glow.addColorStop(0.5, 'rgba(49, 46, 129, 0.13)');
  glow.addColorStop(1, 'rgba(8, 14, 26, 0)');
  context.fillStyle = glow;
  context.fillRect(0, 0, STORY_WIDTH, STORY_HEIGHT);
  drawCelestialDecoration(context);

  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.shadowColor = 'rgba(251, 191, 36, 0.35)';
  context.shadowBlur = 22;
  context.fillStyle = '#FDE68A';
  context.font = '700 66px "Pixelify Sans", "Press Start 2P", monospace';
  context.fillText('IZU TAROT', 540, 145);
  context.shadowBlur = 0;

  context.fillStyle = 'rgba(226, 232, 240, 0.78)';
  context.font = language === 'th'
    ? '400 31px "IBM Plex Sans Thai", "Noto Sans Thai", sans-serif'
    : '34px "Pixelify Sans", monospace';
  context.fillText(STORY_COPY[language].subtitle, 540, 215);

  const cardWidth = 230;
  const cardHeight = 384;
  const cardGap = 58;
  const cardsStartX = (STORY_WIDTH - cardWidth * 3 - cardGap * 2) / 2;
  const cardY = 350;

  cards.forEach((card, index) => {
    const x = cardsStartX + index * (cardWidth + cardGap);
    context.fillStyle = index === 2 ? '#FBBF24' : '#C4B5FD';
    context.font = language === 'th'
      ? '500 28px "IBM Plex Sans Thai", "Noto Sans Thai", sans-serif'
      : '600 25px "Pixelify Sans", monospace';
    context.fillText(POSITION_LABELS[language][index], x + cardWidth / 2, 304);

    context.save();
    context.shadowColor = index === 2
      ? 'rgba(251, 191, 36, 0.45)'
      : 'rgba(124, 58, 237, 0.55)';
    context.shadowBlur = 30;
    drawRoundedRect(context, x - 4, cardY - 4, cardWidth + 8, cardHeight + 8, 20);
    context.fillStyle = index === 2 ? 'rgba(251, 191, 36, 0.78)' : 'rgba(167, 139, 250, 0.65)';
    context.fill();
    context.restore();

    context.save();
    drawRoundedRect(context, x, cardY, cardWidth, cardHeight, 16);
    context.clip();
    context.fillStyle = '#1E1B4B';
    context.fillRect(x, cardY, cardWidth, cardHeight);
    drawContainedImage(context, cardImages[index], x, cardY, cardWidth, cardHeight);
    context.restore();

    context.fillStyle = '#F8FAFC';
    context.font = '500 27px "Pixelify Sans", monospace';
    drawCenteredWrappedText(
      context,
      card.name,
      x + cardWidth / 2,
      785,
      cardWidth,
      32,
      2,
    );
  });

  const bubbleX = 90;
  const bubbleY = 930;
  const bubbleWidth = 900;
  const bubbleHeight = bubbleWidth * (bubbleImage.naturalHeight / bubbleImage.naturalWidth);
  context.save();
  context.shadowColor = 'rgba(124, 58, 237, 0.38)';
  context.shadowBlur = 32;
  context.drawImage(bubbleImage, bubbleX, bubbleY, bubbleWidth, bubbleHeight);
  context.restore();

  const reflectionX = bubbleX + 132;
  const reflectionY = bubbleY + 165;
  const reflectionWidth = bubbleWidth * 0.59;
  const reflectionCenterX = reflectionX + reflectionWidth / 2;

  context.fillStyle = '#FBBF24';
  context.font = language === 'th'
    ? '600 28px "IBM Plex Sans Thai", "Noto Sans Thai", sans-serif'
    : '700 29px "Pixelify Sans", monospace';
  context.fillText(reflection.title, reflectionCenterX, reflectionY);

  context.fillStyle = '#F1F5F9';
  const fittedReflection = getFittedWrappedText(
    context,
    reflection.message,
    reflectionWidth,
    4,
    language,
  );
  context.font = language === 'th'
    ? `400 ${fittedReflection.fontSize}px "IBM Plex Sans Thai", "Noto Sans Thai", sans-serif`
    : `400 ${fittedReflection.fontSize}px Inter, Arial, sans-serif`;
  fittedReflection.lines.forEach((line, index) => {
    context.fillText(
      line,
      reflectionCenterX,
      reflectionY + 72 + index * fittedReflection.lineHeight,
    );
  });

  context.strokeStyle = 'rgba(251, 191, 36, 0.45)';
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(390, 1744);
  context.lineTo(690, 1744);
  context.stroke();

  context.fillStyle = 'rgba(253, 230, 138, 0.84)';
  context.font = '500 25px Inter, Arial, sans-serif';
  context.fillText('izu-tarot.vercel.app', 540, 1795);
  context.fillStyle = 'rgba(196, 181, 253, 0.58)';
  context.font = '400 20px Inter, Arial, sans-serif';
  context.fillText('REFLECT, NOT PREDICT', 540, 1842);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => blob ? resolve(blob) : reject(new Error('Unable to create the story PNG.')),
      'image/png',
    );
  });
}
