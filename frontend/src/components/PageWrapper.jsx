import React from 'react';

/**
 * PageWrapper - Container unifié PROMPT 1
 * max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12
 */
export default function PageWrapper({ children, className = "" }) {
  return (
    <div className={`max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 ${className}`}>
      {children}
    </div>
  );
}
