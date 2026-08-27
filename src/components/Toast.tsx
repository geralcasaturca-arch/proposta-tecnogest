import React from 'react';
import { useApp } from '../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 bg-primary text-on-primary rounded-xl shadow-2xl border border-primary-container text-sm font-medium animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <div className="flex items-center gap-2">
            <span
              className={`material-symbols-outlined text-[18px] ${
                toast.type === 'error'
                  ? 'text-error'
                  : toast.type === 'info'
                  ? 'text-secondary-fixed'
                  : 'text-[#4ade80]'
              }`}
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {toast.type === 'error' ? 'error' : toast.type === 'info' ? 'info' : 'check_circle'}
            </span>
            <span>{toast.message}</span>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-on-primary/60 hover:text-on-primary p-1 rounded transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      ))}
    </div>
  );
};
