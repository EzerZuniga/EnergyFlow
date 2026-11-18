import { useEffect } from 'react';

const SITE_NAME = 'EnergyFlow';
const DEFAULT_TITLE = `${SITE_NAME} — La energía también se puede calcular`;

export function useDocumentTitle(title?: string): void {
  useEffect(() => {
    document.title = title ? `${title} · ${SITE_NAME}` : DEFAULT_TITLE;
  }, [title]);
}
