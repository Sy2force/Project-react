# 👥 SYSTÈME DE RÔLES - Portfolio React

## 🎯 HIÉRARCHIE DES RÔLES

```
ADMIN (Niveau 3)
├── Accès complet à toutes les fonctionnalités
├── Gestion des utilisateurs
├── Configuration système
└── Analytics avancées

BUSINESS (Niveau 2)
├── Dashboard business
├── Gestion de projets avancée
├── Rapports clients
└── Outils marketing

USER (Niveau 1)
├── Dashboard personnel
├── Consultation projets/services
├── Profil utilisateur
└── Fonctionnalités de base
```

## 🛣️ MAPPING DES ROUTES PAR RÔLE

### Routes Publiques (Tous)
| Route | Description | Accès |
|-------|-------------|-------|
| `/` | Page d'accueil | Public |
| `/login` | Connexion | Public |
| `/register` | Inscription | Public |

### Routes USER (user, business, admin)
| Route | Description | Rôles Autorisés |
|-------|-------------|-----------------|
| `/dashboard` | Tableau de bord | user, business, admin |
| `/projects` | Portfolio projets | user, business, admin |
| `/services` | Services proposés | user, business, admin |
| `/profile` | Profil utilisateur | user, business, admin |

### Routes BUSINESS (business, admin)
| Route | Description | Rôles Autorisés |
|-------|-------------|-----------------|
| `/business` | Dashboard business | business, admin |
| `/business/projects` | Gestion projets | business, admin |
| `/business/clients` | Gestion clients | business, admin |
| `/business/analytics` | Analytics business | business, admin |

### Routes ADMIN (admin uniquement)
| Route | Description | Rôles Autorisés |
|-------|-------------|-----------------|
| `/admin` | Panel administrateur | admin |
| `/admin/users` | Gestion utilisateurs | admin |
| `/admin/system` | Configuration système | admin |
| `/admin/logs` | Logs système | admin |

## 🔐 REDIRECTIONS POST-LOGIN

```javascript
const roleRedirect = {
  admin: '/admin',      // Admin → Panel admin
  business: '/business', // Business → Dashboard business
  user: '/dashboard'    // User → Dashboard personnel
};
```

## 🛡️ PERMISSIONS DÉTAILLÉES

### ADMIN
- ✅ Créer/modifier/supprimer utilisateurs
- ✅ Accéder à tous les projets
- ✅ Modifier configuration système
- ✅ Voir logs et analytics
- ✅ Gérer rôles et permissions
- ✅ Accès à toutes les routes

### BUSINESS
- ✅ Gérer ses propres projets
- ✅ Voir analytics de ses projets
- ✅ Gérer ses clients
- ✅ Créer des rapports
- ❌ Modifier autres utilisateurs
- ❌ Configuration système

### USER
- ✅ Voir projets publics
- ✅ Modifier son profil
- ✅ Consulter services
- ✅ Dashboard personnel
- ❌ Gestion projets
- ❌ Analytics avancées

## 🔄 LOGIQUE DE PROTECTION

### AuthGuard.jsx
```javascript
// Vérification hiérarchique
const rolePermissions = {
  admin: ['admin', 'business', 'user'],
  business: ['business', 'user'],
  user: ['user']
};

// Un admin peut accéder aux routes business et user
// Un business peut accéder aux routes user
// Un user ne peut accéder qu'aux routes user
```

### Exemple d'utilisation
```javascript
// Route protégée pour business et admin
<BusinessGuard>
  <BusinessDashboard />
</BusinessGuard>

// Route protégée pour admin uniquement
<AdminGuard>
  <AdminPanel />
</AdminGuard>
```

## 👤 COMPTES DE TEST

| Email | Mot de passe | Rôle | Redirection |
|-------|-------------|------|-------------|
| admin@test.com | password123 | admin | `/admin` |
| business@test.com | password123 | business | `/business` |
| user@test.com | password123 | user | `/dashboard` |
| shay@test.com | password123 | admin | `/admin` |

## 🚀 ÉVOLUTION FUTURE

### Rôles Additionnels Possibles
- **MODERATOR**: Gestion contenu, modération
- **CLIENT**: Accès limité aux projets commandés
- **GUEST**: Accès temporaire limité

### Permissions Granulaires
- Permissions par fonctionnalité
- Permissions temporaires
- Permissions par projet
- Système d'invitations

## 🔧 IMPLÉMENTATION TECHNIQUE

### Frontend
- `utils/roles.js` - Configuration rôles
- `components/AuthGuard.jsx` - Protection routes
- `services/authService.jsx` - Gestion auth

### Backend
- `models/User.js` - Rôle utilisateur
- `middleware/auth.js` - Vérification permissions
- `routes/auth.js` - Authentification

## ✅ TESTS DE RÔLES

### Scénarios à tester
1. **Login admin** → Redirection `/admin` ✅
2. **Login business** → Redirection `/business` ✅
3. **Login user** → Redirection `/dashboard` ✅
4. **Accès non autorisé** → Redirection rôle par défaut ✅
5. **Route inexistante** → Page 404 ✅

### Validation Permissions
- User tente d'accéder `/admin` → Redirection `/dashboard`
- Business tente d'accéder `/admin` → Redirection `/business`
- Non-connecté tente route protégée → Redirection `/login`
