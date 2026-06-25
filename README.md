# Monie — Skincare Routine Helper

A web app that teaches skincare beginners what each ingredient does, lets them build a morning and night routine by dragging products into slots, and flags ingredient clashes in real time through a friendly helper character.

---

## Goal

Most people fail at skincare not because they lack products, but because they don't know how to layer them or which actives conflict. Monie solves this in three steps:

1. **Learn** — plain-English ingredient cards, the three pillars of healthy skin, and a daily routine order guide
2. **Plan** — drag products from a personal shelf into AM and PM routine slots
3. **Check** — an animated helper character detects ingredient clashes (e.g. retinol + vitamin C) and gives instant, friendly feedback

No account required. On first visit an anonymous session is created and a default shelf is seeded so users can start immediately.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v6, Vite |
| Backend | Express.js, TypeScript |
| Database | PostgreSQL 16 |
| Auth | Anonymous JWT (24 h expiry, `jsonwebtoken`) |
| Validation | Zod |
| Deploy | Docker Compose |

---

## System Design

```
Browser
  │
  ├── GET / (static)  ──────────────► Frontend  :3000  (nginx serving Vite build)
  │
  └── /api/v1/*  ────────────────────► Backend   :3001  (Express.js / TypeScript)
                                            │
                                            └── PostgreSQL :5432  (internal only)
```

### Services

| Service | Image | External Port | Role |
|---|---|---|---|
| `frontend` | nginx:alpine (Vite build) | `3000` | Serves the React SPA |
| `backend` | node:20-alpine | `3001` | REST API, JWT auth, compat engine |
| `db` | postgres:16-alpine | — (internal) | Persistent data store |

### API Routes (`/api/v1`)

| Method | Path | Description |
|---|---|---|
| `POST` | `/session` | Issue anonymous JWT; seeds default shelf on first visit |
| `GET` | `/products` | List user's shelf |
| `POST` | `/products` | Add a product |
| `PATCH` | `/products/:id` | Update a product |
| `DELETE` | `/products/:id` | Remove a product |
| `GET` | `/routines` | Get saved AM + PM routine |
| `PUT` | `/routines/:slot` | Replace a slot's ordered product list |
| `POST` | `/routines/check` | Run server-side ingredient compatibility check |
| `GET` | `/ingredients` | Learn-page reference data (`?category=` filter) |
| `GET` | `/health` | Liveness probe |

### Ingredient Compatibility Engine

Rules live as a constant in both `backend/src/compat.ts` (server) and `frontend/src/lib/compatibility.js` (client). Five ingredient key groups are detected by substring matching; three clash pairs trigger warnings at two severity levels (`caution` / `avoid`).

| Clash | Severity |
|---|---|
| Retinol + Vitamin C | Avoid |
| Retinol + AHA/BHA | Avoid |
| Vitamin C + AHA/BHA | Caution |

---

## Directory Topology

```
Monie-SkincareHelper/
│
├── app/
│   ├── frontend/               # React SPA
│   │   ├── src/
│   │   │   ├── pages/          # Home.jsx · Learn.jsx · Plan.jsx
│   │   │   ├── components/     # Nav · PillarCard · ProductCard
│   │   │   │                   # DropZone · AddProductForm · HelperCharacter
│   │   │   └── lib/            # api.js · compatibility.js · tagMeta.js
│   │   │                       # ingredientData.js · seedProducts.js (fallback)
│   │   ├── index.html
│   │   ├── vite.config.js
│   │   └── Dockerfile
│   │
│   ├── backend/                # Express.js API
│   │   └── src/
│   │       ├── routes/         # session · products · routines · ingredients
│   │       ├── index.ts        # App entry, middleware wiring
│   │       ├── db.ts           # pg Pool
│   │       ├── auth.ts         # JWT sign / verify middleware
│   │       ├── compat.ts       # Ingredient clash engine
│   │       └── schemas.ts      # Zod validators
│   │   └── Dockerfile
│   │
│   └── db/
│       └── init.sql            # Schema + ingredient seed data (runs once on first up)
│
├── design/                     # Product spec, planning docs, design files
│
├── docker-compose.yml          # Wires all three services
├── .env.example                # Environment variable reference
└── CLAUDE.md                   # Project instructions for Claude Code
```

---

## Getting Started

**Prerequisites:** Docker Desktop

```bash
# 1. Clone
git clone <repo-url>
cd Monie-SkincareHelper

# 2. Set environment variables
cp .env.example .env
# Edit .env — set a real JWT_SECRET and POSTGRES_PASSWORD

# 3. Deploy
docker compose up --build
```

| URL | What |
|---|---|
| `http://localhost:3000` | The app |
| `http://localhost:3001/api/v1/health` | Backend health check |

On first load the app creates an anonymous session and seeds a default shelf of 7 products so there is something to interact with immediately.

---

## Notes

- All API routes use the `/api/v1` prefix
- JWT tokens expire after 24 hours; the client silently re-issues using the stored `userId`
- The PostgreSQL data volume (`pgdata`) persists across restarts; `docker compose down -v` clears it
- `init.sql` only runs on an empty data volume — schema changes require `docker compose down -v` locally or a migration tool in production
