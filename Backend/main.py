import os

import pyodbc
from dotenv import load_dotenv
from fastapi import FastAPI

from DB.db import db_helper
from Models.Message_Model import Message_Model
from Models.Profile_Model import Profile_Model

from Models.Posts_Update_Model import Posts_Update_Model
from Models.Posts_Model import Posts_Model
from messages import send_msg, get_msg
from posts import get_post, query_posts, add_post, modify_post
from profiles import get_profile, create_profile

app = FastAPI()
load_dotenv()
connection_str = os.environ['connection_string']
conn = pyodbc.connect(connection_str)

@app.get('/')
async def index() -> dict[str, str]:
    return {'hello': 'world'}

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

@app.get('/messages/{user_id}')
async def get_messages(user_id):
    return get_msg(conn, user_id)

@app.get('/messages/{reciever_id}/{sender_id}')
async def get_messages(user_id):
    return get_msg(conn, user_id)

@app.post('/messages')
async def send_message(msg: Message_Model) -> dict[str, object]:
    return send_msg(conn, msg)




