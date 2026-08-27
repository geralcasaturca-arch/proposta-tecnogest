import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { EnrollmentSubmission } from '../types';
import { DocumentUpload, UploadedDocument } from '../components/DocumentUpload';
import { SEOHead } from '../components/SEOHead';
import { SafeImage } from '../components/ui/SafeImage';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '../components/ui/breadcrumb';

type WizardStep = 1 | 2 | 3 | 4;

interface StepInfo {
  id: WizardStep;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
}

const WIZARD_STEPS: StepInfo[] = [
  {
    id: 1,
    title: 'Curso & Polo',
    shortTitle: 'Curso',
    description: 'Escolha o curso, polo e horário',
    icon: 'school'
  },
  {
    id: 2,
    title: 'Identificação',
    shortTitle: 'Dados',
    description: 'Dados pessoais do formando',
    icon: 'person'
  },
  {
    id: 3,
    title: 'Contactos',
    shortTitle: 'Contacto',
    description: 'Telefone e morada de residência',
    icon: 'call'
  },
  {
    id: 4,
    title: 'Documentos & Revisão',
    shortTitle: 'Revisão',
    description: 'Anexo de ficheiros e confirmação',
    icon: 'verified_user'
  }
];

export const EnrollmentView: React.FC = () => {
  const {
    courses,
    polos,
    categories,
    siteSettings,
    preSelectedCourseId,
    preSelectedPoloId,
    submitEnrollment,
    setCurrentView,
    setIsChatModalOpen
  } = useApp();

  const [currentStep, setCurrentStep] = useState<WizardStep>(1);
  const [courseCategoryFilter, setCourseCategoryFilter] = useState<string>('Todos');
  const [courseSearch, setCourseSearch] = useState<string>('');

  const [formData, setFormData] = useState({
    fullName: '',
    biNumber: '',
    birthDate: '',
    gender: 'Masculino' as 'Masculino' | 'Feminino' | 'Outro',
    phone: '',
    email: '',
    address: '',
    academicLevel: 'Ensino Médio Concluído',
    courseId: preSelectedCourseId || (courses[0]?.id ?? ''),
    poloId: preSelectedPoloId || (polos[0]?.id ?? ''),
    shift: 'Manhã (08h00 - 12h00)' as 'Manhã (08h00 - 12h00)' | 'Tarde (13h00 - 17h00)' | 'Noite (18h00 - 20h30)' | 'Sábados (08h00 - 14h00)',
    notes: '',
    termsAccepted: false
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [attachedDocs, setAttachedDocs] = useState<UploadedDocument[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stepDirection, setStepDirection] = useState<'next' | 'prev'>('next');

  useEffect(() => {
    if (preSelectedCourseId) {
      setFormData(prev => ({ ...prev, courseId: preSelectedCourseId }));
    }
  }, [preSelectedCourseId]);

  useEffect(() => {
    if (preSelectedPoloId) {
      setFormData(prev => ({ ...prev, poloId: preSelectedPoloId }));
    }
  }, [preSelectedPoloId]);

  const selectedCourse = courses.find(c => c.id === formData.courseId) || courses[0];
  const selectedPolo = polos.find(p => p.id === formData.poloId) || polos[0];

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  // Real-time Field Validations
  const validation = useMemo(() => {
    // Name validation: min 2 words, min 5 chars
    const trimmedName = (formData.fullName || '').trim();
    const nameWords = trimmedName.split(/\s+/).filter(w => w.length > 1);
    const isNameValid = trimmedName.length >= 5 && nameWords.length >= 2;
    let nameMessage = '';
    if (!trimmedName) {
      nameMessage = 'Nome completo é obrigatório';
    } else if (nameWords.length < 2) {
      nameMessage = 'Insira o nome próprio e pelo menos um apelido/sobrenome';
    } else if (trimmedName.length < 5) {
      nameMessage = 'Nome muito curto (mínimo 5 caracteres)';
    }

    // BI validation: standard Angolan BI format is 9 digits + 2 letters + 3 digits (e.g. 007294821LA042)
    const cleanedBI = (formData.biNumber || '').trim().toUpperCase();
    const biPattern = /^[0-9]{9}[A-Z]{2}[0-9]{3}$/;
    const isBiValid = biPattern.test(cleanedBI);
    let biMessage = '';
    if (!cleanedBI) {
      biMessage = 'Número do Bilhete de Identidade é obrigatório';
    } else if (cleanedBI.length !== 14) {
      biMessage = `Deve ter 14 caracteres (atualmente ${cleanedBI.length}/14)`;
    } else if (!biPattern.test(cleanedBI)) {
      biMessage = 'Formato esperado: 9 dígitos + 2 letras + 3 dígitos (ex: 007294821LA042)';
    }

    // Birth Date & Age validation: min age 14, max age 85
    let isBirthDateValid = false;
    let birthDateMessage = '';
    let age = 0;
    if (!formData.birthDate) {
      birthDateMessage = 'Data de nascimento é obrigatória';
    } else {
      const birth = new Date(formData.birthDate);
      const today = new Date();
      age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      if (age < 14) {
        birthDateMessage = `Idade mínima de 14 anos requerida (idade atual: ${age} anos)`;
      } else if (age > 85) {
        birthDateMessage = 'Por favor confirme a sua data de nascimento';
      } else {
        isBirthDateValid = true;
      }
    }

    // Phone validation: Angola 9 digits starting with 9
    const cleanPhone = formData.phone.replace(/\D/g, '');
    const isPhoneValid = cleanPhone.length === 9 && cleanPhone.startsWith('9');
    let phoneMessage = '';
    if (!cleanPhone) {
      phoneMessage = 'Contacto telefónico é obrigatório';
    } else if (cleanPhone.length !== 9) {
      phoneMessage = `Número deve conter 9 dígitos (atualmente ${cleanPhone.length}/9)`;
    } else if (!cleanPhone.startsWith('9')) {
      phoneMessage = 'Número móvel em Angola deve começar por 9 (ex: 923...)';
    }

    // Email validation: optional, but if given, must be valid
    const isEmailValid = !formData.email.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
    let emailMessage = '';
    if (formData.email.trim() && !isEmailValid) {
      emailMessage = 'Endereço de e-mail inválido';
    }

    // Address validation: min 5 chars
    const isAddressValid = formData.address.trim().length >= 5;
    let addressMessage = '';
    if (!formData.address.trim()) {
      addressMessage = 'Morada / Bairro é obrigatória';
    } else if (formData.address.trim().length < 5) {
      addressMessage = 'Por favor indique o município e bairro (mín. 5 caracteres)';
    }

    // Course & Polo validation
    const isCourseValid = Boolean(formData.courseId);
    const isPoloValid = Boolean(formData.poloId);
    const isShiftValid = Boolean(formData.shift);
    const isTermsValid = formData.termsAccepted;

    // Step-by-step Validity Checks
    const isStep1Valid = isCourseValid && isPoloValid && isShiftValid;
    const isStep2Valid = isNameValid && isBiValid && isBirthDateValid;
    const isStep3Valid = isPhoneValid && isEmailValid && isAddressValid;
    const isStep4Valid = isTermsValid;

    const isFormValid = isStep1Valid && isStep2Valid && isStep3Valid && isStep4Valid;

    // Overall completion percentage
    const stepScores = [
      isStep1Valid ? 25 : 0,
      isStep2Valid ? 25 : 0,
      isStep3Valid ? 25 : 0,
      isStep4Valid ? 25 : 0
    ];
    const progressPercent = stepScores.reduce((a, b) => a + b, 0);

    return {
      isNameValid,
      nameMessage,
      isBiValid,
      biMessage,
      isBirthDateValid,
      birthDateMessage,
      age,
      isPhoneValid,
      phoneMessage,
      isEmailValid,
      emailMessage,
      isAddressValid,
      addressMessage,
      isCourseValid,
      isPoloValid,
      isShiftValid,
      isTermsValid,
      isStep1Valid,
      isStep2Valid,
      isStep3Valid,
      isStep4Valid,
      progressPercent,
      isFormValid
    };
  }, [formData]);

  // Filtered courses for Step 1
  const filteredCourses = useMemo(() => {
    const q = (courseSearch || '').toLowerCase().trim();
    return courses.filter(c => {
      const matchesCat = courseCategoryFilter === 'Todos' || c.category === courseCategoryFilter;
      const matchesSearch = !q || 
        (c.name || '').toLowerCase().includes(q) ||
        (c.category || '').toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [courses, courseCategoryFilter, courseSearch]);

  const goToStep = (step: WizardStep) => {
    if (step < currentStep) {
      setStepDirection('prev');
      setCurrentStep(step);
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    // If trying to go forward, ensure previous steps are valid
    if (step === 2 && !validation.isStep1Valid) {
      return;
    }
    if (step === 3 && (!validation.isStep1Valid || !validation.isStep2Valid)) {
      setTouched(prev => ({
        ...prev,
        fullName: true,
        biNumber: true,
        birthDate: true
      }));
      return;
    }
    if (step === 4 && (!validation.isStep1Valid || !validation.isStep2Valid || !validation.isStep3Valid)) {
      setTouched(prev => ({
        ...prev,
        fullName: true,
        biNumber: true,
        birthDate: true,
        phone: true,
        address: true
      }));
      return;
    }

    setStepDirection('next');
    setCurrentStep(step);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (validation.isStep1Valid) {
        goToStep(2);
      }
    } else if (currentStep === 2) {
      setTouched(prev => ({
        ...prev,
        fullName: true,
        biNumber: true,
        birthDate: true
      }));
      if (validation.isStep2Valid) {
        goToStep(3);
      }
    } else if (currentStep === 3) {
      setTouched(prev => ({
        ...prev,
        phone: true,
        email: true,
        address: true
      }));
      if (validation.isStep3Valid) {
        goToStep(4);
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      goToStep((currentStep - 1) as WizardStep);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentStep < 4) {
      handleNext();
      return;
    }

    setTouched({
      fullName: true,
      biNumber: true,
      birthDate: true,
      phone: true,
      email: true,
      address: true
    });

    if (!validation.isFormValid) {
      if (!validation.isStep1Valid) setCurrentStep(1);
      else if (!validation.isStep2Valid) setCurrentStep(2);
      else if (!validation.isStep3Valid) setCurrentStep(3);
      return;
    }

    setIsSubmitting(true);

    const submission: EnrollmentSubmission = {
      ...formData,
      biNumber: formData.biNumber.trim().toUpperCase(),
      courseName: selectedCourse?.name || 'Curso Profissional',
      poloName: selectedPolo?.name || 'Viana',
      attachedFilesCount: attachedDocs.length
    };

    setTimeout(() => {
      submitEnrollment(submission);
      setIsSubmitting(false);
    }, 700);
  };

  const formatKZ = (val: number) => val.toLocaleString('pt-AO') + ' Kz';

  const shiftsList = [
    {
      id: 'Manhã (08h00 - 12h00)',
      label: 'Manhã',
      hours: '08h00 às 12h00',
      icon: 'light_mode',
      desc: 'Ideal para quem prefere estudar no período da manhã'
    },
    {
      id: 'Tarde (13h00 - 17h00)',
      label: 'Tarde',
      hours: '13h00 às 17h00',
      icon: 'wb_sunny',
      desc: 'Aulas práticas no período da tarde'
    },
    {
      id: 'Noite (18h00 - 20h30)',
      label: 'Pós-Laboral / Noite',
      hours: '18h00 às 20h30',
      icon: 'bedtime',
      desc: 'Perfeito para quem trabalha durante o dia'
    },
    {
      id: 'Sábados (08h00 - 14h00)',
      label: 'Sábados Intensivo',
      hours: '08h00 às 14h00',
      icon: 'event_available',
      desc: 'Regime intensivo de fim-de-semana'
    }
  ];

  return (
    <div className="bg-surface-container-low min-h-screen py-8 sm:py-12 px-4 sm:px-6 md:px-8">
      {/* Dynamic SEO Head with schema for Course Registration / Admissions */}
      <SEOHead
        title={`Inscrição Online - ${selectedCourse?.name || 'Formações Industriais'} | Técnogest Angola`}
        description={`Garanta a sua vaga na formação de ${selectedCourse?.name || 'formação industrial'} no Polo de ${selectedPolo?.name || 'Luanda'}. Vagas homologadas pelo INEFOP.`}
        canonicalUrl="https://tecnogest.ao/inscricao"
      />

      <div className="max-w-4xl mx-auto">
        {/* Header Breadcrumb with Shadcn UI */}
        <div className="mb-6 flex items-center justify-between">
          <Breadcrumb className="text-xs">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  onClick={() => setCurrentView('home')}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Início
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  onClick={() => setCurrentView('courses')}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Cursos
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-primary font-bold">
                  Assistente de Inscrição
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-on-surface-variant bg-surface-container-lowest px-3 py-1.5 rounded-full border border-outline-variant shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-semibold text-primary">Registo Oficial INEFOP</span>
          </div>
        </div>

        {/* Wizard Card Container */}
        <div className="bg-surface-container-lowest rounded-3xl shadow-xl border border-outline-variant overflow-hidden">
          
          {/* Top Banner with official badge */}
          <div className="bg-primary text-on-primary p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-secondary/10 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-black mb-3 shadow-xs">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                <span>{siteSettings.inefopRegistration} • {siteSettings.academicYear}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                Ficha de Inscrição Guiada
              </h1>
              <p className="text-xs sm:text-sm text-on-primary-container mt-2 leading-relaxed">
                Complete os 4 passos abaixo para fazer a sua inscrição com certificação oficial e condições facilitadas de pagamento.
              </p>
            </div>

            {/* Stepper Navigation Header */}
            <div className="mt-8 pt-6 border-t border-primary-container/60">
              <div className="grid grid-cols-4 gap-2 sm:gap-4 relative">
                {WIZARD_STEPS.map((step, idx) => {
                  const isCurrent = currentStep === step.id;
                  const isCompleted = currentStep > step.id;
                  const isClickable = step.id < currentStep || (step.id === 2 && validation.isStep1Valid) || (step.id === 3 && validation.isStep1Valid && validation.isStep2Valid) || (step.id === 4 && validation.isStep1Valid && validation.isStep2Valid && validation.isStep3Valid);

                  return (
                    <button
                      key={step.id}
                      type="button"
                      disabled={!isClickable}
                      onClick={() => isClickable && goToStep(step.id)}
                      className={`flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 text-left p-2 sm:p-2.5 rounded-2xl transition-all ${
                        isCurrent
                          ? 'bg-white text-primary shadow-md ring-2 ring-secondary-container'
                          : isCompleted
                          ? 'bg-primary-container/60 text-white hover:bg-primary-container/90 cursor-pointer'
                          : 'opacity-50 text-white/70 cursor-not-allowed'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center font-black text-xs sm:text-sm shrink-0 transition-transform ${
                          isCurrent
                            ? 'bg-primary text-white scale-105'
                            : isCompleted
                            ? 'bg-emerald-500 text-white'
                            : 'bg-white/20 text-white'
                        }`}
                      >
                        {isCompleted ? (
                          <span className="material-symbols-outlined text-[16px] sm:text-[18px]">check</span>
                        ) : (
                          <span>{step.id}</span>
                        )}
                      </div>

                      <div className="min-w-0 text-center sm:text-left">
                        <p className={`text-[11px] sm:text-xs font-black truncate leading-tight ${isCurrent ? 'text-primary' : 'text-white'}`}>
                          <span className="hidden sm:inline">{step.title}</span>
                          <span className="sm:hidden">{step.shortTitle}</span>
                        </p>
                        <p className={`hidden lg:block text-[10px] truncate ${isCurrent ? 'text-on-surface-variant' : 'text-white/70'}`}>
                          {step.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Progress Line */}
              <div className="mt-4 flex items-center justify-between text-[11px] text-on-primary-container font-semibold">
                <span>Passo {currentStep} de 4</span>
                <span>{validation.progressPercent}% Concluído</span>
              </div>
              <div className="w-full bg-black/20 h-2 rounded-full overflow-hidden mt-1.5">
                <div
                  className="bg-secondary-container h-full transition-all duration-500 rounded-full"
                  style={{ width: `${validation.progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Form Content Area with Step Transitions */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              
              {/* ========================================================================= */}
              {/* PASSO 1: CURSO, POLO & TURNO */}
              {/* ========================================================================= */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: stepDirection === 'next' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: stepDirection === 'next' ? -20 : 20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-8"
                >
                  <div className="border-b border-outline-variant/60 pb-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-secondary uppercase tracking-wider mb-1">
                      <span className="material-symbols-outlined text-[16px]">school</span>
                      <span>Passo 1 de 4</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-primary">
                      Escolha o Curso, Polo e Turno Pretendido
                    </h2>
                    <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                      Selecione a área formativa desejada e a unidade mais próxima de si em Luanda.
                    </p>
                  </div>

                  {/* 1. Course Selection with Categories & Search */}
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <label className="block text-xs font-bold text-on-surface uppercase tracking-wider">
                        1. Selecionar Curso Profissional *
                      </label>
                      
                      {/* Course Search */}
                      <div className="relative w-full sm:w-64">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px]">
                          search
                        </span>
                        <input
                          type="text"
                          value={courseSearch}
                          onChange={e => setCourseSearch(e.target.value)}
                          placeholder="Filtrar por nome do curso..."
                          className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-outline-variant bg-surface text-xs text-on-surface placeholder:text-on-surface-variant/60 focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    {/* Category Filter Chips */}
                    <div className="flex overflow-x-auto hide-scroll gap-1.5 pb-1">
                      <button
                        type="button"
                        onClick={() => setCourseCategoryFilter('Todos')}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                          courseCategoryFilter === 'Todos'
                            ? 'bg-primary text-white shadow-xs'
                            : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-variant'
                        }`}
                      >
                        Todos ({courses.length})
                      </button>
                      {categories.map(cat => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setCourseCategoryFilter(cat.name)}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                            courseCategoryFilter === cat.name
                              ? 'bg-primary text-white shadow-xs'
                              : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-variant'
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>

                    {/* Course Selection Dropdown / Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-72 overflow-y-auto p-1 border border-outline-variant/60 rounded-2xl bg-surface-container-low/40">
                      {filteredCourses.length === 0 ? (
                        <div className="col-span-2 text-center py-8 text-on-surface-variant text-xs">
                          Nenhum curso encontrado com o termo "{courseSearch}".
                        </div>
                      ) : (
                        filteredCourses.map(c => {
                          const isSelected = formData.courseId === c.id;
                          return (
                            <div
                              key={c.id}
                              onClick={() => setFormData(prev => ({ ...prev, courseId: c.id }))}
                              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                                isSelected
                                  ? 'border-primary bg-white shadow-md ring-2 ring-primary/20'
                                  : 'border-outline-variant bg-surface hover:bg-white hover:border-primary/50'
                              }`}
                            >
                              <SafeImage
                                src={c.image}
                                alt={c.name}
                                category={c.category}
                                wrapperClassName="w-14 h-14 rounded-lg border border-outline-variant shrink-0"
                                className="w-full h-full object-cover"
                              />
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-[10px] font-black uppercase text-secondary tracking-wider">
                                    {c.category}
                                  </span>
                                  {isSelected && (
                                    <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[12px] shrink-0">
                                      <span className="material-symbols-outlined text-[14px]">check</span>
                                    </span>
                                  )}
                                </div>
                                <h3 className="font-bold text-xs text-primary truncate">{c.name}</h3>
                                <div className="flex items-center gap-2 text-[11px] text-on-surface-variant mt-0.5">
                                  <span>{c.duration}</span>
                                  <span>•</span>
                                  <span className="font-black text-on-surface">{formatKZ(c.price)}/mês</span>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* 2. Polo Selection */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-on-surface uppercase tracking-wider">
                      2. Selecionar Polo / Centro de Formação *
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {polos.map(p => {
                        const isSelected = formData.poloId === p.id;
                        return (
                          <div
                            key={p.id}
                            onClick={() => setFormData(prev => ({ ...prev, poloId: p.id }))}
                            className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                              isSelected
                                ? 'border-primary bg-primary-fixed/30 shadow-md ring-2 ring-primary/20'
                                : 'border-outline-variant bg-surface hover:bg-white hover:border-primary/40'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <span className="text-[10px] font-bold uppercase bg-surface-container-high px-2 py-0.5 rounded-md text-primary">
                                  {p.municipality}
                                </span>
                                <h3 className="font-extrabold text-sm text-primary mt-1">{p.name}</h3>
                              </div>
                              <span
                                className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 ${
                                  isSelected
                                    ? 'bg-primary text-white'
                                    : 'border border-outline-variant text-transparent'
                                }`}
                              >
                                <span className="material-symbols-outlined text-[14px]">check</span>
                              </span>
                            </div>

                            <p className="text-[11px] text-on-surface-variant mt-2 line-clamp-2">
                              {p.address}
                            </p>

                            <div className="mt-3 pt-2 border-t border-outline-variant/30 flex items-center gap-1.5 text-[11px] text-on-surface-variant">
                              <span className="material-symbols-outlined text-[14px] text-primary">call</span>
                              <span>{p.phone}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 3. Shift Selection */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-on-surface uppercase tracking-wider">
                      3. Escolher Turno / Horário de Aulas *
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {shiftsList.map(shiftItem => {
                        const isSelected = formData.shift === shiftItem.id;
                        return (
                          <div
                            key={shiftItem.id}
                            onClick={() => setFormData(prev => ({ ...prev, shift: shiftItem.id as any }))}
                            className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                              isSelected
                                ? 'border-primary bg-white shadow-md ring-2 ring-primary/20'
                                : 'border-outline-variant bg-surface hover:bg-white hover:border-primary/40'
                            }`}
                          >
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                isSelected
                                  ? 'bg-primary text-white shadow-xs'
                                  : 'bg-surface-container-high text-primary'
                              }`}
                            >
                              <span className="material-symbols-outlined text-[20px]">
                                {shiftItem.icon}
                              </span>
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-bold text-xs sm:text-sm text-primary">
                                  {shiftItem.label}
                                </h4>
                                <span className="text-[11px] font-black text-secondary-container bg-primary px-2 py-0.5 rounded-md">
                                  {shiftItem.hours}
                                </span>
                              </div>
                              <p className="text-[11px] text-on-surface-variant mt-0.5 truncate">
                                {shiftItem.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Course Highlight Info Summary Box */}
                  {selectedCourse && (
                    <div className="bg-surface-container p-4 sm:p-5 rounded-2xl border border-outline-variant/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <SafeImage
                          src={selectedCourse.image}
                          alt={selectedCourse.name}
                          category={selectedCourse.category}
                          wrapperClassName="w-14 h-14 rounded-xl border border-outline-variant shadow-xs shrink-0"
                          className="w-full h-full object-cover"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                              {selectedCourse.category}
                            </span>
                            <span className="text-xs text-on-surface-variant">Duração: {selectedCourse.duration}</span>
                          </div>
                          <h4 className="font-extrabold text-sm sm:text-base text-primary mt-1">
                            {selectedCourse.name}
                          </h4>
                          <p className="text-[11px] text-on-surface-variant">
                            Unidade: <strong>{selectedPolo?.name}</strong> • Horário: <strong>{formData.shift.split('(')[0]}</strong>
                          </p>
                        </div>
                      </div>

                      <div className="text-left sm:text-right shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-outline-variant/40 w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end">
                        <span className="text-[11px] text-on-surface-variant font-medium">Propina Mensal</span>
                        <span className="text-lg font-black text-primary">{formatKZ(selectedCourse.price)}</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* ========================================================================= */}
              {/* PASSO 2: DADOS PESSOAIS DO FORMANDO */}
              {/* ========================================================================= */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: stepDirection === 'next' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: stepDirection === 'next' ? -20 : 20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="border-b border-outline-variant/60 pb-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-secondary uppercase tracking-wider mb-1">
                      <span className="material-symbols-outlined text-[16px]">person</span>
                      <span>Passo 2 de 4</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-primary">
                      Identificação Oficial do Formando
                    </h2>
                    <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                      Insira os dados pessoais exatamente conforme constam no seu Bilhete de Identidade.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {/* Full Name */}
                    <div className="sm:col-span-2">
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-bold text-on-surface">
                          Nome Completo do Aluno *
                        </label>
                        {formData.fullName && (
                          <span className={`text-[11px] font-bold flex items-center gap-1 ${
                            validation.isNameValid ? 'text-emerald-700' : 'text-rose-600'
                          }`}>
                            <span className="material-symbols-outlined text-[14px]">
                              {validation.isNameValid ? 'check_circle' : 'error'}
                            </span>
                            {validation.isNameValid ? 'Nome Válido' : 'Incompleto'}
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onBlur={() => handleBlur('fullName')}
                          onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="Ex: Manuel António da Silva Domingos"
                          className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm text-on-surface transition-all ${
                            touched.fullName && !validation.isNameValid
                              ? 'border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-500 focus:border-rose-500'
                              : validation.isNameValid
                              ? 'border-emerald-500 bg-emerald-50/15 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
                              : 'border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:border-primary'
                          }`}
                        />
                        {validation.isNameValid && (
                          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600 text-[18px]">
                            check
                          </span>
                        )}
                      </div>
                      {touched.fullName && !validation.isNameValid && (
                        <p className="text-[11px] text-rose-600 font-medium mt-1 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[13px]">info</span>
                          {validation.nameMessage}
                        </p>
                      )}
                    </div>

                    {/* BI Number */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-bold text-on-surface">
                          Número do Bilhete de Identidade (B.I.) *
                        </label>
                        {formData.biNumber && (
                          <span className={`text-[11px] font-bold flex items-center gap-1 ${
                            validation.isBiValid ? 'text-emerald-700' : 'text-rose-600'
                          }`}>
                            <span className="material-symbols-outlined text-[14px]">
                              {validation.isBiValid ? 'check_circle' : 'error'}
                            </span>
                            {validation.isBiValid ? 'B.I. Válido' : 'Formato incorreto'}
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          maxLength={14}
                          value={formData.biNumber}
                          onBlur={() => handleBlur('biNumber')}
                          onChange={e => setFormData({ ...formData, biNumber: e.target.value.toUpperCase() })}
                          placeholder="Ex: 007294821LA042"
                          className={`w-full px-4 py-3 rounded-xl border font-mono text-xs sm:text-sm text-on-surface uppercase tracking-wider transition-all ${
                            touched.biNumber && !validation.isBiValid
                              ? 'border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-500 focus:border-rose-500'
                              : validation.isBiValid
                              ? 'border-emerald-500 bg-emerald-50/15 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
                              : 'border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:border-primary'
                          }`}
                        />
                        {validation.isBiValid && (
                          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600 text-[18px]">
                            verified
                          </span>
                        )}
                      </div>
                      {touched.biNumber && !validation.isBiValid && (
                        <p className="text-[11px] text-rose-600 font-medium mt-1 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[13px]">info</span>
                          {validation.biMessage}
                        </p>
                      )}
                      <p className="text-[10px] text-on-surface-variant mt-1">
                        Formato angolano: 9 dígitos + 2 letras + 3 dígitos (total 14 caracteres)
                      </p>
                    </div>

                    {/* Birth Date */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-bold text-on-surface">
                          Data de Nascimento *
                        </label>
                        {formData.birthDate && validation.isBirthDateValid && (
                          <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">check_circle</span>
                            {validation.age} anos
                          </span>
                        )}
                      </div>
                      <input
                        type="date"
                        required
                        value={formData.birthDate}
                        onBlur={() => handleBlur('birthDate')}
                        onChange={e => setFormData({ ...formData, birthDate: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm text-on-surface transition-all ${
                          touched.birthDate && !validation.isBirthDateValid
                            ? 'border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-500 focus:border-rose-500'
                            : validation.isBirthDateValid
                            ? 'border-emerald-500 bg-emerald-50/15 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
                            : 'border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:border-primary'
                        }`}
                      />
                      {touched.birthDate && !validation.isBirthDateValid && (
                        <p className="text-[11px] text-rose-600 font-medium mt-1 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[13px]">info</span>
                          {validation.birthDateMessage}
                        </p>
                      )}
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block text-xs font-bold text-on-surface mb-1">
                        Género *
                      </label>
                      <select
                        value={formData.gender}
                        onChange={e => setFormData({ ...formData, gender: e.target.value as any })}
                        className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface text-xs sm:text-sm text-on-surface focus:ring-2 focus:ring-primary focus:border-primary cursor-pointer"
                      >
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
                        <option value="Outro">Outro</option>
                      </select>
                    </div>

                    {/* Academic Level */}
                    <div>
                      <label className="block text-xs font-bold text-on-surface mb-1">
                        Habilitações Literárias / Nível Académico *
                      </label>
                      <select
                        value={formData.academicLevel}
                        onChange={e => setFormData({ ...formData, academicLevel: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface text-xs sm:text-sm text-on-surface focus:ring-2 focus:ring-primary focus:border-primary cursor-pointer"
                      >
                        <option value="Ensino Primário">Ensino Primário</option>
                        <option value="9ª Classe (I Ciclo)">9ª Classe (I Ciclo)</option>
                        <option value="Ensino Médio Concluído">Ensino Médio Concluído (12ª / 13ª)</option>
                        <option value="Frequência Universitária">Frequência Universitária</option>
                        <option value="Licenciatura / Superior">Licenciatura / Superior</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ========================================================================= */}
              {/* PASSO 3: CONTACTOS & MORADA */}
              {/* ========================================================================= */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: stepDirection === 'next' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: stepDirection === 'next' ? -20 : 20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="border-b border-outline-variant/60 pb-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-secondary uppercase tracking-wider mb-1">
                      <span className="material-symbols-outlined text-[16px]">call</span>
                      <span>Passo 3 de 4</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-primary">
                      Contactos e Morada de Residência
                    </h2>
                    <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                      A secretaria pedagógica enviará por SMS/WhatsApp o comprovativo e detalhes de abertura da turma.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {/* Phone / WhatsApp */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-bold text-on-surface">
                          Telefone / WhatsApp (Angola) *
                        </label>
                        {formData.phone && (
                          <span className={`text-[11px] font-bold flex items-center gap-1 ${
                            validation.isPhoneValid ? 'text-emerald-700' : 'text-rose-600'
                          }`}>
                            <span className="material-symbols-outlined text-[14px]">
                              {validation.isPhoneValid ? 'check_circle' : 'error'}
                            </span>
                            {validation.isPhoneValid ? 'Válido' : '9 dígitos'}
                          </span>
                        )}
                      </div>
                      <div className="flex">
                        <span className="bg-surface-container-high px-3.5 py-3 rounded-l-xl border border-r-0 border-outline-variant text-xs font-bold text-on-surface-variant flex items-center">
                          +244
                        </span>
                        <input
                          type="tel"
                          required
                          maxLength={12}
                          value={formData.phone}
                          onBlur={() => handleBlur('phone')}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="923 000 000"
                          className={`w-full px-4 py-3 rounded-r-xl border text-xs sm:text-sm text-on-surface transition-all ${
                            touched.phone && !validation.isPhoneValid
                              ? 'border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-500 focus:border-rose-500'
                              : validation.isPhoneValid
                              ? 'border-emerald-500 bg-emerald-50/15 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
                              : 'border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:border-primary'
                          }`}
                        />
                      </div>
                      {touched.phone && !validation.isPhoneValid && (
                        <p className="text-[11px] text-rose-600 font-medium mt-1 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[13px]">info</span>
                          {validation.phoneMessage}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-bold text-on-surface">
                          Endereço de E-mail (Opcional)
                        </label>
                        {formData.email && (
                          <span className={`text-[11px] font-bold flex items-center gap-1 ${
                            validation.isEmailValid ? 'text-emerald-700' : 'text-rose-600'
                          }`}>
                            <span className="material-symbols-outlined text-[14px]">
                              {validation.isEmailValid ? 'check_circle' : 'error'}
                            </span>
                            {validation.isEmailValid ? 'E-mail válido' : 'Formato incorreto'}
                          </span>
                        )}
                      </div>
                      <input
                        type="email"
                        value={formData.email}
                        onBlur={() => handleBlur('email')}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="seu.email@exemplo.com"
                        className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm text-on-surface transition-all ${
                          touched.email && !validation.isEmailValid
                            ? 'border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-500 focus:border-rose-500'
                            : formData.email && validation.isEmailValid
                            ? 'border-emerald-500 bg-emerald-50/15 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
                            : 'border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:border-primary'
                        }`}
                      />
                      {touched.email && !validation.isEmailValid && (
                        <p className="text-[11px] text-rose-600 font-medium mt-1 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[13px]">info</span>
                          {validation.emailMessage}
                        </p>
                      )}
                    </div>

                    {/* Address */}
                    <div className="sm:col-span-2">
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-bold text-on-surface">
                          Morada / Município e Bairro de Residência em Luanda *
                        </label>
                        {formData.address && (
                          <span className={`text-[11px] font-bold flex items-center gap-1 ${
                            validation.isAddressValid ? 'text-emerald-700' : 'text-rose-600'
                          }`}>
                            <span className="material-symbols-outlined text-[14px]">
                              {validation.isAddressValid ? 'check_circle' : 'error'}
                            </span>
                            {validation.isAddressValid ? 'Morada Válida' : 'Muito curta'}
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onBlur={() => handleBlur('address')}
                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                        placeholder="Ex: Viana, Bairro Capalanga, Rua Principal nº 24"
                        className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm text-on-surface transition-all ${
                          touched.address && !validation.isAddressValid
                            ? 'border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-500 focus:border-rose-500'
                            : validation.isAddressValid
                            ? 'border-emerald-500 bg-emerald-50/15 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
                            : 'border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:border-primary'
                        }`}
                      />
                      {touched.address && !validation.isAddressValid && (
                        <p className="text-[11px] text-rose-600 font-medium mt-1 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[13px]">info</span>
                          {validation.addressMessage}
                        </p>
                      )}
                    </div>

                    {/* Notes / Special Requests */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-on-surface mb-1">
                        Observações ou Necessidades Especiais (Opcional)
                      </label>
                      <textarea
                        rows={2}
                        value={formData.notes}
                        onChange={e => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Alguma informação adicional que queira partilhar com a secretaria?"
                        className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs sm:text-sm text-on-surface focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ========================================================================= */}
              {/* PASSO 4: DOCUMENTOS, REVISÃO FINAL & ENVIO */}
              {/* ========================================================================= */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: stepDirection === 'next' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: stepDirection === 'next' ? -20 : 20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="border-b border-outline-variant/60 pb-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-secondary uppercase tracking-wider mb-1">
                      <span className="material-symbols-outlined text-[16px]">verified_user</span>
                      <span>Passo 4 de 4</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-primary">
                      Anexo de Documentos e Revisão da Ficha
                    </h2>
                    <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                      Revise o resumo da sua inscrição e anexe cópia do B.I. ou certificado escolar (opcional agora, pode apresentar no polo).
                    </p>
                  </div>

                  {/* Review Summary Sheet Card */}
                  <div className="bg-surface-container-lowest border-2 border-primary/20 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-outline-variant/40 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[20px]">badge</span>
                        <h3 className="font-extrabold text-sm sm:text-base text-primary uppercase tracking-wide">
                          Resumo da Ficha de Candidatura
                        </h3>
                      </div>
                      <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-full">
                        Pronto para envio
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                      {/* Personal Details */}
                      <div className="space-y-1 bg-surface-container-low p-3 rounded-xl">
                        <p className="text-[10px] uppercase font-bold text-on-surface-variant">Formando</p>
                        <p className="font-extrabold text-on-surface text-sm">{formData.fullName || 'Não informado'}</p>
                        <p className="text-on-surface-variant font-mono text-[11px]">BI: {formData.biNumber || '—'}</p>
                        <p className="text-on-surface-variant text-[11px]">
                          {validation.age ? `${validation.age} anos` : '—'} • {formData.academicLevel}
                        </p>
                      </div>

                      {/* Course Details */}
                      <div className="space-y-1 bg-surface-container-low p-3 rounded-xl">
                        <p className="text-[10px] uppercase font-bold text-on-surface-variant">Curso Escolhido</p>
                        <p className="font-extrabold text-primary text-sm">{selectedCourse?.name}</p>
                        <p className="text-on-surface-variant text-[11px]">
                          Unidade: <strong>{selectedPolo?.name}</strong>
                        </p>
                        <p className="text-on-surface-variant text-[11px]">
                          Turno: <strong>{(formData.shift || '').split('(')[0]}</strong>
                        </p>
                      </div>

                      {/* Financial & Schedule */}
                      <div className="space-y-1 bg-surface-container-low p-3 rounded-xl">
                        <p className="text-[10px] uppercase font-bold text-on-surface-variant">Condições Financeiras</p>
                        <div className="flex items-baseline justify-between">
                          <span className="text-on-surface-variant">Propina Mensal:</span>
                          <span className="font-black text-primary text-sm">{formatKZ(selectedCourse?.price || 0)}</span>
                        </div>
                        <div className="flex items-baseline justify-between text-[11px]">
                          <span className="text-on-surface-variant">Taxa Inscrição:</span>
                          <span className="font-bold text-secondary">{formatKZ(selectedCourse?.registrationFee || siteSettings.defaultRegistrationFee)}</span>
                        </div>
                        <p className="text-[10px] text-emerald-700 font-bold pt-1">
                          ✓ Homologado pelo INEFOP
                        </p>
                      </div>

                      {/* Contact Details */}
                      <div className="sm:col-span-2 md:col-span-3 bg-surface-container-low p-3 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <p className="text-[10px] uppercase font-bold text-on-surface-variant">Contacto Principal & Morada</p>
                          <p className="font-bold text-on-surface text-xs">
                            {formData.phone ? `+244 ${formData.phone}` : '—'} 
                            {formData.email && <span className="text-on-surface-variant font-normal"> • {formData.email}</span>}
                          </p>
                          <p className="text-[11px] text-on-surface-variant truncate">{formData.address || '—'}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => goToStep(1)}
                            className="text-primary hover:underline text-[11px] font-bold cursor-pointer"
                          >
                            Editar Curso
                          </button>
                          <span>•</span>
                          <button
                            type="button"
                            onClick={() => goToStep(2)}
                            className="text-primary hover:underline text-[11px] font-bold cursor-pointer"
                          >
                            Editar Dados
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Document Upload Area */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-on-surface uppercase tracking-wider">
                        Documentos de Suporte (Opcional)
                      </label>
                      <span className="text-[11px] text-on-surface-variant">
                        {attachedDocs.length} de 4 ficheiros anexados
                      </span>
                    </div>

                    <DocumentUpload
                      files={attachedDocs}
                      onFilesChange={setAttachedDocs}
                      maxFiles={4}
                      maxSizeMB={5}
                      label="Carregar Documentos (PDF, JPG, PNG)"
                      description="Anexe cópia do BI, certificado escolar ou fotos. Pode também apresentar fisicamente na secretaria."
                    />
                  </div>

                  {/* Terms and Consent Checkbox */}
                  <div className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/60">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        required
                        checked={formData.termsAccepted}
                        onChange={e => setFormData({ ...formData, termsAccepted: e.target.checked })}
                        className="mt-1 text-primary rounded focus:ring-primary cursor-pointer w-4 h-4"
                      />
                      <span className="text-xs text-on-surface-variant leading-relaxed">
                        Declaro que todas as informações prestadas nesta ficha são verdadeiras e autorizo a Técnogest Angola a contactar-me para efeitos de confirmação de inscrição, pormenores técnicos e envio de informações académicas pelo WhatsApp/SMS.
                      </span>
                    </label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Wizard Navigation Action Bar */}
            <div className="pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-outline-variant/60">
              {/* Back button */}
              <div className="w-full sm:w-auto">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="w-full sm:w-auto bg-surface-container-high hover:bg-surface-variant text-on-surface font-bold text-xs sm:text-sm py-3 px-5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    <span>Voltar ao Passo Anterior</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setCurrentView('courses')}
                    className="w-full sm:w-auto text-on-surface-variant hover:text-primary font-bold text-xs py-3 px-3 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                    <span>Ver Todos os Cursos</span>
                  </button>
                )}
              </div>

              {/* Forward / Submit Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-full sm:w-auto bg-primary hover:bg-primary-container text-on-primary font-bold text-sm py-3.5 px-8 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Continuar para Passo {currentStep + 1}</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-primary hover:bg-primary-container text-on-primary font-bold text-sm py-3.5 px-8 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>A processar inscrição...</span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
                        <span>Confirmar e Enviar Inscrição</span>
                      </>
                    )}
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setIsChatModalOpen(true)}
                  className="w-full sm:w-auto bg-[#25D366] hover:bg-[#1EBE5A] text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-xs"
                >
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                  <span>Apoio WhatsApp</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
