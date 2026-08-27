import { defineDomain, resource } from "@/lib/data/catalog-helpers";

const V = "2026-08-26";

/** Every URL below returned HTTP 200 on 2026-08-26. */
export const mobileDevelopment = defineDomain({
  domain: {
    id: "mobile-development",
    name: "Mobile Development",
    description: "Build native apps for phones — UI, data, offline behaviour, and shipping to a store."
  },

  roles: [
    {
      id: "android-developer",
      title: "Android Developer",
      description: "Build Android apps in Kotlin that behave correctly across the activity lifecycle.",
      requiredSkills: [
        { skillId: "mobile-kotlin", importance: 1 },
        { skillId: "mobile-android-ui", importance: 1 },
        { skillId: "mobile-android-architecture", importance: 0.9 },
        { skillId: "mobile-networking", importance: 0.8 },
        { skillId: "mobile-local-storage", importance: 0.7 },
        { skillId: "mobile-testing", importance: 0.7 },
        { skillId: "mobile-release", importance: 0.6 }
      ]
    },
    {
      id: "ios-developer",
      title: "iOS Developer",
      description: "Build iOS apps in Swift that feel native and hold up to App Store review.",
      requiredSkills: [
        { skillId: "mobile-swift", importance: 1 },
        { skillId: "mobile-swiftui", importance: 1 },
        { skillId: "mobile-ios-architecture", importance: 0.9 },
        { skillId: "mobile-networking", importance: 0.8 },
        { skillId: "mobile-local-storage", importance: 0.7 },
        { skillId: "mobile-testing", importance: 0.7 },
        { skillId: "mobile-release", importance: 0.6 }
      ]
    }
  ],

  skills: [
    {
      id: "mobile-kotlin",
      name: "Kotlin Basics",
      category: "android",
      description: "Types, null safety, classes, collections, and coroutines for asynchronous work.",
      prerequisites: []
    },
    {
      id: "mobile-swift",
      name: "Swift Basics",
      category: "ios",
      description: "Optionals, structs and classes, protocols, and Swift's approach to concurrency.",
      prerequisites: []
    },
    {
      id: "mobile-networking",
      name: "Mobile Networking",
      category: "shared",
      description: "Call an API, parse JSON, and handle timeouts, retries, and a flaky connection.",
      prerequisites: []
    },
    {
      id: "mobile-testing",
      name: "Mobile Testing",
      category: "shared",
      description: "Unit and UI tests, and testing behaviour that depends on the device lifecycle.",
      prerequisites: []
    },
    {
      id: "mobile-android-ui",
      name: "Android UI with Compose",
      category: "android",
      description: "Composable functions, state hoisting, layout, lists, and navigation.",
      prerequisites: ["mobile-kotlin"]
    },
    {
      id: "mobile-android-architecture",
      name: "Android Architecture",
      category: "android",
      description: "ViewModels, unidirectional data flow, dependency injection, and lifecycle awareness.",
      prerequisites: ["mobile-android-ui"]
    },
    {
      id: "mobile-swiftui",
      name: "SwiftUI",
      category: "ios",
      description: "Declarative views, state and bindings, layout, lists, and navigation stacks.",
      prerequisites: ["mobile-swift"]
    },
    {
      id: "mobile-ios-architecture",
      name: "iOS App Architecture",
      category: "ios",
      description: "Observable state, dependency management, and structuring an app beyond one view.",
      prerequisites: ["mobile-swiftui"]
    },
    {
      id: "mobile-local-storage",
      name: "Local Storage",
      category: "shared",
      description: "Persist data on device, migrate a schema, and keep the app usable offline.",
      prerequisites: ["mobile-networking"]
    },
    {
      id: "mobile-release",
      name: "App Store Release",
      category: "shared",
      description: "Signing, versioning, store listings, staged rollout, and review requirements.",
      prerequisites: ["mobile-testing"]
    }
  ],

  resources: [
    resource({
      id: "kotlin-getting-started",
      title: "Get Started with Kotlin",
      provider: "Kotlin",
      url: "https://kotlinlang.org/docs/getting-started.html",
      resourceType: "doc",
      skillTags: ["mobile-kotlin"],
      difficulty: "beginner",
      durationMinutes: 120,
      qualityScore: 0.86,
      evidenceType: "kotlin-app",
      lastVerifiedAt: V,
      description: "Set up the toolchain and write your first Kotlin program, with paths per platform."
    }),
    resource({
      id: "kotlin-basic-syntax",
      title: "Kotlin Basic Syntax",
      provider: "Kotlin",
      url: "https://kotlinlang.org/docs/basic-syntax.html",
      resourceType: "doc",
      skillTags: ["mobile-kotlin"],
      difficulty: "beginner",
      durationMinutes: 150,
      qualityScore: 0.85,
      evidenceType: "kotlin-app",
      lastVerifiedAt: V,
      description: "Functions, variables, classes, conditionals, loops, and null safety in one pass."
    }),
    resource({
      id: "kotlin-coroutines-overview",
      title: "Coroutines",
      provider: "Kotlin",
      url: "https://kotlinlang.org/docs/coroutines-overview.html",
      resourceType: "doc",
      skillTags: ["mobile-kotlin"],
      difficulty: "advanced",
      durationMinutes: 240,
      qualityScore: 0.87,
      evidenceType: "kotlin-app",
      lastVerifiedAt: V,
      description: "Structured concurrency, suspending functions, scopes, and cancellation."
    }),
    resource({
      id: "android-basics-compose-course",
      title: "Android Basics with Compose",
      provider: "Android Developers",
      url: "https://developer.android.com/courses/android-basics-compose/course",
      resourceType: "course",
      skillTags: ["mobile-android-ui", "mobile-kotlin"],
      difficulty: "beginner",
      durationMinutes: 1800,
      qualityScore: 0.92,
      evidenceType: "android-app",
      lastVerifiedAt: V,
      description: "The official beginner course: Kotlin, Compose UI, navigation, data, and testing."
    }),
    resource({
      id: "android-basics-compose-unit-1",
      title: "Android Basics with Compose: Unit 1",
      provider: "Android Developers",
      url: "https://developer.android.com/courses/android-basics-compose/unit-1",
      resourceType: "lab",
      skillTags: ["mobile-android-ui"],
      difficulty: "beginner",
      durationMinutes: 300,
      qualityScore: 0.88,
      prerequisites: ["mobile-kotlin"],
      evidenceType: "android-app",
      lastVerifiedAt: V,
      description: "Build and run a first Compose app, laying out text and images on screen."
    }),
    resource({
      id: "android-compose-documentation",
      title: "Jetpack Compose Documentation",
      provider: "Android Developers",
      url: "https://developer.android.com/develop/ui/compose/documentation",
      resourceType: "doc",
      skillTags: ["mobile-android-ui"],
      difficulty: "intermediate",
      durationMinutes: 420,
      qualityScore: 0.89,
      prerequisites: ["mobile-kotlin"],
      evidenceType: "android-app",
      lastVerifiedAt: V,
      description: "State, side effects, layout, theming, and performance in the Compose toolkit."
    }),
    resource({
      id: "android-architecture-guide",
      title: "Guide to App Architecture",
      provider: "Android Developers",
      url: "https://developer.android.com/topic/architecture",
      resourceType: "doc",
      skillTags: ["mobile-android-architecture"],
      difficulty: "advanced",
      durationMinutes: 300,
      qualityScore: 0.9,
      prerequisites: ["mobile-android-ui"],
      evidenceType: "architecture-doc",
      lastVerifiedAt: V,
      description: "UI, domain, and data layers, unidirectional data flow, and lifecycle-aware state."
    }),
    resource({
      id: "android-dependency-injection",
      title: "Dependency Injection in Android",
      provider: "Android Developers",
      url: "https://developer.android.com/training/dependency-injection",
      resourceType: "doc",
      skillTags: ["mobile-android-architecture"],
      difficulty: "advanced",
      durationMinutes: 180,
      qualityScore: 0.84,
      prerequisites: ["mobile-android-ui"],
      evidenceType: "architecture-doc",
      lastVerifiedAt: V,
      description: "Manual injection through to Hilt, and why testability is the actual motivation."
    }),
    resource({
      id: "swift-guided-tour",
      title: "A Swift Tour",
      provider: "Swift.org",
      url: "https://docs.swift.org/swift-book/documentation/the-swift-programming-language/guidedtour/",
      resourceType: "doc",
      skillTags: ["mobile-swift"],
      difficulty: "beginner",
      durationMinutes: 180,
      qualityScore: 0.89,
      evidenceType: "swift-app",
      lastVerifiedAt: V,
      description: "The whole language in one pass: values, control flow, closures, protocols, generics."
    }),
    resource({
      id: "apple-swift-documentation",
      title: "Swift Documentation",
      provider: "Apple Developer",
      url: "https://developer.apple.com/documentation/swift",
      resourceType: "doc",
      skillTags: ["mobile-swift"],
      difficulty: "intermediate",
      durationMinutes: 300,
      qualityScore: 0.87,
      evidenceType: "swift-app",
      lastVerifiedAt: V,
      description: "The standard library and language reference, including concurrency and collections."
    }),
    resource({
      id: "apple-swiftui-tutorials",
      title: "SwiftUI Tutorials",
      provider: "Apple Developer",
      url: "https://developer.apple.com/tutorials/swiftui",
      resourceType: "lab",
      skillTags: ["mobile-swiftui"],
      difficulty: "beginner",
      durationMinutes: 480,
      qualityScore: 0.91,
      prerequisites: ["mobile-swift"],
      evidenceType: "ios-app",
      lastVerifiedAt: V,
      description: "Build a complete SwiftUI app step by step, from views to animation and data."
    }),
    resource({
      id: "apple-swiftui-documentation",
      title: "SwiftUI Documentation",
      provider: "Apple Developer",
      url: "https://developer.apple.com/documentation/swiftui",
      resourceType: "doc",
      skillTags: ["mobile-swiftui"],
      difficulty: "intermediate",
      durationMinutes: 360,
      qualityScore: 0.88,
      prerequisites: ["mobile-swift"],
      evidenceType: "ios-app",
      lastVerifiedAt: V,
      description: "Views, state and data flow, layout, and navigation in the declarative framework."
    }),
    resource({
      id: "apple-app-dev-training",
      title: "Develop Apps in Swift",
      provider: "Apple Developer",
      url: "https://developer.apple.com/tutorials/app-dev-training",
      resourceType: "course",
      skillTags: ["mobile-ios-architecture"],
      difficulty: "advanced",
      durationMinutes: 900,
      qualityScore: 0.89,
      prerequisites: ["mobile-swiftui"],
      evidenceType: "architecture-doc",
      lastVerifiedAt: V,
      description: "Structuring a real app: state management, persistence, concurrency, and testing."
    }),
    resource({
      id: "apple-coredata",
      title: "Core Data",
      provider: "Apple Developer",
      url: "https://developer.apple.com/documentation/coredata",
      resourceType: "doc",
      skillTags: ["mobile-local-storage", "mobile-ios-architecture"],
      difficulty: "advanced",
      durationMinutes: 300,
      qualityScore: 0.85,
      prerequisites: ["mobile-networking"],
      evidenceType: "persistence-layer",
      lastVerifiedAt: V,
      description: "Model objects, persist them, and migrate the store when the schema changes."
    }),
    resource({
      id: "android-data-storage",
      title: "Data and File Storage",
      provider: "Android Developers",
      url: "https://developer.android.com/training/data-storage",
      resourceType: "doc",
      skillTags: ["mobile-local-storage"],
      difficulty: "intermediate",
      durationMinutes: 240,
      qualityScore: 0.86,
      prerequisites: ["mobile-networking"],
      evidenceType: "persistence-layer",
      lastVerifiedAt: V,
      description: "App storage, shared storage, preferences, and databases, with the trade-offs."
    }),
    resource({
      id: "apple-url-loading-system",
      title: "URL Loading System",
      provider: "Apple Developer",
      url: "https://developer.apple.com/documentation/foundation/url-loading-system",
      resourceType: "doc",
      skillTags: ["mobile-networking"],
      difficulty: "intermediate",
      durationMinutes: 180,
      qualityScore: 0.84,
      evidenceType: "api-client",
      lastVerifiedAt: V,
      description: "Requests, sessions, caching, authentication, and background transfers on iOS."
    }),
    resource({
      id: "android-network-operations",
      title: "Perform Network Operations",
      provider: "Android Developers",
      url: "https://developer.android.com/develop/connectivity/network-ops",
      resourceType: "doc",
      skillTags: ["mobile-networking"],
      difficulty: "intermediate",
      durationMinutes: 210,
      qualityScore: 0.85,
      evidenceType: "api-client",
      lastVerifiedAt: V,
      description: "Connecting to the network, parsing responses, and handling connectivity changes."
    }),
    resource({
      id: "android-testing-fundamentals",
      title: "Testing Fundamentals",
      provider: "Android Developers",
      url: "https://developer.android.com/training/testing/fundamentals",
      resourceType: "doc",
      skillTags: ["mobile-testing"],
      difficulty: "intermediate",
      durationMinutes: 180,
      qualityScore: 0.85,
      evidenceType: "mobile-test-suite",
      lastVerifiedAt: V,
      description: "The test pyramid on device, test doubles, and what belongs in an instrumented test."
    }),
    resource({
      id: "xcode-testing",
      title: "Testing in Xcode",
      provider: "Apple Developer",
      url: "https://developer.apple.com/documentation/xcode/testing",
      resourceType: "doc",
      skillTags: ["mobile-testing"],
      difficulty: "intermediate",
      durationMinutes: 180,
      qualityScore: 0.84,
      evidenceType: "mobile-test-suite",
      lastVerifiedAt: V,
      description: "Unit tests, UI tests, and performance measurement inside the Xcode toolchain."
    }),
    resource({
      id: "android-publish-app",
      title: "Publish Your App",
      provider: "Android Developers",
      url: "https://developer.android.com/studio/publish",
      resourceType: "doc",
      skillTags: ["mobile-release"],
      difficulty: "intermediate",
      durationMinutes: 120,
      qualityScore: 0.83,
      prerequisites: ["mobile-testing"],
      evidenceType: "published-app",
      lastVerifiedAt: V,
      description: "Signing, build variants, release preparation, and rolling out through Play."
    }),
    resource({
      id: "app-store-connect-publish",
      title: "Publish Your App",
      provider: "App Store Connect Help",
      url: "https://developer.apple.com/help/app-store-connect/manage-your-app/publish-your-app",
      resourceType: "doc",
      skillTags: ["mobile-release"],
      difficulty: "intermediate",
      durationMinutes: 90,
      qualityScore: 0.82,
      prerequisites: ["mobile-testing"],
      evidenceType: "published-app",
      lastVerifiedAt: V,
      description: "Submitting a build, App Review expectations, and phased release to users."
    })
  ]
});
