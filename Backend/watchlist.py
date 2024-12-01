def get_watch_list(conn, account_id):
    cursor = conn.cursor()
    query = """
    SELECT post_id 
    FROM Watch_List 
    WHERE account_id = ?;
    """
    try:
        cursor.execute(query, (account_id,))
        results = cursor.fetchall()
        return {"success": True, "watchlist": [row[0] for row in results]}
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
