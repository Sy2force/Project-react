# 🤝 Guide de Contribution

Merci de votre intérêt pour contribuer au Portfolio React ! Ce guide vous aidera à contribuer efficacement au projet.

## 📋 Table des Matières

- [Code de Conduite](#code-de-conduite)
- [Comment Contribuer](#comment-contribuer)
- [Standards de Code](#standards-de-code)
- [Process de Pull Request](#process-de-pull-request)
- [Signaler des Bugs](#signaler-des-bugs)
- [Proposer des Fonctionnalités](#proposer-des-fonctionnalités)

## 📜 Code de Conduite

Ce projet adhère au [Code de Conduite Contributor Covenant](https://www.contributor-covenant.org/). En participant, vous acceptez de respecter ce code.

## 🚀 Comment Contribuer

### 1. Fork et Clone
```bash
# Fork le repo sur GitHub, puis :
git clone https://github.com/VOTRE-USERNAME/Project-react.git
cd Project-react/project-root
```

### 2. Créer une Branche
```bash
git checkout -b feature/nom-de-votre-feature
# ou
git checkout -b fix/nom-du-bug
```

### 3. Développer
- Suivez les [standards de code](#standards-de-code)
- Testez vos modifications
- Ajoutez des tests si nécessaire

### 4. Commit
```bash
git add .
git commit -m "feat: description de votre fonctionnalité"
```

### 5. Push et Pull Request
```bash
git push origin feature/nom-de-votre-feature
```
Puis créez une Pull Request sur GitHub.

## 📏 Standards de Code

### Frontend (React)
- **ES6+** et syntaxe moderne
- **Hooks** plutôt que les classes
- **Composants fonctionnels** avec JSX
- **Props destructuring**
- **Nommage camelCase** pour les variables
- **PascalCase** pour les composants

```jsx
// ✅ Bon
const UserProfile = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <div className="user-profile">
      {/* contenu */}
    </div>
  );
};

// ❌ Éviter
class UserProfile extends Component {
  constructor(props) {
    // ...
  }
}
```

### Backend (Node.js)
- **ES6 modules** (import/export)
- **Async/await** plutôt que les callbacks
- **Validation** des données d'entrée
- **Gestion d'erreurs** appropriée
- **Middleware** pour la logique commune

```javascript
// ✅ Bon
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
```

### Style et Format
- **Indentation** : 2 espaces
- **Quotes** : Simple quotes pour JS, double pour JSX
- **Semicolons** : Obligatoires
- **Trailing commas** : Oui pour les objets/arrays multi-lignes

## 🔄 Process de Pull Request

### Checklist PR
- [ ] Le code suit les standards du projet
- [ ] Les tests passent
- [ ] La documentation est mise à jour si nécessaire
- [ ] Les commits sont clairs et descriptifs
- [ ] Pas de conflits avec la branche main

### Template PR
```markdown
## Description
Brève description des changements

## Type de changement
- [ ] Bug fix
- [ ] Nouvelle fonctionnalité
- [ ] Breaking change
- [ ] Documentation

## Tests
- [ ] Tests unitaires ajoutés/mis à jour
- [ ] Tests manuels effectués

## Screenshots (si applicable)
```

## 🐛 Signaler des Bugs

Utilisez le template d'issue GitHub :

```markdown
**Description du Bug**
Description claire du problème

**Étapes pour Reproduire**
1. Aller sur '...'
2. Cliquer sur '...'
3. Voir l'erreur

**Comportement Attendu**
Ce qui devrait se passer

**Screenshots**
Si applicable

**Environnement**
- OS: [e.g. macOS]
- Navigateur: [e.g. Chrome]
- Version: [e.g. 22]
```

## 💡 Proposer des Fonctionnalités

### Template Feature Request
```markdown
**Problème à Résoudre**
Description du problème actuel

**Solution Proposée**
Description de la solution souhaitée

**Alternatives Considérées**
Autres solutions envisagées

**Contexte Additionnel**
Toute information supplémentaire
```

## 🏷️ Convention de Commits

Utilisez [Conventional Commits](https://www.conventionalcommits.org/) :

- `feat:` nouvelle fonctionnalité
- `fix:` correction de bug
- `docs:` documentation
- `style:` formatage, pas de changement de code
- `refactor:` refactoring du code
- `test:` ajout/modification de tests
- `chore:` tâches de maintenance

Exemples :
```bash
feat: add user authentication system
fix: resolve navbar mobile menu issue
docs: update API documentation
style: format code with prettier
refactor: optimize database queries
test: add unit tests for user service
chore: update dependencies
```

## 🧪 Tests

### Frontend
```bash
cd frontend
npm test
```

### Backend
```bash
cd backend
npm test
```

### Tests E2E
```bash
npm run test:e2e
```

## 📚 Documentation

- Documentez les nouvelles fonctionnalités
- Mettez à jour le README si nécessaire
- Ajoutez des commentaires pour le code complexe
- Utilisez JSDoc pour les fonctions importantes

## 🎯 Bonnes Pratiques

### Performance
- Optimisez les images
- Utilisez le lazy loading
- Minimisez les re-renders React
- Optimisez les requêtes DB

### Sécurité
- Validez toutes les entrées
- Sanitisez les données
- Utilisez HTTPS
- Implémentez le rate limiting

### Accessibilité
- Utilisez les balises sémantiques
- Ajoutez les attributs alt
- Testez avec un lecteur d'écran
- Respectez les contrastes

## 📞 Support

- **Issues GitHub** : Pour les bugs et features
- **Discussions** : Pour les questions générales
- **Email** : [votre-email@example.com]

## 🙏 Remerciements

Merci à tous les contributeurs qui rendent ce projet possible !

---

**Happy Coding! 🚀**
