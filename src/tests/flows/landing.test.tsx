import { fireEvent, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { documents } from '@/content/documents';
import { landingSections } from '@/content/site';
import { team } from '@/content/team';
import { renderRoute } from '@/tests/helpers/renderRoute';

async function renderLanding() {
  await renderRoute('/');
}

describe('landing académica', () => {
  it('tiene un único h1 y una sección con encabezado por cada entrada de navegación', async () => {
    await renderLanding();
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);

    for (const section of landingSections) {
      const element = document.getElementById(section.id);
      expect(element, `falta la sección #${section.id}`).not.toBeNull();
      expect(element!.tagName).toBe('SECTION');
      expect(element).toHaveAttribute('aria-labelledby');
    }
  });

  it('la navegación principal enlaza a anclas existentes', async () => {
    await renderLanding();
    const nav = screen.getByRole('navigation', { name: 'Principal' });
    const links = within(nav).getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      const hash = link.getAttribute('href')?.split('#')[1];
      expect(hash).toBeTruthy();
      expect(document.getElementById(hash!)).not.toBeNull();
    }
  });

  it('el footer enlaza a todas las secciones', async () => {
    await renderLanding();
    const footerNav = screen.getByRole('navigation', { name: 'Secciones del sitio' });
    expect(within(footerNav).getAllByRole('link')).toHaveLength(landingSections.length);
  });

  it('muestra los seis integrantes como pendientes sin inventar nombres', async () => {
    await renderLanding();
    const teamSection = document.getElementById('equipo')!;
    const cards = within(teamSection).getAllByRole('article');
    expect(cards).toHaveLength(team.length);
    expect(within(teamSection).getByText('Información pendiente')).toBeInTheDocument();
    expect(within(teamSection).getByText('Integrante 1')).toBeInTheDocument();
    expect(within(teamSection).getAllByText('Rol por definir')).toHaveLength(6);
  });

  it('los documentos no disponibles no tienen enlaces (evita enlaces rotos)', async () => {
    await renderLanding();
    const docsSection = document.getElementById('documentos')!;
    const unavailable = documents.filter((doc) => !doc.available);
    expect(within(docsSection).getAllByText('Aún no disponible')).toHaveLength(unavailable.length);
    if (documents.every((doc) => !doc.available)) {
      expect(within(docsSection).queryAllByRole('link')).toHaveLength(0);
    }
  });

  it('marca como borrador el contenido académico pendiente de validar', async () => {
    await renderLanding();
    for (const id of ['problema', 'objetivos', 'justificacion']) {
      expect(within(document.getElementById(id)!).getByText('Borrador')).toBeInTheDocument();
    }
  });

  it('la sección Demo, el hero y el header enlazan a la demo', async () => {
    await renderLanding();
    const demoSection = document.getElementById('demo')!;
    expect(within(demoSection).getByRole('link', { name: /Abrir la demo/ })).toHaveAttribute(
      'href',
      '/demo',
    );
    expect(screen.getByRole('link', { name: /Explorar la demo/ })).toHaveAttribute('href', '/demo');
    expect(screen.getByRole('link', { name: /Ver demo/ })).toHaveAttribute('href', '/demo');
  });

  it('el menú móvil se abre, lista las secciones y se cierra al elegir una', async () => {
    await renderLanding();
    fireEvent.click(screen.getByRole('button', { name: 'Abrir menú' }));
    const dialog = await screen.findByRole('dialog');
    const links = within(dialog).getAllByRole('link');
    expect(links).toHaveLength(landingSections.length);

    fireEvent.click(within(dialog).getByRole('link', { name: 'Equipo' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
