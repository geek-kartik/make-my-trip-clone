from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, Numeric, String, Text, UniqueConstraint
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy.sql import func

Base = declarative_base()


class TimestampMixin:
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)


class CityModel(TimestampMixin, Base):
    __tablename__ = "cities"

    id = Column(Integer, primary_key=True, autoincrement=True)
    code = Column(String(3), unique=True, nullable=False, index=True)
    name = Column(String(120), nullable=False, index=True)
    airport = Column(String(255), nullable=False)
    country = Column(String(120), nullable=False, index=True)
    group_name = Column(String(120), nullable=False, default="Popular Cities", index=True)
    is_active = Column(Boolean, nullable=False, default=True)
    display_order = Column(Integer, nullable=False, default=0)


class ProductTabModel(TimestampMixin, Base):
    __tablename__ = "product_tabs"

    id = Column(Integer, primary_key=True, autoincrement=True)
    tab_key = Column(String(40), unique=True, nullable=False)
    label = Column(String(80), nullable=False)
    icon = Column(String(40), nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)
    is_new = Column(Boolean, nullable=False, default=False)
    display_order = Column(Integer, nullable=False, default=0)


class FareTypeModel(TimestampMixin, Base):
    __tablename__ = "fare_types"

    id = Column(Integer, primary_key=True, autoincrement=True)
    fare_key = Column(String(40), unique=True, nullable=False)
    label = Column(String(80), nullable=False)
    description = Column(String(160), nullable=False)
    price_multiplier = Column(Numeric(8, 4), nullable=False, default=1)
    is_active = Column(Boolean, nullable=False, default=True)
    display_order = Column(Integer, nullable=False, default=0)


class HomepageContentModel(TimestampMixin, Base):
    __tablename__ = "homepage_content"

    id = Column(Integer, primary_key=True, autoincrement=True)
    page_key = Column(String(40), unique=True, nullable=False, default="home")
    hero_eyebrow = Column(String(120), nullable=False)
    hero_title = Column(String(160), nullable=False)
    hero_subtitle = Column(String(255), nullable=False)
    hero_alert = Column(String(160), nullable=False)
    advisory_title = Column(String(120), nullable=False)
    advisory_body = Column(String(255), nullable=False)
    advisory_cta_label = Column(String(80), nullable=False)
    download_eyebrow = Column(String(80), nullable=False)
    download_title = Column(String(160), nullable=False)
    download_body = Column(Text, nullable=False)
    app_store_url = Column(String(500), nullable=False)
    play_store_url = Column(String(500), nullable=False)
    phone_mockup_route = Column(String(60), nullable=False)
    offer_title = Column(String(120), nullable=False)
    offer_code = Column(String(40), nullable=False)
    company_address = Column(String(255), nullable=False)
    about_title = Column(String(120), nullable=False)
    about_body = Column(Text, nullable=False)


class FooterDirectoryModel(TimestampMixin, Base):
    __tablename__ = "footer_directories"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(80), nullable=False)
    icon = Column(String(40), nullable=False)
    display_order = Column(Integer, nullable=False, default=0)
    links = relationship("FooterLinkModel", back_populates="directory", cascade="all, delete-orphan")


class FooterLinkModel(TimestampMixin, Base):
    __tablename__ = "footer_links"

    id = Column(Integer, primary_key=True, autoincrement=True)
    directory_id = Column(Integer, ForeignKey("footer_directories.id", ondelete="CASCADE"), nullable=False)
    label = Column(String(120), nullable=False)
    href = Column(String(500), nullable=False, default="#")
    display_order = Column(Integer, nullable=False, default=0)
    directory = relationship("FooterDirectoryModel", back_populates="links")


class BrandTrustItemModel(TimestampMixin, Base):
    __tablename__ = "brand_trust_items"

    id = Column(Integer, primary_key=True, autoincrement=True)
    trust_key = Column(String(80), unique=True, nullable=False)
    title = Column(String(120), nullable=False)
    body = Column(String(255), nullable=False)
    image_url = Column(String(500), nullable=False)
    display_order = Column(Integer, nullable=False, default=0)
    is_active = Column(Boolean, nullable=False, default=True)


class OfferModel(TimestampMixin, Base):
    __tablename__ = "offers"

    id = Column(Integer, primary_key=True, autoincrement=True)
    offer_key = Column(String(80), unique=True, nullable=False)
    category = Column(String(40), nullable=False, index=True)
    title = Column(String(180), nullable=False)
    subtitle = Column(String(180), nullable=False)
    description = Column(Text, nullable=False)
    promo_code = Column(String(40), nullable=False)
    image_url = Column(String(500), nullable=False)
    expiry = Column(String(80), nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)
    display_order = Column(Integer, nullable=False, default=0)


class AirlineModel(TimestampMixin, Base):
    __tablename__ = "airlines"

    id = Column(Integer, primary_key=True, autoincrement=True)
    code = Column(String(12), unique=True, nullable=False)
    name = Column(String(120), nullable=False)
    logo_url = Column(String(500), nullable=False)
    flights = relationship("FlightModel", back_populates="airline")


class FlightModel(TimestampMixin, Base):
    __tablename__ = "flights"

    id = Column(Integer, primary_key=True, autoincrement=True)
    flight_key = Column(String(80), unique=True, nullable=False)
    airline_id = Column(Integer, ForeignKey("airlines.id"), nullable=False)
    flight_number = Column(String(40), nullable=False)
    departure_time = Column(String(10), nullable=False)
    arrival_time = Column(String(10), nullable=False)
    duration = Column(String(40), nullable=False)
    stops = Column(Integer, nullable=False, default=0)
    stop_details = Column(String(120), nullable=False)
    base_price = Column(Integer, nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)
    display_order = Column(Integer, nullable=False, default=0)
    airline = relationship("AirlineModel", back_populates="flights")
    travel_classes = relationship("FlightTravelClassModel", back_populates="flight", cascade="all, delete-orphan")


class FlightTravelClassModel(TimestampMixin, Base):
    __tablename__ = "flight_travel_classes"
    __table_args__ = (UniqueConstraint("flight_id", "travel_class", name="uq_flight_travel_class"),)

    id = Column(Integer, primary_key=True, autoincrement=True)
    flight_id = Column(Integer, ForeignKey("flights.id", ondelete="CASCADE"), nullable=False)
    travel_class = Column(String(40), nullable=False)
    flight = relationship("FlightModel", back_populates="travel_classes")
