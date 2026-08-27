import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Course } from '../types';
import { SEOHead } from '../components/SEOHead';
import { CourseSearchBar } from '../components/CourseSearchBar';
import { PageHeader } from '../components/PageHeader';
import { TecnogestFlyers } from '../components/TecnogestFlyers';
import { SafeImage } from '../components/ui/SafeImage';

export const CoursesView: React.FC = () => {
  const { courses, polos, navigateToCourseDetail, setCurrentView, getCourseStats } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'price_asc' | 'price_desc'>('recent');
  const [activePoloFilter, setActivePoloFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Compute category counts
  const categoryStats = useMemo(() => {
    const counts: Record<string, number> = {};
    courses.forEach((c) => {
      counts[c.category] = (counts[c.category] || 0) + 1;
    });
    return Object.entries(counts).map(([label, count]) => ({
      id: label,
      label,
      count
    }));
  }, [courses]);

  // Filter & Sort logic
  const filteredCourses = useMemo(() => {
    let result = [...courses];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        c =>
          (c.name || '').toLowerCase().includes(q) ||
          (c.shortDescription || '').toLowerCase().includes(q) ||
          (c.category || '').toLowerCase().includes(q)
      );
    }

    if (selectedCategory) {
      result = result.filter(c => c.category === selectedCategory);
    }

    if (activePoloFilter) {
      result = result.filter(c => c.availablePolos.includes(activePoloFilter));
    }

    if (sortBy === 'price_asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [courses, searchQuery, selectedCategory, activePoloFilter, sortBy]);

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage) || 1;
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setActivePoloFilter('');
    setSortBy('recent');
    setCurrentPage(1);
  };

  const formatKZ = (val: number) => {
    return val.toLocaleString('pt-AO') + ' Kz';
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 py-8 md:py-12">
      {/* Dynamic SEO Meta & GEO structured data */}
      <SEOHead
        title="Catálogo de Formações Industriais 2025 | Técnogest Angola"
        description="Consulte a lista completa de formações industriais, marítimas e técnicas homologadas pelo INEFOP: Rigger Sinaleiro, Controlo de Qualidade, HST, Plano Portugal, Soldadura e Operação de Máquinas Pesadas em Luanda."
        keywords={[
          'cursos industriais tecnogest',
          'curso rigger sinaleiro luanda',
          'curso controlo qualidade angola',
          'plano portugal visto contrato',
          'formacao hst petrolifera luanda',
          'centro formacao homologado inefop'
        ]}
        canonicalUrl="https://tecnogest.ao/cursos"
      />

      {/* Header Section */}
      <section className="mb-8">
        <PageHeader
          title="Formações Técnicas & Industriais"
          description="Qualifique-se com cursos práticos e homologados pelo INEFOP para atuação imediata no setor petrolífero, obras e mobilidade internacional."
          icon="engineering"
        />
      </section>

      {/* Real-time Search and Filter Component */}
      <section className="mb-10">
        <CourseSearchBar
          searchQuery={searchQuery}
          onSearchChange={(val) => {
            setSearchQuery(val);
            setCurrentPage(1);
          }}
          selectedCategory={selectedCategory}
          onCategoryChange={(cat) => {
            setSelectedCategory(cat);
            setCurrentPage(1);
          }}
          selectedPolo={activePoloFilter}
          onPoloChange={(polo) => {
            setActivePoloFilter(polo);
            setCurrentPage(1);
          }}
          sortBy={sortBy}
          onSortChange={(sort) => setSortBy(sort)}
          categories={categoryStats}
          polos={polos}
          totalResults={filteredCourses.length}
          totalCourses={courses.length}
          onClearFilters={clearAllFilters}
        />
      </section>

      {/* Courses Grid */}
      {paginatedCourses.length > 0 ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {paginatedCourses.map((course) => (
            <article
              key={course.id}
              onClick={() => navigateToCourseDetail(course)}
              className="bg-surface-container-lowest rounded-2xl border border-surface-variant overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden bg-surface-container-high">
                <SafeImage
                  wrapperClassName="w-full h-full"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={course.image}
                  alt={course.name}
                  category={course.category}
                />
                <div className="absolute top-4 left-4">
                  {course.status === 'abertas' && (
                    <span className="bg-[#28a745] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                      Inscrições Abertas
                    </span>
                  )}
                  {course.status === 'limitadas' && (
                    <span className="bg-secondary-container text-on-secondary-container text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                      Vagas Limitadas
                    </span>
                  )}
                  {course.status === 'esgotadas' && (
                    <span className="bg-[#5a000a] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1 opacity-90">
                      Esgotado
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-primary-container mb-1.5 uppercase tracking-wider">
                    {course.category}
                  </div>
                  <h3 className="text-xl font-bold text-on-surface mb-2 group-hover:text-primary transition-colors line-clamp-1">
                    {course.name}
                  </h3>
                  <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed mb-3">
                    {course.shortDescription}
                  </p>
                  <div className="flex items-center justify-between gap-2 text-on-surface-variant text-xs font-medium">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
                      <span>{course.duration}</span>
                    </div>
                    {(() => {
                      const stats = getCourseStats(course.id);
                      return (
                        <div className="flex items-center gap-1 text-primary font-bold text-xs bg-secondary-container/40 px-2 py-0.5 rounded-md">
                          <span className="material-symbols-outlined text-[14px] text-[#FFB800]" style={{ fontVariationSettings: "'FILL' 1" }}>
                            star
                          </span>
                          <span>{stats.average}</span>
                          <span className="text-[10px] text-on-surface-variant font-normal">({stats.totalReviews})</span>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                <div className="pt-4 border-t border-surface-variant flex justify-between items-center">
                  <div className="text-primary font-bold text-lg">
                    {formatKZ(course.price)}
                    <span className="text-xs text-on-surface-variant font-normal">/mês</span>
                  </div>
                  {course.status !== 'esgotadas' ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateToCourseDetail(course);
                      }}
                      className="text-primary font-bold text-sm hover:text-primary-container transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>Ver Detalhes</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>
                  ) : (
                    <span className="text-outline text-xs font-bold cursor-not-allowed">
                      Sem Vagas
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <div className="bg-white rounded-2xl border border-outline-variant p-12 text-center my-8">
          <span className="material-symbols-outlined text-5xl text-outline-variant mb-3">
            search_off
          </span>
          <h3 className="text-xl font-bold text-primary mb-2">Nenhum curso encontrado</h3>
          <p className="text-sm text-on-surface-variant max-w-md mx-auto mb-6">
            Não encontramos cursos para os filtros selecionados. Tente buscar por outros termos ou limpe os filtros.
          </p>
          <button
            onClick={clearAllFilters}
            className="bg-primary text-on-primary font-bold text-sm px-6 py-2.5 rounded-full hover:bg-primary-container transition-colors cursor-pointer"
          >
            Limpar Filtros
          </button>
        </div>
      )}

      {/* Table Pagination matching screenshot */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            aria-label="Página Anterior"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            className="w-10 h-10 rounded-full flex items-center justify-center border border-outline-variant text-on-surface hover:bg-surface-container transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all cursor-pointer ${
                currentPage === page
                  ? 'bg-primary text-on-primary'
                  : 'border border-outline-variant text-on-surface hover:bg-surface-container'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            aria-label="Próxima Página"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            className="w-10 h-10 rounded-full flex items-center justify-center border border-outline-variant text-on-surface hover:bg-surface-container transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>
        </div>
      )}
      {/* Banners & Cartazes Oficiais */}
      <div className="mt-16 -mx-4 md:-mx-8">
        <TecnogestFlyers />
      </div>
    </div>
  );
};
