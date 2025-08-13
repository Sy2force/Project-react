import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-16">
          <Shield size={64} className="text-purple-400 mx-auto mb-6" />
          <h1 className="text-5xl font-bold text-white mb-6">Politique de confidentialité</h1>
          <p className="text-xl text-gray-300">Protection de vos données personnelles</p>
        </motion.div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Collecte des données</h2>
            <p className="text-gray-300">Nous collectons uniquement les informations nécessaires pour nos services.</p>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Utilisation</h2>
            <p className="text-gray-300">Vos données servent à améliorer votre expérience utilisateur.</p>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Protection</h2>
            <p className="text-gray-300">Sécurité avancée avec HTTPS et chiffrement des données.</p>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Vos droits</h2>
            <p className="text-gray-300">Accès, modification, suppression de vos données à tout moment.</p>
          </div>
          
          <div className="pt-6 border-t border-white/10">
            <p className="text-sm text-gray-400">Dernière mise à jour : Décembre 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
