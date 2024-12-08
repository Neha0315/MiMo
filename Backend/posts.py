import sqlite3
import os
import shutil
import random
import string

# from Backend.model_updated import get_score

UPLOAD_FOLDER = "./uploads"

def generate_random_string(length=7):
    characters = string.ascii_lowercase + string.digits
    return ''.join(random.choice(characters) for _ in range(length))

def upload_image(conn, post_id, file):
    name = file.filename
    extension = name.split(".")[-1]

    name = post_id + generate_random_string() + "." + extension

    if extension not in ["jpeg", "jpg", "png", "webp", "JPEG", "JPG", "PNG", "WEBP"]:
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
    query = "SELECT * FROM Posts INNER JOIN Accounts ON Posts.poster_id = Accounts.account_id WHERE post_id = ?;"
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
        "sq_ft": response[0][9],
        "post_date": response[0][10],
        "score" : response[0][11],
        "poster_name": response[0][16]
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
    query = ("SELECT * FROM Posts INNER JOIN Images on Images.post_id = Posts.post_id WHERE image_id IN (SELECT MIN(image_id) FROM images GROUP BY post_id) ORDER BY Posts.post_id DESC LIMIT ?;")
    #"SELECT DISTINCT Images.post_id, DISTINCT Posts.post_id, poster_id, title, about, bedroom, bathroom, shared, addr, listed_price, est_price, post_date, file_name FROM Posts INNER JOIN Images on Images.post_id = Posts.post_id ORDER BY Posts.post_id DESC LIMIT ?;"
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
            "sq_ft": response[9],
            "post_date": response[10],
            "score": response[11],
            "img_url": "http://127.0.0.1:8000/uploads/" + response[13]})
    return return_me

def add_post(conn, post):
    cursor = conn.cursor()
    if post.shared:
        s = 1
    else:
        s = 0

    try:
        from model_updated import get_score
        get_score
        score = get_score({
            'list_price': post.listed_price,
            'sqft': post.sq_ft,
            'beds': post.bedroom,
            'full_baths': post.bathroom,
            'address': post.addr
        })


        query = "INSERT INTO Posts (poster_id, title, about, bedroom, bathroom, shared, addr, listed_price, post_date, sq_ft, score) VALUES (?, ?, ?, ?, ?, ?, ?, ?,  date('now'), ?, ?);"
        conn.execute(query, (post.poster_id, post.title, post.about, post.bedroom, post.bathroom, s, post.addr, post.listed_price, post.sq_ft, score))
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
        query = "UPDATE Posts SET title = ?, about = ?, bedroom = ?, bathroom = ?, shared = ?, addr = ?, listed_price = ?, sq_ft = ? WHERE post_id = ?;"
        conn.execute(query, (post.title, post.about, post.bedroom, post.bathroom, s, post.addr, post.listed_price, post.sq_ft, post.post_id))
        conn.commit()
        return {"success": "post modified"}
    except:
        return {"error": "post not modified"}