import type { AskIzuRequest, AskIzuResponse } from '../types/askIzu';

const REQUEST_TIMEOUT_MS = 20_000;

export async function askIzu(
  request: AskIzuRequest,
  signal?: AbortSignal,
): Promise<AskIzuResponse> {
  const timeoutController = new AbortController();
  const timeoutId = window.setTimeout(() => timeoutController.abort(), REQUEST_TIMEOUT_MS);
  const abortRequest = () => timeoutController.abort();

  signal?.addEventListener('abort', abortRequest, { once: true });

  try {
    const response = await fetch('/api/ask-izu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
      signal: timeoutController.signal,
    });

    const body = await response.json().catch(() => null) as AskIzuResponse | { error?: string } | null;

    if (!response.ok) {
      throw new Error(body && 'error' in body && body.error ? body.error : 'Ask Izu request failed.');
    }

    if (
      !body
      || !('answer' in body)
      || typeof body.answer !== 'string'
      || !('safety' in body)
      || (body.safety !== 'standard' && body.safety !== 'supportive-redirect')
      || !('requestId' in body)
      || typeof body.requestId !== 'string'
    ) {
      throw new Error('Ask Izu returned an invalid response.');
    }

    return body;
  } finally {
    window.clearTimeout(timeoutId);
    signal?.removeEventListener('abort', abortRequest);
  }
}
