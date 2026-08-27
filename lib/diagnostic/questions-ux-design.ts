import type { DiagnosticQuestion } from "@/lib/diagnostic/types";

export const uxDesignQuestions: DiagnosticQuestion[] = [
  // ux-research
  {
    id: "uxres-b",
    skillId: "ux-research",
    difficulty: "beginner",
    prompt: "Which question is most likely to produce useful interview data?",
    options: [
      "Would you use a feature that did this?",
      "Walk me through the last time you tried to do this.",
      "Do you like this design?",
      "How much would you pay for it?"
    ],
    correctIndex: 1
  },
  {
    id: "uxres-i",
    skillId: "ux-research",
    difficulty: "intermediate",
    prompt: "What distinguishes generative research from evaluative research?",
    options: [
      "Generative research uses larger samples",
      "Generative research explores what problem to solve; evaluative research tests whether a solution works",
      "Evaluative research happens before design",
      "They are two names for usability testing"
    ],
    correctIndex: 1
  },
  {
    id: "uxres-a",
    skillId: "ux-research",
    difficulty: "advanced",
    prompt: "Why is what people say they do often unreliable compared with what they actually do?",
    options: [
      "Participants generally intend to deceive",
      "Recall is reconstructed and shaped by social desirability, so observed behaviour is stronger evidence",
      "Self-reports are only wrong in surveys",
      "Because interviews are too short"
    ],
    correctIndex: 1
  },

  // ux-visual-design
  {
    id: "uxvis-b",
    skillId: "ux-visual-design",
    difficulty: "beginner",
    prompt: "What creates visual hierarchy on a page?",
    options: [
      "Using as many colours as possible",
      "Contrast in size, weight, colour, and spacing that signals what to read first",
      "Centring every element",
      "Applying the same style to all text"
    ],
    correctIndex: 1
  },
  {
    id: "uxvis-i",
    skillId: "ux-visual-design",
    difficulty: "intermediate",
    prompt: "Why does whitespace improve comprehension rather than waste room?",
    options: [
      "It reduces file size",
      "Proximity groups related items, so space defines structure and lowers the effort of scanning",
      "Screens render faster with fewer pixels used",
      "It is only an aesthetic preference"
    ],
    correctIndex: 1
  },
  {
    id: "uxvis-a",
    skillId: "ux-visual-design",
    difficulty: "advanced",
    prompt: "Why is colour alone insufficient to communicate a state such as an error?",
    options: [
      "Colours render differently on every screen",
      "Viewers with colour vision deficiency, or in poor lighting, receive no signal without text or an icon",
      "Colour is always slower to perceive than text",
      "Because CSS colour support is inconsistent"
    ],
    correctIndex: 1
  },

  // ux-information-architecture
  {
    id: "uxia-b",
    skillId: "ux-information-architecture",
    difficulty: "beginner",
    prompt: "What is card sorting used for?",
    options: [
      "Choosing a colour palette",
      "Learning how users would group and name content, to inform navigation structure",
      "Measuring page load speed",
      "Prioritising the development backlog"
    ],
    correctIndex: 1
  },
  {
    id: "uxia-i",
    skillId: "ux-information-architecture",
    difficulty: "intermediate",
    prompt: "What does tree testing evaluate?",
    options: [
      "Whether the visual design is appealing",
      "Whether people can find things in the structure, tested without any interface styling",
      "How fast the site renders",
      "The quality of the written copy"
    ],
    correctIndex: 1
  },
  {
    id: "uxia-a",
    skillId: "ux-information-architecture",
    difficulty: "advanced",
    prompt: "Why is organising navigation around a company's internal team structure usually a mistake?",
    options: [
      "It is harder to build",
      "Users do not know the org chart; they look for their task, not your department",
      "Internal structures change too slowly",
      "Search engines penalise it"
    ],
    correctIndex: 1
  },

  // ux-personas
  {
    id: "uxpers-b",
    skillId: "ux-personas",
    difficulty: "beginner",
    prompt: "What should a persona be built from?",
    options: [
      "The team's assumptions about a typical user",
      "Patterns identified across actual research participants",
      "The marketing department's target demographic",
      "A competitor's published customer list"
    ],
    correctIndex: 1
  },
  {
    id: "uxpers-i",
    skillId: "ux-personas",
    difficulty: "intermediate",
    prompt: "What does a journey map add that a persona alone does not?",
    options: [
      "Demographic detail",
      "The sequence of steps, emotions, and pain points over time, exposing where the experience breaks",
      "A visual style guide",
      "A prioritised backlog"
    ],
    correctIndex: 1
  },
  {
    id: "uxpers-a",
    skillId: "ux-personas",
    difficulty: "advanced",
    prompt: "Why can personas full of biographical colour actively harm decision-making?",
    options: [
      "They take too long to design",
      "Irrelevant detail invites the team to empathise with a fiction instead of acting on the behaviour that was observed",
      "Personas must never include names",
      "Because stakeholders never read them"
    ],
    correctIndex: 1
  },

  // ux-wireframing
  {
    id: "uxwire-b",
    skillId: "ux-wireframing",
    difficulty: "beginner",
    prompt: "Why are wireframes usually greyscale and unstyled?",
    options: [
      "Colour printing is expensive",
      "To keep review focused on structure and priority rather than aesthetics",
      "Because tools cannot add colour at that stage",
      "It is a legal requirement for design documents"
    ],
    correctIndex: 1
  },
  {
    id: "uxwire-i",
    skillId: "ux-wireframing",
    difficulty: "intermediate",
    prompt: "What does a wireflow show that a set of wireframes does not?",
    options: [
      "The final visual design",
      "How screens connect — which action leads to which state",
      "The development estimate",
      "The accessibility score"
    ],
    correctIndex: 1
  },
  {
    id: "uxwire-a",
    skillId: "ux-wireframing",
    difficulty: "advanced",
    prompt: "Why should empty, loading, and error states be wireframed rather than left until build?",
    options: [
      "They are the easiest screens to draw",
      "They are where users most often get stuck, and deferring them pushes the decision onto whoever is coding at the time",
      "Designers are contractually required to include them",
      "Because the happy path rarely matters"
    ],
    correctIndex: 1
  },

  // ux-prototyping
  {
    id: "uxproto-b",
    skillId: "ux-prototyping",
    difficulty: "beginner",
    prompt: "What is the main purpose of a prototype?",
    options: [
      "To serve as the production code",
      "To make an idea testable before it is expensive to change",
      "To document the final design for handoff only",
      "To replace user research"
    ],
    correctIndex: 1
  },
  {
    id: "uxproto-i",
    skillId: "ux-prototyping",
    difficulty: "intermediate",
    prompt: "When is a paper or low-fidelity prototype the better choice?",
    options: [
      "When testing colour and typography decisions",
      "When the open question is flow and structure, where rough fidelity invites franker criticism",
      "When presenting to executives",
      "Low fidelity is never appropriate"
    ],
    correctIndex: 1
  },
  {
    id: "uxproto-a",
    skillId: "ux-prototyping",
    difficulty: "advanced",
    prompt: "What is the risk of showing a highly polished prototype in early testing?",
    options: [
      "It takes longer to load",
      "Participants read it as finished and withhold structural criticism, commenting on surface details instead",
      "It cannot be clicked through",
      "Polished prototypes cannot be changed later"
    ],
    correctIndex: 1
  },

  // ux-interaction-design
  {
    id: "uxint-b",
    skillId: "ux-interaction-design",
    difficulty: "beginner",
    prompt: "What is an affordance in interface design?",
    options: [
      "The cost of building a feature",
      "A visual or physical cue suggesting how an element can be used",
      "The loading time of a screen",
      "The number of steps in a flow"
    ],
    correctIndex: 1
  },
  {
    id: "uxint-i",
    skillId: "ux-interaction-design",
    difficulty: "intermediate",
    prompt: "According to Fitts's law, what makes a target faster to hit?",
    options: [
      "A brighter colour",
      "Being larger and closer to the pointer's current position",
      "Having a shorter label",
      "Being positioned in the centre of the screen"
    ],
    correctIndex: 1
  },
  {
    id: "uxint-a",
    skillId: "ux-interaction-design",
    difficulty: "advanced",
    prompt: "Why is an undo option usually better than a confirmation dialog?",
    options: [
      "Dialogs are harder to implement",
      "Confirmations get dismissed reflexively, while undo lets the common case stay fast and still recovers the mistake",
      "Undo requires no engineering work",
      "Confirmation dialogs are inaccessible by definition"
    ],
    correctIndex: 1
  },

  // ux-design-systems
  {
    id: "uxds-b",
    skillId: "ux-design-systems",
    difficulty: "beginner",
    prompt: "What is a design token?",
    options: [
      "A licence key for a design tool",
      "A named value — such as a colour or spacing step — shared across design and code",
      "A user permission level",
      "A component's file name"
    ],
    correctIndex: 1
  },
  {
    id: "uxds-i",
    skillId: "ux-design-systems",
    difficulty: "intermediate",
    prompt: "What does a design system provide beyond a component library?",
    options: [
      "Nothing; the terms are interchangeable",
      "Documented principles, usage guidance, and governance for when and why to use each component",
      "Automatic accessibility compliance",
      "A faster build pipeline"
    ],
    correctIndex: 1
  },
  {
    id: "uxds-a",
    skillId: "ux-design-systems",
    difficulty: "advanced",
    prompt: "A team keeps building one-off variants instead of using the system. What does that usually signal?",
    options: [
      "The team is undisciplined and needs stricter rules",
      "The system does not cover their real cases, or contributing back is harder than working around it",
      "Design systems never work in practice",
      "The components are too well documented"
    ],
    correctIndex: 1
  },

  // ux-inclusive-design
  {
    id: "uxinc-b",
    skillId: "ux-inclusive-design",
    difficulty: "beginner",
    prompt: "What is the minimum WCAG AA contrast ratio for normal body text?",
    options: ["2:1", "3:1", "4.5:1", "10:1"],
    correctIndex: 2
  },
  {
    id: "uxinc-i",
    skillId: "ux-inclusive-design",
    difficulty: "intermediate",
    prompt: "Why does a visible focus indicator matter?",
    options: [
      "It makes the design look more modern",
      "Keyboard and switch users cannot tell where they are without it",
      "It improves search ranking",
      "It is only needed on mobile"
    ],
    correctIndex: 1
  },
  {
    id: "uxinc-a",
    skillId: "ux-inclusive-design",
    difficulty: "advanced",
    prompt: "What is the curb-cut effect in inclusive design?",
    options: [
      "Accessibility features slow down other users",
      "Designs made for a specific disability routinely end up benefiting everyone",
      "Accessibility must be cut from tight budgets",
      "Only physical products can be inclusive"
    ],
    correctIndex: 1
  },

  // ux-usability-testing
  {
    id: "uxtest-b",
    skillId: "ux-usability-testing",
    difficulty: "beginner",
    prompt: "What should a facilitator do when a participant gets stuck?",
    options: [
      "Immediately show them the correct path",
      "Pause and ask what they expected to happen, since the struggle is the finding",
      "End the session",
      "Tell them they are using it wrong"
    ],
    correctIndex: 1
  },
  {
    id: "uxtest-i",
    skillId: "ux-usability-testing",
    difficulty: "intermediate",
    prompt: "Why does testing with about five users per round find most usability problems?",
    options: [
      "Five is the statistical minimum for significance",
      "The same major issues recur quickly, so additional participants add mostly repetition",
      "Because most products have exactly five user types",
      "Larger rounds are prohibited by research ethics"
    ],
    correctIndex: 1
  },
  {
    id: "uxtest-a",
    skillId: "ux-usability-testing",
    difficulty: "advanced",
    prompt: "Why is 'Click the blue Submit button to finish' a poorly written task?",
    options: [
      "It is too long",
      "It gives away the answer, testing whether they can follow instructions rather than whether they could find it",
      "Tasks must never mention buttons",
      "It cannot be timed accurately"
    ],
    correctIndex: 1
  }
];
