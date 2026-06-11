# MakeMyTrip Clone Backend

FastAPI backend for the MakeMyTrip-like frontend. The current implementation uses static in-memory repositories while preserving service and repository boundaries so MySQL can be introduced later without changing API handlers or frontend contracts.

## Run locally

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

API docs:

```text
http://localhost:8000/docs
```

## Frontend integration

The Next.js app reads `NEXT_PUBLIC_API_BASE_URL`. If unset, it defaults to:

```text
http://localhost:8000/api/v1
```

## Architecture

- `api/`: versioned HTTP route handlers
- `domain/`: API schemas and repository protocols
- `services/`: business use cases
- `infrastructure/`: concrete static repository implementation
- `data/`: mock data that can later be replaced by database-backed repositories
