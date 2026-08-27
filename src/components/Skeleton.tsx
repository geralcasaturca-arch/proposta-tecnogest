import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  className?: string;
  animate?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rounded',
  width,
  height,
  className = '',
  animate = true,
  style,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'circular':
        return 'rounded-full';
      case 'text':
        return 'rounded-md h-4 my-1';
      case 'rectangular':
        return 'rounded-none';
      case 'rounded':
      default:
        return 'rounded-xl';
    }
  };

  const inlineStyles: React.CSSProperties = {
    ...(width !== undefined ? { width: typeof width === 'number' ? `${width}px` : width } : {}),
    ...(height !== undefined ? { height: typeof height === 'number' ? `${height}px` : height } : {}),
    ...style,
  };

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={`bg-surface-container-high/80 ${
        animate ? 'animate-pulse' : ''
      } ${getVariantStyles()} ${className}`}
      style={inlineStyles}
      {...props}
    >
      <span className="sr-only">A carregar conteúdo...</span>
    </div>
  );
};

export const SkeletonText: React.FC<{
  lines?: number;
  className?: string;
  lastLineWidth?: string;
}> = ({ lines = 3, className = '', lastLineWidth = '75%' }) => {
  return (
    <div className={`space-y-2.5 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          width={index === lines - 1 ? lastLineWidth : '100%'}
          className="h-3.5 bg-surface-container-high"
        />
      ))}
    </div>
  );
};

export const CourseDetailSkeleton: React.FC = () => {
  return (
    <div className="w-full bg-background pb-20 md:pb-12">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-6 md:py-10">
        {/* Breadcrumb Skeleton */}
        <div className="mb-6 flex items-center gap-2">
          <Skeleton width={60} height={16} />
          <span className="text-outline/40">/</span>
          <Skeleton width={160} height={16} />
        </div>

        {/* 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Main Content (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Banner/Hero Card Skeleton */}
            <div className="rounded-2xl overflow-hidden shadow-sm border border-outline-variant bg-surface-container-lowest">
              <Skeleton className="aspect-video sm:aspect-21/9 w-full rounded-none" />
              <div className="p-6 md:p-8 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <Skeleton width="60%" height={32} />
                  <Skeleton width={100} height={28} />
                </div>
                <SkeletonText lines={3} />
              </div>
            </div>

            {/* Syllabus / Content Section Skeleton */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 border border-outline-variant shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-outline-variant/40 pb-3">
                <Skeleton variant="circular" width={28} height={28} />
                <Skeleton width={220} height={24} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton variant="circular" width={20} height={20} className="shrink-0" />
                    <Skeleton width="85%" height={16} />
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements & Career Outcomes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-surface-container-low/60 rounded-2xl p-6 border border-outline-variant space-y-3">
                <div className="flex items-center gap-2">
                  <Skeleton variant="circular" width={22} height={22} />
                  <Skeleton width={160} height={20} />
                </div>
                <SkeletonText lines={4} />
              </div>
              <div className="bg-surface-container-low/60 rounded-2xl p-6 border border-outline-variant space-y-3">
                <div className="flex items-center gap-2">
                  <Skeleton variant="circular" width={22} height={22} />
                  <Skeleton width={160} height={20} />
                </div>
                <SkeletonText lines={4} />
              </div>
            </div>

            {/* Reviews Skeleton */}
            <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-6 sm:p-8 space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-outline-variant/40">
                <div className="space-y-2">
                  <Skeleton width={180} height={22} />
                  <Skeleton width={260} height={14} />
                </div>
                <Skeleton width={140} height={38} className="rounded-xl" />
              </div>
              <div className="bg-surface-container-low/50 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center">
                <div className="space-y-2 text-center md:pr-6 md:border-r border-outline-variant/60">
                  <Skeleton width={80} height={40} className="mx-auto" />
                  <Skeleton width={120} height={16} className="mx-auto" />
                </div>
                <div className="flex-1 w-full space-y-2">
                  <Skeleton height={14} className="w-full rounded-full" />
                  <Skeleton height={14} className="w-[85%] rounded-full" />
                  <Skeleton height={14} className="w-[60%] rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-lg overflow-hidden">
              <div className="bg-primary/20 p-6 space-y-2">
                <Skeleton width={140} height={24} className="mx-auto" />
                <Skeleton width={180} height={14} className="mx-auto" />
              </div>
              <div className="p-6 space-y-5">
                <div className="flex justify-between items-center pb-3 border-b border-outline-variant/40">
                  <Skeleton width={80} height={16} />
                  <Skeleton width={90} height={18} />
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-outline-variant/40">
                  <Skeleton width={100} height={16} />
                  <Skeleton width={120} height={26} />
                </div>
                <div className="space-y-3 pt-2">
                  <Skeleton height={46} className="w-full rounded-xl" />
                  <Skeleton height={46} className="w-full rounded-xl" />
                </div>
              </div>
            </div>

            {/* Polo Location Card Skeleton */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant shadow-sm space-y-4">
              <Skeleton width={140} height={18} />
              <div className="flex flex-wrap gap-2">
                <Skeleton width={70} height={26} />
                <Skeleton width={80} height={26} />
                <Skeleton width={75} height={26} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AdminCoursesTableSkeleton: React.FC<{ rows?: number }> = ({ rows = 6 }) => {
  return (
    <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-on-surface border-collapse min-w-[700px]">
          <thead className="bg-surface-container-low border-b border-outline-variant">
            <tr>
              <th className="py-3.5 px-4"><Skeleton width={100} height={14} /></th>
              <th className="py-3.5 px-4"><Skeleton width={70} height={14} /></th>
              <th className="py-3.5 px-4"><Skeleton width={90} height={14} /></th>
              <th className="py-3.5 px-4"><Skeleton width={75} height={14} /></th>
              <th className="py-3.5 px-4"><Skeleton width={80} height={14} /></th>
              <th className="py-3.5 px-4"><Skeleton width={60} height={14} /></th>
              <th className="py-3.5 px-4 text-right"><Skeleton width={50} height={14} className="ml-auto" /></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/40">
            {Array.from({ length: rows }).map((_, index) => (
              <tr key={index} className="hover:bg-surface-container-low/30">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <Skeleton variant="rounded" width={48} height={48} className="shrink-0" />
                    <div className="space-y-1.5 flex-1">
                      <Skeleton width="70%" height={16} />
                      <Skeleton width="40%" height={12} />
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4"><Skeleton width={60} height={14} /></td>
                <td className="py-3.5 px-4"><Skeleton width={80} height={16} /></td>
                <td className="py-3.5 px-4"><Skeleton width={70} height={14} /></td>
                <td className="py-3.5 px-4">
                  <div className="flex gap-1">
                    <Skeleton width={45} height={20} />
                    <Skeleton width={45} height={20} />
                  </div>
                </td>
                <td className="py-3.5 px-4"><Skeleton width={64} height={24} className="rounded-full" /></td>
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Skeleton width={32} height={32} className="rounded-xl" />
                    <Skeleton width={32} height={32} className="rounded-xl" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
