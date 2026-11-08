import { useCallback, useState } from 'react';

/** Copies text to the clipboard and exposes a short-lived status. */
export function useCopy(timeout = 2000) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setStatus('copied');
      } catch {
        setStatus('error');
      }
      window.setTimeout(() => setStatus('idle'), timeout);
    },
    [timeout],
  );

  return { status, copy };
}
