import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    default: 'bg-white/10 text-white border border-white/20',
    success: 'bg-green-500/20 text-green-400 border border-green-500/30',
    warning: 'bg-accent-red/20 text-accent-red border border-accent-red/30',
    error: 'bg-accent-red/20 text-accent-red border border-accent-red/30',
  };

  return (
    <span className={cn('px-2.5 py-0.5 rounded-full text-xs font-semibold backdrop-blur-md', variants[variant], className)}>
      {children}
    </span>
  );
}
