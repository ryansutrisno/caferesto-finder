import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  image = 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1000&auto=format&fit=crop',
  type = 'website' 
}) => {
  const { t } = useTranslation();
  
  const siteTitle = 'CafeFinder';
  const pageTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} - Find The Best Cafe & Resto`;
  const metaDescription = description || t('home.heroSubtitle', 'Explore comfortable places to work, hang out, or enjoy culinary delights with trusted recommendations.');

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
