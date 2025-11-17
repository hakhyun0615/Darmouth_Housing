import { useNavigate } from "react-router-dom";
import { GitCompare, Map } from "lucide-react";
import { Card } from "./ui/card";
import { DartmouthLogo } from "./DartmouthLogo";

export function HomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: GitCompare,
      title: "Compare Listings",
      description: "View apartments side-by-side with currency and unit conversion",
      color: "#A4D7A7",
      path: "/compare"
    },
    {
      icon: Map,
      title: "Map View",
      description: "Explore housing locations with color-coded rent levels",
      color: "#EAEAEA",
      path: "/map"
    }
  ];



  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-2 pb-8 flex-1 flex flex-col justify-center">
        
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-8">
            <div className="flex items-center justify-center" style={{ height: '112px' }}>
              <DartmouthLogo className="h-full w-auto" />
            </div>
          </div>
          <h1 className="text-5xl mb-8">Find Your Home at Dartmouth</h1>
        </div>

        {/* Spacer for better visual separation */}
        <div style={{ height: '6rem' }}></div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                onClick={() => navigate(feature.path)}
                className="p-6 cursor-pointer hover:shadow-lg transition-shadow border-2 border-transparent hover:border-[#A4D7A7]"
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: feature.color }}
                >
                  <Icon className="w-6 h-6 text-gray-800" />
                </div>
                <h3 className="mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
