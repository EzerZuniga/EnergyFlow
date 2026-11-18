import { getDemoModule } from '@/app/navigation';
import { EmptyState } from '@/components/feedback/EmptyState';
import { PageHeader } from '@/components/ui/page-header';

interface DemoModulePageProps {
  moduleId: string;
  description: string;
  emptyTitle: string;
  emptyDescription: string;
}

/**
 * Estructura común de un módulo de la demo: encabezado y estado vacío.
 * Cada fase posterior reemplaza el estado vacío por la funcionalidad real del módulo.
 */
export function DemoModulePage({
  moduleId,
  description,
  emptyTitle,
  emptyDescription,
}: DemoModulePageProps) {
  const module = getDemoModule(moduleId);

  return (
    <>
      <PageHeader title={module.label} icon={module.icon} description={description} />
      <EmptyState icon={module.icon} title={emptyTitle} description={emptyDescription} />
    </>
  );
}
