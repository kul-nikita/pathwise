import type { DiagnosticQuestion } from "@/lib/diagnostic/types";

export const webDevelopmentQuestions: DiagnosticQuestion[] = [
  // web-html-css
  {
    id: "webhc-b",
    skillId: "web-html-css",
    difficulty: "beginner",
    prompt: "Which element marks the main navigation region of a page?",
    options: ["<div class=\"nav\">", "<nav>", "<menu>", "<section id=\"nav\">"],
    correctIndex: 1
  },
  {
    id: "webhc-i",
    skillId: "web-html-css",
    difficulty: "intermediate",
    prompt: "Two rules target the same element: `.card p` and `p`. Which wins, and why?",
    options: [
      "`p`, because it is simpler",
      "`.card p`, because a class plus element is more specific than an element alone",
      "Whichever appears last, regardless of selector",
      "Neither; the browser discards both"
    ],
    correctIndex: 1
  },
  {
    id: "webhc-a",
    skillId: "web-html-css",
    difficulty: "advanced",
    prompt: "Why does `margin: 0 auto` centre a block element horizontally but `margin: auto 0` not centre it vertically?",
    options: [
      "Vertical margins are ignored entirely",
      "Auto vertical margins resolve to zero in normal flow, because the block has no defined free height to share",
      "`auto` only works on the left and right properties",
      "Because the element is display: block"
    ],
    correctIndex: 1
  },

  // web-javascript
  {
    id: "webjs-b",
    skillId: "web-javascript",
    difficulty: "beginner",
    prompt: "What does `typeof []` return in JavaScript?",
    options: ["\"array\"", "\"object\"", "\"list\"", "\"undefined\""],
    correctIndex: 1
  },
  {
    id: "webjs-i",
    skillId: "web-javascript",
    difficulty: "intermediate",
    prompt: "What is logged by `console.log(0.1 + 0.2 === 0.3)`?",
    options: ["true", "false", "NaN", "It throws a TypeError"],
    correctIndex: 1
  },
  {
    id: "webjs-a",
    skillId: "web-javascript",
    difficulty: "advanced",
    prompt: "Why does a `for` loop using `var` and `setTimeout` log the final value every time, while `let` logs each value?",
    options: [
      "`var` is slower than `let`",
      "`var` has one function-scoped binding shared by all iterations; `let` creates a fresh binding per iteration",
      "`setTimeout` cannot read `let` variables",
      "`let` runs the callbacks synchronously"
    ],
    correctIndex: 1
  },

  // web-version-control
  {
    id: "webvc-b",
    skillId: "web-version-control",
    difficulty: "beginner",
    prompt: "Which command stages a file for the next commit?",
    options: ["git commit file.txt", "git add file.txt", "git push file.txt", "git stage --all"],
    correctIndex: 1
  },
  {
    id: "webvc-i",
    skillId: "web-version-control",
    difficulty: "intermediate",
    prompt: "What is the practical difference between `git merge` and `git rebase`?",
    options: [
      "Rebase deletes the branch afterwards",
      "Merge preserves history and adds a merge commit; rebase replays commits onto a new base, producing a linear history",
      "They are identical aliases",
      "Merge only works on remote branches"
    ],
    correctIndex: 1
  },
  {
    id: "webvc-a",
    skillId: "web-version-control",
    difficulty: "advanced",
    prompt: "Why is rebasing a branch that others have already pulled considered dangerous?",
    options: [
      "It permanently deletes the remote",
      "Rebase rewrites commit hashes, so collaborators' history diverges from yours and merges get messy",
      "Rebase cannot be undone under any circumstances",
      "It converts the repository to a shallow clone"
    ],
    correctIndex: 1
  },

  // web-dom
  {
    id: "webdom-b",
    skillId: "web-dom",
    difficulty: "beginner",
    prompt: "Which method returns the first element matching a CSS selector?",
    options: ["document.getElement()", "document.querySelector()", "document.findOne()", "document.select()"],
    correctIndex: 1
  },
  {
    id: "webdom-i",
    skillId: "web-dom",
    difficulty: "intermediate",
    prompt: "What does event delegation mean?",
    options: [
      "Copying a handler onto every child element",
      "Attaching one handler to a common ancestor and identifying the target as events bubble up",
      "Delaying an event until the page loads",
      "Passing events between browser tabs"
    ],
    correctIndex: 1
  },
  {
    id: "webdom-a",
    skillId: "web-dom",
    difficulty: "advanced",
    prompt: "Why can reading `offsetHeight` inside a loop that also writes styles cause layout thrashing?",
    options: [
      "Reading a property is a network request",
      "Each read forces the browser to flush pending style writes and recompute layout synchronously",
      "`offsetHeight` is deprecated",
      "The loop runs on a background thread"
    ],
    correctIndex: 1
  },

  // web-responsive-design
  {
    id: "webrd-b",
    skillId: "web-responsive-design",
    difficulty: "beginner",
    prompt: "What does the viewport meta tag do on a mobile browser?",
    options: [
      "Compresses images automatically",
      "Tells the browser to match the layout width to the device width instead of assuming a desktop page",
      "Disables zooming permanently",
      "Sets the page's colour scheme"
    ],
    correctIndex: 1
  },
  {
    id: "webrd-i",
    skillId: "web-responsive-design",
    difficulty: "intermediate",
    prompt: "Why is `min-width` generally preferred over `max-width` for media queries?",
    options: [
      "`max-width` is not supported in modern browsers",
      "It supports mobile-first: the base styles serve small screens and each query adds capability upward",
      "`min-width` queries load faster",
      "`max-width` only works in print stylesheets"
    ],
    correctIndex: 1
  },
  {
    id: "webrd-a",
    skillId: "web-responsive-design",
    difficulty: "advanced",
    prompt: "What problem do container queries solve that media queries cannot?",
    options: [
      "They allow more breakpoints",
      "A component can respond to the width of its own container rather than the whole viewport, so it is reusable in any slot",
      "They eliminate the need for CSS entirely",
      "They apply only to print layouts"
    ],
    correctIndex: 1
  },

  // web-react
  {
    id: "webreact-b",
    skillId: "web-react",
    difficulty: "beginner",
    prompt: "What is the correct way to update state in a function component?",
    options: [
      "Assign directly: `count = count + 1`",
      "Call the setter from useState: `setCount(count + 1)`",
      "Mutate props directly",
      "Re-run the component function manually"
    ],
    correctIndex: 1
  },
  {
    id: "webreact-i",
    skillId: "web-react",
    difficulty: "intermediate",
    prompt: "Why does React need a stable `key` on items in a list?",
    options: [
      "To sort the list alphabetically",
      "So it can match elements across renders and preserve each item's state instead of reusing the wrong one",
      "Keys are only for TypeScript type checking",
      "To prevent the list from being scrollable"
    ],
    correctIndex: 1
  },
  {
    id: "webreact-a",
    skillId: "web-react",
    difficulty: "advanced",
    prompt: "A useEffect that fetches data has an empty dependency array but reads a prop. What is the bug?",
    options: [
      "Effects cannot perform fetches",
      "The effect captures the prop from the first render and never re-runs when it changes, serving stale data",
      "Empty dependency arrays are a syntax error",
      "The component will re-render infinitely"
    ],
    correctIndex: 1
  },

  // web-accessibility
  {
    id: "weba11y-b",
    skillId: "web-accessibility",
    difficulty: "beginner",
    prompt: "What should the alt text of a purely decorative image be?",
    options: [
      "A full description of the image",
      "An empty string, so screen readers skip it",
      "The filename",
      "The word \"decorative\""
    ],
    correctIndex: 1
  },
  {
    id: "weba11y-i",
    skillId: "web-accessibility",
    difficulty: "intermediate",
    prompt: "Why is a <button> preferable to a <div> with a click handler?",
    options: [
      "Buttons are easier to style",
      "A button is focusable, announced by its role, and activates on Enter and Space without extra code",
      "Divs cannot receive click events",
      "Buttons load faster"
    ],
    correctIndex: 1
  },
  {
    id: "weba11y-a",
    skillId: "web-accessibility",
    difficulty: "advanced",
    prompt: "What is the first rule of ARIA?",
    options: [
      "Always add as many ARIA attributes as possible",
      "Do not use ARIA if a native HTML element already provides the semantics you need",
      "ARIA replaces semantic HTML entirely",
      "ARIA attributes must appear on every element"
    ],
    correctIndex: 1
  },

  // web-http-apis
  {
    id: "webhttp-b",
    skillId: "web-http-apis",
    difficulty: "beginner",
    prompt: "Which status code means the resource was not found?",
    options: ["200", "301", "404", "500"],
    correctIndex: 2
  },
  {
    id: "webhttp-i",
    skillId: "web-http-apis",
    difficulty: "intermediate",
    prompt: "Which HTTP method should be idempotent — repeating it leaves the same result?",
    options: ["POST", "PUT", "PATCH in every case", "None of them"],
    correctIndex: 1
  },
  {
    id: "webhttp-a",
    skillId: "web-http-apis",
    difficulty: "advanced",
    prompt: "A browser request to another origin fails with a CORS error even though the server returns 200. Why?",
    options: [
      "The server is down",
      "The response lacks the Access-Control-Allow-Origin header, so the browser blocks the page from reading it",
      "CORS errors always mean a 500 response",
      "The request used HTTPS"
    ],
    correctIndex: 1
  },

  // web-node-backend
  {
    id: "webnode-b",
    skillId: "web-node-backend",
    difficulty: "beginner",
    prompt: "What is middleware in an Express application?",
    options: [
      "A database driver",
      "A function that receives the request and response and can act before passing control onward",
      "A frontend templating language",
      "A deployment target"
    ],
    correctIndex: 1
  },
  {
    id: "webnode-i",
    skillId: "web-node-backend",
    difficulty: "intermediate",
    prompt: "Why should secrets be read from environment variables rather than committed in the source?",
    options: [
      "Environment variables are faster to read",
      "Source control distributes the secret to everyone with repository access, and its history keeps it after deletion",
      "Node cannot read string literals",
      "It reduces the bundle size"
    ],
    correctIndex: 1
  },
  {
    id: "webnode-a",
    skillId: "web-node-backend",
    difficulty: "advanced",
    prompt: "Why does a long synchronous loop in a Node request handler hurt every concurrent user?",
    options: [
      "Node opens one process per request",
      "JavaScript runs on a single event-loop thread, so blocking it delays every other pending callback",
      "It exhausts the database connection pool",
      "Synchronous code is disallowed in Node"
    ],
    correctIndex: 1
  },

  // web-databases
  {
    id: "webdb-b",
    skillId: "web-databases",
    difficulty: "beginner",
    prompt: "What does a primary key guarantee about a table?",
    options: [
      "Rows are stored alphabetically",
      "Each row has a unique, non-null identifier",
      "The table cannot be modified",
      "Every column is indexed"
    ],
    correctIndex: 1
  },
  {
    id: "webdb-i",
    skillId: "web-databases",
    difficulty: "intermediate",
    prompt: "What problem do database migrations solve?",
    options: [
      "They move the database to another cloud provider",
      "They record schema changes as ordered, repeatable steps so every environment converges on the same shape",
      "They compress stored data",
      "They replace the need for backups"
    ],
    correctIndex: 1
  },
  {
    id: "webdb-a",
    skillId: "web-databases",
    difficulty: "advanced",
    prompt: "What is the N+1 query problem?",
    options: [
      "A query that returns one extra row",
      "Fetching a list, then issuing one additional query per item instead of loading the related data in a single join or batch",
      "A deadlock between two transactions",
      "An index that is one column too wide"
    ],
    correctIndex: 1
  },

  // web-testing
  {
    id: "webtest-b",
    skillId: "web-testing",
    difficulty: "beginner",
    prompt: "What is the purpose of a unit test?",
    options: [
      "To check the whole system against production data",
      "To verify one small piece of behaviour in isolation and fail fast when it breaks",
      "To measure page load speed",
      "To replace code review"
    ],
    correctIndex: 1
  },
  {
    id: "webtest-i",
    skillId: "web-testing",
    difficulty: "intermediate",
    prompt: "Why does Testing Library encourage querying by role or label rather than by CSS class?",
    options: [
      "CSS classes are slower to query",
      "Role and label reflect what a user perceives, so tests survive refactors and catch accessibility regressions",
      "Classes cannot be read from JavaScript",
      "It is required by the DOM specification"
    ],
    correctIndex: 1
  },
  {
    id: "webtest-a",
    skillId: "web-testing",
    difficulty: "advanced",
    prompt: "A test passes alone but fails when the suite runs. What is the most likely cause?",
    options: [
      "The assertion library is broken",
      "Shared state leaking between tests — a module, a mock, or a database row not reset",
      "The test file is too long",
      "Tests always fail in parallel"
    ],
    correctIndex: 1
  }
];
