import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export function ErrorMessage({ message, className }: ErrorMessageProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center p-6 text-center text-accent-red', className)}>
      <AlertCircle size={48} className="mb-4" />
      <p className="text-lg font-medium">{message}</p>
    </div>
  );
}
