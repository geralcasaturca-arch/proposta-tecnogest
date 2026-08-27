import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from './ui/Button';
import { SafeImage } from './ui/SafeImage';

export interface FlyerData {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  imageBg: string;
  accentColor: string;
  courseId?: string;
  durationOrDate: string;
  benefits: string[];
  contacts: string[];
  location: string;
  partners: string[];
  extraNote?: string;
  highlights?: string[];
  whatsappText: string;
}

export const OFFICIAL_FLAYERS: FlyerData[] = [
  {
    id: 'flyer-rigger',
    title: '04 RIGGER SINALEIRO',
    subtitle: 'Manobras de Cargas, Içamentos e Sinais Internacionais',
    badge: 'BOLSAS DE ESTUDO',
    badgeColor: 'bg-[#FF5722] text-white',
    imageBg: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1000&q=80',
    accentColor: '#00D2FF',
    courseId: 'rigger-sinaleiro',
    durationOrDate: 'Início: 12 de Janeiro de 2026 / Turmas Contínuas',
    benefits: [
      'Certificado Oficial INEFOP / MAPTSS',
      'Manual Técnico Completo',
      'Carta de Recomendação Profissional',
      'Carta de Pedido de Estágio'
    ],
    contacts: ['(+244) 949 968 537', '(+244) 949 968 897', '(+244) 948 235 692'],
    location: 'Bairro Valódia, Ex Combatentes, Edifício 206, 10º Andar (Edifício da Comunicação Social)',
    partners: ['INÇATEC', 'TÉCNOFORM', 'INEFOP', 'GOVERNO DE ANGOLA'],
    whatsappText: 'Olá Técnogest, vi o flyer oficial de Bolsa/Vaga para Rigger Sinaleiro e gostaria de fazer a minha inscrição.'
  },
  {
    id: 'flyer-cq',
    title: 'CURSO PROFISSIONAL CONTROLE DE QUALIDADE',
    subtitle: 'Inspeção Industrial, Metrologia e Normas de Qualidade',
    badge: 'CURSO PROFISSIONAL',
    badgeColor: 'bg-[#00D2FF] text-[#0A2558]',
    imageBg: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
    accentColor: '#00D2FF',
    courseId: 'controle-qualidade',
    durationOrDate: '2 Semanas • Teoria e Prática • Inscrições Abertas',
    benefits: [
      'Manual do Formando',
      'Passe do Formando',
      'Carta de Recomendação',
      'Carta de Pedido de Estágio',
      'Certificado Homologado INEFOP'
    ],
    contacts: ['(+244) 949 968 537', '(+244) 949 968 897', '(+244) 948 235 692'],
    location: 'Bairro Valódia, Ex Combatentes, Edifício 206, 10º Andar (Edifício da Comunicação Social)',
    partners: ['INÇATEC', 'TÉCNOFORM', 'INEFOP', 'GOVERNO DE ANGOLA'],
    whatsappText: 'Olá Técnogest, tenho interesse no Curso Profissional de Controle de Qualidade (2 Semanas).'
  },
  {
    id: 'flyer-hst',
    title: 'HIGIENE E SEGURANÇA NO TRABALHO (HST)',
    subtitle: 'Prevenção de Riscos Laborais, Níveis I, II e III',
    badge: 'FORMAÇÃO 30 DIAS',
    badgeColor: 'bg-[#FFC107] text-[#0A2558]',
    imageBg: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80',
    accentColor: '#FFC107',
    courseId: 'higiene-seguranca-trabalho',
    durationOrDate: 'Duração: 30 Dias • Presencial',
    benefits: [
      'Manual de HST & APR',
      'Certificado de Conclusão INEFOP',
      'Carta de Recomendação',
      'Carta de Pedido de Estágio'
    ],
    contacts: ['(+244) 949 968 537', '(+244) 949 968 897', '(+244) 948 235 692'],
    location: 'Bairro Valódia, Ex Combatentes, Edifício 206, 10º Andar (Edifício da Comunicação Social)',
    partners: ['INÇATEC', 'TÉCNOFORM', 'INEFOP', 'GOVERNO DE ANGOLA'],
    whatsappText: 'Olá Técnogest, gostaria de saber os horários e valores para a formação de Higiene e Segurança no Trabalho (HST - 30 Dias).'
  },
  {
    id: 'flyer-industriais',
    title: 'CURSOS INDUSTRIAIS TÉCNOGEST',
    subtitle: 'Qualificação Prática com Pátio de Manobras e Oficinas',
    badge: 'CURSOS INDUSTRIAIS',
    badgeColor: 'bg-[#00D2FF] text-[#0A2558]',
    imageBg: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80',
    accentColor: '#FF9800',
    durationOrDate: 'Turmas em Regime Diurno, Noturno e Sábados',
    highlights: [
      'Controlo de Qualidade',
      'Higiene e Segurança no Trabalho - Níveis I, II e III',
      'Soldadura Industrial (TIG, MIG/MAG, Elétrodo)',
      'Tubagem Industrial (Piping e Isometria)',
      'Logística e Transporte'
    ],
    benefits: [
      'Certificados com Validade Nacional & Internacional',
      'Práticas em Oficinas Industriais e Pátio em Viana',
      'Encaminhamento para Estágios no Setor Petrolífero'
    ],
    contacts: ['(+244) 948 235 692', '(+244) 943 932 890'],
    location: 'Bairro Valódia, Ex Combates, Edifício 206, 10º Andar (Edifício da Comunicação Social)',
    partners: ['TÉCNOFORM', 'INEFOP', 'GOVERNO DE ANGOLA'],
    extraNote: 'Visitar Facebook',
    whatsappText: 'Olá Técnogest, vi o catálogo de Cursos Industriais e gostaria de saber as datas das próximas turmas.'
  },
  {
    id: 'flyer-portugal',
    title: 'PLANO PORTUGAL',
    subtitle: 'Visto de Trabalho + Curso Técnico + Direito a Contrato de Trabalho',
    badge: 'PROGRAMA INTERNACIONAL',
    badgeColor: 'bg-[#E53935] text-white',
    imageBg: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1000&q=80',
    accentColor: '#00D2FF',
    courseId: 'plano-portugal-completo',
    durationOrDate: 'Atendimento: 8h-16h (Segunda a Sexta-feira)',
    highlights: [
      'Visto de Trabalho Formal',
      'Curso de Empilhadeira',
      'Curso de Soldadura',
      'Curso de Grua Torre',
      'Curso de Grua Móvel'
    ],
    benefits: [
      'OBS: Com direito a Contrato de Trabalho legal em Portugal',
      'Assessoria documental e consular completa',
      'Formação técnica intensiva homologada',
      'Integração profissional em empresas europeias'
    ],
    contacts: ['(+244) 948 235 692 (Luanda)', '(+351) 932 255 729 (Portugal)'],
    location: 'Bairro Valódia, Ex Combates, Edifício 206, 10º Andar (Edifício da Comunicação Social)',
    partners: ['TÉCNOGEST ANGOLA', 'PARCEIROS EUROPEUS'],
    extraNote: 'Facebook: TECNOGEST ANGOLA',
    whatsappText: 'Olá Técnogest, tenho interesse no Plano Portugal (Visto + Curso + Contrato de Trabalho). Como funciona o processo?'
  }
];

