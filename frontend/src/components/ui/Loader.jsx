import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn.jsx';

const sizeVariants = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

const Spinner = ({ size, className }) => (
  <motion.div
    className={cn('border-2 border-neon-cyan/20 border-t-neon-cyan rounded-full', size, className)}
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
  />
);

const Dots = ({ className }) => (
  <div className={cn('flex space-x-1', className)}>
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-2 h-2 bg-neon-cyan rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: i * 0.2,
        }}
      />
    ))}
  </div>
);

const Pulse = ({ size, className }) => (
  <motion.div
    className={cn('bg-neon-cyan rounded-full', size, className)}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);

const NeonLoader = ({ size, className }) => (
  <div className={cn('relative', size, className)}>
    <motion.div
      className="absolute inset-0 border-2 border-neon-cyan rounded-full"
      animate={{
        rotate: 360,
        scale: [1, 1.1, 1],
      }}
      transition={{
        rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
        scale: { duration: 1, repeat: Infinity, ease: 'easeInOut' },
      }}
    />
    <motion.div
      className="absolute inset-2 border border-neon-purple rounded-full"
      animate={{
        rotate: -360,
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        rotate: { duration: 1.5, repeat: Infinity, ease: 'linear' },
        opacity: { duration: 1, repeat: Infinity, ease: 'easeInOut' },
      }}
    />
  </div>
);

const Loader = ({
  size = 'md',
  variant = 'spinner',
  text,
  className,
}) => {
  const sizeClass = sizeVariants[size];

  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return <Dots className={className} />;
      case 'pulse':
        return <Pulse size={sizeClass} className={className} />;
      case 'neon':
        return <NeonLoader size={sizeClass} className={className} />;
      default:
        return <Spinner size={sizeClass} className={className} />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      {renderLoader()}
      {text && (
        <motion.p
          className="text-sm text-gray-400 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

export default Loader;
