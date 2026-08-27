import React from 'react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { PageHeader } from '../components/PageHeader';
import { SafeImage } from '../components/ui/SafeImage';

export const AboutView: React.FC = () => {
  const { setCurrentView, navigateToEnroll, setIsChatModalOpen, siteSettings, courses, polos } = useApp();

  return (
    <div className="w-full bg-background py-8 md:py-16">
      <SEOHead
        title={`Sobre a ${siteSettings.brandShortName || 'Técnogest'} | Consultoria e Formações Industriais em Angola`}
        description={`Conheça a história e a missão da ${siteSettings.institutionName}. Formações industriais, gestão de carreiras onshore/offshore, certificação INEFOP e parceria INÇATEC/TÉCNOFORM.`}
        keywords={[
          'sobre tecnogest angola',
          'história tecnogest',
          'inovar para melhor servir',
          'certificação INEFOP Luanda',
          'formações industriais Angola',
          'parceria inçatec tecnoform'
        ]}
        canonicalUrl="https://tecnogest.ao/sobre"
      />
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 space-y-12">
        {/* PageHeader */}
        <PageHeader
          title="Inovar Para Melhor Servir"
          description={`A ${siteSettings.brandShortName || 'Técnogest'} é uma instituição de referência em Angola na consultoria de carreiras marítimas e petrolíferas, formações industriais e certificações homologadas pelo INEFOP / MAPTSS.`}
          icon="engineering"
        />

        {/* 2-Column Story & Certification */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 bg-[#0A2558] text-[#00D2FF] px-3.5 py-1 rounded-full text-xs font-extrabold border border-[#00D2FF]/30">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>{siteSettings.accreditationText || 'Homologado pelo INEFOP / MAPTSS • Em Parceria com INÇATEC e TÉCNOFORM'}</span>
            </div>
            <h2 className="text-3xl font-extrabold text-primary">
              Excelência Técnica em Onshore, Offshore e Indústria Pesada
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
              Com sede no Bairro Valódia (Edifício da Comunicação Social, 10º Andar) e polos operacionais com pátios de manobras em Viana e Boavista, a <strong>Técnogest</strong> nasceu para formar profissionais qualificados para os setores mais exigentes de Angola e do exterior.
            </p>
            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
              Em forte parceria técnica com a <strong>INÇATEC</strong> e a <strong>TÉCNOFORM</strong>, formamos operadores de Rigger Sinaleiro, Inspetores de Controlo de Qualidade, Técnicos de HST, Soldadores Industriais e Operadores de Gruas e Empilhadores com 100% de foco prático, manual didático, passe do formando, carta de recomendação e carta de pedido de estágio.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => navigateToEnroll()}
                className="bg-primary text-on-primary font-bold text-sm px-6 py-3.5 rounded-xl hover:bg-primary-container transition-all shadow-md cursor-pointer flex items-center gap-2"
              >
                <span>Fazer Pré-Inscrição</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
              <button
                onClick={() => setIsChatModalOpen(true)}
                className="bg-[#25D366] text-white font-bold text-sm px-6 py-3.5 rounded-xl hover:bg-[#1EBE5A] transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>Falar no WhatsApp ({siteSettings.primaryPhone})</span>
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-outline-variant">
              <SafeImage
                src="https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80"
                alt={`Instalações e oficinas industriais da ${siteSettings.brandShortName}`}
                category="industrial"
                wrapperClassName="w-full h-[400px]"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 bg-[#0A2558] text-white p-5 rounded-2xl shadow-xl border border-[#00D2FF]/30 max-w-xs hidden sm:block">
              <p className="text-2xl font-extrabold text-[#00D2FF]">
                {siteSettings.stats?.satisfactionRate || '99.6%'}
              </p>
              <p className="text-xs text-slate-200 font-medium">Índice de recomendação entre empresas industriais e operadoras contratantes.</p>
            </div>
          </div>
        </section>

        {/* Bento Grid: Missão, Visão e Valores */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-primary">Nossos Pilares Institucionais</h2>
            <p className="text-sm text-on-surface-variant mt-1">O compromisso que guia a nossa atuação e qualidade pedagógica.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">flag</span>
              </div>
              <h3 className="text-xl font-bold text-primary">Missão</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Formar cidadãos e profissionais com rigor técnico e segurança para a indústria onshore, offshore e internacional.
              </p>
            </div>

            <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-secondary text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">visibility</span>
              </div>
              <h3 className="text-xl font-bold text-primary">Visão</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Consolidar-se como o maior centro integrado de consultoria de carreiras, formação industrial e mobilidade técnica profissional em Angola.
              </p>
            </div>

            <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">diamond</span>
              </div>
              <h3 className="text-xl font-bold text-primary">Valores</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Segurança em primeiro lugar, conformidade legal INEFOP, ética transparente, orientação prática ao formando e compromisso incondicional com a inserção laboral.
              </p>
            </div>
          </div>
        </section>

        {/* Numbers That Matter */}
        <section className="bg-primary text-on-primary rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl sm:text-5xl font-extrabold text-[#00D2FF] mb-1">
                {siteSettings.stats?.studentsTrained || '18.500+'}
              </p>
              <p className="text-xs sm:text-sm text-on-primary/80">Profissionais Formados</p>
            </div>
            <div>
              <p className="text-3xl sm:text-5xl font-extrabold text-[#00D2FF] mb-1">
                {siteSettings.stats?.activeCourses || `+${courses.length}`}
              </p>
              <p className="text-xs sm:text-sm text-on-primary/80">Cursos Industriais</p>
            </div>
            <div>
              <p className="text-3xl sm:text-5xl font-extrabold text-[#00D2FF] mb-1">
                {siteSettings.stats?.polosCount || polos.length}
              </p>
              <p className="text-xs sm:text-sm text-on-primary/80">Polos & Gabinetes</p>
            </div>
            <div>
              <p className="text-3xl sm:text-5xl font-extrabold text-[#00D2FF] mb-1">100%</p>
              <p className="text-xs sm:text-sm text-on-primary/80">Homologado INEFOP</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
