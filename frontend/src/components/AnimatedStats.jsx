import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Users, Award, Zap } from 'lucide-react';

const AnimatedStats = ({ stats = [] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });
  const [animatedValues, setAnimatedValues] = useState({});

  const defaultStats = [
    {
      id: 'projects',
      label: 'Projets Réalisés',
      value: 50,
      suffix: '+',
      icon: Award,
      color: 'from-blue-500 to-cyan-500',
      description: 'Applications web et mobile'
    },
    {
      id: 'clients',
      label: 'Clients Satisfaits',
      value: 25,
      suffix: '+',
      icon: Users,
      color: 'from-green-500 to-emerald-500',
      description: 'Startups et entreprises'
    },
    {
      id: 'experience',
      label: 'Années d\'Expérience',
      value: 5,
      suffix: '+',
      icon: TrendingUp,
      color: 'from-purple-500 to-violet-500',
      description: 'Développement moderne'
    },
    {
      id: 'satisfaction',
      label: 'Taux de Satisfaction',
      value: 100,
      suffix: '%',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      description: 'Qualité garantie'
    }
  ];

  const statsToShow = stats.length > 0 ? stats : defaultStats;

  // J'anime les chiffres quand le composant devient visible
  useEffect(() => {
    if (!isInView) return;

    const animateValue = (stat, duration = 2000) => {
      const startTime = Date.now();
      const startValue = 0;
      const endValue = stat.value;

      const updateValue = () => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ma fonction d'easing pour que l'animation soit fluide
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart);

        setAnimatedValues(prev => ({
          ...prev,
          [stat.id]: currentValue
        }));

        if (progress < 1) {
          requestAnimationFrame(updateValue);
        }
      };

      requestAnimationFrame(updateValue);
    };

    // Je lance les animations avec un petit décalage entre chacune
    statsToShow.forEach((stat, index) => {
      setTimeout(() => {
        animateValue(stat, 2000 + index * 200);
      }, index * 300);
    });
  }, [isInView, statsToShow]);

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold gradient-text mb-4">
            Quelques Chiffres
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Des résultats concrets qui témoignent de mon engagement et de ma passion
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsToShow.map((stat, index) => {
            const Icon = stat.icon;
            const animatedValue = animatedValues[stat.id] || 0;

            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                className="relative group"
              >
                {/* Card */}
                <div className="glassmorphism-strong p-8 rounded-3xl text-center relative overflow-hidden card-hover">
                  {/* Background Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`} />
                  
                  {/* Icon */}
                  <motion.div
                    className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: [0, -10, 10, 0],
                      transition: { duration: 0.5 }
                    }}
                  >
                    <Icon size={32} className="text-white" />
                  </motion.div>

                  {/* Animated Number */}
                  <motion.div
                    className="text-5xl font-bold text-white mb-2"
                    initial={{ scale: 0.5 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: index * 0.2 + 0.5, type: "spring" }}
                  >
                    <span className="tabular-nums">
                      {animatedValue}
                    </span>
                    <span className={`text-3xl bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.suffix}
                    </span>
                  </motion.div>

                  {/* Label */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {stat.label}
                  </h3>

                  {/* Description */}
                  <p className="text-white/60 text-sm">
                    {stat.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mt-6 w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: '100%' } : {}}
                      transition={{ 
                        delay: index * 0.2 + 1, 
                        duration: 1.5,
                        ease: "easeOut"
                      }}
                    />
                  </div>

                  {/* Floating Particles */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-2 h-2 bg-gradient-to-r ${stat.color} rounded-full opacity-30`}
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${20 + i * 20}%`,
                      }}
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0.3, 0.7, 0.3],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2 + i * 0.5,
                        repeat: Infinity,
                        delay: index * 0.2 + i * 0.3,
                      }}
                    />
                  ))}
                </div>

                {/* Hover Effect Ring */}
                <motion.div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-20 -z-10`}
                  initial={false}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5 }}
          className="text-center mt-16"
        >
          <div className="glassmorphism p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              🚀 Prêt pour votre prochain projet ?
            </h3>
            <p className="text-white/80 mb-6">
              Ces chiffres reflètent mon engagement envers l'excellence et la satisfaction client. 
              Rejoignez les entreprises qui me font confiance !
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              Démarrer un projet
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AnimatedStats;
