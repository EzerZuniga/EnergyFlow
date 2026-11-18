import { type AcademicDocument } from '@/types/content';

export const documents: AcademicDocument[] = [
  {
    slug: 'informe',
    kind: 'report',
    title: 'Informe final',
    description:
      'Documento académico con el problema, el marco teórico, la metodología y los resultados.',
    file: '/documents/informe.pdf',
    available: false,
    pages: null,
    sizeKb: null,
    updatedAt: null,
  },
  {
    slug: 'diapositivas',
    kind: 'slides',
    title: 'Diapositivas',
    description: 'Presentación utilizada en la exposición del proyecto.',
    file: '/documents/diapositivas.pdf',
    available: false,
    pages: null,
    sizeKb: null,
    updatedAt: null,
  },
];
