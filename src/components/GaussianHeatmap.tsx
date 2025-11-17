import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Circle, useMap } from 'react-leaflet';
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

// Normalize price to 0-1 range
const normalizePrice = (price: number, minPrice: number, maxPrice: number): number => {
  if (maxPrice === minPrice) return 0.5;
  return (price - minPrice) / (maxPrice - minPrice);
};

// Get single color with varying intensity based on normalized price
const getPriceColor = (intensity: number): string => {
  // Use single red color with varying opacity/intensity
  const alpha = Math.max(0.3, Math.min(1.0, intensity));
  return `rgba(255, 0, 0, ${alpha})`;
};

// Types
interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

interface HeatmapConfig {
  radius: number;
  maxIntensity: number;
  blur: number;
  circleCount: number;
}

// Map bounds tracker component
interface MapBoundsTrackerProps {
  onBoundsChange: (bounds: MapBounds, userInitiated: boolean) => void;
}

const MapBoundsTracker = ({ onBoundsChange }: MapBoundsTrackerProps) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    let isUserInitiated = false;
    let initialLoad = true;

    const updateBounds = () => {
      const bounds = map.getBounds();
      onBoundsChange({
        north: bounds.getNorth(),
        south: bounds.getSouth(),
        east: bounds.getEast(),
        west: bounds.getWest(),
      }, !initialLoad && isUserInitiated);
      
      // Reset flag after handling
      isUserInitiated = false;
      initialLoad = false;
    };

    // Track user-initiated interactions
    const handleUserInteraction = () => {
      isUserInitiated = true;
    };

    // Initial bounds update
    updateBounds();

    // Listen to map events
    const events = ['moveend', 'zoomend'];
    const userEvents = ['mousedown', 'touchstart', 'wheel', 'keydown'];
    
    events.forEach(event => map.on(event, updateBounds));
    userEvents.forEach(event => map.on(event, handleUserInteraction));

    return () => {
      events.forEach(event => map.off(event, updateBounds));
      userEvents.forEach(event => map.off(event, handleUserInteraction));
    };
  }, [map, onBoundsChange]);

  return null;
};

// Dynamic heatmap configuration based on zoom level
const getHeatmapConfig = (zoomLevel: number): HeatmapConfig => {
  const configs: Array<{ maxZoom: number; config: HeatmapConfig }> = [
    { maxZoom: 12, config: { radius: 700, maxIntensity: 0.5, blur: 40, circleCount: 15 } },
    { maxZoom: 13, config: { radius: 500, maxIntensity: 0.5, blur: 35, circleCount: 15 } },
    { maxZoom: 14, config: { radius: 350, maxIntensity: 0.5, blur: 30, circleCount: 15 } },
    { maxZoom: 15, config: { radius: 250, maxIntensity: 0.5, blur: 25, circleCount: 15 } },
    { maxZoom: 16, config: { radius: 160, maxIntensity: 0.5, blur: 20, circleCount: 15 } },
  ];
  
  for (const { maxZoom, config } of configs) {
    if (zoomLevel <= maxZoom) return config;
  }
  return { radius: 110, maxIntensity: 0.5, blur: 15, circleCount: 15 }; // Default for zoom > 16
};

// Calculate dynamic price range for better color distribution
const calculateDynamicPriceRange = (apartmentList: any[]) => {
  if (apartmentList.length === 0) return { minPrice: 1000, maxPrice: 2000 };
  
  const prices = apartmentList.map((apt: any) => apt.rent).sort((a: number, b: number) => a - b);
  const minPrice = prices[0];
  const maxPrice = prices[prices.length - 1];
  
  // Add some padding to avoid edge cases where all prices are the same
  const padding = Math.max(50, (maxPrice - minPrice) * 0.1);
  
  return {
    minPrice: Math.max(0, minPrice - padding),
    maxPrice: maxPrice + padding
  };
};

// Component to render Gaussian heatmap circles
interface GaussianHeatmapLayerProps {
  apartments: typeof apartments;
  minPrice: number;
  maxPrice: number;
}

const GaussianHeatmapLayer = ({ apartments, minPrice, maxPrice }: GaussianHeatmapLayerProps) => {
  const map = useMap();
  const [zoom, setZoom] = useState(map.getZoom());

  useEffect(() => {
    const updateZoom = () => setZoom(map.getZoom());
    map.on('zoomend', updateZoom);
    return () => {
      map.off('zoomend', updateZoom);
    };
  }, [map]);

  const config = getHeatmapConfig(zoom);

  return (
    <>
      {apartments.map((apartment) => {
        const intensity = normalizePrice(apartment.rent, minPrice, maxPrice);
        const color = getPriceColor(intensity);
        
        // Create concentric circles for smooth Gaussian distribution
        const circles = Array.from({ length: config.circleCount }, (_, index) => {
          const i = config.circleCount - index; // Reverse order for proper layering
          const radiusFactor = i / config.circleCount;
          const radius = config.radius * radiusFactor;
          
          // Gaussian-like opacity calculation
          const normalizedDistance = 1 - radiusFactor;
          const gaussianFactor = Math.exp(-3 * normalizedDistance ** 2);
          const opacity = gaussianFactor * 0.2 * config.maxIntensity;
          
          return (
            <Circle
              key={`${apartment.id}-circle-${i}`}
              center={[apartment.coordinates.lat, apartment.coordinates.lng]}
              radius={radius}
              pathOptions={{
                fillColor: color,
                fillOpacity: opacity,
                weight: 0,
                stroke: false,
                className: 'heatmap-circle',
              }}
            />
          );
        });
        
        return <div key={`heatmap-${apartment.id}`}>{circles}</div>;
      })}
    </>
  );
};

