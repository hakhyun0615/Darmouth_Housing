export interface Apartment {
  id: number;
  name: string;
  rent: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  distance: number;
  neighborhood: string;
  atmosphere: string;
  studentCount: number;
  image: string;
  amenities: string[];
  nearbySchools: string[];
  utilities: {
    supermarkets: string[];
    gyms: string[];
  };
}

export interface ApartmentCluster {
  id: string;
  name: string;
  center: [number, number];
  bounds: [number, number][];
  coordinates: [number, number][];
  apartments: Apartment[];
  averageRent: number;
  color: string;
  description: string;
  keyFeatures: string[];
}

export interface NeighborhoodStats {
  averageRent: number;
  priceRange: {
    min: number;
    max: number;
  };
  totalProperties: number;
  distanceToCampus: number;
  atmosphere: string;
  popularAmenities: string[];
}
