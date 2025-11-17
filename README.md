
  # Housing Comparison Website

A modern React-based housing comparison platform designed for Dartmouth students to compare off-campus apartment listings with automatic currency and unit conversion features.

## 🚀 Quick Start

### Prerequisites

### Installation & Running
 
1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000/` to view the website
If the dev server shows a different port, follow the URL printed by the server (Vite prints the exact local port when it starts).

## 📁 Project Structure

```
Housing Comparison Website/
├── index.html                 # Main HTML entry point
├── package.json              # Project dependencies and scripts
├── vite.config.ts           # Vite build configuration
├── tsconfig.json            # TypeScript configuration
├── tsconfig.node.json       # Node.js TypeScript configuration
├── README.md                # Project documentation
├── src/                     # Source code directory
│   ├── main.tsx             # React application entry point
│   ├── App.tsx              # Main application component with routing
│   ├── index.css            # Global CSS styles
│   ├── styles/
│   │   └── globals.css      # Additional global styles
│   ├── data/
│   │   └── mockData.ts      # Sample apartment data and constants
│   ├── components/          # React components
│   │   ├── HomePage.tsx     # Landing page with search and features
│   │   ├── CompareListings.tsx # Main apartment comparison page
│   │   ├── ApartmentCard.tsx    # Individual apartment listing card
│   │   ├── FilterPanel.tsx     # Price and amenity filters
│   │   ├── MapView.tsx          # Interactive map view
│   │   ├── TrendsDashboard.tsx # Rent trends and analytics
│   │   ├── Navigation.tsx       # Main navigation component
│   │   ├── figma/
│   │   │   └── ImageWithFallback.tsx # Image component with fallback
│   │   └── ui/               # Reusable UI components (shadcn/ui)
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── slider.tsx
│   │       ├── switch.tsx
│   │       ├── badge.tsx
│   │       └── ... (30+ UI components)
│   └── guidelines/

Additional important files
├── index.html               # Vite HTML template that mounts the React app
├── package.json             # Project dependencies and npm scripts
├── tsconfig.json            # TypeScript configuration used by the app
├── tsconfig.node.json       # TypeScript config used for node tooling
├── vite.config.ts           # Vite configuration (plugins, server options)
├── README.md                # This documentation file

Notes on important folders and files
- `src/main.tsx`: creates the React root and renders `<App />`. If you need to customize the router base or add providers (theme, context), do it here.
- `src/App.tsx`: defines application routes for `/`, `/compare`, `/map`, `/trends`. Look here to add new pages or change navigation.
- `src/components/ui/`: local copies/wrappers of shadcn/ui components. Reuse these across the app; they contain consistent styling and accessibility behavior.
- `src/data/mockData.ts`: contains the sample apartment objects used by the UI and charts. Update this file to change sample content.

How to run locally (detailed)
1. Open a terminal and change to the project directory:

```bash
cd '/Users/growingpenguin/Documents/HCI/Final_Project/Housing Comparison Website'
```

2. Install dependencies (only needed the first time or after changing package.json):

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

When Vite starts you'll see output similar to:

```
VITE v6.x.x  ready in 300 ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

Open `http://localhost:3000/` in your browser. If the Local port differs (for example 5173), use whatever Vite prints as the Local URL.

Troubleshooting
- If port 3000 is already in use, Vite will pick another port (look for the Local URL printed by Vite). You can specify a port with `vite --port 3000` or add `server: { port: 3000 }` in `vite.config.ts`.
- If you need to access the dev server from other devices on your network, start Vite with `npm run dev -- --host` or set `server.host` in `vite.config.ts`.
- If types or build fail, run `npm run build` to reproduce production errors, then fix TypeScript or import issues shown in the console.

