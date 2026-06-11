from sqlalchemy.orm import Session

from app.data.mock_catalog import BASE_FLIGHTS, CITIES, FARE_MULTIPLIERS, HOMEPAGE, OFFERS
from app.db.models import (
    AirlineModel,
    BrandTrustItemModel,
    CityModel,
    FareTypeModel,
    FlightModel,
    FlightTravelClassModel,
    FooterDirectoryModel,
    FooterLinkModel,
    HomepageContentModel,
    OfferModel,
    ProductTabModel,
)


def has_seed_data(db: Session) -> bool:
    return db.query(HomepageContentModel).filter(HomepageContentModel.page_key == "home").one_or_none() is not None


def seed_database_if_empty(db: Session) -> bool:
    if has_seed_data(db):
        return False
    seed_database(db)
    return True


def seed_database(db: Session) -> None:
    _seed_cities(db)
    _seed_product_tabs(db)
    _seed_fare_types(db)
    _seed_homepage(db)
    _seed_footer(db)
    _seed_trust_items(db)
    _seed_offers(db)
    _seed_flights(db)
    db.commit()


def _seed_cities(db: Session) -> None:
    for order, city in enumerate(CITIES, start=1):
        row = db.query(CityModel).filter(CityModel.code == city.code).one_or_none()
        if row is None:
            row = CityModel(code=city.code)
            db.add(row)
        row.name = city.name
        row.airport = city.airport
        row.country = city.country
        row.group_name = city.group
        row.display_order = order
        row.is_active = True


def _seed_product_tabs(db: Session) -> None:
    for order, tab in enumerate(HOMEPAGE.tabs, start=1):
        row = db.query(ProductTabModel).filter(ProductTabModel.tab_key == tab.id.value).one_or_none()
        if row is None:
            row = ProductTabModel(tab_key=tab.id.value)
            db.add(row)
        row.label = tab.label
        row.icon = tab.icon
        row.display_order = order
        row.is_new = tab.id.value == "cruise"
        row.is_active = True


def _seed_fare_types(db: Session) -> None:
    for order, fare in enumerate(HOMEPAGE.fares, start=1):
        row = db.query(FareTypeModel).filter(FareTypeModel.fare_key == fare.id.value).one_or_none()
        if row is None:
            row = FareTypeModel(fare_key=fare.id.value)
            db.add(row)
        row.label = fare.label
        row.description = fare.desc
        row.price_multiplier = FARE_MULTIPLIERS[fare.id]
        row.display_order = order
        row.is_active = True


def _seed_homepage(db: Session) -> None:
    row = db.query(HomepageContentModel).filter(HomepageContentModel.page_key == "home").one_or_none()
    if row is None:
        row = HomepageContentModel(page_key="home")
        db.add(row)

    row.hero_eyebrow = HOMEPAGE.hero.eyebrow
    row.hero_title = HOMEPAGE.hero.title
    row.hero_subtitle = HOMEPAGE.hero.subtitle
    row.hero_alert = HOMEPAGE.hero.alert
    row.advisory_title = HOMEPAGE.advisory.title
    row.advisory_body = HOMEPAGE.advisory.body
    row.advisory_cta_label = HOMEPAGE.advisory.cta_label
    row.download_eyebrow = HOMEPAGE.download_app.eyebrow
    row.download_title = HOMEPAGE.download_app.title
    row.download_body = HOMEPAGE.download_app.body
    row.app_store_url = HOMEPAGE.download_app.app_store_url
    row.play_store_url = HOMEPAGE.download_app.play_store_url
    row.phone_mockup_route = HOMEPAGE.download_app.phone_mockup_route
    row.offer_title = HOMEPAGE.download_app.offer_title
    row.offer_code = HOMEPAGE.download_app.offer_code
    row.company_address = HOMEPAGE.footer.company_address
    row.about_title = HOMEPAGE.footer.about_title
    row.about_body = HOMEPAGE.footer.about_body


def _seed_footer(db: Session) -> None:
    db.query(FooterLinkModel).delete()
    db.query(FooterDirectoryModel).delete()
    db.flush()

    for directory_order, directory in enumerate(HOMEPAGE.footer.directories, start=1):
        directory_row = FooterDirectoryModel(
            title=directory.title,
            icon=directory.icon,
            display_order=directory_order,
        )
        db.add(directory_row)
        db.flush()
        for link_order, link in enumerate(directory.links, start=1):
            db.add(
                FooterLinkModel(
                    directory_id=directory_row.id,
                    label=link,
                    href="#",
                    display_order=link_order,
                )
            )


def _seed_trust_items(db: Session) -> None:
    for order, item in enumerate(HOMEPAGE.trust_items, start=1):
        row = db.query(BrandTrustItemModel).filter(BrandTrustItemModel.trust_key == item.id).one_or_none()
        if row is None:
            row = BrandTrustItemModel(trust_key=item.id)
            db.add(row)
        row.title = item.title
        row.body = item.text
        row.image_url = item.image_url
        row.display_order = order
        row.is_active = True


def _seed_offers(db: Session) -> None:
    for order, offer in enumerate(OFFERS, start=1):
        row = db.query(OfferModel).filter(OfferModel.offer_key == offer.id).one_or_none()
        if row is None:
            row = OfferModel(offer_key=offer.id)
            db.add(row)
        row.category = offer.category.value
        row.title = offer.title
        row.subtitle = offer.subtitle
        row.description = offer.description
        row.promo_code = offer.code
        row.image_url = offer.image_url
        row.expiry = offer.expiry
        row.display_order = order
        row.is_active = True


def _seed_flights(db: Session) -> None:
    for order, flight in enumerate(BASE_FLIGHTS, start=1):
        airline = db.query(AirlineModel).filter(AirlineModel.code == flight.airline_code).one_or_none()
        if airline is None:
            airline = AirlineModel(
                code=flight.airline_code,
                name=flight.airline,
                logo_url=flight.logo_url,
            )
            db.add(airline)
            db.flush()
        airline.name = flight.airline
        airline.logo_url = flight.logo_url

        row = db.query(FlightModel).filter(FlightModel.flight_key == flight.id).one_or_none()
        if row is None:
            row = FlightModel(flight_key=flight.id)
            db.add(row)
        row.airline_id = airline.id
        row.flight_number = flight.flight_number
        row.departure_time = flight.departure_time
        row.arrival_time = flight.arrival_time
        row.duration = flight.duration
        row.stops = flight.stops
        row.stop_details = flight.stop_details
        row.base_price = flight.price
        row.display_order = order
        row.is_active = True
        db.flush()

        db.query(FlightTravelClassModel).filter(FlightTravelClassModel.flight_id == row.id).delete()
        for travel_class in flight.category:
            db.add(FlightTravelClassModel(flight_id=row.id, travel_class=travel_class.value))
