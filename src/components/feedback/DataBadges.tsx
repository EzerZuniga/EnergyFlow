import { Clock, FlaskConical } from 'lucide-react';

import { Badge } from '@/components/ui/badge';

export function DemoDataBadge({ className }: { className?: string }) {
  return (
    <Badge
      variant="accent"
      className={className}
      title="Datos de ejemplo incluidos para la demostración; no corresponden a mediciones reales."
    >
      <FlaskConical aria-hidden="true" />
      Datos de demostración
    </Badge>
  );
}

export function PlaceholderBadge({ className }: { className?: string }) {
  return (
    <Badge
      variant="warning"
      className={className}
      title="Contenido provisional: se reemplazará con la información real del equipo."
    >
      <Clock aria-hidden="true" />
      Información pendiente
    </Badge>
  );
}
