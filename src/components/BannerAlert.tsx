import React from 'react';
import { useApp } from '../context/AppContext';

export const BannerAlert: React.FC = () => {
  const { siteSettings, setCurrentView } = useApp();
  const { bannerAlert } = siteSettings;

  if (!bannerAlert || !bannerAlert.enabled || !bannerAlert.text) {
    return null;
  }

  const getStyleClasses = () => {
    switch (bannerAlert.type) {
      case 'highlight':
        return 'bg-secondary-container text-on-secondary-container border-b border-amber-300';
      case 'emerald':
        return 'bg-emerald-600 text-white border-b border-emerald-700';
      case 'warning':
        return 'bg-amber-600 text-white border-b border-amber-700';
      case 'info':
      default:
        return 'bg-primary text-on-primary border-b border-primary-container';
    }
  };

  return (
    <div className={`w-full py-1 px-3 text-[11px] font-semibold flex items-center justify-center transition-colors ${getStyleClasses()}`}>
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-1.5 text-center leading-none">
        {bannerAlert.badgeText && (
          <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase bg-black/15 tracking-wide">
            {bannerAlert.badgeText}
          </span>
        )}
        <span>{bannerAlert.text}</span>
        {bannerAlert.linkText && (
          <button
            onClick={() => setCurrentView(bannerAlert.linkView || 'enroll')}
            className="underline font-extrabold hover:opacity-80 transition-opacity ml-1 cursor-pointer flex items-center gap-0.5"
          >
            <span>{bannerAlert.linkText}</span>
            <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
          </button>
        )}
      </div>
    </div>
  );
};
