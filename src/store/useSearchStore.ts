import { create } from "zustand";

export type TravelTab =
  | "flights"
  | "hotels"
  | "homestays"
  | "holidays"
  | "trains"
  | "buses"
  | "cabs"
  | "tours"
  | "visa"
  | "cruise"
  | "forex"
  | "insurance";
export type TripType = "oneWay" | "roundTrip" | "multiCity";
export type TravelClass = "economy" | "premiumEconomy" | "business" | "firstClass";
export type FareType = "regular" | "student" | "senior" | "armed" | "doctor" | "double";

export interface City {
  code: string;
  name: string;
  airport: string;
  country: string;
  group?: string;
}

export interface SearchState {
  activeTab: TravelTab;
  tripType: TripType;
  fromCity: City;
  toCity: City;
  departureDate: Date;
  returnDate: Date | null;
  travelers: {
    adults: number;
    children: number;
    infants: number;
  };
  travelClass: TravelClass;
  fareType: FareType;
  isSearchExecuted: boolean;
  
  // Actions
  setActiveTab: (tab: TravelTab) => void;
  setTripType: (type: TripType) => void;
  setFromCity: (city: City) => void;
  setToCity: (city: City) => void;
  setDepartureDate: (date: Date) => void;
  setReturnDate: (date: Date | null) => void;
  setTravelers: (travelers: { adults: number; children: number; infants: number }) => void;
  setTravelClass: (travelClass: TravelClass) => void;
  setFareType: (fareType: FareType) => void;
  setIsSearchExecuted: (executed: boolean) => void;
  swapCities: () => void;
  resetSearch: () => void;
}

const defaultFromCity: City = {
  code: "BLR",
  name: "Bengaluru",
  airport: "Kempegowda International Airport",
  country: "India",
};

const defaultToCity: City = {
  code: "DEL",
  name: "New Delhi",
  airport: "Indira Gandhi International Airport",
  country: "India",
};

const getTomorrow = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
};

export const useSearchStore = create<SearchState>((set) => ({
  activeTab: "flights",
  tripType: "oneWay",
  fromCity: defaultFromCity,
  toCity: defaultToCity,
  departureDate: getTomorrow(),
  returnDate: null,
  travelers: {
    adults: 1,
    children: 0,
    infants: 0,
  },
  travelClass: "economy",
  fareType: "regular",
  isSearchExecuted: false,

  setActiveTab: (tab) => set({ activeTab: tab, isSearchExecuted: false }),
  setTripType: (type) => set((state) => {
    let returnDate = state.returnDate;
    if (type === "roundTrip" && !returnDate) {
      const newReturn = new Date(state.departureDate);
      newReturn.setDate(newReturn.getDate() + 3);
      returnDate = newReturn;
    } else if (type === "oneWay") {
      returnDate = null;
    }
    return { tripType: type, returnDate };
  }),
  setFromCity: (city) => set({ fromCity: city }),
  setToCity: (city) => set({ toCity: city }),
  setDepartureDate: (date) => set((state) => {
    const updates: Partial<SearchState> = { departureDate: date };
    if (state.returnDate && state.returnDate < date) {
      const newReturn = new Date(date);
      newReturn.setDate(newReturn.getDate() + 3);
      updates.returnDate = newReturn;
    }
    return updates;
  }),
  setReturnDate: (date) => set({ returnDate: date }),
  setTravelers: (travelers) => set({ travelers }),
  setTravelClass: (travelClass) => set({ travelClass }),
  setFareType: (fareType) => set({ fareType }),
  setIsSearchExecuted: (executed) => set({ isSearchExecuted: executed }),
  swapCities: () => set((state) => ({
    fromCity: state.toCity,
    toCity: state.fromCity,
  })),
  resetSearch: () => set({
    activeTab: "flights",
    tripType: "oneWay",
    fromCity: defaultFromCity,
    toCity: defaultToCity,
    departureDate: getTomorrow(),
    returnDate: null,
    travelers: {
      adults: 1,
      children: 0,
      infants: 0,
    },
    travelClass: "economy",
    fareType: "regular",
    isSearchExecuted: false,
  }),
}));
