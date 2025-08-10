import React, { useEffect, useRef } from 'react';

/**
 * Composant pour les annonces ARIA live
 * Utilisé pour annoncer les changements d'état aux lecteurs d'écran
 */
const AriaLive = ({ 
  message, 
  priority = 'polite', // 'polite' | 'assertive' | 'off'
  clearAfter = 5000, // Temps en ms avant de vider le message
  className = ''
}) => {
  const liveRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (message && liveRef.current) {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set the message
      liveRef.current.textContent = message;

      // Clear the message after specified time
      if (clearAfter > 0) {
        timeoutRef.current = setTimeout(() => {
          if (liveRef.current) {
            liveRef.current.textContent = '';
          }
        }, clearAfter);
      }
    }

    // Cleanup on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [message, clearAfter]);

  return (
    <div
      ref={liveRef}
      aria-live={priority}
      aria-atomic="true"
      className={`sr-only ${className}`}
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: 0
      }}
    />
  );
};

/**
 * Hook pour gérer les annonces ARIA
 */
export const useAriaLive = () => {
  const [message, setMessage] = React.useState('');
  const [priority, setPriority] = React.useState('polite');

  const announce = (text, urgency = 'polite') => {
    setMessage(text);
    setPriority(urgency);
  };

  const clear = () => {
    setMessage('');
  };

  return {
    message,
    priority,
    announce,
    clear,
    AriaLiveComponent: (props) => (
      <AriaLive 
        message={message} 
        priority={priority} 
        {...props} 
      />
    )
  };
};

export default AriaLive;
