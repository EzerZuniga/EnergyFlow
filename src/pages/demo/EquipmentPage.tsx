import { DemoModulePage } from './DemoModulePage';

export function EquipmentPage() {
  return (
    <DemoModulePage
      moduleId="equipos"
      description="Equipos eléctricos cuyo consumo se mide y analiza."
      emptyTitle="Aún no hay equipos registrados"
      emptyDescription="Un equipo es el aparato cuyo consumo se analiza, por ejemplo un aire acondicionado o una computadora. Cada equipo agrupa sus series de mediciones."
    />
  );
}
