import asyncio
from uuid import uuid4

from fastapi import HTTPException, status

from app.domain.repositories import TravelCatalogRepository
from app.domain.schemas import (
    City,
    FareType,
    FlightSearchParams,
    FlightSearchResponse,
    HomepageContent,
    Offer,
    OfferCategory,
)


class TravelCatalogService:
    def __init__(self, repository: TravelCatalogRepository) -> None:
        self.repository = repository

    async def list_cities(self, query: str | None = None, exclude_code: str | None = None) -> list[City]:
        await self._simulate_latency(40)
        return self.repository.list_cities(query=query, exclude_code=exclude_code)

    async def list_offers(self, category: OfferCategory = OfferCategory.ALL) -> list[Offer]:
        await self._simulate_latency(60)
        return self.repository.list_offers(category=category)

    async def get_homepage_content(self) -> HomepageContent:
        await self._simulate_latency(35)
        return self.repository.get_homepage_content()

    async def search_flights(self, params: FlightSearchParams) -> FlightSearchResponse:
        await self._simulate_latency(250)

        source = self.repository.get_city(params.from_code)
        destination = self.repository.get_city(params.to_code)

        if source is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Unknown source city code: {params.from_code}",
            )
        if destination is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Unknown destination city code: {params.to_code}",
            )
        if source.code == destination.code:
            raise HTTPException(
                status_code=422,
                detail="Source and destination must be different.",
            )

        flights = self.repository.list_flights(source.code, destination.code, params.travel_class)
        flights = self._apply_fare_adjustment(flights, params.fare_type)

        return FlightSearchResponse(
            request_id=str(uuid4()),
            source=source,
            destination=destination,
            total_results=len(flights),
            flights=flights,
        )

    def _apply_fare_adjustment(self, flights, fare_type: FareType):
        multiplier = self.repository.fare_price_multiplier(fare_type)
        adjusted = []
        for flight in flights:
            copied = flight.model_copy(deep=True)
            copied.price = round(copied.price * multiplier)
            adjusted.append(copied)
        return adjusted

    @staticmethod
    async def _simulate_latency(milliseconds: int) -> None:
        await asyncio.sleep(milliseconds / 1000)
