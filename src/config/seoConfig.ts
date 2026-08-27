import { Course, Polo, SiteSettings, DynamicSEOMetadata, ViewType } from '../types';

export const DEFAULT_SITE_URL = 'https://tecnogest.ao';

export interface SEOConfigOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  noIndex?: boolean;
  course?: Course;
  polo?: Polo;
  customSchema?: Record<string, any>;
}

/**
 * Builds Course JSON-LD Schema according to schema.org/Course and schema.org/EducationalOccupationalCredential
 */
export function buildCourseJsonLd(course: Course, settings?: Partial<SiteSettings>) {
  const institutionName = settings?.institutionName || 'Técnogest - Consultoria, Carreiras Onshore/Offshore e Formações Industriais';
  const accreditation = settings?.accreditationText || 'INEFOP / MAPTSS • Parceria INÇATEC e TÉCNOFORM';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `${course.name} | Certificação INEFOP`,
    description: course.fullDescription || course.shortDescription,
    provider: {
      '@type': 'EducationalOrganization',
      name: institutionName,
      sameAs: DEFAULT_SITE_URL,
      accreditation: accreditation
    },
    educationalCredentialAwarded: {
      '@type': 'EducationalOccupationalCredential',
      name: 'Certificado de Formação Profissional Homologado pelo INEFOP',
      credentialCategory: 'Certificação Profissional Oficial MAPTSS'
    },
    offers: {
      '@type': 'Offer',
      category: 'Propina de Formação',
      price: course.price,
      priceCurrency: 'AOA',
      availability: course.status === 'esgotadas' ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
      validFrom: '2025-01-01'
    },
    timeRequired: course.duration,
    courseCode: course.id,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: course.modality || 'In-person / Presencial Prático',
      courseWorkload: course.duration,
      location: {
        '@type': 'Place',
        name: `Polos Técnogest (${course.availablePolos.join(', ')})`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Luanda',
          addressRegion: 'Luanda',
          addressCountry: 'AO'
        }
      }
    }
  };
}

/**
 * Builds LocalBusiness / Place JSON-LD for Polos
 */
export function buildPoloJsonLd(polo: Polo, settings?: Partial<SiteSettings>) {
  const institutionName = settings?.institutionName || 'Técnogest - Consultoria e Formações Industriais';

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `${institutionName} - ${polo.name}`,
    description: `Polo oficial de formação industrial e consultoria de carreiras em ${polo.municipality}, Luanda.`,
    telephone: polo.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: polo.address,
      addressLocality: polo.municipality,
      addressRegion: 'Luanda',
      addressCountry: 'AO'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: polo.coordinates?.lat || -8.81667,
      longitude: polo.coordinates?.lng || 13.23889
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '16:00'
      }
    ]
  };
}

/**
 * Builds Global Educational Organization JSON-LD Schema
 */
export function buildOrganizationJsonLd(settings?: Partial<SiteSettings>) {
  const institutionName = settings?.institutionName || 'Técnogest - Consultoria, Carreiras Onshore/Offshore e Formações Industriais';
  const accreditation = settings?.inefopRegistration || 'INEFOP Registo Homologado MAPTSS';
  const phone = settings?.primaryPhone || '+244 948 235 692';
  const email = settings?.emailContact || 'contacto@tecnogest.ao';

  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: institutionName,
    alternateName: ['Técnogest', 'Técnogest Angola', 'Técnogest Formações Industriais', 'Técnogest Onshore Offshore'],
    url: DEFAULT_SITE_URL,
    logo: `${DEFAULT_SITE_URL}/logo.png`,
    description: 'Centro de formação técnica industrial e consultoria em carreiras onshore/offshore, homologado pelo INEFOP, em parceria com INÇATEC e TÉCNOFORM.',
    foundingDate: '2018',
    accreditation: accreditation,
    telephone: phone,
    email: email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings?.headquartersAddress || 'Bairro Valódia, Ex Combatentes, Edifício 206, 10º Andar, Luanda',
      addressLocality: 'Luanda',
      addressRegion: 'Luanda',
      addressCountry: 'AO'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -8.81667,
      longitude: 13.23889
    },
    sameAs: [
      settings?.socialLinks?.facebook || 'https://facebook.com/tecnogestangola',
      settings?.socialLinks?.instagram || 'https://instagram.com/tecnogestangola'
    ]
  };
}

/**
 * Dynamic SEO Config Registry by View
 */
