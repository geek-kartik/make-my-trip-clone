import { City, FareType, TravelClass } from "../store/useSearchStore";

export interface Offer {
  id: string;
  category: "all" | "flights" | "hotels" | "holidays" | "cabs" | "others";
  title: string;
  subtitle: string;
  description: string;
  code: string;
  imageUrl: string;
  expiry: string;
}

export interface Flight {
  id: string;
  airline: string;
  airlineCode: string;
  logoUrl: string;
  flightNumber: string;
  fromCode: string;
  fromCity: string;
  toCode: string;
  toCity: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  stopDetails: string;
  price: number;
  category: TravelClass[];
}

export const mockCities: City[] = [
  { code: "DEL", name: "Delhi", airport: "Indira Gandhi International Airport", country: "India" },
  { code: "BOM", name: "Mumbai", airport: "Chhatrapati Shivaji Maharaj Intl Airport", country: "India" },
  { code: "BLR", name: "Bengaluru", airport: "Kempegowda International Airport", country: "India" },
  { code: "MAA", name: "Chennai", airport: "Chennai International Airport", country: "India" },
  { code: "CCU", name: "Kolkata", airport: "Netaji Subhash Chandra Bose Intl Airport", country: "India" },
  { code: "HYD", name: "Hyderabad", airport: "Rajiv Gandhi International Airport", country: "India" },
  { code: "PNQ", name: "Pune", airport: "Pune Airport", country: "India" },
  { code: "AMD", name: "Ahmedabad", airport: "Sardar Vallabhbhai Patel Intl Airport", country: "India" },
  { code: "COK", name: "Kochi", airport: "Cochin International Airport", country: "India" },
  { code: "GOI", name: "Goa", airport: "Dabolim International Airport", country: "India" },
  { code: "DXB", name: "Dubai", airport: "Dubai International Airport", country: "United Arab Emirates" },
  { code: "SIN", name: "Singapore", airport: "Changi International Airport", country: "Singapore" },
  { code: "LHR", name: "London", airport: "Heathrow Airport", country: "United Kingdom" },
  { code: "JFK", name: "New York", airport: "John F. Kennedy Intl Airport", country: "United States" },
  { code: "BKK", name: "Bangkok", airport: "Suvarnabhumi Airport", country: "Thailand" },
];

export const mockOffers: Offer[] = [
  {
    id: "off-1",
    category: "flights",
    title: "Grab up to 25% OFF* on Domestic Flights!",
    subtitle: "Use Credit Cards for extra discounts",
    description: "Book domestic flights using HDFC Bank credit cards and get instant cashback and interest-free EMIs.",
    code: "MMTHDFC",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    expiry: "Valid till 30th Jun"
  },
  {
    id: "off-2",
    category: "hotels",
    title: "Flat 30% OFF* on Luxury Hotels & Resorts",
    subtitle: "Pamper yourself with premium stays",
    description: "Plan your weekend getaways at premium properties across India and enjoy complimentary breakfast & room upgrades.",
    code: "MMTLUXE",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    expiry: "Valid till 25th Jun"
  },
  {
    id: "off-3",
    category: "flights",
    title: "Planning an International Trip?",
    subtitle: "Save up to ₹10,000 on flight bookings",
    description: "Special discounted fares on flights to Europe, USA, UAE, and Southeast Asia. Book now!",
    code: "INTLFLY",
    imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    expiry: "Valid till 30th Jun"
  },
  {
    id: "off-4",
    category: "holidays",
    title: "Europe Summer Packages are Live!",
    subtitle: "Book now and get free Visa assistance",
    description: "Explore France, Switzerland, Italy, and more. Customizable packages with premium hotels & tours.",
    code: "EUSUMMER",
    imageUrl: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    expiry: "Limited seats available"
  },
  {
    id: "off-5",
    category: "cabs",
    title: "Flat ₹500 OFF* on Outstation Cabs",
    subtitle: "Road trip calling? Book verified cabs",
    description: "Get clean, air-conditioned outstation cabs with professional drivers. Free cancellation available.",
    code: "MMTCAB",
    imageUrl: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    expiry: "Valid till 15th Jun"
  },
  {
    id: "off-6",
    category: "hotels",
    title: "Homestays & Villas: Flat 20% OFF",
    subtitle: "Stay in private pool villas & cottages",
    description: "Discover offbeat stays, homestays, and rental apartments for your group travel and remote work setups.",
    code: "MMTHOME",
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    expiry: "Valid till 30th Jun"
  }
];

