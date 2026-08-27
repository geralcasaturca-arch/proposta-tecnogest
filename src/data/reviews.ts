import { CourseReview } from '../types';

export const INITIAL_REVIEWS: CourseReview[] = [
  {
    id: 'rev-1',
    authorName: 'Manuel Domingos Sebastião',
    courseId: 'rigger-sinaleiro',
    courseName: 'Rigger Sinaleiro (Manobras de Cargas)',
    poloName: 'Polo Valódia (Sede)',
    rating: 5,
    date: '15 Fev 2025',
    comment: 'Excelente formação! As aulas práticas com a grua e o cálculo de centro de gravidade deram-me toda a segurança. Duas semanas após receber a carta de recomendação e o certificado INEFOP da Técnogest, fui contratado para o estaleiro da Sonamet no Soyo.',
    isApproved: true,
    verifiedStudent: true,
    authorRole: 'Rigger Certificado - Setor Petrolífero'
  },
  {
    id: 'rev-2',
    authorName: 'Helena Patrícia dos Santos',
    courseId: 'controle-qualidade',
    courseName: 'Controlo de Qualidade (CQ Industrial)',
    poloName: 'Polo Valódia (Sede)',
    rating: 5,
    date: '28 Jan 2025',
    comment: 'O curso de Controlo de Qualidade na Técnogest superou todas as minhas expectativas. Os formadores têm experiência real na indústria petrolífera e ensinaram a elaboração de relatórios de não-conformidade e medições de precisão. Recomendo vivamente!',
    isApproved: true,
    verifiedStudent: true,
    authorRole: 'Inspetora de Qualidade Industrial'
  },
  {
    id: 'rev-3',
    authorName: 'António Kapapelo',
    courseId: 'plano-portugal-completo',
    courseName: 'Plano Portugal (Visto + Curso Técnico + Contrato)',
    poloName: 'Gabinete Internacional - Plano Portugal',
    rating: 5,
    date: '10 Jan 2025',
    comment: 'Fiz a formação de Operador de Empilhadeira e aderi ao Plano Portugal. A equipa da Técnogest tratou de todo o processo documental para o meu visto e hoje já estou a trabalhar legalmente num armazém de logística no norte de Portugal. Uma oportunidade de ouro.',
    isApproved: true,
    verifiedStudent: true,
    authorRole: 'Operador em Portugal (Emigrante Legalizado)'
  },
  {
    id: 'rev-4',
    authorName: 'Edivaldo Fernando',
    courseId: 'higiene-seguranca-trabalho',
    courseName: 'Higiene e Segurança no Trabalho (HST) - Níveis I, II e III',
    poloName: 'Polo Industrial Viana',
    rating: 5,
    date: '04 Fev 2025',
    comment: 'A formação de HST nos 3 níveis abriu-me portas no setor da construção civil e mina. O material didático é completo, o passe do formando e o certificado INEFOP foram entregues sem atrasos. A Técnogest inova mesmo para melhor servir.',
    isApproved: true,
    verifiedStudent: true,
    authorRole: 'Técnico de Segurança no Trabalho'
  },
  {
    id: 'rev-5',
    authorName: 'João Baptista Quaresma',
    courseId: 'soldadura-industrial',
    courseName: 'Soldadura Industrial (TIG, MIG/MAG e Elétrodo)',
    poloName: 'Polo Industrial Viana',
    rating: 5,
    date: '20 Dez 2024',
    comment: 'A oficina de soldadura no polo de Viana tem máquinas de ponta. Praticámos soldadura em várias posições (1G até 4G). O formador explicou cada detalhe da fusão e inspeção visual. Hoje trabalho numa metalomecânica em Luanda.',
    isApproved: true,
    verifiedStudent: true,
    authorRole: 'Soldador Industrial Qualificado'
  },
  {
    id: 'rev-6',
    authorName: 'Teresa da Conceição',
    courseId: 'carreiras-onshore-offshore',
    courseName: 'Gestão de Carreiras Onshore & Offshore',
    poloName: 'Polo Valódia (Sede)',
    rating: 5,
    date: '12 Fev 2025',
    comment: 'A consultoria de carreiras marítimas e petrolíferas da Técnogest foi essencial para eu entender o que as operadoras internacionais realmente procuram. Reestruturaram o meu CV técnico e orientaram as minhas certificações obrigatórias.',
    isApproved: true,
    verifiedStudent: true,
    authorRole: 'Consultoria de Carreira Offshore'
  }
];
