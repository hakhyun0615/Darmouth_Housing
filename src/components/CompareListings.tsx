import { useState, useMemo } from "react";
import { PropertyCard } from "./PropertyCard";
import { FilterPanel } from "./FilterPanel";
import { apartments } from "../data/mockData";

export function CompareListings() {
  const currency = "USD"; // Fixed to USD
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  const [bedrooms, setBedrooms] = useState<number | null>(null);
  const [bathrooms, setBathrooms] = useState<number | null>(null);

  const filteredApartments = useMemo(() => {
    return apartments.filter(apt => {
      const inPriceRange = apt.rent >= priceRange[0] && apt.rent <= priceRange[1];
      const bedroomMatch = bedrooms === null || apt.bedrooms === bedrooms;
      const bathroomMatch = bathrooms === null || apt.bathrooms === bathrooms;
      return inPriceRange && bedroomMatch && bathroomMatch;
    });
  }, [priceRange, bedrooms, bathrooms]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header with Toggle Buttons */}
        <div className="flex items-center justify-between mb-8 bg-white p-6 rounded-2xl shadow-lg">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Compare Listings</h1>
            <p className="text-gray-600 text-lg">
              Browse and filter available apartments near Dartmouth
            </p>
          </div>
          

        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <FilterPanel
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              currency={currency}
              bedrooms={bedrooms}
              onBedroomsChange={setBedrooms}
              bathrooms={bathrooms}
              onBathroomsChange={setBathrooms}
            />
          </div>

          {/* Apartment Cards Grid */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredApartments.map((apartment) => (
                <PropertyCard
                  key={apartment.id}
                  apartment={apartment}
                  currency={currency}
                />
              ))}
            </div>
            
            {filteredApartments.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                <div className="text-6xl mb-4">🏠</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No apartments found</h3>
                <p className="text-gray-500">Try adjusting your filters to see more results</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
