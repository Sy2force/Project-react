import { useEffect } from 'react';

/**
 * Hook pour gérer les métadonnées SEO de chaque page
 * @param {string} title - Titre de la page
 * @param {string} description - Description meta pour SEO
 * @param {Object} options - Options supplémentaires (keywords, og:image, etc.)
 */
export const usePageMeta = (title, description, options = {}) => {
  useEffect(() => {
    // Mise à jour du titre de la page
    if (title) {
      document.title = title;
    }

    // Mise à jour ou création de la meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    if (description) {
      metaDescription.content = description;
    }

    // Mise à jour des meta keywords si fournis
    if (options.keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.content = options.keywords;
    }

    // Open Graph meta tags
    if (options.ogTitle || title) {
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitle);
      }
      ogTitle.content = options.ogTitle || title;
    }

    if (options.ogDescription || description) {
      let ogDescription = document.querySelector('meta[property="og:description"]');
      if (!ogDescription) {
        ogDescription = document.createElement('meta');
        ogDescription.setAttribute('property', 'og:description');
        document.head.appendChild(ogDescription);
      }
      ogDescription.content = options.ogDescription || description;
    }

    if (options.ogImage) {
      let ogImage = document.querySelector('meta[property="og:image"]');
      if (!ogImage) {
        ogImage = document.createElement('meta');
        ogImage.setAttribute('property', 'og:image');
        document.head.appendChild(ogImage);
      }
      ogImage.content = options.ogImage;
    }

    // Twitter Card meta tags
    if (options.twitterCard) {
      let twitterCard = document.querySelector('meta[name="twitter:card"]');
      if (!twitterCard) {
        twitterCard = document.createElement('meta');
        twitterCard.name = 'twitter:card';
        document.head.appendChild(twitterCard);
      }
      twitterCard.content = options.twitterCard;
    }

    // Canonical URL
    if (options.canonical) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = options.canonical;
    }

    // Schema.org structured data
    if (options.schema) {
      let existingSchema = document.querySelector('script[type="application/ld+json"]');
      if (existingSchema) {
        existingSchema.remove();
      }
      
      const schemaScript = document.createElement('script');
      schemaScript.type = 'application/ld+json';
      schemaScript.textContent = JSON.stringify(options.schema);
      document.head.appendChild(schemaScript);
    }

  }, [title, description, options]);

  // Cleanup function pour éviter les fuites mémoire
  return () => {
    // Nettoyage si nécessaire lors du démontage du composant
  };
};

export default usePageMeta;
