import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ViewType } from '../types';
import { Logo } from './Logo';
import { BannerAlert } from './BannerAlert';

export const Navbar: React.FC = () => {
  const { currentView, setCurrentView, navigateToEnroll, polos, setIsChatModalOpen, siteSettings } = useApp();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [topDropdownOpen, setTopDropdownOpen] = useState(false);
  const [bottomDropdownOpen, setBottomDropdownOpen] = useState(false);

  // If in admin mode, the admin layout handles its own navigation
  const isAdminView =
    currentView === 'admin' ||
    currentView === 'admin-courses' ||
    currentView === 'admin-categories' ||
    currentView === 'admin-leads' ||
    currentView === 'admin-polos' ||
    currentView === 'admin-reviews' ||
    currentView === 'admin-settings';

  if (isAdminView) {
    return null;
  }

  const handleNav = (view: ViewType) => {
    setCurrentView(view);
    setMobileDrawerOpen(false);
  };

  const navLinks: { label: string; view: ViewType; icon: string }[] = [
    { label: 'Início', view: 'home', icon: 'home' },
    { label: 'Cursos', view: 'courses', icon: 'school' },
    { label: 'Polos', view: 'polos', icon: 'location_on' },
    { label: 'Sobre Nós', view: 'about', icon: 'info' },
  ];

  return (
    <>
      {/* Dynamic Announcement Banner from CMS */}
      <BannerAlert />

      {/* TopAppBar / Topbar (Reduced height, sleek and compact) */}
      <header className="bg-primary text-on-primary shadow-xs sticky top-0 z-40 w-full transition-all border-b border-primary-container/80">
        <div className="flex justify-between items-center w-full px-3 sm:px-6 md:px-8 h-11 sm:h-12 max-w-[1200px] mx-auto gap-2">
          {/* Left Brand + Mobile Menu Button */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 min-w-0">
            <button
              id="mobile-drawer-toggle"
              aria-label="Abrir menu de navegação"
              onClick={() => setMobileDrawerOpen(true)}
              className="lg:hidden text-on-primary hover:bg-primary-container p-1.5 rounded-lg transition-colors flex items-center justify-center cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined text-[20px]">menu</span>
            </button>
            
            <div
              onClick={() => handleNav('home')}
              className="cursor-pointer flex items-center select-none shrink-0"
            >
              <Logo variant="navbar" />
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 h-full">
            {navLinks.map((link) => {
              const isActive = currentView === link.view || (link.view === 'courses' && currentView === 'course-detail');
              return (
                <button
                  key={link.view}
                  onClick={() => handleNav(link.view)}
                  className={`h-full flex items-center px-2 font-bold text-xs transition-all relative cursor-pointer ${
                    isActive
                      ? 'text-secondary-container border-b-2 border-secondary-container'
                      : 'text-on-primary/80 hover:text-secondary-container hover:opacity-100'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            
            <button
              onClick={() => handleNav('admin')}
              className="text-on-primary/80 hover:text-secondary-container font-bold text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-lg border border-primary-container hover:border-secondary-container/50 bg-primary-container/30 transition-all flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">dashboard</span>
              <span>Admin CMS</span>
            </button>
          </nav>

          {/* Right Actions: WhatsApp Quick Contact & Fast Enrollment CTA */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* WhatsApp Quick Help Button */}
            <button
              onClick={() => setIsChatModalOpen(true)}
              aria-label="Atendimento no WhatsApp"
              className="hidden sm:inline-flex items-center gap-1 h-7.5 px-3 rounded-lg text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-all cursor-pointer select-none"
            >
              <span className="material-symbols-outlined text-[15px] text-emerald-400">chat</span>
              <span>Apoio</span>
            </button>

            {/* Inscription CTA Button */}
            <button
              id="topbar-enroll-cta"
              onClick={() => navigateToEnroll()}
              className="inline-flex items-center justify-center gap-1 h-7.5 sm:h-8 px-3 sm:px-3.5 rounded-lg bg-[#00D2FF] text-[#0A2558] hover:bg-[#33DCFF] active:bg-[#00BCE5] font-extrabold text-xs tracking-tight shadow-2xs hover:shadow-xs transition-all duration-150 transform active:scale-95 cursor-pointer whitespace-nowrap select-none"
            >
              <span className="material-symbols-outlined text-[15px]">how_to_reg</span>
              <span className="hidden xs:inline sm:inline">Inscrever-se</span>
              <span className="inline xs:hidden sm:hidden">Inscrição</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileDrawerOpen && (
        <div
          onClick={() => setMobileDrawerOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity lg:hidden"
        />
      )}

      {/* Mobile Navigation Drawer with Independent Scrolling & Dropdowns */}
      <aside
        id="mobile-navigation-sidebar"
        className={`fixed inset-y-0 left-0 z-50 bg-surface-container-lowest text-primary rounded-r-3xl h-full max-h-screen w-[300px] sm:w-[340px] shadow-2xl border-r border-outline-variant transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col overflow-y-auto overscroll-contain select-none ${
          mobileDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* TOP SECTION: Header & Top Dropdown with Center Logo */}
        <div className="shrink-0 bg-primary text-on-primary border-b border-primary-container">
          <div className="p-4 sm:p-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Logo variant="navbar" showSubtitle={false} />
            </div>
            <button
              onClick={() => setMobileDrawerOpen(false)}
              className="p-1.5 text-on-primary/80 hover:text-on-primary hover:bg-primary-container rounded-full transition-colors cursor-pointer"
              aria-label="Fechar menu"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Top Dropdown: Polos & Sedes Técnogest */}
          <div className="px-4 pb-3">
            <button
              onClick={() => setTopDropdownOpen(!topDropdownOpen)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-primary-container/40 hover:bg-primary-container/70 border border-primary-container text-left text-xs font-bold text-white transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-secondary-container">location_on</span>
                <span>Polos em Luanda ({polos.length})</span>
              </div>
              <span className={`material-symbols-outlined text-[18px] transition-transform duration-200 ${topDropdownOpen ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </button>

            {/* Top Dropdown Content */}
            {topDropdownOpen && (
              <div className="mt-2 space-y-1 bg-black/20 p-2 rounded-xl border border-white/10 text-xs animate-in fade-in duration-150">
                {polos.map((polo) => (
                  <button
                    key={polo.id}
                    onClick={() => {
                      handleNav('polos');
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-white/10 flex items-start gap-2 text-white/90 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px] text-secondary-container mt-0.5">place</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold truncate">{polo.name}</p>
                      <p className="text-[10px] text-white/70 truncate">{polo.address}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* MIDDLE SECTION: Navigation Links & Categories */}
        <div className="flex-1 p-4 space-y-4">
          <nav className="flex flex-col gap-1.5">
            <span className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-on-surface-variant">
              Navegação
            </span>
            {navLinks.map((link) => {
              const isActive = currentView === link.view || (link.view === 'courses' && currentView === 'course-detail');
              return (
                <button
                  key={link.view}
                  onClick={() => handleNav(link.view)}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl text-left text-sm font-bold transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-secondary-container text-on-secondary-container shadow-2xs'
                      : 'text-on-surface-variant hover:bg-surface-container-low hover:text-primary'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    {link.icon}
                  </span>
                  <span>{link.label}</span>
                </button>
              );
            })}

            <button
              onClick={() => handleNav('admin')}
              className="flex items-center gap-3.5 px-4 py-3 rounded-2xl text-left text-sm font-bold text-primary bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer mt-1"
            >
              <span className="material-symbols-outlined text-[20px]">dashboard</span>
              <span>Painel de Gestão CMS</span>
            </button>
          </nav>

          {/* Quick Help Card */}
          <div className="bg-surface-container-low p-3.5 rounded-2xl border border-outline-variant/60">
            <div className="flex items-center gap-2 mb-1 text-primary text-xs font-bold">
              <span className="material-symbols-outlined text-[16px] text-emerald-600">support_agent</span>
              <span>Secretaria Online</span>
            </div>
            <p className="text-[11px] text-on-surface-variant mb-2.5 leading-relaxed">
              Dúvidas sobre propinas ou horários? Fale diretamente connosco pelo WhatsApp.
            </p>
            <button
              onClick={() => {
                setMobileDrawerOpen(false);
                setIsChatModalOpen(true);
              }}
              className="w-full bg-[#25D366] hover:bg-[#1EBE5A] text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <span className="material-symbols-outlined text-[16px]">chat</span>
              <span>Atendimento WhatsApp</span>
            </button>
          </div>
        </div>

        {/* BOTTOM SECTION: Bottom Dropdown with Center Logo & Fast Actions */}
        <div className="shrink-0 p-4 border-t border-outline-variant bg-surface-container-low/80 space-y-3">
          {/* Bottom Center Logo & INEFOP Accreditation Dropdown */}
          <div className="bg-surface-container-lowest p-3 rounded-2xl border border-outline-variant/60">
            <button
              onClick={() => setBottomDropdownOpen(!bottomDropdownOpen)}
              className="w-full flex items-center justify-between text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Logo variant="admin" showSubtitle={false} />
                <div>
                  <p className="text-xs font-extrabold text-primary">Certificação Oficial</p>
                  <p className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">verified</span>
                    {siteSettings.inefopRegistration}
                  </p>
                </div>
              </div>
              <span className={`material-symbols-outlined text-[18px] text-primary transition-transform duration-200 ${bottomDropdownOpen ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </button>

            {/* Bottom Dropdown Content */}
            {bottomDropdownOpen && (
              <div className="mt-3 pt-2.5 border-t border-outline-variant/40 space-y-2 text-[11px] text-on-surface-variant animate-in fade-in duration-150">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px] text-primary">phone</span>
                  <span>{siteSettings.primaryPhone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px] text-primary">mail</span>
                  <span>{siteSettings.emailContact}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px] text-primary">schedule</span>
                  <span>{siteSettings.generalSchedule}</span>
                </div>
                <div className="pt-1">
                  <span className="inline-block bg-primary/10 text-primary text-[10px] font-black px-2 py-0.5 rounded-md">
                    {siteSettings.accreditationText}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Action button */}
          <button
            onClick={() => {
              setMobileDrawerOpen(false);
              navigateToEnroll();
            }}
            className="w-full bg-primary hover:bg-primary-container text-on-primary text-xs font-extrabold py-3 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
            <span>Fazer Inscrição Agora</span>
          </button>
        </div>
      </aside>
    </>
  );
};
