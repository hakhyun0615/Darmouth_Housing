import { useState } from "react";
import { DollarSign } from "lucide-react";
import { Card } from "./ui/card";
import { apartments, USD_TO_KRW } from "../data/mockData";

export function TrendsDashboard() {
  const [currency, setCurrency] = useState<"USD" | "KRW">("USD");

  // Calculate statistics from CSV data
  const totalApartments = apartments.length;
  const avgRent = totalApartments > 0 ? apartments.reduce((sum, apt) => sum + apt.rent, 0) / totalApartments : 0;
  const minRent = totalApartments > 0 ? Math.min(...apartments.map(apt => apt.rent)) : 0;
  const maxRent = totalApartments > 0 ? Math.max(...apartments.map(apt => apt.rent)) : 0;

  const currentAvg = currency === "USD" 
    ? avgRent 
    : avgRent * USD_TO_KRW;

  const displayMin = currency === "USD" ? minRent : minRent * USD_TO_KRW;
  const displayMax = currency === "USD" ? maxRent : maxRent * USD_TO_KRW;

  // Group apartments by bedroom count
  const byBedrooms = apartments.reduce((acc, apt) => {
    const key = `${apt.bedrooms}BR`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(apt);
    return acc;
  }, {} as Record<string, typeof apartments>);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="mb-2">Trends Dashboard</h1>
            <p className="text-gray-600">Housing statistics from CSV data</p>
          </div>
          
          <button
            onClick={() => setCurrency(currency === "USD" ? "KRW" : "USD")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#A4D7A7] hover:bg-[#92c595] text-gray-900 transition-colors"
          >
            <DollarSign className="w-4 h-4" />
            {currency}
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Average Rent</span>
              <DollarSign className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl text-[#A4D7A7]">
              {currency === "USD" ? "$" : "₩"}
              {Math.round(currentAvg).toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">
              Across {totalApartments} apartments
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-gray-600 mb-2">Highest Rent</div>
            <div className="text-3xl text-red-500">
              {currency === "USD" ? "$" : "₩"}
              {Math.round(displayMax).toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">Maximum</div>
          </Card>

          <Card className="p-6">
            <div className="text-gray-600 mb-2">Lowest Rent</div>
            <div className="text-3xl text-blue-500">
              {currency === "USD" ? "$" : "₩"}
              {Math.round(displayMin).toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">Minimum</div>
          </Card>

          <Card className="p-6">
            <div className="text-gray-600 mb-2">Total Listings</div>
            <div className="text-3xl">{totalApartments}</div>
            <div className="text-sm text-gray-500">Available apartments</div>
          </Card>
        </div>

        {/* Rent by Bedroom Count */}
        <Card className="p-6">
          <h3 className="mb-6">Average Rent by Bedroom Count</h3>
          
          <div className="space-y-4">
            {Object.entries(byBedrooms).map(([key, apts]) => {
              const avg = apts.reduce((sum, apt) => sum + apt.rent, 0) / apts.length;
              const displayAvg = currency === "USD" ? avg : avg * USD_TO_KRW;
              const percentage = (apts.length / totalApartments) * 100;
              
              return (
                <div key={key} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <span className="font-bold text-lg">{key}</span>
                      <span className="text-sm text-gray-600 ml-2">({apts.length} apartments)</span>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-[#A4D7A7]">
                        {currency === "USD" ? "$" : "₩"}
                        {Math.round(displayAvg).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">average</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#A4D7A7] h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{percentage.toFixed(1)}% of listings</div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-[#EAEAEA] rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Insight:</strong> Data shows actual rent prices from CSV. Prices vary by bedroom count and location.
            </p>
          </div>
        </Card>

        {/* Additional Analysis */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <Card className="p-6">
            <h3 className="mb-4">Price Distribution</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Budget (&lt; $1000)</span>
                  <span>25%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#4ade80] h-2 rounded-full" style={{ width: "25%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Mid-range ($1000-$1500)</span>
                  <span>50%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#fbbf24] h-2 rounded-full" style={{ width: "50%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Premium (&gt; $1500)</span>
                  <span>25%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#ef4444] h-2 rounded-full" style={{ width: "25%" }}></div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4">Quick Conversions</h3>
            <div className="space-y-3">
              <div className="flex justify-between p-3 bg-[#EAEAEA] rounded-lg">
                <span>$1000 USD</span>
                <span>≈ ₩1,350,000 KRW</span>
              </div>
              <div className="flex justify-between p-3 bg-[#EAEAEA] rounded-lg">
                <span>$1500 USD</span>
                <span>≈ ₩2,025,000 KRW</span>
              </div>
              <div className="flex justify-between p-3 bg-[#EAEAEA] rounded-lg">
                <span>500 ft²</span>
                <span>≈ 46.5 m²</span>
              </div>
              <div className="flex justify-between p-3 bg-[#EAEAEA] rounded-lg">
                <span>1000 ft²</span>
                <span>≈ 92.9 m²</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
