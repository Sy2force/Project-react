import React from 'react';

/**
 * KPIStrip - Bande de 3 chiffres clés
 */
export function KPIStrip({ 
  items = [
    { label: 'Projets', value: '50+' },
    { label: 'Lignes', value: '25k' },
    { label: 'Clients', value: '140+' }
  ] 
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
      {items.map((k, i) => (
        <div key={i} className="glass rounded-2xl p-6">
          <div className="text-2xl font-display text-white line-clamp-1">
            {k.value}
          </div>
          <div className="text-white/70 mt-1 line-clamp-1">
            {k.label}
          </div>
        </div>
      ))}
    </div>
  );
}

export default KPIStrip;
