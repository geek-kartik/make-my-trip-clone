from datetime import date
from enum import Enum
from typing import Any, Optional

from pydantic import BaseModel, ConfigDict, Field


def to_camel(value: str) -> str:
    parts = value.split("_")
    return parts[0] + "".join(part.capitalize() for part in parts[1:])


class ApiModel(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        serialize_by_alias=True,
    )


class TravelTab(str, Enum):
    FLIGHTS = "flights"
    HOTELS = "hotels"
    HOMESTAYS = "homestays"
    HOLIDAYS = "holidays"
    TRAINS = "trains"
    BUSES = "buses"
    CABS = "cabs"
    TOURS = "tours"
    VISA = "visa"
    CRUISE = "cruise"
    FOREX = "forex"
    INSURANCE = "insurance"


class TripType(str, Enum):
    ONE_WAY = "oneWay"
    ROUND_TRIP = "roundTrip"
    MULTI_CITY = "multiCity"


class TravelClass(str, Enum):
    ECONOMY = "economy"
    PREMIUM_ECONOMY = "premiumEconomy"
    BUSINESS = "business"
    FIRST_CLASS = "firstClass"


class FareType(str, Enum):
    REGULAR = "regular"
    STUDENT = "student"
    SENIOR = "senior"
    ARMED = "armed"
    DOCTOR = "doctor"
    DOUBLE = "double"


class OfferCategory(str, Enum):
    ALL = "all"
    FLIGHTS = "flights"
    HOTELS = "hotels"
    HOLIDAYS = "holidays"
    CABS = "cabs"
    OTHERS = "others"


class City(ApiModel):
    code: str = Field(min_length=3, max_length=3)
    name: str
    airport: str
    country: str
    group: str = "Popular Cities"


class Offer(ApiModel):
    id: str
    category: OfferCategory
    title: str
    subtitle: str
    description: str
    code: str
    image_url: str
    expiry: str


class Flight(ApiModel):
    id: str
    airline: str
    airline_code: str
    logo_url: str
    flight_number: str
    from_code: str
    from_city: str
    to_code: str
    to_city: str
    departure_time: str
    arrival_time: str
    duration: str
    stops: int
    stop_details: str
    price: int
    category: list[TravelClass]


class FlightSearchParams(ApiModel):
    from_code: str = Field(min_length=3, max_length=3)
    to_code: str = Field(min_length=3, max_length=3)
    departure_date: date
    return_date: Optional[date] = None
    trip_type: TripType = TripType.ONE_WAY
    travel_class: TravelClass = TravelClass.ECONOMY
    fare_type: FareType = FareType.REGULAR
    adults: int = Field(default=1, ge=1, le=9)
    children: int = Field(default=0, ge=0, le=9)
    infants: int = Field(default=0, ge=0, le=9)


class FlightSearchResponse(ApiModel):
    request_id: str
    source: City
    destination: City
    total_results: int
    currency: str = "INR"
    flights: list[Flight]


class TravelTabItem(ApiModel):
    id: TravelTab
    label: str
    icon: str


class FareTypeItem(ApiModel):
    id: FareType
    label: str
    desc: str


class HeroContent(ApiModel):
    eyebrow: str
    title: str
    subtitle: str
    alert: str


class AdvisoryContent(ApiModel):
    title: str
    body: str
    cta_label: str


class DownloadAppContent(ApiModel):
    eyebrow: str
    title: str
    body: str
    app_store_url: str
    play_store_url: str
    phone_mockup_route: str
    offer_title: str
    offer_code: str


class FooterDirectory(ApiModel):
    title: str
    icon: str
    links: list[str]


class FooterContent(ApiModel):
    company_address: str
    about_title: str
    about_body: str
    directories: list[FooterDirectory]


class BrandTrustItem(ApiModel):
    id: str
    title: str
    text: str
    image_url: str


class HomepageContent(ApiModel):
    tabs: list[TravelTabItem]
    fares: list[FareTypeItem]
    hero: HeroContent
    advisory: AdvisoryContent
    download_app: DownloadAppContent
    footer: FooterContent
    trust_items: list[BrandTrustItem]


class ApiEnvelope(ApiModel):
    data: Any
