# CLAUDE.md

Guidance for Claude Code (and any human) working in this repo. Keep this file
short and load-bearing — detail lives in `docs/` and is linked, not pasted.

## Project

**SkillForge AI** — a career-readiness copilot for cybersecurity learners.
It turns a stated goal ("become a junior SOC analyst in 12 weeks") into an
adaptive, prerequisite-aware learning path built from real resources on the
internet, and converts every completed step into verifiable portfolio
evidence.

**One-line pitch:** SkillForge AI maps what you know, identifies what you
need, builds the next best learning path, and turns every milestone into
proof of skill.

**Why this wins:** most learning-recommender hackathon entries are course
lists with a chatbot bolted on. This one has (1) a real prerequisite graph
that makes bad sequencing structurally impossible, (2) a transparent, numeric
scoring formula instead of an LLM black box, and (3) an evidence wallet that
outputs something a recruiter can actually look at. Judges can poke every
recommendation and get a legible reason. See `docs/BUILD_PLAN.md` for the
demo script and judging-criteria mapping.

Full product spec, personas, and example roadmap: `docs/PRODUCT_SPEC.md`.
Data model, scoring math, adaptation logic, resource pipeline:
`docs/ARCHITECTURE.md`. Day-by-day build checklist and demo scenarios:
`docs/BUILD_PLAN.md`.

## Non-negotiable product rules

These are correctness constraints, not style preferences. Violating them
breaks the core pitch ("explainable, not a black box") — treat them like
failing tests.

1. **The LLM never invents facts.** It must not generate a URL, price,
   duration, rating, or certificate name. Those only ever come from the
   `learning_resources` table / retrieval layer. The LLM explains and
   converses; the backend supplies ground truth.
2. **No skill is ever recommended before its prerequisites are met.** This is
   enforced in the deterministic planner (`services/planner`), never left to
   model judgment. A resource whose `prerequisites` aren't satisfied in the
   learner's mastery state is filtered out before scoring, not after.
3. **Every recommendation ships with an explanation card**: what gap it
   closes, what it unlocks next, estimated time, and the evidence artifact it
   produces. A recommendation with no "why" is a bug.
4. **Mastery is a score, not a checkbox.** Track it 0–1 per skill from
   diagnostic + quiz + lab + project signals (see `docs/ARCHITECTURE.md`).
   Never gate progression on binary "completed."
5. **Consent and reversibility.** Learner data (diagnostic answers, history)
   is only analyzed after explicit consent; learners can view, edit, export,
   and delete their profile. Don't build features that assume otherwise.
6. **Never state incapability.** Copy and UI describe current evidence and
   the next step — never "you're not cut out for this role."
7. **Resource sourcing stays inside the domain allowlist** for any live
   search/discovery layer (see `docs/ARCHITECTURE.md#resource-sourcing`).
   Don't add general open-web scraping.

## Scope discipline (read before adding a feature)

Build one vertical slice extremely well. Do **not**:
- Add a 4th target role beyond SOC Analyst / Pentester / Cloud Security
  Associate.
- Build a generic multi-domain recommender "for later."
- Auto-grade freeform submissions with no rubric.
- Depend on a live web-search API as the only content source — curated
  catalog is layer 1 and must work fully offline/deterministically for the
  demo; live discovery is an optional layer 2 enhancement.
- Add auth providers, billing, or multi-tenant admin — out of scope for a
  hackathon MVP.

If you're unsure whether something is in scope, it isn't — ship the vertical
slice first.

## Tech stack (decided — polyglot-persistence variant)

Three purpose-built stores instead of one general-purpose one: each engine
does the job it's actually good at, and the boundaries between them map
directly onto the non-negotiable rule that the graph (structure/sequencing)
and the LLM (explanation) never share write authority. See
`docs/ARCHITECTURE.md#data-model` for exactly which data lives where and how
IDs stay consistent across all three.

| Layer | Choice | Why |
|---|---|---|
| App framework | Next.js (App Router, TypeScript) | One deployable, API routes double as the backend, fastest to scaffold with Claude Code |
| UI | React + Tailwind + shadcn/ui + Recharts | Fast, polished dashboard/radar charts out of the box |
| Graph store | **Neo4j** (AuraDB free tier for the demo) | Roles, skills, prerequisites, and resource→skill edges live here as real graph relationships — prerequisite validation is a Cypher traversal, not app-level recursion |
| Document store | **MongoDB** (Atlas free tier) | Learner profiles, mastery scores, event log, evidence wallet, and full resource metadata — flexible schema, easy to iterate on during a hackathon |
| Vector store | **Qdrant** (Qdrant Cloud free tier or local Docker) | Embeddings of resource descriptions + learner intent for semantic retrieval/discovery, layered on top of the deterministic graph filter — never a substitute for it |
| LLM | Gemini API, structured JSON output only | Goal parsing, explanations, conversation — never sequencing logic |
| Auth | Clerk or simple email magic-link (MongoDB Atlas App Services / NextAuth) | Minutes to wire up, not hours |
| Hosting | Vercel (app) + Neo4j AuraDB + MongoDB Atlas + Qdrant Cloud (all free tiers) | Zero-config deploy for the demo |

