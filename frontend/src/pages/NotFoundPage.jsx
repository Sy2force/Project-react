import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Zap } from 'lucide-react';
import { Button } from '../components/ui/index.js';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        {/* Animated 404 */}
        <motion.div
          className="mb-8"
          animate={{ 
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple bg-clip-text text-transparent">
            404
          </h1>
        </motion.div>

        {/* Glitch Effect */}
        <motion.div
          className="relative mb-6"
          animate={{
            textShadow: [
              '0 0 0px rgba(0,255,255,0)',
              '2px 0 0px rgba(0,255,255,0.8), -2px 0 0px rgba(255,0,128,0.8)',
              '0 0 0px rgba(0,255,255,0)',
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Page Not Found
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 mb-8 text-lg"
        >
          The page you're looking for seems to have vanished into the digital void.
        </motion.p>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-neon-cyan rounded-full opacity-30"
              animate={{
                x: [0, 100, -100, 0],
                y: [0, -100, 100, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 8 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center relative z-10"
        >
          <Link to="/">
            <Button variant="primary" size="lg" className="group">
              <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Go Home
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => window.history.back()}
            className="group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </Button>
        </motion.div>

        {/* Fun Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 p-4 glass-light rounded-lg border border-white/10 relative z-10"
        >
          <div className="flex items-center justify-center mb-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-5 h-5 text-neon-cyan" />
            </motion.div>
          </div>
          <p className="text-sm text-gray-400">
            While you're here, why not explore our amazing features?
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
