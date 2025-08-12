# 🚀 Portfolio React Professionnel

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0+-brightgreen.svg)](https://mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> Portfolio moderne et professionnel avec design glassmorphism, animations fluides et architecture full-stack complète.

## 🎯 Aperçu du Projet

Portfolio web moderne développé avec React et Node.js, featuring un design glassmorphism élégant, des animations Framer Motion fluides, et une architecture full-stack robuste avec authentification et gestion des rôles.

### ✨ Fonctionnalités Principales

- 🎨 **Design Glassmorphism** moderne et élégant
- 🌓 **Thème Dark/Light** avec persistance
- 🔐 **Authentification complète** (JWT, rôles utilisateur)
- 📱 **Responsive Design** mobile-first
- ⚡ **Animations fluides** avec Framer Motion
- 🔍 **Recherche avancée** et filtres
- 📊 **Dashboard administrateur** complet
- 🗃️ **Base de données MongoDB** optimisée
- 🚀 **Performance optimisée** et SEO-friendly

## 🏗️ Architecture

### Frontend (Port 3001)
```
frontend/
├── src/
│   ├── components/          # Composants réutilisables
│   │   ├── NavbarAdvanced.jsx
│   │   ├── CarouselMini.jsx
│   │   └── ui/              # Composants UI de base
│   ├── pages/               # Pages principales
│   │   ├── HomeOptimized.jsx
│   │   ├── AboutOptimized.jsx
│   │   ├── ProjectsOptimized.jsx
│   │   └── LoginAdvanced.jsx
│   ├── context/             # Contextes React
│   ├── hooks/               # Hooks personnalisés
│   ├── services/            # Services API
│   └── utils/               # Utilitaires
```

### Backend (Port 5000)
```
backend/
├── routes/                  # Routes API
├── models/                  # Modèles MongoDB
├── controllers/             # Contrôleurs
├── middleware/              # Middlewares
├── services/                # Services métier
└── utils/                   # Utilitaires backend
```

## 🛠️ Technologies

### Frontend
- **React 18.3.1** - Framework UI moderne
- **Vite** - Build tool ultra-rapide
- **Framer Motion** - Animations fluides
- **React Router v7** - Navigation SPA
- **Lucide React** - Icônes modernes
- **Axios** - Client HTTP

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM MongoDB
- **JWT** - Authentification
- **Bcrypt** - Hachage des mots de passe
- **Helmet** - Sécurité HTTP
- **CORS** - Gestion des origines croisées

## 🚀 Installation et Démarrage

### Prérequis
- Node.js 18+ 
- MongoDB 7.0+
- Git

### Installation Rapide

1. **Cloner le projet**
```bash
git clone https://github.com/Sy2force/Project-react.git
cd Project-react/project-root
```

2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Configurer les variables d'environnement
npm run dev
```

3. **Frontend Setup**
```bash
cd ../frontend
npm install
npm run dev
```

### 🌐 Accès
- **Frontend** : http://localhost:3001
- **Backend API** : http://localhost:5000
- **Documentation API** : http://localhost:5000/api-docs

## 📋 Variables d'Environnement

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3001
```

## 🎨 Pages et Fonctionnalités

### Pages Principales
- **🏠 Accueil** - Hero section, stats, services, CTA
- **👤 À Propos** - Présentation, compétences, valeurs
- **💼 Projets** - Portfolio avec filtres avancés
- **📝 Blog** - Articles et actualités
- **📞 Contact** - Formulaire de contact moderne
- **🔐 Authentification** - Login/Register avancé

### Pages Utilisateur
- **👤 Profil** - Gestion du profil utilisateur
- **⭐ Favoris** - Projets favoris
- **📊 Dashboard** - Tableau de bord (admin/business)
- **🎯 Mes Cartes** - Gestion des cartes personnelles

## 🔐 Système d'Authentification

### Rôles Utilisateur
- **👤 User** - Accès de base
- **💼 Business** - Fonctionnalités étendues
- **🛡️ Admin** - Accès complet

### Sécurité
- JWT avec expiration
- Hachage bcrypt
- Protection CSRF
- Rate limiting
- Validation des données

## 📱 Design Responsive

- **Mobile First** - Optimisé pour mobile
- **Breakpoints** - sm, md, lg, xl, 2xl
- **Glassmorphism** - Design moderne et élégant
- **Animations** - Micro-interactions fluides
- **Accessibilité** - WCAG 2.1 compliant

## 🚀 Déploiement

### Production
```bash
# Frontend
npm run build
npm run preview

# Backend
npm run start
```

### Docker (Optionnel)
```bash
docker-compose up -d
```

## 📊 Performance

- **Lighthouse Score** : 95+
- **First Contentful Paint** : <1.5s
- **Largest Contentful Paint** : <2.5s
- **Cumulative Layout Shift** : <0.1

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 License

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👨‍💻 Auteur

**Shaya Coca**
- GitHub: [@Sy2force](https://github.com/Sy2force)
- Portfolio: [En ligne bientôt]

## 🙏 Remerciements

- React Team pour l'excellent framework
- Framer Motion pour les animations
- MongoDB pour la base de données
- Tous les contributeurs open source

---

⭐ **N'hésitez pas à donner une étoile si ce projet vous plaît !**

Pour faire tourner le projet chez toi :

1. Clone le repo
```bash
git clone [ton-repo]
cd project-root
```

2. Installe les dépendances du backend
```bash
cd backend
npm install
```

3. Installe les dépendances du frontend
```bash
cd ../frontend
npm install
```

4. Lance le backend
```bash
cd ../backend
npm start
```

5. Lance le frontend (dans un autre terminal)
```bash
cd frontend
npm run dev
```

Le site sera accessible sur `http://localhost:3000`

## Structure du projet

```
project-root/
├── backend/          # API et serveur
├── frontend/         # Interface React
└── postman/          # Tests API
```

## Fonctionnalités

- Page d'accueil avec mes projets
- Section blog pour mes articles
- Système de connexion/inscription
- Dashboard admin (pour moi)
- Responsive design (ça marche sur mobile)

## Notes perso

J'ai essayé de garder le code propre et bien organisé. Si tu vois des trucs bizarres ou des améliorations possibles, n'hésite pas à me faire signe !

Le design est inspiré de ce que j'aime bien - moderne mais pas trop flashy. J'ai mis l'accent sur l'expérience utilisateur.

## Contact

Si tu as des questions ou des suggestions, tu peux me contacter via le formulaire sur le site ou directement par email.

---

Fait avec ❤️ par Shay Acoca
