import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { FAQ } from '../components/FAQ';
import { SEOHead } from '../components/SEOHead';
import { TecnogestFlyers } from '../components/TecnogestFlyers';
import { Button } from '../components/ui/Button';
import { SafeImage } from '../components/ui/SafeImage';

export const HomeView: React.FC = () => {
  const {
    courses,
    polos,
    categories,
    reviews,
    siteSettings,
    navigateToCourseDetail,
    navigateToEnroll,
    setCurrentView,
    setIsChatModalOpen
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [interactiveChatPolo, setInteractiveChatPolo] = useState<string>('');
  const [interactiveChatCourse, setInteractiveChatCourse] = useState<string>('');
  const [chatStep, setChatStep] = useState<1 | 2 | 3>(1);

  const categoryList = ['Todos', ...categories.map(c => c.name)];

  const filteredCourses =
    selectedCategory === 'Todos'
      ? courses.slice(0, 6)
      : courses.filter(c => c.category === selectedCategory);

  const featuredReviews = reviews.filter(r => r.isApproved && (r.isFeatured || r.rating >= 4.8)).slice(0, 3);

  const formatKZ = (val: number) => {
    return val.toLocaleString('pt-AO') + ' Kz';
  };

  // Motion animation presets for smooth, performant scroll transitions
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  return (
    <div className="w-full flex flex-col bg-background">
      <SEOHead
        title="Técnogest Angola | Formações Industriais, Carreiras Onshore/Offshore e Plano Portugal"
        description="Centro de formação técnica industrial homologado pelo INEFOP no Bairro Valódia, Luanda. Rigger Sinaleiro, Controlo de Qualidade, HST, Soldadura, Gruas e Visto de Trabalho para Portugal."
        canonicalUrl="https://tecnogest.ao"
      />

      {/* Hero Section */}
      <section className="w-full bg-surface-container-low py-5 sm:py-7 lg:py-8 px-4 md:px-8 border-b border-outline-variant/30 overflow-hidden">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 flex flex-col gap-2.5 sm:gap-3 order-2 lg:order-1"
          >
            {/* Minimalist, Compact Official Badge */}
            <div className="inline-flex items-center gap-1 bg-[#0A2558] text-[#00D2FF] px-2.5 py-0.5 rounded-full w-fit shadow-2xs border border-[#00D2FF]/30">
              <span className="material-symbols-outlined text-[13px] text-[#00D2FF]">verified</span>
              <span className="font-extrabold text-[9px] sm:text-[10px] uppercase tracking-wider text-white">
                {siteSettings.heroBadgeText || `CERTIFICAÇÃO OFICIAL INEFOP • ${siteSettings.academicYear}`}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-primary leading-snug tracking-tight">
              {siteSettings.heroHeading ? (
                siteSettings.heroHeading
              ) : (
                <>
                  Consultoria, Carreiras <span className="text-secondary">Onshore/Offshore</span> e Formações Industriais.
                </>
              )}
            </h1>

            <p className="text-xs sm:text-[13px] text-on-surface-variant max-w-lg leading-normal">
              {siteSettings.heroSubheading ? (
                siteSettings.heroSubheading
              ) : (
                <>
                  Qualifique-se com cursos práticos homologados pelo <strong>INEFOP / MAPTSS</strong>: Rigger Sinaleiro, Controlo de Qualidade, HST, Soldadura, Gruas e o programa exclusivo <strong>Plano Portugal</strong> com direito a contrato de trabalho.
                </>
              )}
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <Button
                variant="primary"
                size="sm"
                icon="arrow_forward"
                iconPosition="right"
                onClick={() => setCurrentView('courses')}
                className="shadow-2xs hover:shadow-xs text-xs h-9 px-4"
              >
                {siteSettings.ctaPrimaryText || 'Fazer Pré-Inscrição'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                icon="location_on"
                iconPosition="left"
                onClick={() => setCurrentView('polos')}
                className="text-xs h-9 px-4"
              >
                {siteSettings.ctaSecondaryText || `Ver Polos e Oficinas (${siteSettings.stats?.polosCount || polos.length})`}
              </Button>
            </div>
          </motion.div>

          {/* Hero Image Bento Container (Compact Proportion) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 w-full order-1 lg:order-2 relative h-[200px] xs:h-[240px] sm:h-[280px] lg:h-[320px]"
          >
            <div className="absolute inset-0 w-full h-full bg-secondary-container rounded-2xl transform translate-x-2 translate-y-2 -z-10 shadow-sm"></div>
            <SafeImage
              alt="Formação prática industrial de Rigger e operação pesada na Técnogest"
              category="rigger"
              wrapperClassName="w-full h-full rounded-2xl shadow-md border border-outline-variant/30"
              className="w-full h-full object-cover object-center"
              src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=80"
            />
            {/* Floating Stat Badge */}
            <div className="absolute bottom-2.5 left-2.5 sm:bottom-4 sm:left-4 bg-white/95 backdrop-blur-xs p-2 sm:p-2.5 rounded-xl shadow-md border border-outline-variant/40 flex items-center gap-2.5 animate-in slide-in-from-bottom-4 duration-500 max-w-[calc(100%-1.5rem)]">
              <div className="bg-primary-container text-on-primary-container p-1.5 rounded-lg flex items-center justify-center shadow-2xs shrink-0">
                <span className="material-symbols-outlined text-[16px] sm:text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  engineering
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-sm sm:text-base font-extrabold text-primary m-0 leading-tight">
                  {siteSettings.stats?.studentsTrained || '18.500+'}
                </p>
                <p className="text-[9.5px] sm:text-[10px] font-semibold text-on-surface-variant m-0 truncate">Profissionais Capacitados</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Ribbon */}
      <section className="w-full bg-primary text-on-primary py-6 px-4 md:px-8 border-b border-primary-container shadow-inner">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-2">
            <p className="text-2xl sm:text-3xl font-black text-secondary-container">
              {siteSettings.stats?.activeCourses || `+${courses.length}`}
            </p>
            <p className="text-xs sm:text-sm text-on-primary/80 font-medium mt-0.5">Cursos Industriais</p>
          </div>
          <div className="p-2">
            <p className="text-2xl sm:text-3xl font-black text-secondary-container">
              {siteSettings.stats?.polosCount || `+${polos.length}`}
            </p>
            <p className="text-xs sm:text-sm text-on-primary/80 font-medium mt-0.5">Polos & Gabinetes</p>
          </div>
          <div className="p-2">
            <p className="text-2xl sm:text-3xl font-black text-secondary-container">100%</p>
            <p className="text-xs sm:text-sm text-on-primary/80 font-medium mt-0.5">Certificado INEFOP</p>
          </div>
          <div className="p-2">
            <p className="text-2xl sm:text-3xl font-black text-secondary-container">
              {siteSettings.stats?.employmentRate || '98.5%'}
            </p>
            <p className="text-xs sm:text-sm text-on-primary/80 font-medium mt-0.5">Taxa de Absorção</p>
          </div>
        </div>
      </section>

      {/* Porquê Escolher a Técnogest? */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={fadeInUp}
        className="py-16 bg-surface-container-lowest border-y border-outline-variant/30 px-4 md:px-8"
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-3">Porquê Escolher a {siteSettings.brandShortName || 'Técnogest'}?</h2>
            <p className="text-base text-on-surface-variant max-w-2xl mx-auto">
              Inovar para melhor servir com foco em práticas de campo, certificação oficial homologada pelo INEFOP e parceria internacional.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <motion.div
              variants={fadeInUp}
              className="flex flex-col items-center text-center p-6 bg-surface-container-low/50 rounded-2xl border border-outline-variant/40 shadow-2xs hover:-translate-y-1 transition-transform"
            >
              <div className="w-14 h-14 bg-primary-fixed text-primary rounded-full flex items-center justify-center mb-4 shadow-xs">
                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
              </div>
              <h3 className="font-bold text-base text-primary mb-2">Homologado pelo INEFOP</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Certificados profissionais com validade legal em todo o território nacional e no setor petrolífero.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col items-center text-center p-6 bg-surface-container-low/50 rounded-2xl border border-outline-variant/40 shadow-2xs hover:-translate-y-1 transition-transform"
            >
              <div className="w-14 h-14 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center mb-4 shadow-xs">
                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  precision_manufacturing
                </span>
              </div>
              <h3 className="font-bold text-base text-primary mb-2">Pátio de Manobras e Prática Real</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Aulas práticas com gruas, empilhadores, bancadas de soldadura industrial e simulação portuária.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col items-center text-center p-6 bg-surface-container-low/50 rounded-2xl border border-outline-variant/40 shadow-2xs hover:-translate-y-1 transition-transform"
            >
              <div className="w-14 h-14 bg-primary-fixed text-primary rounded-full flex items-center justify-center mb-4 shadow-xs">
                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  flight_takeoff
                </span>
              </div>
              <h3 className="font-bold text-base text-primary mb-2">Programa Plano Portugal</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Especialização técnica + assessoria de visto + encaminhamento para contrato de trabalho em Portugal.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col items-center text-center p-6 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center mb-4 shadow-xs"
            >
              <div className="w-14 h-14 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center mb-4 shadow-xs">
                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  handshake
                </span>
              </div>
              <h3 className="font-bold text-base text-primary mb-2">Parceria INÇATEC & TÉCNOFORM</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Cartas de recomendação e estágio para acelerar a contratação nas principais operadoras industriais.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Cursos em Destaque Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={fadeInUp}
        className="py-16 px-4 md:px-8 max-w-[1200px] mx-auto w-full"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-outline-variant/40 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-primary">Formações Industriais em Destaque</h2>
            <p className="text-sm text-on-surface-variant mt-1">Cursos práticos de alta demanda para o setor petrolífero, obras e mobilidade internacional.</p>
          </div>
          <button
            onClick={() => setCurrentView('courses')}
            className="flex items-center gap-2 text-primary font-bold text-sm hover:text-secondary transition-colors cursor-pointer group"
          >
            <span>Ver catálogo completo ({courses.length})</span>
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>

        {/* Category Filter Chips */}
        <div className="flex overflow-x-auto hide-scroll gap-2 mb-8 pb-2">
          {categoryList.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-variant'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Course Cards Grid */}
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCourses.map((course) => (
            <motion.article
              key={course.id}
              variants={fadeInUp}
              onClick={() => navigateToCourseDetail(course)}
              className="bg-white rounded-2xl border border-outline-variant shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden bg-surface-container-high">
                <SafeImage
                  wrapperClassName="w-full h-full"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={course.image}
                  alt={course.name}
                  category={course.category}
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  {course.status === 'abertas' && (
                    <span className="bg-[#0A2558] text-[#00D2FF] text-[11px] font-bold px-2.5 py-1 rounded-full uppercase shadow-xs border border-[#00D2FF]/30">
                      Inscrições Abertas
                    </span>
                  )}
                  {course.status === 'limitadas' && (
                    <span className="bg-secondary-container text-on-secondary-container text-[11px] font-bold px-2.5 py-1 rounded-full uppercase shadow-xs">
                      Vagas Limitadas
                    </span>
                  )}
                  {course.status === 'esgotadas' && (
                    <span className="bg-surface-dim text-on-surface text-[11px] font-bold px-2.5 py-1 rounded-full uppercase opacity-90">
                      Turmas Esgotadas
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                    {course.category}
                  </span>
                  <h3 className="text-xl font-bold text-primary mt-1 mb-2 group-hover:text-secondary transition-colors line-clamp-1">
                    {course.name}
                  </h3>
                  <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                    {course.shortDescription}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-on-surface-variant text-xs mb-3">
                    <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
                    <span>Duração: {course.duration}</span>
                  </div>

                  <div className="pt-3 border-t border-outline-variant/30 flex justify-between items-center">
                    <div>
                      <span className="text-primary font-bold text-lg">{formatKZ(course.price)}</span>
                      <span className="text-[11px] text-on-surface-variant">/total</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateToCourseDetail(course);
                      }}
                      className="text-primary font-bold text-xs hover:text-secondary transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>Ver Detalhes</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      {/* Cartazes e Flyers Oficiais Técnogest */}
      <TecnogestFlyers />

      {/* Testimonials / Avaliações dos Formandos */}
      {featuredReviews.length > 0 && (
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeInUp}
          className="py-16 bg-surface-container-low px-4 md:px-8 border-y border-outline-variant/30"
        >
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-10">
              <span className="text-secondary font-bold tracking-wider uppercase text-xs mb-1 block">
                Resultados Comprovados
              </span>
              <h2 className="text-3xl font-extrabold text-primary">O que dizem os nossos formandos</h2>
              <p className="text-sm text-on-surface-variant max-w-xl mx-auto mt-2">
                Conheça os relatos de quem conquistou a sua vaga na indústria e no mercado internacional com a certificação da Técnogest.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className="material-symbols-outlined text-[18px]"
                          style={{
                            fontVariationSettings: i < Math.floor(rev.rating) ? "'FILL' 1" : "'FILL' 0"
                          }}
                        >
                          star
                        </span>
                      ))}
                      <span className="text-xs font-bold text-on-surface ml-1">{rev.rating.toFixed(1)}</span>
                    </div>

                    <p className="text-xs text-on-surface leading-relaxed italic">
                      "{rev.comment}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-outline-variant/30 mt-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-extrabold text-xs">
                      {(rev.authorName || rev.studentName || 'F').charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-primary truncate">
                        {rev.authorName || rev.studentName || 'Formando Técnogest'}
                      </p>
                      <p className="text-[10px] text-on-surface-variant truncate">
                        {rev.courseName || 'Formação Técnica'} • {rev.poloName || rev.authorRole || 'Polo Sede'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Bloco Chat de Pré-inscrição (WhatsApp Interactive Section) */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={fadeInUp}
        className="py-16 bg-surface-container-lowest border-t border-outline-variant/30 px-4 md:px-8"
      >
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeInUp}>
            <span className="text-secondary font-bold tracking-wider uppercase text-xs mb-2 block">
              Atendimento Rápido e Seguro
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary mb-4 leading-tight">
              Inscreva-se sem sair de casa pelo WhatsApp da Técnogest
            </h2>
            <p className="text-base text-on-surface-variant mb-6 leading-relaxed">
              A nossa equipa de secretaria técnica e consultoria de carreiras está pronta para o ajudar a escolher a formação ideal, polo e horário. Garanta a sua vaga nas turmas com vagas limitadas.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setIsChatModalOpen(true)}
                className="bg-primary text-on-primary px-6 py-3.5 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-container transition-colors shadow-md cursor-pointer"
              >
                <span className="material-symbols-outlined text-secondary-container">smart_toy</span>
                <span>Fazer inscrição</span>
              </button>
              <a
                href={`https://wa.me/${siteSettings.whatsappOfficial.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#1EBE5A] text-white px-6 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-md"
              >
                <span className="material-symbols-outlined text-[20px]">chat</span>
                <span>Falar com Secretaria ({siteSettings.primaryPhone})</span>
              </a>
            </div>
          </motion.div>

          {/* Interactive Phone Simulator */}
          <motion.div
            variants={fadeInUp}
            className="relative max-w-sm mx-auto w-full"
          >
            <div className="bg-white border-[8px] border-surface-variant rounded-[2.5rem] shadow-2xl overflow-hidden relative aspect-[9/18] flex flex-col">
              {/* Phone Notch */}
              <div className="h-5 bg-surface-variant rounded-b-xl w-1/3 mx-auto z-10 shrink-0"></div>

              {/* Chat Header */}
              <div className="bg-[#0A2558] text-white p-3.5 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white text-[#0A2558] flex items-center justify-center font-bold text-xs">
                    TG
                  </div>
                  <div>
                    <h4 className="font-bold text-xs leading-tight">Secretaria Técnogest</h4>
                    <p className="text-[10px] text-[#00D2FF] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF]"></span> Online
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsChatModalOpen(true)}
                  className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded text-white"
                >
                  Abrir
                </button>
              </div>

              {/* Chat Simulated Body */}
              <div className="bg-[#E5DDD5] p-3 flex-1 overflow-y-auto flex flex-col gap-2.5 text-xs">
                <div className="bg-white p-2.5 rounded-xl rounded-tl-none shadow-2xs max-w-[85%] self-start text-gray-800">
                  Olá! 👋 Bem-vindo à Técnogest. Em que polo gostaria de frequentar a sua formação?
                  <div className="text-[9px] text-gray-400 text-right mt-1">10:42</div>
                </div>

                {chatStep === 1 && (
                  <div className="flex flex-wrap gap-1.5 pl-2">
                    {polos.slice(0, 4).map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setInteractiveChatPolo(p.name);
                          setChatStep(2);
                        }}
                        className="bg-white hover:bg-secondary-container text-primary font-bold text-[11px] px-2.5 py-1 rounded-full shadow-2xs border border-primary/20 cursor-pointer"
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                )}

                {chatStep >= 2 && (
                  <>
                    <div className="bg-[#DCF8C6] p-2.5 rounded-xl rounded-tr-none shadow-2xs max-w-[85%] self-end text-gray-800">
                      Gostaria no {interactiveChatPolo}.
                      <div className="text-[9px] text-gray-500 text-right mt-0.5">10:43 ✓✓</div>
                    </div>

                    <div className="bg-white p-2.5 rounded-xl rounded-tl-none shadow-2xs max-w-[85%] self-start text-gray-800">
                      Excelente escolha! E qual é o curso industrial da sua preferência?
                      <div className="text-[9px] text-gray-400 text-right mt-1">10:43</div>
                    </div>
                  </>
                )}

                {chatStep === 2 && (
                  <div className="flex flex-wrap gap-1.5 pl-2">
                    {courses.slice(0, 4).map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          setInteractiveChatCourse(c.name);
                          setChatStep(3);
                        }}
                        className="bg-white hover:bg-secondary-container text-primary font-bold text-[11px] px-2.5 py-1 rounded-full shadow-2xs border border-primary/20 cursor-pointer"
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                )}

                {chatStep === 3 && (
                  <>
                    <div className="bg-[#DCF8C6] p-2.5 rounded-xl rounded-tr-none shadow-2xs max-w-[85%] self-end text-gray-800">
                      {interactiveChatCourse}
                      <div className="text-[9px] text-gray-500 text-right mt-0.5">10:44 ✓✓</div>
                    </div>

                    <div className="bg-white p-2.5 rounded-xl rounded-tl-none shadow-2xs max-w-[85%] self-start text-gray-800 space-y-1.5">
                      <p>Perfeito! Para concluir o registo da sua vaga na Técnogest, clique abaixo para abrir o formulário completo:</p>
                      <button
                        onClick={() => setIsChatModalOpen(true)}
                        className="w-full bg-[#0A2558] text-white font-bold py-1.5 rounded-lg text-center shadow-xs cursor-pointer"
                      >
                        Finalizar Inscrição
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Chat Input */}
              <div className="bg-[#f0f0f0] p-2 flex items-center gap-2 border-t border-outline-variant/30">
                <input
                  type="text"
                  readOnly
                  onClick={() => setIsChatModalOpen(true)}
                  placeholder="Toque para responder..."
                  className="bg-white flex-1 rounded-full h-8 px-3 text-gray-500 text-xs cursor-pointer border border-outline-variant/40"
                />
                <button
                  onClick={() => setIsChatModalOpen(true)}
                  className="w-8 h-8 bg-[#0A2558] rounded-full flex items-center justify-center text-[#00D2FF] shrink-0 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">send</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={fadeInUp}
      >
        <FAQ />
      </motion.div>
    </div>
  );
};
