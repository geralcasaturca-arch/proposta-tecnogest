import React from 'react';
import { Button } from './Button';

export interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  isConfirming?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'danger' | 'primary' | 'secondary';
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  isConfirming = false,
  onConfirm,
  onCancel,
  variant = 'danger'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant shadow-2xl w-full max-w-md animate-in fade-in zoom-in-95 duration-150 overflow-hidden">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-full shrink-0 flex items-center justify-center ${
              variant === 'danger' ? 'bg-red-100 text-red-600' : 
              variant === 'primary' ? 'bg-primary-fixed text-primary' : 
              'bg-secondary-container text-on-secondary-container'
            }`}>
              <span className="material-symbols-outlined text-[24px]">
                {variant === 'danger' ? 'warning' : 'info'}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-on-surface mb-2">{title}</h3>
              <div className="text-sm text-on-surface-variant leading-relaxed">
                {message}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-surface-container-low px-6 py-4 flex items-center justify-end gap-3 border-t border-outline-variant/50">
          <Button
            variant="ghost"
            onClick={onCancel}
            disabled={isConfirming}
          >
            {cancelText}
          </Button>
          <Button
            variant={variant}
            onClick={onConfirm}
            loading={isConfirming}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};
