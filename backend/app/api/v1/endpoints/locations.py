from fastapi import APIRouter, Depends, Query

from app.api.dependencies import get_catalog_service
from app.domain.schemas import City
from app.services.catalog_service import TravelCatalogService

router = APIRouter(prefix="/locations", tags=["locations"])


@router.get("/cities", response_model=list[City])
async def list_cities(
    query: str | None = Query(default=None, min_length=1, max_length=80),
    exclude_code: str | None = Query(default=None, min_length=3, max_length=3),
    service: TravelCatalogService = Depends(get_catalog_service),
) -> list[City]:
    return await service.list_cities(query=query, exclude_code=exclude_code)
