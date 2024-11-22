import sqlite3
import os
import shutil
import random
import string

UPLOAD_FOLDER = "./uploads"

def generate_random_string(length=7):
    characters = string.ascii_lowercase + string.digits
    return ''.join(random.choice(characters) for _ in range(length))

def upload_image(conn, post_id, file):
    name = file.filename
    extension = name.split(".")[-1]

    name = post_id + generate_random_string() + "." + extension


    if extension not in ["jpeg", "jpg", "png", "webp"]:
        return {"error": "invalid file format"}

    file_path = os.path.join(UPLOAD_FOLDER, name)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    query = "INSERT INTO Images (file_name, post_id) VALUES(?, ?)"
    conn.execute(query, (name, post_id))
    conn.commit()


    return {"file_path": file_path}

def get_post(conn, post_id):
    cursor = conn.cursor()
    query = "SELECT * FROM Posts WHERE post_id = ?"
    cursor.execute(query, (post_id,))
    response = cursor.fetchall()
    if len(response) == 0:
        return {"error": "post_id not found"}

    return_me = {
        "post_id": response[0][0],
        "poster_id": response[0][1],
        "title": response[0][2],
        "about": response[0][3],
        "bedroom": response[0][4],
        "bathroom": response[0][5],
        "shared": response[0][6],
        "addr": response[0][7],
        "listed_price": response[0][8],
        "est_price": response[0][9],
        "post_date": response[0][10]
    }
    return return_me

def get_pics(conn, post_id):
    query = "SELECT * FROM Images WHERE post_id = ?"
    responses = conn.execute(query, (post_id,)).fetchall()
    return_me = []
    for response in responses:
        return_me.append("http://127.0.0.1:8000/uploads/" + response[1])
    return return_me


def query_posts(conn, number_of_posts):
    query = "SELECT * FROM Posts ORDER BY post_id DESC LIMIT ?"
    try:
        responses = conn.execute(query, (number_of_posts,)).fetchall()
    except:
        return "error"

    return_me = []
    for response in responses:
        return_me.append({
            "post_id": response[0],
            "poster_id": response[1],
            "title": response[2],
            "about": response[3],
            "bedroom": response[4],
            "bathroom": response[5],
            "shared": response[6],
            "addr": response[7],
            "listed_price": response[8],
            "est_price": response[9],
            "post_date": response[10]})
    return return_me

def add_post(conn, post):
    cursor = conn.cursor()
    if post.shared:
        s = 1
    else:
        s = 0

    try:

        query = "INSERT INTO Posts (poster_id, title, about, bedroom, bathroom, shared, addr, listed_price, post_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?,  date('now'));"
        conn.execute(query, (post.poster_id, post.title, post.about, post.bedroom, post.bathroom, s, post.addr, post.listed_price))
        conn.commit()
        query = "SELECT * FROM Posts WHERE poster_id = ? AND title = ? AND about = ?"
        responses = conn.execute(query, (post.poster_id, post.title, post.about)).fetchall()
        response = responses[0]
        return {"success": response[0]}
    except Exception as e:
        # Print the error message
        print(f"An error occurred: {e}")

        return {"error": "post not added"}

def modify_post(conn, post):
    cursor = conn.cursor()
    if post.shared:
        s = 1
    else:
        s = 0
    try:
        # rewrtie this using a prepared statement
        query = "UPDATE Posts SET title = ?, about = ?, bedroom = ?, bathroom = ?, shared = ?, addr = ?, listed_price = ? WHERE post_id = ?;"
        conn.execute(query, (post.title, post.about, post.bedroom, post.bathroom, s, post.addr, post.listed_price, post.post_id))
        conn.commit()
        return {"success": "post modified"}
    except:
        return {"error": "post not modified"}