import React from 'react';
import { cn } from '../lib/utils';

export interface PageHeaderProps {
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  icon?: string;
  actions?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  icon,
  actions,
  className,
}) => {
  return (
    <div
      className={cn(
        'w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 mb-6 border-b border-outline-variant/40 transition-all',
        className
      )}
    >
      {/* Icon + Title + Description - cleanly aligned on the grid */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {icon && (
          <div className="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center shrink-0 shadow-2xs">
            <span className="material-symbols-outlined text-[20px]">
              {icon}
            </span>
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h1 className="text-lg sm:text-xl font-bold text-primary tracking-tight leading-snug">
            {title}
          </h1>

          {description && (
            <p className="text-xs text-on-surface-variant leading-normal mt-0.5 max-w-2xl line-clamp-1 sm:line-clamp-none">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Action buttons on the right - unified height & clean alignment */}
      {actions && (
        <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
          {actions}
        </div>
      )}
    </div>
  );
};
