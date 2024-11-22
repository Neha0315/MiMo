from fastapi.staticfiles import StaticFiles
import sqlite3
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import os
from Models.Message_Model import Message_Model
from Models.Profile_Model import Profile_Model

from Models.Posts_Update_Model import Posts_Update_Model
from Models.Posts_Model import Posts_Model
from messages import send_msg, get_msg
from posts import get_post, query_posts, add_post, modify_post, get_pics
from profiles import get_profile, create_profile
import shutil

app = FastAPI()
conn = sqlite3.connect('SQLite/MiMo.db')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200", "http://localhost:65366"],  # Replace with the origin of your Angular app
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

UPLOAD_FOLDER = "./uploads"
@app.post("/upload-image")
async def upload_image(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {"file_path": file_path}

@app.get('/test')
async def index() -> dict[str, str]:
    return {'hello': 'world'}

@app.get('/post/images/{post_id}')
async def get_photos(post_id) -> object:
    return get_pics(conn, post_id)

@app.get('/post/{post_id}')
async def get_pst(post_id) -> dict[str, object]:
    return get_post(conn, post_id)

@app.get('/posts/{number_of_posts}')
async def posts(number_of_posts) -> list[dict[str, object]]:
    return query_posts(conn, number_of_posts)

@app.post('/post')
async def post(post: Posts_Model) -> dict[str, object]:
   return add_post(conn, post)

@app.post('/post/modify')
async def mdify_post(post: Posts_Update_Model) -> dict[str, object]:
    print("here")
    return modify_post(conn, post)

@app.get('/profile/{user_id}')
async def get_prfle(user_id) -> dict[str, object]:
    return get_profile(conn, user_id)

@app.post('/profile')
async def make_profile(profile: Profile_Model) -> dict[str, object]:
    return create_profile(conn, profile)

# @app.get('/messages/{user_id}')
# async def get_messages(user_id):
#     return get_msg(conn, user_id)

@app.get('/messages/{reciever_id}/{sender_id}')
async def get_messages(reciever_id, sender_id):
    return get_msg(conn, reciever_id, sender_id)

@app.post('/messages')
async def send_message(msg: Message_Model) -> dict[str, object]:
    return send_msg(conn, msg)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)