**Division of responsibility (memorize this, it prevents the most likely
architecture mistake):**
- **Neo4j owns the *shape* of learning** — what requires what. It should
  rarely change once seeded.
- **MongoDB owns the *state* of a specific learner** — profile, mastery,
  events, evidence — plus the resource catalog's rich, frequently-edited
  metadata (title, URL, tags, quality score).
- **Qdrant owns *semantic matching*** — "which resources are conceptually
  close to this gap skill / this learner's phrasing," used only to widen the
  candidate pool before the deterministic hard-filters and scoring formula
  in `docs/ARCHITECTURE.md` run. It never bypasses prerequisite validation.

If the team is more comfortable with FastAPI + Angular instead of Next.js
for the app layer, that's a valid alternate path — the store choices and
constraints above still apply regardless of framework.

## Commands

Fill these in as soon as the project is scaffolded — this section is the
highest-value part of the file once code exists.

```bash
npm install                  # install deps
npm run dev                   # local dev server
npm run build                  # production build
npm run lint                     # lint
npm run test                      # unit tests (planner + scoring logic especially)

npm run graph:seed                 # seed roles/skills/prerequisites into Neo4j
npm run mongo:seed                  # seed learner_profile/resources collections into MongoDB
npm run vector:index                  # embed resource descriptions and upsert into Qdrant

npm run graph:verify                   # assert the prerequisite gate against the live graph
                                          # (Cypher, so vitest cannot cover it)

npm run db:seed:all                    # runs all three seed scripts in the right order
                                          # (graph → mongo → vector: vectors reference
                                          # resource IDs that must exist in Mongo first)
```

## Directory structure (target)

```
/app                    Next.js routes: onboarding, diagnostic, dashboard, evidence wallet
/components              UI components (skill radar, evidence card, roadmap phase card)
/lib
  /llm                    Gemini API calls, structured-output prompts only
  /planner                 Deterministic prerequisite validation + path sequencing (NO LLM)
                              — talks to Neo4j, treats it as the source of truth for order
  /scoring                  Recommendation scoring formula (NO LLM)
                              — reads candidate metadata from MongoDB, optional
                              candidate widening from Qdrant, never writes to either
  /adaptation                 Mastery update logic, replanning triggers
                                — reads/writes MongoDB events + mastery collections
  /graph                        Neo4j driver + Cypher queries (read-mostly at runtime)
  /db                             MongoDB client + collection schemas (Zod/TS types)
  /vector                           Qdrant client + embedding calls
/seed
  graph/                            role/skill/prerequisite seed data → Neo4j
  mongo/                             learner_profile + resource catalog seed data → MongoDB
/docs
  PRODUCT_SPEC.md                 pitch, personas, example roadmap
  ARCHITECTURE.md                   data model, scoring math, resource pipeline
  BUILD_PLAN.md                       day-by-day plan, demo script, judging alignment
```

## Conventions

- **Keep the LLM and the planner in separate modules with no shared trust.**
  `lib/llm` output is always validated/clamped by `lib/planner` before it
  touches state. Never let a prompt response write directly to the DB.
- **Every scored resource carries its score breakdown**, not just a final
  number — the UI's "why recommended" card reads directly from
  `{gapMatch, prereqReadiness, quality, preferenceFit, timeFit, costFit}`.
  Don't collapse this into an opaque single float before it reaches the UI.
- **Events, not overwrites.** Learner actions (started/completed/rated a
  resource, diagnostic answer, feedback click) are appended to an
  `events` / xAPI-style log, and mastery scores are *derived* from that log,
  not mutated in place. This is what makes replanning explainable and
  debuggable.
- **Resource metadata is hand-verified for the demo catalog.** Every seeded
  row needs a real, working URL, a real provider, and an accurate
  `skill_tags` / `prerequisites` array — judges will click links.

## What is actually wired (keep this honest)

A previous version of this file claimed the three stores were load-bearing
when nothing read them at runtime. Current truth, verified:

