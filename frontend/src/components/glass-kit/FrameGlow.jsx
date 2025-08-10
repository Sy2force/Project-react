import React from 'react';

/**
 * FrameGlow - Cadre avec liseré lumineux
 */
export function FrameGlow({ children, className = '' }) {
  return (
    <div className={`frame-border rounded-2xl p-[1px] ${className}`}>
      <div className="rounded-2xl bg-white/5">
        <div className="sheen-edge rounded-2xl p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export default FrameGlow;
