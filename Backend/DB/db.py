import pyodbc 
import os
from dotenv import load_dotenv

class db_helper:

    def __init__(self):
        load_dotenv()
        connection_str = os.environ['connection_string']
        self.conn = pyodbc.connect(connection_str)
        self.cursor = self.conn.cursor()

    def get_post(self, post_id):
        cursor = self.conn.cursor()
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
    def query_posts(self, number_of_posts):
        if not str(number_of_posts).isnumeric():
            return {"error": "post_id must be an integer"}
        query = "SELECT TOP " + str(number_of_posts) + " * FROM Posts ORDER BY post_date DESC;"
        responses = self.query(query)
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
                "post_date": response[9].strftime("%m/%d/%Y")
            })

        return return_me


    def query(self, query):
        self.cursor.execute(query)
        response = self.cursor.fetchall()
        return response

    def add_post(self, post):
        if post.shared:
            s = 1
        else:
            s = 0
        try:
            query = "INSERT INTO Posts (poster_id, about, bedroom, bathroom, shared, addr, listed_price) VALUES (" + str(post.poster_id) + ", '" + post.about + "', " + str(post.bedroom) + ", " + str(post.bathroom) + ", " + str(s) + ", '" + post.addr + "', " + str(post.listed_price) + ");"
            self.cursor.execute(query)
            self.conn.commit()
            print(self.cursor.fetchall())
            return {"success": "post added"}
        except:
            return {"error": "post not added"}


# db = db_helper()
# print(db.get_post(1))
