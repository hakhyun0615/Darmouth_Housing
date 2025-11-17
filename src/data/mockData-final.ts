// Complete TypeScript module with all valid CSV data

export interface Apartment {
  id: number;
  name: string;
  rent: number; 
  bedrooms: number;
  bathrooms: number;
  coordinates: { lat: number; lng: number };
  image: string;
}

export const USD_TO_KRW = 1300;

// Sample images pool
const sampleImages = [
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
  "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800",
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800",
  "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800",
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
  "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800"
];

function getRandomImage(): string {
  return sampleImages[Math.floor(Math.random() * sampleImages.length)];
}

export const apartments: Apartment[] = [
  {
    id: 5,
    name: "1 N. Park St Apt 5",
    rent: Math.round(1871.111111),
    bedrooms: 2,
    bathrooms: 1,
    coordinates: { lat: 43.700391, lng: -72.28784312 },
    image: getRandomImage()
  },
  {
    id: 12,
    name: "1 Sanborn Rd Apt 3",
    rent: 1715,
    bedrooms: 1,
    bathrooms: 1,
    coordinates: { lat: 43.7177744, lng: -72.1761048 },
    image: getRandomImage()
  },
  {
    id: 33,
    name: "1 South St Apt 311",
    rent: 1715,
    bedrooms: 1,
    bathrooms: 1,
    coordinates: { lat: 43.7036466, lng: -72.28191863 },
    image: getRandomImage()
  },
  {
    id: 34,
    name: "1 South St Apt 401",
    rent: Math.round(1871.111111),
    bedrooms: 2,
    bathrooms: 1,
    coordinates: { lat: 43.7036466, lng: -72.28191863 },
    image: getRandomImage()
  },
  {
    id: 35,
    name: "1 South St Apt 402",
    rent: Math.round(1871.111111),
    bedrooms: 2,
    bathrooms: 1,
    coordinates: { lat: 43.7036466, lng: -72.28191863 },
    image: getRandomImage()
  },
  {
    id: 36,
    name: "1 S. Balch St",
    rent: Math.round(1871.111111),
    bedrooms: 2,
    bathrooms: 1,
    coordinates: { lat: 43.70966045, lng: -72.26254336 },
    image: getRandomImage()
  },
  {
    id: 37,
    name: "3 S. Balch St.",
    rent: Math.round(1871.111111),
    bedrooms: 2,
    bathrooms: 1,
    coordinates: { lat: 43.70543025, lng: -72.28034235 },
    image: getRandomImage()
  },
  {
    id: 38,
    name: "13 Summer St",
    rent: Math.round(2186.666667),
    bedrooms: 2,
    bathrooms: 1,
    coordinates: { lat: 43.71077035, lng: -72.26863658 },
    image: getRandomImage()
  },
  {
    id: 39,
    name: "17 W. Wheelock St -A",
    rent: 1715,
    bedrooms: 1,
    bathrooms: 1,
    coordinates: { lat: 43.70262175, lng: -72.2924945 },
    image: getRandomImage()
  },
  {
    id: 40,
    name: "17 W. Wheelock St -B",
    rent: 1715,
    bedrooms: 1,
    bathrooms: 1,
    coordinates: { lat: 43.70359605, lng: -72.29967016 },
    image: getRandomImage()
  },
  {
    id: 41,
    name: "17 W. Wheelock St - C",
    rent: 1715,
    bedrooms: 1,
    bathrooms: 1,
    coordinates: { lat: 43.70262175, lng: -72.2924945 },
    image: getRandomImage()
  },
  {
    id: 42,
    name: "17 W. Wheelock St - D",
    rent: 1715,
    bedrooms: 1,
    bathrooms: 1,
    coordinates: { lat: 43.70262175, lng: -72.2924945 },
    image: getRandomImage()
  },
  {
    id: 43,
    name: "17 W. Wheelock St -E",
    rent: 1715,
    bedrooms: 1,
    bathrooms: 1,
    coordinates: { lat: 43.70262175, lng: -72.2924945 },
    image: getRandomImage()
  },
  {
    id: 44,
    name: "17 W. Wheelock St - F",
    rent: 1715,
    bedrooms: 1,
    bathrooms: 1,
    coordinates: { lat: 43.70163225, lng: -72.2882159 },
    image: getRandomImage()
  },
  {
    id: 45,
    name: "17 W. Wheelock St - G",
    rent: 1715,
    bedrooms: 1,
    bathrooms: 1,
    coordinates: { lat: 43.70262175, lng: -72.2924945 },
    image: getRandomImage()
  },
  {
    id: 46,
    name: "17 W. Wheelock St - H",
    rent: 1715,
    bedrooms: 1,
    bathrooms: 1,
    coordinates: { lat: 43.70262175, lng: -72.2924945 },
    image: getRandomImage()
  },
  {
    id: 47,
    name: "17 W. Wheelock St -J",
    rent: 1715,
    bedrooms: 1,
    bathrooms: 1,
    coordinates: { lat: 43.70262175, lng: -72.2924945 },
    image: getRandomImage()
  },
  {
    id: 48,
    name: "17 W. Wheelock St Apt K",
    rent: 1715,
    bedrooms: 1,
    bathrooms: 1,
    coordinates: { lat: 43.70262175, lng: -72.2924945 },
    image: getRandomImage()
  },
  {
    id: 49,
    name: "17 Valley Rd",
    rent: Math.round(1871.111111),
    bedrooms: 2,
    bathrooms: 1,
    coordinates: { lat: 43.7033454, lng: -72.27964105 },
    image: getRandomImage()
  },
  {
    id: 50,
    name: "19 W. Wheelock St - 1W",
    rent: 1715,
    bedrooms: 1,
    bathrooms: 1,
    coordinates: { lat: 43.7041054, lng: -72.28277995 },
    image: getRandomImage()
  },
  {
    id: 51,
    name: "19 W. Wheelock St - 1E",
    rent: 1715,
    bedrooms: 1,
    bathrooms: 1,
    coordinates: { lat: 43.7041054, lng: -72.28277995 },
    image: getRandomImage()
  },
  {
    id: 52,
    name: "19 W. Wheelock St - 2W",
    rent: 1715,
    bedrooms: 1,
    bathrooms: 1,
    coordinates: { lat: 43.7041054, lng: -72.28277995 },
    image: getRandomImage()
  },
  {
    id: 53,
    name: "19 W. Wheelock St- 2E",
    rent: 1715,
    bedrooms: 1,
    bathrooms: 1,
    coordinates: { lat: 43.7041054, lng: -72.28277995 },
    image: getRandomImage()
  },
  {
    id: 54,
    name: "19 W. Wheelock St Apt 3E",
    rent: 1715,
    bedrooms: 1,
    bathrooms: 1,
    coordinates: { lat: 43.7041054, lng: -72.28277995 },
    image: getRandomImage()
  },
  {
    id: 55,
    name: "19 W. Wheelock St Apt 3W",
    rent: 1715,
    bedrooms: 1,
    bathrooms: 1,
    coordinates: { lat: 43.7041054, lng: -72.28277995 },
    image: getRandomImage()
  },
  {
    id: 56,
    name: "2 S. Balch St - A",
    rent: Math.round(2186.666667),
    bedrooms: 2,
    bathrooms: 1,
    coordinates: { lat: 43.70912495, lng: -72.26380219 },
    image: getRandomImage()
  },
  {
    id: 57,
    name: "2 S. Balch St - B",
    rent: Math.round(2186.666667),
    bedrooms: 2,
    bathrooms: 1,
    coordinates: { lat: 43.70912495, lng: -72.26380219 },
    image: getRandomImage()
  },
  {
    id: 58,
    name: "21 S. Park St Apt A",
    rent: Math.round(1871.111111),
    bedrooms: 2,
    bathrooms: 1,
    coordinates: { lat: 43.6817667, lng: -72.23653442 },
    image: getRandomImage()
  },
  {
    id: 59,
    name: "22 E. Wheelock St - A",
    rent: Math.round(1871.111111),
    bedrooms: 2,
    bathrooms: 1,
    coordinates: { lat: 43.70229125, lng: -72.29348202 },
    image: getRandomImage()
  },
  {
    id: 60,
    name: "22 E. Wheelock St -B",
    rent: Math.round(1871.111111),
    bedrooms: 2,
    bathrooms: 1,
    coordinates: { lat: 43.70359605, lng: -72.29967016 },
    image: getRandomImage()
  }
];
