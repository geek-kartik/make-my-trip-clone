from fastapi import APIRouter

from app.api.v1.endpoints import flights, homepage, locations, offers

api_router = APIRouter()
api_router.include_router(homepage.router)
api_router.include_router(locations.router)
api_router.include_router(offers.router)
api_router.include_router(flights.router)
