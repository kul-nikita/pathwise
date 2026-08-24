# AI-Powered Personalized Learning Path Recommender

A hackathon project that generates personalized learning paths based on learner goals, current skills, completed courses, and available time.

## Project Structure

```
├── backend/          # Python FastAPI backend
│   ├── app/         # Application code (API, models, services)
│   └── tests/       # Backend tests
├── frontend/        # React/Next.js frontend
├── contracts/       # Data schemas/contracts between services
├── mock-data/       # Sample data for development
├── docs/            # Architecture decisions, API docs
└── scripts/         # Utility scripts
```

## Team Areas

1. **Learner Profiling / Conversational Interface** - Capture learner goals and build profiles
2. **Recommendation Engine** - Suggest relevant courses and resources
3. **Learning Path & Prerequisite Logic** - Generate ordered learning sequences
4. **Explainability + Dashboard** - Visualize paths and explain recommendations
5. **Integration + Adaptive Feedback Loop** - Connect components and adapt based on feedback

## Getting Started

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Copy `.env.example` to `.env` and fill in your API keys:
```bash
cp .env.example .env
```

## Tech Stack

- **Frontend**: React / Next.js
- **Backend**: Python / FastAPI
- **Database**: PostgreSQL (planned)
- **AI**: OpenAI / Anthropic API (planned)
- **Vector Search**: Chroma (optional)
