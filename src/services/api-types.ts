import type { City, FareType, TravelClass, TravelTab, TripType } from "@/store/useSearchStore";

export type OfferCategory = "all" | "flights" | "hotels" | "holidays" | "cabs" | "others";

export interface Offer {
  id: string;
  category: OfferCategory;
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

export interface FlightSearchResponse {
  requestId: string;
  source: City;
  destination: City;
  totalResults: number;
  currency: string;
  flights: Flight[];
}

export interface TravelTabItem {
  id: TravelTab;
  label: string;
  icon:
    | "plane"
    | "hotel"
    | "home"
    | "palmtree"
    | "train"
    | "bus"
    | "car"
    | "map"
    | "file"
    | "ship"
    | "card"
    | "shield";
}

export interface FareTypeItem {
  id: FareType;
  label: string;
  desc: string;
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  alert: string;
}

export interface AdvisoryContent {
  title: string;
  body: string;
  ctaLabel: string;
}

export interface DownloadAppContent {
  eyebrow: string;
  title: string;
  body: string;
  appStoreUrl: string;
  playStoreUrl: string;
  phoneMockupRoute: string;
  offerTitle: string;
  offerCode: string;
}

export interface FooterDirectory {
  title: string;
  icon: "plane" | "hotel" | "compass" | "train";
  links: string[];
}

export interface FooterContent {
  companyAddress: string;
  aboutTitle: string;
  aboutBody: string;
  directories: FooterDirectory[];
}

export interface BrandTrustItem {
  id: string;
  title: string;
  text: string;
  imageUrl: string;
}

export interface HomepageContent {
  tabs: TravelTabItem[];
  fares: FareTypeItem[];
  hero: HeroContent;
  advisory: AdvisoryContent;
  downloadApp: DownloadAppContent;
  footer: FooterContent;
  trustItems: BrandTrustItem[];
}

export interface FlightSearchRequest {
  fromCode: string;
  toCode: string;
  departureDate: string;
  returnDate?: string | null;
  tripType: TripType;
  travelClass: TravelClass;
  fareType: FareType;
  adults: number;
  children: number;
  infants: number;
}
