import { Info, Plug, Plus } from 'lucide-react';

import { EmptyState } from '@/components/feedback/EmptyState';
import { ErrorState } from '@/components/feedback/ErrorState';
import { LoadingState } from '@/components/feedback/LoadingState';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { notify } from '@/components/ui/notify';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip } from '@/components/ui/tooltip';

import { Section, Subsection } from './Section';

export function FeedbackSection() {
  return (
    <Section
      id="retroalimentacion"
      title="Retroalimentación"
      description="Mensajes, estados, diálogos y notificaciones."
    >
      <Subsection title="Mensajes en línea">
        <div className="grid gap-3 md:grid-cols-2">
          <Alert variant="info">
            <AlertTitle>Simpson 1/3</AlertTitle>
            <AlertDescription>Requiere un número par de subintervalos.</AlertDescription>
          </Alert>
          <Alert variant="success">
            <AlertTitle>Cálculo completado</AlertTitle>
            <AlertDescription>El resultado se guardó en el historial.</AlertDescription>
          </Alert>
          <Alert variant="warning">
            <AlertTitle>Intervalos no uniformes</AlertTitle>
            <AlertDescription>Solo se puede aplicar la regla del trapecio.</AlertDescription>
          </Alert>
          <Alert variant="danger">
            <AlertTitle>No se puede calcular</AlertTitle>
            <AlertDescription>Se necesitan al menos dos mediciones.</AlertDescription>
          </Alert>
        </div>
      </Subsection>

      <Subsection title="Estados de sección">
        <div className="grid gap-4 lg:grid-cols-3">
          <EmptyState
            icon={Plug}
            title="Aún no hay equipos"
            description="Registra un equipo para empezar a cargar mediciones."
            action={
              <Button size="sm">
                <Plus aria-hidden="true" />
                Registrar equipo
              </Button>
            }
          />
          <ErrorState
            description="Los datos guardados están dañados."
            onRetry={() => notify.info('Reintento solicitado')}
          />
          <div className="grid content-start gap-3 rounded-xl border border-border bg-surface p-5">
            <LoadingState label="Cargando mediciones…" className="py-4" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </Subsection>

      <Subsection title="Diálogos y tooltip">
        <div className="flex flex-wrap items-center gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Abrir diálogo</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Detalle del cálculo</DialogTitle>
                <DialogDescription>
                  Los diálogos se cierran con Escape, el botón X o un clic fuera.
                </DialogDescription>
              </DialogHeader>
              <p className="text-sm">Contenido del diálogo.</p>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cerrar</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Eliminar equipo</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Eliminar este equipo?</AlertDialogTitle>
                <AlertDialogDescription>
                  Se eliminarán también sus series de mediciones. Esta acción no se puede deshacer.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={() => notify.success('Equipo eliminado (ejemplo)')}>
                  Eliminar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Tooltip content="Información complementaria">
            <Button variant="ghost" size="icon" aria-label="Más información">
              <Info aria-hidden="true" />
            </Button>
          </Tooltip>
        </div>
      </Subsection>

      <Subsection title="Notificaciones">
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={() =>
              notify.success('Equipo registrado', { description: 'Aire acondicionado (ejemplo)' })
            }
          >
            Éxito
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              notify.error('No se pudo importar el CSV', { description: 'Fila 4: potencia vacía.' })
            }
          >
            Error
          </Button>
          <Button variant="outline" onClick={() => notify.warning('Intervalos no uniformes')}>
            Advertencia
          </Button>
          <Button variant="outline" onClick={() => notify.info('Datos de demostración cargados')}>
            Información
          </Button>
        </div>
      </Subsection>
    </Section>
  );
}