export function getViewSEOConfig(
  view: ViewType,
  options?: {
    course?: Course | null;
    polo?: Polo | null;
    category?: string | null;
    settings?: Partial<SiteSettings>;
  }
): DynamicSEOMetadata {
  const { course, polo, category, settings } = options || {};
  const brandName = settings?.brandShortName || 'Técnogest';

  switch (view) {
    case 'course-detail':
      if (course) {
        return {
          title: `Curso de ${course.name} em Luanda - Certificação INEFOP | ${brandName}`,
          description: `Formação prática de ${course.name} (${course.duration}). Propina de ${course.price.toLocaleString('pt-AO')} Kz. Certificado homologado pelo INEFOP/MAPTSS. ${course.shortDescription}`,
          keywords: [
            `curso de ${course.name} Luanda`,
            `formação ${course.name} Angola`,
            `preço curso ${course.name}`,
            `curso técnico industrial ${course.category} Luanda`,
            'certificação INEFOP Luanda',
            'rigger sinaleiro Luanda',
            'controlo de qualidade Angola',
            'inscrições abertas Técnogest',
            ...course.availablePolos.map(p => `curso ${course.name} ${p}`)
          ],
          canonicalUrl: `${DEFAULT_SITE_URL}/cursos/${course.slug || course.id}`,
          ogImage: course.image,
          ogType: 'article',
          course: course,
          customSchema: buildCourseJsonLd(course, settings)
        };
      }
      break;

    case 'courses':
      return {
        title: category
          ? `Cursos de ${category} em Luanda | Certificados INEFOP - ${brandName}`
          : `Catálogo de Cursos Industriais & Onshore/Offshore 2025/2026 | ${brandName}`,
        description: category
          ? `Explore as formações práticas de ${category} na ${brandName}. Certificação INEFOP, pátio de manobras e preparação para indústrias e setor petrolífero.`
          : `Consulte os cursos de Rigger Sinaleiro, Controlo de Qualidade, HST, Soldadura, Empilhadeira e Plano Portugal no Centro Técnogest.`,
        keywords: [
          'cursos industriais Luanda 2025',
          'rigger sinaleiro Luanda',
          'controlo de qualidade angola',
          'cursos onshore offshore angola',
          'plano portugal visto trabalho',
          'escola de formação industrial tecnogest'
        ],
        canonicalUrl: `${DEFAULT_SITE_URL}/cursos`,
        ogType: 'website'
      };

    case 'polos':
      if (polo) {
        return {
          title: `Polo ${polo.name} - Centro de Formação Técnogest em ${polo.municipality}`,
          description: `Conheça o polo ${polo.name} da Técnogest em ${polo.municipality}. Endereço: ${polo.address}. Horários, cursos e contactos.`,
          canonicalUrl: `${DEFAULT_SITE_URL}/polos/${polo.id}`,
          polo: polo,
          customSchema: buildPoloJsonLd(polo, settings)
        };
      }
      return {
        title: `Polos e Centros de Formação Industrial em Luanda | ${brandName}`,
        description: `Localize o polo da Técnogest: Polo Valódia (Sede - Edifício da Comunicação Social), Polo Industrial Viana, Polo Boavista e Gabinete Internacional Plano Portugal.`,
        keywords: [
          'polos tecnogest',
          'tecnogest valodia ex combatentes',
          'centro de formação tecnogest viana',
          'polo boavista tecnogest'
        ],
        canonicalUrl: `${DEFAULT_SITE_URL}/polos`,
        ogType: 'website'
      };

    case 'enroll':
      return {
        title: `Inscrição Online - Formações Industriais 2025/2026 | ${brandName}`,
        description: `Garanta a sua vaga online nos cursos industriais homologados pelo INEFOP na Técnogest. Rigger Sinaleiro, Controlo de Qualidade, HST e Plano Portugal.`,
        keywords: [
          'inscrição online cursos tecnogest',
          'matrícula tecnogest 2025',
          'vagas abertas rigger sinaleiro',
          'inscrição plano portugal angola'
        ],
        canonicalUrl: `${DEFAULT_SITE_URL}/inscricao`,
        ogType: 'website'
      };

    case 'about':
      return {
        title: `Sobre a Técnogest | Consultoria e Formações Industriais com Certificação INEFOP`,
        description: `Conheça a Técnogest Angola: Inovar para Melhor Servir. Formações industriais, gestão de carreiras onshore/offshore e parcerias com INÇATEC e TÉCNOFORM.`,
        keywords: [
          'sobre tecnogest angola',
          'história tecnogest',
          'inovar para melhor servir',
          'homologação INEFOP tecnogest',
          'parceria inçatec tecnoform'
        ],
        canonicalUrl: `${DEFAULT_SITE_URL}/sobre`,
        ogType: 'website'
      };

    case 'home':
    default:
      if (view.startsWith('admin-')) {
        return {
          title: `Painel de Gestão CMS & CRM | ${brandName}`,
          description: 'Área Administrativa da Técnogest - Consultoria e Formações Industriais.',
          noIndex: true
        };
      }
      return {
        title: `${settings?.institutionName || 'Técnogest - Formações Industriais e Carreiras Onshore/Offshore'} | Luanda`,
        description: `${settings?.slogan || 'Inovar Para Melhor Servir'}. Cursos de Rigger Sinaleiro, Controlo de Qualidade, HST, Soldadura e Plano Portugal com Certificado INEFOP no Bairro Valódia, Viana e Boavista.`,
        keywords: [
          'Técnogest Angola',
          'cursos industriais Luanda',
          'Rigger Sinaleiro Angola',
          'Controlo de Qualidade Luanda',
          'HST segurança no trabalho Luanda',
          'Plano Portugal Luanda visto contrato',
          'cursos onshore offshore Luanda'
        ],
        canonicalUrl: DEFAULT_SITE_URL,
        ogType: 'website',
        customSchema: buildOrganizationJsonLd(settings)
      };
  }
}
