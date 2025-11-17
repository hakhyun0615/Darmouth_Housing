import { MapPin, Users, Bed, Bath } from 'lucide-react';
import { Card } from '../ui/card';
import type { Apartment } from '../../data/mockData';

interface PropertyCardListProps {
  apartments: Apartment[];
  onPropertySelect: (apartment: Apartment) => void;
  currency: 'USD' | 'KRW';
  selectedApartment?: Apartment | null;
}

const USD_TO_KRW = 1300; // Approximate exchange rate

export function PropertyCardList({ apartments, onPropertySelect, currency, selectedApartment }: PropertyCardListProps) {
  if (apartments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <MapPin className="w-12 h-12 mx-auto mb-3 opacity-30" />
        <p>No properties visible at this zoom level</p>
        <p className="text-sm">Zoom in to see apartment listings</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {selectedApartment 
            ? `Selected Property` 
            : `Available Properties (${apartments.length})`}
        </h3>
        <p className="text-sm text-gray-600">
          {selectedApartment 
            ? "Property details" 
            : "Click on a property to view details"}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-80 overflow-y-auto">
        {apartments.map((apartment) => (
          <Card 
            key={apartment.id}
            className="p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onPropertySelect(apartment)}
          >
            <div className="aspect-video rounded-lg overflow-hidden">
              <img
                src={apartment.image}
                alt={apartment.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-2 mt-1">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-800 truncate">{apartment.name}</h4>
                <span className="text-lg font-bold text-[#A4D7A7] ml-2 flex-shrink-0">
                  {currency === "USD" 
                    ? `$${apartment.rent.toLocaleString()}` 
                    : `₩${(apartment.rent * USD_TO_KRW).toLocaleString()}`}
                </span>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Bed className="w-4 h-4" />
                  <span>{apartment.bedrooms} bed</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bath className="w-4 h-4" />
                  <span>{apartment.bathrooms} bath</span>
                </div>
              </div>
              
              {apartment.studentCount && (
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Users className="w-3 h-3" />
                  <span>{apartment.studentCount} students in area</span>
                </div>
              )}
              
              {apartment.amenities && apartment.amenities.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  <span className="text-xs text-gray-500">
                    {apartment.amenities.slice(0, 3).join(", ")}
                    {apartment.amenities.length > 3 && ` +${apartment.amenities.length - 3} more`}
                  </span>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
