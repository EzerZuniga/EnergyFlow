import { Download, ExternalLink } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { type AcademicDocument } from '@/types/content';

import { downloadName } from '../documentFiles';

export function DocumentActions({
  document,
  size = 'md',
}: {
  document: AcademicDocument;
  size?: 'sm' | 'md';
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button asChild size={size}>
        <a href={document.file} download={downloadName(document)}>
          <Download aria-hidden="true" />
          Descargar
          <span className="sr-only"> {document.title} (PDF)</span>
        </a>
      </Button>
      <Button asChild size={size} variant="outline">
        <a href={document.file} target="_blank" rel="noopener">
          <ExternalLink aria-hidden="true" />
          Abrir en pestaña nueva
          <span className="sr-only"> ({document.title})</span>
        </a>
      </Button>
    </div>
  );
}
