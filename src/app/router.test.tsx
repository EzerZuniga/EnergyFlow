import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderRoute } from '@/tests/helpers/renderRoute';

import { documentPath, paths } from './paths';

describe('router', () => {
  it('renderiza la landing en la ruta raíz', async () => {
    await renderRoute(paths.home);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'La energía también se puede calcular',
    );
  });

  it('renderiza el visor de documentos en /documentos/:slug', async () => {
    await renderRoute(documentPath('informe'));
    expect(screen.getByRole('navigation', { name: 'Ruta de navegación' })).toBeInTheDocument();
  });

  it('muestra la página 404 en una ruta desconocida', async () => {
    await renderRoute('/ruta-que-no-existe');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Página no encontrada');
    expect(screen.getByRole('link', { name: 'Volver al inicio' })).toHaveAttribute(
      'href',
      paths.home,
    );
  });
});

describe('documentPath', () => {
  it('codifica el slug para producir una URL válida', () => {
    expect(documentPath('informe')).toBe('/documentos/informe');
    expect(documentPath('a b')).toBe('/documentos/a%20b');
  });
});
