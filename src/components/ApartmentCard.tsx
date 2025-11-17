import { Bed, Bath } from "lucide-react";
import { Card } from "./ui/card";
import { Apartment, USD_TO_KRW } from "../data/mockData";

interface ApartmentCardProps {
  apartment: Apartment;
  currency: "USD" | "KRW";
}

export function ApartmentCard({ apartment, currency }: ApartmentCardProps) {
  const displayRent = currency === "USD" 
    ? `$${apartment.rent.toLocaleString()}` 
    : `₩${(apartment.rent * USD_TO_KRW).toLocaleString()}`;

  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white border border-gray-200 relative z-0">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={apartment.image}
          alt={apartment.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-4 right-4">
          <div className="bg-gradient-to-r from-[#A4D7A7] to-[#92c595] text-white px-4 py-2 rounded-full shadow-lg">
            <div className="text-lg font-bold">{displayRent}</div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#A4D7A7] transition-colors">
            {apartment.name}
          </h3>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
              <Bed className="w-4 h-4 text-[#A4D7A7]" />
              <span className="text-sm font-medium text-gray-700">{apartment.bedrooms}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
              <Bath className="w-4 h-4 text-[#A4D7A7]" />
              <span className="text-sm font-medium text-gray-700">{apartment.bathrooms}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-[#A4D7A7]">
            {displayRent}
            <span className="text-sm text-gray-500 ml-1">/month</span>
          </div>
          
          <div className="px-4 py-2 bg-gradient-to-r from-[#A4D7A7] to-[#92c595] text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            View Details
          </div>
        </div>
      </div>
    </Card>
  );
}
