from fastapi import Depends
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.db.models import Base
from app.db.seed import seed_database_if_empty
from app.db.session import get_db
from app.infrastructure.repositories.sqlalchemy_catalog import SQLAlchemyTravelCatalogRepository
from app.services.catalog_service import TravelCatalogService

_database_initialized = False


def get_catalog_repository(db: Session = Depends(get_db)) -> SQLAlchemyTravelCatalogRepository:
    initialize_database_if_enabled(db)
    return SQLAlchemyTravelCatalogRepository(db=db)


def get_catalog_service(
    repository: SQLAlchemyTravelCatalogRepository = Depends(get_catalog_repository),
) -> TravelCatalogService:
    return TravelCatalogService(repository=repository)


def initialize_database_if_enabled(db: Session) -> None:
    global _database_initialized
    if _database_initialized:
        return

    settings = get_settings()
    if settings.auto_seed_database:
        Base.metadata.create_all(bind=db.get_bind())
        seed_database_if_empty(db)

    _database_initialized = True
