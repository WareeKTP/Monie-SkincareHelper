# 🧴 Monie — Skincare Routine Helper

> A web app that helps skincare beginners learn what each ingredient does, build a morning and night routine, and get real-time clash warnings from a friendly helper character.

---

## 📸 Preview

<img src="preview-img/Home page.png" width="49%"> <img src="preview-img/Plan page.png" width="49%">
<img src="preview-img/Learn page top.png" width="49%"> <img src="preview-img/Learn page bot.png" width="49%">

---

## ✨ What It Does

Most people fail at skincare not because they lack products — but because they don't know how to layer them or which actives conflict. Monie solves this in three steps:

| Step | Feature | Description |
|:---:|---|---|
| 1️⃣ | **Learn** | Plain-English ingredient cards, the three pillars of healthy skin, and a daily routine order guide |
| 2️⃣ | **Plan** | Drag (or tap) products from a personal shelf into AM ☀️ and PM 🌙 routine slots |
| 3️⃣ | **Check** | An animated helper character flags ingredient clashes (e.g. retinol + vitamin C) with instant feedback |

No account required. On first visit, an anonymous session is created and a default shelf of 7 products is seeded automatically.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| 🎨 Frontend | React 18, React Router v6, Vite |
| ⚙️ Backend | Express.js, TypeScript |
| 🗄️ Database | PostgreSQL 16 |
| 🔐 Auth | Anonymous JWT (24 h expiry, `jsonwebtoken`) |
| ✅ Validation | Zod |
| 🐳 Deploy | Docker Compose |

---

## 🏗️ System Design

```
Browser
  │
  └── :3000 ──────────────► 🎨 Frontend  (nginx-unprivileged · Vite build)
                                 │
                                 ├── GET /          → serves React SPA
                                 │
                                 └── /api/v1/*  ──► ⚙️  Backend  :4000  (Express.js / TypeScript)
                                                         │
                                                         └── 🗄️  PostgreSQL :5432  (internal only)
```

nginx reverse-proxies all `/api/` traffic to the backend — the backend port is never exposed publicly.

### 🐳 Services

| Service | Image | Port | Role |
|---|---|---|---|
| `frontend` | nginxinc/nginx-unprivileged:alpine | `3000` ← external | Serves React SPA + proxies `/api/` |
| `backend` | node:20-alpine | internal only | REST API, JWT auth, compat engine |
| `db` | postgres:16-alpine | internal only | Persistent data store |

### 🔀 API Routes — `/api/v1`

| Method | Path | Description |
|---|---|---|
| `POST` | `/session` | Issue anonymous JWT; seed default shelf on first visit |
| `GET` | `/products` | List user's shelf |
| `POST` | `/products` | Add a product |
| `PATCH` | `/products/:id` | Update a product |
| `DELETE` | `/products/:id` | Remove a product |
| `GET` | `/routines` | Get saved AM + PM routine |
| `PUT` | `/routines/:slot` | Replace a slot's product list |
| `POST` | `/routines/check` | Server-side ingredient compatibility check |
| `GET` | `/ingredients` | Learn-page reference data (`?category=` filter) |
| `GET` | `/health` | Liveness probe |

### ⚗️ Ingredient Compatibility Engine

Clash rules live in both `backend/src/compat.ts` and `frontend/src/lib/compatibility.js`. Five ingredient groups are matched by substring; three pairs produce warnings at two severity levels.

| ⚠️ Clash | Severity |
|---|---|
| Retinol + Vitamin C | 🚫 Avoid |
| Retinol + AHA/BHA | 🚫 Avoid |
| Vitamin C + AHA/BHA | ⚠️ Caution |

---

## 📁 Directory Topology

```
Monie-SkincareHelper/
│
├── 📦 app/
│   ├── 🎨 frontend/               # React SPA
│   │   ├── src/
│   │   │   ├── pages/             # Home.jsx · Learn.jsx · Plan.jsx · Admin.jsx
│   │   │   ├── components/        # Nav · PillarCard · ProductCard
│   │   │   │                      # DropZone · AddProductForm · HelperCharacter
│   │   │   └── lib/               # api.js · compatibility.js · tagMeta.js
│   │   │                          # ingredientData.js
│   │   ├── nginx.conf
│   │   ├── index.html
│   │   ├── vite.config.js
│   │   └── Dockerfile
│   │
│   ├── ⚙️  backend/               # Express.js API
│   │   └── src/
│   │       ├── routes/            # session · products · routines · ingredients
│   │       ├── scripts/           # add-ingredient.ts · add-product.ts
│   │       ├── index.ts           # App entry, middleware wiring
│   │       ├── db.ts              # pg Pool
│   │       ├── auth.ts            # JWT sign / verify middleware
│   │       ├── compat.ts          # Ingredient clash engine
│   │       └── schemas.ts         # Zod validators
│   │   └── Dockerfile
│   │
│   └── 🗄️  db/
│       └── init.sql               # Schema + seed data (runs once on first up)
│
├── 🖼️  preview-img/               # App screenshots
├── 🐳 docker-compose.yml          # Wires all three services
└── 🔑 .env.example                # Environment variable reference
```

---

## 🚀 Getting Started

**Prerequisites:** [Docker Desktop](https://www.docker.com/products/docker-desktop/)

```bash
# 1. Clone
git clone https://github.com/WareeKTP/Monie-SkincareHelper.git
cd Monie-SkincareHelper

# 2. Set environment variables
cp .env.example .env
# Edit .env — set a real JWT_SECRET and POSTGRES_PASSWORD

# 3. Deploy
docker compose up --build
```

| URL | Description |
|---|---|
| 🌐 `http://localhost:3000` | The app |
| 🛠️ `http://localhost:3000/admin` | Hidden admin page |
| 🩺 `http://localhost:3000/api/v1/health` | Backend health check |

---

## 🛠️ Admin Page

`/admin` is a hidden page — not linked from the nav. Access it directly by URL.

| Form | What it does |
|---|---|
| ⚗️ Add Ingredient | Adds a new card to the Learn page. Re-submitting the same ID updates the existing entry. |
| 📦 Add Product | Adds a product to the current session's shelf. Visible immediately on the Plan page. |

---

## 📝 Notes

- 🔗 All API routes use the `/api/v1` prefix
- ⏰ JWT tokens expire after 24 hours; the client silently re-issues using the stored `userId`
- 💾 The PostgreSQL volume (`pgdata`) persists across restarts — run `docker compose down -v` to wipe it
- 🗃️ `init.sql` only runs on an empty volume — schema changes require `docker compose down -v` locally or a migration tool in production