// Custom marker icons
const createHousingIcon = (isSelected: boolean = false) => new L.Icon({
  iconUrl: isSelected 
    ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png'
    : 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: isSelected ? [30, 49] : [25, 41],
  iconAnchor: isSelected ? [15, 49] : [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const createDartmouthIcon = () => new L.DivIcon({
  className: 'dartmouth-marker',
  html: '<div style="background-color: #00693e; color: white; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 16px; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.4);">D</div>',
  iconSize: [32, 32],
  iconAnchor: [16, 16]
});

// Legend component
interface HeatmapLegendProps {
  minPrice: number;
  maxPrice: number;
}

const HeatmapLegend = ({ minPrice, maxPrice }: HeatmapLegendProps) => (
  <div style={{ 
    position: 'absolute', 
    top: '20px', 
    right: '20px', 
    background: 'rgba(255, 255, 255, 0.95)', 
    padding: '16px 20px', 
    borderRadius: '12px',
    zIndex: 1000,
    fontSize: '13px',
    minWidth: '200px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
    backdropFilter: 'blur(10px)'
  }}>
    <div style={{ 
      fontWeight: '600', 
      marginBottom: '12px',
      color: '#2d3748',
      fontSize: '14px',
      letterSpacing: '0.3px'
    }}>
      Rent Price Heatmap
    </div>
    <div style={{ 
      height: '12px', 
      background: 'linear-gradient(to right, rgba(255, 0, 0, 0.3), rgba(255, 0, 0, 1))',
      borderRadius: '6px',
      marginBottom: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    }} />
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      fontSize: '11px',
      color: '#718096',
      fontWeight: '500'
    }}>
      <span>${minPrice.toLocaleString()}</span>
      <span>${maxPrice.toLocaleString()}</span>
    </div>
  </div>
);

// Helper functions
const getVisibleApartments = (bounds: MapBounds) => 
  apartments.filter(apartment => 
    apartment.coordinates.lat >= bounds.south &&
    apartment.coordinates.lat <= bounds.north &&
    apartment.coordinates.lng >= bounds.west &&
    apartment.coordinates.lng <= bounds.east
  );



// Main component props
interface GaussianHeatmapProps {
  onApartmentSelect?: (apartment: any) => void;
  onVisibleApartmentsChange?: (apartments: any[]) => void;
  selectedApartment?: any | null;
  onSelectionReset?: () => void;
}

export function GaussianHeatmap({ 
  onApartmentSelect, 
  onVisibleApartmentsChange, 
  selectedApartment,
  onSelectionReset
}: GaussianHeatmapProps) {
  const [visibleApartments, setVisibleApartments] = useState(apartments);
  
  // Calculate dynamic price range based on currently visible apartments
  const { minPrice, maxPrice } = calculateDynamicPriceRange(visibleApartments);
  const dartmouthIcon = createDartmouthIcon();

  // Update visible apartments when selection changes
  useEffect(() => {
    if (selectedApartment) {
      // Show only the selected apartment
      setVisibleApartments([selectedApartment]);
      if (onVisibleApartmentsChange) {
        onVisibleApartmentsChange([selectedApartment]);
      }
    }
    // Note: When selectedApartment is null, visible apartments will be updated by map bounds change
  }, [selectedApartment, onVisibleApartmentsChange]);

  const handleBoundsChange = (bounds: MapBounds, userInitiated: boolean) => {
    // If there's a selected apartment and the user moved the map, reset the selection
    if (selectedApartment && userInitiated && onSelectionReset) {
      onSelectionReset();
    }
    
    // Update visible apartments based on current view (only when no apartment is selected or after reset)
    if (!selectedApartment) {
      const visible = getVisibleApartments(bounds);
      setVisibleApartments(visible);
      if (onVisibleApartmentsChange) {
        onVisibleApartmentsChange(visible);
      }
    }
  };

  const handleApartmentClick = (apartment: any) => {
    onApartmentSelect?.(apartment);
  };

  return (
    <div style={{ position: 'relative' }}>
      <HeatmapLegend minPrice={minPrice} maxPrice={maxPrice} />
      
      <MapContainer 
        center={selectedApartment ? [selectedApartment.coordinates.lat, selectedApartment.coordinates.lng] : [43.7044, -72.2887]}
        zoom={selectedApartment ? 16 : 13} 
        style={{ height: '500px', width: '100%', borderRadius: '8px' }}
      >
        {/* Track map bounds changes */}
        <MapBoundsTracker onBoundsChange={handleBoundsChange} />
        
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Gaussian distribution based heatmap */}
        <GaussianHeatmapLayer apartments={visibleApartments} minPrice={minPrice} maxPrice={maxPrice} />
        
        {/* Housing Location Markers */}
        {apartments.map((apartment) => {
          const isSelected = selectedApartment && selectedApartment.id === apartment.id;
          return (
            <Marker
              key={apartment.id}
              position={[apartment.coordinates.lat, apartment.coordinates.lng]}
              icon={createHousingIcon(isSelected)}
              eventHandlers={{
                click: () => handleApartmentClick(apartment)
              }}
            />
          );
        })}
        
        {/* Dartmouth College marker */}
        <Marker
          position={[43.7044, -72.2887]}
          icon={dartmouthIcon}
        />
      </MapContainer>
    </div>
  );
}