export const mockFlights: Flight[] = [
  {
    id: "flt-1",
    airline: "IndiGo",
    airlineCode: "6E",
    logoUrl: "✈️",
    flightNumber: "6E-2014",
    fromCode: "DEL",
    fromCity: "Delhi",
    toCode: "BOM",
    toCity: "Mumbai",
    departureTime: "06:00",
    arrivalTime: "08:15",
    duration: "2h 15m",
    stops: 0,
    stopDetails: "Non stop",
    price: 5950,
    category: ["economy", "premiumEconomy"]
  },
  {
    id: "flt-2",
    airline: "Air India",
    airlineCode: "AI",
    logoUrl: "🇮🇳",
    flightNumber: "AI-865",
    fromCode: "DEL",
    fromCity: "Delhi",
    toCode: "BOM",
    toCity: "Mumbai",
    departureTime: "08:00",
    arrivalTime: "10:10",
    duration: "2h 10m",
    stops: 0,
    stopDetails: "Non stop",
    price: 6420,
    category: ["economy", "premiumEconomy", "business"]
  },
  {
    id: "flt-3",
    airline: "Vistara",
    airlineCode: "UK",
    logoUrl: "⭐",
    flightNumber: "UK-981",
    fromCode: "DEL",
    fromCity: "Delhi",
    toCode: "BOM",
    toCity: "Mumbai",
    departureTime: "10:20",
    arrivalTime: "12:35",
    duration: "2h 15m",
    stops: 0,
    stopDetails: "Non stop",
    price: 7200,
    category: ["economy", "premiumEconomy", "business", "firstClass"]
  },
  {
    id: "flt-4",
    airline: "Akasa Air",
    airlineCode: "QP",
    logoUrl: "⚡",
    flightNumber: "QP-1102",
    fromCode: "DEL",
    fromCity: "Delhi",
    toCode: "BOM",
    toCity: "Mumbai",
    departureTime: "14:15",
    arrivalTime: "16:30",
    duration: "2h 15m",
    stops: 0,
    stopDetails: "Non stop",
    price: 5700,
    category: ["economy"]
  },
  {
    id: "flt-5",
    airline: "IndiGo",
    airlineCode: "6E",
    logoUrl: "✈️",
    flightNumber: "6E-5012",
    fromCode: "DEL",
    fromCity: "Delhi",
    toCode: "BOM",
    toCity: "Mumbai",
    departureTime: "17:30",
    arrivalTime: "21:45",
    duration: "4h 15m",
    stops: 1,
    stopDetails: "1 stop via AMD",
    price: 8100,
    category: ["economy"]
  },
  {
    id: "flt-6",
    airline: "SpiceJet",
    airlineCode: "SG",
    logoUrl: "🌶️",
    flightNumber: "SG-187",
    fromCode: "DEL",
    fromCity: "Delhi",
    toCode: "BOM",
    toCity: "Mumbai",
    departureTime: "20:00",
    arrivalTime: "22:15",
    duration: "2h 15m",
    stops: 0,
    stopDetails: "Non stop",
    price: 5850,
    category: ["economy", "premiumEconomy"]
  },
  {
    id: "flt-7",
    airline: "Air India",
    airlineCode: "AI",
    logoUrl: "🇮🇳",
    flightNumber: "AI-312",
    fromCode: "DEL",
    fromCity: "Delhi",
    toCode: "BOM",
    toCity: "Mumbai",
    departureTime: "22:15",
    arrivalTime: "00:30",
    duration: "2h 15m",
    stops: 0,
    stopDetails: "Non stop",
    price: 6100,
    category: ["economy", "business"]
  }
];

// Helper to filter/search flights dynamically or generate dummy flights for arbitrary cities
export const getFlights = (from: string, to: string, travelClass: TravelClass): Flight[] => {
  // Return matching routes if available, or generate dynamic ones
  const baseFlights = mockFlights.filter(f => f.category.includes(travelClass));
  
  return baseFlights.map((f, i) => {
    // Determine dynamic price multipliers depending on route
    let priceMultiplier = 1.0;
    const isDelhiMumbai = (from === "DEL" && to === "BOM") || (from === "BOM" && to === "DEL");
    if (!isDelhiMumbai) {
      // Add some variance for other routes
      const sumCodes = from.charCodeAt(0) + to.charCodeAt(0);
      priceMultiplier = 0.85 + (sumCodes % 5) * 0.15;
    }
    
    return {
      ...f,
      id: `flt-gen-${from}-${to}-${i}`,
      fromCode: from,
      fromCity: mockCities.find(c => c.code === from)?.name || from,
      toCode: to,
      toCity: mockCities.find(c => c.code === to)?.name || to,
      price: Math.round(f.price * priceMultiplier),
    };
  });
};
