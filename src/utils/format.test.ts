import { describe, expect, it } from 'vitest';

import { formatFileSize, formatLongDate, formatPageCount, parseIsoDate } from './format';

describe('formatFileSize', () => {
  it('muestra KB por debajo de 1 MB', () => {
    expect(formatFileSize(0)).toBe('0 KB');
    expect(formatFileSize(850)).toBe('850 KB');
    expect(formatFileSize(1023.4)).toBe('1023 KB');
  });

  it('muestra MB con un decimal y coma decimal', () => {
    expect(formatFileSize(1024)).toBe('1 MB');
    expect(formatFileSize(1536)).toBe('1,5 MB');
  });

  it('rechaza valores inválidos', () => {
    expect(() => formatFileSize(-1)).toThrow(RangeError);
    expect(() => formatFileSize(Number.NaN)).toThrow(RangeError);
  });
});

describe('fechas', () => {
  it('interpreta las fechas sin hora en hora local (sin desfase de zona horaria)', () => {
    const date = parseIsoDate('2026-11-10');
    expect([date.getFullYear(), date.getMonth(), date.getDate()]).toEqual([2026, 10, 10]);
  });

  it('formatea en español', () => {
    expect(formatLongDate('2026-11-10')).toBe('10 de noviembre de 2026');
  });

  it('rechaza fechas inválidas', () => {
    expect(() => parseIsoDate('no-es-fecha')).toThrow(RangeError);
  });
});

describe('formatPageCount', () => {
  it('usa singular y plural', () => {
    expect(formatPageCount(1)).toBe('1 página');
    expect(formatPageCount(24)).toBe('24 páginas');
  });
});
