import React from 'react';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'whatsapp'
  | 'danger'
  | 'accent';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: string;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[#0A2558] text-white hover:bg-[#0E3275] active:bg-[#071B40] shadow-xs hover:shadow-sm border border-transparent',
  secondary:
    'bg-[#00D2FF] text-[#0A2558] hover:bg-[#33DCFF] active:bg-[#00BCE5] font-extrabold shadow-xs hover:shadow-sm border border-transparent',
  accent:
    'bg-[#0284C7] text-white hover:bg-[#0369A1] active:bg-[#075985] shadow-xs hover:shadow-sm border border-transparent',
  outline:
    'bg-white text-[#0A2558] border border-slate-300 hover:border-[#0A2558] hover:bg-slate-50/80 active:bg-slate-100 shadow-2xs',
  ghost:
    'bg-transparent text-slate-700 hover:text-[#0A2558] hover:bg-slate-100/70 active:bg-slate-200/70 border border-transparent',
  whatsapp:
    'bg-[#25D366] text-white hover:bg-[#20BA5A] active:bg-[#1DA851] shadow-xs hover:shadow-sm border border-transparent',
  danger:
    'bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 shadow-xs hover:shadow-sm border border-transparent',
};

const sizeStyles: Record<ButtonSize, { container: string; icon: string; text: string }> = {
  sm: {
    container: 'h-8 px-3.5 text-xs gap-1.5 rounded-lg font-bold',
    icon: 'text-[15px]',
    text: 'text-xs',
  },
  md: {
    container: 'h-10 px-5 text-xs sm:text-sm gap-2 rounded-xl font-bold',
    icon: 'text-[18px]',
    text: 'text-xs sm:text-sm',
  },
  lg: {
    container: 'h-11 px-6 text-sm gap-2.5 rounded-xl font-extrabold',
    icon: 'text-[19px]',
    text: 'text-sm',
  },
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  fullWidth = false,
  className = '',
  disabled,
  children,
  ...props
}) => {
  const currentSize = sizeStyles[size];
  const currentVariant = variantStyles[variant];

  return (
    <button
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center
        whitespace-nowrap transition-all duration-150
        cursor-pointer select-none tracking-tight
        disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
        active:scale-[0.98]
        ${currentSize.container}
        ${currentVariant}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      {...props}
    >
      {loading ? (
        <>
          <span className="animate-spin material-symbols-outlined text-[16px]">
            progress_activity
          </span>
          <span>A carregar...</span>
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <span className={`material-symbols-outlined shrink-0 ${currentSize.icon}`}>
              {icon}
            </span>
          )}
          <span className="truncate">{children}</span>
          {icon && iconPosition === 'right' && (
            <span className={`material-symbols-outlined shrink-0 ${currentSize.icon}`}>
              {icon}
            </span>
          )}
        </>
      )}
    </button>
  );
};
