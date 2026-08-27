import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Polo } from '../../types';
import { PageHeader } from '../../components/PageHeader';
import { ConfirmModal } from '../../components/ui/ConfirmModal';
import { Button } from '../../components/ui/Button';

export const AdminPolosView: React.FC = () => {
  const { polos, courses, addPolo, updatePolo, deletePolo, togglePoloActive } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    polo: Polo | null;
    isDeleting: boolean;
  }>({
    isOpen: false,
    polo: null,
    isDeleting: false
  });

  const [formData, setFormData] = useState<Omit<Polo, 'id'>>({
    name: '',
    municipality: 'Viana',
    address: '',
    phone: '+244 923 000 000',
    whatsapp: '+244 923 000 000',
    email: 'polo@tecnogest.ao',
    schedule: 'Segunda a Sábado: 07h30 - 18h00',
    featuredCourses: [],
    facilities: ['Laboratório de Informática', 'Salas Climatizadas', 'Gerador de Apoio'],
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800',
    isActive: true,
    coordinator: 'Secretaria Académica',
    coordinates: {
      lat: -8.8383,
      lng: 13.2344
    }
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      name: '',
      municipality: 'Viana',
      address: '',
      phone: '+244 923 000 000',
      whatsapp: '+244 923 000 000',
      email: 'polo@tecnogest.ao',
      schedule: 'Segunda a Sábado: 07h30 - 18h00',
      featuredCourses: courses.slice(0, 4).map(c => c.name),
      facilities: ['Laboratório Técnico', 'Salas Climatizadas', 'Energia Estabilizada'],
      imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800',
      isActive: true,
      coordinator: '',
      coordinates: {
        lat: -8.8383,
        lng: 13.2344
      }
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (polo: Polo) => {
    setEditingId(polo.id);
    setFormData({
      name: polo.name,
      municipality: polo.municipality,
      address: polo.address,
      phone: polo.phone,
      whatsapp: polo.whatsapp,
      email: polo.email || '',
      schedule: polo.schedule,
      featuredCourses: polo.featuredCourses || [],
      facilities: polo.facilities || [],
      imageUrl: polo.imageUrl || '',
      isActive: polo.isActive !== false,
      coordinator: polo.coordinator || '',
      coordinates: polo.coordinates || { lat: -8.8383, lng: 13.2344 }
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.address.trim()) return;

    setIsSubmitting(true);
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (editingId) {
        updatePolo(editingId, formData);
      } else {
        addPolo(formData);
      }
      setIsModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (polo: Polo) => {
    setConfirmModal({
      isOpen: true,
      polo,
      isDeleting: false
    });
  };

  const confirmDelete = async () => {
    if (!confirmModal.polo) return;
    
    setConfirmModal(prev => ({ ...prev, isDeleting: true }));
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));
      deletePolo(confirmModal.polo.id);
      setConfirmModal({ isOpen: false, polo: null, isDeleting: false });
    } catch (e) {
      setConfirmModal(prev => ({ ...prev, isDeleting: false }));
    }
  };

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto animate-in fade-in duration-200">
      {/* Standardized Reusable PageHeader */}
      <PageHeader
        title="Gestão de Polos & Unidades"
        description="Cadastre novas filiais em Luanda, defina coordenadores de polo, telefones directos e infraestruturas técnicas."
        icon="apartment"
        actions={
          <button
            onClick={handleOpenAdd}
            className="h-9 px-3.5 rounded-lg bg-primary hover:bg-primary/95 text-on-primary text-xs font-semibold shadow-2xs transition-all inline-flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[17px]">add_business</span>
            <span>Adicionar Polo</span>
          </button>
        }
      />

      {/* Grid of Polos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {polos.map(polo => (
          <div
            key={polo.id}
            className={`bg-surface-container-lowest rounded-2xl border transition-all p-5 shadow-xs flex flex-col justify-between ${
              polo.isActive === false ? 'opacity-70 border-dashed border-gray-300' : 'border-outline-variant hover:shadow-md'
            }`}
          >
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="bg-secondary-container text-on-secondary-container text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                  {polo.municipality}
                </span>
                
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => togglePoloActive(polo.id)}
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full cursor-pointer flex items-center gap-1 ${
                      polo.isActive !== false
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${polo.isActive !== false ? 'bg-emerald-500' : 'bg-gray-400'}`} />
                    <span>{polo.isActive !== false ? 'Ativo' : 'Inativo'}</span>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-primary">{polo.name}</h3>
                {polo.coordinator && (
                  <p className="text-[11px] text-on-surface-variant font-medium">
                    Coordenação: <span className="text-on-surface font-semibold">{polo.coordinator}</span>
                  </p>
                )}
              </div>

              <div className="space-y-1.5 text-xs text-on-surface-variant">
                <p className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[16px] text-primary shrink-0">location_on</span>
                  <span>{polo.address}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-primary shrink-0">schedule</span>
                  <span>{polo.schedule}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-primary shrink-0">call</span>
                  <span>{polo.phone}</span>
                </p>
              </div>

              {polo.facilities && polo.facilities.length > 0 && (
                <div className="pt-2 border-t border-outline-variant/30">
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase mb-1">Estrutura & Laboratórios:</p>
                  <div className="flex flex-wrap gap-1">
                    {polo.facilities.map((fac, i) => (
                      <span key={i} className="bg-surface-container text-[10px] px-2 py-0.5 rounded text-on-surface">
                        {fac}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-outline-variant/30 mt-4 flex items-center justify-between">
              <a
                href={`https://wa.me/${polo.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#25D366] font-bold flex items-center gap-1 hover:underline"
              >
                <span>WhatsApp Direto</span>
                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              </a>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenEdit(polo)}
                  className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                  title="Editar Polo"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>
                <button
                  onClick={() => handleDelete(polo)}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-on-surface-variant hover:text-red-600 transition-colors cursor-pointer"
                  title="Eliminar Polo"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Polo Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
            <div className="p-6 bg-surface-container border-b border-outline-variant flex items-center justify-between sticky top-0 z-10">
              <h3 className="text-base font-bold text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary-container">
                  {editingId ? 'edit_location' : 'add_business'}
                </span>
                <span>{editingId ? 'Editar Polo de Luanda' : 'Registar Novo Polo'}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    Nome do Polo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="ex: Polo Viana - Estalagem"
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    Município / Localidade *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.municipality}
                    onChange={e => setFormData({ ...formData, municipality: e.target.value })}
                    placeholder="ex: Viana, Cacuaco, Talatona, Cazenga..."
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    Endereço Completo & Ponto de Referência *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    placeholder="ex: Estrada de Catete, Km 14, junto à paragem do Gamek..."
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    Telefone de Chamadas
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    WhatsApp Direto do Polo
                  </label>
                  <input
                    type="text"
                    value={formData.whatsapp}
                    onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    Coordenador Responsável
                  </label>
                  <input
                    type="text"
                    value={formData.coordinator || ''}
                    onChange={e => setFormData({ ...formData, coordinator: e.target.value })}
                    placeholder="ex: Prof. António Silva"
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    Horário de Funcionamento
                  </label>
                  <input
                    type="text"
                    value={formData.schedule}
                    onChange={e => setFormData({ ...formData, schedule: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    Instalações / Recursos Técnicos (separados por vírgula)
                  </label>
                  <input
                    type="text"
                    value={formData.facilities ? formData.facilities.join(', ') : ''}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        facilities: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                      })
                    }
                    placeholder="Laboratório de Informática, Salas Climatizadas, Gerador de Apoio..."
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    URL da Imagem da Fachada
                  </label>
                  <input
                    type="url"
                    value={formData.imageUrl || ''}
                    onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  icon="save"
                  loading={isSubmitting}
                >
                  {editingId ? 'Guardar Polo' : 'Criar Polo'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title="Eliminar Polo"
        message={
          <span>
            Tem a certeza que deseja eliminar o polo <strong>{confirmModal.polo?.name}</strong>? Esta ação não poderá ser revertida.
          </span>
        }
        confirmText="Eliminar Polo"
        isConfirming={confirmModal.isDeleting}
        onConfirm={confirmDelete}
        onCancel={() => setConfirmModal({ isOpen: false, polo: null, isDeleting: false })}
        variant="danger"
      />
    </div>
  );
};
