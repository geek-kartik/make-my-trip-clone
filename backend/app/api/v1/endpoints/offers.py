from fastapi import APIRouter, Depends, Query

from app.api.dependencies import get_catalog_service
from app.domain.schemas import Offer, OfferCategory
from app.services.catalog_service import TravelCatalogService

router = APIRouter(prefix="/offers", tags=["offers"])


@router.get("", response_model=list[Offer])
async def list_offers(
    category: OfferCategory = Query(default=OfferCategory.ALL),
    service: TravelCatalogService = Depends(get_catalog_service),
) -> list[Offer]:
    return await service.list_offers(category=category)
