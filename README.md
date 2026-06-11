# MakeMyTrip Clone

Next.js frontend integrated with a FastAPI backend that serves all homepage, offer, city, and flight-search mock data.

## Getting Started

### 1. Start the FastAPI backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
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
pytest
```
