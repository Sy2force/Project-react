# Backend - API de mon Portfolio

C'est la partie serveur de mon portfolio. Elle gère toute la logique métier, l'authentification et la base de données.

## Architecture

J'ai construit une API REST classique avec Node.js et Express. Rien de trop compliqué, mais solide et sécurisé.

### Structure des dossiers

- `routes/` - Toutes mes routes API organisées par fonctionnalité
- `models/` - Les modèles MongoDB avec Mongoose
- `middleware/` - Mes middlewares personnalisés (auth, validation, etc.)
- `controllers/` - La logique métier de chaque endpoint
- `utils/` - Fonctions utilitaires et helpers
- `config/` - Configuration de la DB et autres services

### Technologies utilisées

- **Node.js** - Runtime JavaScript
- **Express** - Framework web minimaliste
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB
- **JWT** - Pour l'authentification
- **bcrypt** - Pour hasher les mots de passe
- **cors** - Pour gérer les CORS
- **helmet** - Sécurité HTTP

## Installation et lancement

1. Installe les dépendances :
```bash
npm install
```

2. Configure tes variables d'environnement :
```bash
cp .env.example .env
# Puis édite le fichier .env avec tes valeurs
```

3. Lance le serveur :
```bash
npm start
```

Pour le développement avec auto-reload :
```bash
npm run dev
```

L'API sera accessible sur `http://localhost:5000`

## Variables d'environnement

Tu auras besoin de configurer :
- `MONGODB_URI` - URL de ta base MongoDB
- `JWT_SECRET` - Clé secrète pour les tokens JWT
- `PORT` - Port du serveur (5000 par défaut)
- `NODE_ENV` - Environnement (development/production)

## Routes API

### Authentification (`/api/auth`)
- `POST /register` - Créer un compte
- `POST /login` - Se connecter
- `POST /logout` - Se déconnecter
- `GET /me` - Récupérer ses infos

### Projets (`/api/projects`)
- `GET /` - Liste tous les projets
- `GET /:id` - Détails d'un projet
- `POST /` - Créer un projet (admin)
- `PUT /:id` - Modifier un projet (admin)
- `DELETE /:id` - Supprimer un projet (admin)

### Blog (`/api/blog`)
- `GET /posts` - Liste des articles
- `GET /posts/:id` - Détails d'un article
- `POST /posts` - Créer un article (admin)

### Contact (`/api/contact`)
- `POST /` - Envoyer un message

## Sécurité

J'ai mis en place plusieurs mesures de sécurité :
- Authentification JWT avec tokens sécurisés
- Hashage des mots de passe avec bcrypt
- Validation des données d'entrée
- Protection CORS
- Headers de sécurité avec Helmet
- Rate limiting pour éviter le spam

## Base de données

J'utilise MongoDB avec Mongoose. Les modèles principaux :

- **User** - Utilisateurs du site
- **Project** - Mes projets portfolio
- **BlogPost** - Articles de blog
- **Contact** - Messages de contact

## Notes techniques

- Le code suit les bonnes pratiques Node.js
- Gestion d'erreurs centralisée
- Logs structurés pour le debugging
- Validation des données avec Joi
- Tests unitaires (à venir)

## Déploiement

Pour déployer en production :
1. Configure tes variables d'env de prod
2. Lance `npm run build` si nécessaire
3. Utilise PM2 ou un process manager similaire
4. Configure un reverse proxy (nginx)

Si tu as des questions sur l'API, regarde la collection Postman dans le dossier `/postman`.
