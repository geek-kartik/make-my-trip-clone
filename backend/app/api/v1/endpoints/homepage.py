from fastapi import APIRouter, Depends

from app.api.dependencies import get_catalog_service
from app.domain.schemas import HomepageContent
from app.services.catalog_service import TravelCatalogService

router = APIRouter(prefix="/homepage", tags=["homepage"])


@router.get("", response_model=HomepageContent)
async def get_homepage(service: TravelCatalogService = Depends(get_catalog_service)) -> HomepageContent:
    return await service.get_homepage_content()
