from fastapi import FastAPI
from auth import create_user

app = FastAPI()

@app.get("/")
def home():
    return {
        "project": "ShopWiseAI"
    }

@app.post("/register")
def register(username: str, password: str):

    success = create_user(username, password)

    if success:
        return {"message": "User Registered"}

    return {"message": "Username Already Exists"}

