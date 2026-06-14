import type { Language } from '../../shared/tarotData';

export type ShareStoryImageResult = 'shared' | 'downloaded' | 'cancelled';

const SHARE_COPY: Record<Language, Pick<ShareData, 'title' | 'text'>> = {
  en: {
    title: 'Izu Tarot Reading',
    text: 'My Izu Tarot reflection',
  },
  th: {
    title: 'Izu Tarot Reading',
    text: 'My Izu Tarot reflection',
  },
};

function downloadStoryImage(blob: Blob) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'izu-tarot-reading.png';
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function isShareCancellation(error: unknown): boolean {
  return (
    typeof error === 'object'
    && error !== null
    && 'name' in error
    && error.name === 'AbortError'
  );
}

function canShareFile(file: File): boolean {
  try {
    return navigator.canShare?.({ files: [file] }) ?? false;
  } catch {
    return false;
  }
}

export async function shareStoryImage(
  blob: Blob,
  language: Language,
): Promise<ShareStoryImageResult> {
  const file = new File([blob], 'izu-tarot-reading.png', { type: 'image/png' });
  const shareData: ShareData = {
    files: [file],
    ...SHARE_COPY[language],
  };

  if (canShareFile(file)) {
    try {
      await navigator.share(shareData);
      return 'shared';
    } catch (error) {
      if (isShareCancellation(error)) return 'cancelled';
    }
  }

  downloadStoryImage(blob);
  return 'downloaded';
}
