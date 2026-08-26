import { defineDomain, resource } from "@/lib/data/catalog-helpers";

const V = "2026-08-26";

/** Every URL below returned HTTP 200 on 2026-08-26. */
export const uxDesign = defineDomain({
  domain: {
    id: "ux-design",
    name: "UX & Product Design",
    description: "Understand users, shape the interface, and test whether it actually works for them."
  },

  roles: [
    {
      id: "ux-designer",
      title: "UX Designer",
      description: "Research what people need, structure it, and validate the design against real users.",
      requiredSkills: [
        { skillId: "ux-research", importance: 1 },
        { skillId: "ux-personas", importance: 0.8 },
        { skillId: "ux-information-architecture", importance: 0.9 },
        { skillId: "ux-wireframing", importance: 1 },
        { skillId: "ux-prototyping", importance: 0.9 },
        { skillId: "ux-usability-testing", importance: 1 },
        { skillId: "ux-visual-design", importance: 0.6 },
        { skillId: "ux-inclusive-design", importance: 0.8 }
      ]
    },
    {
      id: "product-designer",
      title: "Product Designer",
      description: "Own the craft end to end: visual system, interaction detail, and the shipped result.",
      requiredSkills: [
        { skillId: "ux-visual-design", importance: 1 },
        { skillId: "ux-design-systems", importance: 0.9 },
        { skillId: "ux-wireframing", importance: 0.9 },
        { skillId: "ux-prototyping", importance: 1 },
        { skillId: "ux-interaction-design", importance: 0.9 },
        { skillId: "ux-inclusive-design", importance: 0.7 },
        { skillId: "ux-information-architecture", importance: 0.6 },
        { skillId: "ux-research", importance: 0.7 }
      ]
    }
  ],

  skills: [
    {
      id: "ux-research",
      name: "User Research",
      category: "discovery",
      description: "Interviews, surveys, and field study — and knowing which question each can answer.",
      prerequisites: []
    },
    {
      id: "ux-visual-design",
      name: "Visual Design Fundamentals",
      category: "craft",
      description: "Hierarchy, typography, colour, spacing, and the grid underneath a calm layout.",
      prerequisites: []
    },
    {
      id: "ux-information-architecture",
      name: "Information Architecture",
      category: "structure",
      description: "Labelling, grouping, and navigation that match how people expect to find things.",
      prerequisites: []
    },
    {
      id: "ux-personas",
      name: "Personas & Journey Mapping",
      category: "discovery",
      description: "Turn research into archetypes and journeys that point at a specific design decision.",
      prerequisites: ["ux-research"]
    },
    {
      id: "ux-wireframing",
      name: "Wireframing",
      category: "structure",
      description: "Low-fidelity layouts that settle structure and flow before anything gets polished.",
      prerequisites: ["ux-information-architecture"]
    },
    {
      id: "ux-prototyping",
      name: "Prototyping",
      category: "craft",
      description: "Clickable flows at the fidelity the question needs, and no more than that.",
      prerequisites: ["ux-wireframing"]
    },
    {
      id: "ux-interaction-design",
      name: "Interaction Design",
      category: "craft",
      description: "States, feedback, motion, and error recovery — the behaviour between the screens.",
      prerequisites: ["ux-wireframing"]
    },
    {
      id: "ux-design-systems",
      name: "Design Systems",
      category: "craft",
      description: "Tokens, components, and documented usage so a team stays consistent without asking.",
      prerequisites: ["ux-visual-design"]
    },
    {
      id: "ux-inclusive-design",
      name: "Inclusive Design",
      category: "craft",
      description: "Contrast, target size, focus order, and designing for assistive technology.",
      prerequisites: ["ux-visual-design"]
    },
    {
      id: "ux-usability-testing",
      name: "Usability Testing",
      category: "validation",
      description: "Task-based sessions, watching where people stall, and separating signal from opinion.",
      prerequisites: ["ux-prototyping"]
    }
  ],

  resources: [
    resource({
      id: "nng-ux-research-cheat-sheet",
      title: "UX Research Cheat Sheet",
      provider: "Nielsen Norman Group",
      url: "https://www.nngroup.com/articles/ux-research-cheat-sheet/",
      resourceType: "doc",
      skillTags: ["ux-research"],
      difficulty: "beginner",
      durationMinutes: 60,
      qualityScore: 0.9,
      evidenceType: "research-plan",
      lastVerifiedAt: V,
      description: "Which research method answers which question, mapped across the project timeline."
    }),
    resource({
      id: "nng-personas-study-guide",
      title: "Personas: Study Guide",
      provider: "Nielsen Norman Group",
      url: "https://www.nngroup.com/articles/personas-study-guide/",
      resourceType: "doc",
      skillTags: ["ux-personas", "ux-research"],
      difficulty: "intermediate",
      durationMinutes: 120,
      qualityScore: 0.87,
      evidenceType: "persona-set",
      lastVerifiedAt: V,
      description: "Building personas from evidence rather than assumption, and how they get misused."
    }),
    resource({
      id: "nng-journey-mapping-101",
      title: "Journey Mapping 101",
      provider: "Nielsen Norman Group",
      url: "https://www.nngroup.com/articles/journey-mapping-101/",
      resourceType: "doc",
      skillTags: ["ux-personas"],
      difficulty: "beginner",
      durationMinutes: 45,
      qualityScore: 0.86,
      prerequisites: ["ux-research"],
      evidenceType: "journey-map",
      lastVerifiedAt: V,
      description: "The anatomy of a journey map and the decisions it is supposed to drive."
    }),
    resource({
      id: "nng-ia-study-guide",
      title: "Information Architecture: Study Guide",
      provider: "Nielsen Norman Group",
      url: "https://www.nngroup.com/articles/ia-study-guide/",
      resourceType: "doc",
      skillTags: ["ux-information-architecture"],
      difficulty: "intermediate",
      durationMinutes: 150,
      qualityScore: 0.88,
      evidenceType: "sitemap",
      lastVerifiedAt: V,
      description: "Card sorting, tree testing, labelling, and navigation structure, with worked examples."
    }),
    resource({
      id: "idf-information-architecture",
      title: "Information Architecture",
      provider: "Interaction Design Foundation",
      url: "https://www.interaction-design.org/literature/topics/information-architecture",
      resourceType: "doc",
      skillTags: ["ux-information-architecture"],
      difficulty: "beginner",
      durationMinutes: 90,
      qualityScore: 0.79,
      evidenceType: "sitemap",
      lastVerifiedAt: V,
      description: "Organising, labelling, and structuring content so it can be found and understood."
    }),
    resource({
      id: "nng-wireflows",
      title: "Wireflows: A UX Deliverable",
      provider: "Nielsen Norman Group",
      url: "https://www.nngroup.com/articles/wireflows/",
      resourceType: "doc",
      skillTags: ["ux-wireframing"],
      difficulty: "intermediate",
      durationMinutes: 45,
      qualityScore: 0.84,
      prerequisites: ["ux-information-architecture"],
      evidenceType: "wireframe-set",
      lastVerifiedAt: V,
      description: "Combining wireframes with flow so screens and transitions are reviewed together."
    }),
    resource({
      id: "lawsofux",
      title: "Laws of UX",
      provider: "Laws of UX",
      url: "https://lawsofux.com/",
      resourceType: "doc",
      skillTags: ["ux-wireframing", "ux-interaction-design"],
      difficulty: "beginner",
      durationMinutes: 90,
      qualityScore: 0.85,
      evidenceType: "wireframe-set",
      lastVerifiedAt: V,
      description: "The psychology heuristics behind layout and interaction choices, each with a source."
    }),
    resource({
      id: "figma-what-is-prototyping",
      title: "What Is Prototyping?",
      provider: "Figma",
      url: "https://www.figma.com/resource-library/what-is-prototyping/",
      resourceType: "doc",
      skillTags: ["ux-prototyping"],
      difficulty: "beginner",
      durationMinutes: 60,
      qualityScore: 0.8,
      prerequisites: ["ux-wireframing"],
      evidenceType: "clickable-prototype",
      lastVerifiedAt: V,
      description: "Fidelity levels, when each is worth building, and how prototypes get tested."
    }),
    resource({
      id: "nng-prototype-fidelity",
      title: "UX Prototypes: Low Fidelity vs. High Fidelity",
      provider: "Nielsen Norman Group",
      url: "https://www.nngroup.com/articles/ux-prototype-hi-lo-fidelity/",
      resourceType: "doc",
      skillTags: ["ux-prototyping"],
      difficulty: "intermediate",
      durationMinutes: 45,
      qualityScore: 0.86,
      prerequisites: ["ux-wireframing"],
      evidenceType: "clickable-prototype",
      lastVerifiedAt: V,
      description: "Choosing fidelity by the question being asked, and the cost of guessing wrong."
    }),
    resource({
      id: "material-design-foundations",
      title: "Material Design Foundations",
      provider: "Google Material Design",
      url: "https://m3.material.io/foundations",
      resourceType: "doc",
      skillTags: ["ux-visual-design", "ux-interaction-design"],
      difficulty: "intermediate",
      durationMinutes: 240,
      qualityScore: 0.88,
      evidenceType: "design-spec",
      lastVerifiedAt: V,
      description: "Layout, colour, typography, and motion as a coherent, documented design language."
    }),
    resource({
      id: "apple-human-interface-guidelines",
      title: "Human Interface Guidelines",
      provider: "Apple",
      url: "https://developer.apple.com/design/human-interface-guidelines",
      resourceType: "doc",
      skillTags: ["ux-visual-design", "ux-interaction-design"],
      difficulty: "intermediate",
      durationMinutes: 300,
      qualityScore: 0.9,
      evidenceType: "design-spec",
      lastVerifiedAt: V,
      description: "Platform conventions for layout, controls, navigation, and interaction behaviour."
    }),
    resource({
      id: "nng-design-systems-101",
      title: "Design Systems 101",
      provider: "Nielsen Norman Group",
      url: "https://www.nngroup.com/articles/design-systems-101/",
      resourceType: "doc",
      skillTags: ["ux-design-systems"],
      difficulty: "intermediate",
      durationMinutes: 60,
      qualityScore: 0.87,
      prerequisites: ["ux-visual-design"],
      evidenceType: "component-library",
      lastVerifiedAt: V,
      description: "Style guide, component library, and pattern library — what each one is actually for."
    }),
    resource({
      id: "nng-usability-testing-101",
      title: "Usability Testing 101",
      provider: "Nielsen Norman Group",
      url: "https://www.nngroup.com/articles/usability-testing-101/",
      resourceType: "doc",
      skillTags: ["ux-usability-testing"],
      difficulty: "beginner",
      durationMinutes: 60,
      qualityScore: 0.91,
      prerequisites: ["ux-prototyping"],
      evidenceType: "usability-report",
      lastVerifiedAt: V,
      description: "Running a task-based session, how many users you need, and reading the results."
    }),
    resource({
      id: "nng-five-users",
      title: "Why You Only Need to Test with 5 Users",
      provider: "Nielsen Norman Group",
      url: "https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/",
      resourceType: "doc",
      skillTags: ["ux-usability-testing"],
      difficulty: "intermediate",
      durationMinutes: 30,
      qualityScore: 0.88,
      prerequisites: ["ux-prototyping"],
      evidenceType: "usability-report",
      lastVerifiedAt: V,
      description: "The diminishing-returns argument for small rounds of testing, run more often."
    }),
    resource({
      id: "nng-ten-usability-heuristics",
      title: "10 Usability Heuristics for User Interface Design",
      provider: "Nielsen Norman Group",
      url: "https://www.nngroup.com/articles/ten-usability-heuristics/",
      resourceType: "doc",
      skillTags: ["ux-usability-testing", "ux-interaction-design"],
      difficulty: "beginner",
      durationMinutes: 45,
      qualityScore: 0.92,
      evidenceType: "heuristic-evaluation",
      lastVerifiedAt: V,
      description: "The ten heuristics used to evaluate an interface without recruiting participants."
    }),
    resource({
      id: "atomic-design-book",
      title: "Atomic Design",
      provider: "Brad Frost",
      url: "https://atomicdesign.bradfrost.com/",
      resourceType: "doc",
      skillTags: ["ux-design-systems"],
      difficulty: "advanced",
      durationMinutes: 420,
      qualityScore: 0.88,
      prerequisites: ["ux-visual-design"],
      evidenceType: "component-library",
      lastVerifiedAt: V,
      description: "A methodology for building interfaces from atoms up to full page templates."
    }),
    resource({
      id: "storybook-docs",
      title: "Storybook Documentation",
      provider: "Storybook",
      url: "https://storybook.js.org/docs",
      resourceType: "doc",
      skillTags: ["ux-design-systems"],
      difficulty: "intermediate",
      durationMinutes: 180,
      qualityScore: 0.83,
      prerequisites: ["ux-visual-design"],
      evidenceType: "component-library",
      lastVerifiedAt: V,
      description: "Develop, document, and review components in isolation from the application."
    }),
    resource({
      id: "inclusive-design-principles",
      title: "Inclusive Design Principles",
      provider: "Inclusive Design Principles",
      url: "https://inclusivedesignprinciples.info/",
      resourceType: "doc",
      skillTags: ["ux-inclusive-design"],
      difficulty: "beginner",
      durationMinutes: 60,
      qualityScore: 0.85,
      prerequisites: ["ux-visual-design"],
      evidenceType: "accessibility-review",
      lastVerifiedAt: V,
      description: "Seven principles for designing so that more people can use the same interface."
    }),
    resource({
      id: "wcag22-quickref",
      title: "How to Meet WCAG 2.2",
      provider: "W3C WAI",
      url: "https://www.w3.org/WAI/WCAG22/quickref/",
      resourceType: "doc",
      skillTags: ["ux-inclusive-design"],
      difficulty: "advanced",
      durationMinutes: 240,
      qualityScore: 0.89,
      prerequisites: ["ux-visual-design"],
      evidenceType: "accessibility-review",
      lastVerifiedAt: V,
      description: "Every success criterion with the techniques that satisfy it, filterable by level."
    })
  ]
});
