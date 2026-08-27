import { Course } from '../types';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'rigger-sinaleiro',
    name: 'Rigger Sinaleiro (Manobras de Cargas)',
    slug: 'rigger-sinaleiro',
    category: 'Formações Industriais & Manobras',
    price: 35000,
    registrationFee: 2500,
    duration: '4 Semanas',
    hoursCount: 90,
    status: 'abertas',
    isActive: true,
    modality: 'Presencial (Teoria e Prática)',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Capacitação prática em amarração, sinalização padrão internacional e movimentação de cargas suspensas.',
    fullDescription: 'Formação profissional especializada e homologada pelo INEFOP na área de movimentação e amarração de cargas industriais. Prepara o formando para atuar com total segurança como Rigger Sinaleiro em indústrias, estaleiros navais, terminais portuários e plataformas onshore/offshore.',
    syllabus: [
      'Introdução ao Rigging e Legislação de Segurança Aplicável',
      'Classificação e Inspeção de Acessórios de Carga (Cintas, Manilhas, Cabos de Aço)',
      'Tabelas de Carga, Ângulos de Içamento e Centro de Gravidade',
      'Código Internacional de Sinais Gestuais e Comunicação via Rádio',
      'Planeamento de Içamento (Rigging Plan Simplificado)',
      'Normas de Higiene e Segurança no Trabalho (HST) no Pátio de Manobras',
      'Aulas Práticas no Pátio com Cargas Reais e Gruas',
      'Avaliação Técnica e Simulação de Emergências'
    ],
    requirements: [
      'Idade mínima de 18 anos',
      'Habilitações literárias: 9ª Classe concluída (mínimo)',
      'Cópia do Bilhete de Identidade (BI)',
      '2 Fotografias tipo passe',
      'Aptidão física para trabalho operacional'
    ],
    careerOutcomes: [
      'Rigger Sinaleiro em Empresas Petrolíferas e Mineradoras',
      'Sinaleiro de Gruas em Obras de Engenharia Civil',
      'Operador de Amarração em Terminais Portuários e Logísticos',
      'Assistente de Operações Onshore / Offshore'
    ],
    availablePolos: ['Polo Valódia (Sede)', 'Polo Industrial Viana', 'Polo Portuário Boavista'],
    nextClassDate: 'Inscrições Abertas (Turma Imediata)',
    featured: true
  },
  {
    id: 'controle-qualidade',
    name: 'Controlo de Qualidade (CQ Industrial)',
    slug: 'controle-qualidade',
    category: 'Segurança & Qualidade (QHSE)',
    price: 30000,
    registrationFee: 2500,
    duration: '2 Semanas',
    hoursCount: 60,
    status: 'abertas',
    isActive: true,
    modality: 'Presencial (Teoria e Prática)',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Domine técnicas de inspeção, auditoria de processos e normas de qualidade para a indústria e setor petrolífero.',
    fullDescription: 'Curso intensivo de Controlo de Qualidade (CQ) com foco em inspeção técnica de processos industriais, metrologia, ensaios não destrutivos (noções), elaboração de relatórios de não-conformidade e certificação homologada pelo INEFOP.',
    syllabus: [
      'Fundamentos da Gestão da Qualidade Total e Normas ISO 9001',
      'Instrumentos de Medição e Metrologia Dimensional (Paquímetro, Micrómetro)',
      'Inspeção Visual e Ensaio de Materiais Industriais',
      'Técnicas de Auditoria de Processos Fabris e de Montagem',
      'Gestão de Não-Conformidades (RNC) e Ações Corretivas',
      'Controlo de Qualidade em Soldadura e Tubagem',
      'Práticas de Amostragem Estatística e Relatórios Técnicos'
    ],
    requirements: [
      '9ª Classe concluída ou Ensino Médio',
      'Cópia do BI',
      '2 Fotografias tipo passe',
      'Interesse por processos técnicos industriais'
    ],
    careerOutcomes: [
      'Inspetor de Controlo de Qualidade Júnior',
      'Auditor de Qualidade em Linhas de Produção',
      'Assistente de Gestão de Qualidade em Empresas Industriais',
      'Técnico de Verificação e Homologação de Peças'
    ],
    availablePolos: ['Polo Valódia (Sede)', 'Polo Industrial Viana'],
    nextClassDate: 'Próxima Segunda-feira',
    featured: true
  },
  {
    id: 'higiene-seguranca-trabalho',
    name: 'Higiene e Segurança no Trabalho (HST) - Níveis I, II e III',
    slug: 'higiene-seguranca-trabalho',
    category: 'Segurança & Qualidade (QHSE)',
    price: 32000,
    registrationFee: 2500,
    duration: '30 Dias',
    hoursCount: 80,
    status: 'abertas',
    isActive: true,
    modality: 'Presencial',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Formação completa em prevenção de riscos laborais, auditoria de segurança e normas ambientais industriais.',
    fullDescription: 'Capacite-se como Técnico de Higiene e Segurança no Trabalho com certificação INEFOP. Aborda desde os conceitos básicos de prevenção até a elaboração de planos de segurança, análise preliminar de risco (APR) e procedimentos de emergência para ambientes de alto risco.',
    syllabus: [
      'Legislação Angolana de Segurança no Trabalho e Normas Internacionais (ISO 45001)',
      'Identificação de Perigos e Avaliação de Riscos (Físicos, Químicos, Biológicos e Ergonómicos)',
      'Equipamentos de Proteção Individual (EPI) e Coletiva (EPC)',
      'Permissão de Trabalho Seguro (PTW - Permit to Work)',
      'Investigação e Relatório de Acidentes de Trabalho',
      'Prevenção e Combate a Incêndios e Primeiros Socorros no Local',
      'Cultura de Segurança em Operações Onshore e Offshore'
    ],
    requirements: [
      'Idade igual ou superior a 18 anos',
      'Ensino Médio concluído ou em curso',
      'Cópia do BI e 2 fotografias tipo passe'
    ],
    careerOutcomes: [
      'Técnico de Segurança no Trabalho (HST)',
      'Fiscal de Segurança em Canteiros de Obra e Indústrias',
      'Oficial de Segurança em Terminais e Fábricas',
      'Consultor Júnior de Prevenção de Riscos Ocupacionais'
    ],
    availablePolos: ['Polo Valódia (Sede)', 'Polo Industrial Viana', 'Polo Portuário Boavista'],
    nextClassDate: 'Turmas Matinais e Noturnas',
    featured: true
  },
  {
    id: 'plano-portugal-completo',
    name: 'Plano Portugal (Visto + Curso Técnico + Contrato)',
    slug: 'plano-portugal-completo',
    category: 'Plano Portugal',
    price: 95000,
    registrationFee: 5000,
    duration: '2 Meses',
    hoursCount: 140,
    status: 'abertas',
    isActive: true,
    modality: 'Presencial + Assessoria Internacional',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Programa exclusivo: Formação em Empilhadeira, Soldadura ou Grua + Assessoria de Visto e Contrato de Trabalho.',
    fullDescription: 'O Plano Portugal da Técnogest é um programa estruturado de mobilidade profissional internacional. O formando conclui a formação técnica especializada numa das profissões com maior procura em Portugal (Empilhadeira, Soldadura, Grua Torre ou Grua Móvel) e recebe acompanhamento documental completo para o visto de trabalho com encaminhamento para contrato de trabalho legal.',
    syllabus: [
      'Formação Prática Intensiva na Especialidade Escolhida (Empilhadeira / Soldadura / Grua)',
      'Normas Europeias de Segurança e Operação Industrial',
      'Comportamento Profissional e Integração no Mercado Europeu',
      'Preparação do Dossiê Documental para Visto de Trabalho',
      'Simulação de Entrevistas de Emprego com Empresas Parceiras em Portugal',
      'Acompanhamento e Validação de Contrato de Trabalho',
      'Emissão de Certificado Técnico Internacional Homologado'
    ],
    requirements: [
      'Idade mínima de 18 anos',
      'Passaporte Válido (ou em emissão)',
      'Registo Criminal Limpo',
      'Bilhete de Identidade e Habilitações Literárias',
      'Disponibilidade para residir em Portugal'
    ],
    careerOutcomes: [
      'Operador de Empilhadeira em Centros Logísticos em Portugal',
      'Soldador Industrial Certificado em Estaleiros e Obras Europeias',
      'Operador de Gruas na Construção Civil em Portugal',
      'Trabalhador Qualificado com Visto de Residência Legal'
    ],
    availablePolos: ['Polo Valódia (Sede - Gabinete Internacional)'],
    nextClassDate: 'Vagas Limitadas por Convocatória',
    featured: true
  },
  {
    id: 'operador-empilhadeira',
    name: 'Operador de Empilhadeira (Empilhador Industrial)',
    slug: 'operador-empilhadeira',
    category: 'Formações Industriais & Manobras',
    price: 32000,
    registrationFee: 2500,
    duration: '3 Semanas',
    hoursCount: 70,
    status: 'abertas',
    isActive: true,
    modality: 'Presencial (Teoria e Prática em Máquina)',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Condução, manobra segura, empilhamento e manutenção preventiva de empilhadores industriais.',
    fullDescription: 'Curso 100% focado na prática operacional com empilhadores a combustão e elétricos. Aprenda técnicas de condução defensiva, centro de gravidade, empilhamento em altura, normas de segurança em armazéns e manutenção diária com certificado INEFOP.',
    syllabus: [
      'Componentes e Funcionamento Mecânico do Empilhador',
      'Princípio de Equilíbrio, Triângulo de Estabilidade e Centro de Carga',
      'Checklist Pré-Operacional e Manutenção Básica',
      'Técnicas de Condução Segura e Circulação em Espaços Confinados',
      'Operações de Carga, Descarga, Empilhamento e Desempilhamento',
      'Segurança em Armazéns e Prevenção de Tombamentos',
      'Práticas Reais de Condução e Manobra em Circuito Técnico'
    ],
    requirements: [
      'Idade mínima de 18 anos',
      'Carta de Condução é uma vantagem (não eliminatória)',
      'Cópia do BI e 2 fotografias tipo passe'
    ],
    careerOutcomes: [
      'Operador de Empilhadeira em Supermercados e Grossistas',
      'Manobrador de Empilhador em Portos e Zonas Francas',
      'Operador de Logística em Centros de Distribuição',
      'Condutor de Equipamentos de Movimentação Interna'
    ],
    availablePolos: ['Polo Valódia (Sede)', 'Polo Industrial Viana'],
    nextClassDate: 'Próxima Turma Prática',
    featured: true
  },
  {
    id: 'soldadura-industrial',
    name: 'Soldadura Industrial (TIG, MIG/MAG e Elétrodo)',
    slug: 'soldadura-industrial',
    category: 'Soldadura & Tubagem',
    price: 45000,
    registrationFee: 2500,
    duration: '6 Semanas',
    hoursCount: 120,
    status: 'abertas',
    isActive: true,
    modality: 'Presencial (Oficina Industrial)',
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Aprenda os principais processos de soldadura industrial com equipamentos modernos em oficina equipada.',
    fullDescription: 'Domine os processos de soldadura por Elétrodo Revestido (SMAW), MIG/MAG (GMAW) e TIG (GTAW) em aço carbono, aço inoxidável e ligas industriais. Curso prático em bancadas individuais com todos os EPIs incluídos e homologação INEFOP.',
    syllabus: [
      'Segurança e Saúde em Oficinas de Soldadura',
      'Metalurgia da Soldadura e Comportamento dos Materiais',
      'Processo de Soldadura com Elétrodo Revestido (SMAW)',
      'Processo de Soldadura MIG/MAG (GMAW) em Várias Posições (1G, 2G, 3G, 4G)',
      'Processo de Soldadura TIG (GTAW) para Alta Precisão',
      'Corte Térmico com Oxiacetileno e Plasma',
      'Inspeção Visual de Cordões e Descontinuidades em Solda'
    ],
    requirements: [
      '9ª Classe concluída',
      'Aptidão física e visual',
      'Cópia do BI e 2 fotos tipo passe'
    ],
    careerOutcomes: [
      'Soldador Industrial em Estaleiros Navais e Estruturas Metálicas',
      'Soldador de Tubagens em Refinarias e Indústrias Químicas',
      'Técnico de Reparação e Manutenção Soldada',
      'Profissional Qualificado para Empresas Nacionais e Internacionais'
    ],
    availablePolos: ['Polo Industrial Viana', 'Polo Valódia (Sede)'],
    nextClassDate: 'Início no Próximo Mês',
    featured: true
  },
  {
    id: 'tubagem-industrial',
    name: 'Tubagem Industrial (Piping e Isometria)',
    slug: 'tubagem-industrial',
    category: 'Soldadura & Tubagem',
    price: 40000,
    registrationFee: 2500,
    duration: '5 Semanas',
    hoursCount: 100,
    status: 'abertas',
    isActive: true,
    modality: 'Presencial',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Traçagem de tubos, interpretação de desenhos isométricos, montagem e acoplamento para o setor petrolífero.',
    fullDescription: 'Formação técnica para montadores de tubagem industrial (pipefitters). Abrange interpretação de plantas industriais e desenhos isométricos, cálculo de curvas, cortes chanfrados, montagem de flanges, válvulas e linhas de condução para instalações petrolíferas e químicas.',
    syllabus: [
      'Introdução à Tubagem Industrial e Simbologia Técnica',
      'Leitura e Interpretação de Desenhos Isométricos e Spools',
      'Matemática Aplicada e Trigonometria para Tubistas',
      'Acessórios de Tubagem (Flanges, Curvas, Reduções, Válvulas)',
      'Técnicas de Traçagem, Corte e Biselamento de Tubos',
      'Montagem, Nivelamento e Alinhamento de Linhas',
      'Testes Hidrostáticos e Pneumáticos de Pressão'
    ],
    requirements: [
      '9ª Classe concluída',
      'Noções de desenho técnico ou matemática básica',
      'Cópia do BI'
    ],
    careerOutcomes: [
      'Tubista Industrial / Pipefitter em Refinarias e Plataformas',
      'Montador de Estruturas e Linhas Industriais',
      'Desenhador e Traçador de Tubagens',
      'Técnico de Manutenção em Instalações de Fluidos'
    ],
    availablePolos: ['Polo Industrial Viana', 'Polo Valódia (Sede)'],
    nextClassDate: 'Inscrições Abertas',
    featured: false
  },
  {
    id: 'grua-torre-movel',
    name: 'Operador de Grua Torre e Grua Móvel',
    slug: 'grua-torre-movel',
    category: 'Formações Industriais & Manobras',
    price: 50000,
    registrationFee: 2500,
    duration: '5 Semanas',
    hoursCount: 110,
    status: 'abertas',
    isActive: true,
    modality: 'Presencial (Simulador e Prática)',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Operação de elevação pesada com gruas telescópicas móveis e gruas torre para construção civil e portos.',
    fullDescription: 'Treinamento completo para operadores de gruas móveis e gruas de torre. Inclui cálculo de capacidades, leitura de tabelas de momento, posicionamento seguro das sapatas estabilizadoras, manobras em condições adversas de vento e procedimentos de segurança rigorosos.',
    syllabus: [
      'Mecânica, Hidráulica e Sistemas Eletrónicos de Gruas',
      'Inspeção Diária, Cabos de Aço e Sistemas Limitadores de Carga',
      'Tabelas de Carga, Raios de Operação e Efeito do Vento',
      'Montagem, Estabilização e Apoio em Solos Variados',
      'Comunicação Rigorosa com o Rigger Sinaleiro',
      'Manobras Práticas de Elevação, Rotação e Posicionamento Fino',
      'Procedimentos de Emergência e Parada Segura'
    ],
    requirements: [
      'Idade mínima de 21 anos',
      'Carta de Condução de Veículos Pesados (C/D ou E recomendada)',
      'Excelente acuidade visual e reflexos',
      'Cópia do BI'
    ],
    careerOutcomes: [
      'Operador de Grua Móvel em Grandes Obras e Mineração',
      'Operador de Grua Torre na Construção Civil e Edifícios',
      'Manobrador de Guindastes em Terminais Portuários',
      'Profissional Requisitado no Programa Plano Portugal'
    ],
    availablePolos: ['Polo Industrial Viana', 'Polo Portuário Boavista'],
    nextClassDate: 'Próxima Turma Aberta',
    featured: false
  },
  {
    id: 'logistica-transporte',
    name: 'Logística e Transportes Industriais',
    slug: 'logistica-transporte',
    category: 'Logística & Transportes',
    price: 28000,
    registrationFee: 2500,
    duration: '4 Semanas',
    hoursCount: 80,
    status: 'abertas',
    isActive: true,
    modality: 'Presencial',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Gestão de frotas pesadas, expedição aduaneira, movimentação de mercadorias e cadeia de abastecimento.',
    fullDescription: 'Formação voltada para a gestão e operacionalização de logística e transportes em Angola. Foco em planeamento de rotas, gestão de stocks e armazéns, despacho aduaneiro no Porto de Luanda e otimização de frotas industriais.',
    syllabus: [
      'Conceitos de Logística Integrada e Supply Chain',
      'Gestão de Armazéns, Inventários e Endereçamento Logístico',
      'Gestão e Manutenção de Frotas de Transporte Rodoviário',
      'Procedimentos de Carga e Amarração em Camiões',
      'Despacho Aduaneiro e Documentação de Trânsito em Angola',
      'Softwares de Gestão Logística e Indicadores de Desempenho (KPIs)'
    ],
    requirements: [
      'Ensino Médio concluído ou em curso',
      'Cópia do BI e 2 fotografias tipo passe'
    ],
    careerOutcomes: [
      'Gestor de Frota e Despacho de Transporte',
      'Assistente de Logística e Armazém',
      'Conferente de Mercadorias e Despacho',
      'Técnico de Distribuição e Aprovisionamento'
    ],
    availablePolos: ['Polo Valódia (Sede)', 'Polo Portuário Boavista'],
    nextClassDate: 'Turmas em Horário Pós-Laboral',
    featured: false
  },
  {
    id: 'carreiras-onshore-offshore',
    name: 'Gestão de Carreiras Onshore & Offshore',
    slug: 'carreiras-onshore-offshore',
    category: 'Onshore & Offshore',
    price: 35000,
    registrationFee: 2500,
    duration: '3 Semanas',
    hoursCount: 65,
    status: 'abertas',
    isActive: true,
    modality: 'Presencial + Mentoria',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Consultoria e preparação intensiva para ingresso e ascensão nas empresas petrolíferas e marítimas.',
    fullDescription: 'Programa exclusivo de consultoria e capacitação da Técnogest para profissionais que desejam ingressar no setor petrolífero em Angola (Blocos marítimos e bases onshore). Aborda certificações internacionais exigidas (OPITO, STCW, HUET), estrutura de vida a bordo, inglês técnico petrolífero e estratégia de candidatura.',
    syllabus: [
      'Panorama da Indústria Petrolífera em Angola (Operadoras e Prestadoras)',
      'Organização de Plataformas Offshore (FPSO, Jack-up, Semi-submersíveis)',
      'Requisitos e Certificações Mandatórias (BOSIET, HUET, OSP, Medical Offshore)',
      'Inglês Técnico Marítimo e Comunicação Padrão',
      'Rotinas, Segurança e Convivência em Regime de Turnos (28x28 / 14x14)',
      'Estruturação de Currículo Competitivo e Preparação para Entrevistas Petrolíferas'
    ],
    requirements: [
      'Ensino Médio ou Curso Técnico concluído',
      'Vontade de ingressar no setor petrolífero/marítimo',
      'Cópia do BI'
    ],
    careerOutcomes: [
      'Profissional Preparado para Processos Seletivos Onshore/Offshore',
      'Assistente de Operações em Bases Petrolíferas (Soyo, Cabinda, Luanda)',
      'Técnico Qualificado para Prestadoras de Serviços Petrolíferos'
    ],
    availablePolos: ['Polo Valódia (Sede - Gabinete Onshore/Offshore)'],
    nextClassDate: 'Inscrições Abertas',
    featured: true
  }
];
