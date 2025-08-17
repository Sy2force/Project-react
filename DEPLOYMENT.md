# 🚀 GUIDE DE DÉPLOIEMENT - PORTFOLIO REACT V2.0

## 📋 PRÉREQUIS

### Services Externes
- **MongoDB Atlas** : Cluster configuré avec utilisateur et mot de passe
- **Cloudinary** : Compte avec API keys pour upload d'images
- **Gmail/SMTP** : Compte email avec mot de passe d'application
- **Domaine** : Nom de domaine configuré avec DNS

### Outils Requis
- Node.js 18+ 
- npm ou yarn
- Git

## 🏗️ ARCHITECTURE DE DÉPLOIEMENT

```
Frontend (Vercel/Netlify)     Backend (Railway/Render)     Database (MongoDB Atlas)
├── React + Vite              ├── Node.js + Express        ├── Users Collection
├── Tailwind CSS              ├── JWT Authentication       ├── Projects Collection  
├── Framer Motion             ├── MongoDB Connection       ├── Services Collection
└── Static Assets             └── API Routes               └── Logs Collection
```

## 🔧 CONFIGURATION BACKEND

### 1. Variables d'Environnement
Créer `.env` avec :
```bash
NODE_ENV=production
PORT=5001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio_prod
JWT_SECRET=your-super-secure-jwt-secret
FRONTEND_URL=https://your-domain.com
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 2. Déploiement Railway
```bash
# Installer Railway CLI
npm install -g @railway/cli

# Login et déployer
railway login
railway init
railway up
```

### 3. Déploiement Render
1. Connecter repository GitHub
2. Configurer variables d'environnement
3. Build command: `npm install`
4. Start command: `npm start`

## 🎨 CONFIGURATION FRONTEND

### 1. Variables d'Environnement
Créer `.env.production` avec :
```bash
VITE_API_URL=https://your-backend-domain.com/api
VITE_SITE_URL=https://your-domain.com
VITE_APP_NAME="Shay Acoca Portfolio"
VITE_GOOGLE_ANALYTICS_ID=your-ga-id
```

### 2. Déploiement Vercel
```bash
# Installer Vercel CLI
npm install -g vercel

# Déployer
vercel --prod
```

### 3. Déploiement Netlify
```bash
# Build local
npm run build

# Drag & drop dist/ sur Netlify
# Ou connecter repository GitHub
```

## 🔒 SÉCURITÉ

### SSL/HTTPS
- ✅ Certificats automatiques (Vercel/Netlify)
- ✅ CORS configuré pour domaines spécifiques
- ✅ JWT en cookies httpOnly
- ✅ Rate limiting activé

### Variables Sensibles
- ✅ Jamais committées dans Git
- ✅ Stockées dans services de déploiement
- ✅ Rotation périodique recommandée

## 📊 MONITORING

### Health Checks
- Backend: `GET /api/health`
- Frontend: Lighthouse CI
- Database: MongoDB Atlas monitoring

### Analytics
- Google Analytics configuré
- Erreurs trackées via console
- Performance monitoring actif

## 🧪 TESTS PRE-DÉPLOIEMENT

### Checklist
- [ ] Tests unitaires passent (`npm test`)
- [ ] Build frontend réussit (`npm run build`)
- [ ] Variables d'environnement configurées
- [ ] Base de données accessible
- [ ] Services externes fonctionnels
- [ ] CORS configuré correctement

### Tests Manuels
1. **Authentification** : Login/Register/Logout
2. **Rôles** : Admin/Business/User redirections
3. **API** : Tous les endpoints répondent
4. **Upload** : Images via Cloudinary
5. **Email** : Contact form fonctionnel
6. **Mobile** : Responsive design

## 🚀 DÉPLOIEMENT ÉTAPE PAR ÉTAPE

### 1. Préparer le Backend
```bash
cd backend
npm install
npm run build # si applicable
```

### 2. Déployer le Backend
```bash
# Railway
railway up

# Render
git push origin main
```

### 3. Configurer la Base de Données
- Créer cluster MongoDB Atlas
- Ajouter IP du serveur backend
- Créer utilisateur avec permissions

### 4. Préparer le Frontend
```bash
cd frontend
npm install
npm run build
```

### 5. Déployer le Frontend
```bash
# Vercel
vercel --prod

# Netlify
netlify deploy --prod --dir=dist
```

### 6. Configurer le Domaine
- Pointer DNS vers services de déploiement
- Configurer CORS avec nouveaux domaines
- Tester HTTPS

## 🔄 CI/CD (Optionnel)

### GitHub Actions
```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy Backend
        run: railway up
      - name: Deploy Frontend  
        run: vercel --prod
```

## 📈 POST-DÉPLOIEMENT

### Vérifications
- [ ] Site accessible via HTTPS
- [ ] Authentification fonctionnelle
- [ ] API endpoints répondent
- [ ] Images s'affichent correctement
- [ ] Emails envoyés
- [ ] Analytics trackent
- [ ] Performance acceptable (Lighthouse > 90)

### Maintenance
- Monitoring des logs d'erreur
- Mise à jour des dépendances
- Sauvegarde base de données
- Rotation des secrets

## 🆘 DÉPANNAGE

### Erreurs Communes
- **CORS Error** : Vérifier FRONTEND_URL dans backend
- **Database Connection** : Vérifier MONGODB_URI et IP whitelist
- **Build Fails** : Vérifier variables d'environnement
- **Images Not Loading** : Vérifier Cloudinary configuration

### Support
- Documentation MongoDB Atlas
- Support Vercel/Netlify
- Logs des services de déploiement

---

**Portfolio React V2.0 prêt pour la production ! 🎉**
