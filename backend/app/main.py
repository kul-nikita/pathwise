from fastapi import FastAPI

app = FastAPI(
    title="Learning Path Recommender API",
    description="AI-Powered Personalized Learning Path Recommender",
    version="0.1.0"
)


@app.get("/")
async def root():
    return {"message": "Learning Path Recommender API"}


@app.get("/health")
async def health():
    return {"status": "healthy"}
