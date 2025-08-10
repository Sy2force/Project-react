import React from 'react'
import { motion } from 'framer-motion'
import { Code, Palette, Zap, Award, Users, Calendar } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import GlassCard from '../components/ui/GlassCard'
import SectionHeader from '../components/ui/SectionHeader'

const AboutPage = () => {
  const skills = [
    {
      icon: Code,
      title: 'Développement Frontend',
      description: 'React, Vue.js, TypeScript, Tailwind CSS',
      color: 'blue'
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Figma, Adobe Creative Suite, Design Systems',
      color: 'purple'
    },
    {
      icon: Zap,
      title: 'Performance & Optimisation',
      description: 'Lighthouse, Core Web Vitals, SEO',
      color: 'green'
    },
    {
      icon: Award,
      title: 'Leadership',
      description: 'Gestion d\'équipe, Mentorat, Architecture',
      color: 'orange'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Agile, Git, Communication interculturelle',
      color: 'pink'
    },
    {
      icon: Calendar,
      title: 'Gestion de Projet',
      description: 'Planification, Livraison, Qualité',
      color: 'yellow'
    }
  ]

  const experiences = [
    {
      title: 'Développeur Full Stack Senior',
      company: 'TechCorp Solutions',
      year: '2021 - Présent',
      description: 'Développement d\'applications web complexes avec React, Node.js et MongoDB. Encadrement d\'une équipe de 4 développeurs juniors.',
      achievements: [
        'Amélioration des performances de 40%',
        'Migration vers TypeScript',
        'Mise en place CI/CD'
      ]
    },
    {
      title: 'Développeur Frontend',
      company: 'Digital Agency Pro',
      year: '2019 - 2021',
      description: 'Création d\'interfaces utilisateur modernes et responsives pour des clients variés. Spécialisation en React et animations CSS.',
      achievements: [
        '20+ projets livrés',
        'Satisfaction client 98%',
        'Formation équipe design'
      ]
    },
    {
      title: 'Développeur Web Junior',
      company: 'StartupTech',
      year: '2018 - 2019',
      description: 'Premiers pas dans le développement web professionnel. Apprentissage des bonnes pratiques et des technologies modernes.',
      achievements: [
        'Maîtrise React/Vue.js',
        'Certification AWS',
        'Contribution open source'
      ]
    }
  ]

  const values = [
    {
      icon: Award,
      title: 'Excellence',
      description: 'Je m\'efforce toujours de livrer un travail de la plus haute qualité.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Le travail d\'équipe et la communication sont essentiels à mon approche.'
    },
    {
      icon: Calendar,
      title: 'Ponctualité',
      description: 'Je respecte toujours les délais et les engagements pris.'
    }
  ]

  return (
    <PageWrapper>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <SectionHeader 
          title="À Propos de Moi" 
          subtitle="Développeur passionné avec plus de 5 ans d'expérience dans la création d'applications web modernes et d'expériences utilisateur exceptionnelles." 
          centered 
          className="mb-8"
        />
      </motion.div>

      {/* Hero */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="flex items-center justify-center gap-8 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="/api/placeholder/120/120"
              alt="Shay Acoca"
              className="w-32 h-32 rounded-full border-4 border-blue-400"
            />
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                Shay Acoca
              </h1>
              <p className="text-2xl text-gray-300">Créateur du Futur Digital</p>
            </div>
          </motion.div>
          
          <motion.p 
            className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Développeur passionné spécialisé dans la création d'expériences digitales modernes et performantes. 
            Je transforme les idées en solutions techniques innovantes.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Projets', value: '50+', icon: <Code size={24} /> },
              { label: 'Clients', value: '30+', icon: <Users size={24} /> },
              { label: 'Années', value: '5+', icon: <Calendar size={24} /> },
              { label: 'Satisfaction', value: '98%', icon: <Award size={24} /> }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-blue-400 mb-3 flex justify-center">{stat.icon}</div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold font-sora text-center text-white mb-16"
          >
            Mes Compétences
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skill, index) => {
              const IconComponent = skill.icon
              return (
                <motion.div
                  key={skill.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <GlassCard className="h-full text-center relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${
                      skill.color === 'blue' ? 'from-blue-500/10 to-transparent' :
                      skill.color === 'purple' ? 'from-purple-500/10 to-transparent' :
                      'from-green-500/10 to-transparent'
                    } opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    
                    <div className="relative z-10 p-8">
                      <div className={`w-20 h-20 bg-gradient-to-br ${
                        skill.color === 'blue' ? 'from-blue-500 to-blue-600' :
                        skill.color === 'purple' ? 'from-purple-500 to-purple-600' :
                        'from-green-500 to-green-600'
                      } rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>
                      
                      <h3 className={`text-2xl font-bold font-sora mb-4 group-hover:${
                        skill.color === 'blue' ? 'text-blue-300' :
                        skill.color === 'purple' ? 'text-purple-300' :
                        'text-green-300'
                      } transition-colors text-white`}>
                        {skill.title}
                      </h3>
                      
                      <p className="text-brand-accent leading-relaxed">
                        {skill.description}
                      </p>
                    </div>
                  </GlassCard>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold font-sora text-center text-white mb-16"
          >
            Mon Expérience
          </motion.h2>
          
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <GlassCard
                key={exp.company}
                className="p-6 sm:p-8 relative"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">{exp.title}</h3>
                      <p className="text-blue-400 font-semibold">{exp.company}</p>
                    </div>
                    <div className="text-gray-400 font-medium">{exp.year}</div>
                  </div>
                  
                  <p className="text-gray-300 mb-4">{exp.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {exp.achievements.map((achievement, achIndex) => (
                      <span
                        key={achIndex}
                        className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm"
                      >
                        {achievement}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold font-sora text-center text-white mb-16"
          >
            Mes Valeurs
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <GlassCard className="h-full text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative z-10 p-8">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-bold font-sora text-white mb-4 group-hover:text-blue-300 transition-colors">
                        {value.title}
                      </h3>
                      
                      <p className="text-brand-accent leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </GlassCard>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Travaillons ensemble
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Vous avez un projet en tête ? Discutons de la façon dont je peux vous aider à le concrétiser.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/contact'}
              >
                Me contacter
              </motion.button>
              <motion.button
                className="border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/projects'}
              >
                Voir mes projets
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}

export default AboutPage
