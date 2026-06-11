export type ProductId =
  | "flights"
  | "hotels"
  | "homestays"
  | "holidays"
  | "trains"
  | "buses"
  | "cabs"
  | "forex"
  | "insurance";

export type HeaderAction = {
  title: string;
  subtitle: string;
  variant?: "solid" | "ghost";
};

export type ProductNavItem = {
  id: ProductId;
  label: string;
  badge?: string;
};

export type AirportField = {
  label: string;
  code: string;
  city: string;
  detail: string;
};

export type DateField = {
  label: string;
  day: string;
  monthYear: string;
  weekday: string;
  helper?: string;
};

export type TravellerField = {
  adults: number;
  children: number;
  infants: number;
  cabin: string;
};

export type FareType = {
  id: string;
  title: string;
  subtitle: string;
};

export type FlightSearchContent = {
  headline: string;
  tripTypes: string[];
  from: AirportField;
  to: AirportField;
  departure: DateField;
  returnDate: DateField;
  travellers: TravellerField;
  fareTypes: FareType[];
};

export type PromoCard = {
  title: string;
  text: string;
  label: string;
  imageUrl: string;
  expires: string;
};

export type TrustBadge = {
  title: string;
  text: string;
  imageUrl: string;
  tagged?: boolean;
};

export type FooterGroup = {
  title: string;
  links: string[];
};

export type SeoBlock = {
  title: string;
  body: string;
};

export type HomepageContent = {
  headerActions: HeaderAction[];
  products: ProductNavItem[];
  flightSearch: FlightSearchContent;
  loginCard: {
    title: string;
    subtitle: string;
    imageUrl: string;
  };
  offers: PromoCard[];
  trustBadges: TrustBadge[];
  routeGroups: FooterGroup[];
  seoBlocks: SeoBlock[];
};
