import { SearchX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title: string;
  description?: string;
  className?: string;
}

export function EmptyState({ title, description, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center p-12 text-center text-text-muted', className)}>
      <SearchX size={64} className="mb-4 opacity-50" />
      <h3 className="text-xl font-semibold text-text-primary mb-2">{title}</h3>
      {description && <p>{description}</p>}
    </div>
  );
}
