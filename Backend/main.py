from fastapi import FastAPI

from DB.app import db_helper

app = FastAPI()

@app.get('/')
async def index() -> dict[str, str]:
    return {'hello': 'world'}

@app.get('/posts')
async def about() -> list[dict[str, object]]:
    db = db_helper()
    return db.query("SELECT * FROM ACCOUNTS;")





