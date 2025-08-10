const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Card = require('../models/Card');
const User = require('../models/User');
const { generateUniqueBizNumber } = require('../utils/generateBizNumber');
require('dotenv').config();

// Utilisateurs de test avec mots de passe conformes
const seedUsers = [
  {
    email: 'user@test.com',
    password: 'UserPass123!',
    role: 'user',
    firstName: 'David',
    lastName: 'Cohen'
  },
  {
    email: 'business@test.com',
    password: 'BusinessPass123!',
    role: 'business',
    firstName: 'Sarah',
    lastName: 'Levy'
  },
  {
    email: 'admin@test.com',
    password: 'AdminPass123!',
    role: 'admin',
    firstName: 'Michael',
    lastName: 'Goldstein'
  }
];

// Cartes business réalistes d'Israël
const sampleCards = [
  {
    title: "Hummus Abu Hassan",
    subtitle: "Le meilleur hummus de Jaffa",
    description: "Restaurant familial servant le hummus le plus authentique de Tel Aviv depuis 1979. Recette traditionnelle transmise de génération en génération. Ouvert du dimanche au jeudi, fermé le vendredi.",
    phone: "03-681-9115",
    email: "info@hummushasan.co.il",
    webUrl: "https://hummushasan.co.il",
    address: "1 HaDolphin Street, Jaffa, Tel Aviv, Israel",
    location: {
      lat: 32.0546,
      lng: 34.7506
    },
    image: "https://images.unsplash.com/photo-1571197119282-7c4e0d3b4b1e?w=400"
  },
  {
    title: "Start-Up Nation Central",
    subtitle: "Innovation Hub Tel Aviv",
    description: "Centre d'innovation technologique au cœur de Tel Aviv. Nous connectons les startups israéliennes avec les investisseurs internationaux. Espace de coworking, événements networking, accompagnement entrepreneurial.",
    phone: "03-624-0100",
    email: "hello@startupnationcentral.org",
    webUrl: "https://startupnationcentral.org",
    address: "28 Rothschild Blvd, Tel Aviv, Israel",
    location: {
      lat: 32.0668,
      lng: 34.7647
    },
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400"
  },
  {
    title: "Tmol Shilshom Café",
    subtitle: "Librairie-café historique de Jérusalem",
    description: "Café littéraire légendaire de Jérusalem depuis 1994. Ambiance bohème, livres en hébreu et anglais, événements culturels. Situé dans le quartier de Nahalat Shiva, parfait pour les écrivains et intellectuels.",
    phone: "02-623-2758",
    email: "info@tmol-shilshom.co.il",
    webUrl: "https://tmol-shilshom.co.il",
    address: "5 Yoel Moshe Salomon Street, Jerusalem, Israel",
    location: {
      lat: 31.7857,
      lng: 35.2007
    },
    image: "https://images.unsplash.com/photo-1481833761820-0509d3217039?w=400"
  },
  {
    title: "Bauhaus Center Tel Aviv",
    subtitle: "Architecture et design Bauhaus",
    description: "Centre dédié à l'architecture Bauhaus de Tel Aviv, ville UNESCO. Visites guidées, expositions, boutique de design. Découvrez l'héritage architectural unique de la Ville Blanche.",
    phone: "03-522-0249",
    email: "info@bauhaus-center.com",
    webUrl: "https://bauhaus-center.com",
    address: "99 Dizengoff Street, Tel Aviv, Israel",
    location: {
      lat: 32.0853,
      lng: 34.7818
    },
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400"
  },
  {
    title: "Gordon Beach Fitness",
    subtitle: "Sport et bien-être face à la mer",
    description: "Salle de sport moderne face à la plage Gordon. Équipements de pointe, cours de yoga sur la plage, personal training. Vue mer exceptionnelle, vestiaires avec douches, parking proche.",
    phone: "03-527-1234",
    email: "info@gordonbeachfitness.co.il",
    webUrl: "https://gordonbeachfitness.co.il",
    address: "14 Eliezer Peri Street, Tel Aviv, Israel",
    location: {
      lat: 32.0879,
      lng: 34.7719
    },
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400"
  },
  {
    title: "Carmel Market Spices",
    subtitle: "Épices et saveurs du Moyen-Orient",
    description: "Stand familial au marché du Carmel depuis 1950. Épices fraîches, mélanges traditionnels, za'atar maison, sumac, baharat. Conseils culinaires et recettes authentiques inclus.",
    phone: "054-987-6543",
    email: "spices@carmelmarket.co.il",
    address: "Carmel Market, Allenby Street, Tel Aviv, Israel",
    location: {
      lat: 32.0644,
      lng: 34.7736
    },
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400"
  },
  {
    title: "Haifa Port Gallery",
    subtitle: "Art contemporain méditerranéen",
    description: "Galerie d'art contemporain dans le port de Haïfa. Expositions d'artistes israéliens et internationaux, sculptures, peintures, installations. Vue panoramique sur la baie de Haïfa.",
    phone: "04-851-2345",
    email: "gallery@haifaport.co.il",
    webUrl: "https://haifaportgallery.co.il",
    address: "Port of Haifa, Haifa, Israel",
    location: {
      lat: 32.8191,
      lng: 34.9983
    },
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400"
  },
  {
    title: "Dead Sea Wellness Spa",
    subtitle: "Détente et soins thérapeutiques",
    description: "Spa luxueux au bord de la mer Morte. Soins aux minéraux, bains de boue thérapeutique, massages relaxants. Expérience unique de flottaison et bienfaits pour la peau.",
    phone: "08-659-4444",
    email: "spa@deadsea-wellness.co.il",
    webUrl: "https://deadsea-wellness.co.il",
    address: "Ein Bokek, Dead Sea, Israel"
  },
  {
    title: "Jerusalem Stone Workshop",
    subtitle: "Artisanat traditionnel de Jérusalem",
    description: "Atelier d'artisanat spécialisé dans la pierre de Jérusalem. Sculptures, objets décoratifs, souvenirs authentiques. Démonstrations d'artisans, ateliers pour visiteurs, pièces sur mesure.",
    phone: "02-628-7890",
    email: "workshop@jerusalemstone.co.il",
    webUrl: "https://jerusalemstone.co.il",
    address: "15 Christian Quarter Road, Jerusalem, Israel"
  },
  {
    title: "Eilat Diving Center",
    subtitle: "Plongée en mer Rouge",
    description: "Centre de plongée professionnel à Eilat. Formations PADI, sorties récifs coralliens, plongée nocturne. Équipement moderne, instructeurs certifiés, découverte de la faune marine unique de la mer Rouge.",
    phone: "08-637-7777",
    email: "dive@eilatdiving.co.il",
    webUrl: "https://eilatdiving.co.il",
    address: "Coral Beach, Eilat, Israel"
  }
];

