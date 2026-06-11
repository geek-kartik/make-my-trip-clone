from fastapi import Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.infrastructure.repositories.sqlalchemy_catalog import SQLAlchemyTravelCatalogRepository
from app.services.catalog_service import TravelCatalogService


def get_catalog_repository(db: Session = Depends(get_db)) -> SQLAlchemyTravelCatalogRepository:
    return SQLAlchemyTravelCatalogRepository(db=db)


def get_catalog_service(
    repository: SQLAlchemyTravelCatalogRepository = Depends(get_catalog_repository),
) -> TravelCatalogService:
    return TravelCatalogService(repository=repository)
