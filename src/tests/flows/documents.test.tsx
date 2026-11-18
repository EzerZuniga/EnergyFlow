import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { documents } from '@/content/documents';
import { renderRoute } from '@/tests/helpers/renderRoute';

describe('página del visor /documentos/:slug', () => {
  it('slug desconocido: "Documento no encontrado" con enlace de regreso', async () => {
    await renderRoute('/documentos/no-existe');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Documento no encontrado');
    expect(screen.getByRole('link', { name: /Volver a documentos/ })).toHaveAttribute(
      'href',
      '/#documentos',
    );
    expect(document.title).toBe('Documento no encontrado · EnergyFlow');
  });

  it.each(documents.filter((doc) => !doc.available).map((doc) => [doc.slug, doc] as const))(
    'documento "%s" no disponible: estado explícito, sin visor ni descarga',
    async (_slug, doc) => {
      await renderRoute(`/documentos/${doc.slug}`);
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(doc.title);
      expect(screen.getByText('Este documento aún no está disponible')).toBeInTheDocument();
      expect(screen.queryByRole('link', { name: /Descargar/ })).not.toBeInTheDocument();
      expect(document.querySelector('object')).toBeNull();
      // Migas de pan: Inicio / Documentos / título actual
      const current = screen.getByRole('navigation', { name: 'Ruta de navegación' });
      expect(current).toHaveTextContent(`InicioDocumentos${doc.title}`);
    },
  );
});
