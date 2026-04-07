# CI/CD Demo Project

A full-stack learning simulation of real-world **CI/CD and DevOps** workflow.

**Stack:** React (Vite) · Node.js / Express · Docker · GitHub Actions

---

## Project Structure

```
.
├── .github/
│   └── workflows/
│       └── ci-cd.yml          ← GitHub Actions pipeline
├── backend/
│   ├── src/
│   │   ├── index.js           ← Express server + API routes
│   │   └── index.test.js      ← Jest tests (health, message, 404)
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx       ← Live API demo + pipeline overview
│   │   │   ├── About.jsx      ← CI/CD explanation + tech stack
│   │   │   └── Contact.jsx    ← Mock contact form
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── nginx.conf             ← Nginx reverse-proxy config
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
├── package.json               ← Root scripts (dev, test, docker)
└── README.md
```

---

## Quick Start — Run Locally

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | 18 or 20 |
| npm | 9+ |
| Docker Desktop | latest |

### Option A — Development mode (hot reload)

```bash
# 1. Install all dependencies
npm run install:all

# 2. Start backend + frontend concurrently
npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

> The frontend Vite dev server proxies `/api/*` requests to the backend automatically.

### Option B — Docker (simulates production)

```bash
# Build images and start all containers in the background
npm run docker:up

# View logs
npm run docker:logs

# Stop everything
npm run docker:down
```

- Frontend (Nginx): http://localhost:3000
- Backend (Express): http://localhost:5000

---

## API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| `GET` | `/api/health` | Returns `{ status: "OK" }` — used as a liveness probe |
| `GET` | `/api/message` | Returns a JSON greeting from the server |

Example:

```bash
curl http://localhost:5000/api/health
# → {"status":"OK","timestamp":"2026-04-07T..."}

curl http://localhost:5000/api/message
# → {"message":"Hello from the Express backend!","version":"1.0.0","environment":"development"}
```

---

## Running Tests

```bash
# All tests (backend + frontend)
npm test

# Backend only (Jest + Supertest)
npm run test:backend

# Frontend only (Vitest + Testing Library)
npm run test:frontend
```

The backend tests specifically verify:
- `GET /api/health` returns HTTP 200 with `{ status: "OK" }`
- `GET /api/message` returns HTTP 200 with a `message` field
- Unknown routes return HTTP 404

**The CI pipeline will fail and block merges if any test fails.**

---

## CI/CD Pipeline Explained

The pipeline lives at `.github/workflows/ci-cd.yml` and is triggered on every push to `main`.

### What is CI (Continuous Integration)?

> CI is the practice of automatically **integrating** code changes by running tests and builds on every commit — catching bugs before they reach production.

Every push triggers:

```
push to main
     │
     ▼
┌──────────────────────────────────────────────┐
│  JOB: ci                                     │
│                                              │
│  1. 📥 Checkout code                         │
│  2. ⚙️  Setup Node.js 20                     │
│  3. 📦 npm ci (backend)                      │
│  4. 📦 npm ci (frontend)                     │
│  5. 🧪 Run Jest tests      ← FAILS pipeline  │
│  6. 🧪 Run Vitest tests    ← FAILS pipeline  │
│  7. 🏗️  Vite production build                │
│  8. 📤 Upload build artifact                 │
└──────────────────────────────────────────────┘
```

### What is CD (Continuous Delivery / Deployment)?

> CD takes a passing CI build and **automatically delivers** it to an environment. Here we simulate production using Docker locally.

After CI passes, the `cd` job runs (only on `main` branch pushes):

```
ci passes
     │
     ▼
┌──────────────────────────────────────────────┐
│  JOB: cd                                     │
│                                              │
│  1. 🐳 Build backend Docker image            │
│  2. 🐳 Build frontend Docker image           │
│  3. 🚀 docker compose up -d                  │
│  4. ⏳ Wait for backend to be healthy        │
│  5. 🔍 Smoke-test /api/health (200 check)   │
│  6. 🔍 Smoke-test /api/message              │
│  7. 📋 Print container logs                  │
│  8. 🧹 docker compose down                  │
└──────────────────────────────────────────────┘
```

### Intentional Failure Mechanism

The smoke-test step (step 5) **will fail the pipeline** if the backend does not return HTTP 200 from `/api/health`. This is the gate that ensures broken deployments never silently pass.

To simulate a failure: change the health route to return a 500 and push — the pipeline will turn red.

### How Deployment Simulation Works

In this project "deployment" means:

1. Docker images are built from the `Dockerfile` in each service directory.
2. `docker compose up` starts both containers on the same Docker network.
3. The Nginx frontend container proxies `/api/*` calls to the backend container (resolved via the `backend` hostname on the internal network).
4. A health-check curl loop confirms the backend is alive before smoke tests run.

In a real project you would replace step 3 with a push to a registry (Docker Hub, ECR, GCR) and a `kubectl rollout` or an ECS/Cloud Run update.

---

## Docker Architecture

```
┌─────────────────────────────────────────────────┐
│  Docker Network: app-network                    │
│                                                 │
│  ┌──────────────────┐   /api/*    ┌──────────┐  │
│  │  frontend:80     │ ──────────► │ backend  │  │
│  │  (Nginx + React) │             │  :5000   │  │
│  └──────────────────┘             └──────────┘  │
│         ▲                               ▲        │
│    host :3000                     host :5000     │
└─────────────────────────────────────────────────┘
```

Each Dockerfile uses a **multi-stage build**:
- Build stage: full Node.js image, installs devDependencies, compiles code.
- Production stage: lean Alpine image with only what's needed to run.

This keeps final images small and avoids shipping secrets or dev tools.

---

## Available Scripts (root)

| Command | What it does |
|---------|-------------|
| `npm run install:all` | Installs backend + frontend dependencies |
| `npm run dev` | Starts both servers with hot reload (requires `concurrently`) |
| `npm test` | Runs all tests |
| `npm run build:frontend` | Builds the Vite production bundle |
| `npm run docker:up` | Builds images and starts Docker Compose stack |
| `npm run docker:down` | Stops and removes containers |
| `npm run docker:logs` | Tails combined container logs |

---

## Learning Checklist

- [ ] Push a change and watch the GitHub Actions pipeline run
- [ ] Break a test on purpose — confirm the pipeline goes red
- [ ] Run `npm run docker:up` and visit http://localhost:3000
- [ ] Call `curl http://localhost:5000/api/health` from your terminal
- [ ] Inspect the Nginx config to understand how the reverse proxy works
- [ ] Read the annotated workflow file at `.github/workflows/ci-cd.yml`
