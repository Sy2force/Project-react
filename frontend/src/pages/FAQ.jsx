import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState(new Set([0]));

  const faqs = [
    { q: 'Quels types de projets réalisez-vous ?', a: 'Sites web, apps mobiles, e-commerce, SaaS et consulting technique.' },
    { q: 'Combien de temps prend un projet ?', a: '2-3 semaines pour un site vitrine, 1-3 mois pour un e-commerce.' },
    { q: 'Comment sont calculés vos tarifs ?', a: 'Selon la complexité, fonctionnalités et délai. Devis personnalisé.' },
    { q: 'Proposez-vous de la maintenance ?', a: 'Oui, contrats incluant mises à jour, sécurité et support.' },
    { q: 'Quelles technologies utilisez-vous ?', a: 'React, Node.js, TypeScript, MongoDB, AWS. Stack adaptée au projet.' }
  ];

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-16">
          <HelpCircle size={64} className="text-purple-400 mx-auto mb-6" />
          <h1 className="text-5xl font-bold text-white mb-6">FAQ</h1>
          <p className="text-xl text-gray-300">Questions fréquentes</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleItem(i)}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-white/10 transition-colors"
              >
                <span className="text-lg font-semibold text-white">{faq.q}</span>
                <ChevronDown 
                  className={`text-purple-400 transition-transform ${openItems.has(i) ? 'rotate-180' : ''}`}
                  size={20}
                />
              </button>
              
              {openItems.has(i) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-6"
                >
                  <p className="text-gray-300 leading-relaxed">{faq.a}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Une autre question ?</h2>
          <p className="text-gray-300 mb-6">N'hésitez pas à me contacter pour plus d'informations</p>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all">
            Me contacter
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
