import React from 'react';

/**
 * CardFrame - Carte avec header, body et footer
 */
export function CardFrame({ title, actions, footer, children }) {
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <h3 className="font-display text-white text-lg line-clamp-1">
          {title}
        </h3>
        <div className="flex items-center gap-2">
          {actions}
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
      {footer && (
        <div className="px-6 py-4 border-t border-white/10">
          {footer}
        </div>
      )}
    </div>
  );
}

export default CardFrame;
