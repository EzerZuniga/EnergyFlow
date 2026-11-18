import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Button } from './button';

describe('Button', () => {
  it('es type="button" por defecto para no enviar formularios accidentalmente', () => {
    render(<Button>Guardar</Button>);
    expect(screen.getByRole('button', { name: 'Guardar' })).toHaveAttribute('type', 'button');
  });

  it('ejecuta onClick', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Calcular</Button>);
    fireEvent.click(screen.getByRole('button', { name: 'Calcular' }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('en estado de carga se deshabilita y anuncia que está ocupado', () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Calcular
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Calcular' });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('con asChild aplica los estilos al elemento hijo', () => {
    render(
      <Button asChild variant="outline">
        <a href="/demo">Ir a la demo</a>
      </Button>,
    );
    const link = screen.getByRole('link', { name: 'Ir a la demo' });
    expect(link).toHaveAttribute('href', '/demo');
    expect(link).toHaveAttribute('data-slot', 'button');
    expect(link.className).toContain('border');
  });
});
