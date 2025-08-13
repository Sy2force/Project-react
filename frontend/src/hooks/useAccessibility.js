// [EXAM] Hook personnalisé pour la gestion de l'accessibilité
import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * [EXAM] Hook pour la gestion du focus et de la navigation clavier
 * @returns {Object} Utilitaires d'accessibilité
 */
export const useAccessibility = () => {
  const [isKeyboardNavigation, setIsKeyboardNavigation] = useState(false);
  const [focusedElement, setFocusedElement] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const lastFocusRef = useRef(null);

  // [EXAM] Détection de la navigation clavier
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        setIsKeyboardNavigation(true);
      }
    };

    const handleMouseDown = () => {
      setIsKeyboardNavigation(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  // [EXAM] Gestion du focus
  useEffect(() => {
    const handleFocusIn = (e) => {
      setFocusedElement(e.target);
    };

    const handleFocusOut = () => {
      setFocusedElement(null);
    };

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  // [EXAM] Fonction pour annoncer du contenu aux lecteurs d'écran
  const announce = useCallback((message, priority = 'polite') => {
    const id = Date.now();
    const announcement = { id, message, priority };
    
    setAnnouncements(prev => [...prev, announcement]);
    
    // [EXAM] Nettoyer l'annonce après un délai
    setTimeout(() => {
      setAnnouncements(prev => prev.filter(a => a.id !== id));
    }, 1000);
  }, []);

  // [EXAM] Fonction pour gérer le focus programmatique
  const manageFocus = useCallback({
    // Sauvegarder le focus actuel
    save: () => {
      lastFocusRef.current = document.activeElement;
    },
    
    // Restaurer le focus sauvegardé
    restore: () => {
      if (lastFocusRef.current && lastFocusRef.current.focus) {
        lastFocusRef.current.focus();
      }
    },
    
    // Déplacer le focus vers un élément
    moveTo: (element) => {
      if (element && element.focus) {
        element.focus();
      }
    },
    
    // Déplacer le focus vers le premier élément focusable
    moveToFirst: (container) => {
      const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }
  }, []);

  // [EXAM] Fonction pour créer un piège à focus (pour modales)
  const createFocusTrap = useCallback((container) => {
    if (!container) return null;

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
      
      if (e.key === 'Escape') {
        // Permettre la fermeture avec Escape
        const closeButton = container.querySelector('[data-close]');
        if (closeButton) {
          closeButton.click();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    
    // Focus sur le premier élément
    if (firstElement) {
      firstElement.focus();
    }

    // Fonction de nettoyage
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // [EXAM] Fonction pour vérifier si un élément est visible
  const isElementVisible = useCallback((element) => {
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }, []);

  // [EXAM] Fonction pour générer des IDs uniques pour l'accessibilité
  const generateId = useCallback((prefix = 'a11y') => {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  return {
    isKeyboardNavigation,
    focusedElement,
    announcements,
    announce,
    manageFocus,
    createFocusTrap,
    isElementVisible,
    generateId
  };
};

/**
 * [EXAM] Hook pour la gestion des raccourcis clavier
 * @param {Object} shortcuts - Objet des raccourcis {key: callback}
 * @param {Array} deps - Dépendances du hook
 */
export const useKeyboardShortcuts = (shortcuts, deps = []) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      const modifiers = {
        ctrl: e.ctrlKey,
        alt: e.altKey,
        shift: e.shiftKey,
        meta: e.metaKey
      };

      Object.entries(shortcuts).forEach(([shortcut, callback]) => {
        const parts = shortcut.toLowerCase().split('+');
        const targetKey = parts.pop();
        const targetModifiers = parts;

        const modifierMatch = targetModifiers.every(mod => modifiers[mod]);
        const keyMatch = key === targetKey;

        if (modifierMatch && keyMatch) {
          e.preventDefault();
          callback(e);
        }
      });
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, deps);
};

/**
 * [EXAM] Hook pour la gestion des régions live (annonces)
 * @returns {Object} Utilitaires pour les régions live
 */
export const useLiveRegion = () => {
  const [politeMessages, setPoliteMessages] = useState([]);
  const [assertiveMessages, setAssertiveMessages] = useState([]);

  const announcePolite = useCallback((message) => {
    const id = Date.now();
    setPoliteMessages(prev => [...prev, { id, message }]);
    
    setTimeout(() => {
      setPoliteMessages(prev => prev.filter(m => m.id !== id));
    }, 1000);
  }, []);

  const announceAssertive = useCallback((message) => {
    const id = Date.now();
    setAssertiveMessages(prev => [...prev, { id, message }]);
    
    setTimeout(() => {
      setAssertiveMessages(prev => prev.filter(m => m.id !== id));
    }, 1000);
  }, []);

  return {
    politeMessages,
    assertiveMessages,
    announcePolite,
    announceAssertive
  };
};

export default useAccessibility;
