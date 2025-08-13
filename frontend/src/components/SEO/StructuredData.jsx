// [EXAM] Composant pour génération de données structurées JSON-LD
import { useMemo } from 'react';
import PropTypes from 'prop-types';

const StructuredData = ({ type, data }) => {
  // [EXAM] Génération des schémas JSON-LD selon le type de page
  const structuredData = useMemo(() => {
    const baseUrl = 'https://shayacoca.com';
    
    switch (type) {
      case 'WebSite':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Shay Acoca Portfolio',
          description: 'Portfolio professionnel de Shay Acoca, développeur Full Stack spécialisé en React, Node.js et solutions digitales innovantes.',
          url: baseUrl,
          author: {
            '@type': 'Person',
            name: 'Shay Acoca',
            jobTitle: 'Développeur Full Stack',
            url: baseUrl
          },
          potentialAction: {
            '@type': 'SearchAction',
            target: `${baseUrl}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string'
          }
        };

      case 'Person':
        return {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Shay Acoca',
          jobTitle: 'Développeur Full Stack',
          description: 'Développeur passionné spécialisé en React, Node.js, MongoDB et solutions web modernes.',
          url: baseUrl,
          image: `${baseUrl}/images/profile.jpg`,
          sameAs: [
            'https://github.com/shayacoca',
            'https://linkedin.com/in/shayacoca',
            'https://twitter.com/shayacoca'
          ],
          knowsAbout: [
            'React',
            'Node.js',
            'JavaScript',
            'TypeScript',
            'MongoDB',
            'Express.js',
            'Tailwind CSS',
            'Framer Motion'
          ],
          worksFor: {
            '@type': 'Organization',
            name: 'Freelance'
          },
          ...data
        };

      case 'WebPage':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: data?.title || 'Page',
          description: data?.description || '',
          url: data?.url || baseUrl,
          isPartOf: {
            '@type': 'WebSite',
            name: 'Shay Acoca Portfolio',
            url: baseUrl
          },
          author: {
            '@type': 'Person',
            name: 'Shay Acoca'
          },
          ...data
        };

      case 'Project':
        return {
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: data?.title || '',
          description: data?.description || '',
          url: data?.url || '',
          image: data?.image || '',
          author: {
            '@type': 'Person',
            name: 'Shay Acoca'
          },
          dateCreated: data?.dateCreated || '',
          programmingLanguage: data?.technologies || [],
          genre: 'Web Development',
          ...data
        };

      case 'BlogPosting':
        return {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: data?.title || '',
          description: data?.excerpt || '',
          image: data?.image || '',
          url: data?.url || '',
          datePublished: data?.datePublished || '',
          dateModified: data?.dateModified || data?.datePublished || '',
          author: {
            '@type': 'Person',
            name: 'Shay Acoca',
            url: baseUrl
          },
          publisher: {
            '@type': 'Organization',
            name: 'Shay Acoca Portfolio',
            url: baseUrl
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': data?.url || ''
          },
          wordCount: data?.wordCount || 0,
          timeRequired: data?.readTime ? `PT${data.readTime}M` : '',
          ...data
        };

      case 'Organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Shay Acoca Portfolio',
          url: baseUrl,
          logo: `${baseUrl}/logo.png`,
          description: 'Services de développement web professionnel et solutions digitales innovantes.',
          founder: {
            '@type': 'Person',
            name: 'Shay Acoca'
          },
          contactPoint: {
            '@type': 'ContactPoint',
            email: 'contact@shayacoca.com',
            contactType: 'Customer Service'
          },
          ...data
        };

      default:
        return null;
    }
  }, [type, data]);

  if (!structuredData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  );
};

StructuredData.propTypes = {
  type: PropTypes.oneOf(['WebSite', 'Person', 'WebPage', 'Project', 'BlogPosting', 'Organization']).isRequired,
  data: PropTypes.object
};

export default StructuredData;
