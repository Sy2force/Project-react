import React from 'react';
import { Star, Users, TrendingUp, Zap, Mail, Phone, MapPin } from 'lucide-react';
import {
  GlassPanel,
  GlassCard,
  GlassButton,
  GlassInput,
  KPIStrip,
  LogoGrid,
  FeatureCard,
  MediaGallery,
  DataTable,
  FrameGlow,
  CardFrame,
  ContactSplit,
  CardForm
} from './index';

/**
 * GlassKitExamples - Page de démonstration du Kit de blocs GLASS
 * Utilisez cette page comme référence pour l'implémentation
 */
const GlassKitExamples = () => {
  // Données d'exemple pour les composants
  const kpiData = [
    { label: 'Projets Réalisés', value: '150+', icon: <Star size={24} />, color: 'primary' },
    { label: 'Clients Satisfaits', value: '98%', icon: <Users size={24} />, color: 'accent' },
    { label: 'Croissance', value: '+45%', icon: <TrendingUp size={24} />, color: 'neon' },
    { label: 'Performance', value: '99.9%', icon: <Zap size={24} />, color: 'success' }
  ];

  const logoData = [
    { src: '/api/placeholder/120/60', alt: 'Logo 1', name: 'Company A' },
    { src: '/api/placeholder/120/60', alt: 'Logo 2', name: 'Company B' },
    { src: '/api/placeholder/120/60', alt: 'Logo 3', name: 'Company C' },
    { src: '/api/placeholder/120/60', alt: 'Logo 4', name: 'Company D' }
  ];

  const galleryData = [
    { src: '/api/placeholder/400/300', alt: 'Image 1', title: 'Projet Web Design' },
    { src: '/api/placeholder/400/300', alt: 'Image 2', title: 'Application Mobile' },
    { src: '/api/placeholder/400/300', alt: 'Image 3', title: 'Dashboard Analytics' },
    { src: '/api/placeholder/400/300', alt: 'Image 4', title: 'E-commerce Platform' }
  ];

  const tableColumns = [
    { key: 'name', label: 'Nom', sortable: true },
    { key: 'role', label: 'Rôle', sortable: true },
    { key: 'status', label: 'Statut', sortable: false, render: (value) => (
      <span className={`px-2 py-1 rounded text-xs ${
        value === 'active' ? 'bg-success/20 text-success' : 'bg-warn/20 text-warn'
      }`}>
        {value === 'active' ? 'Actif' : 'Inactif'}
      </span>
    )}
  ];

  const tableData = [
    { name: 'Alice Martin', role: 'Designer', status: 'active' },
    { name: 'Bob Dupont', role: 'Développeur', status: 'active' },
    { name: 'Claire Moreau', role: 'Manager', status: 'inactive' }
  ];

  const contactInfo = {
    email: 'contact@example.com',
    phone: '+33 1 23 45 67 89',
    address: '123 Rue de la Paix, 75001 Paris'
  };

  return (
    <div className="min-h-screen page-bg p-8 space-y-12">
      <div className="max-w-7xl mx-auto">
        
        {/* En-tête */}
        <GlassCard className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Kit de Blocs GLASS
          </h1>
          <p className="text-white/70 text-lg line-clamp-2">
            Composants glassmorphiques réutilisables pour un design moderne et cohérent
          </p>
        </GlassCard>

        {/* KPI Strip */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">KPI Strip</h2>
          <KPIStrip kpis={kpiData} />
        </section>

        {/* Cartes de fonctionnalités */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Feature Cards</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Star size={24} />}
              title="Design Excellence"
              description="Créations visuelles exceptionnelles avec attention aux détails"
              features={['UI/UX Design', 'Prototypage', 'Design System']}
              color="primary"
            />
            <FeatureCard
              icon={<Zap size={24} />}
              title="Performance Optimale"
              description="Solutions techniques rapides et efficaces"
              features={['Code optimisé', 'SEO avancé', 'Performance web']}
              color="neon"
            />
            <FeatureCard
              icon={<Users size={24} />}
              title="Collaboration"
              description="Travail d'équipe et communication transparente"
              features={['Gestion projet', 'Support client', 'Formation']}
              color="accent"
            />
          </div>
        </section>

        {/* Logo Grid */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Logo Grid</h2>
          <LogoGrid logos={logoData} />
        </section>

        {/* Media Gallery */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Media Gallery</h2>
          <MediaGallery items={galleryData} />
        </section>

        {/* Data Table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Data Table</h2>
          <DataTable 
            columns={tableColumns} 
            data={tableData}
            searchable={true}
            sortable={true}
          />
        </section>

        {/* Frame Glow */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Frame Glow</h2>
          <FrameGlow color="primary" intensity="medium" animated={true}>
            <GlassCard>
              <h3 className="text-xl font-semibold text-white mb-2">
                Contenu avec Glow
              </h3>
              <p className="text-white/70 line-clamp-3">
                Ce contenu est encadré par un effet glow animé pour attirer l'attention.
              </p>
            </GlassCard>
          </FrameGlow>
        </section>

        {/* Card Frame */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Card Frame</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <CardFrame variant="default">
              <h3 className="text-lg font-semibold text-white mb-2">Cadre Standard</h3>
              <p className="text-white/70 line-clamp-2">Cadre avec bordure décorative standard.</p>
            </CardFrame>
            <CardFrame variant="neon">
              <h3 className="text-lg font-semibold text-white mb-2">Cadre Néon</h3>
              <p className="text-white/70 line-clamp-2">Cadre avec bordure néon pour plus d'impact.</p>
            </CardFrame>
          </div>
        </section>

        {/* Contact Split */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Contact Split</h2>
          <ContactSplit 
            contactInfo={contactInfo}
            onSubmit={(data) => console.log('Form submitted:', data)}
          />
        </section>

        {/* Boutons */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Glass Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <GlassButton variant="primary">Primary</GlassButton>
            <GlassButton variant="secondary">Secondary</GlassButton>
            <GlassButton variant="danger">Danger</GlassButton>
            <GlassButton variant="ghost">Ghost</GlassButton>
          </div>
        </section>

        {/* Inputs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Glass Inputs</h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
            <GlassInput label="Nom" placeholder="Votre nom" />
            <GlassInput label="Email" type="email" placeholder="votre@email.com" />
          </div>
        </section>

      </div>
    </div>
  );
};

export default GlassKitExamples;
