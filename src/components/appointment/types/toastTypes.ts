
export interface ToastFunction {
  (props: {
    title?: string;
    description?: string;
    variant?: 'default' | 'destructive';
  }): void;
}

export interface ToastProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
}
