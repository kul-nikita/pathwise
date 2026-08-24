# Backend

Python FastAPI backend for the Learning Path Recommender.

## Structure

```
app/
├── api/         # API endpoints and routing
├── models/      # Database models (SQLAlchemy)
├── schemas/     # Pydantic request/response models
├── services/    # Business logic
├── repositories/ # Data access layer
└── core/        # Configuration, security, utilities
tests/           # Unit and integration tests
```

## Getting Started

1. Create virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # or venv\Scripts\activate on Windows
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Copy environment variables:
   ```bash
   cp ../.env.example .env
   ```

4. Run development server:
   ```bash
   uvicorn app.main:app --reload
   ```

## API Documentation

Once running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
