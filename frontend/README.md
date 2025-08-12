# Frontend - Mon Portfolio React

Voici la partie frontend de mon site portfolio. C'est là où se passe toute la magie visuelle !

## Comment ça fonctionne

J'ai utilisé React avec Vite parce que c'est plus rapide que Create React App. Le site est responsive et fonctionne bien sur tous les écrans.

### Structure des dossiers

- `src/components/` - Tous mes composants réutilisables
- `src/pages/` - Les différentes pages du site
- `src/context/` - Pour gérer l'état global (comme l'authentification)
- `src/services/` - Pour communiquer avec l'API backend
- `src/utils/` - Mes petites fonctions utiles
- `src/data/` - Les données de test et mock

### Technologies utilisées

- **React 18** - Le framework principal
- **Vite** - Pour le build et le dev server
- **Tailwind CSS** - Pour le styling (j'adore les classes utilitaires)
- **Framer Motion** - Pour les animations fluides
- **React Router** - Pour la navigation
- **Axios** - Pour les appels API

## Lancer le projet

1. Installe les dépendances :
```bash
npm install
```

2. Lance le serveur de dev :
```bash
npm run dev
```

Le site sera accessible sur `http://localhost:3000`

## Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Compile pour la production
- `npm run preview` - Prévisualise la version de prod
- `npm run lint` - Vérifie la qualité du code

## Fonctionnalités

### Pages principales
- **Accueil** - Présentation générale avec mes projets
- **Projets** - Galerie de tous mes travaux
- **Blog** - Mes articles et réflexions
- **Contact** - Formulaire pour me contacter
- **Dashboard** - Zone admin (protégée)

### Composants cool
- **AnimatedStats** - Compteurs animés qui montent progressivement
- **ErrorBoundary** - Attrape les erreurs React pour éviter les crashes
- **ProtectedRoute** - Protège les pages qui nécessitent une connexion

## Design

J'ai opté pour un design moderne avec :
- Des couleurs douces et professionnelles
- Des animations subtiles mais efficaces
- Une navigation intuitive
- Un style glassmorphism par endroits

## Notes de dev

- Le code est organisé de manière logique
- J'ai essayé de garder les composants petits et réutilisables
- Les commentaires expliquent les parties un peu complexes
- Le responsive est géré avec Tailwind

Si tu vois des trucs à améliorer, n'hésite pas à me dire !
