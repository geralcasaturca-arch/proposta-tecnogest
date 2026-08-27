import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lead, LeadStatus } from '../../types';
import { PageHeader } from '../../components/PageHeader';

export const AdminLeadsView: React.FC = () => {
  const {
    leads,
    courses,
    polos,
    siteSettings,
    updateLeadStatus,
    updateLead,
    deleteLead,
    addManualLead,
    exportLeadsCSV
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusTab, setSelectedStatusTab] = useState<string>('todos');
  const [filterPolo, setFilterPolo] = useState<string>('all');
  const [filterCourse, setFilterCourse] = useState<string>('all');

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedLeadForDetail, setSelectedLeadForDetail] = useState<Lead | null>(null);

  // Form state for manual lead creation
  const [manualFormData, setManualFormData] = useState({
    name: '',
    phone: '',
    email: '',
    biNumber: '',
    academicLevel: 'Ensino Médio Concluído',
    courseName: courses[0]?.name || '',
    poloName: polos[0]?.name || '',
    shift: 'Manhã (08h00 - 10h30)',
    source: 'secretaria' as 'web' | 'whatsapp' | 'secretaria',
    status: 'matriculado' as LeadStatus,
    notes: 'Inscrição presencial na secretaria.'
  });

  // Stats
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'novo').length;
  const contactedLeads = leads.filter(l => l.status === 'contactado').length;
  const enrolledLeads = leads.filter(l => l.status === 'matriculado').length;

  const filteredLeads = leads.filter(l => {
    const q = (searchQuery || '').toLowerCase().trim();
    const matchesSearch =
      !q ||
      (l.name || '').toLowerCase().includes(q) ||
      (l.phone || '').includes(searchQuery) ||
      (l.biNumber ? l.biNumber.toLowerCase().includes(q) : false) ||
      (l.courseName || '').toLowerCase().includes(q) ||
      (l.poloName || '').toLowerCase().includes(q);

    const matchesStatus = selectedStatusTab === 'todos' ? true : l.status === selectedStatusTab;
    const matchesPolo = filterPolo === 'all' ? true : l.poloName === filterPolo;
    const matchesCourse = filterCourse === 'all' ? true : l.courseName === filterCourse;

    return matchesSearch && matchesStatus && matchesPolo && matchesCourse;
  });

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'novo':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'contactado':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'matriculado':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'perdido':
        return 'bg-gray-100 text-gray-700 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getSourceBadge = (source: string) => {
    switch (source) {
      case 'whatsapp':
        return 'bg-[#25D366]/20 text-emerald-800';
      case 'web':
        return 'bg-primary-fixed text-primary';
      case 'secretaria':
        return 'bg-purple-100 text-purple-800';
      case 'instagram':
        return 'bg-pink-100 text-pink-700';
      default:
        return 'bg-surface-container-high text-on-surface-variant';
    }
  };

  const handleCreateManualLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualFormData.name.trim() || !manualFormData.phone.trim()) return;

    addManualLead({
      name: manualFormData.name,
      phone: manualFormData.phone,
      email: manualFormData.email,
      biNumber: manualFormData.biNumber,
      academicLevel: manualFormData.academicLevel,
      courseName: manualFormData.courseName,
      poloName: manualFormData.poloName,
      shift: manualFormData.shift,
      source: manualFormData.source,
      status: manualFormData.status,
      notes: manualFormData.notes
    });

    setIsAddModalOpen(false);
    setManualFormData({
      name: '',
      phone: '',
      email: '',
      biNumber: '',
      academicLevel: 'Ensino Médio Concluído',
      courseName: courses[0]?.name || '',
      poloName: polos[0]?.name || '',
      shift: 'Manhã (08h00 - 10h30)',
      source: 'secretaria',
      status: 'matriculado',
      notes: 'Inscrição presencial na secretaria.'
    });
  };

  return (
    <div className="space-y-6 max-w-[1300px] mx-auto animate-in fade-in duration-200">
      {/* Standardized Reusable PageHeader */}
      <PageHeader
        title="Gestão de Leads & Matrículas"
        description="Acompanhe em tempo real os candidatos do website, chatbot do WhatsApp e matrículas presenciais da secretaria."
        icon="contact_page"
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="h-9 px-3.5 rounded-lg bg-primary hover:bg-primary/95 text-on-primary font-semibold text-xs shadow-2xs inline-flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[17px]">person_add</span>
              <span>Nova Matrícula</span>
            </button>

            <button
              onClick={exportLeadsCSV}
              className="h-9 px-3.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs shadow-2xs inline-flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[17px]">download</span>
              <span>Exportar CSV</span>
            </button>
          </div>
        }
      />

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant shadow-2xs">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-on-surface-variant uppercase">Total de Leads</span>
            <span className="material-symbols-outlined text-primary text-[20px]">groups</span>
          </div>
          <p className="text-2xl font-extrabold text-primary mt-2">{totalLeads}</p>
          <span className="text-[10px] text-emerald-600 font-bold">Candidatos registados</span>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant shadow-2xs">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-on-surface-variant uppercase">Novas Leads</span>
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse mt-1"></span>
          </div>
          <p className="text-2xl font-extrabold text-blue-600 mt-2">{newLeads}</p>
          <span className="text-[10px] text-on-surface-variant">A aguardar 1º contacto</span>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant shadow-2xs">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-on-surface-variant uppercase">Contactados</span>
            <span className="material-symbols-outlined text-amber-500 text-[20px]">call</span>
          </div>
          <p className="text-2xl font-extrabold text-amber-600 mt-2">{contactedLeads}</p>
          <span className="text-[10px] text-on-surface-variant">Em validação</span>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant shadow-2xs">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-on-surface-variant uppercase">Matriculados</span>
            <span className="material-symbols-outlined text-emerald-600 text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              check_circle
            </span>
          </div>
          <p className="text-2xl font-extrabold text-emerald-600 mt-2">{enrolledLeads}</p>
          <span className="text-[10px] text-emerald-600 font-bold">Matrícula confirmada</span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant flex flex-col md:flex-row gap-3 justify-between items-center shadow-xs">
        <div className="flex overflow-x-auto gap-2 w-full md:w-auto pb-1 md:pb-0">
          {[
            { id: 'todos', label: 'Todos' },
            { id: 'novo', label: 'Novos' },
            { id: 'contactado', label: 'Contactados' },
            { id: 'matriculado', label: 'Matriculados' },
            { id: 'perdido', label: 'Perdidos' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedStatusTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedStatusTab === tab.id
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container hover:bg-surface-variant text-on-surface-variant'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto">
          <select
            value={filterPolo}
            onChange={e => setFilterPolo(e.target.value)}
            className="w-full sm:w-auto px-3 py-1.5 rounded-xl border border-outline-variant bg-surface-container text-xs font-semibold focus:border-primary outline-hidden"
          >
            <option value="all">Todos os Polos</option>
            {polos.map(p => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>

          <div className="relative w-full sm:w-60">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar por nome, BI, tel..."
              className="w-full pl-9 pr-3 py-1.5 bg-surface text-xs rounded-xl border border-outline-variant text-on-surface focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-on-surface border-collapse">
            <thead className="bg-surface-container-low text-on-surface-variant uppercase tracking-wider font-extrabold text-[11px] border-b border-outline-variant">
              <tr>
                <th className="py-3.5 px-4">Candidato / Estudante</th>
                <th className="py-3.5 px-4">Curso & Turno</th>
                <th className="py-3.5 px-4">Polo</th>
                <th className="py-3.5 px-4">Origem</th>
                <th className="py-3.5 px-4">Data</th>
                <th className="py-3.5 px-4">Estado</th>
                <th className="py-3.5 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/40">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-on-surface-variant font-medium">
                    Nenhum registo encontrado com os filtros selecionados.
                  </td>
                </tr>
              ) : (
                filteredLeads.map(lead => (
                  <tr key={lead.id} className="hover:bg-surface-container-low/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div>
                        <button
                          onClick={() => setSelectedLeadForDetail(lead)}
                          className="font-bold text-primary text-sm leading-snug hover:underline text-left cursor-pointer"
                        >
                          {lead.name}
                        </button>
                        <p className="text-[11px] text-on-surface-variant font-mono">{lead.phone}</p>
                        {lead.biNumber && (
                          <span className="text-[10px] text-on-surface-variant/80">BI: {lead.biNumber}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-on-surface block">{lead.courseName}</span>
                      {lead.shift && <span className="text-[10px] text-on-surface-variant">{lead.shift}</span>}
                    </td>
                    <td className="py-3.5 px-4 font-medium whitespace-nowrap">{lead.poloName}</td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${getSourceBadge(lead.source)}`}>
                        {lead.source}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap text-on-surface-variant text-[11px]">
                      {lead.createdAt}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <select
                        value={lead.status}
                        onChange={e => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                        className={`text-xs font-bold py-1 px-2.5 rounded-lg border cursor-pointer focus:ring-1 focus:ring-primary ${getStatusBadge(
                          lead.status
                        )}`}
                      >
                        <option value="novo">Novo</option>
                        <option value="contactado">Contactado</option>
                        <option value="matriculado">Matriculado</option>
                        <option value="perdido">Perdido</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedLeadForDetail(lead)}
                          className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                          title="Ver Ficha Completa"
                        >
                          <span className="material-symbols-outlined text-[16px]">visibility</span>
                        </button>
                        <a
                          href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Olá%20${encodeURIComponent(
                            lead.name
                          )},%20falamos%20da%20secretaria%20da%20Técnogest%20sobre%20o%20curso%20de%20${encodeURIComponent(
                            lead.courseName
                          )}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#25D366] hover:bg-[#1EBE5A] text-white p-1.5 rounded-lg transition-colors flex items-center justify-center shadow-2xs"
                          title="Abrir WhatsApp"
                        >
                          <span className="material-symbols-outlined text-[16px]">chat</span>
                        </a>
                        <button
                          onClick={() => {
                            if (window.confirm(`Deseja eliminar a lead de "${lead.name}"?`)) {
                              deleteLead(lead.id);
                            }
                          }}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-on-surface-variant hover:text-red-600 transition-colors cursor-pointer"
                          title="Eliminar Lead"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
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

      {/* Manual Registration Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
            <div className="p-6 bg-surface-container border-b border-outline-variant flex items-center justify-between sticky top-0 z-10">
              <h3 className="text-base font-bold text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary-container">person_add</span>
                <span>Nova Inscrição / Matrícula Manual</span>
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateManualLead} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    Nome Completo do Aluno *
                  </label>
                  <input
                    type="text"
                    required
                    value={manualFormData.name}
                    onChange={e => setManualFormData({ ...manualFormData, name: e.target.value })}
                    placeholder="ex: Carlos Manuel de Carvalho"
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    Telefone / WhatsApp *
                  </label>
                  <input
                    type="text"
                    required
                    value={manualFormData.phone}
                    onChange={e => setManualFormData({ ...manualFormData, phone: e.target.value })}
                    placeholder="+244 923 000 000"
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    Número do BI
                  </label>
                  <input
                    type="text"
                    value={manualFormData.biNumber}
                    onChange={e => setManualFormData({ ...manualFormData, biNumber: e.target.value })}
                    placeholder="ex: 004928192LA042"
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    Email (Opcional)
                  </label>
                  <input
                    type="email"
                    value={manualFormData.email}
                    onChange={e => setManualFormData({ ...manualFormData, email: e.target.value })}
                    placeholder="aluno@exemplo.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    Curso Pretendido *
                  </label>
                  <select
                    value={manualFormData.courseName}
                    onChange={e => setManualFormData({ ...manualFormData, courseName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-semibold focus:border-primary outline-hidden"
                  >
                    {courses.map(c => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    Polo Selecionado *
                  </label>
                  <select
                    value={manualFormData.poloName}
                    onChange={e => setManualFormData({ ...manualFormData, poloName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-semibold focus:border-primary outline-hidden"
                  >
                    {polos.map(p => (
                      <option key={p.id} value={p.name}>
                        {p.name} ({p.municipality})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    Turno
                  </label>
                  <select
                    value={manualFormData.shift}
                    onChange={e => setManualFormData({ ...manualFormData, shift: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-semibold focus:border-primary outline-hidden"
                  >
                    <option value="Manhã (08h00 - 10h30)">Manhã (08h00 - 10h30)</option>
                    <option value="Tarde (13h00 - 15h30)">Tarde (13h00 - 15h30)</option>
                    <option value="Noite / Pós-laboral (17h00 - 19h30)">Noite / Pós-laboral (17h00 - 19h30)</option>
                    <option value="Sábados Intensivo (08h00 - 14h00)">Sábados Intensivo (08h00 - 14h00)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    Estado Inicial
                  </label>
                  <select
                    value={manualFormData.status}
                    onChange={e => setManualFormData({ ...manualFormData, status: e.target.value as LeadStatus })}
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-semibold focus:border-primary outline-hidden"
                  >
                    <option value="matriculado">Matriculado (Confirmado)</option>
                    <option value="novo">Novo (Pré-inscrição)</option>
                    <option value="contactado">Contactado (A aguardar pagamento)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    Notas Internas da Secretaria
                  </label>
                  <textarea
                    rows={2}
                    value={manualFormData.notes}
                    onChange={e => setManualFormData({ ...manualFormData, notes: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-medium focus:border-primary outline-hidden"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-outline-variant hover:bg-surface-container text-xs font-bold text-on-surface-variant cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/95 text-on-primary text-xs font-bold shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  <span>Confirmar Registo</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lead Full Detail Modal */}
      {selectedLeadForDetail && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-6 bg-surface-container border-b border-outline-variant flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[24px]">badge</span>
                <h3 className="text-base font-bold text-primary">Ficha de Inscrição do Candidato</h3>
              </div>
              <button
                onClick={() => setSelectedLeadForDetail(null)}
                className="w-8 h-8 rounded-full hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container border border-outline-variant">
                <div>
                  <p className="font-extrabold text-sm text-primary">{selectedLeadForDetail.name}</p>
                  <p className="text-on-surface-variant font-mono">{selectedLeadForDetail.phone}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full font-bold uppercase ${getStatusBadge(selectedLeadForDetail.status)}`}>
                  {selectedLeadForDetail.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-on-surface-variant">
                <div>
                  <span className="font-semibold block text-[11px]">Curso Escolhido:</span>
                  <span className="font-bold text-on-surface">{selectedLeadForDetail.courseName}</span>
                </div>
                <div>
                  <span className="font-semibold block text-[11px]">Polo de Freqüência:</span>
                  <span className="font-bold text-on-surface">{selectedLeadForDetail.poloName}</span>
                </div>
                <div>
                  <span className="font-semibold block text-[11px]">Número de BI:</span>
                  <span className="font-bold text-on-surface">{selectedLeadForDetail.biNumber || 'Não indicado'}</span>
                </div>
                <div>
                  <span className="font-semibold block text-[11px]">Nível Académico:</span>
                  <span className="font-bold text-on-surface">{selectedLeadForDetail.academicLevel || 'Ensino Geral'}</span>
                </div>
                <div>
                  <span className="font-semibold block text-[11px]">Turno Desejado:</span>
                  <span className="font-bold text-on-surface">{selectedLeadForDetail.shift || 'Qualquer Turno'}</span>
                </div>
                <div>
                  <span className="font-semibold block text-[11px]">Data de Registo:</span>
                  <span className="font-bold text-on-surface">{selectedLeadForDetail.createdAt}</span>
                </div>
              </div>

              {selectedLeadForDetail.notes && (
                <div className="p-3 rounded-xl bg-surface-container/60 border border-outline-variant/60">
                  <p className="font-bold text-primary mb-1">Notas da Inscrição:</p>
                  <p className="text-on-surface-variant">{selectedLeadForDetail.notes}</p>
                </div>
              )}

              <div className="pt-3 border-t border-outline-variant flex items-center justify-between">
                <a
                  href={`https://wa.me/${selectedLeadForDetail.phone.replace(/[^0-9]/g, '')}?text=Olá%20${encodeURIComponent(
                    selectedLeadForDetail.name
                  )},%20falamos%20da%20secretaria%20do%20${encodeURIComponent(
                    siteSettings.institutionName
                  )}%20sobre%20o%20seu%20processo%20académico.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5A] text-white font-bold flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                  <span>Contactar WhatsApp</span>
                </a>

                <button
                  onClick={() => setSelectedLeadForDetail(null)}
                  className="px-4 py-2 rounded-xl border border-outline-variant hover:bg-surface-container font-bold text-on-surface-variant"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
