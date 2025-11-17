// Simple TypeScript module for apartment data from CSV

export interface Apartment {
  id: number;
  name: string;
  rent: number; 
  bedrooms: number;
  bathrooms: number;
  coordinates: { lat: number; lng: number };
}

export const USD_TO_KRW = 1300;

export const apartments: Apartment[] = [
  {
    id: 1,
    name: "1 N. Park St Apt 5",
    rent: 1871,
    bedrooms: 2,
    bathrooms: 1,
    coordinates: { lat: 43.700391, lng: -72.28784312 }
  },
  {
    id: 2,
    name: "2 Sachem St",
    rent: 1200,
    bedrooms: 1,
    bathrooms: 1,
    coordinates: { lat: 43.701234, lng: -72.288456 }
  }
];
