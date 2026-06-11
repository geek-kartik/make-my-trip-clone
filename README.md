# MakeMyTrip Clone

Next.js frontend integrated with a FastAPI backend that serves homepage, offer, city, and flight-search data from PostgreSQL through SQLAlchemy repository handlers.

## Getting Started

### 1. Start the FastAPI backend

Create/seed PostgreSQL first:

```sql
CREATE DATABASE makemytrip_clone;
CREATE USER mmt_user WITH PASSWORD 'mmt_password';
GRANT ALL PRIVILEGES ON DATABASE makemytrip_clone TO mmt_user;
```

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
export DATABASE_URL="postgresql+psycopg://mmt_user:mmt_password@127.0.0.1:5432/makemytrip_clone"
python -m app.scripts.seed_database
uvicorn app.main:app --reload --port 8000
```

Backend docs are available at:

```text
http://localhost:8000/docs
```

### 2. Start the Next.js frontend

In another terminal:

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open:

```text
http://localhost:3000
```

## Verification

Frontend:

```bash
npm run lint
npm run build
```

Backend:

```bash
cd backend
python3 -m pytest
```
