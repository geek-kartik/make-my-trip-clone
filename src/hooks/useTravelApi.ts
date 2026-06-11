import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

import type { OfferCategory } from "@/services/api-types";
import { travelApi } from "@/services/travel-api";
import type { City } from "@/store/useSearchStore";
import { useSearchStore } from "@/store/useSearchStore";

export const travelQueryKeys = {
  homepage: ["homepage"] as const,
  cities: (query: string, excludeCode?: string) => ["cities", query, excludeCode] as const,
  offers: (category: OfferCategory) => ["offers", category] as const,
  flights: (params: Record<string, unknown>) => ["flights", params] as const,
};

export function useHomepageContent() {
  return useQuery({
    queryKey: travelQueryKeys.homepage,
    queryFn: travelApi.getHomepage,
  });
}

export function useCities(query: string, excludeCity?: City) {
  return useQuery({
    queryKey: travelQueryKeys.cities(query, excludeCity?.code),
    queryFn: () => travelApi.listCities(query || undefined, excludeCity?.code),
  });
}

export function useOffers(category: OfferCategory) {
  return useQuery({
    queryKey: travelQueryKeys.offers(category),
    queryFn: () => travelApi.listOffers(category),
  });
}

export function useFlightSearch() {
  const {
    fromCity,
    toCity,
    departureDate,
    returnDate,
    tripType,
    travelers,
    travelClass,
    fareType,
  } = useSearchStore();

  const request = {
    fromCode: fromCity.code,
    toCode: toCity.code,
    departureDate: format(departureDate, "yyyy-MM-dd"),
    returnDate: returnDate ? format(returnDate, "yyyy-MM-dd") : null,
    tripType,
    travelClass,
    fareType,
    adults: travelers.adults,
    children: travelers.children,
    infants: travelers.infants,
  };

  return useQuery({
    queryKey: travelQueryKeys.flights(request),
    queryFn: () => travelApi.searchFlights(request),
    enabled: false,
  });
}
