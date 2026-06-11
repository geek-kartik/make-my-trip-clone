from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_check() -> None:
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_homepage_content_contract() -> None:
    response = client.get("/api/v1/homepage")

    assert response.status_code == 200
    payload = response.json()
    assert payload["hero"]["eyebrow"] == "Try Myra beta"
    assert len(payload["tabs"]) >= 12
    assert len(payload["fares"]) >= 6
    assert len(payload["trustItems"]) == 5


def test_city_search_filters_and_excludes() -> None:
    response = client.get("/api/v1/locations/cities", params={"query": "del", "exclude_code": "BOM"})

    assert response.status_code == 200
    cities = response.json()
    assert cities[0]["code"] == "DEL"
    assert all(city["code"] != "BOM" for city in cities)


def test_offer_category_filter() -> None:
    response = client.get("/api/v1/offers", params={"category": "flights"})

    assert response.status_code == 200
    offers = response.json()
    assert offers
    assert all(offer["category"] == "flights" for offer in offers)


def test_flight_search_returns_generated_route() -> None:
    response = client.get(
        "/api/v1/flights/search",
        params={
            "from_code": "DEL",
            "to_code": "BLR",
            "departure_date": "2026-06-18",
            "travel_class": "economy",
            "fare_type": "student",
            "adults": 1,
        },
    )

    assert response.status_code == 200
    payload = response.json()
    assert payload["source"]["code"] == "DEL"
    assert payload["destination"]["code"] == "BLR"
    assert payload["totalResults"] == len(payload["flights"])
    assert payload["flights"][0]["fromCode"] == "DEL"
    assert payload["flights"][0]["toCode"] == "BLR"


def test_flight_search_rejects_same_city() -> None:
    response = client.get(
        "/api/v1/flights/search",
        params={
            "from_code": "DEL",
            "to_code": "DEL",
            "departure_date": "2026-06-18",
        },
    )

    assert response.status_code == 422
