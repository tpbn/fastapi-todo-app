from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import models
from .database import engine

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root route
@app.get("/")
def read_root():
    return {"message": "FastAPI To-Do App is live!"}

# DB Table Creation
models.Base.metadata.create_all(bind=engine)

# Include ToDo router
from .routers import todo
app.include_router(todo.router)
