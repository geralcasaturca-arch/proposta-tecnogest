import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CategoryConfig } from '../../types';
import { PageHeader } from '../../components/PageHeader';

const COMMON_ICONS = [
  'laptop_mac',
  'psychology',
  'language',
  'engineering',
  'palette',
  'medical_services',
  'business_center',
  'account_balance',
  'construction',
  'science',
  'public',
  'school'
];

export const AdminCategoriesView: React.FC = () => {
  const { categories, courses, addCategory, updateCategory, deleteCategory } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<CategoryConfig, 'id'>>({
    name: '',
    slug: '',
    icon: 'school',
    description: '',
    badge: ''
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      name: '',
      slug: '',
      icon: 'school',
      description: '',
      badge: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: CategoryConfig) => {
    setEditingId(cat.id);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      icon: cat.icon,
      description: cat.description || '',
      badge: cat.badge || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingId) {
      updateCategory(editingId, formData);
    } else {
      addCategory(formData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (cat: CategoryConfig) => {
    const courseCount = courses.filter(c => c.category === cat.name).length;
    const confirmMsg = courseCount > 0
      ? `A categoria "${cat.name}" possui ${courseCount} cursos associados. Deseja realmente remover?`
      : `Deseja remover a categoria "${cat.name}"?`;

    if (window.confirm(confirmMsg)) {
      deleteCategory(cat.id);
    }
  };

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto animate-in fade-in duration-200">
      {/* Standardized Reusable PageHeader */}
      <PageHeader
        title="Categorias & Áreas Técnicas"
        description="Organize os cursos por áreas de especialização e defina ícones e etiquetas do catálogo."
        icon="category"
        actions={
          <button
            onClick={handleOpenAdd}
            className="h-9 px-3.5 rounded-lg bg-primary hover:bg-primary/95 text-on-primary text-xs font-semibold shadow-2xs transition-all inline-flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[17px]">add_circle</span>
            <span>Nova Categoria</span>
          </button>
        }
      />

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map(cat => {
          const count = courses.filter(c => c.category === cat.name).length;
          return (
            <div
              key={cat.id}
              className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[26px]">{cat.icon}</span>
                  </div>
                  {cat.badge && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-secondary-container text-on-secondary-container">
                      {cat.badge}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-base font-bold text-primary group-hover:text-secondary-container transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-1 line-clamp-2">
                    {cat.description || 'Área técnica de formação profissional certificada.'}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-outline-variant/40 flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-700">
                  {count} {count === 1 ? 'curso' : 'cursos'}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(cat)}
                    className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                    title="Editar Categoria"
                  >
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(cat)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-on-surface-variant hover:text-red-600 transition-colors cursor-pointer"
                    title="Eliminar Categoria"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add/Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-6 bg-surface-container border-b border-outline-variant flex items-center justify-between">
              <h3 className="text-base font-bold text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary-container">
                  {editingId ? 'edit' : 'add_box'}
                </span>
                <span>{editingId ? 'Editar Categoria' : 'Criar Nova Categoria'}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Nome da Categoria *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="ex: Saúde & Primeiros Socorros"
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Etiqueta / Badge (Opcional)
                </label>
                <input
                  type="text"
                  value={formData.badge || ''}
                  onChange={e => setFormData({ ...formData, badge: e.target.value })}
                  placeholder="ex: Alta Empregabilidade, Tecnológica, Em Alta"
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Ícone Representativo (Material Symbols)
                </label>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[22px]">{formData.icon}</span>
                  </div>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={e => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-mono focus:border-primary outline-hidden"
                  />
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {COMMON_ICONS.map(ic => (
                    <button
                      key={ic}
                      type="button"
                      onClick={() => setFormData({ ...formData, icon: ic })}
                      className={`p-2 rounded-lg border text-xs flex items-center justify-center transition-all cursor-pointer ${
                        formData.icon === ic
                          ? 'border-primary bg-primary text-on-primary'
                          : 'border-outline-variant hover:bg-surface-container text-on-surface-variant'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">{ic}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Descrição Curta
                </label>
                <textarea
                  rows={2}
                  value={formData.description || ''}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descreva o foco profissional desta categoria..."
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-outline-variant hover:bg-surface-container text-xs font-bold text-on-surface-variant"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/95 text-on-primary text-xs font-bold shadow-xs flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  <span>{editingId ? 'Guardar Alterações' : 'Criar Categoria'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
