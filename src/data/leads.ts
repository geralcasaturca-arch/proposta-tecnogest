import { Lead } from '../types';

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-1',
    name: 'João Silva',
    phone: '+244 923 000 111',
    email: 'joao.silva@email.com',
    courseName: 'Informática de Gestão',
    poloName: 'Polo Viana',
    source: 'whatsapp',
    status: 'novo',
    createdAt: 'Hoje, 10:45',
    notes: 'Interessado no turno da manhã'
  },
  {
    id: 'lead-2',
    name: 'Maria Costa',
    phone: '+244 912 333 444',
    email: 'maria.costa@email.com',
    courseName: 'Recursos Humanos',
    poloName: 'Polo Cacuaco',
    source: 'web',
    status: 'contactado',
    createdAt: 'Hoje, 09:12',
    notes: 'A aguardar validação do BI'
  },
  {
    id: 'lead-3',
    name: 'Pedro Santos',
    phone: '+244 999 888 777',
    email: 'pedro.santos@email.com',
    courseName: 'Contabilidade Básica',
    poloName: 'Polo Viana',
    source: 'instagram',
    status: 'perdido',
    createdAt: 'Ontem, 16:30',
    notes: 'Sem disponibilidade de horário'
  },
  {
    id: 'lead-4',
    name: 'Ana Luísa',
    phone: '+244 933 222 111',
    email: 'ana.luisa@email.com',
    courseName: 'Inglês Nível 1',
    poloName: 'Polo Benfica',
    source: 'whatsapp',
    status: 'matriculado',
    createdAt: 'Ontem, 14:20',
    notes: 'Matrícula paga via Multicaixa Express'
  },
  {
    id: 'lead-5',
    name: 'Manuel António',
    phone: '+244 924 555 888',
    email: 'manuel.antonio@email.com',
    courseName: 'Eletricidade Industrial',
    poloName: 'Polo Viana',
    source: 'web',
    status: 'novo',
    createdAt: 'Hoje, 08:30',
    notes: 'Quer iniciar na turma de 01 Setembro'
  },
  {
    id: 'lead-6',
    name: 'Teresa Domingos',
    phone: '+244 945 123 789',
    email: 'teresa.domingos@email.com',
    courseName: 'Make-Up Profissional',
    poloName: 'Polo Zango 3',
    source: 'instagram',
    status: 'contactado',
    createdAt: 'Anteontem, 11:15',
    notes: 'Pediu detalhes do kit de materiais'
  },
  {
    id: 'lead-7',
    name: 'Carlos Mendes',
    phone: '+244 918 777 999',
    email: 'carlos.mendes@email.com',
    courseName: 'Redes de Computadores',
    poloName: 'Polo Talatona',
    source: 'whatsapp',
    status: 'matriculado',
    createdAt: 'Anteontem, 17:00',
    notes: 'Inscrito no turno pós-laboral'
  },
  {
    id: 'lead-8',
    name: 'Esperança Baptista',
    phone: '+244 931 444 222',
    email: 'esperanca.b@email.com',
    courseName: 'Tranças Africanas',
    poloName: 'Polo Cacuaco',
    source: 'presencial',
    status: 'novo',
    createdAt: 'Hoje, 11:20',
    notes: 'Visitou a secretaria do polo'
  }
];
