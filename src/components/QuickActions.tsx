import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LeadStatus } from '../types';

export const QuickActions: React.FC = () => {
  const {
    courses,
    polos,
    categories,
    leads,
    siteSettings,
    addManualLead,
    addCourse,
    setCurrentView,
    showToast
  } = useApp();

  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);

  // Quick Lead Form State
  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    email: '',
    biNumber: '',
    courseName: courses[0]?.name || 'Electricidade Auto e Diagnóstico',
    poloName: polos[0]?.name || 'Polo Viana',
    shift: 'Manhã' as 'Manhã' | 'Tarde' | 'Noite' | 'Sábado',
    source: 'secretaria' as 'secretaria' | 'whatsapp' | 'web' | 'balcao',
    status: 'novo' as LeadStatus,
    academicLevel: 'Ensino Médio Concluído',
    notes: ''
  });

  // Quick Course Form State
  const [courseForm, setCourseForm] = useState({
    name: '',
    category: categories[0]?.name || 'Eletricidade e Eletrónica',
    shortDescription: '',
    fullDescription: '',
    duration: '3 Meses',
    price: 35000,
    registrationFee: siteSettings.defaultRegistrationFee || 10000,
    status: 'Abertas' as 'Abertas' | 'Brevemente' | 'ESGOTADAS',
    modality: 'Presencial' as 'Presencial' | 'Híbrido' | 'Online',
    nextClassDate: 'Próxima Segunda-feira',
    availablePolos: [polos[0]?.name.replace('Polo ', '') || 'Viana'],
    featured: false,
    isActive: true
  });

  // Export CSV
  const handleExportCSV = () => {
    if (leads.length === 0) {
      showToast('Não existem leads para exportar.', 'info');
      return;
    }
    const headers = ['ID', 'Nome', 'Telefone', 'Email', 'BI', 'Curso', 'Polo', 'Turno', 'Origem', 'Estado', 'Data'];
    const rows = leads.map(l => [
      l.id,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.email || ''}"`,
      `"${l.biNumber || ''}"`,
      `"${l.courseName.replace(/"/g, '""')}"`,
      `"${l.poloName.replace(/"/g, '""')}"`,
      `"${l.shift || ''}"`,
      `"${l.source}"`,
      `"${l.status}"`,
      `"${l.createdAt}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `leads-tecnogest-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`${leads.length} leads exportadas com sucesso em formato CSV!`);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name.trim() || !leadForm.phone.trim()) {
      showToast('Por favor preencha pelo menos o Nome e Telefone.', 'error');
      return;
    }

    addManualLead({
      name: leadForm.name.trim(),
      phone: leadForm.phone.trim(),
      email: leadForm.email.trim() || undefined,
      biNumber: leadForm.biNumber.trim().toUpperCase() || undefined,
      academicLevel: leadForm.academicLevel,
      courseName: leadForm.courseName,
      poloName: leadForm.poloName,
      shift: leadForm.shift,
      source: leadForm.source,
      status: leadForm.status,
      notes: leadForm.notes.trim() || `Registo rápido criado no Dashboard Administrativo.`
    });

    setIsLeadModalOpen(false);
    setLeadForm({
      name: '',
      phone: '',
      email: '',
      biNumber: '',
      courseName: courses[0]?.name || 'Electricidade Auto e Diagnóstico',
      poloName: polos[0]?.name || 'Polo Viana',
      shift: 'Manhã',
      source: 'secretaria',
      status: 'novo',
      academicLevel: 'Ensino Médio Concluído',
      notes: ''
    });
  };

  const handlePoloToggle = (poloCleanName: string) => {
    setCourseForm(prev => {
      const exists = prev.availablePolos.includes(poloCleanName);
      if (exists) {
        if (prev.availablePolos.length === 1) return prev; // keep at least 1
        return { ...prev, availablePolos: prev.availablePolos.filter(p => p !== poloCleanName) };
      } else {
        return { ...prev, availablePolos: [...prev.availablePolos, poloCleanName] };
      }
    });
  };

  const handleCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseForm.name.trim()) {
      showToast('Por favor indique o nome do curso.', 'error');
      return;
    }

    addCourse({
      name: courseForm.name.trim(),
      category: courseForm.category,
      shortDescription: courseForm.shortDescription.trim() || `Formação prática de excelência em ${courseForm.name}.`,
      fullDescription: courseForm.fullDescription.trim() || `A formação de ${courseForm.name} da Técnogest capacita os formandos com competências práticas industriais orientadas às exigências reais dos setores de petróleo, gás, construção e mobilidade internacional.`,
      duration: courseForm.duration,
      price: Number(courseForm.price) || 35000,
      registrationFee: Number(courseForm.registrationFee) || 10000,
      status: courseForm.status,
      modality: courseForm.modality,
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      nextClassDate: courseForm.nextClassDate || 'Início Imediato',
      availablePolos: courseForm.availablePolos.length > 0 ? courseForm.availablePolos : ['Viana'],
      syllabus: [
        'Módulo 1: Fundamentos e Normas Técnicas',
        'Módulo 2: Procedimentos Práticos em Oficina',
        'Módulo 3: Projecto Final e Avaliação'
      ],
      requirements: ['Cópia do Bilhete de Identidade (BI)', '2 Fotografias tipo passe', 'Certificado de Habilitações'],
      careerOutcomes: ['Técnico Qualificado', 'Prestação de Serviços Autónomos', 'Inserção em Empresas do Sector'],
      featured: courseForm.featured,
      isActive: courseForm.isActive
    });

    setIsCourseModalOpen(false);
    setCourseForm({
      name: '',
      category: categories[0]?.name || 'Eletricidade e Eletrónica',
      shortDescription: '',
      fullDescription: '',
      duration: '3 Meses',
      price: 35000,
      registrationFee: siteSettings.defaultRegistrationFee || 10000,
      status: 'Abertas',
      modality: 'Presencial',
      nextClassDate: 'Próxima Segunda-feira',
      availablePolos: [polos[0]?.name.replace('Polo ', '') || 'Viana'],
      featured: false,
      isActive: true
    });
  };

  return (
    <section className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5 sm:p-6 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">bolt</span>
          </div>
          <div>
            <h3 className="text-base font-bold text-primary">Ações Rápidas de Gestão</h3>
            <p className="text-xs text-on-surface-variant">Crie novos registos no sistema com apenas 1 clique</p>
          </div>
        </div>

        <span className="text-[11px] font-semibold text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-full w-fit">
          Atalhos Directos
        </span>
      </div>

      {/* Action Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-1">
        {/* Quick Lead Button */}
        <button
          onClick={() => setIsLeadModalOpen(true)}
          className="group text-left p-4 rounded-xl bg-primary text-white hover:bg-primary/95 transition-all shadow-xs hover:shadow-md cursor-pointer flex flex-col justify-between relative overflow-hidden"
        >
          <div className="flex items-center justify-between w-full">
            <div className="w-10 h-10 rounded-lg bg-white/15 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[22px]">person_add</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider font-bold bg-white/20 px-2 py-0.5 rounded-md">
              1-Clique
            </span>
          </div>
          <div className="mt-3">
            <h4 className="font-bold text-sm leading-snug">Criar Nova Lead</h4>
            <p className="text-[11px] text-white/80 mt-0.5">Registar candidato ou matrícula rápida da secretaria</p>
          </div>
        </button>

        {/* Quick Course Button */}
        <button
          onClick={() => setIsCourseModalOpen(true)}
          className="group text-left p-4 rounded-xl bg-secondary-container text-on-secondary-container hover:brightness-95 transition-all shadow-xs hover:shadow-md cursor-pointer flex flex-col justify-between relative overflow-hidden"
        >
          <div className="flex items-center justify-between w-full">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[22px]">add_circle</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-md">
              Catálogo
            </span>
          </div>
          <div className="mt-3">
            <h4 className="font-bold text-sm text-primary leading-snug">Criar Novo Curso</h4>
            <p className="text-[11px] text-on-secondary-container/80 mt-0.5">Publicar nova formação com preço e vagas</p>
          </div>
        </button>

        {/* Quick Export CSV Button */}
        <button
          onClick={handleExportCSV}
          className="group text-left p-4 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/70 text-primary transition-all shadow-2xs hover:shadow-xs cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between w-full">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[22px]">download</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
              CSV
            </span>
          </div>
          <div className="mt-3">
            <h4 className="font-bold text-sm leading-snug">Exportar Leads</h4>
            <p className="text-[11px] text-on-surface-variant mt-0.5">Baixar base de candidatos para Excel / CRM</p>
          </div>
        </button>

        {/* Quick Settings / Simulator Button */}
        <button
          onClick={() => setCurrentView('enroll')}
          className="group text-left p-4 rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/70 text-primary transition-all shadow-2xs hover:shadow-xs cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between w-full">
            <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[22px]">how_to_reg</span>
            </div>
            <span className="text-[10px] font-bold text-purple-800 bg-purple-50 px-2 py-0.5 rounded-md">
              Público
            </span>
          </div>
          <div className="mt-3">
            <h4 className="font-bold text-sm leading-snug">Assistente de Inscrição</h4>
            <p className="text-[11px] text-on-surface-variant mt-0.5">Testar o fluxo de candidatura do formando</p>
          </div>
        </button>
      </div>

      {/* QUICK MODAL 1: CRIAR NOVA LEAD */}
      {isLeadModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest rounded-2xl max-w-xl w-full border border-outline-variant shadow-2xl overflow-hidden my-auto">
            <div className="p-4 sm:p-5 border-b border-outline-variant flex items-center justify-between bg-surface-container-low">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">person_add</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-primary">Registo Rápido de Lead / Candidato</h3>
                  <p className="text-xs text-on-surface-variant">Insira os dados do formando para registo imediato</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsLeadModalOpen(false)}
                className="w-8 h-8 rounded-lg text-on-surface-variant hover:bg-surface-container flex items-center justify-center cursor-pointer transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleLeadSubmit} className="p-4 sm:p-6 space-y-4 max-h-[78vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-primary mb-1">
                    Nome Completo do Candidato <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: João Baptista Manuel"
                    value={leadForm.name}
                    onChange={e => setLeadForm({ ...leadForm, name: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-xs focus:ring-2 focus:ring-primary outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-primary mb-1">
                    Telefone (WhatsApp) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Ex: +244 923 000 000"
                    value={leadForm.phone}
                    onChange={e => setLeadForm({ ...leadForm, phone: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-xs focus:ring-2 focus:ring-primary outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-primary mb-1">
                    Nº do Bilhete de Identidade (BI)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: 007294821LA042"
                    value={leadForm.biNumber}
                    onChange={e => setLeadForm({ ...leadForm, biNumber: e.target.value.toUpperCase() })}
                    className="w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-xs focus:ring-2 focus:ring-primary outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-primary mb-1">
                    Curso de Interesse <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={leadForm.courseName}
                    onChange={e => setLeadForm({ ...leadForm, courseName: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-xs focus:ring-2 focus:ring-primary outline-hidden"
                  >
                    {courses.map(c => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-primary mb-1">
                    Polo de Atendimento <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={leadForm.poloName}
                    onChange={e => setLeadForm({ ...leadForm, poloName: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-xs focus:ring-2 focus:ring-primary outline-hidden"
                  >
                    {polos.map(p => (
                      <option key={p.id} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-primary mb-1">Turno / Horário</label>
                  <select
                    value={leadForm.shift}
                    onChange={e => setLeadForm({ ...leadForm, shift: e.target.value as any })}
                    className="w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-xs focus:ring-2 focus:ring-primary outline-hidden"
                  >
                    <option value="Manhã">Manhã (08h00 - 12h00)</option>
                    <option value="Tarde">Tarde (13h00 - 17h00)</option>
                    <option value="Noite">Noite (18h00 - 21h00)</option>
                    <option value="Sábado">Sábado Intensivo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-primary mb-1">Origem do Contacto</label>
                  <select
                    value={leadForm.source}
                    onChange={e => setLeadForm({ ...leadForm, source: e.target.value as any })}
                    className="w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-xs focus:ring-2 focus:ring-primary outline-hidden"
                  >
                    <option value="secretaria">Secretaria Presencial</option>
                    <option value="whatsapp">WhatsApp / Balcão</option>
                    <option value="web">Website Oficial</option>
                    <option value="balcao">Atendimento Telefónico</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-primary mb-1">Estado Inicial</label>
                  <select
                    value={leadForm.status}
                    onChange={e => setLeadForm({ ...leadForm, status: e.target.value as any })}
                    className="w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-xs focus:ring-2 focus:ring-primary outline-hidden"
                  >
                    <option value="novo">Novo (A aguardar contacto)</option>
                    <option value="contactado">Contactado pela secretaria</option>
                    <option value="matriculado">Matriculado Oficialmente</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-primary mb-1">Notas / Observações</label>
                  <input
                    type="text"
                    placeholder="Ex: Candidato prefere turma de sábado; documentos entregues."
                    value={leadForm.notes}
                    onChange={e => setLeadForm({ ...leadForm, notes: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-xs focus:ring-2 focus:ring-primary outline-hidden"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-outline-variant flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsLeadModalOpen(false)}
                  className="h-9 px-4 rounded-lg border border-outline-variant text-xs font-semibold text-on-surface-variant hover:bg-surface-container cursor-pointer transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="h-9 px-5 rounded-lg bg-primary hover:bg-primary/95 text-white text-xs font-bold shadow-xs inline-flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <span className="material-symbols-outlined text-[17px]">check</span>
                  <span>Guardar Lead</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QUICK MODAL 2: CRIAR NOVO CURSO */}
      {isCourseModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest rounded-2xl max-w-xl w-full border border-outline-variant shadow-2xl overflow-hidden my-auto">
            <div className="p-4 sm:p-5 border-b border-outline-variant flex items-center justify-between bg-surface-container-low">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">school</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-primary">Criar e Publicar Novo Curso</h3>
                  <p className="text-xs text-on-surface-variant">Adicione uma nova formação ao catálogo técnico</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCourseModalOpen(false)}
                className="w-8 h-8 rounded-lg text-on-surface-variant hover:bg-surface-container flex items-center justify-center cursor-pointer transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCourseSubmit} className="p-4 sm:p-6 space-y-4 max-h-[78vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-primary mb-1">
                    Nome Oficial da Formação <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Instalações Elétricas Industriais"
                    value={courseForm.name}
                    onChange={e => setCourseForm({ ...courseForm, name: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-xs focus:ring-2 focus:ring-primary outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-primary mb-1">
                    Área / Categoria <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={courseForm.category}
                    onChange={e => setCourseForm({ ...courseForm, category: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-xs focus:ring-2 focus:ring-primary outline-hidden"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-primary mb-1">Duração do Curso</label>
                  <select
                    value={courseForm.duration}
                    onChange={e => setCourseForm({ ...courseForm, duration: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-xs focus:ring-2 focus:ring-primary outline-hidden"
                  >
                    <option value="1 Mês">1 Mês (Intensivo)</option>
                    <option value="2 Meses">2 Meses</option>
                    <option value="3 Meses">3 Meses (Padrão INEFOP)</option>
                    <option value="6 Meses">6 Meses (Especialização)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-primary mb-1">
                    Mensalidade (Kz) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="1000"
                    step="1000"
                    value={courseForm.price}
                    onChange={e => setCourseForm({ ...courseForm, price: Number(e.target.value) })}
                    className="w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-xs focus:ring-2 focus:ring-primary outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-primary mb-1">
                    Taxa de Inscrição (Kz)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="500"
                    value={courseForm.registrationFee}
                    onChange={e => setCourseForm({ ...courseForm, registrationFee: Number(e.target.value) })}
                    className="w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-xs focus:ring-2 focus:ring-primary outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-primary mb-1">Estado de Matrícula</label>
                  <select
                    value={courseForm.status}
                    onChange={e => setCourseForm({ ...courseForm, status: e.target.value as any })}
                    className="w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-xs focus:ring-2 focus:ring-primary outline-hidden"
                  >
                    <option value="Abertas">Inscrições Abertas</option>
                    <option value="Brevemente">Brevemente Disponível</option>
                    <option value="ESGOTADAS">Vagas Esgotadas</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-primary mb-1">Modalidade</label>
                  <select
                    value={courseForm.modality}
                    onChange={e => setCourseForm({ ...courseForm, modality: e.target.value as any })}
                    className="w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-xs focus:ring-2 focus:ring-primary outline-hidden"
                  >
                    <option value="Presencial">100% Presencial Prático</option>
                    <option value="Híbrido">Híbrido (Prática + Online)</option>
                    <option value="Online">EAD / Online</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-primary mb-1">Polos Disponíveis em Luanda</label>
                  <div className="flex flex-wrap gap-2 pt-0.5">
                    {polos.map(polo => {
                      const cleanName = polo.name.replace('Polo ', '');
                      const isSelected = courseForm.availablePolos.includes(cleanName);
                      return (
                        <button
                          key={polo.id}
                          type="button"
                          onClick={() => handlePoloToggle(cleanName)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-primary text-white border-primary shadow-2xs'
                              : 'bg-surface-container text-on-surface-variant border-outline-variant/60 hover:bg-surface-container-high'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[15px]">
                            {isSelected ? 'check_box' : 'check_box_outline_blank'}
                          </span>
                          <span>{cleanName}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-primary mb-1">Descrição Resumida</label>
                  <textarea
                    rows={2}
                    placeholder="Ex: Formação técnica com forte vertente prática em bancada e oficina para inserção no mercado."
                    value={courseForm.shortDescription}
                    onChange={e => setCourseForm({ ...courseForm, shortDescription: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-xs focus:ring-2 focus:ring-primary outline-hidden"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-outline-variant flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsCourseModalOpen(false)}
                  className="h-9 px-4 rounded-lg border border-outline-variant text-xs font-semibold text-on-surface-variant hover:bg-surface-container cursor-pointer transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="h-9 px-5 rounded-lg bg-primary hover:bg-primary/95 text-white text-xs font-bold shadow-xs inline-flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <span className="material-symbols-outlined text-[17px]">add_circle</span>
                  <span>Publicar Curso</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
