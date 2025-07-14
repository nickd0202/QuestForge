from fastapi import FastAPI
from routers import auth, tasks, inventory, character
from database import init_db

app = FastAPI(title="QuestForge API")

# Initialize database tables
default_init=True
init_db()

# Include routers
app.include_router(auth.router)
app.include_router(tasks.router)
app.include_router(inventory.router)
app.include_router(character.router)

@app.get("/api/health")
def health_check():
    return {"status": "ok"}