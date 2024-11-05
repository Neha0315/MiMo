def get_post(conn, post_id):
    cursor = conn.cursor()
    query = "SELECT * FROM Posts WHERE post_id = ?"
    cursor.execute(query, post_id)
    response = cursor.fetchall()
    if len(response) == 0:
        return {"error": "post_id not found"}

    return_me = {
        "post_id": response[0][0],
        "poster_id": response[0][1],
        "about": response[0][2],
        "bedroom": response[0][3],
        "bathroom": response[0][4],
        "shared": response[0][5],
        "addr": response[0][6],
        "listed_price": response[0][7],
        "est_price": response[0][8],
        "post_date": response[0][9].strftime("%m/%d/%Y")
    }
    return return_me


def query_posts(conn, number_of_posts):
    cursor = conn.cursor()
    if not str(number_of_posts).isnumeric():
        return {"error": "post_id must be an integer"}
    query = "SELECT TOP " + str(number_of_posts) + " * FROM Posts ORDER BY post_date DESC;"
    responses = cursor.execute(query).fetchall()
    return_me = []
    for response in responses:
        return_me.append({
            "post_id": response[0],
            "poster_id": response[1],
            "about": response[2],
            "bedroom": response[3],
            "bathroom": response[4],
            "shared": response[5],
            "addr": response[6],
            "listed_price": response[7],
            "est_price": response[8],
            "post_date": response[9].strftime("%m/%d/%Y")})
    return return_me

def add_post(conn, post):
    cursor = conn.cursor()
    if post.shared:
        s = 1
    else:
        s = 0

    try:
        query = "INSERT INTO Posts (poster_id, about, bedroom, bathroom, shared, addr, listed_price, post_date) VALUES (?, ?, ?, ?, ?, ?, ?,  GETDATE());"
        conn.execute(query, post.poster_id, post.about, post.bedroom, post.bathroom, s, post.addr, post.listed_price)
        conn.commit()
        return {"success": "post added"}
    except:
        return {"error": "post not added"}

def modify_post(conn, post):
    cursor = conn.cursor()
    if post.shared:
        s = 1
    else:
        s = 0
    try:
        # rewrtie this using a prepared statement
        query = "UPDATE Posts SET about = ?, bedroom = ?, bathroom = ?, shared = ?, addr = ?, listed_price = ? WHERE post_id = ?;"
        conn.execute(query, post.about, post.bedroom, post.bathroom, s, post.addr, post.listed_price, post.post_id)
        conn.commit()
        return {"success": "post modified"}
    except:
        return {"error": "post not modified"}