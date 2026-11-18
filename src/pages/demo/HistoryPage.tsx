import { DemoModulePage } from './DemoModulePage';

export function HistoryPage() {
  return (
    <DemoModulePage
      moduleId="historial"
      description="Registro de los cálculos realizados en este navegador."
      emptyTitle="El historial está vacío"
      emptyDescription="Cada cálculo se guarda aquí con su equipo, método, resultado, procedimiento y origen de las mediciones."
    />
  );
}