export const TecnogestFlyers: React.FC = () => {
  const { navigateToEnroll, courses } = useApp();
  const [selectedFlyer, setSelectedFlyer] = useState<FlyerData | null>(null);
  const [activeTab, setActiveTab] = useState<string>('todos');

  const filteredFlyers = activeTab === 'todos'
    ? OFFICIAL_FLAYERS
    : activeTab === 'portugal'
    ? OFFICIAL_FLAYERS.filter(f => f.id === 'flyer-portugal')
    : OFFICIAL_FLAYERS.filter(f => f.id !== 'flyer-portugal');

  return (
    <section className="w-full py-16 bg-gradient-to-b from-[#0A2558] via-[#0D2E6E] to-[#0A2558] text-white overflow-hidden relative border-y border-[#00D2FF]/20">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#00D2FF_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-[#00D2FF]/40 px-4 py-1.5 rounded-full text-xs font-black tracking-widest text-[#00D2FF] uppercase shadow-md">
            <span className="material-symbols-outlined text-[16px]">school</span>
            <span>Formações Técnogest</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            Inscrições Abertas
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Explore as vagas disponíveis para os cursos industriais, bolsas de estudo e o <strong className="text-[#00D2FF]">Plano Portugal</strong>.
          </p>

          {/* Filter Pills - Aligned on the grid */}
          <div className="flex flex-wrap justify-center items-center gap-2 pt-2">
            <button
              onClick={() => setActiveTab('todos')}
              className={`h-9 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer select-none inline-flex items-center justify-center ${
                activeTab === 'todos'
                  ? 'bg-[#00D2FF] text-[#0A2558] font-extrabold shadow-sm'
                  : 'bg-white/10 text-slate-300 hover:bg-white/15 border border-white/10'
              }`}
            >
              Todos ({OFFICIAL_FLAYERS.length})
            </button>
            <button
              onClick={() => setActiveTab('industriais')}
              className={`h-9 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer select-none inline-flex items-center justify-center ${
                activeTab === 'industriais'
                  ? 'bg-[#00D2FF] text-[#0A2558] font-extrabold shadow-sm'
                  : 'bg-white/10 text-slate-300 hover:bg-white/15 border border-white/10'
              }`}
            >
              Cursos Industriais e HST
            </button>
            <button
              onClick={() => setActiveTab('portugal')}
              className={`h-9 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer select-none inline-flex items-center justify-center ${
                activeTab === 'portugal'
                  ? 'bg-[#E53935] text-white font-extrabold shadow-sm'
                  : 'bg-white/10 text-slate-300 hover:bg-white/15 border border-white/10'
              }`}
            >
              Plano Portugal
            </button>
          </div>
        </div>

        {/* Banners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredFlyers.map((flyer) => (
            <div
              key={flyer.id}
              className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300 flex flex-col group"
            >
              {/* Image Header with floating badge */}
              <div className="relative h-48 sm:h-52 overflow-hidden bg-[#0A2558]">
                <SafeImage
                  src={flyer.imageBg}
                  alt={flyer.title}
                  category={flyer.id}
                  wrapperClassName="w-full h-full"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2558]/90 to-transparent"></div>
                
                {/* Floating Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`text-[10px] font-bold uppercase px-3 py-1.5 rounded-lg shadow-sm ${flyer.badgeColor}`}>
                    {flyer.badge}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Titles */}
                <div className="mb-5">
                  <p className="text-[11px] font-semibold text-[#00D2FF] uppercase tracking-wider mb-1.5">
                    {flyer.durationOrDate}
                  </p>
                  <h3 className="text-lg font-bold text-white leading-tight mb-2">
                    {flyer.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {flyer.subtitle}
                  </p>
                </div>

                {/* Bullet Points (Combined Highlights & Benefits max 3) */}
                <div className="mb-6 space-y-2.5 mt-auto">
                  {([...(flyer.highlights || []), ...flyer.benefits]).slice(0, 3).map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-slate-200">
                      <span className="material-symbols-outlined text-[#00D2FF] text-[18px] shrink-0">check</span>
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                  {([...(flyer.highlights || []), ...flyer.benefits]).length > 3 && (
                     <div className="text-xs text-slate-400 font-medium pl-7">
                       + {([...(flyer.highlights || []), ...flyer.benefits]).length - 3} mais detalhes no modal
                     </div>
                  )}
                </div>

                {/* Actions Footer */}
                <div className="pt-4 border-t border-white/10 flex items-center gap-2 mt-auto">
                  <button
                    onClick={() => {
                      if (flyer.courseId) {
                        navigateToEnroll(flyer.courseId);
                      } else {
                        navigateToEnroll();
                      }
                    }}
                    className="flex-1 h-10 rounded-xl bg-[#00D2FF] text-[#0A2558] hover:bg-[#00B4DB] font-bold text-sm transition-colors"
                  >
                    Inscrever-me
                  </button>
                  
                  <button
                    onClick={() => setSelectedFlyer(flyer)}
                    className="h-10 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-colors border border-white/15 cursor-pointer"
                    title="Ver detalhes"
                  >
                    Detalhes
                  </button>

                  <a
                    href={`https://wa.me/244948235692?text=${encodeURIComponent(flyer.whatsappText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-xl transition-colors flex items-center justify-center shrink-0"
                    title="Contactar WhatsApp"
                  >
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Banner Footer Slogan */}
        <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#00D2FF]/20 text-[#00D2FF] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">verified</span>
            </div>
            <div>
              <p className="font-extrabold text-sm text-white">
                Técnogest Angola
              </p>
              <p className="text-xs text-slate-300">
                Sede: Bairro Valódia, Ex Combatentes, Edifício 206, 10º Andar (Edifício da Comunicação Social)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://facebook.com/tecnogestangola"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-[#1877F2] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5"
            >
              <span>Facebook: TECNOGEST ANGOLA</span>
            </a>
            <a
              href="tel:+244948235692"
              className="bg-[#00D2FF] text-[#0A2558] text-xs font-black px-4 py-2 rounded-xl hover:bg-[#00B4DB] transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">call</span>
              <span>+244 948 235 692</span>
            </a>
          </div>
        </div>

      </div>

      {/* Fullscreen Flyer Modal */}
      {selectedFlyer && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A2558] text-white w-full max-w-2xl rounded-3xl border border-[#00D2FF]/40 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-4 bg-[#071a3d] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${selectedFlyer.badgeColor}`}>
                  {selectedFlyer.badge}
                </span>
                <span className="text-xs font-extrabold text-[#00D2FF]">TÉCNOGEST</span>
              </div>
              <button
                onClick={() => setSelectedFlyer(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-5">
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-white leading-tight">
                  {selectedFlyer.title}
                </h3>
                <p className="text-sm text-[#00D2FF] font-semibold">
                  {selectedFlyer.subtitle}
                </p>
                <p className="text-xs text-slate-300 font-bold mt-1">
                  📅 {selectedFlyer.durationOrDate}
                </p>
              </div>

              {/* Highlights */}
              {selectedFlyer.highlights && (
                <div className="bg-white/10 rounded-2xl p-4 border border-white/10 space-y-2">
                  <p className="text-xs font-black uppercase text-[#00D2FF] tracking-wider">
                    Disciplinas incluídas:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {selectedFlyer.highlights.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 bg-white/5 p-2 rounded-lg">
                        <span className="text-[#00D2FF] font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              <div className="space-y-2">
                <p className="text-xs font-black uppercase text-[#00D2FF] tracking-wider">
                  Benefícios incluídos:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedFlyer.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 p-2.5 rounded-xl text-xs">
                      <span className="material-symbols-outlined text-[#00D2FF] text-[16px]">verified</span>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contacts & Location Box */}
              <div className="bg-gradient-to-r from-[#071a3d] to-[#0d2a63] p-4 rounded-2xl border border-white/15 space-y-2 text-xs">
                <p className="font-extrabold text-[#00D2FF] uppercase text-[11px]">
                  Contactos:
                </p>
                <p className="text-white font-bold">
                  {selectedFlyer.contacts.join(' • ')}
                </p>
                <p className="text-slate-300">
                  📍 {selectedFlyer.location}
                </p>
                <p className="text-[11px] text-slate-400">
                  🏛️ Homologação: {selectedFlyer.partners.join(', ')}
                </p>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 bg-[#071a3d] border-t border-white/10 flex flex-wrap gap-2 justify-end">
              <a
                href={`https://wa.me/244948235692?text=${encodeURIComponent(selectedFlyer.whatsappText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#1EBE5A] text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all flex items-center gap-1.5 shadow-md"
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
                <span>Falar com a secretaria</span>
              </a>

              <button
                onClick={() => {
                  const targetCourseId = selectedFlyer.courseId;
                  setSelectedFlyer(null);
                  if (targetCourseId) {
                    navigateToEnroll(targetCourseId);
                  } else {
                    navigateToEnroll();
                  }
                }}
                className="bg-[#00D2FF] hover:bg-[#00B4DB] text-[#0A2558] font-black text-xs py-2.5 px-5 rounded-xl transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
                <span>Inscrever-me</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
