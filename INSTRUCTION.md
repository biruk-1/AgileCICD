# How to Explain & Demo This CI/CD Project

Use this as a **speaker script and checklist** when presenting to a teacher, team, or interview. Read it once, then follow the steps in order.

---

## 1. One-sentence pitch

> “This repo shows **Continuous Integration** (automatic test + build on every change) and **Continuous Delivery** (after tests pass, we **simulate** deployment with Docker the same way a real pipeline would deploy containers).”

---

## 2. What’s in the repo (map it mentally)

| Folder / file | Say this in one line |
|---------------|----------------------|
| `frontend/` | React app (Vite): Home, About, Contact; calls `/api/message` from the browser. |
| `backend/` | Express API: `/api/health`, `/api/message`; CORS enabled. |
| `docker-compose.yml` | Runs frontend + backend together like a small “production stack.” |
| `.github/workflows/ci-cd.yml` | **The pipeline**: what runs automatically on GitHub when you push. |
| `README.md` | Setup commands and architecture for anyone cloning the repo. |

---

## 3. Truth about “push vs CI” (say this clearly)

- **Pushing** sends your commits to GitHub. Git **does not** run your tests before the push finishes.
- **After** the push, **GitHub Actions** runs the workflow file.
- If the pipeline **fails**: your code is still on the branch, but the run is **red** — in a real team you **fix it before** treating the change as “done.”
- If you use **Pull Requests** + **branch protection** (optional on GitHub): you can **block merging** until CI is green. That’s the professional “reject if not passing” behavior.

Optional homework for the teacher: [Branch protection rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) in GitHub repo settings.

---

## 4. Live demo checklist (5–10 minutes)

### A. Show the running app (local)

1. Open a terminal in the project root.
2. Run: `npm run install:all` (first time only).
3. Run: `npm run dev` — open the URL the terminal prints (frontend is usually port **3000**, backend **5000**).
4. Click **Home** — point at the live API box that loads from `/api/message`.
5. Say: “Frontend and backend are separate; in dev, Vite proxies `/api` to the server.”

### B. Show Docker “like production”

1. Stop dev servers if running.
2. Run: `npm run docker:up`
3. Open **http://localhost:3000** — frontend is served by Nginx; `/api` is proxied to the backend container.
4. Optional: `curl http://localhost:5000/api/health` in a terminal — show JSON with `status: OK`.
5. Run: `npm run docker:down` when finished.

### C. Show GitHub Actions (the main teaching moment)

1. Open the repo on GitHub → tab **Actions**.
2. Click the **latest successful workflow run**.
3. Walk through **two jobs**:
   - **CI job**: checkout → install → **tests** → **build frontend** → upload artifact.
   - **CD job** (runs on push to `main`, not on every PR in this setup): build Docker images → `docker compose up` → **wait for health** → **curl smoke tests** → tear down.
4. Say: “If tests fail, the CI job fails and the CD job does not run a successful deploy path from the same definition of ‘green’ — here CD depends on CI passing.”

---

## 5. What to change for a “safe” demo (green pipeline)

Pick **one** of these — small, visible, low risk:

| Change | Where | What to say |
|--------|--------|-------------|
| Edit text on a page | `frontend/src/pages/About.jsx` or `Home.jsx` | “UI-only change; still must pass tests and build.” |
| Tweak the API message string | `backend/src/index.js` in `/api/message` | “If you change the response, update tests if they assert exact text.” |
| Add a comment in the workflow | `.github/workflows/ci-cd.yml` | “Pipeline still parses and runs; proves YAML is version controlled.” |

Then: `git add` → `git commit` → `git push` → refresh **Actions** and show the new run.

---

## 6. What to change to show a **failing** pipeline (red)

Use this **once** to prove the gate, then **fix and push again** so the repo stays green.

| Change | Where | Expected result |
|--------|--------|-----------------|
| Break a test expectation | `backend/src/index.test.js` or `frontend/src/__tests__/pages.test.jsx` | Pipeline **fails** at the test step. |
| Break `/api/health` behavior | `backend/src/index.js` | Tests and/or **CD smoke test** can fail. |

Say: “This is intentional — CI exists to catch this before we rely on the deploy.”

---

## 7. Answers to common teacher questions

**Q: Is this real deployment?**  
A: “The **CD job simulates** deploy on GitHub’s runner with Docker. It doesn’t update your laptop or a cloud server unless we add a deploy step (SSH, Kubernetes, etc.).”

**Q: Where is the database?**  
A: “There isn’t one in this demo — the contact form is mocked on purpose to keep the stack simple.”

**Q: Why two Dockerfiles?**  
A: “One image per service — backend is Node; frontend is built static files served by Nginx. Same pattern as real microservices.”

**Q: What fails the pipeline first?**  
A: “Usually the **first failing step** in the job — often **tests** during CI, or **build**, or **Docker/smoke** during CD if CI passed.”

---

## 8. Optional: make it “professional” on GitHub

1. Use **feature branches** + **Pull Requests** into `main`.
2. In repo **Settings → Branches → Branch protection** for `main`: require PR, require status check **CI** (and any other checks you add).
3. Then: “Bad code **cannot merge** until green” — match the story you tell in class.

---

## 9. Quick reference — commands

| Goal | Command |
|------|---------|
| Install everything | `npm run install:all` |
| Dev (frontend + backend) | `npm run dev` |
| Run all tests | `npm test` |
| Docker up | `npm run docker:up` |
| Docker down | `npm run docker:down` |

---

*You can print this file or keep it open on a second screen while presenting.*
