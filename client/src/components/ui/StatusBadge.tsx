
import { cn } from '@/lib/utils';
import { getStatusColor } from '@/utils/formatters';

interface StatusBadgeProps {
  status: boolean;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const label = status ? 'Paid' : 'Unpaid';

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        getStatusColor(label),
        className
      )}
    >
      {label}
    </span>
  );
};
