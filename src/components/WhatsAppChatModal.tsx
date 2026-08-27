import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const WhatsAppChatModal: React.FC = () => {
  const { isChatModalOpen, setIsChatModalOpen, courses, polos, addLead, showToast, siteSettings } = useApp();

  const [selectedCourseName, setSelectedCourseName] = useState<string>('');
  const [selectedPoloName, setSelectedPoloName] = useState<string>('');
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    consent: true
  });
  const [isTyping, setIsTyping] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  if (!isChatModalOpen) return null;

  const handleSelectCourse = (course: string) => {
    setSelectedCourseName(course);
    setStep(2);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 500);
  };

  const handleSelectPolo = (polo: string) => {
    setSelectedPoloName(polo);
    setStep(3);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 500);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome.trim() || !formData.whatsapp.trim()) {
      showToast('Por favor preencha o seu nome e telefone.', 'error');
      return;
    }

    addLead({
      name: formData.nome,
      phone: formData.whatsapp.startsWith('+244') ? formData.whatsapp : `+244 ${formData.whatsapp}`,
      courseName: selectedCourseName || 'Geral / A Definir',
      poloName: selectedPoloName || 'Sede Valódia',
      source: 'whatsapp',
      status: 'novo',
      notes: `Pré-inscrição via Chatbot WhatsApp Técnogest. Interesses: ${selectedCourseName} @ ${selectedPoloName}`
    });

    setStep(4);
    setIsCompleted(true);
    showToast('Pré-reserva enviada à secretaria da Técnogest com sucesso!');
  };

  const resetChat = () => {
    setStep(1);
    setSelectedCourseName('');
    setSelectedPoloName('');
    setFormData({ nome: '', whatsapp: '', consent: true });
    setIsCompleted(false);
  };

  const popularCourses = courses.length > 0
    ? courses.slice(0, 6).map(c => c.name)
    : ['Rigger Sinaleiro', 'Controlo de Qualidade', 'HST I/II/III', 'Plano Portugal - Empilhador'];

  const popularPolos = polos.length > 0
    ? polos.slice(0, 4).map(p => p.name)
    : ['Sede Valódia', 'Polo Viana', 'Polo Boavista'];

  const cleanWhatsappNumber = (siteSettings.whatsappOfficial || '244923769910').replace(/[^0-9]/g, '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[650px] max-h-[90vh] border border-outline-variant relative">
        {/* Header matching the brand style */}
        <div className="bg-[#0A2558] text-white px-5 py-4 flex items-center justify-between shadow-md relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#00D2FF] flex items-center justify-center text-[#0A2558] font-extrabold text-lg shadow-sm">
              <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                support_agent
              </span>
            </div>
            <div>
              <h2 className="font-extrabold text-base tracking-tight text-white leading-tight">
                {siteSettings.brandShortName || 'Técnogest Angola'}
              </h2>
              <p className="text-xs text-[#00D2FF] flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#00D2FF] animate-pulse"></span>
                Secretaria & Atendimento Online
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsChatModalOpen(false)}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Chat message body */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#f8f9fa] flex flex-col gap-3.5 hide-scroll">
          {/* Bot Greeting */}
          <div className="flex gap-2.5 max-w-[88%] animate-in fade-in slide-in-from-left-3 duration-300">
            <div className="w-8 h-8 rounded-full bg-[#0A2558] text-white flex items-center justify-center shrink-0 mt-auto shadow-xs">
              <span className="material-symbols-outlined text-[16px]">smart_toy</span>
            </div>
            <div className="bg-white rounded-2xl rounded-bl-xs p-3.5 shadow-sm border border-outline-variant/40">
              <p className="text-on-surface text-sm leading-relaxed">
                Olá! Bem-vindo à <strong>{siteSettings.brandShortName || 'Técnogest'}</strong>. ⚓🏗️
                <br />
                Em qual dos nossos cursos ou programas tem interesse em ingressar?
              </p>
            </div>
          </div>

          {/* Step 1 Options */}
          {step === 1 && (
            <div className="flex flex-wrap gap-2 pl-10 animate-in fade-in duration-300">
              {popularCourses.map((c) => (
                <button
                  key={c}
                  onClick={() => handleSelectCourse(c)}
                  className="bg-white border border-primary/40 text-primary font-bold text-xs py-1.5 px-3 rounded-full hover:bg-[#0A2558] hover:text-[#00D2FF] hover:border-[#0A2558] transition-all shadow-2xs active:scale-95 cursor-pointer"
                >
                  {c}
                </button>
              ))}
            </div>
          )}

          {/* User selection Course */}
          {step >= 2 && (
            <div className="flex justify-end gap-2 max-w-[88%] ml-auto animate-in fade-in slide-in-from-right-3 duration-200">
              <div className="bg-[#0A2558] text-white rounded-2xl rounded-br-xs p-3 px-4 shadow-sm">
                <p className="text-sm font-medium">{selectedCourseName}</p>
              </div>
            </div>
          )}

          {/* Bot asking Polo */}
          {step >= 2 && (
            <div className="flex gap-2.5 max-w-[88%] animate-in fade-in slide-in-from-left-3 duration-300">
              <div className="w-8 h-8 rounded-full bg-[#0A2558] text-white flex items-center justify-center shrink-0 mt-auto shadow-xs">
                <span className="material-symbols-outlined text-[16px]">smart_toy</span>
              </div>
              <div className="bg-white rounded-2xl rounded-bl-xs p-3.5 shadow-sm border border-outline-variant/40">
                <p className="text-on-surface text-sm leading-relaxed">
                  Excelente escolha! 📍 Em qual dos nossos polos da Técnogest prefere frequentar as aulas teóricas e práticas?
                </p>
              </div>
            </div>
          )}

          {/* Step 2 Options */}
          {step === 2 && !isTyping && (
            <div className="flex flex-wrap gap-2 pl-10 animate-in fade-in duration-300">
              {popularPolos.map((p) => (
                <button
                  key={p}
                  onClick={() => handleSelectPolo(p)}
                  className="bg-white border border-primary/40 text-primary font-bold text-xs py-1.5 px-3 rounded-full hover:bg-[#0A2558] hover:text-[#00D2FF] hover:border-[#0A2558] transition-all shadow-2xs active:scale-95 cursor-pointer"
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* User selection Polo */}
          {step >= 3 && (
            <div className="flex justify-end gap-2 max-w-[88%] ml-auto animate-in fade-in slide-in-from-right-3 duration-200">
              <div className="bg-[#0A2558] text-white rounded-2xl rounded-br-xs p-3 px-4 shadow-sm">
                <p className="text-sm font-medium">{selectedPoloName}</p>
              </div>
            </div>
          )}

          {/* Bot asking contact details */}
          {step >= 3 && (
            <div className="flex gap-2.5 max-w-[88%] animate-in fade-in slide-in-from-left-3 duration-300">
              <div className="w-8 h-8 rounded-full bg-[#0A2558] text-white flex items-center justify-center shrink-0 mt-auto shadow-xs">
                <span className="material-symbols-outlined text-[16px]">smart_toy</span>
              </div>
              <div className="bg-white rounded-2xl rounded-bl-xs p-3.5 shadow-sm border border-outline-variant/40">
                <p className="text-on-surface text-sm leading-relaxed">
                  Para reservarmos a sua vaga e enviarmos o programa detalhado do curso, informe o seu nome e WhatsApp:
                </p>
              </div>
            </div>
          )}

          {/* Form Step */}
          {step === 3 && (
            <div className="pl-10 animate-in fade-in duration-300">
              <form
                onSubmit={handleSubmitForm}
                className="bg-white p-4 rounded-xl border border-outline-variant shadow-sm space-y-3"
              >
                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    placeholder="Ex: João Baptista"
                    className="w-full text-sm px-3 py-2 bg-surface-container-low rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary text-on-surface"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    Contacto WhatsApp *
                  </label>
                  <div className="flex">
                    <span className="bg-surface-container-high px-2.5 py-2 rounded-l-lg border border-r-0 border-outline-variant text-xs font-bold text-on-surface-variant flex items-center">
                      +244
                    </span>
                    <input
                      type="tel"
                      required
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="923 000 000"
                      className="w-full text-sm px-3 py-2 bg-surface-container-low rounded-r-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary text-on-surface"
                    />
                  </div>
                </div>
                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="consent-check"
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-0.5 rounded text-primary focus:ring-primary"
                  />
                  <label htmlFor="consent-check" className="text-[11px] text-on-surface-variant leading-tight cursor-pointer">
                    Concordo que a secretaria da Técnogest entre em contacto para formalização da matrícula.
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#0A2558] hover:bg-[#081B40] text-[#00D2FF] font-bold text-sm py-2.5 rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer border border-[#00D2FF]/30"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  <span>Fazer Inscrição na Técnogest</span>
                </button>
              </form>
            </div>
          )}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-2 max-w-[85%] pl-10">
              <div className="bg-white rounded-2xl rounded-bl-xs p-3 shadow-sm border border-outline-variant flex items-center gap-1.5">
                <span className="w-2 h-2 bg-on-surface-variant/60 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-on-surface-variant/60 rounded-full animate-bounce [animation-delay:0.15s]"></span>
                <span className="w-2 h-2 bg-on-surface-variant/60 rounded-full animate-bounce [animation-delay:0.3s]"></span>
              </div>
            </div>
          )}

          {/* Success Step */}
          {step === 4 && (
            <div className="flex gap-2.5 max-w-[95%] animate-in zoom-in-95 duration-300">
              <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 mt-auto shadow-xs">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
              </div>
              <div className="bg-white rounded-2xl rounded-bl-xs p-4 shadow-md border border-[#4ade80] space-y-2">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    task_alt
                  </span>
                  <span>A sua vaga de pré-reserva foi registada!</span>
                </div>
                <p className="text-xs text-on-surface leading-relaxed">
                  Obrigado, <strong>{formData.nome}</strong>! A secretaria da Técnogest no <strong>{selectedPoloName}</strong> entrará em contacto via WhatsApp no <strong>{formData.whatsapp}</strong> com os horários e próximos passos para formalizar a matrícula.
                </p>
                <div className="pt-2 flex gap-2">
                  <button
                    onClick={resetChat}
                    className="text-xs text-primary underline font-bold"
                  >
                    Simular nova inscrição
                  </button>
                  <a
                    href={`https://wa.me/${cleanWhatsappNumber}?text=Olá,%20acabei%20de%20fazer%20pré-inscrição%20para%20o%20curso%20de%20${encodeURIComponent(selectedCourseName)}%20no%20${encodeURIComponent(selectedPoloName)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto bg-[#25D366] hover:bg-[#1EBE5A] text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">chat</span>
                    <span>Abrir WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="bg-white p-3 px-4 border-t border-outline-variant flex items-center justify-between text-xs text-on-surface-variant">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
            Homologação Oficial {siteSettings.inefopRegistration || 'INEFOP'}
          </span>
          <span className="font-medium text-primary">{siteSettings.brandShortName || 'Técnogest'} {siteSettings.academicYear || '2025'}</span>
        </div>
      </div>
    </div>
  );
};
