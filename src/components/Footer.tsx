import React from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const { currentView, setCurrentView, navigateToEnroll, siteSettings, polos } = useApp();

  const isAdminView =
    currentView === 'admin' ||
    currentView === 'admin-courses' ||
    currentView === 'admin-categories' ||
    currentView === 'admin-leads' ||
    currentView === 'admin-polos' ||
    currentView === 'admin-reviews' ||
    currentView === 'admin-settings' ||
    currentView === 'enroll-success';

  if (isAdminView) {
    return null;
  }

  const socialLinks = [
    {
      name: 'Facebook',
      url: siteSettings.socialLinks.facebook || 'https://facebook.com/tecnogestangola',
      color: 'hover:bg-[#1877F2]',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      url: siteSettings.socialLinks.instagram || 'https://instagram.com/tecnogestangola',
      color: 'hover:bg-[#E4405F]',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    {
      name: 'WhatsApp',
      url: `https://wa.me/${siteSettings.whatsappOfficial.replace(/[^0-9]/g, '')}?text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20as%20forma%C3%A7%C3%B5es%20da%20T%C3%A9cnogest`,
      color: 'hover:bg-[#25D366]',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      )
    },
    {
      name: 'TikTok',
      url: siteSettings.socialLinks.tiktok || 'https://tiktok.com/@tecnogestangola',
      color: 'hover:bg-[#000000]',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      )
    },
    {
      name: 'YouTube',
      url: siteSettings.socialLinks.youtube || 'https://youtube.com/@tecnogestangola',
      color: 'hover:bg-[#FF0000]',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    }
  ];

  return (
    <footer className="w-full bg-[#0A2558] text-white border-t border-[#00D2FF]/20 mt-auto">
      {/* Main Footer Container */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 border-b border-white/10">
          
          {/* Column 1: Brand, Mission & Social Media Icons (5 cols) */}
          <div className="sm:col-span-2 lg:col-span-5 space-y-4">
            <div
              onClick={() => setCurrentView('home')}
              className="cursor-pointer inline-block"
            >
              <Logo variant="footer" />
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Consultoria, gestão de carreiras onshore/offshore, formações industriais e Plano Portugal. Homologado pelo <strong className="text-[#00D2FF]">INEFOP / MAPTSS</strong> em parceria com a <strong className="text-[#00D2FF]">INÇATEC & TÉCNOFORM</strong>.
            </p>


            {/* Social Media Icons Bar */}
            <div className="pt-2">
              <p className="text-[11px] uppercase tracking-wider font-extrabold text-[#00D2FF] mb-2.5">
                Redes Sociais Técnogest
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Seguir no ${social.name}`}
                    title={`Visitar página oficial no ${social.name}`}
                    className={`w-9 h-9 rounded-xl bg-white/10 text-white flex items-center justify-center border border-white/10 transition-all duration-200 hover:scale-110 hover:text-white shadow-2xs ${social.color}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Direct Contacts (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs uppercase tracking-wider font-black text-[#00D2FF]">
              Contactos & Secretaria
            </p>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <a
                  href={`tel:${siteSettings.primaryPhone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-center gap-2.5 hover:text-[#00D2FF] transition-colors group"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#00D2FF] group-hover:scale-110 transition-transform">
                    phone_in_talk
                  </span>
                  <span>{siteSettings.primaryPhone} (Sede Valódia)</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteSettings.secondaryPhone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-center gap-2.5 hover:text-[#00D2FF] transition-colors group"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#00D2FF] group-hover:scale-110 transition-transform">
                    call
                  </span>
                  <span>{siteSettings.secondaryPhone} (Polo Viana)</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${siteSettings.whatsappOfficial.replace(/[^0-9]/g, '')}?text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20as%20inscri%C3%A7%C3%B5es%20da%20T%C3%A9cnogest`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-[#25D366] hover:underline font-bold transition-colors group"
                >
                  <span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">
                    chat
                  </span>
                  <span>WhatsApp Secretaria Técnogest</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteSettings.emailContact}`}
                  className="flex items-center gap-2.5 hover:text-[#00D2FF] transition-colors group"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#00D2FF] group-hover:scale-110 transition-transform">
                    mail
                  </span>
                  <span>{siteSettings.emailContact}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 pt-1 text-[11px] text-slate-400">
                <span className="material-symbols-outlined text-[16px] text-[#00D2FF] shrink-0 mt-0.5">
                  schedule
                </span>
                <span>{siteSettings.generalSchedule}</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation & Polos (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <p className="text-xs uppercase tracking-wider font-black text-[#00D2FF]">
              Polos & Gabinetes em Luanda ({polos.length})
            </p>
            <div className="grid grid-cols-1 gap-2 text-xs text-slate-300">
              {polos.map((polo) => (
                <button
                  key={polo.id}
                  onClick={() => setCurrentView('polos')}
                  className="text-left hover:text-[#00D2FF] transition-colors cursor-pointer flex items-center gap-1.5 truncate"
                  title={polo.name}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF] shrink-0"></span>
                  <span className="truncate">{polo.name} ({polo.municipality})</span>
                </button>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigateToEnroll()}
                className="w-full bg-[#00D2FF] hover:bg-[#00B4DB] text-[#0A2558] font-black text-xs py-2.5 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
                <span>Fazer Inscrição</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Credits Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p className="text-center sm:text-left">
            © 2025 {siteSettings.institutionName}. Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentView('about')}
              className="hover:text-[#00D2FF] transition-colors cursor-pointer"
            >
              Sobre a Técnogest
            </button>
            <button
              onClick={() => setCurrentView('courses')}
              className="hover:text-[#00D2FF] transition-colors cursor-pointer"
            >
              Cursos
            </button>
            <button
              onClick={() => setCurrentView('admin')}
              className="text-[#00D2FF] font-bold hover:underline transition-colors cursor-pointer flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">lock</span>
              <span>Painel Admin CMS</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
