import { CalendarDays, FileType, HardDrive, Layers } from 'lucide-react';

import { type AcademicDocument } from '@/types/content';
import { cn } from '@/utils/cn';
import { formatFileSize, formatLongDate, formatPageCount } from '@/utils/format';

export function DocumentMeta({
  document,
  className,
}: {
  document: AcademicDocument;
  className?: string;
}) {
  const items = [
    { icon: FileType, label: 'Formato', value: 'PDF' },
    document.pages !== null && {
      icon: Layers,
      label: 'Extensión',
      value: formatPageCount(document.pages),
    },
    document.sizeKb !== null && {
      icon: HardDrive,
      label: 'Tamaño',
      value: formatFileSize(document.sizeKb),
    },
    document.updatedAt !== null && {
      icon: CalendarDays,
      label: 'Actualizado',
      value: formatLongDate(document.updatedAt),
    },
  ].filter((item) => item !== false);

  return (
    <dl className={cn('flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground', className)}>
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-1.5">
          <item.icon aria-hidden="true" className="size-4" />
          <dt className="sr-only">{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
