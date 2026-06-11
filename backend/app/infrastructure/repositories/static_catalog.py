from copy import deepcopy
from typing import Optional

from app.data.mock_catalog import BASE_FLIGHTS, CITIES, FARE_MULTIPLIERS, HOMEPAGE, OFFERS
from app.domain.schemas import City, FareType, Flight, HomepageContent, Offer, OfferCategory, TravelClass


class StaticTravelCatalogRepository:
    def list_cities(self, query: Optional[str] = None, exclude_code: Optional[str] = None) -> list[City]:
        normalized_query = (query or "").strip().lower()
        normalized_exclude = (exclude_code or "").strip().upper()

        results = []
        for city in CITIES:
            if normalized_exclude and city.code == normalized_exclude:
                continue
            if normalized_query and normalized_query not in " ".join(
                [city.code, city.name, city.airport, city.country]
            ).lower():
                continue
            results.append(city)

        return results

    def get_city(self, code: str) -> Optional[City]:
        normalized_code = code.strip().upper()
        return next((city for city in CITIES if city.code == normalized_code), None)

    def list_offers(self, category: OfferCategory = OfferCategory.ALL) -> list[Offer]:
        if category == OfferCategory.ALL:
            return OFFERS.copy()
        return [offer for offer in OFFERS if offer.category == category]

    def list_flights(self, from_code: str, to_code: str, travel_class: TravelClass) -> list[Flight]:
        source = self.get_city(from_code)
        destination = self.get_city(to_code)
        if source is None or destination is None:
            return []

        price_multiplier = self._route_price_multiplier(source.code, destination.code)
        generated_flights: list[Flight] = []

        for index, base_flight in enumerate(BASE_FLIGHTS):
            if travel_class not in base_flight.category:
                continue

            flight = deepcopy(base_flight)
            flight.id = f"flt-gen-{source.code}-{destination.code}-{index}"
            flight.from_code = source.code
            flight.from_city = source.name
            flight.to_code = destination.code
            flight.to_city = destination.name
            flight.price = round(flight.price * price_multiplier)
            generated_flights.append(flight)

        return generated_flights

    def get_homepage_content(self) -> HomepageContent:
        return HOMEPAGE

    def fare_price_multiplier(self, fare_type: FareType) -> float:
        return FARE_MULTIPLIERS.get(fare_type, 1.0)

    @staticmethod
    def _route_price_multiplier(from_code: str, to_code: str) -> float:
        if {from_code, to_code} == {"DEL", "BOM"}:
            return 1.0

        checksum = sum(ord(char) for char in f"{from_code}{to_code}")
        return 0.85 + (checksum % 5) * 0.15
