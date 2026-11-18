import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { type AcademicDocument } from '@/types/content';

import { DocumentCard } from './components/DocumentCard';
import { DocumentViewer } from './components/DocumentViewer';

const availableDoc: AcademicDocument = {
  slug: 'prueba',
  kind: 'report',
  title: 'Documento de prueba',
  description: 'Fixture de pruebas.',
  file: '/documents/prueba.pdf',
  available: true,
  pages: 12,
  sizeKb: 1536,
  updatedAt: '2026-11-10',
};

const unavailableDoc: AcademicDocument = {
  ...availableDoc,
  available: false,
  pages: null,
  sizeKb: null,
  updatedAt: null,
};

function mockFetch(response: { ok: boolean; contentType: string }) {
  const fetchMock = vi.fn().mockResolvedValue({
    ok: response.ok,
    headers: new Headers({ 'content-type': response.contentType }),
  });
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('DocumentCard', () => {
  it('disponible: muestra metadatos, enlace al visor y descarga', () => {
    render(
      <MemoryRouter>
        <DocumentCard document={availableDoc} />
      </MemoryRouter>,
    );
    expect(screen.getByText('Disponible')).toBeInTheDocument();
    expect(screen.getByText('12 páginas')).toBeInTheDocument();
    expect(screen.getByText('1,5 MB')).toBeInTheDocument();
    expect(screen.getByText('10 de noviembre de 2026')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Ver documento/ })).toHaveAttribute(
      'href',
      '/documentos/prueba',
    );
    const download = screen.getByRole('link', { name: /Descargar/ });
    expect(download).toHaveAttribute('href', '/documents/prueba.pdf');
    expect(download).toHaveAttribute('download', 'EnergyFlow-prueba.pdf');
  });

  it('no disponible: sin enlaces ni metadatos inventados', () => {
    render(
      <MemoryRouter>
        <DocumentCard document={unavailableDoc} />
      </MemoryRouter>,
    );
    expect(screen.getByText('Aún no disponible')).toBeInTheDocument();
    expect(screen.queryAllByRole('link')).toHaveLength(0);
    expect(screen.queryByText(/páginas/)).not.toBeInTheDocument();
  });
});

describe('DocumentViewer', () => {
  it('verifica el archivo con HEAD y lo incrusta si es un PDF', async () => {
    const fetchMock = mockFetch({ ok: true, contentType: 'application/pdf' });
    const { container } = render(<DocumentViewer document={availableDoc} />);

    expect(screen.getByRole('status')).toHaveTextContent('Verificando el documento');
    await screen.findByLabelText('Vista previa: Documento de prueba');
    expect(fetchMock).toHaveBeenCalledWith(
      '/documents/prueba.pdf',
      expect.objectContaining({ method: 'HEAD' }),
    );
    const object = container.querySelector('object');
    expect(object).toHaveAttribute('data', '/documents/prueba.pdf');
    expect(object).toHaveAttribute('type', 'application/pdf');
  });

  it('detecta un PDF inexistente aunque el servidor responda 200 con HTML (reescritura SPA)', async () => {
    mockFetch({ ok: true, contentType: 'text/html; charset=utf-8' });
    const { container } = render(<DocumentViewer document={availableDoc} />);
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'No se encontró el archivo del documento',
    );
    expect(container.querySelector('object')).toBeNull();
  });

  it('muestra error si la petición falla', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('red')));
    render(<DocumentViewer document={availableDoc} />);
    expect(await screen.findByRole('alert')).toBeInTheDocument();
  });
});