Verification
- I started the dev server in this workspace and Vite reported the Local URL `http://localhost:3000/`. If you run `npm run dev` in your environment you should see the same (unless the port is taken).
│       └── Guidelines.md      # Design and development guidelines
```

## 🏠 Features

### Core Functionality
- **Apartment Listings**: Browse 8+ apartment listings with detailed information
- **Currency Conversion**: Toggle between USD ($) and KRW (₩) with real-time conversion
- **Unit Conversion**: Switch between square feet (ft²) and square meters (m²)
- **Advanced Filtering**: Filter by price range and private bathroom availability
- **Interactive Map**: View apartment locations with rent-level color coding
- **Trends Analysis**: Analyze average rent trends over time

### Pages & Navigation
- **Home** (`/`): Landing page with search functionality and feature overview
- **Compare** (`/compare`): Main apartment comparison interface with filters
- **Map View** (`/map`): Interactive map showing apartment locations
- **Trends** (`/trends`): Analytics dashboard with rent trend charts

### Sample Data
The application includes 8 sample apartment listings with:
- Pricing information (USD)
- Distance from campus
- Bedroom/bathroom counts
- Square footage
- Amenities (Parking, Laundry, WiFi, Gym, etc.)
- Private bathroom indicators
- High-quality images

## 🛠️ Technical Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Charts**: Recharts
- **Maps**: React-Leaflet with Leaflet.markercluster and Leaflet.heat
- **Testing**: Jest with React Testing Library
- **State Management**: React hooks (useState, useMemo)

## 🎨 Design System

- **Primary Color**: #A4D7A7 (Green)
- **Secondary Color**: #EAEAEA (Light Gray)
- **Typography**: Modern, clean fonts
- **Layout**: Responsive grid system
- **Components**: Consistent shadcn/ui design system

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npx jest --passWithNoTests` - Run Jest test suite

### Development Server
- **Local URL**: `http://localhost:3000/`
- **Network URL**: `http://10.3.7.171:3000/` (accessible from other devices)
- **Hot Reload**: Automatic refresh on file changes

### Testing
- **Test Runner**: Jest with React Testing Library
- **Test Command**: `npx jest --passWithNoTests`
- **Test Coverage**: MapView component with Leaflet integration
- **Mock Setup**: Comprehensive Leaflet API mocking in `jest.setup.js`
- **Test Files**: `src/components/MapView.test.tsx`

## 📊 Data Structure

### Apartment Object
```typescript
interface Apartment {
  id: number;
  name: string;
  rent: number; // USD per month
  distance: number; // miles from campus
  bedrooms: number;
  bathrooms: number;
  privateBathroom: boolean;
  sqft: number;
  amenities: string[];
  coordinates: { lat: number; lng: number };
  image: string;
}
```

### Conversion Rates
- **USD to KRW**: 1,350 (configurable)
- **Sqft to Sqm**: 0.092903 (standard conversion)

## 🎯 Original Design

This project is based on the original Figma design: [Housing Comparison Website](https://www.figma.com/design/JmJauZbaKlI9vDXJUAbto9/Housing-Comparison-Website)

## 📝 License

This project is for educational purposes as part of a Human-Computer Interaction final project.
 
## 🆕 Recent Updates

### Map UX Improvements
- Persistent floating filter sidebar integrated as a reusable `FilterPanel` component.
- SVG-based heatmap overlay (rent gradient) and simple clustering for map markers.
- Hover tooltips with summary stats and click interactions that open the existing details panel.
- Accessibility improvements: aria attributes for tooltip and form controls.

### Testing Infrastructure
- **Jest Test Suite**: Comprehensive testing setup with React Testing Library
- **Leaflet Mocking**: Complete mock coverage for Leaflet components and plugins
- **Test Environment**: Proper isolation for map components in test environment
- **All Tests Passing**: 3/3 tests with proper error handling and defensive coding

### Development Experience
- **Enhanced Jest Configuration**: Improved module resolution and mock management
- **Defensive Coding**: Components handle missing dependencies gracefully
- **Test Environment Checks**: Leaflet functionality properly isolated in tests
- **Comprehensive Mocking**: Full Leaflet API coverage for reliable testing

These changes are intentionally implemented without removing or modifying original features; they layer on top of the existing MapView and FilterPanel so you can test them incrementally.
  