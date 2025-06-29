from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from routers import chat, email, jira, nudge, tickets

app = FastAPI(title="Darwinbox GPT Assistant")

# CORS for frontend-backend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API routers with /api prefix
app.include_router(chat.router, prefix="/api")
app.include_router(email.router, prefix="/api")
app.include_router(jira.router, prefix="/api")
app.include_router(nudge.router, prefix="/api")
app.include_router(tickets.router, prefix="/api")

# Serve frontend static files
frontend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../frontend"))
app.mount("/", StaticFiles(directory=frontend_path, html=True), name="frontend")