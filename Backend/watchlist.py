def get_watch_list(conn, account_id):
    cursor = conn.cursor()
    query = """
    SELECT Watch_List.post_id, title 
    FROM Watch_List 
    JOIN Posts ON Watch_List.post_id = Posts.post_id
    WHERE account_id = ?;   
    """
    try:
        cursor.execute(query, (account_id,))
        results = cursor.fetchall()
        return_me = []

        for response in results:
            return_me.append({
            "post_id": response[0],
            "title" : response[1]
            })
        return return_me
    except Exception as e:
        return {"success": False, "error": f"Failed to fetch watch list: {str(e)}"}

def add_to_watch_list(conn, account_id, post_id):
    cursor = conn.cursor()
    query = """
    INSERT INTO Watch_List (account_id, post_id)
    VALUES (?, ?);
    """
    try:
        cursor.execute(query, (account_id, post_id))
        conn.commit()
        return {"success": True, "message": f"Post {post_id} added to the watch list for account {account_id}"}
    except Exception as e:
        return {"success": False, "error": f"Failed to add post {post_id} to the watch list: {str(e)}"}

def remove_from_watch_list(conn, account_id, post_id):
    cursor = conn.cursor()
    query = """
    DELETE FROM Watch_List
    WHERE account_id = ? AND post_id = ?;
    """
    try:
        cursor.execute(query, (account_id, post_id))
        conn.commit()
        if cursor.rowcount == 0:
            return {"success": False, "error": f"Post {post_id} not found in the watch list for account {account_id}"}
        return {"success": True, "message": f"Post {post_id} removed from the watch list for account {account_id}"}
    except Exception as e:
        return {"success": False, "error": f"Failed to remove post {post_id} from the watch list: {str(e)}"}
