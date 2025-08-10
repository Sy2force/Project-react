import { Helmet } from 'react-helmet-async'

const SEOHead = ({ 
  title = 'Shay Acoca - Créateur du Futur Digital',
  description = 'Portfolio futuriste de Shay Acoca, développeur React spécialisé dans la création d\'expériences digitales modernes et performantes.',
  keywords = 'React, développeur, portfolio, JavaScript, TypeScript, UI/UX, développement web, applications modernes',
  image = '/og-image.jpg',
  url = 'https://shayacoca.com',
  type = 'website'
}) => {
  const fullTitle = title.includes('Shay Acoca') ? title : `${title} | Shay Acoca`
  const canonicalUrl = `${url}${window.location.pathname}`

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Shay Acoca" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="fr-FR" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={`${url}${image}`} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="Shay Acoca Portfolio" />
      <meta property="og:locale" content="fr_FR" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${url}${image}`} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:creator" content="@shayacoca" />
      <meta name="twitter:site" content="@shayacoca" />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#3B82F6" />
      <meta name="msapplication-TileColor" content="#3B82F6" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Shay Acoca",
          "jobTitle": "Développeur Full-Stack",
          "description": "Créateur du futur digital spécialisé en React et développement web moderne",
          "url": url,
          "image": `${url}${image}`,
          "sameAs": [
            "https://github.com/shayacoca",
            "https://linkedin.com/in/shayacoca",
            "https://twitter.com/shayacoca"
          ],
          "knowsAbout": [
            "React",
            "JavaScript",
            "TypeScript",
            "Node.js",
            "UI/UX Design",
            "Web Development"
          ]
        })}
      </script>
    </Helmet>
  )
}

export default SEOHead
