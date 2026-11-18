import { type ExternalToast, toast } from 'sonner';

type Options = Pick<ExternalToast, 'description' | 'duration' | 'action' | 'id'>;

export const notify = {
  success: (title: string, options?: Options) => toast.success(title, options),
  error: (title: string, options?: Options) => toast.error(title, options),
  warning: (title: string, options?: Options) => toast.warning(title, options),
  info: (title: string, options?: Options) => toast.info(title, options),
  dismiss: (id?: string | number) => toast.dismiss(id),
};
