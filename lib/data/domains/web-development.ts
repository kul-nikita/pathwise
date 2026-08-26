import { defineDomain, resource } from "@/lib/data/catalog-helpers";

const V = "2026-08-26";

/** Every URL below returned HTTP 200 on 2026-08-26. */
export const webDevelopment = defineDomain({
  domain: {
    id: "web-development",
    name: "Web Development",
    description: "Build, test, and ship the interfaces and services behind web applications."
  },

  roles: [
    {
      id: "frontend-engineer",
      title: "Frontend Engineer",
      description: "Build accessible, responsive interfaces that hold up on real devices and networks.",
      requiredSkills: [
        { skillId: "web-html-css", importance: 1 },
        { skillId: "web-javascript", importance: 1 },
        { skillId: "web-dom", importance: 0.9 },
        { skillId: "web-responsive-design", importance: 0.8 },
        { skillId: "web-react", importance: 0.9 },
        { skillId: "web-accessibility", importance: 0.8 },
        { skillId: "web-version-control", importance: 0.7 },
        { skillId: "web-testing", importance: 0.6 }
      ]
    },
    {
      id: "backend-engineer",
      title: "Backend Engineer",
      description: "Design and run the APIs and data layer that everything else depends on.",
      requiredSkills: [
        { skillId: "web-javascript", importance: 0.8 },
        { skillId: "web-http-apis", importance: 1 },
        { skillId: "web-node-backend", importance: 1 },
        { skillId: "web-databases", importance: 1 },
        { skillId: "web-testing", importance: 0.7 },
        { skillId: "web-version-control", importance: 0.8 }
      ]
    }
  ],

  skills: [
    {
      id: "web-html-css",
      name: "HTML & CSS",
      category: "foundations",
      description: "Document structure, the box model, layout with flexbox and grid, and the cascade.",
      prerequisites: []
    },
    {
      id: "web-javascript",
      name: "JavaScript Fundamentals",
      category: "foundations",
      description: "Types, functions, closures, asynchrony, and modules.",
      prerequisites: []
    },
    {
      id: "web-version-control",
      name: "Git & Version Control",
      category: "foundations",
      description: "Commits, branches, merges, rebases, and collaborating through pull requests.",
      prerequisites: []
    },
    {
      id: "web-dom",
      name: "DOM & Browser APIs",
      category: "frontend",
      description: "Query and update the document, handle events, and use fetch and storage.",
      prerequisites: ["web-javascript"]
    },
    {
      id: "web-responsive-design",
      name: "Responsive Design",
      category: "frontend",
      description: "Fluid layout, media queries, and interfaces that survive any viewport.",
      prerequisites: ["web-html-css"]
    },
    {
      id: "web-accessibility",
      name: "Web Accessibility",
      category: "frontend",
      description: "Semantics, keyboard operability, contrast, and assistive-technology support.",
      prerequisites: ["web-html-css"]
    },
    {
      id: "web-react",
      name: "React",
      category: "frontend",
      description: "Components, props and state, effects, and composing an application from them.",
      prerequisites: ["web-dom"]
    },
    {
      id: "web-http-apis",
      name: "HTTP & REST APIs",
      category: "backend",
      description: "Methods, status codes, headers, caching, and designing a resource-shaped API.",
      prerequisites: ["web-javascript"]
    },
    {
      id: "web-node-backend",
      name: "Node.js Services",
      category: "backend",
      description: "Build a server, route requests, handle errors, and manage configuration.",
      prerequisites: ["web-http-apis"]
    },
    {
      id: "web-databases",
      name: "Databases for Web Apps",
      category: "backend",
      description: "Schema design, queries, migrations, and talking to a database from a service.",
      prerequisites: ["web-node-backend"]
    },
    {
      id: "web-testing",
      name: "Web Testing",
      category: "quality",
      description: "Unit and integration tests that assert behaviour rather than implementation.",
      prerequisites: ["web-javascript"]
    }
  ],

  resources: [
    resource({
      id: "mdn-structuring-content",
      title: "Structuring Content with HTML",
      provider: "MDN Web Docs",
      url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content",
      resourceType: "course",
      skillTags: ["web-html-css"],
      difficulty: "beginner",
      durationMinutes: 480,
      qualityScore: 0.92,
      evidenceType: "html-page",
      lastVerifiedAt: V,
      description: "Semantic elements, document structure, forms, and media, from the reference source."
    }),
    resource({
      id: "mdn-css-styling-basics",
      title: "CSS Styling Basics",
      provider: "MDN Web Docs",
      url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics",
      resourceType: "course",
      skillTags: ["web-html-css"],
      difficulty: "beginner",
      durationMinutes: 420,
      qualityScore: 0.91,
      evidenceType: "styled-layout",
      lastVerifiedAt: V,
      description: "Selectors, the cascade, the box model, and building layouts that behave."
    }),
    resource({
      id: "web-dev-learn-html",
      title: "Learn HTML",
      provider: "web.dev",
      url: "https://web.dev/learn/html",
      resourceType: "course",
      skillTags: ["web-html-css"],
      difficulty: "beginner",
      durationMinutes: 300,
      qualityScore: 0.86,
      evidenceType: "html-page",
      lastVerifiedAt: V,
      description: "A structured HTML course covering semantics, forms, and document metadata."
    }),
    resource({
      id: "web-dev-learn-css",
      title: "Learn CSS",
      provider: "web.dev",
      url: "https://web.dev/learn/css",
      resourceType: "course",
      skillTags: ["web-html-css"],
      difficulty: "intermediate",
      durationMinutes: 360,
      qualityScore: 0.88,
      evidenceType: "styled-layout",
      lastVerifiedAt: V,
      description: "Layout, specificity, colour, and the parts of CSS that surprise people later."
    }),
    resource({
      id: "mdn-dynamic-scripting",
      title: "Dynamic Scripting with JavaScript",
      provider: "MDN Web Docs",
      url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting",
      resourceType: "course",
      skillTags: ["web-javascript", "web-dom"],
      difficulty: "beginner",
      durationMinutes: 600,
      qualityScore: 0.9,
      evidenceType: "javascript-app",
      lastVerifiedAt: V,
      description: "JavaScript from first principles through events, fetch, and manipulating the page."
    }),
    resource({
      id: "javascript-info",
      title: "The Modern JavaScript Tutorial",
      provider: "javascript.info",
      url: "https://javascript.info/",
      resourceType: "doc",
      skillTags: ["web-javascript", "web-dom"],
      difficulty: "intermediate",
      durationMinutes: 1200,
      qualityScore: 0.93,
      evidenceType: "javascript-app",
      lastVerifiedAt: V,
      description: "The language in depth, then a full part on the browser, the document, and events."
    }),
    resource({
      id: "fcc-javascript-algorithms",
      title: "JavaScript Algorithms and Data Structures",
      provider: "freeCodeCamp",
      url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
      resourceType: "course",
      skillTags: ["web-javascript"],
      difficulty: "intermediate",
      durationMinutes: 1200,
      qualityScore: 0.85,
      evidenceType: "javascript-app",
      lastVerifiedAt: V,
      description: "Language fundamentals through to five certification projects you build yourself."
    }),
    resource({
      id: "mdn-dom-reference",
      title: "Document Object Model",
      provider: "MDN Web Docs",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model",
      resourceType: "doc",
      skillTags: ["web-dom"],
      difficulty: "intermediate",
      durationMinutes: 240,
      qualityScore: 0.89,
      prerequisites: ["web-javascript"],
      evidenceType: "javascript-app",
      lastVerifiedAt: V,
      description: "How the document is modelled as objects, and the APIs for reading and changing it."
    }),
    resource({
      id: "fcc-responsive-web-design",
      title: "Responsive Web Design",
      provider: "freeCodeCamp",
      url: "https://www.freecodecamp.org/learn/responsive-web-design/",
      resourceType: "course",
      skillTags: ["web-responsive-design", "web-html-css"],
      difficulty: "beginner",
      durationMinutes: 900,
      qualityScore: 0.87,
      evidenceType: "responsive-layout",
      lastVerifiedAt: V,
      description: "Flexbox, grid, and media queries, practised across several build-it-yourself projects."
    }),
    resource({
      id: "web-dev-learn-design",
      title: "Learn Responsive Design",
      provider: "web.dev",
      url: "https://web.dev/learn/design",
      resourceType: "course",
      skillTags: ["web-responsive-design"],
      difficulty: "intermediate",
      durationMinutes: 240,
      qualityScore: 0.86,
      evidenceType: "responsive-layout",
      lastVerifiedAt: V,
      description: "Macro and micro layout, responsive typography, and designing for unknown viewports."
    }),
    resource({
      id: "react-learn",
      title: "Learn React",
      provider: "React",
      url: "https://react.dev/learn",
      resourceType: "course",
      skillTags: ["web-react"],
      difficulty: "intermediate",
      durationMinutes: 600,
      qualityScore: 0.93,
      prerequisites: ["web-javascript"],
      evidenceType: "react-app",
      lastVerifiedAt: V,
      description: "The official guide: components, state, effects, and thinking in React."
    }),
    resource({
      id: "react-reference",
      title: "React Reference",
      provider: "React",
      url: "https://react.dev/reference/react",
      resourceType: "doc",
      skillTags: ["web-react"],
      difficulty: "advanced",
      durationMinutes: 300,
      qualityScore: 0.88,
      prerequisites: ["web-javascript"],
      evidenceType: "react-app",
      lastVerifiedAt: V,
      description: "Hook and component APIs in detail, including the rules that make them work."
    }),
    resource({
      id: "pro-git-book",
      title: "Pro Git",
      provider: "git-scm.com",
      url: "https://git-scm.com/book/en/v2",
      resourceType: "doc",
      skillTags: ["web-version-control"],
      difficulty: "intermediate",
      durationMinutes: 600,
      qualityScore: 0.91,
      evidenceType: "git-history",
      lastVerifiedAt: V,
      description: "The complete Git book: the object model, branching, rebasing, and remotes."
    }),
    resource({
      id: "github-start-your-journey",
      title: "Start Your Journey with GitHub",
      provider: "GitHub Docs",
      url: "https://docs.github.com/en/get-started/start-your-journey",
      resourceType: "doc",
      skillTags: ["web-version-control"],
      difficulty: "beginner",
      durationMinutes: 120,
      qualityScore: 0.82,
      evidenceType: "git-history",
      lastVerifiedAt: V,
      description: "Repositories, commits, branches, and pull-request collaboration end to end."
    }),
    resource({
      id: "mdn-http",
      title: "HTTP",
      provider: "MDN Web Docs",
      url: "https://developer.mozilla.org/en-US/docs/Web/HTTP",
      resourceType: "doc",
      skillTags: ["web-http-apis"],
      difficulty: "intermediate",
      durationMinutes: 300,
      qualityScore: 0.9,
      prerequisites: ["web-javascript"],
      evidenceType: "api-spec",
      lastVerifiedAt: V,
      description: "Methods, status codes, headers, caching, CORS, and authentication schemes."
    }),
    resource({
      id: "restfulapi-net",
      title: "REST API Tutorial",
      provider: "restfulapi.net",
      url: "https://restfulapi.net/",
      resourceType: "doc",
      skillTags: ["web-http-apis"],
      difficulty: "intermediate",
      durationMinutes: 180,
      qualityScore: 0.78,
      prerequisites: ["web-javascript"],
      evidenceType: "api-spec",
      lastVerifiedAt: V,
      description: "Resource modelling, URI design, statelessness, and what REST actually requires."
    }),
    resource({
      id: "nodejs-introduction",
      title: "Introduction to Node.js",
      provider: "Node.js",
      url: "https://nodejs.org/en/learn/getting-started/introduction-to-nodejs",
      resourceType: "doc",
      skillTags: ["web-node-backend"],
      difficulty: "intermediate",
      durationMinutes: 300,
      qualityScore: 0.87,
      prerequisites: ["web-http-apis"],
      evidenceType: "api-service",
      lastVerifiedAt: V,
      description: "The runtime, modules, the event loop, and serving HTTP from JavaScript."
    }),
    resource({
      id: "express-getting-started",
      title: "Express Getting Started",
      provider: "Express",
      url: "https://expressjs.com/en/starter/installing.html",
      resourceType: "doc",
      skillTags: ["web-node-backend"],
      difficulty: "intermediate",
      durationMinutes: 150,
      qualityScore: 0.8,
      prerequisites: ["web-http-apis"],
      evidenceType: "api-service",
      lastVerifiedAt: V,
      description: "Routing, middleware, and error handling in the most widely used Node framework."
    }),
    resource({
      id: "prisma-getting-started",
      title: "Prisma Getting Started",
      provider: "Prisma",
      url: "https://www.prisma.io/docs/getting-started",
      resourceType: "doc",
      skillTags: ["web-databases"],
      difficulty: "intermediate",
      durationMinutes: 180,
      qualityScore: 0.84,
      prerequisites: ["web-node-backend"],
      evidenceType: "schema-migration",
      lastVerifiedAt: V,
      description: "Model a schema, run migrations, and query a relational database from a service."
    }),
    resource({
      id: "sqlite-language-reference",
      title: "SQLite SQL Language Reference",
      provider: "SQLite",
      url: "https://sqlite.org/lang.html",
      resourceType: "doc",
      skillTags: ["web-databases"],
      difficulty: "intermediate",
      durationMinutes: 210,
      qualityScore: 0.82,
      prerequisites: ["web-node-backend"],
      evidenceType: "schema-migration",
      lastVerifiedAt: V,
      description: "The full SQL surface of an embedded database you can ship with an application."
    }),
    resource({
      id: "testing-library-docs",
      title: "Testing Library Documentation",
      provider: "Testing Library",
      url: "https://testing-library.com/docs/",
      resourceType: "doc",
      skillTags: ["web-testing"],
      difficulty: "intermediate",
      durationMinutes: 180,
      qualityScore: 0.87,
      prerequisites: ["web-javascript"],
      evidenceType: "test-suite",
      lastVerifiedAt: V,
      description: "Query and assert the way a user would, so tests survive a refactor."
    }),
    resource({
      id: "vitest-guide",
      title: "Vitest Guide",
      provider: "Vitest",
      url: "https://vitest.dev/guide/",
      resourceType: "doc",
      skillTags: ["web-testing"],
      difficulty: "intermediate",
      durationMinutes: 150,
      qualityScore: 0.83,
      prerequisites: ["web-javascript"],
      evidenceType: "test-suite",
      lastVerifiedAt: V,
      description: "Writing, running, mocking, and measuring coverage for a JavaScript test suite."
    }),
    resource({
      id: "webaim-intro",
      title: "Introduction to Web Accessibility",
      provider: "WebAIM",
      url: "https://webaim.org/intro/",
      resourceType: "doc",
      skillTags: ["web-accessibility"],
      difficulty: "beginner",
      durationMinutes: 90,
      qualityScore: 0.88,
      prerequisites: ["web-html-css"],
      evidenceType: "accessibility-audit",
      lastVerifiedAt: V,
      description: "Who is affected, what the barriers are, and what a developer actually changes."
    }),
    resource({
      id: "w3c-wai-fundamentals",
      title: "Accessibility Fundamentals",
      provider: "W3C WAI",
      url: "https://www.w3.org/WAI/fundamentals/accessibility-intro/",
      resourceType: "doc",
      skillTags: ["web-accessibility"],
      difficulty: "beginner",
      durationMinutes: 120,
      qualityScore: 0.89,
      prerequisites: ["web-html-css"],
      evidenceType: "accessibility-audit",
      lastVerifiedAt: V,
      description: "The standards body's own introduction to accessibility principles and guidelines."
    }),
    resource({
      id: "web-dev-learn-accessibility",
      title: "Learn Accessibility",
      provider: "web.dev",
      url: "https://web.dev/learn/accessibility",
      resourceType: "course",
      skillTags: ["web-accessibility"],
      difficulty: "intermediate",
      durationMinutes: 240,
      qualityScore: 0.86,
      prerequisites: ["web-html-css"],
      evidenceType: "accessibility-audit",
      lastVerifiedAt: V,
      description: "Focus management, ARIA, colour and contrast, and testing with a screen reader."
    })
  ]
});
