import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ViewType } from '../../types';
import { Logo } from '../../components/Logo';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '../../components/ui/breadcrumb';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { currentView, setCurrentView, courses, leads, polos, categories, reviews, siteSettings } = useApp();
  const [mobileAdminMenuOpen, setMobileAdminMenuOpen] = useState(false);
  const [avatarDropdownOpen, setAvatarDropdownOpen] = useState(false);

  const navItems: { label: string; view: ViewType; icon: string; count?: number; group?: string }[] = [
    { label: 'Painel Geral & KPI', view: 'admin', icon: 'dashboard' },
    { label: 'Catálogo de Cursos', view: 'admin-courses', icon: 'school', count: courses.length },
    { label: 'Categorias & Áreas', view: 'admin-categories', icon: 'category', count: categories.length },
    { label: 'Leads & Matrículas', view: 'admin-leads', icon: 'contact_page', count: leads.length },
    { label: 'Polos & Unidades', view: 'admin-polos', icon: 'apartment', count: polos.length },
    { label: 'Avaliações & Alunos', view: 'admin-reviews', icon: 'reviews', count: reviews.length },
    { label: 'Parametrização CMS', view: 'admin-settings', icon: 'tune' },
  ];

  const getViewInfo = (view: ViewType) => {
    switch (view) {
      case 'admin':
        return { title: 'Visão Geral & KPI', icon: 'dashboard' };
      case 'admin-courses':
        return { title: 'Catálogo de Cursos', icon: 'school' };
      case 'admin-categories':
        return { title: 'Categorias & Áreas', icon: 'category' };
      case 'admin-leads':
        return { title: 'Leads & Matrículas', icon: 'contact_page' };
      case 'admin-polos':
        return { title: 'Polos & Unidades', icon: 'apartment' };
      case 'admin-reviews':
        return { title: 'Avaliações & Testemunhos', icon: 'reviews' };
      case 'admin-settings':
        return { title: 'Parametrização Global', icon: 'tune' };
      default:
        return { title: 'Administração', icon: 'admin_panel_settings' };
    }
  };

  const currentViewInfo = getViewInfo(currentView);

  return (
    <div className="h-screen w-screen overflow-hidden bg-surface-container-low flex flex-col md:flex-row text-on-surface select-text">
      {/* Mobile Top Header for Admin */}
      <div className="md:hidden bg-primary text-on-primary p-3.5 flex items-center justify-between border-b border-primary-container shrink-0 z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileAdminMenuOpen(!mobileAdminMenuOpen)}
            className="p-1.5 rounded-lg bg-primary-container text-on-primary cursor-pointer hover:bg-primary-container/80 transition-colors"
            aria-label="Abrir Menu Admin"
          >
            <span className="material-symbols-outlined text-[22px]">
              {mobileAdminMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
          <Logo variant="admin" />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView('home')}
            className="text-[11px] font-bold text-secondary-container bg-primary-container px-2.5 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer hover:brightness-110 transition-all"
          >
            <span className="material-symbols-outlined text-[15px]">visibility</span>
            <span>Ver Site</span>
          </button>

          {/* Mobile Avatar Button */}
          <div className="relative">
            <button
              onClick={() => setAvatarDropdownOpen(!avatarDropdownOpen)}
              className="w-8 h-8 rounded-full ring-2 ring-secondary-container/80 overflow-hidden bg-secondary-container text-on-secondary-container flex items-center justify-center font-black text-[11px] cursor-pointer shadow-xs shrink-0"
              title="Perfil de Administrador"
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                alt="Avatar Admin"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="sr-only">Avatar Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Nav Menu */}
      {mobileAdminMenuOpen && (
        <div className="md:hidden bg-primary text-on-primary border-b border-primary-container max-h-[75vh] overflow-y-auto p-4 space-y-1 z-30 shadow-2xl animate-in fade-in duration-200">
          <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-on-primary-container">
            Módulos Administrativos
          </div>
          {navItems.map(item => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => {
                  setCurrentView(item.view);
                  setMobileAdminMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-secondary-container text-on-secondary-container shadow-sm font-black'
                    : 'text-on-primary/80 hover:bg-primary-container hover:text-on-primary'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                      isActive
                        ? 'bg-primary text-on-primary'
                        : 'bg-primary-container text-on-primary-container'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Desktop Sidebar Navigation with FIXED & INDEPENDENT SCROLL */}
      <aside className="hidden md:flex md:w-72 h-screen max-h-screen sticky top-0 shrink-0 flex-col justify-between bg-primary text-on-primary border-r border-primary-container shadow-xl overflow-hidden select-none z-30">
        {/* Top Header Fixed */}
        <div className="p-5 border-b border-primary-container shrink-0 flex items-center justify-between">
          <Logo variant="admin" />
        </div>

        {/* Scrollable Nav Area */}
        <nav className="flex-1 overflow-y-auto p-3.5 space-y-1 overscroll-contain">
          <div className="px-3 py-2 text-[10px] font-extrabold uppercase tracking-wider text-on-primary-container/90 flex items-center justify-between">
            <span>Centro de Gestão CMS</span>
            <span className="text-[9px] bg-primary-container px-2 py-0.5 rounded-md font-bold text-secondary-container">
              v2.5
            </span>
          </div>

          {navItems.map(item => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => setCurrentView(item.view)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs font-bold transition-all cursor-pointer group ${
                  isActive
                    ? 'bg-secondary-container text-on-secondary-container shadow-md font-black ring-1 ring-secondary-container/50'
                    : 'text-on-primary/80 hover:bg-primary-container hover:text-on-primary'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className="material-symbols-outlined text-[20px] transition-transform group-hover:scale-110"
                    style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold shrink-0 ${
                      isActive
                        ? 'bg-primary text-on-primary shadow-2xs'
                        : 'bg-primary-container text-on-primary-container'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-4 border-t border-primary-container/60 my-2" />

          <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-on-primary-container/90">
            Acesso Rápido
          </div>

          <button
            onClick={() => setCurrentView('home')}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-xs font-bold text-on-primary/80 hover:bg-primary-container hover:text-secondary-container transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">public</span>
            <span>Ver Website Público</span>
          </button>
          
          <button
            onClick={() => setCurrentView('enrollment')}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-xs font-bold text-on-primary/80 hover:bg-primary-container hover:text-secondary-container transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
            <span>Assistente de Inscrição</span>
          </button>
        </nav>

        {/* User Profile Card Fixed Bottom */}
        <div className="p-4 border-t border-primary-container bg-primary-container/30 shrink-0 space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center font-black text-xs shadow-2xs">
              VJ
            </div>
            <div className="overflow-hidden min-w-0 flex-1">
              <p className="text-xs font-bold text-on-primary truncate">Direcção & Secretaria</p>
              <p className="text-[10px] text-on-primary-container truncate">{siteSettings.inefopRegistration}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area with INDEPENDENT SCROLL */}
      <main className="flex-1 flex flex-col h-screen max-h-screen overflow-y-auto min-w-0 bg-surface-container-low overscroll-contain relative">
        {/* Top Header Sticky with shadcn Breadcrumbs */}
        <header className="hidden md:flex h-16 bg-surface-container-lowest/95 backdrop-blur-md border-b border-outline-variant/60 px-6 sm:px-8 items-center justify-between sticky top-0 z-20 shrink-0 shadow-2xs">
          {/* Shadcn Breadcrumb Navigation in Top Bar */}
          <Breadcrumb className="text-xs">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  onClick={() => setCurrentView('admin')}
                  className="flex items-center gap-1 text-on-surface-variant hover:text-primary font-semibold"
                >
                  <span className="material-symbols-outlined text-[16px] text-primary">admin_panel_settings</span>
                  <span>Painel CMS</span>
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbPage className="font-extrabold text-primary flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-secondary">
                    {currentViewInfo.icon}
                  </span>
                  <span>{currentViewInfo.title}</span>
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Quick Header Actions & User Avatar */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-on-surface-variant bg-surface-container px-3 py-1.5 rounded-full border border-outline-variant/60">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-semibold text-primary">{siteSettings.academicYear} Activo</span>
            </div>

            <button
              onClick={() => setCurrentView('home')}
              className="text-xs font-bold text-primary border border-outline-variant hover:bg-surface-container px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <span className="material-symbols-outlined text-[16px]">visibility</span>
              <span>Ver Site</span>
            </button>

            <div className="h-6 w-px bg-outline-variant/60 mx-0.5" />

            {/* Desktop TopBar Avatar with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setAvatarDropdownOpen(!avatarDropdownOpen)}
                className="flex items-center gap-2.5 pl-1.5 pr-2.5 py-1 rounded-xl hover:bg-surface-container transition-all border border-transparent hover:border-outline-variant cursor-pointer group"
                aria-label="Menu de Utilizador"
                aria-expanded={avatarDropdownOpen}
              >
                {/* Avatar Image + Online Indicator */}
                <div className="relative shrink-0">
                  <div className="w-8 h-8 rounded-full ring-2 ring-primary/20 group-hover:ring-primary/40 overflow-hidden bg-primary text-white flex items-center justify-center font-bold text-xs shadow-xs transition-all">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                      alt="Direcção Técnogest"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <span>TG</span>
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-surface-container-lowest animate-pulse" />
                </div>

                {/* User Info Text */}
                <div className="text-left hidden xl:block">
                  <p className="text-xs font-bold text-primary leading-tight group-hover:text-primary transition-colors">
                    Direcção TG
                  </p>
                  <p className="text-[10px] text-on-surface-variant leading-tight">
                    Super Admin
                  </p>
                </div>

                <span className="material-symbols-outlined text-[16px] text-on-surface-variant transition-transform group-hover:translate-y-0.5">
                  expand_more
                </span>
              </button>

              {/* Profile Dropdown Menu */}
              {avatarDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setAvatarDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-surface-container-lowest border border-outline-variant shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    {/* Header in Dropdown */}
                    <div className="p-3 border-b border-outline-variant/50 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-sm overflow-hidden shadow-xs shrink-0">
                        <img
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                          alt="Avatar"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <span>TG</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-primary truncate">Direcção Pedagógica</p>
                        <p className="text-[10px] text-on-surface-variant truncate">geral@tecnogest.ao</p>
                        <div className="mt-1 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          <span className="text-[9px] font-semibold text-emerald-700">Online • Super Admin</span>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-1 space-y-0.5 text-xs">
                      <button
                        onClick={() => {
                          setCurrentView('admin');
                          setAvatarDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-surface-container text-on-surface font-semibold transition-colors cursor-pointer text-left"
                      >
                        <span className="material-symbols-outlined text-[18px] text-primary">dashboard</span>
                        <span>Painel Geral & KPI</span>
                      </button>

                      <button
                        onClick={() => {
                          setCurrentView('admin-leads');
                          setAvatarDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-surface-container text-on-surface font-semibold transition-colors cursor-pointer text-left"
                      >
                        <span className="material-symbols-outlined text-[18px] text-emerald-600">contact_page</span>
                        <span>Gestão de Leads & Matrículas</span>
                      </button>

                      <button
                        onClick={() => {
                          setCurrentView('admin-courses');
                          setAvatarDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-surface-container text-on-surface font-semibold transition-colors cursor-pointer text-left"
                      >
                        <span className="material-symbols-outlined text-[18px] text-blue-600">school</span>
                        <span>Catálogo de Cursos</span>
                      </button>

                      <button
                        onClick={() => {
                          setCurrentView('admin-settings');
                          setAvatarDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-surface-container text-on-surface font-semibold transition-colors cursor-pointer text-left"
                      >
                        <span className="material-symbols-outlined text-[18px] text-primary">tune</span>
                        <span>Definições & CMS</span>
                      </button>

                      <div className="border-t border-outline-variant/40 my-1" />

                      <button
                        onClick={() => {
                          setCurrentView('home');
                          setAvatarDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-surface-container text-primary font-bold transition-colors cursor-pointer text-left"
                      >
                        <span className="material-symbols-outlined text-[18px]">public</span>
                        <span>Ver Website Público</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1 max-w-[1360px] w-full mx-auto pb-16">
          {children}
        </div>
      </main>
    </div>
  );
};
