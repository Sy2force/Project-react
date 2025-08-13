import { useState } from 'react';
import { Link } from 'react-router-dom';

const ContactModern = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    budget: '',
    timeline: '',
    projectType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f0f23 0%, #1e1b4b 25%, #7c3aed 50%, #1e1b4b 75%, #0f0f23 100%)',
    fontFamily: 'Inter, system-ui, sans-serif',
    color: 'white',
    paddingTop: '80px'
  };

  const sectionStyle = {
    padding: '80px 20px',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '24px',
    padding: '32px',
    transition: 'all 0.3s ease'
  };

  const gradientTextStyle = {
    background: 'linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  const inputStyle = {
    width: '100%',
    padding: '16px 20px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    color: 'white',
    fontSize: '16px',
    outline: 'none',
    transition: 'all 0.3s ease'
  };

  const buttonStyle = {
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    color: 'white',
    padding: '16px 32px',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    width: '100%'
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulation d'envoi
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        budget: '',
        timeline: '',
        projectType: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email',
      value: 'shayacoca20@gmail.com',
      link: 'mailto:shayacoca20@gmail.com',
      description: 'Réponse sous 24h'
    },
    {
      icon: '📞',
      title: 'Téléphone',
      value: '053-3700551',
      link: 'tel:053-3700551',
      description: 'Lun-Ven 9h-18h'
    },
    {
      icon: '💬',
      title: 'WhatsApp',
      value: '053-3700551',
      link: 'https://wa.me/972537700551',
      description: 'Chat instantané'
    },
    {
      icon: '📍',
      title: 'Localisation',
      value: 'Jérusalem • Tel Aviv',
      link: '#',
      description: 'Israël'
    }
  ];

  const services = [
    {
      icon: '🌐',
      title: 'Développement Web',
      description: 'Sites web modernes et applications React/Vue.js',
      price: 'À partir de 2000€'
    },
    {
      icon: '📱',
      title: 'Applications Mobile',
      description: 'Apps iOS/Android avec React Native',
      price: 'À partir de 3000€'
    },
    {
      icon: '📊',
      title: 'Dashboards',
      description: 'Interfaces d\'administration et analytics',
      price: 'À partir de 1500€'
    },
    {
      icon: '🎨',
      title: 'Design UI/UX',
      description: 'Conception d\'interfaces utilisateur',
      price: 'À partir de 800€'
    }
  ];

  const faq = [
    {
      question: 'Quels sont vos délais de livraison ?',
      answer: 'Les délais varient selon la complexité : 2-4 semaines pour un site vitrine, 2-3 mois pour une application complète.'
    },
    {
      question: 'Proposez-vous de la maintenance ?',
      answer: 'Oui, je propose des contrats de maintenance avec mises à jour, sauvegardes et support technique.'
    },
    {
      question: 'Travaillez-vous avec des équipes ?',
      answer: 'Absolument ! Je collabore régulièrement avec des designers, chefs de projet et autres développeurs.'
    },
    {
      question: 'Quelles technologies utilisez-vous ?',
      answer: 'React, Vue.js, Node.js, MongoDB, PostgreSQL, AWS, et bien d\'autres selon les besoins du projet.'
    }
  ];

  return (
    <div style={containerStyle}>
      {/* Hero Section */}
      <section style={sectionStyle}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '24px' }}>
            Contactez <span style={gradientTextStyle}>Shay Acoca</span>
          </h1>
          <p style={{ fontSize: '20px', color: '#d1d5db', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
            Prêt à donner vie à votre projet ? Discutons de vos besoins et créons ensemble quelque chose d'exceptionnel
          </p>
        </div>

        {/* Méthodes de contact */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '80px' }}>
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.link}
              style={{
                ...cardStyle,
                textDecoration: 'none',
                color: 'white',
                textAlign: 'center',
                padding: '24px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>
                {method.icon}
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
                {method.title}
              </h3>
              <div style={{ color: '#60a5fa', marginBottom: '8px', fontWeight: 'bold' }}>
                {method.value}
              </div>
              <div style={{ color: '#9ca3af', fontSize: '14px' }}>
                {method.description}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Formulaire de contact et informations */}
      <section style={sectionStyle}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '60px' }}>
          {/* Formulaire */}
          <div style={cardStyle}>
            <h3 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px' }}>
              Démarrons votre projet
            </h3>
            
            {submitStatus === 'success' && (
              <div style={{
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '24px',
                color: '#10b981'
              }}>
                ✅ Message envoyé avec succès ! Je vous répondrai sous 24h.
              </div>
            )}

            {submitStatus === 'error' && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '24px',
                color: '#ef4444'
              }}>
                ❌ Erreur lors de l'envoi. Veuillez réessayer ou me contacter directement.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    style={inputStyle}
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    style={inputStyle}
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                  Type de projet
                </label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  style={inputStyle}
                >
                  <option value="">Sélectionnez un type</option>
                  <option value="website">Site web</option>
                  <option value="webapp">Application web</option>
                  <option value="mobile">Application mobile</option>
                  <option value="dashboard">Dashboard</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="other">Autre</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                    Budget estimé
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    style={inputStyle}
                  >
                    <option value="">Sélectionnez un budget</option>
                    <option value="<2k">Moins de 2000€</option>
                    <option value="2k-5k">2000€ - 5000€</option>
                    <option value="5k-10k">5000€ - 10000€</option>
                    <option value="10k+">Plus de 10000€</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                    Délai souhaité
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    style={inputStyle}
                  >
                    <option value="">Sélectionnez un délai</option>
                    <option value="urgent">Urgent (moins de 1 mois)</option>
                    <option value="normal">Normal (1-3 mois)</option>
                    <option value="flexible">Flexible (plus de 3 mois)</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                  Sujet *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  style={inputStyle}
                  placeholder="Objet de votre message"
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  style={{
                    ...inputStyle,
                    resize: 'vertical',
                    minHeight: '120px'
                  }}
                  placeholder="Décrivez votre projet en détail..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  ...buttonStyle,
                  opacity: isSubmitting ? 0.7 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
              >
                {isSubmitting ? '⏳ Envoi en cours...' : '🚀 Envoyer le message'}
              </button>
            </form>
          </div>

          {/* Informations et services */}
          <div>
            {/* Services et tarifs */}
            <div style={{ ...cardStyle, marginBottom: '40px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>
                Services & Tarifs
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {services.map((service, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '12px'
                  }}>
                    <div style={{ fontSize: '24px' }}>
                      {service.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                        {service.title}
                      </h4>
                      <p style={{ color: '#d1d5db', fontSize: '14px', marginBottom: '4px' }}>
                        {service.description}
                      </p>
                      <div style={{ color: '#60a5fa', fontWeight: 'bold', fontSize: '14px' }}>
                        {service.price}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div style={cardStyle}>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>
                Questions Fréquentes
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {faq.map((item, index) => (
                  <div key={index} style={{
                    padding: '16px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '12px'
                  }}>
                    <h4 style={{ fontWeight: 'bold', marginBottom: '8px', color: '#a78bfa' }}>
                      {item.question}
                    </h4>
                    <p style={{ color: '#d1d5db', fontSize: '14px', lineHeight: '1.6' }}>
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disponibilité et processus */}
      <section style={sectionStyle}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          {/* Disponibilité */}
          <div style={cardStyle}>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>
              📅 Disponibilité
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Lundi - Vendredi</span>
                <span style={{ color: '#10b981' }}>9h - 18h</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Samedi</span>
                <span style={{ color: '#f59e0b' }}>10h - 16h</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Dimanche</span>
                <span style={{ color: '#ef4444' }}>Fermé</span>
              </div>
              <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px' }}>
                <div style={{ fontSize: '14px', color: '#60a5fa' }}>
                  ⚡ Réponse rapide sous 24h
                </div>
              </div>
            </div>
          </div>

          {/* Processus */}
          <div style={cardStyle}>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>
              🔄 Mon Processus
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { step: '1', title: 'Analyse', desc: 'Étude de vos besoins' },
                { step: '2', title: 'Proposition', desc: 'Devis détaillé' },
                { step: '3', title: 'Développement', desc: 'Création de votre solution' },
                { step: '4', title: 'Livraison', desc: 'Tests et mise en ligne' }
              ].map((item, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '14px'
                  }}>
                    {item.step}
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{item.title}</div>
                    <div style={{ color: '#d1d5db', fontSize: '14px' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Localisation */}
          <div style={cardStyle}>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>
              🌍 Localisation
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '20px' }}>🇮🇱</span>
                <div>
                  <div style={{ fontWeight: 'bold' }}>Israël</div>
                  <div style={{ color: '#d1d5db', fontSize: '14px' }}>Jérusalem • Tel Aviv</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '20px' }}>🌐</span>
                <div>
                  <div style={{ fontWeight: 'bold' }}>Remote</div>
                  <div style={{ color: '#d1d5db', fontSize: '14px' }}>Projets internationaux</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '20px' }}>🕐</span>
                <div>
                  <div style={{ fontWeight: 'bold' }}>GMT+2</div>
                  <div style={{ color: '#d1d5db', fontSize: '14px' }}>Fuseau horaire</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section style={sectionStyle}>
        <div style={{
          ...cardStyle,
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))'
        }}>
          <h3 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>
            Prêt à transformer votre idée en réalité ?
          </h3>
          <p style={{ color: '#d1d5db', marginBottom: '32px', fontSize: '18px' }}>
            Contactez-moi dès aujourd'hui pour discuter de votre projet
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="mailto:shayacoca20@gmail.com"
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}
            >
              📧 Envoyer un email
            </a>
            <a
              href="https://wa.me/972537700551"
              style={{
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactModern;
