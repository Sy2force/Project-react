// [EXAM] Composant SEO pour gestion dynamique des métadonnées par page
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const PageHead = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  author = 'Shay Acoca',
  siteName = 'Shay Acoca Portfolio',
  locale = 'fr_FR',
  noIndex = false,
  canonical,
  structuredData
}) => {
  const baseUrl = 'https://shayacoca.com'; // [EXAM] {{brand}} placeholder
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const fullImage = image ? (image.startsWith('http') ? image : `${baseUrl}${image}`) : `${baseUrl}/og-default.jpg`;

  return (
    <Helmet>
      {/* [EXAM] Titre dynamique par page */}
      <title>{fullTitle}</title>
      
      {/* [EXAM] Meta descriptions SEO */}
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />
      
      {/* [EXAM] Canonical URL */}
      <link rel="canonical" href={canonical || fullUrl} />
      
      {/* [EXAM] Open Graph pour réseaux sociaux */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />
      
      {/* [EXAM] Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@shayacoca" />
      <meta name="twitter:creator" content="@shayacoca" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      
      {/* [EXAM] Contrôle indexation */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* [EXAM] Schema JSON-LD si fourni */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* [EXAM] Préchargement des ressources critiques */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* [EXAM] Favicon et icônes */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      {/* [EXAM] Métadonnées PWA */}
      <meta name="theme-color" content="#1e40af" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    </Helmet>
  );
};

PageHead.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string.isRequired,
  keywords: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.string,
  author: PropTypes.string,
  siteName: PropTypes.string,
  locale: PropTypes.string,
  noIndex: PropTypes.bool,
  canonical: PropTypes.string,
  structuredData: PropTypes.object
};

export default PageHead;
