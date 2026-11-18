import { describe, expect, it } from 'vitest';

import { cn } from './cn';

describe('cn', () => {
  it('combina clases y omite valores falsy', () => {
    expect(cn('a', false, undefined, null, 'b', { c: true, d: false })).toBe('a b c');
  });

  it('resuelve conflictos de Tailwind dejando la última clase', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
  });

  it('reconoce los colores semánticos personalizados como conflicto', () => {
    expect(cn('bg-primary', 'bg-danger')).toBe('bg-danger');
  });
});
