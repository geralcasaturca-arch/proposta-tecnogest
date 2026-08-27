import React from 'react';

interface LogoProps {
  variant?: 'navbar' | 'footer' | 'admin' | 'badge' | 'mark' | 'hero';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

/**
 * Exact Vector Representation of the Official "TÉCNOGEST" Logo
 * Faithfully designed from the official brand identity:
 * - Deep navy blue circular background
 * - White industrial boom crane lifting a gear with an integrated wrench
 * - Dynamic dual cyan/electric blue ocean waves (onshore/offshore symbolism)
 * - Bold industrial typography "TÉCNOGEST"
 * - Official subtitle: "CONSULTORIA, GESTÃO DE CARREIRAS ONSHORE/OFFSHORE E FORMAÇÕES INDUSTRIAIS"
 */
export const Logo: React.FC<LogoProps> = ({
  variant = 'navbar',
  className = '',
  size = 'md',
  showSubtitle = true,
}) => {
  // Official Emblem Isotype SVG
  const TecnogestEmblem = ({
    className: iconClass = 'w-10 h-10',
  }: {
    className?: string;
  }) => (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${iconClass}`}
    >
      {/* Deep Navy Circle Background */}
      <circle cx="60" cy="52" r="44" fill="#0A2558" />
      
      {/* Crane / Grua Structure (White) */}
      <g stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Crane Tower / Boom */}
        <path d="M 38 62 L 72 20 L 75 22 L 48 64 Z" fill="#FFFFFF" fillOpacity="0.15" />
        {/* Lattice Trusses */}
        <path d="M 44 54 L 66 32" />
        <path d="M 50 48 L 60 26" />
        <path d="M 56 40 L 70 36" />
        <path d="M 38 62 L 72 20" strokeWidth="3" />
        <path d="M 48 64 L 75 22" strokeWidth="3" />
        {/* Crane Base Cab / Vehicle body */}
        <path d="M 32 64 L 66 64 C 70 64, 72 61, 72 58 L 68 53 C 67 51, 64 51, 60 51 L 52 51 L 52 46 L 32 46 Z" fill="#FFFFFF" stroke="none" />
        {/* Cab Window */}
        <path d="M 60 53 L 66 53 L 64 56 L 60 56 Z" fill="#0A2558" stroke="none" />
        {/* Vehicle Wheels / Crawler Tracks */}
        <line x1="34" y1="67" x2="64" y2="67" stroke="#FFFFFF" strokeWidth="2.5" />
        <circle cx="38" cy="67" r="2" fill="#0A2558" stroke="#FFFFFF" strokeWidth="1.5" />
        <circle cx="50" cy="67" r="2" fill="#0A2558" stroke="#FFFFFF" strokeWidth="1.5" />
        <circle cx="60" cy="67" r="2" fill="#0A2558" stroke="#FFFFFF" strokeWidth="1.5" />
        
        {/* Cable Hanging Down */}
        <line x1="73.5" y1="21" x2="73.5" y2="40" stroke="#FFFFFF" strokeWidth="2" />
      </g>

      {/* Industrial Gear & Wrench Silhouette (White) */}
      <g transform="translate(64, 38)">
        {/* Gear teeth */}
        <path
          d="M 9.5 0 L 10.5 2.5 C 11.5 2.8 12.4 3.3 13.2 4 L 15.6 3.2 L 17 5.6 L 15.2 7.4 C 15.5 8.3 15.7 9.3 15.7 10.3 L 18.2 11.3 L 17.4 13.7 L 15 14.1 C 14.3 14.9 13.5 15.6 12.6 16.1 L 12.8 18.6 L 10.3 19.4 L 9.1 17.2 C 8.1 17.2 7.1 17 6.2 16.6 L 4.4 18.4 L 2.3 17 L 3.5 14.7 C 2.8 13.9 2.3 13 2 12 L 0 10.8 L 0.8 8.4 L 3.2 8 C 3.6 7.1 4.2 6.3 5 5.6 L 4.2 3.2 L 6.6 1.8 L 8.4 3.6 C 9.3 3.3 10.3 3.1 11.3 3.1 Z"
          fill="#FFFFFF"
        />
        {/* Wrench Cutout inside Gear */}
        <path
          d="M 9.5 5 C 7.8 5 6.5 6.3 6.5 8 C 6.5 9.1 7.1 10 8 10.5 L 8 15 L 11 15 L 11 10.5 C 11.9 10 12.5 9.1 12.5 8 C 12.5 6.3 11.2 5 9.5 5 Z M 9.5 6.8 C 10.2 6.8 10.7 7.3 10.7 8 C 10.7 8.7 10.2 9.2 9.5 9.2 C 8.8 9.2 8.3 8.7 8.3 8 C 8.3 7.3 8.8 6.8 9.5 6.8 Z"
          fill="#0A2558"
        />
      </g>

      {/* Dynamic Ocean Waves (Onshore / Offshore Maritime Vector) */}
      {/* Top Bright Cyan Wave */}
      <path
        d="M 24 72 
           C 36 62, 52 64, 66 74 
           C 80 84, 98 76, 106 68 
           C 98 84, 76 96, 56 86 
           C 42 78, 30 79, 24 72 Z"
        fill="#00D2FF"
      />
      {/* Bottom Royal Blue Wave */}
      <path
        d="M 28 80 
           C 40 70, 56 72, 70 82 
           C 84 92, 102 84, 110 76 
           C 100 96, 74 104, 52 94 
           C 38 86, 32 87, 28 80 Z"
        fill="#0077E6"
      />
    </svg>
  );

  // Standalone Mark
  if (variant === 'mark') {
    const sizeMap = {
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-14 h-14',
      xl: 'w-20 h-20',
    };
    return (
      <div className={`inline-flex items-center justify-center p-1 bg-white rounded-xl shadow-xs ${className}`}>
        <TecnogestEmblem className={sizeMap[size]} />
      </div>
    );
  }

  // Official Brand Badge (For Hero / Certifications)
  if (variant === 'badge' || variant === 'hero') {
    return (
      <div
        className={`inline-flex items-center gap-3.5 bg-white text-[#0A2558] px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl shadow-lg select-none border border-slate-200 ${className}`}
      >
        <TecnogestEmblem className="w-12 h-12 sm:w-14 sm:h-14" />
        <div className="flex flex-col text-left leading-none">
          <div className="font-black tracking-tight text-2xl sm:text-3xl font-headline text-[#0A2558] uppercase flex items-center gap-1">
            <span>TÉCNOGEST</span>
          </div>
          {showSubtitle && (
            <span className="text-[7.5px] sm:text-[8.5px] font-extrabold uppercase tracking-tight text-slate-600 mt-1.5 font-sans max-w-[280px] leading-tight">
              CONSULTORIA, GESTÃO DE CARREIRAS ONSHORE/OFFSHORE E FORMAÇÕES INDUSTRIAIS
            </span>
          )}
        </div>
      </div>
    );
  }

  // Admin Sidebar / Header Logo
  if (variant === 'admin') {
    return (
      <div className={`flex items-center gap-3 select-none ${className}`}>
        <div className="p-1 bg-white rounded-xl shadow-xs shrink-0 flex items-center justify-center border border-slate-200">
          <TecnogestEmblem className="w-9 h-9" />
        </div>
        <div className="flex flex-col min-w-0">
          <div className="font-black text-lg text-white leading-none tracking-tight">
            <span>TÉCNOGEST</span>
          </div>
          <span className="text-[8px] text-[#00D2FF] font-bold tracking-wider uppercase mt-1">
            FORMAÇÕES INDUSTRIAIS • CMS
          </span>
        </div>
      </div>
    );
  }

  // Footer Logo
  if (variant === 'footer') {
    return (
      <div className={`flex items-center gap-3.5 select-none ${className}`}>
        <div className="p-2 bg-white rounded-2xl shadow-md shrink-0 border border-slate-200">
          <TecnogestEmblem className="w-12 h-12" />
        </div>
        <div className="flex flex-col text-left">
          <div className="font-black text-2xl sm:text-3xl text-white tracking-tight leading-none uppercase">
            <span>TÉCNOGEST</span>
          </div>
          {showSubtitle && (
            <span className="text-[9px] sm:text-[10px] text-[#8BAEDB] font-bold tracking-wider uppercase mt-1.5 max-w-[320px] leading-snug">
              CONSULTORIA, GESTÃO DE CARREIRAS ONSHORE/OFFSHORE E FORMAÇÕES INDUSTRIAIS
            </span>
          )}
        </div>
      </div>
    );
  }

  // Default Navbar variant (Clean, high-contrast, compact official brand layout)
  return (
    <div className={`flex items-center gap-2 group select-none shrink-0 ${className}`}>
      {/* Official White Emblem Box */}
      <div className="p-1 bg-white rounded-lg shadow-2xs group-hover:scale-105 transition-transform duration-200 shrink-0 border border-slate-200/80 flex items-center justify-center">
        <TecnogestEmblem className="w-6 h-6 sm:w-7 sm:h-7" />
      </div>

      <div className="flex flex-col justify-center text-left min-w-0">
        <div className="flex items-center gap-1 leading-none whitespace-nowrap">
          <span className="font-black text-sm sm:text-base text-white tracking-tight uppercase">
            TÉCNOGEST
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[6.5px] sm:text-[7.5px] font-extrabold tracking-wider text-[#00D2FF] uppercase leading-none mt-0.5 whitespace-nowrap hidden xs:inline-block">
            FORMAÇÕES INDUSTRIAIS
          </span>
        )}
      </div>
    </div>
  );
};
