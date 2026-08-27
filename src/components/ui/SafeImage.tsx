import React, { useState, useEffect } from 'react';

// Curated SVG fallbacks with industrial styling and Técnogest color palette
export const getFallbackSvg = (category: string = 'industrial', title: string = 'Técnogest'): string => {
  const cleanTitle = (title || 'Técnogest').replace(/[<>&"]/g, '');
  
  let iconName = 'engineering';
  let badgeText = 'FORMAÇÃO PROFISSIONAL';
  let gradientFrom = '#0A2558';
  let gradientTo = '#164E63';
  let accentColor = '#00D2FF';

  const catLower = (category || '').toLowerCase();

  if (catLower.includes('rigger') || catLower.includes('manobra') || catLower.includes('carga')) {
    iconName = 'precision_manufacturing';
    badgeText = 'RIGGER & OPERAÇÕES';
    gradientFrom = '#0A2558';
    gradientTo = '#1E3A8A';
    accentColor = '#38BDF8';
  } else if (catLower.includes('qualidade') || catLower.includes('cq') || catLower.includes('inspeção')) {
    iconName = 'verified_user';
    badgeText = 'CONTROLO DE QUALIDADE';
    gradientFrom = '#0F172A';
    gradientTo = '#1E293B';
    accentColor = '#10B981';
  } else if (catLower.includes('soldadura') || catLower.includes('tubista') || catLower.includes('eletricidade')) {
    iconName = 'handyman';
    badgeText = 'OFICINA INDUSTRIAL';
    gradientFrom = '#1E1B4B';
    gradientTo = '#312E81';
    accentColor = '#F59E0B';
  } else if (catLower.includes('segurança') || catLower.includes('hst') || catLower.includes('qhse')) {
    iconName = 'health_and_safety';
    badgeText = 'HIGIENE & SEGURANÇA';
    gradientFrom = '#14532D';
    gradientTo = '#064E3B';
    accentColor = '#34D399';
  } else if (catLower.includes('polo') || catLower.includes('unidade') || catLower.includes('viana') || catLower.includes('valódia')) {
    iconName = 'domain';
    badgeText = 'POLO TÉCNOGEST';
    gradientFrom = '#0A2558';
    gradientTo = '#0F766E';
    accentColor = '#2DD4BF';
  } else if (catLower.includes('portugal') || catLower.includes('aeroporto')) {
    iconName = 'flight_takeoff';
    badgeText = 'PLANO PORTUGAL';
    gradientFrom = '#881337';
    gradientTo = '#9F1239';
    accentColor = '#FDA4AF';
  }

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${gradientFrom}" />
      <stop offset="100%" stop-color="${gradientTo}" />
    </linearGradient>
    <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
    </pattern>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="${accentColor}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="800" height="500" fill="url(#bgGrad)"/>
  <rect width="800" height="500" fill="url(#grid)"/>
  <circle cx="400" cy="220" r="260" fill="url(#glow)"/>

  <!-- Top Ribbon / Tech Line -->
  <line x1="60" y1="50" x2="740" y2="50" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" stroke-dasharray="4,4"/>
  <circle cx="60" cy="50" r="3" fill="${accentColor}"/>
  <circle cx="740" cy="50" r="3" fill="${accentColor}"/>

  <!-- Badge -->
  <g transform="translate(60, 80)">
    <rect width="220" height="28" rx="6" fill="${accentColor}" fill-opacity="0.18" stroke="${accentColor}" stroke-opacity="0.4" stroke-width="1"/>
    <text x="14" y="18" fill="${accentColor}" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="800" letter-spacing="1.5">${badgeText.replace(/&/g, '&amp;')}</text>
  </g>

  <!-- Central Technical Graphic -->
  <g transform="translate(400, 220)">
    <!-- Outer Rings -->
    <circle cx="0" cy="0" r="70" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
    <circle cx="0" cy="0" r="54" fill="rgba(255,255,255,0.04)" stroke="${accentColor}" stroke-width="1.5" stroke-dasharray="6,4"/>
    <circle cx="0" cy="0" r="40" fill="${accentColor}" fill-opacity="0.15"/>
    
    <!-- Crane / Industrial Silhouette Icon in SVG -->
    <path d="M -15 20 L -15 -10 L 0 -24 L 15 -10 L 15 20 Z" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M 0 -24 L 25 -32 L 25 15" fill="none" stroke="${accentColor}" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="0" cy="-2" r="6" fill="${accentColor}"/>
    <line x1="-24" y1="20" x2="24" y2="20" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
  </g>

  <!-- Title & Subtitle in SVG -->
  <text x="400" y="350" text-anchor="middle" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="900" letter-spacing="-0.5">
    ${cleanTitle.length > 40 ? cleanTitle.substring(0, 37) + '...' : cleanTitle}
  </text>
  <text x="400" y="380" text-anchor="middle" fill="rgba(255,255,255,0.75)" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" letter-spacing="0.5">
    TÉCNOGEST • FORMAÇÃO HOMOLOGADA INEFOP
  </text>

  <!-- Bottom Details -->
  <g transform="translate(60, 440)">
    <rect width="130" height="22" rx="4" fill="rgba(0,0,0,0.3)"/>
    <text x="10" y="15" fill="rgba(255,255,255,0.7)" font-family="system-ui, -apple-system, sans-serif" font-size="10" font-weight="700">CERTIFICAÇÃO OFICIAL</text>
  </g>

  <g transform="translate(610, 440)">
    <rect width="130" height="22" rx="4" fill="rgba(0,0,0,0.3)"/>
    <text x="120" y="15" text-anchor="end" fill="${accentColor}" font-family="system-ui, -apple-system, sans-serif" font-size="10" font-weight="800">ANGOLA • LUANDA</text>
  </g>
</svg>
  `.trim();

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

export interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt: string;
  category?: string;
  fallbackSrc?: string;
  className?: string;
  wrapperClassName?: string;
  showSkeleton?: boolean;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  category = 'industrial',
  fallbackSrc,
  className = '',
  wrapperClassName = '',
  showSkeleton = true,
  ...props
}) => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [currentSrc, setCurrentSrc] = useState<string>('');

  const fallback = fallbackSrc || getFallbackSvg(category, alt);

  useEffect(() => {
    setHasError(false);
    setIsLoaded(false);
    if (!src || src.trim() === '') {
      setCurrentSrc(fallback);
      setIsLoaded(true);
    } else {
      setCurrentSrc(src);
    }
  }, [src, fallback]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setCurrentSrc(fallback);
      setIsLoaded(true);
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      {/* Optional skeleton loader while image is fetching */}
      {showSkeleton && !isLoaded && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center -z-0">
          <span className="material-symbols-outlined text-slate-400 text-[24px] animate-spin">
            progress_activity
          </span>
        </div>
      )}

      <img
        src={currentSrc || fallback}
        alt={alt}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={handleError}
        onLoad={handleLoad}
        className={`
          transition-opacity duration-300
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
          ${className}
        `.trim()}
        {...props}
      />
    </div>
  );
};
