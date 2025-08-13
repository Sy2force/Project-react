// [EXAM] Composant de région live pour les annonces aux lecteurs d'écran
import { useLiveRegion } from '../../hooks/useAccessibility';

/**
 * [EXAM] Composant LiveRegion pour les annonces d'accessibilité
 * Permet d'annoncer du contenu dynamique aux lecteurs d'écran
 */
const LiveRegion = () => {
  const { politeMessages, assertiveMessages } = useLiveRegion();

  return (
    <>
      {/* [EXAM] Région live polie - annonces non urgentes */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        {politeMessages.map(({ id, message }) => (
          <div key={id}>{message}</div>
        ))}
      </div>

      {/* [EXAM] Région live assertive - annonces urgentes */}
      <div
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
        role="alert"
      >
        {assertiveMessages.map(({ id, message }) => (
          <div key={id}>{message}</div>
        ))}
      </div>
    </>
  );
};

export default LiveRegion;
