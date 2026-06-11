import type {
  FlightSearchRequest,
  FlightSearchResponse,
  HomepageContent,
  Offer,
  OfferCategory,
} from "@/services/api-types";
import type { City } from "@/store/useSearchStore";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api/v1";

class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    let message = `API request failed with status ${response.status}`;
    try {
      const payload = await response.json();
      if (typeof payload.detail === "string") {
        message = payload.detail;
      }
    } catch {
      // Keep the status-based message when a response has no JSON body.
    }
    throw new ApiError(message, response.status);
  }

  return response.json() as Promise<T>;
}

function toQuery(params: Record<string, string | number | null | undefined>): string {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.set(key, String(value));
    }
  });
  return query.toString();
}

export const travelApi = {
  getHomepage: () => request<HomepageContent>("/homepage"),

  listCities: (query?: string, excludeCode?: string) =>
    request<City[]>(`/locations/cities?${toQuery({ query, exclude_code: excludeCode })}`),

  listOffers: (category: OfferCategory = "all") =>
    request<Offer[]>(`/offers?${toQuery({ category })}`),

  searchFlights: (search: FlightSearchRequest) =>
    request<FlightSearchResponse>(
      `/flights/search?${toQuery({
        from_code: search.fromCode,
        to_code: search.toCode,
        departure_date: search.departureDate,
        return_date: search.returnDate,
        trip_type: search.tripType,
        travel_class: search.travelClass,
        fare_type: search.fareType,
        adults: search.adults,
        children: search.children,
        infants: search.infants,
      })}`,
    ),
};
