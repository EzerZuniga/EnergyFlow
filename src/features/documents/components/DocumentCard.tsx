import { Download, Eye, FileText, Presentation } from 'lucide-react';
import { Link } from 'react-router';

import { documentPath } from '@/app/paths';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { type AcademicDocument } from '@/types/content';
import { cn } from '@/utils/cn';

import { downloadName } from '../documentFiles';
import { DocumentMeta } from './DocumentMeta';

const kindIcon = { report: FileText, slides: Presentation } as const;
const kindLabel = { report: 'Informe', slides: 'Presentación' } as const;

export function DocumentCard({ document }: { document: AcademicDocument }) {
  const Icon = kindIcon[document.kind];
  const titleId = `doc-${document.slug}-title`;

  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        'flex h-full flex-col gap-5 rounded-xl border bg-surface p-6',
        document.available ? 'border-border shadow-sm' : 'border-dashed border-border',
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex size-12 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <Icon aria-hidden="true" className="size-6" />
        </span>
        {document.available ? (
          <Badge variant="success">Disponible</Badge>
        ) : (
          <Badge variant="neutral">Aún no disponible</Badge>
        )}
      </div>

      <div className="grid gap-1.5">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {kindLabel[document.kind]}
        </p>
        <h3 id={titleId} className="text-lg font-semibold">
          {document.title}
        </h3>
        <p className="text-sm text-muted-foreground">{document.description}</p>
      </div>

      {document.available && <DocumentMeta document={document} />}

      <div className="mt-auto">
        {document.available ? (
          <div className="flex flex-wrap gap-2">
            <Button asChild>
              <Link to={documentPath(document.slug)}>
                <Eye aria-hidden="true" />
                Ver documento
                <span className="sr-only">: {document.title}</span>
              </Link>
            </Button>
            <Button asChild variant="outline">
              <a href={document.file} download={downloadName(document)}>
                <Download aria-hidden="true" />
                Descargar
                <span className="sr-only"> {document.title} (PDF)</span>
              </a>
            </Button>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Se publicará cuando el equipo entregue la versión final.
          </p>
        )}
      </div>
    </article>
  );
}
