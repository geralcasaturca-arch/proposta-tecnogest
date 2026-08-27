import { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Course, Polo, DynamicSEOMetadata } from '../types';
import { getViewSEOConfig, buildCourseJsonLd, buildPoloJsonLd, buildOrganizationJsonLd, DEFAULT_SITE_URL } from '../config/seoConfig';

export interface UseDynamicSEOOptions extends DynamicSEOMetadata {
  updateDocumentTitle?: boolean;
}

/**
 * Custom React Hook for dynamically managing SEO Meta Tags, OpenGraph, GEO and JSON-LD
 * using react-helmet-async principles and centralized configuration.
 */
export function useDynamicSEO(options?: UseDynamicSEOOptions) {
  const { currentView, selectedCourse, selectedPolo, siteSettings } = useApp();

  // Compute resolved SEO configuration based on active view, course/polo and CMS site settings
  const baseConfig = getViewSEOConfig(currentView, {
    course: options?.course || (currentView === 'course-detail' ? selectedCourse : null),
    polo: options?.polo || (currentView === 'polos' ? selectedPolo : null),
    settings: siteSettings
  });

  const resolvedSEO: DynamicSEOMetadata = {
    title: options?.title || baseConfig.title,
    description: options?.description || baseConfig.description,
    keywords: options?.keywords || baseConfig.keywords,
    canonicalUrl: options?.canonicalUrl || baseConfig.canonicalUrl || DEFAULT_SITE_URL,
    ogImage: options?.ogImage || baseConfig.ogImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjU-q8Ck9qP-3z3lv-N2roaaMgpVpm0c3lJbKzG2MUtuGngipU7vTxSF2aM95deFJS1Om1uLzwdlvpHKxa9TRFjALi9eUeFjLYaeQJVGaqg-DSR0tEWxrUjs1DI_ozYWoRmXnBWMcEs6YS1I9Tl7sQrXQ0hNs_DfOqBKuYBPlIGbl_MyJGJtecmjde7wQT7vCSzDjjq0bbdTP38hTDCxktlwGVJh9qhf0thrt2cg8V6Ckm-AKkMRIZjtAiMLVJrz6_j8c',
    ogType: options?.ogType || baseConfig.ogType || 'website',
    noIndex: options?.noIndex || baseConfig.noIndex || false,
    course: options?.course || baseConfig.course,
    polo: options?.polo || baseConfig.polo,
    customSchema: options?.customSchema || baseConfig.customSchema
  };

  // Sync client-side document title as fallback
  useEffect(() => {
    if (resolvedSEO.title) {
      document.title = resolvedSEO.title;
    }
  }, [resolvedSEO.title]);

  return {
    seo: resolvedSEO,
    buildCourseJsonLd: (c: Course) => buildCourseJsonLd(c, siteSettings),
    buildPoloJsonLd: (p: Polo) => buildPoloJsonLd(p, siteSettings),
    buildOrganizationJsonLd: () => buildOrganizationJsonLd(siteSettings)
  };
}

/**
 * Specialized hook for Course Detail Pages to maximize search engine discoverability
 */
export function useCourseSEO(course: Course | null) {
  const { siteSettings } = useApp();
  
  if (!course) {
    return useDynamicSEO({
      title: `Catálogo de Formações Industriais | ${siteSettings?.brandShortName || 'Técnogest'}`,
      description: 'Explore nossas formações industriais e marítimas certificadas pelo INEFOP em Luanda.'
    });
  }

  return useDynamicSEO({
    title: `Formação de ${course.name} - Certificado INEFOP Luanda | ${siteSettings?.brandShortName || 'Técnogest'}`,
    description: `Aprenda ${course.name} com aulas práticas em Luanda. Duração: ${course.duration}, Propina: ${course.price.toLocaleString('pt-AO')} Kz. Certificação homologada pelo INEFOP/MAPTSS. ${course.shortDescription}`,
    keywords: [
      `curso ${course.name} Luanda`,
      `formação ${course.name} Angola`,
      `preço curso ${course.name}`,
      `onde estudar ${course.name} em Luanda`,
      'certificado INEFOP',
      course.category,
      ...course.availablePolos.map(p => `curso ${course.name} em ${p}`)
    ],
    canonicalUrl: `${DEFAULT_SITE_URL}/cursos/${course.slug || course.id}`,
    ogImage: course.image,
    ogType: 'article',
    course: course,
    customSchema: buildCourseJsonLd(course, siteSettings)
  });
}
