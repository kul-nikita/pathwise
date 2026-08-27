# SkillForge AI

**Know what to learn next — and be able to prove you learned it.**

SkillForge turns a stated goal ("become a junior SOC analyst in 12 weeks") into
an adaptive, prerequisite-aware learning path built from real resources on the
internet, and converts every completed step into verifiable portfolio evidence.

**Live:** https://skillforge-gilt.vercel.app

---

## Why this is not a course list with a chatbot bolted on

Three design decisions, each enforced in code rather than promised in a prompt.

### 1. Sequencing is a graph traversal, not a model's opinion

A skill can never be recommended before what it depends on. This is a Cypher
query against Neo4j that walks the **full transitive** prerequisite chain and
filters by the learner's mastery inside the query — not app-level recursion, and
never model judgement.

The gate is the load-bearing piece, so it is pinned by `npm run graph:verify`
against the live database (vitest cannot reach Cypher).

### 2. The LLM explains; it never supplies a fact

Gemini parses goals and writes prose. It cannot originate a URL, price,
duration, rating or certificate name — those come only from the catalog.

This is not left to prompt instructions. `/api/explain` recomputes the facts
server-side, asks for prose, then runs `findGroundingViolations` over the reply.
Output naming a URL or bare domain, a price, a certification, or **any number
outside a narrow allowed set** is discarded and a deterministic sentence is
shown instead — and the UI says which one you are reading. With no API key it
falls back silently, so the product still works offline.

### 3. Evidence, not completion badges

Finishing a resource is not a checkbox. It opens a short post-check drawn from
the same server-side question bank as the diagnostic; the answer key never
reaches the browser, so a learner cannot award themselves mastery. Only the
graded score appends events and mints evidence, and `artifactUrl` stays `null`
unless the learner actually supplied one.

Mastery is a 0–1 score **derived from an append-only event log**, never written
in place — which is what makes a replan explainable after the fact.

---

## What is in the catalog

| | |
|---|---|
| Domains | 9 |
| Career tracks | 19 |
| Skills | 96 |
| Learning resources | 225 (224 free) |
| Diagnostic questions | 288 |
| Unit tests | 107 |

Cybersecurity · Data & Analytics · Web Development · Cloud & DevOps ·
AI & Machine Learning · UX & Product Design · Product Management ·
Mobile Development · IT Support & Networking

**Every URL was verified HTTP 200 by hand before it was seeded.** That rule
caught eleven dead links and one URL the model had confabulated outright. It is
now machine-enforced: the catalog admin fetches the URL server-side and refuses
to store a row it could not reach, so `lastVerifiedAt` records a check that
actually happened.

> TryHackMe is deliberately absent. It returns HTTP 429 to automated requests
> even for rooms that do not exist, so its links cannot be verified and the
> hand-verification rule cannot be honoured for them.

---

## Architecture

Three stores, each doing the job it is actually good at. The boundary between
them is the same boundary as the product rule: **the graph and the LLM never
share write authority.**

```
 goal text ──▶ Gemini ──▶ structured intent   (role enum built from the graph,
                                               so it cannot invent a role)
                            │
 diagnostic ──▶ events ──▶ mastery            (append-only; mastery is derived)
                            │
                            ▼
   Qdrant  ──widen──▶  Neo4j ──gate──▶  Mongo ──▶  deterministic scoring ──▶ UI
  (ranking)         (prerequisites)   (metadata)     (6 named components)
```

| Store | Owns | Notes |
|---|---|---|
| **Neo4j** | the *shape* of learning — what requires what | Read-mostly at runtime. The prerequisite gate lives here. |
| **MongoDB** | the *state* of a learner — profile, events, mastery, evidence — plus resource metadata | Flexible schema, frequently edited. |
| **Qdrant** | *semantic matching* | Widens the candidate pool before the hard filters. **It can rank; it can never unlock.** |

Search results that fail the gate are shown as **blocked, with the specific
missing prerequisite named**, rather than hidden — sequencing should be visible,
not feel like missing results.

**Stack:** Next.js 15 (App Router, TypeScript) · Tailwind · Neo4j AuraDB ·
MongoDB Atlas · Qdrant Cloud · Gemini (`gemini-2.5-flash`, `gemini-embedding-001`
@ 768 dims, plain `fetch`, no SDK) · Vercel.

---

## Auth and privacy

- Email + password with **scrypt** (`node:crypto`, per-user salt, constant-time
  compare). No auth dependency.
- Sessions are server-side in Mongo storing only a **SHA-256 of the token**, so
  a database leak yields no usable sessions.
