import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Course, CourseCategory, CourseStatus } from '../../types';
import { ImageUpload } from '../../components/ImageUpload';
import { AdminCoursesTableSkeleton, Skeleton } from '../../components/Skeleton';
import { PageHeader } from '../../components/PageHeader';
import { SafeImage } from '../../components/ui/SafeImage';
import { ConfirmModal } from '../../components/ui/ConfirmModal';
import { Button } from '../../components/ui/Button';

export const AdminCoursesView: React.FC = () => {
  const { courses, addCourse, updateCourse, deleteCourse, toggleCourseActive, polos } = useApp();

  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    course: Course | null;
    isDeleting: boolean;
  }>({
    isOpen: false,
    course: null,
    isDeleting: false
  });

  useEffect(() => {
    // Perceived performance loading simulation
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [categoryFilter]);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  };

  // Drawer Form State
  const initialFormData = {
    name: '',
    category: 'Tecnologia' as CourseCategory,
    shortDescription: '',
    fullDescription: '',
    duration: '3 Meses',
    price: 15000,
    registrationFee: 2000,
    status: 'abertas' as CourseStatus,
    modality: 'Presencial (Teórico e Prático)',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    nextClassDate: '01 de Setembro de 2025',
    availablePolos: ['Viana', 'Cacuaco', 'Talatona'],
    syllabusText: 'Introdução e Fundamentos\nNormas de Segurança no Trabalho\nAulas Práticas em Bancada de Testes\nElaboração de Projetos e Manutenção\nAvaliação Final Prática',
    requirementsText: 'Idade mínima 15 anos\nCópia do Bilhete de Identidade\n2 Fotos tipo passe\nCertificado de habilitações literárias',
    careerOutcomesText: 'Técnico Especialista em Empresas do Sector\nPrestador de Serviços Autónomo / Freelancer\nSupervisor e Gestor de Projetos Técnicos',
    featured: false,
    isActive: true
  };

  const [formData, setFormData] = useState(initialFormData);

  const filteredCourses = courses.filter(c => {
    const q = (searchQuery || '').toLowerCase().trim();
    const matchesSearch = !q ||
                          (c.name || '').toLowerCase().includes(q) ||
                          (c.category || '').toLowerCase().includes(q);
    const matchesCat = categoryFilter ? c.category === categoryFilter : true;
    return matchesSearch && matchesCat;
  });

  const handleOpenAdd = () => {
    setEditingCourseId(null);
    setFormData(initialFormData);
    setIsDrawerOpen(true);
  };

  const handleOpenEdit = (course: Course) => {
    setEditingCourseId(course.id);
    setFormData({
      name: course.name,
      category: course.category,
      shortDescription: course.shortDescription,
      fullDescription: course.fullDescription,
      duration: course.duration,
      price: course.price,
      registrationFee: course.registrationFee || 2000,
      status: course.status,
      modality: course.modality,
      image: course.image,
      nextClassDate: course.nextClassDate,
      availablePolos: course.availablePolos,
      syllabusText: course.syllabus.join('\n'),
      requirementsText: course.requirements.join('\n'),
      careerOutcomesText: course.careerOutcomes.join('\n'),
      featured: course.featured || false,
      isActive: course.isActive
    });
    setIsDrawerOpen(true);
  };

  const handlePoloCheckbox = (poloName: string) => {
    const cleanName = poloName.replace('Polo ', '');
    setFormData(prev => {
      const exists = prev.availablePolos.includes(cleanName);
      if (exists) {
        return { ...prev, availablePolos: prev.availablePolos.filter(p => p !== cleanName) };
      } else {
        return { ...prev, availablePolos: [...prev.availablePolos, cleanName] };
      }
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));

      const syllabus = formData.syllabusText.split('\n').filter(s => s.trim().length > 0);
      const requirements = formData.requirementsText.split('\n').filter(r => r.trim().length > 0);
      const careerOutcomes = formData.careerOutcomesText.split('\n').filter(c => c.trim().length > 0);

      const payload = {
        name: formData.name,
        category: formData.category,
        shortDescription: formData.shortDescription,
        fullDescription: formData.fullDescription,
        duration: formData.duration,
        price: Number(formData.price),
        registrationFee: Number(formData.registrationFee),
        status: formData.status,
        modality: formData.modality,
        image: formData.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
        nextClassDate: formData.nextClassDate,
        availablePolos: formData.availablePolos.length > 0 ? formData.availablePolos : ['Viana'],
        syllabus: syllabus.length > 0 ? syllabus : ['Módulo Geral'],
        requirements: requirements.length > 0 ? requirements : ['Cópia do BI'],
        careerOutcomes: careerOutcomes.length > 0 ? careerOutcomes : ['Profissional da Área'],
        featured: formData.featured,
        isActive: formData.isActive
      };

      if (editingCourseId) {
        updateCourse(editingCourseId, payload);
      } else {
        addCourse(payload);
      }

      setIsDrawerOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (course: Course) => {
    setConfirmModal({
      isOpen: true,
      course,
      isDeleting: false
    });
  };

  const confirmDelete = async () => {
    if (!confirmModal.course) return;
    
    setConfirmModal(prev => ({ ...prev, isDeleting: true }));
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));
      deleteCourse(confirmModal.course.id);
      setConfirmModal({ isOpen: false, course: null, isDeleting: false });
    } catch (e) {
      setConfirmModal(prev => ({ ...prev, isDeleting: false }));
    }
  };

  const formatKZ = (val: number) => val.toLocaleString('pt-AO') + ' KZ';

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto pb-12">
      {/* Standardized Reusable PageHeader */}
      <PageHeader
        title="Catálogo & Gestão de Cursos"
        description="Cadastre, edite fotos, configure mensalidades, requisitos, polos e estados de matrícula para todo o catálogo."
        icon="school"
        actions={
          <button
            onClick={handleOpenAdd}
            className="h-9 px-3.5 rounded-lg bg-primary hover:bg-primary/95 text-on-primary font-semibold text-xs shadow-2xs inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[17px]">add_circle</span>
            <span>Novo Curso</span>
          </button>
        }
      />

      {/* Filter and Search Bar */}
      <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant flex flex-col sm:flex-row gap-3 justify-between items-center shadow-xs">
        <div className="relative w-full sm:w-80">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Pesquisar por nome ou categoria..."
            className="w-full pl-10 pr-4 py-2.5 bg-surface text-xs rounded-xl border border-outline-variant text-on-surface focus:ring-1 focus:ring-primary focus:border-primary"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto items-center">
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="text-xs py-2.5 px-3 bg-surface rounded-xl border border-outline-variant text-on-surface focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer w-full sm:w-auto"
          >
            <option value="">Todas as Categorias</option>
            <option value="Tecnologia">Tecnologia</option>
            <option value="Gestão">Gestão</option>
            <option value="Línguas">Línguas</option>
            <option value="Técnico">Técnico</option>
            <option value="Beleza & Estética">Beleza & Estética</option>
            <option value="Saúde">Saúde</option>
          </select>

          <button
            onClick={handleRefresh}
            title="Atualizar tabela"
            className="p-2.5 bg-surface hover:bg-surface-container rounded-xl border border-outline-variant text-on-surface-variant hover:text-primary transition-colors cursor-pointer shrink-0 flex items-center justify-center"
          >
            <span className={`material-symbols-outlined text-[18px] ${isLoading ? 'animate-spin' : ''}`}>
              refresh
            </span>
          </button>
        </div>
      </div>

      {/* Courses Data Table or Loading Skeleton */}
      {isLoading ? (
        <AdminCoursesTableSkeleton rows={5} />
      ) : (
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-on-surface border-collapse min-w-[700px]">
              <thead className="bg-surface-container-low text-on-surface-variant uppercase tracking-wider font-extrabold text-[11px] border-b border-outline-variant">
                <tr>
                  <th className="py-3.5 px-4">Curso</th>
                  <th className="py-3.5 px-4">Duração</th>
                  <th className="py-3.5 px-4">Mensalidade</th>
                  <th className="py-3.5 px-4">Inscrição</th>
                  <th className="py-3.5 px-4">Polos</th>
                  <th className="py-3.5 px-4">Estado</th>
                  <th className="py-3.5 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/40">
                {filteredCourses.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-on-surface-variant text-xs">
                      Nenhum curso encontrado com os filtros selecionados.
                    </td>
                  </tr>
                ) : (
                  filteredCourses.map((c) => (
                    <tr key={c.id} className="hover:bg-surface-container-low/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <SafeImage
                            src={c.image}
                            alt={c.name}
                            category={c.category}
                            wrapperClassName="w-12 h-12 rounded-xl shrink-0 border border-outline-variant/50 shadow-2xs"
                            className="w-full h-full object-cover bg-surface-container"
                          />
                          <div>
                            <p className="font-bold text-primary text-sm leading-snug">{c.name}</p>
                            <span className="text-[10px] text-on-surface-variant font-semibold uppercase">
                              {c.category}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-medium whitespace-nowrap">{c.duration}</td>
                      <td className="py-3.5 px-4 font-bold text-primary whitespace-nowrap">{formatKZ(c.price)}</td>
                      <td className="py-3.5 px-4 whitespace-nowrap text-on-surface-variant">{formatKZ(c.registrationFee || 2000)}</td>
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {c.availablePolos.slice(0, 3).map((p, i) => (
                            <span key={i} className="bg-surface-container text-[10px] px-2 py-0.5 rounded font-medium">
                              {p}
                            </span>
                          ))}
                          {c.availablePolos.length > 3 && (
                            <span className="text-[10px] text-on-surface-variant font-bold">
                              +{c.availablePolos.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleCourseActive(c.id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-all ${
                            c.isActive
                              ? 'bg-[#e8f8ed] text-[#166534] border border-[#4ade80]'
                              : 'bg-surface-container-high text-on-surface-variant border border-outline-variant/60'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${c.isActive ? 'bg-[#22c55e]' : 'bg-gray-400'}`}></span>
                          <span>{c.isActive ? 'Ativo' : 'Inativo'}</span>
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(c)}
                            title="Editar Curso"
                            className="p-2 hover:bg-surface-container text-primary rounded-xl transition-colors cursor-pointer border border-outline-variant/60"
                          >
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                          </button>
                          <button
                            onClick={() => handleDelete(c)}
                            title="Eliminar Curso"
                            className="p-2 hover:bg-red-50 text-error rounded-xl transition-colors cursor-pointer border border-red-200"
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
      )}

      {/* Slide-over Drawer for Add/Edit Course (Mobile-friendly & Fully Responsive) */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            onClick={() => setIsDrawerOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-6 md:pl-10">
            <div className="w-screen max-w-2xl bg-surface-container-lowest shadow-2xl border-l border-outline-variant flex flex-col justify-between h-full">
              {/* Drawer Header */}
              <div className="p-4 sm:p-6 bg-primary text-on-primary flex items-center justify-between shadow-xs sticky top-0 z-10 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold shadow-2xs">
                    <span className="material-symbols-outlined text-[22px]">
                      {editingCourseId ? 'edit_note' : 'add_box'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                      {editingCourseId ? 'Editar Curso' : 'Adicionar Novo Curso'}
                    </h3>
                    <p className="text-[11px] text-on-primary-container">
                      Preencha os dados e anexe a imagem oficial
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 text-on-primary/80 hover:text-on-primary hover:bg-primary-container rounded-full transition-colors cursor-pointer"
                  title="Fechar"
                >
                  <span className="material-symbols-outlined text-[22px]">close</span>
                </button>
              </div>

              {/* Form Content (Scrollable Body) */}
              <form id="course-form" onSubmit={handleFormSubmit} className="p-4 sm:p-6 space-y-5 flex-1 overflow-y-auto">
                {/* Image Upload Component */}
                <ImageUpload
                  value={formData.image}
                  onChange={(imgUrl) => setFormData({ ...formData, image: imgUrl })}
                  label="Fotografia de Capa do Curso"
                  categoryHint={formData.category}
                />

                {/* Course Name */}
                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    Nome do Curso *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Eletricidade Industrial & Baixa Tensão"
                    className="w-full px-3.5 py-2.5 bg-surface rounded-xl border border-outline-variant text-xs text-on-surface focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                </div>

                {/* Category & Duration */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-1">
                      Categoria *
                    </label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 bg-surface rounded-xl border border-outline-variant text-xs text-on-surface focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer"
                    >
                      <option value="Tecnologia">Tecnologia</option>
                      <option value="Gestão">Gestão</option>
                      <option value="Línguas">Línguas</option>
                      <option value="Técnico">Técnico</option>
                      <option value="Beleza & Estética">Beleza & Estética</option>
                      <option value="Saúde">Saúde</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-1">
                      Duração *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.duration}
                      onChange={e => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="Ex: 3 Meses (40 Horas)"
                      className="w-full px-3.5 py-2.5 bg-surface rounded-xl border border-outline-variant text-xs text-on-surface focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>

                {/* Pricing: Tuition & Registration */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-1">
                      Mensalidade (Kwanza - KZ) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="500"
                      value={formData.price}
                      onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 bg-surface rounded-xl border border-outline-variant text-xs text-on-surface focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-1">
                      Taxa de Inscrição (KZ) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="500"
                      value={formData.registrationFee}
                      onChange={e => setFormData({ ...formData, registrationFee: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 bg-surface rounded-xl border border-outline-variant text-xs text-on-surface focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>

                {/* Status & Next Class */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-1">
                      Estado das Matrículas *
                    </label>
                    <select
                      value={formData.status}
                      onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 bg-surface rounded-xl border border-outline-variant text-xs text-on-surface focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer"
                    >
                      <option value="abertas">Inscrições Abertas</option>
                      <option value="limitadas">Vagas Limitadas</option>
                      <option value="esgotadas">Esgotadas</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-1">
                      Início da Próxima Turma *
                    </label>
                    <input
                      type="text"
                      value={formData.nextClassDate}
                      onChange={e => setFormData({ ...formData, nextClassDate: e.target.value })}
                      placeholder="Ex: 01 de Setembro de 2025"
                      className="w-full px-3.5 py-2.5 bg-surface rounded-xl border border-outline-variant text-xs text-on-surface focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>

                {/* Polos Checkboxes */}
                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1.5">
                    Polos Onde o Curso é Ministrado *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-3.5 bg-surface-container rounded-2xl border border-outline-variant/50">
                    {polos.map(p => {
                      const cleanName = p.name.replace('Polo ', '');
                      const checked = formData.availablePolos.includes(cleanName);
                      return (
                        <label key={p.id} className="flex items-center gap-2 text-xs font-medium text-on-surface cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => handlePoloCheckbox(cleanName)}
                            className="rounded text-primary focus:ring-primary cursor-pointer w-4 h-4"
                          />
                          <span>{cleanName}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Short Description */}
                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    Resumo Curto (Para os Cartões do Catálogo) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.shortDescription}
                    onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
                    placeholder="Breve resumo informativo do curso..."
                    className="w-full px-3.5 py-2.5 bg-surface rounded-xl border border-outline-variant text-xs text-on-surface focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* Full Description */}
                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    Descrição Detalhada & Objetivos *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.fullDescription}
                    onChange={e => setFormData({ ...formData, fullDescription: e.target.value })}
                    placeholder="Descrição completa exibida na página do curso..."
                    className="w-full px-3.5 py-2.5 bg-surface rounded-xl border border-outline-variant text-xs text-on-surface focus:ring-1 focus:ring-primary leading-relaxed"
                  />
                </div>

                {/* Syllabus */}
                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    Conteúdo Programático / Módulos (Um tópico por linha)
                  </label>
                  <textarea
                    rows={4}
                    value={formData.syllabusText}
                    onChange={e => setFormData({ ...formData, syllabusText: e.target.value })}
                    placeholder="Módulo 1: Introdução e Normas&#10;Módulo 2: Aulas Práticas em Bancada"
                    className="w-full px-3.5 py-2.5 bg-surface rounded-xl border border-outline-variant text-xs text-on-surface focus:ring-1 focus:ring-primary font-mono text-[11px] leading-relaxed"
                  />
                </div>
              </form>

              {/* Drawer Footer Actions (Sticky bottom with safe layout) */}
              <div className="p-4 sm:p-5 bg-surface-container-low border-t border-outline-variant flex flex-col sm:flex-row justify-end gap-3 sticky bottom-0 z-10 shrink-0">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsDrawerOpen(false)}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  form="course-form"
                  variant="primary"
                  icon="save"
                  loading={isSubmitting}
                  className="w-full sm:w-auto"
                >
                  {editingCourseId ? 'Guardar Alterações' : 'Criar Curso'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title="Eliminar Curso"
        message={
          <span>
            Tem a certeza que deseja eliminar o curso <strong>{confirmModal.course?.name}</strong>? Esta ação não poderá ser revertida.
          </span>
        }
        confirmText="Eliminar Curso"
        isConfirming={confirmModal.isDeleting}
        onConfirm={confirmDelete}
        onCancel={() => setConfirmModal({ isOpen: false, course: null, isDeleting: false })}
        variant="danger"
      />
    </div>
  );
};
