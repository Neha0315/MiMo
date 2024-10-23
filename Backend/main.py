from fastapi import FastAPI

from DB.db import db_helper
from Posts_Model import Posts_Model

app = FastAPI()
db = db_helper()

@app.get('/')
async def index() -> dict[str, str]:
    return {'hello': 'world'}

@app.get('/post/{post_id}')
async def get_post(post_id) -> dict[str, object]:
    return db.get_post(post_id)


@app.get('/posts/{number_of_posts}')
async def posts(number_of_posts) -> list[dict[str, object]]:
    return db.query_posts(number_of_posts)






