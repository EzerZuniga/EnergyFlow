import { ArrowLeft, FileQuestion, FileClock } from 'lucide-react';
import { Link, useParams } from 'react-router';

import { paths } from '@/app/paths';
import { EmptyState } from '@/components/feedback/EmptyState';
import { Badge } from '@/components/ui/badge';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';
import { documents } from '@/content/documents';
import { DocumentActions, DocumentMeta, DocumentViewer } from '@/features/documents';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const documentsHref = `${paths.home}#documentos`;

function BackToDocuments() {
  return (
    <Button asChild variant="outline">
      <Link to={documentsHref}>
        <ArrowLeft aria-hidden="true" />
        Volver a documentos
      </Link>
    </Button>
  );
}

/** Visor de un documento académico: /documentos/:slug */
export function DocumentViewerPage() {
  const { slug } = useParams();
  const document = documents.find((doc) => doc.slug === slug);
  useDocumentTitle(document?.title ?? 'Documento no encontrado');

  const crumbs = [
    { label: 'Inicio', to: paths.home },
    { label: 'Documentos', to: documentsHref },
    { label: document?.title ?? 'No encontrado' },
  ];

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 sm:px-6 sm:py-12">
      <Breadcrumbs items={crumbs} />

      {!document ? (
        <>
          <h1 className="sr-only">Documento no encontrado</h1>
          <EmptyState
            icon={FileQuestion}
            title="Documento no encontrado"
            description="La dirección no corresponde a ningún documento del proyecto."
            action={<BackToDocuments />}
          />
        </>
      ) : (
        <>
          <header className="grid gap-4 border-b border-border pb-6">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-semibold sm:text-4xl">{document.title}</h1>
              {!document.available && <Badge variant="neutral">Aún no disponible</Badge>}
            </div>
            <p className="max-w-3xl text-muted-foreground">{document.description}</p>
            {document.available && (
              <div className="flex flex-wrap items-center justify-between gap-4">
                <DocumentMeta document={document} />
                <DocumentActions document={document} />
              </div>
            )}
          </header>

          {document.available ? (
            <DocumentViewer document={document} />
          ) : (
            <EmptyState
              icon={FileClock}
              title="Este documento aún no está disponible"
              description="Se publicará cuando el equipo entregue la versión final."
              action={<BackToDocuments />}
            />
          )}
        </>
      )}
    </div>
  );
}
