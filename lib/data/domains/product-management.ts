import { defineDomain, resource } from "@/lib/data/catalog-helpers";

const V = "2026-08-26";

/** Every URL below returned HTTP 200 on 2026-08-26. */
export const productManagement = defineDomain({
  domain: {
    id: "product-management",
    name: "Product Management",
    description: "Decide what to build and why, then get it built and measure whether it worked."
  },

  roles: [
    {
      id: "associate-product-manager",
      title: "Associate Product Manager",
      description: "Talk to users, pick the next most valuable thing, and get it shipped clearly.",
      requiredSkills: [
        { skillId: "pm-discovery", importance: 1 },
        { skillId: "pm-prioritization", importance: 0.9 },
        { skillId: "pm-roadmapping", importance: 0.9 },
        { skillId: "pm-metrics", importance: 0.8 },
        { skillId: "pm-specs", importance: 0.9 },
        { skillId: "pm-stakeholder-communication", importance: 1 },
        { skillId: "pm-agile-delivery", importance: 0.8 }
      ]
    },
    {
      id: "technical-product-manager",
      title: "Technical Product Manager",
      description: "Own products where the hard trade-offs are architectural as much as commercial.",
      requiredSkills: [
        { skillId: "pm-technical-fluency", importance: 1 },
        { skillId: "pm-discovery", importance: 0.8 },
        { skillId: "pm-specs", importance: 1 },
        { skillId: "pm-metrics", importance: 0.9 },
        { skillId: "pm-experimentation", importance: 0.8 },
        { skillId: "pm-agile-delivery", importance: 0.9 },
        { skillId: "pm-prioritization", importance: 0.7 },
        { skillId: "pm-roadmapping", importance: 0.7 },
        { skillId: "pm-stakeholder-communication", importance: 0.8 }
      ]
    }
  ],

  skills: [
    {
      id: "pm-discovery",
      name: "Customer Discovery",
      category: "discovery",
      description: "Interview for problems rather than feature requests, and separate signal from noise.",
      prerequisites: []
    },
    {
      id: "pm-metrics",
      name: "Product Metrics",
      category: "analysis",
      description: "Activation, retention, and a north-star metric that a team can actually move.",
      prerequisites: []
    },
    {
      id: "pm-stakeholder-communication",
      name: "Stakeholder Communication",
      category: "communication",
      description: "Written updates, trade-off framing, and saying no without losing the relationship.",
      prerequisites: []
    },
    {
      id: "pm-technical-fluency",
      name: "Technical Fluency",
      category: "foundations",
      description: "APIs, data models, and system constraints — enough to argue about a trade-off.",
      prerequisites: []
    },
    {
      id: "pm-prioritization",
      name: "Prioritization",
      category: "planning",
      description: "Scoring frameworks, opportunity cost, and defending a ranked list under pressure.",
      prerequisites: ["pm-discovery"]
    },
    {
      id: "pm-roadmapping",
      name: "Roadmapping",
      category: "planning",
      description: "Outcome-based roadmaps that survive contact with a changing quarter.",
      prerequisites: ["pm-prioritization"]
    },
    {
      id: "pm-specs",
      name: "Writing Specs",
      category: "planning",
      description: "Problem statement, scope, acceptance criteria, and the edge cases nobody raised.",
      prerequisites: ["pm-roadmapping"]
    },
    {
      id: "pm-experimentation",
      name: "Experimentation",
      category: "analysis",
      description: "Hypotheses, guardrail metrics, and knowing when a result is not a result.",
      prerequisites: ["pm-metrics"]
    },
    {
      id: "pm-agile-delivery",
      name: "Agile Delivery",
      category: "delivery",
      description: "Backlogs, estimation, iteration, and keeping a team unblocked rather than busy.",
      prerequisites: ["pm-specs"]
    }
  ],

  resources: [
    resource({
      id: "svpg-product-discovery",
      title: "Product Discovery",
      provider: "Silicon Valley Product Group",
      url: "https://www.svpg.com/product-discovery/",
      resourceType: "doc",
      skillTags: ["pm-discovery"],
      difficulty: "intermediate",
      durationMinutes: 90,
      qualityScore: 0.89,
      evidenceType: "discovery-summary",
      lastVerifiedAt: V,
      description: "Validating value, usability, feasibility, and viability before committing a team."
    }),
    resource({
      id: "svpg-articles",
      title: "SVPG Articles",
      provider: "Silicon Valley Product Group",
      url: "https://www.svpg.com/articles/",
      resourceType: "doc",
      skillTags: ["pm-discovery", "pm-stakeholder-communication"],
      difficulty: "intermediate",
      durationMinutes: 300,
      qualityScore: 0.87,
      evidenceType: "discovery-summary",
      lastVerifiedAt: V,
      description: "An archive on product teams, discovery, and the failure modes of feature factories."
    }),
    resource({
      id: "mindtheproduct-what-is-a-pm",
      title: "What Exactly Is a Product Manager?",
      provider: "Mind the Product",
      url: "https://www.mindtheproduct.com/what-exactly-is-a-product-manager/",
      resourceType: "doc",
      skillTags: ["pm-stakeholder-communication", "pm-discovery"],
      difficulty: "beginner",
      durationMinutes: 45,
      qualityScore: 0.8,
      evidenceType: "discovery-summary",
      lastVerifiedAt: V,
      description: "The scope of the role and where it borders engineering, design, and marketing."
    }),
    resource({
      id: "intercom-product-management-book",
      title: "Intercom on Product Management",
      provider: "Intercom",
      url: "https://www.intercom.com/resources/books/intercom-product-management",
      resourceType: "doc",
      skillTags: ["pm-stakeholder-communication", "pm-prioritization"],
      difficulty: "intermediate",
      durationMinutes: 240,
      qualityScore: 0.84,
      evidenceType: "product-brief",
      lastVerifiedAt: V,
      description: "Shipping, scope control, and saying no, written by a team doing it at pace."
    }),
    resource({
      id: "airfocus-rice-scoring",
      title: "What Is RICE Scoring?",
      provider: "airfocus",
      url: "https://airfocus.com/glossary/what-is-rice-scoring/",
      resourceType: "doc",
      skillTags: ["pm-prioritization"],
      difficulty: "beginner",
      durationMinutes: 30,
      qualityScore: 0.76,
      prerequisites: ["pm-discovery"],
      evidenceType: "prioritized-backlog",
      lastVerifiedAt: V,
      description: "Reach, impact, confidence, and effort as a repeatable way to rank a backlog."
    }),
    resource({
      id: "atlassian-requirements",
      title: "Product Requirements Documents",
      provider: "Atlassian",
      url: "https://www.atlassian.com/agile/product-management/requirements",
      resourceType: "doc",
      skillTags: ["pm-specs"],
      difficulty: "intermediate",
      durationMinutes: 60,
      qualityScore: 0.83,
      prerequisites: ["pm-roadmapping"],
      evidenceType: "product-spec",
      lastVerifiedAt: V,
      description: "What belongs in a requirements doc, and how it stays a living artefact."
    }),
    resource({
      id: "mountaingoat-user-stories",
      title: "User Stories",
      provider: "Mountain Goat Software",
      url: "https://www.mountaingoatsoftware.com/agile/user-stories",
      resourceType: "doc",
      skillTags: ["pm-specs", "pm-agile-delivery"],
      difficulty: "beginner",
      durationMinutes: 60,
      qualityScore: 0.85,
      evidenceType: "product-spec",
      lastVerifiedAt: V,
      description: "Writing stories with real acceptance criteria, and splitting the oversized ones."
    }),
    resource({
      id: "atlassian-jira-user-stories",
      title: "User Stories with Examples and a Template",
      provider: "Atlassian",
      url: "https://www.atlassian.com/agile/project-management/user-stories",
      resourceType: "doc",
      skillTags: ["pm-specs"],
      difficulty: "beginner",
      durationMinutes: 45,
      qualityScore: 0.81,
      prerequisites: ["pm-roadmapping"],
      evidenceType: "product-spec",
      lastVerifiedAt: V,
      description: "A worked template plus the anti-patterns that make a story untestable."
    }),
    resource({
      id: "productplan-roadmap-guide",
      title: "Product Roadmap Guide",
      provider: "ProductPlan",
      url: "https://www.productplan.com/learn/product-roadmap/",
      resourceType: "doc",
      skillTags: ["pm-roadmapping"],
      difficulty: "beginner",
      durationMinutes: 60,
      qualityScore: 0.8,
      prerequisites: ["pm-prioritization"],
      evidenceType: "roadmap",
      lastVerifiedAt: V,
      description: "Roadmap formats, audiences, and keeping one honest about uncertainty."
    }),
    resource({
      id: "romanpichler-roadmap-vs-release",
      title: "Product Roadmap vs. Release Plan",
      provider: "Roman Pichler",
      url: "https://www.romanpichler.com/blog/product-roadmap-vs-release-plan/",
      resourceType: "doc",
      skillTags: ["pm-roadmapping"],
      difficulty: "intermediate",
      durationMinutes: 30,
      qualityScore: 0.84,
      prerequisites: ["pm-prioritization"],
      evidenceType: "roadmap",
      lastVerifiedAt: V,
      description: "Why conflating the two turns an outcome roadmap into a delivery commitment."
    }),
    resource({
      id: "aha-product-roadmap",
      title: "What Is a Product Roadmap?",
      provider: "Aha!",
      url: "https://www.aha.io/roadmapping/guide/product-roadmap",
      resourceType: "doc",
      skillTags: ["pm-roadmapping"],
      difficulty: "beginner",
      durationMinutes: 45,
      qualityScore: 0.78,
      prerequisites: ["pm-prioritization"],
      evidenceType: "roadmap",
      lastVerifiedAt: V,
      description: "Goal-first roadmapping, with templates for several planning horizons."
    }),
    resource({
      id: "amplitude-north-star-metric",
      title: "North Star Metric",
      provider: "Amplitude",
      url: "https://amplitude.com/blog/north-star-metric",
      resourceType: "doc",
      skillTags: ["pm-metrics"],
      difficulty: "intermediate",
      durationMinutes: 45,
      qualityScore: 0.83,
      evidenceType: "metrics-definition",
      lastVerifiedAt: V,
      description: "Choosing one metric that predicts long-term value, and the inputs that drive it."
    }),
    resource({
      id: "reforge-north-star-metric",
      title: "The North Star Metric Playbook",
      provider: "Reforge",
      url: "https://www.reforge.com/blog/north-star-metric",
      resourceType: "doc",
      skillTags: ["pm-metrics"],
      difficulty: "advanced",
      durationMinutes: 60,
      qualityScore: 0.85,
      evidenceType: "metrics-definition",
      lastVerifiedAt: V,
      description: "How north-star metrics differ by business model, and how they get gamed."
    }),
    resource({
      id: "optimizely-split-testing",
      title: "Split Testing",
      provider: "Optimizely",
      url: "https://www.optimizely.com/optimization-glossary/split-testing/",
      resourceType: "doc",
      skillTags: ["pm-experimentation"],
      difficulty: "intermediate",
      durationMinutes: 45,
      qualityScore: 0.79,
      prerequisites: ["pm-metrics"],
      evidenceType: "experiment-writeup",
      lastVerifiedAt: V,
      description: "Designing a split test, choosing a primary metric, and reading the outcome."
    }),
    resource({
      id: "vwo-ab-testing",
      title: "A/B Testing Guide",
      provider: "VWO",
      url: "https://vwo.com/ab-testing/",
      resourceType: "doc",
      skillTags: ["pm-experimentation"],
      difficulty: "beginner",
      durationMinutes: 60,
      qualityScore: 0.77,
      prerequisites: ["pm-metrics"],
      evidenceType: "experiment-writeup",
      lastVerifiedAt: V,
      description: "Hypotheses, variants, sample size, and reading a test that did not win."
    }),
    resource({
      id: "scrum-guide",
      title: "The Scrum Guide",
      provider: "Scrum.org",
      url: "https://scrumguides.org/scrum-guide.html",
      resourceType: "doc",
      skillTags: ["pm-agile-delivery"],
      difficulty: "beginner",
      durationMinutes: 60,
      qualityScore: 0.86,
      prerequisites: ["pm-specs"],
      evidenceType: "delivery-plan",
      lastVerifiedAt: V,
      description: "The definitive short specification of Scrum roles, events, and artefacts."
    }),
    resource({
      id: "atlassian-agile",
      title: "Agile Coach",
      provider: "Atlassian",
      url: "https://www.atlassian.com/agile",
      resourceType: "course",
      skillTags: ["pm-agile-delivery"],
      difficulty: "beginner",
      durationMinutes: 240,
      qualityScore: 0.84,
      prerequisites: ["pm-specs"],
      evidenceType: "delivery-plan",
      lastVerifiedAt: V,
      description: "Agile practice across backlogs, estimation, ceremonies, and metrics."
    }),
    resource({
      id: "atlassian-kanban",
      title: "Kanban",
      provider: "Atlassian",
      url: "https://www.atlassian.com/agile/kanban",
      resourceType: "doc",
      skillTags: ["pm-agile-delivery"],
      difficulty: "intermediate",
      durationMinutes: 90,
      qualityScore: 0.82,
      prerequisites: ["pm-specs"],
      evidenceType: "delivery-plan",
      lastVerifiedAt: V,
      description: "Flow, work-in-progress limits, and continuous delivery without fixed sprints."
    }),
    resource({
      id: "mdn-http-overview-pm",
      title: "An Overview of HTTP",
      provider: "MDN Web Docs",
      url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview",
      resourceType: "doc",
      skillTags: ["pm-technical-fluency"],
      difficulty: "beginner",
      durationMinutes: 60,
      qualityScore: 0.85,
      evidenceType: "technical-brief",
      lastVerifiedAt: V,
      description: "How clients and servers actually talk, enough to reason about an API decision."
    }),
    resource({
      id: "postman-what-is-an-api",
      title: "What Is an API?",
      provider: "Postman",
      url: "https://www.postman.com/what-is-an-api/",
      resourceType: "doc",
      skillTags: ["pm-technical-fluency"],
      difficulty: "beginner",
      durationMinutes: 45,
      qualityScore: 0.79,
      evidenceType: "technical-brief",
      lastVerifiedAt: V,
      description: "APIs, endpoints, and payloads explained for someone specifying rather than building."
    })
  ]
});
