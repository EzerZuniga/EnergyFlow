import { FilePen } from 'lucide-react';

import { Badge } from '@/components/ui/badge';

export function DraftBadge() {
  return (
    <Badge variant="warning" title="Texto base pendiente de validar con el informe del equipo.">
      <FilePen aria-hidden="true" />
      Borrador
    </Badge>
  );
}
