# 🎨 Kit de Blocs GLASS - Guide d'Utilisation Complet

## 📋 Vue d'Ensemble

Le **Kit de blocs GLASS** est un système de design glassmorphique complet pour React, offrant des composants réutilisables, modernes et accessibles. Il remplace l'ancien système UI Kit avec une approche plus cohérente et flexible.

## 🚀 Installation & Import

```jsx
// Import des composants individuels
import { GlassCard, GlassButton, KPIStrip } from '@/components/glass';

// Import de tous les composants
import * as Glass from '@/components/glass';
```

## 🧩 Composants Disponibles

### **Composants de Base**

#### **GlassPanel**
Composant de base pour tous les panneaux glassmorphiques.

```jsx
<GlassPanel hover={true} glow={false} className="p-6">
  <p>Contenu du panneau</p>
</GlassPanel>
```

**Props:**
- `hover` (boolean): Active les effets hover
- `glow` (boolean): Active l'effet glow
- `animation` (object): Configuration Framer Motion

#### **GlassCard**
Carte glassmorphique avec padding et effets hover.

```jsx
<GlassCard size="md" hover={true} glow={false}>
  <h3>Titre de la carte</h3>
  <p>Description...</p>
</GlassCard>
```

**Props:**
- `size` ('sm' | 'md' | 'lg'): Taille du padding
- `hover` (boolean): Active les effets hover
- `glow` (boolean): Active l'effet glow

#### **GlassButton**
Bouton glassmorphique avec variantes et états.

```jsx
<GlassButton 
  variant="primary" 
  size="md" 
  onClick={handleClick}
  disabled={false}
>
  <Icon className="w-5 h-5 mr-2" />
  Texte du bouton
</GlassButton>
```

**Variantes:**
- `primary`: Bouton principal (bleu)
- `secondary`: Bouton secondaire (transparent)
- `danger`: Bouton de danger (rouge)
- `ghost`: Bouton fantôme (transparent)

**Tailles:**
- `sm`: Petit (h-9)
- `md`: Moyen (h-11)
- `lg`: Grand (h-12)

#### **GlassInput**
Input glassmorphique avec validation et états.

```jsx
<GlassInput
  label="Email"
  type="email"
  placeholder="votre@email.com"
  value={email}
  onChange={setEmail}
  error={!!errors.email}
  errorMessage={errors.email}
/>
```

### **Composants Avancés**

#### **KPIStrip**
Bande de KPI avec métriques animées.

```jsx
const kpis = [
  { 
    label: 'Projets Réalisés', 
    value: '150+', 
    icon: <Star size={24} />, 
    color: 'primary' 
  }
];

<KPIStrip kpis={kpis} />
```

#### **LogoGrid**
Grille de logos avec effets hover.

```jsx
const logos = [
  { src: '/logo1.png', alt: 'Logo 1', name: 'Company A' }
];

<LogoGrid logos={logos} marquee={false} />
```

#### **FeatureCard**
Carte de fonctionnalité avec icône et description.

```jsx
<FeatureCard
  icon={<Code size={24} />}
  title="Développement Web"
  description="Applications modernes avec React"
  features={['React', 'Node.js', 'MongoDB']}
  color="primary"
/>
```

#### **MediaGallery**
Galerie média avec lightbox.

```jsx
const items = [
  { src: '/image1.jpg', alt: 'Image 1', title: 'Projet 1' }
];

<MediaGallery items={items} lightbox={true} />
```

#### **DataTable**
Tableau de données avec tri et recherche.

```jsx
const columns = [
  { key: 'name', label: 'Nom', sortable: true },
  { key: 'role', label: 'Rôle', sortable: false }
];

const data = [
  { name: 'Alice', role: 'Designer' }
];

<DataTable 
  columns={columns} 
  data={data} 
  searchable={true}
  sortable={true}
/>
```

### **Composants Décoratifs**

#### **FrameGlow**
Cadre décoratif avec effet glow animé.

```jsx
<FrameGlow color="primary" intensity="medium" animated={true}>
  <GlassCard>Contenu avec glow</GlassCard>
</FrameGlow>
```

#### **CardFrame**
Cadre de carte avec bordure décorative.

```jsx
<CardFrame variant="neon" hover={true}>
  <p>Contenu encadré</p>
</CardFrame>
```

### **Composants Formulaires**

#### **ContactSplit**
Section contact avec informations et formulaire.

```jsx
const contactInfo = {
  email: 'contact@example.com',
  phone: '+33 1 23 45 67 89',
  address: '123 Rue de la Paix, Paris'
};

<ContactSplit 
  contactInfo={contactInfo}
  onSubmit={handleSubmit}
  loading={isLoading}
/>
```

#### **CardForm**
Formulaire de création/édition de carte.

```jsx
<CardForm
  title="Nouvelle carte"
  initialData={cardData}
  onSubmit={handleSubmit}
  onCancel={handleCancel}
  loading={isLoading}
/>
```

## 🎨 Classes CSS Utilitaires

