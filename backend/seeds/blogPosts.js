// Seeds pour les articles de blog
export const blogPosts = [
  {
    title: "React 18 : Les nouvelles fonctionnalités qui changent tout",
    slug: "react-18-nouvelles-fonctionnalites",
    cover: "/api/placeholder/800/400",
    tags: ["React", "JavaScript", "Performance"],
    excerpt: "Découvrez les fonctionnalités révolutionnaires de React 18 : Concurrent Features, Suspense amélioré, et Automatic Batching.",
    content: `React 18 marque un tournant majeur dans l'écosystème React avec l'introduction des Concurrent Features...

## Concurrent Rendering

Le rendu concurrent permet à React d'interrompre le rendu pour traiter des tâches plus urgentes...

## Suspense pour le Data Fetching

Suspense n'est plus limité au code splitting, il gère maintenant le chargement de données...

## Automatic Batching

React 18 groupe automatiquement les mises à jour d'état pour de meilleures performances...`,
    author: {
      name: "Shay Acoca",
      avatar: "/api/placeholder/64/64"
    },
    createdAt: new Date('2024-01-20')
  },
  {
    title: "Design System : Construire une identité cohérente",
    slug: "design-system-identite-coherente",
    cover: "/api/placeholder/800/400",
    tags: ["Design", "UI/UX", "Système"],
    excerpt: "Comment créer et maintenir un design system évolutif qui unifie votre produit et accélère le développement.",
    content: `Un design system bien conçu est la colonne vertébrale de tout produit digital réussi...

## Les Fondamentaux

Couleurs, typographie, espacements : les tokens de design sont la base...

## Composants Réutilisables

Créer une bibliothèque de composants maintenable et documentée...

## Documentation Vivante

Un design system n'est utile que s'il est bien documenté et adopté...`,
    author: {
      name: "Shay Acoca",
      avatar: "/api/placeholder/64/64"
    },
    createdAt: new Date('2024-02-15')
  },
  {
    title: "Performance Web : Optimiser pour l'expérience utilisateur",
    slug: "performance-web-experience-utilisateur",
    cover: "/api/placeholder/800/400",
    tags: ["Performance", "Web", "UX"],
    excerpt: "Techniques avancées d'optimisation pour créer des applications web ultra-rapides et une expérience utilisateur exceptionnelle.",
    content: `La performance web n'est pas qu'une question technique, c'est un enjeu business crucial...

## Core Web Vitals

LCP, FID, CLS : comprendre et optimiser les métriques qui comptent...

## Lazy Loading Intelligent

Charger le contenu au bon moment pour une expérience fluide...

## Optimisation des Images

WebP, AVIF, et techniques de compression moderne...`,
    author: {
      name: "Shay Acoca",
      avatar: "/api/placeholder/64/64"
    },
    createdAt: new Date('2024-03-05')
  }
]
