import os

import pyodbc
from dotenv import load_dotenv
from fastapi import FastAPI

from DB.db import db_helper
from Models.Posts_Update_Model import Posts_Update_Model
from Models.Posts_Model import Posts_Model
from posts import get_post, query_posts, add_post, modify_post

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





