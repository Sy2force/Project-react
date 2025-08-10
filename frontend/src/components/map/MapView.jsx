import { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

const MapView = ({ 
  lat, 
  lng, 
  zoom = 13, 
  height = '300px',
  title = 'Localisation',
  address = '',
  showMarker = true,
  interactive = true
}) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // Vérifier si les coordonnées sont valides
    if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
      return;
    }

    // Fonction pour initialiser la carte avec Leaflet
    const initMap = async () => {
      try {
        // Import dynamique de Leaflet pour éviter les erreurs SSR
        const L = await import('leaflet');
        
        // Nettoyer la carte existante
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
        }

        // Créer la nouvelle carte
        const map = L.map(mapRef.current, {
          center: [lat, lng],
          zoom: zoom,
          zoomControl: interactive,
          dragging: interactive,
          touchZoom: interactive,
          doubleClickZoom: interactive,
          scrollWheelZoom: interactive,
          boxZoom: interactive,
          keyboard: interactive
        });

        // Ajouter les tuiles OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Ajouter un marqueur si demandé
        if (showMarker) {
          // Créer une icône personnalisée
          const customIcon = L.divIcon({
            html: `
              <div style="
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                width: 30px;
                height: 30px;
                border-radius: 50% 50% 50% 0;
                border: 3px solid white;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 14px;
                transform: rotate(-45deg);
              ">
                <div style="transform: rotate(45deg);">📍</div>
              </div>
            `,
            className: 'custom-marker',
            iconSize: [30, 30],
            iconAnchor: [15, 30]
          });

          const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

          // Ajouter un popup si on a un titre ou une adresse
          if (title || address) {
            const popupContent = `
              <div style="font-family: system-ui, sans-serif; min-width: 200px;">
                ${title ? `<h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 16px;">${title}</h3>` : ''}
                ${address ? `<p style="margin: 0; color: #6b7280; font-size: 14px;">${address}</p>` : ''}
              </div>
            `;
            marker.bindPopup(popupContent);
          }
        }

        mapInstanceRef.current = map;

        // Forcer un redimensionnement après un court délai
        setTimeout(() => {
          if (mapInstanceRef.current) {
            mapInstanceRef.current.invalidateSize();
          }
        }, 100);

      } catch (error) {
        console.error('Erreur lors de l\'initialisation de la carte:', error);
      }
    };

    initMap();

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lng, zoom, showMarker, title, address, interactive]);

  // Si pas de coordonnées, afficher un placeholder
  if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
    return (
      <div style={{
        height: height,
        background: 'rgba(17, 25, 40, 0.8)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        color: '#94a3b8'
      }}>
        <MapPin size={48} style={{ opacity: 0.5 }} />
        <div style={{ textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: '16px', fontWeight: '500' }}>
            Localisation non disponible
          </p>
          <p style={{ margin: 0, fontSize: '14px', opacity: 0.8 }}>
            Aucune coordonnée géographique fournie
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      height: height,
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      position: 'relative'
    }}>
      {/* Conteneur de la carte */}
      <div
        ref={mapRef}
        style={{
          width: '100%',
          height: '100%',
          background: 'rgba(17, 25, 40, 0.8)'
        }}
      />

      {/* Overlay d'informations */}
      {(title || address) && (
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(8px)',
          color: '#ffffff',
          padding: '12px 16px',
          borderRadius: '8px',
          maxWidth: '250px',
          fontSize: '14px',
          zIndex: 1000
        }}>
          {title && (
            <div style={{ fontWeight: '600', marginBottom: address ? '4px' : 0 }}>
              {title}
            </div>
          )}
          {address && (
            <div style={{ opacity: 0.9, fontSize: '12px' }}>
              {address}
            </div>
          )}
        </div>
      )}

      {/* Lien vers Google Maps */}
      <div style={{
        position: 'absolute',
        bottom: '12px',
        right: '12px',
        zIndex: 1000
      }}>
        <a
          href={`https://www.google.com/maps?q=${lat},${lng}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 12px',
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#ffffff',
            textDecoration: 'none',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: '500',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(0, 0, 0, 0.9)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(0, 0, 0, 0.8)';
          }}
        >
          <MapPin size={14} />
          Ouvrir dans Google Maps
        </a>
      </div>
    </div>
  );
};

export default MapView;