const seedCards = async () => {
  try {
    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/shay-portfolio');
    console.log('✅ Connexion MongoDB établie');

    // Nettoyer les données existantes
    await Card.deleteMany({});
    await User.deleteMany({});
    console.log('🗑️  Données existantes supprimées');

    // Créer les utilisateurs de test
    const createdUsers = [];
    for (const userData of seedUsers) {
      const hashedPassword = await bcrypt.hash(userData.password, 12);
      const user = new User({
        email: userData.email,
        passwordHash: hashedPassword,
        role: userData.role,
        firstName: userData.firstName,
        lastName: userData.lastName,
        favorites: [] // Initialiser le tableau des favoris
      });
      const savedUser = await user.save();
      createdUsers.push(savedUser);
      console.log(`👤 Utilisateur ${userData.role} créé: ${userData.email}`);
    }

    // Trouver l'utilisateur business pour les cartes
    const businessUser = createdUsers.find(user => user.role === 'business');
    const regularUser = createdUsers.find(user => user.role === 'user');

    // Créer les cartes avec des numéros business uniques
    const cardsToCreate = [];
    
    for (const cardData of sampleCards) {
      const bizNumber = await generateUniqueBizNumber();
      cardsToCreate.push({
        ...cardData,
        bizNumber,
        userId: businessUser._id
      });
    }

    // Insérer les cartes
    const createdCards = await Card.insertMany(cardsToCreate);
    console.log(`✅ ${createdCards.length} cartes créées avec succès`);

    // Ajouter 2-3 favoris au user régulier
    const favoriteCards = createdCards.slice(0, 3); // Prendre les 3 premières cartes
    regularUser.favorites = favoriteCards.map(card => card._id);
    await regularUser.save();
    console.log(`❤️  ${favoriteCards.length} favoris ajoutés à l'utilisateur regular`);

    // Afficher le résumé
    console.log('\n📊 RÉSUMÉ DU SEED:');
    console.log('==================');
    console.log('👥 Utilisateurs créés:');
    createdUsers.forEach(user => {
      console.log(`   • ${user.email} (${user.role}) - Mot de passe: ${seedUsers.find(u => u.email === user.email).password}`);
    });
    
    console.log('\n🏢 Cartes business créées:');
    createdCards.forEach((card, index) => {
      const location = card.location ? ` (${card.address})` : ' (sans localisation)';
      console.log(`   ${index + 1}. ${card.title} - Biz#${card.bizNumber}${location}`);
    });
    
    console.log('\n❤️  Favoris ajoutés:');
    favoriteCards.forEach((card, index) => {
      console.log(`   ${index + 1}. ${card.title}`);
    });

    console.log('\n🎉 Seed terminé avec succès!');
    console.log('\n🔐 COMPTES DE TEST:');
    console.log('===================');
    console.log('User:     user@test.com / UserPass123!');
    console.log('Business: business@test.com / BusinessPass123!');
    console.log('Admin:    admin@test.com / AdminPass123!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors du seed:', error);
    process.exit(1);
  }
};

// Exécuter le seed si appelé directement
if (require.main === module) {
  seedCards();
}

module.exports = seedCards;
