import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { documents } from './documents';

const publicDir = join(process.cwd(), 'public');
const fileOf = (url: string) => join(publicDir, ...url.split('/').filter(Boolean));

describe('documentos ↔ public/documents', () => {
  const available = documents.filter((doc) => doc.available);

  it.each(available.map((doc) => [doc.slug, doc] as const))(
    '"%s" disponible: el archivo existe y es un PDF real',
    (_slug, doc) => {
      const path = fileOf(doc.file);
      expect(existsSync(path), `falta ${path}`).toBe(true);
      expect(readFileSync(path).subarray(0, 5).toString('latin1')).toBe('%PDF-');
    },
  );

  it.each(available.filter((doc) => doc.sizeKb !== null).map((doc) => [doc.slug, doc] as const))(
    '"%s": el tamaño declarado coincide con el archivo (±1 KB)',
    (_slug, doc) => {
      const realKb = statSync(fileOf(doc.file)).size / 1024;
      expect(Math.abs(realKb - (doc.sizeKb ?? 0))).toBeLessThanOrEqual(1);
    },
  );

  it('los documentos disponibles tienen fecha de actualización válida o null', () => {
    for (const doc of available) {
      if (doc.updatedAt !== null) expect(doc.updatedAt).toMatch(/^\d{4}-\d{2}-\d{2}/);
    }
  });

  it('no hay PDFs huérfanos en public/documents sin entrada en el manifiesto', () => {
    const dir = join(publicDir, 'documents');
    if (!existsSync(dir)) return;
    const declared = new Set(documents.map((doc) => fileOf(doc.file)));
    for (const name of readdirSync(dir).filter((file) => file.endsWith('.pdf'))) {
      expect(declared.has(join(dir, name)), `${name} no figura en src/content/documents.ts`).toBe(
        true,
      );
    }
  });
});
