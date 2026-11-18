import { FileX2, MonitorSmartphone } from 'lucide-react';

import { ErrorState } from '@/components/feedback/ErrorState';
import { LoadingState } from '@/components/feedback/LoadingState';
import { type AcademicDocument } from '@/types/content';

import { usePdfAvailability } from '../hooks/usePdfAvailability';
import { DocumentActions } from './DocumentActions';

export function DocumentViewer({ document }: { document: AcademicDocument }) {
  const status = usePdfAvailability(document.file, document.available);

  if (status === 'checking') {
    return <LoadingState label="Verificando el documento…" />;
  }

  if (status === 'missing') {
    return (
      <ErrorState
        title="No se encontró el archivo del documento"
        description={`El documento figura como disponible, pero ${document.file} no existe o no es un PDF válido. Revisa public/documents y src/content/documents.ts.`}
      />
    );
  }

  return (
    <div className="grid gap-3">
      <object
        data={document.file}
        type="application/pdf"
        aria-label={`Vista previa: ${document.title}`}
        className="h-[80dvh] min-h-[28rem] w-full rounded-xl border border-border bg-muted"
      >
        <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
          <FileX2 aria-hidden="true" className="size-10 text-muted-foreground" />
          <div className="grid max-w-sm gap-1">
            <p className="font-semibold">Tu navegador no puede mostrar el PDF aquí</p>
            <p className="text-sm text-muted-foreground">
              Descárgalo o ábrelo en una pestaña nueva para leerlo.
            </p>
          </div>
          <DocumentActions document={document} size="sm" />
        </div>
      </object>
      <p className="flex items-center gap-2 text-xs text-muted-foreground md:hidden">
        <MonitorSmartphone aria-hidden="true" className="size-4 shrink-0" />
        En móviles, abrir el documento en una pestaña nueva ofrece una mejor lectura.
      </p>
    </div>
  );
}