- **Neo4j is the runtime source of truth for structure.** `lib/graph/queries.ts`
  serves domains, roles, the skill graph, and — importantly — the two
  traversals that matter, as variable-length Cypher patterns:
  `findUnmetPrerequisites` (transitive prerequisite chain, mastery filtered
  inside the query) and `findDownstreamSkills` (transitive dependents).
  `findPrerequisiteValidResourceIds` is the candidate gate.
- **MongoDB is the runtime source for resource metadata and all learner
  state** (`lib/db/resources.ts`, `lib/db/learners.ts`): profiles,
  append-only `events`, mastery derived from those events, and evidence.
- **Qdrant serves semantic search at request time.** `/api/search` embeds the
  learner's phrasing, queries Qdrant to widen the pool, then passes every hit
  through `gateResources` (Cypher) before Mongo supplies metadata. Blocked
  results are shown with the specific missing prerequisite rather than hidden,
  so sequencing is visible instead of feeling like missing results. Qdrant
  can rank, never unlock.
- The pipeline is: Neo4j gate → Mongo metadata → deterministic scoring
  (`lib/services/recommendations.ts`). Nothing may skip the graph gate.

- **Auth is real and enforced.** Email + password (scrypt, per-user salt,
  constant-time compare), server-side sessions in Mongo storing only a
  SHA-256 of the token so a DB leak yields no usable sessions. Login is
  throttled per email, and failure messages are identical for wrong-password
  and unknown-account so the endpoint can't enumerate users. `middleware.ts`
  does the cheap cookie-presence redirect only — it runs on Edge and cannot
  reach Mongo — and the real check is `requireUserOrRedirect()` in pages /
  `requireUser()` in API routes, so a forged or revoked cookie is rejected
  there. Learner identity always comes from the session, never from the
  request body.

- **Onboarding is wired and the LLM has a real job.** `/onboarding` →
  `POST /api/onboarding` extracts structured intent from free text; the role
  list is fetched from Neo4j and passed in, so the model's enum is built from
  seeded data and it cannot name a role that doesn't exist. Nothing is saved
  on that call — `PUT` persists only after the learner reviews and confirms,
  and re-validates the role id server-side. Consent is captured here.

- **Grounded explanations are enforced, not just prompted.** `/api/explain`
  recomputes the facts from Mongo + Neo4j (never from the request body, so a
  caller cannot feed fabricated numbers into the prompt), asks Gemini for
  prose, then runs `findGroundingViolations` over the reply. Output naming a
  URL/bare domain, a price or currency symbol, a certificate or accreditation
  or job guarantee, or *any number outside a narrow allowed set* is discarded
  and the deterministic sentence is shown instead. The UI states which one
  the reader is looking at. With no API key or a failing call it falls back
  silently, so the product still works offline.

- **The product is multi-domain, not just multi-domain-capable.** Nine domains
  are seeded — Cybersecurity, Data & Analytics, Web Development, Cloud & DevOps,
  AI & Machine Learning, UX & Product Design, Product Management, Mobile
  Development, and IT Support & Networking — totalling **19 career paths, 96
  skills, and 225 hand-verified resources**. Adding them required **no change to
  the planner, scoring, diagnostic engine, or graph queries** — only data plus a
  bundle in `seed/data/index.ts`. Role lists, the landing page, the role picker,
  and the LLM's role enum all read from Neo4j, so they pick up new domains on
  their own.

- **The learn -> prove loop is closed.** `POST /api/complete` is the write path
  that was missing: finishing a resource opens a short post-check drawn from the
  same server-side bank as the diagnostic, graded server-side, and only the
  graded score appends events and mints evidence. `addEvidence()` used to have
  **zero callers**, which meant the landing page advertised "evidence, not
  completion badges" while a real learner could never produce any. Verified live:
  readiness 10% -> 14% after one completion, with a wallet entry whose
  `rubricScore` is the graded result and whose `artifactUrl` is null unless the
  learner supplied one.

- **The catalog has an admin surface** (`/admin`, `/api/admin/resources`) that
  writes MongoDB + Neo4j + Qdrant in one action. Admin is an `ADMIN_EMAILS`
  env allowlist, not a roles table; unset means nobody is an admin. Mongo and
  Neo4j must both succeed (a row in one and not the other is a broken gate);
  a Qdrant failure only degrades ranking, so it is reported, not fatal.
  Every validation rule here is a defect that was actually found by hand during
  the build, now machine-enforced: **the server fetches the URL itself** and
  refuses to store a row it could not reach (so `lastVerifiedAt` records a check
  that happened), skill ids are checked against the graph, a row may not require
  what it teaches, URLs may not duplicate, and hosts outside the sourcing
  allowlist need explicit confirmation.

