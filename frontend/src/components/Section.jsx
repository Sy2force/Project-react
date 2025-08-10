import React from 'react'

/**
 * Section - Composant section PROMPT 1
 * <section className="glass-light rounded-3xl p-8 mb-10">{children}</section>
 */
export default function Section({ children, className = "" }) {
  return (
    <section className={`glass-light rounded-3xl p-8 mb-10 ${className}`}>
      {children}
    </section>
  )
}

export { Section }
