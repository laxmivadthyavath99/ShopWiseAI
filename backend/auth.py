import hashlib
from db import db

users = db["users"]

def create_user(username, password):

    if users.find_one({"username": username}):
        return False

    hashed_password = hashlib.sha256(
        password.encode()
    ).hexdigest()

    users.insert_one({
        "username": username,
        "password": hashed_password
    })

    return True