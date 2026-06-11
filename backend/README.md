# MakeMyTrip Clone Backend

FastAPI backend for the MakeMyTrip-like frontend. API handlers call a service layer, which now reads data through SQLAlchemy/PostgreSQL repository handlers. Static catalog data is only used by the seed script to populate local/dev databases.

## PostgreSQL tables

Create these tables end to end for the current API surface:

1. `cities`
2. `product_tabs`
3. `fare_types`
4. `homepage_content`
5. `footer_directories`
6. `footer_links`
7. `brand_trust_items`
8. `offers`
9. `airlines`
10. `flights`
11. `flight_travel_classes`

DDL is available in:

```text
backend/database/schema.sql
```

## Run locally

Create database/user:

```sql
CREATE DATABASE makemytrip_clone;
CREATE USER mmt_user WITH PASSWORD 'mmt_password';
GRANT ALL PRIVILEGES ON DATABASE makemytrip_clone TO mmt_user;
```

If your PostgreSQL user cannot create tables after connecting to the database, also run:

```sql
\c makemytrip_clone
GRANT ALL ON SCHEMA public TO mmt_user;
```

Install and seed:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
export DATABASE_URL="postgresql+psycopg://mmt_user:mmt_password@127.0.0.1:5432/makemytrip_clone"
python -m app.scripts.seed_database
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
- `infrastructure/`: concrete SQLAlchemy/PostgreSQL repository implementation
- `db/`: SQLAlchemy models, engine/session, and seed helpers
- `data/`: seed source data for local/dev catalog initialization
