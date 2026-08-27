import React from 'react';
import { useApp } from '../../context/AppContext';
import { LeadStatus } from '../../types';
import { PageHeader } from '../../components/PageHeader';
import { QuickActions } from '../../components/QuickActions';

export const AdminDashboardView: React.FC = () => {
  const { courses, leads, polos, categories, siteSettings, setCurrentView, updateLeadStatus } = useApp();

  const totalCourses = courses.length;
  const activeCourses = courses.filter(c => c.isActive).length;
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'novo').length;
  const enrolledLeads = leads.filter(l => l.status === 'matriculado').length;
  const conversionRate = totalLeads > 0 ? ((enrolledLeads / totalLeads) * 100).toFixed(1) : '0';

  const recentLeads = leads.slice(0, 5);

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

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Standardized Reusable PageHeader */}
      <PageHeader
        title="Painel Geral de Controlo & Indicadores"
        description="Acompanhe em tempo real o catálogo de formações, novas inscrições recebidas, unidades operacionais em Luanda e parâmetros do CMS."
        icon="dashboard"
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentView('admin-courses')}
              className="h-9 px-3.5 rounded-lg bg-primary text-white hover:bg-primary/95 font-semibold text-xs shadow-2xs inline-flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[17px]">add_circle</span>
              <span>Novo Curso</span>
            </button>
            <button
              onClick={() => setCurrentView('admin-leads')}
              className="h-9 px-3.5 rounded-lg bg-secondary-container text-on-secondary-container font-semibold text-xs hover:brightness-95 transition-all inline-flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[17px]">how_to_reg</span>
              <span>Gestão de Leads</span>
            </button>
            <button
              onClick={() => setCurrentView('admin-settings')}
              className="h-9 px-3.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-semibold text-xs transition-all inline-flex items-center gap-1.5 border border-outline-variant cursor-pointer"
            >
              <span className="material-symbols-outlined text-[17px]">tune</span>
              <span>Definições</span>
            </button>
          </div>
        }
      />

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-2xl border border-outline-variant shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Cursos Ativos</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">school</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-primary">{activeCourses}</div>
            <p className="text-xs text-on-surface-variant mt-1">
              De {totalCourses} cursos cadastrados no catálogo
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-outline-variant/40 flex items-center justify-between text-xs">
            <span className="text-emerald-700 font-semibold">{categories.length} Categorias</span>
            <button
              onClick={() => setCurrentView('admin-courses')}
              className="text-primary font-bold hover:underline cursor-pointer"
            >
              Gerir &rarr;
            </button>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-2xl border border-outline-variant shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Leads & Candidatos</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">groups</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-emerald-700">{totalLeads}</div>
            <p className="text-xs text-on-surface-variant mt-1">
              <span className="font-bold text-blue-600">{newLeads} novas</span> a aguardar secretaria
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-outline-variant/40 flex items-center justify-between text-xs">
            <span className="text-emerald-700 font-semibold">{enrolledLeads} Matriculados</span>
            <button
              onClick={() => setCurrentView('admin-leads')}
              className="text-primary font-bold hover:underline cursor-pointer"
            >
              Abrir CRM &rarr;
            </button>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-2xl border border-outline-variant shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Taxa de Conversão</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">trending_up</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-amber-700">{conversionRate}%</div>
            <p className="text-xs text-on-surface-variant mt-1">
              {enrolledLeads} matrículas concluídas com sucesso
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-outline-variant/40 flex items-center justify-between text-xs">
            <span className="text-on-surface-variant font-medium">Meta trimestral: 65%</span>
            <span className="text-emerald-600 font-bold">+4.2%</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-2xl border border-outline-variant shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Polos Operacionais</span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">apartment</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-primary">{polos.length}</div>
            <p className="text-xs text-on-surface-variant mt-1">
              Unidades em Luanda (Viana, Cacuaco, Talatona...)
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-outline-variant/40 flex items-center justify-between text-xs">
            <span className="text-emerald-700 font-semibold">100% Capacitados</span>
            <button
              onClick={() => setCurrentView('admin-polos')}
              className="text-primary font-bold hover:underline cursor-pointer"
            >
              Ver Polos &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions Component - 1-Click Lead & Course creation */}
      <QuickActions />

      {/* Main Content Grid: Recent Leads & Quick Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leads Table (2 cols) */}
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-primary">Últimas Inscrições e Contactos Recebidos</h3>
              <p className="text-xs text-on-surface-variant">Atualizações instantâneas do portal e chatbot</p>
            </div>
            <button
              onClick={() => setCurrentView('admin-leads')}
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Ver todas ({totalLeads})</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/40 text-[11px] font-bold text-on-surface-variant uppercase">
                  <th className="py-2.5 px-3">Candidato</th>
                  <th className="py-2.5 px-3">Curso & Polo</th>
                  <th className="py-2.5 px-3">Origem</th>
                  <th className="py-2.5 px-3">Estado</th>
                  <th className="py-2.5 px-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 text-xs">
                {recentLeads.map(lead => (
                  <tr key={lead.id} className="hover:bg-surface-container/30 transition-colors">
                    <td className="py-3 px-3">
                      <p className="font-bold text-primary">{lead.name}</p>
                      <p className="text-[11px] text-on-surface-variant">{lead.phone}</p>
                    </td>
                    <td className="py-3 px-3">
                      <p className="font-semibold text-on-surface">{lead.courseName}</p>
                      <span className="text-[10px] text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">location_on</span>
                        {lead.poloName}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-surface-container text-on-surface-variant">
                        {lead.source}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase ${getStatusBadge(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Olá ${lead.name}, contactamos do ${siteSettings.institutionName} referente à sua inscrição no curso de ${lead.courseName}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-colors"
                          title="Contactar no WhatsApp"
                        >
                          <span className="material-symbols-outlined text-[16px]">chat</span>
                        </a>
                        {lead.status !== 'matriculado' && (
                          <button
                            onClick={() => updateLeadStatus(lead.id, 'matriculado')}
                            className="p-1.5 rounded-lg bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors cursor-pointer"
                            title="Confirmar Matrícula"
                          >
                            <span className="material-symbols-outlined text-[16px]">check_circle</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Side Panel: Parametrization & Category Breakdown */}
        <div className="space-y-6">
          {/* Institutional Status Card */}
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary-container">verified</span>
              <span>Credenciais Institucionais</span>
            </h3>
            
            <div className="space-y-2.5 text-xs text-on-surface-variant">
              <div className="flex justify-between py-1.5 border-b border-outline-variant/30">
                <span className="font-semibold">Registo Oficial:</span>
                <span className="font-bold text-primary">{siteSettings.inefopRegistration}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-outline-variant/30">
                <span className="font-semibold">Ano Lectivo:</span>
                <span className="font-bold text-primary">{siteSettings.academicYear}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-outline-variant/30">
                <span className="font-semibold">Taxa de Matrícula:</span>
                <span className="font-bold text-emerald-700">{siteSettings.defaultRegistrationFee.toLocaleString('pt-AO')} Kz</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="font-semibold">Barra de Alerta:</span>
                <span className={`font-bold ${siteSettings.bannerAlert.enabled ? 'text-emerald-600' : 'text-gray-400'}`}>
                  {siteSettings.bannerAlert.enabled ? 'Ativa no Site' : 'Desativada'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setCurrentView('admin-settings')}
              className="w-full py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">edit_note</span>
              <span>Editar Parâmetros Globais</span>
            </button>
          </div>

          {/* Category Distribution */}
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-primary">Distribuição por Área</h3>
              <button
                onClick={() => setCurrentView('admin-categories')}
                className="text-xs font-bold text-primary hover:underline cursor-pointer"
              >
                Gerir
              </button>
            </div>

            <div className="space-y-3">
              {categories.map(cat => {
                const count = courses.filter(c => c.category === cat.name).length;
                const percentage = totalCourses > 0 ? (count / totalCourses) * 100 : 0;
                return (
                  <div key={cat.id} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-on-surface flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-primary">{cat.icon}</span>
                        {cat.name}
                      </span>
                      <span className="text-on-surface-variant font-semibold">
                        {count} cursos ({percentage.toFixed(0)}%)
                      </span>
                    </div>
                    <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
