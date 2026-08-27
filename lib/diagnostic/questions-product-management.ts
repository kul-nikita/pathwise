import type { DiagnosticQuestion } from "@/lib/diagnostic/types";

export const productManagementQuestions: DiagnosticQuestion[] = [
  // pm-discovery
  {
    id: "pmdisc-b",
    skillId: "pm-discovery",
    difficulty: "beginner",
    prompt: "A customer asks for a CSV export button. What should you establish first?",
    options: [
      "How soon engineering can build it",
      "What they are trying to accomplish with the exported data",
      "Which competitor already has it",
      "Where the button should be placed"
    ],
    correctIndex: 1
  },
  {
    id: "pmdisc-i",
    skillId: "pm-discovery",
    difficulty: "intermediate",
    prompt: "Which of the four discovery risks does a prototype test most directly address?",
    options: [
      "Business viability",
      "Usability — whether people can actually work out how to use it",
      "Technical feasibility",
      "Regulatory risk"
    ],
    correctIndex: 1
  },
  {
    id: "pmdisc-a",
    skillId: "pm-discovery",
    difficulty: "advanced",
    prompt: "Five enterprise customers request the same feature. Why is that still weak evidence on its own?",
    options: [
      "Enterprise customers are never representative",
      "The loudest, most-contacted accounts are a biased sample; it says little about the wider base or the underlying need",
      "Five is statistically significant, so it is strong evidence",
      "Feature requests should always be built as asked"
    ],
    correctIndex: 1
  },

  // pm-metrics
  {
    id: "pmmet-b",
    skillId: "pm-metrics",
    difficulty: "beginner",
    prompt: "What does retention measure?",
    options: [
      "How many people signed up in total",
      "How many users come back and keep using the product over time",
      "Revenue per employee",
      "How long the page takes to load"
    ],
    correctIndex: 1
  },
  {
    id: "pmmet-i",
    skillId: "pm-metrics",
    difficulty: "intermediate",
    prompt: "What makes a good north-star metric?",
    options: [
      "It is the easiest number to collect",
      "It reflects value delivered to users and plausibly predicts long-term business success",
      "It always increases",
      "It is reported only to executives"
    ],
    correctIndex: 1
  },
  {
    id: "pmmet-a",
    skillId: "pm-metrics",
    difficulty: "advanced",
    prompt: "A team is measured on daily active users and starts sending aggressive notifications. What has gone wrong?",
    options: [
      "Nothing — the metric is going up",
      "The metric became the target and is now being satisfied in a way that damages the underlying goal",
      "DAU is never a valid metric",
      "Notifications cannot affect DAU"
    ],
    correctIndex: 1
  },

  // pm-stakeholder-communication
  {
    id: "pmstake-b",
    skillId: "pm-stakeholder-communication",
    difficulty: "beginner",
    prompt: "What belongs at the top of a status update to executives?",
    options: [
      "A chronological list of everything the team did",
      "The decision, risk, or ask that needs their attention",
      "An apology for any delays",
      "The full technical design"
    ],
    correctIndex: 1
  },
  {
    id: "pmstake-i",
    skillId: "pm-stakeholder-communication",
    difficulty: "intermediate",
    prompt: "What is the most effective way to decline a stakeholder's feature request?",
    options: [
      "Say the backlog is full",
      "Explain the trade-off — what it would displace and why that ranks higher right now",
      "Agree and quietly deprioritise it",
      "Escalate to their manager"
    ],
    correctIndex: 1
  },
  {
    id: "pmstake-a",
    skillId: "pm-stakeholder-communication",
    difficulty: "advanced",
    prompt: "Two senior stakeholders want incompatible things. What is the most productive first move?",
    options: [
      "Build both to avoid conflict",
      "Surface the underlying goals and the explicit trade-off, so the decision is made openly rather than by seniority",
      "Choose whichever one outranks the other",
      "Delay until one of them forgets"
    ],
    correctIndex: 1
  },

  // pm-technical-fluency
  {
    id: "pmtech-b",
    skillId: "pm-technical-fluency",
    difficulty: "beginner",
    prompt: "What is an API, in the context of specifying a product?",
    options: [
      "The visual design of an application",
      "A defined contract through which one system requests something from another",
      "A type of database",
      "The server's physical hardware"
    ],
    correctIndex: 1
  },
  {
    id: "pmtech-i",
    skillId: "pm-technical-fluency",
    difficulty: "intermediate",
    prompt: "Engineering says a feature requires a schema migration. Why should that affect your plan?",
    options: [
      "It never affects the plan",
      "Migrations touch existing data and are hard to reverse, so they add risk, sequencing, and rollback constraints",
      "It only changes the visual design",
      "It means the feature is impossible"
    ],
    correctIndex: 1
  },
  {
    id: "pmtech-a",
    skillId: "pm-technical-fluency",
    difficulty: "advanced",
    prompt: "What does taking on technical debt actually trade?",
    options: [
      "Money now for money later",
      "Speed now for a higher ongoing cost of every future change in that area",
      "Quality now for quality later",
      "Nothing — the term is metaphorical only"
    ],
    correctIndex: 1
  },

  // pm-prioritization
  {
    id: "pmprior-b",
    skillId: "pm-prioritization",
    difficulty: "beginner",
    prompt: "What does the RICE framework score?",
    options: [
      "Revenue, Investment, Cost, Effort",
      "Reach, Impact, Confidence, Effort",
      "Risk, Innovation, Customers, Enablement",
      "Retention, Income, Conversion, Engagement"
    ],
    correctIndex: 1
  },
  {
    id: "pmprior-i",
    skillId: "pm-prioritization",
    difficulty: "intermediate",
    prompt: "Why does the confidence term matter in a RICE score?",
    options: [
      "It measures the team's morale",
      "It discounts estimates built on weak evidence, so a guess cannot outrank a validated opportunity",
      "It reflects how confident the stakeholder is",
      "It is purely decorative"
    ],
    correctIndex: 1
  },
  {
    id: "pmprior-a",
    skillId: "pm-prioritization",
    difficulty: "advanced",
    prompt: "What is the main limitation of any scoring framework?",
    options: [
      "The arithmetic is unreliable",
      "The inputs are estimates, so a precise-looking score can lend false authority to a guess",
      "They cannot rank more than ten items",
      "They require specialised software"
    ],
    correctIndex: 1
  },

  // pm-roadmapping
  {
    id: "pmroad-b",
    skillId: "pm-roadmapping",
    difficulty: "beginner",
    prompt: "What distinguishes an outcome-based roadmap from a feature list?",
    options: [
      "It has more items",
      "It commits to the problems to be solved and results to be achieved, leaving solution detail open",
      "It only covers one quarter",
      "It is written by engineering"
    ],
    correctIndex: 1
  },
  {
    id: "pmroad-i",
    skillId: "pm-roadmapping",
    difficulty: "intermediate",
    prompt: "How does a roadmap differ from a release plan?",
    options: [
      "They are the same document",
      "A roadmap communicates direction and intent; a release plan commits to specific scope and dates",
      "A release plan covers a longer horizon",
      "Roadmaps are internal only"
    ],
    correctIndex: 1
  },
  {
    id: "pmroad-a",
    skillId: "pm-roadmapping",
    difficulty: "advanced",
    prompt: "Why is a roadmap of precise dates twelve months out usually counterproductive?",
    options: [
      "Long roadmaps are hard to print",
      "It presents low-confidence estimates as commitments, so either the plan or the team's credibility breaks",
      "Because plans should never exceed one sprint",
      "Stakeholders never read past the first quarter"
    ],
    correctIndex: 1
  },

  // pm-specs
  {
    id: "pmspec-b",
    skillId: "pm-specs",
    difficulty: "beginner",
    prompt: "What makes acceptance criteria useful?",
    options: [
      "They describe the implementation approach",
      "They state observable conditions that let anyone confirm the work is done",
      "They list the team members involved",
      "They estimate the story points"
    ],
    correctIndex: 1
  },
  {
    id: "pmspec-i",
    skillId: "pm-specs",
    difficulty: "intermediate",
    prompt: "Why does a spec open with the problem rather than the solution?",
    options: [
      "Convention inherited from academic writing",
      "It lets the team evaluate whether the proposed solution is the best one, instead of only how to build it",
      "Problems are quicker to write",
      "Solutions belong in the roadmap"
    ],
    correctIndex: 1
  },
  {
    id: "pmspec-a",
    skillId: "pm-specs",
    difficulty: "advanced",
    prompt: "A story reads 'As a user, I want the app to be better.' What is the central flaw?",
    options: [
      "It is too short",
      "It is untestable — nothing states what would count as done",
      "It uses the wrong template",
      "It names the wrong persona"
    ],
    correctIndex: 1
  },

  // pm-experimentation
  {
    id: "pmexp-b",
    skillId: "pm-experimentation",
    difficulty: "beginner",
    prompt: "What is a control group in an experiment?",
    options: [
      "The group that reports the results",
      "The unchanged group the treatment is compared against",
      "The engineers running the test",
      "The group with the largest sample"
    ],
    correctIndex: 1
  },
  {
    id: "pmexp-i",
    skillId: "pm-experimentation",
    difficulty: "intermediate",
    prompt: "What is a guardrail metric for?",
    options: [
      "Deciding the winner of the test",
      "Catching harm elsewhere — a conversion win that quietly increases refunds or churn",
      "Measuring test duration",
      "Setting the traffic split"
    ],
    correctIndex: 1
  },
  {
    id: "pmexp-a",
    skillId: "pm-experimentation",
    difficulty: "advanced",
    prompt: "A test is stopped the moment it reaches significance. Why is that a problem?",
    options: [
      "Stopping early wastes traffic",
      "Repeatedly checking and stopping on a favourable result inflates the false-positive rate well beyond the stated threshold",
      "Significance can only be computed at the end by law",
      "It has no effect if the sample is large"
    ],
    correctIndex: 1
  },

  // pm-agile-delivery
  {
    id: "pmagile-b",
    skillId: "pm-agile-delivery",
    difficulty: "beginner",
    prompt: "What is the purpose of a retrospective?",
    options: [
      "To report status to management",
      "For the team to inspect how it works and agree on a change to try next",
      "To estimate the next sprint",
      "To demo completed work to stakeholders"
    ],
    correctIndex: 1
  },
  {
    id: "pmagile-i",
    skillId: "pm-agile-delivery",
    difficulty: "intermediate",
    prompt: "Why do Kanban teams limit work in progress?",
    options: [
      "To reduce headcount",
      "Because too much parallel work increases context switching and lengthens the time anything takes to finish",
      "To make the board look tidier",
      "Because tools cap the number of cards"
    ],
    correctIndex: 1
  },
  {
    id: "pmagile-a",
    skillId: "pm-agile-delivery",
    difficulty: "advanced",
    prompt: "Why is velocity a poor metric for comparing two teams?",
    options: [
      "Velocity is impossible to calculate",
      "Story points are locally calibrated, so the numbers mean different things and comparison invites inflation",
      "Velocity only applies to Kanban",
      "Teams always estimate identically"
    ],
    correctIndex: 1
  }
];
