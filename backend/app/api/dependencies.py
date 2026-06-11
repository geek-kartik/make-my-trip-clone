from functools import lru_cache

from app.infrastructure.repositories.static_catalog import StaticTravelCatalogRepository
from app.services.catalog_service import TravelCatalogService


@lru_cache
def get_catalog_repository() -> StaticTravelCatalogRepository:
    return StaticTravelCatalogRepository()


def get_catalog_service() -> TravelCatalogService:
    return TravelCatalogService(repository=get_catalog_repository())
