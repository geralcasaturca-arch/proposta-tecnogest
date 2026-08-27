import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CourseReview } from '../../types';
import { PageHeader } from '../../components/PageHeader';

export const AdminReviewsView: React.FC = () => {
  const {
    reviews,
    courses,
    addReview,
    updateReview,
    deleteReview,
    toggleApproveReview,
    toggleFeaturedReview,
    toggleVerifiedReview
  } = useApp();

  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [filterCourse, setFilterCourse] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<{
    studentName: string;
    courseId: string;
    courseName: string;
    rating: number;
    comment: string;
    verifiedStudent: boolean;
    featuredOnHome: boolean;
  }>({
    studentName: '',
    courseId: courses[0]?.id || '',
    courseName: courses[0]?.name || '',
    rating: 5,
    comment: '',
    verifiedStudent: true,
    featuredOnHome: false
  });

  const filteredReviews = reviews.filter(r => {
    if (filterRating !== 'all' && Math.round(r.rating) !== filterRating) return false;
    if (filterCourse !== 'all' && r.courseId !== filterCourse) return false;
    if (searchTerm) {
      const q = (searchTerm || '').toLowerCase().trim();
      const name = (r.studentName || r.authorName || '').toLowerCase();
      return (
        name.includes(q) ||
        (r.comment || '').toLowerCase().includes(q) ||
        (r.courseName ? r.courseName.toLowerCase().includes(q) : false)
      );
    }
    return true;
  });

  const totalReviews = reviews.length;
  const approvedReviews = reviews.filter(r => r.isApproved !== false).length;
  const featuredReviews = reviews.filter(r => r.featuredOnHome).length;
  const verifiedReviews = reviews.filter(r => r.verifiedStudent).length;

  const handleOpenAdd = () => {
    setEditingId(null);
    const initialCourse = courses[0];
    setFormData({
      studentName: '',
      courseId: initialCourse?.id || '',
      courseName: initialCourse?.name || '',
      rating: 5,
      comment: '',
      verifiedStudent: true,
      featuredOnHome: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (rev: CourseReview) => {
    setEditingId(rev.id);
    setFormData({
      studentName: rev.studentName || rev.authorName || '',
      courseId: rev.courseId,
      courseName: rev.courseName || '',
      rating: rev.rating,
      comment: rev.comment,
      verifiedStudent: rev.verifiedStudent !== false,
      featuredOnHome: !!rev.featuredOnHome
    });
    setIsModalOpen(true);
  };

  const handleCourseSelect = (courseId: string) => {
    const found = courses.find(c => c.id === courseId);
    setFormData(prev => ({
      ...prev,
      courseId,
      courseName: found ? found.name : prev.courseName
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName.trim() || !formData.comment.trim()) return;

    if (editingId) {
      updateReview(editingId, {
        authorName: formData.studentName.trim(),
        studentName: formData.studentName.trim(),
        courseId: formData.courseId,
        courseName: formData.courseName,
        rating: formData.rating,
        comment: formData.comment.trim(),
        verifiedStudent: formData.verifiedStudent,
        featuredOnHome: formData.featuredOnHome
      });
    } else {
      addReview({
        authorName: formData.studentName.trim(),
        studentName: formData.studentName.trim(),
        courseId: formData.courseId,
        courseName: formData.courseName,
        rating: formData.rating,
        comment: formData.comment.trim(),
        verifiedStudent: formData.verifiedStudent,
        featuredOnHome: formData.featuredOnHome
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto animate-in fade-in duration-200">
      {/* Standardized Reusable PageHeader */}
      <PageHeader
        title="Avaliações & Testemunhos"
        description="Aprove testemunhos de formandos, selecione destaques para a página inicial e adicione depoimentos oficiais."
        icon="reviews"
        actions={
          <button
            onClick={handleOpenAdd}
            className="h-9 px-3.5 rounded-lg bg-primary hover:bg-primary/95 text-on-primary text-xs font-semibold shadow-2xs transition-all inline-flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[17px]">add_comment</span>
            <span>Registar Depoimento</span>
          </button>
        }
      />

      {/* KPI Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant shadow-xs">
          <p className="text-[11px] font-bold text-on-surface-variant uppercase">Total Registadas</p>
          <p className="text-2xl font-extrabold text-primary mt-1">{totalReviews}</p>
        </div>
        <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant shadow-xs">
          <p className="text-[11px] font-bold text-on-surface-variant uppercase">Publicadas</p>
          <p className="text-2xl font-extrabold text-emerald-700 mt-1">{approvedReviews}</p>
        </div>
        <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant shadow-xs">
          <p className="text-[11px] font-bold text-on-surface-variant uppercase">Destaques Home</p>
          <p className="text-2xl font-extrabold text-amber-700 mt-1">{featuredReviews}</p>
        </div>
        <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant shadow-xs">
          <p className="text-[11px] font-bold text-on-surface-variant uppercase">Formandos Verificados</p>
          <p className="text-2xl font-extrabold text-blue-700 mt-1">{verifiedReviews}</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-4 flex flex-col md:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="relative w-full md:w-80">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[20px] text-on-surface-variant">
            search
          </span>
          <input
            type="text"
            placeholder="Pesquisar por formando, comentário..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-outline-variant bg-surface-container text-xs font-medium focus:border-primary outline-hidden"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <select
            value={filterRating}
            onChange={e => setFilterRating(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="px-3 py-2 rounded-xl border border-outline-variant bg-surface-container text-xs font-semibold focus:border-primary outline-hidden"
          >
            <option value="all">Todas as Estrelas</option>
            <option value="5">⭐⭐⭐⭐⭐ (5 Estrelas)</option>
            <option value="4">⭐⭐⭐⭐ (4 Estrelas)</option>
            <option value="3">⭐⭐⭐ (3 Estrelas)</option>
            <option value="2">⭐⭐ (2 Estrelas)</option>
            <option value="1">⭐ (1 Estrela)</option>
          </select>

          <select
            value={filterCourse}
            onChange={e => setFilterCourse(e.target.value)}
            className="px-3 py-2 rounded-xl border border-outline-variant bg-surface-container text-xs font-semibold focus:border-primary outline-hidden max-w-[200px]"
          >
            <option value="all">Todos os Cursos</option>
            {courses.map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container/50 text-[11px] font-bold text-on-surface-variant uppercase">
                <th className="py-3 px-4">Formando</th>
                <th className="py-3 px-4">Curso</th>
                <th className="py-3 px-4">Avaliação & Feedback</th>
                <th className="py-3 px-4">Data</th>
                <th className="py-3 px-4">Selos</th>
                <th className="py-3 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-xs">
              {filteredReviews.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-on-surface-variant font-medium">
                    Nenhuma avaliação encontrada com os filtros selecionados.
                  </td>
                </tr>
              ) : (
                filteredReviews.map(rev => (
                  <tr key={rev.id} className="hover:bg-surface-container/30 transition-colors">
                    <td className="py-3 px-4 font-bold text-primary whitespace-nowrap">
                      {rev.studentName || rev.authorName || 'Formando'}
                    </td>
                    <td className="py-3 px-4 font-semibold text-on-surface whitespace-nowrap">
                      {rev.courseName || rev.courseId}
                    </td>
                    <td className="py-3 px-4 max-w-md">
                      <div className="flex items-center gap-1 text-amber-500 mb-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className="material-symbols-outlined text-[16px]">
                            {i < Math.round(rev.rating) ? 'star' : 'star_outline'}
                          </span>
                        ))}
                        <span className="text-[11px] font-bold text-on-surface ml-1">{rev.rating}</span>
                      </div>
                      <p className="text-xs text-on-surface-variant line-clamp-2 italic">
                        "{rev.comment}"
                      </p>
                    </td>
                    <td className="py-3 px-4 text-on-surface-variant whitespace-nowrap">
                      {rev.date}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => toggleVerifiedReview(rev.id)}
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold border transition-colors cursor-pointer text-left flex items-center gap-1 ${
                            rev.verifiedStudent
                              ? 'bg-blue-100 text-blue-800 border-blue-300'
                              : 'bg-gray-100 text-gray-600 border-gray-200'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[12px]">verified</span>
                          <span>{rev.verifiedStudent ? 'Verificado' : 'Não Verificado'}</span>
                        </button>
                        <button
                          onClick={() => toggleFeaturedReview(rev.id)}
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold border transition-colors cursor-pointer text-left flex items-center gap-1 ${
                            rev.featuredOnHome
                              ? 'bg-amber-100 text-amber-800 border-amber-300'
                              : 'bg-gray-100 text-gray-600 border-gray-200'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[12px]">grade</span>
                          <span>{rev.featuredOnHome ? 'Destaque Home' : 'Comum'}</span>
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => toggleApproveReview(rev.id)}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            rev.isApproved !== false
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                          }`}
                          title={rev.isApproved !== false ? 'Ocultar / Despublicar' : 'Aprovar e Publicar'}
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {rev.isApproved !== false ? 'visibility' : 'visibility_off'}
                          </span>
                        </button>
                        <button
                          onClick={() => handleOpenEdit(rev)}
                          className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                          title="Editar"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button
                          onClick={() => {
                            const name = rev.studentName || rev.authorName || 'Formando';
                            if (window.confirm(`Deseja remover o testemunho de "${name}"?`)) {
                              deleteReview(rev.id);
                            }
                          }}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-on-surface-variant hover:text-red-600 transition-colors cursor-pointer"
                          title="Eliminar"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-6 bg-surface-container border-b border-outline-variant flex items-center justify-between">
              <h3 className="text-base font-bold text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary-container">
                  {editingId ? 'edit_note' : 'add_comment'}
                </span>
                <span>{editingId ? 'Editar Testemunho' : 'Registar Novo Testemunho Oficial'}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Nome do Formando / Aluno *
                </label>
                <input
                  type="text"
                  required
                  value={formData.studentName}
                  onChange={e => setFormData({ ...formData, studentName: e.target.value })}
                  placeholder="ex: Mauro Sebastião da Costa"
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Curso Freqüentado *
                </label>
                <select
                  required
                  value={formData.courseId}
                  onChange={e => handleCourseSelect(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-semibold focus:border-primary outline-hidden"
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Classificação / Estrelas (1 a 5)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="p-1.5 transition-transform hover:scale-110 cursor-pointer"
                    >
                      <span
                        className={`material-symbols-outlined text-[28px] ${
                          star <= formData.rating ? 'text-amber-500 fill-1' : 'text-gray-300'
                        }`}
                      >
                        star
                      </span>
                    </button>
                  ))}
                  <span className="text-xs font-bold text-primary ml-2">{formData.rating} de 5</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Depoimento / Opinião do Aluno *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.comment}
                  onChange={e => setFormData({ ...formData, comment: e.target.value })}
                  placeholder="Relate a experiência do formando, qualidade dos formadores e inserção profissional..."
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.verifiedStudent}
                    onChange={e => setFormData({ ...formData, verifiedStudent: e.target.checked })}
                    className="w-4 h-4 rounded text-primary focus:ring-primary"
                  />
                  <span className="text-xs font-bold text-on-surface">Formando Certificado</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featuredOnHome}
                    onChange={e => setFormData({ ...formData, featuredOnHome: e.target.checked })}
                    className="w-4 h-4 rounded text-primary focus:ring-primary"
                  />
                  <span className="text-xs font-bold text-on-surface">Destaque na Página Inicial</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-outline-variant hover:bg-surface-container text-xs font-bold text-on-surface-variant cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/95 text-on-primary text-xs font-bold shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  <span>{editingId ? 'Guardar Alterações' : 'Publicar Depoimento'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
