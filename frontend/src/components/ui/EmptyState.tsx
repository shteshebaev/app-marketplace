import type { ReactNode } from 'react';
import { Button } from './Button';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={`
        flex flex-col items-center justify-center
        py-20 px-6
        animate-fade-in
        ${className}
      `}
    >
      {/* Icon container */}
      <div
        className="
          w-16 h-16
          flex items-center justify-center
          bg-gray-100 dark:bg-[#2C2C2E] rounded-full
          mb-6
          text-gray-400
        "
      >
        {icon}
      </div>

      {/* Title */}
      <h3
        className="
          text-h3 text-text-primary
          mb-2
          text-center
        "
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className="
          text-body-sm text-text-secondary
          mb-8
          text-center
          max-w-sm
        "
      >
        {description}
      </p>

      {/* Action button */}
      {actionLabel && onAction && (
        <Button variant="primary" size="md" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
