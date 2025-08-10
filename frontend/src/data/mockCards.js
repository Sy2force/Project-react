// Données de test pour les cartes business
export const mockCards = [
  {
    id: '1',
    title: 'Shay Acoca - Développeur Full-Stack',
    businessNumber: 'DEV001',
    description: 'Spécialiste React, Node.js et MongoDB. Création d\'applications web modernes et performantes.',
    category: 'Développement',
    email: 'contact@shayacoca.com',
    phone: '+972-50-123-4567',
    website: 'https://shayacoca.com',
    image: null,
    tags: ['React', 'Node.js', 'MongoDB', 'Full-Stack'],
    owner: 'user123',
    views: 156,
    likes: 23,
    createdAt: '2025-01-08T10:30:00Z'
  },
  {
    id: '2',
    title: 'Design Studio Creative',
    businessNumber: 'DES002',
    description: 'Studio de design spécialisé en UI/UX et identité visuelle pour startups et PME.',
    category: 'Design',
    email: 'hello@designstudio.com',
    phone: '+33-1-23-45-67-89',
    website: 'https://designstudio.com',
    image: null,
    tags: ['UI/UX', 'Branding', 'Figma', 'Adobe'],
    owner: 'user456',
    views: 89,
    likes: 12,
    createdAt: '2025-01-07T14:20:00Z'
  },
  {
    id: '3',
    title: 'TechConsult Solutions',
    businessNumber: 'TCH003',
    description: 'Conseil en transformation digitale et optimisation des processus métier.',
    category: 'Consulting',
    email: 'info@techconsult.fr',
    phone: '+33-6-78-90-12-34',
    website: 'https://techconsult.fr',
    image: null,
    tags: ['Consulting', 'Digital', 'Process', 'Strategy'],
    owner: 'user789',
    views: 234,
    likes: 45,
    createdAt: '2025-01-06T09:15:00Z'
  }
]

// Fonction pour simuler l'API en développement
export const getMockCards = (params = {}) => {
  const { limit = 10, sort = '-createdAt' } = params
  
  let sortedCards = [...mockCards]
  
  // Tri
  if (sort === '-createdAt') {
    sortedCards.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  } else if (sort === 'createdAt') {
    sortedCards.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
  }
  
  // Limite
  const limitedCards = sortedCards.slice(0, limit)
  
  return {
    success: true,
    data: {
      cards: limitedCards,
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: limitedCards.length,
        itemsPerPage: limit,
        hasNextPage: false,
        hasPrevPage: false
      }
    }
  }
}