Still not true / not built: the question bank still lives in code
(`lib/diagnostic/questions.ts` + `questions-data-analytics.ts`) rather than in
Mongo. That is fine while domains ship with the app; it becomes a real
limitation the moment domains are authored without a deploy.

## Status

Update this section as the build progresses so a fresh Claude Code session
knows where things stand without re-deriving it.

- 2026-08-24: Root-level Next.js/TypeScript scaffold started. Deterministic
  planner, scoring, adaptation, grounded LLM prompt boundary, dry-run seed
  scripts, and a small curated demo catalog are in place. External store
  credentials and live seed writes are not wired yet.
- 2026-08-25: LLM switched from Anthropic to **Gemini** (`gemini-2.5-flash`
  for intent extraction via `responseSchema`, `gemini-embedding-001` @ 768
  dims for embeddings) — plain `fetch`, no SDK. All three stores are now
  live and seeded: Neo4j AuraDB (14 skills / 3 roles / 9 resources),
  MongoDB Atlas (`learning_resources`), Qdrant Cloud (`learning_resources`
  collection). Seed scripts do real writes; run them with `.env` present.
  Catalog is still only 9 rows — needs expanding to 30–50 before the demo.
- 2026-08-25: Adaptive diagnostic shipped (`lib/diagnostic`), feeding mastery
  through the event log rather than writing it directly. Fixed a scoring bug
  where `maxHoursPerStep` was used as a *hard* filter — per
  `ARCHITECTURE.md` the hard time filter is the **weekly** budget, while
  session length is a soft `TimeFit` signal. The old behaviour returned zero
  recommendations for any learner preferring short sessions.
- 2026-08-25: Catalog expanded 9 → 43 rows, all re-seeded to all three
  stores. Every URL was curl-verified (200) before being added, and the
  pre-existing freeCodeCamp networking URL was found **404** and replaced.
  `lib/data/demo-catalog.test.ts` now guards catalog integrity (unique
  ids/URLs, skills exist in the graph, no row requiring what it teaches,
  every role skill covered). That test caught a live bug: the NIST row
  listed `alert-triage` as both a taught skill and its own prerequisite,
  making it permanently unrecommendable for that gap.
  **TryHackMe is deliberately absent** — it returns HTTP 429 to automated
  requests even for nonexistent rooms, so its links cannot be verified and
  the hand-verified rule can't be honoured for them.
- 2026-08-25: Diagnostic UI shipped at `/diagnostic` (role picker → adaptive
  questions → readiness + prerequisite order + "why recommended" cards),
  linked from the dashboard. **Grading moved server-side**: the client posts
  `selectedIndex` and `gradeAnswers()` marks it against the bank, so the
  answer key never reaches the browser and the quiz isn't self-reported
  (`selectedIndex: -1` means skip). Verified in a real browser with
  Playwright, which caught a React state bug — the `key` sat on the JSX
  inside `QuestionCard` rather than on the element, so `picked` survived
  across questions and pre-selected an option on the next one.
  Note: `npm run build` while `next dev` is running clobbers `.next` and
  leaves the dev server serving 404s for its client chunks — restart dev
  after a build.
- 2026-08-25: Evidence wallet shipped at `/evidence` in the
  `PRODUCT_SPEC.md` card format, with a summary panel on the dashboard.
  `demoEvidence` rows carry `artifactUrl: null` and the UI renders "not
  uploaded in this demo" — deliberately no fabricated GitHub/PDF links,
  since nothing was actually produced. A catalog test cross-checks each
  evidence row against its resource's `evidenceType` and `skillTags`, so the
  wallet can't claim an artifact the resource doesn't produce. Also fixed a
  "1 hours" plural bug in `formatDuration`.
- 2026-08-25: Replanning loop shipped (`lib/adaptation/replan.ts`,
  `POST /api/replan`, "Plan this week" panel on `/diagnostic`) — covers demo
  scenario 3 end to end. `planWeek` fills the week in prerequisite order, so
  a budget cut keeps the critical path and swaps in a shorter alternative
  rather than dropping the top skill (8h → 240-min Splunk tutorial; 2h →
  45-min Audit Logon Events). Deferred items always carry a reason.
  Two bugs found while driving it: the promised remediation wasn't actually
  scheduled (fixed with `pinnedBySkill`), and `downstreamSkills` walks the
  whole graph, so a SOC learner was shown delays for `burp-suite` /
  `sql-injection` — the route now intersects with the target role's skills.
  Feedback verbs are deliberately limited to `more_hands_on` / `less_time`;
  "too easy"/"too difficult" would need a difficulty term in the scoring
  formula that ARCHITECTURE.md doesn't define, and "not relevant" is handled
  by `excludeResourceIds` instead.
