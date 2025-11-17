import { Users, Bed, Bath } from 'lucide-react';
import { Card } from './ui/card';
import type { Apartment } from '../data/mockData';

interface PropertyCardProps {
  apartment: Apartment;
  currency: 'USD' | 'KRW';
  onClick?: () => void;
}

const USD_TO_KRW = 1300; // Approximate exchange rate

export function PropertyCard({ apartment, currency, onClick }: PropertyCardProps) {
  return (
    <Card 
      className="p-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
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
  );
}
