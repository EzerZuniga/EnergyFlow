/** Formatos de presentación en español. Funciones puras y sin dependencias. */

const LOCALE = 'es';

const decimal = new Intl.NumberFormat(LOCALE, { maximumFractionDigits: 1 });

/** Tamaño de archivo a partir de kilobytes: 850 → "850 KB", 1536 → "1,5 MB". */
export function formatFileSize(kilobytes: number): string {
  if (!Number.isFinite(kilobytes) || kilobytes < 0) {
    throw new RangeError(`Tamaño inválido: ${kilobytes}`);
  }
  if (kilobytes < 1024) return `${decimal.format(Math.round(kilobytes))} KB`;
  return `${decimal.format(kilobytes / 1024)} MB`;
}

const DATE_ONLY = /^(\d{4})-(\d{2})-(\d{2})$/;

/**
 * Convierte una fecha ISO en Date. Las fechas sin hora ("2026-11-10") se interpretan
 * en hora LOCAL: `new Date("2026-11-10")` usaría UTC y en Perú (UTC−5) mostraría el día anterior.
 */
export function parseIsoDate(value: string): Date {
  const match = DATE_ONLY.exec(value);
  const date = match
    ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
    : new Date(value);
  if (Number.isNaN(date.getTime())) throw new RangeError(`Fecha inválida: ${value}`);
  return date;
}

const longDate = new Intl.DateTimeFormat(LOCALE, { dateStyle: 'long' });

/** "2026-11-10" → "10 de noviembre de 2026". */
export function formatLongDate(value: string): string {
  return longDate.format(parseIsoDate(value));
}

/** Número de páginas: 1 → "1 página", 24 → "24 páginas". */
export function formatPageCount(pages: number): string {
  return `${pages} ${pages === 1 ? 'página' : 'páginas'}`;
}
