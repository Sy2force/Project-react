import React from 'react';

/**
 * FeatureCard - Carte de fonctionnalité avec numéro
 */
export function FeatureCard({ index = 1, title, text }) {
  return (
    <div className="glass rounded-2xl p-6">
      <div className="pill text-white/80 inline-flex mb-3">
        {String(index).padStart(2, '0')}.
      </div>
      <h3 className="font-display text-xl text-white line-clamp-2">
        {title}
      </h3>
      <p className="text-white/70 mt-2 line-clamp-3">
        {text}
      </p>
    </div>
  );
}

export default FeatureCard;
