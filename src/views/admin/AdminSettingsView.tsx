import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SiteSettings, ViewType } from '../../types';
import { PageHeader } from '../../components/PageHeader';

export const AdminSettingsView: React.FC = () => {
  const { siteSettings, updateSiteSettings, resetSiteSettings, resetAllToDefaults } = useApp();

  const [activeTab, setActiveTab] = useState<'geral' | 'precos' | 'banner' | 'estatisticas' | 'redes' | 'hero'>('geral');
  const [formData, setFormData] = useState<SiteSettings>(siteSettings);
  const [isSavedRecently, setIsSavedRecently] = useState(false);

  const handleChange = (field: keyof SiteSettings, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (parent: 'stats' | 'socialLinks' | 'bannerAlert', field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(formData);
    setIsSavedRecently(true);
    setTimeout(() => setIsSavedRecently(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto animate-in fade-in duration-200">
      {/* Standardized Reusable PageHeader */}
      <PageHeader
        title="Definições & Parametrização"
        description="Ajuste todos os parâmetros institucionais, contactos, taxas de matrícula, alertas e conteúdos do site em tempo real."
        icon="tune"
        actions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={resetSiteSettings}
              className="h-9 px-3.5 rounded-lg border border-outline-variant hover:bg-surface-container text-xs font-semibold text-on-surface-variant transition-colors cursor-pointer"
            >
              Restaurar Padrões
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="h-9 px-3.5 rounded-lg bg-primary hover:bg-primary/95 text-on-primary text-xs font-semibold shadow-2xs transition-all inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[17px]">save</span>
              <span>Guardar Alterações</span>
            </button>
          </div>
        }
      />

      {isSavedRecently && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <span className="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
          <span>Alterações gravadas com sucesso! Todos os módulos e o website público foram atualizados.</span>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-outline-variant/60 pb-2">
        <button
          onClick={() => setActiveTab('geral')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'geral'
              ? 'bg-primary text-on-primary shadow-xs'
              : 'text-on-surface-variant hover:bg-surface-container'
          }`}
        >
          Institucional & Contactos
        </button>
        <button
          onClick={() => setActiveTab('precos')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'precos'
              ? 'bg-primary text-on-primary shadow-xs'
              : 'text-on-surface-variant hover:bg-surface-container'
          }`}
        >
          Taxas & Ano Lectivo
        </button>
        <button
          onClick={() => setActiveTab('banner')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'banner'
              ? 'bg-primary text-on-primary shadow-xs'
              : 'text-on-surface-variant hover:bg-surface-container'
          }`}
        >
          Barra de Alerta / Comunicado
        </button>
        <button
          onClick={() => setActiveTab('hero')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'hero'
              ? 'bg-primary text-on-primary shadow-xs'
              : 'text-on-surface-variant hover:bg-surface-container'
          }`}
        >
          Conteúdo do Hero & CTA
        </button>
        <button
          onClick={() => setActiveTab('estatisticas')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'estatisticas'
              ? 'bg-primary text-on-primary shadow-xs'
              : 'text-on-surface-variant hover:bg-surface-container'
          }`}
        >
          Métricas de Impacto
        </button>
        <button
          onClick={() => setActiveTab('redes')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'redes'
              ? 'bg-primary text-on-primary shadow-xs'
              : 'text-on-surface-variant hover:bg-surface-container'
          }`}
        >
          Redes Sociais & Links
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Tab: Geral & Contactos */}
        {activeTab === 'geral' && (
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 sm:p-8 space-y-6">
            <h3 className="text-base font-bold text-primary border-b border-outline-variant/30 pb-3">
              Identificação Institucional e Homologação INEFOP
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Nome Oficial da Instituição
                </label>
                <input
                  type="text"
                  value={formData.institutionName}
                  onChange={e => handleChange('institutionName', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Nome Resumido / Marca
                </label>
                <input
                  type="text"
                  value={formData.brandShortName}
                  onChange={e => handleChange('brandShortName', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Registo Oficial INEFOP (Alvará)
                </label>
                <input
                  type="text"
                  value={formData.inefopRegistration}
                  onChange={e => handleChange('inefopRegistration', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Texto de Homologação MAPTSS
                </label>
                <input
                  type="text"
                  value={formData.accreditationText}
                  onChange={e => handleChange('accreditationText', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Slogan Institucional
                </label>
                <input
                  type="text"
                  value={formData.slogan}
                  onChange={e => handleChange('slogan', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Endereço da Sede Central
                </label>
                <input
                  type="text"
                  value={formData.headquartersAddress}
                  onChange={e => handleChange('headquartersAddress', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                />
              </div>
            </div>

            <h3 className="text-base font-bold text-primary border-b border-outline-variant/30 pb-3 pt-4">
              Canais de Atendimento e Comunicação
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Telefone Principal
                </label>
                <input
                  type="text"
                  value={formData.primaryPhone}
                  onChange={e => handleChange('primaryPhone', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Telefone Secundário
                </label>
                <input
                  type="text"
                  value={formData.secondaryPhone}
                  onChange={e => handleChange('secondaryPhone', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  WhatsApp Central
                </label>
                <input
                  type="text"
                  value={formData.whatsappMain}
                  onChange={e => handleChange('whatsappMain', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Email Geral
                </label>
                <input
                  type="email"
                  value={formData.emailContact}
                  onChange={e => handleChange('emailContact', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Email da Secretaria
                </label>
                <input
                  type="email"
                  value={formData.emailSecretaria}
                  onChange={e => handleChange('emailSecretaria', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Horário de Atendimento
                </label>
                <input
                  type="text"
                  value={formData.generalSchedule}
                  onChange={e => handleChange('generalSchedule', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab: Taxas & Ano Lectivo */}
        {activeTab === 'precos' && (
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 sm:p-8 space-y-6">
            <h3 className="text-base font-bold text-primary border-b border-outline-variant/30 pb-3">
              Configurações Académicas e Financeiras
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Ano Lectivo Vigente
                </label>
                <input
                  type="text"
                  value={formData.academicYear}
                  onChange={e => handleChange('academicYear', e.target.value)}
                  placeholder="ex: Ano Lectivo 2025/2026"
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Período / Ciclo de Inscrições
                </label>
                <input
                  type="text"
                  value={formData.currentIntakePeriod}
                  onChange={e => handleChange('currentIntakePeriod', e.target.value)}
                  placeholder="ex: Matrículas Abertas para Novo Ciclo"
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Taxa Padrão de Inscrição / Matrícula (Kz)
                </label>
                <input
                  type="number"
                  value={formData.defaultRegistrationFee}
                  onChange={e => handleChange('defaultRegistrationFee', Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                />
                <p className="text-[11px] text-on-surface-variant mt-1">
                  Aplicado automaticamente a novos cursos e fichas de pré-inscrição online.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Taxa Padrão de Certificado Oficial INEFOP (Kz)
                </label>
                <input
                  type="number"
                  value={formData.defaultCertificateFee}
                  onChange={e => handleChange('defaultCertificateFee', Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab: Banner de Alerta */}
        {activeTab === 'banner' && (
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <div>
                <h3 className="text-base font-bold text-primary">Barra de Alerta / Comunicado Superior</h3>
                <p className="text-xs text-on-surface-variant">Exibido no topo de todas as páginas públicas do site.</p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.bannerAlert.enabled}
                  onChange={e => handleNestedChange('bannerAlert', 'enabled', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-surface-container peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                <span className="ml-3 text-xs font-bold text-on-surface">
                  {formData.bannerAlert.enabled ? 'Ativo' : 'Desativado'}
                </span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Etiqueta / Badge
                </label>
                <input
                  type="text"
                  value={formData.bannerAlert.badgeText || ''}
                  onChange={e => handleNestedChange('bannerAlert', 'badgeText', e.target.value)}
                  placeholder="ex: COMUNICADO OFICIAL"
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Texto do Link / Botão
                </label>
                <input
                  type="text"
                  value={formData.bannerAlert.linkText || ''}
                  onChange={e => handleNestedChange('bannerAlert', 'linkText', e.target.value)}
                  placeholder="ex: Fazer Inscrição"
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Mensagem Principal do Alerta
                </label>
                <textarea
                  rows={2}
                  value={formData.bannerAlert.text}
                  onChange={e => handleNestedChange('bannerAlert', 'text', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Estilo Visual
                </label>
                <select
                  value={formData.bannerAlert.type}
                  onChange={e => handleNestedChange('bannerAlert', 'type', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                >
                  <option value="highlight">Destaque Dourado / Secundário</option>
                  <option value="emerald">Verde Esmeralda (Sucesso)</option>
                  <option value="info">Azul Institucional</option>
                  <option value="warning">Âmbar (Atenção / Vagas a Terminar)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Destino do Clique
                </label>
                <select
                  value={formData.bannerAlert.linkView || 'enroll'}
                  onChange={e => handleNestedChange('bannerAlert', 'linkView', e.target.value as ViewType)}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                >
                  <option value="enroll">Página de Inscrição Online</option>
                  <option value="courses">Catálogo de Cursos</option>
                  <option value="polos">Lista de Polos</option>
                  <option value="about">Sobre a Instituição</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Hero & CTA */}
        {activeTab === 'hero' && (
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 sm:p-8 space-y-6">
            <h3 className="text-base font-bold text-primary border-b border-outline-variant/30 pb-3">
              Textos e Chamadas de Ação (Hero Section da Home)
            </h3>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Etiqueta Superior do Hero
                </label>
                <input
                  type="text"
                  value={formData.heroBadgeText}
                  onChange={e => handleChange('heroBadgeText', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Título Principal (H1)
                </label>
                <textarea
                  rows={2}
                  value={formData.heroHeading}
                  onChange={e => handleChange('heroHeading', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Subtítulo / Descrição
                </label>
                <textarea
                  rows={2}
                  value={formData.heroSubheading}
                  onChange={e => handleChange('heroSubheading', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    Texto do Botão Primário (CTA)
                  </label>
                  <input
                    type="text"
                    value={formData.ctaPrimaryText}
                    onChange={e => handleChange('ctaPrimaryText', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    Texto do Botão Secundário
                  </label>
                  <input
                    type="text"
                    value={formData.ctaSecondaryText}
                    onChange={e => handleChange('ctaSecondaryText', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Estatísticas & Métricas de Impacto */}
        {activeTab === 'estatisticas' && (
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 sm:p-8 space-y-6">
            <h3 className="text-base font-bold text-primary border-b border-outline-variant/30 pb-3">
              Contadores e Métricas de Destaque
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Estudantes Formados
                </label>
                <input
                  type="text"
                  value={formData.stats.studentsTrained}
                  onChange={e => handleNestedChange('stats', 'studentsTrained', e.target.value)}
                  placeholder="ex: 15.000+"
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Cursos Ativos no Catálogo
                </label>
                <input
                  type="text"
                  value={formData.stats.activeCourses}
                  onChange={e => handleNestedChange('stats', 'activeCourses', e.target.value)}
                  placeholder="ex: 70+"
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Taxa de Empregabilidade
                </label>
                <input
                  type="text"
                  value={formData.stats.employmentRate}
                  onChange={e => handleNestedChange('stats', 'employmentRate', e.target.value)}
                  placeholder="ex: 98%"
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Polos em Luanda
                </label>
                <input
                  type="text"
                  value={formData.stats.polosCount}
                  onChange={e => handleNestedChange('stats', 'polosCount', e.target.value)}
                  placeholder="ex: 6"
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Formadores Especialistas
                </label>
                <input
                  type="text"
                  value={formData.stats.instructorsCount}
                  onChange={e => handleNestedChange('stats', 'instructorsCount', e.target.value)}
                  placeholder="ex: 45+"
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Índice de Satisfação
                </label>
                <input
                  type="text"
                  value={formData.stats.satisfactionRate}
                  onChange={e => handleNestedChange('stats', 'satisfactionRate', e.target.value)}
                  placeholder="ex: 99.4%"
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab: Redes Sociais */}
        {activeTab === 'redes' && (
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 sm:p-8 space-y-6">
            <h3 className="text-base font-bold text-primary border-b border-outline-variant/30 pb-3">
              Perfis Sociais e Links de Redirecionamento
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Facebook URL
                </label>
                <input
                  type="url"
                  value={formData.socialLinks.facebook}
                  onChange={e => handleNestedChange('socialLinks', 'facebook', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Instagram URL
                </label>
                <input
                  type="url"
                  value={formData.socialLinks.instagram}
                  onChange={e => handleNestedChange('socialLinks', 'instagram', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  WhatsApp Direct Link
                </label>
                <input
                  type="url"
                  value={formData.socialLinks.whatsapp}
                  onChange={e => handleNestedChange('socialLinks', 'whatsapp', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  YouTube Channel URL
                </label>
                <input
                  type="url"
                  value={formData.socialLinks.youtube || ''}
                  onChange={e => handleNestedChange('socialLinks', 'youtube', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  TikTok URL
                </label>
                <input
                  type="url"
                  value={formData.socialLinks.tiktok || ''}
                  onChange={e => handleNestedChange('socialLinks', 'tiktok', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  value={formData.socialLinks.linkedin || ''}
                  onChange={e => handleNestedChange('socialLinks', 'linkedin', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                />
              </div>
            </div>
          </div>
        )}

        {/* Global Save Button at bottom */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant/40">
          <button
            type="button"
            onClick={resetSiteSettings}
            className="px-5 py-3 rounded-xl border border-outline-variant hover:bg-surface-container text-xs font-bold text-on-surface-variant transition-colors cursor-pointer"
          >
            Restaurar Valores Padrão
          </button>

          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-primary hover:bg-primary/95 text-on-primary text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            <span>Guardar Todas as Definições</span>
          </button>
        </div>
      </form>
    </div>
  );
};
