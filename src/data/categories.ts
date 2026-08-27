import { CategoryConfig } from '../types';

export const INITIAL_CATEGORIES: CategoryConfig[] = [
  {
    id: 'cat-industriais',
    name: 'Formações Industriais & Manobras',
    slug: 'industriais-manobras',
    icon: 'forklift',
    description: 'Rigger Sinaleiro, Operação de Empilhadeira, Grua Móvel e Grua Torre com práticas intensivas.',
    badgeColor: 'bg-blue-500/10 text-blue-700 border-blue-300',
    order: 1
  },
  {
    id: 'cat-qhse',
    name: 'Segurança & Qualidade (QHSE)',
    slug: 'seguranca-qualidade',
    icon: 'verified_user',
    description: 'Higiene e Segurança no Trabalho (HST I, II e III), Controlo de Qualidade e Primeiros Socorros.',
    badgeColor: 'bg-amber-500/10 text-amber-700 border-amber-300',
    order: 2
  },
  {
    id: 'cat-metalomecanica',
    name: 'Soldadura & Tubagem',
    slug: 'soldadura-tubagem',
    icon: 'construction',
    description: 'Soldadura Industrial (TIG, MIG/MAG, Elétrodo Revestido) e Tubagem Industrial / Piping.',
    badgeColor: 'bg-orange-500/10 text-orange-700 border-orange-300',
    order: 3
  },
  {
    id: 'cat-onshore-offshore',
    name: 'Onshore & Offshore',
    slug: 'onshore-offshore',
    icon: 'anchor',
    description: 'Gestão de Carreiras Petrolíferas, Operações Portuárias, Plataformas e Certificações Marítimas.',
    badgeColor: 'bg-sky-500/10 text-sky-700 border-sky-300',
    order: 4
  },
  {
    id: 'cat-logistica',
    name: 'Logística & Transportes',
    slug: 'logistica-transportes',
    icon: 'local_shipping',
    description: 'Gestão de Frotas, Logística Industrial, Armazenamento e Cadeia de Abastecimento.',
    badgeColor: 'bg-emerald-500/10 text-emerald-700 border-emerald-300',
    order: 5
  },
  {
    id: 'cat-portugal',
    name: 'Plano Portugal',
    slug: 'plano-portugal',
    icon: 'flight_takeoff',
    description: 'Programa Especial: Visto de Trabalho + Curso Técnico + Direito a Contrato de Trabalho em Portugal.',
    badgeColor: 'bg-red-500/10 text-red-700 border-red-300',
    order: 6
  }
];
