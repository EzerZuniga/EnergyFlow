import { describe, expect, it } from 'vitest';

import { documents } from './documents';
import { academicInfo, objectives, problem } from './project';
import { landingSections } from './site';
import { team } from './team';

describe('contenido académico', () => {
  it('el equipo tiene exactamente seis integrantes con id único', () => {
    expect(team).toHaveLength(6);
    expect(new Set(team.map((member) => member.id)).size).toBe(6);
  });

  it('las fotos de los integrantes, si existen, apuntan a /images/team/', () => {
    for (const member of team) {
      if (member.photo !== null) expect(member.photo).toMatch(/^\/images\/team\/.+/);
    }
  });

  it('los documentos tienen slug único y apuntan a /documents/*.pdf', () => {
    expect(new Set(documents.map((doc) => doc.slug)).size).toBe(documents.length);
    for (const doc of documents) expect(doc.file).toMatch(/^\/documents\/[\w-]+\.pdf$/);
  });

  it('los ids de sección son únicos y válidos como ancla', () => {
    const ids = landingSections.map((section) => section.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^[a-z]+$/);
  });

  it('no inventa datos institucionales: lo no proporcionado permanece en null', () => {
    for (const value of [academicInfo.institution, academicInfo.instructor, academicInfo.period]) {
      if (value !== null) expect(value.trim()).not.toBe('');
    }
  });

  it('los textos no están vacíos', () => {
    const texts = [
      objectives.general.text,
      ...objectives.specific.map((item) => item.text),
      ...problem.context.map((item) => item.text),
      problem.question.text,
    ];
    for (const text of texts) expect(text.trim().length).toBeGreaterThan(10);
  });
});
