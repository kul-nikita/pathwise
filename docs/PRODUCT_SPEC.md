# Product Spec

> The worked example below stays a Junior SOC Analyst because it is the
> sharpest thing to demo. The engine itself is domain-agnostic and now ships
> nine domains / 19 career paths — the planner, scoring, diagnostic and graph
> queries did not change to add them. See `CLAUDE.md` → **Status**.

## Problem

Learners have thousands of courses available and no trustworthy way to
determine sequence, assess real skill gaps, or prove job-ready ability.
Conventional recommenders optimize for course clicks or completion, not
demonstrable readiness. Common, well-documented failure modes: cold starts,
static behavior assumptions, sparse learner data, poor interoperability
across platforms, weak explainability, and poor adaptation as goals evolve.

## Target market

Cybersecurity career-path intelligence for students and early-career
professionals. Narrower than "personalized learning for everyone" on
purpose — it's a sharper demo, it plays to security domain strengths, and it
gives objective milestones (labs completed, skills demonstrated, projects
built, interview readiness) instead of vague "engagement."

| Learner pain | Typical platform | SkillForge AI |
|---|---|---|
| "I want a security job, I don't know where to start" | Recommends popular courses | Converts the goal into a prerequisite-aware skill graph + weekly roadmap |
| Finishes courses, can't prove capability | Tracks completion/certificates | Requires portfolio evidence: lab reports, GitHub projects, write-ups |
| Overestimates their own level | Self-declared beginner/intermediate | Adaptive diagnostic estimates mastery per skill |
| Abandons rigid plans | Fixed course sequence | Weekly replanning based on time, performance, feedback |
| Recommendations feel random | "Because you liked X" | Explanation card: gap closed, relevance, prerequisite fit, effort |
| Content siloed across platforms | One catalog only | Aggregates and normalizes resources across providers |
| Learning is passive | Mostly videos + quizzes | learn → practice → prove → reflect, with real deliverables |

## Core promise

"Tell SkillForge where you want to go. It identifies what you already know,
shows what's missing, builds an achievable plan, and keeps adapting until
you can demonstrate the required skills."

## Personas / demo scenarios

Use these three for the live demo (also referenced in `BUILD_PLAN.md`):

1. **Beginner SOC analyst** — second-year student, knows Python basics and
   networking, wants to be internship-ready as a junior SOC analyst in 12
   weeks.
2. **Python-capable student moving into pentesting** — has programming
   background, wants a 6-month path to junior penetration tester, 5
   hrs/week, prefers hands-on labs.
3. **Time-constrained learner adapting a missed week** — mid-roadmap
   learner who drops to 2 hours available this week; show the replanning
   logic preserving critical-path items and deferring the rest.

## Example: 12-week SOC analyst roadmap

**Input:** "I'm a second-year student. I know Python basics and networking.
I want to become a junior SOC analyst within 12 weeks and build a portfolio
for internships."

**Gap map:**
- Already strong: TCP/IP basics, Python syntax
- Partial: Linux file permissions and processes
- Missing: SIEM querying, MITRE ATT&CK mapping, alert triage, incident
  documentation

**Roadmap:**

| Weeks | Focus | Evidence milestone |
|---|---|---|
| 1–2 | Linux + networking refresh | Linux-hardening checklist |
| 3–4 | Windows/Linux log analysis | Analyze a sample alert, flag false/true positive indicators |
| 5–6 | SIEM concepts and detection logic | Write three Sigma-style detections |
| 7–8 | Threat intelligence + MITRE ATT&CK | Map five alerts to ATT&CK techniques |
| 9–10 | Incident triage simulation | Triage a mock security alert |
| 11–12 | Capstone SOC investigation report + portfolio | Publish a GitHub project / case study |

**Adaptation examples:**
- Fails log-analysis quiz twice → insert a targeted remediation module.
- Finishes Linux material fast → reduce repetition, unlock SIEM work early.
- Has only 3 hours this week → preserve critical practice tasks, defer
  lower-value material.

## Killer demo feature: Career Readiness Evidence Wallet

Every completed task produces a verifiable "skill evidence card":

```
Skill: Log Analysis
Evidence: Investigated SSH brute-force simulation
Artifact: GitHub report / uploaded PDF
Rubric score: 84%
Validated capabilities:
  - Identify anomalous login patterns
  - Map event to MITRE technique
  - Write remediation recommendation
```

This is the single most compelling thing to show judges — it's the moment
the product stops looking like "a progress bar" and starts looking like an
internship-ready portfolio.

Each card is signed (HMAC over its own fields) and carries a **Copy Share
Link** to a public `/verify/<id>` page that recomputes the signature — so a
recruiter can confirm the record hasn't been edited without needing an
account. A stronger evidence entry comes from the optional **AI verification
interview**: five scenario questions graded server-side, in place of the
multiple-choice post-check.

## Positioning

- **Problem:** thousands of courses, no trustworthy way to sequence them,
  assess real gaps, or prove readiness.
- **Solution:** an adaptive, prerequisite-aware journey combining resource
  recommendations with hands-on projects and verifiable evidence.
- **Differentiator:** optimizes for demonstrable career readiness, not
  course clicks or completion.
- **One-liner:** SkillForge AI is a career-readiness copilot that maps what
  you know, identifies what you need, builds the next best learning path,
  and turns every milestone into proof of skill.

## Course-alternatives principle

Never lock a learner into one provider — always offer a primary option and
at least one alternative, so the learner retains agency instead of being
funneled through an opaque single path:

| Need | Primary | Alternative |
|---|---|---|
| Free content | Official docs + free lab | High-quality YouTube playlist |
| Certification | Coursera / Microsoft Learn / Cisco path | edX equivalent |
| Practice-based learning | TryHackMe / PortSwigger lab | Hack The Box Academy module |
| Only 30 minutes available | Short video + mini quiz | Documentation quickstart |
| Wants deep theory | University course | Official docs / papers |

## Responsible-use requirements (also see `CLAUDE.md` rule 5)

- Ask consent before analyzing learning history or importing profile data.
- Let learners view, edit, override recommendations, export, and delete
  their data.
- Never claim a learner is "not capable" of a role — state current evidence
  and next steps instead.
- Always show why a recommendation was generated and what data drove it.
- Minimize personal data sent to the LLM; pseudonymize identifiers.
- Validate all LLM output against the skill graph and resource catalog
  before it reaches the learner.
- Track a content-quality review status on every resource.
- Check that pathways don't degrade for learners with sparser interaction
  history or different language preferences.
