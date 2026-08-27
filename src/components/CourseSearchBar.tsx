import React from 'react';
import { CourseCategory, Polo } from '../types';

interface CourseSearchBarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  selectedPolo: string;
  onPoloChange: (poloId: string) => void;
  sortBy: 'recent' | 'price_asc' | 'price_desc';
  onSortChange: (sort: 'recent' | 'price_asc' | 'price_desc') => void;
  categories: { id: string; label: string; count: number }[];
  polos: Polo[];
  totalResults: number;
  totalCourses: number;
  onClearFilters: () => void;
}

export const CourseSearchBar: React.FC<CourseSearchBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedPolo,
  onPoloChange,
  sortBy,
  onSortChange,
  categories,
  polos,
  totalResults,
  totalCourses,
  onClearFilters
}) => {
  const hasActiveFilters = searchQuery.trim() !== '' || selectedCategory !== '' || selectedPolo !== '' || sortBy !== 'recent';

  return (
    <div className="w-full bg-surface-container-lowest p-5 sm:p-6 rounded-3xl shadow-sm border border-outline-variant/60 space-y-4">
      {/* Top Search Input & Action Row */}
      <div className="flex flex-col lg:flex-row gap-3 items-stretch">
        {/* Main Search Input */}
        <div className="relative flex-1 group">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors text-[22px]">
            search
          </span>
          <input
            id="course-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Pesquisar por nome de curso, área técnica ou palavras-chave..."
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl border border-outline-variant bg-surface text-sm sm:text-base text-on-surface placeholder:text-on-surface-variant/70 focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary p-1 rounded-full hover:bg-surface-container transition-colors cursor-pointer"
              title="Limpar pesquisa"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>

        {/* Dropdowns Group */}
        <div className="flex flex-wrap sm:flex-nowrap gap-2.5">
          {/* Polo Selector */}
          <div className="flex-1 sm:w-48 relative">
            <select
              value={selectedPolo}
              onChange={(e) => onPoloChange(e.target.value)}
              className="w-full pl-3.5 pr-8 py-3.5 rounded-2xl border border-outline-variant bg-surface text-xs sm:text-sm font-semibold text-on-surface focus:ring-2 focus:ring-primary focus:border-primary cursor-pointer appearance-none shadow-xs"
            >
              <option value="">Todos os Polos</option>
              {polos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.municipality})
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant text-[18px]">
              expand_more
            </span>
          </div>

          {/* Sort Selector */}
          <div className="flex-1 sm:w-48 relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as any)}
              className="w-full pl-3.5 pr-8 py-3.5 rounded-2xl border border-outline-variant bg-surface text-xs sm:text-sm font-semibold text-on-surface focus:ring-2 focus:ring-primary focus:border-primary cursor-pointer appearance-none shadow-xs"
            >
              <option value="recent">Mais Relevantes</option>
              <option value="price_asc">Preço: Menor para Maior</option>
              <option value="price_desc">Preço: Maior para Menor</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant text-[18px]">
              sort
            </span>
          </div>
        </div>
      </div>

      {/* Category Pills Slider / Filter Chips */}
      <div className="pt-2">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
          <button
            onClick={() => onCategoryChange('')}
            className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              selectedCategory === ''
                ? 'bg-primary text-white shadow-xs'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-primary'
            }`}
          >
            <span>Todas as Categorias</span>
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${
              selectedCategory === '' ? 'bg-white/20 text-white' : 'bg-surface-container-high text-on-surface-variant'
            }`}>
              {totalCourses}
            </span>
          </button>

          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(isSelected ? '' : cat.id)}
                className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  isSelected
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-primary'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-surface-container-high text-on-surface-variant'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header & Active Filter Tags Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-outline-variant/40">
        <div className="flex items-center gap-2 text-xs font-bold text-on-surface-variant">
          <span className="material-symbols-outlined text-[16px] text-primary">filter_list</span>
          <span>
            Mostrando <strong className="text-primary font-black">{totalResults}</strong> de {totalCourses} formações
          </span>
        </div>

        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap">
            {searchQuery.trim() && (
              <span className="inline-flex items-center gap-1 bg-secondary-container text-on-secondary-container px-2.5 py-1 rounded-lg text-xs font-bold shadow-2xs">
                <span>&ldquo;{searchQuery}&rdquo;</span>
                <button
                  onClick={() => onSearchChange('')}
                  className="hover:text-primary cursor-pointer flex items-center"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </span>
            )}

            {selectedCategory && (
              <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2.5 py-1 rounded-lg text-xs font-bold shadow-2xs">
                <span>{selectedCategory}</span>
                <button
                  onClick={() => onCategoryChange('')}
                  className="hover:text-red-600 cursor-pointer flex items-center"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </span>
            )}

            {selectedPolo && (
              <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2.5 py-1 rounded-lg text-xs font-bold shadow-2xs">
                <span>{polos.find(p => p.id === selectedPolo)?.name || selectedPolo}</span>
                <button
                  onClick={() => onPoloChange('')}
                  className="hover:text-red-600 cursor-pointer flex items-center"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </span>
            )}

            <button
              onClick={onClearFilters}
              className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline flex items-center gap-1 px-2 py-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">restart_alt</span>
              <span>Limpar Filtros</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
