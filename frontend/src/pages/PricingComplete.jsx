import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown } from 'lucide-react';

const PricingComplete = () => {
  const plans = [
    { name: 'Starter', price: '1 500€', icon: Star, features: ['5 pages', 'SEO', 'Support'] },
    { name: 'Pro', price: '3 500€', icon: Zap, features: ['15 pages', 'Blog', 'Animations'], popular: true },
    { name: 'Enterprise', price: '7 500€', icon: Crown, features: ['Illimité', 'E-commerce', '24/7'] }
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">Tarifs</h1>
          <p className="text-xl text-gray-300">Solutions sur-mesure pour vos projets</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 ${
                plan.popular ? 'ring-2 ring-purple-500' : ''
              }`}
            >
              <div className="text-center mb-8">
                <plan.icon size={48} className="text-purple-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-white">{plan.price}</div>
              </div>

              <div className="space-y-3 mb-8">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-center space-x-3">
                    <Check size={16} className="text-green-400" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 rounded-xl">
                Choisir
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingComplete;
