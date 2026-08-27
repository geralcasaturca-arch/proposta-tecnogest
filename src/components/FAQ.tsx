import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';

interface FAQItem {
  id: string;
  category: 'inscricoes' | 'duracao' | 'certificacao' | 'plano-portugal' | 'pagamentos';
  categoryLabel: string;
  question: string;
  answer: string;
  badge?: string;
}

export const FAQ: React.FC = () => {
  const { siteSettings } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [openItemIds, setOpenItemIds] = useState<string[]>(['faq-1', 'faq-4', 'faq-7']);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const faqData: FAQItem[] = [
    // Inscrições
    {
      id: 'faq-1',
      category: 'inscricoes',
      categoryLabel: 'Inscrições',
      question: 'Como funciona o processo de inscrição e o que está incluído na formação?',
      answer: 'Para se inscrever em qualquer curso da Técnogest (Polo Valódia, Viana ou Boavista), deve apresentar: Cópia do Bilhete de Identidade (BI), 2 fotografias tipo passe e o certificado de habilitações literárias. A sua inscrição inclui: Manual Técnico Oficial, Passe de Formando, Carta de Recomendação, Carta de Pedido de Estágio e Certificado Homologado pelo INEFOP.',
      badge: 'Material Incluído'
    },
    {
      id: 'faq-2',
      category: 'inscricoes',
      categoryLabel: 'Inscrições',
      question: 'O que é necessário para o curso de Rigger Sinaleiro ou Controlo de Qualidade?',
      answer: 'Para Rigger Sinaleiro e Controlo de Qualidade (CQ), exigimos idade mínima de 18 anos e 9ª classe concluída. As turmas têm início imediato com aulas teóricas em sala climatizada e aulas práticas no pátio de manobras com gruas reais e equipamentos de elevação de carga.',
      badge: 'Início Imediato'
    },
    {
      id: 'faq-3',
      category: 'inscricoes',
      categoryLabel: 'Inscrições',
      question: 'A Técnogest disponibiliza Bolsas de Estudo para os cursos industriais?',
      answer: 'Sim! Dispomos de programas de Bolsas de Estudo parciais para cursos selecionados como Rigger Sinaleiro, HST e Soldadura. Consulte a nossa secretaria no Polo Valódia ou através do nosso WhatsApp oficial para verificar os critérios de elegibilidade.',
      badge: 'Bolsas de Estudo'
    },

    // Plano Portugal
    {
      id: 'faq-4',
      category: 'plano-portugal',
      categoryLabel: 'Plano Portugal',
      question: 'O que é o Plano Portugal e como funciona a contratação?',
      answer: 'O Plano Portugal da Técnogest é um programa integrado de mobilidade profissional. O formando realiza uma formação técnica especializada (Empilhadeira, Soldadura, Grua Torre ou Grua Móvel) e recebe assessoria jurídica/documental completa para a obtenção do Visto de Trabalho, com direito a encaminhamento e validação de Contrato de Trabalho em Portugal.',
      badge: 'Visto + Contrato'
    },
    {
      id: 'faq-5',
      category: 'plano-portugal',
      categoryLabel: 'Plano Portugal',
      question: 'Quais os requisitos obrigatórios para aderir ao Plano Portugal?',
      answer: 'É necessário ter idade igual ou superior a 18 anos, Passaporte válido (ou em emissão), Registo Criminal sem antecedentes, Bilhete de Identidade e disponibilidade para residir e trabalhar legalmente em Portugal.',
      badge: 'Requisitos Visto'
    },

    // Duração & Horários
    {
      id: 'faq-6',
      category: 'duracao',
      categoryLabel: 'Duração & Horários',
      question: `Qual é a duração média das formações na Técnogest?`,
      answer: 'A duração varia entre 2 a 6 semanas para a maioria dos cursos intensivos (ex: Controlo de Qualidade dura 2 semanas; HST dura 30 dias; Rigger dura 4 semanas). Os horários de atendimento e secretarias funcionam de Segunda a Sexta das 08h00 às 16h00 com turmas matinais, vespertinas e pós-laborais.',
      badge: '2 a 6 Semanas'
    },

    // Certificação
    {
      id: 'faq-7',
      category: 'certificacao',
      categoryLabel: 'Certificação INEFOP',
      question: 'Os certificados da Técnogest são homologados pelo INEFOP / MAPTSS?',
      answer: `Sim, 100%. A Técnogest é uma instituição devidamente homologada pelo INEFOP / MAPTSS. Os nossos certificados têm validade legal plena em empresas públicas e privadas em todo o território nacional, refinarias, terminais portuários e operadoras onshore/offshore.`,
      badge: 'Homologação Oficial'
    },
    {
      id: 'faq-8',
      category: 'certificacao',
      categoryLabel: 'Certificação INEFOP',
      question: 'Qual é o papel das parcerias com a INÇATEC e a TÉCNOFORM?',
      answer: 'A Técnogest atua em estreita colaboração técnica com o Grupo INÇATEC e a TÉCNOFORM, garantindo padrões operacionais atualizados com as exigências da indústria petrolífera e marítima internacional.',
      badge: 'Parceria Industrial'
    },

    // Pagamentos
    {
      id: 'faq-9',
      category: 'pagamentos',
      categoryLabel: 'Propinas & Pagamentos',
      question: 'Quais são as formas de pagamento disponíveis?',
      answer: 'Aceitamos pagamentos por transferência bancária, Multicaixa Express, depósito bancário ou TPA diretamente nas secretarias dos polos. A taxa de inscrição padrão é de 2.500 Kz.',
      badge: 'Multicaixa Express'
    }
  ];

  const toggleItem = (id: string) => {
    setOpenItemIds(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const categories = [
    { id: 'todos', label: 'Todas as Perguntas', icon: 'help' },
    { id: 'inscricoes', label: 'Inscrições & Bolsas', icon: 'how_to_reg' },
    { id: 'plano-portugal', label: 'Plano Portugal', icon: 'flight_takeoff' },
    { id: 'duracao', label: 'Duração & Horários', icon: 'schedule' },
    { id: 'certificacao', label: 'Certificação INEFOP', icon: 'verified' },
    { id: 'pagamentos', label: 'Propinas & Pagamentos', icon: 'payments' }
  ];

  const filteredFaqs = faqData.filter(faq => {
    const matchesCategory = activeCategory === 'todos' || faq.category === activeCategory;
    const q = (searchQuery || '').toLowerCase().trim();
    const matchesSearch =
      !q ||
      (faq.question || '').toLowerCase().includes(q) ||
      (faq.answer || '').toLowerCase().includes(q) ||
      (faq.badge ? faq.badge.toLowerCase().includes(q) : false);

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="w-full py-16 sm:py-20 bg-surface-container-low/50 border-t border-outline-variant/30 px-4 md:px-8">
      <div className="max-w-[1100px] mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#0A2558] text-[#00D2FF] px-3.5 py-1.5 rounded-full text-xs font-bold shadow-2xs border border-[#00D2FF]/30">
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              quiz
            </span>
            <span>Perguntas Frequentes & Esclarecimentos</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight leading-tight">
            Tudo o que precisa de saber sobre a <span className="text-secondary">{siteSettings.brandShortName || 'Técnogest'}</span>
          </h2>

          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
            Informações detalhadas sobre cursos industriais, Rigger Sinaleiro, certificação homologada pelo INEFOP, Plano Portugal e métodos de pagamento.
          </p>
        </div>

        {/* Search Bar & Category Filter Pills */}
        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar dúvida (ex: rigger, plano portugal, inefop, valódia)..."
              className="w-full pl-11 pr-10 py-3 bg-surface rounded-2xl border border-outline-variant text-xs sm:text-sm text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow-2xs transition-all"
            />
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
              search
            </span>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface p-1 text-xs"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-primary text-on-primary border-primary shadow-xs'
                      : 'bg-surface text-on-surface-variant border-outline-variant/60 hover:bg-surface-container-high'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openItemIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className="bg-surface rounded-2xl border border-outline-variant/50 overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 hover:bg-surface-container-low transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <span className="material-symbols-outlined text-primary text-[20px] mt-0.5 shrink-0">
                        help_outline
                      </span>
                      <div className="space-y-1 min-w-0">
                        <span className="font-bold text-sm sm:text-base text-primary block leading-snug">
                          {faq.question}
                        </span>
                        {faq.badge && (
                          <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider bg-secondary/10 text-secondary px-2 py-0.5 rounded-md">
                            {faq.badge}
                          </span>
                        )}
                      </div>
                    </div>
                    <span
                      className={`material-symbols-outlined text-primary text-[24px] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-secondary' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-outline-variant/20">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 text-on-surface-variant text-sm">
              Nenhuma pergunta encontrada com o termo "{searchQuery}".
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
