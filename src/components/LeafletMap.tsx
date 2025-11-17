import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { apartments } from '../data/mockData';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface LeafletMapProps {
  onApartmentSelect?: (apartment: any) => void;
}

export function LeafletMap({ onApartmentSelect }: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map centered on Dartmouth College
    const map = L.map(mapRef.current).setView([43.7044, -72.2887], 13);
    mapInstanceRef.current = map;

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Create custom icon for apartments
    const apartmentIcon = L.divIcon({
      className: 'custom-apartment-marker',
      html: '<div style="background-color: #A4D7A7; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">🏠</div>',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    // Add apartment markers
    apartments.forEach((apartment) => {
      const marker = L.marker([apartment.coordinates.lat, apartment.coordinates.lng], {
        icon: apartmentIcon
      }).addTo(map);

      // Create popup content
      const popupContent = `
        <div style="min-width: 200px;">
          <img src="${apartment.image}" alt="${apartment.name}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 4px; margin-bottom: 8px;">
          <h3 style="margin: 0 0 8px 0; font-weight: bold; font-size: 14px;">${apartment.name}</h3>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 16px; font-weight: bold; color: #A4D7A7;">$${apartment.rent.toLocaleString()}</span>
          </div>
          <div style="display: flex; gap: 12px; margin-bottom: 8px; font-size: 12px; color: #666;">
            <span>🛏️ ${apartment.bedrooms} bed</span>
            <span>🚿 ${apartment.bathrooms} bath</span>
          </div>
          ${apartment.studentCount ? `<div style="font-size: 11px; color: #888;">👥 ${apartment.studentCount} students in area</div>` : ''}
        </div>
      `;

      marker.bindPopup(popupContent);

      // Add click handler
      marker.on('click', () => {
        if (onApartmentSelect) {
          onApartmentSelect(apartment);
        }
      });
    });

    // Add Dartmouth College marker
    const dartmouthIcon = L.divIcon({
      className: 'dartmouth-marker',
      html: '<div style="background-color: #00693e; color: white; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 16px; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.4);">D</div>',
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    L.marker([43.7044, -72.2887], { icon: dartmouthIcon })
      .addTo(map)
      .bindPopup('<strong>Dartmouth College</strong><br>Hanover, NH');

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [onApartmentSelect]);

  return <div ref={mapRef} style={{ height: '500px', width: '100%', borderRadius: '8px' }} />;
}
