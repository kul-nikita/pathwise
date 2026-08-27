import type { DiagnosticQuestion } from "@/lib/diagnostic/types";

export const mobileDevelopmentQuestions: DiagnosticQuestion[] = [
  // mobile-kotlin
  {
    id: "mobkot-b",
    skillId: "mobile-kotlin",
    difficulty: "beginner",
    prompt: "In Kotlin, what does the type `String?` mean?",
    options: [
      "A string that must be non-empty",
      "A string that may also hold null",
      "A mutable string",
      "A string of unknown encoding"
    ],
    correctIndex: 1
  },
  {
    id: "mobkot-i",
    skillId: "mobile-kotlin",
    difficulty: "intermediate",
    prompt: "What is the difference between `val` and `var`?",
    options: [
      "`val` is for numbers, `var` for objects",
      "`val` binds a reference that cannot be reassigned; `var` can be reassigned",
      "`val` is nullable, `var` is not",
      "They are interchangeable"
    ],
    correctIndex: 1
  },
  {
    id: "mobkot-a",
    skillId: "mobile-kotlin",
    difficulty: "advanced",
    prompt: "What does structured concurrency give you with coroutines?",
    options: [
      "Faster execution on every device",
      "Child coroutines are scoped to a parent, so cancellation and failure propagate instead of leaking work",
      "Automatic retry of failed network calls",
      "Guaranteed execution on the main thread"
    ],
    correctIndex: 1
  },

  // mobile-swift
  {
    id: "mobswift-b",
    skillId: "mobile-swift",
    difficulty: "beginner",
    prompt: "What is an optional in Swift?",
    options: [
      "A parameter with a default value",
      "A type that either holds a value or is nil, forcing the absence to be handled",
      "A property that can be omitted from a struct",
      "A compiler optimisation flag"
    ],
    correctIndex: 1
  },
  {
    id: "mobswift-i",
    skillId: "mobile-swift",
    difficulty: "intermediate",
    prompt: "What is the key difference between a struct and a class in Swift?",
    options: [
      "Structs cannot have methods",
      "Structs are value types copied on assignment; classes are reference types sharing one instance",
      "Classes cannot conform to protocols",
      "Structs are always faster"
    ],
    correctIndex: 1
  },
  {
    id: "mobswift-a",
    skillId: "mobile-swift",
    difficulty: "advanced",
    prompt: "Why can two objects holding strong references to each other leak memory?",
    options: [
      "Swift does not free memory at all",
      "ARC never drops either retain count to zero — a reference cycle needing weak or unowned to break it",
      "Because structs are involved",
      "The garbage collector runs too infrequently"
    ],
    correctIndex: 1
  },

  // mobile-networking
  {
    id: "mobnet-b",
    skillId: "mobile-networking",
    difficulty: "beginner",
    prompt: "Why must network calls not run on the main thread of a mobile app?",
    options: [
      "The main thread has no network permission",
      "It blocks the UI, freezing the interface until the request finishes",
      "Network libraries are not thread-safe",
      "It doubles data usage"
    ],
    correctIndex: 1
  },
  {
    id: "mobnet-i",
    skillId: "mobile-networking",
    difficulty: "intermediate",
    prompt: "How should an app handle a request that fails on a flaky connection?",
    options: [
      "Retry immediately in a tight loop",
      "Retry a bounded number of times with backoff, and surface a clear state if it still fails",
      "Crash so the user restarts the app",
      "Silently ignore the failure"
    ],
    correctIndex: 1
  },
  {
    id: "mobnet-a",
    skillId: "mobile-networking",
    difficulty: "advanced",
    prompt: "Why is certificate pinning used in some mobile apps?",
    options: [
      "To speed up the TLS handshake",
      "To reject connections whose certificate is not the expected one, resisting interception via an installed root",
      "To allow HTTP instead of HTTPS",
      "To cache responses longer"
    ],
    correctIndex: 1
  },

  // mobile-testing
  {
    id: "mobtest-b",
    skillId: "mobile-testing",
    difficulty: "beginner",
    prompt: "What is the difference between a unit test and a UI test on mobile?",
    options: [
      "Unit tests require a physical device",
      "A unit test exercises logic in isolation; a UI test drives the app through the interface",
      "UI tests run faster",
      "They test the same things"
    ],
    correctIndex: 1
  },
  {
    id: "mobtest-i",
    skillId: "mobile-testing",
    difficulty: "intermediate",
    prompt: "Why should business logic be kept out of the view layer?",
    options: [
      "Views cannot contain functions",
      "Logic in a view can only be exercised through slow, brittle UI tests instead of fast unit tests",
      "It increases the app's binary size",
      "Platform guidelines forbid it"
    ],
    correctIndex: 1
  },
  {
    id: "mobtest-a",
    skillId: "mobile-testing",
    difficulty: "advanced",
    prompt: "A UI test passes locally but fails intermittently in CI. What is the most common cause?",
    options: [
      "CI machines have less memory",
      "Timing — the test asserts before an asynchronous update lands, instead of waiting for the expected state",
      "The test file is in the wrong folder",
      "CI cannot run UI tests at all"
    ],
    correctIndex: 1
  },

  // mobile-android-ui
  {
    id: "mobaui-b",
    skillId: "mobile-android-ui",
    difficulty: "beginner",
    prompt: "What is a composable function in Jetpack Compose?",
    options: [
      "A background service",
      "A function annotated @Composable that describes a piece of UI declaratively",
      "A layout XML file",
      "A database query"
    ],
    correctIndex: 1
  },
  {
    id: "mobaui-i",
    skillId: "mobile-android-ui",
    difficulty: "intermediate",
    prompt: "What does state hoisting mean in Compose?",
    options: [
      "Caching state on disk",
      "Moving state up to a caller so the composable becomes stateless and reusable",
      "Storing state in a global singleton",
      "Deferring state creation until first draw"
    ],
    correctIndex: 1
  },
  {
    id: "mobaui-a",
    skillId: "mobile-android-ui",
    difficulty: "advanced",
    prompt: "Why does `remember` need `rememberSaveable` in some cases?",
    options: [
      "`remember` is deprecated",
      "`remember` survives recomposition but not configuration change or process death, which `rememberSaveable` handles",
      "`rememberSaveable` is faster",
      "They are identical in behaviour"
    ],
    correctIndex: 1
  },

  // mobile-android-architecture
  {
    id: "mobaarch-b",
    skillId: "mobile-android-architecture",
    difficulty: "beginner",
    prompt: "What is a ViewModel responsible for?",
    options: [
      "Drawing the user interface",
      "Holding and exposing screen state, surviving configuration changes such as rotation",
      "Managing the app's manifest",
      "Compiling the layout files"
    ],
    correctIndex: 1
  },
  {
    id: "mobaarch-i",
    skillId: "mobile-android-architecture",
    difficulty: "intermediate",
    prompt: "What does unidirectional data flow mean?",
    options: [
      "Data can only be read, never written",
      "State flows down to the UI and events flow up, so there is one source of truth",
      "The app only makes GET requests",
      "Navigation cannot go backwards"
    ],
    correctIndex: 1
  },
  {
    id: "mobaarch-a",
    skillId: "mobile-android-architecture",
    difficulty: "advanced",
    prompt: "Why is holding a reference to an Activity inside a ViewModel a bug?",
    options: [
      "ViewModels cannot hold references",
      "The ViewModel outlives the Activity, so the reference leaks the destroyed instance and its whole view tree",
      "It makes the app slower to start",
      "Activities are final classes"
    ],
    correctIndex: 1
  },

  // mobile-swiftui
  {
    id: "mobsui-b",
    skillId: "mobile-swiftui",
    difficulty: "beginner",
    prompt: "What does the @State property wrapper do in SwiftUI?",
    options: [
      "Persists a value to disk",
      "Declares view-local mutable state that triggers a re-render when it changes",
      "Marks a value as constant",
      "Shares a value across the whole app"
    ],
    correctIndex: 1
  },
  {
    id: "mobsui-i",
    skillId: "mobile-swiftui",
    difficulty: "intermediate",
    prompt: "When would you use @Binding instead of @State?",
    options: [
      "When the value never changes",
      "When a child view needs read-write access to state owned by its parent",
      "When storing to UserDefaults",
      "When the view has no body"
    ],
    correctIndex: 1
  },
  {
    id: "mobsui-a",
    skillId: "mobile-swiftui",
    difficulty: "advanced",
    prompt: "Why does SwiftUI need identity — such as `id` in a ForEach — to animate a list correctly?",
    options: [
      "To sort the rows",
      "Without stable identity it cannot tell insertion from mutation, so state and animations attach to the wrong row",
      "Identity is only needed for accessibility",
      "It reduces memory use"
    ],
    correctIndex: 1
  },

  // mobile-ios-architecture
  {
    id: "mobiarch-b",
    skillId: "mobile-ios-architecture",
    difficulty: "beginner",
    prompt: "Why separate networking code from a SwiftUI view?",
    options: [
      "Views cannot make network calls at all",
      "So the logic can be tested and reused independently of how it is displayed",
      "To reduce the app's download size",
      "Because Apple rejects apps that do not"
    ],
    correctIndex: 1
  },
  {
    id: "mobiarch-i",
    skillId: "mobile-ios-architecture",
    difficulty: "intermediate",
    prompt: "What is the benefit of injecting a dependency rather than constructing it inside a type?",
    options: [
      "It runs faster",
      "The dependency can be swapped for a test double, making the type testable in isolation",
      "It removes the need for protocols",
      "It reduces compile time"
    ],
    correctIndex: 1
  },
  {
    id: "mobiarch-a",
    skillId: "mobile-ios-architecture",
    difficulty: "advanced",
    prompt: "What does marking a type @MainActor guarantee?",
    options: [
      "It runs on a background queue",
      "Its members are accessed on the main thread, which UI state mutation requires",
      "It becomes thread-unsafe",
      "It disables concurrency checking"
    ],
    correctIndex: 1
  },

  // mobile-local-storage
  {
    id: "mobstore-b",
    skillId: "mobile-local-storage",
    difficulty: "beginner",
    prompt: "Which is the appropriate place for a small user preference such as a theme choice?",
    options: [
      "A full relational database",
      "A key-value preferences store",
      "The app's binary",
      "A remote server only"
    ],
    correctIndex: 1
  },
  {
    id: "mobstore-i",
    skillId: "mobile-local-storage",
    difficulty: "intermediate",
    prompt: "Why should an auth token not be stored in plain preferences?",
    options: [
      "Preferences have a size limit",
      "It is not encrypted at rest — a keychain or keystore is the appropriate place for secrets",
      "Preferences are wiped on every launch",
      "Tokens cannot be stored as strings"
    ],
    correctIndex: 1
  },
  {
    id: "mobstore-a",
    skillId: "mobile-local-storage",
    difficulty: "advanced",
    prompt: "Why does shipping an app update that changes the local database schema require a migration?",
    options: [
      "Stores require it for review",
      "Existing installs still hold the old schema, and opening it with new expectations fails or loses data",
      "Schemas cannot change after release",
      "Migrations only matter on servers"
    ],
    correctIndex: 1
  },

  // mobile-release
  {
    id: "mobrel-b",
    skillId: "mobile-release",
    difficulty: "beginner",
    prompt: "Why must a release build be signed?",
    options: [
      "To compress the binary",
      "So the platform can verify the publisher's identity and that the package was not altered",
      "To enable dark mode",
      "To allow network access"
    ],
    correctIndex: 1
  },
  {
    id: "mobrel-i",
    skillId: "mobile-release",
    difficulty: "intermediate",
    prompt: "What is the advantage of a staged or phased rollout?",
    options: [
      "It speeds up review",
      "A serious defect reaches only a fraction of users before you halt the rollout",
      "It avoids the need for testing",
      "It reduces the app's size"
    ],
    correctIndex: 1
  },
  {
    id: "mobrel-a",
    skillId: "mobile-release",
    difficulty: "advanced",
    prompt: "Why is a server-side feature flag valuable given mobile release cycles?",
    options: [
      "It removes the need for app updates entirely",
      "Users update on their own schedule, so a flag turns a risky feature off without waiting for review and adoption",
      "Flags make the binary smaller",
      "Stores require flags for new features"
    ],
    correctIndex: 1
  }
];
