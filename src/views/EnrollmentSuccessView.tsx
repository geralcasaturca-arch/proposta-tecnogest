import React from 'react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';

export const EnrollmentSuccessView: React.FC = () => {
  const { lastSubmission, setCurrentView } = useApp();

  const studentName = lastSubmission?.fullName || 'Futuro Estudante';
  const courseName = lastSubmission?.courseName || 'Curso Profissional';
  const poloName = lastSubmission?.poloName || 'Polo Principal';
  const phone = lastSubmission?.phone || '+244 923 111 222';
  const shift = lastSubmission?.shift || 'Manhã (08h00 - 12h00)';

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center py-12 px-4 md:px-8 bg-background">
      <SEOHead
        title="Inscrição Confirmada | Técnogest Angola"
        description="A sua pré-inscrição foi recebida com sucesso pela Técnogest Angola. A nossa secretaria entrará em contacto para confirmação de vaga."
      />
      <div className="w-full max-w-2xl bg-surface-container-lowest rounded-3xl border border-outline-variant p-6 sm:p-10 shadow-xl text-center space-y-8 animate-in zoom-in-95 duration-300">
        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full bg-[#e8f8ed] border-4 border-[#4ade80] text-[#25D366] flex items-center justify-center mx-auto shadow-sm">
          <span className="material-symbols-outlined text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            check_circle
          </span>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <span className="bg-[#4ade80]/20 text-[#166534] text-xs font-extrabold uppercase px-3 py-1 rounded-full">
            Inscrição Recebida
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
            Parabéns, {studentName.split(' ')[0]}!
          </h1>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-lg mx-auto">
            A tua pré-inscrição para o curso de <strong>{courseName}</strong> foi registada com sucesso na nossa base de dados.
          </p>
        </div>

        {/* Details Card */}
        <div className="bg-surface-container-low rounded-2xl p-5 sm:p-6 border border-outline-variant/40 text-left space-y-3">
          <h2 className="text-xs font-bold text-primary uppercase tracking-wider border-b border-outline-variant/40 pb-2">
            Resumo do Pedido de Inscrição
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div>
              <span className="text-on-surface-variant block text-xs">Nome Completo:</span>
              <strong className="text-on-surface">{studentName}</strong>
            </div>

            <div>
              <span className="text-on-surface-variant block text-xs">Curso Escolhido:</span>
              <strong className="text-primary">{courseName}</strong>
            </div>

            <div>
              <span className="text-on-surface-variant block text-xs">Polo / Centro:</span>
              <strong className="text-on-surface">{poloName}</strong>
            </div>

            <div>
              <span className="text-on-surface-variant block text-xs">Turno de Estudo:</span>
              <strong className="text-on-surface">{shift}</strong>
            </div>

            <div>
              <span className="text-on-surface-variant block text-xs">Telefone / WhatsApp:</span>
              <strong className="text-on-surface">{phone}</strong>
            </div>

            <div>
              <span className="text-on-surface-variant block text-xs">Estado:</span>
              <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Em Processamento
              </span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="text-left space-y-3 bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-5">
          <h2 className="text-xs font-bold text-primary uppercase tracking-wider">
            Próximos Passos:
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-on-surface-variant">
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-primary-fixed text-primary font-bold text-xs flex items-center justify-center shrink-0">
                1
              </span>
              <p>A secretaria do <strong>{poloName}</strong> entrará em contacto via WhatsApp no <strong>{phone}</strong>.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-primary-fixed text-primary font-bold text-xs flex items-center justify-center shrink-0">
                2
              </span>
              <p>Receberá as orientações para o pagamento da taxa de matrícula e formalização presencial com o BI original.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-primary-fixed text-primary font-bold text-xs flex items-center justify-center shrink-0">
                3
              </span>
              <p>Entrega dos manuais didáticos e início das aulas práticas na data confirmada.</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a
            href={`https://wa.me/244923111222?text=Olá,%20acabei%20de%20fazer%20inscrição%20online%20para%20o%20curso%20de%20${encodeURIComponent(courseName)}%20no%20${encodeURIComponent(poloName)}.%20Nome:%20${encodeURIComponent(studentName)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-[#25D366] hover:bg-[#1EBE5A] text-white font-bold text-sm py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md"
          >
            <span className="material-symbols-outlined text-[20px]">chat</span>
            <span>Acelerar pelo WhatsApp</span>
          </a>
          <button
            onClick={() => setCurrentView('courses')}
            className="bg-surface-container-high hover:bg-surface-variant text-primary font-bold text-sm py-3.5 px-6 rounded-xl transition-colors cursor-pointer"
          >
            Ver Mais Cursos
          </button>
          <button
            onClick={() => setCurrentView('home')}
            className="text-on-surface-variant hover:text-primary font-bold text-sm py-3.5 px-4 rounded-xl transition-colors cursor-pointer"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    </div>
  );
};
