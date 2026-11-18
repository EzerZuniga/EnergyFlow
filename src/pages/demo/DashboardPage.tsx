import { getDemoModule } from '@/app/navigation';
import { PageHeader } from '@/components/ui/page-header';
import { DashboardKpis, ModuleShortcuts } from '@/features/dashboard';

export function DashboardPage() {
  const module = getDemoModule('dashboard');

  return (
    <>
      <PageHeader
        title="Dashboard"
        icon={module.icon}
        description="Resumen del consumo energético de los equipos y de los cálculos realizados."
      />
      <DashboardKpis />
      <ModuleShortcuts />
    </>
  );
}
