import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = ({ 
  title, 
  description, 
  keywords = '', 
  image = '', 
  url = '',
  type = 'website',
  author = 'Shay Acoca'
}) => {
  const location = useLocation();
  const baseUrl = import.meta.env.VITE_APP_URL || 'https://shayacoca.com';
  
  // Generate dynamic content based on route if not provided
  const getPageInfo = () => {
    const path = location.pathname;
    
    const pageInfo = {
      '/': {
        title: 'Shay Acoca - Plateforme de Cartes Business Numériques',
        description: 'Créez et partagez vos cartes de visite numériques. Connectez-vous avec des professionnels et développez votre réseau d\'affaires en Israël.',
        keywords: 'cartes business, cartes de visite numériques, networking, professionnels, Israël, Tel Aviv'
      },
      '/home': {
        title: 'Accueil - Shay Acoca',
        description: 'Bienvenue sur la plateforme de cartes business numériques de Shay Acoca. Découvrez une nouvelle façon de networker.',
        keywords: 'accueil, plateforme, cartes business, networking'
      },
      '/cards': {
        title: 'Cartes Business - Découvrez les Professionnels',
        description: 'Explorez notre collection de cartes business numériques. Trouvez des professionnels dans votre domaine et connectez-vous facilement.',
        keywords: 'cartes business, professionnels, recherche, networking, entreprises'
      },
      '/my-cards': {
        title: 'Mes Cartes - Gérez vos Cartes Business',
        description: 'Gérez vos cartes de visite numériques. Créez, modifiez et partagez vos informations professionnelles.',
        keywords: 'mes cartes, gestion, cartes business, profil professionnel'
      },
      '/cards/new': {
        title: 'Créer une Carte - Nouvelle Carte Business',
        description: 'Créez votre carte de visite numérique professionnelle. Ajoutez vos informations, coordonnées et localisez votre entreprise.',
        keywords: 'créer carte, nouvelle carte, carte business, professionnel'
      },
      '/favorites': {
        title: 'Mes Favoris - Cartes Business Préférées',
        description: 'Retrouvez vos cartes business favorites. Accédez rapidement aux professionnels qui vous intéressent.',
        keywords: 'favoris, cartes préférées, networking, contacts'
      },
      '/blog': {
        title: 'Blog - Actualités et Conseils Business',
        description: 'Découvrez nos articles sur le networking, les tendances business et les conseils pour développer votre réseau professionnel.',
        keywords: 'blog, actualités, conseils business, networking, tendances'
      },
      '/contact': {
        title: 'Contact - Contactez Shay Acoca',
        description: 'Contactez-nous pour toute question sur notre plateforme de cartes business. Support technique et commercial disponible.',
        keywords: 'contact, support, aide, questions, service client'
      },
      '/profile': {
        title: 'Mon Profil - Paramètres du Compte',
        description: 'Gérez votre profil utilisateur et vos paramètres de compte. Modifiez vos informations personnelles et préférences.',
        keywords: 'profil, paramètres, compte utilisateur, préférences'
      },
      '/dashboard': {
        title: 'Dashboard Admin - Administration',
        description: 'Interface d\'administration pour gérer les utilisateurs, cartes et paramètres de la plateforme.',
        keywords: 'admin, dashboard, administration, gestion, utilisateurs'
      }
    };

    return pageInfo[path] || {
      title: 'Shay Acoca - Cartes Business Numériques',
      description: 'Plateforme de cartes de visite numériques pour professionnels.',
      keywords: 'cartes business, networking, professionnels'
    };
  };

  const pageInfo = getPageInfo();
  const finalTitle = title || pageInfo.title;
  const finalDescription = description || pageInfo.description;
  const finalKeywords = keywords || pageInfo.keywords;
  const finalUrl = url || `${baseUrl}${location.pathname}`;
  const finalImage = image || `${baseUrl}/og-image.jpg`;

  useEffect(() => {
    // Update document title
    document.title = finalTitle;

    // Remove existing meta tags
    const existingMetas = document.querySelectorAll('meta[data-seo="true"]');
    existingMetas.forEach(meta => meta.remove());

    // Create and append new meta tags
    const metaTags = [
      // Basic SEO
      { name: 'description', content: finalDescription },
      { name: 'keywords', content: finalKeywords },
      { name: 'author', content: author },
      { name: 'robots', content: 'index, follow' },
      { name: 'language', content: 'fr-FR' },
      { name: 'revisit-after', content: '7 days' },
      
      // Open Graph
      { property: 'og:title', content: finalTitle },
      { property: 'og:description', content: finalDescription },
      { property: 'og:type', content: type },
      { property: 'og:url', content: finalUrl },
      { property: 'og:image', content: finalImage },
      { property: 'og:site_name', content: 'Shay Acoca' },
      { property: 'og:locale', content: 'fr_FR' },
      
      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: finalTitle },
      { name: 'twitter:description', content: finalDescription },
      { name: 'twitter:image', content: finalImage },
      { name: 'twitter:creator', content: '@shayacoca' },
      
      // Additional SEO
      { name: 'theme-color', content: '#667eea' },
      { name: 'msapplication-TileColor', content: '#667eea' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'apple-mobile-web-app-title', content: 'Shay Acoca' }
    ];

    metaTags.forEach(tag => {
      const meta = document.createElement('meta');
      meta.setAttribute('data-seo', 'true');
      
      if (tag.name) {
        meta.setAttribute('name', tag.name);
      }
      if (tag.property) {
        meta.setAttribute('property', tag.property);
      }
      
      meta.setAttribute('content', tag.content);
      document.head.appendChild(meta);
    });

    // Add canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', finalUrl);

    // Add structured data for business cards
    if (location.pathname.includes('/cards/') && !location.pathname.includes('/new') && !location.pathname.includes('/edit')) {
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": finalTitle,
        "description": finalDescription,
        "url": finalUrl,
        "logo": finalImage,
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "availableLanguage": ["French", "Hebrew", "English"]
        }
      };

      let scriptTag = document.querySelector('script[type="application/ld+json"]');
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(structuredData);
    }

  }, [finalTitle, finalDescription, finalKeywords, finalUrl, finalImage, author, type, location.pathname]);

  // This component doesn't render anything
  return null;
};

export default SEO;
