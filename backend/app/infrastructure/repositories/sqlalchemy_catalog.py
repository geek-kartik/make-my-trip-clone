from decimal import Decimal
from typing import Optional

from sqlalchemy import or_, select
from sqlalchemy.orm import Session, selectinload

from app.db.models import (
    AirlineModel,
    BrandTrustItemModel,
    CityModel,
    FareTypeModel,
    FlightModel,
    FooterDirectoryModel,
    HomepageContentModel,
    OfferModel,
    ProductTabModel,
)
from app.domain.schemas import (
    AdvisoryContent,
    BrandTrustItem,
    City,
    DownloadAppContent,
    FareType,
    FareTypeItem,
    Flight,
    FooterContent,
    FooterDirectory,
    HeroContent,
    HomepageContent,
    Offer,
    OfferCategory,
    TravelClass,
    TravelTab,
    TravelTabItem,
)


class SQLAlchemyTravelCatalogRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def list_cities(self, query: Optional[str] = None, exclude_code: Optional[str] = None) -> list[City]:
        statement = select(CityModel).where(CityModel.is_active.is_(True))

        normalized_exclude = (exclude_code or "").strip().upper()
        if normalized_exclude:
            statement = statement.where(CityModel.code != normalized_exclude)

        normalized_query = (query or "").strip()
        if normalized_query:
            like_query = f"%{normalized_query}%"
            statement = statement.where(
                or_(
                    CityModel.code.ilike(like_query),
                    CityModel.name.ilike(like_query),
                    CityModel.airport.ilike(like_query),
                    CityModel.country.ilike(like_query),
                    CityModel.group_name.ilike(like_query),
                )
            )

        statement = statement.order_by(CityModel.display_order.asc(), CityModel.name.asc())
        return [self._city_to_schema(city) for city in self.db.scalars(statement).all()]

    def get_city(self, code: str) -> Optional[City]:
        city = self.db.scalar(
            select(CityModel).where(CityModel.code == code.strip().upper(), CityModel.is_active.is_(True))
        )
        return self._city_to_schema(city) if city else None

    def list_offers(self, category: OfferCategory = OfferCategory.ALL) -> list[Offer]:
        statement = select(OfferModel).where(OfferModel.is_active.is_(True))
        if category != OfferCategory.ALL:
            statement = statement.where(OfferModel.category == category.value)

        statement = statement.order_by(OfferModel.display_order.asc(), OfferModel.id.asc())
        return [self._offer_to_schema(offer) for offer in self.db.scalars(statement).all()]

    def list_flights(self, from_code: str, to_code: str, travel_class: TravelClass) -> list[Flight]:
        source = self.get_city(from_code)
        destination = self.get_city(to_code)
        if source is None or destination is None:
            return []

        statement = (
            select(FlightModel)
            .join(AirlineModel)
            .options(selectinload(FlightModel.airline), selectinload(FlightModel.travel_classes))
            .where(FlightModel.is_active.is_(True))
            .order_by(FlightModel.display_order.asc(), FlightModel.id.asc())
        )

        route_multiplier = self._route_price_multiplier(source.code, destination.code)
        flights: list[Flight] = []
        for flight in self.db.scalars(statement).all():
            categories = [TravelClass(item.travel_class) for item in flight.travel_classes]
            if travel_class not in categories:
                continue
            flights.append(
                Flight(
                    id=f"flt-gen-{source.code}-{destination.code}-{flight.id}",
                    airline=flight.airline.name,
                    airline_code=flight.airline.code,
                    logo_url=flight.airline.logo_url,
                    flight_number=flight.flight_number,
                    from_code=source.code,
                    from_city=source.name,
                    to_code=destination.code,
                    to_city=destination.name,
                    departure_time=flight.departure_time,
                    arrival_time=flight.arrival_time,
                    duration=flight.duration,
                    stops=flight.stops,
                    stop_details=flight.stop_details,
                    price=round(flight.base_price * route_multiplier),
                    category=categories,
                )
            )

        return flights

    def get_homepage_content(self) -> HomepageContent:
        content = self.db.scalar(select(HomepageContentModel).where(HomepageContentModel.page_key == "home"))
        if content is None:
            raise RuntimeError("homepage_content row with page_key='home' is required")

        tabs = self.db.scalars(
            select(ProductTabModel)
            .where(ProductTabModel.is_active.is_(True))
            .order_by(ProductTabModel.display_order.asc(), ProductTabModel.id.asc())
        ).all()
        fares = self.db.scalars(
            select(FareTypeModel)
            .where(FareTypeModel.is_active.is_(True))
            .order_by(FareTypeModel.display_order.asc(), FareTypeModel.id.asc())
        ).all()
        footer_directories = self.db.scalars(
            select(FooterDirectoryModel)
            .options(selectinload(FooterDirectoryModel.links))
            .order_by(FooterDirectoryModel.display_order.asc(), FooterDirectoryModel.id.asc())
        ).all()
        trust_items = self.db.scalars(
            select(BrandTrustItemModel)
            .where(BrandTrustItemModel.is_active.is_(True))
            .order_by(BrandTrustItemModel.display_order.asc(), BrandTrustItemModel.id.asc())
        ).all()

        return HomepageContent(
            tabs=[
                TravelTabItem(id=TravelTab(tab.tab_key), label=tab.label, icon=tab.icon)
                for tab in tabs
            ],
            fares=[
                FareTypeItem(id=FareType(fare.fare_key), label=fare.label, desc=fare.description)
                for fare in fares
            ],
            hero=HeroContent(
                eyebrow=content.hero_eyebrow,
                title=content.hero_title,
                subtitle=content.hero_subtitle,
                alert=content.hero_alert,
            ),
            advisory=AdvisoryContent(
                title=content.advisory_title,
                body=content.advisory_body,
                cta_label=content.advisory_cta_label,
            ),
            download_app=DownloadAppContent(
                eyebrow=content.download_eyebrow,
                title=content.download_title,
                body=content.download_body,
                app_store_url=content.app_store_url,
                play_store_url=content.play_store_url,
                phone_mockup_route=content.phone_mockup_route,
                offer_title=content.offer_title,
                offer_code=content.offer_code,
            ),
            footer=FooterContent(
                company_address=content.company_address,
                about_title=content.about_title,
                about_body=content.about_body,
                directories=[
                    FooterDirectory(
                        title=directory.title,
                        icon=directory.icon,
                        links=[
                            link.label for link in sorted(directory.links, key=lambda item: (item.display_order, item.id))
                        ],
                    )
                    for directory in footer_directories
                ],
            ),
            trust_items=[
                BrandTrustItem(
                    id=item.trust_key,
                    title=item.title,
                    text=item.body,
                    image_url=item.image_url,
                )
                for item in trust_items
            ],
        )

    def fare_price_multiplier(self, fare_type: FareType) -> float:
        fare = self.db.scalar(
            select(FareTypeModel).where(FareTypeModel.fare_key == fare_type.value, FareTypeModel.is_active.is_(True))
        )
        if fare is None:
            return 1.0
        multiplier = fare.price_multiplier
        if isinstance(multiplier, Decimal):
            return float(multiplier)
        return float(multiplier)

    @staticmethod
    def _city_to_schema(city: CityModel) -> City:
        return City(
            code=city.code,
            name=city.name,
            airport=city.airport,
            country=city.country,
            group=city.group_name,
        )

    @staticmethod
    def _offer_to_schema(offer: OfferModel) -> Offer:
        return Offer(
            id=offer.offer_key,
            category=OfferCategory(offer.category),
            title=offer.title,
            subtitle=offer.subtitle,
            description=offer.description,
            code=offer.promo_code,
            image_url=offer.image_url,
            expiry=offer.expiry,
        )

    @staticmethod
    def _route_price_multiplier(from_code: str, to_code: str) -> float:
        if {from_code, to_code} == {"DEL", "BOM"}:
            return 1.0

        checksum = sum(ord(char) for char in f"{from_code}{to_code}")
        return 0.85 + (checksum % 5) * 0.15
