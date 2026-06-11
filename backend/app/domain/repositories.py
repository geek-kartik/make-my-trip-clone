from typing import Protocol

from app.domain.schemas import (
    City,
    FareType,
    Flight,
    HomepageContent,
    Offer,
    OfferCategory,
    TravelClass,
)


class TravelCatalogRepository(Protocol):
    def list_cities(self, query: str | None = None, exclude_code: str | None = None) -> list[City]:
        ...

    def get_city(self, code: str) -> City | None:
        ...

    def list_offers(self, category: OfferCategory = OfferCategory.ALL) -> list[Offer]:
        ...

    def list_flights(self, from_code: str, to_code: str, travel_class: TravelClass) -> list[Flight]:
        ...

    def get_homepage_content(self) -> HomepageContent:
        ...

    def fare_price_multiplier(self, fare_type: FareType) -> float:
        ...
