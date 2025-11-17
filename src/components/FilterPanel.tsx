import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Bed, Bath } from "lucide-react";

interface FilterPanelProps {
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  currency: "USD" | "KRW";
  bedrooms?: number | null;
  onBedroomsChange?: (v: number | null) => void;
  bathrooms?: number | null;
  onBathroomsChange?: (v: number | null) => void;
  // Optional map-specific controls
  rentMax?: number;
  onRentMaxChange?: (v: number) => void;
  bedroomsFilter?: number | null;
  onBedroomsFilterChange?: (v: number | null) => void;
  showHeatmap?: boolean;
  onShowHeatmapChange?: (v: boolean) => void;
}

export function FilterPanel({
  priceRange,
  onPriceRangeChange,
  currency,
  bedrooms,
  onBedroomsChange,
  bathrooms,
  onBathroomsChange,
  rentMax, onRentMaxChange, bedroomsFilter, onBedroomsFilterChange, showHeatmap, onShowHeatmapChange
}: FilterPanelProps) {
  const currencySymbol = currency === "USD" ? "$" : "₩";
  const multiplier = currency === "USD" ? 1 : 1350;

  return (
    <div className="sticky top-24 p-6 rounded-xl border border-gray-200 z-10">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {/* Price Range */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-4 h-4 flex items-center justify-center text-[#A4D7A7] text-sm font-bold">{currencySymbol}</div>
            <Label className="text-sm font-semibold text-gray-700">Price Range</Label>
          </div>
          <Slider
            min={0}
            max={3000}
            step={50}
            value={priceRange}
            onValueChange={(value: number[]) => onPriceRangeChange(value as [number, number])}
            className="mb-4"
          />
          <div className="flex justify-between">
            <span className="text-sm font-bold text-[#A4D7A7]">
              {(priceRange[0] * multiplier).toLocaleString()}
            </span>
            <span className="text-sm font-bold text-[#A4D7A7]">
              {(priceRange[1] * multiplier).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Bedrooms Filter */}
        {onBedroomsChange && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Bed className="w-4 h-4 text-[#A4D7A7]" />
              <Label className="text-sm font-semibold text-gray-700">Bedrooms</Label>
            </div>
            <div className="grid grid-cols-4 gap-3">
              <button
                onClick={() => onBedroomsChange(null)}
                className={`px-3 py-3 text-sm font-medium rounded-xl border-2 transition-all duration-300 ${
                  bedrooms === null 
                    ? 'bg-[#A4D7A7] text-white border-[#A4D7A7]' 
                    : 'bg-white text-gray-600 border-gray-200 hover:border-[#A4D7A7] hover:bg-gray-50'
                }`}
              >
                Any
              </button>
              {[1, 2, 3].map(num => (
                <button
                  key={num}
                  onClick={() => onBedroomsChange(num)}
                  className={`px-3 py-3 text-sm font-medium rounded-xl border-2 transition-all duration-300 ${
                    bedrooms === num 
                      ? 'bg-[#A4D7A7] text-white border-[#A4D7A7]' 
                      : 'bg-white text-gray-600 border-gray-200 hover:border-[#A4D7A7] hover:bg-gray-50'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Bathrooms Filter */}
        {onBathroomsChange && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Bath className="w-4 h-4 text-[#A4D7A7]" />
              <Label className="text-sm font-semibold text-gray-700">Bathrooms</Label>
            </div>
            <div className="grid grid-cols-4 gap-3">
              <button
                onClick={() => onBathroomsChange(null)}
                className={`px-3 py-3 text-sm font-medium rounded-xl border-2 transition-all duration-300 ${
                  bathrooms === null 
                    ? 'bg-[#A4D7A7] text-white border-[#A4D7A7]' 
                    : 'bg-white text-gray-600 border-gray-200 hover:border-[#A4D7A7] hover:bg-gray-50'
                }`}
              >
                Any
              </button>
              {[1, 2, 3].map(num => (
                <button
                  key={num}
                  onClick={() => onBathroomsChange(num)}
                  className={`px-3 py-3 text-sm font-medium rounded-xl border-2 transition-all duration-300 ${
                    bathrooms === num 
                      ? 'bg-[#A4D7A7] text-white border-[#A4D7A7]' 
                      : 'bg-white text-gray-600 border-gray-200 hover:border-[#A4D7A7] hover:bg-gray-50'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        )}



        {/* Optional Map Controls: rendered only if handlers are provided */}
        {typeof onRentMaxChange === "function" && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="text-sm font-semibold text-gray-700">Map Controls</div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600 mb-2">Max Rent: ${rentMax ?? 2000}</div>
                <input 
                  aria-label="Max rent" 
                  type="range" 
                  min={500} 
                  max={3000} 
                  step={50} 
                  value={rentMax ?? 2000} 
                  onChange={(e) => onRentMaxChange(Number(e.target.value))} 
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider" 
                />
              </div>

              <div>
                <div className="text-sm text-gray-600 mb-2">Bedrooms</div>
                <select 
                  aria-label="Bedrooms filter" 
                  value={bedroomsFilter ?? "any"} 
                  onChange={(e) => onBedroomsFilterChange?.(e.target.value === "any" ? null : Number(e.target.value))} 
                  className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:border-[#A4D7A7] focus:outline-none"
                >
                  <option value="any">Any</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>

              <label className="flex items-center gap-3 text-sm cursor-pointer">
                <input 
                  aria-label="Toggle heatmap" 
                  type="checkbox" 
                  checked={showHeatmap ?? true} 
                  onChange={(e) => onShowHeatmapChange?.(e.target.checked)} 
                  className="w-4 h-4 text-[#A4D7A7] bg-gray-100 border-gray-300 rounded focus:ring-[#A4D7A7] focus:ring-2"
                />
                <span className="text-gray-700">Show Heatmap</span>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
