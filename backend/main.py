from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="Hello Microservice API",
    description="Python FastAPI backend for returning greetings",
    version="1.0.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class HelloResponse(BaseModel):
    message: str

@app.get("/healthz")
def health_check():
    return {"status": "ok"}

@app.get("/api/hello", response_model=HelloResponse)
def say_hello_get(name: str = Query(..., description="Name to greet")):
    clean_name = name.strip() if name else "World"
    return HelloResponse(message=f"hello {clean_name}")

class HelloRequest(BaseModel):
    name: str

@app.post("/api/hello", response_model=HelloResponse)
def say_hello_post(payload: HelloRequest):
    clean_name = payload.name.strip() if payload.name else "World"
    return HelloResponse(message=f"hello {clean_name}")
