import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Données de test pour le projet
  useEffect(() => {
    // Simulation d'un appel API
    setTimeout(() => {
      const mockProject = {
        id: parseInt(id),
        title: "E-commerce Platform",
        description: "Une plateforme e-commerce moderne et responsive avec toutes les fonctionnalités essentielles",
        fullDescription: `Ce projet représente une solution e-commerce complète développée avec les dernières technologies web. 
        La plateforme offre une expérience utilisateur exceptionnelle avec un design moderne et des fonctionnalités avancées.
        
        Le système comprend un tableau de bord administrateur complet, un système de gestion des stocks, 
        des analyses en temps réel, et une intégration complète avec les systèmes de paiement.`,
        category: "E-commerce",
        technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
        images: [
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
          "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800",
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"
        ],
        client: "TechCorp Solutions",
        duration: "3 mois",
        budget: "15,000€",
        status: "Terminé",
        completedAt: "2024-01-15",
        features: [
          "Interface utilisateur moderne et responsive",
          "Système de panier et checkout sécurisé",
          "Gestion des stocks en temps réel",
          "Tableau de bord administrateur",
          "Intégration des paiements Stripe",
          "Système de reviews et ratings",
          "Optimisation SEO complète",
          "Analytics et rapports détaillés"
        ],
        results: {
          performance: "+150% de vitesse de chargement",
          conversion: "+45% de taux de conversion",
          users: "+200% d'utilisateurs actifs",
          revenue: "+80% de revenus mensuels"
        },
        location: {
          address: "123 Rue de la Technologie, 75001 Paris, France",
          coordinates: { lat: 48.8566, lng: 2.3522 },
          mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.3522!3d48.8566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDUxJzI0LjAiTiAywrAyMScwOC4wIkU!5e0!3m2!1sen!2sfr!4v1234567890"
        },
        testimonial: {
          text: "Excellent travail ! L'équipe a dépassé nos attentes et livré un produit de qualité exceptionnelle.",
          author: "Marie Dupont",
          position: "CEO, TechCorp Solutions",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100"
        }
      };
      
      setProject(mockProject);
      setLikeCount(Math.floor(Math.random() * 100) + 20);
      setIsLiked(Math.random() > 0.5);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: project.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papiers !');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${isDark ? 'border-white' : 'border-blue-600'}`}></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Projet non trouvé
          </h2>
          <button 
            onClick={() => navigate('/projects')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Retour aux projets
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-8`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bouton retour */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/projects')}
          className={`mb-6 flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200`}
        >
          <span>←</span>
          <span>Retour aux projets</span>
        </motion.button>

        {/* En-tête du projet */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-8 rounded-lg shadow-md mb-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div className="mb-4 lg:mb-0">
              <h1 className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {project.title}
              </h1>
              <p className="text-blue-600 font-medium">{project.category}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  isLiked 
                    ? 'bg-red-600 text-white' 
                    : isDark 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <span>{isLiked ? '❤️' : '🤍'}</span>
                <span>{likeCount}</span>
              </button>
              <button
                onClick={handleShare}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                  isDark 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                📤 Partager
              </button>
            </div>
          </div>

          {/* Informations du projet */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className={`p-4 rounded border ${isDark ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Client</p>
              <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{project.client}</p>
            </div>
            <div className={`p-4 rounded border ${isDark ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Durée</p>
              <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{project.duration}</p>
            </div>
            <div className={`p-4 rounded border ${isDark ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Budget</p>
              <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{project.budget}</p>
            </div>
            <div className={`p-4 rounded border ${isDark ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Statut</p>
              <p className="font-semibold text-green-600">{project.status}</p>
            </div>
          </div>

          <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {project.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-8">
            {/* Galerie d'images */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}
            >
              <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Aperçu du Projet 📸
              </h2>
              <div className="space-y-4">
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img
                    src={project.images[activeImageIndex]}
                    alt={`${project.title} - Image ${activeImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex space-x-2 overflow-x-auto">
                  {project.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        activeImageIndex === index 
                          ? 'border-blue-600' 
                          : 'border-transparent'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Miniature ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Description complète */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}
            >
              <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Description Détaillée 📋
              </h2>
              <div className={`prose max-w-none ${isDark ? 'prose-invert' : ''}`}>
                {project.fullDescription.split('\n').map((paragraph, index) => (
                  <p key={index} className={`mb-4 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Fonctionnalités */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}
            >
              <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Fonctionnalités Clés ⚡
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center space-x-3"
                  >
                    <span className="text-green-500">✓</span>
                    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Résultats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}
            >
              <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Résultats Obtenus 📈
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(project.results).map(([key, value], index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className={`p-4 rounded border ${isDark ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'} text-center`}
                  >
                    <p className="text-2xl font-bold text-green-600 mb-1">{value}</p>
                    <p className={`text-sm capitalize ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {key === 'performance' && 'Performance'}
                      {key === 'conversion' && 'Conversion'}
                      {key === 'users' && 'Utilisateurs'}
                      {key === 'revenue' && 'Revenus'}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Colonne latérale */}
          <div className="space-y-8">
            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}
            >
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Technologies 🛠️
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Localisation avec Google Maps */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}
            >
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Localisation 📍
              </h3>
              <div className="space-y-4">
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {project.location.address}
                </p>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src={project.location.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localisation du projet"
                  ></iframe>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200">
                  Ouvrir dans Google Maps
                </button>
              </div>
            </motion.div>

            {/* Témoignage */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}
            >
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Témoignage Client 💬
              </h3>
              <div className="space-y-4">
                <p className={`italic ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  "{project.testimonial.text}"
                </p>
                <div className="flex items-center space-x-3">
                  <img
                    src={project.testimonial.avatar}
                    alt={project.testimonial.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {project.testimonial.author}
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {project.testimonial.position}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Localisation & Contact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}
            >
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                📍 Localisation
              </h3>
              <div className="space-y-3 mb-4">
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <strong>Adresse:</strong> {project.address || "123 Rue de la Tech, Tel Aviv, Israël"}
                </p>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <strong>Téléphone:</strong> +972 3 123 4567
                </p>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <strong>Email:</strong> contact@techsolutions.co.il
                </p>
              </div>

              {/* Google Maps Mockup */}
              <div className="relative h-48 bg-gray-200 rounded-lg overflow-hidden mb-4">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-red-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-white font-bold">📍</span>
                    </div>
                    <p className="text-gray-600 font-medium">Google Maps</p>
                    <p className="text-sm text-gray-500">
                      {project.address || "123 Rue de la Tech, Tel Aviv"}
                    </p>
                  </div>
                </div>
                {/* Simulated map grid */}
                <div className="absolute inset-0 opacity-20">
                  <div className="grid grid-cols-8 grid-rows-6 h-full">
                    {Array.from({ length: 48 }).map((_, i) => (
                      <div key={i} className="border border-gray-300"></div>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
                onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(project.address || "Tel Aviv, Israel")}`, '_blank')}
              >
                Ouvrir dans Google Maps
              </button>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'} text-center`}
            >
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Intéressé par un projet similaire ?
              </h3>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 mb-3">
                Demander un Devis
              </button>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200">
                Me Contacter
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
