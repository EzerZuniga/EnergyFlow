import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { mockMatchMedia } from '@/tests/helpers/matchMedia';
import { PREFERENCE_KEYS } from '@/utils/constants';

import { ThemeProvider } from './ThemeProvider';

function renderToggle() {
  render(
    <ThemeProvider>
      <TooltipProvider>
        <ThemeToggle />
      </TooltipProvider>
    </ThemeProvider>,
  );
}

const html = () => document.documentElement;

describe('ThemeProvider + ThemeToggle', () => {
  it('sin preferencia guardada sigue al sistema (claro)', () => {
    renderToggle();
    expect(html()).not.toHaveClass('dark');
    expect(screen.getByRole('button', { name: 'Cambiar a tema oscuro' })).toBeInTheDocument();
  });

  it('sin preferencia guardada sigue al sistema (oscuro)', () => {
    mockMatchMedia(true);
    renderToggle();
    expect(html()).toHaveClass('dark');
  });

  it('respeta la preferencia guardada por encima del sistema', () => {
    mockMatchMedia(true);
    localStorage.setItem(PREFERENCE_KEYS.theme, 'light');
    renderToggle();
    expect(html()).not.toHaveClass('dark');
  });

  it('ignora valores guardados inválidos', () => {
    localStorage.setItem(PREFERENCE_KEYS.theme, 'morado');
    renderToggle();
    expect(html()).not.toHaveClass('dark');
  });

  it('al alternar aplica la clase y persiste la elección', () => {
    renderToggle();
    fireEvent.click(screen.getByRole('button', { name: 'Cambiar a tema oscuro' }));
    expect(html()).toHaveClass('dark');
    expect(html().style.colorScheme).toBe('dark');
    expect(localStorage.getItem(PREFERENCE_KEYS.theme)).toBe('dark');

    fireEvent.click(screen.getByRole('button', { name: 'Cambiar a tema claro' }));
    expect(html()).not.toHaveClass('dark');
    expect(localStorage.getItem(PREFERENCE_KEYS.theme)).toBe('light');
  });
});
