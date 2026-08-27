import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Course, Polo } from '../types';
import { useDynamicSEO } from '../hooks/useDynamicSEO';
import { DEFAULT_SITE_URL } from '../config/seoConfig';

interface SEOHeadProps {
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

export const SEOHead: React.FC<SEOHeadProps> = (props) => {
  const { seo } = useDynamicSEO(props);

  const title = props.title || seo.title || 'Técnogest Angola | Formação Industrial, Offshore e Plano Portugal';
  const description = props.description || seo.description || 'Centro de formação profissional industrial, onshore/offshore, Rigger, HST e assessoria Plano Portugal em Luanda.';
  const keywords = props.keywords || seo.keywords || ['formações industriais Luanda', 'Técnogest Angola', 'Rigger Sinaleiro', 'INEFOP Angola', 'Plano Portugal'];
  const canonicalUrl = props.canonicalUrl || seo.canonicalUrl || DEFAULT_SITE_URL;
  const ogImage = props.ogImage || seo.ogImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjU-q8Ck9qP-3z3lv-N2roaaMgpVpm0c3lJbKzG2MUtuGngipU7vTxSF2aM95deFJS1Om1uLzwdlvpHKxa9TRFjALi9eUeFjLYaeQJVGaqg-DSR0tEWxrUjs1DI_ozYWoRmXnBWMcEs6YS1I9Tl7sQrXQ0hNs_DfOqBKuYBPlIGbl_MyJGJtecmjde7wQT7vCSzDjjq0bbdTP38hTDCxktlwGVJh9qhf0thrt2cg8V6Ckm-AKkMRIZjtAiMLVJrz6_j8c';
  const ogType = props.ogType || seo.ogType || 'website';
  const jsonLdData = props.customSchema || seo.customSchema;

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      <link rel="canonical" href={canonicalUrl} />

      {/* GEO Location Tags (Angola / Luanda for Search Engines & LLMs) */}
      <meta name="geo.region" content="AO-LUA" />
      <meta name="geo.placename" content="Luanda, Angola" />
      <meta name="geo.position" content="-8.83833;13.23444" />
      <meta name="ICBM" content="-8.83833, 13.23444" />
      <meta name="country" content="Angola" />
      <meta name="target_country" content="AO" />
      <meta name="language" content="pt-AO" />

      {/* AI, Crawlers & Generative Engine Optimization (GEO/LLMO) */}
      <meta
        name="robots"
        content={
          props.noIndex || seo.noIndex
            ? 'noindex, nofollow'
            : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        }
      />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large" />
      <meta name="ai-content-type" content="educational-institution-course-catalog" />
      <meta name="author" content="Técnogest Angola" />

      {/* OpenGraph Protocol (Facebook, WhatsApp, LinkedIn) */}
      <meta property="og:site_name" content="Técnogest Angola - Formações Industriais" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="pt_AO" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Structured Data */}
      {jsonLdData && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLdData)}
        </script>
      )}
    </Helmet>
  );
};

