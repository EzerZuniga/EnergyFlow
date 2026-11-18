import { type ComponentProps } from 'react';

import { cn } from '@/utils/cn';

export function Table({ className, ...props }: ComponentProps<'table'>) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto rounded-lg border border-border bg-surface"
    >
      <table
        data-slot="table"
        className={cn('w-full caption-bottom border-collapse text-sm', className)}
        {...props}
      />
    </div>
  );
}

export function TableHeader({ className, ...props }: ComponentProps<'thead'>) {
  return <thead data-slot="table-header" className={cn('bg-muted/60', className)} {...props} />;
}

export function TableBody({ className, ...props }: ComponentProps<'tbody'>) {
  return (
    <tbody
      data-slot="table-body"
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  );
}

export function TableFooter({ className, ...props }: ComponentProps<'tfoot'>) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn('border-t border-border bg-muted/60 font-medium', className)}
      {...props}
    />
  );
}

export function TableRow({ className, ...props }: ComponentProps<'tr'>) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        'border-b border-border transition-colors hover:bg-muted/40 data-[state=selected]:bg-muted',
        className,
      )}
      {...props}
    />
  );
}

interface CellProps {
  numeric?: boolean;
}

export function TableHead({ className, numeric, ...props }: ComponentProps<'th'> & CellProps) {
  return (
    <th
      data-slot="table-head"
      scope="col"
      className={cn(
        'h-10 px-3 text-left align-middle text-xs font-semibold whitespace-nowrap text-muted-foreground',
        numeric && 'text-right',
        className,
      )}
      {...props}
    />
  );
}

export function TableCell({ className, numeric, ...props }: ComponentProps<'td'> & CellProps) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        'px-3 py-2.5 align-middle',
        numeric && 'text-right font-mono tabular-nums',
        className,
      )}
      {...props}
    />
  );
}

export function TableCaption({ className, ...props }: ComponentProps<'caption'>) {
  return (
    <caption
      data-slot="table-caption"
      className={cn('px-3 py-3 text-left text-xs text-muted-foreground', className)}
      {...props}
    />
  );
}
