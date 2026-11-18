import { DemoModulePage } from './DemoModulePage';

export function ReportsPage() {
  return (
    <DemoModulePage
      moduleId="reportes"
      description="Exportación de cálculos a documentos PDF."
      emptyTitle="No hay cálculos para reportar"
      emptyDescription="Un reporte PDF reúne los datos, la fórmula, el procedimiento y las gráficas de un cálculo del historial."
    />
  );
}
