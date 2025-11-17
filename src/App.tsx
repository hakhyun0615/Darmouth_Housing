import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./components/HomePage";
import { CompareListings } from "./components/CompareListings";
import { MapView } from "./components/MapView";
import { TrendsDashboard } from "./components/TrendsDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white flex flex-col">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/compare" element={<CompareListings />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/trends" element={<TrendsDashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
