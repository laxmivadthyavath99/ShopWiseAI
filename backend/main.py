from scraper import search_flipkart





from fastapi import FastAPI
from auth import create_user, login_user
from fastapi.middleware.cors import CORSMiddleware
from db import db
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "project": "ShopWiseAI"
    }

@app.post("/register")
def register(username: str, password: str):

    success = create_user(username, password)

    if success:
        return {
            "message": "User Registered"
        }

    return {
        "message": "Username Already Exists"
    }
@app.get("/wishlist")
def get_wishlist(username: str):

    data = list(wishlist.find({"username": username}, {"_id": 0}))

    return {
        "wishlist": data
    }
@app.post("/login")
def login(username: str, password: str):

    success = login_user(username, password)

    if success:
        return {
            "message": "Login Successful",
            "username": username
        }

    return {
        "message": "Invalid Credentials"
    }

wishlist = db["wishlist"]

@app.post("/wishlist/add")
def add_wishlist(username: str,name: str, price: int):

    wishlist.insert_one({
        "username": username,
        "name": name,
        "price": price
    })

    return {
        "message": "Added To Wishlist"
    }
@app.delete("/wishlist/delete")
def delete_wishlist(
    username: str,
    name: str
):

    wishlist.delete_one({
        "username": username,
        "name": name
    })

    return {
        "message": "Removed From Wishlist"
    }
@app.get("/status")
def status():
    return {
        "message": "Backend Connected"
    }
@app.get("/search")
def search(keyword: str):

    products = search_flipkart(keyword)

    return {
        "products": products
    }