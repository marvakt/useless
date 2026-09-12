import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.routes import analyze, generate_song

app = FastAPI(
    title="Ente Ponnu Aliya API",
    description="Backend for analyzing voice inputs and generating roasts",
    version="1.0.0"
)

# CORS configuration to allow the React frontend to communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"], # Vite dev server default
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure generated directory exists
os.makedirs("generated", exist_ok=True)

# Mount the static directory to serve audio files
app.mount("/audio", StaticFiles(directory="generated"), name="audio")

@app.get("/health")
def health_check():
    return {"status": "ok"}

# Include routers
app.include_router(analyze.router)
app.include_router(generate_song.router)