- Login is throttled per email, and the failure message is identical for a wrong
  password and an unknown account, so the endpoint cannot enumerate users.
- `middleware.ts` does the cheap cookie-presence redirect only — it runs on Edge
  and cannot reach Mongo. The real check is `requireUserOrRedirect()` in pages
  and `requireUser()` in API routes, so a forged or revoked cookie is rejected
  there.
- Learner identity always comes from the session, never from the request body.
- **Consent and reversibility** (`/account`): nothing is analysed or stored
  without explicit consent, and a learner can export everything as JSON or
  delete their account, which also revokes every session.

---

## Running it

```bash
npm install
cp .env.example .env     # then fill it in — see the table below
npm run db:seed:all      # graph → mongo → vector, in that order
npm run graph:verify     # assert the prerequisite gate against the live graph
npm run dev
```

| Variable | Purpose |
|---|---|
| `GEMINI_API_KEY` | Intent extraction and embeddings. Optional — explanations fall back to deterministic text without it. |
| `MONGODB_URI` | Full `mongodb+srv://` string. |
| `NEO4J_URI` / `NEO4J_USER` / `NEO4J_PASSWORD` | AuraDB. |
| `QDRANT_URL` / `QDRANT_API_KEY` | Qdrant Cloud. |
| `ADMIN_EMAILS` | Comma-separated emails allowed into `/admin`. **Unset means nobody is an admin** — the catalog is read-only by default. |

Seed order matters: vectors reference resource ids that must exist in Mongo
first.

### Other commands

```bash
npm run test          # 107 unit tests — planner, scoring, grounding, catalog integrity
npm run lint
npm run build         # succeeds with no secrets; see below
```

---

## Tests worth knowing about

The suite is not decorative — most of it exists because something broke.

- `lib/data/catalog.test.ts` guards catalog integrity across all nine domains:
  unique ids and URLs, no cross-domain id collisions, no prerequisite cycles, and
  **every role's required skills must be prerequisite-closed**. That last check
  found a modelling bug affecting **9 of 19 roles**: a role could require a skill
  whose prerequisites the role never asked for, so the roadmap said "build X
  first" while never surfacing X as a gap — a dead end.
- `lib/auth/password.test.ts` pins a real vulnerability: `Buffer.from("zz","hex")`
  silently yields an **empty** buffer, so a malformed stored hash made
  `timingSafeEqual` compare two empty buffers and return `true`. **Any password
  would have authenticated.**
- `lib/services/completion.test.ts` asserts a wrong run scores zero, an unknown
  question id is not credited, and evidence is withheld when the post-check fails.
- `lib/diagnostic/engine.test.ts` asserts every seeded role has all three
  question tiers for every required skill — without it, a new domain would end
  the diagnostic early instead of failing loudly.

---

## Deploying

CI (`.github/workflows/ci.yml`) runs typecheck → lint → tests → build on every
push. **The build step deliberately gets no secrets:** every store credential is
read inside a request handler, so a build that needs one has leaked a database
call into module scope. Failing there is the point.

`.github/workflows/deploy.yml` deploys only after CI succeeds, so a red build is
never shipped — the one real advantage over Vercel's own Git integration, which
deploys on push regardless of test results.

Full setup, including the MongoDB Atlas `0.0.0.0/0` network rule that Vercel's
lack of stable outbound IPs requires: [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

---

## Documentation

| | |
|---|---|
| [`docs/PRODUCT_SPEC.md`](docs/PRODUCT_SPEC.md) | Pitch, personas, example roadmap |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Data model, scoring math, adaptation logic, resource sourcing |
| [`docs/BUILD_PLAN.md`](docs/BUILD_PLAN.md) | Day-by-day plan, demo script, judging alignment |
| [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) | Pipeline, environment, serverless notes |
| [`CLAUDE.md`](CLAUDE.md) | Working agreement, non-negotiable product rules, and an honest running status log |

---

## Known limitations

Kept here deliberately rather than left for someone to discover.

- **The question bank lives in code** (`lib/diagnostic/questions*.ts`), not in
  Mongo. Fine while domains ship with the app; a real limitation the moment
  domains are authored without a deploy.
- **The dashboard and diagnostic screens** have the shared shell and typography
  but their internal card layouts have not had a design pass yet.
- **Deleting a catalog row leaves existing evidence pointing at it.** That is
  intentional — evidence a learner earned should not vanish because a curator
  tidied the catalog — but the evidence card then shows the resource id rather
  than its title.
- **Live discovery (layer 2) is not built.** The curated catalog is the only
  content source, which is what keeps the demo deterministic and offline-safe.
