import React, { useState } from 'react';
import { CourseReview, CourseRatingStats } from '../types';
import { useApp } from '../context/AppContext';

interface CourseReviewsProps {
  courseId: string;
  courseName: string;
}

const PRESET_TAGS = [
  'Aulas 100% Práticas',
  'Laboratório Equipado',
  'Formadores Experientes',
  'Certificado Válido INEFOP',
  'Excelente Material de Apoio',
  'Horários Flexíveis',
  'Foco no Mercado de Trabalho',
  'Bom Atendimento'
];

export const CourseReviews: React.FC<CourseReviewsProps> = ({ courseId, courseName }) => {
  const { getCourseReviews, getCourseStats, addReview, likeReview, polos } = useApp();

  const reviews = getCourseReviews(courseId);
  const stats: CourseRatingStats = getCourseStats(courseId);

  // Filter state
  const [selectedRatingFilter, setSelectedRatingFilter] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Review Form State
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('Formando • Polo Viana');
  const [selectedPolo, setSelectedPolo] = useState(polos[0]?.name || 'Viana');
  const [studentStatus, setStudentStatus] = useState('Formando Atual');
  const [comment, setComment] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Aulas 100% Práticas', 'Formadores Experientes']);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredReviews = selectedRatingFilter
    ? reviews.filter(r => Math.round(r.rating) === selectedRatingFilter)
    : reviews;

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      if (selectedTags.length < 4) {
        setSelectedTags([...selectedTags, tag]);
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) {
      return;
    }

    setIsSubmitting(true);

    const roleFormatted = `${studentStatus} • Polo ${selectedPolo}`;

    addReview({
      courseId,
      authorName: authorName.trim(),
      authorRole: roleFormatted,
      rating,
      comment: comment.trim(),
      verifiedStudent: true,
      highlightTags: selectedTags
    });

    // Reset Form
    setIsSubmitting(false);
    setAuthorName('');
    setComment('');
    setIsFormOpen(false);
  };

  const getRatingLabel = (val: number) => {
    switch (val) {
      case 5:
        return 'Excelente (5/5) — Altamente Recomendado';
      case 4:
        return 'Muito Bom (4/5) — Conteúdo de Qualidade';
      case 3:
        return 'Bom (3/5) — Atendeu às expectativas';
      case 2:
        return 'Razoável (2/5) — Precisa de melhorias';
      case 1:
        return 'Insuficiente (1/5)';
      default:
        return '';
    }
  };

  const calculatePercentage = (count: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((count / total) * 100);
  };

  return (
    <section className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-6 sm:p-8 shadow-sm space-y-8">
      {/* Header with Title and "Leave Review" CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-secondary-container/50 px-3 py-1 rounded-full mb-2">
            <span className="material-symbols-outlined text-[15px] text-[#FFCC00]" style={{ fontVariationSettings: "'FILL' 1" }}>
              star
            </span>
            <span>Avaliações e Opiniões de Alunos</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-primary">
            O que dizem os nossos formandos
          </h2>
          <p className="text-xs text-on-surface-variant mt-1">
            Opiniões reais de estudantes que frequentaram o curso de <strong className="text-on-surface">{courseName}</strong>
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-container text-on-primary font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-xs transition-all cursor-pointer shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">
            {isFormOpen ? 'close' : 'rate_review'}
          </span>
          <span>{isFormOpen ? 'Fechar Formulário' : 'Avaliar este Curso'}</span>
        </button>
      </div>

      {/* Rating Overview & Distribution Bars */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-surface-container-low/40 rounded-2xl p-6 border border-outline-variant/40">
        {/* Big Rating Box (4 cols) */}
        <div className="md:col-span-4 text-center md:border-r border-outline-variant/60 md:pr-6 space-y-2">
          <div className="text-4xl sm:text-5xl font-black text-primary tracking-tight">
            {stats.average}
            <span className="text-xl sm:text-2xl text-on-surface-variant font-medium">/5.0</span>
          </div>

          <div className="flex items-center justify-center gap-1 text-[#FFB800]">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className="material-symbols-outlined text-[24px]"
                style={{
                  fontVariationSettings: star <= Math.round(stats.average) ? "'FILL' 1" : "'FILL' 0",
                }}
              >
                star
              </span>
            ))}
          </div>

          <p className="text-xs font-bold text-on-surface-variant">
            Com base em {stats.totalReviews > 0 ? stats.totalReviews : reviews.length} {reviews.length === 1 ? 'avaliação' : 'avaliações'}
          </p>

          <div className="pt-1 inline-flex items-center gap-1 text-[11px] text-green-700 font-semibold bg-green-50 px-2.5 py-1 rounded-md border border-green-200">
            <span className="material-symbols-outlined text-[14px]">verified</span>
            <span>Alunos Verificados INEFOP</span>
          </div>
        </div>

        {/* Rating Breakdown Bars (8 cols) */}
        <div className="md:col-span-8 space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = stats.distribution[stars as keyof typeof stats.distribution] || 0;
            const percentage = calculatePercentage(count, stats.totalReviews || reviews.length || 1);

            return (
              <button
                key={stars}
                type="button"
                onClick={() => setSelectedRatingFilter(selectedRatingFilter === stars ? null : stars)}
                className={`w-full flex items-center gap-3 text-xs group cursor-pointer p-1 rounded-lg transition-colors ${
                  selectedRatingFilter === stars ? 'bg-primary/10 font-bold' : 'hover:bg-surface-container'
                }`}
              >
                <div className="flex items-center gap-1 w-14 shrink-0 text-on-surface">
                  <span className="font-bold">{stars}</span>
                  <span className="material-symbols-outlined text-[15px] text-[#FFB800]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                </div>

                <div className="flex-1 h-2.5 bg-surface-container-high rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FFB800] rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <div className="w-16 text-right text-on-surface-variant font-medium shrink-0 text-[11px]">
                  {count} ({percentage}%)
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Review Submission Form (Expandable) */}
      {isFormOpen && (
        <form
          onSubmit={handleFormSubmit}
          className="bg-surface-container rounded-2xl p-6 border-2 border-primary/20 space-y-5 animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between border-b border-outline-variant/60 pb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]">rate_review</span>
              <h3 className="font-bold text-base text-primary">A sua Avaliação do Curso</h3>
            </div>
            <span className="text-xs text-on-surface-variant">* Campos obrigatórios</span>
          </div>

          {/* Interactive Star Rating Picker */}
          <div>
            <label className="block text-xs font-bold text-on-surface mb-2">
              Como classifica este curso? *
            </label>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 bg-surface-container-lowest px-4 py-2 rounded-xl border border-outline-variant">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled = (hoverRating !== null ? hoverRating : rating) >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      onClick={() => setRating(star)}
                      className="text-[#FFB800] hover:scale-125 transition-transform cursor-pointer p-0.5"
                    >
                      <span
                        className="material-symbols-outlined text-[28px]"
                        style={{ fontVariationSettings: isFilled ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        star
                      </span>
                    </button>
                  );
                })}
              </div>
              <span className="text-xs font-bold text-primary">
                {getRatingLabel(hoverRating !== null ? hoverRating : rating)}
              </span>
            </div>
          </div>

          {/* Form Fields: Name, Status & Polo */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface mb-1">
                O seu Nome Completo *
              </label>
              <input
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Ex: João Baptista Silva"
                className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs text-on-surface focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface mb-1">
                Polo de Formação *
              </label>
              <select
                value={selectedPolo}
                onChange={(e) => setSelectedPolo(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs text-on-surface focus:ring-2 focus:ring-primary focus:border-primary cursor-pointer"
              >
                {polos.map((p) => (
                  <option key={p.id} value={p.name}>
                    Polo {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface mb-1">
                Vínculo com o Centro *
              </label>
              <select
                value={studentStatus}
                onChange={(e) => setStudentStatus(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs text-on-surface focus:ring-2 focus:ring-primary focus:border-primary cursor-pointer"
              >
                <option value="Formando Atual">Formando Atual</option>
                <option value="Ex-Aluno Concluído">Ex-Aluno Concluído</option>
                <option value="Formando de Sábado">Formando Turma de Sábado</option>
                <option value="Técnico Certificado">Técnico Certificado INEFOP</option>
              </select>
            </div>
          </div>

          {/* Quick Highlight Tags */}
          <div>
            <label className="block text-xs font-bold text-on-surface mb-2">
              Destaques Positivos (escolha até 4 tópicos):
            </label>
            <div className="flex flex-wrap gap-2">
              {PRESET_TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagToggle(tag)}
                    className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-primary text-on-primary border-primary shadow-2xs'
                        : 'bg-surface hover:bg-surface-container text-on-surface-variant border-outline-variant/60'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Feedback Commentary */}
          <div>
            <label className="block text-xs font-bold text-on-surface mb-1">
              O seu Testemunho e Feedback Detalhado *
            </label>
            <textarea
              required
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Descreva a sua experiência com as aulas práticas, os professores, o ambiente do laboratório e como o curso ajudou no seu desenvolvimento profissional..."
              className="w-full p-3.5 rounded-xl border border-outline-variant bg-surface text-xs text-on-surface focus:ring-2 focus:ring-primary focus:border-primary leading-relaxed"
            />
          </div>

          {/* Verification check and Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-outline-variant/60">
            <span className="text-[11px] text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-primary">security</span>
              A sua opinião ajuda futuros jovens formandos a escolherem o rumo profissional.
            </span>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-4 py-2.5 text-xs font-bold text-on-surface-variant hover:text-on-surface rounded-xl cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 sm:flex-none bg-primary hover:bg-primary-container text-on-primary font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[16px]">send</span>
                <span>Publicar Avaliação</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Filter Chips Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-on-surface-variant">Filtrar por:</span>
          <button
            type="button"
            onClick={() => setSelectedRatingFilter(null)}
            className={`text-xs px-3 py-1 rounded-full font-bold transition-colors cursor-pointer border ${
              selectedRatingFilter === null
                ? 'bg-primary text-on-primary border-primary'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high border-outline-variant/60'
            }`}
          >
            Todas ({reviews.length})
          </button>
          {[5, 4, 3].map((star) => {
            const count = reviews.filter((r) => Math.round(r.rating) === star).length;
            if (count === 0) return null;
            return (
              <button
                key={star}
                type="button"
                onClick={() => setSelectedRatingFilter(star)}
                className={`text-xs px-3 py-1 rounded-full font-bold transition-colors cursor-pointer flex items-center gap-1 border ${
                  selectedRatingFilter === star
                    ? 'bg-primary text-on-primary border-primary'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high border-outline-variant/60'
                }`}
              >
                <span>{star} Estrelas</span>
                <span className="text-[10px] opacity-80">({count})</span>
              </button>
            );
          })}
        </div>

        <span className="text-xs text-on-surface-variant font-medium">
          A mostrar {filteredReviews.length} de {reviews.length} {reviews.length === 1 ? 'opinião' : 'opiniões'}
        </span>
      </div>

      {/* Reviews List */}
      {filteredReviews.length === 0 ? (
        <div className="text-center py-10 bg-surface-container-low/30 rounded-2xl border border-dashed border-outline-variant/60 p-6 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-secondary-container/60 text-primary flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-[24px]">rate_review</span>
          </div>
          <p className="text-sm font-bold text-primary">Ainda não existem avaliações com este filtro.</p>
          <p className="text-xs text-on-surface-variant max-w-md mx-auto">
            Seja o primeiro formando a partilhar a sua experiência no curso de {courseName}.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedRatingFilter(null);
              setIsFormOpen(true);
            }}
            className="inline-flex items-center gap-1.5 bg-primary text-on-primary text-xs font-bold px-4 py-2 rounded-xl cursor-pointer hover:bg-primary-container transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">edit</span>
            <span>Escrever Primeira Avaliação</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReviews.map((rev) => {
            const initials = (rev.authorName || 'Aluno')
              .split(' ')
              .filter(Boolean)
              .map((n) => n[0])
              .slice(0, 2)
              .join('')
              .toUpperCase() || 'AL';

            return (
              <div
                key={rev.id}
                className="bg-surface-container-lowest p-5 sm:p-6 rounded-2xl border border-outline-variant/70 shadow-2xs hover:border-primary/40 transition-all space-y-3"
              >
                {/* Header: Author info, Rating, Date */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center font-black text-xs shrink-0 shadow-2xs">
                      {initials || 'VJ'}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-extrabold text-primary leading-tight">
                          {rev.authorName}
                        </h4>
                        {rev.verifiedStudent && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-green-800 bg-green-100/80 px-2 py-0.5 rounded-full border border-green-300">
                            <span className="material-symbols-outlined text-[12px]">verified</span>
                            <span>Formando Verificado</span>
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-on-surface-variant mt-0.5">
                        {rev.authorRole || 'Formando Certificado Técnogest'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:text-right">
                    <div className="flex items-center text-[#FFB800]">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className="material-symbols-outlined text-[18px]"
                          style={{
                            fontVariationSettings: star <= rev.rating ? "'FILL' 1" : "'FILL' 0",
                          }}
                        >
                          star
                        </span>
                      ))}
                    </div>
                    <span className="text-[11px] text-on-surface-variant font-medium whitespace-nowrap">
                      {rev.date}
                    </span>
                  </div>
                </div>

                {/* Comment text */}
                <p className="text-xs sm:text-sm text-on-surface leading-relaxed pt-1">
                  "{rev.comment}"
                </p>

                {/* Highlight Tags and Helpful Counter */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-outline-variant/40">
                  <div className="flex flex-wrap gap-1.5">
                    {rev.highlightTags &&
                      rev.highlightTags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-secondary-container/50 text-on-secondary-container font-semibold px-2 py-0.5 rounded-md border border-outline-variant/30"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => likeReview(rev.id)}
                    className="inline-flex items-center gap-1.5 text-xs text-on-surface-variant hover:text-primary transition-colors cursor-pointer px-2.5 py-1 rounded-lg hover:bg-surface-container"
                    title="Marcar como útil"
                  >
                    <span className="material-symbols-outlined text-[15px]">thumb_up</span>
                    <span className="text-[11px] font-bold">Útil ({rev.likesCount || 0})</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
