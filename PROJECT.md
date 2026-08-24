# Project Overview

## Vision

Build an AI-powered system that creates personalized learning paths by understanding learner goals, assessing current skills, and recommending optimal sequences of courses and resources.

## Core Features

1. **Learner Profile Management**
   - Capture goals, current skills, completed courses
   - Track learning preferences and available time
   - Store progress and feedback history

2. **Course/Resource Database**
   - Store courses with metadata (prerequisites, difficulty, duration)
   - Support multiple resource types (courses, articles, videos, projects)

3. **Recommendation Engine**
   - Match resources to learner goals and skill gaps
   - Consider learning style preferences
   - Rank by relevance and prerequisites

4. **Learning Path Generation**
   - Create ordered sequences respecting prerequisites
   - Optimize for available time and learning pace
   - Handle parallel learning tracks when possible

5. **Explainability**
   - Show why each resource was recommended
   - Explain path ordering decisions
   - Provide transparency in AI recommendations

6. **Adaptive Feedback Loop**
   - Track completion and progress
   - Gather learner feedback
   - Adjust recommendations based on outcomes

## Data Flow

```
Learner Input → Profile Creation → Skill Assessment
                                      ↓
Path Generation ← Resource Matching ← Gap Analysis
       ↓
  Explanation Generation → Dashboard Display
       ↓
  Progress Tracking → Feedback Collection → Profile Update
```

## API Contracts

See `contracts/` directory for data schemas used between frontend and backend.

## Architecture Decisions

Document key decisions in `docs/decisions/` using Architecture Decision Records (ADRs).

## Development Guidelines

- Keep components loosely coupled
- Use contracts for API boundaries
- Document decisions as they're made
- Write tests for critical paths