- 2026-08-26: **Credibility pass.** Neo4j and MongoDB are now in the actual
  request path (see "What is actually wired"); the in-memory
  `lib/data/demo-catalog.ts` is seed-time data only. Types are domain-aware
  (`domainId` on Role/Skill, role ids are strings not an enum), routes moved
  to `/` (public landing), `/dashboard`, `/evidence`, `/diagnostic`.
  `planWeek` was split into pure bin-packing over pre-scored candidates so
  data access can be async upstream.
  Three environment bugs fixed along the way, all verified rather than
  guessed: (1) `mongodb+srv` failed inside Next because the resolver list
  starts with a loopback server that answers ECONNREFUSED and Node does not
  fall through — SRV/TXT are now resolved explicitly via `node:dns` Resolver
  and handed to the driver as a plain seed list; (2) Neo4j "connection
  acquisition timed out" was HMR leaking a new driver per reload until
  AuraDB refused connections — driver and Mongo client are now cached on
  `globalThis`; (3) `_`-prefixed route folders are private in the App Router
  and never mount.
  Also surfaced: the old TS `prerequisitesSatisfied` only checked *direct*
  prerequisites, so a learner missing a grandparent skill passed the gate.
  The Cypher version walks the full chain.
- 2026-08-26: **Auth + per-user isolation.** `lib/auth/*`, `lib/db/users.ts`,
  `middleware.ts`, `/login`, `/signup`, `/api/auth/*`, `/api/account`
  (consent PATCH, export GET, delete DELETE — product rule 5). No new
  dependency: scrypt comes from `node:crypto`.
  Two real bugs caught here. (1) A unit test found that
  `Buffer.from("zz","hex")` silently yields an *empty* buffer, so a malformed
  stored hash made `timingSafeEqual` compare two empty buffers and return
  true — **any password would have authenticated**. Fixed by validating hex
  length before decoding; the regression case is in `password.test.ts`.
  (2) A revoked-but-present cookie passed middleware and threw in the page,
  returning 500 instead of redirecting; server components now use
  `requireUserOrRedirect`.
  Also closed an IDOR: `/api/diagnostic` used to take `learnerId` from the
  request body, so anyone could append events to another learner's log.
  Verified live: signup/login/logout, weak-password and duplicate-email
  rejection, identical failure text for wrong password vs unknown account,
  HttpOnly cookie, cross-user isolation (user A's 7 events invisible to B),
  consent gate (persist ignored without consent), and delete revoking the
  session and removing the data.
- 2026-08-26: **Onboarding flow.** `/onboarding` + `components/OnboardingFlow`
  (free text → review/edit → confirm), `/api/onboarding` POST/PUT, and the
  diagnostic split into a server page + `components/DiagnosticFlow` so its
  role list comes from Neo4j instead of a hardcoded array.
  `extractLearnerIntent` now takes `roles` as an argument — the zod enum is
  built per call from seeded data, so adding a domain needs no code change
  here. `lib/llm/intent-extraction.test.ts` pins that trust boundary.
  Verified live end to end: signup → free-text goal ("move into cloud
  security, free only, ~4 h/week, about 5 months") → Gemini returned
  `cloud-security-associate`, 20 weeks, 4 h/week, free → confirmed → profile
  persisted → diagnostic persisted → dashboard readiness 24% derived from
  the stored event log. A forged `targetRoleId` ("astronaut") is rejected and
  unauthenticated onboarding returns 401.
- 2026-08-26: **Grounded explanations wired** (`/api/explain`,
  `components/ExplainButton`, rewritten `lib/llm/grounded-explanations.ts`).
  The guard is the point: a prompt instruction is not a guarantee, so model
  output is validated against a closed fact set and thrown away if it
  asserts anything unsupported.
  Two bugs the tests caught: (1) including the six score percentages in the
  allowed-number set made it wide enough that an invented "90 minute"
  duration passed because the total score happened to be 90% — score
  components are now excluded, since the UI already renders them as a table;
  (2) `\b\$` never matches, because there is no word boundary between a space
  and `$`, so invented prices sailed through — currency symbols now have
  their own alternative in the pattern.
  Verified live: Gemini produced correctly grounded prose (used only the
  45-minute duration and 0% mastery), mismatched resource/skill pairs and
  prerequisite-failing candidates are rejected 400, unauthenticated 401, and
  both a missing and an invalid API key fall back to deterministic text.
- 2026-08-26: **Qdrant wired at request time** (`lib/vector/search.ts`,
  `gateResources` in `lib/graph/queries.ts`, `/api/search`,
  `components/ResourceSearch`). Pipeline is Qdrant widen -> Neo4j gate ->
  Mongo metadata, matching ARCHITECTURE.md's rule that the vector store never
  bypasses prerequisite validation.
  Proved the gate is live rather than cosmetic: the query "how do I catch
  phishing emails and suspicious logins" (no skill tag contains "phishing")
  returned the same five resources with identical similarity scores before
  and after a diagnostic, but two flipped BLOCKED -> READY once their
  prerequisites were actually met, while a cloud resource stayed blocked.
  Note: this client version exposes `query()`, not `search()`.
- 2026-08-26: **Scaled to nine domains / 19 career paths.** Added Web
  Development, Cloud & DevOps, AI & Machine Learning, UX & Product Design,
  Product Management, Mobile Development, and IT Support & Networking —
  `lib/data/domains/*.ts` plus a question bank each (210 new questions, three
  difficulty tiers for every role-required skill). `lib/data/catalog-helpers.ts`
  adds `defineDomain()` and `resource()` so a row states only what varies;
  `lastVerifiedAt` deliberately has **no default**, because it is a claim about
  a check someone actually performed.
  Roughly 190 candidate URLs were curl-verified; **11 were dropped for 404/403**,
  including one I had confabulated outright and caught only because the rule is
  to verify every link before it is seeded.
  The catalog tests paid for themselves again, all on real defects: three rows
  duplicated URLs that **already existed in the cybersecurity catalog**;
  `kubernetes-basics-tutorial` listed `devops-containers` as both taught and
  required, making it permanently unrecommendable; and three role skills had
  only one candidate, so scoring had nothing to rank.
  **Found a pre-existing modelling bug affecting 9 of 19 roles** — including
  `cloud-security-associate` and `analytics-engineer`, which predate all of this
  work. A role could require a skill whose prerequisites the role never asked
  for, so the roadmap said "build X first" while never surfacing X as a gap: a
  dead end. Role skill sets are now prerequisite-closed and
  `catalog.test.ts` enforces it.
  **`POST /api/roadmap` was unauthenticated and read mastery only from the
  request body**, so a signed-in learner with real mastery saw 0% readiness. It
  now requires a session and falls back to the learner's stored mastery; the
  body value is kept only for the diagnostic's not-yet-persisted case.
  `seed/vector/index.ts` gained rate-limit retry — 225 embeddings reliably trips
  the free-tier quota, and a 429 is a wait, not a failure.
  Also removed `recharts` and `claude` from dependencies: both were installed
  and imported nowhere.
  Verified live: the LLM picked `site-reliability-engineer` from free text (a
  role that did not exist that morning), **all 19 roles return a real first
  diagnostic question**, and semantic search reaches every domain with the
  prerequisite gate still blocking correctly.

- 2026-08-26: **Second domain shipped — Data & Analytics.**
  `lib/data/data-analytics-catalog.ts` (2 roles, 12 skills, 35 resources, every
  URL curl-verified 200 that day; 3 candidates were dropped for 404/403) and
  `lib/diagnostic/questions-data-analytics.ts` (36 questions). `questionBank`
  is now the concatenation of per-domain banks. Zero engine changes were
  needed, which was the point of the exercise.
  Tests were generalised rather than duplicated: `lib/data/catalog.test.ts`
  (renamed from `demo-catalog.test.ts`) now runs over `allResources`/`allRoles`
  from `@/seed/data`, so every future domain is held to the same bar
  automatically, plus new checks for cross-domain id collisions,
  cross-domain prerequisite leakage, and prerequisite cycles. `engine.test.ts`
  asserts every seeded role has all three question tiers for every required
  skill — without that a new domain would end the diagnostic early instead of
  failing loudly.
  **Found and fixed a real prerequisite-gate hole while driving it** (it
  affected cybersecurity too, and had been there since the Cypher migration):
  both `gateResources` and `findPrerequisiteValidResourceIds` checked only a
  resource's own `REQUIRES_SKILL` edges and never the `PREREQUISITE_OF` chain
  of the skill it *teaches*. A row that simply declared no prerequisites
  bypassed the graph entirely — the catalog could unlock a skill. Both queries
  now union the resource's own prerequisites with the transitive chain of what
  it teaches, excluding skills the resource itself teaches so it cannot block
  itself. The fix strictly improved the existing cyber proof: 4 resources now
  flip BLOCKED → READY after a diagnostic where only 2 did before.
  That fix cost three wrong guesses before I stopped and probed the database
  directly. The actual cause: **Cypher infers a list comprehension's element
  type from its WHERE predicate**, so a list built by comprehension is typed
  `LIST<BOOLEAN>` and is rejected as a map key (`$mastery[p]`) even though it
  holds strings at runtime. `toString(p)` restores the static type. There is a
  comment on the query saying so, because it looks removable and is not.
  `npm run graph:verify` (`scripts/verify-gate.ts`) pins five gate cases
  against the live graph, since vitest cannot reach Cypher.
  Verified live end to end: a free-text data goal → Gemini returned
  `data-analyst` (a role that did not exist an hour earlier, proving the enum
  is built from the graph) → 15-question diagnostic on the new ladder →
  roadmap where Data Visualization, despite the highest importance (1.0),
  correctly ranks *below* lower-importance unlocked skills.

- 2026-08-27: **Closed the loop, and added catalog administration.**
  The E2E audit had surfaced the real gap: `addEvidence()` had zero callers and
  `appendEvents` exactly one, so mastery could never move past the diagnostic and
  the evidence wallet could only ever show rows seeded to a hardcoded
  `DEMO_LEARNER_ID`. `lib/services/completion.ts` + `POST /api/complete` +
  `components/CompleteResource` fix that end to end.
  Deliberate call: completion is **not** self-reported. It reuses the diagnostic
  question bank as a post-check, graded server-side, because a self-reported
  checkbox would violate product rule 4 and would be worthless to a recruiter.
  Questions already used are excluded via event metadata, so a retry is not a
  replay of an answer the learner has already seen.
  `/admin` writes all three stores. Qdrant point ids are now derived from the
  resource slug (`lib/vector/point-id.ts`) rather than the seed loop's array
  index, which silently reshuffled every id whenever catalog order changed —
  that made a targeted re-index or delete impossible.
  Also fixed, same class as the earlier mastery bug: `POST /api/roadmap`
  **required `preferences` in the body** and 400'd without them, ignoring the
  preferences the learner had already given at onboarding. It now falls back to
  the stored profile.
  Two "failures" during verification were the test's fault, not the app's, and
  both are worth remembering. Semantic search for "networking basics" returned
  `ibm-networking-topic`, which teaches `it-networking-fundamentals` (IT Support)
  — a *different* skill that happens to render as "Networking Fundamentals". The
  SOC analyst's readiness correctly did not move. Completing a resource outside
  the target role is supposed to be a no-op for that role.
  Verified live: 14/14 admin checks (403 for non-admins, 404 on the page, dead
  URL rejected as HTTP 404, off-allowlist host held for confirmation, duplicate
  URL named its clashing row, self-blocking prerequisite rejected, save landed in
  all three stores and the new row came straight back out of the real
  Qdrant -> Neo4j -> Mongo pipeline, delete removed it from all three) and 14/14
  loop checks.

- 2026-08-28: **Merged the teammate UI redesign and corrected what it asserted.**
  Fast-forwarded `05c3dfa` (a 2,064-line redesign of the landing page, auth
  screens and header). Typecheck, lint, 107 unit tests and the build were all
  green on it, which is exactly why the problems it carried are worth recording:
  **none of them were the kind a test suite catches.**
  The landing page had been given hardcoded marketing numbers — "12+ Learning
  Domains, 48+ Career Tracks, 1200+ Skills in Graph" — against real seeded
  values of **9 / 19 / 96**. The footer of the same page already rendered the
  true counts from `getSkillGraph()`, so the page contradicted itself, and the
  headline claim was off by more than 12x on skills. The hero diagram likewise
  hardcoded a path ("JavaScript Foundations -> React Fundamentals", "96% match")
  and a goal ("Become a Full-Stack Developer") — none of those skills, that
  role, or that number exist anywhere in the product. For a project whose entire
  pitch is "every recommendation is checkable", inflated numbers on the landing
  page are the most expensive possible bug.
  All of it now derives from the graph the page already fetched: stats from
  `domains.length / roles.length / graph.skills.length`, the hero chain from
  `pickChain(graph.skills, 4)` — which resurrected `components/PrerequisiteChain`,
  built for exactly this and left with **zero callers** by the redesign — and the
  goal from a role that genuinely requires the last skill shown.
  Four other real defects in the same commit: `app/globals.css` never defined
  `.skillforge-hero-bg`, `.skillforge-grid`, `.skillforge-network` or
  `.skillforge-path-panel`, so four decorative layers rendered as flat colour
  (CSS has no compiler to catch this); all four public nav anchors
  (`#how-it-works`, `#career-tracks`, `#ai-mentor`, `#about`) pointed at ids that
  existed nowhere, so every link in the signed-out header was dead — three now
  have real section ids and "AI Mentor" was removed rather than have a section
  invented to justify it; and `/login` re-set `title: "Sign in | SkillForge"`,
  which the layout template turns into "Sign in | SkillForge · SkillForge".
  Verified live rather than assumed: rendered HTML no longer contains any of the
  six fabricated strings, and shows 9 / 19 / 96 matching the footer. **47/47**
  E2E checks pass against the merged build (20 routing, 13 loop, 14 admin).

- 2026-08-28: **Finished the dark migration into the signed-in app.**
  The redesign had set `body` to `#050714` with `color-scheme: dark`, but the
  dashboard, diagnostic, evidence, account and admin screens still painted
  themselves light on top of it (`bg-canvas` #f6f8fb, 36 solid `bg-white`
  cards). That was an unfinished migration, not a deliberate light/dark split,
  so the fix was to finish it rather than restyle each page by hand.
  Almost all of it is one change: the semantic tokens in `tailwind.config.ts`
  (`canvas`, `surface`, `ink`, `muted`, `border`, `teal`) now hold dark values.
  The token *names* did not move, so every page followed without touching its
  markup. `teal` keeps its name across ~60 usages but now resolves to the
  landing page's cyan, dark enough to carry white label text rather than the
  neon used for glows. Shadows were rebuilt with an inset highlight, since a
  drop shadow reads as depth on white and as nothing on near-black.
  What the tokens could not reach, and why each mattered:
  **(1)** 36 literal `bg-white` surfaces -> `bg-surface`; the `bg-white/10`
  overlays on the already-dark pages were deliberately left alone.
  **(2)** Status colours were tuned for a white card (`bg-red-50`,
  `text-amber-800`) and became unreadable on dark; they are now translucent
  tints with light text.
  **(3)** `SkillHeatmap` shaded tiles with `rgba(15,118,110,a)` - the old dark
  teal, effectively invisible on a dark card - and switched its label to white
  above 55% mastery. It is cyan now, and the contrast branch is gone: `ink` is
  light at every level, so the conditional had nothing left to switch between.
  **(4)** Seven form fields declared a border but no background, so they fell
  through to the browser's dark-mode default grey and sat visibly outside the
  palette. Every field now states its own background.
  Verified by looking at it, not by reading class names: a throwaway
  `/dev-preview` route rendered the token set and the heatmap, and the
  authenticated pages were captured server-side and served as static HTML,
  because browser-side sign-in is blocked here. Both scaffolds were deleted.
  47/47 E2E still pass (20 routing, 13 loop, 14 admin), plus 107 unit tests.
  Worth remembering: two dev servers were running, and the stale one on :3000
  was serving CSS from a `.next` that a later `npm run build` had clobbered -
  the documented trap in this file. It rendered pages completely unstyled and
  looked exactly like a broken retheme. The real server was on :3001.

- [x] Repo scaffolded; Neo4j, MongoDB, and Qdrant all connected
- [x] Skill graph + prerequisite edges seeded in Neo4j — 9 domains, 19 roles,
      96 skills
- [x] Curated resource catalog seeded in MongoDB — 225 rows across 9 domains,
      every URL verified HTTP 200 (43 cyber on 2026-08-25, the rest on
      2026-08-26)
- [x] Resource descriptions embedded and indexed in Qdrant
- [x] Conversational onboarding → structured learner intent (JSON)
      (`POST /api/onboarding`; `POST /api/roadmap` accepts the resulting profile)
- [x] Adaptive diagnostic (10–15 Qs, branching) — `POST /api/diagnostic`,
      stateless (client posts answers so far), 42-question bank, two-question
      ladder per skill in role-importance order
- [x] Planner: gap analysis + prerequisite-valid roadmap — `POST /api/roadmap`
      returns gaps ordered so a locked skill never outranks an unlocked one,
      each carrying the specific prerequisite that blocks it
- [x] Scoring engine + "why recommended" cards (rendered at `/diagnostic`)
- [x] Dashboard: readiness %, skill heatmap, next action —
      `components/SkillHeatmap.tsx` (CSS grid, no chart library; mastery drives
      the fill but every tile also states the number, so colour is never the
      only channel). NOTE: not yet confirmed in a browser.
- [x] Evidence wallet — `/evidence`, spec card format (skill, summary,
      artifact, rubric score, validated capabilities)
- [x] Feedback → replanning loop — `lib/adaptation/replan.ts`,
      `POST /api/replan`, "Plan this week" panel on `/diagnostic`
- [ ] 3 demo scenarios rehearsed (see `docs/BUILD_PLAN.md`)