### **Classes Glass**
```css
.glass-panel     /* Panneau glassmorphique de base */
.glass-card      /* Carte avec padding et hover */
.glass-button    /* Bouton glassmorphique */
.glass-input     /* Input glassmorphique */
```

### **Classes d'Effets**
```css
.text-glow       /* Effet glow sur le texte */
.border-glow     /* Bordure avec glow */
.focus-glow      /* Glow au focus */
.hover-lift      /* Élévation au hover */
.active-press    /* Effet de pression au clic */
```

### **Classes Anti-Overflow**
```css
.line-clamp-1    /* Limite à 1 ligne */
.line-clamp-2    /* Limite à 2 lignes */
.line-clamp-3    /* Limite à 3 lignes */
.line-clamp-4    /* Limite à 4 lignes */
.break-words     /* Césure des mots */
.object-cover    /* Image cover */
.object-contain  /* Image contain */
```

## 🔧 Configuration Tailwind

Les tokens de couleurs et effets sont configurés dans `tailwind.config.js`:

```js
colors: {
  ink: '#0e1117',
  panel: '#121826',
  line: '#1f2430',
  primary: '#60a5fa',
  accent: '#8b5cf6',
  neon: '#22d3ee',
  success: '#10b981',
  warn: '#f59e0b',
  danger: '#ef4444',
  muted: '#94a3b8'
}
```

## 📱 Responsive Design

Tous les composants sont responsive par défaut avec des breakpoints:
- `sm`: 640px+
- `md`: 768px+
- `lg`: 1024px+
- `xl`: 1280px+

## ♿ Accessibilité

### **Focus Visible**
Tous les éléments interactifs ont des états focus visibles:
```jsx
<GlassButton className="focus-visible">
  Bouton accessible
</GlassButton>
```

### **ARIA Labels**
Les composants incluent les attributs ARIA appropriés:
```jsx
<GlassInput 
  label="Email" 
  aria-describedby="email-error"
  aria-invalid={hasError}
/>
```

### **Contraste**
Les couleurs respectent les standards WCAG AA avec un contraste minimum de 4.5:1.

## 🚀 Exemples d'Utilisation

### **Page d'Accueil Moderne**
```jsx
import { 
  GlassCard, 
  GlassButton, 
  KPIStrip, 
  FeatureCard,
  FrameGlow 
} from '@/components/glass';

const HomePage = () => {
  const kpis = [
    { label: 'Projets', value: '150+', icon: <Star />, color: 'primary' }
  ];

  return (
    <div className="space-y-16">
      {/* Hero avec FrameGlow */}
      <FrameGlow color="primary" animated={true}>
        <GlassCard size="lg" className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Bienvenue
          </h1>
          <GlassButton variant="primary" size="lg">
            Commencer
          </GlassButton>
        </GlassCard>
      </FrameGlow>

      {/* KPI */}
      <KPIStrip kpis={kpis} />

      {/* Services */}
      <div className="grid md:grid-cols-3 gap-6">
        <FeatureCard
          icon={<Code />}
          title="Développement"
          description="Solutions techniques modernes"
          color="primary"
        />
      </div>
    </div>
  );
};
```

### **Formulaire de Contact**
```jsx
import { ContactSplit } from '@/components/glass';

const ContactPage = () => {
  const contactInfo = {
    email: 'contact@example.com',
    phone: '+33 1 23 45 67 89',
    address: 'Paris, France'
  };

  const handleSubmit = (data) => {
    console.log('Form data:', data);
    // Logique d'envoi
  };

  return (
    <ContactSplit 
      contactInfo={contactInfo}
      onSubmit={handleSubmit}
    />
  );
};
```

## 🔍 Tests & Validation

### **Tests Manuels**
1. **Responsive**: Tester sur mobile, tablette, desktop
2. **Accessibilité**: Navigation clavier, lecteurs d'écran
3. **Performance**: Temps de chargement, animations fluides
4. **Overflow**: Vérifier line-clamp et break-words

### **Checklist d'Intégration**
- [ ] Tous les CTA utilisent GlassButton
- [ ] Images avec object-cover et alt
- [ ] Textes avec line-clamp approprié
- [ ] Focus visible sur tous les éléments interactifs
- [ ] Responsive testé sur tous breakpoints
- [ ] Aucun overflow de texte ou d'images

## 🎯 Bonnes Pratiques

### **Performance**
- Utiliser lazy loading pour MediaGallery
- Précharger les routes critiques
- Optimiser les images (WebP, tailles multiples)

### **UX**
- Animations respectant prefers-reduced-motion
- Feedback visuel sur toutes les interactions
- Messages d'erreur clairs et utiles

### **Maintenance**
- Composants réutilisables et modulaires
- Props typées et documentées
- Tests unitaires pour la logique métier

## 📚 Ressources

- **Démonstration**: `/glass-kit-examples`
- **Page test**: `/home-glass-kit`
- **Documentation Tailwind**: [tailwindcss.com](https://tailwindcss.com)
- **Framer Motion**: [framer.com/motion](https://framer.com/motion)

---

**Le Kit de blocs GLASS est maintenant prêt à être utilisé sur toutes vos pages pour un design moderne, cohérent et accessible !** 🎉
