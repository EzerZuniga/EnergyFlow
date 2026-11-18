import { Activity, Calculator, Plug, Zap } from 'lucide-react';

import { StatCard } from '@/components/ui/stat-card';

export function DashboardKpis() {
  return (
    <section aria-labelledby="indicadores-title" className="grid gap-4">
      <h2 id="indicadores-title" className="text-lg font-semibold">
        Indicadores
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Equipos registrados" value={null} icon={Plug} hint="Sin datos todavía" />
        <StatCard
          label="Series de mediciones"
          value={null}
          icon={Activity}
          hint="Sin datos todavía"
        />
        <StatCard
          label="Cálculos realizados"
          value={null}
          icon={Calculator}
          hint="Sin datos todavía"
        />
        <StatCard
          label="Energía calculada"
          value={null}
          unit="kWh"
          icon={Zap}
          hint="Sin datos todavía"
        />
      </div>
    </section>
  );
}
