import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Course } from '../types';
import { CourseDetailSkeleton } from '../components/Skeleton';
import { CourseReviews } from '../components/CourseReviews';
import { SEOHead } from '../components/SEOHead';
import { OFFICIAL_FLAYERS } from '../components/TecnogestFlyers';
import { SafeImage } from '../components/ui/SafeImage';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '../components/ui/breadcrumb';

export const CourseDetailView: React.FC = () => {
  const {
    selectedCourse,
    courses,
    navigateToCourseDetail,
    navigateToEnroll,
    setCurrentView,
    getCourseStats,
    setIsChatModalOpen,
    siteSettings
  } = useApp();

  const [isLoading, setIsLoading] = useState(true);

  const course: Course = selectedCourse || courses[0];
  const stats = getCourseStats(course?.id || '');

  useEffect(() => {
    // Simulate perceived performance transition / data loading
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [course?.id]);

  const relatedCourses = courses
    .filter(c => c.id !== course.id && (c.category === course.category || c.featured))
    .slice(0, 3);

  const formatKZ = (val: number) => {
    return val.toLocaleString('pt-AO') + ' KZ';
  };

  const handleEnrollClick = () => {
    navigateToEnroll(course.id);
  };

  if (isLoading) {
    return <CourseDetailSkeleton />;
  }

  return (
    <div className="w-full bg-background pb-20 md:pb-12">
      {/* Dynamic SEO Meta & Course Schema JSON-LD */}
      <SEOHead
        title={`${course.name} - Formação Certificada INEFOP | ${siteSettings.brandShortName || 'Técnogest'}`}
        description={`Formação técnica prática de ${course.name} em Luanda. Duração de ${course.duration}, valor de ${formatKZ(course.price)}. ${course.shortDescription}`}
        keywords={[
          course.name,
          `curso de ${course.name} Luanda`,
          `formação ${course.category} Angola`,
          'certificado INEFOP',
          'preço curso Técnogest'
        ]}
        canonicalUrl={`https://tecnogest.ao/curso/${course.id}`}
        ogImage={course.image}
        course={course}
      />

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-6 md:py-10">
        {/* Breadcrumb with Shadcn UI */}
        <div className="mb-6">
          <Breadcrumb className="text-xs">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  onClick={() => setCurrentView('home')}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Início
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  onClick={() => setCurrentView('courses')}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Cursos
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-primary font-bold line-clamp-1">
                  {course.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Main 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Course Main Content (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Hero Section Card */}
            <section className="relative rounded-2xl overflow-hidden shadow-sm border border-outline-variant bg-surface-container-lowest">
              <div className="aspect-video sm:aspect-21/9 w-full relative bg-surface-container-high overflow-hidden">
                <SafeImage
                  alt={course.name}
                  category={course.category}
                  wrapperClassName="w-full h-full"
                  className="w-full h-full object-cover"
                  src={course.image}
                />
                {/* Badges Overlay */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="bg-[#ba1a1a] text-white font-bold text-xs px-3 py-1 rounded-md uppercase shadow-sm self-start">
                    Matrículas Abertas
                  </span>
                  <span className="bg-secondary-container text-on-secondary-container font-bold text-xs px-3 py-1 rounded-md shadow-sm self-start">
                    {course.modality}
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary m-0 tracking-tight">
                    {course.name}
                  </h1>
                  <div className="flex items-center gap-1.5 text-on-surface-variant bg-surface-container py-1 px-3 rounded-lg text-xs font-bold">
                    <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
                    <span>{course.duration}</span>
                  </div>
                  {/* Rating summary badge */}
                  <div className="flex items-center gap-1.5 bg-[#FFF9E6] border border-[#FFE082] text-on-surface px-2.5 py-1 rounded-lg text-xs font-bold shadow-2xs">
                    <span className="material-symbols-outlined text-[16px] text-[#FFB800]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span className="text-primary font-black">{stats.average}</span>
                    <span className="text-on-surface-variant text-[11px]">({stats.totalReviews} avaliações)</span>
                  </div>
                </div>

                <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
                  {course.fullDescription}
                </p>
              </div>
            </section>

            {/* O Que Vai Aprender Section */}
            <section className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 border border-outline-variant shadow-sm space-y-5">
              <div className="flex items-center gap-2.5 border-b border-outline-variant/40 pb-3">
                <span className="material-symbols-outlined text-secondary text-[24px]">menu_book</span>
                <h2 className="text-2xl font-bold text-primary">O Que Vai Aprender</h2>
              </div>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-sm text-on-surface">
                {course.syllabus.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span
                      className="material-symbols-outlined text-primary mt-0.5 text-[20px] shrink-0"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Requisitos & Saídas Profissionais Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Requisitos */}
              <section className="bg-surface-container-low/60 rounded-2xl p-6 border border-outline-variant space-y-3">
                <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[22px]">assignment</span>
                  <span>Requisitos e Documentos</span>
                </h3>
                <ul className="list-disc list-inside text-xs sm:text-sm text-on-surface-variant space-y-1.5 pl-1">
                  {course.requirements.map((req, idx) => (
                    <li key={idx} className="leading-relaxed">{req}</li>
                  ))}
                </ul>
              </section>

              {/* Saídas Profissionais */}
              <section className="bg-surface-container-low/60 rounded-2xl p-6 border border-outline-variant space-y-3">
                <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[22px]">work</span>
                  <span>Saídas Profissionais</span>
                </h3>
                <ul className="list-disc list-inside text-xs sm:text-sm text-on-surface-variant space-y-1.5 pl-1">
                  {course.careerOutcomes.map((career, idx) => (
                    <li key={idx} className="leading-relaxed">{career}</li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Reviews & Student Feedback Section */}
            <CourseReviews courseId={course.id} courseName={course.name} />
          </div>

          {/* Right Column: Sticky Sidebar (4 cols) */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-24 space-y-6">
              {/* Investment Card */}
              <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-lg overflow-hidden">
                <div className="bg-primary p-6 text-center border-b-4 border-secondary">
                  <h3 className="text-2xl font-extrabold text-secondary-container m-0">
                    Investimento
                  </h3>
                  <p className="text-on-primary text-xs mt-1 opacity-90">
                    Construa o seu futuro profissional hoje
                  </p>
                </div>

                <div className="p-6 space-y-5">
                  <div className="flex justify-between items-center border-b border-surface-variant pb-3">
                    <span className="text-sm text-on-surface-variant">Inscrição</span>
                    <span className="font-bold text-primary text-base">
                      {formatKZ(course.registrationFee || 2000)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pb-2">
                    <span className="text-sm text-on-surface-variant">Mensalidade</span>
                    <span className="text-2xl font-extrabold text-primary">
                      {formatKZ(course.price)}
                    </span>
                  </div>

                  <div className="bg-surface-container-low p-3.5 rounded-xl text-center border border-outline-variant/30">
                    <p className="text-xs text-on-surface">
                      <span className="font-bold text-primary">Próxima Turma:</span>{' '}
                      {course.nextClassDate}
                    </p>
                  </div>

                  {/* Primary Enroll CTA */}
                  <button
                    onClick={handleEnrollClick}
                    className="w-full bg-[#25D366] hover:bg-[#1EBE5A] text-white font-bold text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
                    <span>Fazer a Minha Inscrição</span>
                  </button>

                  <button
                    onClick={() => setIsChatModalOpen(true)}
                    className="w-full bg-surface text-primary border border-outline-variant hover:bg-surface-container font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">support_agent</span>
                    <span>Tirar Dúvidas com Assistente</span>
                  </button>

                  <div className="pt-2 border-t border-outline-variant/30">
                    <p className="text-xs text-on-surface-variant text-center flex items-center justify-center gap-1.5 font-medium">
                      <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                        verified_user
                      </span>
                      <span>Certificado Reconhecido (MAPTSS / INEFOP)</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-sm p-6">
                <h4 className="font-bold text-sm text-primary mb-3 border-b border-outline-variant/40 pb-2 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-primary">location_on</span>
                  <span>Disponível nos Centros:</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {course.availablePolos.map((polo, idx) => (
                    <span
                      key={idx}
                      className="bg-surface-container text-on-surface text-xs font-semibold px-3 py-1 rounded-full border border-outline-variant/40"
                    >
                      {polo}
                    </span>
                  ))}
                </div>
              </div>

              {/* Official Flyer Banner if available */}
              {(() => {
                const flyer = OFFICIAL_FLAYERS.find(f => f.courseId === course.id);
                if (!flyer) return null;
                return (
                  <div className="bg-gradient-to-br from-[#0A2558] to-[#103b87] rounded-2xl p-5 text-white border border-[#00D2FF]/30 shadow-md space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${flyer.badgeColor}`}>
                        {flyer.badge}
                      </span>
                      <span className="text-[10px] font-bold text-[#00D2FF]">FLYER OFICIAL</span>
                    </div>
                    <h5 className="font-black text-sm text-white">{flyer.title}</h5>
                    <div className="space-y-1 text-xs text-slate-200">
                      {flyer.benefits.map((b, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <span className="text-[#00D2FF]">✓</span>
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-2 border-t border-white/10 text-[11px] text-slate-300">
                      <p className="font-semibold text-[#00D2FF]">Parceiros Homologados:</p>
                      <p className="text-[10px] text-slate-300">{flyer.partners.join(' • ')}</p>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>

        {/* Related Courses Section */}
        {relatedCourses.length > 0 && (
          <section className="mt-16 pt-12 border-t border-outline-variant/40">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-primary">Cursos Relacionados</h2>
                <p className="text-xs text-on-surface-variant mt-0.5">Explore outras opções formativas nesta área</p>
              </div>
              <button
                onClick={() => setCurrentView('courses')}
                className="text-primary font-bold text-xs hover:underline flex items-center gap-1 cursor-pointer"
              >
                Ver Todos <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCourses.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => navigateToCourseDetail(rel)}
                  className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="h-36 bg-surface-container-high relative overflow-hidden">
                    <SafeImage
                      src={rel.image}
                      alt={rel.name}
                      category={rel.category}
                      wrapperClassName="w-full h-full"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute bottom-2 right-2 bg-[#ba1a1a] text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-md shadow-xs">
                      {rel.status === 'abertas' ? 'Abertas' : 'Vagas'}
                    </span>
                  </div>
                  <div className="p-4 flex-grow flex flex-col justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-base text-primary mb-1 group-hover:text-secondary transition-colors line-clamp-1">
                        {rel.name}
                      </h3>
                      <p className="text-xs text-on-surface-variant line-clamp-2">
                        {rel.shortDescription}
                      </p>
                    </div>
                    <div className="flex justify-between items-center border-t border-surface-variant pt-3">
                      <span className="text-xs font-medium text-on-surface-variant">{rel.duration}</span>
                      <span className="text-xs font-bold text-primary group-hover:text-secondary flex items-center gap-1">
                        Ver Curso <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Sticky Bottom CTA on Mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white border-t border-surface-variant shadow-2xl z-40 lg:hidden flex justify-center items-center">
        <button
          onClick={handleEnrollClick}
          className="w-full max-w-md flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-[#25D366] text-white font-bold text-sm shadow-lg active:scale-95 transition-transform cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
          <span>Fazer a Minha Inscrição ({formatKZ(course.price)}/mês)</span>
        </button>
      </div>
    </div>
  );
};
