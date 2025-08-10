# 🚀 Shay Acoca Portfolio - Monorepo Full-Stack

Portfolio futuriste avec authentification stricte, design glassmorphisme, et intégration API complète.

## 📋 Table des Matières

- [Architecture](#architecture)
- [Technologies](#technologies)
- [Installation](#installation)
- [Configuration](#configuration)
- [Scripts Disponibles](#scripts-disponibles)
- [Endpoints API](#endpoints-api)
- [Structure du Projet](#structure-du-projet)
- [Tests](#tests)
- [Déploiement](#déploiement)

## 🏗️ Architecture

```
project-root/
├── backend/          # API Node.js/Express
├── frontend/         # React/Vite/Tailwind
├── .env.example      # Variables d'environnement
└── README.md         # Documentation
```

### Backend (Node.js/Express)
- **API REST** complète avec authentification JWT
- **MongoDB** avec Mongoose ODM
- **Sécurité** : Helmet, CORS, Rate Limiting, CSP
- **RBAC** : Contrôle d'accès basé sur les rôles
- **Validation** : Express-validator sur tous les endpoints

### Frontend (React/Vite)
- **React 18** avec hooks modernes
- **Vite** pour le build ultra-rapide
- **Tailwind CSS** pour le design système
- **Framer Motion** pour les animations
- **Lazy Loading** des composants lourds

## 🛠️ Technologies

### Backend
- Node.js 18+
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Helmet + CORS + Rate Limiting
- Express-validator
- Compression + Helmet

### Frontend
- React 18
- Vite 4+
- Tailwind CSS 3+
- Framer Motion
- Lucide React Icons
- Axios
- Recharts (lazy loaded)
- React Router DOM

### DevOps & Quality
- ESLint + Prettier
- Cypress E2E Tests
- Lighthouse CI
- Docker Ready

## 🚀 Installation

### Prérequis
- Node.js 18+
- MongoDB 6+
- Git

### 1. Cloner le Projet
```bash
git clone <repository-url>
cd project-root
```

### 2. Configuration Environnement
```bash
# Copier le fichier d'exemple
cp .env.example .env

# Éditer les variables selon votre environnement
nano .env
```

### 3. Installation Backend
```bash
cd backend
npm install
```

### 4. Installation Frontend
```bash
cd ../frontend
npm install
```

### 5. Base de Données
```bash
# Démarrer MongoDB (si local)
mongod

# Seeder la base (depuis /backend)
cd ../backend
npm run seed
```

## ⚙️ Configuration

### Variables d'Environnement Essentielles

```env
# Backend
NODE_ENV=development
PORT=5001
MONGODB_URI=mongodb://localhost:27017/shayacoca-portfolio
JWT_SECRET=your-super-secret-jwt-key
FRONTEND_URL=http://localhost:3000

# Frontend
VITE_API_URL=http://localhost:5001/api
VITE_BASE_URL=http://localhost:3000
```

Voir `.env.example` pour la configuration complète.

## 📜 Scripts Disponibles

### Backend (`/backend`)
```bash
npm start          # Production
npm run dev        # Développement avec nodemon
npm run seed       # Seeder la base de données
npm run lint       # ESLint
npm run lint:fix   # ESLint avec correction auto
npm test           # Tests unitaires
```

### Frontend (`/frontend`)
```bash
npm run dev        # Serveur de développement
npm run build      # Build de production
npm run preview    # Prévisualisation du build
npm run lint       # ESLint
npm run lint:fix   # ESLint avec correction auto
npm run test:e2e   # Tests Cypress E2E
npm run lighthouse # Audit Lighthouse
```

## 🌐 Endpoints API

### Authentication
```
POST   /api/auth/register    # Inscription
POST   /api/auth/login       # Connexion
POST   /api/auth/logout      # Déconnexion
GET    /api/auth/me          # Profil utilisateur
PUT    /api/auth/profile     # Mise à jour profil
```

### Projects
```
GET    /api/projects         # Liste projets (public)
POST   /api/projects         # Créer projet (admin)
GET    /api/projects/:id     # Détail projet
PUT    /api/projects/:id     # Modifier projet (admin)
DELETE /api/projects/:id     # Supprimer projet (admin)
POST   /api/projects/:id/like # Liker projet
```

### Blog
```
GET    /api/blog             # Liste articles
POST   /api/blog             # Créer article (admin)
GET    /api/blog/:id         # Détail article
PUT    /api/blog/:id         # Modifier article (admin)
DELETE /api/blog/:id         # Supprimer article (admin)
```

### Skills
```
GET    /api/skills           # Liste compétences
POST   /api/skills           # Créer compétence (admin)
PUT    /api/skills/:id       # Modifier compétence (admin)
DELETE /api/skills/:id       # Supprimer compétence (admin)
```

### Contact & PDF
```
POST   /api/contact          # Formulaire contact
POST   /api/pdf/generate     # Génération PDF simulateur
```

## 📁 Structure du Projet

```
project-root/
├── backend/
│   ├── controllers/          # Logique métier
│   ├── middleware/           # Middlewares (auth, rbac, security)
│   ├── models/              # Modèles Mongoose
│   ├── routes/              # Routes Express
│   ├── utils/               # Utilitaires
│   ├── seeds/               # Données d'exemple
│   └── server.js            # Point d'entrée
├── frontend/
│   ├── public/              # Assets statiques
│   ├── src/
│   │   ├── api/             # Services API
│   │   ├── components/      # Composants réutilisables
│   │   ├── contexts/        # Contexts React
│   │   ├── pages/           # Pages principales
│   │   ├── styles/          # Styles globaux
│   │   └── main.jsx         # Point d'entrée
│   ├── cypress/             # Tests E2E
│   └── dist/                # Build de production
└── .env.example             # Template environnement
```

## 🧪 Tests

### Tests E2E avec Cypress
```bash
cd frontend

# Interface graphique
npm run cypress:open

# Mode headless
npm run test:e2e

# Tests spécifiques
npx cypress run --spec "cypress/e2e/auth-flow.cy.js"
```

### Couverture des Tests
- ✅ Flow CGU → Auth → Home
- ✅ Protection RBAC Admin
- ✅ CRUD Projets protégé
- ✅ Simulateur → PDF
- ✅ Rendu des Charts
- ✅ Navigation responsive

## 📊 Lighthouse & Performance

### Objectifs de Performance
- **Performance** : ≥ 90
- **Accessibility** : ≥ 95
- **Best Practices** : ≥ 95
- **SEO** : ≥ 95

### Optimisations Implémentées
- Lazy loading des composants lourds
- Code splitting automatique
- Images optimisées avec `loading="lazy"`
- CSP et headers de sécurité
- Compression gzip
- Cache stratégique

## 🚢 Déploiement

### Développement
```bash
# Terminal 1 : Backend
cd backend && npm run dev

# Terminal 2 : Frontend  
cd frontend && npm run dev

# Accès : http://localhost:3000
```

### Production
```bash
# Build frontend
cd frontend && npm run build

# Démarrer backend
cd backend && npm start

# Servir le frontend (nginx, Apache, ou serveur statique)
```

### Docker (Optionnel)
```bash
# À venir : docker-compose.yml
docker-compose up -d
```

## 🔐 Sécurité

### 🛡️ Mesures de Sécurité Implémentées

#### 🔐 Authentification
- **Mots de passe sécurisés** : Regex strict (≥8 chars, ≥1 maj, ≥1 min, ≥4 chiffres, ≥1 spécial)
- **Hachage bcrypt** : Salt rounds = 12
- **JWT sécurisé** : Tokens avec expiration courte (24h)
- **Auto-logout** : Déconnexion automatique sur expiration
- **Stockage minimal** : Seul le token JWT en localStorage

#### 🚪 Contrôle d'Accès
- **RBAC strict** : User/Business/Admin avec permissions granulaires
- **Guards frontend** : RequireAuth + RequireRole
- **Middleware backend** : auth + requireRole + isOwnerOrAdmin
- **Validation ownership** : Utilisateurs ne peuvent modifier que leurs propres ressources
- **Secondary** : Purple (#8B5CF6)
- **Accent** : Cyan (#06B6D4)
- **Dark** : Gray-900 (#111827)

### Composants Stylisés
- **Glassmorphisme** avec backdrop-blur
- **Gradients** animés
- **Shadows** en relief 3D
- **Animations** Framer Motion

## 🐛 Dépannage

### Erreurs Courantes

**MongoDB Connection Failed**
```bash
# Vérifier que MongoDB est démarré
mongod --version
sudo systemctl start mongod
```

**Port Already in Use**
```bash
# Tuer le processus sur le port 5001
lsof -ti:5001 | xargs kill -9
```

**Build Errors**
```bash
# Nettoyer les caches
rm -rf node_modules package-lock.json
npm install
```

## 📞 Support

Pour toute question ou problème :
- 📧 Email : contact@shayacoca.com
- 🐛 Issues : GitHub Issues
- 📖 Docs : Ce README

---

**Créé avec ❤️ par Shay Acoca**  
*Créativité précise. Exécution rapide. Résultats mesurables.*
