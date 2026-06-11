from datetime import date
from typing import Optional

from fastapi import APIRouter, Depends, Query

from app.api.dependencies import get_catalog_service
from app.domain.schemas import FareType, FlightSearchParams, FlightSearchResponse, TravelClass, TripType
from app.services.catalog_service import TravelCatalogService

router = APIRouter(prefix="/flights", tags=["flights"])


@router.get("/search", response_model=FlightSearchResponse)
async def search_flights(
    from_code: str = Query(min_length=3, max_length=3),
    to_code: str = Query(min_length=3, max_length=3),
    departure_date: date = Query(),
    return_date: Optional[date] = Query(default=None),
    trip_type: TripType = Query(default=TripType.ONE_WAY),
    travel_class: TravelClass = Query(default=TravelClass.ECONOMY),
    fare_type: FareType = Query(default=FareType.REGULAR),
    adults: int = Query(default=1, ge=1, le=9),
    children: int = Query(default=0, ge=0, le=9),
    infants: int = Query(default=0, ge=0, le=9),
    service: TravelCatalogService = Depends(get_catalog_service),
) -> FlightSearchResponse:
    params = FlightSearchParams(
        from_code=from_code.upper(),
        to_code=to_code.upper(),
        departure_date=departure_date,
        return_date=return_date,
        trip_type=trip_type,
        travel_class=travel_class,
        fare_type=fare_type,
        adults=adults,
        children=children,
        infants=infants,
    )
    return await service.search_flights(params)
