import { useEffect, useState } from 'react';

export type PdfStatus = 'checking' | 'ok' | 'missing';

interface CheckResult {
  url: string;
  ok: boolean;
}

export function usePdfAvailability(url: string, enabled: boolean): PdfStatus {
  const [result, setResult] = useState<CheckResult | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const controller = new AbortController();

    fetch(url, { method: 'HEAD', signal: controller.signal })
      .then((response) => {
        const type = response.headers.get('content-type') ?? '';
        setResult({ url, ok: response.ok && type.includes('application/pdf') });
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setResult({ url, ok: false });
      });

    return () => {
      controller.abort();
    };
  }, [url, enabled]);

  if (!enabled) return 'missing';
  if (result?.url !== url) return 'checking';
  return result.ok ? 'ok' : 'missing';
}
