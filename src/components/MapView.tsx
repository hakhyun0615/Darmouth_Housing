import { useState } from "react";
import { GaussianHeatmap } from "./GaussianHeatmap";
import { PropertyCardList } from "./map/PropertyCardList";
import { apartments } from "../data/mockData";

export function MapView() {
  const [selectedApartment, setSelectedApartment] = useState<number | null>(null);
  const [visibleApartments, setVisibleApartments] = useState<any[]>(apartments);
  const currency = "USD"; // Fixed to USD

  // Get selected apartment object
  const selectedApt = selectedApartment 
    ? apartments.find(apt => apt.id === selectedApartment) || null
    : null;

  // Handle apartment selection from property cards and map pins
  const handleApartmentSelect = (apartment: any) => {
    // Always select the apartment (no toggling off)
    setSelectedApartment(apartment.id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div>
            <h1 className="mb-2">Map View</h1>
            <p className="text-gray-600">Explore housing locations with rent heatmap visualization</p>
          </div>
        </div>

        {/* Interactive Map with Gaussian Heatmap */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <GaussianHeatmap 
              onApartmentSelect={(apt: any) => setSelectedApartment(apt?.id ?? null)}
              onVisibleApartmentsChange={setVisibleApartments}
              selectedApartment={selectedApt}
              onSelectionReset={() => setSelectedApartment(null)}
            />
          </div>
        </div>

        {/* Property Cards at Bottom - Shows selected apartment or all visible apartments */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <PropertyCardList 
            apartments={selectedApt ? [selectedApt] : visibleApartments}
            onPropertySelect={handleApartmentSelect}
            currency={currency}
            selectedApartment={selectedApt}
          />
        </div>
      </div>
    </div>
  );
}