# MakeMyTrip Clone

Next.js frontend integrated with a FastAPI backend that serves homepage, offer, city, and flight-search data from PostgreSQL through SQLAlchemy repository handlers. The frontend only calls FastAPI; it never connects to PostgreSQL directly.

## Getting Started

### 1. Start the FastAPI backend

Create/seed PostgreSQL first:

```sql
CREATE DATABASE "make-my-trip-clone";
-- If this user does not already exist:
CREATE USER mmt_karthiksrinivasgaddamuser WITH PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE "make-my-trip-clone" TO mmt_karthiksrinivasgaddamuser;
```

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
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

The frontend `.env.local` should only contain:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
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
