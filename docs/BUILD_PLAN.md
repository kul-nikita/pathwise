# Build Plan

## Day 1 — Foundation

- [ ] Repo scaffolded (Next.js + TS + Tailwind + shadcn/ui); Neo4j AuraDB,
      MongoDB Atlas, and Qdrant (Cloud or local Docker) all connected.
- [ ] Define 3 roles, their required skills, and prerequisite edges — get
      this graph on paper/whiteboard before writing a single Cypher query.
- [ ] Seed the graph into Neo4j (`npm run graph:seed`).
- [ ] Curate and seed 30–50 resources minimum into MongoDB (aim for 50–100
      if time allows), every document hand-verified (real URL, correct
      tags, `_id` matching the Neo4j resource node).
- [ ] Onboarding flow: free-text goal → LLM structured-intent extraction →
      stored `learner_profile`.
- [ ] Basic path-generation endpoint: given a profile, return a
      prerequisite-valid gap list (no scoring yet, just ordering).

**End-of-day check:** can you go from a typed goal to a correctly-ordered
list of missing skills, with zero hardcoding of that specific learner's
path? If yes, Day 1 is done.

## Day 2 — Intelligence

- [ ] Adaptive diagnostic: 10–15 questions, branch difficulty on
      correctness, write results into `mastery`.
- [ ] Scoring engine implementing the formula in `docs/ARCHITECTURE.md`
      exactly, with hard filters applied first.
- [ ] (Optional, only if Day 1 finished early) Embed resource descriptions
      and index into Qdrant (`npm run vector:index`) to widen candidates for
      free-text gap phrasing — build and demo the MongoDB tag-match path
      first regardless, this is additive.
- [ ] "Why recommended" explanation cards — LLM call grounded only in the
      scored candidate's metadata (test that it can't invent a duration).
- [ ] Feedback controls ("too easy," "too difficult," "not relevant," "more
      hands-on," "less time this week") wired to the re-ranking logic.
- [ ] Replanning: assessment-score-triggered and manual "replan my week."

**End-of-day check:** mark a diagnostic answer wrong twice in a row for one
skill and confirm a remediation resource gets inserted and downstream
skills get delayed, without touching code.

## Day 3 — Demo polish

- [ ] Dashboard: role-readiness %, skill mastery heatmap, current milestone,
      next best action, weekly consistency.
- [ ] Evidence wallet UI (see `PRODUCT_SPEC.md` for the card format).
- [ ] Capstone project output for at least one path (SOC analyst).
- [ ] Rehearse all three demo scenarios end-to-end, timed.
- [ ] Cut anything not needed for the demo path — do not add features today.

## Demo scenarios (script)

Run these in order; each takes 2–3 minutes.

1. **Cold start — Beginner SOC analyst.** Type the goal in, show intent
   extraction, run the diagnostic, show the gap map and generated 12-week
   roadmap. Click into one recommended resource's "why" card and read the
   six score components out loud.
2. **Different starting point — Python-capable pentesting track.** Show the
   same engine producing a structurally different roadmap for a different
   role/skill set, proving it's not a hardcoded path.
3. **Adaptation — time-constrained learner.** Trigger "only 2 hours this
   week" and show the replanned week preserving critical-path evidence
   tasks and deferring the rest. Then show a failed quiz inserting a
   remediation module.
4. **Close on the evidence wallet.** Show 2–3 completed evidence cards and
   frame it as "this is what a recruiter sees" — this is the strongest
   visual to end on.

## Judging-criteria alignment (use when writing the pitch)

- **Technical depth:** deterministic planner + graph-based prerequisite
  validation, separate from the LLM — call this out explicitly, it's the
  most defensible technical claim in the product.
- **Explainability:** every recommendation shows its scoring breakdown, not
  a black-box confidence number.
- **Real-world grounding:** curated catalog of real, working links from
  named credible providers (TryHackMe, PortSwigger, Microsoft Learn, etc.),
  not synthetic content.
- **Responsible AI:** consent, data control, bias-awareness, and "never
  claims incapability" are visible product features, not slide bullet
  points — show the consent screen and the data-export/delete option live
  if there's time.
- **Impact/market fit:** grounded in a specific, real hiring pipeline
  (junior SOC analyst / pentester / cloud security associate) with concrete,
  checkable milestones, not a vague "personalized learning for everyone."

## Explicit non-goals (do not build these, even if there's spare time)

- A generic chatbot that just links out to courses.
- Multi-domain support beyond the three security roles.
- Fully autonomous grading of freeform learner submissions with no rubric.
- Scraping large platforms without permission — stick to the domain
  allowlist in `docs/ARCHITECTURE.md`.
- A recommendation score shown with no explanation.
- A huge, poorly-tagged content catalog — 50 well-tagged resources beat 500
  sloppy ones for both the algorithm and the demo.